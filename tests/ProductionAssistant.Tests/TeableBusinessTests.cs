using System.Net;
using System.Text.Json;
using System.Text.Json.Nodes;
using ProductionAssistant.Models;
using ProductionAssistant.Services;
using Xunit;

public sealed class TeableBusinessTests
{
    [Fact]
    public async Task Production_message_checks_conflicts_and_replays_without_notion_credentials()
    {
        using var fixture = new Fixture();
        var service = fixture.Service;
        var item = Tower(12.5);
        Assert.Equal("ready", Assert.Single((await service.ImportProductionMessagesAsync(new([item], false, CheckOnly: true))).Items).Status);
        Assert.Equal(0, fixture.Posts);
        var created = await service.ImportProductionMessagesAsync(new([item], false));
        Assert.True(created.Succeeded, created.Message);
        Assert.Equal("created", Assert.Single(created.Items).Status);
        Assert.Equal("2026-10-08T16:00:00.0000000+00:00", fixture.LastFields!["fldDateTower"]!.GetValue<string>());
        Assert.Equal("unchanged", Assert.Single((await service.ImportProductionMessagesAsync(new([item], false))).Items).Status);
        Assert.Equal(1, fixture.Posts);
        var conflict = await service.ImportProductionMessagesAsync(new([Tower(13)], false));
        Assert.Equal("conflict", Assert.Single(conflict.Items).Status);
        Assert.Equal(0, fixture.Patches);
        var choices = new Dictionary<int, IReadOnlyDictionary<string, string>> { [1] = new Dictionary<string, string> { [ProductionMessageFields.DailyOutput] = "use" } };
        var updated = await service.ImportProductionMessagesAsync(new([Tower(13)], false, FieldChoices: choices));
        Assert.True(updated.Succeeded, updated.Message);
        Assert.Equal(1, fixture.Patches);
        Assert.Equal(13d, fixture.Records["tblTower"][0]["fields"]!["fldOutputTower"]!.GetValue<double>());
    }

    [Fact]
    public async Task Cutting_requires_month_plan_then_links_day_and_preserves_zero()
    {
        using var fixture = new Fixture();
        var item = new ProductionMessageValue(1, ProductionMessageKind.MaterialCutting, new(2026, 10, 9),
            new Dictionary<string, string> { [ProductionMessageFields.Weight] = "0", [ProductionMessageFields.PieceCount] = "2" }, null, "", "test");
        var missing = await fixture.Service.ImportProductionMessagesAsync(new([item], false));
        Assert.Equal("monthly_plan_required", Assert.Single(missing.Items).Status);
        Assert.Equal(0, fixture.Posts);
        var result = await fixture.Service.ImportProductionMessagesAsync(new([item], false,
            new Dictionary<string, double> { ["2026-10"] = 48.501 }));
        Assert.True(result.Succeeded, result.Message);
        Assert.Equal(2, fixture.Posts);
        Assert.Equal(48.501d, fixture.Records["tblCutMonth"][0]["fields"]!["fldWeightCutMonth"]!.GetValue<double>());
        var day = fixture.Records["tblCut"][0];
        Assert.Equal(0d, day["fields"]!["fldWeightCut"]!.GetValue<double>());
        Assert.Equal(fixture.Records["tblCutMonth"][0]["id"]!.GetValue<string>(), day["fields"]!["fldMonthCut"]![0]!["id"]!.GetValue<string>());
    }

    [Fact]
    public async Task Weld_creates_month_and_days_and_updates_without_duplicate_records()
    {
        using var fixture = new Fixture();
        var request = new NotionImportRequest([new(new(2026, 10, 1), 12), new(new(2026, 10, 2), 13)]);
        Assert.True((await fixture.Service.ImportWeldHierarchyAsync(request)).Succeeded);
        Assert.Equal(3, fixture.Posts);
        var month = fixture.Records["tblWeldMonth"][0];
        Assert.Equal(25d, month["fields"]!["fldWeightWeldMonth"]!.GetValue<double>());
        Assert.All(fixture.Records["tblWeld"], record => Assert.Equal(month["id"]!.GetValue<string>(), record["fields"]!["fldMonthWeld"]![0]!["id"]!.GetValue<string>()));
        var result = await fixture.Service.ImportWeldHierarchyAsync(request);
        Assert.True(result.Succeeded, result.Message);
        Assert.Equal(3, fixture.Posts);
        Assert.Equal(3, fixture.Patches);
    }

