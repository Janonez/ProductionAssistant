using System.Globalization;
using System.Runtime.InteropServices;

namespace ProductionAssistant.Services;

public sealed record ProductionMeetingExportResult(
    string OutputPath,
    DateTime MeetingDate,
    IReadOnlyList<string> SheetNames);

public sealed class ProductionMeetingExportService
{
    private const int XlOpenXmlWorkbook = 51;
    private const int XlPatternNone = -4142;
    private const int XlColorIndexNone = -4142;
    private const int XlSolid = 1;
    private const int XlWhite = 16777215;
    private const int XlWhiteColorIndex = 2;
    private const int XlFormulas = -4123;
    private const int XlPart = 2;
    private const int XlByRows = 1;
    private const int XlByColumns = 2;
    private const int XlPrevious = 2;

    private static readonly string[] Titles =
    [
        "一、已发运项目",
        "二、在制项目",
        "三、预投项目"
    ];

    private static readonly string[] SheetNames =
    [
        "已发运项目",
        "在制项目",
        "预投项目"
    ];

    private static readonly HashSet<string> FormulaErrors =
    [
        "#REF!",
        "#VALUE!",
        "#DIV/0!",
        "#NAME?",
        "#N/A",
        "#NUM!",
        "#NULL!"
    ];

    public Task<ProductionMeetingExportResult> ExportAsync(string workbookPath) =>
        RunExcelAsync(() => Export(workbookPath));

    private static ProductionMeetingExportResult Export(string workbookPath)
    {
        if (!File.Exists(workbookPath))
            throw new FileNotFoundException("找不到所选 Excel 文件。", workbookPath);

        var extension = Path.GetExtension(workbookPath);
        if (!new[] { ".xlsx", ".xlsm", ".xls" }
                .Contains(extension, StringComparer.OrdinalIgnoreCase))
            throw new InvalidOperationException("请选择 .xlsx、.xlsm 或 .xls Excel 文件。");

        dynamic? excel = null;
        dynamic? sourceWorkbook = null;
        dynamic? sourceSheets = null;
        dynamic? sourceSheet = null;
        dynamic? outputWorkbook = null;
        dynamic? outputSheets = null;
        var outputPath = string.Empty;
        var exportSucceeded = false;
        try
        {
            excel = CreateExcel();
            sourceWorkbook = excel.Workbooks.Open(workbookPath, ReadOnly: true);
            sourceSheets = sourceWorkbook.Worksheets;
            if ((int)sourceSheets.Count != 1)
                throw new InvalidOperationException(
                    $"源文件必须只有一个 Sheet，当前有 {(int)sourceSheets.Count} 个。");

            sourceSheet = sourceSheets.Item[1];
            var layout = ReadLayout(sourceSheet);
            outputPath = GetAvailableOutputPath(workbookPath, layout.MeetingDate);

            // Copying the complete source sheet is the shortest reliable way to retain
            // formulas, merged cells, hidden rows/columns, print settings and objects.
            sourceSheet.Copy();
            outputWorkbook = excel.ActiveWorkbook;
            outputSheets = outputWorkbook.Worksheets;
            DuplicateSheet(outputSheets, 1);
            DuplicateSheet(outputSheets, 2);

            for (var index = 0; index < SheetNames.Length; index++)
            {
                dynamic? targetSheet = null;
                try
                {
                    targetSheet = outputSheets.Item[index + 1];
                    targetSheet.Name = SheetNames[index];
                    var keptLastRow = TrimToSection(targetSheet, layout, index);
                    ClearStatusFills(targetSheet, layout, keptLastRow);
                }
                finally
                {
                    ReleaseCom(targetSheet);
                }
            }

            dynamic? firstOutputSheet = null;
            try
            {
                firstOutputSheet = outputSheets.Item[1];
                firstOutputSheet.Activate();
                firstOutputSheet.Select();
            }
            finally
            {
                ReleaseCom(firstOutputSheet);
            }

            try { outputWorkbook.Application.CalculateFullRebuild(); }
            catch { try { outputWorkbook.Application.Calculate(); } catch { } }

            for (var index = 0; index < SheetNames.Length; index++)
            {
                dynamic? targetSheet = null;
                try
                {
                    targetSheet = outputSheets.Item[index + 1];
                    EnsureNoFormulaErrors(targetSheet);
                }
                finally
                {
                    ReleaseCom(targetSheet);
                }
            }

            // Accepted .xls/.xlsm inputs are intentionally emitted as .xlsx; VBA is not preserved.
            outputWorkbook.SaveAs(outputPath, XlOpenXmlWorkbook);
            if (!File.Exists(outputPath) || new FileInfo(outputPath).Length == 0)
                throw new IOException("生产会资料导出失败或输出文件为空。");

            exportSucceeded = true;
            return new ProductionMeetingExportResult(
                outputPath,
                layout.MeetingDate,
                SheetNames.ToArray());
        }
        finally
        {
            try { outputWorkbook?.Close(false); } catch { }
            try { sourceWorkbook?.Close(false); } catch { }
            try { excel?.Quit(); } catch { }
            ReleaseCom(outputSheets);
            ReleaseCom(outputWorkbook);
            ReleaseCom(sourceSheet);
            ReleaseCom(sourceSheets);
            ReleaseCom(sourceWorkbook);
            ReleaseCom(excel);
            if (!exportSucceeded && !string.IsNullOrWhiteSpace(outputPath) && File.Exists(outputPath))
            {
                try { File.Delete(outputPath); } catch { }
            }
        }
    }

