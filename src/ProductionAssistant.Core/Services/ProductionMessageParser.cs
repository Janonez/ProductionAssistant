using System.Globalization;
using System.Text.RegularExpressions;
using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public sealed record ProductionMessageSegment(
    string Text,
    DateTime? Date,
    bool DateWasExplicit);

public static class ProductionMessageParser
{
    public const string Version = "1.0";

    private static readonly Regex DateAtLineStart = new(
        @"(?m)^[^\p{L}\p{N}\r\n]*(?:(?<year>\d{4})\s*(?:年|[^\p{L}\p{N}\r\n]+)\s*)?(?<month>1[0-2]|0?[1-9])\s*(?:月|[^\p{L}\p{N}\r\n]+)\s*(?<day>3[01]|[12]\d|0?[1-9])(?!\d)\s*日?",
        RegexOptions.Compiled | RegexOptions.CultureInvariant);

    private const string NumberPatternText =
        @"(?<number>[-+]?\d+(?:[.,]\d+)?)[ \t]*(?<unit>吨|t|kg|公斤|千克|件|套|节|台|米|m)?";

    private static readonly Regex NumberPattern = new(
        NumberPatternText,
        RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);

    private static readonly IReadOnlyDictionary<string, string[]> Aliases =
        new Dictionary<string, string[]>(StringComparer.Ordinal)
        {
            [ProductionMessageFields.Process] = ["工序", "动作", "工艺"],
            [ProductionMessageFields.Shift] = ["班次", "班组"],
            [ProductionMessageFields.Project] = ["项目号", "项目", "产品"],
            [ProductionMessageFields.Material] = ["材料", "材质", "规格"],
            [ProductionMessageFields.PieceCount] = ["件数", "张数", "数量", "件"],
            [ProductionMessageFields.Weight] = ["日模拟产量/吨", "重量", "吨位"],
            [ProductionMessageFields.Unit] = ["单位"],
            [ProductionMessageFields.SheetInStock] = ["板材入库", "板材入库量", "板材"],
            [ProductionMessageFields.ProfileInStock] = ["型材入库", "型材入库量", "型材"],
            [ProductionMessageFields.Cutting] = ["下料量", "下料"],
            [ProductionMessageFields.Welding] = ["焊接量", "焊接"],
            [ProductionMessageFields.DailyOutput] = ["当日产出", "日产出", "当日产量"],
            [ProductionMessageFields.OutputSections] = ["产出节数", "产出", "完成节数", "节数", "出塔节数"],
        };

    public static IReadOnlyList<ProductionMessageSegment> Split(string input, DateTime dateAnchor)
    {
        var normalized = Normalize(input);
        if (string.IsNullOrWhiteSpace(normalized)) return [];

        var matches = DateAtLineStart.Matches(normalized).Cast<Match>().ToArray();
        if (matches.Length == 0)
            return [new(normalized, null, false)];

        var segments = new List<ProductionMessageSegment>();
        if (!string.IsNullOrWhiteSpace(normalized[..matches[0].Index]))
            segments.Add(new(normalized[..matches[0].Index].Trim(), null, false));

        for (var index = 0; index < matches.Length; index++)
        {
            var start = matches[index].Index;
            var end = index + 1 < matches.Length ? matches[index + 1].Index : normalized.Length;
            var text = normalized[start..end].Trim();
            DateTime? date = TryParseDate(matches[index], dateAnchor, out var parsedDate)
                ? parsedDate
                : null;
            segments.Add(new(text, date, date is not null));
        }
        return segments;
    }

    public static ProductionMessageDraft Parse(
        ProductionMessageSegment segment,
        int index,
        DateTime defaultDate,
        bool allowDefaultDate)
    {
        var body = RemoveDatePrefix(segment.Text);
        var fields = ParseFields(body);
        var kind = DetectKind(body);
        var date = segment.Date;
        var dateFromInput = date is not null;
        if (date is null && allowDefaultDate)
            date = defaultDate.Date;

        var draft = new ProductionMessageDraft
        {
            Index = index,
            Kind = kind,
            TypeDisplay = ProductionMessageKinds.DatabaseDisplay(kind),
            BusinessDate = date,
            DateFromInput = dateFromInput,
            BusinessDateText = date?.ToString("yyyy-MM-dd") ?? string.Empty,
            OriginalText = segment.Text,
            ParserVersion = Version,
            PlanMonth = ReadPlanMonth(fields, date)
        };
        draft.SetFields(fields);
        draft.FieldsText = FormatFields(draft.Kind, fields, draft.PlanMonth);
        Validate(draft, allowDefaultDate && !dateFromInput);
        return draft;
    }

