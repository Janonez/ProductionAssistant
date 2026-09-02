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
    private string _route = "production-message";
    private string _navigationId = string.Empty;
    private bool _initialized;
    private CancellationTokenSource? _readyTimeout;

    public PrototypePage()
    {
        InitializeComponent();
        NavigationCacheMode = NavigationCacheMode.Required;
        Loaded += PrototypePage_Loaded;
    }

    protected override void OnNavigatedTo(NavigationEventArgs e)
    {
        base.OnNavigatedTo(e);
        NavigateToRoute(e.Parameter as string);
    }

    internal void NavigateToRoute(string? route)
    {
        _route = route switch
        {
            { } navigationRoute when navigationRoute.StartsWith("navigation:", StringComparison.Ordinal) => navigationRoute,
            "daily-weld" => "daily-weld",
            "production-message" => "production-message",
            "database-viewer" => "database-viewer",
            "daily-report" => "daily-report",
            "report-center" => "report-center",
            _ => "production-message"
        };
        _navigationId = Guid.NewGuid().ToString("N");
        if (_initialized)
            _ = NavigateRouteSafelyAsync();
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
            await PrototypeWebView.EnsureCoreWebView2Async(await PrototypeWebViewRuntime.GetEnvironmentAsync());
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
            _bridge = new PrototypeBridge(PrototypeWebView, tag => App.MainWindow.NavigateTo(tag), OnReactReady);
            _initialized = true;
            await NavigateRouteAsync(initial: true);
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

    private async Task NavigateRouteAsync(bool initial = false)
    {
        _readyTimeout?.Cancel();
        using var readyTimeout = new CancellationTokenSource();
        _readyTimeout = readyTimeout;
        ShowLoading();
        var query = $"route={Uri.EscapeDataString(_route)}&navigation={_navigationId}";
        if (initial)
            PrototypeWebView.Source = new Uri($"https://{PrototypeHost}/index.html?{query}");
        else
            await PrototypeWebView.CoreWebView2.ExecuteScriptAsync(
                $"history.replaceState(null,'','?{query}');window.dispatchEvent(new PopStateEvent('popstate'));" );

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

    private async Task NavigateRouteSafelyAsync()
    {
        try
        {
            await NavigateRouteAsync();
        }
        catch (Exception ex)
        {
            PrototypeWebViewRuntime.Mark($"route-failed-{ex.GetType().Name}");
            ShowLoadError("页面切换失败。请重试加载。");
        }
    }

    private void OnReactReady(string route, string navigation)
    {
        if (!PrototypeBridgeProtocol.IsCurrentNavigation(route, navigation, _route, _navigationId))
            return;
        _readyTimeout?.Cancel();
        PrototypeWebViewRuntime.Mark("react-ready");
        LoadingLayer.Visibility = Visibility.Collapsed;
        LoadError.Visibility = Visibility.Collapsed;
        PrototypeWebView.Visibility = Visibility.Visible;
    }

    private async void Retry_Click(object sender, RoutedEventArgs e)
    {
        _navigationId = Guid.NewGuid().ToString("N");
        if (_initialized)
            await NavigateRouteSafelyAsync();
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
        LoadErrorText.Text = message;
        LoadingLayer.Visibility = Visibility.Collapsed;
        PrototypeWebView.Visibility = Visibility.Collapsed;
        LoadError.Visibility = Visibility.Visible;
    }
}
