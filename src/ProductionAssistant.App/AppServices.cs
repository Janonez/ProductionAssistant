using ProductionAssistant.Services;

namespace ProductionAssistant;

internal static class AppServices
{
    internal static INotionImportService Notion { get; } = new NotionImportService();
    internal static DailyReportService DailyReports { get; } = new();
    internal static PlanPdfService PlanPdf { get; } = new();
    internal static ProductionMeetingExportService ProductionMeeting { get; } = new();
    internal static ReportCenterService ReportCenter { get; } = new();
}
