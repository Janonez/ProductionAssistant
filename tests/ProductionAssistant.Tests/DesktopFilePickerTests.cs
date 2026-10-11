using System.Runtime.InteropServices;
using System.Reflection;
using ProductionAssistant.Services;
using Xunit;

namespace ProductionAssistant.Tests;

public sealed class DesktopFilePickerTests
{
    [Theory]
    [InlineData(true)]
    [InlineData(false)]
    public async Task Real_Windows_dialog_configuration_uses_the_requested_folder_without_showing_UI(bool folder)
    {
        var directory = Directory.CreateTempSubdirectory("ProductionAssistant.Picker.Tests-");
        try
        {
            var actual = await DesktopFilePicker.RunStaAsync(() =>
            {
                // Invoke the real configuration, never Show. This checks the native COM ABI,
                // including the file-type filter, rather than replacing Windows with a fake.
                var type = typeof(DesktopFilePicker);
                var dialogType = type.GetNestedType("IFileDialog", BindingFlags.NonPublic)!;
                var itemType = type.GetNestedType("IShellItem", BindingFlags.NonPublic)!;
                var create = type.GetMethod("CreateConfiguredDialog", BindingFlags.NonPublic | BindingFlags.Static)!;
                var dialog = create.Invoke(null, [folder, directory.FullName])!;
                object? item = null;
                try
                {
                    object?[] arguments = [null];
                    dialogType.GetMethod("GetFolder")!.Invoke(dialog, arguments);
                    item = arguments[0]!;
                    arguments = [0x80058000u, nint.Zero];
                    itemType.GetMethod("GetDisplayName")!.Invoke(item, arguments);
                    var path = (nint)arguments[1]!;
                    try { return Marshal.PtrToStringUni(path); }
                    finally { Marshal.FreeCoTaskMem(path); }
                }
                finally
                {
                    if (item is not null) Marshal.FinalReleaseComObject(item);
                    Marshal.FinalReleaseComObject(dialog);
                }
            });
            Assert.Equal(directory.FullName, actual);
        }
        finally { directory.Delete(true); }
    }

    [Fact]
    public async Task Dialog_work_runs_on_STA_and_returns_before_a_blocked_dialog_finishes()
    {
        using var release = new ManualResetEventSlim();
        var started = new TaskCompletionSource(TaskCreationOptions.RunContinuationsAsynchronously);
        try
        {
            var call = Task.Factory.StartNew(() => DesktopFilePicker.RunStaAsync(() =>
            {
                started.SetResult();
                release.Wait();
                return (Thread.CurrentThread.GetApartmentState(), Thread.CurrentThread.IsBackground);
            }));
            var selection = await call.WaitAsync(TimeSpan.FromSeconds(5));
            await started.Task.WaitAsync(TimeSpan.FromSeconds(5));
            Assert.False(selection.IsCompleted);
            release.Set();
            Assert.Equal((ApartmentState.STA, true), await selection.WaitAsync(TimeSpan.FromSeconds(5)));
        }
        finally { release.Set(); }
    }

    [Fact]
    public async Task Worker_failures_reach_the_awaiting_caller_with_the_original_error()
    {
        var original = new COMException("Native dialog failed", unchecked((int)0x800706BE));
        var error = await Assert.ThrowsAsync<COMException>(() => DesktopFilePicker.RunStaAsync<string>(() => throw original));
        Assert.Same(original, error);
    }

    [Fact]
    public void Cancellation_does_not_attempt_to_read_a_selection()
    {
        Assert.Null(DesktopFilePicker.ReadSelection(unchecked((int)0x800704C7),
            () => throw new InvalidOperationException("Cancelled dialogs have no selection.")));
    }

    [Theory]
    [InlineData(unchecked((int)0x800706BE))]
    [InlineData(unchecked((int)0x80004005))]
    public void Native_failure_is_not_silently_treated_as_user_cancellation(int status)
    {
        var error = Assert.Throws<COMException>(() => DesktopFilePicker.ReadSelection(status,
            () => throw new InvalidOperationException("Failed dialogs have no selection.")));
        Assert.Equal(status, error.HResult);
    }

    [Fact]
    public void Successful_selection_preserves_the_exact_unicode_path()
    {
        const string path = @"D:\计划\2026年\10月挂网计划";
        Assert.Equal(path, DesktopFilePicker.ReadSelection(0, () => path));
    }

    [Theory]
    [InlineData(true)]
    [InlineData(false)]
    public void Current_local_input_takes_priority_over_the_last_directory(bool folder)
    {
        var directory = Directory.CreateTempSubdirectory("ProductionAssistant.Picker.Tests-");
        try
        {
            var current = Directory.CreateDirectory(Path.Combine(directory.FullName, "当前月份"));
            var last = Directory.CreateDirectory(Path.Combine(directory.FullName, "上次月份"));
            var path = folder ? current.FullName : Path.Combine(current.FullName, "一二三级计划.xlsx");
            Assert.Equal(current.FullName, DesktopFilePicker.ResolveInitialFolder(path, folder, last.FullName));
        }
        finally { directory.Delete(true); }
    }

    [Theory]
    [InlineData(@"\\unreachable-server.invalid\share\plans")]
    [InlineData("relative-plan-folder")]
    [InlineData(" ")]
    public void Unavailable_or_nonlocal_input_uses_the_last_local_folder(string path)
    {
        var directory = Directory.CreateTempSubdirectory("ProductionAssistant.Picker.Tests-");
        try { Assert.Equal(directory.FullName, DesktopFilePicker.ResolveInitialFolder(path, true, directory.FullName)); }
        finally { directory.Delete(true); }
    }

    [Fact]
    public void First_open_without_a_current_directory_starts_at_the_real_user_profile()
    {
        Assert.Equal(Environment.GetFolderPath(Environment.SpecialFolder.UserProfile),
            DesktopFilePicker.ResolveInitialFolder(null, true));
    }
}