    [Fact]
    public async Task Duplicate_dates_and_invalid_numbers_stop_before_writes()
    {
        using var fixture = new Fixture();
        Assert.False((await fixture.Service.ImportProductionMessagesAsync(new([Tower(1), Tower(2)], false))).Succeeded);
        var invalid = Tower(1) with { Fields = new Dictionary<string, string>(Tower(1).Fields) { [ProductionMessageFields.DailyOutput] = "invalid" } };
        Assert.False((await fixture.Service.ImportProductionMessagesAsync(new([invalid], false))).Succeeded);
        Assert.Equal(0, fixture.Posts);
    }

    [Fact]
    public async Task Invalid_cutting_data_does_not_create_a_month_plan_and_empty_tables_validate_filters()
    {
        using var fixture = new Fixture();
        var invalid = new ProductionMessageValue(1, ProductionMessageKind.MaterialCutting, new(2026, 10, 9),
            new Dictionary<string, string> { [ProductionMessageFields.Weight] = "invalid", [ProductionMessageFields.PieceCount] = "2" }, null, "", "test");
        Assert.False((await fixture.Service.ImportProductionMessagesAsync(new([invalid], false,
            new Dictionary<string, double> { ["2026-10"] = 1 }))).Succeeded);
        Assert.Equal(0, fixture.Posts);
        await Assert.ThrowsAsync<InvalidOperationException>(() => fixture.Store.QueryAsync("tower", new { property = "日期", date = new { unsupported = "x" } }));
    }

    [Fact]
    public async Task Relation_target_drift_stops_before_any_write()
    {
        using var fixture = new Fixture();
        fixture.RelationDrift = true;
        await Assert.ThrowsAsync<InvalidOperationException>(() => fixture.Store.GetSchemaAsync("cut"));
        Assert.Equal(0, fixture.Posts);
        Assert.Equal(0, fixture.Patches);
    }

    [Fact]
    public async Task Material_inbound_uses_native_teable_and_rejects_duplicate_dates()
    {
        using var fixture = new Fixture();
        var settings = new NotionSettings { UsesTeable = true };
        var service = new MaterialInboundNotionFillService(new HttpClient(new Handler(_ => throw new Exception("No Notion calls"))),
            fixture.Service, () => settings, fixture.Store);
        var job = new NotionFillJob { TargetDataSourceId = "material" };
        var preview = new NotionFillPreview(new(new(2026, 10, 9), 0m, 12.501m), false, "test");
        await service.CreateAsync(job, preview);
        Assert.Equal(12.501m, fixture.Records["tblMaterial"][0]["fields"]!["fldSectionMaterial"]!.GetValue<decimal>());
        Assert.Equal(0m, fixture.Records["tblMaterial"][0]["fields"]!["fldPlateMaterial"]!.GetValue<decimal>());
        await Assert.ThrowsAsync<InvalidOperationException>(() => service.CreateAsync(job, preview));
        await service.CreateAsync(job, preview with { TargetRecordExists = true });
        Assert.Equal(1, fixture.Posts);
    }

