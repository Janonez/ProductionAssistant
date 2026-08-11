using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Media;
using ProductionAssistant.Services;

namespace ProductionAssistant.Pages;

public sealed partial class SettingsPage : Page
{
    private readonly INotionImportService _notionService = AppServices.Notion;
    private NotionSettings _settings = new();

    public SettingsPage()
    {
        InitializeComponent();
        LoadSettings();
        ShowCacheStatus();
    }

    private void SettingsPage_SizeChanged(
        object sender,
        SizeChangedEventArgs e)
    {
        SettingsContentGrid.Width = Math.Max(0, e.NewSize.Width);
    }

    private void LoadSettings()
    {
        _settings = NotionSettingsStore.Load();
        TokenBox.Password = _settings.Token;
        RootPageIdBox.Text = _settings.RootPageId;
        var bindings = _settings.Targets
            .Where(target => !string.IsNullOrWhiteSpace(target.ModuleKey))
            .ToArray();
        BindingsList.ItemsSource = bindings;
        EmptyBindingsText.Visibility = bindings.Length == 0
            ? Visibility.Visible
            : Visibility.Collapsed;
        RefreshCachedSourcesView();
    }

    private async void SaveButton_Click(object sender, RoutedEventArgs e)
    {
        var cacheInvalidated = SaveConnection();
        if (cacheInvalidated || _settings.CachedDataSources.Count == 0)
            await RefreshDataSourcesAsync();
        else
            ShowCacheStatus("连接配置已保存。");
    }

    private async void RefreshButton_Click(object sender, RoutedEventArgs e)
    {
        SaveConnection();
        await RefreshDataSourcesAsync();
    }

    private bool SaveConnection()
    {
        var newRootPageId = RootPageIdBox.Text.Trim();
        var newToken = TokenBox.Password.Trim();
        var cacheInvalidated =
            !string.Equals(_settings.RootPageId, newRootPageId, StringComparison.OrdinalIgnoreCase) ||
            !string.Equals(_settings.Token, newToken, StringComparison.Ordinal);
        if (cacheInvalidated)
        {
            _settings.CachedDataSources.Clear();
            _settings.DataSourcesCachedAtUtc = null;
        }
        _settings.Token = newToken;
        _settings.RootPageId = newRootPageId;
        NotionSettingsStore.Save(_settings);
        return cacheInvalidated;
    }

    private async Task RefreshDataSourcesAsync()
    {
        SaveConnectionButton.IsEnabled = false;
        RefreshDataSourcesButton.IsEnabled = false;
        TestingRing.IsActive = true;
        TestingRing.Visibility = Visibility.Visible;
        ShowConnectionStatus("正在刷新数据源缓存…");
        try
        {
            var result = await _notionService.DiscoverAsync(
                _settings.Token,
                _settings.RootPageId);
            if (result.Succeeded)
            {
                _settings.CachedDataSources = result.DataSources.ToList();
                _settings.DataSourcesCachedAtUtc = DateTime.UtcNow;
                NotionSettingsStore.Save(_settings);
                RefreshCachedSourcesView();
                ShowCacheStatus("刷新完成。");
            }
            else
            {
                ShowConnectionStatus(result.Message, InfoBarSeverity.Error);
            }
        }
        finally
        {
            TestingRing.IsActive = false;
            TestingRing.Visibility = Visibility.Collapsed;
            SaveConnectionButton.IsEnabled = true;
            RefreshDataSourcesButton.IsEnabled = true;
        }
    }

    private void ShowCacheStatus(string? prefix = null)
    {
        if (_settings.CachedDataSources.Count == 0)
        {
            ShowConnectionStatus(prefix ?? "尚未缓存数据源。");
            return;
        }
        var cachedTime = _settings.DataSourcesCachedAtUtc?.ToLocalTime()
            .ToString("yyyy-MM-dd HH:mm");
        ShowConnectionStatus(
            $"已连接 {_settings.CachedDataSources.Count} 个数据源" +
            (cachedTime is null ? "。" : $"，更新时间 {cachedTime}。"),
            InfoBarSeverity.Success);
    }

    private void ShowConnectionStatus(
        string message,
        InfoBarSeverity severity = InfoBarSeverity.Informational)
    {
        ConnectionStatusText.Text = message;
        ConnectionStatusText.Visibility = Visibility.Visible;
        ConnectionStatusIcon.Visibility = Visibility.Visible;
        ConnectionStatusIcon.Glyph = severity == InfoBarSeverity.Error ? "\uEA39" :
            severity == InfoBarSeverity.Success ? "\uE73E" : "\uE946";
        ConnectionStatusIcon.Foreground = severity switch
        {
            InfoBarSeverity.Success => (Brush)Application.Current.Resources["BrandGreenBrush"],
            InfoBarSeverity.Error => new SolidColorBrush(
                Windows.UI.Color.FromArgb(255, 196, 43, 28)),
            _ => (Brush)Application.Current.Resources["MutedTextBrush"]
        };
    }

    private void RefreshCachedSourcesView()
    {
        var sources = _settings.CachedDataSources
            .OrderBy(source => source.Path)
            .ToArray();
        CachedSourcesList.ItemsSource = sources;
        CachedSourcesDescriptionText.Text = sources.Length == 0
            ? "尚未缓存 Notion 数据源"
            : $"已从 Notion 获取并缓存 {sources.Length} 个数据源";
        EmptyCachedSourcesText.Visibility = sources.Length == 0
            ? Visibility.Visible
            : Visibility.Collapsed;
        CachedSourcesList.Visibility = sources.Length == 0
            ? Visibility.Collapsed
            : Visibility.Visible;
    }
}
