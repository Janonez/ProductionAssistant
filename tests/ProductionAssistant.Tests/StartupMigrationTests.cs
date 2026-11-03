using System.Text.Json;
using ProductionAssistant.Models;
using ProductionAssistant.Services;
using Xunit;

namespace ProductionAssistant.Tests;

public sealed class StartupMigrationTests : IDisposable
{
    private const string Placeholder = "legacy-template-placeholder";
    private readonly string? _original = Environment.GetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR");
    private readonly string _folder = Path.Combine(Path.GetTempPath(), "StartupMigrationTests", Guid.NewGuid().ToString("N"));
    private string DataDirectory => RuntimeEnvironment.DataDirectory;
    private string JobsPath => Path.Combine(DataDirectory, "daily-report-jobs.json");
    private string LegacyPath => Path.Combine(DataDirectory, "daily-report-settings.json");
    private string NotificationPath => Path.Combine(DataDirectory, "notification-settings.json");
    private string ReportPath => Path.Combine(DataDirectory, "report-center.yaml");

    public StartupMigrationTests()
    {
        Environment.SetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR", _folder);
        Directory.CreateDirectory(DataDirectory);
    }

    public void Dispose()
    {
        Environment.SetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR", _original);
        if (Directory.Exists(_folder)) Directory.Delete(_folder, true);
    }

    [Fact]
    public void Empty_legacy_notification_properties_are_removed_only_once()
    {
        WriteLegacyCatalog();
        Assert.True(StartupMigration.Run());
        var first = File.ReadAllBytes(JobsPath);
        var json = File.ReadAllText(JobsPath);
        Assert.DoesNotContain("EncryptedWebhook", json);
        Assert.DoesNotContain("EncryptedSecret", json);
        Assert.True(StartupMigration.Run());
        Assert.Equal(first, File.ReadAllBytes(JobsPath));
    }

    [Fact]
    public void Legacy_notification_ciphertext_is_imported_only_once()
    {
        WriteLegacyCatalog("legacy-webhook-placeholder", "legacy-secret-placeholder");
        Assert.True(StartupMigration.Run());
        Assert.True(File.Exists(NotificationPath));
        var jobs = File.ReadAllBytes(JobsPath);
        var notification = File.ReadAllBytes(NotificationPath);
        Assert.True(StartupMigration.Run());
        Assert.Equal(jobs, File.ReadAllBytes(JobsPath));
        Assert.Equal(notification, File.ReadAllBytes(NotificationPath));
    }

    [Fact]
    public void Legacy_settings_create_a_stable_job_without_changing_the_old_file()
    {
        WriteLegacySettings();
        var original = File.ReadAllBytes(LegacyPath);
        Assert.True(StartupMigration.Run());
        Assert.True(File.Exists(JobsPath));
        Assert.Contains("legacy-production-message-tower-daily", File.ReadAllText(JobsPath));
        Assert.Equal(original, File.ReadAllBytes(LegacyPath));
        var jobs = File.ReadAllBytes(JobsPath);
        Assert.True(StartupMigration.Run());
        Assert.Equal(jobs, File.ReadAllBytes(JobsPath));
        Assert.Equal(original, File.ReadAllBytes(LegacyPath));
    }

    [Fact]
    public void Missing_report_config_is_created_only_once()
    {
        Assert.False(File.Exists(ReportPath));
        Assert.True(StartupMigration.Run());
        Assert.True(File.Exists(ReportPath));
        var first = File.ReadAllBytes(ReportPath);
        Assert.True(StartupMigration.Run());
        Assert.Equal(first, File.ReadAllBytes(ReportPath));
    }

    [Fact]
    public void Empty_directory_does_not_create_jobs_or_notification_settings()
    {
        Assert.True(StartupMigration.Run());
        Assert.False(File.Exists(JobsPath));
        Assert.False(File.Exists(NotificationPath));
    }

