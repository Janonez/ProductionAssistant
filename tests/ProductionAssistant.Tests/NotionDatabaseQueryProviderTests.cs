using System.Net;
using System.Text;
using System.Text.Json;
using ProductionAssistant.Services;
using Xunit;

public sealed class NotionDatabaseQueryProviderTests
{
    [Fact]
    public async Task View_list_contains_only_views_owned_by_the_selected_database()
    {
        var requests = new List<string>();
        using var client = new HttpClient(new StubHandler(request =>
        {
            requests.Add(request.RequestUri!.PathAndQuery);
            return request.RequestUri.PathAndQuery switch
            {
                "/v1/views?database_id=db&page_size=100" => Json("""{"results":[{"id":"local"},{"id":"linked"}],"has_more":false,"next_cursor":null}"""),
                "/v1/views/local" => Json("""{"id":"local","name":"本年截止今日","data_source_id":"source","parent":{"database_id":"db"}}"""),
                "/v1/views/linked" => Json("""{"id":"linked","name":"今日数据","data_source_id":"source","parent":{"database_id":"other-db"}}"""),
                _ => new(HttpStatusCode.NotFound)
            };
        }));
        var settings = new NotionSettings
        {
            Token = "token",
            CachedDataSources = [new("source", "焊接数据库", "生产 / 焊接数据库", DatabaseId: "db")]
        };
        var provider = new NotionDatabaseQueryProvider(client, () => settings);

        var views = await provider.GetDatasetsAsync("source");

        var view = Assert.Single(views);
        Assert.Equal("本年截止今日", view.Name);
        Assert.Contains("/v1/views?database_id=db&page_size=100", requests);
    }

    [Fact]
    public async Task Date_range_query_uses_property_id_and_keeps_the_filter_on_every_page()
    {
        var bodies = new List<string>();
        using var client = new HttpClient(new StubHandler(request =>
        {
            bodies.Add(request.Content!.ReadAsStringAsync().GetAwaiter().GetResult());
            return bodies.Count == 1
                ? Json(JsonSerializer.Serialize(new
                {
                    results = Enumerable.Range(1, 100).Select(id => new { id = id.ToString(), properties = new { } }),
                    has_more = true,
                    next_cursor = "next"
                }))
                : Json("""{"results":[{"id":"101","properties":{}}],"has_more":false,"next_cursor":null}""");
        }));
        var provider = new NotionDatabaseQueryProvider(client, () => new NotionSettings
        {
            Token = "token",
            CachedDataSources = [new("source", "焊接数据库", "生产 / 焊接数据库")]
        });

        var result = await provider.QueryDateRangeAsync(
            "source", "stable-date-id", new DateOnly(2026, 1, 1), new DateOnly(2026, 9, 3));

        Assert.True(result.Succeeded, result.Message);
        Assert.Equal(101, result.Records.Count);
        Assert.Equal(2, bodies.Count);
        foreach (var body in bodies)
        {
            using var json = JsonDocument.Parse(body);
            var filters = json.RootElement.GetProperty("filter").GetProperty("and");
            Assert.All(filters.EnumerateArray(), filter =>
                Assert.Equal("stable-date-id", filter.GetProperty("property").GetString()));
            Assert.Equal("2026-01-01",
                filters[0].GetProperty("date").GetProperty("on_or_after").GetString());
            Assert.Equal("2026-09-03",
                filters[1].GetProperty("date").GetProperty("on_or_before").GetString());
        }
        using var second = JsonDocument.Parse(bodies[1]);
        Assert.Equal("next", second.RootElement.GetProperty("start_cursor").GetString());
    }

    [Fact]
    public async Task Exact_match_query_uses_the_stable_date_property_id_and_month_value()
    {
        string body = "";
        using var client = new HttpClient(new StubHandler(request =>
        {
            body = request.Content!.ReadAsStringAsync().GetAwaiter().GetResult();
            return Json("""{"results":[{"id":"sep","properties":{}}],"has_more":false,"next_cursor":null}""");
        }));
        var provider = new NotionDatabaseQueryProvider(client, () => new NotionSettings
        {
            Token = "token",
            CachedDataSources = [new("source", "月计划数据库", "生产 / 月计划数据库")]
        });

        var result = await provider.QueryExactMatchAsync(
            "source", "stable-month-id", new DateOnly(2026, 9, 1));

        Assert.True(result.Succeeded, result.Message);
        Assert.Single(result.Records);
        using var json = JsonDocument.Parse(body);
        var filter = json.RootElement.GetProperty("filter");
        Assert.Equal("stable-month-id", filter.GetProperty("property").GetString());
        Assert.Equal("2026-09-01", filter.GetProperty("date").GetProperty("equals").GetString());
    }

    private static HttpResponseMessage Json(string value) => new(HttpStatusCode.OK)
    {
        Content = new StringContent(value, Encoding.UTF8, "application/json")
    };

    private sealed class StubHandler(Func<HttpRequestMessage, HttpResponseMessage> response) : HttpMessageHandler
    {
        protected override Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request,
            CancellationToken cancellationToken) => Task.FromResult(response(request));
    }
}
