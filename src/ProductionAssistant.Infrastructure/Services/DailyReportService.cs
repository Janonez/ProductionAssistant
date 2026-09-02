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
            if (sourceGroup.Any(item => string.IsNullOrWhiteSpace(item.Token.ViewId)))
                return new(false, "模板中存在没有绑定 View 的旧字段，请删除后重新插入。", string.Empty);

            foreach (var viewGroup in sourceGroup.GroupBy(item => new
                     {
                         item.Token.ViewId,
                         item.Token.ViewName
                     }))
            {
                var data = await _database.QueryDatasetAsync(
                    binding.DataSourceId, viewGroup.Key.ViewId, cancellationToken);
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
                        var periodPages = SelectPeriodPages(pages, binding, item.Token.PeriodKind, businessDate);
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
                    var value = ReadViewValue(selectedPages, item.Token);
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

    private static (bool Succeeded, string Message, object? Value, string Kind) ReadViewValue(
        IReadOnlyList<DatabaseRecord> pages,
        DailyReportFieldToken token)
    {
        var values = pages.Select(page => ReadProperty(page, token)).ToArray();
        foreach (var value in values)
            if (!value.Succeeded) return value;
        if (values.Length == 1) return values[0];
        if (values.Any(value => value.Kind != "number" || value.Value is not IConvertible))
            return (false,
                $"View“{token.ViewName}”包含多条记录，字段“{token.PropertyName}”只有数值类型才能汇总。",
                null, string.Empty);
        return (true, string.Empty,
            values.Sum(value => Convert.ToDouble(value.Value, CultureInfo.InvariantCulture)), "number");
    }

    private static (bool Succeeded, string Message, IReadOnlyList<DatabaseRecord> Pages) SelectPeriodPages(
        IReadOnlyList<DatabaseRecord> pages,
        DailyReportSourceBinding binding,
        string periodKind,
        DateTime businessDate)
    {
        if (periodKind is not ("day" or "month" or "year"))
            return (false, "“本年截止今日”View 的字段没有绑定日、月或年统计口径，请删除后重新插入。", []);
        if (binding.MatchPropertyType != "date" || string.IsNullOrWhiteSpace(binding.MatchPropertyName))
            return (false, "“本年截止今日”View 没有可用的日期字段，请检查数据库日期字段后重新插入。", []);
        var range = DatabaseDateRanges.Resolve(periodKind, DateOnly.FromDateTime(businessDate));
        if (!range.Succeeded)
            return (false, range.Message, []);

        var selected = new List<DatabaseRecord>();
        foreach (var page in pages)
        {
            if (!TryReadPageDate(page, binding, out var pageDate))
                return (false, $"“{binding.DataSourceName}”的“本年截止今日”View 中存在日期字段为空的记录。", []);
            var day = DateOnly.FromDateTime(pageDate);
            var included = day >= range.Start && day <= range.End;
            if (included) selected.Add(page);
        }
        if (selected.Count == 0)
        {
            var label = periodKind switch { "day" => "日", "month" => "月", _ => "年" };
            return (false, $"“{binding.DataSourceName}”的“本年截止今日”View 中没有当前{label}口径的数据。", []);
        }
        return (true, string.Empty, selected);
    }

    private static bool TryReadPageDate(
        DatabaseRecord page,
        DailyReportSourceBinding binding,
        out DateTime date)
    {
        date = default;
        var field = page.Fields.FirstOrDefault(candidate =>
            candidate.Id == binding.MatchPropertyId || candidate.Name == binding.MatchPropertyName);
        if (field?.Value is not DateTime value) return false;
        date = value;
        return true;
    }

    private static bool SupportsPeriods(string viewName) =>
        string.Equals(viewName.Trim(), "本年截止今日", StringComparison.CurrentCultureIgnoreCase);

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

    [GeneratedRegex(@"\{\{report:[A-Za-z0-9+/=]+\}\}")]
    private static partial Regex TokenRegex();

    [GeneratedRegex("prop\\(\\\"[^\\\"]+\\\"\\)")]
    private static partial Regex FriendlyTokenRegex();

    [GeneratedRegex("today\\(\\\"([^\\\"]+)\\\"\\)")]
    private static partial Regex TodayRegex();
}
