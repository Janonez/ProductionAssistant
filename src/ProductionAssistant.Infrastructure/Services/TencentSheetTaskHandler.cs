using System.Text.Json;
using System.Text.Json.Nodes;
using ProductionAssistant.Automation;

namespace ProductionAssistant.Services;

public sealed class TencentSheetTaskHandler(TencentSheetNotionService? notion = null) : IAutomationTaskHandler
{
    public const string Type = "tencent_sheet_fill";
    public string TaskType => Type;
    public TencentSheetService Service { get; } = new();
    private static readonly object StoreLock = new();
    private static string StorePath => Path.Combine(RuntimeEnvironment.DataDirectory, "tencent-sheet-jobs.json");

    public static JsonArray Load()
    {
        TencentSheetService.RequireDevelopment();
        lock (StoreLock) return File.Exists(StorePath) ? JsonNode.Parse(File.ReadAllText(StorePath))!.AsArray() : new();
    }
    public static JsonObject Find(string id) => Load().OfType<JsonObject>().FirstOrDefault(job => (string?)job["id"] == id)
        ?? throw new InvalidOperationException("找不到腾讯文档填报任务。");
    public static void Save(JsonObject job)
    {
        lock (StoreLock)
        {
            var jobs = Load();
            var old = jobs.FirstOrDefault(item => (string?)item?["id"] == (string?)job["id"]);
            if (old is not null) jobs.Remove(old);
            jobs.Add(job.DeepClone());
            Write(jobs);
        }
    }
    private static void Write(JsonArray jobs)
    {
        Directory.CreateDirectory(RuntimeEnvironment.DataDirectory);
        var temporary = StorePath + ".tmp";
        File.WriteAllText(temporary, jobs.ToJsonString(new() { WriteIndented = true }));
        File.Move(temporary, StorePath, true);
    }
    public Task<IReadOnlyList<AutomationTaskSummary>> ListTasksAsync()
    {
        IReadOnlyList<AutomationTaskSummary> tasks = Load().OfType<JsonObject>().Select(job => new AutomationTaskSummary(
            Type, "腾讯文档填报", (string)job["id"]!, (string)job["name"]!, "手动验证 · 业务日期 " + TencentSheetService.ResolveBusinessDate(DateTimeOffset.Now, job["config"]!.AsObject(), (string?)job["dateMode"] ?? "previous_day").ToString("yyyy-MM-dd"), false, false,
            (bool?)job["validated"] == true ? "checked" : "pending-test", "测试版暂不启用定时填报", "腾讯文档",
            (string?)job["lastRun"] ?? "暂无运行记录")).ToArray();
        return Task.FromResult(tasks);
    }
    public Task<AutomationTask> GetTaskAsync(string taskId)
    {
        var job = Find(taskId);
        return Task.FromResult(new AutomationTask(taskId, Type, (string)job["name"]!, false, "manual", "ready", JsonSerializer.SerializeToElement(job)));
    }
    public async Task<AutomationTaskRunResult> ExecuteAsync(AutomationTaskExecutionContext context, JsonElement config, CancellationToken cancellationToken)
    {
        TencentSheetService.RequireDevelopment();
        var job = JsonNode.Parse(config.GetRawText())!.AsObject();
        if ((string?)job["id"] != context.TaskId) throw new InvalidOperationException("任务配置不匹配。");
        var date = TencentSheetService.ResolveBusinessDate(context.StartedAt, job["config"]!.AsObject(), (string?)job["dateMode"] ?? "previous_day",
            DateOnly.TryParse((string?)job["manualDate"], out var manual) ? manual : null);
        var record = new JsonObject { ["id"] = Guid.NewGuid().ToString("N"), ["time"] = context.StartedAt.ToString("yyyy-MM-dd HH:mm:ss"), ["source"] = context.Trigger, ["businessDate"] = date.ToString("yyyy-MM-dd") };
        try
        {
            if (TencentSheetNotionService.RequiresFetch(job["config"]!.AsObject()))
                job["values"] = (notion ?? throw new InvalidOperationException("Notion 取数服务不可用。"))
                    .RequireValues(context.TaskId, job["config"]!.AsObject(), date, (string?)job["dataToken"] ?? "");
            var request = new JsonObject { ["operation"] = "write", ["config"] = TencentSiteProfileStore.Resolve(job["config"]!), ["date"] = date.ToString("yyyy-MM-dd"), ["values"] = job["values"]?.DeepClone(), ["token"] = (string?)job["confirmationToken"] };
            var result = await Service.CallAsync(request, cancellationToken);
            record["status"] = "成功";
            record["message"] = result.GetProperty("message").GetString();
            return new(true, 0, (string)record["message"]!);
        }
        catch (Exception ex) when (ex is not OperationCanceledException)
        {
            record["status"] = "失败或待确认"; record["error"] = ex.Message;
            return new(false, 1, ex.Message);
        }
        finally
        {
            record["status"] ??= "已中断，结果待确认";
            var saved = Find(context.TaskId);
            var runs = saved["runs"] as JsonArray ?? new();
            if (saved["runs"] is null) saved["runs"] = runs;
            runs.Insert(0, record);
            while (runs.Count > 100) runs.RemoveAt(runs.Count - 1);
            saved["lastRun"] = $"{context.StartedAt:MM-dd HH:mm} · {record["status"]}";
            Save(saved);
        }
    }
    public Task<AutomationTaskToggleResult> SetEnabledAsync(string taskId, bool enabled)
        => throw new InvalidOperationException("腾讯文档填报目前仅开放手动测试，暂不启用定时任务。");
    public Task DeleteAsync(string taskId)
    {
        lock (StoreLock)
        {
            var jobs = Load();
            var job = jobs.FirstOrDefault(item => (string?)item?["id"] == taskId) ?? throw new InvalidOperationException("任务不存在。");
            jobs.Remove(job); Write(jobs);
        }
        return Task.CompletedTask;
    }
}
