using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public sealed class DailyReportRunner
{
    private readonly DailyReportService _service = new();

    public async Task<DailyReportExitCode> RunAsync(CancellationToken cancellationToken = default)
    {
        var settings = DailyReportSettingsStore.Load();
        var state = DailyReportSettingsStore.LoadState();
        var today = DateTime.Today;
        state.LastRunAt = DateTimeOffset.Now;
        WriteLog("开始执行自动日报。");

        if (state.WasSent(
                today.ToString("yyyy-MM-dd"),
                settings.ActiveTemplateVersion,
                settings.SendTime))
        {
            WriteLog($"今日已按计划时间 {settings.SendTime} 成功发送，跳过重复推送。");
            return DailyReportExitCode.AlreadySent;
        }
        if (string.IsNullOrWhiteSpace(settings.ActiveTemplate) || settings.ActiveTemplateVersion <= 0)
            return SaveFailure(state, "没有已启用的日报模板。", DailyReportExitCode.InvalidData);

        var build = await _service.BuildAsync(settings, settings.ActiveTemplate, today, cancellationToken);
        if (!build.Succeeded)
        {
            await SendAlertAsync(settings, build.Message, cancellationToken);
            return SaveFailure(state, build.Message, DailyReportExitCode.InvalidData);
        }
        state.LastTextSummary = build.Text.Length <= 120
            ? build.Text
            : build.Text[..120] + "…";

        var webhook = DailyReportSettingsStore.ReadWebhook(settings);
        var secret = DailyReportSettingsStore.ReadSecret(settings);
        DailyReportSendResult result = new(false, "尚未发送。", 0);
        for (var attempt = 1; attempt <= 3; attempt++)
        {
            result = (await _service.SendAsync(webhook, secret, build.Text, cancellationToken)) with
            {
                Attempts = attempt
            };
            if (result.Succeeded) break;
            if (attempt < 3) await Task.Delay(TimeSpan.FromMinutes(10), cancellationToken);
        }

        state.LastAttempts = result.Attempts;
        state.LastResponse = result.Message;
        if (!result.Succeeded)
        {
            await SendAlertAsync(settings, result.Message, cancellationToken);
            return SaveFailure(state, result.Message, DailyReportExitCode.NetworkFailure);
        }

        state.LastSuccessAt = DateTimeOffset.Now;
        state.LastSuccessDate = today.ToString("yyyy-MM-dd");
        state.LastTemplateVersion = settings.ActiveTemplateVersion;
        state.LastSuccessSendTime = settings.SendTime;
        state.LastError = string.Empty;
        DailyReportSettingsStore.SaveState(state);
        WriteLog($"日报发送成功；业务日期 {today:yyyy-MM-dd}，尝试 {result.Attempts} 次。");
        return DailyReportExitCode.Success;
    }

    private async Task SendAlertAsync(
        DailyReportSettings settings,
        string error,
        CancellationToken cancellationToken)
    {
        var webhook = DailyReportSettingsStore.ReadWebhook(settings);
        var secret = DailyReportSettingsStore.ReadSecret(settings);
        if (string.IsNullOrWhiteSpace(webhook) || string.IsNullOrWhiteSpace(secret)) return;
        await _service.SendAsync(
            webhook,
            secret,
            $"【日报自动上报失败】\n日期：{DateTime.Today:yyyy-MM-dd}\n原因：{error}",
            cancellationToken);
    }

    private static DailyReportExitCode SaveFailure(
        DailyReportRunState state,
        string error,
        DailyReportExitCode exitCode)
    {
        state.LastError = error;
        DailyReportSettingsStore.SaveState(state);
        WriteLog($"日报执行失败；退出码 {(int)exitCode}；{error}");
        return exitCode;
    }

    private static void WriteLog(string message)
    {
        try
        {
            var folder = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                "ProductionAssistant");
            Directory.CreateDirectory(folder);
            File.AppendAllText(
                Path.Combine(folder, "daily-report.log"),
                $"[{DateTimeOffset.Now:O}] {message}{Environment.NewLine}");
        }
        catch
        {
            // Logging must not change the send result.
        }
    }
}
