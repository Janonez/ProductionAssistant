using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public sealed class DailyReportRunner
{
    private readonly DailyReportService _service = new();

    public async Task<DailyReportExitCode> RunAsync(string jobId, CancellationToken cancellationToken = default)
    {
        var job = DailyReportSettingsStore.LoadCatalog().Jobs.FirstOrDefault(item => item.Id == jobId);
        if (job is null) { WriteLog(jobId, "找不到指定日报任务。"); return DailyReportExitCode.JobNotFound; }
        if (!job.IsEnabled) { WriteLog(jobId, "日报任务未启用，已跳过。"); return DailyReportExitCode.InvalidData; }
        return await ExecuteAsync(job, "automatic", DateTime.Today, job.ActiveTemplate, job.ActiveTemplateVersion, cancellationToken);
    }

    public async Task<DailyReportExitCode> TestAsync(
        DailyReportJob job, DateTime businessDate, string template, CancellationToken cancellationToken = default) =>
        await ExecuteAsync(job, "test", businessDate, template, job.ActiveTemplateVersion + 1, cancellationToken, preventDuplicate: false, alertOnFailure: false);

    public async Task<DailyReportExitCode> SendTodayAsync(string jobId, CancellationToken cancellationToken = default)
    {
        var job = DailyReportSettingsStore.LoadCatalog().Jobs.FirstOrDefault(item => item.Id == jobId);
        if (job is null) return DailyReportExitCode.JobNotFound;
        return await ExecuteAsync(job, "manual", DateTime.Today, job.ActiveTemplate, job.ActiveTemplateVersion, cancellationToken);
    }

    private async Task<DailyReportExitCode> ExecuteAsync(
        DailyReportJob job, string source, DateTime businessDate, string template, int version,
        CancellationToken cancellationToken, bool preventDuplicate = true, bool alertOnFailure = true)
    {
        var record = new DailyReportRunRecord
        {
            JobId = job.Id, Source = source, BusinessDate = businessDate.ToString("yyyy-MM-dd"),
            TemplateVersion = version, Stage = "读取配置"
        };
        DailyReportSettingsStore.AddRunRecord(record);
        WriteLog(job.Id, $"开始执行{(source == "test" ? "测试" : "自动")}日报。");

        if (preventDuplicate && DailyReportSettingsStore.LoadRunRecords(job.Id).Any(item =>
                item.Id != record.Id && item.Source != "test" && item.Succeeded &&
                item.BusinessDate == record.BusinessDate && item.TemplateVersion == version))
            return Finish(record, true, "已发送", "今日当前版本已经成功发送，跳过重复推送。", DailyReportExitCode.AlreadySent);
        if (string.IsNullOrWhiteSpace(template) || version <= 0)
            return Finish(record, false, "读取配置", "没有已发布的日报模板。", DailyReportExitCode.InvalidData);

        record.Stage = "读取 Notion 并生成内容";
        DailyReportSettingsStore.AddRunRecord(record);
        var build = await _service.BuildAsync(job, template, businessDate, cancellationToken);
        if (!build.Succeeded)
        {
            if (alertOnFailure) await SendAlertAsync(job, build.Message, cancellationToken);
            return Finish(record, false, record.Stage, build.Message, DailyReportExitCode.InvalidData);
        }
        record.TextSummary = Summarize(build.Text);
        record.Stage = "发送钉钉";
        DailyReportSettingsStore.AddRunRecord(record);

        DailyReportSendResult result = new(false, "尚未发送。", 0);
        for (var attempt = 1; attempt <= 3; attempt++)
        {
            result = (await _service.SendAsync(
                DailyReportSettingsStore.ReadWebhook(job), DailyReportSettingsStore.ReadSecret(job),
                build.Text, cancellationToken)) with { Attempts = attempt };
            record.Attempts = attempt;
            if (result.Succeeded || source == "test") break;
            if (attempt < 3) await Task.Delay(TimeSpan.FromMinutes(10), cancellationToken);
        }
        if (!result.Succeeded)
        {
            if (alertOnFailure) await SendAlertAsync(job, result.Message, cancellationToken);
            return Finish(record, false, record.Stage, result.Message, DailyReportExitCode.NetworkFailure, result.Message);
        }
        return Finish(record, true, "完成", string.Empty, DailyReportExitCode.Success, result.Message);
    }

    private async Task SendAlertAsync(DailyReportJob job, string error, CancellationToken cancellationToken)
    {
        var webhook = DailyReportSettingsStore.ReadWebhook(job);
        var secret = DailyReportSettingsStore.ReadSecret(job);
        if (string.IsNullOrWhiteSpace(webhook) || string.IsNullOrWhiteSpace(secret)) return;
        await _service.SendAsync(webhook, secret,
            $"【日报自动上报失败】\n任务：{job.Name}\n日期：{DateTime.Today:yyyy-MM-dd}\n原因：{error}", cancellationToken);
    }

    private static DailyReportExitCode Finish(
        DailyReportRunRecord record, bool succeeded, string stage, string error,
        DailyReportExitCode exitCode, string response = "")
    {
        record.FinishedAt = DateTimeOffset.Now;
        record.Succeeded = succeeded;
        record.Stage = stage;
        record.Error = error;
        record.Response = response;
        DailyReportSettingsStore.AddRunRecord(record);
        WriteLog(record.JobId, succeeded ? $"日报执行完成；{response}" : $"日报执行失败；阶段：{stage}；{error}");
        return exitCode;
    }

    private static string Summarize(string text) => text.Length <= 120 ? text : text[..120] + "…";

    private static void WriteLog(string jobId, string message)
    {
        try
        {
            var folder = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "ProductionAssistant");
            Directory.CreateDirectory(folder);
            File.AppendAllText(Path.Combine(folder, "daily-report.log"),
                $"[{DateTimeOffset.Now:O}] [job:{jobId}] {message}{Environment.NewLine}");
        }
        catch { }
    }
}
