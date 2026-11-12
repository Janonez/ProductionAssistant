using System.Diagnostics;
using System.Net;
using System.Runtime.CompilerServices;
using System.Text.Json;
using ProductionAssistant.Models;
using ProductionAssistant.Services;
using ProductionAssistant.Sidecar;
using Xunit;

namespace ProductionAssistant.Tests;

public sealed class SidecarLocalConfigurationTests : IDisposable
{
    // Independent test expectations; never derive these from the production allowlist.
    internal static readonly string[] ExpectedAllowedOperations =
    [
        "production.cancel", "production.getBindings", "weld.getState", "weld.generate",
        "database.getState", "database.getSchema", "database.inspect",
        "tencentSheet.get", "tencentSheet.runs", "tencentSheet.sources", "tencentSheet.schema", "tencentSheet.views",
        // T1-A migrates local document configuration; document writes remain blocked below.
        "tencentSheet.create", "tencentSheet.save",
        "notionFill.runs", "settings.open", "automation.list", "daily.list", "daily.get", "daily.runs", "report.getState",
        "settings.saveNotification", "settings.saveNotificationRules", "daily.create", "daily.saveTemplate",
        "tencentSheet.sessionStatus", "tencentSheet.sessionOpen", "tencentSheet.sessionVerify", "tencentSheet.sessionClose"
    ];
    internal static readonly string[] ExpectedUnmigratedOperations =
    [
        "automation.delete", "automation.setEnabled",
        "daily.addField", "daily.delete", "daily.getProperties", "daily.preview", "daily.saveBasics",
        "daily.sendToday", "daily.setEnabled", "daily.test",
        "meeting.export", "meeting.openOutput", "meeting.pickFile",
        "notionFill.create", "notionFill.get", "notionFill.runNow", "notionFill.save", "notionFill.test", "notionFill.testSource",
        "plan.audit", "plan.export", "plan.openOutput", "plan.pickFolder", "plan.repair",
        "production.check", "production.parse", "production.saveBindings", "production.write",
        "report.authenticate", "report.run", "report.saveConfig",
        "settings.refreshDataSources", "settings.saveConnection", "settings.testNotification",
        "tencentSheet.addField", "tencentSheet.backgroundTest", "tencentSheet.deleteField", "tencentSheet.fetch",
        "tencentSheet.inspect", "tencentSheet.recognize", "tencentSheet.teach", "tencentSheet.updateField", "tencentSheet.write",
        "tencentSite.captureCell", "tencentSite.open", "tencentSite.pick", "tencentSite.save", "tencentSite.test", "tencentSite.testSheet",
        "weld.check", "weld.saveBinding", "weld.write"
    ];
    internal static readonly string[] RetiredLoginOperations =
    [
        "tencentSheet.login", "tencentSheet.loginAgreement", "tencentSheet.open", "tencentSheet.close"
    ];

    private const string FakeWebhook = "local-only-webhook-marker";

    [Fact]
    public async Task Task_categories_roundtrip_through_real_handler_storage_and_sidecar_restart()
    {
        var inbound = new NotionFillJob { Name = "分类测试任务" };
        NotionFillSettingsStore.SaveJob(inbound);
        string dailyId, tencentId;
        await using (var sidecar = await SidecarSession.StartAsync(_folder))
        {
            var daily = await sidecar.SendAsync("daily.create", new { name = "分类测试任务", sendTime = "17:30" });
            AssertSuccess(daily);
            dailyId = daily.GetProperty("data").GetProperty("id").GetString()!;
            var tencent = await sidecar.SendAsync("tencentSheet.create", new { documentUrl = "https://docs.qq.com/sheet/category-fixture" });
            AssertSuccess(tencent);
            tencentId = tencent.GetProperty("data").GetProperty("id").GetString()!;
        }
        await using var restarted = await SidecarSession.StartAsync(_folder);
        var listed = await restarted.SendAsync("automation.list");
        AssertSuccess(listed);
        var tasks = listed.GetProperty("data").GetProperty("tasks").EnumerateArray().ToArray();
        Assert.Equal("daily_report", tasks.Single(task => task.GetProperty("id").GetString() == dailyId).GetProperty("taskType").GetString());
        Assert.Equal("notion_fill", tasks.Single(task => task.GetProperty("id").GetString() == inbound.Id).GetProperty("taskType").GetString());
        Assert.Equal("tencent_sheet_fill", tasks.Single(task => task.GetProperty("id").GetString() == tencentId).GetProperty("taskType").GetString());
        Assert.Equal(3, tasks.Length);
        Assert.False(Directory.Exists(Path.Combine(_folder, "tencent-sheet-profile")));
    }
    private const string FakeSecret = "local-only-secret-marker";
    private const string TestWebhook = "https://example.invalid/sd8b-notification-test";
    private readonly string? _original = Environment.GetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR");
    private readonly string _folder = Path.Combine(Path.GetTempPath(), "SidecarLocalConfigurationTests", Guid.NewGuid().ToString("N"));
    private string SettingsPath => Path.Combine(RuntimeEnvironment.DataDirectory, "notification-settings.json");

