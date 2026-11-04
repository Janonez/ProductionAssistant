using System.Collections.Concurrent;
using System.Diagnostics;
using System.Diagnostics.Tracing;
using System.Net;
using System.Text;
using System.Text.Json;
using System.Threading.Channels;
using ProductionAssistant.Models;
using ProductionAssistant.Services;
using ProductionAssistant.Sidecar;
using Xunit;

namespace ProductionAssistant.Tests;

public sealed class DailyReportLocalConfigurationTests : IDisposable
{
    private readonly string? _original = Environment.GetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR");
    private readonly string _folder = Path.Combine(Path.GetTempPath(), "DailyReportLocalConfigurationTests", Guid.NewGuid().ToString("N"));
    private string JobsPath => Path.Combine(RuntimeEnvironment.DataDirectory, "daily-report-jobs.json");
    private static readonly TimeSpan Deadline = TimeSpan.FromSeconds(20);

    public DailyReportLocalConfigurationTests()
    {
        Assert.True(RuntimeEnvironment.Current.IsDevelopment);
        Assert.False(DailyReportTaskScheduler.IsSchedulingAvailable);
        Environment.SetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR", _folder);
        Directory.CreateDirectory(RuntimeEnvironment.DataDirectory);
    }

    public void Dispose()
    {
        Environment.SetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR", _original);
        if (Directory.Exists(_folder)) Directory.Delete(_folder, true);
    }

    [Fact]
    public async Task Real_host_has_exactly_twenty_three_operations_and_rejects_all_other_fifty_eight()
    {
        string[] expected =
        [
            "production.cancel", "production.getBindings", "weld.getState", "weld.generate",
            "database.getState", "database.getSchema", "database.inspect",
            "tencentSheet.get", "tencentSheet.runs", "tencentSheet.sources", "tencentSheet.schema", "tencentSheet.views",
            "notionFill.runs", "settings.open", "settings.saveNotification", "settings.saveNotificationRules",
            "automation.list", "daily.list", "daily.get", "daily.runs", "report.getState", "daily.create", "daily.saveTemplate"
        ];
        Assert.Equal(23, StdioHost.AllowedOperations.Count);
        Assert.True(StdioHost.AllowedOperations.SetEquals(expected));
        var blocked = PrototypeBridgeProtocol.AllowedOperations.Except(expected).ToArray();
        Assert.Equal(58, blocked.Length);
        foreach (var operation in new[] { "daily.saveBasics", "daily.setEnabled", "daily.delete", "daily.sendToday" })
            Assert.Contains(operation, blocked);
        await using var host = new HostSession();
        foreach (var operation in blocked.Append("unknown.operation"))
        {
            var response = await host.SendAsync(operation);
            Assert.False(response.GetProperty("ok").GetBoolean());
            Assert.Equal("该操作尚未迁移到新宿主。", response.GetProperty("error").GetString());
        }
        Assert.False(File.Exists(JobsPath));
    }

    [Fact]
    public async Task Real_host_creates_default_disabled_jobs_and_roundtrips_saved_text_and_document()
    {
        await using var host = new HostSession();
        var response = await host.SendAsync("daily.create", new { });
        var id = Data(response).GetProperty("id").GetString()!;
        Assert.Matches("^[0-9a-f]{32}$", id);
        Assert.Single(Data(response).EnumerateObject());
        var job = Job(id);
        Assert.Equal("日报任务 1", job.Name);
        Assert.Equal("17:30", job.SendTime);
        Assert.False(job.IsEnabled);
        Assert.Equal(0, job.ActiveTemplateVersion);
        Assert.Empty(job.Sources);
        Assert.Empty(job.Fields);
        var listed = Data(await host.SendAsync("daily.list")).GetProperty("jobs");
        Assert.Equal(id, Assert.Single(listed.EnumerateArray()).GetProperty("id").GetString());
        Assert.False(Data(await host.SendAsync("daily.get", new { id })).GetProperty("isEnabled").GetBoolean());
        Assert.True(Data(await host.SendAsync("daily.saveTemplate", new { id, text = "消息", document = "{\"type\":\"doc\",\"content\":[]}" }))
            .GetProperty("invalidated").GetBoolean());
        var read = Data(await host.SendAsync("daily.get", new { id }));
        Assert.Equal("消息", read.GetProperty("draftTemplate").GetString());
        Assert.Equal("{\"type\":\"doc\",\"content\":[]}", read.GetProperty("draftTemplateDocument").GetString());
        var next = Data(await host.SendAsync("daily.create", new { name = "  第二项  ", sendTime = "08:15" })).GetProperty("id").GetString()!;
        Assert.Equal("第二项", Job(next).Name);
        Assert.Equal("08:15", Job(next).SendTime);
        Assert.Equal(2, DailyReportSettingsStore.LoadCatalog().Jobs.Count);
        Assert.Equal("消息", Job(id).ActiveTemplate);
    }

    [Fact]
    public async Task Concurrent_host_creates_use_the_latest_count_and_preserve_every_job()
    {
        await using var host = new HostSession();
        Pending[] requests;
        using (var holder = new MutexHolder(DailyReportSettingsStore.CatalogMutexName()))
        {
            requests = Enumerable.Range(0, 8).Select(_ => host.Queue("daily.create", new { })).ToArray();
            await Task.WhenAll(requests.Select(request => request.Read)).WaitAsync(Deadline);
            Assert.All(requests, request => Assert.False(request.Response.IsCompleted));
        }
        var responses = await Task.WhenAll(requests.Select(request => request.Response)).WaitAsync(Deadline);
        Assert.All(responses, Success);
        var jobs = DailyReportSettingsStore.LoadCatalog().Jobs;
        Assert.Equal(8, jobs.Count);
        Assert.Equal(8, jobs.Select(job => job.Id).Distinct().Count());
        Assert.Equal(Enumerable.Range(1, 8).Select(index => $"日报任务 {index}").Order(),
            jobs.Select(job => job.Name).Order());
        Assert.All(jobs, job => Assert.False(job.IsEnabled));
    }

