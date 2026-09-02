using System.Net;
using System.Text;
using System.Text.Json;
using ProductionAssistant.Models;
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

    [Fact]
    public async Task Selected_view_is_the_only_aggregation_boundary_even_for_tower()
    {
        var pages = new[]
        {
            Page("old", "2025-01-01", 50),
            Page("future", "2027-01-01", 999)
        };
        var service = new DailyReportService(
            new HttpClient(new RouteHandler(request => request.RequestUri!.AbsolutePath switch
            {
                "/v1/views/custom/queries" when request.Method == HttpMethod.Post =>
                    Json("""{"id":"query","results":[{"object":"page","id":"old"},{"object":"page","id":"future"}],"has_more":false,"next_cursor":null}"""),
                "/v1/views/custom/queries/query" when request.Method == HttpMethod.Delete =>
                    Json("""{"object":"view_query","deleted":true}"""),
                "/v1/data_sources/tower/query" =>
                    Json(JsonSerializer.Serialize(new { results = pages, has_more = false, next_cursor = (string?)null })),
                _ => new HttpResponseMessage(HttpStatusCode.NotFound)
            })) { BaseAddress = new Uri("https://api.notion.com/v1/") },
            notionSettings: () => new NotionSettings { Token = "token" });
        var job = ViewJob("tower", "塔筒数据库", [ViewField("{value}", "tower", "塔筒数据库", "custom", "任意名称")]);

        var result = await service.BuildAsync(job, "合计={value}", new DateTime(2026, 8, 31));

        Assert.True(result.Succeeded, result.Message);
        Assert.Equal("合计=1049", result.Text);
    }

    [Fact]
    public async Task Fields_without_a_view_are_rejected()
    {
        var job = ViewJob("source", "任意数据库",
            [new() { Placeholder = "{old}", Token = new("source", "任意数据库", "weld", "焊接（吨）", "number") }]);
        var service = new DailyReportService(notionSettings: () => new NotionSettings { Token = "token" });

        var result = await service.BuildAsync(job, "旧={old}", new DateTime(2026, 8, 31));

        Assert.False(result.Succeeded);
        Assert.Contains("没有绑定 View", result.Message);
    }

    [Fact]
    public async Task View_query_rejects_incomplete_results()
    {
        var handler = new RouteHandler(request => request.RequestUri!.AbsolutePath switch
        {
            "/v1/views" => Json("""{"results":[{"object":"view","id":"view"}],"has_more":false,"next_cursor":null}"""),
            "/v1/views/view" => Json("""{"object":"view","id":"view","name":"本年截止今日"}"""),
            "/v1/views/view/queries" when request.Method == HttpMethod.Post =>
                Json("""{"id":"query","request_status":"incomplete","results":[],"has_more":false,"next_cursor":null}"""),
            "/v1/views/view/queries/query" when request.Method == HttpMethod.Delete =>
                Json("""{"object":"view_query","deleted":true}"""),
            "/v1/data_sources/tower/query" =>
                Json("""{"results":[],"has_more":false,"next_cursor":null}"""),
            _ => new HttpResponseMessage(HttpStatusCode.NotFound)
        });
        var service = new DailyReportService(
            new HttpClient(handler) { BaseAddress = new Uri("https://api.notion.com/v1/") },
            notionSettings: () => new NotionSettings
            {
                Token = "token",
            });

        var result = await service.BuildAsync(
            ViewJob("tower", "塔筒数据库", [ViewField("{value}", "tower", "塔筒数据库", "view", "任意名称")]),
            "值={value}", new DateTime(2026, 8, 31));

        Assert.False(result.Succeeded);
        Assert.Contains("不完整结果", result.Message);
    }

    [Fact]
    public async Task View_names_and_membership_are_not_interpreted_by_the_program()
    {
        var viewPages = new Dictionary<string, string[]>
        {
            ["day-view"] = ["today"],
            ["month-view"] = ["month", "today"],
            ["year-view"] = ["old", "month", "today"],
            ["last-year-view"] = ["last-old", "last-same", "last-future"]
        };
        var pages = new[]
        {
            Page("old", "2026-07-31", 100),
            Page("month", "2026-08-30", 10),
            Page("today", "2026-08-31", 28.33),
            Page("last-old", "2025-01-01", 50),
            Page("last-same", "2025-08-31", 20),
            Page("last-future", "2025-09-01", 999)
        };
        var handler = new RouteHandler(request =>
        {
            var path = request.RequestUri!.AbsolutePath;
            var segments = path.Split('/', StringSplitOptions.RemoveEmptyEntries);
            if (request.Method == HttpMethod.Post && segments is ["v1", "views", var viewId, "queries"])
            {
                var results = viewPages[viewId].Select(id => new { @object = "page", id });
                return Json(JsonSerializer.Serialize(new { id = $"query-{viewId}", results, has_more = false, next_cursor = (string?)null }));
            }
            if (request.Method == HttpMethod.Delete && path.Contains("/queries/", StringComparison.Ordinal))
                return Json("""{"object":"view_query","deleted":true}""");
            if (request.Method == HttpMethod.Post && path == "/v1/data_sources/material/query")
                return Json(JsonSerializer.Serialize(new { results = pages, has_more = false, next_cursor = (string?)null }));
            return new HttpResponseMessage(HttpStatusCode.NotFound);
        });
        var service = new DailyReportService(
            new HttpClient(handler) { BaseAddress = new Uri("https://api.notion.com/v1/") },
            notionSettings: () => new NotionSettings { Token = "token" });
        var job = ViewJob("material", "数据库改名也不影响",
        [
            ViewField("{day}", "material", "数据库改名也不影响", "day-view", "今日入库"),
            ViewField("{month}", "material", "数据库改名也不影响", "month-view", "自定义甲"),
            ViewField("{year}", "material", "数据库改名也不影响", "year-view", "自定义乙"),
            ViewField("{lastYear}", "material", "数据库改名也不影响", "last-year-view", "去年全年")
        ]);

        var result = await service.BuildAsync(
            job, "日={day};月={month};年={year};去年同期={lastYear}", new DateTime(2026, 8, 31));

        Assert.True(result.Succeeded, result.Message);
        Assert.Equal("日=28.33;月=38.33;年=138.33;去年同期=1069", result.Text);
    }

    [Fact]
    public async Task 本年截止今日_view_exposes_day_month_and_year_for_any_database()
    {
        var pages = new[]
        {
            Page("old", "2026-07-31", 100),
            Page("month", "2026-08-30", 10),
            Page("today", "2026-08-31", 28.33),
            Page("future", "2026-09-01", 999)
        };
        var handler = new RouteHandler(request => request.RequestUri!.AbsolutePath switch
        {
            "/v1/views/current/queries" when request.Method == HttpMethod.Post =>
                Json("""{"id":"query","results":[{"object":"page","id":"old"},{"object":"page","id":"month"},{"object":"page","id":"today"},{"object":"page","id":"future"}],"has_more":false,"next_cursor":null}"""),
            "/v1/views/current/queries/query" when request.Method == HttpMethod.Delete =>
                Json("""{"object":"view_query","deleted":true}"""),
            "/v1/data_sources/material/query" =>
                Json(JsonSerializer.Serialize(new { results = pages, has_more = false, next_cursor = (string?)null })),
            _ => new HttpResponseMessage(HttpStatusCode.NotFound)
        });
        var service = new DailyReportService(
            new HttpClient(handler) { BaseAddress = new Uri("https://api.notion.com/v1/") },
            notionSettings: () => new NotionSettings { Token = "token" });
        var job = ViewJob("material", "任意数据库",
        [
            ViewField("{day}", "material", "任意数据库", "current", "本年截止今日", "day"),
            ViewField("{month}", "material", "任意数据库", "current", "本年截止今日", "month"),
            ViewField("{year}", "material", "任意数据库", "current", "本年截止今日", "year")
        ]);
        job.Sources[0].MatchPropertyId = "date";
        job.Sources[0].MatchPropertyName = "日期";
        job.Sources[0].MatchPropertyType = "date";

        var result = await service.BuildAsync(job, "日={day};月={month};年={year}", new DateTime(2026, 8, 31));

        Assert.True(result.Succeeded, result.Message);
        Assert.Equal("日=28.33;月=38.33;年=138.33", result.Text);
    }

    [Theory]
    [InlineData("")]
    [InlineData("direct-month")]
    public async Task Monthly_granularity_view_selects_the_business_month_before_reading_the_value(string periodKind)
    {
        var pages = new[]
        {
            PlanPage("aug", "2026-08-01", 300),
            PlanPage("sep", "2026-09-01", 2150),
            PlanPage("oct", "2026-10-01", null)
        };
        var handler = new RouteHandler(request => request.RequestUri!.AbsolutePath switch
        {
            "/v1/views/all/queries" when request.Method == HttpMethod.Post =>
                Json("""{"id":"query","results":[{"object":"page","id":"aug"},{"object":"page","id":"sep"},{"object":"page","id":"oct"}],"has_more":false,"next_cursor":null}"""),
            "/v1/views/all/queries/query" when request.Method == HttpMethod.Delete =>
                Json("""{"object":"view_query","deleted":true}"""),
            "/v1/data_sources/plan/query" =>
                Json(JsonSerializer.Serialize(new { results = pages, has_more = false, next_cursor = (string?)null })),
            _ => new HttpResponseMessage(HttpStatusCode.NotFound)
        });
        var service = new DailyReportService(
            new HttpClient(handler) { BaseAddress = new Uri("https://api.notion.com/v1/") },
            notionSettings: () => new NotionSettings { Token = "token" });
        var job = ViewJob("plan", "下料每月计划数据库",
        [
            new DailyReportFieldDefinition
            {
                Placeholder = "{plan}",
                Token = new("plan", "下料每月计划数据库", "TXxy", "计划下料（吨）", "number",
                    PeriodKind: periodKind, ViewId: "all", ViewName: "所有数据")
            }
        ]);
        job.Sources[0].MatchPropertyId = "date";
        job.Sources[0].MatchPropertyName = "日期";
        job.Sources[0].MatchPropertyType = "date";

        var result = await service.BuildAsync(job, "计划={plan}", new DateTime(2026, 9, 1));

        Assert.True(result.Succeeded, result.Message);
        Assert.Equal("计划=2150", result.Text);
    }

    [Fact]
    public async Task Explicit_view_sum_does_not_use_the_business_month_direct_read_mode()
    {
        var pages = new[]
        {
            PlanPage("aug", "2026-08-01", 300),
            PlanPage("sep", "2026-09-01", 2150)
        };
        var handler = new RouteHandler(request => request.RequestUri!.AbsolutePath switch
        {
            "/v1/views/all/queries" when request.Method == HttpMethod.Post =>
                Json("""{"id":"query","results":[{"object":"page","id":"aug"},{"object":"page","id":"sep"}],"has_more":false,"next_cursor":null}"""),
            "/v1/views/all/queries/query" when request.Method == HttpMethod.Delete =>
                Json("""{"object":"view_query","deleted":true}"""),
            "/v1/data_sources/plan/query" =>
                Json(JsonSerializer.Serialize(new { results = pages, has_more = false, next_cursor = (string?)null })),
            _ => new HttpResponseMessage(HttpStatusCode.NotFound)
        });
        var service = new DailyReportService(
            new HttpClient(handler) { BaseAddress = new Uri("https://api.notion.com/v1/") },
            notionSettings: () => new NotionSettings { Token = "token" });
        var job = ViewJob("plan", "任意数据库",
        [
            new DailyReportFieldDefinition
            {
                Placeholder = "{value}",
                Token = new("plan", "任意数据库", "TXxy", "数值", "number",
                    PeriodKind: "view-sum", ViewId: "all", ViewName: "所有数据")
            }
        ]);
        job.Sources[0].MatchPropertyId = "date";
        job.Sources[0].MatchPropertyName = "日期";
        job.Sources[0].MatchPropertyType = "date";

        var result = await service.BuildAsync(job, "合计={value}", new DateTime(2026, 9, 1));

        Assert.True(result.Succeeded, result.Message);
        Assert.Equal("合计=2450", result.Text);
    }

    [Fact]
    public async Task Business_date_supports_separate_year_month_day_and_full_date_tokens()
    {
        var service = new DailyReportService(notionSettings: () => new NotionSettings { Token = "token" });

        var result = await service.BuildAsync(new DailyReportJob(),
            "today(\"yyyy年\") today(\"M月\") today(\"d日\") today(\"yyyy年M月d日\")",
            new DateTime(2026, 8, 31));

        Assert.True(result.Succeeded, result.Message);
        Assert.Equal("2026年 8月 31日 2026年8月31日", result.Text);
    }

    private static DailyReportJob ViewJob(
        string sourceId,
        string sourceName,
        List<DailyReportFieldDefinition> fields) => new()
    {
        Sources = [new DailyReportSourceBinding
        {
            DataSourceId = sourceId,
            DataSourceName = sourceName
        }],
        Fields = fields
    };

    private static DailyReportFieldDefinition ViewField(
        string placeholder,
        string sourceId,
        string sourceName,
        string viewId,
        string viewName,
        string periodKind = "") => new()
    {
        Placeholder = placeholder,
        Token = new(sourceId, sourceName, "weld", "焊接（吨）", "number",
            PeriodKind: periodKind, ViewId: viewId, ViewName: viewName)
    };

    private static Dictionary<string, object> Page(string id, string date, double value) => new()
    {
        ["object"] = "page",
        ["id"] = id,
        ["properties"] = new Dictionary<string, object>
        {
            ["日期"] = new { id = "date", type = "date", date = new { start = date } },
            ["焊接（吨）"] = new { id = "weld", type = "number", number = value }
        }
    };

    private static Dictionary<string, object> PlanPage(string id, string date, double? value) => new()
    {
        ["object"] = "page",
        ["id"] = id,
        ["properties"] = new Dictionary<string, object?>
        {
            ["日期"] = new { id = "date", type = "date", date = new { start = date } },
            ["计划下料（吨）"] = new { id = "TXxy", type = "number", number = value }
        }
    };

    private static HttpResponseMessage Json(string value) => new(HttpStatusCode.OK)
    {
        Content = new StringContent(value, Encoding.UTF8, "application/json")
    };

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

    private sealed class RouteHandler(Func<HttpRequestMessage, HttpResponseMessage> responseFactory)
        : HttpMessageHandler
    {
        protected override Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request,
            CancellationToken cancellationToken) => Task.FromResult(responseFactory(request));
    }
}