    [Fact]
    public async Task T1_session_protocol_round_trips_without_a_task_or_business_document()
    {
        await using var sidecar = await SidecarSession.StartAsync(_folder);
        foreach (var operation in new[] { "tencentSheet.sessionStatus", "tencentSheet.sessionClose" })
        {
            var response = await sidecar.SendAsync(operation);
            AssertSuccess(response);
            var state = response.GetProperty("data");
            Assert.Equal("closed", state.GetProperty("state").GetString());
            Assert.False(state.GetProperty("browserOpen").GetBoolean());
            Assert.Equal("unknown", state.GetProperty("authentication").GetString());
        }
        foreach (var operation in new[] { "tencentSheet.sessionOpen", "tencentSheet.sessionVerify" })
        {
            var response = await sidecar.SendAsync(operation, new { documentUrl = "https://example.invalid/t1-fixture" });
            AssertSuccess(response);
            Assert.Equal("InvalidDocumentUrl", response.GetProperty("data").GetProperty("code").GetString());
        }
        var blocked = await sidecar.SendAsync("tencentSheet.write");
        Assert.False(blocked.GetProperty("ok").GetBoolean());
        Assert.False(Directory.Exists(Path.Combine(_folder, "tencent-sheet-profile")));
    }

    // RuntimeEnvironment.Current is cached; select the test environment before any test loads it.
    [ModuleInitializer]
    internal static void InitializeEnvironment() => Environment.SetEnvironmentVariable("DOTNET_ENVIRONMENT", "Development");

    public SidecarLocalConfigurationTests()
    {
        Assert.True(RuntimeEnvironment.Current.IsDevelopment);
        Environment.SetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR", _folder);
        Directory.CreateDirectory(RuntimeEnvironment.DataDirectory);
    }

    public void Dispose()
    {
        Environment.SetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR", _original);
        if (Directory.Exists(_folder)) Directory.Delete(_folder, true);
    }

    [Fact]
    public void Allowlist_includes_T1_session_and_local_document_configuration_only()
    {
        Assert.True(StdioHost.AllowedOperations.SetEquals(ExpectedAllowedOperations));
        Assert.Equal(ExpectedAllowedOperations.Length, StdioHost.AllowedOperations.Count);
        Assert.All(ExpectedAllowedOperations, operation => Assert.Contains(operation, PrototypeBridgeProtocol.AllowedOperations));
        Assert.Empty(ExpectedAllowedOperations.Intersect(ExpectedUnmigratedOperations));
        Assert.True(PrototypeBridgeProtocol.AllowedOperations.SetEquals(ExpectedAllowedOperations.Concat(ExpectedUnmigratedOperations)));
        Assert.All(RetiredLoginOperations, operation => Assert.DoesNotContain(operation, PrototypeBridgeProtocol.AllowedOperations));
    }

    [Fact]
    public async Task Document_configuration_survives_sidecar_restart_and_invalid_save_without_opening_browser()
    {
        string id;
        var firstUrl = "https://docs.qq.com/sheet/local-fixture";
        var nextUrl = "https://docs.qq.com/sheet/saved-fixture";
        await using (var sidecar = await SidecarSession.StartAsync(_folder))
        {
            var created = await sidecar.SendAsync("tencentSheet.create", new { documentUrl = firstUrl });
            AssertSuccess(created);
            id = created.GetProperty("data").GetProperty("id").GetString()!;
            var saved = await sidecar.SendAsync("tencentSheet.save", new { id, configRevision = 0, config = new { documentUrl = nextUrl } });
            AssertSuccess(saved);
            Assert.Equal(nextUrl, saved.GetProperty("data").GetProperty("config").GetProperty("documentUrl").GetString());
            var invalid = await sidecar.SendAsync("tencentSheet.save", new { id, configRevision = 1, config = new { documentUrl = "https://example.invalid/rejected" } });
            Assert.False(invalid.GetProperty("ok").GetBoolean());
            Assert.Contains("HTTPS", invalid.GetProperty("error").GetString());
            Assert.False(Directory.Exists(Path.Combine(_folder, "tencent-sheet-profile")));
        }
        await using var restarted = await SidecarSession.StartAsync(_folder);
        var restored = await restarted.SendAsync("tencentSheet.get", new { id });
        AssertSuccess(restored);
        Assert.Equal(nextUrl, restored.GetProperty("data").GetProperty("config").GetProperty("documentUrl").GetString());
        var status = await restarted.SendAsync("tencentSheet.sessionStatus", new { documentUrl = nextUrl });
        AssertSuccess(status);
        Assert.False(status.GetProperty("data").GetProperty("browserOpen").GetBoolean());
        Assert.False(Directory.Exists(Path.Combine(_folder, "tencent-sheet-profile")));
        var write = await restarted.SendAsync("tencentSheet.write", new { id });
        Assert.False(write.GetProperty("ok").GetBoolean());
    }

