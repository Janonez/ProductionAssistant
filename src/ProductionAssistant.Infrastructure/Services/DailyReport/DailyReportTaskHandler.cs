using System.Text.Json;
using ProductionAssistant.Automation;
using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public sealed class DailyReportTaskHandler : IAutomationTaskHandler
{
    public const string Type = "daily_report";
    private readonly DailyReportRunner _runner;
    private readonly IDailyReportScheduler _scheduler;

    public DailyReportTaskHandler(DailyReportRunner? runner = null) : this(runner, new WindowsDailyReportScheduler()) { }

    internal DailyReportTaskHandler(DailyReportRunner? runner, IDailyReportScheduler scheduler)
    {
        _runner = runner ?? new();
        _scheduler = scheduler;
    }

    public string TaskType => Type;

    public async Task<IReadOnlyList<AutomationTaskSummary>> ListTasksAsync()
    {
        var tasks = new List<AutomationTaskSummary>();
        foreach (var job in DailyReportSettingsStore.LoadCatalog().Jobs)
        {
            var scheduler = await DailyReportTaskScheduler.GetStatusAsync(job.Id, job.SendTime);
            tasks.Add(ToSummary(job, scheduler.Installed, scheduler.Message));
        }
        return tasks;
    }

    public async Task<AutomationTask> GetTaskAsync(string taskId)
    {
        var job = FindJob(taskId);
        var scheduler = await DailyReportTaskScheduler.GetStatusAsync(job.Id, job.SendTime);
        var summary = ToSummary(job, scheduler.Installed, scheduler.Message);
        return new AutomationTask(
            job.Id,
            Type,
            job.Name,
            job.IsEnabled,
            job.SendTime,
            summary.Status,
            JsonSerializer.SerializeToElement(job));
    }

    public async Task<AutomationTaskRunResult> ExecuteAsync(
        AutomationTaskExecutionContext context,
        JsonElement config,
        CancellationToken cancellationToken)
    {
        DailyReportJob? job;
        try
        {
            job = config.Deserialize<DailyReportJob>();
        }
        catch (JsonException ex)
        {
            return new(false, (int)DailyReportExitCode.InvalidData, ex.Message);
        }
        if (job is null || job.Id != context.TaskId)
            return new(false, (int)DailyReportExitCode.InvalidData, "日报任务配置无效。");

        var exitCode = await _runner.RunAsync(context.TaskId, cancellationToken);
        var record = DailyReportSettingsStore.LoadRunRecords(job.Id).FirstOrDefault();
        var succeeded = exitCode is DailyReportExitCode.Success or DailyReportExitCode.AlreadySent;
        var message = record is null
            ? exitCode.ToString()
            : succeeded ? record.Response : record.Error;
        return new AutomationTaskRunResult(
            succeeded,
            (int)exitCode,
            message,
            AlertHandled: !succeeded);
    }

    public async Task<AutomationTaskToggleResult> SetEnabledAsync(string taskId, bool enabled)
    {
        if (!_scheduler.IsAvailable)
            throw new InvalidOperationException("Development 环境默认不启用定时发送。");
        using var lease = await DailyReportSettingsStore.AcquireScheduleLeaseAsync(taskId);
        var job = FindJob(taskId);
        var missing = enabled ? MissingStep(job) : null;
        if (missing is not null) return new(false, MissingStep: missing.Value.Step, Message: missing.Value.Message);
        var time = TimeSpan.Parse(job.SendTime);
        return await ChangeScheduleAsync(job, enabled, enabled ? time : null,
            _ => enabled ? _scheduler.InstallAsync(job.Id, time) : _scheduler.RemoveAsync(job.Id),
            () => DailyReportSettingsStore.UpdateJob(job.Id, current =>
            {
                CheckSchedule(job, current);
                current.IsEnabled = enabled;
                return new AutomationTaskToggleResult(enabled);
            }));
    }

    public async Task DeleteAsync(string taskId)
    {
        using var lease = await DailyReportSettingsStore.AcquireScheduleLeaseAsync(taskId);
        var job = FindJob(taskId);
        if (job.IsEnabled) throw new InvalidOperationException("请先停用任务，再删除配置和运行记录。");
        bool Commit()
        {
            if (!DailyReportSettingsStore.DeleteJobUnderLease(job.Id, job))
                throw new InvalidOperationException("没有找到要删除的任务。");
            return true;
        }
        if (_scheduler.IsAvailable)
            await ChangeScheduleAsync(job, false, null,
                original => original.Installed ? _scheduler.RemoveAsync(job.Id) : Task.FromResult((true, "未安装")),
                Commit);
        else
            Commit(); // Development has no scheduling operation; keep local deletion available.
        // Cleanup failure must not restore a schedule for an already deleted job.
        DailyReportSettingsStore.DeleteRunRecords(job.Id);
    }

    public async Task<DailyReportJob> SaveBasicsAsync(string taskId, string name, string sendTime, List<string>? metricSourceIds)
    {
        if (string.IsNullOrWhiteSpace(name)) throw new InvalidOperationException("任务名称不能为空。");
        if (!TimeSpan.TryParse(sendTime, out var time)) throw new InvalidOperationException("发送时间无效。");
        sendTime = time.ToString(@"hh\:mm");
        using var lease = await DailyReportSettingsStore.AcquireScheduleLeaseAsync(taskId);
        var job = FindJob(taskId);
        DailyReportJob Commit() => DailyReportSettingsStore.UpdateJob(taskId, current =>
        {
            CheckSchedule(job, current);
            current.Name = name;
            current.SendTime = sendTime;
            if (metricSourceIds is not null) current.MetricSourceIds = metricSourceIds.ToList();
            return current;
        });
        if (!job.IsEnabled || job.SendTime == sendTime || !_scheduler.IsAvailable) return Commit();
        return await ChangeScheduleAsync(job, true, TimeSpan.Parse(sendTime),
            _ => _scheduler.InstallAsync(job.Id, TimeSpan.Parse(sendTime)), Commit);
    }

    private static void CheckSchedule(DailyReportJob expected, DailyReportJob current)
    {
        if (expected.IsEnabled != current.IsEnabled || expected.SendTime != current.SendTime)
            throw DailyReportSettingsStore.Conflict();
    }

    private async Task<T> ChangeScheduleAsync<T>(
        DailyReportJob job, bool installed, TimeSpan? time,
        Func<DailyReportScheduleState, Task<(bool Succeeded, string Message)>> change, Func<T> commit)
    {
        // The file lease spans awaits; the catalog mutex is acquired only by synchronous commits.
        var original = await _scheduler.CaptureAsync(job.Id);
        DailyReportTaskScheduler.EnsureRestorable(original);
        try
        {
            var result = await change(original);
            if (!result.Succeeded) throw new InvalidOperationException(result.Message);
            var actual = await _scheduler.CaptureAsync(job.Id);
            if (actual.Installed != installed ||
                (installed && (!time.HasValue || !DailyReportTaskScheduler.IsScheduledFor(actual, time.Value))))
                throw new IOException("计划任务变更后的状态核验失败。");
            // Verify the external effect before the atomic local commit. No later fallible
            // scheduler step may require resurrecting a successfully deleted local job.
            return commit();
        }
        catch (Exception failure)
        {
            try
            {
                await _scheduler.RestoreAsync(job.Id, original);
                var restored = await _scheduler.CaptureAsync(job.Id);
                if (!DailyReportTaskScheduler.SameState(original, restored))
                    throw new IOException("计划任务补偿后的状态核验失败。");
            }
            catch (Exception restoration)
            {
                throw new InvalidOperationException("日报调度更新失败，且计划任务补偿失败，请检查任务计划程序。",
                    new AggregateException(failure, restoration));
            }
            throw new InvalidOperationException("日报调度更新失败，已恢复原计划任务状态。", failure);
        }
    }

    public static bool IsValidated(DailyReportJob job) =>
        job.ConfigurationValidated ?? (job.ActiveTemplateVersion > 0 && !string.IsNullOrWhiteSpace(job.ActiveTemplate));

    public static (string Step, string Message)? MissingStep(DailyReportJob job)
    {
        var notification = NotificationSettingsStore.Load();
        if (!notification.DingTalkEnabled || string.IsNullOrWhiteSpace(notification.EncryptedWebhook) ||
            string.IsNullOrWhiteSpace(notification.EncryptedSecret))
            return ("notification", "请先在系统设置中完成通知渠道配置。");
        return null;
    }

    private static DailyReportJob FindJob(string taskId) =>
        DailyReportSettingsStore.LoadCatalog().Jobs.FirstOrDefault(item => item.Id == taskId)
        ?? throw new InvalidOperationException("找不到指定的日报任务。");

    private static AutomationTaskSummary ToSummary(DailyReportJob job, bool schedulerInstalled, string schedulerMessage)
    {
        var last = DailyReportSettingsStore.LoadRunRecords(job.Id).FirstOrDefault();
        var missing = MissingStep(job);
        var enabled = DailyReportTaskScheduler.IsSchedulingAvailable && job.IsEnabled;
        var status = enabled && !schedulerInstalled ? "schedule-error" : enabled ? "enabled" :
            missing is not null ? "incomplete" : "ready";
        var notification = NotificationSettingsStore.Load();
        var connection = notification.DingTalkConnected == true ? "全局通知正常" :
            string.IsNullOrWhiteSpace(notification.EncryptedWebhook) ? "全局通知未配置" : "全局通知待检测";
        return new(Type, "日报推送", job.Id, job.Name, job.SendTime, enabled,
            DailyReportTaskScheduler.IsSchedulingAvailable, status, schedulerMessage, connection,
            last is null ? "暂无运行记录" : $"{last.StartedAt:MM-dd HH:mm} · {(last.Succeeded ? "成功" : "失败")}",
            missing?.Step, missing?.Message);
    }
}
