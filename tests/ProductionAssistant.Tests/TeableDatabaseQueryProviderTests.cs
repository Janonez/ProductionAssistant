using System.Net;
using System.Text.Json.Nodes;
using ProductionAssistant.Services;
using Xunit;

public sealed class TeableDatabaseQueryProviderTests
{
    private static readonly TeableQuerySource Source = new("notionSource", "下料", "数据库 / 下料 / 下料", "tblTest",
        [new("dateId", "日期", "date", "fldDate", "date"), new("weightId", "重量", "number", "fldWeight", "number")],
        [new("notionView", "本年截止今日", "viwTest")]);
    private const string Schema = "[{\"id\":\"fldDate\",\"name\":\"日期\",\"type\":\"date\"},{\"id\":\"fldWeight\",\"name\":\"重量\",\"type\":\"number\"}]";

    private static TeableDatabaseQueryProvider Provider(Func<HttpRequestMessage, string> send) => new(new(false, [Source]),
        () => new TeableClient("https://example.test", "secret", new Handler(send)));

    [Fact]
    public async Task Date_range_preserves_original_ids_zero_null_and_beijing_midnight()
    {
        var provider = Provider(request =>
        {
            if (request.RequestUri!.AbsolutePath.EndsWith("/field")) return Schema;
            Assert.Contains("ignoreViewQuery=true", request.RequestUri.Query);
            Assert.Contains("projection=fldDate", request.RequestUri.Query);
            return """
                {"records":[
                    {"id":"rec1","fields":{"fldDate":"2026-10-08T16:00:00.000Z","fldWeight":0}},
                    {"id":"rec2","fields":{"fldDate":"2026-10-09T15:59:59.000Z","fldWeight":48.501}},
                    {"id":"rec3","fields":{"fldDate":"2026-10-09T16:00:00.000Z","fldWeight":10}},
                    {"id":"rec4","fields":{"fldDate":"2026-10-09T00:00:00+08:00"}}]}
                """;
        });
        var result = await provider.QueryExactMatchAsync(Source.Id, "dateId", new(2026, 10, 9));
        Assert.True(result.Succeeded, result.Message);
        Assert.Equal(3, result.Records.Count);
        Assert.Equal(2, result.RequestCount);
        Assert.Equal(0d, result.Records[0].Fields.Single(field => field.Id == "weightId").Value);
        Assert.Equal(48.501d, result.Records[1].Fields.Single(field => field.Id == "weightId").Value);
        Assert.Null(result.Records[2].Fields.Single(field => field.Id == "weightId").Value);
        Assert.Equal(new DateTime(2026, 10, 9), result.Records[0].Fields[0].Value);
    }

    [Fact]
    public async Task View_binding_uses_migrated_view_and_projects_hidden_date_for_aggregation()
    {
        var provider = Provider(request =>
        {
            if (request.RequestUri!.AbsolutePath.EndsWith("/field")) return Schema;
            if (request.RequestUri.AbsolutePath.EndsWith("/view/viwTest")) return "{\"name\":\"本年截止今日\",\"type\":\"grid\"}";
            Assert.Contains("viewId=viwTest", request.RequestUri.Query);
            Assert.DoesNotContain("ignoreViewQuery", request.RequestUri.Query);
            Assert.Contains("projection=fldDate", request.RequestUri.Query);
            return "{\"records\":[{\"id\":\"rec1\",\"fields\":{\"fldDate\":\"2026-10-08T16:00:00Z\",\"fldWeight\":12.5}}]}";
        });
        var result = await new DatabaseQueryService(provider).InspectAsync(new(Source.Id, "notionView", "dateId", "weightId", "day", new(2026, 10, 9)));
        Assert.True(result.Succeeded, result.Message);
        Assert.Equal(12.5, result.Total);
        Assert.Equal(1, result.RecordCount);
        Assert.Equal("Teable", result.ProviderName);
    }

    [Fact]
    public async Task Pagination_reads_second_page_and_rejects_duplicates_without_partial_success()
    {
        var duplicate = false;
        var provider = Provider(request =>
        {
            if (request.RequestUri!.AbsolutePath.EndsWith("/field")) return Schema;
            if (request.RequestUri.Query.Contains("skip=1000"))
                return $"{{\"records\":[{{\"id\":\"{(duplicate ? "rec0" : "recLast")}\",\"fields\":{{}}}}]}}";
            return new JsonObject { ["records"] = new JsonArray(Enumerable.Range(0, 1000).Select(index => (JsonNode)new JsonObject
                { ["id"] = $"rec{index}", ["fields"] = new JsonObject() }).ToArray()) }.ToJsonString();
        });
        Assert.Equal(1001, (await provider.QueryDatasetAsync(Source.Id, Source.TableId)).Records.Count);
        duplicate = true;
        var result = await provider.QueryDatasetAsync(Source.Id, Source.TableId);
        Assert.False(result.Succeeded);
        Assert.Empty(result.Records);
    }

    [Fact]
    public async Task Missing_mapping_or_schema_drift_stops_before_reading_records()
    {
        var calls = 0;
        var provider = Provider(_ => { calls++; return Schema.Replace("fldWeight", "fldChanged"); });
        Assert.False((await provider.QueryDatasetAsync(Source.Id, "unknownView")).Succeeded);
        Assert.Equal(0, calls);
        Assert.False((await provider.QueryDatasetAsync(Source.Id, Source.TableId)).Succeeded);
        Assert.Equal(1, calls);
    }

    private sealed class Handler(Func<HttpRequestMessage, string> send) : HttpMessageHandler
    {
        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken) =>
            Task.FromResult(new HttpResponseMessage(HttpStatusCode.OK) { Content = new StringContent(send(request)) });
    }
}
