using System.Net;
using System.Text;
using ProductionAssistant.Services;
using Xunit;

namespace ProductionAssistant.Tests;

public sealed class NotionContractTests
{
    [Fact]
    public async Task Discovery_sends_the_supported_Notion_contract()
    {
        HttpRequestMessage? captured = null;
        var handler = new StubHandler(request =>
        {
            captured = request;
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(
                    """{"results":[],"has_more":false,"next_cursor":null}""",
                    Encoding.UTF8,
                    "application/json")
            };
        });
        var service = new NotionImportService(new HttpClient(handler)
        {
            BaseAddress = new Uri("https://api.notion.com/v1/")
        });

        var result = await service.DiscoverAsync("secret-token", string.Empty);

        Assert.True(result.Succeeded);
        Assert.NotNull(captured);
        Assert.Equal(HttpMethod.Post, captured.Method);
        Assert.Equal("https://api.notion.com/v1/search", captured.RequestUri?.ToString());
        Assert.Equal("Bearer", captured.Headers.Authorization?.Scheme);
        Assert.Equal("secret-token", captured.Headers.Authorization?.Parameter);
        Assert.True(captured.Headers.TryGetValues("Notion-Version", out var versions));
        Assert.Equal("2026-03-11", Assert.Single(versions));
    }

    [Fact]
    public async Task Discovery_maps_an_invalid_response_to_failure()
    {
        var service = new NotionImportService(new HttpClient(new StubHandler(_ =>
            new HttpResponseMessage(HttpStatusCode.Unauthorized)))
        {
            BaseAddress = new Uri("https://api.notion.com/v1/")
        });

        var result = await service.DiscoverAsync("bad-token", string.Empty);

        Assert.False(result.Succeeded);
        Assert.Empty(result.DataSources);
    }

    private sealed class StubHandler(Func<HttpRequestMessage, HttpResponseMessage> responseFactory)
        : HttpMessageHandler
    {
        protected override Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request,
            CancellationToken cancellationToken) =>
            Task.FromResult(responseFactory(request));
    }
}
