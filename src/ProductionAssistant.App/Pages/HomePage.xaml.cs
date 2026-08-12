using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Media;
using ProductionAssistant.Models;
using ProductionAssistant.Services;

namespace ProductionAssistant.Pages;

public sealed partial class HomePage : Page
{
    public HomePage()
    {
        InitializeComponent();
        Loaded += (_, _) => RefreshNotionStatus();
    }

    private void RefreshNotionStatus()
    {
        var settings = NotionSettingsStore.Load();
        if (string.IsNullOrWhiteSpace(settings.Token))
        {
            SetOverview("Notion 未配置", "尚未保存连接信息；这是当前设备上的本地配置状态。", InfoBarSeverity.Informational);
        }
        else if (settings.CachedDataSources.Count == 0)
        {
            SetOverview("数据源待刷新", "已保存连接信息，但当前设备尚未缓存数据源。", InfoBarSeverity.Warning);
        }
        else
        {
            SetOverview("本地配置已准备", $"当前设备已缓存 {settings.CachedDataSources.Count} 个数据源；未执行联网检查。", InfoBarSeverity.Success);
        }

        var dailyWeldReady = settings.Targets.Any(target =>
            target.ModuleKey == "daily-weld-simulation" &&
            !string.IsNullOrWhiteSpace(target.Id) &&
            !string.IsNullOrWhiteSpace(target.DateProperty) &&
            !string.IsNullOrWhiteSpace(target.QuantityProperty));
        SetModuleStatus(DailyWeldStatusText, dailyWeldReady);

        var towerKeys = new[]
        {
            ProductionMessageKinds.TowerDailyModuleKey,
            ProductionMessageKinds.TowerMonthlyModuleKey,
            ProductionMessageKinds.TowerYearlyModuleKey
        };
        var productionMessageReady = towerKeys.All(key =>
        {
            var target = settings.Targets.FirstOrDefault(item => item.ModuleKey == key);
            return target is not null &&
                   !string.IsNullOrWhiteSpace(target.Id) &&
                   !string.IsNullOrWhiteSpace(target.TitleProperty) &&
                   (key != ProductionMessageKinds.TowerDailyModuleKey ||
                    !string.IsNullOrWhiteSpace(target.DateProperty));
        });
        SetModuleStatus(ProductionMessageStatusText, productionMessageReady);

        var reportReady = DailyReportSettingsStore.LoadCatalog().Jobs.Any(report =>
            report.ActiveTemplateVersion > 0 &&
            !string.IsNullOrWhiteSpace(report.ActiveTemplate) &&
            !string.IsNullOrWhiteSpace(report.EncryptedWebhook) &&
            !string.IsNullOrWhiteSpace(report.EncryptedSecret));
        SetModuleStatus(DailyReportStatusText, reportReady);
    }

    private void SetOverview(string title, string message, InfoBarSeverity severity)
    {
        NotionOverviewInfoBar.Title = title;
        NotionOverviewInfoBar.Message = message;
        NotionOverviewInfoBar.Severity = severity;
    }

    private static void SetModuleStatus(TextBlock textBlock, bool ready)
    {
        textBlock.Text = ready ? "本地绑定已就绪" : "待完成本地绑定";
        textBlock.Foreground = new SolidColorBrush(ready
            ? Windows.UI.Color.FromArgb(255, 8, 122, 89)
            : Windows.UI.Color.FromArgb(255, 166, 91, 0));
    }

    private void ModuleCard_Click(object sender, Microsoft.UI.Xaml.RoutedEventArgs e)
    {
        if (sender is Button { Tag: string tag })
            App.MainWindow.NavigateTo(tag);
    }

    private void OpenSettingsButton_Click(object sender, Microsoft.UI.Xaml.RoutedEventArgs e) =>
        App.MainWindow.NavigateTo("settings");
}
