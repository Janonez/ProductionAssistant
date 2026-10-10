using System.Dynamic;
using ProductionAssistant.Models;
using ProductionAssistant.Services;
using Xunit;

namespace ProductionAssistant.Tests;

public sealed class PlanPdfRulesTests
{
    private static readonly PlanWorkspace Workspace = new("unused", "unused.xlsx", "unused/正式版", 2026, 10);

    [Theory]
    [InlineData(9, 30)]
    [InlineData(11, 1)]
    public void Dates_outside_the_month_are_manual_errors(int month, int day)
    {
        var values = Cells(2, 1);
        values[1, 1] = "计划完成时间";
        var date = new DateTime(2026, month, day).ToOADate();
        values[2, 1] = date;
        var issues = new List<PlanAuditIssue>();

        PlanPdfService.AuditDateColumns("技术准备", values, 4, 3, 2, 1, Workspace, issues);

        var issue = Assert.Single(issues);
        Assert.Equal("错误", issue.Severity);
        Assert.False(issue.CanAutoFix);
        Assert.Equal("C5", issue.Location);
        Assert.Equal(date, values[2, 1]);
        Assert.False(Result(issues).CanExport);
    }

    [Theory]
    [InlineData("否", 9, true)]
    [InlineData("是", 9, false)]
    [InlineData("否", 10, false)]
    [InlineData("", 10, true)]
    public void Project_overdue_rules_preserve_completion_status_and_require_manual_correction(
        string status, int expectedMonth, bool hasError)
    {
        var values = Cells(2, 3);
        values[1, 1] = "计划完成时间";
        values[1, 2] = "是否完成";
        values[1, 3] = "实际（预计）完成时间";
        values[2, 1] = new DateTime(2026, 9, 20).ToOADate();
        values[2, 2] = status;
        values[2, 3] = new DateTime(2026, expectedMonth, 25).ToOADate();
        var issues = new List<PlanAuditIssue>();

        PlanPdfService.AuditDateColumns("项目计划（锻压）", values, 1, 1, 2, 3, Workspace, issues);

        Assert.Equal(hasError, issues.Count > 0);
        Assert.All(issues, issue => { Assert.Equal("错误", issue.Severity); Assert.False(issue.CanAutoFix); });
    }

    [Fact]
    public void Incorrect_print_settings_are_repairable_warnings_but_still_block_export()
    {
        dynamic sheet = new ExpandoObject();
        dynamic setup = new ExpandoObject();
        setup.PaperSize = 1; // Not A4.
        sheet.PageSetup = setup;
        var issues = new List<PlanAuditIssue>();

        PlanPdfService.AuditPageSetup((object)sheet, "技术准备", issues);

        var issue = Assert.Single(issues);
        Assert.Equal("警告", issue.Severity);
        Assert.True(issue.CanAutoFix);
        Assert.False(Result(issues).CanExport);
        Assert.True(Result([]).CanExport);
    }

    [Theory]
    [InlineData("错误", false)]
    [InlineData("警告", true)]
    public async Task Export_service_rejects_unresolved_issues_before_starting_Excel(string severity, bool canAutoFix)
    {
        var audit = Result([new PlanAuditIssue { Severity = severity, CanAutoFix = canAutoFix }]);
        var error = await Assert.ThrowsAsync<InvalidOperationException>(() => new PlanPdfService().ExportCandidatesAsync(audit));
        Assert.Contains("检查尚未通过", error.Message);
    }

    [Fact]
    public async Task Export_service_rejects_changed_source_before_starting_Excel()
    {
        var error = await Assert.ThrowsAsync<InvalidOperationException>(() => new PlanPdfService().ExportCandidatesAsync(Result([])));
        Assert.Contains("源 Excel 已变化", error.Message);
    }

    [Fact]
    public void Candidate_output_is_under_selected_month_including_in_Development()
    {
        var root = Path.Combine(Path.GetTempPath(), "ProductionAssistant.Tests", Guid.NewGuid().ToString("N"), "2026年10月挂网计划");
        try
        {
            var folder = PlanPdfService.CreateCandidateOutputFolder(Workspace with { RootPath = root });
            Assert.Equal(Path.Combine(root, "生产助手预览"), Path.GetDirectoryName(folder));
            Assert.True(Directory.Exists(folder));
        }
        finally { if (Directory.Exists(root)) Directory.Delete(root, true); }
    }

    private static object[,] Cells(int rows, int columns) =>
        (object[,])Array.CreateInstance(typeof(object), [rows, columns], [1, 1]);

