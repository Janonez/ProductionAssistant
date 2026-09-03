using System.Diagnostics;
using System.Text;
using System.Text.Json;
using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public sealed class FineReportCollector
{
    public bool HasAuthenticationState => File.Exists(ReportCenterConfigStore.AuthStatePath);

    public Task CaptureAuthenticationAsync(ReportCenterConfig config, CancellationToken cancellationToken) =>
        RunNodeAsync("auth", config, [], null, cancellationToken);

    public async Task<ReportCollectionResult> CollectAsync(
        IReadOnlyList<DateOnly> reportDates,
        ReportCenterConfig config,
        IProgress<ReportRunProgress>? progress,
        CancellationToken cancellationToken)
    {
        if (!HasAuthenticationState) throw new InvalidOperationException("FineReport 登录状态尚未建立，请先点击“建立登录状态”。");
        var output = await RunNodeAsync("collect", config, reportDates, progress, cancellationToken);
        return JsonSerializer.Deserialize<ReportCollectionResult>(output, new JsonSerializerOptions(JsonSerializerDefaults.Web))
            ?? throw new InvalidOperationException("FineReport 自动化没有返回执行结果。");
    }

    private static async Task<string> RunNodeAsync(
        string mode,
        ReportCenterConfig config,
        IReadOnlyList<DateOnly> dates,
        IProgress<ReportRunProgress>? progress,
        CancellationToken cancellationToken)
    {
        var info = new ProcessStartInfo("node")
        {
            UseShellExecute = false,
            RedirectStandardInput = true,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            StandardInputEncoding = new UTF8Encoding(false),
            StandardOutputEncoding = Encoding.UTF8,
            StandardErrorEncoding = Encoding.UTF8,
            CreateNoWindow = true
        };
        info.ArgumentList.Add(ResolveRunner());
        var payload = JsonSerializer.Serialize(new
        {
            mode,
            reportUrl = config.ReportUrl,
            reportPath = config.ReportPath,
            sourceRoot = config.SourceRoot,
            rawFolder = config.RawFolder,
            headless = true,
            queryTimeoutSeconds = config.QueryTimeoutSeconds,
            downloadTimeoutSeconds = config.DownloadTimeoutSeconds,
            retryCount = config.RetryCount,
            authStatePath = ReportCenterConfigStore.AuthStatePath,
            reportDates = dates.Select(date => date.ToString("yyyy-MM-dd")),
            username = ReportCenterCredentialsStore.Load().Username,
            password = ReportCenterCredentialsStore.Load().Password
        });
        info.Environment["NODE_PATH"] = ResolveNodeModules();
        using var process = Process.Start(info) ?? throw new InvalidOperationException("无法启动 Node.js，请确认已安装 Node.js。");
        await process.StandardInput.WriteAsync(payload);
        process.StandardInput.Close();
        using var cancellation = cancellationToken.Register(() =>
        {
            try { if (!process.HasExited) process.Kill(true); } catch { }
        });
        var errorTask = process.StandardError.ReadToEndAsync(cancellationToken);
        string? result = null;
        while (await process.StandardOutput.ReadLineAsync(cancellationToken) is { } line)
        {
            using var message = JsonDocument.Parse(line);
            var root = message.RootElement;
            if (root.GetProperty("type").GetString() == "progress")
            {
                var value = root.GetProperty("data").Deserialize<ReportRunProgress>(new JsonSerializerOptions(JsonSerializerDefaults.Web));
                if (value is not null) progress?.Report(value);
            }
            else if (root.GetProperty("type").GetString() == "result")
                result = root.GetProperty("data").GetRawText();
        }
        await process.WaitForExitAsync(cancellationToken);
        var error = await errorTask;
        if (process.ExitCode != 0) throw new InvalidOperationException(string.IsNullOrWhiteSpace(error) ? "FineReport 自动化执行失败。" : error.Trim());
        return result ?? throw new InvalidOperationException("FineReport 自动化没有返回执行结果。");
    }

    private static string ResolveRunner()
    {
        var root = FindRepositoryRoot();
        var candidates = new[]
        {
            Path.Combine(AppContext.BaseDirectory, "Assets", "ReportCenter", "finereport-runner.cjs"),
            root is null ? string.Empty : Path.Combine(root, "src", "ProductionAssistant.App", "Assets", "ReportCenter", "finereport-runner.cjs")
        };
        return candidates.FirstOrDefault(File.Exists) ?? throw new InvalidOperationException("未找到 FineReport 自动化脚本。");
    }

    private static string ResolveNodeModules()
    {
        var root = FindRepositoryRoot();
        var candidates = new[]
        {
            Path.Combine(AppContext.BaseDirectory, "Assets", "ReportCenter", "node_modules"),
            root is null ? string.Empty : Path.Combine(root, "tools", "experiments", "machining_summary", "playwright_test", "FineReportTest", "node_modules")
        };
        return candidates.FirstOrDefault(path => Directory.Exists(Path.Combine(path, "playwright")))
            ?? throw new InvalidOperationException("未找到 Playwright Node 依赖，请在报表中心自动化目录执行 npm install。");
    }

    private static string? FindRepositoryRoot()
    {
        for (var directory = new DirectoryInfo(AppContext.BaseDirectory); directory is not null; directory = directory.Parent)
            if (File.Exists(Path.Combine(directory.FullName, "ProductionAssistant.sln"))) return directory.FullName;
        return null;
    }
}

public sealed record ReportCollectionItem(DateOnly ReportDate, string Path);
public sealed record ReportCollectionFailure(DateOnly ReportDate, string Error);
public sealed record ReportCollectionResult(
    IReadOnlyList<ReportCollectionItem> Succeeded,
    IReadOnlyList<ReportCollectionFailure> Failures);
