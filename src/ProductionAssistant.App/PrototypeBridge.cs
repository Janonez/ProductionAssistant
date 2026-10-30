using System.Reflection;
using System.Text.Json;
using Microsoft.UI.Xaml.Controls;
using ProductionAssistant.Models;
using ProductionAssistant.Services;

namespace ProductionAssistant;

internal sealed class PrototypeBridge : IBridgeHost
{
    private readonly WebView2 _webView;
    private readonly Action<string, string> _ready;
    private readonly OperationDispatcher _dispatcher;

    internal PrototypeBridge(WebView2 webView, Action<string, string> ready)
    {
        _webView = webView;
        _ready = ready;
        _dispatcher = new OperationDispatcher(this);
        _webView.CoreWebView2.WebMessageReceived += OnMessageReceived;
    }

    private async void OnMessageReceived(
        object? sender,
        Microsoft.Web.WebView2.Core.CoreWebView2WebMessageReceivedEventArgs args)
    {
        if (!PrototypeBridgeProtocol.IsTrustedPrototypeSource(args.Source)) return;
        var dispatchStarted = false;
        try
        {
            using var document = JsonDocument.Parse(args.WebMessageAsJson);
            var root = document.RootElement;
            if (ReadString(root, "type") == "app.ready")
            {
                _ready(ReadString(root, "route"), ReadString(root, "loadId"));
                if (root.TryGetProperty("moduleEntryMs", out var entry) && entry.TryGetInt32(out var entryMs) && entryMs >= 0 &&
                    root.TryGetProperty("readyMs", out var ready) && ready.TryGetInt32(out var readyMs) && readyMs >= entryMs)
                    PrototypeWebViewRuntime.Mark($"frontend-timing-entry={entryMs}ms-ready={readyMs}ms");
                return;
            }
            dispatchStarted = true;
            await _dispatcher.HandleAsync(root);
        }
        catch (OperationCanceledException ex) when (!dispatchStarted)
        {
            _dispatcher.RespondFailure(string.Empty, string.Empty, ex);
        }
        catch (Exception ex) when (!dispatchStarted)
        {
            _dispatcher.RespondFailure(string.Empty, string.Empty, ex);
        }
    }

    void IBridgeHost.Post(string json) => _webView.CoreWebView2.PostWebMessageAsJson(json);
    nint IBridgeHost.GetWindowHandle() => WinRT.Interop.WindowNative.GetWindowHandle(App.MainWindow);
    void IBridgeHost.Mark(string stage) => PrototypeWebViewRuntime.Mark(stage);
    string? IBridgeHost.AppVersion => Assembly.GetExecutingAssembly()
        .GetCustomAttribute<AssemblyInformationalVersionAttribute>()?.InformationalVersion;

    private static string ReadString(JsonElement element, string name) => element.ValueKind == JsonValueKind.Object && element.TryGetProperty(name, out var value) ? value.GetString() ?? string.Empty : string.Empty;
}
