using System.Text.Json;
using System.Text.Json.Serialization;

namespace ProductionAssistant.Services;

public sealed class NotionSettings
{
    public int ConfigVersion { get; set; } = 2;

    [JsonIgnore]
    public string Token { get; set; } = string.Empty;

    public string EncryptedToken { get; set; } = string.Empty;
    public string RootPageId { get; set; } = string.Empty;
    public string ActiveTargetId { get; set; } = string.Empty;
    public List<NotionTargetSettings> Targets { get; set; } = [];
    public List<NotionDataSourceOption> CachedDataSources { get; set; } = [];
    public DateTime? DataSourcesCachedAtUtc { get; set; }

    public NotionTargetSettings? ActiveTarget =>
        Targets.FirstOrDefault(target => target.Id == ActiveTargetId) ?? Targets.FirstOrDefault();
}

public sealed class NotionTargetSettings
{
    public string ModuleKey { get; set; } = string.Empty;
    public string ModuleName { get; set; } = string.Empty;
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Path { get; set; } = string.Empty;
    public string TitleProperty { get; set; } = string.Empty;
    public string DateProperty { get; set; } = string.Empty;
    public string QuantityProperty { get; set; } = string.Empty;
    public Dictionary<string, string> PropertyMappings { get; set; } = [];
    [JsonIgnore]
    public string BindingLabel =>
        $"{(string.IsNullOrWhiteSpace(ModuleName) ? "未绑定模块" : ModuleName)}  →  {Path}";

    public override string ToString() => string.IsNullOrWhiteSpace(Path) ? Name : Path;
}

public static class NotionSettingsStore
{
    private static readonly string FolderPath = Path.Combine(
        Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
        "ProductionAssistant");
    private static readonly string FilePath = Path.Combine(FolderPath, "notion-settings.json");
    private static readonly string BackupPath = Path.Combine(FolderPath, "notion-settings.backup.json");

    public static NotionSettings Load()
    {
        try
        {
            if (!File.Exists(FilePath)) return new NotionSettings();
            var json = File.ReadAllText(FilePath);
            var settings = JsonSerializer.Deserialize<NotionSettings>(json) ?? new NotionSettings();

            if (!string.IsNullOrWhiteSpace(settings.EncryptedToken))
                settings.Token = WindowsTokenProtector.Unprotect(settings.EncryptedToken);
            else
                settings.Token = ReadLegacyToken(json);

            MigrateLegacyTarget(json, settings);
            var moduleMigrated = MigrateModuleBinding(settings);
            if (moduleMigrated ||
                (!string.IsNullOrWhiteSpace(settings.Token) &&
                 string.IsNullOrWhiteSpace(settings.EncryptedToken)))
                Save(settings);
            return settings;
        }
        catch
        {
            return LoadBackup();
        }
    }

    public static void Save(NotionSettings settings)
    {
        Directory.CreateDirectory(FolderPath);
        settings.ConfigVersion = 2;
        settings.EncryptedToken = string.IsNullOrWhiteSpace(settings.Token)
            ? string.Empty
            : WindowsTokenProtector.Protect(settings.Token);
        var json = JsonSerializer.Serialize(settings, new JsonSerializerOptions
        {
            WriteIndented = true
        });

        var temporaryPath = FilePath + ".tmp";
        File.WriteAllText(temporaryPath, json);
        if (File.Exists(FilePath))
            File.Copy(FilePath, BackupPath, true);
        File.Move(temporaryPath, FilePath, true);
    }

    private static NotionSettings LoadBackup()
    {
        try
        {
            if (!File.Exists(BackupPath)) return new NotionSettings();
            var settings = JsonSerializer.Deserialize<NotionSettings>(
                File.ReadAllText(BackupPath)) ?? new NotionSettings();
            settings.Token = WindowsTokenProtector.Unprotect(settings.EncryptedToken);
            return settings;
        }
        catch
        {
            return new NotionSettings();
        }
    }

    private static string ReadLegacyToken(string json)
    {
        using var document = JsonDocument.Parse(json);
        return document.RootElement.TryGetProperty("Token", out var token)
            ? token.GetString() ?? string.Empty
            : string.Empty;
    }

    private static void MigrateLegacyTarget(string json, NotionSettings settings)
    {
        if (settings.Targets.Count > 0) return;
        using var document = JsonDocument.Parse(json);
        var root = document.RootElement;
        var dataSourceId = Read(root, "DataSourceId");
        if (string.IsNullOrWhiteSpace(dataSourceId)) return;
        var target = new NotionTargetSettings
        {
            Id = dataSourceId,
            Name = "原 Notion 数据源",
            Path = "原 Notion 数据源",
            TitleProperty = Read(root, "TitleProperty"),
            DateProperty = Read(root, "DateProperty"),
            QuantityProperty = Read(root, "QuantityProperty")
        };
        settings.Targets.Add(target);
        settings.ActiveTargetId = target.Id;
    }

    private static bool MigrateModuleBinding(NotionSettings settings)
    {
        if (settings.Targets.Any(target => target.ModuleKey == "daily-weld-simulation"))
            return false;
        var target = settings.ActiveTarget;
        if (target is null) return false;
        target.ModuleKey = "daily-weld-simulation";
        target.ModuleName = "每日焊接数据模拟";
        return true;
    }

    private static string Read(JsonElement root, string name) =>
        root.TryGetProperty(name, out var value) ? value.GetString() ?? string.Empty : string.Empty;
}
