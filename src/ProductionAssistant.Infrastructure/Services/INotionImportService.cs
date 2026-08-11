using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public interface INotionImportService
{
    Task<NotionDiscoveryResult> DiscoverAsync(
        string token,
        string rootPageId,
        CancellationToken cancellationToken = default);

    Task<NotionSchemaResult> GetSchemaAsync(
        string token,
        string dataSourceId,
        CancellationToken cancellationToken = default);

    Task<NotionImportResult> TestConnectionAsync(
        NotionSettings settings,
        CancellationToken cancellationToken = default);

    Task<NotionImportResult> ImportAsync(
        NotionImportRequest request,
        CancellationToken cancellationToken = default);

    Task<NotionImportPlanResult> PrepareImportAsync(
        NotionImportRequest request,
        CancellationToken cancellationToken = default);

    Task<NotionExistingDataResult> HasExistingDataAsync(
        NotionImportRequest request,
        CancellationToken cancellationToken = default);

    Task<NotionImportResult> ExecuteImportAsync(
        NotionImportPlanResult plan,
        bool overwriteExisting,
        IProgress<NotionImportProgress>? progress = null,
        CancellationToken cancellationToken = default);

    Task<NotionImportResult> ImportWeldHierarchyAsync(
        NotionImportRequest request,
        IProgress<NotionImportProgress>? progress = null,
        CancellationToken cancellationToken = default);

    Task<ProductionMessageImportResult> ImportProductionMessagesAsync(
        ProductionMessageImportRequest request,
        CancellationToken cancellationToken = default);
}

public sealed record NotionDailyWeldValue(DateTime Date, int Quantity);

public sealed record NotionImportRequest(IReadOnlyList<NotionDailyWeldValue> Values);

public sealed record NotionImportResult(bool Succeeded, string Message)
{
    public static NotionImportResult Success(string message = "数据已自动导入 Notion。") =>
        new(true, message);

    public static NotionImportResult Failure(string message) =>
        new(false, message);
}

public sealed record NotionDataSourceOption(
    string Id,
    string Name,
    string Path,
    string IconText = "",
    string IconUrl = "");
public sealed record NotionPropertyOption(
    string Name,
    string Type,
    string RelationDataSourceId = "",
    string Id = "");
public sealed record NotionDiscoveryResult(
    bool Succeeded,
    string Message,
    IReadOnlyList<NotionDataSourceOption> DataSources);
public sealed record NotionSchemaResult(
    bool Succeeded,
    string Message,
    IReadOnlyList<NotionPropertyOption> Properties);

public sealed record NotionImportPlanItem(
    DateTime Date,
    int NewQuantity,
    string? PageId,
    double? ExistingQuantity,
    string Status);

public sealed record NotionImportPlanResult(
    bool Succeeded,
    string Message,
    string QuantityProperty,
    IReadOnlyList<NotionImportPlanItem> Items);

public sealed record NotionImportProgress(
    int Current,
    int Total,
    DateTime Date,
    string Status);

public sealed record NotionExistingDataResult(
    bool Succeeded,
    bool HasExistingData,
    string Message);
