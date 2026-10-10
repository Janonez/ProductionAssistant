using ProductionAssistant.Services;
using Xunit;

public sealed class TeableDefaultsTests
{
    [Theory]
    [InlineData(false)]
    [InlineData(true)]
    public async Task Missing_or_disabled_legacy_switches_never_select_notion(bool existingMapping)
    {
        var root = Path.Combine(Path.GetTempPath(), "TeableDefaults", Guid.NewGuid().ToString("N"));
        var previous = Environment.GetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR");
        Environment.SetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR", root);
        try
        {
            Directory.CreateDirectory(RuntimeEnvironment.DataDirectory);
            // 若默认入口误读旧配置，测试立即失败；旧文件必须原样保留。
            var originalPath = Path.Combine(RuntimeEnvironment.DataDirectory, "notion-settings.json");
            File.WriteAllText(originalPath, "legacy-config-must-not-be-read-or-overwritten");
            if (existingMapping) TeableQuerySettingsStore.Save(new(false, [], false));

            Assert.IsType<TeableDatabaseQueryProvider>(DatabaseProviderFactory.Create());
            var discovery = await BusinessImportFactory.Create().DiscoverAsync("", "");
            Assert.True(discovery.Succeeded);
            Assert.Empty(discovery.DataSources);
            var settings = BusinessDatabaseSettingsStore.Load();
            Assert.True(settings.UsesTeable);
            Assert.False(settings.ConnectionConfigured);
            Assert.Empty(TeableSettingsStore.Load().Token);
            BusinessDatabaseSettingsStore.Save(settings);
            Assert.True(File.Exists(BusinessDatabaseSettingsStore.FilePath));
            Assert.Equal("legacy-config-must-not-be-read-or-overwritten", File.ReadAllText(originalPath));
        }
        finally
        {
            Environment.SetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR", previous);
            Directory.Delete(root, true);
        }
    }
}
