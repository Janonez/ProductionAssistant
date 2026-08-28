using System.Text.Json;
using System.Text.RegularExpressions;
using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public static class DailyReportSettingsStore
{
    private static readonly JsonSerializerOptions JsonOptions = new() { WriteIndented = true };
    private static readonly Mutex RunsMutex = new(false, "Local\\ProductionAssistant-DailyReportRuns");
    private static string FolderPath => Environment.GetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR")
        ?? Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "ProductionAssistant");
    private static string LegacySettingsPath => Path.Combine(FolderPath, "daily-report-settings.json");
    private static string JobsPath => Path.Combine(FolderPath, "daily-report-jobs.json");
    private static string RunsPath => Path.Combine(FolderPath, "daily-report-runs.json");

    public static DailyReportJobCatalog LoadCatalog()
    {
        try
        {
            if (File.Exists(JobsPath))
            {
                var json = File.ReadAllText(JobsPath);
                var hadLegacyNotification = ImportLegacyNotification(json);
                var catalog = JsonSerializer.Deserialize<DailyReportJobCatalog>(json) ?? new();
                foreach (var job in catalog.Jobs) Migrate(job);
                if (hadLegacyNotification) SaveCatalog(catalog);
                return catalog;
            }
            var migrated = MigrateLegacy();
            if (migrated.Jobs.Count > 0) SaveCatalog(migrated);
            return migrated;
        }
        catch { return new(); }
    }

    public static void SaveCatalog(DailyReportJobCatalog catalog)
    {
        Directory.CreateDirectory(FolderPath);
        AtomicWrite(JobsPath, JsonSerializer.Serialize(catalog, JsonOptions));
    }

    public static void SaveJob(DailyReportJob job)
    {
        var catalog = LoadCatalog();
        var index = catalog.Jobs.FindIndex(item => item.Id == job.Id);
        if (index < 0) catalog.Jobs.Add(job); else catalog.Jobs[index] = job;
        SaveCatalog(catalog);
    }

    public static bool DeleteJob(string jobId)
    {
        var catalog = LoadCatalog();
        var removed = catalog.Jobs.RemoveAll(job => job.Id == jobId) > 0;
        if (!removed) return false;
        SaveCatalog(catalog);
        RunsMutex.WaitOne();
        try { SaveRunRecords(LoadRunRecords().Where(record => record.JobId != jobId)); }
        finally { RunsMutex.ReleaseMutex(); }
        return true;
    }

    public static IReadOnlyList<DailyReportRunRecord> LoadRunRecords(string? jobId = null)
    {
        try
        {
            var records = File.Exists(RunsPath)
                ? JsonSerializer.Deserialize<List<DailyReportRunRecord>>(File.ReadAllText(RunsPath)) ?? []
                : [];
            return records.Where(record => jobId is null || record.JobId == jobId)
                .OrderByDescending(record => record.StartedAt).ToArray();
        }
        catch { return []; }
    }

    public static void AddRunRecord(DailyReportRunRecord record)
    {
        RunsMutex.WaitOne();
        try
        {
            var records = LoadRunRecords().ToList();
            records.RemoveAll(item => item.Id == record.Id);
            records.Add(record);
            records = records.GroupBy(item => item.JobId)
                .SelectMany(group => group.OrderByDescending(item => item.StartedAt).Take(100)).ToList();
            SaveRunRecords(records);
        }
        finally { RunsMutex.ReleaseMutex(); }
    }

    public static string EncodeToken(DailyReportFieldToken token) =>
        Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(JsonSerializer.Serialize(token)))
            .Insert(0, "{{report:") + "}}";

    public static bool TryDecodeToken(string encoded, out DailyReportFieldToken? token)
    {
        token = null;
        if (!encoded.StartsWith("{{report:", StringComparison.Ordinal) || !encoded.EndsWith("}}", StringComparison.Ordinal)) return false;
        try
        {
            token = JsonSerializer.Deserialize<DailyReportFieldToken>(
                System.Text.Encoding.UTF8.GetString(Convert.FromBase64String(encoded[9..^2])));
            return token is not null;
        }
        catch { return false; }
    }

    public static string AddOrUpdateField(DailyReportSettings settings, DailyReportFieldToken token) =>
        AddOrUpdateField(settings.Fields, token);
    public static string AddOrUpdateField(DailyReportJob job, DailyReportFieldToken token) =>
        AddOrUpdateField(job.Fields, token);

    private static string AddOrUpdateField(List<DailyReportFieldDefinition> fields, DailyReportFieldToken token)
    {
        var existing = fields.FirstOrDefault(field => field.Token.DataSourceId == token.DataSourceId && field.Token.PropertyId == token.PropertyId);
        if (existing is not null) { existing.Token = token; return existing.Placeholder; }
        var source = token.DataSourceName.Replace('"', '\'');
        var property = token.PropertyName.Replace('"', '\'');
        var basePlaceholder = $"prop(\"{source} · {property}\")";
        var placeholder = basePlaceholder;
        for (var suffix = 2; fields.Any(field => field.Placeholder == placeholder); suffix++)
            placeholder = $"prop(\"{source} · {property} {suffix}\")";
        fields.Add(new() { Placeholder = placeholder, Token = token });
        return placeholder;
    }

    private static DailyReportJobCatalog MigrateLegacy()
    {
        if (!File.Exists(LegacySettingsPath)) return new();
        var old = JsonSerializer.Deserialize<DailyReportSettings>(File.ReadAllText(LegacySettingsPath)) ?? new();
        Migrate(old);
        var hasContent = old.ActiveTemplateVersion > 0 || !string.IsNullOrWhiteSpace(old.DraftTemplate) ||
                         !string.IsNullOrWhiteSpace(old.EncryptedWebhook) || old.Sources.Count > 0;
        if (!hasContent) return new();
        NotificationSettingsStore.ImportLegacy(old.EncryptedWebhook, old.EncryptedSecret);
        return new() { Jobs = [new DailyReportJob
        {
            Id = "legacy-production-message-tower-daily", Name = "生产消息塔日报",
            IsEnabled = false, DraftTemplate = old.DraftTemplate,
            DraftTemplateDocument = old.DraftTemplateDocument, ActiveTemplate = old.ActiveTemplate,
            ActiveTemplateDocument = old.ActiveTemplateDocument, ActiveTemplateVersion = old.ActiveTemplateVersion,
            SendTime = old.SendTime, Sources = old.Sources, Fields = old.Fields
        }] };
    }

    private static void Migrate(DailyReportSettings settings)
    {
        foreach (var source in settings.Sources) Migrate(source);
        settings.DraftTemplate = MigrateTemplate(settings.Fields, settings.DraftTemplate);
        settings.ActiveTemplate = MigrateTemplate(settings.Fields, settings.ActiveTemplate);
    }

    private static void Migrate(DailyReportJob job)
    {
        if (string.IsNullOrWhiteSpace(job.Id)) job.Id = Guid.NewGuid().ToString("N");
        foreach (var source in job.Sources) Migrate(source);
        job.DraftTemplate = MigrateTemplate(job.Fields, job.DraftTemplate);
        job.ActiveTemplate = MigrateTemplate(job.Fields, job.ActiveTemplate);
    }

    private static void Migrate(DailyReportSourceBinding source)
    {
        if (!string.IsNullOrWhiteSpace(source.MatchPropertyName) || string.IsNullOrWhiteSpace(source.DatePropertyName)) return;
        source.MatchPropertyId = source.DatePropertyId;
        source.MatchPropertyName = source.DatePropertyName;
        source.MatchPropertyType = "date";
        source.PeriodKind = "day";
    }

    private static string MigrateTemplate(List<DailyReportFieldDefinition> fields, string template)
    {
        foreach (Match match in Regex.Matches(template, @"\{\{report:[A-Za-z0-9+/=]+\}\}"))
            if (TryDecodeToken(match.Value, out var token) && token is not null)
                template = template.Replace(match.Value, AddOrUpdateField(fields, token), StringComparison.Ordinal);
        return template;
    }

    private static bool ImportLegacyNotification(string json)
    {
        try
        {
            using var document = JsonDocument.Parse(json);
            var jobs = document.RootElement.GetProperty("Jobs");
            var hadLegacyProperties = false;
            foreach (var job in jobs.EnumerateArray())
            {
                var hasWebhook = job.TryGetProperty("EncryptedWebhook", out var webhookValue);
                var hasSecret = job.TryGetProperty("EncryptedSecret", out var secretValue);
                hadLegacyProperties |= hasWebhook || hasSecret;
                var webhook = hasWebhook ? webhookValue.GetString() ?? "" : "";
                var secret = hasSecret ? secretValue.GetString() ?? "" : "";
                if (string.IsNullOrWhiteSpace(webhook) && string.IsNullOrWhiteSpace(secret)) continue;
                NotificationSettingsStore.ImportLegacy(webhook, secret);
                return true;
            }
            return hadLegacyProperties;
        }
        catch { return false; }
    }

    private static void SaveRunRecords(IEnumerable<DailyReportRunRecord> records)
    {
        Directory.CreateDirectory(FolderPath);
        AtomicWrite(RunsPath, JsonSerializer.Serialize(records, JsonOptions));
    }

    private static void AtomicWrite(string path, string json)
    {
        var temporary = path + ".tmp";
        File.WriteAllText(temporary, json);
        File.Move(temporary, path, true);
    }
}
