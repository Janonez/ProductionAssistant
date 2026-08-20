namespace ProductionAssistant.Models;

public static class PrototypeBridgeProtocol
{
    public static readonly IReadOnlySet<string> AllowedOperations = new HashSet<string>(StringComparer.Ordinal)
    {
        "app.getOverview",
        "app.navigateNative",
        "production.parse",
        "production.check",
        "production.write",
        "production.getBindings",
        "production.saveBindings",
        "production.cancel",
        "daily.list",
        "daily.create",
        "daily.get",
        "daily.saveBasics",
        "daily.saveTemplate",
        "daily.getProperties",
        "daily.addField",
        "daily.saveCredentials",
        "daily.checkConnection",
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
        "home",
        "plan-pdf",
        "production-meeting",
        "daily-weld",
        "production-message",
        "daily-report",
        "report-center",
        "settings"
    };

    public static bool IsAllowed(string? operation) =>
        !string.IsNullOrWhiteSpace(operation) && AllowedOperations.Contains(operation);

    public static bool IsNavigationAllowed(string? tag) =>
        !string.IsNullOrWhiteSpace(tag) && AllowedNavigationTags.Contains(tag);

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
            : "操作未完成，请重试或返回原版界面查看详细状态。";
}
