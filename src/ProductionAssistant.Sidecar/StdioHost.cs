using System.Text.Json;
using System.Text.Json.Serialization;

namespace ProductionAssistant.Sidecar;

internal sealed class StdioHost : IBridgeHost
{
    internal static readonly HashSet<string> AllowedOperations = new(StringComparer.Ordinal)
    {
        "production.cancel",
        "production.getBindings",
        "weld.getState",
        "weld.generate",
        "database.getState",
        "database.getSchema",
        "database.inspect",
        "tencentSheet.get",
        "tencentSheet.runs",
        "tencentSheet.sources",
        "tencentSheet.schema",
        "tencentSheet.views",
        "notionFill.runs"
    };
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web)
    {
        Converters = { new JsonStringEnumConverter() }
    };
    private readonly TextReader _input;
    private readonly TextWriter _output;
    private readonly TextWriter _diagnostics;
    private readonly object _outputGate = new();
    private readonly object _diagnosticGate = new();
    private readonly OperationDispatcher _dispatcher;
    private bool _outputClosed;

    internal StdioHost(TextReader input, TextWriter output, TextWriter diagnostics)
    {
        _input = input;
        _output = output;
        _diagnostics = diagnostics;
        _dispatcher = new OperationDispatcher(this);
    }

    public async Task<int> RunAsync()
    {
        var tasks = new List<Task>();
        try
        {
            while (await _input.ReadLineAsync() is { } line)
            {
                if (string.IsNullOrWhiteSpace(line)) continue;
                tasks.RemoveAll(task => task.IsCompleted);
                var requestLine = line;
                tasks.Add(Task.Run(() => HandleLineAsync(requestLine)));
            }
        }
        catch (IOException)
        {
            Mark("标准输入已关闭。");
        }
        finally
        {
            _dispatcher.CancelAll();
            var completion = Task.WhenAll(tasks);
            if (await Task.WhenAny(completion, Task.Delay(TimeSpan.FromSeconds(10))) != completion)
                Mark("等待在途请求超过 10 秒，宿主结束。");
        }
        return 0;
    }

    private async Task HandleLineAsync(string line)
    {
        try
        {
            JsonDocument document;
            try
            {
                document = JsonDocument.Parse(line);
            }
            catch (JsonException ex)
            {
                _dispatcher.RespondFailure(string.Empty, string.Empty, ex);
                return;
            }
            using (document)
            {
                var root = document.RootElement;
                if (root.ValueKind != JsonValueKind.Object)
                {
                    _dispatcher.RespondFailure(string.Empty, string.Empty,
                        new InvalidOperationException("请求必须是 JSON 对象。"));
                    return;
                }
                var operation = ReadString(root, "operation");
                if (!AllowedOperations.Contains(operation))
                {
                    Post(JsonSerializer.Serialize(new
                    {
                        id = ReadString(root, "id"),
                        ok = false,
                        error = "该操作尚未迁移到新宿主。"
                    }, JsonOptions));
                    return;
                }
                await _dispatcher.HandleAsync(root);
            }
        }
        catch (Exception ex)
        {
            Mark($"请求处理失败（{ex.GetType().Name}）。");
        }
    }

    void IBridgeHost.Post(string json) => Post(json);

    private void Post(string json)
    {
        lock (_outputGate)
        {
            if (_outputClosed) return;
            try
            {
                _output.WriteLine(json);
                _output.Flush();
                return;
            }
            catch (IOException)
            {
                _outputClosed = true;
            }
        }
        _dispatcher.CancelAll();
    }

    nint IBridgeHost.GetWindowHandle() =>
        throw new InvalidOperationException("该操作由桌面外壳提供，当前宿主无窗口。");

    void IBridgeHost.Mark(string stage) => Mark(stage);

    private void Mark(string stage)
    {
        try
        {
            lock (_diagnosticGate)
            {
                _diagnostics.WriteLine($"[{DateTimeOffset.Now:O}] {stage}");
                _diagnostics.Flush();
            }
        }
        catch
        {
        }
    }

    string? IBridgeHost.AppVersion => null;

    private static string ReadString(JsonElement element, string name) =>
        element.TryGetProperty(name, out var value) && value.ValueKind == JsonValueKind.String
            ? value.GetString() ?? string.Empty : string.Empty;
}
