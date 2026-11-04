using System.Diagnostics;
using System.Globalization;
using System.Runtime.InteropServices;
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
        var state = await CaptureAsync(jobId);
        if (!state.Installed) return (false, "未安装");
        var executable = ExecutableFromTaskXml(state.Xml);
        return string.IsNullOrWhiteSpace(executable) || !File.Exists(executable)
            ? (true, "已安装，但原程序路径已失效，请更新任务")
            : !state.Xml.Contains($"T{configuredTime}:00", StringComparison.Ordinal)
                ? (true, "已安装，但发送时间已变化，请更新任务")
                : (true, $"已安装 · 每天 {configuredTime}");
    }

    internal static Task<DailyReportScheduleState> CaptureAsync(string jobId) => Task.Run(() =>
        WithTaskFolder(folder =>
        {
            object task;
            try { task = ((dynamic)folder).GetTask(TaskName(jobId)); }
            // Only the documented Win32 file-not-found HRESULT means definite absence.
            // Access denied, service failures and every other query error must escape.
            catch (COMException ex) when (ex.HResult == unchecked((int)0x80070002))
            {
                return new DailyReportScheduleState(false, "");
            }
            try
            {
                var xml = (string)((dynamic)task).Xml;
                _ = XDocument.Parse(xml);
                return new DailyReportScheduleState(true, xml);
            }
            finally { ReleaseCom(task); }
        }));

    internal static async Task RestoreAsync(string jobId, DailyReportScheduleState original)
    {
        var current = await CaptureAsync(jobId);
        if (SameState(original, current)) return;
        if (!original.Installed)
        {
            var removed = await RemoveAsync(jobId);
            if (!removed.Succeeded) throw new IOException(removed.Message);
            return;
        }
        await Task.Run(() => WithTaskFolder(folder =>
        {
            // Our tasks use the current user's interactive token; no stored password is needed.
            var document = XDocument.Parse(original.Xml);
            var logonType = document.Descendants().FirstOrDefault(element => element.Name.LocalName == "LogonType")?.Value;
            if (logonType != "InteractiveToken")
                throw new InvalidOperationException("原计划任务登录方式不支持安全恢复。");
            object restored = ((dynamic)folder).RegisterTask(TaskName(jobId), original.Xml, 6, null, null, 3, null);
            ReleaseCom(restored);
            return true;
        }));
    }

    internal static bool SameState(DailyReportScheduleState expected, DailyReportScheduleState actual)
    {
        if (expected.Installed != actual.Installed) return false;
        if (!expected.Installed) return true;
        static XDocument Comparable(string xml)
        {
            var document = XDocument.Parse(xml);
            foreach (var date in document.Descendants().Where(element =>
                element.Name.LocalName == "Date" && element.Parent?.Name.LocalName == "RegistrationInfo").ToArray())
                date.Remove();
            return document;
        }
        return XNode.DeepEquals(Comparable(expected.Xml), Comparable(actual.Xml));
    }

    internal static void EnsureRestorable(DailyReportScheduleState state)
    {
        if (!state.Installed) return;
        var document = XDocument.Parse(state.Xml);
        var principals = document.Descendants().Where(element => element.Name.LocalName == "Principal").ToArray();
        if (document.Root?.Name.LocalName != "Task" || principals.Length != 1 ||
            principals[0].Elements().SingleOrDefault(element => element.Name.LocalName == "LogonType")?.Value != "InteractiveToken")
            throw new InvalidOperationException("原计划任务登录方式不支持安全恢复。");
    }

    internal static bool IsScheduledFor(DailyReportScheduleState state, TimeSpan time)
    {
        if (!state.Installed) return false;
        var document = XDocument.Parse(state.Xml);
        if (document.Descendants().Any(element => element.Name.LocalName == "Enabled" && element.Value == "false"))
            return false;
        return document.Descendants().Any(element => element.Name.LocalName == "StartBoundary" &&
            DateTime.TryParse(element.Value, CultureInfo.InvariantCulture, DateTimeStyles.None, out var start) &&
            start.TimeOfDay == time);
    }

    private static T WithTaskFolder<T>(Func<object, T> action)
    {
        var serviceType = Type.GetTypeFromProgID("Schedule.Service")
            ?? throw new InvalidOperationException("无法查询 Windows 任务计划服务。");
        var service = Activator.CreateInstance(serviceType)!;
        object? folder = null;
        try
        {
            ((dynamic)service).Connect();
            folder = ((dynamic)service).GetFolder("\\");
            return action(folder);
        }
        finally
        {
            if (folder is not null) ReleaseCom(folder);
            ReleaseCom(service);
        }
    }

    private static void ReleaseCom(object value)
    {
        if (Marshal.IsComObject(value)) Marshal.FinalReleaseComObject(value);
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
            var outputTask = process.StandardOutput.ReadToEndAsync();
            var errorTask = process.StandardError.ReadToEndAsync();
            await Task.WhenAll(outputTask, errorTask);
            await process.WaitForExitAsync();
            var output = await outputTask;
            var error = await errorTask;
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

internal sealed record DailyReportScheduleState(bool Installed, string Xml);

internal interface IDailyReportScheduler
{
    bool IsAvailable { get; }
    Task<DailyReportScheduleState> CaptureAsync(string jobId);
    Task<(bool Succeeded, string Message)> InstallAsync(string jobId, TimeSpan time);
    Task<(bool Succeeded, string Message)> RemoveAsync(string jobId);
    Task RestoreAsync(string jobId, DailyReportScheduleState original);
}

internal sealed class WindowsDailyReportScheduler : IDailyReportScheduler
{
    public bool IsAvailable => DailyReportTaskScheduler.IsSchedulingAvailable;
    public Task<DailyReportScheduleState> CaptureAsync(string jobId) => DailyReportTaskScheduler.CaptureAsync(jobId);
    public Task<(bool Succeeded, string Message)> InstallAsync(string jobId, TimeSpan time) =>
        DailyReportTaskScheduler.InstallAsync(jobId, time);
    public Task<(bool Succeeded, string Message)> RemoveAsync(string jobId) => DailyReportTaskScheduler.RemoveAsync(jobId);
    public Task RestoreAsync(string jobId, DailyReportScheduleState original) => DailyReportTaskScheduler.RestoreAsync(jobId, original);
}