    [Fact]
    public void Blank_rows_below_header_and_between_records_are_warnings_and_deleted_bottom_up()
    {
        var values = Cells(8, 2);
        values[1, 1] = "发运计划";
        values[2, 1] = "序号";
        values[2, 2] = "工作令";
        values[4, 1] = 1d; values[4, 2] = "71126001";
        values[5, 1] = 2d; // A leftover number without a record is also blank.
        values[6, 1] = 3d; values[6, 2] = "03026001";
        var deleted = new List<int>();
        var sheet = BlankRowSheet(values, deleted);
        var issues = new List<PlanAuditIssue>();

        PlanPdfService.AuditBlankContentRows(sheet, values, 1, 1, issues);
        Assert.Equal(["第3行", "第5行"], issues.Select(issue => issue.Location));
        Assert.All(issues, issue => { Assert.Equal("警告", issue.Severity); Assert.True(issue.CanAutoFix); });
        Assert.False(Result(issues).CanExport);
        Assert.Equal(2, PlanPdfService.RemoveBlankContentRows(sheet));
        Assert.Equal([5, 3], deleted);
        // Header, real records and trailing padding are outside the deletion set.
    }

    [Theory]
    [InlineData("formula")]
    [InlineData("merged")]
    [InlineData("comment")]
    [InlineData("hidden")]
    public void Apparently_blank_rows_with_protected_content_are_preserved(string protection)
    {
        var values = Cells(4, 2);
        values[1, 1] = "序号"; values[1, 2] = "工作令";
        values[3, 1] = 1d; values[3, 2] = "71126001";
        var deleted = new List<int>();
        var sheet = BlankRowSheet(values, deleted, protection);
        var issues = new List<PlanAuditIssue>();
        PlanPdfService.AuditBlankContentRows(sheet, values, 1, 1, issues);
        Assert.Empty(issues);
        Assert.Equal(0, PlanPdfService.RemoveBlankContentRows(sheet));
        Assert.Empty(deleted);
    }

    [Theory]
    [InlineData("生产计划")]
    [InlineData("项目计划（锻压）")]
    [InlineData("项目计划（海工）")]
    [InlineData("技术准备")]
    public void Non_shipping_plans_preserve_spacing_and_section_rows(string sheetName)
    {
        var values = Cells(6, 2);
        values[1, 1] = "序号"; values[1, 2] = "工作令";
        values[3, 1] = 1d; values[3, 2] = "71126001";
        values[5, 1] = 2d; values[5, 2] = "03026001";
        var deleted = new List<int>();
        var sheet = BlankRowSheet(values, deleted, sheetName: sheetName);
        var issues = new List<PlanAuditIssue>();

        // Preserve layout rows even when their values look entirely blank.
        PlanPdfService.AuditBlankContentRows(sheet, values, 1, 1, issues);
        Assert.Empty(issues);
        Assert.Equal(0, PlanPdfService.RemoveBlankContentRows(sheet));
        Assert.Empty(deleted);
    }

    private static object BlankRowSheet(object[,] values, List<int> deleted, string? protection = null,
        string sheetName = "产品发运")
    {
        dynamic sheet = new ExpandoObject();
        sheet.Name = sheetName;
        dynamic used = new ExpandoObject();
        used.Value2 = values; used.Row = 1; used.Column = 1;
        sheet.UsedRange = used;
        dynamic rows = new ExpandoObject();
        rows.Item = new FakeIndex((row, _) =>
        {
            dynamic range = new ExpandoObject();
            range.HasFormula = protection == "formula" ? (object?)null : false;
            range.Hidden = protection == "hidden";
            range.Delete = (Action)(() => deleted.Add(row));
            return range;
        });
        sheet.Rows = rows;
        dynamic cells = new ExpandoObject();
        cells.Item = new FakeIndex((_, _) =>
        {
            dynamic cell = new ExpandoObject();
            cell.Comment = protection == "comment" ? new object() : null;
            cell.MergeCells = protection == "merged";
            dynamic area = new ExpandoObject();
            dynamic mergedRows = new ExpandoObject();
            mergedRows.Count = 2;
            area.Rows = mergedRows;
            cell.MergeArea = area;
            return cell;
        });
        sheet.Cells = cells;
        return sheet;
    }

    public sealed class FakeIndex(Func<int, int, object> get)
    {
        public object this[int row] => get(row, 0);
        public object this[int row, int column] => get(row, column);
    }

    private static PlanAuditResult Result(IReadOnlyList<PlanAuditIssue> issues) =>
        new(Workspace, [], issues, DateTime.MinValue, 0);
}
