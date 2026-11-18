using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;

namespace ProductionAssistant.Services;

public sealed record GroupSubmissionRules([property: JsonRequired] bool Automatic, string Time, int[] Weekdays,
    string MissingData, int RetryMinutes, string RetryUntil)
{
    public static GroupSubmissionRules Defaults() => new(false, "09:00", [1, 2, 3, 4, 5, 6, 0], "wait", 10, "18:00");
}

public sealed record GroupSubmissionSource(string Value, string Label, string SourceId, string FieldId);
public sealed record GroupSubmissionPositionSample(string Date, string Cell);
public sealed record GroupSubmissionPosition(string Status, GroupSubmissionPositionSample First, GroupSubmissionPositionSample Second,
    string Direction, int Step, GroupSubmissionPositionSample[] Preview, string? Range = null);
public sealed record GroupSubmissionBusiness(string Id, string Name, GroupSubmissionSource DataSource,
    GroupSubmissionPosition Position, string? DocumentId = null, int? DocumentRevision = null);
public sealed record GroupSubmissionDocument(string Id, int Revision);
public sealed record GroupSubmissionConfiguration([property: JsonRequired] long Revision,
    GroupSubmissionBusiness[] Businesses, GroupSubmissionRules Rules);
public sealed record GroupSubmissionConfigurationView(long Revision, GroupSubmissionBusiness[] Businesses,
    GroupSubmissionRules Rules, bool HasBusiness, DateTimeOffset? NextRunAt, IReadOnlyList<GroupSubmissionSource> DataOptions);
public sealed record GroupSubmissionSaveResult(GroupSubmissionConfigurationView? Configuration = null,
    string? Error = null, IReadOnlyDictionary<string, string>? FieldErrors = null, bool Conflict = false);

