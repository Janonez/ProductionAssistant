using System.Collections.ObjectModel;
using System.Diagnostics;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using ProductionAssistant.Models;
using ProductionAssistant.Services;
using Windows.Storage.Pickers;

namespace ProductionAssistant.Pages;

public sealed partial class PlanPdfExportPage : Page
{
    private readonly PlanPdfService _service = AppServices.PlanPdf;
    private PlanAuditResult? _auditResult;
    private string? _outputFolder;
    private bool _repairCompleted;
    private bool _pageReady;

    public ObservableCollection<PlanAuditIssue> Issues { get; } = [];

    public PlanPdfExportPage()
    {
        InitializeComponent();
        NavigationCacheMode = Microsoft.UI.Xaml.Navigation.NavigationCacheMode.Required;
        _pageReady = true;
        ResetResults();
    }

    private async void BrowseButton_Click(object sender, RoutedEventArgs e)
    {
        var picker = new FolderPicker();
        picker.FileTypeFilter.Add("*");
        var windowHandle = WinRT.Interop.WindowNative.GetWindowHandle(App.MainWindow);
        WinRT.Interop.InitializeWithWindow.Initialize(picker, windowHandle);
        var folder = await picker.PickSingleFolderAsync();
        if (folder is not null)
        {
            FolderPathBox.Text = folder.Path;
            ResetResults();
        }
    }

    private void FolderPathBox_TextChanged(object sender, TextChangedEventArgs e)
    {
        if (_pageReady) ResetResults();
    }

    private async void AuditButton_Click(object sender, RoutedEventArgs e)
    {
        var path = FolderPathBox.Text.Trim();
        if (string.IsNullOrWhiteSpace(path))
        {
            await ShowDialogAsync("请选择目录", "请先选择一个月份挂网计划目录。");
            return;
        }

        SetBusy(true);
        WorkspaceInfoBar.Title = "正在检查";
        WorkspaceInfoBar.Message = "正在检查 12 个 Sheet。";
        WorkspaceInfoBar.Severity = InfoBarSeverity.Informational;
        try
        {
            ApplyAuditResult(await _service.AuditAsync(path));
        }
        catch (Exception ex)
        {
            ResetResults();
            WorkspaceInfoBar.Title = "检查失败";
            WorkspaceInfoBar.Message = ex.Message;
            WorkspaceInfoBar.Severity = InfoBarSeverity.Error;
        }
        finally
        {
            SetBusy(false);
        }
    }

    private async void RepairButton_Click(object sender, RoutedEventArgs e)
    {
        if (_auditResult is null) return;

        var confirm = new ContentDialog
        {
            XamlRoot = XamlRoot,
            Title = "确认备份并修复",
            Content = "将备份 Excel，修复格式和序号，并自动复查。",
            PrimaryButtonText = "备份并修复",
            CloseButtonText = "取消",
            DefaultButton = ContentDialogButton.Close
        };
        if (await confirm.ShowAsync() != ContentDialogResult.Primary) return;

        SetBusy(true);
        WorkspaceInfoBar.Title = "正在修复";
        WorkspaceInfoBar.Message = "正在修复，请稍候。";
        WorkspaceInfoBar.Severity = InfoBarSeverity.Informational;
        try
        {
            await _service.RepairAsync(_auditResult.Workspace);
            var audit = await _service.AuditAsync(_auditResult.Workspace.RootPath);
            ApplyAuditResult(audit, repaired: true);

            var errors = Issues.Count(item => item.Severity == "错误");
            WorkspaceInfoBar.Title = errors == 0 ? "修复完成" : "修复完成，需手动处理";
            WorkspaceInfoBar.Message = errors == 0
                ? "请点击“导出”。"
                : "请处理剩余错误后重新检查。";
            WorkspaceInfoBar.Severity = errors == 0 ? InfoBarSeverity.Success : InfoBarSeverity.Warning;
        }
        catch (Exception ex)
        {
            _repairCompleted = false;
            WorkspaceInfoBar.Title = "修复失败";
            WorkspaceInfoBar.Message = ex.Message;
            WorkspaceInfoBar.Severity = InfoBarSeverity.Error;
        }
        finally
        {
            SetBusy(false);
        }
    }

