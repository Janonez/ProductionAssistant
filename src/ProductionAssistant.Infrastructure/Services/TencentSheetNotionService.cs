using System.Collections.Concurrent;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace ProductionAssistant.Services;

public sealed record TencentNotionBinding(string SourceId, string ValueFieldId, string QueryMode,
    string DateFieldId = "", string DatasetId = "", string Period = "day");
public sealed record TencentDataRow(string Id, string Name, double Value, string Unit, string Source, string Period, int RecordCount);
public sealed record TencentDataResult(string DataToken, string Date, JsonObject Values, IReadOnlyList<TencentDataRow> Rows);

public sealed class TencentSheetNotionService(IDatabaseQueryProvider provider)
{
    private sealed record Snapshot(string Token, string Config, DateOnly Date, DateTimeOffset Expires, JsonObject Values);
    private readonly ConcurrentDictionary<string, Snapshot> _snapshots = new();
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    public static TencentNotionBinding ReadBinding(JsonNode? node)
    {
        var binding = node?.Deserialize<TencentNotionBinding>(JsonOptions)
            ?? throw new InvalidOperationException("请绑定 Notion 数据库和数值字段。");
        if (string.IsNullOrWhiteSpace(binding.SourceId) || string.IsNullOrWhiteSpace(binding.ValueFieldId) ||
            binding.QueryMode is not ("date" or "view") ||
            (binding.QueryMode == "view" && string.IsNullOrWhiteSpace(binding.DatasetId)) ||
            (binding.QueryMode == "date" && (string.IsNullOrWhiteSpace(binding.DateFieldId) || binding.Period is not ("day" or "month" or "year"))))
            throw new InvalidOperationException("请完整选择数据库、取数方式、数值字段及日期范围或 View。");
        return binding;
    }

    public async Task<TencentDataResult> FetchAsync(string jobId, JsonObject config, DateOnly date,
        CancellationToken cancellationToken = default)
    {
        _snapshots.TryRemove(jobId, out _);
        var fields = config["fields"]?.AsArray() ?? throw new InvalidOperationException("请先新增业务字段。");
        if (fields.Count == 0) throw new InvalidOperationException("请先新增业务字段。");
        var values = new JsonObject();
        var rows = new List<TencentDataRow>();
        var schemas = new Dictionary<string, DatabaseSchemaResult>();
        var queries = new Dictionary<(string Source, string Mode, string Field, DateOnly Start, DateOnly End), DatabaseRecordSet>();
        foreach (var field in fields.OfType<JsonObject>())
        {
            var id = (string)field["id"]!;
            var name = (string)field["name"]!;
            var unit = (string?)field["unit"] ?? "";
            if (config["rules"]?[id] is null)
                throw new InvalidOperationException($"{name}：请先示范填报位置。");
            var binding = ReadBinding(field["notion"]);
            var source = provider.GetSources().FirstOrDefault(source => source.Id == binding.SourceId)
                ?? throw new InvalidOperationException($"{name}：绑定的数据库已不存在，请重新选择。");
            if (!schemas.TryGetValue(source.Id, out var schema))
            {
                schema = await provider.GetSchemaAsync(source.Id, cancellationToken);
                if (!schema.Succeeded) throw new InvalidOperationException(schema.Message);
                schemas[source.Id] = schema;
            }
            if (!schema.Fields.Any(value => value.Id == binding.ValueFieldId && value.Type is "number" or "formula" or "rollup"))
                throw new InvalidOperationException($"{name}：绑定的数值字段已不存在或类型不支持。");
            if (binding.QueryMode == "date" && !schema.Fields.Any(value => value.Id == binding.DateFieldId && value.Type == "date"))
                throw new InvalidOperationException($"{name}：绑定的日期字段已不存在。");
            var range = binding.QueryMode == "date" ? DatabaseDateRanges.Resolve(binding.Period, date)
                : (Succeeded: true, Message: "", Start: DateOnly.MinValue, End: DateOnly.MaxValue);
            if (!range.Succeeded) throw new InvalidOperationException(range.Message);
            var key = (source.Id, binding.QueryMode, binding.QueryMode == "date" ? binding.DateFieldId : binding.DatasetId, range.Start, range.End);
            if (!queries.TryGetValue(key, out var records))
            {
                records = binding.QueryMode == "date"
                    ? await provider.QueryDateRangeAsync(source.Id, binding.DateFieldId, range.Start, range.End, cancellationToken)
                    : await provider.QueryDatasetAsync(source.Id, binding.DatasetId, cancellationToken);
                if (!records.Succeeded) throw new InvalidOperationException($"{name}：{records.Message}");
                queries[key] = records;
            }
            if (records.Records.Count == 0) throw new InvalidOperationException($"{name}：没有匹配记录，不会自动填 0。请检查日期或 View。");
            double total = 0;
            foreach (var record in records.Records)
            {
                var numericField = record.Fields.FirstOrDefault(value => value.Id == binding.ValueFieldId);
                var value = numericField?.Value;
                if (value is not (double or float or decimal or int or long or short or byte or uint or ulong or ushort or sbyte))
                    throw new InvalidOperationException($"{name}：有记录的数值为空或不是数字，不会跳过或按 0 处理。" +
                        $"业务日期 {date:yyyy-MM-dd}；数据库 {source.Name}；记录 {record.Id}；字段 {binding.ValueFieldId}；" +
                        $"字段类型 {numericField?.Type ?? "缺失"}；返回值类型 {value?.GetType().Name ?? "空值"}。");
                total += Convert.ToDouble(value, CultureInfo.InvariantCulture);
                if (!double.IsFinite(total)) throw new InvalidOperationException($"{name}：汇总结果不是有效数字。");
            }
            values[id] = total;
            rows.Add(new(id, name, total, unit, source.Name,
                binding.QueryMode == "view" ? $"View：{records.DatasetName}（保留其筛选）" : $"{range.Start:yyyy-MM-dd} 至 {range.End:yyyy-MM-dd}", records.Records.Count));
        }
        var token = Guid.NewGuid().ToString("N");
        _snapshots[jobId] = new(token, config.ToJsonString(), date, DateTimeOffset.UtcNow.AddMinutes(5), values.DeepClone().AsObject());
        foreach (var old in _snapshots.Where(item => item.Value.Expires < DateTimeOffset.UtcNow)) _snapshots.TryRemove(old.Key, out _);
        return new(token, date.ToString("yyyy-MM-dd"), values, rows);
    }

    public JsonObject RequireValues(string jobId, JsonObject config, DateOnly date, string token)
    {
        if (!_snapshots.TryGetValue(jobId, out var snapshot) || snapshot.Token != token || snapshot.Date != date ||
            snapshot.Config != config.ToJsonString() || snapshot.Expires < DateTimeOffset.UtcNow)
            throw new InvalidOperationException("取数结果已失效，请重新获取 Notion 数据后检查填报。");
        return snapshot.Values.DeepClone().AsObject();
    }
}
