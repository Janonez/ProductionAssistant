using System.Diagnostics;
using Microsoft.Web.WebView2.Core;

namespace ProductionAssistant.Services;

internal static class PrototypeWebViewRuntime
{
    private static readonly long StartedAt = Stopwatch.GetTimestamp();
    private static readonly Lazy<Task<CoreWebView2Environment>> EnvironmentTask = new(CreateEnvironmentAsync);

    internal static Task<CoreWebView2Environment> GetEnvironmentAsync() => EnvironmentTask.Value;

    internal static void Prewarm() => _ = GetEnvironmentAsync();

    internal static void Mark(string stage)
    {
        try
        {
            var folder = RuntimeEnvironment.LogDirectory;
            Directory.CreateDirectory(folder);
            var elapsed = Stopwatch.GetElapsedTime(StartedAt).TotalMilliseconds;
            File.AppendAllText(
                Path.Combine(folder, "startup.log"),
                $"[{DateTimeOffset.Now:O}] {stage} {elapsed:F0}ms{Environment.NewLine}");
        }
        catch
        {
            // Startup diagnostics must never block the application.
        }
    }

    private static async Task<CoreWebView2Environment> CreateEnvironmentAsync()
    {
        if (RuntimeEnvironment.Current.IsDevelopment)
            Environment.SetEnvironmentVariable("WEBVIEW2_USER_DATA_FOLDER", RuntimeEnvironment.CacheDirectory);
        var environment = await CoreWebView2Environment.CreateAsync();
        Mark("environment-ready");
        return environment;
    }
}
