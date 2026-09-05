using System.Text.Json;

namespace ProductionAssistant.Automation;

public interface IAutomationTaskHandler
{
    string TaskType { get; }

    Task<IReadOnlyList<AutomationTaskSummary>> ListTasksAsync();

    Task<AutomationTask> GetTaskAsync(string taskId);

    Task<AutomationTaskRunResult> ExecuteAsync(
        AutomationTaskExecutionContext context,
        JsonElement config,
        CancellationToken cancellationToken);

    Task<AutomationTaskToggleResult> SetEnabledAsync(string taskId, bool enabled);

    Task DeleteAsync(string taskId);
}