    private static Layout ReadLayout(dynamic sheet)
    {
        dynamic? lastRowCell = null;
        dynamic? lastColumnCell = null;
        dynamic? anchor = null;
        dynamic? contentRange = null;
        dynamic? lastCell = null;
        try
        {
            (lastRowCell, lastColumnCell) = FindLastContentCells((object)sheet);
            if (lastRowCell is null || lastColumnCell is null)
                throw new InvalidOperationException("源 Sheet 没有可用内容，无法导出。");

            var lastRow = (int)lastRowCell.Row;
            var lastColumn = (int)lastColumnCell.Column;
            if (lastRow < 2)
                throw new InvalidOperationException("源 Sheet 第 2 行不存在，无法读取开会日期。");

            anchor = sheet.Cells.Item[1, 1];
            lastCell = sheet.Cells.Item[lastRow, lastColumn];
            contentRange = sheet.Range[anchor, lastCell];
            object[,] values = ToMatrix((object?)contentRange.Value2);
            if (!TryGetDate(values[2, lastColumn], out DateTime meetingDate))
                throw new InvalidOperationException(
                    $"源 Sheet 第 2 行、最后一列不是有效的开会日期：{CellAddress(2, lastColumn)}。");

            var sectionRows = Titles
                .Select(title => FindUniqueRow(values, 1, title))
                .ToArray();
            if (sectionRows.Any(row => row is null))
                throw new InvalidOperationException("源 Sheet 缺少一个或多个标准分段标题：一、已发运项目、二、在制项目、三、预投项目。");

            var starts = sectionRows.Select(row => row!.Value).ToArray();
            if (!starts.SequenceEqual(starts.OrderBy(row => row)) || starts.Distinct().Count() != starts.Length)
                throw new InvalidOperationException("三个分段标题的顺序或位置不正确，每个标题必须且只能出现一次。");

            var lastContentRow = FindLastContentRow(values);
            if (lastContentRow < starts[^1])
                throw new InvalidOperationException("第三个分段标题后没有可导出的内容。");
            var sectionEnds = starts
                .Select((start, index) =>
                {
                    var upper = index + 1 < starts.Length
                        ? starts[index + 1] - 1
                        : lastContentRow;
                    return FindLastContentRow(values, start, upper);
                })
                .ToArray();

            return new Layout(
                1,
                1,
                lastColumn,
                lastContentRow,
                lastContentRow,
                starts,
                sectionEnds,
                meetingDate.Date);
        }
        finally
        {
            ReleaseCom(lastCell);
            ReleaseCom(contentRange);
            ReleaseCom(anchor);
            ReleaseCom(lastColumnCell);
            ReleaseCom(lastRowCell);
        }
    }

    private static (object? LastRowCell, object? LastColumnCell) FindLastContentCells(object sheetObject)
    {
        dynamic sheet = sheetObject;
        dynamic? anchor = null;
        dynamic? lastRowCell = null;
        dynamic? lastColumnCell = null;
        try
        {
            anchor = sheet.Cells.Item[1, 1];
            lastRowCell = sheet.Cells.Find(
                What: "*",
                After: anchor,
                LookIn: XlFormulas,
                LookAt: XlPart,
                SearchOrder: XlByRows,
                SearchDirection: XlPrevious,
                MatchCase: false);
            lastColumnCell = sheet.Cells.Find(
                What: "*",
                After: anchor,
                LookIn: XlFormulas,
                LookAt: XlPart,
                SearchOrder: XlByColumns,
                SearchDirection: XlPrevious,
                MatchCase: false);
            return (lastRowCell, lastColumnCell);
        }
        catch
        {
            ReleaseCom(lastColumnCell);
            ReleaseCom(lastRowCell);
            throw;
        }
        finally
        {
            ReleaseCom(anchor);
        }
    }

    private static void DuplicateSheet(dynamic worksheets, int sourceIndex)
    {
        dynamic? source = null;
        try
        {
            source = worksheets.Item[sourceIndex];
            source.Copy(After: source);
        }
        finally
        {
            ReleaseCom(source);
        }
    }

