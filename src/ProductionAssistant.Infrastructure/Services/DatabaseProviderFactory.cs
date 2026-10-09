namespace ProductionAssistant.Services;

public static class DatabaseProviderFactory
{
    /// <summary>开关默认关闭；显式选择 Teable 后错误向上传递，不回退到 Notion 混用两份数据。</summary>
    public static IDatabaseQueryProvider Create(INotionImportService? notion = null)
    {
        var settings = TeableQuerySettingsStore.Load();
        return settings.Enabled ? new TeableDatabaseQueryProvider(settings) : new NotionDatabaseQueryProvider(notion: notion);
    }
}
