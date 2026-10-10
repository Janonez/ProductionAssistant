namespace ProductionAssistant.Services;

public static class DatabaseProviderFactory
{
    /// <summary>正式业务统一使用 Teable；保留原 ID 映射，配置缺失或请求失败均不能回退到旧数据库。</summary>
    public static IDatabaseQueryProvider Create()
    {
        var settings = TeableQuerySettingsStore.Load();
        return new TeableDatabaseQueryProvider(settings);
    }
}
