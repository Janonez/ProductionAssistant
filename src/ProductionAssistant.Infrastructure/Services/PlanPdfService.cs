using System.Globalization;
using System.Runtime.InteropServices;
using System.Text.RegularExpressions;
using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public sealed partial class PlanPdfService
{
    private const int XlTypePdf = 0;
    private const int XlQualityStandard = 0;
    private const int XlPaperA4 = 9;
    private const int XlLandscape = 2;
    private const int XlSheetVisible = -1;
    private const int XlContinuous = 1;
    private const int XlThin = 2;
    private const int XlBlack = 0;
    private const int XlLineStyleNone = -4142;
    private const double ProjectRowHeight = 35.25;
    private const double OtherRowHeight = 26.25;
    private const double RowHeightTolerance = 0.01;

    private static readonly (string FileTitle, string[] Sheets)[] Exports =
    [
        ("生产计划", ["生产计划"]),
        ("项目计划", ["项目计划（锻压）", "项目计划（海工）"]),
        ("技术准备计划", ["技术准备"]),
        ("工艺准备计划", ["工艺准备"]),
        ("毛坯、原材料配套计划", ["毛坯、原材料配套计划"]),
        ("采购件配套计划", ["采购配套计划"]),
        ("外协件配套计划", ["外协件配套计划"]),
        ("关键外协工序计划", ["关键外协工序计划"]),
        ("原材料下料计划", ["原材料下料"]),
        ("零件加工计划", ["零件加工"]),
        ("发运计划", ["产品发运"])
    ];

    private static readonly HashSet<string> PrintThroughRemarksSheets =
    [
        "技术准备",
        "工艺准备",
        "毛坯、原材料配套计划",
        "采购配套计划",
        "外协件配套计划",
        "关键外协工序计划",
        "原材料下料",
        "零件加工"
    ];

    private static readonly HashSet<string> RequiredSheetNames =
        Exports.SelectMany(item => item.Sheets).ToHashSet(StringComparer.Ordinal);

    public static PlanWorkspace FindWorkspace(string rootPath)
    {
        if (!Directory.Exists(rootPath))
            throw new DirectoryNotFoundException("选择的月份目录不存在。");

        var workbooks = Directory.EnumerateFiles(rootPath, "*.*", SearchOption.TopDirectoryOnly)
            .Where(path => !Path.GetFileName(path).StartsWith("~$", StringComparison.Ordinal))
            .Where(path => Path.GetFileNameWithoutExtension(path)
                .Contains("一二三级计划", StringComparison.OrdinalIgnoreCase))
            .Where(path => new[] { ".xlsx", ".xlsm", ".xls" }
                .Contains(Path.GetExtension(path), StringComparer.OrdinalIgnoreCase))
            .ToArray();
        if (workbooks.Length != 1)
            throw new InvalidOperationException(
                $"应当且只能找到一个“一二三级计划”Excel，当前找到 {workbooks.Length} 个。");

        var formalFolder = Path.Combine(rootPath, "正式版");
        if (!Directory.Exists(formalFolder))
            throw new DirectoryNotFoundException("月份目录中缺少“正式版”文件夹。");

        var (year, month) = ParsePlanMonth(rootPath);

        return new PlanWorkspace(rootPath, workbooks[0], formalFolder, year, month);
    }

    private static (int Year, int Month) ParsePlanMonth(string rootPath)
    {
        int? year = null;
        int? month = null;
        for (var directory = new DirectoryInfo(rootPath); directory is not null; directory = directory.Parent)
        {
            var combined = MonthFolderRegex().Match(directory.Name);
            if (combined.Success)
            {
                year ??= int.Parse(combined.Groups["year"].Value, CultureInfo.InvariantCulture);
                month ??= int.Parse(combined.Groups["month"].Value, CultureInfo.InvariantCulture);
            }

            var yearMatch = YearFolderRegex().Match(directory.Name);
            var monthMatch = MonthOnlyFolderRegex().Match(directory.Name);
            if (year is null && yearMatch.Success)
                year = int.Parse(yearMatch.Groups["year"].Value, CultureInfo.InvariantCulture);
            if (month is null && monthMatch.Success)
                month = int.Parse(monthMatch.Groups["month"].Value, CultureInfo.InvariantCulture);
            if (year is not null && month is not null)
                return ValidateMonth(year.Value, month.Value);
        }
        throw new InvalidOperationException(
            "路径中未识别到计划年月。支持“2026年\\8月挂网计划”或“2026年8月挂网计划”。");
    }

    private static (int Year, int Month) ValidateMonth(int year, int month)
    {
        _ = new DateTime(year, month, 1);
        return (year, month);
    }

    public Task<PlanAuditResult> AuditAsync(string rootPath) =>
        RunExcelAsync(() => Audit(FindWorkspace(rootPath)));

    public Task<PlanRepairResult> RepairAsync(PlanWorkspace workspace) =>
        RunExcelAsync(() => Repair(workspace));

    public Task<PlanExportResult> ExportCandidatesAsync(
        PlanWorkspace workspace,
        IProgress<PlanExportProgress>? progress = null) =>
        RunExcelAsync(() => ExportCandidates(workspace, progress));

    public static bool IsSourceCurrent(PlanAuditResult audit)
    {
        var file = new FileInfo(audit.Workspace.WorkbookPath);
        return file.Exists &&
               file.Length == audit.SourceLength &&
               file.LastWriteTimeUtc == audit.SourceLastWriteTimeUtc;
    }

    private static PlanAuditResult Audit(PlanWorkspace workspace)
    {
        var source = new FileInfo(workspace.WorkbookPath);
        dynamic? excel = null;
        dynamic? workbook = null;
        dynamic? worksheets = null;
        var sheets = new List<string>();
        var issues = new List<PlanAuditIssue>();
        try
        {
            excel = CreateExcel();
            workbook = excel.Workbooks.Open(workspace.WorkbookPath, ReadOnly: true);
            worksheets = workbook.Worksheets;
            var sheetCount = (int)worksheets.Count;
            for (var index = 1; index <= sheetCount; index++)
            {
                dynamic? sheet = null;
                try
                {
                    sheet = worksheets.Item[index];
                    if ((int)sheet.Visible != XlSheetVisible) continue;
                    var name = (string)sheet.Name;
                    if (!RequiredSheetNames.Contains(name)) continue;
                    sheets.Add(name);
                    AuditSheet(sheet, workspace, issues);
                }
                finally
                {
                    ReleaseCom(sheet);
                }
            }

            foreach (var required in Exports.SelectMany(item => item.Sheets))
                if (!sheets.Contains(required, StringComparer.Ordinal))
                    issues.Add(new PlanAuditIssue
                    {
                        Severity = "错误",
                        Sheet = required,
                        Location = "工作簿",
                        Message = "缺少导出所需的Sheet"
                    });
            return new PlanAuditResult(
                workspace,
                sheets,
                issues,
                source.LastWriteTimeUtc,
                source.Length);
        }
        finally
        {
            try { workbook?.Close(false); } catch { }
            try { excel?.Quit(); } catch { }
            ReleaseCom(worksheets);
            ReleaseCom(workbook);
            ReleaseCom(excel);
        }
    }

    private static PlanRepairResult Repair(PlanWorkspace workspace)
    {
        var backupPath = CreateWorkbookBackup(workspace);

        dynamic? excel = null;
        dynamic? workbook = null;
        dynamic? worksheets = null;
        var changedCells = 0;
        var changedRows = 0;
        var succeeded = false;
        try
        {
            excel = CreateExcel();
            workbook = excel.Workbooks.Open(workspace.WorkbookPath, ReadOnly: false);
            if (Convert.ToBoolean(workbook.ReadOnly, CultureInfo.InvariantCulture))
                throw new IOException("源Excel当前处于只读或被其他程序占用，无法保存修复结果。");

            worksheets = workbook.Worksheets;
            foreach (var sheetName in Exports.SelectMany(item => item.Sheets)
                         .Distinct(StringComparer.Ordinal))
            {
                dynamic? sheet = null;
                try
                {
                    sheet = worksheets.Item[sheetName];
                    if ((int)sheet.Visible != XlSheetVisible)
                        throw new InvalidOperationException($"导出所需的Sheet“{sheetName}”不可见，无法修复。");
                    changedCells += FixSheetSequences(sheet);
                    changedRows += RepairSheetFormat(sheet);
                }
                finally
                {
                    ReleaseCom(sheet);
                }
            }

            workbook.Save();
            succeeded = true;
            return new PlanRepairResult(workspace.WorkbookPath, backupPath, changedCells, changedRows);
        }
        finally
        {
            try { workbook?.Close(false); } catch { }
            try { excel?.Quit(); } catch { }
            ReleaseCom(worksheets);
            ReleaseCom(workbook);
            ReleaseCom(excel);
            if (!succeeded && File.Exists(backupPath))
            {
                try { File.Copy(backupPath, workspace.WorkbookPath, true); } catch { }
            }
        }
    }

    private static int FixSheetSequences(dynamic sheet)
    {
        dynamic? usedRange = null;
        try
        {
            usedRange = sheet.UsedRange;
            var firstRow = (int)usedRange.Row;
            var firstColumn = (int)usedRange.Column;
            object? raw = usedRange.Value2;
            if (raw is not object[,] values) return 0;

            var sheetName = (string)sheet.Name;
            return sheetName is "项目计划（锻压）" or "项目计划（海工）"
                ? FixProjectSequence(sheet, sheetName, values, firstRow, firstColumn)
                : FixSequence(sheet, sheetName, values, firstRow, firstColumn);
        }
        finally
        {
            ReleaseCom(usedRange);
        }
    }

    private static int FixSequence(
        dynamic worksheet, string sheet, object[,] values, int firstRow, int firstColumn)
    {
        var sequenceColumn = FindHeaderColumn(values, "序号");
        if (sequenceColumn is null) return 0;

        var (headerRow, column) = sequenceColumn.Value;
        int[]? previous = null;
        var changed = 0;
        for (var row = headerRow + 1; row <= values.GetLength(0); row++)
        {
            var hasContent = RowHasContent(values, row, column);
            var parsed = TryParseSequence(values[row, column], out var observed);
            if (!parsed && !hasContent)
            {
                previous = null;
                continue;
            }

            var absoluteRow = firstRow + row - 1;
            var absoluteColumn = firstColumn + column - 1;
            if (IsRepeatedHeaderRow(values, row))
            {
                previous = null;
                continue;
            }
            if (IsSequenceMergedFromAbove(worksheet, absoluteRow, absoluteColumn))
                continue;
            if (!parsed && IsMergedSectionRow(worksheet, values, row, firstRow, firstColumn))
            {
                previous = null;
                continue;
            }

            int[] expected;
            if (previous is null)
                expected = parsed ? Ones(observed.Length) : [1];
            else if (parsed && observed.Length == 1 && observed[0] == 1)
                expected = [1];
            else
                expected = NextSequence(previous, parsed ? observed : null);

            if (!parsed || !observed.SequenceEqual(expected))
                changed += SetSequenceValue(
                    worksheet, absoluteRow, absoluteColumn, expected, values[row, column]);
            previous = expected;
        }
        return changed;
    }

    private static int FixProjectSequence(
        dynamic worksheet, string sheet, object[,] values, int firstRow, int firstColumn)
    {
        var sequenceColumn = FindHeaderColumn(values, "序号");
        if (sequenceColumn is null) return 0;

        var (headerRow, column) = sequenceColumn.Value;
        var nextProject = 1;
        var currentProject = 0;
        var nextDetail = 1;
        var changed = 0;
        for (var row = headerRow + 1; row <= values.GetLength(0); row++)
        {
            if (!RowHasContent(values, row, column)) continue;

            var absoluteRow = firstRow + row - 1;
            var absoluteColumn = firstColumn + column - 1;
            if (IsRepeatedHeaderRow(values, row) ||
                IsSequenceMergedFromAbove(worksheet, absoluteRow, absoluteColumn) ||
                IsMergedSectionRow(worksheet, values, row, firstRow, firstColumn))
                continue;

            var parsed = TryParseSequence(values[row, column], out var observed);
            int[] expected;
            if (parsed && observed.Length == 1)
            {
                expected = [nextProject];
                currentProject = nextProject++;
                nextDetail = 1;
            }
            else
            {
                if (currentProject == 0)
                {
                    currentProject = 1;
                    nextProject = 2;
                }
                expected = [currentProject, nextDetail++];
            }

            if (!parsed || !observed.SequenceEqual(expected))
                changed += SetSequenceValue(
                    worksheet, absoluteRow, absoluteColumn, expected, values[row, column]);
        }
        return changed;
    }

    private static int[] Ones(int length) =>
        Enumerable.Repeat(1, Math.Max(1, length)).ToArray();

    private static int[] NextSequence(int[] previous, int[]? observed)
    {
        var length = observed?.Length ?? previous.Length;
        if (length <= 1) return [previous[0] + 1];
        if (previous.Length == 1)
            return [previous[0], ..Ones(length - 1)];

        var next = previous.ToArray();
        if (length != previous.Length)
        {
            if (length < previous.Length)
            {
                next = previous[..length];
                next[^1]++;
                return next;
            }
            return [..previous, ..Ones(length - previous.Length)];
        }

        if (observed is not null && observed[^1] == 1 &&
            !observed[..^1].SequenceEqual(previous[..^1]))
        {
            next[^2]++;
            next[^1] = 1;
            return next;
        }

        next[^1]++;
        return next;
    }

    private static int SetSequenceValue(
        dynamic worksheet, int row, int column, int[] value, object? current)
    {
        var text = string.Join('.', value);
        var currentText = Convert.ToString(current, CultureInfo.CurrentCulture)?.Trim();
        if (currentText == text) return 0;

        dynamic? cell = null;
        try
        {
            cell = worksheet.Cells.Item[row, column];
            object cellValue = value.Length == 1 ? value[0] : text;
            if (value.Length > 1)
                cell.NumberFormat = "@";
            cell.Value2 = cellValue;
            return 1;
        }
        finally
        {
            ReleaseCom(cell);
        }
    }

    private static void AuditSheet(dynamic sheet, PlanWorkspace workspace, List<PlanAuditIssue> issues)
    {
        dynamic? usedRange = null;
        try
        {
            usedRange = sheet.UsedRange;
            var firstRow = (int)usedRange.Row;
            var firstColumn = (int)usedRange.Column;
            var rowCount = (int)usedRange.Rows.Count;
            var columnCount = (int)usedRange.Columns.Count;
            object? raw = usedRange.Value2;
            var values = raw as object[,];
            if (values is null) return;

            AuditMonthText((string)sheet.Name, values, firstRow, firstColumn, workspace, issues);
            if (sheet.Name is "项目计划（锻压）" or "项目计划（海工）")
                AuditProjectSequence(sheet, (string)sheet.Name, values, firstRow, firstColumn, issues);
            else
                AuditSequence(sheet, (string)sheet.Name, values, firstRow, firstColumn, issues);
            AuditDateColumns((string)sheet.Name, values, firstRow, firstColumn, rowCount, columnCount, workspace, issues);
            AuditFormulaErrors((string)sheet.Name, values, firstRow, firstColumn, issues);
            AuditFormat(sheet, usedRange, values, firstRow, firstColumn, issues);
        }
        finally
        {
            ReleaseCom(usedRange);
        }
    }

    private static void AuditMonthText(
        string sheet, object[,] values, int firstRow, int firstColumn,
        PlanWorkspace workspace, List<PlanAuditIssue> issues)
    {
        var expected = $"{workspace.Year}年{workspace.Month}月";
        var limitRows = Math.Min(values.GetLength(0), 10);
        for (var row = 1; row <= limitRows; row++)
        for (var col = 1; col <= values.GetLength(1); col++)
        {
            var text = Convert.ToString(values[row, col], CultureInfo.CurrentCulture);
            var match = text is null ? Match.Empty : MonthTextRegex().Match(text);
            if (!match.Success || text!.Contains(expected, StringComparison.Ordinal)) continue;
            issues.Add(new PlanAuditIssue
            {
                Severity = "错误",
                Sheet = sheet,
                Location = CellAddress(firstRow + row - 1, firstColumn + col - 1),
                Message = $"标题年月为“{match.Value}”，与目录月份“{expected}”不一致"
            });
        }
    }

    private static void AuditSequence(
        dynamic worksheet, string sheet, object[,] values, int firstRow, int firstColumn,
        List<PlanAuditIssue> issues)
    {
        var sequenceColumn = FindHeaderColumn(values, "序号");
        if (sequenceColumn is null)
        {
            issues.Add(new PlanAuditIssue
            {
                Severity = "错误", Sheet = sheet, Location = "表头",
                Message = "未找到“序号”列"
            });
            return;
        }
        var (headerRow, column) = sequenceColumn.Value;
        var seen = new HashSet<string>(StringComparer.Ordinal);
        int[]? previous = null;
        for (var row = headerRow + 1; row <= values.GetLength(0); row++)
        {
            var hasContent = RowHasContent(values, row, column);
            if (!TryParseSequence(values[row, column], out var number))
            {
                if (!hasContent)
                {
                    seen.Clear();
                    previous = null;
                    continue;
                }
                if (IsRepeatedHeaderRow(values, row) ||
                    IsSequenceMergedFromAbove(worksheet, firstRow + row - 1, firstColumn + column - 1) ||
                    IsMergedSectionRow(worksheet, values, row, firstRow, firstColumn))
                {
                    seen.Clear();
                    previous = null;
                    continue;
                }
                issues.Add(new PlanAuditIssue
                {
                    Severity = "错误", Sheet = sheet,
                    Location = CellAddress(firstRow + row - 1, firstColumn + column - 1),
                    Message = "该行有内容但缺少序号",
                    CanAutoFix = true
                });
                continue;
            }

            var text = string.Join('.', number);
            var location = CellAddress(firstRow + row - 1, firstColumn + column - 1);
            if (!seen.Add(text))
            {
                issues.Add(new PlanAuditIssue
                {
                    Severity = "错误", Sheet = sheet, Location = location,
                    Message = $"序号 {text} 重复",
                    CanAutoFix = true
                });
                continue;
            }

            if (previous is null)
            {
                if (number[0] != 1 || number[^1] != 1)
                    issues.Add(new PlanAuditIssue
                    {
                        Severity = "错误", Sheet = sheet, Location = location,
                        Message = $"本组首个序号应从1开始，当前为 {text}",
                        CanAutoFix = true
                    });
            }
            else if (number.Length == 1 && number[0] == 1)
            {
                seen.Clear();
                seen.Add(text);
            }
            else if (!IsNextSequence(previous, number))
                issues.Add(new PlanAuditIssue
                {
                    Severity = "错误", Sheet = sheet, Location = location,
                    Message = $"序号从 {string.Join('.', previous)} 跳到 {text}",
                    CanAutoFix = true
                });
            previous = number;
        }
    }

    private static void AuditProjectSequence(
        dynamic worksheet, string sheet, object[,] values, int firstRow, int firstColumn,
        List<PlanAuditIssue> issues)
    {
        var sequenceColumn = FindHeaderColumn(values, "序号");
        if (sequenceColumn is null)
        {
            issues.Add(new PlanAuditIssue
            {
                Severity = "错误", Sheet = sheet, Location = "表头",
                Message = "未找到“序号”列"
            });
            return;
        }

        var (headerRow, column) = sequenceColumn.Value;
        var nextProject = 1;
        var currentProject = 0;
        var nextDetail = 1;
        var seenDetails = new HashSet<int>();
        for (var row = headerRow + 1; row <= values.GetLength(0); row++)
        {
            var hasContent = RowHasContent(values, row, column);
            if (!TryParseSequence(values[row, column], out var number))
            {
                if (!hasContent) continue;
                if (IsRepeatedHeaderRow(values, row) ||
                    IsSequenceMergedFromAbove(worksheet, firstRow + row - 1, firstColumn + column - 1) ||
                    IsMergedSectionRow(worksheet, values, row, firstRow, firstColumn))
                    continue;

                issues.Add(new PlanAuditIssue
                {
                    Severity = "错误", Sheet = sheet,
                    Location = CellAddress(firstRow + row - 1, firstColumn + column - 1),
                    Message = "该项目行有内容但缺少序号",
                    CanAutoFix = true
                });
                continue;
            }

            var location = CellAddress(firstRow + row - 1, firstColumn + column - 1);
            if (number.Length == 1)
            {
                var project = number[0];
                if (project != nextProject)
                {
                    issues.Add(new PlanAuditIssue
                    {
                        Severity = "错误", Sheet = sheet, Location = location,
                        Message = $"项目序号应为 {nextProject}，当前为 {project}，中间项目序号不连续",
                        CanAutoFix = true
                    });
                }
                currentProject = project;
                nextProject = project + 1;
                nextDetail = 1;
                seenDetails.Clear();
                continue;
            }

            if (currentProject == 0)
            {
                issues.Add(new PlanAuditIssue
                {
                    Severity = "错误", Sheet = sheet, Location = location,
                    Message = $"子项目序号 {string.Join('.', number)} 出现在项目序号之前",
                    CanAutoFix = true
                });
                continue;
            }

            var detail = number[1];
            if (number[0] != currentProject)
            {
                issues.Add(new PlanAuditIssue
                {
                    Severity = "错误", Sheet = sheet, Location = location,
                    Message = $"子项目序号 {string.Join('.', number)} 不属于项目 {currentProject}",
                    CanAutoFix = true
                });
                continue;
            }

            if (number.Length != 2 || detail != nextDetail || !seenDetails.Add(detail))
            {
                issues.Add(new PlanAuditIssue
                {
                    Severity = "错误", Sheet = sheet, Location = location,
                    Message = $"项目 {currentProject} 的子序号应为 {currentProject}.{nextDetail}，当前为 {string.Join('.', number)}",
                    CanAutoFix = true
                });
            }
            nextDetail = detail + 1;
        }
    }

    private static void AuditDateColumns(
        string sheet, object[,] values, int firstRow, int firstColumn,
        int rowCount, int columnCount, PlanWorkspace workspace,
        List<PlanAuditIssue> issues)
    {
        var start = new DateTime(workspace.Year, workspace.Month, 1);
        var end = start.AddMonths(1);
        var monthLabel = $"{workspace.Year}年{workspace.Month}月";
        var headerLimit = Math.Min(rowCount, 10);
        if (sheet is "项目计划（锻压）" or "项目计划（海工）")
        {
            AuditProjectCompletionDate(
                sheet, values, firstRow, firstColumn, rowCount,
                start, issues);
            return;
        }

        var auditedColumns = new HashSet<int>();
        for (var headerRow = 1; headerRow <= headerLimit; headerRow++)
        for (var col = 1; col <= columnCount; col++)
        {
            var header = Convert.ToString(values[headerRow, col], CultureInfo.CurrentCulture)?.Trim();
            if (string.IsNullOrEmpty(header) || !DateHeaderRegex().IsMatch(header) ||
                !auditedColumns.Add(col)) continue;
            for (var row = headerRow + 1; row <= rowCount; row++)
            {
                if (!TryGetDate(values[row, col], out var date)) continue;
                var location = CellAddress(firstRow + row - 1, firstColumn + col - 1);
                if (date < start)
                    issues.Add(new PlanAuditIssue { Severity = "警告", Sheet = sheet, Location = location, Message = $"{header} {date:yyyy-MM-dd} 早于{monthLabel}1日，可能是逾期或结转任务" });
                else if (date >= end)
                    issues.Add(new PlanAuditIssue { Severity = "警告", Sheet = sheet, Location = location, Message = $"{header} {date:yyyy-MM-dd} 不属于{monthLabel}" });
            }
        }
    }

    private static void AuditProjectCompletionDate(
        string sheet, object[,] values, int firstRow, int firstColumn,
        int rowCount, DateTime monthStart,
        List<PlanAuditIssue> issues)
    {
        var plannedHeader = FindProjectHeaderColumn(values, IsPlannedCompletionHeader);
        var statusHeader = FindProjectHeaderColumn(values, IsCompletionStatusHeader);
        var actualHeader = FindProjectHeaderColumn(values, IsActualCompletionHeader);
        if (plannedHeader is null || statusHeader is null || actualHeader is null ||
            plannedHeader.Value.Row != statusHeader.Value.Row ||
            statusHeader.Value.Row != actualHeader.Value.Row ||
            statusHeader.Value.Column != plannedHeader.Value.Column + 1 ||
            actualHeader.Value.Column != statusHeader.Value.Column + 1)
        {
            issues.Add(new PlanAuditIssue
            {
                Severity = "错误",
                Sheet = sheet,
                Location = "表头",
                Message = "项目计划必须按顺序包含“计划完成时间”“是否完成”“实际（预计）完成时间”三列"
            });
            return;
        }

        var plannedColumn = plannedHeader.Value.Column;
        var statusColumn = statusHeader.Value.Column;
        var actualColumn = actualHeader.Value.Column;
        var headerRow = plannedHeader.Value.Row;
        for (var row = headerRow + 1; row <= rowCount; row++)
        {
            if (!TryGetDate(values[row, plannedColumn], out var plannedDate) ||
                plannedDate >= monthStart)
                continue;

            var statusLocation = CellAddress(firstRow + row - 1, firstColumn + statusColumn - 1);
            var status = NormalizeCellText(values[row, statusColumn]);
            if (status == "是")
                continue;

            if (status != "否")
            {
                issues.Add(new PlanAuditIssue
                {
                    Severity = "错误",
                    Sheet = sheet,
                    Location = statusLocation,
                    Message = $"计划完成时间 {plannedDate:yyyy-MM-dd} 早于{monthStart:yyyy年M月d日}，但“是否完成”为空或不是“是/否”"
                });
                continue;
            }

            if (!TryGetDate(values[row, actualColumn], out var actualDate) ||
                actualDate >= monthStart)
                continue;

            issues.Add(new PlanAuditIssue
            {
                Severity = "警告",
                Sheet = sheet,
                Location = CellAddress(firstRow + row - 1, firstColumn + actualColumn - 1),
                Message = $"已标记“否”，但实际（预计）完成时间 {actualDate:yyyy-MM-dd} 早于{monthStart:yyyy年M月d日}，任务仍可能逾期"
            });
        }
    }

    private static void AuditFormulaErrors(
        string sheet, object[,] values, int firstRow, int firstColumn,
        List<PlanAuditIssue> issues)
    {
        for (var row = 1; row <= values.GetLength(0); row++)
        for (var col = 1; col <= values.GetLength(1); col++)
        {
            var text = Convert.ToString(values[row, col], CultureInfo.InvariantCulture);
            if (text is null || !ExcelErrorRegex().IsMatch(text)) continue;
            issues.Add(new PlanAuditIssue
            {
                Severity = "错误", Sheet = sheet,
                Location = CellAddress(firstRow + row - 1, firstColumn + col - 1),
                Message = $"Excel错误值 {text}"
            });
        }
    }

    private static void AuditFormat(
        dynamic sheet, dynamic usedRange, object[,] values,
        int firstRow, int firstColumn, List<PlanAuditIssue> issues)
    {
        var sheetName = (string)sheet.Name;
        var standardHeight = GetStandardRowHeight(sheetName);
        var header = FindHeaderColumn(values, "序号");
        if (header is not null)
        {
            for (var row = header.Value.Row + 1; row <= values.GetLength(0); row++)
            {
                if (!RowHasMeaningfulContent(values, row, header.Value.Column)) continue;
                dynamic? rowRange = null;
                try
                {
                    rowRange = sheet.Rows.Item[firstRow + row - 1];
                    var actualHeight = Convert.ToDouble(rowRange.RowHeight, CultureInfo.InvariantCulture);
                    if (actualHeight + RowHeightTolerance < standardHeight)
                    {
                        issues.Add(new PlanAuditIssue
                        {
                            Severity = "错误",
                            Sheet = sheetName,
                            Location = $"第{firstRow + row - 1}行",
                            Message = $"内容行行高 {actualHeight:0.##} 小于标准 {standardHeight:0.##}",
                            CanAutoFix = true
                        });
                    }
                }
                finally
                {
                    ReleaseCom(rowRange);
                }
            }
        }

        AuditPageSetup(sheet, sheetName, issues);
        AuditPrintArea(sheet, values, firstRow, firstColumn, issues);
        AuditBorders(sheet, values, firstRow, issues);
    }

    private static void AuditPageSetup(
        dynamic sheet, string sheetName, List<PlanAuditIssue> issues)
    {
        dynamic? pageSetup = null;
        try
        {
            pageSetup = sheet.PageSetup;
            var valid = Convert.ToInt32(pageSetup.PaperSize, CultureInfo.InvariantCulture) == XlPaperA4 &&
                        Convert.ToInt32(pageSetup.Orientation, CultureInfo.InvariantCulture) == XlLandscape &&
                        IsFitToPageValue(pageSetup.Zoom) &&
                        Convert.ToInt32(pageSetup.FitToPagesWide, CultureInfo.InvariantCulture) == 1 &&
                        IsFitToPageValue(pageSetup.FitToPagesTall);
            if (!valid)
            {
                issues.Add(new PlanAuditIssue
                {
                    Severity = "错误",
                    Sheet = sheetName,
                    Location = "打印设置",
                    Message = "纸张、方向、缩放或分页宽度不符合默认打印规则",
                    CanAutoFix = true
                });
            }
        }
        catch
        {
            issues.Add(new PlanAuditIssue
            {
                Severity = "错误",
                Sheet = sheetName,
                Location = "打印设置",
                Message = "无法读取打印设置",
                CanAutoFix = true
            });
        }
        finally
        {
            ReleaseCom(pageSetup);
        }
    }

    private static void AuditPrintArea(
        dynamic sheet, object[,] values,
        int firstRow, int firstColumn, List<PlanAuditIssue> issues)
    {
        var sheetName = (string)sheet.Name;
        var lastColumn = FindPrintColumn(sheetName, values);
        if (lastColumn is null) return;

        dynamic? pageSetup = null;
        try
        {
            pageSetup = sheet.PageSetup;
            string? printArea = Convert.ToString((object?)pageSetup.PrintArea, CultureInfo.CurrentCulture);
            var lastContentRow = firstRow + FindLastContentRow(values) - 1;
            var expectedLastColumn = firstColumn + lastColumn.Value - 1;
            if (!TryParseRangeBounds(printArea, out var actualFirstRow, out var actualFirstColumn,
                    out var actualLastRow, out var actualLastColumn))
            {
                AddPrintAreaIssue(sheetName, issues, "未设置有效打印区域");
                return;
            }

            var isProject = IsProjectSheet(sheetName);
            var valid = actualFirstRow == firstRow &&
                        actualFirstColumn == firstColumn &&
                        actualLastColumn == expectedLastColumn &&
                        (isProject ? actualLastRow == lastContentRow : actualLastRow >= lastContentRow);
            if (!valid)
            {
                AddPrintAreaIssue(
                    sheetName,
                    issues,
                    isProject ? "项目计划打印区域必须到实际内容" : "打印区域未覆盖有效内容或业务末列");
            }
        }
        catch
        {
            AddPrintAreaIssue(sheetName, issues, "无法读取打印区域");
        }
        finally
        {
            ReleaseCom(pageSetup);
        }
    }

    private static void AuditBorders(
        dynamic sheet, object[,] values, int firstRow, List<PlanAuditIssue> issues)
    {
        var sheetName = (string)sheet.Name;
        var lastColumn = FindPrintColumn(sheetName, values);
        if (lastColumn is null) return;
        var tableFirstRow = GetTableFirstRow(firstRow, values);

        dynamic? pageSetup = null;
        dynamic? range = null;
        dynamic? borders = null;
        dynamic? startCell = null;
        dynamic? endCell = null;
        try
        {
            pageSetup = sheet.PageSetup;
            string? printArea = Convert.ToString((object?)pageSetup.PrintArea, CultureInfo.CurrentCulture);
            if (!TryParseRangeBounds(printArea, out var firstPrintRow, out var firstPrintColumn,
                    out var lastPrintRow, out var lastPrintColumn)) return;

            var firstBorderRow = Math.Max(firstPrintRow, tableFirstRow);
            if (firstBorderRow > lastPrintRow) return;

            startCell = sheet.Cells.Item[firstBorderRow, firstPrintColumn];
            endCell = sheet.Cells.Item[lastPrintRow, lastPrintColumn];
            range = sheet.Range[startCell, endCell];
            borders = range.Borders;
            var valid = Convert.ToInt32(borders.LineStyle, CultureInfo.InvariantCulture) == XlContinuous &&
                        Convert.ToInt32(borders.Color, CultureInfo.InvariantCulture) == XlBlack &&
                        Convert.ToInt32(borders.Weight, CultureInfo.InvariantCulture) == XlThin;
            if (!valid)
            {
                issues.Add(new PlanAuditIssue
                {
                    Severity = "错误",
                    Sheet = sheetName,
                    Location = "打印区域边框",
                    Message = "边框不是默认黑色细实线",
                    CanAutoFix = true
                });
            }
        }
        catch
        {
            issues.Add(new PlanAuditIssue
            {
                Severity = "错误",
                Sheet = sheetName,
                Location = "打印区域边框",
                Message = "无法读取打印区域边框",
                CanAutoFix = true
            });
        }
        finally
        {
            ReleaseCom(borders);
            ReleaseCom(range);
            ReleaseCom(endCell);
            ReleaseCom(startCell);
            ReleaseCom(pageSetup);
        }
    }

    private static void AddPrintAreaIssue(
        string sheet, List<PlanAuditIssue> issues, string message) =>
        issues.Add(new PlanAuditIssue
        {
            Severity = "错误",
            Sheet = sheet,
            Location = "打印区域",
            Message = message,
            CanAutoFix = true
        });

    private static bool IsFitToPageValue(object? value)
    {
        if (value is null) return true;
        if (value is bool boolean) return !boolean;
        return Convert.ToDouble(value, CultureInfo.InvariantCulture) == 0;
    }

    private static PlanExportResult ExportCandidates(
        PlanWorkspace workspace, IProgress<PlanExportProgress>? progress)
    {
        var outputFolder = Path.Combine(
            workspace.RootPath, "生产助手预览", DateTime.Now.ToString("yyyyMMdd-HHmmss", CultureInfo.InvariantCulture));
        Directory.CreateDirectory(outputFolder);
        dynamic? excel = null;
        dynamic? workbook = null;
        dynamic? worksheets = null;
        var files = new List<string>();
        try
        {
            excel = CreateExcel();
            workbook = excel.Workbooks.Open(workspace.WorkbookPath, ReadOnly: true);
            worksheets = workbook.Worksheets;
            for (var index = 0; index < Exports.Length; index++)
            {
                var item = Exports[index];
                progress?.Report(new PlanExportProgress(index + 1, Exports.Length, item.FileTitle));
                var filename = $"{index + 1}.太重滨海{workspace.Year}年{workspace.Month}月{item.FileTitle}.pdf";
                var output = Path.Combine(outputFolder, filename);
                ExportSheets(workbook, item.Sheets, output);
                if (!File.Exists(output) || new FileInfo(output).Length == 0)
                    throw new IOException($"{filename} 导出失败或文件为空。");
                files.Add(output);
            }
            return new PlanExportResult(outputFolder, files);
        }
        catch
        {
            foreach (var file in files)
                try { File.Delete(file); } catch { }
            throw;
        }
        finally
        {
            try { workbook?.Close(false); } catch { }
            try { excel?.Quit(); } catch { }
            ReleaseCom(worksheets);
            ReleaseCom(workbook);
            ReleaseCom(excel);
        }
    }

    private static string CreateWorkbookBackup(PlanWorkspace workspace)
    {
        var backupFolder = Path.Combine(
            workspace.RootPath, "生产助手备份",
            DateTime.Now.ToString("yyyyMMdd-HHmmss-fff", CultureInfo.InvariantCulture));
        Directory.CreateDirectory(backupFolder);
        var backupPath = Path.Combine(backupFolder, Path.GetFileName(workspace.WorkbookPath));
        File.Copy(workspace.WorkbookPath, backupPath);
        return backupPath;
    }

    private static int RepairSheetFormat(dynamic sheet)
    {
        dynamic? pageSetup = null;
        dynamic? usedRange = null;
        try
        {
            usedRange = sheet.UsedRange;
            object? raw = usedRange.Value2;
            if (raw is not object[,] values)
                throw new InvalidOperationException($"{sheet.Name} 没有可用内容，无法修复格式。");

            var sheetName = (string)sheet.Name;
            var lastColumn = FindPrintColumn(sheetName, values)
                             ?? throw new InvalidOperationException($"{sheetName} 未找到有效打印列。");
            var changedRows = RepairContentRowHeights(sheet, usedRange, values);

            ResetPageBreaks(sheet);
            pageSetup = sheet.PageSetup;
            pageSetup.PaperSize = XlPaperA4;
            pageSetup.Orientation = XlLandscape;
            pageSetup.Zoom = false;
            pageSetup.FitToPagesWide = 1;
            pageSetup.FitToPagesTall = false;

            var rowCount = GetPrintRowCount(sheet, usedRange, values, lastColumn);
            var printArea = GetPrintAreaAddress(sheet, usedRange, rowCount, lastColumn);
            pageSetup.PrintArea = printArea;
            ApplyTableBorders(sheet, usedRange, values, rowCount, lastColumn);
            return changedRows;
        }
        finally
        {
            ReleaseCom(usedRange);
            ReleaseCom(pageSetup);
        }
    }

    private static int RepairContentRowHeights(
        dynamic sheet, dynamic usedRange, object[,] values)
    {
        var sheetName = (string)sheet.Name;
        var header = FindHeaderColumn(values, "序号");
        if (header is null) return 0;

        var standardHeight = GetStandardRowHeight(sheetName);
        var firstRow = (int)usedRange.Row;
        var changedRows = 0;
        for (var row = header.Value.Row + 1; row <= values.GetLength(0); row++)
        {
            if (!RowHasMeaningfulContent(values, row, header.Value.Column)) continue;
            dynamic? rowRange = null;
            try
            {
                rowRange = sheet.Rows.Item[firstRow + row - 1];
                var currentHeight = Convert.ToDouble(rowRange.RowHeight, CultureInfo.InvariantCulture);
                if (currentHeight + RowHeightTolerance < standardHeight)
                {
                    rowRange.RowHeight = standardHeight;
                    changedRows++;
                }
            }
            finally
            {
                ReleaseCom(rowRange);
            }
        }

        return changedRows;
    }

    private static int? FindPrintColumn(string sheetName, object[,] values)
    {
        return PrintThroughRemarksSheets.Contains(sheetName)
            ? FindHeaderColumn(values, "备注")?.Column
            : sheetName == "产品发运"
                ? FindHeaderColumn(values, "板块")?.Column
                : FindLastContentColumn(values);
    }

    private static double GetStandardRowHeight(string sheetName) =>
        IsProjectSheet(sheetName) ? ProjectRowHeight : OtherRowHeight;

    private static bool IsProjectSheet(string sheetName) =>
        sheetName is "项目计划（锻压）" or "项目计划（海工）";

    private static void ResetPageBreaks(dynamic sheet)
    {
        try { sheet.ResetAllPageBreaks(); }
        catch (Exception ex)
        {
            throw new IOException($"{sheet.Name} 无法清除手动分页。", ex);
        }
    }

    private static string GetPrintAreaAddress(
        dynamic sheet, dynamic usedRange, int rowCount, int lastColumn)
    {
        var firstRow = (int)usedRange.Row;
        var firstColumn = (int)usedRange.Column;
        return GetRangeAddress(
            sheet,
            firstRow,
            firstColumn,
            firstRow + rowCount - 1,
            firstColumn + lastColumn - 1);
    }

    private static int? FindLastContentColumn(object[,] values)
    {
        for (var column = values.GetLength(1); column >= 1; column--)
        for (var row = 1; row <= values.GetLength(0); row++)
        {
            if (!string.IsNullOrWhiteSpace(
                    Convert.ToString(values[row, column], CultureInfo.CurrentCulture)))
                return column;
        }

        return null;
    }

    private static int GetPrintRowCount(
        dynamic sheet, dynamic usedRange, object[,] values, int lastColumn)
    {
        var sheetName = (string)sheet.Name;
        var firstRow = (int)usedRange.Row;
        var firstColumn = (int)usedRange.Column;
        var existingEndRow = firstRow + values.GetLength(0) - 1;
        var lastContentRow = FindLastContentRow(values);
        var lastContentAbsoluteRow = firstRow + lastContentRow - 1;

        if (IsProjectSheet(sheetName)) return lastContentRow;

        var candidateEndRow = Math.Min(
            1_048_576,
            Math.Max(existingEndRow, lastContentAbsoluteRow + 100));
        var originalHeights = ApplyPaddingRowHeights(
            sheet,
            lastContentAbsoluteRow + 1,
            candidateEndRow,
            GetStandardRowHeight(sheetName));
        var result = lastContentRow;
        dynamic? pageSetup = null;
        try
        {
            pageSetup = sheet.PageSetup;
            pageSetup.PrintArea = GetRangeAddress(
                sheet, firstRow, firstColumn, candidateEndRow,
                firstColumn + lastColumn - 1);
            TryActivateSheet(sheet);

            int? nextBreakRow = FindNextHorizontalPageBreak(sheet, lastContentAbsoluteRow);
            if (nextBreakRow is > 0)
            {
                var endRow = nextBreakRow.Value - 1;
                result = Math.Max(lastContentRow, endRow - firstRow + 1);
            }
            else
            {
                result = lastContentRow;
            }

            return result;
        }
        finally
        {
            RestorePaddingRowHeights(sheet, originalHeights, firstRow + result - 1);
            ReleaseCom(pageSetup);
        }
    }

    private static int FindLastContentRow(object[,] values)
    {
        var sequenceColumn = FindHeaderColumn(values, "序号")?.Column;
        for (var row = values.GetLength(0); row >= 1; row--)
        {
            if (RowHasMeaningfulContent(values, row, sequenceColumn))
                return row;
        }

        return 1;
    }

    private static bool RowHasMeaningfulContent(
        object[,] values, int row, int? sequenceColumn)
    {
        for (var column = 1; column <= values.GetLength(1); column++)
        {
            // A sequence number without any other cell content is a leftover
            // template row, not a real record to print.
            if (sequenceColumn == column) continue;
            if (!string.IsNullOrWhiteSpace(
                    Convert.ToString(values[row, column], CultureInfo.CurrentCulture)))
                return true;
        }

        return false;
    }

    private static int GetTableFirstRow(int firstRow, object[,] values) =>
        firstRow + (FindHeaderColumn(values, "序号")?.Row ?? 2) - 1;

    private static Dictionary<int, double> ApplyPaddingRowHeights(
        dynamic sheet, int firstPaddingRow, int lastPaddingRow, double rowHeight)
    {
        var originalHeights = new Dictionary<int, double>();
        if (firstPaddingRow > lastPaddingRow) return originalHeights;

        dynamic? firstRow = null;
        dynamic? lastRow = null;
        dynamic? range = null;
        try
        {
            for (var row = firstPaddingRow; row <= lastPaddingRow; row++)
            {
                dynamic? rowRange = null;
                try
                {
                    rowRange = sheet.Rows.Item[row];
                    originalHeights[row] = Convert.ToDouble(rowRange.RowHeight, CultureInfo.InvariantCulture);
                }
                finally
                {
                    ReleaseCom(rowRange);
                }
            }

            firstRow = sheet.Rows.Item[firstPaddingRow];
            lastRow = sheet.Rows.Item[lastPaddingRow];
            range = sheet.Range[firstRow, lastRow];
            range.RowHeight = rowHeight;
            return originalHeights;
        }
        finally
        {
            ReleaseCom(range);
            ReleaseCom(lastRow);
            ReleaseCom(firstRow);
        }
    }

    private static void RestorePaddingRowHeights(
        dynamic sheet, IReadOnlyDictionary<int, double> originalHeights, int finalRow)
    {
        foreach (var (row, height) in originalHeights)
        {
            if (row <= finalRow) continue;
            dynamic? rowRange = null;
            try
            {
                rowRange = sheet.Rows.Item[row];
                rowRange.RowHeight = height;
            }
            finally
            {
                ReleaseCom(rowRange);
            }
        }
    }

    private static int? FindNextHorizontalPageBreak(dynamic sheet, int afterRow)
    {
        dynamic? pageBreaks = null;
        try
        {
            pageBreaks = sheet.HPageBreaks;
            int? next = null;
            var count = (int)pageBreaks.Count;
            for (var index = 1; index <= count; index++)
            {
                dynamic? pageBreak = null;
                dynamic? location = null;
                try
                {
                    pageBreak = pageBreaks.Item(index);
                    location = pageBreak.Location;
                    var row = (int)location.Row;
                    if (row > afterRow && (next is null || row < next.Value))
                        next = row;
                }
                finally
                {
                    ReleaseCom(location);
                    ReleaseCom(pageBreak);
                }
            }

            return next;
        }
        catch
        {
            return null;
        }
        finally
        {
            ReleaseCom(pageBreaks);
        }
    }

    private static bool TryParseRangeBounds(
        string? address,
        out int firstRow,
        out int firstColumn,
        out int lastRow,
        out int lastColumn)
    {
        firstRow = firstColumn = lastRow = lastColumn = 0;
        var matches = Regex.Matches(
            address ?? string.Empty,
            @"\$?([A-Z]{1,3})\$?(\d+)",
            RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);
        if (matches.Count < 2) return false;

        firstColumn = ColumnNumber(matches[0].Groups[1].Value);
        firstRow = int.Parse(matches[0].Groups[2].Value, CultureInfo.InvariantCulture);
        lastColumn = ColumnNumber(matches[1].Groups[1].Value);
        lastRow = int.Parse(matches[1].Groups[2].Value, CultureInfo.InvariantCulture);
        return firstRow > 0 && firstColumn > 0 && lastRow >= firstRow && lastColumn >= firstColumn;
    }

    private static int ColumnNumber(string letters)
    {
        var number = 0;
        foreach (var letter in letters.ToUpperInvariant())
            number = number * 26 + letter - 'A' + 1;
        return number;
    }

    private static string GetRangeAddress(
        dynamic sheet, int firstRow, int firstColumn, int lastRow, int lastColumn)
    {
        dynamic? startCell = null;
        dynamic? endCell = null;
        dynamic? range = null;
        try
        {
            startCell = sheet.Cells.Item[firstRow, firstColumn];
            endCell = sheet.Cells.Item[lastRow, lastColumn];
            range = sheet.Range[startCell, endCell];
            return (string)range.Address;
        }
        finally
        {
            ReleaseCom(range);
            ReleaseCom(endCell);
            ReleaseCom(startCell);
        }
    }

    private static void ApplyTableBorders(
        dynamic sheet, dynamic usedRange, object[,] values, int rowCount, int lastColumn)
    {
        var titleRow = (int)usedRange.Row;
        var firstRow = GetTableFirstRow(titleRow, values);
        var firstColumn = (int)usedRange.Column;
        var lastRow = (int)usedRange.Row + rowCount - 1;
        var lastColumnAbsolute = firstColumn + lastColumn - 1;
        if (lastRow < firstRow) return;

        // Repair older workbooks that already received borders on the title row.
        ClearTitleRowBorders(sheet, titleRow, firstColumn, lastColumnAbsolute);

        dynamic? startCell = null;
        dynamic? endCell = null;
        dynamic? range = null;
        dynamic? borders = null;
        try
        {
            startCell = sheet.Cells.Item[firstRow, firstColumn];
            endCell = sheet.Cells.Item[lastRow, lastColumnAbsolute];
            range = sheet.Range[startCell, endCell];
            borders = range.Borders;
            borders.LineStyle = XlContinuous;
            borders.Color = XlBlack;
            borders.Weight = XlThin;
        }
        finally
        {
            ReleaseCom(borders);
            ReleaseCom(range);
            ReleaseCom(endCell);
            ReleaseCom(startCell);
        }
    }

    private static void ClearTitleRowBorders(
        dynamic sheet, int titleRow, int firstColumn, int lastColumn)
    {
        dynamic? startCell = null;
        dynamic? endCell = null;
        dynamic? range = null;
        dynamic? borders = null;
        try
        {
            startCell = sheet.Cells.Item[titleRow, firstColumn];
            endCell = sheet.Cells.Item[titleRow, lastColumn];
            range = sheet.Range[startCell, endCell];
            borders = range.Borders;
            borders.LineStyle = XlLineStyleNone;
        }
        finally
        {
            ReleaseCom(borders);
            ReleaseCom(range);
            ReleaseCom(endCell);
            ReleaseCom(startCell);
        }
    }

    private static void TryActivateSheet(dynamic sheet)
    {
        try { sheet.Select(true); } catch { }
        try { sheet.Activate(); } catch { }
    }

    private static void ExportSheets(dynamic workbook, string[] sheetNames, string output)
    {
        dynamic? activeSheet = null;
        dynamic? worksheets = null;
        try
        {
            worksheets = workbook.Worksheets;
            for (var index = 0; index < sheetNames.Length; index++)
            {
                dynamic sheet = worksheets.Item[sheetNames[index]];
                try { sheet.Select(index == 0); }
                finally { ReleaseCom(sheet); }
            }
            activeSheet = workbook.Application.ActiveSheet;
            activeSheet.ExportAsFixedFormat(
                XlTypePdf, output, XlQualityStandard, true, false);
        }
        finally
        {
            ReleaseCom(activeSheet);
            ReleaseCom(worksheets);
        }
    }

    private static dynamic CreateExcel()
    {
        var type = Type.GetTypeFromProgID("Excel.Application")
                   ?? throw new InvalidOperationException("本机未安装 Microsoft Excel。");
        dynamic excel = Activator.CreateInstance(type)
                        ?? throw new InvalidOperationException("无法启动 Microsoft Excel。");
        excel.Visible = false;
        excel.DisplayAlerts = false;
        excel.ScreenUpdating = false;
        return excel;
    }

    private static Task<T> RunExcelAsync<T>(Func<T> work)
    {
        var completion = new TaskCompletionSource<T>(TaskCreationOptions.RunContinuationsAsynchronously);
        var thread = new Thread(() =>
        {
            try { completion.SetResult(work()); }
            catch (Exception ex) { completion.SetException(ex); }
            finally { CollectComGarbage(); }
        });
        thread.SetApartmentState(ApartmentState.STA);
        thread.IsBackground = true;
        thread.Start();
        return completion.Task;
    }

    private static void CollectComGarbage()
    {
        // Excel automation can keep a hidden server alive until its RCW
        // finalizers run, even after every known COM reference is released.
        GC.Collect();
        GC.WaitForPendingFinalizers();
        GC.Collect();
        GC.WaitForPendingFinalizers();
    }

    private static (int Row, int Column)? FindHeaderColumn(object[,] values, string header)
    {
        for (var row = 1; row <= Math.Min(10, values.GetLength(0)); row++)
        for (var col = 1; col <= values.GetLength(1); col++)
            if (Convert.ToString(values[row, col], CultureInfo.CurrentCulture)?.Trim() == header)
                return (row, col);
        return null;
    }

    private static (int Row, int Column)? FindProjectHeaderColumn(
        object[,] values, Func<string, bool> match)
    {
        for (var row = 1; row <= Math.Min(10, values.GetLength(0)); row++)
        for (var col = 1; col <= values.GetLength(1); col++)
        {
            var header = Convert.ToString(values[row, col], CultureInfo.CurrentCulture);
            if (header is not null && match(NormalizeHeader(header)))
                return (row, col);
        }
        return null;
    }

    private static string NormalizeHeader(string value) =>
        value.Trim()
            .Replace(" ", string.Empty)
            .Replace("\r", string.Empty)
            .Replace("\n", string.Empty)
            .Replace('（', '(')
            .Replace('）', ')');

    private static string NormalizeCellText(object? value) =>
        Convert.ToString(value, CultureInfo.CurrentCulture)?
            .Trim()
            .Replace(" ", string.Empty)
            .Replace("\r", string.Empty)
            .Replace("\n", string.Empty) ?? string.Empty;

    private static bool IsPlannedCompletionHeader(string header) =>
        header.Contains("计划", StringComparison.Ordinal) &&
        header.Contains("完成", StringComparison.Ordinal) &&
        (header.Contains("时间", StringComparison.Ordinal) ||
         header.Contains("日期", StringComparison.Ordinal));

    private static bool IsCompletionStatusHeader(string header) =>
        (header.Contains("是否", StringComparison.Ordinal) &&
         header.Contains("完成", StringComparison.Ordinal)) ||
        header is "完成情况" or "完成状态";

    private static bool IsActualCompletionHeader(string header) =>
        header.Contains("完成", StringComparison.Ordinal) &&
        (header.Contains("实际", StringComparison.Ordinal) ||
         header.Contains("预计", StringComparison.Ordinal)) &&
        (header.Contains("时间", StringComparison.Ordinal) ||
         header.Contains("日期", StringComparison.Ordinal));

    private static bool TryParseSequence(object? value, out int[] number)
    {
        number = [];
        var text = value switch
        {
            double numeric => numeric.ToString("0.################", CultureInfo.InvariantCulture),
            _ => Convert.ToString(value, CultureInfo.InvariantCulture)?.Trim()
        };
        if (string.IsNullOrWhiteSpace(text)) return false;
        text = text.Replace('。', '.').Replace('．', '.');
        if (!SequenceRegex().IsMatch(text)) return false;
        number = text.Split('.').Select(part => int.Parse(part, CultureInfo.InvariantCulture)).ToArray();
        return number.All(part => part > 0);
    }

    private static bool IsNextSequence(int[] previous, int[] current)
    {
        if (previous.Length != current.Length) return false;
        var last = previous.Length - 1;
        if (previous[..last].SequenceEqual(current[..last]))
            return current[last] == previous[last] + 1;
        if (current[last] != 1 || last == 0) return false;
        var prefixLast = last - 1;
        return previous[..prefixLast].SequenceEqual(current[..prefixLast]) &&
               current[prefixLast] == previous[prefixLast] + 1;
    }

    private static bool RowHasContent(object[,] values, int row, int sequenceColumn)
    {
        for (var col = 1; col <= values.GetLength(1); col++)
        {
            if (col == sequenceColumn) continue;
            if (!string.IsNullOrWhiteSpace(
                    Convert.ToString(values[row, col], CultureInfo.CurrentCulture)))
                return true;
        }
        return false;
    }

    private static bool IsRepeatedHeaderRow(object[,] values, int row)
    {
        for (var col = 1; col <= values.GetLength(1); col++)
            if (Convert.ToString(values[row, col], CultureInfo.CurrentCulture)?.Trim() == "序号")
                return true;
        return false;
    }

    private static bool IsSequenceMergedFromAbove(dynamic sheet, int row, int column)
    {
        dynamic? cell = null;
        dynamic? mergeArea = null;
        try
        {
            cell = sheet.Cells.Item[row, column];
            if (!Convert.ToBoolean(cell.MergeCells, CultureInfo.InvariantCulture)) return false;
            mergeArea = cell.MergeArea;
            return (int)mergeArea.Row < row;
        }
        finally
        {
            ReleaseCom(mergeArea);
            ReleaseCom(cell);
        }
    }

    private static bool IsMergedSectionRow(
        dynamic sheet, object[,] values, int row, int firstRow, int firstColumn)
    {
        for (var col = 1; col <= values.GetLength(1); col++)
        {
            if (string.IsNullOrWhiteSpace(
                    Convert.ToString(values[row, col], CultureInfo.CurrentCulture))) continue;
            dynamic? cell = null;
            dynamic? mergeArea = null;
            try
            {
                cell = sheet.Cells.Item[firstRow + row - 1, firstColumn + col - 1];
                if (!Convert.ToBoolean(cell.MergeCells, CultureInfo.InvariantCulture)) continue;
                mergeArea = cell.MergeArea;
                if ((int)mergeArea.Columns.Count > 1) return true;
            }
            finally
            {
                ReleaseCom(mergeArea);
                ReleaseCom(cell);
            }
        }
        return false;
    }

    private static bool TryGetDate(object? value, out DateTime date)
    {
        date = default;
        if (value is double serial && serial is > 1 and < 2958466)
        {
            try { date = DateTime.FromOADate(serial).Date; return true; } catch { return false; }
        }
        return DateTime.TryParse(Convert.ToString(value, CultureInfo.CurrentCulture), out date);
    }

    private static string CellAddress(int row, int column)
    {
        var letters = string.Empty;
        while (column > 0)
        {
            column--;
            letters = (char)('A' + column % 26) + letters;
            column /= 26;
        }
        return $"{letters}{row}";
    }

    private static void ReleaseCom(object? value)
    {
        if (value is not null && Marshal.IsComObject(value))
            Marshal.FinalReleaseComObject(value);
    }

    [GeneratedRegex(@"(?<year>\d{4})年(?<month>\d{1,2})月", RegexOptions.CultureInvariant)]
    private static partial Regex MonthFolderRegex();

    [GeneratedRegex(@"(?<year>\d{4})年", RegexOptions.CultureInvariant)]
    private static partial Regex YearFolderRegex();

    [GeneratedRegex(@"(?<month>\d{1,2})月", RegexOptions.CultureInvariant)]
    private static partial Regex MonthOnlyFolderRegex();

    [GeneratedRegex(@"\d{4}年\d{1,2}月", RegexOptions.CultureInvariant)]
    private static partial Regex MonthTextRegex();

    [GeneratedRegex("计划.*(日期|时间|期限|交货|完成|发运)|预计.*(日期|时间|期限|交货|完成|发运)|完成时间|发运时间", RegexOptions.CultureInvariant)]
    private static partial Regex DateHeaderRegex();

    [GeneratedRegex(@"^#(REF!|VALUE!|DIV/0!|NAME\?|N/A|NUM!|NULL!)$", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant)]
    private static partial Regex ExcelErrorRegex();

    [GeneratedRegex(@"^\d+(?:\.\d+)*$", RegexOptions.CultureInvariant)]
    private static partial Regex SequenceRegex();
}