    private static int TrimToSection(dynamic sheet, Layout layout, int sectionIndex)
    {
        var start = layout.SectionStarts[sectionIndex];
        var end = layout.SectionEnds[sectionIndex];

        DeleteRows(sheet, end + 1, layout.UsedLastRow);
        var deletedMiddleRows = 0;
        if (sectionIndex > 0)
        {
            DeleteRows(sheet, layout.SectionStarts[0], start - 1);
            deletedMiddleRows = start - layout.SectionStarts[0];
        }

        return end - deletedMiddleRows;
    }

    private static void DeleteRows(dynamic sheet, int firstRow, int lastRow)
    {
        if (firstRow > lastRow) return;

        dynamic? rows = null;
        try
        {
            rows = sheet.Rows[$"{firstRow}:{lastRow}"];
            rows.Delete();
        }
        finally
        {
            ReleaseCom(rows);
        }
    }

    private static void ClearStatusFills(dynamic sheet, Layout layout, int lastRow)
    {
        dynamic? columnRange = null;
        dynamic? columnInterior = null;
        dynamic? conditions = null;
        dynamic? condition = null;
        dynamic? conditionInterior = null;
        try
        {
            for (var column = layout.FirstColumn; column <= layout.LastColumn; column++)
            {
                if (!ColumnHasRedOrGreenFill(sheet, layout.FirstRow, lastRow, column))
                    continue;

                columnRange = sheet.Columns.Item[column];
                columnInterior = columnRange.Interior;
                conditions = columnRange.FormatConditions;
                for (var index = (int)conditions.Count; index >= 1; index--)
                {
                    condition = conditions.Item[index];
                    conditionInterior = condition.Interior;
                    // The column has already been positively identified as a
                    // red/green status column. Clear only conditional-fill
                    // properties so any rule borders and other formatting stay.
                    conditionInterior.Pattern = XlPatternNone;
                    conditionInterior.ColorIndex = XlColorIndexNone;
                    ReleaseCom(conditionInterior);
                    ReleaseCom(condition);
                    conditionInterior = null;
                    condition = null;
                }
                columnInterior.Pattern = XlSolid;
                columnInterior.Color = XlWhite;
                columnInterior.ColorIndex = XlWhiteColorIndex;
                ReleaseCom(conditions);
                ReleaseCom(columnInterior);
                ReleaseCom(columnRange);
                conditions = null;
                columnInterior = null;
                columnRange = null;
            }
        }
        finally
        {
            ReleaseCom(conditionInterior);
            ReleaseCom(condition);
            ReleaseCom(conditions);
            ReleaseCom(columnInterior);
            ReleaseCom(columnRange);
        }
    }

    private static bool ColumnHasRedOrGreenFill(dynamic sheet, int firstRow, int lastRow, int column)
    {
        dynamic? columnRange = null;
        dynamic? columnInterior = null;
        dynamic? cell = null;
        dynamic? interior = null;
        dynamic? displayFormat = null;
        dynamic? displayInterior = null;
        try
        {
            columnRange = sheet.Columns.Item[column];
            columnInterior = columnRange.Interior;
            if (IsRedOrGreenFill(columnInterior))
                return true;

            for (var row = firstRow; row <= lastRow; row++)
            {
                cell = sheet.Cells.Item[row, column];
                interior = cell.Interior;
                if (IsRedOrGreenFill(interior))
                    return true;

                try
                {
                    displayFormat = cell.DisplayFormat;
                    displayInterior = displayFormat.Interior;
                    if (IsRedOrGreenFill(displayInterior))
                        return true;
                }
                catch { }
                finally
                {
                    ReleaseCom(displayInterior);
                    ReleaseCom(displayFormat);
                    ReleaseCom(interior);
                    ReleaseCom(cell);
                    displayInterior = null;
                    displayFormat = null;
                    interior = null;
                    cell = null;
                }
            }

            return false;
        }
        finally
        {
            ReleaseCom(displayInterior);
            ReleaseCom(displayFormat);
            ReleaseCom(interior);
            ReleaseCom(cell);
            ReleaseCom(columnInterior);
            ReleaseCom(columnRange);
        }
    }

    private static bool IsRedOrGreenFill(dynamic interior)
    {
        object? rawPattern;
        object? rawColor;
        try
        {
            rawPattern = interior.Pattern;
            rawColor = interior.Color;
        }
        catch
        {
            return false;
        }

        if (TryGetInt(rawPattern, out var pattern) && pattern == XlPatternNone)
            return false;

        // Use the resolved RGB value only. ColorIndex is workbook-theme/palette
        // dependent and can classify gray title fills as a status color.
        if (!TryGetInt(rawColor, out var color))
            return false;

        var red = color & 0xFF;
        var green = (color >> 8) & 0xFF;
        var blue = (color >> 16) & 0xFF;
        return (red >= 150 && red >= green + 20 && red >= blue + 20) ||
               (green >= 100 && green >= red + 15 && green >= blue + 10);
    }

