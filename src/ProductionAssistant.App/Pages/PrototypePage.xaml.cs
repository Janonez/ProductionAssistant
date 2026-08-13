using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Navigation;

namespace ProductionAssistant.Pages;

public sealed partial class PrototypePage : Page
{
    private const string PrototypeHost = "prototype.production-assistant.local";
    private PrototypeBridge? _bridge;
    private string _route = "home";

    public PrototypePage()
    {
        InitializeComponent();
        Loaded += PrototypePage_Loaded;
    }

    protected override void OnNavigatedTo(NavigationEventArgs e)
    {
        base.OnNavigatedTo(e);
        _route = (e.Parameter as string) switch
        {
            "production-message" => "production-message",
            "daily-report" => "daily-report",
            _ => "home"
        };
    }

    private async void PrototypePage_Loaded(object sender, RoutedEventArgs e)
    {
        Loaded -= PrototypePage_Loaded;
        var indexPath = Path.Combine(AppContext.BaseDirectory, "Assets", "Prototype", "index.html");
        if (!File.Exists(indexPath))
        {
            ShowLoadError("未找到前端资源。请重新运行验证脚本生成测试版。");
            return;
        }

        try
        {
            await PrototypeWebView.EnsureCoreWebView2Async();
            var assetFolder = Path.GetDirectoryName(indexPath)!;
            PrototypeWebView.CoreWebView2.SetVirtualHostNameToFolderMapping(
                PrototypeHost,
                assetFolder,
                Microsoft.Web.WebView2.Core.CoreWebView2HostResourceAccessKind.DenyCors);
            _bridge = new PrototypeBridge(PrototypeWebView, tag => App.MainWindow.NavigateTo(tag));
            PrototypeWebView.CoreWebView2.DOMContentLoaded += PrototypeWebView_DOMContentLoaded;
            PrototypeWebView.Source = new Uri($"https://{PrototypeHost}/index.html?route={_route}");
        }
        catch (Exception ex)
        {
            ShowLoadError($"WebView2 初始化失败：{ex.Message}");
        }
    }

    private void PrototypeWebView_NavigationCompleted(
        WebView2 sender,
        Microsoft.Web.WebView2.Core.CoreWebView2NavigationCompletedEventArgs args)
    {
        if (!args.IsSuccess)
            ShowLoadError($"页面加载失败：{args.WebErrorStatus}");
    }

    private async void PrototypeWebView_DOMContentLoaded(
        object? sender,
        Microsoft.Web.WebView2.Core.CoreWebView2DOMContentLoadedEventArgs args)
    {
        await Task.Delay(100);
        var mounted = await PrototypeWebView.CoreWebView2.ExecuteScriptAsync(
            "document.getElementById('root')?.childElementCount > 0");
        if (!string.Equals(mounted, "true", StringComparison.OrdinalIgnoreCase))
            ShowLoadError("新版前端脚本未能启动。请重新运行验证脚本，或返回原版界面继续使用。");
    }

    private void ReturnToNative_Click(object sender, RoutedEventArgs e) =>
        App.MainWindow.NavigateTo("home");

    private void ShowLoadError(string message)
    {
        LoadErrorText.Text = message;
        LoadError.Visibility = Visibility.Visible;
    }
}
