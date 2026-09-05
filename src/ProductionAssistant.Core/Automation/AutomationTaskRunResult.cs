namespace ProductionAssistant.Automation;

public sealed record AutomationTaskRunResult(
    bool Succeeded,
    int ExitCode,
    string Message = "",
    string? AlertEventType = null,
    IReadOnlyDictionary<string, string>? AlertContext = null,
    bool AlertHandled = false);
