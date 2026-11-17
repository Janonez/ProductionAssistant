using System.Text.Json;
using System.Text.Json.Nodes;
using System.Diagnostics;
using System.Text.RegularExpressions;
using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public sealed class TencentSessionService(TencentSheetService worker)
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    private readonly object _verifyGate = new();
    private Task<TencentSessionStatus>? _verification;
    private string? _verificationKey;

    public Task<TencentSessionStatus> ExecuteAsync(string action, string? documentUrl, CancellationToken cancellationToken = default,
        string? jobId = null, int? configRevision = null, string? loginOperationId = null, bool confirmClear = false,
        IReadOnlyList<TencentPermissionTarget>? permissionTargets = null, bool refreshPermissions = false)
    {
        if (permissionTargets is not null && (action != "Verify" || permissionTargets.Count > 100 || permissionTargets.Any(target =>
            target is null || (string.IsNullOrWhiteSpace(target.SheetId) && string.IsNullOrWhiteSpace(target.SheetName)) ||
            target.SheetId?.Length > 200 || target.SheetName?.Length > 200 || target.Label?.Length > 200 ||
            !Regex.IsMatch(target.Address ?? "", "^[A-Za-z]{1,3}[1-9][0-9]{0,6}$"))))
            throw new InvalidOperationException("请指定有效的目标工作表和单元格。");
        if (action != "Verify") return ExecuteCoreAsync(action, documentUrl, cancellationToken, jobId, configRevision, loginOperationId, confirmClear, null, false);
        var key = JsonSerializer.Serialize(new { documentUrl, jobId, configRevision, permissionTargets, refreshPermissions });
        lock (_verifyGate)
        {
            if (_verification is { IsCompleted: false })
                return _verificationKey == key ? _verification.WaitAsync(cancellationToken) : Task.FromResult(new TencentSessionStatus(
                    "unavailable", false, "unknown", "unknown", "unknown", null, "已有其他文档检测正在进行。", "SessionBusy"));
            _verificationKey = key;
            return _verification = ExecuteCoreAsync(action, documentUrl, cancellationToken, jobId, configRevision, loginOperationId, confirmClear, permissionTargets, refreshPermissions);
        }
    }

    private async Task<TencentSessionStatus> ExecuteCoreAsync(string action, string? documentUrl, CancellationToken cancellationToken,
        string? jobId, int? configRevision, string? loginOperationId, bool confirmClear,
        IReadOnlyList<TencentPermissionTarget>? permissionTargets, bool refreshPermissions)
    {
        if (action is not ("Status" or "Open" or "Verify" or "Close" or "Clear" or "LoginBegin" or "LoginStatus" or "LoginRefresh" or "LoginCancel" or "LoginConsent"))
            throw new InvalidOperationException("不支持的会话操作。");
        if (action == "Clear" && !confirmClear)
            return new("unavailable", false, "unknown", "unknown", "unknown", null,
                "请先确认清空当前环境的共享浏览器资料。", "ClearConfirmationRequired");
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
            var config = new JsonObject { ["documentUrl"] = documentUrl, ["timeout"] = 15,
                ["configRevision"] = configRevision, ["loginOperationId"] = loginOperationId, ["confirmClear"] = confirmClear,
                ["permissionTargets"] = JsonSerializer.SerializeToNode(permissionTargets, JsonOptions), ["refreshPermissions"] = refreshPermissions };
            if (!string.IsNullOrWhiteSpace(jobId) && action != "LoginCancel")
            {
                var job = TencentSheetTaskHandler.Find(jobId);
                if ((configRevision is not null && ((int?)job["configRevision"] ?? 0) != configRevision) ||
                    (string?)job["config"]?["documentUrl"] != documentUrl)
                    return new("unavailable", false, "unknown", "unknown", "unknown", null,
                        "文档配置已变化，请重新读取后检测。", "ConfigChanged");
                config["configRevision"] = (int?)job["configRevision"] ?? 0;
                config["webControls"] = job["config"]?["webControls"]?.DeepClone();
            }
            var result = await worker.CallAsync(new JsonObject
            {
                ["operation"] = "session" + action,
                ["config"] = config
            }, deadline.Token);
            var status = result.Deserialize<TencentSessionStatus>(JsonOptions)
                ?? throw new InvalidOperationException("会话状态响应无效。");
            if (status.QrImage is not null && (!status.QrImage.StartsWith("data:image/png;base64,", StringComparison.Ordinal) ||
                status.QrImage.Length > 133360 || status.LoginState != "waiting" || string.IsNullOrWhiteSpace(status.LoginOperationId)))
                throw new InvalidOperationException("扫码图像响应无效。");
            return status;
        }
        catch (TencentProfileBusyException) { return TencentSessionStatus.ProfileBusy; }
        catch (TencentOperationBusyException)
        {
            return new("unavailable", false, "unknown", "unknown", "unknown", null,
                "已有文档操作正在进行，本次操作未发送。", "OperationBusy");
        }
        catch (OperationCanceledException) when (!cancellationToken.IsCancellationRequested)
        {
            return new("unavailable", false, "unknown", "unknown", "unknown", null,
                "会话操作超时，结果尚未确认。", "SessionTimeout", "请先回读状态；不要据此判断登录失效或重复创建配置。");
        }
    }

    public static string ValidateDocumentUrl(string? value)
    {
        if (!Uri.TryCreate(value?.Trim(), UriKind.Absolute, out var uri) || uri.Scheme != "https" ||
            uri.Host is not ("docs.qq.com" or "doc.weixin.qq.com") || !uri.IsDefaultPort || !string.IsNullOrEmpty(uri.UserInfo))
            throw new InvalidOperationException("请使用腾讯文档或企业微信文档的 HTTPS 分享链接。");
        return uri.AbsoluteUri;
    }

    public static Uri ResolveLoginAgreementUri(string kind) => new(kind switch
    {
        "service" => "https://docs.qq.com/doc/p/41c65c813fe78d2f262bf35b825c214f0f459bfe",
        "privacy" => "https://docs.qq.com/doc/p/79d8f25f4f022ccca80949ea89b3fe8a137d8940",
        _ => throw new InvalidOperationException("不支持的腾讯文档协议。")
    });

    public static object OpenLoginAgreement(string kind)
    {
        var uri = ResolveLoginAgreementUri(kind);
        using var process = Process.Start(new ProcessStartInfo(uri.AbsoluteUri) { UseShellExecute = true });
        return new { opened = true };
    }
}
