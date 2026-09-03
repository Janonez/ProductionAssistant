using System.Globalization;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public sealed partial class DailyReportService
{
    private readonly IDatabaseQueryProvider _database;
    private readonly HttpClient _dingTalkClient;

    public DailyReportService(
        HttpClient? notionClient = null,
        HttpClient? dingTalkClient = null,
        Func<NotionSettings>? notionSettings = null,
        IDatabaseQueryProvider? database = null)
    {
        _database = database ?? new NotionDatabaseQueryProvider(notionClient, notionSettings);
        _dingTalkClient = dingTalkClient ?? new HttpClient { Timeout = TimeSpan.FromSeconds(30) };
    }

    public async Task<DailyReportBuildResult> BuildAsync(
        DailyReportJob settings,
        string template,
        DateTime businessDate,
        CancellationToken cancellationToken = default)
    {
        var stopwatch = System.Diagnostics.Stopwatch.StartNew();
        var metrics = new BuildMetrics();
        try
        {
            var result = await BuildCoreAsync(settings, template, businessDate, metrics, cancellationToken);
            return result with
            {
                QueryCount = metrics.QueryCount,
                RequestCount = metrics.RequestCount,
                CacheHits = metrics.CacheHits,
                ElapsedMilliseconds = stopwatch.ElapsedMilliseconds
            };
        }
        finally
        {
            var message = $"[DailyReport] Build complete: businessDate={businessDate:yyyy-MM-dd}, " +
                          $"queries={metrics.QueryCount}, requests={metrics.RequestCount}, " +
                          $"cacheHits={metrics.CacheHits}, elapsed={stopwatch.ElapsedMilliseconds} ms";
            System.Diagnostics.Debug.WriteLine(message);
            RuntimeEnvironment.WritePerformanceLog(message);
        }
    }

    private async Task<DailyReportBuildResult> BuildCoreAsync(
        DailyReportJob settings,
        string template,
        DateTime businessDate,
        BuildMetrics metrics,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(template))
            return new(false, "日报模板为空。", string.Empty);

        var tokens = settings.Fields
            .Where(field => !string.IsNullOrWhiteSpace(field.Placeholder) &&
                            template.Contains(field.Placeholder, StringComparison.Ordinal))
            .Select(field => (Marker: field.Placeholder, field.Token))
            .ToList();
        foreach (Match match in TokenRegex().Matches(template))
        {
            if (!DailyReportSettingsStore.TryDecodeToken(match.Value, out var legacyToken) || legacyToken is null)
                return new(false, "模板中存在损坏的字段标记。", string.Empty);
            tokens.Add((match.Value, legacyToken));
        }
        if (tokens.Count == 0 && FriendlyTokenRegex().IsMatch(template))
            return new(false, "模板中存在已经失效的 Notion 字段引用，请删除后重新插入。", string.Empty);
        if (tokens.Count == 0)
        {
            try
            {
                return new(true, "日报生成成功。", TodayRegex().Replace(template, match =>
                    businessDate.ToString(match.Groups[1].Value, CultureInfo.CurrentCulture)));
            }
            catch (FormatException)
            {
                return new(false, "today() 中的日期显示格式无效。", string.Empty);
            }
        }

        var replacements = new Dictionary<string, string>(StringComparer.Ordinal);
        foreach (var sourceGroup in tokens.GroupBy(item => item.Token.DataSourceId))
        {
            var binding = settings.Sources.FirstOrDefault(source => source.DataSourceId == sourceGroup.Key);
            if (binding is null)
                return new(false, $"找不到数据源“{sourceGroup.First().Token.DataSourceName}”的绑定。", string.Empty);

            foreach (var rangeGroup in sourceGroup
                         .Where(item => item.Token.QueryMode == "date-range")
                         .GroupBy(item => item.Token.DatePropertyId))
            {
                if (string.IsNullOrWhiteSpace(rangeGroup.Key))
                    return new(false, "日期范围字段配置不完整，请删除后重新插入。", string.Empty);
                var ranges = rangeGroup
                    .Select(item => ResolveRange(item.Token, businessDate))
                    .ToArray();
                if (ranges.Any(range => !range.Succeeded))
                    return new(false, ranges.First(range => !range.Succeeded).Message, string.Empty);
                var data = await _database.QueryDateRangeAsync(
                    binding.DataSourceId,
                    rangeGroup.Key,
                    ranges.Min(range => range.Start),
                    ranges.Max(range => range.End),
                    cancellationToken);
                metrics.Add(data, rangeGroup.Count() - 1);
                if (!data.Succeeded)
                    return new(false, data.Message, string.Empty);
                if (data.Records.Count == 0)
                    return new(false, $"“{binding.DataSourceName}”在所选日期范围内没有数据。", string.Empty);

                foreach (var item in rangeGroup)
                {
                    IReadOnlyList<DatabaseRecord> selectedPages;
                    if (item.Token.PeriodKind == "direct-month")
                    {
                        var monthPage = SelectBusinessMonthPage(data.Records, binding, businessDate);
                        if (!monthPage.Succeeded)
                            return new(false, monthPage.Message, string.Empty);
                        selectedPages = [monthPage.Page!];
                    }
                    else
                    {
                        var periodPages = SelectPeriodPages(data.Records, binding, item.Token, businessDate);
                        if (!periodPages.Succeeded)
                            return new(false, periodPages.Message, string.Empty);
                        selectedPages = periodPages.Pages;
                    }
                    var filteredPages = ApplyFilter(selectedPages, item.Token);
                    if (!filteredPages.Succeeded)
                        return new(false, filteredPages.Message, string.Empty);
                    var value = ReadAggregateValue(filteredPages.Pages, item.Token);
                    if (!value.Succeeded)
                        return new(false, value.Message, string.Empty);
                    try
                    {
                        replacements[item.Marker] = FormatValue(value.Value, value.Kind, item.Token.Format);
                    }
                    catch (FormatException)
                    {
                        return new(false,
                            $"字段“{item.Token.DataSourceName}.{item.Token.PropertyName}”的显示格式无效。",
                            string.Empty);
                    }
                }
            }

            foreach (var exactGroup in sourceGroup
                         .Where(item => item.Token.QueryMode == "exact-match")
                         .GroupBy(item => new
                         {
                             item.Token.ExactMatchPropertyId,
                             item.Token.ExactMatchValueKind,
                             item.Token.CustomStartDate
                         }))
            {
                if (string.IsNullOrWhiteSpace(exactGroup.Key.ExactMatchPropertyId) ||
                    exactGroup.Any(item => item.Token.ExactMatchPropertyType != "date" ||
                                           item.Token.ExactMatchValueKind is not ("business-month" or "specific-month")))
                    return new(false, "精确匹配字段配置不完整，请重新编辑。", string.Empty);
                var matchValue = exactGroup.Key.ExactMatchValueKind == "specific-month" &&
                                 DateOnly.TryParseExact(exactGroup.Key.CustomStartDate, "yyyy-MM-dd",
                                     CultureInfo.InvariantCulture, DateTimeStyles.None, out var selectedMonth)
                    ? new DateOnly(selectedMonth.Year, selectedMonth.Month, 1)
                    : new DateOnly(businessDate.Year, businessDate.Month, 1);
                var data = await _database.QueryExactMatchAsync(
                    binding.DataSourceId, exactGroup.Key.ExactMatchPropertyId, matchValue, cancellationToken);
                metrics.Add(data, exactGroup.Count() - 1);
                if (!data.Succeeded)
                    return new(false, data.Message, string.Empty);
                if (data.Records.Count != 1)
                    return new(false,
                        $"“{binding.DataSourceName}”中与 {matchValue:yyyy-MM} 匹配的记录数为 {data.Records.Count}，需要恰好 1 条。",
                        string.Empty);

                foreach (var item in exactGroup)
                {
                    var filteredPages = ApplyFilter(data.Records, item.Token);
                    if (!filteredPages.Succeeded)
                        return new(false, filteredPages.Message, string.Empty);
                    if (filteredPages.Pages.Count != 1)
                        return new(false, $"字段“{item.Token.PropertyName}”的附加条件没有匹配到唯一记录。", string.Empty);
                    var value = ReadAggregateValue(filteredPages.Pages, item.Token);
                    if (!value.Succeeded)
                        return new(false, value.Message, string.Empty);
                    try
                    {
                        replacements[item.Marker] = FormatValue(value.Value, value.Kind, item.Token.Format);
                    }
                    catch (FormatException)
                    {
                        return new(false,
                            $"字段“{item.Token.DataSourceName}.{item.Token.PropertyName}”的显示格式无效。",
                            string.Empty);
                    }
                }
            }

            var legacyTokens = sourceGroup.Where(item => item.Token.QueryMode is not ("date-range" or "exact-match")).ToArray();
            if (legacyTokens.Any(item => string.IsNullOrWhiteSpace(item.Token.ViewId)))
                return new(false, "模板中存在没有绑定 View 的旧字段，请删除后重新插入。", string.Empty);
            foreach (var viewGroup in legacyTokens.GroupBy(item => new
                     {
                         item.Token.ViewId,
                         item.Token.ViewName
                     }))
            {
                var data = await _database.QueryDatasetAsync(
                    binding.DataSourceId, viewGroup.Key.ViewId, cancellationToken);
                metrics.Add(data, viewGroup.Count() - 1);
                if (!data.Succeeded)
                    return new(false, data.Message, string.Empty);
                var pages = data.Records;
                if (pages.Count == 0)
                    return new(false,
                        $"“{binding.DataSourceName}”的“{viewGroup.Key.ViewName}”View 没有数据。",
                        string.Empty);

                foreach (var item in viewGroup)
                {
                    IReadOnlyList<DatabaseRecord> selectedPages = pages;
                    if (SupportsPeriods(item.Token.ViewName))
                    {
                        var periodPages = SelectPeriodPages(pages, binding, item.Token, businessDate);
                        if (!periodPages.Succeeded)
                            return new(false, periodPages.Message, string.Empty);
                        selectedPages = periodPages.Pages;
                    }
                    else if (item.Token.PeriodKind == "direct-month")
                    {
                        var monthPage = SelectBusinessMonthPage(pages, binding, businessDate);
                        if (!monthPage.Succeeded)
                            return new(false, monthPage.Message, string.Empty);
                        selectedPages = [monthPage.Page!];
                    }
                    else if (string.IsNullOrWhiteSpace(item.Token.PeriodKind) &&
                             TrySelectLegacyBusinessMonthPage(pages, binding, businessDate, out var monthPage))
                    {
                        if (monthPage is null)
                            return new(false,
                                $"“{binding.DataSourceName}”的“{item.Token.ViewName}”View 中没有 {businessDate:yyyy-MM} 月记录。",
                                string.Empty);
                        selectedPages = [monthPage];
                    }
                    var value = ReadAggregateValue(selectedPages, item.Token);
                    if (!value.Succeeded)
                        return new(false, value.Message, string.Empty);
                    try
                    {
                        replacements[item.Marker] = FormatValue(value.Value, value.Kind, item.Token.Format);
                    }
                    catch (FormatException)
                    {
                        return new(false,
                            $"字段“{item.Token.DataSourceName}.{item.Token.PropertyName}”的显示格式无效。",
                            string.Empty);
                    }
                }
            }
        }

        var output = replacements.Aggregate(template,
            (current, replacement) => current.Replace(
                replacement.Key, replacement.Value, StringComparison.Ordinal));
        try
        {
            output = TodayRegex().Replace(output, match =>
                businessDate.ToString(match.Groups[1].Value, CultureInfo.CurrentCulture));
        }
        catch (FormatException)
        {
            return new(false, "today() 中的日期显示格式无效。", string.Empty);
        }
        return new(true, "日报生成成功。", output);
    }

    public async Task<DailyReportSendResult> SendAsync(
        string webhook,
        string secret,
        string text,
        CancellationToken cancellationToken = default)
    {
        if (!Uri.TryCreate(webhook, UriKind.Absolute, out var uri) || uri.Scheme != Uri.UriSchemeHttps)
            return new(false, "钉钉 Webhook 必须是有效的 HTTPS 地址。");
        if (string.IsNullOrWhiteSpace(secret))
            return new(false, "钉钉加签 Secret 为空。");

        var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds().ToString(CultureInfo.InvariantCulture);
        using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secret));
        var signature = Convert.ToBase64String(
            hmac.ComputeHash(Encoding.UTF8.GetBytes($"{timestamp}\n{secret}")));
        var separator = string.IsNullOrEmpty(uri.Query) ? "?" : "&";
        var signedUri = new Uri($"{uri}{separator}timestamp={timestamp}&sign={Uri.EscapeDataString(signature)}");
        var body = JsonSerializer.Serialize(new
        {
            msgtype = "text",
            text = new { content = text }
        });

        try
        {
            using var response = await _dingTalkClient.PostAsync(
                signedUri,
                new StringContent(body, Encoding.UTF8, "application/json"),
                cancellationToken);
            var responseText = await response.Content.ReadAsStringAsync(cancellationToken);
            if (!response.IsSuccessStatusCode)
                return new(false, $"钉钉返回 HTTP {(int)response.StatusCode}。");
            using var document = JsonDocument.Parse(responseText);
            var errorCode = document.RootElement.TryGetProperty("errcode", out var code)
                ? code.GetInt32()
                : -1;
            if (errorCode == 0) return new(true, "钉钉发送成功。");
            var message = document.RootElement.TryGetProperty("errmsg", out var error)
                ? error.GetString()
                : "未知错误";
            return new(false, $"钉钉拒绝发送：{message}");
        }
        catch (Exception ex) when (ex is HttpRequestException or TaskCanceledException or JsonException)
        {
            return new(false, $"钉钉连接失败：{ex.Message}");
        }
    }

    public async Task<DailyReportSendResult> CheckConnectionAsync(
        string webhook,
        CancellationToken cancellationToken = default)
    {
        if (!Uri.TryCreate(webhook, UriKind.Absolute, out var uri) || uri.Scheme != Uri.UriSchemeHttps)
            return new(false, "钉钉 Webhook 必须是有效的 HTTPS 地址。");

        try
        {
            using var request = new HttpRequestMessage(HttpMethod.Head, uri);
            using var response = await _dingTalkClient.SendAsync(
                request, HttpCompletionOption.ResponseHeadersRead, cancellationToken);
            return new(true, "钉钉网络连通；Webhook 和 Secret 将在测试发送时验证。");
        }
        catch (Exception ex) when (ex is HttpRequestException or TaskCanceledException)
        {
            return new(false, $"钉钉连接失败：{ex.Message}");
        }
    }

    public async Task<IReadOnlyList<DailyReportViewResult>> GetViewsAsync(
        string token,
        string dataSourceId,
        CancellationToken cancellationToken = default)
        => (await _database.GetDatasetsAsync(dataSourceId, cancellationToken))
            .Select(view => new DailyReportViewResult(true, string.Empty, view.Id, view.Name))
            .ToArray();

    private static (bool Succeeded, string Message, object? Value, string Kind) ReadAggregateValue(
        IReadOnlyList<DatabaseRecord> pages,
        DailyReportFieldToken token)
    {
        if (token.AggregateKind == "value" && pages.Count == 1)
            return ReadProperty(pages[0], token);
        if (token.AggregateKind is not ("" or "sum"))
            return (false, $"不支持统计方式“{token.AggregateKind}”。", null, string.Empty);
        var values = pages.Select(page => ReadProperty(page, token)).ToArray();
        foreach (var value in values)
            if (!value.Succeeded) return value;
        if (values.Length == 1) return values[0];
        if (values.Any(value => value.Kind != "number" || value.Value is not IConvertible))
            return (false,
                $"查询结果包含多条记录，字段“{token.PropertyName}”只有数值类型才能汇总。",
                null, string.Empty);
        return (true, string.Empty,
            values.Sum(value => Convert.ToDouble(value.Value, CultureInfo.InvariantCulture)), "number");
    }

    private static (bool Succeeded, string Message, IReadOnlyList<DatabaseRecord> Pages) SelectPeriodPages(
        IReadOnlyList<DatabaseRecord> pages,
        DailyReportSourceBinding binding,
        DailyReportFieldToken token,
        DateTime businessDate)
    {
        var periodKind = token.QueryMode == "date-range" && !string.IsNullOrWhiteSpace(token.QueryRangeKind)
            ? token.QueryRangeKind
            : token.PeriodKind;
        var datePropertyId = token.QueryMode == "date-range" ? token.DatePropertyId : binding.MatchPropertyId;
        var datePropertyName = token.QueryMode == "date-range" ? token.DatePropertyName : binding.MatchPropertyName;
        if (string.IsNullOrWhiteSpace(datePropertyId) && string.IsNullOrWhiteSpace(datePropertyName))
            return (false, "字段没有可用的日期属性，请检查数据库日期字段后重新插入。", []);
        var range = ResolveRange(token, businessDate);
        if (!range.Succeeded)
            return (false, range.Message, []);

        var selected = new List<DatabaseRecord>();
        foreach (var page in pages)
        {
            if (!TryReadPageDate(page, datePropertyId, datePropertyName, out var pageDate))
                return (false, $"“{binding.DataSourceName}”中存在日期字段为空的记录。", []);
            var day = DateOnly.FromDateTime(pageDate);
            var included = day >= range.Start && day <= range.End;
            if (included) selected.Add(page);
        }
        if (selected.Count == 0)
        {
            var label = periodKind switch
            {
                "day" or "specific-date" => "日",
                "month" or "current-month" or "specific-month" => "月",
                "year" or "current-year" => "年",
                _ => "日期范围"
            };
            return (false, $"“{binding.DataSourceName}”中没有当前{label}口径的数据。", []);
        }
        return (true, string.Empty, selected);
    }

    private static bool TryReadPageDate(
        DatabaseRecord page,
        DailyReportSourceBinding binding,
        out DateTime date) => TryReadPageDate(
            page, binding.MatchPropertyId, binding.MatchPropertyName, out date);

    private static bool TryReadPageDate(
        DatabaseRecord page,
        string propertyId,
        string propertyName,
        out DateTime date)
    {
        date = default;
        var field = page.Fields.FirstOrDefault(candidate =>
            candidate.Id == propertyId || candidate.Name == propertyName);
        if (field?.Value is not DateTime value) return false;
        date = value;
        return true;
    }

    private static bool SupportsPeriods(string viewName) =>
        string.Equals(viewName.Trim(), "本年截止今日", StringComparison.CurrentCultureIgnoreCase);

    private static (bool Succeeded, string Message, DateOnly Start, DateOnly End) ResolveRange(
        DailyReportFieldToken token,
        DateTime businessDate)
    {
        var kind = token.QueryMode == "date-range" && !string.IsNullOrWhiteSpace(token.QueryRangeKind)
            ? token.QueryRangeKind
            : token.PeriodKind;
        DateOnly? start = DateOnly.TryParseExact(token.CustomStartDate, "yyyy-MM-dd",
            CultureInfo.InvariantCulture, DateTimeStyles.None, out var parsedStart) ? parsedStart : null;
        DateOnly? end = DateOnly.TryParseExact(token.CustomEndDate, "yyyy-MM-dd",
            CultureInfo.InvariantCulture, DateTimeStyles.None, out var parsedEnd) ? parsedEnd : null;
        return DatabaseDateRanges.Resolve(kind, DateOnly.FromDateTime(businessDate), start, end);
    }

    private static (bool Succeeded, string Message, IReadOnlyList<DatabaseRecord> Pages) ApplyFilter(
        IReadOnlyList<DatabaseRecord> pages,
        DailyReportFieldToken token)
    {
        if (string.IsNullOrWhiteSpace(token.FilterPropertyId))
            return (true, string.Empty, pages);
        if (token.FilterOperator != "equals")
            return (false, "附加条件仅支持 Equals。", []);
        var selected = new List<DatabaseRecord>();
        foreach (var page in pages)
        {
            var field = page.Fields.FirstOrDefault(candidate => candidate.Id == token.FilterPropertyId);
            if (field is null)
                return (false, $"筛选字段“{token.FilterPropertyName}”已不存在。", []);
            var actual = Convert.ToString(field.Value, CultureInfo.InvariantCulture) ?? string.Empty;
            if (string.Equals(actual, token.FilterValue, StringComparison.CurrentCultureIgnoreCase))
                selected.Add(page);
        }
        if (selected.Count == 0)
            return (false, $"附加条件“{token.FilterPropertyName} = {token.FilterValue}”没有匹配数据。", []);
        return (true, string.Empty, selected);
    }

    private static (bool Succeeded, string Message, DatabaseRecord? Page) SelectBusinessMonthPage(
        IReadOnlyList<DatabaseRecord> pages,
        DailyReportSourceBinding binding,
        DateTime businessDate)
    {
        if (binding.MatchPropertyType != "date" ||
            string.IsNullOrWhiteSpace(binding.MatchPropertyId) && string.IsNullOrWhiteSpace(binding.MatchPropertyName))
            return (false, "按业务月份直接获取需要绑定数据库中的日期字段。", null);
        var matches = pages
            .Where(page => TryReadPageDate(page, binding, out var date) &&
                           date.Year == businessDate.Year && date.Month == businessDate.Month)
            .ToList();
        return matches.Count switch
        {
            1 => (true, string.Empty, matches[0]),
            0 => (false, $"“{binding.DataSourceName}”中没有 {businessDate:yyyy-MM} 月记录。", null),
            _ => (false, $"“{binding.DataSourceName}”中存在多条 {businessDate:yyyy-MM} 月记录，无法直接获取唯一值。", null)
        };
    }

    private static bool TrySelectLegacyBusinessMonthPage(
        IReadOnlyList<DatabaseRecord> pages,
        DailyReportSourceBinding binding,
        DateTime businessDate,
        out DatabaseRecord? selected)
    {
        selected = null;
        if (pages.Count < 2 || binding.MatchPropertyType != "date") return false;
        var dated = new List<(DatabaseRecord Page, DateTime Date)>();
        foreach (var page in pages)
        {
            if (!TryReadPageDate(page, binding, out var date) || date.Day != 1) return false;
            dated.Add((page, date));
        }
        if (dated.GroupBy(item => (item.Date.Year, item.Date.Month)).Any(group => group.Count() > 1))
            return false;
        selected = dated.FirstOrDefault(item =>
            item.Date.Year == businessDate.Year && item.Date.Month == businessDate.Month).Page;
        return true;
    }

    private static (bool Succeeded, string Message, object? Value, string Kind) ReadProperty(
        DatabaseRecord page,
        DailyReportFieldToken token)
    {
        var property = page.Fields.FirstOrDefault(candidate =>
            candidate.Id == token.PropertyId || candidate.Name == token.PropertyName);
        if (property is null)
            return (false, $"字段“{token.DataSourceName}.{token.PropertyName}”已不存在。", null, string.Empty);
        var type = property.Type;
        var value = property.Value;
        return value is null || value is string text && string.IsNullOrWhiteSpace(text)
            ? (false, $"字段“{token.DataSourceName}.{token.PropertyName}”为空或类型不支持。", null, type)
            : (true, string.Empty, value, value is DateTime ? "date" : value is double or decimal or int or long ? "number" : type);
    }

    private static string FormatValue(object? value, string kind, string format)
    {
        if (value is DateTime date)
            return date.ToString(string.IsNullOrWhiteSpace(format) ? "yyyy-MM-dd" : format, CultureInfo.CurrentCulture);
        if (kind == "number" && value is IFormattable number)
            return number.ToString(string.IsNullOrWhiteSpace(format) ? "0.##" : format, CultureInfo.CurrentCulture);
        if (value is bool boolean) return boolean ? "是" : "否";
        return Convert.ToString(value, CultureInfo.CurrentCulture) ?? string.Empty;
    }

    private sealed class BuildMetrics
    {
        public int QueryCount { get; private set; }
        public int RequestCount { get; private set; }
        public int CacheHits { get; private set; }

        public void Add(DatabaseRecordSet data, int cacheHits)
        {
            QueryCount++;
            RequestCount += data.RequestCount;
            CacheHits += Math.Max(0, cacheHits);
        }
    }

    [GeneratedRegex(@"\{\{report:[A-Za-z0-9+/=]+\}\}")]
    private static partial Regex TokenRegex();

    [GeneratedRegex("prop\\(\\\"[^\\\"]+\\\"\\)")]
    private static partial Regex FriendlyTokenRegex();

    [GeneratedRegex("today\\(\\\"([^\\\"]+)\\\"\\)")]
    private static partial Regex TodayRegex();
}
