using System.Net;
using System.Text.Json;
using ProductionAssistant.Models;
using ProductionAssistant.Services;
using Xunit;

public sealed class NotificationServiceTests
{
    [Fact]
    public async Task NotifyAsync_applies_the_global_rule_and_template()
    {
        var original = Environment.GetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR");
        var folder = Path.Combine(Path.GetTempPath(), "ProductionAssistant.NotificationTests", Guid.NewGuid().ToString("N"));
        Environment.SetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR", folder);
        try
        {
            var settings = new NotificationSettings();
            NotificationSettingsStore.Save(settings, "https://example.com/robot", "secret");
            var handler = new CaptureHandler();
            var service = new NotificationService(new DailyReportService(dingTalkClient: new HttpClient(handler)));

            var result = await service.NotifyAsync(NotificationEvents.ReportSendFailed,
                new Dictionary<string, string>
                {
                    ["taskName"] = "加工日报",
                    ["reportDate"] = "2026-08-26",
                    ["reason"] = "网络超时"
                });

            Assert.True(result.Succeeded);
            using var payload = JsonDocument.Parse(handler.Body);
            Assert.Equal("【日报发送失败】\n任务：加工日报\n日期：2026-08-26\n原因：网络超时",
                payload.RootElement.GetProperty("text").GetProperty("content").GetString());
        }
        finally
        {
            Environment.SetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR", original);
            if (Directory.Exists(folder)) Directory.Delete(folder, true);
        }
    }

    private sealed class CaptureHandler : HttpMessageHandler
    {
        public string Body { get; private set; } = "";

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            Body = request.Content is null ? "" : await request.Content.ReadAsStringAsync(cancellationToken);
            return new(HttpStatusCode.OK) { Content = new StringContent("{\"errcode\":0,\"errmsg\":\"ok\"}") };
        }
    }
}
