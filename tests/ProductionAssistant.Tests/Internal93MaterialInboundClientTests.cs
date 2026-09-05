using System.Net;
using System.Text;
using ProductionAssistant.Services;
using Xunit;

namespace ProductionAssistant.Tests;

public sealed class Internal93MaterialInboundClientTests
{
    [Fact]
    public async Task Reads_verified_endpoint_and_splits_plate_from_other_materials()
    {
        var handler = new SequenceHandler(
            """{"state":"success","user_type":0,"login_id":"150","login_username":"tester","code":"token","validity":"360000","last_url_state":"authorized"}""",
            """{"code":0,"msg":"","data":[{"type":"钢板","inweight":"9.425"},{"type":"槽钢","inweight":"2.100"},{"type":"角钢","inweight":"1.050"},{"type":"钢管","inweight":"bad"}]}""");
        using var client = new Internal93MaterialInboundClient(new Internal93Options
        {
            BaseUrl = "https://internal.example.test",
            SourcePageUrl = "https://internal.example.test/inbound/summary.php",
            Username = "tester",
            Password = "secret"
        }, handler);

        var result = await client.GetDailySummaryAsync(new DateOnly(2026, 9, 3));

        Assert.Equal(9.425m, result.PlateWeight);
        Assert.Equal(3.150m, result.SectionWeight);
        Assert.Equal(12.575m, result.TotalWeight);
        Assert.Equal("/logindata.php", handler.Requests[0].Path);
        Assert.Contains("last_url=%2Finbound%2Fsummary.php", handler.Requests[0].Body);
        Assert.Equal("/inbound/summarydata.php", handler.Requests[1].Path);
        Assert.Equal("https://internal.example.test/inbound/summary.php", handler.Requests[1].Referrer);
        Assert.Contains("data%5Bstardata%5D=2026-09-03", handler.Requests[1].Query);
        Assert.Contains("data%5Bstopdata%5D=2026-09-03", handler.Requests[1].Query);
        Assert.Equal("XMLHttpRequest", handler.Requests[1].RequestedWith);
    }

    [Fact]
    public async Task Relogs_once_when_server_returns_unauthorized_text_with_http_200()
    {
        const string login = """{"state":"success","user_type":0,"login_id":"150","login_username":"tester","code":"token","validity":"360000","last_url_state":"authorized"}""";
        var handler = new SequenceHandler(login, "unauthorized access", login,
            """{"code":0,"msg":"","data":[{"type":"钢板","inweight":"1"}]}""");
        using var client = new Internal93MaterialInboundClient(new Internal93Options
        {
            BaseUrl = "https://internal.example.test",
            SourcePageUrl = "https://internal.example.test/inbound/summary.php",
            Username = "tester",
            Password = "secret"
        }, handler);

        var result = await client.GetDailySummaryAsync(new DateOnly(2026, 9, 3));

        Assert.Equal(1m, result.PlateWeight);
        Assert.Equal(4, handler.Requests.Count);
        Assert.Equal(2, handler.Requests.Count(request => request.Method == HttpMethod.Post));
    }

    private sealed class SequenceHandler(params string[] responses) : HttpMessageHandler
    {
        private readonly Queue<string> _responses = new(responses);
        public List<RequestSnapshot> Requests { get; } = [];

        protected override async Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request,
            CancellationToken cancellationToken)
        {
            Requests.Add(new(request.Method, request.RequestUri?.AbsolutePath ?? string.Empty,
                request.RequestUri?.Query ?? string.Empty,
                request.Headers.TryGetValues("X-Requested-With", out var values) ? values.Single() : string.Empty,
                request.Content is null ? string.Empty : await request.Content.ReadAsStringAsync(cancellationToken),
                request.Headers.Referrer?.AbsoluteUri ?? string.Empty));
            return new(HttpStatusCode.OK)
            {
                Content = new StringContent(_responses.Dequeue(), Encoding.UTF8, "text/html")
            };
        }
    }

    private sealed record RequestSnapshot(
        HttpMethod Method,
        string Path,
        string Query,
        string RequestedWith,
        string Body,
        string Referrer);
}