    [Fact]
    public async Task Channel_save_roundtrips_without_plaintext_on_disk_or_credentials_in_responses()
    {
        var saved = await SendAsync("settings.saveNotification", Channel("local channel", FakeWebhook, FakeSecret));
        var opened = await SendAsync("settings.open");
        AssertSuccess(saved);
        AssertSuccess(opened);
        var state = Notification(opened);
        Assert.Equal("local channel", state.GetProperty("channelName").GetString());
        Assert.True(state.GetProperty("enabled").GetBoolean());
        Assert.True(state.GetProperty("webhookConfigured").GetBoolean());
        Assert.True(state.GetProperty("secretConfigured").GetBoolean());
        Assert.Equal(Notification(saved).GetRawText(), state.GetRawText());
        var settings = NotificationSettingsStore.Load();
        Assert.Equal(FakeWebhook, NotificationSettingsStore.ReadWebhook(settings));
        Assert.Equal(FakeSecret, NotificationSettingsStore.ReadSecret(settings));
        var disk = File.ReadAllText(SettingsPath);
        Assert.DoesNotContain(FakeWebhook, disk);
        Assert.DoesNotContain(FakeSecret, disk);
        foreach (var response in new[] { saved, opened })
        {
            Assert.DoesNotContain(FakeWebhook, response.GetRawText());
            Assert.DoesNotContain(FakeSecret, response.GetRawText());
            Assert.DoesNotContain(settings.EncryptedWebhook, response.GetRawText());
            Assert.DoesNotContain(settings.EncryptedSecret, response.GetRawText());
        }
    }

    [Fact]
    public async Task Rule_save_preserves_the_channel_credentials_and_rule_metadata()
    {
        AssertSuccess(await SendAsync("settings.saveNotification", Channel("keep channel", FakeWebhook, FakeSecret)));
        var before = NotificationSettingsStore.Load();
        var response = await SendAsync("settings.saveNotificationRules", Rules(NotificationEvents.ReportSendFailed, false));
        AssertSuccess(response);
        var after = NotificationSettingsStore.Load();
        Assert.False(after.Rules.Single(rule => rule.EventType == NotificationEvents.ReportSendFailed).Enabled);
        Assert.Equal(before.DingTalkChannelName, after.DingTalkChannelName);
        Assert.Equal(before.EncryptedWebhook, after.EncryptedWebhook);
        Assert.Equal(before.EncryptedSecret, after.EncryptedSecret);
        Assert.Equal(before.Rules.Select(rule => (rule.EventType, rule.Name, rule.Template, rule.Level)),
            after.Rules.Select(rule => (rule.EventType, rule.Name, rule.Template, rule.Level)));
        var opened = await SendAsync("settings.open");
        AssertSuccess(opened);
        Assert.Equal(Notification(response).GetRawText(), Notification(opened).GetRawText());
    }

    [Fact]
    public async Task Channel_save_with_blank_credentials_preserves_saved_credentials_rules_and_connection_status()
    {
        NotificationSettingsStore.Update(settings =>
        {
            settings.DingTalkConnected = true;
            settings.DingTalkStatus = "previous status";
            settings.Rules.Single(rule => rule.EventType == NotificationEvents.ReportSendFailed).Enabled = false;
        }, FakeWebhook, FakeSecret);
        var before = NotificationSettingsStore.Load();
        AssertSuccess(await SendAsync("settings.saveNotification", Channel("renamed", "  ", "")));
        var after = NotificationSettingsStore.Load();
        Assert.Equal("renamed", after.DingTalkChannelName);
        Assert.Equal(before.EncryptedWebhook, after.EncryptedWebhook);
        Assert.Equal(before.EncryptedSecret, after.EncryptedSecret);
        Assert.True(after.DingTalkConnected);
        Assert.Equal("previous status", after.DingTalkStatus);
        Assert.False(after.Rules.Single(rule => rule.EventType == NotificationEvents.ReportSendFailed).Enabled);
    }