    [Theory]
    [InlineData(false)]
    [InlineData(true)]
    public async Task Concurrent_template_saves_preserve_versions_and_unrelated_fields(bool sameJob)
    {
        var first = NewJob(enabled: true);
        var second = sameJob ? first : NewJob();
        DailyReportSettingsStore.UpdateJob(first.Id, job =>
        {
            job.Fields.Add(new() { Placeholder = "keep", Token = Token() });
            return true;
        });
        await using var host = new HostSession();
        Pending left;
        Pending right;
        using (var holder = new MutexHolder(DailyReportSettingsStore.CatalogMutexName()))
        {
            left = host.Queue("daily.saveTemplate", new { id = first.Id, text = "甲", document = "甲文档" });
            right = host.Queue("daily.saveTemplate", new { id = second.Id, text = "乙", document = "乙文档" });
            await Task.WhenAll(left.Read, right.Read).WaitAsync(Deadline);
            Assert.False(left.Response.IsCompleted);
            Assert.False(right.Response.IsCompleted);
        }
        Assert.All(await Task.WhenAll(left.Response, right.Response).WaitAsync(Deadline), Success);
        var saved = Job(first.Id);
        Assert.True(saved.IsEnabled);
        Assert.Single(saved.Fields);
        Assert.False(saved.ConfigurationValidated);
        Assert.Equal(sameJob ? 4 : 3, saved.ActiveTemplateVersion);
        Assert.Equal(saved.DraftTemplate, saved.ActiveTemplate);
        Assert.Equal(saved.DraftTemplateDocument, saved.ActiveTemplateDocument);
        Assert.Contains(saved.ActiveTemplate, new[] { "甲", "乙" });
        if (!sameJob)
        {
            Assert.Equal("甲", saved.ActiveTemplate);
            Assert.Equal("乙", Job(second.Id).ActiveTemplate);
            Assert.Equal(3, Job(second.Id).ActiveTemplateVersion);
        }
        var unchanged = Data(await host.SendAsync("daily.saveTemplate",
            new { id = saved.Id, text = saved.DraftTemplate, document = saved.DraftTemplateDocument }));
        Assert.False(unchanged.GetProperty("invalidated").GetBoolean());
        Assert.Equal(saved.ActiveTemplateVersion, Job(saved.Id).ActiveTemplateVersion);
    }

    [Fact]
    public async Task Document_only_changes_and_empty_content_keep_original_active_template_semantics()
    {
        var job = NewJob(enabled: true);
        await using var host = new HostSession();
        Data(await host.SendAsync("daily.saveTemplate", new { id = job.Id, text = job.DraftTemplate, document = "new document" }));
        Assert.Equal(3, Job(job.Id).ActiveTemplateVersion);
        Data(await host.SendAsync("daily.saveTemplate", new { id = job.Id, text = "", document = "" }));
        var saved = Job(job.Id);
        Assert.Equal("", saved.DraftTemplate);
        Assert.Equal("", saved.ActiveTemplate);
        Assert.Equal("", saved.ActiveTemplateDocument);
        Assert.Equal(4, saved.ActiveTemplateVersion);
        Assert.True(saved.IsEnabled);
    }

    [Fact]
    public void Snapshot_saves_reject_stale_jobs_and_catalogs_but_preserve_legal_initialization()
    {
        var first = NewJob();
        var second = NewJob();
        var catalog = DailyReportSettingsStore.LoadCatalog();
        var stale = catalog.Jobs.Single(job => job.Id == first.Id);
        DailyReportSettingsStore.UpdateJob(first.Id, job => DailyReportSettingsStore.UpdateTemplate(job, "latest", ""));
        var before = File.ReadAllBytes(JobsPath);
        stale.Name = "stale";
        Assert.Throws<InvalidOperationException>(() => DailyReportSettingsStore.SaveJob(stale));
        Assert.Throws<InvalidOperationException>(() => DailyReportSettingsStore.SaveCatalog(catalog));
        Assert.Throws<InvalidOperationException>(() => DailyReportSettingsStore.SaveJob(new() { Id = first.Id }));
        Assert.Equal(before, File.ReadAllBytes(JobsPath));
        var current = DailyReportSettingsStore.LoadCatalog();
        var left = current.Jobs.Single(job => job.Id == first.Id);
        var right = current.Jobs.Single(job => job.Id == second.Id);
        left.Name = "left";
        right.Name = "right";
        DailyReportSettingsStore.SaveJob(left);
        DailyReportSettingsStore.SaveJob(right);
        Assert.Equal("latest", Job(first.Id).ActiveTemplate);
        Assert.Equal("right", Job(second.Id).Name);
        DailyReportSettingsStore.SaveCatalog(DailyReportSettingsStore.LoadCatalog());
        var schedulingSnapshot = Job(first.Id);
        schedulingSnapshot.IsEnabled = true;
        Assert.Throws<InvalidOperationException>(() => DailyReportSettingsStore.SaveJob(schedulingSnapshot));
    }

    [Fact]
    public async Task Deleted_jobs_cannot_be_resurrected_by_old_snapshots_or_host_template_saves()
    {
        var created = NewJob();
        var catalog = DailyReportSettingsStore.LoadCatalog();
        var stale = catalog.Jobs.Single();
        Assert.True(DailyReportSettingsStore.DeleteJob(created.Id));
        var before = File.ReadAllBytes(JobsPath);
        Assert.Throws<InvalidOperationException>(() => DailyReportSettingsStore.SaveJob(stale));
        Assert.Throws<InvalidOperationException>(() => DailyReportSettingsStore.SaveCatalog(catalog));
        await using var host = new HostSession();
        Assert.False((await host.SendAsync("daily.saveTemplate", new { id = created.Id, text = "old", document = "" }))
            .GetProperty("ok").GetBoolean());
        Assert.Empty(DailyReportSettingsStore.LoadCatalog().Jobs);
        Assert.Equal(before, File.ReadAllBytes(JobsPath));
    }

    [Theory]
    [InlineData("{broken")]
    [InlineData("null")]
    [InlineData("[]")]
    [InlineData("{\"Jobs\":null}")]
    [InlineData("{\"Jobs\":[null]}")]
    [InlineData("{\"Jobs\":[{\"DraftTemplate\":null}]}")]
    [InlineData("{\"Jobs\":[{\"Fields\":null}]}")]
    [InlineData("{\"Jobs\":[{\"Id\":\"duplicate\"},{\"Id\":\"duplicate\"}]}")]
    public async Task Corrupt_catalog_is_not_replaced_by_any_write_entry(string json)
    {
        File.WriteAllText(JobsPath, json);
        var before = File.ReadAllBytes(JobsPath);
        Assert.Throws<InvalidOperationException>(() => DailyReportSettingsStore.LoadCatalog());
        Assert.Throws<InvalidOperationException>(() => DailyReportSettingsStore.SaveCatalog(new()));
        Assert.Throws<InvalidOperationException>(() => DailyReportSettingsStore.SaveJob(new()));
        Assert.Throws<InvalidOperationException>(() => DailyReportSettingsStore.UpdateCatalog(_ => true));
        Assert.Throws<InvalidOperationException>(() => DailyReportSettingsStore.DeleteJob("missing"));
        await using var host = new HostSession();
        foreach (var operation in new[] { "daily.create", "daily.saveTemplate" })
            Assert.False((await host.SendAsync(operation, new { id = "missing", text = "must not save" })).GetProperty("ok").GetBoolean());
        Assert.Equal(before, File.ReadAllBytes(JobsPath));
        Assert.Empty(Directory.GetFiles(RuntimeEnvironment.DataDirectory, "*.tmp"));
    }

    [Fact]
    public async Task Unreadable_existing_catalog_is_not_treated_as_missing()
    {
        NewJob();
        var before = File.ReadAllBytes(JobsPath);
        await using var host = new HostSession();
        using (var held = new FileStream(JobsPath, FileMode.Open, FileAccess.ReadWrite, FileShare.None))
        {
            Assert.Throws<IOException>(() => DailyReportSettingsStore.LoadCatalog());
            Assert.Throws<IOException>(() => DailyReportSettingsStore.SaveJob(new()));
            Assert.False((await host.SendAsync("daily.create", new { })).GetProperty("ok").GetBoolean());
        }
        Assert.Equal(before, File.ReadAllBytes(JobsPath));
    }

