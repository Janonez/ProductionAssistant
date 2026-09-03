using System.Net;
using System.Text;
using System.Text.Json;
using ProductionAssistant.Models;
using ProductionAssistant.Services;
using Xunit;

public sealed class DailyReportServiceTests
{
    [Fact]
    public void Legacy_token_json_keeps_the_View_compatibility_mode()
    {
        var token = JsonSerializer.Deserialize<DailyReportFieldToken>(
            """{"DataSourceId":"source","DataSourceName":"数据库","PropertyId":"value","PropertyName":"产量","PropertyType":"number","PeriodKind":"year","ViewId":"view","ViewName":"本年截止今日"}""");

        Assert.NotNull(token);
        Assert.Equal("", token.QueryMode);
        Assert.Equal("", token.QueryRangeKind);
        Assert.Equal("view", token.ViewId);
    }

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

    [Fact]
    public async Task Date_range_fields_share_one_largest_query_and_aggregate_locally()
    {
        var provider = new DateRangeProvider(
        [
            RangePage("jan", "2026-01-01", 1, 10),
            RangePage("aug", "2026-08-01", 2, 20),
            RangePage("today", "2026-08-31", 3, 30)
        ]);
        var service = new DailyReportService(database: provider);
        var periods = new[] { "day", "month", "year" };
        var fields = periods.SelectMany(period => new[]
        {
            RangeField($"{{weld-{period}}}", "weld", "焊接（吨）", period),
            RangeField($"{{output-{period}}}", "output", "产出（吨）", period)
        }).ToList();
        var job = ViewJob("source", "生产数据库", fields);

        var result = await service.BuildAsync(job,
            "{weld-day}/{weld-month}/{weld-year};{output-day}/{output-month}/{output-year}",
            new DateTime(2026, 8, 31));

        Assert.True(result.Succeeded, result.Message);
        Assert.Equal("3/5/6;30/50/60", result.Text);
        Assert.Equal(1, provider.QueryCount);
        Assert.Equal(1, result.QueryCount);
        Assert.Equal(1, result.RequestCount);
        Assert.Equal(5, result.CacheHits);
        Assert.Equal(new DateOnly(2026, 1, 1), provider.StartDate);
        Assert.Equal(new DateOnly(2026, 8, 31), provider.EndDate);
    }

    [Fact]
    public async Task Previous_year_fields_query_once_and_keep_their_existing_period_tokens()
    {
        var provider = new DateRangeProvider(
        [
            RangePage("jan", "2025-01-01", 1, 10),
            RangePage("cutoff", "2025-09-02", 2, 20),
            RangePage("after", "2025-09-03", 4, 40),
            RangePage("dec", "2025-12-31", 8, 80)
        ]);
        var service = new DailyReportService(database: provider);
        var fields = new List<DailyReportFieldDefinition>
        {
            RangeField("{same-weld}", "weld", "焊接（吨）", "lastYear", "last-year-to-date"),
            RangeField("{same-output}", "output", "产出（吨）", "lastYear", "last-year-to-date"),
            RangeField("{full-weld}", "weld", "焊接（吨）", "year", "last-year"),
            RangeField("{full-output}", "output", "产出（吨）", "year", "last-year")
        };
        var job = ViewJob("source", "生产数据库", fields);

        var result = await service.BuildAsync(job,
            "{same-weld}/{same-output};{full-weld}/{full-output}",
            new DateTime(2026, 9, 2));

        Assert.True(result.Succeeded, result.Message);
        Assert.Equal("3/30;15/150", result.Text);
        Assert.Equal("lastYear", fields[0].Token.PeriodKind);
        Assert.Equal("year", fields[2].Token.PeriodKind);
        Assert.Equal(1, provider.QueryCount);
        Assert.Equal(1, result.QueryCount);
        Assert.Equal(1, result.RequestCount);
        Assert.Equal(3, result.CacheHits);
        Assert.Equal(new DateOnly(2025, 1, 1), provider.StartDate);
        Assert.Equal(new DateOnly(2025, 12, 31), provider.EndDate);
    }