    [Theory]
    [InlineData("none")]
    [InlineData("webhook")]
    [InlineData("secret")]
    [InlineData("both")]
    public async Task Notification_test_preserves_interleaved_configuration_and_rejects_stale_credentials(string credentialChange)
    {
        NotificationSettingsStore.Update(settings => settings.DingTalkChannelName = "original channel", TestWebhook, FakeSecret);
        var handler = new PausedNotificationHandler(true);
        using var client = new HttpClient(handler);
        var dispatcher = new OperationDispatcher(new StdioHost(TextReader.Null, TextWriter.Null, TextWriter.Null));
        var pending = dispatcher.TestSettingsNotificationAsync(JsonSerializer.SerializeToElement(Channel("original channel")),
            CancellationToken.None, new DailyReportService(dingTalkClient: client));
        try
        {
            await handler.Started.Task.WaitAsync(TimeSpan.FromSeconds(10));
            var old = NotificationSettingsStore.Load();
            Assert.False(pending.IsCompleted);
            var webhookChanged = credentialChange is "webhook" or "both";
            var secretChanged = credentialChange is "secret" or "both";
            NotificationSettingsStore.Update(current =>
            {
                current.DingTalkChannelName = "updated channel";
                current.DingTalkEnabled = false;
                current.Rules.Single(rule => rule.EventType == NotificationEvents.ReportSendFailed).Enabled = false;
                if (credentialChange != "none")
                {
                    current.DingTalkConnected = null;
                    current.DingTalkCheckedAt = null;
                    current.DingTalkStatus = "new credentials pending";
                }
            }, webhookChanged ? TestWebhook + "/replacement" : "", secretChanged ? FakeSecret + "-replacement" : "");
            var edited = NotificationSettingsStore.Load();
            Assert.Equal("original channel", old.DingTalkChannelName);
            Assert.True(old.Rules.Single(rule => rule.EventType == NotificationEvents.ReportSendFailed).Enabled);
            Assert.Equal(TestWebhook, handler.RequestUri!.GetLeftPart(UriPartial.Path));
            Assert.Contains("original channel", handler.Body);
            handler.Release.TrySetResult(true);
            var response = JsonSerializer.SerializeToElement(await pending);
            var saved = NotificationSettingsStore.Load();
            Assert.Equal(edited.DingTalkChannelName, saved.DingTalkChannelName);
            Assert.False(saved.DingTalkEnabled);
            Assert.Equal(edited.EncryptedWebhook, saved.EncryptedWebhook);
            Assert.Equal(edited.EncryptedSecret, saved.EncryptedSecret);
            Assert.Equal(JsonSerializer.Serialize(edited.Rules), JsonSerializer.Serialize(saved.Rules));
            Assert.Equal("updated channel", response.GetProperty("state").GetProperty("notification").GetProperty("channelName").GetString());
            Assert.Equal(1, handler.RequestCount);
            if (credentialChange == "none")
            {
                Assert.True(saved.DingTalkConnected);
                Assert.NotNull(saved.DingTalkCheckedAt);
                Assert.Equal("钉钉发送成功。", saved.DingTalkStatus);
            }
            else
            {
                Assert.Null(saved.DingTalkConnected);
                Assert.Null(saved.DingTalkCheckedAt);
                Assert.Equal("new credentials pending", saved.DingTalkStatus);
                Assert.Equal("通知凭据已变化，请使用当前配置重新测试。", response.GetProperty("message").GetString());
            }
        }
        finally
        {
            handler.Release.TrySetResult(true);
            await pending;
        }
    }

    [Theory]
    [InlineData(true)]
    [InlineData(false)]
    public async Task Notification_test_updates_only_result_fields_when_credentials_are_unchanged(bool succeeded)
    {
        NotificationSettingsStore.Update(settings =>
        {
            settings.ConfigVersion = 7;
            settings.DingTalkChannelName = "normal channel";
            settings.Rules.Single(rule => rule.EventType == NotificationEvents.ReportSendFailed).Enabled = false;
        }, TestWebhook, FakeSecret);
        var before = NotificationSettingsStore.Load();
        var handler = new PausedNotificationHandler(succeeded);
        using var client = new HttpClient(handler);
        var dispatcher = new OperationDispatcher(new StdioHost(TextReader.Null, TextWriter.Null, TextWriter.Null));
        var startedAt = DateTimeOffset.UtcNow;
        var pending = dispatcher.TestSettingsNotificationAsync(JsonSerializer.SerializeToElement(Channel("normal channel")),
            CancellationToken.None, new DailyReportService(dingTalkClient: client));
        try
        {
            await handler.Started.Task.WaitAsync(TimeSpan.FromSeconds(10));
            handler.Release.TrySetResult(true);
            var response = JsonSerializer.SerializeToElement(await pending);
            var saved = NotificationSettingsStore.Load();
            Assert.Equal(succeeded, saved.DingTalkConnected);
            Assert.InRange(saved.DingTalkCheckedAt!.Value, startedAt, DateTimeOffset.UtcNow);
            Assert.Equal(response.GetProperty("message").GetString(), saved.DingTalkStatus);
            before.DingTalkConnected = succeeded;
            before.DingTalkCheckedAt = saved.DingTalkCheckedAt;
            before.DingTalkStatus = saved.DingTalkStatus;
            Assert.Equal(JsonSerializer.Serialize(before), JsonSerializer.Serialize(saved));
            Assert.Equal(succeeded, response.GetProperty("state").GetProperty("notification").GetProperty("connected").GetBoolean());
            Assert.Equal(1, handler.RequestCount);
        }
        finally
        {
            handler.Release.TrySetResult(true);
            await pending;
        }
    }

    [Fact]
    public async Task Notification_test_keeps_the_disabled_channel_guard_without_sending()
    {
        NotificationSettingsStore.Update(settings => settings.DingTalkEnabled = false, TestWebhook, FakeSecret);
        var before = NotificationSettingsStore.Load();
        var handler = new PausedNotificationHandler(true);
        using var client = new HttpClient(handler);
        var dispatcher = new OperationDispatcher(new StdioHost(TextReader.Null, TextWriter.Null, TextWriter.Null));
        var response = JsonSerializer.SerializeToElement(await dispatcher.TestSettingsNotificationAsync(
            JsonSerializer.SerializeToElement(new { enabled = false, channelName = "disabled channel", webhook = "", secret = "" }),
            CancellationToken.None, new DailyReportService(dingTalkClient: client)));
        var saved = NotificationSettingsStore.Load();
        Assert.Equal(0, handler.RequestCount);
        Assert.False(saved.DingTalkEnabled);
        Assert.False(saved.DingTalkConnected);
        Assert.Equal(before.EncryptedWebhook, saved.EncryptedWebhook);
        Assert.Equal(before.EncryptedSecret, saved.EncryptedSecret);
        Assert.Equal("系统通知渠道未启用。", response.GetProperty("message").GetString());
    }