    [Theory]
    [InlineData("daily.create")]
    [InlineData("daily.saveTemplate")]
    public async Task Failed_atomic_replacement_preserves_original_bytes_and_releases_the_lock(string operation)
    {
        var job = NewJob();
        var before = File.ReadAllBytes(JobsPath);
        await using var host = new HostSession();
        using (var held = new FileStream(JobsPath, FileMode.Open, FileAccess.Read, FileShare.Read))
        {
            Assert.False((await host.SendAsync(operation, new { id = job.Id, text = "blocked", document = "" }))
                .GetProperty("ok").GetBoolean());
            Assert.Equal(before, File.ReadAllBytes(JobsPath));
            Assert.Empty(Directory.GetFiles(RuntimeEnvironment.DataDirectory, "*.tmp"));
        }
        Success(await host.SendAsync(operation, new { id = job.Id, text = "retry", document = "" }));
    }

    [Theory]
    [InlineData("missing")]
    [InlineData("empty")]
    [InlineData("null")]
    public async Task Legacy_catalog_ids_tokens_dates_and_credentials_migrate_once(string idKind)
    {
        var encoded = DailyReportSettingsStore.EncodeToken(Token());
        var legacyJob = new Dictionary<string, object?>
        {
            ["DraftTemplate"] = encoded, ["ActiveTemplate"] = encoded, ["ActiveTemplateVersion"] = 2,
            ["Sources"] = new[] { new { DataSourceId = "source", DatePropertyId = "date", DatePropertyName = "日期" } },
            ["EncryptedWebhook"] = "legacy-webhook-marker", ["EncryptedSecret"] = "legacy-secret-marker"
        };
        if (idKind != "missing") legacyJob["Id"] = idKind == "empty" ? "" : null;
        File.WriteAllText(JobsPath, JsonSerializer.Serialize(new { Jobs = new[] { legacyJob } }));
        var first = DailyReportSettingsStore.LoadCatalog().Jobs.Single();
        Assert.Matches("^[0-9a-f]{32}$", first.Id);
        Assert.DoesNotContain("{{report:", first.DraftTemplate);
        Assert.Equal(first.DraftTemplate, first.ActiveTemplate);
        Assert.Single(first.Fields);
        Assert.Equal("date", first.Sources.Single().MatchPropertyId);
        Assert.Equal("day", first.Sources.Single().PeriodKind);
        Assert.Equal(2, first.ActiveTemplateVersion);
        Assert.DoesNotContain("EncryptedWebhook", File.ReadAllText(JobsPath));
        var notification = File.ReadAllBytes(Path.Combine(RuntimeEnvironment.DataDirectory, "notification-settings.json"));
        var bytes = File.ReadAllBytes(JobsPath);
        var timestamp = new DateTime(2001, 1, 1, 0, 0, 0, DateTimeKind.Utc);
        File.SetLastWriteTimeUtc(JobsPath, timestamp);
        Assert.Equal(first.Id, DailyReportSettingsStore.LoadCatalog().Jobs.Single().Id);
        Assert.Equal(timestamp, File.GetLastWriteTimeUtc(JobsPath));
        Assert.Equal(bytes, File.ReadAllBytes(JobsPath));
        Assert.Equal(notification, File.ReadAllBytes(Path.Combine(RuntimeEnvironment.DataDirectory, "notification-settings.json")));
        await using var host = new HostSession();
        Success(await host.SendAsync("daily.saveTemplate", new { id = first.Id, text = "migrated update", document = "" }));
        Assert.Equal(3, Job(first.Id).ActiveTemplateVersion);
    }

    [Fact]
    public void Legacy_single_job_settings_remain_unchanged_and_empty_defaults_are_compatible()
    {
        var path = Path.Combine(RuntimeEnvironment.DataDirectory, "daily-report-settings.json");
        File.WriteAllText(path, JsonSerializer.Serialize(new DailyReportSettings { DraftTemplate = "legacy", ActiveTemplateVersion = 2 }));
        var original = File.ReadAllBytes(path);
        Assert.True(StartupMigration.Run());
        var job = Assert.Single(DailyReportSettingsStore.LoadCatalog().Jobs);
        Assert.Equal("legacy-production-message-tower-daily", job.Id);
        Assert.False(job.IsEnabled);
        var first = File.ReadAllBytes(JobsPath);
        Assert.True(StartupMigration.Run());
        Assert.Equal(first, File.ReadAllBytes(JobsPath));
        Assert.Equal(original, File.ReadAllBytes(path));
        File.WriteAllText(JobsPath, "{}");
        Assert.Empty(DailyReportSettingsStore.LoadCatalog().Jobs);
    }

    [Fact]
    public void Failed_notification_import_does_not_discard_legacy_catalog_properties()
    {
        File.WriteAllText(JobsPath, "{\"Jobs\":[{\"Id\":\"legacy\",\"EncryptedWebhook\":\"placeholder\",\"EncryptedSecret\":\"placeholder\"}]}");
        var notification = Path.Combine(RuntimeEnvironment.DataDirectory, "notification-settings.json");
        File.WriteAllText(notification, "{broken");
        var before = File.ReadAllBytes(JobsPath);
        Assert.Throws<InvalidOperationException>(() => DailyReportSettingsStore.LoadCatalog());
        Assert.Throws<InvalidOperationException>(() => DailyReportSettingsStore.UpdateCatalog(_ => true));
        Assert.Equal(before, File.ReadAllBytes(JobsPath));
        File.WriteAllText(notification, "{}");
        Assert.Single(DailyReportSettingsStore.LoadCatalog().Jobs);
        Assert.DoesNotContain("EncryptedWebhook", File.ReadAllText(JobsPath));
    }

    [Fact]
    public async Task Mutex_timeout_does_not_write_and_the_next_request_can_retry()
    {
        NewJob();
        var before = File.ReadAllBytes(JobsPath);
        await using var host = new HostSession();
        using (var holder = new MutexHolder(DailyReportSettingsStore.CatalogMutexName()))
        {
            var response = await host.SendAsync("daily.create", new { });
            Assert.False(response.GetProperty("ok").GetBoolean());
            Assert.Contains("日报配置正在更新", response.GetProperty("error").GetString());
            Assert.Equal(before, File.ReadAllBytes(JobsPath));
        }
        Success(await host.SendAsync("daily.create", new { }));
    }

