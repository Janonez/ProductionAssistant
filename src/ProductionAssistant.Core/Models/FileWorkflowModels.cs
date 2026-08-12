namespace ProductionAssistant.Models;

[Flags]
public enum FileWorkflowCapabilities
{
    None = 0,
    Inspect = 1,
    Repair = 2,
    Progress = 4,
    OpenOutput = 8
}

public enum WorkflowOperationState
{
    WaitingForInput,
    InputSelected,
    Inspecting,
    Ready,
    Repairing,
    Executing,
    Succeeded,
    Failed
}