    [Fact]
    public async Task Rule_updates_ignore_unknown_events_and_reject_duplicates_before_writing()
    {
        NotificationSettingsStore.Save(new());
        var before = File.ReadAllBytes(SettingsPath);
        AssertSuccess(await SendAsync("settings.saveNotificationRules", Rules("unknown-event", true)));
        Assert.Equal(before, File.ReadAllBytes(SettingsPath));
        var duplicate = await SendAsync("settings.saveNotificationRules", new
        {
            rules = new[]
            {
                new { eventType = NotificationEvents.ReportSendFailed, enabled = false },
                new { eventType = NotificationEvents.ReportSendFailed, enabled = true }
            }
        });
        Assert.False(duplicate.GetProperty("ok").GetBoolean());
        Assert.Equal(before, File.ReadAllBytes(SettingsPath));
        AssertSuccess(await SendAsync("settings.saveNotificationRules", Rules(NotificationEvents.ReportSendFailed, false)));
    }

    [Fact]
    public async Task Missing_configuration_is_read_without_writing_and_can_then_be_saved()
    {
        Assert.False(File.Exists(SettingsPath));
        AssertSuccess(await SendAsync("settings.open"));
        Assert.False(File.Exists(SettingsPath));
        AssertSuccess(await SendAsync("settings.saveNotificationRules", Rules(NotificationEvents.ReportSendFailed, false)));
        Assert.True(File.Exists(SettingsPath));
    }

    [Theory]
    [InlineData("{broken-json")]
    [InlineData("null")]
    [InlineData("{\"Rules\":null}")]
    [InlineData("{\"Rules\":[null]}")]
    public async Task Corrupt_existing_configuration_is_not_replaced_by_any_save_or_legacy_import(string json)
    {
        File.WriteAllText(SettingsPath, json);
        var before = File.ReadAllBytes(SettingsPath);
        foreach (var operation in new[] { "settings.saveNotification", "settings.saveNotificationRules" })
        {
            var response = await SendAsync(operation, operation == "settings.saveNotification"
                ? Channel("must not replace") : Rules(NotificationEvents.ReportSendFailed, false));
            Assert.False(response.GetProperty("ok").GetBoolean());
            Assert.Contains("通知配置文件损坏", response.GetProperty("error").GetString());
            Assert.Equal(before, File.ReadAllBytes(SettingsPath));
        }
        Assert.Throws<InvalidOperationException>(() => NotificationSettingsStore.Load());
        Assert.Throws<InvalidOperationException>(() => NotificationSettingsStore.Save(new()));
        Assert.Throws<InvalidOperationException>(() => NotificationSettingsStore.ImportLegacy("legacy", "legacy"));
        Assert.Equal(before, File.ReadAllBytes(SettingsPath));
        Assert.False(File.Exists(SettingsPath + ".tmp"));
        File.WriteAllText(SettingsPath, "{}");
        AssertSuccess(await SendAsync("settings.saveNotification", Channel("recovered")));
    }

    [Theory]
    [InlineData("settings.saveNotification")]
    [InlineData("settings.saveNotificationRules")]
    public async Task Failed_atomic_replacement_returns_failure_and_preserves_the_original(string operation)
    {
        NotificationSettingsStore.Update(settings => settings.DingTalkChannelName = "original", FakeWebhook, FakeSecret);
        var before = File.ReadAllBytes(SettingsPath);
        using (var held = new FileStream(SettingsPath, FileMode.Open, FileAccess.Read, FileShare.Read))
        {
            var response = await SendAsync(operation, operation == "settings.saveNotification"
                ? Channel("blocked") : Rules(NotificationEvents.ReportSendFailed, false));
            Assert.False(response.GetProperty("ok").GetBoolean());
            Assert.Equal(before, File.ReadAllBytes(SettingsPath));
        }
        AssertSuccess(await SendAsync("settings.saveNotification", Channel("retry")));
        Assert.Equal("retry", NotificationSettingsStore.Load().DingTalkChannelName);
    }

    [Fact]
    public async Task An_unreadable_existing_file_is_not_treated_as_missing()
    {
        NotificationSettingsStore.Save(new());
        var before = File.ReadAllBytes(SettingsPath);
        using (var held = new FileStream(SettingsPath, FileMode.Open, FileAccess.ReadWrite, FileShare.None))
        {
            Assert.Throws<IOException>(() => NotificationSettingsStore.Load());
            Assert.False((await SendAsync("settings.saveNotification", Channel("blocked"))).GetProperty("ok").GetBoolean());
        }
        Assert.Equal(before, File.ReadAllBytes(SettingsPath));
    }