    [Fact]
    public async Task Abandoned_mutex_and_failed_or_nested_updates_release_ownership()
    {
        using var mutex = new Mutex(false, DailyReportSettingsStore.CatalogMutexName());
        var thread = new Thread(() => mutex.WaitOne());
        thread.Start();
        Assert.True(thread.Join(Deadline));
        var job = NewJob();
        var before = File.ReadAllBytes(JobsPath);
        Assert.Throws<InvalidOperationException>(() => DailyReportSettingsStore.UpdateJob<bool>(job.Id, _ => throw new InvalidOperationException("fixture")));
        Assert.Throws<InvalidOperationException>(() => DailyReportSettingsStore.UpdateCatalog(_ => DailyReportSettingsStore.LoadCatalog()));
        Assert.Throws<InvalidOperationException>(() => DailyReportSettingsStore.UpdateCatalog(_ =>
            DailyReportSettingsStore.AcquireScheduleLeaseAsync(job.Id).GetAwaiter().GetResult()));
        Assert.Equal(before, File.ReadAllBytes(JobsPath));
        await using var host = new HostSession();
        Success(await host.SendAsync("daily.create", new { }));
    }

    [Fact]
    public async Task Locks_normalize_directories_isolate_environments_and_bound_schedule_waiting()
    {
        var development = Path.Combine(_folder, "Development");
        var production = Path.Combine(_folder, "Production");
        Assert.Equal(DailyReportSettingsStore.CatalogMutexName(development),
            DailyReportSettingsStore.CatalogMutexName(development.ToUpperInvariant() + Path.DirectorySeparatorChar));
        Assert.NotEqual(DailyReportSettingsStore.CatalogMutexName(development), DailyReportSettingsStore.CatalogMutexName(production));
        using (var lease = await DailyReportSettingsStore.AcquireScheduleLeaseAsync("first"))
        {
            await Assert.ThrowsAsync<IOException>(() => DailyReportSettingsStore.AcquireScheduleLeaseAsync("first", TimeSpan.FromMilliseconds(100)));
            using var other = await DailyReportSettingsStore.AcquireScheduleLeaseAsync("other");
        }
        using var retry = await DailyReportSettingsStore.AcquireScheduleLeaseAsync("first");
        Assert.Equal(2, Directory.GetFiles(RuntimeEnvironment.DataDirectory, "*.lock").Length);
    }

    [Theory]
    [InlineData(true)]
    [InlineData(false)]
    public async Task Enable_and_disable_preserve_templates_saved_while_the_scheduler_is_paused(bool enabled)
    {
        ConfigureNotification();
        var job = NewJob(!enabled);
        var scheduler = new FakeScheduler { Pause = true };
        if (!enabled) scheduler.States[job.Id] = Schedule("17:30");
        var handler = new DailyReportTaskHandler(null, scheduler);
        var pending = handler.SetEnabledAsync(job.Id, enabled);
        try
        {
            await scheduler.Started.Task.WaitAsync(Deadline);
            Assert.False(pending.IsCompleted);
            await using var host = new HostSession();
            Success(await host.SendAsync("daily.saveTemplate", new { id = job.Id, text = "during schedule", document = "document" }));
            Assert.Equal(!enabled, Job(job.Id).IsEnabled);
            scheduler.Release.TrySetResult(true);
            Assert.Equal(enabled, (await pending.WaitAsync(Deadline)).Enabled);
            var saved = Job(job.Id);
            Assert.Equal(enabled, saved.IsEnabled);
            Assert.Equal("during schedule", saved.ActiveTemplate);
            Assert.Equal(3, saved.ActiveTemplateVersion);
            Assert.False(saved.ConfigurationValidated);
            Assert.Equal(0, scheduler.Restores);
        }
        finally { scheduler.Release.TrySetResult(true); }
    }

    [Fact]
    public async Task Enable_then_time_change_and_delete_are_coordinated_for_the_same_job()
    {
        ConfigureNotification();
        var job = NewJob();
        var scheduler = new FakeScheduler { Pause = true };
        var handler = new DailyReportTaskHandler(null, scheduler);
        var enable = handler.SetEnabledAsync(job.Id, true);
        try
        {
            await scheduler.Started.Task.WaitAsync(Deadline);
            var basics = handler.SaveBasicsAsync(job.Id, "renamed", "18:20", ["new source"]);
            var delete = handler.DeleteAsync(job.Id);
            Assert.False(basics.IsCompleted);
            Assert.False(delete.IsCompleted);
            scheduler.Release.TrySetResult(true);
            Assert.True((await enable.WaitAsync(Deadline)).Enabled);
            await basics.WaitAsync(Deadline);
            await Assert.ThrowsAsync<InvalidOperationException>(() => delete.WaitAsync(Deadline));
            var saved = Job(job.Id);
            Assert.True(saved.IsEnabled);
            Assert.Equal("18:20", saved.SendTime);
            Assert.Equal("renamed", saved.Name);
            Assert.Equal(new[] { "new source" }, saved.MetricSourceIds);
            Assert.True(DailyReportTaskScheduler.IsScheduledFor(await scheduler.CaptureAsync(job.Id), TimeSpan.Parse("18:20")));
            Assert.Equal(2, scheduler.Installs);
            Assert.Equal(0, scheduler.Removes);
        }
        finally { scheduler.Release.TrySetResult(true); }
    }

    [Fact]
    public async Task Disable_then_delete_waits_for_latest_state_and_does_not_resurrect_the_job()
    {
        var job = NewJob(enabled: true);
        var scheduler = new FakeScheduler { Pause = true };
        scheduler.States[job.Id] = Schedule("17:30");
        var handler = new DailyReportTaskHandler(null, scheduler);
        var disable = handler.SetEnabledAsync(job.Id, false);
        try
        {
            await scheduler.Started.Task.WaitAsync(Deadline);
            var delete = handler.DeleteAsync(job.Id);
            Assert.False(delete.IsCompleted);
            scheduler.Release.TrySetResult(true);
            Assert.False((await disable.WaitAsync(Deadline)).Enabled);
            await delete.WaitAsync(Deadline);
            Assert.Empty(DailyReportSettingsStore.LoadCatalog().Jobs);
            Assert.False((await scheduler.CaptureAsync(job.Id)).Installed);
            Assert.Equal(1, scheduler.Removes);
        }
        finally { scheduler.Release.TrySetResult(true); }
    }

    [Theory]
    [InlineData("install")]
    [InlineData("remove")]
    [InlineData("delete")]
    [InlineData("verification")]
    [InlineData("restore")]
    [InlineData("restore-verification")]
    public async Task Scheduler_failures_compensate_or_report_the_failed_compensation_without_committing_json(string failure)
    {
        ConfigureNotification();
        var removing = failure is "remove" or "delete";
        var job = NewJob(enabled: failure == "remove");
        var scheduler = new FakeScheduler
        {
            FailInstall = !removing && failure != "verification",
            FailRemove = removing,
            WrongInstalledState = failure == "verification",
            FailRestore = failure == "restore",
            WrongRestoration = failure == "restore-verification"
        };
        if (removing) scheduler.States[job.Id] = Schedule("17:30");
        var original = await scheduler.CaptureAsync(job.Id);
        var before = File.ReadAllBytes(JobsPath);
        var handler = new DailyReportTaskHandler(null, scheduler);
        var exception = await Assert.ThrowsAsync<InvalidOperationException>(() => failure == "delete"
            ? handler.DeleteAsync(job.Id)
            : handler.SetEnabledAsync(job.Id, !removing));
        Assert.Equal(before, File.ReadAllBytes(JobsPath));
        Assert.Equal(1, scheduler.Restores);
        if (failure is "restore" or "restore-verification")
        {
            Assert.Contains("补偿失败", exception.Message);
            Assert.IsType<AggregateException>(exception.InnerException);
        }
        else
        {
            Assert.Contains("已恢复", exception.Message);
            Assert.True(DailyReportTaskScheduler.SameState(original, await scheduler.CaptureAsync(job.Id)));
        }
    }

