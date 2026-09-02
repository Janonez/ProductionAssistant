using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace ProductionAssistant.Services;

public sealed class NotionDatabaseQueryProvider : IDatabaseQueryProvider
{
    private const string ApiVersion = "2026-03-11";
    private readonly HttpClient _client;
    private readonly Func<NotionSettings> _settings;
    private readonly INotionImportService _notion;

    public NotionDatabaseQueryProvider(
        HttpClient? client = null,
        Func<NotionSettings>? settings = null,
        INotionImportService? notion = null)
    {
        _client = client ?? new HttpClient { Timeout = TimeSpan.FromSeconds(30) };
        _client.BaseAddress ??= new Uri("https://api.notion.com/v1/");
        _settings = settings ?? NotionSettingsStore.Load;
        _notion = notion ?? new NotionImportService();
    }

    public string Name => "Notion";

    public IReadOnlyList<DatabaseSourceInfo> GetSources() => _settings().CachedDataSources
        .Select(source => new DatabaseSourceInfo(
            source.Id, source.Name, source.Path, DailyReportPresentation.BusinessSection(source.Path)))
        .OrderBy(source => source.Path)
        .ToArray();

    public async Task<DatabaseSchemaResult> GetSchemaAsync(
        string sourceId,
        CancellationToken cancellationToken = default)
    {
        var settings = _settings();
        if (string.IsNullOrWhiteSpace(settings.Token))
            return new(false, "尚未配置数据库连接。", []);
        var schema = await _notion.GetSchemaAsync(settings.Token, sourceId, cancellationToken);
        return schema.Succeeded
            ? new(true, string.Empty, schema.Properties
                .Select(field => new DatabaseFieldInfo(field.Id, field.Name, field.Type)).ToArray())
            : new(false, schema.Message, []);
    }

    public async Task<IReadOnlyList<DatabaseDatasetInfo>> GetDatasetsAsync(
        string sourceId,
        CancellationToken cancellationToken = default)
    {
        var token = RequireToken();
        var databaseId = await ResolveDatabaseIdAsync(token, sourceId, cancellationToken);
        var datasets = new List<DatabaseDatasetInfo>();
        string? cursor = null;
        do
        {
            var path = $"views?database_id={Uri.EscapeDataString(databaseId)}&page_size=100";
            if (!string.IsNullOrWhiteSpace(cursor))
                path += $"&start_cursor={Uri.EscapeDataString(cursor)}";
            using var response = await SendAsync(HttpMethod.Get, path, token, null, cancellationToken);
            if (!response.IsSuccessStatusCode)
                throw new InvalidOperationException($"读取数据库 View 失败：HTTP {(int)response.StatusCode}。");
            using var document = JsonDocument.Parse(await response.Content.ReadAsStringAsync(cancellationToken));
            foreach (var item in document.RootElement.GetProperty("results").EnumerateArray())
            {
                var id = ReadObjectId(item, "view");
                if (string.IsNullOrWhiteSpace(id)) continue;
                using var viewResponse = await SendAsync(HttpMethod.Get, $"views/{id}", token, null, cancellationToken);
                if (!viewResponse.IsSuccessStatusCode) continue;
                using var viewDocument = JsonDocument.Parse(await viewResponse.Content.ReadAsStringAsync(cancellationToken));
                if (!BelongsToSourceDatabase(viewDocument.RootElement, sourceId, databaseId)) continue;
                var name = viewDocument.RootElement.TryGetProperty("name", out var value)
                    ? value.GetString() ?? string.Empty
                    : string.Empty;
                datasets.Add(new(id, name));
            }
            cursor = ReadNextCursor(document.RootElement);
        } while (!string.IsNullOrWhiteSpace(cursor));
        return datasets;
    }

