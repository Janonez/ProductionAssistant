using System.Text.Json;
using ProductionAssistant.Services;
using Xunit;

namespace ProductionAssistant.Tests;

public sealed class GroupSubmissionConfigurationTests : IDisposable
{
    private readonly string _directory = Path.Combine(Path.GetTempPath(), "group-submission-test-" + Guid.NewGuid().ToString("N"));
    private static readonly GroupSubmissionSource Source = new("table/field", "数据表 · 指标", "table", "field");
    private static readonly GroupSubmissionDocument Document = new("fixture-document", 4);
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);
    private string FilePath => Path.Combine(_directory, GroupSubmissionConfigurationStore.FileName);
    private GroupSubmissionConfigurationStore Store => new(FilePath, _ => { });

    [Fact]
    public void Missing_configuration_uses_defaults_and_empty_businesses_block_the_schedule()
    {
        var initial = Store.Read(Document, [Source]);
        Assert.Equal(0, initial.Revision);
        Assert.Equal("09:00", initial.Rules.Time);
        Assert.Empty(initial.Businesses);
        Assert.False(File.Exists(FilePath));
        var saved = Store.Save(Json(new { revision = 0, rules = initial.Rules with { Automatic = true } }), Document, [Source]);
        Assert.NotNull(saved.Configuration);
        Assert.True(saved.Configuration.Rules.Automatic);
        Assert.False(saved.Configuration.HasBusiness);
        Assert.Null(saved.Configuration.NextRunAt);
    }

    [Fact]
    public void Validates_each_rule_field_and_preserves_the_revision_on_failure()
    {
        var rules = GroupSubmissionRules.Defaults();
        var invalid = Store.Save(Json(new { revision = 0, rules = rules with { Time = "24:00", Weekdays = [], RetryMinutes = 0, RetryUntil = "9:00" } }), Document, [Source]);
        Assert.Null(invalid.Configuration);
        Assert.Equal(new[] { "rules.retryMinutes", "rules.retryUntil", "rules.time", "rules.weekdays" }, invalid.FieldErrors!.Keys.Order());
        var invalidDeadline = Store.Save(Json(new { revision = 0, rules = rules with { Weekdays = [1, 1], RetryUntil = rules.Time } }), Document, [Source]);
        Assert.Contains("rules.retryUntil", invalidDeadline.FieldErrors!.Keys);
        Assert.Contains("rules.weekdays", invalidDeadline.FieldErrors.Keys);
        Assert.Equal(0, Store.Read(Document, [Source]).Revision);
    }

    [Fact]
    public void Validates_business_names_sources_and_positions_and_recalculates_preview()
    {
        var bad = Store.Save(BusinessPayload(0, Business("first", " ") with { Position = Business("first", "test").Position with { Step = 0 },
            DataSource = Source with { FieldId = "unknown" } }), Document, [Source]);
        Assert.Equal(new[] { "business.dataSource", "business.name", "business.position" }, bad.FieldErrors!.Keys.Order());

        var saved = Store.Save(BusinessPayload(0, Business("first", "  自定义业务 ")), Document, [Source]).Configuration!;
        var item = Assert.Single(saved.Businesses);
        Assert.Equal("自定义业务", item.Name);
        Assert.Equal(new[] { "H9", "I9", "J9" }, item.Position.Preview.Select(sample => sample.Cell));
        Assert.True(saved.HasBusiness);
        var duplicate = Store.Save(BusinessPayload(1, Business("second", "自定义业务")), Document, [Source]);
        Assert.Contains("business.name", duplicate.FieldErrors!.Keys);
        Assert.Single(Store.Read(Document, [Source]).Businesses);
        Assert.False(Store.Read(Document, []).HasBusiness);
        var changedDocument = Store.Read(Document with { Revision = 5 }, [Source]);
        Assert.Equal("invalid", Assert.Single(changedDocument.Businesses).Position.Status);
        Assert.False(changedDocument.HasBusiness);
        Assert.Null(changedDocument.NextRunAt);
        Assert.True(Store.Save(BusinessPayload(1, Business("first", "旧文档位置")), Document with { Revision = 5 }, [Source]).Conflict);
    }

    [Fact]
    public async Task Only_one_writer_can_save_a_revision()
    {
        var writes = new[] { "07:00", "08:00" }.Select(time => Task.Run(() => Store.Save(Json(new
        {
            revision = 0, rules = GroupSubmissionRules.Defaults() with { Time = time }
        }), Document, [Source])));
        var results = await Task.WhenAll(writes);
        var winner = Assert.Single(results, result => result.Configuration is not null).Configuration!;
        var rejected = Assert.Single(results, result => result.Conflict);
        Assert.Contains("刷新", rejected.Error);
        Assert.Equal(1, winner.Revision);
        Assert.Equal(winner.Rules.Time, Store.Read(Document, [Source]).Rules.Time);
    }

    [Theory]
    [InlineData("{")]
    [InlineData("null")]
    [InlineData("{\"revision\":2,\"businesses\":[],\"rules\":null}")]
    public void Corruption_is_preserved_and_reported_before_falling_back(string damaged)
    {
        Directory.CreateDirectory(_directory);
        File.WriteAllText(FilePath, damaged);
        var diagnostics = new List<string>();
        var store = new GroupSubmissionConfigurationStore(FilePath, diagnostics.Add);
        Assert.Equal(0, store.Read(Document, [Source]).Revision);
        Assert.Contains("配置损坏", Assert.Single(diagnostics));
        Assert.Equal(damaged, File.ReadAllText(Assert.Single(Directory.GetFiles(_directory, "*.bak"))));
        Assert.False(File.Exists(FilePath));
        Assert.NotNull(store.Save(Json(new { revision = 0, rules = GroupSubmissionRules.Defaults() }), Document, [Source]).Configuration);
    }

    [Fact]
    public void Atomic_store_keeps_last_good_file_if_writing_temporary_file_fails()
    {
        var store = new AtomicJsonStore<object>(FilePath, () => new { sequence = 0 }, _ => true, _ => { });
        Assert.True(store.Update<bool>(_ => (new { sequence = 1 }, true)));
        var previous = File.ReadAllBytes(FilePath);
        Assert.Throws<NotSupportedException>(() => store.Update<bool>(_ => (new { unsupported = (Action)(() => { }) }, true)));
        Assert.Equal(previous, File.ReadAllBytes(FilePath));
        Assert.Empty(Directory.GetFiles(_directory, "*.tmp"));
        Assert.True(store.Update<bool>(_ => (new { sequence = 2 }, true)));
        Assert.Equal(2, Assert.IsType<JsonElement>(store.Read()).GetProperty("sequence").GetInt32());
        Assert.Empty(Directory.GetFiles(_directory, "*.tmp"));
    }

    [Fact]
    public void Next_run_uses_local_weekdays_and_skips_missed_or_disabled_occurrences()
    {
        var zone = TimeZoneInfo.CreateCustomTimeZone("fixture+8", TimeSpan.FromHours(8), "fixture", "fixture");
        var monday = new DateTimeOffset(2026, 11, 16, 8, 59, 0, TimeSpan.FromHours(8));
        var rules = GroupSubmissionRules.Defaults() with { Automatic = true, Weekdays = [1, 3] };
        var expected = monday.AddMinutes(1);
        Assert.Equal(expected, TencentSheetTaskScheduler.NextGroupSubmissionRun(rules, true, monday.ToUniversalTime(), zone));
        Assert.Equal(expected.AddDays(2), TencentSheetTaskScheduler.NextGroupSubmissionRun(rules, true, expected, zone));
        Assert.Equal(expected.AddDays(7), TencentSheetTaskScheduler.NextGroupSubmissionRun(rules, true, expected.AddDays(2).AddMinutes(1), zone));
        Assert.Null(TencentSheetTaskScheduler.NextGroupSubmissionRun(rules, false, monday, zone));
        Assert.Null(TencentSheetTaskScheduler.NextGroupSubmissionRun(rules with { Automatic = false }, true, monday, zone));
    }

    private static JsonElement Json<T>(T value) => JsonSerializer.SerializeToElement(value, JsonOptions);
    private static JsonElement BusinessPayload(int revision, GroupSubmissionBusiness business) => Json(new { revision, documentRevision = Document.Revision, business });
    private static GroupSubmissionBusiness Business(string id, string name) => new(id, name, Source,
        new("configured", new("2026-11-16", "F9"), new("2026-11-17", "G9"), "right", 1, []));
    public void Dispose() { if (Directory.Exists(_directory)) Directory.Delete(_directory, recursive: true); }
}