    public static bool ApplyEdits(
        ProductionMessageDraft draft,
        DateTime defaultDate,
        bool allowDefaultDate,
        out string message)
    {
        var dateWasExplicit = draft.DateFromInput;
        if (!TryParseDate(draft.BusinessDateText, defaultDate, out var date))
        {
            if (allowDefaultDate && string.IsNullOrWhiteSpace(draft.BusinessDateText))
                date = defaultDate.Date;
            else
            {
                draft.BusinessDate = null;
                draft.CanWrite = false;
                draft.WarningText = "业务日期无效，请填写 yyyy-MM-dd、M月d日或 M.d。";
                message = draft.WarningText;
                return false;
            }
        }

        var fields = ParseEditableFields(draft.FieldsText);
        draft.BusinessDate = date;
        draft.DateFromInput = dateWasExplicit ||
                              !allowDefaultDate ||
                              (!string.IsNullOrWhiteSpace(draft.BusinessDateText) &&
                               !string.Equals(draft.BusinessDateText, defaultDate.ToString("yyyy-MM-dd"),
                                   StringComparison.Ordinal));
        draft.SetFields(fields);
        draft.Kind = ProductionMessageKinds.Parse(draft.TypeDisplay);
        draft.PlanMonth = ReadPlanMonth(fields, date);
        draft.FieldsText = FormatFields(draft.Kind, fields, draft.PlanMonth);
        var valid = Validate(draft, allowDefaultDate && !draft.DateFromInput);
        message = draft.WarningText;
        return valid;
    }

    public static bool TryCreateValue(
        ProductionMessageDraft draft,
        out ProductionMessageValue value,
        out string message)
    {
        value = null!;
        if (!draft.CanWrite || draft.BusinessDate is null)
        {
            message = string.IsNullOrWhiteSpace(draft.WarningText) ? "记录尚未通过检查。" : draft.WarningText;
            return false;
        }

        var acceptedFields = ProductionMessageFields.FieldsFor(draft.Kind)
            .ToHashSet(StringComparer.Ordinal);
        var fields = draft.Fields
            .Where(pair => acceptedFields.Contains(pair.Key))
            .ToDictionary(pair => pair.Key, pair => pair.Value, StringComparer.Ordinal);
        fields = new Dictionary<string, string>(fields, StringComparer.Ordinal)
        {
            [ProductionMessageFields.RawMessage] = draft.OriginalText,
            [ProductionMessageFields.MessageType] = ProductionMessageKinds.Display(draft.Kind),
            [ProductionMessageFields.ParserVersion] = draft.ParserVersion
        };

        value = new(
            draft.Index,
            draft.Kind,
            draft.BusinessDate.Value.Date,
            fields,
            draft.PlanMonth,
            draft.OriginalText,
            draft.ParserVersion);
        message = string.Empty;
        return true;
    }

    public static string Normalize(string input)
    {
        var text = (input ?? string.Empty)
            .Replace("\r\n", "\n", StringComparison.Ordinal)
            .Replace('\r', '\n')
            .Replace("**", string.Empty, StringComparison.Ordinal)
            .Replace('‐', '-')
            .Replace('‑', '-')
            .Replace('–', '-')
            .Replace('—', '-')
            .Replace('：', ':')
            .Replace('，', ',')
            .Replace('；', ';')
            .Replace('。', '.')
            .Replace('（', '(')
            .Replace('）', ')')
            .Replace('／', '/')
            .Replace('×', 'x')
            .Replace('　', ' ');
        var lines = text.Split('\n')
            .Select(line => Regex.Replace(line.Trim(), @"[ \t]+", " "))
            .Select(line => Regex.Replace(line, @"^(?:[-*•]+|#{1,6})\s*", string.Empty))
            .Where(line => !Regex.IsMatch(
                line,
                @"^.+\s+\d{1,2}/\d{1,2}\s+\d{1,2}:\d{2}:\d{2}$",
                RegexOptions.CultureInvariant))
            .Where(line => !string.IsNullOrWhiteSpace(line));
        return string.Join('\n', lines);
    }

    public static string FormatFields(
        ProductionMessageKind kind,
        IReadOnlyDictionary<string, string> fields,
        DateTime? planMonth)
    {
        var keys = ProductionMessageFields.FieldsFor(kind).ToList();
        if (fields.ContainsKey(ProductionMessageFields.RawMessage))
            keys.Add(ProductionMessageFields.RawMessage);
        return string.Join(Environment.NewLine, keys
            .Distinct(StringComparer.Ordinal)
            .Select(key => $"{ProductionMessageFields.Label(key)}={fields.GetValueOrDefault(key, string.Empty)}"));
    }

