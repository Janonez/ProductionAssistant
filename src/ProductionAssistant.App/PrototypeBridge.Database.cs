using System.Globalization;
using System.Text.Json;
using ProductionAssistant.Services;

namespace ProductionAssistant;

internal sealed partial class PrototypeBridge
{
    private static object GetDatabaseState()
    {
        var catalog = DatabaseSourceCatalog.Create(AppServices.DatabaseProvider.GetSources());
        return new
        {
            provider = AppServices.DatabaseProvider.Name,
            usesBusinessSections = catalog.UsesBusinessSections,
            businessSections = catalog.BusinessSections,
            sources = catalog.Sources.Select(source => new { source.Id, source.Name, source.Path, businessSection = source.BusinessSection })
        };
    }

    private static async Task<object> GetDatabaseSchemaAsync(
        JsonElement payload,
        CancellationToken cancellationToken)
    {
        var sourceId = ReadString(payload, "sourceId");
        if (string.IsNullOrWhiteSpace(sourceId)) throw new InvalidOperationException("请选择数据库。");
        var schemaTask = AppServices.DatabaseProvider.GetSchemaAsync(sourceId, cancellationToken);
        var datasetsTask = AppServices.DatabaseProvider.GetDatasetsAsync(sourceId, cancellationToken);
        await Task.WhenAll(schemaTask, datasetsTask);
        var schema = await schemaTask;
        if (!schema.Succeeded) throw new InvalidOperationException(schema.Message);
        return new { fields = schema.Fields, datasets = await datasetsTask };
    }

    private static async Task<object> InspectDatabaseAsync(
        JsonElement payload,
        CancellationToken cancellationToken)
    {
        if (!DateOnly.TryParse(ReadString(payload, "businessDate"), out var businessDate))
            throw new InvalidOperationException("请选择业务日期。");
        var start = DateOnly.TryParse(ReadString(payload, "startDate"), out var startDate)
            ? startDate
            : (DateOnly?)null;
        var end = DateOnly.TryParse(ReadString(payload, "endDate"), out var endDate)
            ? endDate
            : (DateOnly?)null;
        var result = await AppServices.DatabaseQueries.InspectAsync(new(
            ReadString(payload, "sourceId"),
            ReadString(payload, "datasetId"),
            ReadString(payload, "dateFieldId"),
            ReadString(payload, "valueFieldId"),
            ReadString(payload, "rangeKind"),
            businessDate,
            start,
            end), cancellationToken);
        if (!result.Succeeded) throw new InvalidOperationException(result.Message);
        return new
        {
            result.ProviderName,
            result.SourceName,
            result.DatasetName,
            startDate = result.StartDate == DateOnly.MinValue ? "全部" : result.StartDate.ToString("yyyy-MM-dd"),
            endDate = result.EndDate == DateOnly.MaxValue ? "全部" : result.EndDate.ToString("yyyy-MM-dd"),
            result.RecordCount,
            result.Total,
            truncated = result.Records.Count > 200,
            records = result.Records.Take(200).Select(record => new
            {
                record.Id,
                values = record.Fields.ToDictionary(field => field.Id, field => FormatDatabaseValue(field.Value))
            })
        };
    }

    private static object? FormatDatabaseValue(object? value) => value switch
    {
        DateTime date => date.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture),
        _ => value
    };
}
