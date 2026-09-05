using ProductionAssistant.Automation;
using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public sealed class AutomationTaskRunner(
    AutomationTaskHandlerRegistry registry,
    NotificationService? notifications = null)
{
    private readonly NotificationService _notifications = notifications ?? new();

    public async Task<AutomationTaskRun> RunAsync(
        string taskType,
        string taskId,
        string trigger = "automatic",
        CancellationToken cancellationToken = default)
    {
        var handler = registry.GetHandler(taskType);
        var task = await handler.GetTaskAsync(taskId);
        if (!string.Equals(task.TaskType, taskType, StringComparison.Ordinal))
            throw new InvalidOperationException($"任务 {taskId} 的类型与请求不一致。");

        var context = new AutomationTaskExecutionContext(
            task.Id, task.TaskType, task.Name, trigger, DateTimeOffset.Now);
        AutomationTaskRunResult result;
        try
        {
            result = await handler.ExecuteAsync(context, task.Config, cancellationToken);
        }
        catch (OperationCanceledException) when (cancellationToken.IsCancellationRequested)
        {
            throw;
        }
        catch (Exception ex)
        {
            result = new AutomationTaskRunResult(false, -1, ex.Message);
        }
        await NotifyAsync(task, result, cancellationToken);
        return new AutomationTaskRun(Guid.NewGuid().ToString("N"), context, DateTimeOffset.Now, result);
    }

    public async Task<AutomationTaskRun> RunByIdAsync(
        string taskId,
        string trigger = "automatic",
        CancellationToken cancellationToken = default)
    {
        var handler = await registry.GetHandlerByTaskIdAsync(taskId);
        return await RunAsync(handler.TaskType, taskId, trigger, cancellationToken);
    }

    private async Task NotifyAsync(
        AutomationTask task,
        AutomationTaskRunResult result,
        CancellationToken cancellationToken)
    {
        if (result.AlertHandled) return;
        var eventType = result.Succeeded
            ? NotificationEvents.TaskSucceeded
            : result.AlertEventType ?? NotificationEvents.AutomationFailed;
        var context = new Dictionary<string, string>
        {
            ["taskName"] = task.Name,
            ["reason"] = result.Message
        };
        if (result.AlertContext is not null)
            foreach (var item in result.AlertContext) context[item.Key] = item.Value;
        try
        {
            await _notifications.NotifyAsync(eventType, context, cancellationToken);
        }
        catch
        {
            // A failed alert must not change the business task result.
        }
    }
}
