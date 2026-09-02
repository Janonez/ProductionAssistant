namespace ProductionAssistant.Services;

public sealed class DatabaseQueryService(IDatabaseQueryProvider provider)
{
    public IDatabaseQueryProvider Provider { get; } = provider;

    public async Task<DatabaseInspectionResult> InspectAsync(
        DatabaseInspectionRequest request,
        CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(request.SourceId) || string.IsNullOrWhiteSpace(request.DatasetId) ||
            request.RangeKind != "all" && string.IsNullOrWhiteSpace(request.DateFieldId))
            return new(false, "请选择数据库、View和日期字段。", Provider.Name, "", "", default, default, 0, null, []);
        var range = DatabaseDateRanges.Resolve(
            request.RangeKind, request.BusinessDate, request.StartDate, request.EndDate);
        if (!range.Succeeded)
            return new(false, range.Message, Provider.Name, "", "", default, default, 0, null, []);

        var data = await Provider.QueryDatasetAsync(request.SourceId, request.DatasetId, cancellationToken);
        if (!data.Succeeded)
            return new(false, data.Message, Provider.Name, data.SourceName, data.DatasetName,
                range.Start, range.End, 0, null, []);
        if (!IsCurrentYearView(data.DatasetName) && request.RangeKind != "all")
            return new(false, "只有“本年截止今日”View 可以按日期口径查询；其他 View 只读取其完整结果。",
                Provider.Name, data.SourceName, data.DatasetName, range.Start, range.End, 0, null, []);

        var records = new List<DatabaseRecord>();
        foreach (var record in data.Records)
        {
            if (request.RangeKind == "all") { records.Add(record); continue; }
            var dateField = record.Fields.FirstOrDefault(field => field.Id == request.DateFieldId);
            if (dateField?.Value is not DateTime date) continue;
            var day = DateOnly.FromDateTime(date);
            if (day >= range.Start && day <= range.End) records.Add(record);
        }

        double? total = null;
        if (!string.IsNullOrWhiteSpace(request.ValueFieldId))
        {
            var values = records
                .Select(record => record.Fields.FirstOrDefault(field => field.Id == request.ValueFieldId)?.Value)
                .Where(value => value is byte or short or int or long or float or double or decimal)
                .Select(value => Convert.ToDouble(value, System.Globalization.CultureInfo.InvariantCulture))
                .ToArray();
            if (values.Length > 0) total = values.Sum();
        }

        return new(true, "数据库查询成功。", Provider.Name, data.SourceName, data.DatasetName,
            range.Start, range.End, records.Count, total, records);
    }

    private static bool IsCurrentYearView(string name) =>
        string.Equals(name.Trim(), "本年截止今日", StringComparison.CurrentCultureIgnoreCase);
}

public static class DatabaseDateRanges
{
    public static (bool Succeeded, string Message, DateOnly Start, DateOnly End) Resolve(
        string kind,
        DateOnly businessDate,
        DateOnly? customStart = null,
        DateOnly? customEnd = null)
    {
        var range = kind switch
        {
            "all" => (DateOnly.MinValue, DateOnly.MaxValue),
            "day" => (businessDate, businessDate),
            "week" or "custom" when customStart is not null && customEnd is not null =>
                (customStart.Value, customEnd.Value),
            "month" => (new DateOnly(businessDate.Year, businessDate.Month, 1), businessDate),
            "year" => (new DateOnly(businessDate.Year, 1, 1), businessDate),
            _ => (DateOnly.MinValue, DateOnly.MinValue)
        };
        if (range.Item1 == DateOnly.MinValue && kind != "all")
            return (false, kind is "week" or "custom" ? "请选择周累计的开始和结束日期。" : "不支持的日期口径。", default, default);
        if (range.Item1 > range.Item2)
            return (false, "开始日期不能晚于结束日期。", default, default);
        return (true, string.Empty, range.Item1, range.Item2);
    }
}
