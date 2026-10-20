namespace ProductionAssistant.Models;

public static class PrototypeBridgeProtocol
{
    private const string DocumentUrl = "https://prototype.production-assistant.local/index.html";

    public static readonly IReadOnlySet<string> AllowedOperations = new HashSet<string>(StringComparer.Ordinal)
    {
        "settings.open",
        "settings.close",
        "settings.saveConnection",
        "settings.refreshDataSources",
        "settings.saveNotification",
        "settings.testNotification",
        "settings.saveNotificationRules",
        "production.parse",
        "production.check",
        "production.write",
        "production.getBindings",
        "production.saveBindings",
        "production.cancel",
        "weld.getState",
        "weld.generate",
        "weld.saveBinding",
        "weld.check",
        "weld.write",
        "database.getState",
        "database.getSchema",
        "database.inspect",
        "automation.list",
        "automation.setEnabled",
        "automation.delete",
        "tencentSheet.create", "tencentSheet.get", "tencentSheet.save",
        "tencentSheet.login", "tencentSheet.loginAgreement",
        "tencentSheet.open", "tencentSheet.close", "tencentSheet.backgroundTest", "tencentSheet.recognize", "tencentSheet.teach", "tencentSheet.inspect", "tencentSheet.write", "tencentSheet.runs",
        "tencentSheet.sources", "tencentSheet.schema", "tencentSheet.views", "tencentSheet.fetch", "tencentSheet.addField", "tencentSheet.updateField", "tencentSheet.deleteField",
        "tencentSite.open", "tencentSite.pick", "tencentSite.testSheet", "tencentSite.captureCell", "tencentSite.test", "tencentSite.save",
        "notionFill.create",
        "notionFill.get",
        "notionFill.save",
        "notionFill.testSource",
        "notionFill.test",
        "notionFill.runNow",
        "notionFill.runs",
        "daily.list",
        "daily.create",
        "daily.get",
        "daily.saveBasics",
        "daily.saveTemplate",
        "daily.getProperties",
        "daily.addField",
        "daily.preview",
        "daily.test",
        "daily.sendToday",
        "daily.setEnabled",
        "daily.delete",
        "daily.runs",
        "report.getState",
        "report.saveConfig",
        "report.authenticate",
        "report.run",
        "meeting.pickFile", "meeting.export", "meeting.openOutput",
        "plan.pickFolder", "plan.audit", "plan.repair", "plan.export", "plan.openOutput"
    };

    public static bool IsAllowed(string? operation) =>
        !string.IsNullOrWhiteSpace(operation) && AllowedOperations.Contains(operation);

    public static bool IsTrustedPrototypeSource(string? source) =>
        Uri.TryCreate(source, UriKind.Absolute, out var uri) &&
        uri.Scheme == Uri.UriSchemeHttps &&
        uri.IsDefaultPort &&
        uri.Host == "prototype.production-assistant.local" &&
        uri.AbsolutePath == "/index.html";

    public static bool IsCurrentLoad(string? loadId, string expectedLoadId) =>
        !string.IsNullOrWhiteSpace(loadId) &&
        string.Equals(loadId, expectedLoadId, StringComparison.Ordinal);

    public static string BuildDocumentUrl(string? currentSource, string loadId)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(loadId);

        var navigation = "navigation=" + Uri.EscapeDataString(loadId);
        if (!IsTrustedPrototypeSource(currentSource))
            return DocumentUrl + "?" + navigation;

        var source = currentSource!;
        var fragmentIndex = source.IndexOf('#');
        if (fragmentIndex >= 0)
            source = source[..fragmentIndex];

        var queryIndex = source.IndexOf('?');
        var query = queryIndex >= 0 ? source[(queryIndex + 1)..] : string.Empty;
        var parts = new List<string>();
        var replaced = false;
        foreach (var part in query.Split('&', StringSplitOptions.RemoveEmptyEntries))
        {
            var equalsIndex = part.IndexOf('=');
            var key = equalsIndex >= 0 ? part[..equalsIndex] : part;
            if (string.Equals(Uri.UnescapeDataString(key), "navigation", StringComparison.Ordinal))
            {
                if (!replaced)
                {
                    parts.Add(navigation);
                    replaced = true;
                }
            }
            else
            {
                parts.Add(part);
            }
        }

        if (!replaced)
            parts.Add(navigation);

        return DocumentUrl + "?" + string.Join("&", parts);
    }

    public static string SafeError(Exception exception)
    {
        var message = exception switch
        {
            InvalidOperationException or ArgumentException or IOException or UnauthorizedAccessException => exception.Message,
            System.Runtime.InteropServices.COMException =>
                $"系统组件调用失败：{exception.Message}（错误码 0x{exception.HResult:X8}）。",
            _ => $"操作失败：{exception.GetType().Name}（错误码 0x{exception.HResult:X8}）。"
        };
        return message[..Math.Min(message.Length, 1000)];
    }
}
