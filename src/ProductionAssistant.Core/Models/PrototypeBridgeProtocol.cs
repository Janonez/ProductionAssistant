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
        "production.cancel"
    };

    public static bool IsAllowed(string? operation) =>
        !string.IsNullOrWhiteSpace(operation) && AllowedOperations.Contains(operation);

    public static string SafeError(Exception exception) =>
        exception is InvalidOperationException
            ? exception.Message[..Math.Min(exception.Message.Length, 500)]
            : "操作未完成，请重试或返回原版界面查看详细状态。";
}