    public static Dictionary<string, string> ParseEditableFields(string text)
    {
        var fields = new Dictionary<string, string>(StringComparer.Ordinal);
        foreach (var line in Normalize(text).Split('\n'))
        {
            var separator = line.IndexOf('=');
            if (separator < 0) separator = line.IndexOf(':');
            if (separator <= 0) continue;
            var key = ProductionMessageFields.FromLabel(line[..separator]);
            if (key is null) continue;
            var value = line[(separator + 1)..].Trim();
            if (!string.IsNullOrWhiteSpace(value))
                fields[key] = value;
        }
        return fields;
    }

    private static Dictionary<string, string> ParseFields(string text)
    {
        var fields = new Dictionary<string, string>(StringComparer.Ordinal);
        foreach (var pair in Aliases)
        {
            var result = ProductionMessageFields.Numeric.Contains(pair.Key)
                ? FindNumber(text, pair.Value)
                : FindText(text, pair.Value);
            if (result is not null)
                fields[pair.Key] = result;
        }

        ParseNaturalCuttingMessage(text, fields);

        if (fields.TryGetValue(ProductionMessageFields.PieceCount, out var count) &&
            TryReadUnit(count, out var countUnit))
            fields[ProductionMessageFields.Unit] = countUnit;
        if (fields.TryGetValue(ProductionMessageFields.Weight, out var weight) &&
            TryReadUnit(weight, out var weightUnit) &&
            !fields.ContainsKey(ProductionMessageFields.Unit))
            fields[ProductionMessageFields.Unit] = weightUnit;

        if (IsStructuredTowerReport(text))
        {
            fields.Remove(ProductionMessageFields.MonthlyOutput);
            fields.Remove(ProductionMessageFields.YearlyOutput);
            fields.Remove(ProductionMessageFields.MonthlyReference);
            fields.Remove(ProductionMessageFields.PlanMonth);
            ParseStructuredTowerReport(text, fields);
        }

        return fields;
    }

    private static void ParseNaturalCuttingMessage(string text, IDictionary<string, string> fields)
    {
        if (!text.Contains("下料", StringComparison.OrdinalIgnoreCase) || IsStructuredTowerReport(text)) return;

        fields.TryAdd(ProductionMessageFields.Process, "下料");
        SetMatch(fields, ProductionMessageFields.Shift, text, @"(?<value>单班|双班|白班|夜班)");
        SetMatch(fields, ProductionMessageFields.Project, text, @"切割(?<value>[^，,。\s]+?)项目");

        var sheet = Regex.Match(text, @"项目(?<material>[^，,。\d\s]{1,10})(?<count>\d+(?:\.\d+)?)\s*张");
        if (sheet.Success)
        {
            fields.TryAdd(ProductionMessageFields.Material, sheet.Groups["material"].Value);
            fields.TryAdd(ProductionMessageFields.PieceCount, sheet.Groups["count"].Value + "张");
        }

        SetMatch(fields, ProductionMessageFields.Weight, text,
            @"(?<value>\d+(?:\.\d+)?\s*吨)(?!.*\d+(?:\.\d+)?\s*吨)");
    }

    private static void SetMatch(
        IDictionary<string, string> fields,
        string key,
        string text,
        string pattern)
    {
        var match = Regex.Match(text, pattern, RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);
        if (match.Success) fields[key] = match.Groups["value"].Value.Trim();
    }

    private static bool IsStructuredTowerReport(string text) =>
        text.Contains("板材、型材入库情况", StringComparison.OrdinalIgnoreCase) &&
        text.Contains("当日", StringComparison.OrdinalIgnoreCase) &&
        text.Contains("焊接情况", StringComparison.OrdinalIgnoreCase);

    private static void ParseStructuredTowerReport(
        string text,
        IDictionary<string, string> fields)
    {
        var stockSection = FindSection(text, "板材、型材入库情况", "下料情况");
        SetField(fields, ProductionMessageFields.SheetInStock,
            FindNumberAfterPair(stockSection, "板材", "当日"));
        SetField(fields, ProductionMessageFields.ProfileInStock,
            FindNumberAfterPair(stockSection, "型材", "当日"));

        SetField(fields, ProductionMessageFields.Cutting,
            FindNumberAfter(FindSection(text, "下料情况", "焊接情况"), "当日"));
        SetField(fields, ProductionMessageFields.Welding,
            FindNumberAfter(FindSection(text, "焊接情况", "产出情况"), "当日"));

        var outputSection = FindSection(text, "产出情况");
        var dailyOutput = FindNumberAfter(outputSection, "当日");
        SetField(fields, ProductionMessageFields.DailyOutput, dailyOutput);
        if (dailyOutput is not null &&
            TryParseNumber(dailyOutput, out var output) &&
            output == 0)
            fields[ProductionMessageFields.OutputSections] = "0节";

    }

