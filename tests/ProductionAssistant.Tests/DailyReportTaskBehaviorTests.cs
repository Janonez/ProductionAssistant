using System.Net;
using System.Text.Json;
using ProductionAssistant.Models;
using ProductionAssistant.Services;
using Xunit;

public sealed class DailyReportTaskBehaviorTests : IDisposable
{
    private readonly string? _original = Environment.GetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR");
    private readonly string _folder = Path.Combine(Path.GetTempPath(), "DailyReportTaskTests", Guid.NewGuid().ToString("N"));

    public DailyReportTaskBehaviorTests() => Environment.SetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR", _folder);
    public void Dispose()
    {
        Environment.SetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR", _original);
        if (Directory.Exists(_folder)) Directory.Delete(_folder, true);
    }

    [Fact]
    public void Enabling_requires_only_notification_configuration_not_content_or_tests()
    {
        var job = new DailyReportJob { Name = "", ConfigurationValidated = false };
        Assert.Equal("notification", DailyReportTaskHandler.MissingStep(job)?.Step);
        NotificationSettingsStore.Save(new NotificationSettings { DingTalkEnabled = true, DingTalkConnected = false },
            "https://example.com/robot", "secret");
        Assert.Null(DailyReportTaskHandler.MissingStep(job));
    }

    [Fact]
    public void Saving_content_keeps_enabled_state_and_updates_execution_version_without_a_test()
    {
        var job = new DailyReportJob { IsEnabled = true, ActiveTemplateVersion = 2, ConfigurationValidated = true };
        Assert.True(DailyReportSettingsStore.UpdateTemplate(job, "新消息", "文档"));
        Assert.True(job.IsEnabled);
        Assert.False(job.ConfigurationValidated);
        Assert.Equal("新消息", job.ActiveTemplate);
        Assert.Equal("文档", job.ActiveTemplateDocument);
        Assert.Equal(3, job.ActiveTemplateVersion);
        Assert.False(DailyReportSettingsStore.UpdateTemplate(job, "新消息", "文档"));
        Assert.Equal(3, job.ActiveTemplateVersion);
    }

    [Fact]
    public async Task Today_send_uses_saved_content_without_enabling_testing_or_a_published_version()
    {
        NotificationSettingsStore.Save(new NotificationSettings { DingTalkEnabled = true, DingTalkConnected = false },
            "https://example.com/robot", "secret");
        var handler = new CaptureHandler();
        var service = new DailyReportService(dingTalkClient: new HttpClient(handler));
        var runner = new DailyReportRunner(service, new NotificationService(service));
        var job = new DailyReportJob { DraftTemplate = "当前 today(\"yyyy-MM-dd\")", ActiveTemplate = "旧内容", ConfigurationValidated = false };
        DailyReportSettingsStore.SaveJob(job);
        Assert.Equal(DailyReportExitCode.Success, await runner.SendTodayAsync(job.Id));
        Assert.Equal($"当前 {DateTime.Today:yyyy-MM-dd}", handler.Messages.Single());
        Assert.Equal(DailyReportExitCode.Success, await runner.TestAsync(job, new DateTime(2026, 9, 6), job.DraftTemplate));
        Assert.Equal("当前 2026-09-06", handler.Messages.Last());
        var saved = DailyReportSettingsStore.LoadCatalog().Jobs.Single();
        Assert.False(saved.IsEnabled);
        Assert.False(saved.ConfigurationValidated);
        Assert.Equal(0, saved.ActiveTemplateVersion);
        Assert.Equal("旧内容", saved.ActiveTemplate);
        Assert.Equal(DailyReportExitCode.AlreadySent, await runner.SendTodayAsync(job.Id));
        Assert.Equal(2, handler.Messages.Count);
    }

    [Fact]
    public async Task Enabled_task_with_empty_content_records_failure_without_disabling_it()
    {
        var job = new DailyReportJob { IsEnabled = true, ConfigurationValidated = false };
        DailyReportSettingsStore.SaveJob(job);
        Assert.Equal(DailyReportExitCode.InvalidData, await new DailyReportRunner().RunAsync(job.Id));
        Assert.True(DailyReportSettingsStore.LoadCatalog().Jobs.Single().IsEnabled);
        var record = Assert.Single(DailyReportSettingsStore.LoadRunRecords(job.Id));
        Assert.False(record.Succeeded);
        Assert.Contains("内容为空", record.Error);
    }

    private sealed class CaptureHandler : HttpMessageHandler
    {
        public List<string> Messages { get; } = [];
        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            using var body = JsonDocument.Parse(await request.Content!.ReadAsStringAsync(cancellationToken));
            Messages.Add(body.RootElement.GetProperty("text").GetProperty("content").GetString()!);
            return new(HttpStatusCode.OK) { Content = new StringContent("{\"errcode\":0,\"errmsg\":\"ok\"}") };
        }
    }
}
