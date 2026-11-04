using System.Diagnostics;
using System.Runtime.CompilerServices;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public static class DailyReportSettingsStore
{
    private static readonly JsonSerializerOptions JsonOptions = new() { WriteIndented = true };
    private static readonly Mutex RunsMutex = new(false,
        $"Local\\ProductionAssistant-{RuntimeEnvironment.Current.Name}-DailyReportRuns");
    private static string FolderPath => RuntimeEnvironment.DataDirectory;
    private static string RunsPath => Path.Combine(FolderPath, "daily-report-runs.json");
    private static readonly ConditionalWeakTable<object, Snapshot> Snapshots = new();
    [ThreadStatic] private static bool _insideCatalogLock;
    private sealed record Snapshot(string Directory, string Json, string? JobId = null);

    public static DailyReportJobCatalog LoadCatalog() => WithCatalogLock(directory =>
    {
        var catalog = LoadCatalogCore(directory);
        Remember(catalog, directory);
        return catalog;
    });

    public static void SaveCatalog(DailyReportJobCatalog catalog) => WithCatalogLock(directory =>
    {
        var current = LoadCatalogCore(directory);
        var hasBaseline = Snapshots.TryGetValue(catalog, out var baseline);
        if (hasBaseline
            ? baseline!.Directory != directory || baseline.Json != Serialize(current)
            : File.Exists(Path.Combine(directory, "daily-report-jobs.json")))
            throw Conflict();
        Validate(catalog);
        // Compatibility snapshot saves cannot bypass scheduling coordination or delete jobs.
        foreach (var existing in current.Jobs)
        {
            var proposed = catalog.Jobs.SingleOrDefault(job => job.Id == existing.Id);
            if (proposed is null || proposed.IsEnabled != existing.IsEnabled || proposed.SendTime != existing.SendTime)
                throw new InvalidOperationException("请使用任务启停、基本配置或删除操作更新调度状态。");
        }
        SaveCatalogCore(directory, catalog);
        Remember(catalog, directory);
        return true;
    });

    public static void SaveJob(DailyReportJob job) => WithCatalogLock(directory =>
    {
        var catalog = LoadCatalogCore(directory);
        var index = catalog.Jobs.FindIndex(item => item.Id == job.Id);
        if (Snapshots.TryGetValue(job, out var baseline))
        {
            if (baseline.Directory != directory || baseline.JobId != job.Id ||
                index < 0 || baseline.Json != Serialize(catalog.Jobs[index]))
                throw Conflict();
        }
        else if (index >= 0) throw Conflict();
        if (index >= 0 && (catalog.Jobs[index].IsEnabled != job.IsEnabled || catalog.Jobs[index].SendTime != job.SendTime))
            throw new InvalidOperationException("请使用任务启停或基本配置操作更新调度状态。");
        if (index < 0) catalog.Jobs.Add(job); else catalog.Jobs[index] = job;
        Validate(catalog);
        SaveCatalogCore(directory, catalog);
        Remember(catalog, directory);
        return true;
    });

    public static T UpdateCatalog<T>(Func<DailyReportJobCatalog, T> update) => WithCatalogLock(directory =>
    {
        var catalog = LoadCatalogCore(directory);
        var before = Serialize(catalog);
        var result = update(catalog);
        Validate(catalog);
        if (Serialize(catalog) != before) SaveCatalogCore(directory, catalog);
        Remember(catalog, directory);
        return result;
    });

    public static T UpdateJob<T>(string jobId, Func<DailyReportJob, T> update) => UpdateCatalog(catalog =>
    {
        var job = catalog.Jobs.SingleOrDefault(item => item.Id == jobId)
            ?? throw new InvalidOperationException("找不到指定的日报任务。");
        var result = update(job);
        if (job.Id != jobId) throw Conflict();
        return result;
    });

    public static bool TryUpdateJob(string jobId, Func<DailyReportJob, bool> update) => UpdateCatalog(catalog =>
    {
        var job = catalog.Jobs.SingleOrDefault(item => item.Id == jobId);
        if (job is null) return false;
        var result = update(job);
        if (job.Id != jobId) throw Conflict();
        return result;
    });

    public static string ValidationFingerprint(DailyReportJob job) => Serialize(new
    {
        job.DraftTemplate, job.DraftTemplateDocument, job.ActiveTemplate, job.ActiveTemplateDocument,
        job.ActiveTemplateVersion, job.Sources, job.Fields, job.MetricSourceIds
    });

    private static string Serialize<T>(T value) => JsonSerializer.Serialize(value, JsonOptions);

    private static void Remember(DailyReportJobCatalog catalog, string directory)
    {
        RememberSnapshot(catalog, new(directory, Serialize(catalog)));
        foreach (var job in catalog.Jobs) RememberSnapshot(job, new(directory, Serialize(job), job.Id));
    }

    private static void RememberSnapshot(object value, Snapshot snapshot)
    {
        Snapshots.Remove(value);
        Snapshots.Add(value, snapshot);
    }

    internal static InvalidOperationException Conflict() => new("日报任务已变化，请重新加载后重试。");

    internal static string CatalogMutexName() => CatalogMutexName(NormalizeDirectory());
    private static string NormalizeDirectory() =>
        Path.TrimEndingDirectorySeparator(Path.GetFullPath(FolderPath)).ToUpperInvariant();
    internal static string CatalogMutexName(string directory)
    {
        directory = Path.TrimEndingDirectorySeparator(Path.GetFullPath(directory)).ToUpperInvariant();
        return @"Local\ProductionAssistant.DailyReportCatalog." +
            Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(directory)));
    }

    private static T WithCatalogLock<T>(Func<string, T> action)
    {
        // Lock order: StartupMigration -> catalog -> notification. Never await or acquire a
        // scheduling lease here. Core methods do not reenter; callbacks must stay synchronous.
        if (_insideCatalogLock) throw new InvalidOperationException("日报目录更新不能嵌套调用。");
        var directory = NormalizeDirectory();
        using var mutex = new Mutex(false, CatalogMutexName(directory));
        var acquired = false;
        try
        {
            try { acquired = mutex.WaitOne(TimeSpan.FromSeconds(5)); }
            catch (AbandonedMutexException) { acquired = true; }
            if (!acquired) throw new IOException("日报配置正在更新，请稍后重试。");
            _insideCatalogLock = true;
            return action(directory);
        }
        finally
        {
            if (acquired)
            {
                _insideCatalogLock = false;
                mutex.ReleaseMutex();
            }
        }
    }

    public static async Task<FileStream> AcquireScheduleLeaseAsync(
        string jobId, TimeSpan? timeout = null, CancellationToken cancellationToken = default)
    {
        if (_insideCatalogLock) throw new InvalidOperationException("不能在日报目录锁内等待调度协调。");
        var directory = NormalizeDirectory();
        Directory.CreateDirectory(directory);
        var hash = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(jobId)));
        var path = Path.Combine(directory, $"daily-report-schedule-{hash}.lock");
        var started = Stopwatch.GetTimestamp();
        var limit = timeout ?? TimeSpan.FromSeconds(5);
        while (true)
        {
            cancellationToken.ThrowIfCancellationRequested();
            try { return new FileStream(path, FileMode.OpenOrCreate, FileAccess.ReadWrite, FileShare.None); }
            catch (IOException ex) when ((ex.HResult & 0xffff) is 32 or 33)
            {
                if (Stopwatch.GetElapsedTime(started) >= limit)
                    throw new IOException("日报任务调度正在更新，请稍后重试。", ex);
                await Task.Delay(TimeSpan.FromMilliseconds(25), cancellationToken);
            }
        }
        // Keep the coordination file: deleting it could let another process lock a different file.
    }

    private static string? ReadIfPresent(string path)
    {
        try { return File.ReadAllText(path); }
        catch (FileNotFoundException) { return null; }
        catch (DirectoryNotFoundException) { return null; }
    }

    private static DailyReportJobCatalog LoadCatalogCore(string directory)
    {
        try
        {
            var json = ReadIfPresent(Path.Combine(directory, "daily-report-jobs.json"));
            if (json is null)
            {
                var migrated = MigrateLegacy(directory);
                if (migrated.Jobs.Count > 0) SaveCatalogCore(directory, migrated);
                return migrated;
            }
            using var document = JsonDocument.Parse(json);
            if (document.RootElement.ValueKind != JsonValueKind.Object) throw new JsonException();
            var catalog = JsonSerializer.Deserialize<DailyReportJobCatalog>(json) ?? throw new JsonException();
            Validate(catalog, allowMissingIds: true);
            var before = Serialize(catalog);
            var missingIds = document.RootElement.TryGetProperty("Jobs", out var jobs) &&
                jobs.EnumerateArray().Any(job => !job.TryGetProperty("Id", out _));
            foreach (var job in catalog.Jobs) Migrate(job);
            Validate(catalog);
            // Validate the complete catalog before importing any credentials. A failed import
            // must leave legacy notification properties in the original catalog.
            var hadLegacyNotification = ImportLegacyNotification(document.RootElement);
            if (missingIds || hadLegacyNotification || before != Serialize(catalog))
                SaveCatalogCore(directory, catalog);
            return catalog;
        }
        catch (JsonException ex)
        {
            throw new InvalidOperationException("日报配置文件损坏，请修复或恢复备份后重试。", ex);
        }
    }

    private static void Validate(DailyReportJobCatalog catalog, bool allowMissingIds = false)
    {
        if (catalog.Jobs is null) throw new JsonException();
        foreach (var job in catalog.Jobs)
        {
            if (job is null || job.Name is null || job.SendTime is null ||
                job.DraftTemplate is null || job.DraftTemplateDocument is null ||
                job.ActiveTemplate is null || job.ActiveTemplateDocument is null ||
                job.Sources is null || job.Fields is null || job.MetricSourceIds is null ||
                job.Sources.Any(source => source is null) ||
                job.Fields.Any(field => field is null || field.Token is null || field.Placeholder is null) ||
                job.MetricSourceIds.Any(id => id is null) ||
                (!allowMissingIds && string.IsNullOrWhiteSpace(job.Id)))
                throw new JsonException();
        }
        var ids = catalog.Jobs.Where(job => !string.IsNullOrWhiteSpace(job.Id)).Select(job => job.Id).ToArray();
        if (ids.Distinct(StringComparer.Ordinal).Count() != ids.Length) throw new JsonException();
    }

    private static void SaveCatalogCore(string directory, DailyReportJobCatalog catalog)
    {
        Directory.CreateDirectory(directory);
        AtomicWrite(Path.Combine(directory, "daily-report-jobs.json"), Serialize(catalog));
    }

    public static bool UpdateTemplate(DailyReportJob job, string text, string document)
    {
        if (job.DraftTemplate == text && job.DraftTemplateDocument == document) return false;
        job.DraftTemplate = text;
        job.DraftTemplateDocument = document;
        // Keep the legacy execution snapshot in sync with saved content; testing is independent.
        job.ActiveTemplate = text;
        job.ActiveTemplateDocument = document;
        job.ActiveTemplateVersion++;
        job.ConfigurationValidated = false;
        return true;
    }

    public static bool DeleteJob(string jobId)
    {
        using var lease = AcquireScheduleLeaseAsync(jobId).GetAwaiter().GetResult();
        var removed = DeleteJobUnderLease(jobId);
        if (removed) DeleteRunRecords(jobId);
        return removed;
    }

    internal static bool DeleteJobUnderLease(string jobId, DailyReportJob? expected = null) => UpdateCatalog(catalog =>
    {
        var job = catalog.Jobs.SingleOrDefault(item => item.Id == jobId);
        if (job is null) return false;
        if (expected is not null && (job.IsEnabled != expected.IsEnabled || job.SendTime != expected.SendTime))
            throw Conflict();
        if (job.IsEnabled) throw new InvalidOperationException("请先停用任务，再删除配置和运行记录。");
        catalog.Jobs.Remove(job);
        return true;
    });

    internal static void DeleteRunRecords(string jobId)
    {
        // Never acquire the runs mutex while owning the catalog mutex.
        RunsMutex.WaitOne();
        try { SaveRunRecords(LoadRunRecords().Where(record => record.JobId != jobId)); }
        finally { RunsMutex.ReleaseMutex(); }
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
        var existing = fields.FirstOrDefault(field =>
            field.Token.DataSourceId == token.DataSourceId &&
            field.Token.PropertyId == token.PropertyId &&
            field.Token.ViewId == token.ViewId &&
            field.Token.PeriodKind == token.PeriodKind &&
            field.Token.QueryMode == token.QueryMode &&
            field.Token.DatePropertyId == token.DatePropertyId &&
            field.Token.QueryRangeKind == token.QueryRangeKind &&
            field.Token.DateRangeSpec == token.DateRangeSpec &&
            field.Token.FilterPropertyId == token.FilterPropertyId &&
            field.Token.FilterValue == token.FilterValue &&
            field.Token.ExactMatchPropertyId == token.ExactMatchPropertyId);
        if (existing is not null) { existing.Token = token; return existing.Placeholder; }
        var source = token.DataSourceName.Replace('"', '\'');
        var property = token.PropertyName.Replace('"', '\'');
        var scope = token.PeriodKind switch
        {
            "day" => "日 · ",
            "month" => "月 · ",
            "year" => "年 · ",
            "direct-month" => "月计划 · ",
            "view-sum" => "累计 · ",
            _ when !string.IsNullOrWhiteSpace(token.ViewName) => $"{token.ViewName.Replace('"', '\'')} · ",
            _ => string.Empty
        };
        var basePlaceholder = $"prop(\"{scope}{source} · {property}\")";
        var placeholder = basePlaceholder;
        for (var suffix = 2; fields.Any(field => field.Placeholder == placeholder); suffix++)
            placeholder = $"prop(\"{source} · {property} {suffix}\")";
        fields.Add(new() { Placeholder = placeholder, Token = token });
        return placeholder;
    }

    private static DailyReportJobCatalog MigrateLegacy(string directory)
    {
        var json = ReadIfPresent(Path.Combine(directory, "daily-report-settings.json"));
        if (json is null) return new();
        var old = JsonSerializer.Deserialize<DailyReportSettings>(json) ?? throw new JsonException();
        Validate(new() { Jobs = [new()
        {
            DraftTemplate = old.DraftTemplate, DraftTemplateDocument = old.DraftTemplateDocument,
            ActiveTemplate = old.ActiveTemplate, ActiveTemplateDocument = old.ActiveTemplateDocument,
            Sources = old.Sources, Fields = old.Fields, SendTime = old.SendTime
        }] });
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

    private static bool ImportLegacyNotification(JsonElement root)
    {
        if (!root.TryGetProperty("Jobs", out var jobs)) return false;
        var hadLegacyProperties = false;
        foreach (var job in jobs.EnumerateArray())
        {
            var hasWebhook = job.TryGetProperty("EncryptedWebhook", out var webhookValue);
            var hasSecret = job.TryGetProperty("EncryptedSecret", out var secretValue);
            hadLegacyProperties |= hasWebhook || hasSecret;
            if ((hasWebhook && webhookValue.ValueKind is not (JsonValueKind.String or JsonValueKind.Null)) ||
                (hasSecret && secretValue.ValueKind is not (JsonValueKind.String or JsonValueKind.Null)))
                throw new JsonException();
        }
        foreach (var job in jobs.EnumerateArray())
        {
            var webhook = job.TryGetProperty("EncryptedWebhook", out var value) ? value.GetString() ?? "" : "";
            var secret = job.TryGetProperty("EncryptedSecret", out value) ? value.GetString() ?? "" : "";
            if (string.IsNullOrWhiteSpace(webhook) && string.IsNullOrWhiteSpace(secret)) continue;
            NotificationSettingsStore.ImportLegacy(webhook, secret);
            break;
        }
        return hadLegacyProperties;
    }

    private static void SaveRunRecords(IEnumerable<DailyReportRunRecord> records)
    {
        Directory.CreateDirectory(FolderPath);
        AtomicWrite(RunsPath, JsonSerializer.Serialize(records, JsonOptions));
    }

    private static void AtomicWrite(string path, string json)
    {
        var temporary = path + "." + Guid.NewGuid().ToString("N") + ".tmp";
        try
        {
            using (var file = new FileStream(temporary, FileMode.CreateNew, FileAccess.Write, FileShare.None))
            {
                var bytes = Encoding.UTF8.GetBytes(json);
                file.Write(bytes);
                file.Flush(true);
            }
            File.Move(temporary, path, true);
        }
        finally
        {
            try { File.Delete(temporary); }
            catch (IOException) { }
            catch (UnauthorizedAccessException) { }
        }
    }
}
