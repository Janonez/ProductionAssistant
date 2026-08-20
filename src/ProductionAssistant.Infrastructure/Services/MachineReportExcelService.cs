using System.Globalization;
using System.Text.RegularExpressions;
using ClosedXML.Excel;
using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public sealed partial class MachineReportExcelService
{
    public MachineDailyReport Read(string filePath, DateOnly reportDate, ReportCenterConfig config)
    {
        if (!File.Exists(filePath)) throw new InvalidOperationException($"日报文件不存在：{filePath}");
        var match = FileDateRegex().Match(Path.GetFileNameWithoutExtension(filePath));
        if (!match.Success || !DateOnly.TryParseExact(match.Groups[1].Value, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var fileDate) || fileDate != reportDate)
            throw new InvalidOperationException($"日报日期不一致：文件={match.Groups[1].Value}，任务={reportDate:yyyy-MM-dd}");

        using var workbook = new XLWorkbook(filePath);
        foreach (var sheet in workbook.Worksheets)
        {
            var used = sheet.RangeUsed();
            if (used is null) continue;
            var maxRow = Math.Min(config.HeaderSearchRows, used.LastRow().RowNumber());
            for (var row = 1; row <= maxRow; row++)
            {
                var deviceColumn = 0;
                var valueColumn = 0;
                foreach (var cell in sheet.Row(row).CellsUsed())
                {
                    var header = cell.GetString().Trim();
                    if (header == config.DeviceColumn) deviceColumn = cell.Address.ColumnNumber;
                    if (header == config.ValueColumn) valueColumn = cell.Address.ColumnNumber;
                }
                if (deviceColumn == 0 || valueColumn == 0) continue;
                var records = new List<ReportDeviceRecord>();
                for (var dataRow = row + 1; dataRow <= used.LastRow().RowNumber(); dataRow++)
                {
                    var name = sheet.Cell(dataRow, deviceColumn).GetString().Trim();
                    if (string.IsNullOrWhiteSpace(name)) continue;
                    records.Add(new ReportDeviceRecord(name, ReadHours(sheet.Cell(dataRow, valueColumn), reportDate, name)));
                }
                if (records.Count == 0) throw new InvalidOperationException($"{reportDate:yyyy-MM-dd} 未读取到设备数据。");
                return new MachineDailyReport(reportDate, records);
            }
        }
        throw new InvalidOperationException($"{reportDate:yyyy-MM-dd} 未找到“{config.DeviceColumn}”和“{config.ValueColumn}”表头。");
    }

    public string WriteSummary(MachineHoursMatrix matrix, ReportCenterConfig config)
    {
        var period = matrix.Period;
        var directory = Path.Combine(config.OutputRoot, config.SummaryFolder, $"{period.EndDate.Year}年", $"{period.EndDate.Month:00}月");
        Directory.CreateDirectory(directory);
        var output = Path.Combine(directory, $"机加工汇总_{period.StartDate:yyyy-MM-dd}_{period.EndDate:yyyy-MM-dd}.xlsx");
        var temporary = output + ".tmp.xlsx";
        using (var workbook = new XLWorkbook())
        {
            var sheet = workbook.AddWorksheet("机加工汇总");
            var dates = period.Dates;
            var totalColumn = dates.Count + 3;
            sheet.Cell(1, 1).Value = $"机加工{period.EndDate.Month}月";
            sheet.Range(1, 1, 1, totalColumn).Merge().Style.Font.SetBold().Font.SetFontSize(16);
            sheet.Cell(2, 1).Value = "设备名称";
            sheet.Cell(2, 2).Value = "设备编号";
            for (var index = 0; index < dates.Count; index++) sheet.Cell(2, index + 3).Value = dates[index].Day;
            sheet.Cell(2, totalColumn).Value = "合计";
            for (var index = 0; index < matrix.Devices.Count; index++)
            {
                var row = index + 3;
                var device = matrix.Devices[index];
                sheet.Cell(row, 1).Value = device.Name;
                sheet.Cell(row, 2).Value = device.Code;
                for (var day = 0; day < dates.Count; day++) sheet.Cell(row, day + 3).Value = matrix.Values[device.Name][dates[day]];
                sheet.Cell(row, totalColumn).FormulaA1 = $"SUM({sheet.Cell(row, 3).Address}:{sheet.Cell(row, totalColumn - 1).Address})";
            }
            var lastRow = matrix.Devices.Count + 2;
            sheet.Range(2, 1, lastRow, totalColumn).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
            sheet.Range(2, 1, lastRow, totalColumn).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
            sheet.Range(2, 1, 2, totalColumn).Style.Font.SetBold().Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
            sheet.Range(2, totalColumn, lastRow, totalColumn).Style.Fill.SetBackgroundColor(XLColor.FromHtml("#92D050")).Font.SetBold();
            sheet.Range(3, 2, lastRow, totalColumn).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
            sheet.Columns(3, totalColumn - 1).Width = 5;
            sheet.Columns(3, totalColumn - 1).Hide();
            sheet.Column(1).Width = 14;
            sheet.Column(2).Width = 16;
            sheet.Column(totalColumn).Width = 10;
            sheet.SheetView.FreezeRows(2);
            workbook.SaveAs(temporary);
        }
        File.Move(temporary, output, true);
        return output;
    }

    private static double ReadHours(IXLCell cell, DateOnly date, string device)
    {
        if (cell.IsEmpty()) return 0;
        if (cell.TryGetValue<double>(out var numeric)) return numeric;
        var text = cell.GetString().Trim();
        if (string.IsNullOrEmpty(text)) return 0;
        if (double.TryParse(text, NumberStyles.Float, CultureInfo.InvariantCulture, out numeric) ||
            double.TryParse(text, NumberStyles.Float, CultureInfo.CurrentCulture, out numeric)) return numeric;
        throw new InvalidOperationException($"{date:yyyy-MM-dd} {device} 的实开台时不是数字：{text}");
    }

    [GeneratedRegex(@"(\d{4}-\d{2}-\d{2})$", RegexOptions.CultureInvariant)]
    private static partial Regex FileDateRegex();
}