    [Fact]
    public void Invalid_catalog_does_not_escape_or_change_the_file()
    {
        File.WriteAllText(JobsPath, "{invalid-json");
        var original = File.ReadAllBytes(JobsPath);
        Assert.True(StartupMigration.Run());
        Assert.Equal(original, File.ReadAllBytes(JobsPath));
    }

    [Fact]
    public void Eight_threads_produce_the_same_catalog_as_one_run()
    {
        WriteLegacySettings();
        Assert.True(StartupMigration.Run());
        var expected = File.ReadAllBytes(JobsPath);
        File.Delete(JobsPath);
        using var start = new ManualResetEventSlim();
        var errors = new Exception?[8];
        var results = new bool[8];
        var threads = Enumerable.Range(0, 8).Select(index => new Thread(() =>
        {
            start.Wait();
            try { results[index] = StartupMigration.Run(); }
            catch (Exception ex) { errors[index] = ex; }
        })).ToArray();
        foreach (var thread in threads) thread.Start();
        start.Set();
        foreach (var thread in threads) thread.Join();
        Assert.All(errors, error => Assert.Null(error));
        Assert.All(results, result => Assert.True(result));
        Assert.Equal(expected, File.ReadAllBytes(JobsPath));
    }

    [Fact]
    public void Another_thread_holding_the_mutex_causes_a_logged_timeout()
    {
        using var acquired = new ManualResetEventSlim();
        using var release = new ManualResetEventSlim();
        Exception? holderError = null;
        var holder = new Thread(() =>
        {
            using var mutex = new Mutex(false, StartupMigration.MutexName());
            var ownsMutex = false;
            try
            {
                ownsMutex = mutex.WaitOne();
                acquired.Set();
                release.Wait();
            }
            catch (Exception ex)
            {
                holderError = ex;
                acquired.Set();
            }
            finally
            {
                if (ownsMutex) mutex.ReleaseMutex();
            }
        });
        holder.Start();
        try
        {
            Assert.True(acquired.Wait(TimeSpan.FromSeconds(10)));
            Assert.Null(holderError);
            var logs = new List<string>();
            Assert.False(StartupMigration.Run(logs.Add, TimeSpan.FromMilliseconds(100)));
            Assert.Contains("startup-migration-skipped-lock-timeout", logs);
        }
        finally
        {
            release.Set();
            holder.Join();
        }
    }

    [Theory]
    [InlineData(false)]
    [InlineData(true)]
    public void Migration_logs_do_not_contain_paths_or_placeholder_data(bool legacySettings)
    {
        if (legacySettings) WriteLegacySettings(); else WriteLegacyCatalog();
        var logs = new List<string>();
        Assert.True(StartupMigration.Run(logs.Add));
        Assert.Equal("startup-migration-ran", Assert.Single(logs));
        Assert.All(logs, message =>
        {
            Assert.DoesNotContain(_folder, message);
            Assert.DoesNotContain(DataDirectory, message);
            Assert.DoesNotContain(Placeholder, message);
        });
    }

    [Fact]
    public void Report_failure_is_contained_and_logs_only_the_exception_type()
    {
        Directory.CreateDirectory(ReportPath);
        var logs = new List<string>();
        Assert.True(StartupMigration.Run(logs.Add));
        Assert.Equal(2, logs.Count);
        Assert.Matches("^startup-migration-step-failed-[A-Za-z][A-Za-z0-9]*Exception$", logs[0]);
        Assert.Equal("startup-migration-ran", logs[1]);
        Assert.All(logs, message => Assert.DoesNotContain(_folder, message));
    }

    private void WriteLegacyCatalog(string webhook = "", string secret = "") =>
        File.WriteAllText(JobsPath, JsonSerializer.Serialize(new
        {
            Jobs = new[] { new { Id = Placeholder, EncryptedWebhook = webhook, EncryptedSecret = secret } }
        }));

    private void WriteLegacySettings() => File.WriteAllText(LegacyPath,
        JsonSerializer.Serialize(new DailyReportSettings { DraftTemplate = Placeholder }));
}
