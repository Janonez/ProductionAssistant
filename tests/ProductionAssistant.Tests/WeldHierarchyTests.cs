using System.Net;
using System.Text;
using System.Text.Json;
using ProductionAssistant.Services;
using Xunit;

namespace ProductionAssistant.Tests;

public sealed class WeldHierarchyTests : IDisposable
{
    private readonly string? _original = Environment.GetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR");
    private readonly string _folder = Path.Combine(Path.GetTempPath(), "WeldHierarchyTests", Guid.NewGuid().ToString("N"));

    public WeldHierarchyTests() => Environment.SetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR", _folder);

    public void Dispose()
    {
        Environment.SetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR", _original);
        Directory.Delete(_folder, true);
    }

    [Theory]
    [InlineData(false, false, false)]
    [InlineData(false, true, false)]
    [InlineData(false, true, true)]
    [InlineData(true, false, false)]
    public async Task Import_follows_month_relation_and_preserves_legacy_weeks(
        bool legacy, bool existing, bool duplicate)
    {
        NotionSettingsStore.Save(new NotionSettings
        {
            Token = "test-token",
            Targets = [new NotionTargetSettings
            {
                ModuleKey = "daily-weld-simulation", Id = "day", Name = "焊接数据库",
                TitleProperty = "业务", DateProperty = "日期", QuantityProperty = "焊接（吨）"
            }],
            // 当前结构故意没有缓存月库，同时放入旧同名库，证明实际按关联 ID 定位。
            CachedDataSources = [new("old-month", "每月焊接量", ""), new("week", "上周焊接量", "")]
        });
        var writes = new List<(string Path, JsonElement Body)>();
        var monthId = legacy ? "old-month" : "month";
        var handler = new Handler(async request =>
        {
            var path = request.RequestUri!.AbsolutePath;
            if (request.Method == HttpMethod.Get)
            {
                if (path == "/v1/data_sources/day")
                    return Json(Schema(new Dictionary<string, object>
                    {
                        ["业务"] = new { type = "title" }, ["日期"] = new { type = "date" },
                        ["焊接（吨）"] = new { type = "number" },
                        [legacy ? "月关联" : "所属月份"] = new { type = "relation", relation = new { data_source_id = monthId } },
                        ["周关联"] = legacy ? (object)new { type = "relation", relation = new { data_source_id = "week" } } : new { type = "rich_text" }
                    }));
                if (path == $"/v1/data_sources/{monthId}")
                    return Json(Schema(new Dictionary<string, object>
                    {
                        [legacy ? "月份" : " 业务"] = new { type = "title" },
                        [legacy ? "日期变量" : "日期"] = new { type = "date" },
                        [legacy ? "产量/吨" : "焊接（吨）"] = new { type = "number" }
                    }));
                Assert.True(legacy, "当前结构不能读取周库或旧月库");
                Assert.Equal("/v1/data_sources/week", path);
                return Json("""{"properties":{"周期":{"type":"title"},"日期范围":{"type":"date"}}}""");
            }
            if (path.EndsWith("/query"))
            {
                Assert.True(legacy || !path.Contains("week") && !path.Contains("old-month"));
                var page = path.Contains("/day/")
                    ? """{"id":"existing-day","properties":{"日期":{"date":{"start":"2026-09-01"}}}}"""
                    : """{"id":"existing-month","properties":{}}""";
                var results = existing ? page + (duplicate && path.Contains("/day/") ? "," + page : "") : "";
                return Json("{\"results\":[" + results + "],\"has_more\":false}");
            }
            using var body = JsonDocument.Parse(await request.Content!.ReadAsStringAsync());
            writes.Add((path, body.RootElement.Clone()));
            return Json("""{"id":"created-page"}""");
        });
        var service = new NotionImportService(new HttpClient(handler) { BaseAddress = new Uri("https://api.notion.com/v1/") });
        var result = await service.ImportWeldHierarchyAsync(new([new(new DateTime(2026, 9, 1), 12)]));

        if (duplicate)
        {
            Assert.False(result.Succeeded);
            Assert.Contains("重复日期", result.Message);
            Assert.Empty(writes);
            return;
        }
        Assert.True(result.Succeeded, result.Message);
        Assert.Equal(legacy ? 3 : 2, writes.Count);
        var month = writes[0].Body.GetProperty("properties");
        Assert.Equal(12, month.GetProperty(legacy ? "产量/吨" : "焊接（吨）").GetProperty("number").GetInt32());
        Assert.True(month.TryGetProperty(legacy ? "月份" : " 业务", out _));
        var day = writes[^1].Body.GetProperty("properties");
        Assert.Equal(12, day.GetProperty("焊接（吨）").GetProperty("number").GetInt32());
        Assert.Equal(existing ? "existing-month" : "created-page",
            day.GetProperty(legacy ? "月关联" : "所属月份").GetProperty("relation")[0].GetProperty("id").GetString());
        Assert.Equal(legacy, day.TryGetProperty("周关联", out _));
        Assert.Equal(existing ? "/v1/pages/existing-day" : "/v1/pages", writes[^1].Path);
    }

    private static string Schema(object properties) => JsonSerializer.Serialize(new { properties });
    private static HttpResponseMessage Json(string content) => new(HttpStatusCode.OK)
    {
        Content = new StringContent(content, Encoding.UTF8, "application/json")
    };
    private sealed class Handler(Func<HttpRequestMessage, Task<HttpResponseMessage>> respond) : HttpMessageHandler
    {
        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken) => respond(request);
    }
}
