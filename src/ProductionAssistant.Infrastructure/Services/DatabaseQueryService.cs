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
        ProductionAssistant.Models.DateRangeSpec spec, DateOnly businessDate)
    {
        var year = (long)businessDate.Year + spec.YearOffset;
        if (year is < 1 or > 9999) return (false, "年份偏移超出有效日期范围。", default, default);
        // Feb 29 maps to Feb 28 in a non-leap target year.
        var shifted = businessDate.AddYears(spec.YearOffset);
        return spec.Granularity switch
        {
            "day" => (true, "", shifted, shifted),
            "mtd" => (true, "", new DateOnly((int)year, shifted.Month, 1), shifted),
            "ytd" => (true, "", new DateOnly((int)year, 1, 1), shifted),
            "fullyear" => (true, "", new DateOnly((int)year, 1, 1), new DateOnly((int)year, 12, 31)),
            _ => (false, "不支持的统计口径。", default, default)
        };
    }

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
            "current-month" => (new DateOnly(businessDate.Year, businessDate.Month, 1),
                new DateOnly(businessDate.Year, businessDate.Month, DateTime.DaysInMonth(businessDate.Year, businessDate.Month))),
            "year" => (new DateOnly(businessDate.Year, 1, 1), businessDate),
            "current-year" => (new DateOnly(businessDate.Year, 1, 1), new DateOnly(businessDate.Year, 12, 31)),
            "last-year-to-date" => (new DateOnly(businessDate.Year - 1, 1, 1), businessDate.AddYears(-1)),
            "last-year" => (new DateOnly(businessDate.Year - 1, 1, 1), new DateOnly(businessDate.Year - 1, 12, 31)),
            "specific-date" when customStart is not null => (customStart.Value, customStart.Value),
            "specific-month" when customStart is not null =>
                (new DateOnly(customStart.Value.Year, customStart.Value.Month, 1),
                    new DateOnly(customStart.Value.Year, customStart.Value.Month,
                        DateTime.DaysInMonth(customStart.Value.Year, customStart.Value.Month))),
            _ => (DateOnly.MinValue, DateOnly.MinValue)
        };
        if (range.Item1 == DateOnly.MinValue && kind != "all")
            return (false, kind is "week" or "custom" ? "请选择周累计的开始和结束日期。" : "不支持的日期口径。", default, default);
        if (range.Item1 > range.Item2)
            return (false, "开始日期不能晚于结束日期。", default, default);
        return (true, string.Empty, range.Item1, range.Item2);
    }
}
