using System.Text.Json;
using ProductionAssistant.Automation;
using ProductionAssistant.Services;
using Xunit;

namespace ProductionAssistant.Tests;

public sealed class AutomationTaskShellTests
{
    [Fact]
    public async Task Registry_builds_the_task_index_from_handler_owned_storage()
    {
        var daily = new StubTaskType("daily_report", "daily-1");
        var notion = new StubTaskType("notion_fill", "notion-1");
        var registry = new AutomationTaskHandlerRegistry([daily, notion]);

        var tasks = await registry.ListTasksAsync();

        Assert.Equal(["daily-1", "notion-1"], tasks.Select(task => task.Id));
        Assert.Same(daily, await registry.GetHandlerByTaskIdAsync("daily-1"));
        Assert.Same(notion, await registry.GetHandlerByTaskIdAsync("notion-1"));
    }

    [Fact]
    public async Task Runner_dispatches_execution_without_knowing_task_business_logic()
    {
        var daily = new StubTaskType("daily_report", "daily-1");
        var notion = new StubTaskType("notion_fill", "notion-1");
        var runner = new AutomationTaskRunner(new([daily, notion]));

        var run = await runner.RunAsync("notion_fill", "notion-1");

        Assert.Equal(17, run.Result.ExitCode);
        Assert.Null(daily.LastContext);
        Assert.Equal("notion-1", notion.LastContext?.TaskId);
    }

    [Fact]
    public async Task Adding_a_task_type_requires_only_registry_registration()
    {
        var futureTask = new StubTaskType("future_task", "future-1");
        var runner = new AutomationTaskRunner(new([futureTask]));

        var run = await runner.RunByIdAsync("future-1");

        Assert.Equal(17, run.Result.ExitCode);
        Assert.Equal("future_task", futureTask.LastContext?.TaskType);
        Assert.Equal("future-1", futureTask.LastContext?.TaskId);
    }

    [Fact]
    public async Task Runtime_index_rejects_the_same_task_id_from_two_sources()
    {
        var daily = new StubTaskType("daily_report", "same-id");
        var notion = new StubTaskType("notion_fill", "same-id");
        var registry = new AutomationTaskHandlerRegistry([daily, notion]);

        var error = await Assert.ThrowsAsync<InvalidOperationException>(
            () => registry.GetHandlerByTaskIdAsync("same-id"));

        Assert.Contains("多个任务类型", error.Message);
    }

    private sealed class StubTaskType(string taskType, params string[] taskIds)
        : IAutomationTaskHandler
    {
        public string TaskType { get; } = taskType;
        public AutomationTaskExecutionContext? LastContext { get; private set; }

        public Task<IReadOnlyList<AutomationTaskSummary>> ListTasksAsync() =>
            Task.FromResult<IReadOnlyList<AutomationTaskSummary>>(
                taskIds.Select(Summary).ToArray());

        public Task<AutomationTask> GetTaskAsync(string taskId) =>
            Task.FromResult(new AutomationTask(
                taskId, TaskType, taskId, true, "17:30", "ready",
                JsonSerializer.SerializeToElement(new { id = taskId })));

        public Task<AutomationTaskRunResult> ExecuteAsync(
            AutomationTaskExecutionContext context,
            JsonElement config,
            CancellationToken cancellationToken)
        {
            LastContext = context;
            return Task.FromResult(new AutomationTaskRunResult(true, 17));
        }

        public Task<AutomationTaskToggleResult> SetEnabledAsync(string taskId, bool enabled) =>
            Task.FromResult(new AutomationTaskToggleResult(enabled));

        public Task DeleteAsync(string taskId) => Task.CompletedTask;

        private AutomationTaskSummary Summary(string id) => new(
            TaskType, TaskType, id, id, "17:30", false, true,
            "ready", "", "", "暂无运行记录");
    }
}