    [Fact]
    public async Task Concurrent_host_requests_preserve_each_distinct_rule_change_and_the_channel()
    {
        NotificationSettingsStore.Update(_ => { }, FakeWebhook, FakeSecret);
        var defaults = NotificationRule.CreateDefaults();
        var requests = defaults.Select(rule => Request("settings.saveNotificationRules", Rules(rule.EventType, !rule.Enabled)))
            .Append(Request("settings.saveNotification", Channel("concurrent channel"))).ToArray();
        var responses = await RunHostAsync(requests);
        var failures = responses.Where(response => !response.GetProperty("ok").GetBoolean()).ToArray();
        if (failures.Length > 0)
        {
            var operations = requests.Select(request =>
            {
                using var document = JsonDocument.Parse(request);
                return (Id: document.RootElement.GetProperty("id").GetString()!,
                    Operation: document.RootElement.GetProperty("operation").GetString()!);
            }).ToDictionary(request => request.Id, request => request.Operation);
            var details = new System.Text.StringBuilder();
            const string diagnosticMarker = "诊断编号：";
            foreach (var failure in failures)
            {
                var id = failure.GetProperty("id").GetString() ?? string.Empty;
                var error = failure.GetProperty("error").GetString() ?? string.Empty;
                var markerIndex = error.IndexOf(diagnosticMarker, StringComparison.Ordinal);
                var diagnosticId = markerIndex < 0 ? "未提供" : error[(markerIndex + diagnosticMarker.Length)..].Split('；')[0];
                var operation = operations.TryGetValue(id, out var requestedOperation) ? requestedOperation : "未匹配请求";
                details.AppendLine($"requestId={id}; operation={operation}; diagnosticId={diagnosticId}");
                details.AppendLine(failure.GetRawText());
            }
            var logPath = Path.Combine(RuntimeEnvironment.LogDirectory, "bridge-errors.log");
            details.AppendLine($"Diagnostic log: {logPath}");
            try
            {
                var log = File.ReadAllText(logPath);
                details.AppendLine(string.IsNullOrWhiteSpace(log) ? "日志为空。" : log);
            }
            catch (Exception ex) when (ex is IOException or UnauthorizedAccessException)
            {
                var state = ex is FileNotFoundException or DirectoryNotFoundException ? "日志不存在" : "日志无法读取";
                details.AppendLine($"{state}：{ex.GetType().FullName} HRESULT=0x{ex.HResult:X8}{Environment.NewLine}{ex}");
            }
            Assert.Fail(details.ToString());
        }
        Assert.Equal(requests.Length, responses.Length);
        Assert.All(responses, AssertSuccess);
        var saved = NotificationSettingsStore.Load();
        Assert.Equal("concurrent channel", saved.DingTalkChannelName);
        Assert.Equal(FakeWebhook, NotificationSettingsStore.ReadWebhook(saved));
        Assert.Equal(FakeSecret, NotificationSettingsStore.ReadSecret(saved));
        foreach (var rule in defaults)
            Assert.Equal(!rule.Enabled, saved.Rules.Single(item => item.EventType == rule.EventType).Enabled);
    }

    [Fact]
    public async Task Two_sidecar_processes_wait_for_the_shared_store_lease_then_preserve_both_updates()
    {
        NotificationSettingsStore.Update(_ => { }, FakeWebhook, FakeSecret);
        await using var first = await SidecarSession.StartAsync(_folder);
        await using var second = await SidecarSession.StartAsync(_folder);
        using var entered = new ManualResetEventSlim();
        using var release = new ManualResetEventSlim();
        var holder = HoldUpdateAsync(entered, release, settings => settings.DingTalkStatus = "held update");
        try
        {
            Assert.True(entered.Wait(TimeSpan.FromSeconds(10)));
            var channel = first.SendAsync("settings.saveNotification", Channel("process channel"));
            var rules = second.SendAsync("settings.saveNotificationRules", Rules(NotificationEvents.ReportSendFailed, false));
            await Task.Delay(200);
            Assert.False(channel.IsCompleted);
            Assert.False(rules.IsCompleted);
            release.Set();
            await holder;
            AssertSuccess(await channel);
            AssertSuccess(await rules);
            var opened = await first.SendAsync("settings.open");
            AssertSuccess(opened);
            Assert.Equal("process channel", Notification(opened).GetProperty("channelName").GetString());
            var saved = NotificationSettingsStore.Load();
            Assert.False(saved.Rules.Single(rule => rule.EventType == NotificationEvents.ReportSendFailed).Enabled);
            Assert.Equal("held update", saved.DingTalkStatus);
            Assert.Equal(FakeWebhook, NotificationSettingsStore.ReadWebhook(saved));
        }
        finally
        {
            release.Set();
            await holder;
        }
    }

    [Fact]
    public async Task Legacy_import_is_compatible_with_new_saves_and_never_replaces_existing_credentials()
    {
        var webhook = WindowsTokenProtector.Protect(FakeWebhook);
        var secret = WindowsTokenProtector.Protect(FakeSecret);
        NotificationSettingsStore.ImportLegacy(webhook, secret);
        AssertSuccess(await SendAsync("settings.saveNotificationRules", Rules(NotificationEvents.ReportSendFailed, false)));
        AssertSuccess(await SendAsync("settings.saveNotification", Channel("migrated channel")));
        var before = File.ReadAllBytes(SettingsPath);
        NotificationSettingsStore.ImportLegacy("must-not-replace", "must-not-replace");
        Assert.Equal(before, File.ReadAllBytes(SettingsPath));
        var saved = NotificationSettingsStore.Load();
        Assert.Equal(webhook, saved.EncryptedWebhook);
        Assert.Equal(secret, saved.EncryptedSecret);
        Assert.False(saved.Rules.Single(rule => rule.EventType == NotificationEvents.ReportSendFailed).Enabled);
        Assert.Equal("migrated channel", saved.DingTalkChannelName);
    }