    private static bool TryGetInt(object? value, out int number)
    {
        number = 0;
        if (value is null || value is DBNull) return false;
        try
        {
            number = Convert.ToInt32(value, CultureInfo.InvariantCulture);
            return true;
        }
        catch
        {
            return false;
        }
    }

    private static void EnsureNoFormulaErrors(dynamic sheet)
    {
        dynamic? usedRange = null;
        try
        {
            usedRange = sheet.UsedRange;
            object[,] values = ToMatrix((object?)usedRange.Value2);
            for (var row = 1; row <= values.GetUpperBound(0); row++)
            for (var column = 1; column <= values.GetUpperBound(1); column++)
            {
                var text = Convert.ToString(values[row, column], CultureInfo.InvariantCulture)?.Trim();
                if (text is not null && FormulaErrors.Contains(text))
                    throw new InvalidOperationException(
                        $"{sheet.Name} 拆分后发现公式错误 {text}（相对位置 {row},{column}）。");
            }
        }
        finally
        {
            ReleaseCom(usedRange);
        }
    }

    private static string GetAvailableOutputPath(string workbookPath, DateTime meetingDate)
    {
        var folder = Path.GetDirectoryName(workbookPath)
                     ?? throw new InvalidOperationException("无法确定源文件所在目录。");
        var baseName = Path.GetFileNameWithoutExtension(workbookPath);
        var stem = $"{baseName}_{meetingDate:yyyy年M月d日}";
        var candidate = Path.Combine(folder, $"{stem}.xlsx");
        for (var index = 2; File.Exists(candidate); index++)
            candidate = Path.Combine(folder, $"{stem}_{index}.xlsx");
        return candidate;
    }

    private static int? FindUniqueRow(object[,] values, int firstRow, string title)
    {
        var rows = new HashSet<int>();
        for (var row = 1; row <= values.GetUpperBound(0); row++)
        for (var column = 1; column <= values.GetUpperBound(1); column++)
        {
            var text = NormalizeText(values[row, column]);
            if (text == title)
                rows.Add(firstRow + row - 1);
        }

        return rows.Count == 1 ? rows.Single() : null;
    }

    private static int? FindLastContentColumn(object[,] values)
    {
        for (var column = values.GetUpperBound(1); column >= 1; column--)
        for (var row = 1; row <= values.GetUpperBound(0); row++)
            if (HasContent(values[row, column]))
                return column;
        return null;
    }

    private static int FindLastContentRow(object[,] values)
    {
        return FindLastContentRow(values, 1, values.GetUpperBound(0));
    }

    private static int FindLastContentRow(object[,] values, int firstRow, int lastRow)
    {
        for (var row = Math.Min(lastRow, values.GetUpperBound(0)); row >= firstRow; row--)
        for (var column = 1; column <= values.GetUpperBound(1); column++)
            if (HasContent(values[row, column]))
                return row;
        return firstRow;
    }

    private static bool HasContent(object? value) => value switch
    {
        null => false,
        string text => !string.IsNullOrWhiteSpace(text),
        _ => true
    };

    private static string NormalizeText(object? value) =>
        Convert.ToString(value, CultureInfo.CurrentCulture)?
            .Trim()
            .Replace("\r", string.Empty)
            .Replace("\n", string.Empty)
        ?? string.Empty;

    private static bool TryGetDate(object? value, out DateTime date)
    {
        date = default;
        if (value is DateTime dateValue)
        {
            date = dateValue.Date;
            return true;
        }

        if (value is double serial && serial > 0 && serial < 2958466)
        {
            try
            {
                date = DateTime.FromOADate(serial).Date;
                return true;
            }
            catch { return false; }
        }

        return DateTime.TryParse(
            Convert.ToString(value, CultureInfo.CurrentCulture),
            CultureInfo.CurrentCulture,
            DateTimeStyles.AllowWhiteSpaces,
            out date);
    }

    private static object[,] ToMatrix(object? raw)
    {
        if (raw is object[,] values) return values;
        var matrix = new object[2, 2];
        matrix[1, 1] = raw ?? string.Empty;
        return matrix;
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
        GC.Collect();
        GC.WaitForPendingFinalizers();
        GC.Collect();
        GC.WaitForPendingFinalizers();
    }

    private static void ReleaseCom(object? value)
    {
        if (value is not null && Marshal.IsComObject(value))
            Marshal.FinalReleaseComObject(value);
    }

    private sealed record Layout(
        int FirstRow,
        int FirstColumn,
        int LastColumn,
        int UsedLastRow,
        int LastContentRow,
        int[] SectionStarts,
        int[] SectionEnds,
        DateTime MeetingDate);
}
