using System.Text.Json;
using ProductionAssistant.Automation;
using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public sealed class NotionFillTaskHandler(MaterialInboundNotionFillService? service = null)
    : IAutomationTaskHandler
{
    public const string Type = "notion_fill";
    private readonly MaterialInboundNotionFillService _service = service ?? new();
    public string TaskType => Type;

    public async Task<IReadOnlyList<AutomationTaskSummary>> ListTasksAsync()
    {
        var result = new List<AutomationTaskSummary>();
        foreach (var job in NotionFillSettingsStore.LoadCatalog().Jobs)
        {
            var scheduler = await NotionFillTaskScheduler.GetStatusAsync(job.Id);
            result.Add(ToSummary(job, scheduler.Installed, scheduler.Message));
        }
        return result;
    }

    public async Task<AutomationTask> GetTaskAsync(string taskId)
    {
        var job = FindJob(taskId);
        var scheduler = await NotionFillTaskScheduler.GetStatusAsync(job.Id);
        return new(job.Id, Type, job.Name, job.IsEnabled, NotionFillTaskScheduler.Schedule,
            ToSummary(job, scheduler.Installed, scheduler.Message).Status,
            JsonSerializer.SerializeToElement(job));
    }

    public async Task<AutomationTaskRunResult> ExecuteAsync(
        AutomationTaskExecutionContext context,
        JsonElement config,
        CancellationToken cancellationToken)
    {
        NotionFillJob? job;
        try
        {
            job = config.Deserialize<NotionFillJob>();
        }
        catch (JsonException ex)
        {
            return new(false, (int)NotionFillExitCode.InvalidConfiguration, ex.Message);
        }
        if (job is null || job.Id != context.TaskId)
            return new(false, (int)NotionFillExitCode.InvalidConfiguration, "Notion 自动填报任务配置无效。");

        return await ExecuteForDateAsync(
            job,
            ResolveBusinessDate(context.StartedAt),
            context.Trigger,
            context.StartedAt,
            cancellationToken);
    }

    public async Task<AutomationTaskRunResult> ExecuteForDateAsync(
        NotionFillJob job,
        DateOnly businessDate,
        string trigger,
        DateTimeOffset startedAt,
        CancellationToken cancellationToken = default)
    {
        var record = new NotionFillRunRecord
        {
            JobId = job.Id,
            Source = trigger,
            StartedAt = startedAt,
            BusinessDate = businessDate.ToString("yyyy-MM-dd")
        };
        try
        {
            var preview = await _service.PreviewAsync(job, businessDate, cancellationToken);
            record.PlateWeight = preview.Summary.PlateWeight;
            record.SectionWeight = preview.Summary.SectionWeight;
            if (preview.TargetRecordExists)
            {
                record.Succeeded = true;
                record.Message = $"{businessDate:yyyy-MM-dd} 已有记录，本次未重复新增。";
                return new(true, (int)NotionFillExitCode.AlreadyExists, record.Message);
            }
            await _service.CreateAsync(job, preview, cancellationToken);
            record.Created = true;
            record.Succeeded = true;
            record.Message = $"已新增 {businessDate:yyyy-MM-dd} 原材料入库：板材 {record.PlateWeight:0.###} 吨，型材 {record.SectionWeight:0.###} 吨。";
            return new(true, (int)NotionFillExitCode.Success, record.Message);
        }
        catch (Exception ex) when (ex is not OperationCanceledException)
        {
            record.Error = ex.Message;
            return new(false, (int)NotionFillExitCode.SourceFailure, ex.Message);
        }
        finally
        {
            record.FinishedAt = DateTimeOffset.Now;
            NotionFillSettingsStore.AddRunRecord(record);
        }
    }

    public async Task<AutomationTaskToggleResult> SetEnabledAsync(string taskId, bool enabled)
    {
        if (!NotionFillTaskScheduler.IsSchedulingAvailable)
            throw new InvalidOperationException("Development 环境默认不启用定时填报。");
        var job = FindJob(taskId);
        if (!enabled)
        {
            var removed = await NotionFillTaskScheduler.RemoveAsync(job.Id);
            if (!removed.Succeeded) throw new InvalidOperationException(removed.Message);
            job.IsEnabled = false;
            NotionFillSettingsStore.SaveJob(job);
            return new(false);
        }
        var missing = MissingStep(job);
        if (missing is not null) return new(false, MissingStep: missing.Value.Step, Message: missing.Value.Message);
        var installed = await NotionFillTaskScheduler.InstallAsync(job.Id);
        if (!installed.Succeeded) throw new InvalidOperationException(installed.Message);
        job.IsEnabled = true;
        NotionFillSettingsStore.SaveJob(job);
        return new(true);
    }

    public async Task DeleteAsync(string taskId)
    {
        var job = FindJob(taskId);
        if (job.IsEnabled) throw new InvalidOperationException("请先停用任务，再删除配置和运行记录。");
        if (NotionFillTaskScheduler.IsSchedulingAvailable)
            await NotionFillTaskScheduler.RemoveAsync(job.Id);
        if (!NotionFillSettingsStore.DeleteJob(job.Id))
            throw new InvalidOperationException("没有找到要删除的任务。");
    }

    public static (string Step, string Message)? MissingStep(NotionFillJob job)
    {
        if (string.IsNullOrWhiteSpace(job.Name)) return ("basics", "请先填写任务名称。");
        if (string.IsNullOrWhiteSpace(job.BaseUrl) || string.IsNullOrWhiteSpace(job.SourcePageUrl) ||
            string.IsNullOrWhiteSpace(job.Username) ||
            string.IsNullOrWhiteSpace(job.EncryptedPassword))
            return ("connection", "请先配置并测试93系统连接。");
        if (string.IsNullOrWhiteSpace(NotionSettingsStore.Load().Token))
            return ("target", "请先在系统设置中配置并测试 Notion 连接。");
        if (string.IsNullOrWhiteSpace(job.TargetDataSourceId))
            return ("target", "没有找到原材料入库数据库，请先刷新 Notion 数据库目录。");
        if (!job.ConfigurationValidated) return ("test", "请先使用历史日期完成只读测试。");
        return null;
    }

    public static DateOnly ResolveBusinessDate(DateTimeOffset startedAt) =>
        DateOnly.FromDateTime(startedAt.LocalDateTime.Date.AddDays(-1));

    private static NotionFillJob FindJob(string taskId) =>
        NotionFillSettingsStore.LoadCatalog().Jobs.FirstOrDefault(job => job.Id == taskId)
        ?? throw new InvalidOperationException("找不到指定的 Notion 自动填报任务。");

    private static AutomationTaskSummary ToSummary(
        NotionFillJob job,
        bool schedulerInstalled,
        string schedulerMessage)
    {
        var last = NotionFillSettingsStore.LoadRunRecords(job.Id).FirstOrDefault();
        var missing = MissingStep(job);
        var enabled = NotionFillTaskScheduler.IsSchedulingAvailable && job.IsEnabled;
        var status = enabled && !schedulerInstalled ? "schedule-error" : enabled ? "enabled" :
            missing?.Step is "basics" or "connection" or "target" ? "incomplete" :
            !job.ConfigurationValidated ? "pending-test" : "ready";
        var notion = NotionSettingsStore.Load();
        var connection = string.IsNullOrWhiteSpace(job.Username) ? "93系统未配置" :
            string.IsNullOrWhiteSpace(notion.Token) ? "Notion 未配置" : "93系统 + Notion";
        return new(Type, "Notion 自动填报", job.Id, job.Name,
            "每天 00:00 · 前一天", enabled, NotionFillTaskScheduler.IsSchedulingAvailable,
            status, schedulerMessage, connection,
            last is null ? "暂无运行记录" : $"{last.StartedAt:MM-dd HH:mm} · {(last.Succeeded ? "成功" : "失败")}",
            missing?.Step, missing?.Message);
    }
}
