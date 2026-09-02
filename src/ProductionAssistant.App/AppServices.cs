using ProductionAssistant.Services;

namespace ProductionAssistant;

internal static class AppServices
{
    internal static INotionImportService Notion { get; } = new NotionImportService();
    internal static IDatabaseQueryProvider DatabaseProvider { get; } = new NotionDatabaseQueryProvider(notion: Notion);
    internal static DatabaseQueryService DatabaseQueries { get; } = new(DatabaseProvider);
    internal static DailyReportService DailyReports { get; } = new(database: DatabaseProvider);
    internal static PlanPdfService PlanPdf { get; } = new();
    internal static ProductionMeetingExportService ProductionMeeting { get; } = new();
    internal static ReportCenterService ReportCenter { get; } = new();
}
