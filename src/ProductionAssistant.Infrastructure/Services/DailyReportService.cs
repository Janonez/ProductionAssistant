using System.Globalization;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public sealed partial class DailyReportService
{
    private const string NotionApiVersion = "2026-03-11";
    private readonly HttpClient _notionClient;
    private readonly HttpClient _dingTalkClient;

    public DailyReportService(HttpClient? notionClient = null, HttpClient? dingTalkClient = null)
    {
        _notionClient = notionClient ?? new HttpClient { Timeout = TimeSpan.FromSeconds(30) };
        _notionClient.BaseAddress ??= new Uri("https://api.notion.com/v1/");
        _dingTalkClient = dingTalkClient ?? new HttpClient { Timeout = TimeSpan.FromSeconds(30) };
    }

    public async Task<DailyReportBuildResult> BuildAsync(
        DailyReportJob settings,
        string template,
        DateTime businessDate,
        CancellationToken cancellationToken = default)
    {
        var notion = NotionSettingsStore.Load();
        if (string.IsNullOrWhiteSpace(notion.Token))
            return new(false, "尚未配置 Notion API 令牌。", string.Empty);
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
            if (binding is null || string.IsNullOrWhiteSpace(FirstNotBlank(
                    binding.MatchPropertyName, binding.DatePropertyName)))
                return new(false, $"数据源“{sourceGroup.First().Token.DataSourceName}”未配置业务日期字段。", string.Empty);

            var pageResult = await QuerySinglePageAsync(
                notion.Token, binding, businessDate, cancellationToken);
            if (!pageResult.Succeeded)
                return new(false, pageResult.Message, string.Empty);

            foreach (var item in sourceGroup)
            {
                var value = ReadProperty(pageResult.Page, item.Token);
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

    private async Task<(bool Succeeded, string Message, JsonElement Page)> QuerySinglePageAsync(
        string token,
        DailyReportSourceBinding binding,
        DateTime businessDate,
        CancellationToken cancellationToken)
    {
        var propertyId = FirstNotBlank(
            binding.MatchPropertyId, binding.DatePropertyId,
            binding.MatchPropertyName, binding.DatePropertyName);
        var propertyType = string.IsNullOrWhiteSpace(binding.MatchPropertyType)
            ? "date"
            : binding.MatchPropertyType;
        var period = string.IsNullOrWhiteSpace(binding.PeriodKind) ? "day" : binding.PeriodKind;
        var filter = BuildPeriodFilter(propertyId, propertyType, period, businessDate);
        if (filter is null)
            return (false, $"“{binding.DataSourceName}”的匹配字段类型不支持。", default);
        var body = JsonSerializer.Serialize(new { filter, page_size = 2 });
        using var request = new HttpRequestMessage(
            HttpMethod.Post, $"data_sources/{binding.DataSourceId}/query");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token.Trim());
        request.Headers.Add("Notion-Version", NotionApiVersion);
        request.Content = new StringContent(body, Encoding.UTF8, "application/json");
        try
        {
            using var response = await _notionClient.SendAsync(request, cancellationToken);
            if (!response.IsSuccessStatusCode)
                return (false, $"读取“{binding.DataSourceName}”失败：Notion HTTP {(int)response.StatusCode}。", default);
            using var document = JsonDocument.Parse(
                await response.Content.ReadAsStringAsync(cancellationToken));
            var pages = document.RootElement.GetProperty("results").EnumerateArray()
                .Select(page => page.Clone()).ToArray();
            return pages.Length switch
            {
                0 => (false, $"“{binding.DataSourceName}”没有匹配当前{PeriodLabel(period)}的记录。", default),
                > 1 => (false, $"“{binding.DataSourceName}”存在多条匹配当前{PeriodLabel(period)}的记录。", default),
                _ => (true, string.Empty, pages[0])
            };
        }
        catch (Exception ex) when (ex is HttpRequestException or TaskCanceledException or JsonException)
        {
            return (false, $"读取“{binding.DataSourceName}”失败：{ex.Message}", default);
        }
    }

    private static (bool Succeeded, string Message, object? Value, string Kind) ReadProperty(
        JsonElement page,
        DailyReportFieldToken token)
    {
        if (!page.TryGetProperty("properties", out var properties))
            return (false, "Notion 页面没有 properties。", null, string.Empty);
        JsonElement property = default;
        var found = false;
        foreach (var candidate in properties.EnumerateObject())
        {
            if ((candidate.Value.TryGetProperty("id", out var id) && id.GetString() == token.PropertyId) ||
                candidate.Name == token.PropertyName)
            {
                property = candidate.Value;
                found = true;
                break;
            }
        }
        if (!found)
            return (false, $"字段“{token.DataSourceName}.{token.PropertyName}”已不存在。", null, string.Empty);

        var type = property.TryGetProperty("type", out var typeElement)
            ? typeElement.GetString() ?? token.PropertyType
            : token.PropertyType;
        object? value = type switch
        {
            "number" => ReadNumber(property, "number"),
            "title" => ReadText(property, "title"),
            "rich_text" => ReadText(property, "rich_text"),
            "select" or "status" => ReadOption(property, type),
            "date" => ReadDateValue(property, "date"),
            "checkbox" => property.TryGetProperty("checkbox", out var checkbox) ? checkbox.GetBoolean() : null,
            "url" or "email" or "phone_number" => property.TryGetProperty(type, out var scalar) ? scalar.GetString() : null,
            "formula" => ReadFormula(property),
            "rollup" => ReadRollup(property),
            _ => null
        };
        return value is null || value is string text && string.IsNullOrWhiteSpace(text)
            ? (false, $"字段“{token.DataSourceName}.{token.PropertyName}”为空或类型不支持。", null, type)
            : (true, string.Empty, value, value is DateTime ? "date" : value is double or decimal or int or long ? "number" : type);
    }

    private static double? ReadNumber(JsonElement owner, string name) =>
        owner.TryGetProperty(name, out var value) && value.ValueKind == JsonValueKind.Number
            ? value.GetDouble()
            : null;

    private static string? ReadText(JsonElement owner, string name) =>
        owner.TryGetProperty(name, out var value) && value.ValueKind == JsonValueKind.Array
            ? string.Concat(value.EnumerateArray().Select(item =>
                item.TryGetProperty("plain_text", out var text) ? text.GetString() : string.Empty))
            : null;

    private static string? ReadOption(JsonElement owner, string name) =>
        owner.TryGetProperty(name, out var value) && value.ValueKind == JsonValueKind.Object &&
        value.TryGetProperty("name", out var option) ? option.GetString() : null;

    private static DateTime? ReadDateValue(JsonElement owner, string name) =>
        owner.TryGetProperty(name, out var value) && value.ValueKind == JsonValueKind.Object &&
        value.TryGetProperty("start", out var start) && DateTime.TryParse(start.GetString(), out var date)
            ? date
            : null;

    private static object? ReadFormula(JsonElement owner)
    {
        if (!owner.TryGetProperty("formula", out var formula) ||
            !formula.TryGetProperty("type", out var type)) return null;
        return type.GetString() switch
        {
            "number" => ReadNumber(formula, "number"),
            "string" => formula.TryGetProperty("string", out var text) ? text.GetString() : null,
            "date" => ReadDateValue(formula, "date"),
            "boolean" => formula.TryGetProperty("boolean", out var boolean) ? boolean.GetBoolean() : null,
            _ => null
        };
    }

    private static object? ReadRollup(JsonElement owner)
    {
        if (!owner.TryGetProperty("rollup", out var rollup) ||
            !rollup.TryGetProperty("type", out var type)) return null;
        return type.GetString() switch
        {
            "number" => ReadNumber(rollup, "number"),
            "date" => ReadDateValue(rollup, "date"),
            _ => null
        };
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

    private static object? BuildPeriodFilter(
        string property,
        string propertyType,
        string period,
        DateTime businessDate)
    {
        if (string.IsNullOrWhiteSpace(property)) return null;
        if (propertyType == "date")
        {
            if (period == "day")
                return new Dictionary<string, object>
                {
                    ["property"] = property,
                    ["date"] = new { equals = businessDate.ToString("yyyy-MM-dd") }
                };
            var start = period == "month"
                ? new DateTime(businessDate.Year, businessDate.Month, 1)
                : new DateTime(businessDate.Year, 1, 1);
            var end = period == "month" ? start.AddMonths(1) : start.AddYears(1);
            return new Dictionary<string, object>
            {
                ["and"] = new object[]
                {
                    new Dictionary<string, object>
                    {
                        ["property"] = property,
                        ["date"] = new { on_or_after = start.ToString("yyyy-MM-dd") }
                    },
                    new Dictionary<string, object>
                    {
                        ["property"] = property,
                        ["date"] = new { before = end.ToString("yyyy-MM-dd") }
                    }
                }
            };
        }

        var key = period switch
        {
            "month" => businessDate.ToString("yyyy-MM"),
            "year" => businessDate.ToString("yyyy"),
            _ => businessDate.ToString("yyyy-MM-dd")
        };
        var operatorName = propertyType switch
        {
            "title" => "title",
            "rich_text" => "rich_text",
            "select" => "select",
            "status" => "status",
            _ => string.Empty
        };
        return operatorName.Length == 0 ? null : new Dictionary<string, object>
        {
            ["property"] = property,
            [operatorName] = new { equals = key }
        };
    }

    private static string FirstNotBlank(params string[] values) =>
        values.FirstOrDefault(value => !string.IsNullOrWhiteSpace(value)) ?? string.Empty;

    private static string PeriodLabel(string period) => period switch
    {
        "month" => "月份",
        "year" => "年份",
        _ => "日期"
    };

    [GeneratedRegex(@"\{\{report:[A-Za-z0-9+/=]+\}\}")]
    private static partial Regex TokenRegex();

    [GeneratedRegex("prop\\(\\\"[^\\\"]+\\\"\\)")]
    private static partial Regex FriendlyTokenRegex();

    [GeneratedRegex("today\\(\\\"([^\\\"]+)\\\"\\)")]
    private static partial Regex TodayRegex();
}
