namespace ProductionAssistant.Models;

public sealed class PlanAuditIssue
{
    public string Severity { get; set; } = string.Empty;
    public string Sheet { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public bool CanAutoFix { get; set; }
    public string Display => $"{Severity} · {Sheet} · {Location} · {Message}";
}

public sealed record PlanWorkspace(
    string RootPath,
    string WorkbookPath,
    string FormalFolderPath,
    int Year,
    int Month);

public sealed record PlanAuditResult(
    PlanWorkspace Workspace,
    IReadOnlyList<string> VisibleSheets,
    IReadOnlyList<PlanAuditIssue> Issues,
    DateTime SourceLastWriteTimeUtc,
    long SourceLength);

public sealed record PlanExportProgress(int Current, int Total, string Name);

public sealed record PlanExportResult(string OutputFolder, IReadOnlyList<string> Files);

public sealed record PlanRepairResult(
    string WorkbookPath,
    string BackupPath,
    int ChangedCells,
    int ChangedRows);
