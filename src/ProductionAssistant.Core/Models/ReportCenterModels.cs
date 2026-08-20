namespace ProductionAssistant.Models;

public sealed record ReportDeviceDefinition(string Name, string Code);

public sealed record ReportDeviceRecord(string DeviceName, double ActualMachineHours);

public sealed record MachineDailyReport(DateOnly ReportDate, IReadOnlyList<ReportDeviceRecord> Devices);

public sealed record ReportPeriod(DateOnly StartDate, DateOnly EndDate)
{
    public IReadOnlyList<DateOnly> Dates => Enumerable.Range(0, EndDate.DayNumber - StartDate.DayNumber + 1)
        .Select(StartDate.AddDays)
        .ToArray();
}

public sealed record MachineHoursMatrix(
    ReportPeriod Period,
    IReadOnlyList<ReportDeviceDefinition> Devices,
    IReadOnlyDictionary<string, IReadOnlyDictionary<DateOnly, double>> Values);

public sealed record ReportRunProgress(string Stage, int Current, int Total, string Message);

public sealed record ReportRunSummary(
    string RunId,
    DateTimeOffset StartedAt,
    DateTimeOffset FinishedAt,
    ReportPeriod Period,
    int PlannedReports,
    int ExportedReports,
    int ParsedReports,
    int DeviceCount,
    int ActualDataPoints,
    int ExpectedDataPoints,
    string SummaryPath,
    IReadOnlyList<string> Warnings);
