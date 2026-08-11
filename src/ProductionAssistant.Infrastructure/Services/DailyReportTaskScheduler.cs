using System.Diagnostics;

namespace ProductionAssistant.Services;

public static class DailyReportTaskScheduler
{
    public const string TaskName = "ProductionAssistant-DailyReport";

    public static async Task<(bool Succeeded, string Message)> InstallAsync(TimeSpan sendTime)
    {
        var executable = Environment.ProcessPath;
        if (string.IsNullOrWhiteSpace(executable) || !File.Exists(executable))
            return (false, "无法确定生产助手程序路径。");
        var command = $"\"{executable}\" --send-daily-report";
        var result = await RunSchtasksAsync([
            "/Create", "/TN", TaskName, "/TR", command,
            "/SC", "DAILY", "/ST", sendTime.ToString(@"hh\:mm"), "/F", "/IT", "/RL", "LIMITED",
            "/RU", Environment.UserName
        ], $"定时任务已安装；每天 {sendTime:hh\\:mm} 在当前用户登录时运行。");
        if (result.Succeeded) EnableWakeAndCatchUp();
        return result;
    }

    public static Task<(bool Succeeded, string Message)> RemoveAsync() =>
        RunSchtasksAsync(["/Delete", "/TN", TaskName, "/F"], "定时任务已停用。");

    public static async Task<(bool Installed, string Message)> GetStatusAsync(string configuredTime)
    {
        var result = await RunSchtasksAsync(["/Query", "/TN", TaskName, "/XML"], string.Empty);
        if (!result.Succeeded) return (false, "未安装");
        var executable = Environment.ProcessPath;
        return !string.IsNullOrWhiteSpace(executable) &&
               !result.Message.Contains(executable, StringComparison.OrdinalIgnoreCase)
            ? (true, "已安装，但程序路径已变化，请点击“安装 / 更新任务”")
            : !result.Message.Contains($"T{configuredTime}:00", StringComparison.Ordinal)
                ? (true, "已安装，但发送时间已变化，请点击“安装 / 更新任务”")
                : (true, $"已安装 · 每天 {configuredTime}");
    }

    private static async Task<(bool Succeeded, string Message)> RunSchtasksAsync(
        IReadOnlyList<string> arguments,
        string successMessage)
    {
        try
        {
            using var process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = Path.Combine(Environment.SystemDirectory, "schtasks.exe"),
                    UseShellExecute = false,
                    CreateNoWindow = true,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true
                }
            };
            foreach (var argument in arguments) process.StartInfo.ArgumentList.Add(argument);
            if (!process.Start()) return (false, "无法启动 Windows 任务计划工具。");
            var output = await process.StandardOutput.ReadToEndAsync();
            var error = await process.StandardError.ReadToEndAsync();
            await process.WaitForExitAsync();
            return process.ExitCode == 0
                ? (true, string.IsNullOrWhiteSpace(successMessage) ? output.Trim() : successMessage)
                : (false, string.IsNullOrWhiteSpace(error) ? output.Trim() : error.Trim());
        }
        catch (Exception ex)
        {
            return (false, $"任务计划操作失败：{ex.Message}");
        }
    }

    private static void EnableWakeAndCatchUp()
    {
        try
        {
            var serviceType = Type.GetTypeFromProgID("Schedule.Service");
            if (serviceType is null) return;
            dynamic service = Activator.CreateInstance(serviceType)!;
            service.Connect();
            dynamic folder = service.GetFolder("\\");
            dynamic task = folder.GetTask(TaskName);
            dynamic definition = task.Definition;
            definition.Settings.WakeToRun = true;
            definition.Settings.StartWhenAvailable = true;
            folder.RegisterTaskDefinition(TaskName, definition, 6, null, null, 3, null);
        }
        catch
        {
            // The task remains usable even if optional wake/catch-up settings are unavailable.
        }
    }
}
