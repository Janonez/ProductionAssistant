using System.Diagnostics;
using System.Text.Json;
using ProductionAssistant.Models;
using ProductionAssistant.Services;
using Windows.Storage.Pickers;

namespace ProductionAssistant;

internal sealed partial class PrototypeBridge
{
    private PlanAuditResult? _planAudit;
    private string _planAuditId = string.Empty;
    private bool _planRepaired;
    private bool _planBusy;
    private PlanExportResult? _planOutput;

    private async Task<object?> HandlePlanAsync(string id, string operation, JsonElement payload)
    {
        if (_planBusy) throw new InvalidOperationException("挂网计划正在处理中，请等待完成。");
        _planBusy = true;
        try
        {
            if (operation == "plan.pickFolder")
            {
                var picker = new FolderPicker();
                picker.FileTypeFilter.Add("*");
                WinRT.Interop.InitializeWithWindow.Initialize(picker, WinRT.Interop.WindowNative.GetWindowHandle(App.MainWindow));
                return new { path = (await picker.PickSingleFolderAsync())?.Path };
            }
            if (operation == "plan.audit")
            {
                _planAudit = null;
                _planOutput = null;
                _planRepaired = false;
                _planAuditId = Guid.NewGuid().ToString("N");
                _planAudit = await AppServices.PlanPdf.AuditAsync(ReadString(payload, "path").Trim());
                return PlanAuditDto();
            }
            if (_planAudit is null || ReadString(payload, "auditId") != _planAuditId)
                throw new InvalidOperationException("检查结果已失效，请重新检查。");
            if (operation == "plan.openOutput")
            {
                if (_planOutput is null || !Directory.Exists(_planOutput.OutputFolder))
                    throw new InvalidOperationException("输出目录不存在，请重新导出。");
                Process.Start(new ProcessStartInfo("explorer.exe", _planOutput.OutputFolder) { UseShellExecute = true });
                return new { opened = true };
            }
            if (!PlanPdfService.IsSourceCurrent(_planAudit))
            {
                _planRepaired = false;
                throw new InvalidOperationException("源 Excel 已变化，请重新检查并修复后再导出。");
            }
            if (!payload.TryGetProperty("confirmed", out var confirmed) || confirmed.ValueKind != JsonValueKind.True)
                throw new InvalidOperationException("请先确认本次操作。");
            if (operation == "plan.repair")
            {
                _planRepaired = false;
                _planOutput = null;
                var repair = await AppServices.PlanPdf.RepairAsync(_planAudit.Workspace);
                _planAudit = await AppServices.PlanPdf.AuditAsync(_planAudit.Workspace.RootPath);
                _planRepaired = true;
                return new { audit = PlanAuditDto(), repair };
            }
            if (operation == "plan.export")
            {
                if (!_planRepaired || _planAudit.Issues.Any(issue => issue.Severity == "错误"))
                    throw new InvalidOperationException("请先完成修复，并处理剩余错误。");
                _planOutput = null;
                var progress = new Progress<PlanExportProgress>(value => Post(new { id, type = "progress", data = value }));
                _planOutput = await AppServices.PlanPdf.ExportCandidatesAsync(_planAudit.Workspace, progress);
                return _planOutput;
            }
            throw new InvalidOperationException("不支持的挂网计划操作。");
        }
        finally { _planBusy = false; }
    }

    private object PlanAuditDto() => new
    {
        auditId = _planAuditId,
        workspace = _planAudit!.Workspace,
        issues = _planAudit.Issues,
        sheetCount = _planAudit.VisibleSheets.Count,
        repaired = _planRepaired,
        canExport = _planRepaired && !_planAudit.Issues.Any(issue => issue.Severity == "错误")
    };
}
