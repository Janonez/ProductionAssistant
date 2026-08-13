using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Media;
using Microsoft.UI.Windowing;
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
        AppNavigation.SelectedItem = HomeNavigationItem;
        NavigateTo("home");
    }

    private void PaneToggleButton_Click(object sender, RoutedEventArgs e) =>
        AppNavigation.IsPaneOpen = !AppNavigation.IsPaneOpen;

    private void AppNavigation_SelectionChanged(
        NavigationView sender,
        NavigationViewSelectionChangedEventArgs args)
    {
        if (args.IsSettingsSelected)
        {
            NavigateTo("settings");
            return;
        }

        if (args.SelectedItemContainer?.Tag is not string tag)
            return;

        NavigateTo(tag);
    }

    internal void NavigateTo(string tag)
    {
        var pageType = tag switch
        {
            "home" => typeof(PrototypePage),
            "daily-weld" => typeof(DailyWeldSimulationPage),
            "production-message" => typeof(PrototypePage),
            "plan-pdf" => typeof(PlanPdfExportPage),
            "production-meeting" => typeof(ProductionMeetingExportPage),
            "daily-report" => typeof(PrototypePage),
            "settings" => typeof(SettingsPage),
            _ => typeof(HomePage)
        };

        var navigationItem = FindNavigationItem(tag);
        AppNavigation.SelectedItem = tag == "settings" ? AppNavigation.SettingsItem : navigationItem;

        if (_currentTag != tag)
        {
            _currentTag = tag;
            ContentFrame.Navigate(pageType, tag);
        }
    }

    private NavigationViewItem? FindNavigationItem(string tag) =>
        AppNavigation.MenuItems.OfType<NavigationViewItem>()
            .FirstOrDefault(item => item.Tag as string == tag);
}
