using System.Text.Json;
using System.Text.Json.Nodes;
using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public sealed class TencentSessionService(TencentSheetService worker)
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    public async Task<TencentSessionStatus> ExecuteAsync(string action, string? documentUrl, CancellationToken cancellationToken = default)
    {
        if (action is not ("Status" or "Open" or "Verify" or "Close"))
            throw new InvalidOperationException("不支持的会话操作。");
        if (action != "Close" && (!string.IsNullOrWhiteSpace(documentUrl) || action != "Status"))
        {
            try { documentUrl = ValidateDocumentUrl(documentUrl); }
            catch (InvalidOperationException)
            {
                return new("unavailable", false, "unknown", "unknown", "unknown", null,
                    "文档链接无效。", "InvalidDocumentUrl", "请使用腾讯文档或企业微信文档的 HTTPS 分享链接。");
            }
        }
        using var deadline = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
        deadline.CancelAfter(TimeSpan.FromSeconds(45));
        try
        {
            if (action == "Close")
            {
                await worker.CloseSessionAsync();
                return TencentSessionStatus.Closed;
            }
            var result = await worker.CallAsync(new JsonObject
            {
                ["operation"] = "session" + action,
                ["config"] = new JsonObject { ["documentUrl"] = documentUrl, ["timeout"] = 30 }
            }, deadline.Token);
            return result.Deserialize<TencentSessionStatus>(JsonOptions)
                ?? throw new InvalidOperationException("会话状态响应无效。");
        }
        catch (TencentProfileBusyException) { return TencentSessionStatus.ProfileBusy; }
        catch (OperationCanceledException) when (!cancellationToken.IsCancellationRequested)
        {
            return new("unavailable", false, "unknown", "unknown", "unknown", null,
                "会话操作超时，未确认登录状态。", "SessionTimeout", "请重新打开浏览器并验证；不要据此判断登录已失效。");
        }
    }

    public static string ValidateDocumentUrl(string? value)
    {
        if (!Uri.TryCreate(value?.Trim(), UriKind.Absolute, out var uri) || uri.Scheme != "https" ||
            uri.Host is not ("docs.qq.com" or "doc.weixin.qq.com") || !uri.IsDefaultPort || !string.IsNullOrEmpty(uri.UserInfo))
            throw new InvalidOperationException("请使用腾讯文档或企业微信文档的 HTTPS 分享链接。");
        return uri.AbsoluteUri;
    }
}
