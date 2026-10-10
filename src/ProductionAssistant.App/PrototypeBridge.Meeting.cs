using System.Diagnostics;
using System.Text.Json;
using ProductionAssistant.Services;

namespace ProductionAssistant;

internal sealed partial class PrototypeBridge
{
    private bool _meetingBusy;
    private ProductionMeetingExportResult? _meetingOutput;
    private string _meetingResultId = string.Empty;

    private async Task<object?> HandleMeetingAsync(string operation, JsonElement payload)
    {
        if (_meetingBusy) throw new InvalidOperationException("生产会资料正在处理中，请等待完成。");
        _meetingBusy = true;
        try
        {
            if (operation == "meeting.pickFile")
            {
                return new { path = await DesktopFilePicker.PickExcelAsync(App.MainWindow.AppWindow.Id) };
            }
            if (operation == "meeting.export")
            {
                _meetingOutput = null;
                _meetingResultId = Guid.NewGuid().ToString("N");
                _meetingOutput = await AppServices.ProductionMeeting.ExportAsync(ReadString(payload, "path").Trim());
                return new { resultId = _meetingResultId, _meetingOutput.OutputPath, meetingDate = _meetingOutput.MeetingDate.ToString("yyyy-MM-dd"), _meetingOutput.SheetNames };
            }
            if (_meetingOutput is null || ReadString(payload, "resultId") != _meetingResultId || !File.Exists(_meetingOutput.OutputPath))
                throw new InvalidOperationException("输出文件已失效或不存在，请重新拆分。");
            Process.Start(new ProcessStartInfo("explorer.exe", $"/select,\"{_meetingOutput.OutputPath}\"") { UseShellExecute = true });
            return new { opened = true };
        }
        finally { _meetingBusy = false; }
    }
}
