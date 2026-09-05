using Microsoft.UI.Xaml;

namespace ProductionAssistant;

public partial class App : Application
{
    public static MainWindow MainWindow { get; private set; } = null!;

    public App()
    {
        InitializeComponent();
        UnhandledException += (_, args) =>
        {
            try
            {
                var logFolder = Services.RuntimeEnvironment.LogDirectory;
                Directory.CreateDirectory(logFolder);
                var exception = args.Exception;
                var log = $"[{DateTimeOffset.Now:O}] {exception.GetType().FullName}: {exception.Message}{Environment.NewLine}" +
                          $"{exception.StackTrace}{Environment.NewLine}";
                File.WriteAllText(Path.Combine(logFolder, "crash.log"), log);
            }
            catch
            {
                // Crash logging must never hide the original application failure.
            }
        };
    }

    protected override async void OnLaunched(LaunchActivatedEventArgs args)
    {
        Services.RuntimeEnvironment.WriteStartupSummary();
        var arguments = Environment.GetCommandLineArgs();
        var legacyDailyReport = HasArgument(arguments, "--send-daily-report");
        var automationTask = HasArgument(arguments, "--run-automation-task");
        if (legacyDailyReport || automationTask)
        {
            var taskType = legacyDailyReport
                ? Services.DailyReportTaskHandler.Type
                : ReadArgument(arguments, "--task-type");
            var taskId = legacyDailyReport
                ? ReadArgument(arguments, "--job-id")
                : ReadArgument(arguments, "--task-id");
            try
            {
                if (string.IsNullOrWhiteSpace(taskType) || string.IsNullOrWhiteSpace(taskId))
                    Environment.ExitCode = (int)Models.DailyReportExitCode.JobNotFound;
                else
                    Environment.ExitCode = (await AppServices.AutomationTasks.RunAsync(taskType, taskId)).Result.ExitCode;
            }
            catch
            {
                Environment.ExitCode = (int)Models.DailyReportExitCode.JobNotFound;
            }
            Exit();
            return;
        }

        MainWindow = new MainWindow();
        MainWindow.Activate();
        Services.PrototypeWebViewRuntime.Mark("window-activated");
        Services.PrototypeWebViewRuntime.Prewarm();
        MainWindow.AppWindow.Resize(new Windows.Graphics.SizeInt32(1400, 860));
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
