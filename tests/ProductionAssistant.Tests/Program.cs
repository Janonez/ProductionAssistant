using ProductionAssistant.Models;
using ProductionAssistant.Services;
using Xunit;

public sealed class RegressionTests
{
    [Fact]
    public void Existing_smoke_regressions_pass()
    {
static void Assert(bool condition, string message) => Xunit.Assert.True(condition, message);

var anchor = new DateTime(2026, 8, 5);
var reportToken = new DailyReportFieldToken(
    "source-id", "塔筒日报", "property-id", "焊接情况（吨）", "number", "0.0");
var encodedReportToken = DailyReportSettingsStore.EncodeToken(reportToken);
Assert(DailyReportSettingsStore.TryDecodeToken(encodedReportToken, out var decodedReportToken),
    "日报模板字段标记无法解码。");
Assert(decodedReportToken == reportToken, "日报模板字段标记往返后内容不一致。");
Assert(!DailyReportSettingsStore.TryDecodeToken("{{report:broken}}", out _),
    "损坏的日报模板字段标记不应通过校验。");
var reportSettings = new DailyReportSettings();
var friendlyToken = DailyReportSettingsStore.AddOrUpdateField(reportSettings, reportToken);
Assert(friendlyToken == "prop(\"塔筒日报 · 焊接情况（吨）\")",
    "日报字段引用没有使用可读格式。");
Assert(reportSettings.Fields.Count == 1 && reportSettings.Fields[0].Token == reportToken,
    "可读字段引用没有保留稳定字段信息。");
var updatedToken = reportToken with { Format = "0.##" };
Assert(DailyReportSettingsStore.AddOrUpdateField(reportSettings, updatedToken) == friendlyToken &&
       reportSettings.Fields.Count == 1 && reportSettings.Fields[0].Token == updatedToken,
    "重复插入同一字段时没有更新格式配置。");
reportSettings.DraftTemplate = $"今日焊接：{friendlyToken} 吨";
reportSettings.DraftTemplateDocument = "{\"type\":\"doc\",\"content\":[]}";
var reportSettingsJson = System.Text.Json.JsonSerializer.Serialize(reportSettings);
var restoredReportSettings = System.Text.Json.JsonSerializer.Deserialize<DailyReportSettings>(reportSettingsJson);
Assert(restoredReportSettings?.DraftTemplate == reportSettings.DraftTemplate &&
       restoredReportSettings.DraftTemplateDocument == reportSettings.DraftTemplateDocument,
    "日报结构化模板和兼容纯文本无法一起持久化。");
var reportState = new DailyReportRunState
{
    LastSuccessDate = "2026-08-11",
    LastTemplateVersion = 2,
    LastSuccessSendTime = "17:30"
};
Assert(reportState.WasSent("2026-08-11", 2, "17:30"),
    "相同日期、模板和发送时间应阻止重复推送。");
Assert(!reportState.WasSent("2026-08-11", 2, "17:35"),
    "修改发送时间后应允许当天重新推送。");
var reportTestFolder = Path.Combine(Path.GetTempPath(), "ProductionAssistant.Tests", Guid.NewGuid().ToString("N"));
Directory.CreateDirectory(reportTestFolder);
Environment.SetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR", reportTestFolder);
try
{
    var legacySettings = new DailyReportSettings
    {
        DraftTemplate = reportSettings.DraftTemplate,
        ActiveTemplate = reportSettings.DraftTemplate,
        ActiveTemplateVersion = 3,
        SendTime = "17:35",
        Sources = reportSettings.Sources,
        Fields = reportSettings.Fields
    };
    File.WriteAllText(Path.Combine(reportTestFolder, "daily-report-settings.json"),
        System.Text.Json.JsonSerializer.Serialize(legacySettings));
    var migratedCatalog = DailyReportSettingsStore.LoadCatalog();
    Assert(migratedCatalog.Jobs.Count == 1 &&
           migratedCatalog.Jobs[0].Name == "生产消息塔日报" &&
           migratedCatalog.Jobs[0].ActiveTemplateVersion == 3 &&
           migratedCatalog.Jobs[0].SendTime == "17:35",
        "旧日报配置没有完整迁移为任务实例。");
    DailyReportSettingsStore.SaveCatalog(migratedCatalog);
    Assert(DailyReportSettingsStore.LoadCatalog().Jobs.Count == 1,
        "重复加载迁移配置时生成了重复任务。");

    var migratedJob = migratedCatalog.Jobs[0];
    for (var index = 0; index < 105; index++)
        DailyReportSettingsStore.AddRunRecord(new DailyReportRunRecord
        {
            JobId = migratedJob.Id,
            StartedAt = DateTimeOffset.Parse("2026-08-11T00:00:00+08:00").AddMinutes(index),
            Source = index % 2 == 0 ? "automatic" : "test",
            FinishedAt = DateTimeOffset.Parse("2026-08-11T00:01:00+08:00").AddMinutes(index),
            Succeeded = true
        });
    var retainedRecords = DailyReportSettingsStore.LoadRunRecords(migratedJob.Id);
    Assert(retainedRecords.Count == 100 && retainedRecords[0].StartedAt > retainedRecords[^1].StartedAt,
        "运行记录没有按任务保留最近 100 条。");
    Assert(DailyReportTaskScheduler.TaskName(migratedJob.Id).EndsWith(migratedJob.Id, StringComparison.Ordinal),
        "Windows 任务名称没有使用稳定任务 ID。");
    Assert(DailyReportSettingsStore.DeleteJob(migratedJob.Id) &&
           DailyReportSettingsStore.LoadRunRecords(migratedJob.Id).Count == 0,
        "删除日报任务时没有同步清理结构化运行记录。");
}
finally
{
    Environment.SetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR", null);
    Directory.Delete(reportTestFolder, true);
}
var datedTitle = ProductionMessageParser.Split("2026-08-08 塔筒产线（周六）", anchor).Single();
Assert(datedTitle.Date == new DateTime(2026, 8, 8), "带星期的塔筒标题日期解析失败。");
Assert(ProductionMessageParser.Parse(datedTitle, 1, anchor, allowDefaultDate: false).Kind ==
       ProductionMessageKind.TowerLineDaily, "带星期的塔筒标题类型识别失败。");
var markdownDatedTitle = ProductionMessageParser.Split("**2026‑08‑08 塔筒产线（周六）**", anchor).Single();
Assert(markdownDatedTitle.Date == new DateTime(2026, 8, 8), "Markdown 或非标准连字符日期解析失败。");
var markdownBatch = ProductionMessageParser.Split("""
    # 2026-08-08 塔筒产线（周六）
    （一）板材、型材入库情况
    板材：当日：0 吨；型材：当日：0 吨
    （二）下料情况
    当日：0 吨
    （三）焊接情况
    当日：38.1 吨
    （四）产出情况：
    当日：0 套
    # 2026-08-09 塔筒产线（周日）
    （一）板材、型材入库情况
    板材：当日：0 吨；型材：当日：0 吨
    （二）下料情况
    当日：0 吨
    （三）焊接情况
    当日：40.2 吨
    （四）产出情况：
    当日：0 套
    """, anchor);
Assert(markdownBatch.Count == 2, "Markdown 标题中的两日塔筒消息未正确拆分。");
Assert(markdownBatch.Select(segment => segment.Date).SequenceEqual(
       [new DateTime(2026, 8, 8), new DateTime(2026, 8, 9)]),
       "Markdown 标题中的两日日期解析错误。");
foreach (var (text, expected) in new[]
         {
             ("【📅】2026／08／08 塔筒产线", new DateTime(2026, 8, 8)),
             ("※《2026·08·09》塔筒产线", new DateTime(2026, 8, 9)),
             ("👉 2026 08 10 塔筒产线", new DateTime(2026, 8, 10)),
             ("---8月11日 塔筒产线", new DateTime(2026, 8, 11))
         })
{
    Assert(ProductionMessageParser.Split(text, anchor).Single().Date == expected,
        $"符号包围的日期解析失败：{text}");
}
Assert(ProductionMessageParser.Split("当日：38.1 吨", anchor).Single().Date is null,
    "日报数值不应被误识别为日期。");
var input = """
    2026-08-05 工序：下料，班次：白班，项目：P-01，材料：Q355，件数：12件，重量：3.5吨
    8月6日 产线：一线，板材入库：20吨，下料：10吨，焊接：8吨，产出：2节，当月累计：12节，全年累计：80节，8月计划：30节
    """;
var segments = ProductionMessageParser.Split(input, anchor);
Assert(segments.Count == 2, "日期边界未正确拆分。");

var cutting = ProductionMessageParser.Parse(segments[0], 1, anchor, allowDefaultDate: false);
Assert(cutting.Kind == ProductionMessageKind.MaterialCutting, "下料消息识别失败。");
Assert(cutting.BusinessDate == new DateTime(2026, 8, 5), "完整日期解析失败。");
Assert(cutting.Fields[ProductionMessageFields.Unit] == "件", "件数单位解析失败。");
Assert(cutting.CanWrite, $"下料消息不应被阻断：{cutting.WarningText}");
ProductionMessageParser.ApplyEdits(cutting, anchor, allowDefaultDate: true, out _);
Assert(!cutting.WarningText.Contains("未带日期"), "显式日期被误判为默认日期。");

var naturalCuttingSegment = ProductionMessageParser.Split(
    "8.6下料今日双班，计划切割中车项目钢板2张8吨", anchor).Single();
var naturalCutting = ProductionMessageParser.Parse(
    naturalCuttingSegment, 2, anchor, allowDefaultDate: false);
Assert(naturalCutting.BusinessDate == new DateTime(2026, 8, 6), "自然下料消息日期解析失败。");
Assert(naturalCutting.Kind == ProductionMessageKind.MaterialCutting, "自然下料消息类型识别失败。");
Assert(naturalCutting.Fields[ProductionMessageFields.Shift] == "双班", "自然下料消息班次解析失败。");
Assert(naturalCutting.Fields[ProductionMessageFields.Project] == "中车", "自然下料消息项目解析失败。");
Assert(naturalCutting.Fields[ProductionMessageFields.Material] == "钢板", "自然下料消息材料解析失败。");
Assert(naturalCutting.Fields[ProductionMessageFields.PieceCount] == "2张", "自然下料消息张数解析失败。");
Assert(naturalCutting.Fields[ProductionMessageFields.Weight] == "8吨", "自然下料消息重量解析失败。");
Assert(naturalCutting.CanWrite, $"自然下料消息不应被阻断：{naturalCutting.WarningText}");

var cuttingBatch = ProductionMessageParser.Split("""
    8.6下料今日双班，计划切割中车项目钢板2张8吨
    8.7下料今日单班，计划切割海工项目钢板3张12吨
    """, anchor);
Assert(cuttingBatch.Count == 2, "批量下料消息未按日期拆分。");
Assert(cuttingBatch.Select((segment, index) =>
        ProductionMessageParser.Parse(segment, index + 1, anchor, allowDefaultDate: false))
    .All(draft => draft.Kind == ProductionMessageKind.MaterialCutting && draft.CanWrite),
    "批量下料消息未全部通过解析。");

var chatBatch = ProductionMessageParser.Split("""
    李雅楠 7/21 17:04:20
    7.22下料今日双班，计划切割中车项目钢板2张9吨

    李雅楠 7/29 16:57:42
    7.30下料今日双班，计划切割中车项目钢板2张9吨

    李雅楠 7/30 17:06:54
    7.31下料今日双班，计划切割中车项目钢板2张9吨
    """, anchor);
var chatDates = chatBatch.Where(segment => segment.Date is not null)
    .Select(segment => segment.Date!.Value.Day)
    .ToArray();
Assert(chatDates.SequenceEqual([22, 30, 31]),
    $"两位日期被截断：{string.Join(", ", chatDates)}");
Assert(chatBatch.Count == 3, "聊天发送时间行未被过滤。");

var tower = ProductionMessageParser.Parse(segments[1], 2, anchor, allowDefaultDate: false);
Assert(tower.Kind == ProductionMessageKind.TowerLineDaily, "塔筒产线日报识别失败。");
Assert(tower.BusinessDate == new DateTime(2026, 8, 6), "月日日期解析失败。");
Assert(!tower.Fields.ContainsKey(ProductionMessageFields.Line), "产线字段不应进入日报输入。");
Assert(!tower.Fields.ContainsKey(ProductionMessageFields.MonthlyOutput), "当月累计不应进入日报输入。");
Assert(!tower.Fields.ContainsKey(ProductionMessageFields.YearlyOutput), "全年累计不应进入日报输入。");
Assert(tower.Fields[ProductionMessageFields.OutputSections] == "2节", "产出节数解析失败。");
Assert(tower.PlanMonth is null, "计划月份不应进入日报输入。");

var noDateSegments = ProductionMessageParser.Split("下料，件数：2件", anchor);
var noDate = ProductionMessageParser.Parse(noDateSegments[0], 1, anchor, allowDefaultDate: false);
Assert(!noDate.CanWrite && noDate.WarningText.Contains("业务日期"), "批量无日期消息未被阻断。");
Assert(noDate.TypeDisplay == "下料日报数据库", "解析结果未显示目标数据库。");
Assert(noDate.PreviewFields.All(field => noDate.Fields.ContainsKey(field.Key)),
    "解析结果不应显示本次没有数据的字段。");

var realInput = """
    2026年8月5日
    塔筒产线：
    （一）板材、型材入库情况
    板材：当日：0 吨；当月：0 吨；全年累计：4803.41 吨
    型材：当日：0 吨；当月：0 吨；全年累计：0 吨
    （二）下料情况
    当日：0 吨；当月：0 吨；全年累计：4803.41 吨
    （三）焊接情况
    8月计划：1160吨
    当日：40.12吨；当月：169.94吨；全年累计：3433.37吨
    （四）产出情况：
    当日：0套；当月：0套；全年累计：2套（八节）
    """;
var realSegment = ProductionMessageParser.Split(realInput, anchor).Single();
var real = ProductionMessageParser.Parse(realSegment, 3, anchor, allowDefaultDate: false);
Assert(real.Kind == ProductionMessageKind.TowerLineDaily, "真实日报识别失败。");
Assert(real.BusinessDate == new DateTime(2026, 8, 5), "真实日报日期解析失败。");
Assert(real.CanWrite, $"真实日报不应被阻止：{real.WarningText}");
Assert(real.Fields[ProductionMessageFields.SheetInStock] == "0吨", "板材当日数值解析失败。");
Assert(real.Fields[ProductionMessageFields.ProfileInStock] == "0吨", "型材当日数值解析失败。");
Assert(real.Fields[ProductionMessageFields.Cutting] == "0吨", "下料当日数值解析失败。");
Assert(real.Fields[ProductionMessageFields.Welding] == "40.12吨", "焊接当日数值解析失败。");
Assert(real.Fields[ProductionMessageFields.DailyOutput] == "0套", "产出套数解析失败。");
Assert(real.Fields[ProductionMessageFields.OutputSections] == "0节", "零产出节数未补零。");
Assert(!real.Fields.ContainsKey(ProductionMessageFields.MonthlyReference), "月度计划不应进入日报输入。");
Assert(real.PlanMonth is null, "真实日报计划月份不应进入日报输入。");
Assert(ProductionMessageParser.TryCreateValue(real, out var realValue, out var realValueMessage),
    $"真实日报值转换失败：{realValueMessage}");
Assert(!realValue.Fields.ContainsKey(ProductionMessageFields.Line), "产线字段不应写入 Notion。");
Assert(!realValue.Fields.ContainsKey(ProductionMessageFields.MonthlyOutput), "当月累计不应写入 Notion。");
Assert(!realValue.Fields.ContainsKey(ProductionMessageFields.YearlyOutput), "全年累计不应写入 Notion。");
Assert(!realValue.Fields.ContainsKey(ProductionMessageFields.MonthlyReference), "月度计划不应写入 Notion。");

real.SetDatabaseFieldMappings(new Dictionary<ProductionMessageKind, IReadOnlyDictionary<string, string>>
{
    [ProductionMessageKind.TowerLineDaily] = new Dictionary<string, string>
    {
        [ProductionMessageFields.SheetInStock] = "板材入库情况（吨）",
        [ProductionMessageFields.Welding] = "焊接情况（吨）"
    }
});
var previewFields = real.PreviewFields.ToDictionary(field => field.Key);
Assert(previewFields[ProductionMessageFields.SheetInStock].Label == "板材入库情况（吨）",
    "预览未使用数据库字段名。");
Assert(previewFields[ProductionMessageFields.SheetInStock].Value == "0",
    "预览未显示输入数字。");
Assert(previewFields[ProductionMessageFields.Welding].Value == "40.12",
    "预览未去除数值单位。");
Console.WriteLine($"Real report: kind={real.Kind}, date={real.BusinessDate:yyyy-MM-dd}, canWrite={real.CanWrite}");
Console.WriteLine($"Real fields: {string.Join(", ", real.Fields.Select(pair => $"{pair.Key}={pair.Value}"))}");
Console.WriteLine($"Real warning: {real.WarningText}");

Console.WriteLine("Production message parser smoke check passed.");
    }
}