    [Fact]
    public async Task Concurrent_legacy_import_waits_for_a_normal_update_and_keeps_the_new_credentials()
    {
        using var entered = new ManualResetEventSlim();
        using var release = new ManualResetEventSlim();
        var holder = HoldUpdateAsync(entered, release, settings =>
        {
            settings.EncryptedWebhook = WindowsTokenProtector.Protect(FakeWebhook);
            settings.EncryptedSecret = WindowsTokenProtector.Protect(FakeSecret);
        });
        try
        {
            Assert.True(entered.Wait(TimeSpan.FromSeconds(10)));
            using var attempted = new ManualResetEventSlim();
            var migration = Task.Run(() =>
            {
                attempted.Set();
                NotificationSettingsStore.ImportLegacy("legacy-ciphertext", "legacy-ciphertext");
            });
            Assert.True(attempted.Wait(TimeSpan.FromSeconds(10)));
            await Task.Delay(200);
            Assert.False(migration.IsCompleted);
            release.Set();
            await Task.WhenAll(holder, migration);
            var saved = NotificationSettingsStore.Load();
            Assert.Equal(FakeWebhook, NotificationSettingsStore.ReadWebhook(saved));
            Assert.Equal(FakeSecret, NotificationSettingsStore.ReadSecret(saved));
        }
        finally
        {
            release.Set();
            await holder;
        }
    }

    [Fact]
    public async Task Nested_reads_and_failed_updates_release_every_mutex_acquisition()
    {
        NotificationSettingsStore.Update(settings =>
        {
            _ = NotificationSettingsStore.Load();
            settings.DingTalkChannelName = "nested";
        });
        var before = File.ReadAllBytes(SettingsPath);
        Assert.Throws<InvalidOperationException>(() => NotificationSettingsStore.Update(_ => throw new InvalidOperationException("test failure")));
        Assert.Equal(before, File.ReadAllBytes(SettingsPath));
        AssertSuccess(await SendAsync("settings.saveNotification", Channel("after failure")));
    }

    [Fact]
    public async Task A_contended_mutex_times_out_without_writing_and_can_be_retried_after_release()
    {
        NotificationSettingsStore.Save(new());
        var before = File.ReadAllBytes(SettingsPath);
        var mutexName = NotificationSettingsStore.MutexName();
        using var entered = new ManualResetEventSlim();
        using var release = new ManualResetEventSlim();
        var holder = Task.Run(() =>
        {
            using var mutex = new Mutex(false, mutexName);
            Assert.True(mutex.WaitOne(TimeSpan.FromSeconds(10)));
            try
            {
                entered.Set();
                Assert.True(release.Wait(TimeSpan.FromSeconds(20)));
            }
            finally { mutex.ReleaseMutex(); }
        });
        try
        {
            Assert.True(entered.Wait(TimeSpan.FromSeconds(10)));
            var response = await SendAsync("settings.saveNotification", Channel("must time out"));
            Assert.False(response.GetProperty("ok").GetBoolean());
            Assert.Contains("通知配置正在更新", response.GetProperty("error").GetString());
            Assert.Equal(before, File.ReadAllBytes(SettingsPath));
        }
        finally
        {
            release.Set();
            await holder;
        }
        AssertSuccess(await SendAsync("settings.saveNotification", Channel("after timeout")));
    }

    [Fact]
    public async Task Abandoned_mutex_ownership_is_recovered_and_released()
    {
        using var mutex = new Mutex(false, NotificationSettingsStore.MutexName());
        var thread = new Thread(() => mutex.WaitOne());
        thread.Start();
        Assert.True(thread.Join(TimeSpan.FromSeconds(10)));
        AssertSuccess(await SendAsync("settings.saveNotification", Channel("after abandonment")));
        AssertSuccess(await SendAsync("settings.saveNotificationRules", Rules(NotificationEvents.ReportSendFailed, false)));
    }

