using System.Text.Json;

namespace ProductionAssistant;

internal sealed partial class PrototypeBridge
{
    private static async Task<object> ListAutomationTasksAsync() =>
        new { tasks = await AppServices.AutomationTaskHandlers.ListTasksAsync() };

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
