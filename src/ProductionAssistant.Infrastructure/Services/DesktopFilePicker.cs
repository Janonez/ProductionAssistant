using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Text;

namespace ProductionAssistant.Services;

public static class DesktopFilePicker
{
    private const int Cancelled = unchecked((int)0x800704C7);
    private static readonly Guid FileOpenDialogId = new("DC1C5A9C-E88A-4DDE-A5A1-60F82A20AEF7");
    private static string? _lastFolder;
    private static string? _lastExcelFolder;

    public static Task<string?> PickFolderAsync(nint owner, string? currentPath = null, Action<string>? trace = null) =>
        RunStaAsync(() => Pick(owner, currentPath, folder: true, trace));

    public static Task<string?> PickExcelAsync(nint owner, string? currentPath = null, Action<string>? trace = null) =>
        RunStaAsync(() => Pick(owner, currentPath, folder: false, trace));

    internal static Task<T> RunStaAsync<T>(Func<T> work)
    {
        var completion = new TaskCompletionSource<T>(TaskCreationOptions.RunContinuationsAsynchronously);
        var thread = new Thread(() =>
        {
            try { completion.SetResult(work()); }
            catch (Exception error) { completion.SetException(error); }
        }) { IsBackground = true, Name = "ProductionAssistant file picker" };
        thread.SetApartmentState(ApartmentState.STA);
        thread.Start();
        return completion.Task;
    }

    private static string? Pick(nint owner, string? currentPath, bool folder, Action<string>? trace)
    {
        var started = Stopwatch.GetTimestamp();
        var prefix = folder ? "picker-folder" : "picker-file";
        void Mark(string stage)
        {
            try { trace?.Invoke($"{prefix}-{stage}-duration={Stopwatch.GetElapsedTime(started).TotalMilliseconds:F0}ms"); }
            catch { /* Diagnostics must not interfere with selection or cancellation. */ }
        }

        IFileDialog? dialog = null;
        IShellItem? result = null;
        try
        {
            Mark("native-create-start-STA");
            var startFolder = ResolveInitialFolder(currentPath, folder, folder ? _lastFolder : _lastExcelFolder);
            dialog = CreateConfiguredDialog(folder, startFolder);
            Mark("configured");

            using var visibility = new CancellationTokenSource();
            var visible = WatchDialogVisibilityAsync(owner, Mark, visibility.Token);
            int status;
            try
            {
                Mark("show-start");
                status = dialog.Show(owner);
            }
            finally
            {
                visibility.Cancel();
                visible.GetAwaiter().GetResult();
            }
            var selected = ReadSelection(status, () =>
            {
                dialog.GetResult(out result);
                result.GetDisplayName(0x80058000, out var path); // SIGDN_FILESYSPATH
                try { return Marshal.PtrToStringUni(path)!; }
                finally { Marshal.FreeCoTaskMem(path); }
            });
            if (selected is not null)
            {
                if (folder) _lastFolder = selected;
                else _lastExcelFolder = Path.GetDirectoryName(selected);
            }
            Mark(selected is null ? "cancelled" : "selected");
            return selected;
        }
        finally
        {
            Release(result);
            Release(dialog);
        }
    }

    private static IFileDialog CreateConfiguredDialog(bool folder, string startFolder)
    {
        var dialog = (IFileDialog)Activator.CreateInstance(Type.GetTypeFromCLSID(FileOpenDialogId, true)!)!;
        IShellItem? initialFolder = null;
        try
        {
            dialog.GetOptions(out var options);
            // Select filesystem paths without changing the application's working directory.
            dialog.SetOptions(options | 0x40u | 0x800u | 0x8u | (folder ? 0x20u : 0x1000u));
            dialog.SetTitle(folder ? "选择挂网计划目录" : "选择生产会资料 Excel");
            if (!folder) dialog.SetFileTypes(1, [new FilterSpec("Excel 工作簿", "*.xlsx;*.xlsm;*.xls")]);
            var shellItemId = typeof(IShellItem).GUID;
            SHCreateItemFromParsingName(startFolder, 0, ref shellItemId, out initialFolder);
            dialog.SetFolder(initialFolder);
            return dialog;
        }
        catch { Release(dialog); throw; }
        finally { Release(initialFolder); }
    }

    internal static string? ReadSelection(int status, Func<string> readPath)
    {
        if (status == Cancelled) return null;
        Marshal.ThrowExceptionForHR(status);
        return readPath();
    }

