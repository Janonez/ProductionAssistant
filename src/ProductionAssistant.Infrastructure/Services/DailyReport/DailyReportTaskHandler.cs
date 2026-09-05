using System.Text.Json;
using ProductionAssistant.Automation;
using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public sealed class DailyReportTaskHandler(DailyReportRunner? runner = null)
    : IAutomationTaskHandler
{
    public const string Type = "daily_report";
    private readonly DailyReportRunner _runner = runner ?? new();

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
        if (!DailyReportTaskScheduler.IsSchedulingAvailable)
            throw new InvalidOperationException("Development 环境默认不启用定时发送。");
        var job = FindJob(taskId);
        if (!enabled)
        {
            var removed = await DailyReportTaskScheduler.RemoveAsync(job.Id);
            if (!removed.Succeeded) throw new InvalidOperationException(removed.Message);
            job.IsEnabled = false;
            DailyReportSettingsStore.SaveJob(job);
            return new(false);
        }

        var missing = MissingStep(job);
        if (missing is not null) return new(false, MissingStep: missing.Value.Step, Message: missing.Value.Message);
        var installed = await DailyReportTaskScheduler.InstallAsync(job.Id, TimeSpan.Parse(job.SendTime));
        if (!installed.Succeeded) throw new InvalidOperationException(installed.Message);
        job.IsEnabled = true;
        DailyReportSettingsStore.SaveJob(job);
        var catchUp = DateTime.Now.TimeOfDay >= TimeSpan.Parse(job.SendTime) &&
            !DailyReportSettingsStore.LoadRunRecords(job.Id).Any(record =>
                record.Source != "test" && record.Succeeded &&
                record.BusinessDate == DateTime.Today.ToString("yyyy-MM-dd") &&
                record.TemplateVersion == job.ActiveTemplateVersion);
        var sentToday = catchUp && await _runner.RunAsync(job.Id) == DailyReportExitCode.Success;
        return new(true, sentToday);
    }

    public async Task DeleteAsync(string taskId)
    {
        var job = FindJob(taskId);
        if (job.IsEnabled) throw new InvalidOperationException("请先停用任务，再删除配置和运行记录。");
        await DailyReportTaskScheduler.RemoveAsync(job.Id);
        if (!DailyReportSettingsStore.DeleteJob(job.Id)) throw new InvalidOperationException("没有找到要删除的任务。");
    }

    public static bool IsValidated(DailyReportJob job) =>
        job.ConfigurationValidated ?? (job.ActiveTemplateVersion > 0 && !string.IsNullOrWhiteSpace(job.ActiveTemplate));

    public static (string Step, string Message)? MissingStep(DailyReportJob job)
    {
        if (string.IsNullOrWhiteSpace(job.Name)) return ("basics", "请先填写任务名称。");
        var notification = NotificationSettingsStore.Load();
        if (!notification.DingTalkEnabled || string.IsNullOrWhiteSpace(notification.EncryptedWebhook) ||
            string.IsNullOrWhiteSpace(notification.EncryptedSecret))
            return ("notification", "请先在系统设置中完成通知渠道配置。");
        if (notification.DingTalkConnected != true)
            return ("notification", "请先在系统设置中测试钉钉通知。");
        if (!IsValidated(job)) return ("template", "请先生成预览并完成测试发送。");
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
            missing?.Step is "basics" or "notification" ? "incomplete" : !IsValidated(job) ? "pending-test" : "ready";
        var notification = NotificationSettingsStore.Load();
        var connection = notification.DingTalkConnected == true ? "全局通知正常" :
            string.IsNullOrWhiteSpace(notification.EncryptedWebhook) ? "全局通知未配置" : "全局通知待检测";
        return new(Type, "日报推送", job.Id, job.Name, job.SendTime, enabled,
            DailyReportTaskScheduler.IsSchedulingAvailable, status, schedulerMessage, connection,
            last is null ? "暂无运行记录" : $"{last.StartedAt:MM-dd HH:mm} · {(last.Succeeded ? "成功" : "失败")}",
            missing?.Step, missing?.Message);
    }
}
