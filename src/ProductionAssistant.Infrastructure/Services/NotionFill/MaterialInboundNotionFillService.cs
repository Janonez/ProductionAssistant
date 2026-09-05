using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public sealed class MaterialInboundNotionFillService
{
    private const string ApiVersion = "2026-03-11";
    private readonly HttpClient _client;
    private readonly INotionImportService _notion;
    private readonly Func<NotionSettings> _settings;

    public MaterialInboundNotionFillService(
        HttpClient? client = null,
        INotionImportService? notion = null,
        Func<NotionSettings>? settings = null)
    {
        _client = client ?? new HttpClient { Timeout = TimeSpan.FromSeconds(30) };
        _client.BaseAddress ??= new Uri("https://api.notion.com/v1/");
        _notion = notion ?? new NotionImportService();
        _settings = settings ?? NotionSettingsStore.Load;
    }

    public async Task<NotionFillPreview> PreviewAsync(
        NotionFillJob job,
        DateOnly businessDate,
        CancellationToken cancellationToken = default)
    {
        ValidateJob(job);
        var notionSettings = _settings();
        if (string.IsNullOrWhiteSpace(notionSettings.Token))
            throw new InvalidOperationException("请先在系统设置中配置 Notion 连接。");

        TargetSchema schema;
        try
        {
            schema = await ResolveSchemaAsync(job, notionSettings.Token, cancellationToken);
        }
        catch (Exception ex) when (ex is not OperationCanceledException)
        {
            throw new InvalidOperationException($"检查 Notion 目标数据库结构失败：{ex.Message}", ex);
        }
        var summary = await ReadSourceAsync(job, businessDate, cancellationToken);
        int existing;
        try
        {
            existing = await CountExistingAsync(
                notionSettings.Token, job.TargetDataSourceId, schema.Date.Id, businessDate, cancellationToken);
        }
        catch (Exception ex) when (ex is not OperationCanceledException)
        {
            throw new InvalidOperationException($"检查 Notion 目标日期是否已存在失败：{ex.Message}", ex);
        }
        if (existing > 1)
            throw new InvalidOperationException($"Notion 中 {businessDate:yyyy-MM-dd} 已存在 {existing} 条记录，请先人工处理重复数据。");
        return new(summary, existing == 1, existing == 1
            ? "目标日期已有记录，正式执行时不会重复新增。"
            : "93系统读取成功，目标日期可以新增。");
    }

    public static async Task<DailyMaterialInboundSummary> ReadSourceAsync(
        NotionFillJob job,
        DateOnly businessDate,
        CancellationToken cancellationToken = default)
    {
        ValidateSource(job);
        string password;
        try
        {
            password = NotionFillSettingsStore.ReadPassword(job);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("93系统密码读取失败，请重新输入密码并保存后再测试。", ex);
        }

        try
        {
            using var reader = new Internal93MaterialInboundClient(new Internal93Options
            {
                BaseUrl = job.BaseUrl,
                SourcePageUrl = job.SourcePageUrl,
                Username = job.Username,
                Password = password
            });
            return await reader.GetDailySummaryAsync(businessDate, cancellationToken);
        }
        catch (Exception ex) when (ex is not OperationCanceledException)
        {
            throw new InvalidOperationException(
                $"读取 93 系统材料入库失败（{job.SourcePageUrl}）：{ex.Message}", ex);
        }
    }

    public async Task CreateAsync(
        NotionFillJob job,
        NotionFillPreview preview,
        CancellationToken cancellationToken = default)
    {
        if (preview.TargetRecordExists) return;
        var notionSettings = _settings();
        if (string.IsNullOrWhiteSpace(notionSettings.Token))
            throw new InvalidOperationException("请先在系统设置中配置 Notion 连接。");
        var schema = await ResolveSchemaAsync(job, notionSettings.Token, cancellationToken);
        var date = preview.Summary.Date;
        var properties = new Dictionary<string, object>
        {
            [schema.Title.Name] = new
            {
                title = new[] { new { text = new { content = $"{date:yyyy-MM-dd} 入库" } } }
            },
            [schema.Date.Name] = new { date = new { start = date.ToString("yyyy-MM-dd"), end = (string?)null } },
            [schema.Plate.Name] = new { number = preview.Summary.PlateWeight },
            [schema.Section.Name] = new { number = preview.Summary.SectionWeight }
        };
        using var request = CreateRequest(HttpMethod.Post, "pages", notionSettings.Token,
            JsonSerializer.Serialize(new
            {
                parent = new { type = "data_source_id", data_source_id = job.TargetDataSourceId },
                template = new { type = "none" },
                properties
            }));
        using var response = await _client.SendAsync(request, cancellationToken);
        if (!response.IsSuccessStatusCode)
            throw new InvalidOperationException($"Notion 新增失败：{await ReadErrorAsync(response, cancellationToken)}");
    }

    private async Task<TargetSchema> ResolveSchemaAsync(
        NotionFillJob job,
        string token,
        CancellationToken cancellationToken)
    {
        var result = await _notion.GetSchemaAsync(token, job.TargetDataSourceId, cancellationToken);
        if (!result.Succeeded) throw new InvalidOperationException(result.Message);
        var title = RequireProperty(result.Properties, "业务", "title");
        var date = RequireProperty(result.Properties, "日期", "date");
        var plate = RequireProperty(result.Properties, "板材", "number");
        var section = RequireProperty(result.Properties, "型材", "number");
        return new(title, date, plate, section);
    }

    private async Task<int> CountExistingAsync(
        string token,
        string dataSourceId,
        string datePropertyId,
        DateOnly date,
        CancellationToken cancellationToken)
    {
        using var request = CreateRequest(HttpMethod.Post, $"data_sources/{dataSourceId}/query", token,
            JsonSerializer.Serialize(new
            {
                filter = new { property = datePropertyId, date = new { equals = date.ToString("yyyy-MM-dd") } },
                page_size = 3
            }));
        using var response = await _client.SendAsync(request, cancellationToken);
        if (!response.IsSuccessStatusCode)
            throw new InvalidOperationException($"读取 Notion 已有记录失败：{await ReadErrorAsync(response, cancellationToken)}");
        using var document = JsonDocument.Parse(await response.Content.ReadAsStringAsync(cancellationToken));
        return document.RootElement.GetProperty("results").GetArrayLength();
    }

    private static NotionPropertyOption RequireProperty(
        IReadOnlyList<NotionPropertyOption> properties,
        string name,
        string type) =>
        properties.FirstOrDefault(property =>
            property.Type == type && string.Equals(property.Name, name, StringComparison.Ordinal))
        ?? throw new InvalidOperationException($"原材料入库数据库缺少“{name}”{type}字段。");

    private static void ValidateJob(NotionFillJob job)
    {
        ValidateSource(job);
        if (string.IsNullOrWhiteSpace(job.TargetDataSourceId))
            throw new InvalidOperationException("没有找到原材料入库数据库，请先刷新 Notion 数据库目录。");
    }

    private static void ValidateSource(NotionFillJob job)
    {
        if (!Uri.TryCreate(job.BaseUrl, UriKind.Absolute, out var uri) || uri.Scheme is not ("http" or "https"))
            throw new InvalidOperationException("93系统地址无效。");
        if (!Uri.TryCreate(job.SourcePageUrl, UriKind.Absolute, out var sourcePage) ||
            sourcePage.Scheme is not ("http" or "https"))
            throw new InvalidOperationException("93系统业务页面地址无效。");
        if (string.IsNullOrWhiteSpace(job.Username) || string.IsNullOrWhiteSpace(job.EncryptedPassword))
            throw new InvalidOperationException("请先配置93系统用户名和密码。");
    }

    private static HttpRequestMessage CreateRequest(
        HttpMethod method,
        string path,
        string token,
        string json)
    {
        var request = new HttpRequestMessage(method, path);
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token.Trim());
        request.Headers.Add("Notion-Version", ApiVersion);
        request.Content = new StringContent(json, Encoding.UTF8, "application/json");
        return request;
    }

    private static async Task<string> ReadErrorAsync(
        HttpResponseMessage response,
        CancellationToken cancellationToken)
    {
        var content = await response.Content.ReadAsStringAsync(cancellationToken);
        try
        {
            using var document = JsonDocument.Parse(content);
            if (document.RootElement.TryGetProperty("message", out var message))
                return message.GetString() ?? $"HTTP {(int)response.StatusCode}";
        }
        catch (JsonException)
        {
        }
        return $"HTTP {(int)response.StatusCode}";
    }

    private sealed record TargetSchema(
        NotionPropertyOption Title,
        NotionPropertyOption Date,
        NotionPropertyOption Plate,
        NotionPropertyOption Section);
}