public sealed class GroupSubmissionConfigurationStore(string path, Action<string> diagnostic)
{
    public const string FileName = "group-submission-configuration.json";
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);
    private static readonly Regex CellPattern = new(@"\A([A-Z]{1,3})([1-9][0-9]{0,6})\z", RegexOptions.CultureInvariant);
    private const string ConflictMessage = "配置已在其他窗口更新。请刷新后核对你的修改。";
    private readonly AtomicJsonStore<GroupSubmissionConfiguration> _store = new(path,
        () => new(0, [], GroupSubmissionRules.Defaults()), IsValid, diagnostic);

    public GroupSubmissionConfigurationView Read(GroupSubmissionDocument? document, IReadOnlyList<GroupSubmissionSource> sources) =>
        Present(_store.Read(), document, sources);

    public GroupSubmissionSaveResult Save(JsonElement payload, GroupSubmissionDocument? document,
        IReadOnlyList<GroupSubmissionSource> sources)
    {
        if (payload.ValueKind != JsonValueKind.Object || !payload.TryGetProperty("revision", out var expected) ||
            expected.ValueKind != JsonValueKind.Number || !expected.TryGetInt64(out var revision) || revision < 0)
            return new(Error: "缺少有效的配置版本，请刷新后重试。", FieldErrors: new Dictionary<string, string> { ["revision"] = "配置版本无效。" });

        return _store.Update<GroupSubmissionSaveResult>(current =>
        {
            if (current.Revision != revision) return (null, new(Error: ConflictMessage, Conflict: true));

            var hasRules = payload.TryGetProperty("rules", out var rules);
            var hasBusiness = payload.TryGetProperty("business", out var business);
            var hasRemoval = payload.TryGetProperty("deleteBusinessId", out var removal);
            if (new[] { hasRules, hasBusiness, hasRemoval }.Count(value => value) != 1)
                return (null, new(Error: "请选择一项配置变更。"));

            var updated = current;
            var errors = new Dictionary<string, string>();
            if (hasRules)
            {
                var candidate = Deserialize<GroupSubmissionRules>(rules, errors, "rules");
                if (candidate is not null)
                {
                    ValidateRules(candidate, errors);
                    updated = current with { Rules = candidate };
                }
            }
            else if (hasBusiness)
            {
                var candidate = Deserialize<GroupSubmissionBusiness>(business, errors, "business");
                if (candidate is not null)
                {
                    if (document is null || !payload.TryGetProperty("documentRevision", out var expectedDocument) ||
                        expectedDocument.ValueKind != JsonValueKind.Number || !expectedDocument.TryGetInt32(out var documentRevision) ||
                        documentRevision != document.Revision)
                        return (null, new(Error: "文档配置已变化，请重新打开设置并核对填报位置。", Conflict: true));
                    var name = candidate.Name?.Trim();
                    if (string.IsNullOrEmpty(name)) errors["business.name"] = "请输入业务名称。";
                    else if (current.Businesses.Any(item => item.Id != candidate.Id && string.Equals(item.Name, name, StringComparison.OrdinalIgnoreCase)))
                        errors["business.name"] = "业务名称已存在。";
                    if (string.IsNullOrWhiteSpace(candidate.Id)) errors["business.id"] = "业务标识无效。";
                    var source = sources.FirstOrDefault(option => MatchesSource(option, candidate.DataSource));
                    if (source is null) errors["business.dataSource"] = "请选择可用的数据库表和字段。";
                    var position = RecognizePosition(candidate.Position);
                    if (position is null) errors["business.position"] = "请选择两个有效的日期和单元格，位置须按天等距向右或向下移动。";
                    if (errors.Count == 0)
                    {
                        candidate = new(candidate.Id, name!, source!, position!, document.Id, document.Revision);
                        var index = Array.FindIndex(current.Businesses, item => item.Id == candidate.Id);
                        var businesses = current.Businesses.ToList();
                        if (index < 0) businesses.Add(candidate);
                        else businesses[index] = candidate;
                        updated = current with { Businesses = businesses.ToArray() };
                    }
                }
            }
            else if (removal.ValueKind != JsonValueKind.String || !current.Businesses.Any(item => item.Id == removal.GetString()))
                errors["deleteBusinessId"] = "找不到要删除的业务，请刷新后重试。";
            else
                updated = current with { Businesses = current.Businesses.Where(item => item.Id != removal.GetString()).ToArray() };

            if (errors.Count > 0) return (null, new(Error: "请检查标记的字段。", FieldErrors: errors));
            updated = updated with { Revision = checked(current.Revision + 1) };
            return (updated, new(Configuration: Present(updated, document, sources)));
        });
    }

    private static T? Deserialize<T>(JsonElement value, Dictionary<string, string> errors, string field) where T : class
    {
        try { if (value.Deserialize<T>(JsonOptions) is { } candidate) return candidate; }
        catch (JsonException ex)
        {
            if (ex.Path is { Length: > 2 } path && path.StartsWith("$."))
                field += "." + path[2..].Split('.', '[')[0];
        }
        errors[field] = "字段值无效。";
        return null;
    }

    private static bool MatchesSource(GroupSubmissionSource option, GroupSubmissionSource? candidate) =>
        candidate is not null && option.SourceId == candidate.SourceId && option.FieldId == candidate.FieldId;

    private static GroupSubmissionConfigurationView Present(GroupSubmissionConfiguration config, GroupSubmissionDocument? document,
        IReadOnlyList<GroupSubmissionSource> sources)
    {
        var businesses = config.Businesses.Select(item =>
        {
            var position = RecognizePosition(item.Position)!;
            if (document is null || item.DocumentId != document.Id || item.DocumentRevision != document.Revision)
                position = position with { Status = "invalid" };
            return item with { Position = position };
        }).ToArray();
        var hasBusiness = businesses.Any(item => item.Position.Status == "configured" && sources.Any(source => MatchesSource(source, item.DataSource)));
        var nextRunAt = TencentSheetTaskScheduler.NextGroupSubmissionRun(config.Rules, hasBusiness, DateTimeOffset.Now, TimeZoneInfo.Local);
        return new(config.Revision, businesses, config.Rules, hasBusiness, nextRunAt, sources);
    }

    private static bool IsValid(GroupSubmissionConfiguration config)
    {
        if (config.Revision < 0 || config.Rules is null || config.Businesses is null) return false;
        var errors = new Dictionary<string, string>();
        ValidateRules(config.Rules, errors);
        if (errors.Count > 0) return false;
        var ids = new HashSet<string>(StringComparer.Ordinal);
        var names = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        return config.Businesses.All(item => item is not null && !string.IsNullOrWhiteSpace(item.Id) && ids.Add(item.Id) &&
            !string.IsNullOrWhiteSpace(item.Name) && names.Add(item.Name.Trim()) && item.DataSource is { } source &&
            !string.IsNullOrWhiteSpace(source.SourceId) && !string.IsNullOrWhiteSpace(source.FieldId) &&
            !string.IsNullOrWhiteSpace(item.DocumentId) && item.DocumentRevision is >= 0 && RecognizePosition(item.Position) is not null);
    }

    private static void ValidateRules(GroupSubmissionRules value, Dictionary<string, string> errors)
    {
        var validTime = TimeOnly.TryParseExact(value.Time, "HH:mm", CultureInfo.InvariantCulture, DateTimeStyles.None, out var time);
        var validUntil = TimeOnly.TryParseExact(value.RetryUntil, "HH:mm", CultureInfo.InvariantCulture, DateTimeStyles.None, out var until);
        if (!validTime) errors["rules.time"] = "请输入有效时间，格式为 HH:mm。";
        if (value.Weekdays is not { Length: > 0 } || value.Weekdays.Any(day => day is < 0 or > 6) || value.Weekdays.Distinct().Count() != value.Weekdays.Length)
            errors["rules.weekdays"] = "至少选择一个执行日，执行日不能重复。";
        if (value.MissingData is not ("wait" or "skip")) errors["rules.missingData"] = "请选择昨日数据没录完时的处理方式。";
        if (value.RetryMinutes <= 0) errors["rules.retryMinutes"] = "重试间隔必须为正整数。";
        if (!validUntil) errors["rules.retryUntil"] = "请输入有效时间，格式为 HH:mm。";
        else if (value.MissingData == "wait" && validTime && until <= time) errors["rules.retryUntil"] = "最晚时间必须晚于执行时间。";
    }

    private static GroupSubmissionPosition? RecognizePosition(GroupSubmissionPosition? position)
    {
        if (position is not { Status: "configured", First: { } first, Second: { } second } ||
            !DateOnly.TryParseExact(first.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var firstDate) ||
            !DateOnly.TryParseExact(second.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var secondDate) ||
            ParseCell(first.Cell) is not { } start || ParseCell(second.Cell) is not { } end) return null;
        var days = secondDate.DayNumber - firstDate.DayNumber;
        if (days <= 0 || secondDate.DayNumber > DateOnly.MaxValue.DayNumber - 3) return null;
        var columns = end.Column - start.Column;
        var rows = end.Row - start.Row;
        var right = columns > 0 && columns % days == 0 && rows == 0;
        var down = rows > 0 && rows % days == 0 && columns == 0;
        if (!right && !down) return null;
        var step = (right ? columns : rows) / days;
        if (position.Direction != (right ? "right" : "down") || position.Step != step) return null;
        var preview = new GroupSubmissionPositionSample[3];
        for (var index = 1; index <= preview.Length; index++)
        {
            var column = end.Column + columns / days * index;
            var row = end.Row + rows / days * index;
            if (column > 16384 || row > 1048576) return null;
            var letters = "";
            for (; column > 0; column /= 26) letters = (char)('A' + --column % 26) + letters;
            preview[index - 1] = new(secondDate.AddDays(index).ToString("yyyy-MM-dd", CultureInfo.InvariantCulture), letters + row);
        }
        return position with { Preview = preview };
    }

    private static (int Column, int Row)? ParseCell(string? cell)
    {
        var match = CellPattern.Match(cell ?? "");
        if (!match.Success) return null;
        var column = match.Groups[1].Value.Aggregate(0, (value, letter) => value * 26 + letter - 'A' + 1);
        var row = int.Parse(match.Groups[2].Value, CultureInfo.InvariantCulture);
        return column <= 16384 && row <= 1048576 ? (column, row) : null;
    }
}
