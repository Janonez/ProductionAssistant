using System.Collections.ObjectModel;
using System.Diagnostics;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using ProductionAssistant.Models;
using ProductionAssistant.Services;

namespace ProductionAssistant.Pages;

public sealed partial class PlanPdfExportPage : Page
{
    private readonly PlanPdfService _service = AppServices.PlanPdf;
    private PlanAuditResult? _auditResult;
    private string? _outputFolder;
    private bool _pageReady;

    public ObservableCollection<PlanAuditIssue> Issues { get; } = [];

    public PlanPdfExportPage()
    {
        InitializeComponent();
        NavigationCacheMode = Microsoft.UI.Xaml.Navigation.NavigationCacheMode.Required;
        WorkflowShell.Configure(
            "挂网计划 PDF",
            "检查计划，手动处理时间错误、修复格式警告后导出候选 PDF。",
            "选择月度目录",
            "选择挂网计划目录",
            "选择目录",
            "导出 PDF",
            false,
            FileWorkflowCapabilities.Inspect | FileWorkflowCapabilities.Repair |
            FileWorkflowCapabilities.Progress | FileWorkflowCapabilities.OpenOutput);
        WorkflowShell.BrowseRequested += BrowseButton_Click;
        WorkflowShell.InspectRequested += AuditButton_Click;
        WorkflowShell.RepairRequested += RepairButton_Click;
        WorkflowShell.ExecuteRequested += ExportButton_Click;
        WorkflowShell.OpenOutputRequested += OpenOutputButton_Click;
        WorkflowShell.InputChanged += FolderPathBox_TextChanged;
        _pageReady = true;
        ResetResults();
    }

    private async void BrowseButton_Click(object sender, RoutedEventArgs e)
    {
        SetBusy(true);
        try
        {
            var path = await DesktopFilePicker.PickFolderAsync(
                WinRT.Interop.WindowNative.GetWindowHandle(App.MainWindow),
                WorkflowShell.InputBox.Text, PrototypeWebViewRuntime.Mark);
            if (path is not null)
            {
                WorkflowShell.InputBox.Text = path;
                ResetResults();
            }
        }
        catch (Exception error)
        {
            WorkflowShell.StatusBar.Title = "选择目录失败";
            WorkflowShell.StatusBar.Message = BridgeErrorLog.Record("plan.pickFolder", error);
            WorkflowShell.StatusBar.Severity = InfoBarSeverity.Error;
        }
        finally { SetBusy(false); }
    }

    private void FolderPathBox_TextChanged(object sender, TextChangedEventArgs e)
    {
        if (_pageReady) ResetResults();
    }

    private async void AuditButton_Click(object sender, RoutedEventArgs e)
    {
        var path = WorkflowShell.InputBox.Text.Trim();
        if (string.IsNullOrWhiteSpace(path))
        {
            await ShowDialogAsync("请选择目录", "请先选择一个月份挂网计划目录。");
            return;
        }

        SetBusy(true);
        WorkflowShell.StatusBar.Title = "正在检查";
        WorkflowShell.StatusBar.Message = "正在检查 12 个 Sheet。";
        WorkflowShell.StatusBar.Severity = InfoBarSeverity.Informational;
        try
        {
            ApplyAuditResult(await _service.AuditAsync(path));
        }
        catch (Exception ex)
        {
            ResetResults();
            WorkflowShell.StatusBar.Title = "检查失败";
            WorkflowShell.StatusBar.Message = ex.Message;
            WorkflowShell.StatusBar.Severity = InfoBarSeverity.Error;
        }
        finally
        {
            SetBusy(false);
        }
    }

    private async void RepairButton_Click(object sender, RoutedEventArgs e)
    {
        if (_auditResult is null) return;
        if (!PlanPdfService.IsSourceCurrent(_auditResult))
        {
            ResetResults();
            await ShowDialogAsync("需要重新检查", "源 Excel 已变化，请重新检查后再修复。");
            return;
        }
        if (!_auditResult.Issues.Any(issue => issue.CanAutoFix)) return;

        var confirm = new ContentDialog
        {
            XamlRoot = XamlRoot,
            Title = "确认备份并修复",
            Content = "将备份 Excel，清除发运计划中的纯空行、修复格式和序号，并自动复查。其他计划的间隔行和合并标题保留；日期和时间必须在 Excel 中手动处理。",
            PrimaryButtonText = "备份并修复",
            CloseButtonText = "取消",
            DefaultButton = ContentDialogButton.Close
        };
        if (await confirm.ShowAsync() != ContentDialogResult.Primary) return;

        SetBusy(true);
        WorkflowShell.StatusBar.Title = "正在修复";
        WorkflowShell.StatusBar.Message = "正在修复，请稍候。";
        WorkflowShell.StatusBar.Severity = InfoBarSeverity.Informational;
        try
        {
            await _service.RepairAsync(_auditResult.Workspace);
            var audit = await _service.AuditAsync(_auditResult.Workspace.RootPath);
            ApplyAuditResult(audit);

            var errors = Issues.Count(item => item.Severity == "错误");
            WorkflowShell.StatusBar.Title = audit.CanExport ? "修复完成" : "复查仍有问题";
            WorkflowShell.StatusBar.Message = audit.CanExport
                ? "请点击“导出”。"
                : "请手动处理时间等业务错误，修复剩余格式警告后重新检查。";
            WorkflowShell.StatusBar.Severity = errors > 0 ? InfoBarSeverity.Error : audit.CanExport ? InfoBarSeverity.Success : InfoBarSeverity.Warning;
        }
        catch (Exception ex)
        {
            _auditResult = null;
            WorkflowShell.StatusBar.Title = "修复失败";
            WorkflowShell.StatusBar.Message = ex.Message;
            WorkflowShell.StatusBar.Severity = InfoBarSeverity.Error;
        }
        finally
        {
            SetBusy(false);
        }
    }

