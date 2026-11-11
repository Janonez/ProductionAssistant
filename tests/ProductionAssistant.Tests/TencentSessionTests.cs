using System.Text.Json.Nodes;
using System.Diagnostics;
using ProductionAssistant.Models;
using ProductionAssistant.Services;
using Xunit;

namespace ProductionAssistant.Tests;

public sealed class TencentSessionTests : IDisposable
{
    private readonly string _folder = Path.Combine(Path.GetTempPath(), "TencentSessionTests", Guid.NewGuid().ToString("N"));
    private static string Fixture
    {
        get
        {
            for (var dir = new DirectoryInfo(AppContext.BaseDirectory); dir is not null; dir = dir.Parent)
                if (File.Exists(Path.Combine(dir.FullName, "ProductionAssistant.sln")))
                    return Path.Combine(dir.FullName, "tests", "tencent-sheet", "fixtures", "session-worker.cjs");
            throw new InvalidOperationException("Test repository not found.");
        }
    }
    private TencentSheetService Worker() => new(_folder, Fixture, "");
    private async Task<string> ProbeLeaseAsync()
    {
        var info = new ProcessStartInfo("node") { UseShellExecute = false, CreateNoWindow = true, RedirectStandardOutput = true };
        info.ArgumentList.Add(Fixture);
        info.ArgumentList.Add("--probe");
        info.ArgumentList.Add(Path.Combine(_folder, "tencent-sheet-operation.lock"));
        using var probe = Process.Start(info)!;
        var output = await probe.StandardOutput.ReadToEndAsync();
        await probe.WaitForExitAsync();
        Assert.Equal(0, probe.ExitCode);
        return output;
    }
    public void Dispose() { if (Directory.Exists(_folder)) Directory.Delete(_folder, true); }

    [Theory]
    [InlineData("https://docs.qq.com.evil.invalid/sheet/a")]
    [InlineData("http://docs.qq.com/sheet/a")]
    [InlineData("https://user:secret@docs.qq.com/sheet/a")]
    [InlineData("https://docs.qq.com:8080/sheet/a")]
    [InlineData("file:///C:/private")]
    [InlineData("")]
    public async Task Rejects_untrusted_document_before_starting_worker(string url)
    {
        await using var worker = Worker();
        var session = new TencentSessionService(worker);
        Assert.Throws<InvalidOperationException>(() => TencentSessionService.ValidateDocumentUrl(url));
        var status = await session.ExecuteAsync("Open", url);
        Assert.Equal("InvalidDocumentUrl", status.Code);
        Assert.Equal("unknown", status.Authentication);
        Assert.False(Directory.Exists(_folder));
    }

    [Fact]
    public async Task Closed_status_does_not_start_browser_and_does_not_claim_expiry()
    {
        await using var worker = Worker();
        Assert.Equal(TencentSessionStatus.Closed, await new TencentSessionService(worker).ExecuteAsync("Status", null));
        Assert.False(File.Exists(Path.Combine(_folder, "tencent-sheet-profile.closed")));
    }

    [Fact]
    public async Task Worker_holds_profile_between_requests_and_releases_after_graceful_EOF()
    {
        await using var first = Worker();
        await using var second = Worker();
        await first.CallAsync(new() { ["operation"] = "hold" });
        Assert.Equal("blocked", await ProbeLeaseAsync());
        Assert.Equal(TencentSessionStatus.ProfileBusy, await new TencentSessionService(second).ExecuteAsync("Status", null));
        await first.CloseSessionAsync();
        Assert.Equal("available", await ProbeLeaseAsync());
        Assert.Equal("flushed on EOF", await File.ReadAllTextAsync(Path.Combine(_folder, "tencent-sheet-profile.closed")));
        Assert.Equal(TencentSessionStatus.Closed, await new TencentSessionService(second).ExecuteAsync("Status", null));
    }

    [Fact]
    public async Task Close_cancels_pending_call_without_replaying_and_flushes_worker()
    {
        await using var worker = Worker();
        await worker.CallAsync(new() { ["operation"] = "hold" });
        var pending = worker.CallAsync(new() { ["operation"] = "hang" });
        await worker.CloseSessionAsync();
        await Assert.ThrowsAnyAsync<OperationCanceledException>(async () => await pending);
        Assert.True(File.Exists(Path.Combine(_folder, "tencent-sheet-profile.closed")));
        Assert.Equal(TencentSessionStatus.Closed, await new TencentSessionService(worker).ExecuteAsync("Status", null));
    }

    [Fact]
    public async Task Crash_is_reported_without_replay_and_next_status_is_closed()
    {
        await using var worker = Worker();
        await Assert.ThrowsAsync<InvalidOperationException>(() => worker.CallAsync(new JsonObject { ["operation"] = "crash" }));
        Assert.False(File.Exists(Path.Combine(_folder, "tencent-sheet-profile.closed")));
        Assert.Equal(TencentSessionStatus.Closed, await new TencentSessionService(worker).ExecuteAsync("Status", null));
    }

    [Fact]
    public void Sidecar_output_contains_session_worker_and_its_browser_dependencies()
    {
        var assets = Path.Combine(AppContext.BaseDirectory, "Assets", "TencentSheet");
        Assert.True(File.Exists(Path.Combine(assets, "session.cjs")));
        Assert.True(File.Exists(Path.Combine(assets, "node_modules", "playwright", "package.json")));
        Assert.True(File.Exists(Path.Combine(assets, "node_modules", "playwright-core", "package.json")));
    }
}