    [Fact]
    public async Task Query_failure_is_unknown_and_prevents_every_external_mutation()
    {
        ConfigureNotification();
        var job = NewJob();
        var scheduler = new FakeScheduler { FailQuery = true };
        var handler = new DailyReportTaskHandler(null, scheduler);
        var before = File.ReadAllBytes(JobsPath);
        await Assert.ThrowsAsync<IOException>(() => handler.SetEnabledAsync(job.Id, true));
        await Assert.ThrowsAsync<IOException>(() => handler.DeleteAsync(job.Id));
        Assert.Equal(before, File.ReadAllBytes(JobsPath));
        Assert.Equal(0, scheduler.Installs + scheduler.Removes + scheduler.Restores);
    }

    [Fact]
    public async Task Json_commit_failure_restores_the_schedule_and_preserves_new_template_content()
    {
        ConfigureNotification();
        var job = NewJob();
        var scheduler = new FakeScheduler { Pause = true };
        var handler = new DailyReportTaskHandler(null, scheduler);
        var pending = handler.SetEnabledAsync(job.Id, true);
        try
        {
            await scheduler.Started.Task.WaitAsync(Deadline);
            DailyReportSettingsStore.UpdateJob(job.Id, current => DailyReportSettingsStore.UpdateTemplate(current, "latest", ""));
            var before = File.ReadAllBytes(JobsPath);
            using (var held = new FileStream(JobsPath, FileMode.Open, FileAccess.Read, FileShare.Read))
            {
                scheduler.Release.TrySetResult(true);
                var failure = await Assert.ThrowsAsync<InvalidOperationException>(() => pending.WaitAsync(Deadline));
                Assert.Contains("已恢复", failure.Message);
                Assert.Equal(before, File.ReadAllBytes(JobsPath));
            }
            Assert.False(Job(job.Id).IsEnabled);
            Assert.Equal("latest", Job(job.Id).ActiveTemplate);
            Assert.False((await scheduler.CaptureAsync(job.Id)).Installed);
            Assert.Equal(1, scheduler.Restores);
            Assert.True((await handler.SetEnabledAsync(job.Id, true)).Enabled);
        }
        finally { scheduler.Release.TrySetResult(true); }
    }

    [Theory]
    [InlineData(false)]
    [InlineData(true)]
    public async Task Deletion_or_schedule_conflict_during_an_external_change_rejects_the_stale_commit(bool delete)
    {
        ConfigureNotification();
        var job = NewJob();
        var scheduler = new FakeScheduler { Pause = true };
        var handler = new DailyReportTaskHandler(null, scheduler);
        var pending = handler.SetEnabledAsync(job.Id, true);
        try
        {
            await scheduler.Started.Task.WaitAsync(Deadline);
            // Fault injection: simulate a writer that does not cooperate with the scheduling lease.
            DailyReportSettingsStore.UpdateCatalog(catalog =>
            {
                if (delete) catalog.Jobs.Clear();
                else catalog.Jobs.Single().SendTime = "19:40";
                return true;
            });
            var expected = File.ReadAllBytes(JobsPath);
            scheduler.Release.TrySetResult(true);
            await Assert.ThrowsAsync<InvalidOperationException>(() => pending.WaitAsync(Deadline));
            Assert.Equal(expected, File.ReadAllBytes(JobsPath));
            Assert.False((await scheduler.CaptureAsync(job.Id)).Installed);
            Assert.Equal(1, scheduler.Restores);
        }
        finally { scheduler.Release.TrySetResult(true); }
    }

    [Fact]
    public async Task Failed_enabled_time_change_restores_old_schedule_and_does_not_commit_any_basic_fields()
    {
        var job = NewJob(enabled: true);
        var scheduler = new FakeScheduler { FailInstall = true };
        scheduler.States[job.Id] = Schedule("17:30");
        var handler = new DailyReportTaskHandler(null, scheduler);
        var before = File.ReadAllBytes(JobsPath);
        await Assert.ThrowsAsync<InvalidOperationException>(() => handler.SaveBasicsAsync(job.Id, "must not save", "19:00", ["changed"]));
        Assert.Equal(before, File.ReadAllBytes(JobsPath));
        Assert.True(DailyReportTaskScheduler.IsScheduledFor(await scheduler.CaptureAsync(job.Id), TimeSpan.Parse("17:30")));
    }

    [Theory]
    [InlineData("Password")]
    [InlineData("ServiceAccount")]
    [InlineData("")]
    public async Task Unsupported_original_logon_is_rejected_before_mutation(string logonType)
    {
        ConfigureNotification();
        var job = NewJob();
        var scheduler = new FakeScheduler();
        scheduler.States[job.Id] = Schedule("17:30", logonType);
        var handler = new DailyReportTaskHandler(null, scheduler);
        await Assert.ThrowsAsync<InvalidOperationException>(() => handler.SetEnabledAsync(job.Id, true));
        Assert.Equal(0, scheduler.Installs + scheduler.Removes + scheduler.Restores);
        Assert.False(Job(job.Id).IsEnabled);
    }

    [Fact]
    public async Task Enabling_keeps_original_notification_only_guard_and_unavailable_environment_guard()
    {
        var job = NewJob();
        var scheduler = new FakeScheduler();
        var handler = new DailyReportTaskHandler(null, scheduler);
        var missing = await handler.SetEnabledAsync(job.Id, true);
        Assert.Equal("notification", missing.MissingStep);
        Assert.Equal(0, scheduler.Installs);
        ConfigureNotification();
        DailyReportSettingsStore.UpdateJob(job.Id, current =>
        {
            current.DraftTemplate = "";
            current.ActiveTemplate = "";
            current.ConfigurationValidated = false;
            return true;
        });
        Assert.True((await handler.SetEnabledAsync(job.Id, true)).Enabled);
        scheduler.IsAvailable = false;
        await Assert.ThrowsAsync<InvalidOperationException>(() => handler.SetEnabledAsync(job.Id, false));
    }

