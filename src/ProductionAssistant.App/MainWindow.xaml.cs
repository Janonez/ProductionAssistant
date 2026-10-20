using Microsoft.UI.Windowing;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Media;
using ProductionAssistant.Pages;
using ProductionAssistant.Services;

namespace ProductionAssistant;

public sealed partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
        DevelopmentEnvironmentMarker.Visibility = RuntimeEnvironment.Current.IsDevelopment
            ? Visibility.Visible : Visibility.Collapsed;
        Title = RuntimeEnvironment.Current.IsDevelopment ? "生产助手 [Development]" : "生产助手";
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

        ShellFrame.Navigate(typeof(PrototypePage));
    }

    internal void SetSettingsModalOpen(bool open) =>
        Canvas.SetZIndex(ShellFrame, open ? 10 : 0);
}
