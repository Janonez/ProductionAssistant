using COMException = System.Runtime.InteropServices.COMException;
using ProductionAssistant.Models;
using ProductionAssistant.Services;
using Xunit;

namespace ProductionAssistant.Tests;

public sealed class BridgeErrorTests
{
    [Fact]
    public void Missing_formal_folder_is_created_and_existing_files_are_preserved()
    {
        var root = Path.Combine(Path.GetTempPath(), "ProductionAssistant.Tests", Guid.NewGuid().ToString("N"), "2026年", "10月挂网计划");
        Directory.CreateDirectory(root);
        File.WriteAllText(Path.Combine(root, "一二三级计划.xlsx"), "not an Excel file");
        try
        {
            Assert.False(Directory.Exists(Path.Combine(root, "正式版")));
            var workspace = PlanPdfService.FindWorkspace(root);
            Assert.Equal(2026, workspace.Year);
            Assert.Equal(10, workspace.Month);
            Assert.True(Directory.Exists(workspace.FormalFolderPath));
            var existingPdf = Path.Combine(workspace.FormalFolderPath, "已有计划.pdf");
            File.WriteAllText(existingPdf, "existing formal PDF");
            Assert.Equal(workspace, PlanPdfService.FindWorkspace(root));
            Assert.Equal("existing formal PDF", File.ReadAllText(existingPdf));
        }
        finally { Directory.Delete(Path.GetDirectoryName(Path.GetDirectoryName(root))!, true); }
    }

    [Theory]
    [InlineData("2026年0月挂网计划")]
    [InlineData("2026年13月挂网计划")]
    public void Invalid_plan_month_has_an_actionable_error(string folder)
    {
        var root = Path.Combine(Path.GetTempPath(), "ProductionAssistant.Tests", Guid.NewGuid().ToString("N"), folder);
        Directory.CreateDirectory(root);
        File.WriteAllText(Path.Combine(root, "一二三级计划.xlsx"), "");
        try
        {
            var error = Assert.Throws<InvalidOperationException>(() => PlanPdfService.FindWorkspace(root));
            Assert.Contains("月份必须为 1 至 12", error.Message);
            Assert.False(Directory.Exists(Path.Combine(root, "正式版")));
        }
        finally { Directory.Delete(Path.GetDirectoryName(root)!, true); }
    }

    [Fact]
    public void Errors_preserve_known_causes_and_identify_unknown_failures_without_their_payload()
    {
        Assert.Equal("文件被占用", PrototypeBridgeProtocol.SafeError(new IOException("文件被占用")));
        Assert.Equal("没有读取权限", PrototypeBridgeProtocol.SafeError(new UnauthorizedAccessException("没有读取权限")));
        Assert.Contains("参数无效", PrototypeBridgeProtocol.SafeError(new ArgumentException("参数无效")));
        var comError = PrototypeBridgeProtocol.SafeError(new COMException("无法读取 PageSetup", unchecked((int)0x800A03EC)));
        Assert.Contains("无法读取 PageSetup", comError);
        Assert.Contains("0x800A03EC", comError);
        var unknown = PrototypeBridgeProtocol.SafeError(new NullReferenceException("secret request body"));
        Assert.Contains("NullReferenceException", unknown);
        Assert.Contains("0x", unknown);
        Assert.DoesNotContain("secret", unknown);
    }

    [Fact]
    public void Diagnostics_link_the_UI_error_to_the_operation_and_inner_stack()
    {
        var oldRoot = Environment.GetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR");
        var root = Path.Combine(Path.GetTempPath(), "ProductionAssistant.Tests", Guid.NewGuid().ToString("N"));
        Environment.SetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR", root);
        try
        {
            Exception inner;
            try { throw new NullReferenceException("secret request body"); }
            catch (Exception ex) { inner = ex; }
            var message = BridgeErrorLog.Record("plan.audit", new IOException("检查工作表失败", inner));
            var path = Path.Combine(RuntimeEnvironment.LogDirectory, "bridge-errors.log");
            var log = File.ReadAllText(path);
            Assert.Contains("检查工作表失败", message);
            Assert.Contains(path, message);
            var id = message.Split("诊断编号：")[1].Split('；')[0];
            Assert.Contains($"diagnostic={id} operation=plan.audit", log);
            Assert.Contains("NullReferenceException", log);
            Assert.Contains(nameof(Diagnostics_link_the_UI_error_to_the_operation_and_inner_stack), log);
            Assert.DoesNotContain("secret", log);
        }
        finally
        {
            Environment.SetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR", oldRoot);
            if (Directory.Exists(root)) Directory.Delete(root, true);
        }
    }

    [Fact]
    public void Logging_failure_keeps_the_original_error_visible()
    {
        var oldRoot = Environment.GetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR");
        var root = Path.Combine(Path.GetTempPath(), $"bridge-log-{Guid.NewGuid():N}");
        File.WriteAllText(root, "blocks log directory creation");
        Environment.SetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR", root);
        try
        {
            var message = BridgeErrorLog.Record("plan.audit", new IOException("文件被占用"));
            Assert.Contains("文件被占用", message);
            Assert.Contains("诊断日志写入失败", message);
        }
        finally
        {
            Environment.SetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR", oldRoot);
            File.Delete(root);
        }
    }
}
