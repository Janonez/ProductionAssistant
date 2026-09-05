using System.Text.Json;
using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public static class NotionFillSettingsStore
{
    private static readonly JsonSerializerOptions JsonOptions = new() { WriteIndented = true };
    private static readonly Mutex RunsMutex = new(false,
        $"Local\\ProductionAssistant-{RuntimeEnvironment.Current.Name}-NotionFillRuns");
    private static string JobsPath => Path.Combine(RuntimeEnvironment.DataDirectory, "notion-fill-jobs.json");
    private static string RunsPath => Path.Combine(RuntimeEnvironment.DataDirectory, "notion-fill-runs.json");

    public static NotionFillJobCatalog LoadCatalog()
    {
        try
        {
            return File.Exists(JobsPath)
                ? JsonSerializer.Deserialize<NotionFillJobCatalog>(File.ReadAllText(JobsPath)) ?? new()
                : new();
        }
        catch
        {
            return new();
        }
    }

    public static void SaveJob(NotionFillJob job)
    {
        var catalog = LoadCatalog();
        var index = catalog.Jobs.FindIndex(item => item.Id == job.Id);
        if (index < 0) catalog.Jobs.Add(job); else catalog.Jobs[index] = job;
        Directory.CreateDirectory(RuntimeEnvironment.DataDirectory);
        AtomicWrite(JobsPath, JsonSerializer.Serialize(catalog, JsonOptions));
    }

    public static void SaveCredentials(NotionFillJob job, string username, string password)
    {
        job.Username = username.Trim();
        if (!string.IsNullOrEmpty(password))
            job.EncryptedPassword = WindowsTokenProtector.Protect(password);
        SaveJob(job);
    }

    public static string ReadPassword(NotionFillJob job) =>
        string.IsNullOrWhiteSpace(job.EncryptedPassword)
            ? string.Empty
            : WindowsTokenProtector.Unprotect(job.EncryptedPassword);

    public static bool DeleteJob(string jobId)
    {
        var catalog = LoadCatalog();
        if (catalog.Jobs.RemoveAll(job => job.Id == jobId) == 0) return false;
        AtomicWrite(JobsPath, JsonSerializer.Serialize(catalog, JsonOptions));
        RunsMutex.WaitOne();
        try
        {
            SaveRuns(LoadRunRecords().Where(record => record.JobId != jobId));
        }
        finally
        {
            RunsMutex.ReleaseMutex();
        }
        return true;
    }

    public static IReadOnlyList<NotionFillRunRecord> LoadRunRecords(string? jobId = null)
    {
        try
        {
            var records = File.Exists(RunsPath)
                ? JsonSerializer.Deserialize<List<NotionFillRunRecord>>(File.ReadAllText(RunsPath)) ?? []
                : [];
            return records.Where(record => jobId is null || record.JobId == jobId)
                .OrderByDescending(record => record.StartedAt).ToArray();
        }
        catch
        {
            return [];
        }
    }

    public static void AddRunRecord(NotionFillRunRecord record)
    {
        RunsMutex.WaitOne();
        try
        {
            var records = LoadRunRecords().Where(item => item.Id != record.Id).Append(record)
                .GroupBy(item => item.JobId)
                .SelectMany(group => group.OrderByDescending(item => item.StartedAt).Take(100));
            SaveRuns(records);
        }
        finally
        {
            RunsMutex.ReleaseMutex();
        }
    }

    private static void SaveRuns(IEnumerable<NotionFillRunRecord> records)
    {
        Directory.CreateDirectory(RuntimeEnvironment.DataDirectory);
        AtomicWrite(RunsPath, JsonSerializer.Serialize(records, JsonOptions));
    }

    private static void AtomicWrite(string path, string json)
    {
        var temporary = path + ".tmp";
        File.WriteAllText(temporary, json);
        File.Move(temporary, path, true);
    }
}
