using System.Text.Json.Nodes;
using ProductionAssistant.Services;
using Xunit;

namespace ProductionAssistant.Tests;

public sealed class TencentSheetNotionTests
{
    private static JsonObject Config(string mode = "date") => JsonNode.Parse("""
        {"fields":[{"id":"custom","name":"合格数量","unit":"件","notion":
        {"sourceId":"source","valueFieldId":"value","queryMode":"date","dateFieldId":"date","period":"month","datasetId":"view"}}],
        "rules":{"custom":{}}}
        """)!.AsObject().WithMode(mode);

    [Fact]
    public async Task Custom_field_sums_real_numbers_and_binds_result_to_job_config_and_business_date()
    {
        var provider = new Provider();
        var service = new TencentSheetNotionService(provider);
        var config = Config(); var date = new DateOnly(2026, 9, 9);
        var result = await service.FetchAsync("job", config, date);
        Assert.Equal(5d, (double)result.Values["custom"]!);
        Assert.Equal((new DateOnly(2026, 9, 1), date), provider.Range);
        Assert.Equal(5d, (double)service.RequireValues("job", config, date, result.DataToken)["custom"]!);
        Assert.Throws<InvalidOperationException>(() => service.RequireValues("other", config, date, result.DataToken));
        Assert.Throws<InvalidOperationException>(() => service.RequireValues("job", config, date.AddDays(1), result.DataToken));
        config["fields"]![0]!["notion"]!["valueFieldId"] = "changed";
        Assert.Throws<InvalidOperationException>(() => service.RequireValues("job", config, date, result.DataToken));
    }

    [Fact]
    public async Task View_preserves_provider_filter_and_identical_queries_are_reused()
    {
        var provider = new Provider(); var service = new TencentSheetNotionService(provider); var config = Config("view");
        var second = config["fields"]![0]!.DeepClone(); second["id"] = "another";
        config["fields"]!.AsArray().Add(second); config["rules"]!["another"] = new JsonObject();
        var result = await service.FetchAsync("job", config, new(2026, 9, 9));
        Assert.Equal(1, provider.ViewCalls); Assert.Equal(0, provider.RangeCalls);
        Assert.Equal(2, result.Rows.Count); Assert.Contains("真实筛选", result.Rows[0].Period);
    }

    [Theory]
    [InlineData(true)]
    [InlineData(false)]
    public async Task Empty_or_missing_numeric_data_fails_and_invalidates_previous_snapshot(bool empty)
    {
        var provider = new Provider(); var service = new TencentSheetNotionService(provider); var config = Config(); var date = new DateOnly(2026, 9, 9);
        var old = await service.FetchAsync("job", config, date);
        provider.Records = empty ? [] : [new("bad", [new("value", "数量", "number", null)])];
        await Assert.ThrowsAsync<InvalidOperationException>(() => service.FetchAsync("job", config, date));
        Assert.Throws<InvalidOperationException>(() => service.RequireValues("job", config, date, old.DataToken));
    }

    [Fact]
    public async Task New_field_requires_position_and_binding_and_accepts_zero_without_manual_override()
    {
        var provider = new Provider { Records = [new("zero", [new("value", "数量", "number", 0d)])] };
        var service = new TencentSheetNotionService(provider); var config = Config(); var date = new DateOnly(2026, 9, 9);
        var result = await service.FetchAsync("job", config, date);
        Assert.Equal(0d, (double)result.Values["custom"]!);
        config["rules"] = new JsonObject();
        await Assert.ThrowsAsync<InvalidOperationException>(() => service.FetchAsync("job", config, date));
    }

    [Theory]
    [InlineData("missing", "字段类型 缺失", "返回值类型 空值")]
    [InlineData("null", "字段类型 number", "返回值类型 空值")]
    [InlineData("text", "字段类型 formula", "返回值类型 String")]
    public async Task Invalid_numeric_data_identifies_record_and_field_without_logging_its_content(
        string kind, string fieldType, string valueType)
    {
        var provider = new Provider { Records = [new("bad-record", kind == "missing" ? [] :
            [new("value", "数量", kind == "text" ? "formula" : "number", kind == "text" ? "private-content" : null)])] };
        var error = await Assert.ThrowsAsync<InvalidOperationException>(() =>
            new TencentSheetNotionService(provider).FetchAsync("job", Config(), new(2026, 9, 30)));
        Assert.Contains("业务日期 2026-09-30", error.Message);
        Assert.Contains("数据库 数量数据库", error.Message);
        Assert.Contains("记录 bad-record；字段 value", error.Message);
        Assert.Contains(fieldType, error.Message);
        Assert.Contains(valueType, error.Message);
        Assert.DoesNotContain("private-content", error.Message);
    }

    private sealed class Provider : IDatabaseQueryProvider
    {
        public string Name => "fixture";
        public IReadOnlyList<DatabaseRecord> Records = [new("a", [new("value", "数量", "number", 2d)]), new("b", [new("value", "数量", "number", 3d)])];
        public (DateOnly, DateOnly) Range;
        public int ViewCalls, RangeCalls;
        public IReadOnlyList<DatabaseSourceInfo> GetSources() => [new("source", "数量数据库", "")];
        public Task<DatabaseSchemaResult> GetSchemaAsync(string id, CancellationToken cancellationToken = default) => Task.FromResult(new DatabaseSchemaResult(true, "", [new("value", "数量", "number"), new("date", "日期", "date")]));
        public Task<IReadOnlyList<DatabaseDatasetInfo>> GetDatasetsAsync(string id, CancellationToken cancellationToken = default) => Task.FromResult<IReadOnlyList<DatabaseDatasetInfo>>([new("view", "真实筛选")]);
        public Task<DatabaseRecordSet> QueryDatasetAsync(string id, string datasetId, CancellationToken cancellationToken = default) { ViewCalls++; return Task.FromResult(new DatabaseRecordSet(true, "", "数量数据库", "真实筛选", Records)); }
        public Task<DatabaseRecordSet> QueryDateRangeAsync(string id, string field, DateOnly start, DateOnly end, CancellationToken cancellationToken = default) { RangeCalls++; Range = (start, end); return Task.FromResult(new DatabaseRecordSet(true, "", "数量数据库", "", Records)); }
    }
}

internal static class TencentNotionTestConfig
{
    public static JsonObject WithMode(this JsonObject config, string mode) { config["fields"]![0]!["notion"]!["queryMode"] = mode; return config; }
}