    [Fact]
    public async Task Schema_query_outside_lock_preserves_interleaved_template_and_other_bindings()
    {
        var job = NewJob();
        var provider = new PausedProvider();
        var pending = OperationDispatcher.AddDailyFieldAsync(FieldPayload(job.Id), CancellationToken.None, provider);
        try
        {
            await provider.Started.Task.WaitAsync(Deadline);
            DailyReportSettingsStore.UpdateJob(job.Id, current =>
            {
                DailyReportSettingsStore.UpdateTemplate(current, "new template", "");
                current.Fields.Add(new() { Placeholder = "other", Token = Token("other") });
                current.Sources.Add(new() { DataSourceId = "other", DataSourceName = "keep" });
                return true;
            });
            provider.Release.TrySetResult(true);
            await pending.WaitAsync(Deadline);
            var saved = Job(job.Id);
            Assert.Equal("new template", saved.ActiveTemplate);
            Assert.Equal(3, saved.ActiveTemplateVersion);
            Assert.Equal(2, saved.Fields.Count);
            Assert.Equal(2, saved.Sources.Count);
            Assert.Contains(saved.Fields, field => field.Placeholder == "other");
            Assert.Contains(saved.Fields, field => field.Token.BusinessMetricId == "property:value");
        }
        finally { provider.Release.TrySetResult(true); }
    }

    [Theory]
    [InlineData("field")]
    [InlineData("source")]
    [InlineData("delete")]
    public async Task Schema_query_rejects_changed_target_field_binding_or_deleted_job(string change)
    {
        var job = NewJob();
        DailyReportSettingsStore.UpdateJob(job.Id, current =>
        {
            current.Fields.Add(new() { Placeholder = "target", Token = Token() });
            current.Sources.Add(new() { DataSourceId = "source", MatchPropertyId = "date", MatchPropertyName = "日期" });
            return true;
        });
        var provider = new PausedProvider();
        var pending = OperationDispatcher.AddDailyFieldAsync(FieldPayload(job.Id, "target"), CancellationToken.None, provider);
        try
        {
            await provider.Started.Task.WaitAsync(Deadline);
            if (change == "delete") DailyReportSettingsStore.DeleteJob(job.Id);
            else DailyReportSettingsStore.UpdateJob(job.Id, current =>
            {
                if (change == "field") current.Fields.Single().DisplayName = "edited";
                else current.Sources.Single().MatchPropertyId = "changed date";
                return true;
            });
            var expected = File.ReadAllBytes(JobsPath);
            provider.Release.TrySetResult(true);
            await Assert.ThrowsAsync<InvalidOperationException>(() => pending.WaitAsync(Deadline));
            Assert.Equal(expected, File.ReadAllBytes(JobsPath));
        }
        finally { provider.Release.TrySetResult(true); }
    }

    [Theory]
    [InlineData("template")]
    [InlineData("document")]
    [InlineData("fields")]
    [InlineData("delete")]
    [InlineData("unchanged")]
    [InlineData("enabled")]
    public async Task Test_send_marks_only_matching_inputs_valid_without_overwriting_concurrent_changes(string change)
    {
        ConfigureNotification(forSending: true);
        var job = NewJob();
        DailyReportSettingsStore.UpdateJob(job.Id, current => { current.ConfigurationValidated = false; return true; });
        var sender = new PausedHttpHandler();
        using var client = new HttpClient(sender);
        var service = new DailyReportService(dingTalkClient: client, database: new PausedProvider());
        var runner = new DailyReportRunner(service, new NotificationService(service));
        var pending = OperationDispatcher.TestDailyReportAsync(
            JsonSerializer.SerializeToElement(new { id = job.Id, businessDate = "2026-09-06" }), CancellationToken.None, runner);
        try
        {
            await sender.Started.Task.WaitAsync(Deadline);
            Assert.False(pending.IsCompleted);
            if (change == "delete") DailyReportSettingsStore.DeleteJob(job.Id);
            else if (change != "unchanged") DailyReportSettingsStore.UpdateJob(job.Id, current =>
            {
                switch (change)
                {
                    case "template": DailyReportSettingsStore.UpdateTemplate(current, "new template", ""); break;
                    case "document": DailyReportSettingsStore.UpdateTemplate(current, current.DraftTemplate, "{\"type\":\"doc\"}"); break;
                    case "fields": current.Fields.Add(new() { Placeholder = "other", Token = Token() }); break;
                    case "enabled": current.IsEnabled = true; break;
                }
                return true;
            });
            sender.Release.TrySetResult(true);
            var result = JsonSerializer.SerializeToElement(await pending.WaitAsync(Deadline));
            Assert.True(result.GetProperty("succeeded").GetBoolean());
            Assert.Equal(1, sender.Requests);
            if (change == "delete") Assert.Empty(DailyReportSettingsStore.LoadCatalog().Jobs);
            else
            {
                var saved = Job(job.Id);
                Assert.Equal(change is "unchanged" or "enabled", saved.ConfigurationValidated);
                if (change == "template") Assert.Equal("new template", saved.ActiveTemplate);
                if (change == "fields") Assert.Single(saved.Fields);
                if (change == "enabled") Assert.True(saved.IsEnabled);
            }
        }
        finally { sender.Release.TrySetResult(true); }
    }

    [Fact]
    public async Task Two_real_sidecars_share_the_directory_without_lost_creates_or_template_updates()
    {
        await using var first = await ProcessSession.StartAsync(_folder);
        await using var second = await ProcessSession.StartAsync(_folder);
        Task<JsonElement> left;
        Task<JsonElement> right;
        using (var holder = new MutexHolder(DailyReportSettingsStore.CatalogMutexName()))
        {
            left = await first.QueueAsync("daily.create", new { });
            right = await second.QueueAsync("daily.create", new { });
            Assert.False(left.IsCompleted);
            Assert.False(right.IsCompleted);
        }
        var created = await Task.WhenAll(left, right).WaitAsync(Deadline);
        Assert.All(created, Success);
        var leftId = Data(created[0]).GetProperty("id").GetString()!;
        var rightId = Data(created[1]).GetProperty("id").GetString()!;
        Assert.NotEqual(leftId, rightId);
        Assert.Equal(2, DailyReportSettingsStore.LoadCatalog().Jobs.Count);
        foreach (var sameJob in new[] { false, true })
        {
            using (var holder = new MutexHolder(DailyReportSettingsStore.CatalogMutexName()))
            {
                left = await first.QueueAsync("daily.saveTemplate", new { id = leftId, text = sameJob ? "same left" : "left", document = "left document" });
                right = await second.QueueAsync("daily.saveTemplate", new { id = sameJob ? leftId : rightId, text = sameJob ? "same right" : "right", document = "right document" });
                Assert.False(left.IsCompleted);
                Assert.False(right.IsCompleted);
            }
            Assert.All(await Task.WhenAll(left, right).WaitAsync(Deadline), Success);
        }
        var saved = Job(leftId);
        Assert.Equal(3, saved.ActiveTemplateVersion);
        Assert.Equal(saved.DraftTemplate, saved.ActiveTemplate);
        Assert.Equal(saved.DraftTemplateDocument, saved.ActiveTemplateDocument);
        Assert.Equal(1, Job(rightId).ActiveTemplateVersion);
        Assert.False(saved.IsEnabled);
        var blocked = await first.SendAsync("daily.setEnabled", new { id = leftId, enabled = true });
        Assert.False(blocked.GetProperty("ok").GetBoolean());
    }

