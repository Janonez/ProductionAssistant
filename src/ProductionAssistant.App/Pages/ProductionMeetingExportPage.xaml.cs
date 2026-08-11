using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using ProductionAssistant.Services;
using Windows.Storage.Pickers;

namespace ProductionAssistant.Pages;

public sealed partial class ProductionMeetingExportPage : Page
{
    private readonly ProductionMeetingExportService _service = AppServices.ProductionMeeting;

    public ProductionMeetingExportPage()
    {
        InitializeComponent();
        NavigationCacheMode = Microsoft.UI.Xaml.Navigation.NavigationCacheMode.Required;
    }

    private async void BrowseButton_Click(object sender, RoutedEventArgs e)
    {
        var picker = new FileOpenPicker();
        picker.FileTypeFilter.Add(".xlsx");
        picker.FileTypeFilter.Add(".xlsm");
        picker.FileTypeFilter.Add(".xls");
        var windowHandle = WinRT.Interop.WindowNative.GetWindowHandle(App.MainWindow);
        WinRT.Interop.InitializeWithWindow.Initialize(picker, windowHandle);
        var file = await picker.PickSingleFileAsync();
        if (file is null) return;

        FilePathBox.Text = file.Path;
        SetBusy(true);
        ResultInfoBar.Title = "正在导出";
        ResultInfoBar.Message = "正在预检 Sheet、标题、日期和公式，请稍候。";
        ResultInfoBar.Severity = InfoBarSeverity.Informational;
        MeetingDateText.Text = "开会日期：读取中";
        OutputPathText.Text = "输出文件：生成中";
        try
        {
            var result = await _service.ExportAsync(file.Path);
            MeetingDateText.Text = $"开会日期：{result.MeetingDate:yyyy年M月d日}";
            OutputPathText.Text = $"输出文件：{result.OutputPath}";
            ResultInfoBar.Title = "导出完成";
            ResultInfoBar.Message = "已生成三个分段 Sheet，源文件保持不变。";
            ResultInfoBar.Severity = InfoBarSeverity.Success;
        }
        catch (Exception ex)
        {
            MeetingDateText.Text = "开会日期：未读取";
            OutputPathText.Text = "输出文件：未生成";
            ResultInfoBar.Title = "导出失败";
            ResultInfoBar.Message = ex.Message;
            ResultInfoBar.Severity = InfoBarSeverity.Error;
        }
        finally
        {
            SetBusy(false);
        }
    }

    private void SetBusy(bool busy)
    {
        BrowseButton.IsEnabled = !busy;
        BusyRing.IsActive = busy;
        BusyRing.Visibility = busy ? Visibility.Visible : Visibility.Collapsed;
    }
}