    private static string? FindSection(string text, string heading, params string[] nextHeadings)
    {
        var start = text.IndexOf(heading, StringComparison.OrdinalIgnoreCase);
        if (start < 0) return null;
        var end = text.Length;
        foreach (var nextHeading in nextHeadings)
        {
            var next = text.IndexOf(nextHeading, start + heading.Length,
                StringComparison.OrdinalIgnoreCase);
            if (next >= 0 && next < end) end = next;
        }
        return text[start..end];
    }

    private static string? FindNumberAfterPair(string? text, string first, string second)
    {
        if (string.IsNullOrWhiteSpace(text)) return null;
        var match = Regex.Match(
            text,
            $@"{Regex.Escape(first)}[ \t]*:[ \t]*{Regex.Escape(second)}[ \t]*:[ \t]*{NumberPatternText}",
            RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);
        return match.Success ? FormatNumberMatch(match) : null;
    }

    private static string? FindNumberAfter(string? text, string label)
    {
        if (string.IsNullOrWhiteSpace(text)) return null;
        var match = Regex.Match(
            text,
            $@"{Regex.Escape(label)}[ \t]*:[ \t]*{NumberPatternText}",
            RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);
        return match.Success ? FormatNumberMatch(match) : null;
    }

    private static string FormatNumberMatch(Match match)
    {
        var number = match.Groups["number"].Value.Replace(",", string.Empty, StringComparison.Ordinal);
        var unit = match.Groups["unit"].Value;
        return string.IsNullOrWhiteSpace(unit) ? number : number + unit;
    }

    private static bool TryParseNumber(string value, out double number)
    {
        number = 0;
        var match = Regex.Match(value.Replace(",", string.Empty, StringComparison.Ordinal),
            @"[-+]?\d+(?:\.\d+)?");
        return match.Success && double.TryParse(
            match.Value,
            NumberStyles.Float,
            CultureInfo.InvariantCulture,
            out number);
    }

    private static void SetField(IDictionary<string, string> fields, string key, string? value)
    {
        if (value is not null) fields[key] = value;
    }

    private static ProductionMessageKind DetectKind(string text)
    {
        var towerScore = 0;
        var cuttingScore = 0;
        foreach (var keyword in new[] { "塔筒", "产线", "板材入库", "型材入库", "全年累计", "当月累计", "产出节数" })
            if (text.Contains(keyword, StringComparison.OrdinalIgnoreCase))
                towerScore += 2;
        foreach (var keyword in new[] { "下料", "班次", "项目", "材料", "材质", "重量", "件数" })
            if (text.Contains(keyword, StringComparison.OrdinalIgnoreCase))
                cuttingScore++;

        if (towerScore == 0 && cuttingScore == 0) return ProductionMessageKind.Unknown;
        if (towerScore >= cuttingScore + 2) return ProductionMessageKind.TowerLineDaily;
        if (cuttingScore >= towerScore + 1) return ProductionMessageKind.MaterialCutting;
        return ProductionMessageKind.Unknown;
    }

    private static bool Validate(ProductionMessageDraft draft, bool dateWasDefault)
    {
        var problems = new List<string>();
        if (draft.BusinessDate is null) problems.Add("缺少业务日期");
        if (draft.Kind == ProductionMessageKind.Unknown) problems.Add("消息类型无法判断");

        if (draft.Kind == ProductionMessageKind.MaterialCutting)
        {
            var hasQuantity = draft.Fields.ContainsKey(ProductionMessageFields.PieceCount) ||
                              draft.Fields.ContainsKey(ProductionMessageFields.Weight);
            if (!hasQuantity) problems.Add("缺少件数或重量");
            if (hasQuantity && !draft.Fields.ContainsKey(ProductionMessageFields.Unit))
                problems.Add("件数或重量缺少单位");
        }
        else if (draft.Kind == ProductionMessageKind.TowerLineDaily)
        {
            var hasMetric = ProductionMessageFields.FieldsFor(draft.Kind)
                .Where(ProductionMessageFields.Numeric.Contains)
                .Any(draft.Fields.ContainsKey);
            if (!hasMetric) problems.Add("缺少日报数值");
        }

        if (dateWasDefault && draft.BusinessDate is not null)
            problems.Insert(0, "消息未带日期，当前使用所选默认日期；批量消息必须逐段带日期");

        draft.WarningText = string.Join("；", problems);
        draft.CanWrite = problems.Count == 0 ||
                         (problems.Count == 1 &&
                          problems[0].StartsWith("消息未带日期", StringComparison.Ordinal));
        draft.StatusText = draft.CanWrite ? "可写入" : "待修正";
        draft.RefreshSummary();
        return draft.CanWrite;
    }

