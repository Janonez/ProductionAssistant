using System.Text.Json;
using System.Text.Json.Nodes;
using System.Security.Cryptography;
using System.Text;
using ProductionAssistant.Automation;

namespace ProductionAssistant.Services;

public sealed class TencentSheetTaskHandler(TencentSheetNotionService? notion = null) : IAutomationTaskHandler
{
    public const string Type = "tencent_sheet_fill";
    public string TaskType => Type;
    public TencentSheetService Service { get; } = new();
    private static readonly object StoreLock = new();
    private static string StorePath => Path.Combine(RuntimeEnvironment.DataDirectory, "tencent-sheet-jobs.json");

    private static Mutex AcquireStoreLock()
    {
        var name = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(StorePath)));
        var mutex = new Mutex(false, "Local\\TencentSheetStore-" + name);
        try { if (!mutex.WaitOne(TimeSpan.FromSeconds(5))) throw new IOException("填报配置正在保存，请稍后重试。"); }
        catch (AbandonedMutexException) { }
        catch { mutex.Dispose(); throw; }
        return mutex;
    }

    public static JsonArray Load()
    {
        lock (StoreLock) return File.Exists(StorePath) ? JsonNode.Parse(File.ReadAllText(StorePath))!.AsArray() : new();
    }
    public static JsonObject Find(string id) => Load().OfType<JsonObject>().FirstOrDefault(job => (string?)job["id"] == id)
        ?? throw new InvalidOperationException("找不到腾讯文档填报任务。");
    public static void Save(JsonObject job, bool updateRun = false)
    {
        lock (StoreLock)
        {
            using var mutex = AcquireStoreLock();
            try
            {
                var jobs = Load();
                var old = jobs.FirstOrDefault(item => (string?)item?["id"] == (string?)job["id"]);
                var revision = (int?)old?["configRevision"] ?? 0;
                if (old is not null && ((int?)job["configRevision"] ?? 0) != revision)
                    throw new InvalidOperationException("任务配置已被其他操作修改，请重新打开后再保存。");
                if ((bool?)old?["enabled"] == true && !JsonNode.DeepEquals(old?["config"], job["config"]))
                    throw new InvalidOperationException("请先停用定时填报，再修改填写配置。");
                job["configRevision"] = old is not null && !JsonNode.DeepEquals(old["config"], job["config"]) ? revision + 1 : revision;
                if (old is not null && !updateRun)
                    foreach (var key in new[] { "runs", "lastRun", "backgroundValidatedConfig" }) job[key] = old[key]?.DeepClone();
                if (old is not null) jobs.Remove(old);
                jobs.Add(job.DeepClone());
                Write(jobs);
            }
            finally { mutex.ReleaseMutex(); }
        }
    }
    private static void SaveRun(string taskId, JsonObject record, JsonObject executionConfig, bool background)
    {
        lock (StoreLock)
        {
            using var mutex = AcquireStoreLock();
            try
            {
                var saved = Find(taskId);
                if (background && (string?)record["status"] == "成功" && JsonNode.DeepEquals(saved["config"], executionConfig))
                {
                    saved["backgroundValidatedConfig"] = record["configSignature"]?.DeepClone();
                    saved["validated"] = true;
                }
                var runs = saved["runs"] as JsonArray ?? new();
                if (saved["runs"] is null) saved["runs"] = runs;
                var previous = runs.FirstOrDefault(run => (string?)run?["id"] == (string?)record["id"]);
                if (previous is not null) runs.Remove(previous);
                runs.Insert(0, record.DeepClone());
                while (runs.Count > 100) runs.RemoveAt(runs.Count - 1);
                saved["lastRun"] = $"{record["time"]} · {record["status"]}";
                Save(saved, updateRun: true);
            }
            finally { mutex.ReleaseMutex(); }
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
            Type, "腾讯文档填报", (string)job["id"]!, (string)job["name"]!, "业务日期 " + TencentSheetService.ResolveBusinessDate(DateTimeOffset.Now, job["config"]!.AsObject()).ToString("yyyy-MM-dd"), (bool?)job["enabled"] == true, TencentSheetTaskScheduler.IsAvailable || (bool?)job["enabled"] == true,
            (bool?)job["validated"] == true ? "checked" : "pending-test", TencentSheetTaskScheduler.IsAvailable ? "后台测试通过后可启用；仅在 Windows 已登录时执行" : "当前环境未开放定时，可前台或后台测试", "腾讯文档",
            (string?)job["lastRun"] ?? "暂无运行记录")).ToArray();
        return Task.FromResult(tasks);
    }
    public Task<AutomationTask> GetTaskAsync(string taskId)
    {
        var job = Find(taskId);
        return Task.FromResult(new AutomationTask(taskId, Type, (string)job["name"]!, (bool?)job["enabled"] == true, "configured", "ready", JsonSerializer.SerializeToElement(job)));
    }
    public async Task<AutomationTaskRunResult> ExecuteAsync(AutomationTaskExecutionContext context, JsonElement config, CancellationToken cancellationToken)
    {
        Directory.CreateDirectory(RuntimeEnvironment.DataDirectory);
        FileStream lease;
        try { lease = new FileStream(Path.Combine(RuntimeEnvironment.DataDirectory, "tencent-sheet-execution.lock"), FileMode.OpenOrCreate, FileAccess.ReadWrite, FileShare.None); }
        catch (IOException) { return new(false, 1, "已有填报任务正在执行，请等待结束。"); }
        using var executionLease = lease;
        var job = JsonNode.Parse(config.GetRawText())!.AsObject();
        if ((string?)job["id"] != context.TaskId) throw new InvalidOperationException("任务配置不匹配。");
        var background = context.Trigger is "background-test" or "automatic";
        if (context.Trigger == "automatic")
        {
            job = Find(context.TaskId);
            if (!TencentSheetTaskScheduler.IsAvailable || (bool?)job["enabled"] != true)
                return new(false, 1, "定时填报未启用，本次未执行。");
        }
        var date = TencentSheetService.ResolveBusinessDate(context.StartedAt, job["config"]!.AsObject(),
            DateOnly.TryParse((string?)job["manualDate"], out var manual) ? manual : null);
        var record = new JsonObject { ["id"] = Guid.NewGuid().ToString("N"), ["time"] = context.StartedAt.ToString("yyyy-MM-dd HH:mm:ss"), ["source"] = context.Trigger, ["businessDate"] = date.ToString("yyyy-MM-dd"), ["phase"] = background ? "fetch" : "check" };
        try
        {
            if (background)
            {
                ValidateBackgroundConfig(job["config"]!.AsObject());
                if (context.Trigger == "automatic")
                {
                    if ((string?)job["backgroundValidatedConfig"] != ConfigSignature(job["config"]!.AsObject()))
                        throw new InvalidOperationException("配置或网页适配已变化，请重新后台测试后启用。");
                    if (job["runs"] is JsonArray previous && previous.Any(run => BlocksAutomaticRetry(run, date)))
                    {
                        record["status"] = "已跳过"; record["message"] = "此业务日期已有执行记录，请先检查原结果；定时不会重复填写。";
                        return new(true, 0, (string)record["message"]!);
                    }
                }
                record["status"] = "执行中，结果待确认";
                SaveRun(context.TaskId, record, job["config"]!.AsObject(), background);
                var data = await (notion ?? throw new InvalidOperationException("Notion 取数服务不可用。"))
                    .FetchAsync(context.TaskId, job["config"]!.AsObject(), date, cancellationToken);
                job["values"] = data.Values.DeepClone();
                record["data"] = JsonSerializer.SerializeToNode(data.Rows);
            }
            else
                job["values"] = (notion ?? throw new InvalidOperationException("Notion 取数服务不可用。"))
                    .RequireValues(context.TaskId, job["config"]!.AsObject(), date, (string?)job["dataToken"] ?? "");
            var resolved = job["config"]!.DeepClone().AsObject();
            record["configSignature"] = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(resolved.ToJsonString())));
            if (context.Trigger == "automatic" && (string?)job["backgroundValidatedConfig"] != (string?)record["configSignature"])
                throw new InvalidOperationException("取数期间网页适配已变化，本次未填写，请重新后台测试。");
            record["phase"] = "write";
            record["status"] = "执行中，结果待确认";
            SaveRun(context.TaskId, record, job["config"]!.AsObject(), background);
            var request = new JsonObject { ["operation"] = background ? "background" : "write", ["jobId"] = context.TaskId, ["config"] = resolved, ["date"] = date.ToString("yyyy-MM-dd"), ["values"] = job["values"]?.DeepClone(), ["token"] = (string?)job["confirmationToken"] };
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
            if (record["status"] is null || (string?)record["status"] == "执行中，结果待确认")
                record["status"] = (string?)record["phase"] == "write" ? "已中断，结果待确认" : "已中断，未开始填写";
            SaveRun(context.TaskId, record, job["config"]!.AsObject(), background);
        }
    }
    public static bool BlocksAutomaticRetry(JsonNode? run, DateOnly date) =>
        (string?)run?["businessDate"] == date.ToString("yyyy-MM-dd") &&
        (string?)run?["status"] != "已跳过" && (string?)run?["phase"] is not ("fetch" or "check");
    public static void ValidateBackgroundConfig(JsonObject config)
    {
        TencentSheetService.ValidateExecutionRules(config);
        if (config["fields"] is not JsonArray { Count: > 0 } fields) throw new InvalidOperationException("请先配置业务字段。");
        foreach (var field in fields)
        {
            TencentSheetNotionService.ReadBinding(field?["notion"]);
            if (config["rules"]?[(string)field!["id"]!] is null)
                throw new InvalidOperationException("请完成所有业务字段的位置示范。");
        }
    }
    public static string ConfigSignature(JsonObject config) => Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(config.DeepClone().AsObject().ToJsonString())));

    public async Task<AutomationTaskToggleResult> SetEnabledAsync(string taskId, bool enabled)
    {
        var job = Find(taskId);
        if (enabled)
        {
            if (!TencentSheetTaskScheduler.IsAvailable) throw new InvalidOperationException("当前环境未开放 Windows 定时任务，仍可前台和后台自动测试。");
            ValidateBackgroundConfig(job["config"]!.AsObject());
            if ((string?)job["backgroundValidatedConfig"] != ConfigSignature(job["config"]!.AsObject()))
                throw new InvalidOperationException("请先使用当前配置完成一次后台自动测试。");
            await Service.CallAsync(new() { ["operation"] = "close" });
            await TencentSheetTaskScheduler.InstallAsync(taskId, job["config"]!.AsObject());
            job["enabled"] = true;
            job["schedulerInstalled"] = true;
            Save(job);
        }
        else
        {
            job["enabled"] = false; Save(job);
            await TencentSheetTaskScheduler.RemoveAsync(taskId);
            job["schedulerInstalled"] = false; Save(job);
        }
        return new(enabled, Message: enabled ? "已启用后台定时填报，当前不会立即执行。" : "已停用定时填报。");
    }
    public async Task DeleteAsync(string taskId)
    {
        var saved = Find(taskId);
        if ((bool?)saved["enabled"] == true || (bool?)saved["schedulerInstalled"] == true) await SetEnabledAsync(taskId, false);
        lock (StoreLock)
        {
            using var mutex = AcquireStoreLock();
            try
            {
                var jobs = Load();
                var job = jobs.FirstOrDefault(item => (string?)item?["id"] == taskId) ?? throw new InvalidOperationException("任务不存在。");
                jobs.Remove(job); Write(jobs);
            }
            finally { mutex.ReleaseMutex(); }
        }
    }
}
