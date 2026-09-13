using System.Diagnostics;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace ProductionAssistant.Services;

// Persistent stdio worker: no listening port and no credentials sent to the frontend.
public sealed class TencentSheetService
{
    private readonly SemaphoreSlim _gate = new(1, 1);
    private Process? _worker;
    private readonly string _profile = Path.Combine(RuntimeEnvironment.DataDirectory, "tencent-sheet-profile");
    public static void RequireDevelopment()
    {
        if (!RuntimeEnvironment.Current.IsDevelopment)
            throw new InvalidOperationException("腾讯文档填报目前仅在 Development 测试版开放。");
    }

    public async Task<JsonElement> CallAsync(JsonObject request, CancellationToken cancellationToken = default)
    {
        RequireDevelopment();
        if (!await _gate.WaitAsync(0, cancellationToken))
            throw new InvalidOperationException("已有文档操作正在进行，请等待完成。");
        try
        {
            Directory.CreateDirectory(RuntimeEnvironment.DataDirectory);
            using var operationLease = AcquireOperationLease();
            if (_worker is null || _worker.HasExited) StartWorker();
            using var timeout = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
            timeout.CancelAfter(TimeSpan.FromMinutes(5));
            using var registration = timeout.Token.Register(() => { try { _worker?.Kill(true); } catch { } });
            await _worker!.StandardInput.WriteLineAsync(request.ToJsonString().AsMemory(), timeout.Token);
            var line = await _worker.StandardOutput.ReadLineAsync(timeout.Token)
                ?? throw new InvalidOperationException("填报会话已关闭，请重新打开文档；此前写入结果请先检查。");
            using var result = JsonDocument.Parse(line);
            var root = result.RootElement;
            if (!root.GetProperty("ok").GetBoolean())
            {
                var message = root.GetProperty("error").GetString();
                if (root.TryGetProperty("completed", out var completed) && completed.GetArrayLength() > 0)
                    message += " 已提交：" + string.Join("、", completed.EnumerateArray().Select(row => row.GetProperty("address").GetString()));
                if (root.TryGetProperty("uncertainAddress", out var uncertain) && uncertain.ValueKind == JsonValueKind.String)
                    message += "；结果待确认：" + uncertain.GetString();
                throw new InvalidOperationException(message);
            }
            return root.GetProperty("data").Clone();
        }
        finally { _gate.Release(); }
    }

    private static FileStream AcquireOperationLease()
    {
        try { return new FileStream(Path.Combine(RuntimeEnvironment.DataDirectory, "tencent-sheet-operation.lock"), FileMode.OpenOrCreate, FileAccess.ReadWrite, FileShare.None); }
        catch (IOException) { throw new InvalidOperationException("其他进程正在操作填报文档，请等待完成后重试。"); }
    }

    private void StartWorker()
    {
        _worker?.Dispose();
        var info = new ProcessStartInfo("node")
        {
            UseShellExecute = false, CreateNoWindow = true,
            RedirectStandardInput = true, RedirectStandardOutput = true, RedirectStandardError = true,
            StandardInputEncoding = new UTF8Encoding(false), StandardOutputEncoding = Encoding.UTF8,
            StandardErrorEncoding = Encoding.UTF8
        };
        info.ArgumentList.Add(Path.Combine(AppContext.BaseDirectory, "Assets", "TencentSheet", "runner.cjs"));
        info.ArgumentList.Add(_profile);
        var candidates = new List<string> { Path.Combine(AppContext.BaseDirectory, "Assets", "TencentSheet", "node_modules") };
        for (var dir = new DirectoryInfo(AppContext.BaseDirectory); dir is not null; dir = dir.Parent)
            if (File.Exists(Path.Combine(dir.FullName, "ProductionAssistant.sln")))
                candidates.Add(Path.Combine(dir.FullName, "tools", "experiments", "machining_summary", "playwright_test", "FineReportTest", "node_modules"));
        info.Environment["NODE_PATH"] = candidates.FirstOrDefault(path => Directory.Exists(Path.Combine(path, "playwright")))
            ?? throw new InvalidOperationException("测试版缺少浏览器依赖，请重新发布测试版。");
        _worker = Process.Start(info) ?? throw new InvalidOperationException("无法启动填报服务，请确认已安装 Node.js。");
        _worker.ErrorDataReceived += (_, _) => { }; // Drain stderr without logging document URLs or browser data.
        _worker.BeginErrorReadLine();
    }

    public static DateOnly ResolveBusinessDate(DateTimeOffset startedAt, string mode, DateOnly? manualDate = null)
    {
        if (manualDate is not null) return manualDate.Value;
        var today = DateOnly.FromDateTime(startedAt.ToOffset(TimeSpan.FromHours(8)).DateTime);
        return mode switch { "previous_day" => today.AddDays(-1), "today" => today, _ => throw new InvalidOperationException("业务日期模式无效。") };
    }

    public static void ValidateExecutionRules(JsonObject config)
    {
        if (config["businessDateRule"] is JsonNode rule)
        {
            if (rule is not JsonObject) throw new InvalidOperationException("业务日期规则无效。");
            switch ((string?)rule["kind"])
            {
                case "relative":
                    if (rule["offsetDays"] is not JsonValue offset || !offset.TryGetValue<int>(out var days) || days < -3660 || days > 3660)
                        throw new InvalidOperationException("业务日期偏移须为 -3660 至 3660 的整数天。");
                    break;
                case "fixed":
                    if (!DateOnly.TryParseExact((string?)rule["date"], "yyyy-MM-dd", out _))
                        throw new InvalidOperationException("请选择固定业务日期。");
                    break;
                default: throw new InvalidOperationException("请选择业务日期规则。");
            }
        }
        if (config["executionSchedule"] is JsonNode schedule)
        {
            if (schedule is not JsonObject || schedule["weekdays"] is not JsonArray { Count: > 0 and <= 7 } weekdays ||
                weekdays.Any(day => day is not JsonValue value || !value.TryGetValue<int>(out var number) || number < 0 || number > 6) ||
                weekdays.Select(day => (int)day!).Distinct().Count() != weekdays.Count)
                throw new InvalidOperationException("请选择不重复的执行星期。");
            if (schedule["times"] is not JsonArray { Count: > 0 and <= 24 } times ||
                times.Any(time => time is not JsonValue value || !value.TryGetValue<string>(out var text) || !TimeOnly.TryParseExact(text, "HH:mm", out _)) ||
                times.Select(time => (string)time!).Distinct().Count() != times.Count)
                throw new InvalidOperationException("请设置 1 至 24 个不重复的执行时刻。");
        }
    }

    public static DateOnly ResolveBusinessDate(DateTimeOffset startedAt, JsonObject config, string legacyMode = "previous_day", DateOnly? manualDate = null)
    {
        ValidateExecutionRules(config);
        if (manualDate is not null) return manualDate.Value;
        if (config["businessDateRule"] is not JsonObject rule) return ResolveBusinessDate(startedAt, legacyMode);
        return (string?)rule["kind"] == "fixed"
            ? DateOnly.ParseExact((string)rule["date"]!, "yyyy-MM-dd")
            : DateOnly.FromDateTime(startedAt.ToOffset(TimeSpan.FromHours(8)).DateTime).AddDays((int)rule["offsetDays"]!);
    }
}
