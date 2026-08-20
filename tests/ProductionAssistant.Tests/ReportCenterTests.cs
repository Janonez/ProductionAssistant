using ClosedXML.Excel;
using ProductionAssistant.Models;
using ProductionAssistant.Services;
using Xunit;

public sealed class ReportCenterTests
{
    private static readonly ReportDeviceDefinition[] Devices =
    [
        new("PAMA西", "026-BH001A"),
        new("PAMA东", "026-BH001B")
    ];

    [Fact]
    public void Cross_month_period_and_matrix_preserve_zero()
    {
        var period = ReportPeriodResolver.CrossMonth(2026, 8);
        Assert.Equal(new DateOnly(2026, 7, 21), period.StartDate);
        Assert.Equal(new DateOnly(2026, 8, 20), period.EndDate);
        Assert.Equal(31, period.Dates.Count);

        var reports = period.Dates.Select((date, index) => new MachineDailyReport(date,
            [new("PAMA西", index), new("PAMA东", index == 0 ? 0 : 1.5)])).ToArray();
        var matrix = MachiningHoursProcessor.Build(period, Devices, reports);
        Assert.Equal(0, matrix.Values["PAMA东"][period.StartDate]);
        Assert.Equal(31, matrix.Values["PAMA西"].Count);
    }

    [Fact]
    public void Matrix_rejects_missing_or_unknown_devices()
    {
        var date = new DateOnly(2026, 8, 20);
        var error = Assert.Throws<InvalidOperationException>(() => MachiningHoursProcessor.Build(
            new ReportPeriod(date, date), Devices,
            [new(date, [new("PAMA西", 1), new("未知设备", 2)])]));
        Assert.Contains("缺失", error.Message);
        Assert.Contains("未知", error.Message);
    }

    [Fact]
    public void Excel_reader_finds_dynamic_headers_and_validates_file_date()
    {
        var folder = Path.Combine(Path.GetTempPath(), "ProductionAssistant.Tests", Guid.NewGuid().ToString("N"));
        Directory.CreateDirectory(folder);
        var path = Path.Combine(folder, "加工_2026-08-10.xlsx");
        try
        {
            using (var workbook = new XLWorkbook())
            {
                var sheet = workbook.AddWorksheet("sheet1");
                sheet.Cell(2, 2).Value = "重复标题值";
                sheet.Cell(2, 3).Value = "重复标题值";
                sheet.Cell(4, 2).Value = "设备名称";
                sheet.Cell(4, 7).Value = "实开台时";
                sheet.Cell(5, 2).Value = "PAMA西";
                sheet.Cell(5, 7).Value = 0;
                sheet.Cell(6, 2).Value = "PAMA东";
                sheet.Cell(6, 7).Value = "14.5";
                workbook.SaveAs(path);
            }
            var config = new ReportCenterConfig { ReportPath = ["加工"], Devices = [.. Devices] };
            var report = new MachineReportExcelService().Read(path, new DateOnly(2026, 8, 10), config);
            Assert.Equal(0, report.Devices[0].ActualMachineHours);
            Assert.Equal(14.5, report.Devices[1].ActualMachineHours);
            Assert.Throws<InvalidOperationException>(() => new MachineReportExcelService().Read(path, new DateOnly(2026, 8, 11), config));
        }
        finally { Directory.Delete(folder, true); }
    }

    [Fact]
    public void Summary_uses_manual_range_and_end_date_month_for_output()
    {
        var folder = Path.Combine(Path.GetTempPath(), "ProductionAssistant.Tests", Guid.NewGuid().ToString("N"));
        try
        {
            var period = new ReportPeriod(new DateOnly(2026, 7, 25), new DateOnly(2026, 8, 18));
            var values = period.Dates.ToDictionary(date => date, _ => 1d);
            var matrix = new MachineHoursMatrix(period, [Devices[0]],
                new Dictionary<string, IReadOnlyDictionary<DateOnly, double>> { [Devices[0].Name] = values });
            var path = new MachineReportExcelService().WriteSummary(matrix,
                new ReportCenterConfig { OutputRoot = folder, ReportPath = ["加工"], Devices = [Devices[0]] });
            Assert.Contains(Path.Combine("2026年", "08月"), path);
            Assert.EndsWith("机加工汇总_2026-07-25_2026-08-18.xlsx", path);
        }
        finally { if (Directory.Exists(folder)) Directory.Delete(folder, true); }
    }

    [Fact]
    public void FineReport_runner_keeps_verified_export_menu_sequence()
    {
        var directory = new DirectoryInfo(AppContext.BaseDirectory);
        while (directory is not null && !File.Exists(Path.Combine(directory.FullName, "ProductionAssistant.sln")))
            directory = directory.Parent;
        Assert.NotNull(directory);
        var script = File.ReadAllText(Path.Combine(directory!.FullName, "src", "ProductionAssistant.App", "Assets", "ReportCenter", "finereport-runner.cjs"));
        var export = script.IndexOf("getByText('导出', { exact: true })", StringComparison.Ordinal);
        var excel = script.IndexOf("locator('div').filter({ hasText: 'Excel' }).nth(1)", StringComparison.Ordinal);
        var hover = script.IndexOf("await excelMenu.hover()", StringComparison.Ordinal);
        var pageExport = script.IndexOf("locator('div').filter({ hasText: '分页导出' }).nth(1)", StringComparison.Ordinal);
        var downloadWait = script.IndexOf("page.waitForEvent('download'", StringComparison.Ordinal);
        var click = script.IndexOf("await pageExportButton.click()", StringComparison.Ordinal);
        Assert.True(export >= 0 && export < excel && excel < hover && hover < pageExport && pageExport < downloadWait && downloadWait < click,
            "正式 runner 没有保持已验证的导出、Excel hover、分页导出、提前监听下载顺序。");
        Assert.Contains("for (let index = 0; index < config.reportDates.length; index++)", script, StringComparison.Ordinal);
        Assert.Contains(".locator('.bi-basic-button.cursor-pointer.bi-node').click", script, StringComparison.Ordinal);
        Assert.Contains("await download.saveAs(target)", script, StringComparison.Ordinal);
        Assert.DoesNotContain(".downloads", script, StringComparison.Ordinal);
        Assert.Contains("chromium.launch({ headless: true })", script, StringComparison.Ordinal);
        Assert.DoesNotContain("if (!File.Exists(target))", File.ReadAllText(Path.Combine(directory.FullName,
            "src", "ProductionAssistant.Infrastructure", "Services", "ReportCenterService.cs")), StringComparison.Ordinal);
        var collector = File.ReadAllText(Path.Combine(directory.FullName, "src", "ProductionAssistant.Infrastructure", "Services", "FineReportCollector.cs"));
        Assert.Contains("StandardInputEncoding = new UTF8Encoding(false)", collector, StringComparison.Ordinal);
        Assert.Contains("StandardOutputEncoding = Encoding.UTF8", collector, StringComparison.Ordinal);
        Assert.Contains("StandardErrorEncoding = Encoding.UTF8", collector, StringComparison.Ordinal);
        Assert.Contains(".replace(/^\\uFEFF/, '')", script, StringComparison.Ordinal);
    }
}