    public async Task<DatabaseRecordSet> QueryDatasetAsync(
        string sourceId,
        string datasetId,
        CancellationToken cancellationToken = default)
    {
        var settings = _settings();
        if (string.IsNullOrWhiteSpace(settings.Token))
            return new(false, "尚未配置数据库连接。", "", "", []);
        var source = settings.CachedDataSources.FirstOrDefault(item => item.Id == sourceId);
        var sourceName = source?.Name ?? sourceId;
        var datasetName = datasetId;
        try
        {
            var databaseId = source is null
                ? string.Empty
                : await ResolveDatabaseIdAsync(settings.Token, sourceId, cancellationToken);
            using (var viewResponse = await SendAsync(
                       HttpMethod.Get, $"views/{datasetId}", settings.Token, null, cancellationToken))
            {
                if (!viewResponse.IsSuccessStatusCode && !string.IsNullOrWhiteSpace(databaseId))
                    return new(false, $"读取 View 失败：HTTP {(int)viewResponse.StatusCode}。",
                        sourceName, datasetName, []);
                if (viewResponse.IsSuccessStatusCode)
                {
                    using var viewDocument = JsonDocument.Parse(
                        await viewResponse.Content.ReadAsStringAsync(cancellationToken));
                    if (!string.IsNullOrWhiteSpace(databaseId) &&
                        !BelongsToSourceDatabase(viewDocument.RootElement, sourceId, databaseId))
                        return new(false, "所选 View 不属于当前数据库。", sourceName, datasetName, []);
                    datasetName = viewDocument.RootElement.TryGetProperty("name", out var name)
                        ? name.GetString() ?? datasetId
                        : datasetId;
                }
            }

            var viewIds = await QueryViewPageIdsAsync(settings.Token, datasetId, cancellationToken);
            if (!viewIds.Succeeded)
                return new(false, viewIds.Message, sourceName, datasetName, []);
            var pages = await QuerySourcePagesAsync(settings.Token, sourceId, cancellationToken);
            if (!pages.Succeeded)
                return new(false, pages.Message, sourceName, datasetName, []);
            var records = pages.Pages
                .Where(page => viewIds.PageIds.Contains(NormalizeId(ReadObjectId(page, "page"))))
                .Select(ToRecord)
                .ToArray();
            return new(true, "数据库查询成功。", sourceName, datasetName, records);
        }
        catch (Exception ex) when (ex is HttpRequestException or TaskCanceledException or JsonException)
        {
            return new(false, $"读取数据库失败：{ex.Message}", sourceName, datasetName, []);
        }
    }

    private async Task<(bool Succeeded, string Message, HashSet<string> PageIds)> QueryViewPageIdsAsync(
        string token,
        string viewId,
        CancellationToken cancellationToken)
    {
        var ids = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        string queryId = string.Empty;
        try
        {
            using var firstResponse = await SendAsync(
                HttpMethod.Post, $"views/{viewId}/queries", token,
                JsonSerializer.Serialize(new { page_size = 100 }), cancellationToken);
            if (!firstResponse.IsSuccessStatusCode)
                return (false, $"执行 View 失败：HTTP {(int)firstResponse.StatusCode}。", ids);
            using var firstDocument = JsonDocument.Parse(
                await firstResponse.Content.ReadAsStringAsync(cancellationToken));
            queryId = firstDocument.RootElement.GetProperty("id").GetString() ?? string.Empty;
            if (IsIncomplete(firstDocument.RootElement))
                return (false, "View 返回了不完整结果，已停止查询。", ids);
            AddPageIds(firstDocument.RootElement, ids);
            if (ids.Count >= 10_000)
                return (false, "View 达到 10,000 条查询上限，已停止查询。", ids);
            var cursor = ReadNextCursor(firstDocument.RootElement);
            while (!string.IsNullOrWhiteSpace(cursor))
            {
                using var response = await SendAsync(HttpMethod.Get,
                    $"views/{viewId}/queries/{queryId}?page_size=100&start_cursor={Uri.EscapeDataString(cursor)}",
                    token, null, cancellationToken);
                if (!response.IsSuccessStatusCode)
                    return (false, $"读取 View 分页失败：HTTP {(int)response.StatusCode}。", ids);
                using var document = JsonDocument.Parse(await response.Content.ReadAsStringAsync(cancellationToken));
                if (IsIncomplete(document.RootElement))
                    return (false, "View 返回了不完整结果，已停止查询。", ids);
                AddPageIds(document.RootElement, ids);
                if (ids.Count >= 10_000)
                    return (false, "View 达到 10,000 条查询上限，已停止查询。", ids);
                cursor = ReadNextCursor(document.RootElement);
            }
            return (true, string.Empty, ids);
        }
        finally
        {
            if (!string.IsNullOrWhiteSpace(queryId))
            {
                try
                {
                    using var _ = await SendAsync(
                        HttpMethod.Delete, $"views/{viewId}/queries/{queryId}", token, null, cancellationToken);
                }
                catch (Exception) { }
            }
        }
    }

    private async Task<(bool Succeeded, string Message, IReadOnlyList<JsonElement> Pages)> QuerySourcePagesAsync(
        string token,
        string sourceId,
        CancellationToken cancellationToken)
    {
        var pages = new List<JsonElement>();
        string? cursor = null;
        do
        {
            var values = new Dictionary<string, object> { ["page_size"] = 100 };
            if (!string.IsNullOrWhiteSpace(cursor)) values["start_cursor"] = cursor;
            using var response = await SendAsync(HttpMethod.Post, $"data_sources/{sourceId}/query", token,
                JsonSerializer.Serialize(values), cancellationToken);
            if (!response.IsSuccessStatusCode)
                return (false, $"读取数据库失败：HTTP {(int)response.StatusCode}。", []);
            using var document = JsonDocument.Parse(await response.Content.ReadAsStringAsync(cancellationToken));
            pages.AddRange(document.RootElement.GetProperty("results").EnumerateArray().Select(page => page.Clone()));
            cursor = ReadNextCursor(document.RootElement);
        } while (!string.IsNullOrWhiteSpace(cursor));
        return (true, string.Empty, pages);
    }

