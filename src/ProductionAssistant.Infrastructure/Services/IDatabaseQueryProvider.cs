namespace ProductionAssistant.Services;

public interface IDatabaseQueryProvider
{
    string Name { get; }
    IReadOnlyList<DatabaseSourceInfo> GetSources();
    Task<DatabaseSchemaResult> GetSchemaAsync(string sourceId, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<DatabaseDatasetInfo>> GetDatasetsAsync(string sourceId, CancellationToken cancellationToken = default);
    Task<DatabaseRecordSet> QueryDatasetAsync(string sourceId, string datasetId, CancellationToken cancellationToken = default);
}

public sealed record DatabaseSourceInfo(string Id, string Name, string Path, string BusinessSection = "");
public sealed record DatabaseSourceCatalogInfo(
    bool UsesBusinessSections,
    IReadOnlyList<string> BusinessSections,
    IReadOnlyList<DatabaseSourceInfo> Sources);

public static class DatabaseSourceCatalog
{
    public static DatabaseSourceCatalogInfo Create(IEnumerable<DatabaseSourceInfo> values)
    {
        var all = values.ToArray();
        var grouped = all.Where(source => !string.IsNullOrWhiteSpace(source.BusinessSection)).ToArray();
        var usesBusinessSections = grouped.Length > 0;
        return new(
            usesBusinessSections,
            usesBusinessSections
                ? grouped.Select(source => source.BusinessSection)
                    .Distinct(StringComparer.CurrentCultureIgnoreCase)
                    .OrderBy(section => section, StringComparer.CurrentCultureIgnoreCase)
                    .ToArray()
                : [],
            usesBusinessSections ? grouped : all);
    }
}
public sealed record DatabaseDatasetInfo(string Id, string Name);
public sealed record DatabaseFieldInfo(string Id, string Name, string Type);
public sealed record DatabaseSchemaResult(bool Succeeded, string Message, IReadOnlyList<DatabaseFieldInfo> Fields);
public sealed record DatabaseFieldValue(string Id, string Name, string Type, object? Value);
public sealed record DatabaseRecord(string Id, IReadOnlyList<DatabaseFieldValue> Fields);
public sealed record DatabaseRecordSet(
    bool Succeeded,
    string Message,
    string SourceName,
    string DatasetName,
    IReadOnlyList<DatabaseRecord> Records);

public sealed record DatabaseInspectionRequest(
    string SourceId,
    string DatasetId,
    string DateFieldId,
    string ValueFieldId,
    string RangeKind,
    DateOnly BusinessDate,
    DateOnly? StartDate = null,
    DateOnly? EndDate = null);

public sealed record DatabaseInspectionResult(
    bool Succeeded,
    string Message,
    string ProviderName,
    string SourceName,
    string DatasetName,
    DateOnly StartDate,
    DateOnly EndDate,
    int RecordCount,
    double? Total,
    IReadOnlyList<DatabaseRecord> Records);
