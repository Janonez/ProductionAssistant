using System.Text.Json;
using System.Text.RegularExpressions;
using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public static class DailyReportSettingsStore
{
    private static readonly JsonSerializerOptions JsonOptions = new() { WriteIndented = true };
    private static readonly string FolderPath = Path.Combine(
        Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
        "ProductionAssistant");
    private static readonly string SettingsPath = Path.Combine(FolderPath, "daily-report-settings.json");
    private static readonly string StatePath = Path.Combine(FolderPath, "daily-report-state.json");

    public static DailyReportSettings Load()
    {
        try
        {
            var settings = File.Exists(SettingsPath)
                ? JsonSerializer.Deserialize<DailyReportSettings>(File.ReadAllText(SettingsPath)) ?? new()
                : new();
            if (Migrate(settings))
                AtomicWrite(SettingsPath, JsonSerializer.Serialize(settings, JsonOptions));
            return settings;
        }
        catch
        {
            return new();
        }
    }

    public static void Save(DailyReportSettings settings, string webhook, string secret)
    {
        Directory.CreateDirectory(FolderPath);
        settings.EncryptedWebhook = string.IsNullOrWhiteSpace(webhook)
            ? settings.EncryptedWebhook
            : WindowsTokenProtector.Protect(webhook.Trim());
        settings.EncryptedSecret = string.IsNullOrWhiteSpace(secret)
            ? settings.EncryptedSecret
            : WindowsTokenProtector.Protect(secret.Trim());
        AtomicWrite(SettingsPath, JsonSerializer.Serialize(settings, JsonOptions));
    }

    public static string ReadWebhook(DailyReportSettings settings) =>
        Unprotect(settings.EncryptedWebhook);

    public static string ReadSecret(DailyReportSettings settings) =>
        Unprotect(settings.EncryptedSecret);

    public static DailyReportRunState LoadState()
    {
        try
        {
            return File.Exists(StatePath)
                ? JsonSerializer.Deserialize<DailyReportRunState>(File.ReadAllText(StatePath)) ?? new()
                : new();
        }
        catch
        {
            return new();
        }
    }

    public static void SaveState(DailyReportRunState state)
    {
        Directory.CreateDirectory(FolderPath);
        AtomicWrite(StatePath, JsonSerializer.Serialize(state, JsonOptions));
    }

    public static string EncodeToken(DailyReportFieldToken token) =>
        Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(JsonSerializer.Serialize(token)))
            .Insert(0, "{{report:") + "}}";

    public static bool TryDecodeToken(string encoded, out DailyReportFieldToken? token)
    {
        token = null;
        if (!encoded.StartsWith("{{report:", StringComparison.Ordinal) ||
            !encoded.EndsWith("}}", StringComparison.Ordinal)) return false;
        try
        {
            var json = System.Text.Encoding.UTF8.GetString(Convert.FromBase64String(encoded[9..^2]));
            token = JsonSerializer.Deserialize<DailyReportFieldToken>(json);
            return token is not null;
        }
        catch
        {
            return false;
        }
    }

    public static string AddOrUpdateField(
        DailyReportSettings settings,
        DailyReportFieldToken token)
    {
        var existing = settings.Fields.FirstOrDefault(field =>
            field.Token.DataSourceId == token.DataSourceId &&
            field.Token.PropertyId == token.PropertyId);
        if (existing is not null)
        {
            existing.Token = token;
            return existing.Placeholder;
        }

        var source = token.DataSourceName.Replace('"', '\'');
        var property = token.PropertyName.Replace('"', '\'');
        var basePlaceholder = $"prop(\"{source} · {property}\")";
        var placeholder = basePlaceholder;
        for (var suffix = 2; settings.Fields.Any(field => field.Placeholder == placeholder); suffix++)
            placeholder = $"prop(\"{source} · {property} {suffix}\")";
        settings.Fields.Add(new DailyReportFieldDefinition { Placeholder = placeholder, Token = token });
        return placeholder;
    }

    public static string MaskWebhook(DailyReportSettings settings)
    {
        var value = ReadWebhook(settings);
        if (!Uri.TryCreate(value, UriKind.Absolute, out var uri)) return "未配置";
        var token = uri.Query.TrimStart('?').Split('&', StringSplitOptions.RemoveEmptyEntries)
            .Select(part => part.Split('=', 2))
            .FirstOrDefault(part => part.Length == 2 &&
                part[0].Equals("access_token", StringComparison.OrdinalIgnoreCase))?[1];
        var tail = string.IsNullOrWhiteSpace(token) ? "****" : $"****{token[^Math.Min(4, token.Length)..]}";
        return $"{uri.Scheme}://{uri.Host}{uri.AbsolutePath}?access_token={tail}";
    }

    public static string MaskSecret(DailyReportSettings settings)
    {
        var value = ReadSecret(settings);
        return string.IsNullOrWhiteSpace(value)
            ? "未配置"
            : $"{value[..Math.Min(3, value.Length)]}****{value[^Math.Min(4, value.Length)..]}";
    }

    private static string Unprotect(string value)
    {
        try { return WindowsTokenProtector.Unprotect(value); }
        catch { return string.Empty; }
    }

    private static bool Migrate(DailyReportSettings settings)
    {
        var changed = false;
        foreach (var source in settings.Sources)
        {
            if (string.IsNullOrWhiteSpace(source.MatchPropertyName) &&
                !string.IsNullOrWhiteSpace(source.DatePropertyName))
            {
                source.MatchPropertyId = source.DatePropertyId;
                source.MatchPropertyName = source.DatePropertyName;
                source.MatchPropertyType = "date";
                source.PeriodKind = "day";
                changed = true;
            }
        }
        settings.DraftTemplate = MigrateTemplate(settings, settings.DraftTemplate, ref changed);
        settings.ActiveTemplate = MigrateTemplate(settings, settings.ActiveTemplate, ref changed);
        return changed;
    }

    private static string MigrateTemplate(
        DailyReportSettings settings,
        string template,
        ref bool changed)
    {
        foreach (Match match in Regex.Matches(template, @"\{\{report:[A-Za-z0-9+/=]+\}\}"))
        {
            if (!TryDecodeToken(match.Value, out var token) || token is null) continue;
            template = template.Replace(match.Value, AddOrUpdateField(settings, token), StringComparison.Ordinal);
            changed = true;
        }
        return template;
    }

    private static void AtomicWrite(string path, string json)
    {
        var temporary = path + ".tmp";
        File.WriteAllText(temporary, json);
        File.Move(temporary, path, true);
    }
}