    [Fact]
    public async Task Date_range_Equals_filters_share_the_query_and_aggregate_by_stable_property_id()
    {
        var provider = new DateRangeProvider(
        [
            FilteredRangePage("steel", "2026-09-01", 10, "钢板"),
            FilteredRangePage("profile", "2026-09-02", 20, "型材"),
            FilteredRangePage("steel-2", "2026-09-03", 30, "钢板")
        ]);
        var steel = RangeField("{steel}", "weld", "焊接（吨）", "month");
        steel.Token = steel.Token with
        {
            FilterPropertyId = "kind", FilterPropertyName = "钢材类型",
            FilterOperator = "equals", FilterValue = "钢板"
        };
        var profile = RangeField("{profile}", "weld", "焊接（吨）", "month");
        profile.Token = profile.Token with
        {
            FilterPropertyId = "kind", FilterPropertyName = "钢材类型",
            FilterOperator = "equals", FilterValue = "型材"
        };
        var service = new DailyReportService(database: provider);

        var result = await service.BuildAsync(
            ViewJob("source", "生产数据库", [steel, profile]),
            "钢板={steel};型材={profile}", new DateTime(2026, 9, 3));

        Assert.True(result.Succeeded, result.Message);
        Assert.Equal("钢板=40;型材=20", result.Text);
        Assert.Equal(1, provider.QueryCount);
        Assert.Equal(1, result.RequestCount);
        Assert.Equal(1, result.CacheHits);
    }

    [Fact]
    public async Task Exact_match_reads_one_business_month_record_without_querying_a_View()
    {
        var provider = new DateRangeProvider(
        [new DatabaseRecord("sep", [
            new("month", "计划月份", "date", new DateTime(2026, 9, 1)),
            new("plan", "月总计划", "number", 2150d)
        ])]);
        var field = new DailyReportFieldDefinition
        {
            Placeholder = "{plan}",
            Token = new("source", "下料月计划数据库", "plan", "月总计划", "number",
                QueryMode: "exact-match", AggregateKind: "value",
                ExactMatchPropertyId: "month", ExactMatchPropertyName: "计划月份",
                ExactMatchPropertyType: "date", ExactMatchValueKind: "business-month")
        };
        var service = new DailyReportService(database: provider);

        var result = await service.BuildAsync(
            ViewJob("source", "下料月计划数据库", [field]),
            "月计划={plan}", new DateTime(2026, 9, 18));

        Assert.True(result.Succeeded, result.Message);
        Assert.Equal("月计划=2150", result.Text);
        Assert.Equal(1, provider.ExactQueryCount);
        Assert.Equal(new DateOnly(2026, 9, 1), provider.ExactValue);
        Assert.Equal(0, provider.QueryCount);
        Assert.Equal(1, result.RequestCount);
    }

    [Fact]
    public async Task Exact_match_can_read_one_specified_month_record()
    {
        var provider = new DateRangeProvider(
        [new DatabaseRecord("feb", [
            new("month", "计划月份", "date", new DateTime(2026, 2, 1)),
            new("plan", "月总计划", "number", 1900d)
        ])]);
        var field = new DailyReportFieldDefinition
        {
            Placeholder = "{plan}",
            Token = new("source", "下料月计划数据库", "plan", "月总计划", "number",
                QueryMode: "exact-match", QueryRangeKind: "specific-month", AggregateKind: "value",
                ExactMatchPropertyId: "month", ExactMatchPropertyName: "计划月份",
                ExactMatchPropertyType: "date", ExactMatchValueKind: "specific-month",
                CustomStartDate: "2026-02-01")
        };

        var result = await new DailyReportService(database: provider).BuildAsync(
            ViewJob("source", "下料月计划数据库", [field]),
            "月计划={plan}", new DateTime(2026, 9, 18));

        Assert.True(result.Succeeded, result.Message);
        Assert.Equal("月计划=1900", result.Text);
        Assert.Equal(new DateOnly(2026, 2, 1), provider.ExactValue);
        Assert.Equal(1, provider.ExactQueryCount);
        Assert.Equal(0, provider.QueryCount);
    }

