using System.Security.Cryptography;
using System.Text;
using ProductionAssistant.Services;

namespace ProductionAssistant;

public static class StartupMigration
{
    public static bool Run(Action<string>? log = null) => Run(log, TimeSpan.FromSeconds(10));

    internal static bool Run(Action<string>? log, TimeSpan timeout)
    {
        using var mutex = new Mutex(false, MutexName());
        var acquired = false;
        try
        {
            try { acquired = mutex.WaitOne(timeout); }
            catch (AbandonedMutexException) { acquired = true; }
            if (!acquired)
            {
                Log(log, "startup-migration-skipped-lock-timeout");
                return false;
            }

            try { DailyReportSettingsStore.LoadCatalog(); }
            catch (Exception ex) { Log(log, $"startup-migration-step-failed-{ex.GetType().Name}"); }
            try { ReportCenterConfigStore.Load(); }
            catch (Exception ex) { Log(log, $"startup-migration-step-failed-{ex.GetType().Name}"); }
            Log(log, "startup-migration-ran");
            return true;
        }
        finally
        {
            if (acquired) mutex.ReleaseMutex();
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
