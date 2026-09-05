namespace ProductionAssistant.Models;

public static class PrototypeBridgeProtocol
{
    public static readonly IReadOnlySet<string> AllowedOperations = new HashSet<string>(StringComparer.Ordinal)
    {
        "app.navigateNative",
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
        "report.run"
    };

    public static readonly IReadOnlySet<string> AllowedNavigationTags = new HashSet<string>(StringComparer.Ordinal)
    {
        "plan-pdf",
        "production-meeting",
        "daily-weld",
        "database-viewer",
        "production-message",
        "daily-report",
        "report-center"
    };

    public static bool IsAllowed(string? operation) =>
        !string.IsNullOrWhiteSpace(operation) && AllowedOperations.Contains(operation);

    public static bool IsNavigationAllowed(string? tag) =>
        !string.IsNullOrWhiteSpace(tag) && AllowedNavigationTags.Contains(tag);

    public static bool IsTrustedPrototypeSource(string? source) =>
        Uri.TryCreate(source, UriKind.Absolute, out var uri) &&
        uri.Scheme == Uri.UriSchemeHttps &&
        uri.IsDefaultPort &&
        uri.Host == "prototype.production-assistant.local" &&
        uri.AbsolutePath == "/index.html";

    public static bool IsCurrentNavigation(
        string? route,
        string? navigation,
        string expectedRoute,
        string expectedNavigation) =>
        !string.IsNullOrWhiteSpace(navigation) &&
        string.Equals(route, expectedRoute, StringComparison.Ordinal) &&
        string.Equals(navigation, expectedNavigation, StringComparison.Ordinal);

    public static string SafeError(Exception exception) =>
        exception is InvalidOperationException
            ? exception.Message[..Math.Min(exception.Message.Length, 500)]
            : "操作未完成，请重试或检查当前模块配置。";
}