    [Fact]
    public async Task Local_create_and_template_saves_have_no_http_notification_or_scheduling_effects()
    {
        ConfigureNotification();
        var notificationPath = Path.Combine(RuntimeEnvironment.DataDirectory, "notification-settings.json");
        var notification = File.ReadAllBytes(notificationPath);
        using var requests = new HttpRequests();
        await using var host = new HostSession();
        var id = Data(await host.SendAsync("daily.create", new { })).GetProperty("id").GetString()!;
        DailyReportSettingsStore.UpdateJob(id, current => { current.IsEnabled = true; return true; });
        Success(await host.SendAsync("daily.saveTemplate", new { id, text = "local only", document = "raw document" }));
        Assert.True(Job(id).IsEnabled);
        Assert.Equal(0, requests.Count);
        Assert.Equal(notification, File.ReadAllBytes(notificationPath));
        Assert.False(File.Exists(Path.Combine(RuntimeEnvironment.DataDirectory, "daily-report-runs.json")));
        Assert.Empty(Directory.GetFiles(RuntimeEnvironment.DataDirectory, "*.lock"));
    }

    private static void Success(JsonElement response) =>
        Assert.True(response.GetProperty("ok").GetBoolean(), response.GetRawText());

    private static JsonElement Data(JsonElement response)
    {
        Success(response);
        return response.GetProperty("data");
    }

    private static DailyReportJob Job(string id) => DailyReportSettingsStore.LoadCatalog().Jobs.Single(job => job.Id == id);

    private static DailyReportJob NewJob(bool enabled = false)
    {
        var job = new DailyReportJob
        {
            Name = "fixture", IsEnabled = enabled, DraftTemplate = "旧内容", ActiveTemplate = "旧内容",
            ActiveTemplateVersion = 2, ConfigurationValidated = true
        };
        DailyReportSettingsStore.SaveJob(job);
        return job;
    }

    private static DailyReportFieldToken Token(string source = "source") => new(
        source, "测试数据库", "value", "数值", "number", QueryMode: "date-range",
        DatePropertyId: "date", DatePropertyName: "日期", QueryRangeKind: "day");

    private static JsonElement FieldPayload(string id, string placeholder = "") => JsonSerializer.SerializeToElement(new
    {
        id, sourceId = "source", metricId = "property:value", rangeKind = "day", placeholder
    });

    private static void ConfigureNotification(bool forSending = false)
    {
        var settings = new NotificationSettings { DingTalkEnabled = true };
        if (forSending) NotificationSettingsStore.Save(settings, "https://example.invalid/sd8c", "placeholder-secret");
        else
        {
            settings.EncryptedWebhook = "placeholder-webhook";
            settings.EncryptedSecret = "placeholder-secret";
            NotificationSettingsStore.Save(settings);
        }
    }

    private static DailyReportScheduleState Schedule(string time, string logonType = "InteractiveToken") => new(true,
        $"<Task><Principals><Principal id=\"Author\"><UserId>test-user</UserId><LogonType>{logonType}</LogonType></Principal></Principals>" +
        $"<Triggers><CalendarTrigger><StartBoundary>2026-01-01T{time}:00</StartBoundary></CalendarTrigger></Triggers>" +
        "<Settings><Enabled>true</Enabled></Settings><Actions><Exec><Command>synthetic.exe</Command></Exec></Actions></Task>");

    private sealed class FakeScheduler : IDailyReportScheduler
    {
        internal ConcurrentDictionary<string, DailyReportScheduleState> States { get; } = new();
        internal TaskCompletionSource<bool> Started { get; } = new(TaskCreationOptions.RunContinuationsAsynchronously);
        internal TaskCompletionSource<bool> Release { get; } = new(TaskCreationOptions.RunContinuationsAsynchronously);
        public bool IsAvailable { get; set; } = true;
        internal bool Pause { get; init; }
        internal bool FailInstall { get; init; }
        internal bool FailRemove { get; init; }
        internal bool FailQuery { get; init; }
        internal bool WrongInstalledState { get; init; }
        internal bool FailRestore { get; init; }
        internal bool WrongRestoration { get; init; }
        internal int Installs;
        internal int Removes;
        internal int Restores;

        public Task<DailyReportScheduleState> CaptureAsync(string jobId)
        {
            if (FailQuery) throw new IOException("synthetic query failure; state unknown");
            return Task.FromResult(States.TryGetValue(jobId, out var state) ? state : new(false, ""));
        }

        public async Task<(bool Succeeded, string Message)> InstallAsync(string jobId, TimeSpan time)
        {
            Interlocked.Increment(ref Installs);
            Started.TrySetResult(true);
            if (Pause) await Release.Task.WaitAsync(Deadline);
            States[jobId] = WrongInstalledState ? new(false, "") : Schedule(time.ToString(@"hh\:mm"));
            return (!FailInstall, FailInstall ? "synthetic install failure after partial change" : "installed");
        }

        public async Task<(bool Succeeded, string Message)> RemoveAsync(string jobId)
        {
            Interlocked.Increment(ref Removes);
            Started.TrySetResult(true);
            if (Pause) await Release.Task.WaitAsync(Deadline);
            States[jobId] = new(false, "");
            return (!FailRemove, FailRemove ? "synthetic remove failure after partial change" : "removed");
        }

        public Task RestoreAsync(string jobId, DailyReportScheduleState original)
        {
            Interlocked.Increment(ref Restores);
            if (FailRestore) throw new IOException("synthetic restoration failure");
            States[jobId] = WrongRestoration ? Schedule("23:50") : original;
            return Task.CompletedTask;
        }
    }

    private sealed class PausedProvider : IDatabaseQueryProvider
    {
        internal TaskCompletionSource<bool> Started { get; } = new(TaskCreationOptions.RunContinuationsAsynchronously);
        internal TaskCompletionSource<bool> Release { get; } = new(TaskCreationOptions.RunContinuationsAsynchronously);
        public string Name => "memory only";
        public IReadOnlyList<DatabaseSourceInfo> GetSources() => [new("source", "测试数据库", "测试数据库")];
        public async Task<DatabaseSchemaResult> GetSchemaAsync(string sourceId, CancellationToken cancellationToken = default)
        {
            Started.TrySetResult(true);
            await Release.Task.WaitAsync(Deadline, cancellationToken);
            return new(true, "", [new("date", "日期", "date"), new("value", "数值", "number")]);
        }
        public Task<IReadOnlyList<DatabaseDatasetInfo>> GetDatasetsAsync(string sourceId, CancellationToken cancellationToken = default) =>
            throw new InvalidOperationException("Unexpected dataset request.");
        public Task<DatabaseRecordSet> QueryDatasetAsync(string sourceId, string datasetId, CancellationToken cancellationToken = default) =>
            throw new InvalidOperationException("Unexpected remote request.");
    }

