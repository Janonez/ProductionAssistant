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

    private static PlanAuditResult Result(IReadOnlyList<PlanAuditIssue> issues) =>
        new(Workspace, [], issues, DateTime.MinValue, 0);
}
