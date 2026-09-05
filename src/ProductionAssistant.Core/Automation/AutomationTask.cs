using System.Text.Json;

namespace ProductionAssistant.Automation;

public sealed record AutomationTask(
    string Id,
    string TaskType,
    string Name,
    bool IsEnabled,
    string Schedule,
    string Status,
    JsonElement Config);

public sealed record AutomationTaskSummary(
    string TaskType,
    string TaskTypeName,
    string Id,
    string Name,
    string Schedule,
    bool IsEnabled,
    bool SchedulingAvailable,
    string Status,
    string SchedulerMessage,
    string ConnectionStatus,
    string LastRun,
    string? MissingStep = null,
    string? MissingMessage = null);

public sealed record AutomationTaskToggleResult(
    bool Enabled,
    bool RanImmediately = false,
    string? MissingStep = null,
    string? Message = null);
