using System.Text.Json;

namespace ProductionAssistant.Services;

public sealed record RuntimeEnvironmentInfo(
    string Name,
    string Source,
    string DefaultDataDirectory,
    bool SchedulerEnabled)
{
    public bool IsDevelopment => Name == RuntimeEnvironment.Development;
}

public static class RuntimeEnvironment
{
    public const string Development = "Development";
    public const string Production = "Production";

    private static readonly Lazy<RuntimeEnvironmentInfo> CurrentValue = new(() => Resolve(
        Environment.GetCommandLineArgs(),
        Environment.GetEnvironmentVariable("DOTNET_ENVIRONMENT"),
        AppContext.BaseDirectory,
        Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData)));

    public static RuntimeEnvironmentInfo Current => CurrentValue.Value;

    public static string DataDirectory =>
        Environment.GetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR") is { Length: > 0 } custom
            ? Path.Combine(Path.GetFullPath(custom), Current.Name)
            : Current.DefaultDataDirectory;

    public static string LogDirectory => Path.Combine(DataDirectory, "logs");
    public static string TempDirectory => Path.Combine(DataDirectory, "temp");
    public static string CacheDirectory => Path.Combine(DataDirectory, "cache");
    public static string ExportDirectory => Path.Combine(DataDirectory, "exports");

    public static void WritePerformanceLog(string message, bool force = false)
    {
        if (!force && !string.Equals(
                Path.GetFileNameWithoutExtension(Environment.ProcessPath),
                "ProductionAssistant",
                StringComparison.OrdinalIgnoreCase)) return;
        try
        {
            Directory.CreateDirectory(LogDirectory);
            File.AppendAllText(Path.Combine(LogDirectory, "notion-performance.log"),
                $"[{DateTimeOffset.Now:O}] {message}{Environment.NewLine}");
        }
        catch
        {
            // Diagnostics must never block report generation.
        }
    }

    public static RuntimeEnvironmentInfo Resolve(
        IReadOnlyList<string> arguments,
        string? dotnetEnvironment,
        string baseDirectory,
        string localApplicationData)
    {
        var requested = ReadArgument(arguments);
        var source = "command line";
        if (string.IsNullOrWhiteSpace(requested))
        {
            requested = dotnetEnvironment;
            source = "DOTNET_ENVIRONMENT";
        }
        if (string.IsNullOrWhiteSpace(requested))
        {
            requested = ReadDeploymentMarker(baseDirectory);
            source = "runtime-environment.json";
        }
        if (string.IsNullOrWhiteSpace(requested))
        {
            requested = Production;
            source = "safe default";
        }

        var name = Normalize(requested);
        var productionDirectory = Path.Combine(localApplicationData, "ProductionAssistant");
        var dataDirectory = name == Development
            ? Path.Combine(productionDirectory, Development)
            : productionDirectory;
        return new(name, source, dataDirectory, ReadSchedulerEnabled(baseDirectory, name));
    }

    public static void WriteStartupSummary()
    {
        try
        {
            Directory.CreateDirectory(LogDirectory);
            File.AppendAllText(Path.Combine(LogDirectory, "startup.log"),
                $"[{DateTimeOffset.Now:O}] Environment: {Current.Name}; " +
                $"Scheduler: {(Current.SchedulerEnabled ? "Enabled" : "Disabled")}; " +
                $"Storage: {DataDirectory}{Environment.NewLine}");
        }
        catch
        {
            // Startup diagnostics must never block the application.
        }
    }

    private static string? ReadArgument(IReadOnlyList<string> arguments)
    {
        for (var index = 0; index < arguments.Count; index++)
        {
            const string prefix = "--environment=";
            if (arguments[index].StartsWith(prefix, StringComparison.OrdinalIgnoreCase))
                return arguments[index][prefix.Length..];
            if (string.Equals(arguments[index], "--environment", StringComparison.OrdinalIgnoreCase) &&
                index + 1 < arguments.Count)
                return arguments[index + 1];
        }
        return null;
    }

    private static string? ReadDeploymentMarker(string baseDirectory)
    {
        var path = Path.Combine(baseDirectory, "runtime-environment.json");
        if (!File.Exists(path)) return null;
        using var document = JsonDocument.Parse(File.ReadAllText(path));
        return document.RootElement.TryGetProperty("environment", out var value)
            ? value.GetString()
            : null;
    }

    private static bool ReadSchedulerEnabled(string baseDirectory, string name)
    {
        var path = Path.Combine(baseDirectory, $"appsettings.{name}.json");
        if (!File.Exists(path)) return name == Production;
        using var document = JsonDocument.Parse(File.ReadAllText(path));
        return document.RootElement.TryGetProperty("Scheduler", out var scheduler) &&
               scheduler.TryGetProperty("Enabled", out var enabled)
            ? enabled.GetBoolean()
            : name == Production;
    }

    private static string Normalize(string name) => name.Trim() switch
    {
        var value when value.Equals(Development, StringComparison.OrdinalIgnoreCase) => Development,
        var value when value.Equals(Production, StringComparison.OrdinalIgnoreCase) => Production,
        _ => throw new InvalidOperationException(
            $"不支持运行环境“{name}”。仅允许 {Development} 或 {Production}。")
    };
}