    [Fact]
    public void Mutex_names_are_directory_scoped_and_normalize_case_and_trailing_separators()
    {
        var originalName = NotificationSettingsStore.MutexName();
        try
        {
            Environment.SetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR", _folder.ToUpperInvariant() + Path.DirectorySeparatorChar);
            Assert.Equal(originalName, NotificationSettingsStore.MutexName());
            Environment.SetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR", Path.Combine(_folder, "other"));
            Assert.NotEqual(originalName, NotificationSettingsStore.MutexName());
        }
        finally { Environment.SetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR", _folder); }
    }

    [Fact]
    public async Task Unmigrated_and_retired_operations_are_rejected_before_dispatch()
    {
        var blocked = PrototypeBridgeProtocol.AllowedOperations.Except(ExpectedAllowedOperations).ToArray();
        Assert.Equal(ExpectedUnmigratedOperations.Length, blocked.Length);
        Assert.True(blocked.ToHashSet(StringComparer.Ordinal).SetEquals(ExpectedUnmigratedOperations));
        var requests = blocked.Concat(RetiredLoginOperations).Append("unknown.operation").ToArray();
        var responses = await RunHostAsync(requests.Select(operation => Request(operation)).ToArray());
        Assert.Equal(requests.Length, responses.Length);
        Assert.All(responses, response =>
        {
            Assert.False(response.GetProperty("ok").GetBoolean());
            Assert.Equal("该操作尚未迁移到新宿主。", response.GetProperty("error").GetString());
        });
        Assert.False(File.Exists(SettingsPath));
    }

    private static object Channel(string name, string webhook = "", string secret = "") =>
        new { enabled = true, channelName = name, webhook, secret };

    private static object Rules(string eventType, bool enabled) => new { rules = new[] { new { eventType, enabled } } };

    private static string Request(string operation, object? payload = null) =>
        JsonSerializer.Serialize(new { id = Guid.NewGuid().ToString("N"), operation, payload });

    private static async Task<JsonElement> SendAsync(string operation, object? payload = null) =>
        Assert.Single(await RunHostAsync(Request(operation, payload)));

    private static async Task<JsonElement[]> RunHostAsync(params string[] requests)
    {
        using var input = new StringReader(string.Join(Environment.NewLine, requests));
        using var output = new StringWriter();
        using var diagnostics = new StringWriter();
        Assert.Equal(0, await new StdioHost(input, output, diagnostics).RunAsync());
        return output.ToString().Split('\n', StringSplitOptions.RemoveEmptyEntries).Select(line =>
        {
            using var document = JsonDocument.Parse(line);
            return document.RootElement.Clone();
        }).ToArray();
    }

    private static void AssertSuccess(JsonElement response) => Assert.True(response.GetProperty("ok").GetBoolean(), response.GetRawText());

    private static JsonElement Notification(JsonElement response)
    {
        var data = response.GetProperty("data");
        return (data.TryGetProperty("state", out var state) ? state : data).GetProperty("notification");
    }

    private static Task HoldUpdateAsync(ManualResetEventSlim entered, ManualResetEventSlim release, Action<NotificationSettings> update) =>
        Task.Run(() => NotificationSettingsStore.Update(settings =>
        {
            entered.Set();
            if (!release.Wait(TimeSpan.FromSeconds(20))) throw new TimeoutException("Test did not release the store lease.");
            update(settings);
        }));

    private sealed class PausedNotificationHandler(bool succeeded) : HttpMessageHandler
    {
        internal TaskCompletionSource<bool> Started { get; } = new(TaskCreationOptions.RunContinuationsAsynchronously);
        internal TaskCompletionSource<bool> Release { get; } = new(TaskCreationOptions.RunContinuationsAsynchronously);
        internal Uri? RequestUri { get; private set; }
        internal string Body { get; private set; } = "";
        internal int RequestCount { get; private set; }

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            RequestCount++;
            RequestUri = request.RequestUri;
            Body = await request.Content!.ReadAsStringAsync(cancellationToken);
            Started.TrySetResult(true);
            await Release.Task.WaitAsync(cancellationToken);
            return new(HttpStatusCode.OK)
            {
                Content = new StringContent(succeeded ? "{\"errcode\":0}" : "{\"errcode\":123,\"errmsg\":\"local rejection\"}")
            };
        }
    }

    private sealed class SidecarSession : IAsyncDisposable
    {
        private readonly Process _process;
        private readonly Task<string> _diagnostics;

        private SidecarSession(Process process)
        {
            _process = process;
            _diagnostics = process.StandardError.ReadToEndAsync();
        }

        internal static async Task<SidecarSession> StartAsync(string directory)
        {
            var assembly = typeof(SidecarLocalConfigurationTests).Assembly.Location;
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
            var session = new SidecarSession(Process.Start(info) ?? throw new InvalidOperationException("Could not start the test sidecar."));
            try
            {
                AssertSuccess(await session.SendAsync("settings.open"));
                return session;
            }
            catch
            {
                await session.DisposeAsync();
                throw;
            }
        }

        internal async Task<JsonElement> SendAsync(string operation, object? payload = null)
        {
            await _process.StandardInput.WriteLineAsync(Request(operation, payload));
            await _process.StandardInput.FlushAsync();
            var line = await _process.StandardOutput.ReadLineAsync().WaitAsync(TimeSpan.FromSeconds(20));
            Assert.NotNull(line);
            using var document = JsonDocument.Parse(line);
            return document.RootElement.Clone();
        }

        public async ValueTask DisposeAsync()
        {
            try
            {
                _process.StandardInput.Close();
                await _process.WaitForExitAsync().WaitAsync(TimeSpan.FromSeconds(20));
                await _diagnostics;
                Assert.Equal(0, _process.ExitCode);
            }
            finally { _process.Dispose(); }
        }
    }
}
