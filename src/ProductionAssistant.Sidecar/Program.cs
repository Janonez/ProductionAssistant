using System.Text;
using ProductionAssistant.Services;

namespace ProductionAssistant.Sidecar;

static class Program
{
    static async Task<int> Main(string[] args)
    {
        try
        {
            if (!HasExplicitEnvironment(args))
            {
                Console.Error.WriteLine("必须通过 --environment 显式指定 Development 或 Production。");
                return 2;
            }
            _ = RuntimeEnvironment.Current;
            RuntimeEnvironment.WriteStartupSummary();

            var legacyDailyReport = HasArgument(args, "--send-daily-report");
            var automationTask = HasArgument(args, "--run-automation-task");
            if (legacyDailyReport || automationTask)
            {
                var taskType = legacyDailyReport
                    ? DailyReportTaskHandler.Type
                    : ReadArgument(args, "--task-type");
                var taskId = legacyDailyReport
                    ? ReadArgument(args, "--job-id")
                    : ReadArgument(args, "--task-id");
                await AutomationLauncher.RunAsync(taskType, taskId);
                return Environment.ExitCode;
            }

            var utf8 = new UTF8Encoding(false);
            Console.InputEncoding = utf8;
            Console.OutputEncoding = utf8;
            var output = new StreamWriter(Console.OpenStandardOutput(), utf8);
            Console.SetOut(Console.Error);
            using var input = new StreamReader(Console.OpenStandardInput(), utf8);
            return await new StdioHost(input, output, Console.Error).RunAsync();
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"运行环境或宿主初始化失败（{ex.GetType().Name}）。");
            return 2;
        }
    }

    private static bool HasExplicitEnvironment(string[] arguments)
    {
        for (var index = 0; index < arguments.Length; index++)
        {
            const string prefix = "--environment=";
            if (arguments[index].StartsWith(prefix, StringComparison.OrdinalIgnoreCase) &&
                !string.IsNullOrWhiteSpace(arguments[index][prefix.Length..]))
                return true;
            if (string.Equals(arguments[index], "--environment", StringComparison.OrdinalIgnoreCase) &&
                index + 1 < arguments.Length && !string.IsNullOrWhiteSpace(arguments[index + 1]))
                return true;
        }
        return false;
    }

    private static bool HasArgument(string[] arguments, string name) =>
        arguments.Any(argument => string.Equals(argument, name, StringComparison.OrdinalIgnoreCase));

    private static string ReadArgument(string[] arguments, string name)
    {
        var index = Array.FindIndex(arguments,
            argument => string.Equals(argument, name, StringComparison.OrdinalIgnoreCase));
        return index >= 0 && index + 1 < arguments.Length ? arguments[index + 1] : string.Empty;
    }
}
