namespace ProductionAssistant.Automation;

public sealed record AutomationTaskRun(
    string Id,
    AutomationTaskExecutionContext Context,
    DateTimeOffset FinishedAt,
    AutomationTaskRunResult Result);
