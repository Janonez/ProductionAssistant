using System.Diagnostics;
using System.Xml.Linq;

namespace ProductionAssistant.Services;

public static class DailyReportTaskScheduler
{
    private const string TaskPrefix = "ProductionAssistant-DailyReport-";
    public static bool IsSchedulingAvailable => RuntimeEnvironment.Current.SchedulerEnabled;
    public static string TaskName(string jobId) => TaskPrefix + jobId;

    public static async Task<(bool Succeeded, string Message)> InstallAsync(string jobId, TimeSpan sendTime)
    {
        if (!IsSchedulingAvailable) return (false, "Development 环境默认不启用定时发送。");
        var executable = Environment.ProcessPath;
        if (string.IsNullOrWhiteSpace(executable) || !File.Exists(executable))
            return (false, "无法确定生产助手程序路径。");
        var command = $"\"{executable}\" --environment {RuntimeEnvironment.Current.Name} --send-daily-report --job-id {jobId}";
        var result = await RunSchtasksAsync([
            "/Create", "/TN", TaskName(jobId), "/TR", command,
            "/SC", "DAILY", "/ST", sendTime.ToString(@"hh\:mm"), "/F", "/IT", "/RL", "LIMITED",
            "/RU", Environment.UserName
        ], $"定时任务已安装；每天 {sendTime:hh\\:mm} 在当前用户登录时运行。");
        if (result.Succeeded) EnableWakeAndCatchUp(jobId);
        return result;
    }

    public static Task<(bool Succeeded, string Message)> RemoveAsync(string jobId) =>
        IsSchedulingAvailable
            ? RunSchtasksAsync(["/Delete", "/TN", TaskName(jobId), "/F"], "定时任务已停用。")
            : Task.FromResult((false, "Development 环境默认不启用定时发送。"));

    public static async Task<(bool Installed, string Message)> GetStatusAsync(string jobId, string configuredTime)
    {
        if (!IsSchedulingAvailable) return (false, "Development 环境不启用定时发送");
        var result = await RunSchtasksAsync(["/Query", "/TN", TaskName(jobId), "/XML"], string.Empty);
        if (!result.Succeeded) return (false, "未安装");
        var executable = ExecutableFromTaskXml(result.Message);
        return string.IsNullOrWhiteSpace(executable) || !File.Exists(executable)
            ? (true, "已安装，但原程序路径已失效，请更新任务")
            : !result.Message.Contains($"T{configuredTime}:00", StringComparison.Ordinal)
                ? (true, "已安装，但发送时间已变化，请更新任务")
                : (true, $"已安装 · 每天 {configuredTime}");
    }

    public static string ExecutableFromTaskXml(string xml)
    {
        try
        {
            return XDocument.Parse(xml).Descendants()
                .FirstOrDefault(element => element.Name.LocalName == "Command")?.Value.Trim() ?? string.Empty;
        }
        catch { return string.Empty; }
    }

    private static async Task<(bool Succeeded, string Message)> RunSchtasksAsync(IReadOnlyList<string> arguments, string successMessage)
    {
        try
        {
            using var process = new Process { StartInfo = new ProcessStartInfo
            {
                FileName = Path.Combine(Environment.SystemDirectory, "schtasks.exe"), UseShellExecute = false,
                CreateNoWindow = true, RedirectStandardOutput = true, RedirectStandardError = true
            } };
            foreach (var argument in arguments) process.StartInfo.ArgumentList.Add(argument);
            if (!process.Start()) return (false, "无法启动 Windows 任务计划工具。");
            var output = await process.StandardOutput.ReadToEndAsync();
            var error = await process.StandardError.ReadToEndAsync();
            await process.WaitForExitAsync();
            return process.ExitCode == 0
                ? (true, string.IsNullOrWhiteSpace(successMessage) ? output.Trim() : successMessage)
                : (false, string.IsNullOrWhiteSpace(error) ? output.Trim() : error.Trim());
        }
        catch (Exception ex) { return (false, $"任务计划操作失败：{ex.Message}"); }
    }

    private static void EnableWakeAndCatchUp(string jobId)
    {
        try
        {
            var serviceType = Type.GetTypeFromProgID("Schedule.Service");
            if (serviceType is null) return;
            dynamic service = Activator.CreateInstance(serviceType)!;
            service.Connect();
            dynamic folder = service.GetFolder("\\");
            dynamic task = folder.GetTask(TaskName(jobId));
            dynamic definition = task.Definition;
            definition.Settings.WakeToRun = true;
            definition.Settings.StartWhenAvailable = true;
            folder.RegisterTaskDefinition(TaskName(jobId), definition, 6, null, null, 3, null);
        }
        catch { }
    }
}
