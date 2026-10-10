using System.Text.Json;

namespace ProductionAssistant.Services;

/// <summary>Teable 与 Notion 的业务绑定分开存储；切换不会覆盖原 Token、目标或缓存。</summary>
public static class BusinessDatabaseSettingsStore
{
    public static bool UsesTeable => TeableQuerySettingsStore.Load().WritesEnabled;
    public static string FilePath => Path.Combine(RuntimeEnvironment.DataDirectory, "teable-business-bindings.json");

    public static NotionSettings Load()
    {
        if (!UsesTeable) return NotionSettingsStore.Load();
        if (!File.Exists(FilePath)) throw new InvalidOperationException("请先初始化 Teable 业务绑定。");
        var settings = JsonSerializer.Deserialize<NotionSettings>(File.ReadAllText(FilePath))
            ?? throw new InvalidOperationException("Teable 业务绑定无效。");
        settings.UsesTeable = true;
        settings.Token = settings.EncryptedToken = "";
        return settings;
    }

    public static void Save(NotionSettings settings)
    {
        if (!settings.UsesTeable) { NotionSettingsStore.Save(settings); return; }
        if (!string.IsNullOrEmpty(settings.Token) || !string.IsNullOrEmpty(settings.EncryptedToken))
            throw new InvalidOperationException("Teable 业务绑定不可包含 Notion 凭据。");
        Directory.CreateDirectory(RuntimeEnvironment.DataDirectory);
        File.WriteAllText(FilePath + ".tmp", JsonSerializer.Serialize(settings, new JsonSerializerOptions { WriteIndented = true }));
        File.Move(FilePath + ".tmp", FilePath, true);
    }

    public static NotionSettings Import(string sourceBindingsPath, TeableQuerySettings mapping)
    {
        // 仅迁移业务绑定，不解密也不复制原 Notion 凭据。
        var original = JsonSerializer.Deserialize<NotionSettings>(File.ReadAllText(sourceBindingsPath)) ?? new();
        var settings = new NotionSettings
        {
            UsesTeable = true,
            Targets = original.Targets.Where(target => mapping.Sources.Any(source => source.Id == target.Id)).ToList(),
            CachedDataSources = mapping.Sources.Select(source => new NotionDataSourceOption(source.Id, source.Name, source.Path)).ToList(),
            DataSourcesCachedAtUtc = DateTime.UtcNow,
            ActiveTargetId = original.ActiveTargetId
        };
        return settings;
    }
}

public static class BusinessImportFactory
{
    public static INotionImportService Create()
    {
        var mapping = TeableQuerySettingsStore.Load();
        return mapping.WritesEnabled
            ? new NotionImportService(settings: BusinessDatabaseSettingsStore.Load, teable: new TeableBusinessStore(mapping))
            : new NotionImportService();
    }
}
