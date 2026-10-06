using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json.Nodes;

namespace ProductionAssistant.Services;

/// <summary>Teable API foundation. Does not switch existing business flows from Notion.</summary>
public sealed class TeableClient : IDisposable
{
    private readonly HttpClient _client;
    private readonly Uri _api;
    private readonly string _token;

    public TeableClient(string serverUrl, string token, HttpMessageHandler? handler = null)
    {
        if (!Uri.TryCreate(serverUrl, UriKind.Absolute, out var server) ||
            (server.Scheme != "https" && !(server.Scheme == "http" && server.IsLoopback)) ||
            server.UserInfo.Length != 0 || server.Query.Length != 0 || server.Fragment.Length != 0)
            throw new ArgumentException("Teable 地址必须是 HTTPS 实例地址（本机允许 HTTP），不能包含账号、查询或片段。");
        if (string.IsNullOrWhiteSpace(token) || token.Any(char.IsWhiteSpace))
            throw new ArgumentException("请配置有效的 Teable API Token。");
        var root = server.AbsoluteUri.TrimEnd('/');
        _api = new Uri(root.EndsWith("/api", StringComparison.Ordinal) ? root + "/" : root + "/api/");
        _token = token;
        // Direct connectivity is intentional: a broken system proxy must not block Teable.
        _client = new HttpClient(handler ?? new HttpClientHandler { UseProxy = false, AllowAutoRedirect = false })
        { Timeout = TimeSpan.FromSeconds(30) };
    }

    public Task<JsonObject> ReadRecordsAsync(string tableId, int take = 1, int skip = 0,
        CancellationToken cancellationToken = default)
    {
        if (take is < 1 or > 1000 || skip < 0) throw new ArgumentOutOfRangeException(nameof(take));
        return SendAsync(HttpMethod.Get,
            $"table/{Id(tableId, "tbl")}/record?fieldKeyType=id&take={take}&skip={skip}", null, cancellationToken);
    }

    public Task<JsonObject> CreateRecordAsync(string tableId, JsonObject fields,
        CancellationToken cancellationToken = default)
    {
        if (fields.Count == 0) throw new ArgumentException("测试写入至少需要一个字段。");
        return SendAsync(HttpMethod.Post, $"table/{Id(tableId, "tbl")}/record", new JsonObject
        {
            ["fieldKeyType"] = "id", ["typecast"] = false,
            ["records"] = new JsonArray(new JsonObject { ["fields"] = fields.DeepClone() })
        }, cancellationToken);
    }

    public Task<JsonObject> ReadRecordAsync(string tableId, string recordId,
        CancellationToken cancellationToken = default) =>
        SendAsync(HttpMethod.Get, $"table/{Id(tableId, "tbl")}/record/{Id(recordId, "rec")}?fieldKeyType=id",
            null, cancellationToken);

    private async Task<JsonObject> SendAsync(HttpMethod method, string path, JsonObject? body,
        CancellationToken cancellationToken)
    {
        using var request = new HttpRequestMessage(method, new Uri(_api, path));
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _token);
        if (body is not null) request.Content = JsonContent.Create(body);
        using var response = await _client.SendAsync(request, cancellationToken);
        if (!response.IsSuccessStatusCode)
            throw new HttpRequestException($"Teable HTTP {(int)response.StatusCode}。请检查实例地址、Token 权限和表 ID。",
                null, response.StatusCode);
        // No automatic write retries: an interrupted response may already have committed.
        return await response.Content.ReadFromJsonAsync<JsonObject>(cancellationToken: cancellationToken)
            ?? throw new InvalidOperationException("Teable 返回空响应。");
    }

    private static string Id(string value, string prefix)
    {
        if (string.IsNullOrWhiteSpace(value) || !value.StartsWith(prefix, StringComparison.Ordinal) ||
            !value.All(char.IsAsciiLetterOrDigit)) throw new ArgumentException($"无效的 Teable {prefix} ID。");
        return value;
    }

    public void Dispose() => _client.Dispose();
}
