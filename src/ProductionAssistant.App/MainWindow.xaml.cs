using Microsoft.UI.Windowing;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Media;
using ProductionAssistant.Pages;

namespace ProductionAssistant;

public sealed partial class MainWindow : Window
{
    private string _currentTag = string.Empty;

    public MainWindow()
    {
        InitializeComponent();
        Title = "生产助手";
        SystemBackdrop = new MicaBackdrop();
        ExtendsContentIntoTitleBar = true;
        SetTitleBar(AppTitleBar);
        AppWindow.TitleBar.ButtonBackgroundColor = Microsoft.UI.Colors.Transparent;
        AppWindow.TitleBar.ButtonInactiveBackgroundColor = Microsoft.UI.Colors.Transparent;
        var iconPath = Path.Combine(
            AppContext.BaseDirectory,
            "Assets",
            "production-assistant-logo.ico");
        if (File.Exists(iconPath))
            AppWindow.SetIcon(iconPath);
        if (AppWindow.Presenter is OverlappedPresenter presenter)
        {
            presenter.PreferredMinimumWidth = 1100;
            presenter.PreferredMinimumHeight = 700;
        }

        ShellFrame.Navigate(typeof(PrototypePage), "navigation:plan-pdf");
        NavigateTo("plan-pdf");
    }

    internal void NavigateTo(string tag)
    {
        if (_currentTag == tag)
            return;

        _currentTag = tag;
        var pageType = tag switch
        {
            "daily-weld" => typeof(PrototypePage),
            "production-message" => typeof(PrototypePage),
            "plan-pdf" => typeof(PlanPdfExportPage),
            "production-meeting" => typeof(ProductionMeetingExportPage),
            "daily-report" => typeof(PrototypePage),
            "report-center" => typeof(PrototypePage),
            _ => typeof(PlanPdfExportPage)
        };

        var reactRoute = pageType == typeof(PrototypePage);
        if (ShellFrame.Content is PrototypePage shellPage)
            shellPage.NavigateToRoute(reactRoute ? tag : $"navigation:{tag}");

        ContentFrame.Visibility = reactRoute ? Visibility.Collapsed : Visibility.Visible;
        if (!reactRoute)
            ContentFrame.Navigate(pageType, tag);
    }

    internal void SetSettingsModalOpen(bool open) =>
        Canvas.SetZIndex(ShellFrame, open ? 10 : 0);
}
