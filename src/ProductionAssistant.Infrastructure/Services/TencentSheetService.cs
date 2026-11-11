using System.Diagnostics;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.RegularExpressions;

namespace ProductionAssistant.Services;

public sealed class TencentSheetPreflightException(string message) : InvalidOperationException(message);
public sealed class TencentProfileBusyException() : InvalidOperationException("专用浏览器配置正被其他进程使用，请先结束该会话。");

// Persistent stdio worker: no listening port and no credentials sent to the frontend.
public sealed class TencentSheetService : IAsyncDisposable
{
    private readonly SemaphoreSlim _gate = new(1, 1);
    private readonly CancellationTokenSource _shutdown = new();
    private readonly object _cancellationGate = new();
    private CancellationTokenSource? _activeOperation;
    private Process? _worker;
    private FileStream? _profileLease;
    private readonly string _profile;
    private readonly string _dataDirectory;
    private readonly string _runnerPath;
    private readonly string? _nodeModules;

    public TencentSheetService() : this(RuntimeEnvironment.DataDirectory,
        Path.Combine(AppContext.BaseDirectory, "Assets", "TencentSheet", "runner.cjs"), null) { }

    internal TencentSheetService(string dataDirectory, string runnerPath, string? nodeModules)
    {
        _dataDirectory = dataDirectory;
        _profile = Path.Combine(dataDirectory, "tencent-sheet-profile");
        _runnerPath = runnerPath;
        _nodeModules = nodeModules;
    }
    public async Task<JsonElement> CallAsync(JsonObject request, CancellationToken cancellationToken = default)
    {
        using var timeout = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken, _shutdown.Token);
        timeout.CancelAfter(TimeSpan.FromMinutes(5));
        if (!await _gate.WaitAsync(0, timeout.Token))
            throw new InvalidOperationException("已有文档操作正在进行，请等待完成。");
        try
        {
            lock (_cancellationGate) _activeOperation = timeout;
            Directory.CreateDirectory(_dataDirectory);
            if (((string?)request["operation"] is "sessionStatus" or "sessionClose") && (_worker is null || _worker.HasExited))
            {
                await StopWorkerAsync();
                using var probe = AcquireProfileLease();
                return JsonSerializer.SerializeToElement(Models.TencentSessionStatus.Closed, new JsonSerializerOptions(JsonSerializerDefaults.Web));
            }
            if (_worker is null || _worker.HasExited) StartWorker();
            JsonDocument result;
            try
            {
                await _worker!.StandardInput.WriteLineAsync(request.ToJsonString().AsMemory(), timeout.Token);
                var line = await _worker.StandardOutput.ReadLineAsync(timeout.Token)
                    ?? throw new InvalidOperationException("填报会话已关闭，请重新打开文档；此前写入结果请先检查。");
                result = JsonDocument.Parse(line);
            }
            catch
            {
                // No replay: a transport failure may follow an actual write.
                await StopWorkerAsync();
                throw;
            }
            using (result)
            {
                if (result.RootElement.TryGetProperty("browserOpen", out var open) && !open.GetBoolean())
                    await StopWorkerAsync();
                return ReadResponse(result.RootElement);
            }
        }
        finally
        {
            lock (_cancellationGate) _activeOperation = null;
            _gate.Release();
        }
    }

    public async Task CloseSessionAsync()
    {
        lock (_cancellationGate) _activeOperation?.Cancel();
        await _gate.WaitAsync();
        try
        {
            Directory.CreateDirectory(_dataDirectory);
            await StopWorkerAsync();
            using var probe = AcquireProfileLease();
        }
        finally { _gate.Release(); }
    }

    private async Task StopWorkerAsync()
    {
        var worker = _worker;
        _worker = null;
        try
        {
            if (worker is not null && !worker.HasExited)
            {
                try { worker.StandardInput.Close(); } // EOF lets Playwright flush the persistent context.
                catch (IOException) { } // A broken pipe still requires waiting for/terminating our worker.
                using var deadline = new CancellationTokenSource(TimeSpan.FromSeconds(8));
                try { await worker.WaitForExitAsync(deadline.Token); }
                catch (OperationCanceledException)
                {
                    if (!worker.HasExited) worker.Kill(true);
                    await worker.WaitForExitAsync();
                }
            }
        }
        finally { worker?.Dispose(); _profileLease?.Dispose(); _profileLease = null; }
    }

    public async ValueTask DisposeAsync()
    {
        _shutdown.Cancel();
        await _gate.WaitAsync();
        try { await StopWorkerAsync(); }
        finally { _gate.Release(); }
    }

    public static JsonElement ReadResponse(JsonElement root)
    {
        if (!root.GetProperty("ok").GetBoolean())
        {
            if (root.TryGetProperty("code", out var failureCode) && failureCode.GetString() == "ProfileBusy")
                throw new TencentProfileBusyException();
            var message = root.GetProperty("error").GetString();
            if (root.TryGetProperty("completed", out var completed) && completed.GetArrayLength() > 0)
                message += " 本地回读通过：" + string.Join("、", completed.EnumerateArray().Select(row => row.GetProperty("address").GetString()));
            if (root.TryGetProperty("uncertainAddress", out var uncertain) && uncertain.ValueKind == JsonValueKind.String)
                message += "；结果待确认：" + uncertain.GetString();
            message += BuildDiagnosticSuffix(root);
            if (root.TryGetProperty("phase", out var phase) && phase.GetString() == "check" &&
                root.TryGetProperty("completed", out var submitted) && submitted.GetArrayLength() == 0 &&
                root.TryGetProperty("uncertainAddress", out var pending) && pending.ValueKind == JsonValueKind.Null)
                throw new TencentSheetPreflightException(message ?? "网页预检失败，未开始填写。");
            throw new InvalidOperationException(message);
        }
        return root.GetProperty("data").Clone();
    }

    private static string BuildDiagnosticSuffix(JsonElement root)
    {
        var code = root.TryGetProperty("code", out var codeValue) && codeValue.ValueKind == JsonValueKind.String
            ? codeValue.GetString() : null;
        code = string.IsNullOrWhiteSpace(code) ? null : code[..Math.Min(code.Length, 64)];
        var details = root.TryGetProperty("details", out var detailsValue) && detailsValue.ValueKind == JsonValueKind.String
            ? detailsValue.GetString() : null;
        if (!string.IsNullOrWhiteSpace(details))
        {
            details = Regex.Replace(details, @"https?://\S+", "[网址已省略]");
            details = Regex.Replace(details, @"\s+", " ").Trim();
        }
        details = string.IsNullOrWhiteSpace(details) ? null : details[..Math.Min(details.Length, 200)];
        if (code is not null && details is not null) return $"（代码：{code}；详情：{details}）";
        if (code is not null) return $"（代码：{code}）";
        return details is null ? "" : $"（详情：{details}）";
    }

    private FileStream AcquireProfileLease()
    {
        try { return new FileStream(Path.Combine(_dataDirectory, "tencent-sheet-operation.lock"), FileMode.OpenOrCreate, FileAccess.ReadWrite, FileShare.None); }
        catch (IOException) { throw new TencentProfileBusyException(); }
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
        info.ArgumentList.Add(_runnerPath);
        info.ArgumentList.Add(_profile);
        var candidates = new List<string> { Path.Combine(AppContext.BaseDirectory, "Assets", "TencentSheet", "node_modules") };
        for (var dir = new DirectoryInfo(AppContext.BaseDirectory); dir is not null; dir = dir.Parent)
            if (File.Exists(Path.Combine(dir.FullName, "ProductionAssistant.sln")))
                candidates.Add(Path.Combine(dir.FullName, "tools", "experiments", "machining_summary", "playwright_test", "FineReportTest", "node_modules"));
        info.Environment["NODE_PATH"] = _nodeModules ?? candidates.FirstOrDefault(path => Directory.Exists(Path.Combine(path, "playwright")))
            ?? throw new InvalidOperationException("测试版缺少浏览器依赖，请重新发布测试版。");
        // Keep the same lock path, now held for the entire worker/browser lifetime.
        var lease = AcquireProfileLease();
        try
        {
            _worker = Process.Start(info) ?? throw new InvalidOperationException("无法启动填报服务，请确认已安装 Node.js。");
            _profileLease = lease;
            _worker.Exited += (_, _) => lease.Dispose();
            _worker.EnableRaisingEvents = true;
        }
        catch { lease.Dispose(); throw; }
        _worker.ErrorDataReceived += (_, _) => { }; // Drain stderr without logging document URLs or browser data.
        _worker.BeginErrorReadLine();
    }

    public static void ValidateExecutionRules(JsonObject config)
    {
        config["businessDateRule"] ??= new JsonObject { ["kind"] = "relative", ["offsetDays"] = -1 };
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

    public static DateOnly ResolveBusinessDate(DateTimeOffset startedAt, JsonObject config, DateOnly? manualDate = null)
    {
        ValidateExecutionRules(config);
        if (manualDate is not null) return manualDate.Value;
        var rule = config["businessDateRule"]!.AsObject();
        return (string?)rule["kind"] == "fixed"
            ? DateOnly.ParseExact((string)rule["date"]!, "yyyy-MM-dd")
            : DateOnly.FromDateTime(startedAt.ToOffset(TimeSpan.FromHours(8)).DateTime).AddDays((int)rule["offsetDays"]!);
    }
}
