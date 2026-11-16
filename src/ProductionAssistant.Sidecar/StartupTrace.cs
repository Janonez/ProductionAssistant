using System.Diagnostics;
using System.Text.Json;

namespace ProductionAssistant.Sidecar;

internal sealed class StartupTrace(TextWriter output, TextWriter diagnostics, string startupId)
{
    internal const int ProtocolVersion = 1;
    internal string Phase { get; private set; } = "environment";

    internal void Lifecycle(string state, string? errorCode = null) => WriteLifecycle(output, startupId, state, Phase, errorCode);

    internal static void WriteLifecycle(TextWriter output, string startupId, string state, string phase = "stdio", string? errorCode = null)
    {
        output.WriteLine(JsonSerializer.Serialize(new { type = "sidecar.lifecycle", protocolVersion = ProtocolVersion,
            startupId, state, phase, pid = Environment.ProcessId, errorCode }));
        output.Flush();
    }

    internal void Measure(string phase, Action action)
    {
        Phase = phase;
        Record(phase, "start", 0);
        var started = Stopwatch.GetTimestamp();
        try
        {
            action();
            Record(phase, "end", Stopwatch.GetElapsedTime(started).TotalMilliseconds);
        }
        catch (Exception ex)
        {
            Record(phase, "failed", Stopwatch.GetElapsedTime(started).TotalMilliseconds, ex.GetType().Name);
            throw;
        }
    }

    internal void Record(string phase, string status, double elapsedMs, string? errorType = null)
    {
        diagnostics.WriteLine(JsonSerializer.Serialize(new { type = "startup.phase", startupId, pid = Environment.ProcessId,
            phase, status, elapsedMs = Math.Round(elapsedMs, 2), errorType }));
        diagnostics.Flush();
    }
}