    [Fact]
    public async Task Monthly_total_sources_query_only_the_business_month_and_ignore_unused_daily_source()
    {
        var queriedSources = new List<string>();
        var handler = new RouteHandler(request =>
        {
            var source = request.RequestUri!.Segments[^2].TrimEnd('/');
            queriedSources.Add(source);
            return source switch
            {
                "weld-month" => Json(JsonSerializer.Serialize(new
                {
                    results = new[] { PlanPage("weld-sep", "2026-09-01", 780) },
                    has_more = false,
                    next_cursor = (string?)null
                })),
                "cut-month" => Json(JsonSerializer.Serialize(new
                {
                    results = new[] { PlanPage("cut-sep", "2026-09-01", 2150) },
                    has_more = false,
                    next_cursor = (string?)null
                })),
                _ => new HttpResponseMessage(HttpStatusCode.NotFound)
            };
        });
        var service = new DailyReportService(
            new HttpClient(handler) { BaseAddress = new Uri("https://api.notion.com/v1/") },
            notionSettings: () => new NotionSettings { Token = "token" });
        var job = new DailyReportJob
        {
            Sources =
            [
                MonthBinding("weld-month", "焊接月计划数据库"),
                MonthBinding("cut-month", "下料每月计划数据库"),
                MonthBinding("cut-daily", "下料每日计划数据库")
            ],
            Fields =
            [
                MonthRangeField("{weld}", "weld-month", "焊接月计划数据库", "焊接（吨）"),
                MonthRangeField("{cut}", "cut-month", "下料每月计划数据库", "计划下料（吨）"),
                MonthRangeField("{unused-daily}", "cut-daily", "下料每日计划数据库", "今日计划")
            ]
        };

        var result = await service.BuildAsync(job, "焊接={weld};下料={cut}", new DateTime(2026, 9, 2));

        Assert.True(result.Succeeded, result.Message);
        Assert.Equal("焊接=780;下料=2150", result.Text);
        Assert.Equal(["weld-month", "cut-month"], queriedSources);
        Assert.Equal(2, result.RequestCount);
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

    private static DailyReportFieldDefinition RangeField(
        string placeholder,
        string propertyId,
        string propertyName,
        string periodKind,
        string queryRangeKind = "") => new()
    {
        Placeholder = placeholder,
        Token = new("source", "生产数据库", propertyId, propertyName, "number",
            PeriodKind: periodKind, QueryMode: "date-range",
            DatePropertyId: "date", DatePropertyName: "日期",
            QueryRangeKind: queryRangeKind)
    };

    private static DatabaseRecord RangePage(string id, string date, double weld, double output) => new(id,
    [
        new("date", "日期", "date", DateTime.Parse(date)),
        new("weld", "焊接（吨）", "number", weld),
        new("output", "产出（吨）", "number", output)
    ]);

    private static DatabaseRecord FilteredRangePage(string id, string date, double weld, string kind) => new(id,
    [
        new("date", "日期", "date", DateTime.Parse(date)),
        new("weld", "焊接（吨）", "number", weld),
        new("kind", "钢材类型", "select", kind)
    ]);

    private static DailyReportSourceBinding MonthBinding(string sourceId, string sourceName) => new()
    {
        DataSourceId = sourceId,
        DataSourceName = sourceName,
        MatchPropertyId = "date",
        MatchPropertyName = "日期",
        MatchPropertyType = "date"
    };

    private static DailyReportFieldDefinition MonthRangeField(
        string placeholder,
        string sourceId,
        string sourceName,
        string propertyName) => new()
    {
        Placeholder = placeholder,
        Token = new(sourceId, sourceName, "TXxy", propertyName, "number",
            PeriodKind: "direct-month", ViewId: "legacy-view", ViewName: "所有数据",
            QueryMode: "date-range", DatePropertyId: "date", DatePropertyName: "日期",
            QueryRangeKind: "month")
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

    private sealed class DateRangeProvider(IReadOnlyList<DatabaseRecord> records) : IDatabaseQueryProvider
    {
        public int QueryCount { get; private set; }
        public DateOnly StartDate { get; private set; }
        public DateOnly EndDate { get; private set; }
        public int ExactQueryCount { get; private set; }
        public DateOnly ExactValue { get; private set; }
        public string Name => "测试适配器";
        public IReadOnlyList<DatabaseSourceInfo> GetSources() => [new("source", "生产数据库", "生产数据库")];
        public Task<DatabaseSchemaResult> GetSchemaAsync(string sourceId, CancellationToken cancellationToken = default) =>
            Task.FromResult(new DatabaseSchemaResult(true, "", []));
        public Task<IReadOnlyList<DatabaseDatasetInfo>> GetDatasetsAsync(string sourceId, CancellationToken cancellationToken = default) =>
            Task.FromResult<IReadOnlyList<DatabaseDatasetInfo>>([]);
        public Task<DatabaseRecordSet> QueryDatasetAsync(string sourceId, string datasetId, CancellationToken cancellationToken = default) =>
            throw new InvalidOperationException("新字段不应查询 View。");
        public Task<DatabaseRecordSet> QueryDateRangeAsync(string sourceId, string dateFieldId,
            DateOnly startDate, DateOnly endDate, CancellationToken cancellationToken = default)
        {
            QueryCount++;
            StartDate = startDate;
            EndDate = endDate;
            return Task.FromResult(new DatabaseRecordSet(true, "", "生产数据库", "日期范围", records, 1));
        }
        public Task<DatabaseRecordSet> QueryExactMatchAsync(string sourceId, string propertyId,
            DateOnly value, CancellationToken cancellationToken = default)
        {
            ExactQueryCount++;
            ExactValue = value;
            return Task.FromResult(new DatabaseRecordSet(true, "", "生产数据库", "精确匹配", records, 1));
        }
    }
}
