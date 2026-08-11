using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace ProductionAssistant.Models;

public enum ProductionMessageKind
{
    Unknown,
    MaterialCutting,
    TowerLineDaily
}

public static class ProductionMessageKinds
{
    public const string CuttingModuleKey = "production-message-cutting";
    public const string TowerDailyModuleKey = "production-message-tower-daily";
    public const string TowerMonthlyModuleKey = "production-message-tower-monthly";
    public const string TowerYearlyModuleKey = "production-message-tower-yearly";

    public static readonly IReadOnlyList<string> Options =
        ["下料日报数据库", "塔筒产线日报库", "无法判断"];

    public static string DatabaseDisplay(ProductionMessageKind kind) => kind switch
    {
        ProductionMessageKind.MaterialCutting => "下料日报数据库",
        ProductionMessageKind.TowerLineDaily => "塔筒产线日报库",
        _ => "无法判断"
    };

    public static string Display(ProductionMessageKind kind) => kind switch
    {
        ProductionMessageKind.MaterialCutting => "下料消息",
        ProductionMessageKind.TowerLineDaily => "塔筒产线日报",
        _ => "无法判断"
    };

    public static ProductionMessageKind Parse(string value) =>
        value.Contains("下料", StringComparison.OrdinalIgnoreCase)
            ? ProductionMessageKind.MaterialCutting
            : value.Contains("塔筒", StringComparison.OrdinalIgnoreCase) ||
              value.Contains("产线", StringComparison.OrdinalIgnoreCase)
                ? ProductionMessageKind.TowerLineDaily
                : ProductionMessageKind.Unknown;
}

public static class ProductionMessageFields
{
    public const string Process = "process";
    public const string Shift = "shift";
    public const string Project = "project";
    public const string Material = "material";
    public const string PieceCount = "piece_count";
    public const string Weight = "weight";
    public const string Unit = "unit";
    public const string Line = "line";
    public const string SheetInStock = "sheet_in_stock";
    public const string ProfileInStock = "profile_in_stock";
    public const string Cutting = "cutting";
    public const string Welding = "welding";
    public const string DailyOutput = "daily_output";
    public const string MonthlyOutput = "monthly_output";
    public const string YearlyOutput = "yearly_output";
    public const string MonthlyReference = "monthly_reference";
    public const string OutputSections = "output_sections";
    public const string PlanMonth = "plan_month";
    public const string RawMessage = "raw_message";
    public const string MessageType = "message_type";
    public const string ParserVersion = "parser_version";
    public const string MonthlySummaryRelation = "monthly_summary_relation";
    public const string YearlySummaryRelation = "yearly_summary_relation";
    // Kept for settings migration and older cached mappings.
    public const string MonthlyPlanRelation = "monthly_plan_relation";

    private static readonly IReadOnlyDictionary<string, string> Labels =
        new Dictionary<string, string>(StringComparer.Ordinal)
        {
            [Process] = "工序/动作",
            [Shift] = "班次",
            [Project] = "项目",
            [Material] = "材料",
            [PieceCount] = "件数",
            [Weight] = "重量",
            [Unit] = "单位",
            [Line] = "产线",
            [SheetInStock] = "板材入库",
            [ProfileInStock] = "型材入库",
            [Cutting] = "下料",
            [Welding] = "焊接",
            [DailyOutput] = "当日产出",
            [MonthlyOutput] = "当月累计",
            [YearlyOutput] = "全年累计",
            [MonthlyReference] = "月度参考量",
            [OutputSections] = "产出节数",
            [PlanMonth] = "计划月份",
            [RawMessage] = "原始消息",
            [MessageType] = "消息类型",
            [ParserVersion] = "解析器版本"
        };

    public static readonly IReadOnlySet<string> Numeric = new HashSet<string>(
        [PieceCount, Weight, SheetInStock, ProfileInStock, Cutting, Welding,
         DailyOutput, MonthlyOutput, YearlyOutput, MonthlyReference, OutputSections],
        StringComparer.Ordinal);