    private static string RemoveDatePrefix(string text)
    {
        var match = DateAtLineStart.Match(text);
        if (!match.Success || match.Index != 0) return text;
        return text[match.Length..].Trim(" ：:,-".ToCharArray());
    }

    private static string? FindText(string text, IReadOnlyList<string> aliases)
    {
        var aliasPattern = string.Join('|', aliases.OrderByDescending(alias => alias.Length)
            .Select(Regex.Escape));
        var match = Regex.Match(
            text,
            $@"(?:{aliasPattern})[ \t]*(?:[:=]|为|是)?[ \t]*(?<value>[^,;\n]+)",
            RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);
        if (!match.Success) return null;
        return TrimValue(match.Groups["value"].Value, aliases);
    }

    private static string? FindNumber(string text, IReadOnlyList<string> aliases)
    {
        var aliasPattern = string.Join('|', aliases.OrderByDescending(alias => alias.Length)
            .Select(Regex.Escape));
        var match = Regex.Match(
            text,
            $@"(?:{aliasPattern})[ \t]*(?:[:=]|为|是)?[ \t]*{NumberPatternText}",
            RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);
        if (!match.Success) return null;
        return FormatNumberMatch(match);
    }

    private static string TrimValue(string value, IReadOnlyList<string> aliases)
    {
        var result = value.Trim(' ', '\t', ',', ';', '.', '。');
        foreach (var alias in aliases.OrderByDescending(alias => alias.Length))
        {
            var next = result.IndexOf($" {alias}", StringComparison.OrdinalIgnoreCase);
            if (next > 0) result = result[..next];
        }
        return result.Trim();
    }

    private static bool TryReadUnit(string value, out string unit)
    {
        var match = Regex.Match(value, @"(吨|t|kg|公斤|千克|张|件|套|节|台|米|m)$",
            RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);
        unit = match.Success ? match.Groups[1].Value : string.Empty;
        return match.Success;
    }

    private static DateTime? ReadPlanMonth(
        IReadOnlyDictionary<string, string> fields,
        DateTime? businessDate)
    {
        if (!fields.TryGetValue(ProductionMessageFields.PlanMonth, out var text) ||
            !int.TryParse(Regex.Match(text, @"\d+").Value, out var month) ||
            businessDate is null ||
            month is < 1 or > 12)
            return null;
        return new DateTime(businessDate.Value.Year, month, 1);
    }

    private static bool TryParseDate(Match match, DateTime anchor, out DateTime date) =>
        TryCreateDate(
            match.Groups["year"].Success ? match.Groups["year"].Value : string.Empty,
            match.Groups["month"].Value,
            match.Groups["day"].Value,
            anchor,
            out date);

    public static bool TryParseDate(string text, DateTime anchor, out DateTime date)
    {
        date = default;
        text = text.Trim();
        var match = DateAtLineStart.Match(text);
        if (match.Success && match.Index == 0)
            return TryParseDate(match, anchor, out date);

        var numeric = Regex.Match(text,
            @"^(?:(?<year>\d{4})\s*[-/.年]\s*)?(?<month>\d{1,2})\s*(?:月|[-/.])\s*(?<day>\d{1,2})\s*日?$",
            RegexOptions.CultureInvariant);
        return numeric.Success && TryCreateDate(
            numeric.Groups["year"].Value,
            numeric.Groups["month"].Value,
            numeric.Groups["day"].Value,
            anchor,
            out date);
    }

    private static bool TryCreateDate(
        string yearText,
        string monthText,
        string dayText,
        DateTime anchor,
        out DateTime date)
    {
        date = default;
        if (!int.TryParse(monthText, out var month) || !int.TryParse(dayText, out var day))
            return false;
        var year = int.TryParse(yearText, out var parsedYear) ? parsedYear : anchor.Year;
        try
        {
            date = new DateTime(year, month, day);
            return true;
        }
        catch (ArgumentOutOfRangeException)
        {
            return false;
        }
    }
}
