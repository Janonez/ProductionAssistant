using System.Text;
using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public static class BridgeErrorLog
{
    private static readonly object LogLock = new();

    public static string Record(string operation, Exception exception)
    {
        var diagnosticId = Guid.NewGuid().ToString("N");
        var path = Path.Combine(RuntimeEnvironment.LogDirectory, "bridge-errors.log");
        operation = PrototypeBridgeProtocol.IsAllowed(operation) ? operation : "invalid-request";
        var details = new StringBuilder($"[{DateTimeOffset.Now:O}] diagnostic={diagnosticId} operation={operation}{Environment.NewLine}");
        AppendException(details, exception);
        try
        {
            lock (LogLock)
            {
                Directory.CreateDirectory(Path.GetDirectoryName(path)!);
                File.AppendAllText(path, details.ToString());
            }
            return $"{PrototypeBridgeProtocol.SafeError(exception)}\n诊断编号：{diagnosticId}；日志：{path}";
        }
        catch
        {
            return $"{PrototypeBridgeProtocol.SafeError(exception)}\n诊断日志写入失败：{path}。请检查日志目录权限或磁盘空间。";
        }
    }

    private static void AppendException(StringBuilder details, Exception exception)
    {
        // Use the same approved messages as the UI; never log request payloads or unknown exception messages.
        details.AppendLine($"{exception.GetType().FullName} HRESULT=0x{exception.HResult:X8}: {PrototypeBridgeProtocol.SafeError(exception)}");
        details.AppendLine(exception.StackTrace);
        if (exception is AggregateException aggregate)
        {
            foreach (var inner in aggregate.InnerExceptions) AppendException(details, inner);
        }
        else if (exception.InnerException is { } inner)
        {
            AppendException(details, inner);
        }
    }
}