    private static readonly string[] NumericUnits =
        ["公斤", "千克", "吨", "kg", "张", "件", "套", "节", "台", "米", "t", "m"];

    public static string Label(string key) => Labels.TryGetValue(key, out var label) ? label : key;

    public static string DisplayValue(string key, string value)
    {
        var result = value.Trim();
        if (!Numeric.Contains(key)) return result;
        foreach (var unit in NumericUnits)
            if (result.EndsWith(unit, StringComparison.OrdinalIgnoreCase))
                return result[..^unit.Length].Trim();
        return result;
    }

    public static string? FromLabel(string label)
    {
        var normalized = label.Trim().Replace("：", ":");
        foreach (var pair in Labels)
        {
            if (string.Equals(pair.Value, normalized, StringComparison.OrdinalIgnoreCase) ||
                string.Equals(pair.Key, normalized, StringComparison.OrdinalIgnoreCase))
                return pair.Key;
        }
        return normalized switch
        {
            "动作" => Process,
            "材质" => Material,
            "张数" or "数量" or "张" or "件" => PieceCount,
            "产量" => DailyOutput,
            "月计划" or "月度计划" => MonthlyReference,
            "节数" => OutputSections,
            "原文" => RawMessage,
            _ => null
        };
    }

    public static IReadOnlyList<string> FieldsFor(ProductionMessageKind kind) => kind switch
    {
        ProductionMessageKind.MaterialCutting =>
            [Process, Shift, Project, Material, PieceCount, Weight, Unit],
        ProductionMessageKind.TowerLineDaily =>
            [SheetInStock, ProfileInStock, Cutting, Welding, DailyOutput, OutputSections],
        _ => []
    };
}

public sealed record ProductionMessageFieldPreview(
    string Key,
    string Label,
    string Value);

public sealed class ProductionMessageDraft : INotifyPropertyChanged
{
    private string _businessDateText = string.Empty;
    private string _typeDisplay = ProductionMessageKinds.DatabaseDisplay(ProductionMessageKind.Unknown);
    private string _fieldsText = string.Empty;
    private string _warningText = string.Empty;
    private string _statusText = "待检查";
    private ProductionMessageKind _kind;

    public int Index { get; set; }
    public string OriginalText { get; set; } = string.Empty;
    public string ParserVersion { get; set; } = string.Empty;
    public bool DateFromInput { get; set; }
    public DateTime? BusinessDate { get; set; }
    public DateTime? PlanMonth { get; set; }
    public Dictionary<string, string> Fields { get; } = new(StringComparer.Ordinal);
    public Dictionary<ProductionMessageKind, IReadOnlyDictionary<string, string>> DatabaseFieldMappings { get; } = [];
    public IReadOnlyList<string> TypeOptions => ProductionMessageKinds.Options;

    public IReadOnlyList<ProductionMessageFieldPreview> PreviewFields =>
        ProductionMessageFields.FieldsFor(Kind)
            .Where(Fields.ContainsKey)
            .Select(key =>
            {
                var databaseFieldName = ProductionMessageFields.Label(key);
                if (DatabaseFieldMappings.TryGetValue(Kind, out var mapping) &&
                    mapping.TryGetValue(key, out var databaseField) &&
                    !string.IsNullOrWhiteSpace(databaseField))
                    databaseFieldName = databaseField;
                var value = Fields.TryGetValue(key, out var fieldValue)
                    ? ProductionMessageFields.DisplayValue(key, fieldValue)
                    : "—";
                return new ProductionMessageFieldPreview(
                    key,
                    databaseFieldName,
                    value);
            })
            .ToArray();

    public ProductionMessageKind Kind
    {
        get => _kind;
        set
        {
            if (_kind == value) return;
            _kind = value;
            OnPropertyChanged();
            OnPropertyChanged(nameof(TypeDisplay));
            OnPropertyChanged(nameof(Summary));
            OnPropertyChanged(nameof(PreviewFields));
        }
    }

