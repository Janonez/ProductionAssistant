using ProductionAssistant.Services;
using Xunit;

public sealed class DatabaseQueryServiceTests
{
    [Fact]
    public void Date_ranges_cover_day_custom_week_month_and_year()
    {
        var date = new DateOnly(2026, 9, 9);

        Assert.Equal((date, date), Dates(DatabaseDateRanges.Resolve("day", date)));
        Assert.Equal((new DateOnly(2026, 9, 1), date), Dates(DatabaseDateRanges.Resolve("month", date)));
        Assert.Equal((new DateOnly(2026, 9, 1), new DateOnly(2026, 9, 30)),
            Dates(DatabaseDateRanges.Resolve("current-month", date)));
        Assert.Equal((new DateOnly(2026, 1, 1), date), Dates(DatabaseDateRanges.Resolve("year", date)));
        Assert.Equal((new DateOnly(2026, 1, 1), new DateOnly(2026, 12, 31)),
            Dates(DatabaseDateRanges.Resolve("current-year", date)));
        Assert.Equal((new DateOnly(2025, 1, 1), new DateOnly(2025, 9, 9)),
            Dates(DatabaseDateRanges.Resolve("last-year-to-date", date)));
        Assert.Equal((new DateOnly(2025, 1, 1), new DateOnly(2025, 12, 31)),
            Dates(DatabaseDateRanges.Resolve("last-year", date)));
        Assert.Equal((new DateOnly(2026, 9, 4), new DateOnly(2026, 9, 4)), Dates(
            DatabaseDateRanges.Resolve("specific-date", date, new DateOnly(2026, 9, 4))));
        Assert.Equal((new DateOnly(2026, 2, 1), new DateOnly(2026, 2, 28)), Dates(
            DatabaseDateRanges.Resolve("specific-month", date, new DateOnly(2026, 2, 12))));
        Assert.Equal((new DateOnly(2026, 8, 28), new DateOnly(2026, 9, 2)), Dates(
            DatabaseDateRanges.Resolve("custom", date, new DateOnly(2026, 8, 28), new DateOnly(2026, 9, 2))));
        Assert.Equal((new DateOnly(2026, 9, 3), new DateOnly(2026, 9, 8)), Dates(
            DatabaseDateRanges.Resolve("week", date, new DateOnly(2026, 9, 3), new DateOnly(2026, 9, 8))));
    }

    [Fact]
    public async Task Inspection_is_provider_neutral_and_sums_the_selected_range()
    {
        var provider = new FakeProvider([
            Record("a", "2026-09-02", 2),
            Record("b", "2026-09-05", 5),
            Record("c", "2026-09-09", 9)
        ]);
        var service = new DatabaseQueryService(provider);

        var result = await service.InspectAsync(new(
            "source", "view", "date", "value", "week", new DateOnly(2026, 9, 9),
            new DateOnly(2026, 9, 3), new DateOnly(2026, 9, 8)));

        Assert.True(result.Succeeded, result.Message);
        Assert.Equal("测试适配器", result.ProviderName);
        Assert.Equal(1, result.RecordCount);
        Assert.Equal(5, result.Total);
    }

    [Fact]
    public async Task Ordinary_view_is_read_whole_and_rejects_date_scopes()
    {
        var provider = new FakeProvider([Record("a", "2026-09-02", 2)], "月计划");
        var service = new DatabaseQueryService(provider);

        var whole = await service.InspectAsync(new(
            "source", "view", "", "", "all", new DateOnly(2026, 9, 9)));
        var dated = await service.InspectAsync(new(
            "source", "view", "date", "value", "month", new DateOnly(2026, 9, 9)));

        Assert.True(whole.Succeeded, whole.Message);
        Assert.Single(whole.Records);
        Assert.False(dated.Succeeded);
        Assert.Contains("只有“本年截止今日”View", dated.Message);
    }

    private static (DateOnly, DateOnly) Dates(
        (bool Succeeded, string Message, DateOnly Start, DateOnly End) range)
    {
        Assert.True(range.Succeeded, range.Message);
        return (range.Start, range.End);
    }

    private static DatabaseRecord Record(string id, string date, double value) => new(id,
    [
        new("date", "日期", "date", DateTime.Parse(date)),
        new("value", "产量", "number", value)
    ]);

    private sealed class FakeProvider(
        IReadOnlyList<DatabaseRecord> records,
        string datasetName = "本年截止今日") : IDatabaseQueryProvider
    {
        public string Name => "测试适配器";
        public IReadOnlyList<DatabaseSourceInfo> GetSources() => [new("source", "测试数据库", "测试数据库")];
        public Task<DatabaseSchemaResult> GetSchemaAsync(string sourceId, CancellationToken cancellationToken = default) =>
            Task.FromResult(new DatabaseSchemaResult(true, "", [new("date", "日期", "date"), new("value", "产量", "number")]));
        public Task<IReadOnlyList<DatabaseDatasetInfo>> GetDatasetsAsync(string sourceId, CancellationToken cancellationToken = default) =>
            Task.FromResult<IReadOnlyList<DatabaseDatasetInfo>>([new("view", "本年截止今日")]);
        public Task<DatabaseRecordSet> QueryDatasetAsync(string sourceId, string datasetId, CancellationToken cancellationToken = default) =>
            Task.FromResult(new DatabaseRecordSet(true, "", "测试数据库", datasetName, records));
    }
}
