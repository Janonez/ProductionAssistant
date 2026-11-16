using System.Text.Json;

namespace ProductionAssistant;

public sealed partial class OperationDispatcher
{
    private static async Task<object> ListAutomationTasksAsync(JsonElement payload)
    {
        if (payload.ValueKind == JsonValueKind.Object && payload.TryGetProperty("taskType", out var taskType) && taskType.ValueKind != JsonValueKind.String)
            throw new InvalidOperationException("任务类型必须是字符串。");
        return new { tasks = await AppServices.AutomationTaskHandlers.ListTasksAsync(ReadString(payload, "taskType")), availableTaskTypes = AppServices.AutomationTaskHandlers.TaskTypes };
    }

    private static async Task<object> SetAutomationTaskEnabledAsync(JsonElement payload)
    {
        var handler = AppServices.AutomationTaskHandlers.GetHandler(ReadString(payload, "taskType"));
        var result = await handler.SetEnabledAsync(
            ReadString(payload, "id"),
            payload.TryGetProperty("enabled", out var enabled) && enabled.GetBoolean());
        return new
        {
            result.Enabled,
            result.RanImmediately,
            result.MissingStep,
            result.Message
        };
    }

    private static async Task<object> DeleteAutomationTaskAsync(JsonElement payload)
    {
        var handler = AppServices.AutomationTaskHandlers.GetHandler(ReadString(payload, "taskType"));
        await handler.DeleteAsync(ReadString(payload, "id"));
        return new { deleted = true };
    }
}
