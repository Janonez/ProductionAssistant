using ProductionAssistant.Services;
using Xunit;

namespace ProductionAssistant.Tests;

public sealed class RuntimeEnvironmentTests
{
    [Fact]
    public void Development_and_production_have_separate_state_and_scheduler_defaults()
    {
        var root = Path.Combine(Path.GetTempPath(), "ProductionAssistant.RuntimeTests", Guid.NewGuid().ToString("N"));
        Directory.CreateDirectory(root);
        try
        {
            File.WriteAllText(Path.Combine(root, "appsettings.Development.json"),
                "{ \"Scheduler\": { \"Enabled\": false } }");
            File.WriteAllText(Path.Combine(root, "appsettings.Production.json"),
                "{ \"Scheduler\": { \"Enabled\": true } }");
            var development = RuntimeEnvironment.Resolve([], "Development", root, root);
            var production = RuntimeEnvironment.Resolve([], "Production", root, root);

            Assert.Equal(RuntimeEnvironment.Development, development.Name);
            Assert.False(development.SchedulerEnabled);
            Assert.Equal(Path.Combine(root, "ProductionAssistant", "Development"), development.DefaultDataDirectory);
            Assert.Equal(RuntimeEnvironment.Production, production.Name);
            Assert.True(production.SchedulerEnabled);
            Assert.Equal(Path.Combine(root, "ProductionAssistant"), production.DefaultDataDirectory);
            Assert.NotEqual(development.DefaultDataDirectory, production.DefaultDataDirectory);
        }
        finally
        {
            Directory.Delete(root, true);
        }
    }

    [Fact]
    public void Explicit_environment_allows_release_build_to_run_as_development()
    {
        var resolved = RuntimeEnvironment.Resolve(
            ["ProductionAssistant.exe", "--environment", "Development"],
            "Production",
            AppContext.BaseDirectory,
            Path.GetTempPath());

        Assert.Equal(RuntimeEnvironment.Development, resolved.Name);
        Assert.Equal("command line", resolved.Source);
        Assert.False(resolved.SchedulerEnabled);
    }

    [Fact]
    public void Deployment_marker_selects_environment_without_build_configuration()
    {
        var root = Path.Combine(Path.GetTempPath(), "ProductionAssistant.RuntimeTests", Guid.NewGuid().ToString("N"));
        Directory.CreateDirectory(root);
        try
        {
            File.WriteAllText(Path.Combine(root, "runtime-environment.json"), "{ \"environment\": \"Development\" }");

            var resolved = RuntimeEnvironment.Resolve([], null, root, root);

            Assert.Equal(RuntimeEnvironment.Development, resolved.Name);
            Assert.Equal("runtime-environment.json", resolved.Source);
        }
        finally
        {
            Directory.Delete(root, true);
        }
    }

    [Fact]
    public void Unknown_environment_fails_instead_of_falling_back_to_production()
    {
        Assert.Throws<InvalidOperationException>(() => RuntimeEnvironment.Resolve(
            [], "Staging", AppContext.BaseDirectory, Path.GetTempPath()));
    }

    [Fact]
    public void Startup_summary_uses_the_isolated_log_directory_without_secrets()
    {
        var root = Path.Combine(Path.GetTempPath(), "ProductionAssistant.RuntimeTests", Guid.NewGuid().ToString("N"));
        var original = Environment.GetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR");
        Environment.SetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR", root);
        try
        {
            RuntimeEnvironment.WriteStartupSummary();

            var log = File.ReadAllText(Path.Combine(root, RuntimeEnvironment.Current.Name, "logs", "startup.log"));
            Assert.Contains("Environment:", log);
            Assert.Contains("Scheduler:", log);
            Assert.Contains("Storage:", log);
            Assert.DoesNotContain("Password", log, StringComparison.OrdinalIgnoreCase);
            Assert.DoesNotContain("Webhook", log, StringComparison.OrdinalIgnoreCase);
        }
        finally
        {
            Environment.SetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR", original);
            Directory.Delete(root, true);
        }
    }

    [Fact]
    public void Performance_log_is_written_to_the_isolated_local_log_directory()
    {
        var root = Path.Combine(Path.GetTempPath(), "ProductionAssistant.RuntimeTests", Guid.NewGuid().ToString("N"));
        var original = Environment.GetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR");
        Environment.SetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR", root);
        try
        {
            RuntimeEnvironment.WritePerformanceLog(
                "[Notion] POST data_sources/source/query -> 200 (12 ms)", force: true);

            var path = Path.Combine(root, RuntimeEnvironment.Current.Name, "logs", "notion-performance.log");
            var log = File.ReadAllText(path);
            Assert.Contains("POST data_sources/source/query -> 200 (12 ms)", log);
            Assert.DoesNotContain("Bearer", log, StringComparison.OrdinalIgnoreCase);
        }
        finally
        {
            Environment.SetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR", original);
            Directory.Delete(root, true);
        }
    }
}
