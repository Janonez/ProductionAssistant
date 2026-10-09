using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json.Nodes;

namespace ProductionAssistant.Services;

/// <summary>
/// Teable 最小 API 基建：按字段 ID 读取、创建及回读记录。
/// 供联调工具及业务查询适配器调用；默认直连，不依赖系统代理。
/// </summary>
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
        // 默认直连，避免故障系统代理阻断本机 Teable；禁用跳转，避免鉴权请求被转到其他地址。
        _client = new HttpClient(handler ?? new HttpClientHandler { UseProxy = false, AllowAutoRedirect = false })
        { Timeout = TimeSpan.FromSeconds(30) };
    }

    /// <summary>读取指定一页，默认只抽样一条；需要全量数据的调用方必须显式分页。</summary>
    public Task<JsonObject> ReadRecordsAsync(string tableId, int take = 1, int skip = 0,
        CancellationToken cancellationToken = default)
    {
        if (take is < 1 or > 1000 || skip < 0) throw new ArgumentOutOfRangeException(nameof(take));
        return SendAsync(HttpMethod.Get,
            $"table/{Id(tableId, "tbl")}/record?fieldKeyType=id&take={take}&skip={skip}", null, cancellationToken);
    }

    /// <summary>真实创建一条记录，fields 以字段 ID 为键；关闭类型自动转换，保留服务端校验。</summary>
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

    public async Task<JsonArray> ReadFieldsAsync(string tableId, CancellationToken cancellationToken = default) =>
        await SendNodeAsync(HttpMethod.Get, $"table/{Id(tableId, "tbl")}/field", null, cancellationToken) as JsonArray
        ?? throw new InvalidOperationException("Teable 字段响应不是数组。");

    public Task<JsonObject> ReadViewAsync(string tableId, string viewId, CancellationToken cancellationToken = default) =>
        SendAsync(HttpMethod.Get, $"table/{Id(tableId, "tbl")}/view/{Id(viewId, "viw")}", null, cancellationToken);

    /// <summary>业务读取显式投影全部绑定字段；隐藏日期仍可参与统计。无视图时忽略默认视图筛选。</summary>
    public Task<JsonObject> ReadQueryRecordsAsync(string tableId, IReadOnlyList<string> fieldIds, int skip,
        string? viewId = null, CancellationToken cancellationToken = default)
    {
        if (skip < 0 || fieldIds.Count == 0) throw new ArgumentException("业务读取需要字段投影和有效分页。");
        var path = $"table/{Id(tableId, "tbl")}/record?fieldKeyType=id&take=1000&skip={skip}";
        path += viewId is null ? "&ignoreViewQuery=true" : $"&viewId={Id(viewId, "viw")}";
        path += string.Concat(fieldIds.Distinct().Select(field => $"&projection={Id(field, "fld")}"));
        return SendAsync(HttpMethod.Get, path, null, cancellationToken);
    }

    private async Task<JsonObject> SendAsync(HttpMethod method, string path, JsonObject? body,
        CancellationToken cancellationToken) =>
        await SendNodeAsync(method, path, body, cancellationToken) as JsonObject
        ?? throw new InvalidOperationException("Teable 返回无效记录响应。");

    private async Task<JsonNode> SendNodeAsync(HttpMethod method, string path, JsonObject? body,
        CancellationToken cancellationToken)
    {
        using var request = new HttpRequestMessage(method, new Uri(_api, path));
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _token);
        if (body is not null) request.Content = JsonContent.Create(body);
        using var response = await _client.SendAsync(request, cancellationToken);
        // 不透传错误响应正文：服务端可能把字段内容或敏感信息带入错误详情。
        if (!response.IsSuccessStatusCode)
            throw new HttpRequestException($"Teable HTTP {(int)response.StatusCode}。请检查实例地址、Token 权限和表 ID。",
                null, response.StatusCode);
        // 不自动重试写入：响应中断时服务端可能已提交，调用方应先核对表内记录。
        return await response.Content.ReadFromJsonAsync<JsonNode>(cancellationToken: cancellationToken)
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