    internal static string ResolveInitialFolder(string? currentPath, bool folder, string? lastFolder = null)
    {
        foreach (var candidate in new[] { currentPath, lastFolder })
        {
            if (string.IsNullOrWhiteSpace(candidate)) continue;
            var path = candidate.Trim().Trim('"');
            // Do not contact a UNC share or mapped network drive while opening a local picker.
            if (!Path.IsPathFullyQualified(path) || path.StartsWith("\\\\", StringComparison.Ordinal)) continue;
            var root = Path.GetPathRoot(path)!;
            if (new DriveInfo(root).DriveType is not (DriveType.Fixed or DriveType.Removable)) continue;
            if (!folder && candidate == currentPath && !Directory.Exists(path)) path = Path.GetDirectoryName(path)!;
            if (Directory.Exists(path)) return path;
        }
        // The real user-profile directory avoids Home/Quick Access and redirected libraries.
        return Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
    }

    private static async Task WatchDialogVisibilityAsync(nint owner, Action<string> mark, CancellationToken cancellationToken)
    {
        try
        {
            while (true)
            {
                await Task.Delay(100, cancellationToken).ConfigureAwait(false);
                var found = false;
                EnumWindows((window, _) =>
                {
                    if (!IsWindowVisible(window) || GetWindow(window, 4) != owner) return true; // GW_OWNER
                    GetWindowThreadProcessId(window, out var process);
                    if (process != Environment.ProcessId) return true;
                    var className = new StringBuilder(32);
                    GetClassName(window, className, className.Capacity);
                    found = className.ToString() == "#32770";
                    return !found;
                }, 0);
                if (!found) continue;
                mark("dialog-visible");
                return;
            }
        }
        catch (OperationCanceledException) when (cancellationToken.IsCancellationRequested) { }
        catch (Exception error) { mark($"visibility-probe-failed-{error.GetType().Name}"); }
    }

    private static void Release(object? value)
    {
        if (value is not null && Marshal.IsComObject(value)) Marshal.FinalReleaseComObject(value);
    }

    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
    private readonly struct FilterSpec(string name, string pattern)
    {
        [MarshalAs(UnmanagedType.LPWStr)] public readonly string Name = name;
        [MarshalAs(UnmanagedType.LPWStr)] public readonly string Pattern = pattern;
    }

    // Preserve the native IModalWindow/IFileDialog vtable order, including unused methods.
    [ComImport, Guid("42F85136-DB7E-439C-85F1-E4075D135FC8"), InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
    private interface IFileDialog
    {
        [PreserveSig] int Show(nint owner);
        void SetFileTypes(uint count, [In, MarshalAs(UnmanagedType.LPArray, SizeParamIndex = 0)] FilterSpec[] filters);
        void SetFileTypeIndex(uint index);
        void GetFileTypeIndex(out uint index);
        void Advise(nint events, out uint cookie);
        void Unadvise(uint cookie);
        void SetOptions(uint options);
        void GetOptions(out uint options);
        void SetDefaultFolder(IShellItem folder);
        void SetFolder(IShellItem folder);
        void GetFolder(out IShellItem folder);
        void GetCurrentSelection(out IShellItem item);
        void SetFileName([MarshalAs(UnmanagedType.LPWStr)] string name);
        void GetFileName(out nint name);
        void SetTitle([MarshalAs(UnmanagedType.LPWStr)] string title);
        void SetOkButtonLabel([MarshalAs(UnmanagedType.LPWStr)] string text);
        void SetFileNameLabel([MarshalAs(UnmanagedType.LPWStr)] string text);
        void GetResult(out IShellItem item);
        void AddPlace(IShellItem item, int location);
        void SetDefaultExtension([MarshalAs(UnmanagedType.LPWStr)] string extension);
        void Close(int status);
        void SetClientGuid(ref Guid id);
        void ClearClientData();
        void SetFilter(nint filter);
    }

    [ComImport, Guid("43826D1E-E718-42EE-BC55-A1E261C37BFE"), InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
    private interface IShellItem
    {
        void BindToHandler(nint context, ref Guid handler, ref Guid interfaceId, out nint result);
        void GetParent(out IShellItem parent);
        void GetDisplayName(uint type, out nint name);
        void GetAttributes(uint mask, out uint attributes);
        void Compare(IShellItem item, uint hint, out int order);
    }

    [DllImport("shell32.dll", CharSet = CharSet.Unicode, PreserveSig = false)]
    private static extern void SHCreateItemFromParsingName(string path, nint context, ref Guid interfaceId, out IShellItem item);
    private delegate bool EnumWindow(nint window, nint parameter);
    [DllImport("user32.dll")]
    private static extern bool EnumWindows(EnumWindow callback, nint parameter);
    [DllImport("user32.dll")]
    private static extern bool IsWindowVisible(nint window);
    [DllImport("user32.dll")]
    private static extern nint GetWindow(nint window, uint command);
    [DllImport("user32.dll")]
    private static extern uint GetWindowThreadProcessId(nint window, out uint process);
    [DllImport("user32.dll", CharSet = CharSet.Unicode)]
    private static extern int GetClassName(nint window, StringBuilder className, int maxCount);
}
