using Microsoft.UI;
using Microsoft.Windows.Storage.Pickers;

namespace ProductionAssistant.Services;

internal static class DesktopFilePicker
{
    // App SDK pickers are agile and support both apartment models. Keep their synchronous
    // initialization off the WebView2/UI thread; only pass WindowId values and path strings.
    internal static Task<string?> PickFolderAsync(WindowId owner) => Task.Run(async () =>
    {
        PrototypeWebViewRuntime.Mark("picker-folder-create-start");
        var picker = new FolderPicker(owner);
        PrototypeWebViewRuntime.Mark("picker-folder-show-start");
        var selection = picker.PickSingleFolderAsync();
        PrototypeWebViewRuntime.Mark("picker-folder-request-returned");
        var result = await selection;
        PrototypeWebViewRuntime.Mark(result is null ? "picker-folder-cancelled" : "picker-folder-selected");
        return result?.Path;
    });

    internal static Task<string?> PickExcelAsync(WindowId owner) => Task.Run(async () =>
    {
        PrototypeWebViewRuntime.Mark("picker-file-create-start");
        var picker = new FileOpenPicker(owner);
        foreach (var extension in new[] { ".xlsx", ".xlsm", ".xls" }) picker.FileTypeFilter.Add(extension);
        PrototypeWebViewRuntime.Mark("picker-file-show-start");
        var selection = picker.PickSingleFileAsync();
        PrototypeWebViewRuntime.Mark("picker-file-request-returned");
        var result = await selection;
        PrototypeWebViewRuntime.Mark(result is null ? "picker-file-cancelled" : "picker-file-selected");
        return result?.Path;
    });
}
