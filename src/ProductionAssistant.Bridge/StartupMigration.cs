using System.Security.Cryptography;
using System.Text;
using System.Diagnostics;
using ProductionAssistant.Services;

namespace ProductionAssistant;

public static class StartupMigration
{
    public static bool Run(Action<string>? log = null) => Run(log, TimeSpan.FromSeconds(10));

    internal static bool Run(Action<string>? log, TimeSpan timeout) => RunCore(log, timeout, false, null);

    public static void RunRequired(Action<string>? log = null, Action<string, string, double>? observe = null)
    {
        if (!RunCore(log, TimeSpan.FromSeconds(10), true, observe))
            throw new TimeoutException("启动迁移锁等待超时，尚未开放业务请求。");
    }

    private static bool RunCore(Action<string>? log, TimeSpan timeout, bool required, Action<string, string, double>? observe)
    {
        using var mutex = new Mutex(false, MutexName());
        var acquired = false;
        try
        {
            var lockStarted = Stopwatch.GetTimestamp();
            observe?.Invoke("lock", "start", 0);
            try { acquired = mutex.WaitOne(timeout); }
            catch (AbandonedMutexException) { acquired = true; }
            observe?.Invoke("lock", acquired ? "end" : "failed", Stopwatch.GetElapsedTime(lockStarted).TotalMilliseconds);
            if (!acquired)
            {
                Log(log, "startup-migration-skipped-lock-timeout");
                return false;
            }

            Step("daily-report", () => { DailyReportSettingsStore.LoadCatalog(); });
            Step("report-center", () => { ReportCenterConfigStore.Load(); });
            Log(log, "startup-migration-ran");
            return true;
        }
        finally
        {
            if (acquired) mutex.ReleaseMutex();
        }

        void Step(string phase, Action action)
        {
            var started = Stopwatch.GetTimestamp();
            observe?.Invoke(phase, "start", 0);
            try
            {
                action();
                observe?.Invoke(phase, "end", Stopwatch.GetElapsedTime(started).TotalMilliseconds);
            }
            catch (Exception ex)
            {
                observe?.Invoke(phase, "failed", Stopwatch.GetElapsedTime(started).TotalMilliseconds);
                Log(log, $"startup-migration-step-failed-{ex.GetType().Name}");
                if (required) throw;
            }
        }
    }

    internal static string MutexName()
    {
        var path = Path.GetFullPath(RuntimeEnvironment.DataDirectory).ToLowerInvariant();
        var hash = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(path)))[..16];
        return @"Local\ProductionAssistant.StartupMigration." + hash;
    }

    private static void Log(Action<string>? log, string message)
    {
        try { log?.Invoke(message); }
        catch { }
    }
}
