using System.Net;
using System.Text;
using System.Text.Json;
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

    [Fact]
    public async Task Authorized_search_preserves_the_original_page_and_database_hierarchy()
    {
        var handler = new StubHandler(request => request.RequestUri!.AbsolutePath switch
        {
            "/v1/search" => Json("""{"results":[{"id":"source","title":[{"plain_text":"焊接总库"}],"parent":{"database_id":"database"}}],"has_more":false,"next_cursor":null}"""),
            "/v1/databases/database" => Json("""{"parent":{"type":"page_id","page_id":"welding"}}"""),
            "/v1/pages/welding" => Json(Page("焊接", "root")),
            "/v1/pages/root" => Json("""{"parent":{"type":"workspace","workspace":true},"properties":{"title":{"type":"title","title":[{"plain_text":"数据库"}]}}}"""),
            _ => new HttpResponseMessage(HttpStatusCode.NotFound)
        });
        var service = new NotionImportService(new HttpClient(handler)
        {
            BaseAddress = new Uri("https://api.notion.com/v1/")
        });

        var result = await service.DiscoverAsync("secret-token", string.Empty);

        Assert.True(result.Succeeded, result.Message);
        var source = Assert.Single(result.DataSources);
        Assert.Equal("数据库  /  焊接  /  焊接总库", source.Path);
        Assert.Equal("焊接", DailyReportPresentation.BusinessSection(source.Path));
    }

    private static string Page(string title, string parentPageId) => JsonSerializer.Serialize(new
    {
        parent = new { type = "page_id", page_id = parentPageId },
        properties = new { title = new { type = "title", title = new[] { new { plain_text = title } } } }
    });

    private static HttpResponseMessage Json(string value) => new(HttpStatusCode.OK)
    {
        Content = new StringContent(value, Encoding.UTF8, "application/json")
    };

    private sealed class StubHandler(Func<HttpRequestMessage, HttpResponseMessage> responseFactory)
        : HttpMessageHandler
    {
        protected override Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request,
            CancellationToken cancellationToken) =>
            Task.FromResult(responseFactory(request));
    }
}