    private static DatabaseRecord ToRecord(JsonElement page)
    {
        var fields = new List<DatabaseFieldValue>();
        if (page.TryGetProperty("properties", out var properties))
            foreach (var property in properties.EnumerateObject())
            {
                var id = property.Value.TryGetProperty("id", out var idValue)
                    ? idValue.GetString() ?? property.Name
                    : property.Name;
                var type = property.Value.TryGetProperty("type", out var typeValue)
                    ? typeValue.GetString() ?? string.Empty
                    : string.Empty;
                fields.Add(new(id, property.Name, type, ReadValue(property.Value, type)));
            }
        return new(ReadObjectId(page, "page"), fields);
    }

    private static object? ReadValue(JsonElement property, string type) => type switch
    {
        "number" => ReadNumber(property, "number"),
        "title" => ReadText(property, "title"),
        "rich_text" => ReadText(property, "rich_text"),
        "select" or "status" => ReadOption(property, type),
        "date" => ReadDate(property, "date"),
        "checkbox" => property.TryGetProperty("checkbox", out var checkbox) ? checkbox.GetBoolean() : null,
        "url" or "email" or "phone_number" => property.TryGetProperty(type, out var scalar) ? scalar.GetString() : null,
        "formula" => ReadFormula(property),
        "rollup" => ReadRollup(property),
        _ => null
    };

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

    private static DateTime? ReadDate(JsonElement owner, string name) =>
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
            "date" => ReadDate(formula, "date"),
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
            "date" => ReadDate(rollup, "date"),
            _ => null
        };
    }

    private string RequireToken()
    {
        var token = _settings().Token;
        if (string.IsNullOrWhiteSpace(token)) throw new InvalidOperationException("尚未配置数据库连接。");
        return token;
    }

    private async Task<string> ResolveDatabaseIdAsync(
        string token,
        string sourceId,
        CancellationToken cancellationToken)
    {
        var cached = _settings().CachedDataSources.FirstOrDefault(source => source.Id == sourceId)?.DatabaseId;
        if (!string.IsNullOrWhiteSpace(cached)) return cached;
        using var response = await SendAsync(
            HttpMethod.Get, $"data_sources/{sourceId}", token, null, cancellationToken);
        if (!response.IsSuccessStatusCode)
            throw new InvalidOperationException($"读取数据库归属失败：HTTP {(int)response.StatusCode}。");
        using var document = JsonDocument.Parse(await response.Content.ReadAsStringAsync(cancellationToken));
        var databaseId = document.RootElement.TryGetProperty("parent", out var parent) &&
                         parent.TryGetProperty("database_id", out var value)
            ? value.GetString()
            : null;
        return !string.IsNullOrWhiteSpace(databaseId)
            ? databaseId
            : throw new InvalidOperationException("无法确认数据源所属的数据库，已停止读取 View。");
    }

    private static bool BelongsToSourceDatabase(JsonElement view, string sourceId, string databaseId) =>
        view.TryGetProperty("data_source_id", out var source) &&
        string.Equals(NormalizeId(source.GetString() ?? string.Empty), NormalizeId(sourceId), StringComparison.OrdinalIgnoreCase) &&
        view.TryGetProperty("parent", out var parent) &&
        parent.TryGetProperty("database_id", out var database) &&
        string.Equals(NormalizeId(database.GetString() ?? string.Empty), NormalizeId(databaseId), StringComparison.OrdinalIgnoreCase);

    private async Task<HttpResponseMessage> SendAsync(
        HttpMethod method,
        string path,
        string token,
        string? json,
        CancellationToken cancellationToken)
    {
        using var request = new HttpRequestMessage(method, path);
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token.Trim());
        request.Headers.Add("Notion-Version", ApiVersion);
        if (json is not null) request.Content = new StringContent(json, Encoding.UTF8, "application/json");
        return await _client.SendAsync(request, cancellationToken);
    }

    private static void AddPageIds(JsonElement root, ISet<string> ids)
    {
        foreach (var item in root.GetProperty("results").EnumerateArray())
        {
            var id = NormalizeId(ReadObjectId(item, "page"));
            if (!string.IsNullOrWhiteSpace(id)) ids.Add(id);
        }
    }

    private static string? ReadNextCursor(JsonElement root) =>
        root.TryGetProperty("has_more", out var more) && more.GetBoolean() &&
        root.TryGetProperty("next_cursor", out var cursor) ? cursor.GetString() : null;

    private static bool IsIncomplete(JsonElement root) =>
        root.TryGetProperty("request_status", out var status) &&
        string.Equals(status.GetString(), "incomplete", StringComparison.OrdinalIgnoreCase);

    private static string ReadObjectId(JsonElement item, string wrapper)
    {
        if (item.TryGetProperty("id", out var id)) return id.GetString() ?? string.Empty;
        return item.TryGetProperty(wrapper, out var nested) && nested.TryGetProperty("id", out id)
            ? id.GetString() ?? string.Empty
            : string.Empty;
    }

    private static string NormalizeId(string value) => value.Replace("-", string.Empty, StringComparison.Ordinal);
}