    [Fact]
    public async Task Uncertain_create_is_persistently_blocked_and_stale_updates_are_rejected()
    {
        using var fixture = new Fixture();
        fixture.FailPost = true;
        await Assert.ThrowsAsync<HttpRequestException>(() => fixture.Store.CreateAsync("tower", Properties(12.5)));
        fixture.FailPost = false;
        await Assert.ThrowsAsync<InvalidOperationException>(() => fixture.Store.CreateAsync("tower", Properties(12.5)));
        Assert.Equal(1, fixture.Posts);
        Assert.True(JsonNode.Parse(File.ReadAllText(Directory.GetFiles(fixture.Journal, "*.json").Single()))!["pending"]!.GetValue<bool>());
        fixture.Records["tblTower"].Add(new JsonObject { ["id"] = "recSeed", ["fields"] = new JsonObject { ["fldOutputTower"] = 1 } });
        await fixture.Store.QueryAsync("tower", null);
        fixture.Records["tblTower"][0]["fields"]!["fldOutputTower"] = 2;
        await Assert.ThrowsAsync<InvalidOperationException>(() => fixture.Store.UpdateAsync("recSeed", new() { ["产出（套）"] = new { number = 3 } }));
        Assert.Equal(0, fixture.Patches);
    }

    private static ProductionMessageValue Tower(double output) => new(1, ProductionMessageKind.TowerLineDaily, new(2026, 10, 9),
        new Dictionary<string, string> { [ProductionMessageFields.SheetInStock] = "0", [ProductionMessageFields.ProfileInStock] = "2",
            [ProductionMessageFields.Cutting] = "3", [ProductionMessageFields.Welding] = "4", [ProductionMessageFields.OutputSections] = "5",
            [ProductionMessageFields.DailyOutput] = output.ToString(System.Globalization.CultureInfo.InvariantCulture) }, null, "", "test");
    private static Dictionary<string, object> Properties(double output) => new()
        { ["日报名称"] = new { title = new[] { new { text = new { content = "test" } } } },
          ["日期"] = new { date = new { start = "2026-10-09", end = (string?)null } }, ["产出（套）"] = new { number = output } };

