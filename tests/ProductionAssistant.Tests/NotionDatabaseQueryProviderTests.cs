using System.Net;
using System.Text;
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
