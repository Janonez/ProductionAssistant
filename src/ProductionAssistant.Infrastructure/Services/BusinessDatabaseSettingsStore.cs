using System.Text.Json;

namespace ProductionAssistant.Services;

/// <summary>正式业务绑定单独保存；原 Notion 配置仅供迁移和旧版本恢复使用。</summary>
public static class BusinessDatabaseSettingsStore
{
    public static bool UsesTeable => true;
    public static string FilePath => Path.Combine(RuntimeEnvironment.DataDirectory, "teable-business-bindings.json");

    public static NotionSettings Load()
    {
        // 首次安装允许打开设置；缺少绑定时由业务入口提示初始化，不读取旧数据库。
        if (!File.Exists(FilePath)) return new() { UsesTeable = true, TeableConfigured = false };
        var settings = JsonSerializer.Deserialize<NotionSettings>(File.ReadAllText(FilePath))
            ?? throw new InvalidOperationException("Teable 业务绑定无效。");
        settings.UsesTeable = true;
        settings.TeableConfigured = !string.IsNullOrWhiteSpace(TeableSettingsStore.Load().Token);
        settings.Token = settings.EncryptedToken = "";
        return settings;
    }

    public static void Save(NotionSettings settings)
    {
        settings.UsesTeable = true;
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
        return new NotionImportService(settings: BusinessDatabaseSettingsStore.Load, teable: new TeableBusinessStore(mapping));
    }
}