    private sealed class Fixture : IDisposable
    {
        public string Journal { get; } = Path.Combine(Path.GetTempPath(), "TeableBusinessTests", Guid.NewGuid().ToString("N"));
        public Dictionary<string, List<JsonObject>> Records { get; } = [];
        public int Posts, Patches;
        public bool FailPost;
        public bool RelationDrift;
        public JsonObject? LastFields;
        public TeableBusinessStore Store { get; }
        public NotionImportService Service { get; }
        private readonly TeableQuerySettings _mapping;
        public Fixture()
        {
            TeableQueryField F(string suffix, string id, string name, string type, string foreign = "") =>
                new(id, name, type, "fld" + id + suffix, type switch { "title" => "singleLineText", "relation" => "link", _ => type }, foreign);
            TeableQuerySource S(string id, string suffix, string title, string weight, string? month = null) => new(id, id, id, "tbl" + suffix,
                [F(suffix, "Title", title, "title"), F(suffix, "Date", "日期", "date"), F(suffix, "Weight", weight, "number"),
                    .. month is null ? Array.Empty<TeableQueryField>() : new[] { F(suffix, "Month", "所属月份", "relation", month) }]);
            _mapping = new(true,
                [new("tower", "tower", "tower", "tblTower", [F("Tower", "Title", "日报名称", "title"), F("Tower", "Date", "日期", "date"),
                    F("Tower", "Plate", "板材（吨）", "number"), F("Tower", "Section", "型材（吨）", "number"), F("Tower", "Cut", "下料（吨）", "number"),
                    F("Tower", "Weld", "焊接（吨）", "number"), F("Tower", "Output", "产出（套）", "number"), F("Tower", "Pieces", "产出（节）", "number")]),
                 S("cut", "Cut", "业务", "下料（吨）", "cutMonth") with { Fields = [.. S("cut", "Cut", "业务", "下料（吨）", "cutMonth").Fields, F("Cut", "Count", "数量（张）", "number")] },
                 S("cutMonth", "CutMonth", " 业务", "计划下料（吨）"), S("weld", "Weld", "业务", "焊接（吨）", "weldMonth"), S("weldMonth", "WeldMonth", " 业务", "焊接（吨）"),
                 new("material", "material", "material", "tblMaterial", [F("Material", "Title", "业务", "title"), F("Material", "Date", "日期", "date"),
                    F("Material", "Plate", "板材", "number"), F("Material", "Section", "型材", "number")])], true);
            foreach (var source in _mapping.Sources) Records[source.TableId] = [];
            Store = new(_mapping, () => new TeableClient("https://teable.test", "teable-token", new Handler(Send)), Journal);
            var settings = new NotionSettings { UsesTeable = true, CachedDataSources = Store.Sources.ToList(), Targets =
                [new() { Id = "tower", ModuleKey = ProductionMessageKinds.TowerDailyModuleKey, TitleProperty = "日报名称", DateProperty = "日期" },
                 new() { Id = "cut", ModuleKey = ProductionMessageKinds.CuttingModuleKey, TitleProperty = "业务", DateProperty = "日期" },
                 new() { Id = "weld", ModuleKey = "daily-weld-simulation", TitleProperty = "业务", DateProperty = "日期", QuantityProperty = "焊接（吨）" }] };
            Service = new(new HttpClient(new Handler(_ => throw new Exception("Notion must not be contacted"))), () => settings, Store);
        }
        private HttpResponseMessage Send(HttpRequestMessage request)
        {
            Assert.Equal("teable.test", request.RequestUri!.Host);
            var parts = request.RequestUri.AbsolutePath.Split('/', StringSplitOptions.RemoveEmptyEntries);
            var table = parts[2];
            JsonNode result;
            if (parts[3] == "field") result = new JsonArray(_mapping.Sources.Single(source => source.TableId == table).Fields.Select(field => (JsonNode)new JsonObject
                { ["id"] = field.TeableId, ["name"] = field.Name, ["type"] = field.TeableType,
                    ["options"] = field.Type != "relation" ? null : new JsonObject { ["foreignTableId"] = RelationDrift ? "tblUnexpected" :
                        _mapping.Sources.Single(source => source.Id == field.RelationSourceId).TableId } }).ToArray());
            else if (request.Method == HttpMethod.Get)
                result = parts.Length == 5 ? Records[table].Single(record => record["id"]!.GetValue<string>() == parts[4]).DeepClone()
                    : new JsonObject { ["records"] = new JsonArray(Records[table].Select(record => record.DeepClone()).ToArray()) };
            else
            {
                var body = JsonNode.Parse(request.Content!.ReadAsStringAsync().GetAwaiter().GetResult())!;
                Assert.False(body["typecast"]!.GetValue<bool>());
                if (request.Method == HttpMethod.Post)
                {
                    Posts++;
                    if (FailPost) return new(HttpStatusCode.ServiceUnavailable) { Content = new StringContent("{}") };
                    LastFields = body["records"]![0]!["fields"]!.DeepClone().AsObject();
                    var stored = LastFields.DeepClone().AsObject();
                    foreach (var field in _mapping.Sources.Single(source => source.TableId == table).Fields.Where(field => field.Type == "date"))
                        if (stored[field.TeableId] is { } date) stored[field.TeableId] = DateTimeOffset.Parse(date.GetValue<string>()).ToUniversalTime().ToString("o");
                    LastFields = stored.DeepClone().AsObject();
                    var record = new JsonObject { ["id"] = "rec" + Posts, ["fields"] = stored };
                    Records[table].Add(record);
                    result = new JsonObject { ["records"] = new JsonArray(record.DeepClone()) };
                }
                else
                {
                    Patches++;
                    var record = Records[table].Single(record => record["id"]!.GetValue<string>() == parts[4]);
                    foreach (var value in body["record"]!["fields"]!.AsObject()) record["fields"]![value.Key] = value.Value?.DeepClone();
                    result = record.DeepClone();
                }
            }
            return new(HttpStatusCode.OK) { Content = new StringContent(result.ToJsonString()) };
        }
        public void Dispose() { if (Directory.Exists(Journal)) Directory.Delete(Journal, true); }
    }
    private sealed class Handler(Func<HttpRequestMessage, HttpResponseMessage> send) : HttpMessageHandler
    {
        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken) => Task.FromResult(send(request));
    }
}
