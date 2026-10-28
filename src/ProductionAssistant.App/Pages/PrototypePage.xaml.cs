using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Navigation;
using ProductionAssistant.Models;
using ProductionAssistant.Services;

namespace ProductionAssistant.Pages;

public sealed partial class PrototypePage : Page
{
    private const string PrototypeHost = "prototype.production-assistant.local";
    private PrototypeBridge? _bridge;
    private string _loadId = Guid.NewGuid().ToString("N");
    private bool _initialized;
    private bool _reactVisible;
    private long _loadStarted;
    private CancellationTokenSource? _readyTimeout;

    public PrototypePage()
    {
        InitializeComponent();
        NavigationCacheMode = NavigationCacheMode.Required;
        Loaded += PrototypePage_Loaded;
    }

    private async void PrototypePage_Loaded(object sender, RoutedEventArgs e)
    {
        Loaded -= PrototypePage_Loaded;
        await InitializeAsync();
    }

    private async Task InitializeAsync()
    {
        var indexPath = Path.Combine(AppContext.BaseDirectory, "Assets", "Prototype", "index.html");
        if (!File.Exists(indexPath))
        {
            ShowLoadError("未找到前端资源。请重新运行验证脚本生成测试版。");
            return;
        }

        try
        {
            Environment.SetEnvironmentVariable(
                "WEBVIEW2_DEFAULT_BACKGROUND_COLOR",
                "00000000",
                EnvironmentVariableTarget.Process);
            PrototypeWebViewRuntime.Mark("page-initialize-start");
            var environment = await PrototypeWebViewRuntime.GetEnvironmentAsync();
            PrototypeWebViewRuntime.Mark("webview-create-start");
            await PrototypeWebView.EnsureCoreWebView2Async(environment);
            PrototypeWebViewRuntime.Mark("webview-ready");
            PrototypeWebView.CoreWebView2.Settings.IsZoomControlEnabled = false;
            PrototypeWebView.CoreWebView2.Settings.IsPinchZoomEnabled = false;
            PrototypeWebView.CoreWebView2.NavigationStarting += (_, args) =>
            {
                if (!PrototypeBridgeProtocol.IsTrustedPrototypeSource(args.Uri)) args.Cancel = true;
            };
            PrototypeWebView.CoreWebView2.NewWindowRequested += (_, args) => args.Handled = true;
            var assetFolder = Path.GetDirectoryName(indexPath)!;
            PrototypeWebView.CoreWebView2.SetVirtualHostNameToFolderMapping(
                PrototypeHost,
                assetFolder,
                Microsoft.Web.WebView2.Core.CoreWebView2HostResourceAccessKind.DenyCors);
            _bridge = new PrototypeBridge(PrototypeWebView, OnReactReady);
            _initialized = true;
            await LoadDocumentAsync(reuseCurrentSource: false);
        }
        catch (Exception ex)
        {
            PrototypeWebViewRuntime.Mark($"initialization-failed-{ex.GetType().Name}");
            ShowLoadError("WebView2 初始化失败。请确认已安装 WebView2 Runtime，然后重试加载。");
        }
    }

    private void PrototypeWebView_NavigationCompleted(
        WebView2 sender,
        Microsoft.Web.WebView2.Core.CoreWebView2NavigationCompletedEventArgs args)
    {
        if (!args.IsSuccess)
            ShowLoadError($"页面加载失败：{args.WebErrorStatus}");
        else
            PrototypeWebViewRuntime.Mark("navigation-completed");
    }

    private async Task LoadDocumentAsync(bool reuseCurrentSource)
    {
        _readyTimeout?.Cancel();
        using var readyTimeout = new CancellationTokenSource();
        _readyTimeout = readyTimeout;
        _loadStarted = System.Diagnostics.Stopwatch.GetTimestamp();
        PrototypeWebViewRuntime.Mark("document-load-start");
        if (!_reactVisible) ShowLoading();
        var currentSource = reuseCurrentSource ? PrototypeWebView.CoreWebView2.Source : null;
        PrototypeWebView.Source = new Uri(PrototypeBridgeProtocol.BuildDocumentUrl(currentSource, _loadId));

        try
        {
            await Task.Delay(TimeSpan.FromSeconds(15), readyTimeout.Token);
            if (ReferenceEquals(_readyTimeout, readyTimeout))
                ShowLoadError("界面准备时间过长。请重试加载；若问题持续，请重新运行验证脚本。");
        }
        catch (OperationCanceledException)
        {
        }
        finally
        {
            if (ReferenceEquals(_readyTimeout, readyTimeout))
                _readyTimeout = null;
        }
    }

    private async Task LoadDocumentSafelyAsync(bool reuseCurrentSource)
    {
        try
        {
            await LoadDocumentAsync(reuseCurrentSource);
        }
        catch (Exception ex)
        {
            PrototypeWebViewRuntime.Mark($"load-failed-{ex.GetType().Name}");
            ShowLoadError("页面加载失败。请重试加载。");
        }
    }

    private void OnReactReady(string route, string loadId)
    {
        if (!PrototypeBridgeProtocol.IsCurrentLoad(loadId, _loadId))
            return;
        _readyTimeout?.Cancel();
        PrototypeWebViewRuntime.Mark("react-ready");
        PrototypeWebViewRuntime.Mark($"document-ready-wait={System.Diagnostics.Stopwatch.GetElapsedTime(_loadStarted).TotalMilliseconds:F0}ms-route={route}");
        _reactVisible = true;
        LoadingLayer.Visibility = Visibility.Collapsed;
        LoadError.Visibility = Visibility.Collapsed;
        PrototypeWebView.Visibility = Visibility.Visible;
    }

    private async void Retry_Click(object sender, RoutedEventArgs e)
    {
        _loadId = Guid.NewGuid().ToString("N");
        if (_initialized)
            await LoadDocumentSafelyAsync(reuseCurrentSource: true);
        else
            await InitializeAsync();
    }

    private void ShowLoading()
    {
        LoadError.Visibility = Visibility.Collapsed;
        PrototypeWebView.Visibility = Visibility.Collapsed;
        LoadingLayer.Visibility = Visibility.Visible;
    }

    private void ShowLoadError(string message)
    {
        _reactVisible = false;
        LoadErrorText.Text = message;
        LoadingLayer.Visibility = Visibility.Collapsed;
        PrototypeWebView.Visibility = Visibility.Collapsed;
        LoadError.Visibility = Visibility.Visible;
    }
}
