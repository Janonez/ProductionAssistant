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
                var logFolder = Path.Combine(
                    Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                    "ProductionAssistant");
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
        if (Environment.GetCommandLineArgs().Any(argument =>
                string.Equals(argument, "--send-daily-report", StringComparison.OrdinalIgnoreCase)))
        {
            var arguments = Environment.GetCommandLineArgs();
            var jobIdIndex = Array.FindIndex(arguments,
                argument => string.Equals(argument, "--job-id", StringComparison.OrdinalIgnoreCase));
            var jobId = jobIdIndex >= 0 && jobIdIndex + 1 < arguments.Length ? arguments[jobIdIndex + 1] : string.Empty;
            var exitCode = string.IsNullOrWhiteSpace(jobId)
                ? Models.DailyReportExitCode.JobNotFound
                : await new Services.DailyReportRunner().RunAsync(jobId);
            Environment.ExitCode = (int)exitCode;
            Exit();
            return;
        }

        MainWindow = new MainWindow();
        MainWindow.Activate();
        Services.PrototypeWebViewRuntime.Mark("window-activated");
        Services.PrototypeWebViewRuntime.Prewarm();
        MainWindow.AppWindow.Resize(new Windows.Graphics.SizeInt32(1400, 860));
    }
}