    private async void ExportButton_Click(object sender, RoutedEventArgs e)
    {
        if (_auditResult is null) return;
        if (!PlanPdfService.IsSourceCurrent(_auditResult))
        {
            ResetResults();
            await ShowDialogAsync("需要重新检查", "源 Excel 已变化，请重新检查后再导出。");
            return;
        }

        if (!_auditResult.CanExport) return;

        var confirm = new ContentDialog
        {
            XamlRoot = XamlRoot,
            Title = "确认只导出",
            Content = "将在当前月度目录的“生产助手预览”文件夹生成 11 份 PDF，不修改 Excel。",
            PrimaryButtonText = "只导出",
            CloseButtonText = "取消",
            DefaultButton = ContentDialogButton.Close
        };
        if (await confirm.ShowAsync() != ContentDialogResult.Primary) return;

        SetBusy(true);
        WorkflowShell.ProgressBar.Value = 0;
        WorkflowShell.OutputAction.IsEnabled = false;
        WorkflowShell.StatusBar.Title = "正在导出";
        WorkflowShell.StatusBar.Message = "正在导出，请稍候。";
        WorkflowShell.StatusBar.Severity = InfoBarSeverity.Informational;
        try
        {
            var progress = new Progress<PlanExportProgress>(state =>
            {
                WorkflowShell.ProgressBar.Value = state.Current;
                WorkflowShell.ProgressLabel.Text = $"{state.Current} / {state.Total} · {state.Name}";
            });
            var result = await _service.ExportCandidatesAsync(_auditResult, progress);
            _outputFolder = result.OutputFolder;
            WorkflowShell.ProgressBar.Value = 11;
            WorkflowShell.ProgressLabel.Text = $"已生成 {result.Files.Count} 份候选PDF";
            WorkflowShell.OutputAction.IsEnabled = true;
            WorkflowShell.StatusBar.Title = "候选PDF已生成";
            WorkflowShell.StatusBar.Message = "请点击“打开输出目录”。";
            WorkflowShell.StatusBar.Severity = InfoBarSeverity.Success;
        }
        catch (Exception ex)
        {
            WorkflowShell.StatusBar.Title = "导出失败";
            WorkflowShell.StatusBar.Message = ex.Message;
            WorkflowShell.StatusBar.Severity = InfoBarSeverity.Error;
            WorkflowShell.ProgressLabel.Text = "导出未完成";
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
        WorkflowShell.SetBusy(busy);
        WorkflowShell.SetActionAvailability(
            _auditResult?.Issues.Any(issue => issue.CanAutoFix) == true,
            CanExport(),
            _outputFolder is not null && Directory.Exists(_outputFolder));
    }

    private bool CanExport() =>
        _auditResult is not null &&
        _auditResult.CanExport &&
        PlanPdfService.IsSourceCurrent(_auditResult);

    private void ApplyAuditResult(PlanAuditResult result)
    {
        _auditResult = result;
        _outputFolder = null;
        WorkflowShell.OutputAction.IsEnabled = false;
        Issues.Clear();
        foreach (var issue in result.Issues)
            Issues.Add(issue);

        var errors = Issues.Count(item => item.Severity == "错误");
        var warnings = Issues.Count(item => item.Severity == "警告");
        IssueCountText.Text = $"{errors} 个错误 · {warnings} 个警告";
        WorkflowShell.StatusBar.Title = errors == 0 ? "检查完成" : "检查发现错误";
        WorkflowShell.StatusBar.Message = errors > 0
            ? "时间等业务错误必须在 Excel 中手动处理，再重新检查；格式警告可单独修复。"
            : warnings > 0
                ? "格式警告必须修复并复查通过后才能导出。"
                : "检查通过，可以导出。";
        WorkflowShell.StatusBar.Severity = errors > 0
            ? InfoBarSeverity.Error
            : warnings == 0 ? InfoBarSeverity.Success : InfoBarSeverity.Warning;
    }

    private void ResetResults()
    {
        _auditResult = null;
        _outputFolder = null;
        Issues.Clear();
        IssueCountText.Text = "尚未检查";
        WorkflowShell.ProgressBar.Value = 0;
        WorkflowShell.ProgressLabel.Text = "等待导出";
        WorkflowShell.SetActionAvailability(false, false);
        WorkflowShell.StatusBar.Title = "等待操作";
        WorkflowShell.StatusBar.Message = string.IsNullOrWhiteSpace(WorkflowShell.InputBox.Text)
            ? "请选择目录。"
            : "目录已选择，请点击“检查”。";
        WorkflowShell.StatusBar.Severity = InfoBarSeverity.Informational;
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
