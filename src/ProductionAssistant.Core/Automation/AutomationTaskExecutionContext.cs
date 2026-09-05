namespace ProductionAssistant.Automation;

public sealed record AutomationTaskExecutionContext(
    string TaskId,
    string TaskType,
    string TaskName,
    string Trigger,
    DateTimeOffset StartedAt);
