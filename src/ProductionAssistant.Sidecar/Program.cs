using System.Text;
using ProductionAssistant.Services;

namespace ProductionAssistant.Sidecar;

static class Program
{
    static async Task<int> Main(string[] args)
    {
        var utf8 = new UTF8Encoding(false);
        Console.InputEncoding = utf8;
        Console.OutputEncoding = utf8;
        using var output = new StreamWriter(Console.OpenStandardOutput(), utf8);
        // From this point all ordinary application logging goes to stderr.
        Console.SetOut(Console.Error);
        var startupId = Environment.GetEnvironmentVariable("METIS_STARTUP_ID") ?? Guid.NewGuid().ToString("N");
        var trace = new StartupTrace(output, Console.Error, startupId);
        try
        {
            if (!HasExplicitEnvironment(args))
            {
                Console.Error.WriteLine("必须通过 --environment 显式指定 Development 或 Production。");
                return 2;
            }
            var legacyDailyReport = HasArgument(args, "--send-daily-report");
            var automationTask = HasArgument(args, "--run-automation-task");
            if (!legacyDailyReport && !automationTask) trace.Lifecycle("Initializing");
            trace.Measure("environment", () => { _ = RuntimeEnvironment.Current; });
            trace.Measure("startup-summary", RuntimeEnvironment.WriteStartupSummary);
            trace.Measure("migration", () =>
            {
                if (legacyDailyReport || automationTask)
                    StartupMigration.Run(message => Console.Error.WriteLine(message));
                else StartupMigration.RunRequired(
                    message => Console.Error.WriteLine(message),
                    (phase, status, elapsedMs) => trace.Record("migration." + phase, status, elapsedMs));
            });

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

            using var input = new StreamReader(Console.OpenStandardInput(), utf8);
            StdioHost? host = null;
            trace.Measure("stdio", () => host = new StdioHost(input, output, Console.Error, startupId));
            return await host!.RunAsync();
        }
        catch (Exception ex)
        {
            trace.Lifecycle("Failed", "SIDECAR_INITIALIZATION_FAILED");
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
