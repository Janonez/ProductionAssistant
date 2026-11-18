using System.Diagnostics;
using System.Globalization;
using System.Security.Principal;
using System.Text;
using System.Text.Json.Nodes;
using System.Xml.Linq;

namespace ProductionAssistant.Services;

public static class TencentSheetTaskScheduler
{
    private sealed record WeeklySchedule(DayOfWeek[] Days, TimeOnly[] Times)
    {
        public static WeeklySchedule Create(IEnumerable<int> days, IEnumerable<string> times) =>
            new(days.Select(day => (DayOfWeek)day).ToArray(), times.Select(time => TimeOnly.ParseExact(time, "HH:mm", CultureInfo.InvariantCulture)).ToArray());

        public DateTimeOffset? Next(DateTimeOffset now, TimeZoneInfo timeZone)
        {
            var today = DateOnly.FromDateTime(TimeZoneInfo.ConvertTime(now, timeZone).DateTime);
            // A week can include a skipped local time at the daylight-saving transition.
            for (var day = 0; day <= 14; day++)
            {
                var date = today.AddDays(day);
                if (!Days.Contains(date.DayOfWeek)) continue;
                foreach (var time in Times.Order())
                {
                    var local = date.ToDateTime(time);
                    if (timeZone.IsInvalidTime(local)) continue;
                    var offset = timeZone.IsAmbiguousTime(local) ? timeZone.GetAmbiguousTimeOffsets(local).Max() : timeZone.GetUtcOffset(local);
                    var candidate = new DateTimeOffset(local, offset);
                    if (candidate > now) return candidate;
                }
            }
            return null;
        }
    }

    public static DateTimeOffset? NextGroupSubmissionRun(GroupSubmissionRules rules, bool hasBusiness, DateTimeOffset now, TimeZoneInfo timeZone) =>
        rules.Automatic && hasBusiness ? WeeklySchedule.Create(rules.Weekdays, [rules.Time]).Next(now, timeZone) : null;

    public static bool IsAvailable => RuntimeEnvironment.Current.SchedulerEnabled;
    public static string TaskName(string id)
    {
        if (!Guid.TryParseExact(id, "N", out _)) throw new InvalidOperationException("任务标识无效。");
        return "ProductionAssistant-" + RuntimeEnvironment.Current.Name + "-TencentSheet-" + id;
    }

    public static string CreateXml(string id, string executable, string userId, JsonObject config)
    {
        _ = TaskName(id);
        TencentSheetService.ValidateExecutionRules(config);
        var executionSchedule = config["executionSchedule"]?.AsObject() ?? throw new InvalidOperationException("请先保存执行星期和时刻。");
        var schedule = WeeklySchedule.Create(executionSchedule["weekdays"]!.AsArray().Select(day => (int)day!),
            executionSchedule["times"]!.AsArray().Select(time => (string)time!));
        XNamespace ns = "http://schemas.microsoft.com/windows/2004/02/mit/task";
        XElement E(string name, params object[] content) => new(ns + name, content);
        return new XDocument(E("Task", new XAttribute("version", "1.2"),
            E("Triggers", schedule.Times.Select(time => E("CalendarTrigger",
                E("StartBoundary", $"2026-01-01T{time.ToString("HH:mm", CultureInfo.InvariantCulture)}:00+08:00"), E("Enabled", "true"),
                E("ScheduleByWeek", E("WeeksInterval", "1"), E("DaysOfWeek", schedule.Days.Select(day => E(day.ToString())).ToArray())))).ToArray()),
            E("Principals", E("Principal", new XAttribute("id", "Author"), E("UserId", userId), E("LogonType", "InteractiveToken"), E("RunLevel", "LeastPrivilege"))),
            E("Settings", E("MultipleInstancesPolicy", "IgnoreNew"), E("DisallowStartIfOnBatteries", "false"), E("StopIfGoingOnBatteries", "false"),
                E("StartWhenAvailable", "false"), E("Enabled", "true"), E("ExecutionTimeLimit", "PT15M")),
            E("Actions", new XAttribute("Context", "Author"), E("Exec", E("Command", executable),
                E("Arguments", $"--environment {RuntimeEnvironment.Current.Name} --run-automation-task --task-type {TencentSheetTaskHandler.Type} --task-id {id}"),
                E("WorkingDirectory", Path.GetDirectoryName(executable)!))))).ToString();
    }

    public static async Task InstallAsync(string id, JsonObject config)
    {
        if (!IsAvailable) throw new InvalidOperationException("当前环境未开放 Windows 定时任务；仍可使用前台和后台自动测试。");
        var executable = Environment.ProcessPath;
        if (string.IsNullOrEmpty(executable) || !File.Exists(executable)) throw new InvalidOperationException("程序路径无效。");
        var path = Path.Combine(Path.GetTempPath(), "tencent-schedule-" + Guid.NewGuid().ToString("N") + ".xml");
        try
        {
            // schtasks needs a BOM to preserve non-ASCII executable and working-directory paths.
            await File.WriteAllTextAsync(path, CreateXml(id, executable, WindowsIdentity.GetCurrent().User!.Value, config), Encoding.Unicode);
            await RunAsync(["/Create", "/TN", TaskName(id), "/XML", path, "/F"]);
        }
        finally { File.Delete(path); }
    }

    // Removal remains possible after the environment scheduling flag is turned off.
    public static Task RemoveAsync(string id) => RunAsync(["/Delete", "/TN", TaskName(id), "/F"]);

    private static async Task RunAsync(string[] arguments)
    {
        using var process = new Process { StartInfo = new ProcessStartInfo(Path.Combine(Environment.SystemDirectory, "schtasks.exe"))
        { UseShellExecute = false, CreateNoWindow = true, RedirectStandardOutput = true, RedirectStandardError = true } };
        foreach (var argument in arguments) process.StartInfo.ArgumentList.Add(argument);
        process.Start();
        var output = process.StandardOutput.ReadToEndAsync();
        var error = process.StandardError.ReadToEndAsync();
        await process.WaitForExitAsync();
        if (process.ExitCode != 0) throw new InvalidOperationException("Windows 定时任务操作失败：" + await error + await output);
        await Task.WhenAll(output, error);
    }
}
