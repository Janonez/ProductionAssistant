using System.Net;
using System.Text.Json;
using ProductionAssistant.Services;
using Xunit;

public sealed class DailyReportServiceTests
{
    [Fact]
    public async Task CheckConnectionAsync_uses_head_without_sending_a_message()
    {
        var handler = new CaptureHandler();
        var service = new DailyReportService(dingTalkClient: new HttpClient(handler));

        var result = await service.CheckConnectionAsync("https://example.com/robot");

        Assert.True(result.Succeeded);
        Assert.Equal(HttpMethod.Head, handler.Method);
        Assert.Equal("", handler.Body);
    }

    [Fact]
    public async Task SendAsync_sends_exact_text_without_at_all()
    {
        var handler = new CaptureHandler();
        var service = new DailyReportService(dingTalkClient: new HttpClient(handler));
        const string template = "日报第一行\n日报第二行";

        var result = await service.SendAsync("https://example.com/robot", "secret", template);

        Assert.True(result.Succeeded);
        using var payload = JsonDocument.Parse(handler.Body);
        Assert.Equal(template, payload.RootElement.GetProperty("text").GetProperty("content").GetString());
        Assert.False(payload.RootElement.TryGetProperty("at", out _));
    }

    private sealed class CaptureHandler : HttpMessageHandler
    {
        public string Body { get; private set; } = "";
        public HttpMethod? Method { get; private set; }

        protected override async Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request,
            CancellationToken cancellationToken)
        {
            Method = request.Method;
            Body = request.Content is null ? "" : await request.Content.ReadAsStringAsync(cancellationToken);
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent("{\"errcode\":0,\"errmsg\":\"ok\"}")
            };
        }
    }
}
