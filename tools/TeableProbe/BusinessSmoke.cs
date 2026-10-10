using System.Text.Json;
using ProductionAssistant.Models;
using ProductionAssistant.Services;

internal static class BusinessSmoke
{
    // 仅供临时表联调。逐表回读标记并确认空表，拒绝对正式业务表运行。
    public static async Task<int> RunAsync(string mappingPath, string originalBindingsPath)
    {
        var mapping = JsonSerializer.Deserialize<TeableQuerySettings>(File.ReadAllText(mappingPath))!;
        var credentials = TeableSettingsStore.Load();
        using var client = new TeableClient(credentials.ServerUrl, credentials.Token);
        var baseId = JsonSerializer.Deserialize<System.Text.Json.Nodes.JsonObject>(File.ReadAllText(mappingPath))!["BaseId"]!.GetValue<string>();
        var tables = await client.ReadTablesAsync(baseId);
        foreach (var source in mapping.Sources)
        {
            var table = tables.Single(item => item?["id"]?.GetValue<string>() == source.TableId)!;
            if (table["description"]?.GetValue<string>() != "ProductionAssistant business smoke: " + Path.GetFileName(Path.GetDirectoryName(Path.GetFullPath(mappingPath))) ||
                (await client.ReadQueryRecordsAsync(source.TableId, source.Fields.Select(field => field.TeableId).ToArray(), 0))["records"]!.AsArray().Count != 0)
                throw new InvalidOperationException("联调仅允许当前运行标记的空临时表。");
        }
        var settings = BusinessDatabaseSettingsStore.Import(originalBindingsPath, mapping);
        var store = new TeableBusinessStore(mapping, journalDirectory: Path.Combine(Path.GetDirectoryName(mappingPath)!, "journal"));
        using var noNotion = new HttpClient(new RejectNotion());
        var service = new NotionImportService(noNotion, () => settings, store);
        var date = new DateOnly(2099, 10, 9);
        var tower = new ProductionMessageValue(1, ProductionMessageKind.TowerLineDaily, date.ToDateTime(TimeOnly.MinValue),
            new Dictionary<string, string> { [ProductionMessageFields.SheetInStock] = "0", [ProductionMessageFields.ProfileInStock] = "2",
                [ProductionMessageFields.Cutting] = "3", [ProductionMessageFields.Welding] = "4", [ProductionMessageFields.OutputSections] = "5",
                [ProductionMessageFields.DailyOutput] = "12.501" }, null, "", "isolated-smoke");
        void Require(bool condition, string operation) { if (!condition) throw new InvalidOperationException(operation); }
        Require((await service.ImportProductionMessagesAsync(new([tower], false, CheckOnly: true))).Items.Single().Status == "ready", "Tower check");
        Require((await service.ImportProductionMessagesAsync(new([tower], false))).Succeeded, "Tower create");
        Require((await service.ImportProductionMessagesAsync(new([tower], false))).Items.Single().Status == "unchanged", "Tower replay");
        var changed = tower with { Fields = new Dictionary<string, string>(tower.Fields) { [ProductionMessageFields.DailyOutput] = "13.501" } };
        Require((await service.ImportProductionMessagesAsync(new([changed], false))).Items.Single().Status == "conflict", "Tower conflict");
        Require((await service.ImportProductionMessagesAsync(new([changed], false, FieldChoices:
            new Dictionary<int, IReadOnlyDictionary<string, string>> { [1] = new Dictionary<string, string> { [ProductionMessageFields.DailyOutput] = "use" } }))).Succeeded, "Tower update");
        var cut = new ProductionMessageValue(1, ProductionMessageKind.MaterialCutting, date.ToDateTime(TimeOnly.MinValue),
            new Dictionary<string, string> { [ProductionMessageFields.Weight] = "0", [ProductionMessageFields.PieceCount] = "2" }, null, "", "isolated-smoke");
        Require((await service.ImportProductionMessagesAsync(new([cut], false))).Items.Single().Status == "monthly_plan_required", "Cut month guard");
        Require((await service.ImportProductionMessagesAsync(new([cut], false, new Dictionary<string, double> { ["2099-10"] = 48.501 }))).Succeeded, "Cut month/day link");
        var weld = new NotionImportRequest([new(new(2099, 10, 1), 12), new(new(2099, 10, 2), 13)]);
        Require((await service.ImportWeldHierarchyAsync(weld)).Succeeded, "Weld month/day create");
        Require((await service.ImportWeldHierarchyAsync(weld)).Succeeded, "Weld existing update");
        var materialSource = mapping.Sources.Single(source => source.Name == "原材料入库数据库");
        var material = new MaterialInboundNotionFillService(noNotion, service, () => settings, store);
        var preview = new NotionFillPreview(new(date, 0m, 12.501m), false, "isolated-smoke");
        await material.CreateAsync(new() { TargetDataSourceId = materialSource.Id }, preview);
        foreach (var source in mapping.Sources)
        {
            var rows = await store.QueryAsync(source.Id, null);
            var expected = source.Id == settings.Targets.Single(target => target.ModuleKey == "daily-weld-simulation").Id ? 2 : 1;
            Require(rows.Count == expected, "Unexpected duplicate records");
        }
        Console.WriteLine("临时表真实联调通过：检查、新增、防重、字段冲突/更新、下料月计划关联、焊接月/日层级、原材料入库及回读；未访问 Notion。临时表可按运行清单清理。");
        return 0;
    }
    private sealed class RejectNotion : HttpMessageHandler
    {
        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken) =>
            throw new InvalidOperationException("Teable 业务不应请求 Notion。");
    }
}