    public string TypeDisplay
    {
        get => _typeDisplay;
        set
        {
            var kind = ProductionMessageKinds.Parse(value);
            if (_typeDisplay == value && _kind == kind) return;
            _typeDisplay = value;
            _kind = kind;
            OnPropertyChanged();
            OnPropertyChanged(nameof(Kind));
            OnPropertyChanged(nameof(Summary));
            OnPropertyChanged(nameof(PreviewFields));
        }
    }

    public string BusinessDateText
    {
        get => _businessDateText;
        set
        {
            if (_businessDateText == value) return;
            _businessDateText = value;
            OnPropertyChanged();
        }
    }

    public DateTimeOffset? BusinessDateSelection
    {
        get => BusinessDate is null ? null : new DateTimeOffset(BusinessDate.Value);
        set
        {
            BusinessDate = value?.Date;
            BusinessDateText = BusinessDate?.ToString("yyyy-MM-dd") ?? string.Empty;
            OnPropertyChanged();
            OnPropertyChanged(nameof(Summary));
            OnPropertyChanged(nameof(CardTitle));
        }
    }

    public string FieldsText
    {
        get => _fieldsText;
        set
        {
            if (_fieldsText == value) return;
            _fieldsText = value;
            OnPropertyChanged();
        }
    }

    public string WarningText
    {
        get => _warningText;
        set
        {
            if (_warningText == value) return;
            _warningText = value;
            OnPropertyChanged();
        }
    }

    public string StatusText
    {
        get => _statusText;
        set
        {
            if (_statusText == value) return;
            _statusText = value;
            OnPropertyChanged();
        }
    }

    public bool CanWrite { get; set; }

    public string Summary =>
        $"{(BusinessDate is null ? "日期待确认" : BusinessDate.Value.ToString("yyyy-MM-dd"))} · {TypeDisplay}";

    public string CardTitle =>
        BusinessDate is null ? $"第 {Index} 条 · 日期待确认" : BusinessDate.Value.ToString("yyyy-MM-dd");

    public event PropertyChangedEventHandler? PropertyChanged;

    public void SetDatabaseFieldMappings(
        IReadOnlyDictionary<ProductionMessageKind, IReadOnlyDictionary<string, string>> mappings)
    {
        DatabaseFieldMappings.Clear();
        foreach (var pair in mappings)
            DatabaseFieldMappings[pair.Key] =
                new Dictionary<string, string>(pair.Value, StringComparer.Ordinal);
        OnPropertyChanged(nameof(PreviewFields));
    }

    public void SetFields(IEnumerable<KeyValuePair<string, string>> values)
    {
        Fields.Clear();
        foreach (var pair in values.Where(pair => !string.IsNullOrWhiteSpace(pair.Value)))
            Fields[pair.Key] = pair.Value.Trim();
        OnPropertyChanged(nameof(PreviewFields));
    }

    public void RefreshSummary()
    {
        OnPropertyChanged(nameof(Summary));
        OnPropertyChanged(nameof(CardTitle));
        OnPropertyChanged(nameof(Kind));
        OnPropertyChanged(nameof(TypeDisplay));
        OnPropertyChanged(nameof(PreviewFields));
    }

    private void OnPropertyChanged([CallerMemberName] string? propertyName = null) =>
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
}

public sealed record ProductionMessageValue(
    int Index,
    ProductionMessageKind Kind,
    DateTime BusinessDate,
    IReadOnlyDictionary<string, string> Fields,
    DateTime? PlanMonth,
    string OriginalText,
    string ParserVersion);

public sealed record ProductionMessageImportRequest(
    IReadOnlyList<ProductionMessageValue> Items,
    bool OverwriteExisting,
    IReadOnlyDictionary<string, double>? CuttingMonthlyPlans = null,
    bool CheckOnly = false);

public sealed record ProductionMessageWriteResult(
    int Index,
    DateTime BusinessDate,
    ProductionMessageKind Kind,
    string Status,
    string Message);

public sealed record ProductionMessageImportResult(
    bool Succeeded,
    string Message,
    IReadOnlyList<ProductionMessageWriteResult> Items);