    private sealed class PausedHttpHandler : HttpMessageHandler
    {
        internal TaskCompletionSource<bool> Started { get; } = new(TaskCreationOptions.RunContinuationsAsynchronously);
        internal TaskCompletionSource<bool> Release { get; } = new(TaskCreationOptions.RunContinuationsAsynchronously);
        internal int Requests;
        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            Interlocked.Increment(ref Requests);
            Started.TrySetResult(true);
            await Release.Task.WaitAsync(Deadline, cancellationToken);
            return new(HttpStatusCode.OK) { Content = new StringContent("{\"errcode\":0,\"errmsg\":\"ok\"}") };
        }
    }

    private sealed class MutexHolder : IDisposable
    {
        private readonly ManualResetEventSlim _entered = new();
        private readonly ManualResetEventSlim _release = new();
        private readonly Thread _thread;
        private Exception? _error;
        internal MutexHolder(string name)
        {
            _thread = new Thread(() =>
            {
                using var mutex = new Mutex(false, name);
                var owns = false;
                try
                {
                    owns = mutex.WaitOne(Deadline);
                    if (!owns) throw new TimeoutException("Fixture could not acquire the catalog mutex.");
                    _entered.Set();
                    if (!_release.Wait(Deadline)) throw new TimeoutException("Fixture was not released.");
                }
                catch (Exception error) { _error = error; _entered.Set(); }
                finally { if (owns) mutex.ReleaseMutex(); }
            });
            _thread.Start();
            Assert.True(_entered.Wait(Deadline));
            Assert.Null(_error);
        }
        public void Dispose()
        {
            _release.Set();
            Assert.True(_thread.Join(Deadline));
            _entered.Dispose();
            _release.Dispose();
            Assert.Null(_error);
        }
    }

    private sealed record Pending(Task<JsonElement> Response, Task Read);

    private sealed class HostSession : IAsyncDisposable
    {
        private readonly Channel<string> _input = Channel.CreateUnbounded<string>();
        private readonly ConcurrentDictionary<string, TaskCompletionSource<JsonElement>> _responses = new();
        private readonly ConcurrentDictionary<string, TaskCompletionSource<bool>> _reads = new();
        private readonly Task<int> _run;

        internal HostSession()
        {
            var reader = new QueueReader(_input.Reader, line =>
            {
                using var document = JsonDocument.Parse(line);
                _reads.TryRemove(document.RootElement.GetProperty("id").GetString()!, out var read);
                read?.TrySetResult(true);
            });
            var writer = new CallbackWriter(line =>
            {
                using var document = JsonDocument.Parse(line);
                var root = document.RootElement.Clone();
                if (_responses.TryRemove(root.GetProperty("id").GetString()!, out var response)) response.TrySetResult(root);
            });
            _run = new StdioHost(reader, writer, TextWriter.Null).RunAsync();
        }

        internal Pending Queue(string operation, object? payload = null)
        {
            var id = Guid.NewGuid().ToString("N");
            var response = new TaskCompletionSource<JsonElement>(TaskCreationOptions.RunContinuationsAsynchronously);
            var read = new TaskCompletionSource<bool>(TaskCreationOptions.RunContinuationsAsynchronously);
            Assert.True(_responses.TryAdd(id, response));
            Assert.True(_reads.TryAdd(id, read));
            Assert.True(_input.Writer.TryWrite(JsonSerializer.Serialize(new { id, operation, payload })));
            return new(response.Task.WaitAsync(Deadline), read.Task);
        }
        internal Task<JsonElement> SendAsync(string operation, object? payload = null) => Queue(operation, payload).Response;

        public async ValueTask DisposeAsync()
        {
            _input.Writer.TryComplete();
            Assert.Equal(0, await _run.WaitAsync(Deadline));
        }

        private sealed class QueueReader(ChannelReader<string> input, Action<string> received) : TextReader
        {
            public override async Task<string?> ReadLineAsync()
            {
                if (!await input.WaitToReadAsync()) return null;
                var line = await input.ReadAsync();
                received(line);
                return line;
            }
        }
        private sealed class CallbackWriter(Action<string> posted) : TextWriter
        {
            public override Encoding Encoding => Encoding.UTF8;
            public override void WriteLine(string? value) => posted(value ?? "");
        }
    }

    private sealed class ProcessSession : IAsyncDisposable
    {
        private readonly Process _process;
        private readonly Task<string> _diagnostics;
        private ProcessSession(Process process)
        {
            _process = process;
            _diagnostics = process.StandardError.ReadToEndAsync();
        }

        internal static async Task<ProcessSession> StartAsync(string directory)
        {
            var assembly = typeof(DailyReportLocalConfigurationTests).Assembly.Location;
            var info = new ProcessStartInfo("dotnet")
            {
                UseShellExecute = false, CreateNoWindow = true,
                RedirectStandardInput = true, RedirectStandardOutput = true, RedirectStandardError = true
            };
            foreach (var argument in new[]
            {
                "exec", "--runtimeconfig", Path.ChangeExtension(assembly, ".runtimeconfig.json"),
                "--depsfile", Path.ChangeExtension(assembly, ".deps.json"),
                typeof(StdioHost).Assembly.Location, "--environment", "Development"
            }) info.ArgumentList.Add(argument);
            info.Environment["PRODUCTIONASSISTANT_DATA_DIR"] = directory;
            info.Environment["DOTNET_ENVIRONMENT"] = "Development";
            var session = new ProcessSession(Process.Start(info) ?? throw new InvalidOperationException("Could not start isolated Sidecar."));
            try
            {
                Success(await session.SendAsync("daily.list"));
                return session;
            }
            catch
            {
                await session.DisposeAsync();
                throw;
            }
        }

        internal async Task<Task<JsonElement>> QueueAsync(string operation, object? payload = null)
        {
            var id = Guid.NewGuid().ToString("N");
            await _process.StandardInput.WriteLineAsync(JsonSerializer.Serialize(new { id, operation, payload }));
            await _process.StandardInput.FlushAsync();
            return ReadResponseAsync(id);
        }
        private async Task<JsonElement> ReadResponseAsync(string id)
        {
            var line = await _process.StandardOutput.ReadLineAsync().WaitAsync(Deadline);
            Assert.NotNull(line);
            using var document = JsonDocument.Parse(line);
            var response = document.RootElement.Clone();
            Assert.Equal(id, response.GetProperty("id").GetString());
            return response;
        }
        internal async Task<JsonElement> SendAsync(string operation, object? payload = null) =>
            await (await QueueAsync(operation, payload));

        public async ValueTask DisposeAsync()
        {
            try
            {
                _process.StandardInput.Close();
                await _process.WaitForExitAsync().WaitAsync(Deadline);
                await _diagnostics;
                Assert.Equal(0, _process.ExitCode);
            }
            finally { _process.Dispose(); }
        }
    }

    private sealed class HttpRequests : EventListener
    {
        internal int Count;
        protected override void OnEventSourceCreated(EventSource eventSource)
        {
            if (eventSource.Name == "System.Net.Http") EnableEvents(eventSource, EventLevel.Informational);
        }
        protected override void OnEventWritten(EventWrittenEventArgs eventData)
        {
            if (eventData.EventName == "RequestStart") Interlocked.Increment(ref Count);
        }
    }
}
