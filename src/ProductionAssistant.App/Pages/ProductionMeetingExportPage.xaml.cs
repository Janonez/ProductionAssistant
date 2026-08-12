using System.Diagnostics;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using ProductionAssistant.Models;
using ProductionAssistant.Services;
using Windows.Storage.Pickers;

namespace ProductionAssistant.Pages;

public sealed partial class ProductionMeetingExportPage : Page
{
    private readonly ProductionMeetingExportService _service = AppServices.ProductionMeeting;
    private string? _outputPath;

    public ProductionMeetingExportPage()
    {
        InitializeComponent();
        NavigationCacheMode = Microsoft.UI.Xaml.Navigation.NavigationCacheMode.Required;
        WorkflowShell.Configure(
            "生产会资料拆分",
            "选择只有一个 Sheet 的 Excel，确认后按已发运、在制、预投三个分段生成独立 Sheet。",
            "选择源文件",
            "请选择 .xlsx、.xlsm 或 .xls 文件",
            "选择源文件",
            "开始拆分",
            true,
            FileWorkflowCapabilities.OpenOutput);
        WorkflowShell.BrowseRequested += BrowseRequested;
        WorkflowShell.ExecuteRequested += ExecuteRequested;
        WorkflowShell.OpenOutputRequested += OpenOutputRequested;
        WorkflowShell.InputChanged += (_, _) => ResetResult();
        WorkflowShell.SetActionAvailability(false, false);
    }

    private async void BrowseRequested(object sender, RoutedEventArgs e)
    {
        var picker = new FileOpenPicker();
        picker.FileTypeFilter.Add(".xlsx");
        picker.FileTypeFilter.Add(".xlsm");
        picker.FileTypeFilter.Add(".xls");
        var windowHandle = WinRT.Interop.WindowNative.GetWindowHandle(App.MainWindow);
        WinRT.Interop.InitializeWithWindow.Initialize(picker, windowHandle);
        var file = await picker.PickSingleFileAsync();
        if (file is null) return;

        WorkflowShell.InputPath = file.Path;
        WorkflowShell.SetActionAvailability(false, true);
        WorkflowShell.TransitionTo(
            WorkflowOperationState.InputSelected,
            "源文件已选择",
            "请确认文件后点击“开始拆分”。",
            InfoBarSeverity.Informational);
    }

    private async void ExecuteRequested(object sender, RoutedEventArgs e)
    {
        var path = WorkflowShell.InputPath.Trim();
        if (string.IsNullOrWhiteSpace(path)) return;

        WorkflowShell.TransitionTo(
            WorkflowOperationState.Executing,
            "正在拆分",
            "正在预检 Sheet、标题、日期和公式，请稍候。",
            InfoBarSeverity.Informational);
        MeetingDateText.Text = "开会日期：读取中";
        OutputPathText.Text = "输出文件：生成中";
        try
        {
            var result = await _service.ExportAsync(path);
            _outputPath = result.OutputPath;
            MeetingDateText.Text = $"开会日期：{result.MeetingDate:yyyy年M月d日}";
            OutputPathText.Text = $"输出文件：{result.OutputPath}";
            WorkflowShell.SetActionAvailability(false, true, true);
            WorkflowShell.TransitionTo(
                WorkflowOperationState.Succeeded,
                "拆分完成",
                "已生成三个分段 Sheet，源文件保持不变。",
                InfoBarSeverity.Success);
        }
        catch (Exception ex)
        {
            ResetOutput();
            WorkflowShell.SetActionAvailability(false, true);
            WorkflowShell.TransitionTo(
                WorkflowOperationState.Failed,
                "拆分失败",
                ex.Message,
                InfoBarSeverity.Error);
        }
    }

    private void OpenOutputRequested(object sender, RoutedEventArgs e)
    {
        if (_outputPath is null || !File.Exists(_outputPath)) return;
        Process.Start(new ProcessStartInfo("explorer.exe", $"/select,\"{_outputPath}\"") { UseShellExecute = true });
    }

    private void ResetResult()
    {
        ResetOutput();
        var hasInput = !string.IsNullOrWhiteSpace(WorkflowShell.InputPath);
        WorkflowShell.SetActionAvailability(false, hasInput);
        WorkflowShell.TransitionTo(
            hasInput ? WorkflowOperationState.InputSelected : WorkflowOperationState.WaitingForInput,
            hasInput ? "源文件已选择" : "等待选择",
            hasInput ? "请确认文件后点击“开始拆分”。" : "导出文件会生成在源文件所在目录，源文件不会被修改。",
            InfoBarSeverity.Informational);
    }

    private void ResetOutput()
    {
        _outputPath = null;
        MeetingDateText.Text = "开会日期：未读取";
        OutputPathText.Text = "输出文件：未生成";
    }
}
