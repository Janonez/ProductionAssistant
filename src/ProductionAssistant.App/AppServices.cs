using ProductionAssistant.Services;

namespace ProductionAssistant;

internal static class AppServices
{
    internal static INotionImportService Notion { get; } = BusinessImportFactory.Create();
    internal static IDatabaseQueryProvider DatabaseProvider { get; } = DatabaseProviderFactory.Create();
    internal static TencentSheetNotionService TencentNotion { get; } = new(DatabaseProvider);
    internal static DatabaseQueryService DatabaseQueries { get; } = new(DatabaseProvider);
    internal static DailyReportService DailyReports { get; } = new(database: DatabaseProvider);
    internal static DailyReportTaskHandler DailyReportTasks { get; } = new();
    internal static NotionFillTaskHandler NotionFillTasks { get; } = new();
    internal static TencentSheetTaskHandler TencentSheetTasks { get; } = new(TencentNotion);
    internal static AutomationTaskHandlerRegistry AutomationTaskHandlers { get; } = new([DailyReportTasks, NotionFillTasks, TencentSheetTasks]);
    internal static AutomationTaskRunner AutomationTasks { get; } = new(AutomationTaskHandlers);
    internal static PlanPdfService PlanPdf { get; } = new();
    internal static ProductionMeetingExportService ProductionMeeting { get; } = new();
    internal static ReportCenterService ReportCenter { get; } = new();
}
