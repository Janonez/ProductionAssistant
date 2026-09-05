using ProductionAssistant.Automation;

namespace ProductionAssistant.Services;

public sealed class AutomationTaskHandlerRegistry
{
    private readonly IReadOnlyDictionary<string, IAutomationTaskHandler> _handlers;

    public AutomationTaskHandlerRegistry(IEnumerable<IAutomationTaskHandler> handlers)
    {
        _handlers = BuildIndex(handlers, handler => handler.TaskType, "Handler");
    }

    public IAutomationTaskHandler GetHandler(string taskType) =>
        _handlers.TryGetValue(taskType, out var handler)
            ? handler
            : throw new InvalidOperationException($"未注册任务类型：{taskType}");

    public async Task<IReadOnlyList<AutomationTaskSummary>> ListTasksAsync()
    {
        var tasks = new List<AutomationTaskSummary>();
        foreach (var handler in _handlers.Values)
            tasks.AddRange(await handler.ListTasksAsync());
        EnsureUniqueTaskIds(tasks);
        return tasks;
    }

    public async Task<IAutomationTaskHandler> GetHandlerByTaskIdAsync(string taskId)
    {
        IAutomationTaskHandler? match = null;
        foreach (var handler in _handlers.Values)
        {
            if (!(await handler.ListTasksAsync()).Any(task => task.Id == taskId)) continue;
            if (match is not null)
                throw new InvalidOperationException($"任务 Id {taskId} 同时属于多个任务类型。");
            match = handler;
        }
        return match ?? throw new InvalidOperationException($"找不到自动化任务：{taskId}");
    }

    private static IReadOnlyDictionary<string, T> BuildIndex<T>(
        IEnumerable<T> items,
        Func<T, string> keySelector,
        string label) =>
        items.GroupBy(keySelector, StringComparer.Ordinal)
            .ToDictionary(
                group => group.Key,
                group => group.Count() == 1
                    ? group.Single()
                    : throw new InvalidOperationException($"{label} 重复注册任务类型：{group.Key}"),
                StringComparer.Ordinal);

    private static void EnsureUniqueTaskIds(IEnumerable<AutomationTaskSummary> tasks)
    {
        var duplicate = tasks.GroupBy(task => task.Id, StringComparer.Ordinal)
            .FirstOrDefault(group => group.Count() > 1);
        if (duplicate is not null)
            throw new InvalidOperationException($"任务 Id {duplicate.Key} 同时属于多个任务类型。");
    }
}