    private async void ExportButton_Click(object sender, RoutedEventArgs e)
    {
        if (_auditResult is null) return;
        if (!_repairCompleted || !PlanPdfService.IsSourceCurrent(_auditResult))
        {
            _repairCompleted = false;
            SetBusy(false);
            await ShowDialogAsync("需要重新检查", "源Excel在最近一次检查或修复后发生了变化，请重新检查并修复后再导出。");
            return;
        }

        if (_auditResult.Issues.Any(item => item.Severity == "错误")) return;

        var confirm = new ContentDialog
        {
            XamlRoot = XamlRoot,
            Title = "确认只导出",
            Content = "只生成 11 份 PDF，不修改 Excel。",
            PrimaryButtonText = "只导出",
            CloseButtonText = "取消",
            DefaultButton = ContentDialogButton.Close
        };
        if (await confirm.ShowAsync() != ContentDialogResult.Primary) return;

        SetBusy(true);
        ExportProgressBar.Value = 0;
        OpenOutputButton.IsEnabled = false;
        WorkspaceInfoBar.Title = "正在导出";
        WorkspaceInfoBar.Message = "正在导出，请稍候。";
        WorkspaceInfoBar.Severity = InfoBarSeverity.Informational;
        try
        {
            var progress = new Progress<PlanExportProgress>(state =>
            {
                ExportProgressBar.Value = state.Current;
                ExportProgressText.Text = $"{state.Current} / {state.Total} · {state.Name}";
            });
            var result = await _service.ExportCandidatesAsync(_auditResult.Workspace, progress);
            _outputFolder = result.OutputFolder;
            ExportProgressBar.Value = 11;
            ExportProgressText.Text = $"已生成 {result.Files.Count} 份候选PDF";
            OpenOutputButton.IsEnabled = true;
            WorkspaceInfoBar.Title = "候选PDF已生成";
            WorkspaceInfoBar.Message = "请点击“打开输出目录”。";
            WorkspaceInfoBar.Severity = InfoBarSeverity.Success;
        }
        catch (Exception ex)
        {
            WorkspaceInfoBar.Title = "导出失败";
            WorkspaceInfoBar.Message = ex.Message;
            WorkspaceInfoBar.Severity = InfoBarSeverity.Error;
            ExportProgressText.Text = "导出未完成";
        }
        finally
        {
            SetBusy(false);
        }
    }

    private void OpenOutputButton_Click(object sender, RoutedEventArgs e)
    {
        if (_outputFolder is null || !Directory.Exists(_outputFolder)) return;
        Process.Start(new ProcessStartInfo("explorer.exe", _outputFolder) { UseShellExecute = true });
    }

    private void SetBusy(bool busy)
    {
        AuditButton.IsEnabled = !busy && !string.IsNullOrWhiteSpace(FolderPathBox.Text);
        FolderPathBox.IsEnabled = !busy;
        RepairButton.IsEnabled = !busy && _auditResult is not null;
        ExportButton.IsEnabled = !busy && CanExport();
        OpenOutputButton.IsEnabled = !busy && _outputFolder is not null && Directory.Exists(_outputFolder);
    }

    private bool CanExport() =>
        _repairCompleted &&
        _auditResult is not null &&
        !_auditResult.Issues.Any(item => item.Severity == "错误") &&
        PlanPdfService.IsSourceCurrent(_auditResult);

    private void ApplyAuditResult(PlanAuditResult result, bool? repaired = null)
    {
        var sameWorkbook = string.Equals(
            _auditResult?.Workspace.WorkbookPath,
            result.Workspace.WorkbookPath,
            StringComparison.OrdinalIgnoreCase);
        _auditResult = result;
        _repairCompleted = repaired ?? (sameWorkbook && _repairCompleted);
        _outputFolder = null;
        OpenOutputButton.IsEnabled = false;
        Issues.Clear();
        foreach (var issue in result.Issues)
            Issues.Add(issue);

        var errors = Issues.Count(item => item.Severity == "错误");
        var warnings = Issues.Count(item => item.Severity == "警告");
        IssueCountText.Text = $"{errors} 个错误 · {warnings} 个警告";
        WorkspaceInfoBar.Title = errors == 0 ? "检查完成" : "检查发现错误";
        WorkspaceInfoBar.Message = errors > 0
            ? "请点击“修复”，剩余错误需手动处理。"
            : _repairCompleted
                ? "请点击“导出”。"
                : "请点击“修复”。";
        WorkspaceInfoBar.Severity = errors > 0
            ? InfoBarSeverity.Error
            : warnings == 0 ? InfoBarSeverity.Success : InfoBarSeverity.Warning;
    }

    private void ResetResults()
    {
        _auditResult = null;
        _outputFolder = null;
        _repairCompleted = false;
        Issues.Clear();
        IssueCountText.Text = "尚未检查";
        ExportProgressBar.Value = 0;
        ExportProgressText.Text = "等待导出";
        OpenOutputButton.IsEnabled = false;
        RepairButton.IsEnabled = false;
        ExportButton.IsEnabled = false;
        WorkspaceInfoBar.Title = "等待操作";
        WorkspaceInfoBar.Message = string.IsNullOrWhiteSpace(FolderPathBox.Text)
            ? "请选择目录。"
            : "目录已选择，请点击“检查”。";
        WorkspaceInfoBar.Severity = InfoBarSeverity.Informational;
        SetBusy(false);
    }

    private async Task ShowDialogAsync(string title, string message) =>
        await new ContentDialog
        {
            XamlRoot = XamlRoot,
            Title = title,
            Content = message,
            CloseButtonText = "确定"
        }.ShowAsync();
}
