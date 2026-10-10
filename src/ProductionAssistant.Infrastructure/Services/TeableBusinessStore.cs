using System.Collections.Concurrent;
using System.Globalization;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace ProductionAssistant.Services;

/// <summary>
/// 原生 Teable 业务读写。沿用已有业务校验所使用的属性结构，不调用 Notion 网络或读取其凭据。
/// 所有新增先落盘 pending，响应不确定时禁止重发；同日期的新建在进程内串行，并再次核对目标。
/// </summary>
public sealed class TeableBusinessStore
{
    private static readonly SemaphoreSlim Writes = new(1);
    private readonly TeableQuerySettings _mapping;
    private readonly Func<TeableClient> _client;
    private readonly string _journalDirectory;
    private readonly ConcurrentDictionary<string, string> _recordSources = new();
    private readonly ConcurrentDictionary<string, JsonObject> _snapshots = new();

    public TeableBusinessStore(TeableQuerySettings mapping, Func<TeableClient>? client = null, string? journalDirectory = null)
    {
        _mapping = mapping;
        _client = client ?? (() => { var settings = TeableSettingsStore.Load(); return new(settings.ServerUrl, settings.Token); });
        _journalDirectory = journalDirectory ?? Path.Combine(RuntimeEnvironment.DataDirectory, "teable-write-journal");
    }

    public IReadOnlyList<NotionDataSourceOption> Sources => _mapping.Sources.Select(source =>
        new NotionDataSourceOption(source.Id, source.Name, source.Path)).ToArray();

    private TeableQuerySource Source(string id) => _mapping.Sources.SingleOrDefault(source => Normalize(source.Id) == Normalize(id))
        ?? throw new InvalidOperationException("目标生产数据库尚未映射到 Teable。");
    private static string Normalize(string id) => id.Replace("-", "", StringComparison.Ordinal);
    private static TeableQueryField Field(TeableQuerySource source, string key) => source.Fields.SingleOrDefault(field =>
        field.Name == key || Uri.UnescapeDataString(field.Id) == Uri.UnescapeDataString(key))
        ?? throw new InvalidOperationException($"未映射的业务字段：{key}。");

    private async Task<JsonArray> ValidateAsync(TeableClient client, TeableQuerySource source, CancellationToken cancellationToken)
    {
        var fields = await client.ReadFieldsAsync(source.TableId, cancellationToken);
        foreach (var field in source.Fields)
        {
            var actual = fields.SingleOrDefault(item => item?["id"]?.GetValue<string>() == field.TeableId);
            if (actual?["type"]?.GetValue<string>() != field.TeableType || actual?["name"]?.GetValue<string>() != field.Name)
                throw new InvalidOperationException("Teable 字段发生变化，请核对映射后再写入。");
            if (field.Type == "relation")
            {
                var foreignId = actual?["options"]?["foreignTableId"]?.GetValue<string>();
                var foreign = _mapping.Sources.SingleOrDefault(item => item.TableId == foreignId);
                if (foreign is null || (!string.IsNullOrEmpty(field.RelationSourceId) && Normalize(foreign.Id) != Normalize(field.RelationSourceId)))
                    throw new InvalidOperationException("Teable 关联目标发生变化，已停止读写。");
            }
        }
        return fields;
    }

    public async Task<NotionSchemaResult> GetSchemaAsync(string sourceId, CancellationToken cancellationToken = default)
    {
        var source = Source(sourceId);
        using var client = _client();
        var fields = await ValidateAsync(client, source, cancellationToken);
        return new(true, "", source.Fields.Select(field =>
        {
            var actual = fields.Single(item => item?["id"]?.GetValue<string>() == field.TeableId)!;
            var foreignId = actual["options"]?["foreignTableId"]?.GetValue<string>();
            var relationId = _mapping.Sources.SingleOrDefault(item => item.TableId == foreignId)?.Id ?? "";
            return new NotionPropertyOption(field.Name, field.Type, relationId, field.Id);
        }).ToArray());
    }

    public async Task<List<JsonElement>> QueryAsync(string sourceId, object? filter, CancellationToken cancellationToken = default)
    {
        var source = Source(sourceId);
        var rule = filter is null ? null : JsonSerializer.SerializeToNode(filter);
        if (rule is not null) ValidateFilter(source, rule);
        using var client = _client();
        var schema = await ValidateAsync(client, source, cancellationToken);
        var native = await ReadAllAsync(client, source, schema, cancellationToken);
        return native.Select(record => ToPage(source, record)).Where(page => rule is null || Matches(source, page, rule))
            .Select(page => JsonSerializer.SerializeToElement(page)).ToList();
    }

    private async Task<List<JsonObject>> ReadAllAsync(TeableClient client, TeableQuerySource source, JsonArray schema, CancellationToken cancellationToken)
    {
        var projection = source.Fields.Select(field => field.TeableId).Concat(source.Fields.Select(field => field.EndFieldId)
            .OfType<string>().Where(id => schema.Any(field => field?["id"]?.GetValue<string>() == id))).ToArray();
        var records = new List<JsonObject>();
        var ids = new HashSet<string>();
        // ponytail: 当前库不超过千条；到十万条停止，增长后改服务端过滤，不能返回截断统计。
        for (var skip = 0; ; skip += 1000)
        {
            var page = (await client.ReadQueryRecordsAsync(source.TableId, projection, skip, cancellationToken: cancellationToken))["records"]?.AsArray()
                ?? throw new InvalidOperationException("Teable 缺少记录数组。");
            foreach (var item in page)
            {
                var record = item?.AsObject() ?? throw new InvalidOperationException("Teable 返回无效记录。");
                var id = record["id"]?.GetValue<string>() ?? throw new InvalidOperationException("Teable 记录缺少 ID。");
                if (!ids.Add(id)) throw new InvalidOperationException("Teable 分页出现重复记录，已停止读写。");
                _recordSources[id] = source.Id;
                _snapshots[id] = record.DeepClone().AsObject();
                records.Add(record);
            }
            if (page.Count < 1000) return records;
            if (skip >= 99_000) throw new InvalidOperationException("Teable 查询达到十万条上限，已停止读写。");
        }
    }

    private static JsonObject ToPage(TeableQuerySource source, JsonObject record)
    {
        var cells = record["fields"]?.AsObject() ?? throw new InvalidOperationException("Teable 记录缺少字段。");
        var properties = new JsonObject();
        foreach (var field in source.Fields)
        {
            var value = cells[field.TeableId];
            JsonNode? propertyValue = field.Type switch
            {
                "title" or "rich_text" => value is null ? new JsonArray() : new JsonArray(new JsonObject
                    { ["plain_text"] = value.GetValue<string>(), ["text"] = new JsonObject { ["content"] = value.GetValue<string>() } }),
                "date" => value is null ? null : new JsonObject
                    { ["start"] = LocalDate(value), ["end"] = field.EndFieldId is not null && cells[field.EndFieldId] is { } end ? LocalDate(end) : null },
                "relation" => value is null ? new JsonArray() : new JsonArray(value.AsArray().Select(link => (JsonNode)new JsonObject
                    { ["id"] = link!["id"]!.GetValue<string>() }).ToArray()),
                "select" or "status" => value is null ? null : new JsonObject { ["name"] = value.GetValue<string>() },
                "formula" or "rollup" => Computed(value),
                _ => value?.DeepClone()
            };
            properties[field.Name] = new JsonObject { ["id"] = field.Id, ["type"] = field.Type, [field.Type] = propertyValue };
        }
        return new JsonObject { ["id"] = record["id"]!.DeepClone(), ["properties"] = properties };
    }

    private static JsonObject Computed(JsonNode? value)
    {
        var type = value is JsonValue scalar && scalar.TryGetValue<double>(out _) ? "number"
            : value is JsonValue boolean && boolean.TryGetValue<bool>(out _) ? "boolean" : "string";
        return new JsonObject { ["type"] = type, [type] = value?.DeepClone() };
    }
    private static string LocalDate(JsonNode value) => DateTimeOffset.Parse(value.GetValue<string>(), CultureInfo.InvariantCulture,
        DateTimeStyles.AssumeUniversal).ToOffset(TimeSpan.FromHours(8)).ToString("yyyy-MM-ddTHH:mm:ss.fffffffzzz", CultureInfo.InvariantCulture);

    private static void ValidateFilter(TeableQuerySource source, JsonNode rule)
    {
        foreach (var group in new[] { "and", "or" })
            if (rule[group] is JsonArray children)
            {
                if (rule.AsObject().Count != 1 || children.Count == 0) throw new InvalidOperationException("业务筛选组合无效。");
                foreach (var child in children) ValidateFilter(source, child ?? throw new InvalidOperationException("业务筛选为空。"));
                return;
            }
        var field = Field(source, rule["property"]?.GetValue<string>() ?? throw new InvalidOperationException("业务筛选缺少字段。"));
        var condition = rule.AsObject().Single(pair => pair.Key != "property");
        var operation = condition.Value!.AsObject().Single();
        if (condition.Key != field.Type || condition.Key is not ("title" or "rich_text" or "date" or "select" or "status" or "number") ||
            operation.Key is not ("is_empty" or "is_not_empty" or "equals" or "does_not_equal" or "contains" or "on_or_after" or "on_or_before" or "after" or "before" or "greater_than" or "less_than" or "greater_than_or_equal_to" or "less_than_or_equal_to"))
            throw new InvalidOperationException("该业务筛选尚不支持，已停止查询。");
    }

    private static bool Matches(TeableQuerySource source, JsonObject page, JsonNode rule)
    {
        if (rule["and"] is JsonArray and) return and.All(child => Matches(source, page, child!));
        if (rule["or"] is JsonArray or) return or.Any(child => Matches(source, page, child!));
        var field = Field(source, rule["property"]!.GetValue<string>());
        var condition = rule.AsObject().Single(pair => pair.Key != "property");
        var op = condition.Value!.AsObject().Single();
        var value = page["properties"]![field.Name]![condition.Key];
        if (op.Key == "is_empty") return value is null || value is JsonArray array && array.Count == 0;
        if (op.Key == "is_not_empty") return value is not null && !(value is JsonArray array && array.Count == 0);
        if (value is null) return false;
        var actual = condition.Key switch
        {
            "title" or "rich_text" => string.Concat(value.AsArray().Select(item => item!["plain_text"]!.GetValue<string>())),
            "date" => value["start"]!.GetValue<string>()[..10],
            "select" or "status" => value["name"]!.GetValue<string>(),
            "number" => value.ToJsonString(),
            _ => throw new InvalidOperationException("该业务筛选类型尚不支持，已停止查询。")
        };
        var expected = condition.Key == "number" ? op.Value!.ToJsonString() : op.Value!.GetValue<string>();
        var comparison = condition.Key == "number"
            ? double.Parse(actual, CultureInfo.InvariantCulture).CompareTo(double.Parse(expected, CultureInfo.InvariantCulture))
            : string.CompareOrdinal(actual, expected);
        return op.Key switch
        {
            "equals" => comparison == 0, "does_not_equal" => comparison != 0,
            "on_or_after" or "greater_than_or_equal_to" => comparison >= 0,
            "on_or_before" or "less_than_or_equal_to" => comparison <= 0,
            "after" or "greater_than" => comparison > 0, "before" or "less_than" => comparison < 0,
            "contains" => actual.Contains(expected, StringComparison.Ordinal),
            _ => throw new InvalidOperationException("该业务筛选规则尚不支持，已停止查询。")
        };
    }

    public async Task<string> CreateAsync(string sourceId, Dictionary<string, object> properties, CancellationToken cancellationToken = default)
    {
        await Writes.WaitAsync(cancellationToken);
        try
        {
            var source = Source(sourceId);
            using var client = _client();
            var schema = await ValidateAsync(client, source, cancellationToken);
            var fields = ToFields(source, properties, schema);
            var date = source.Fields.FirstOrDefault(field => field.Type == "date" && fields.ContainsKey(field.TeableId));
            if (date is null || fields[date.TeableId] is null) throw new InvalidOperationException("新增业务记录必须包含业务日期。");
            var day = LocalDate(fields[date.TeableId]!)[..10];
            var key = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(source.TableId + ":" + day)));
            var journal = Path.Combine(_journalDirectory, key + ".json");
            Directory.CreateDirectory(_journalDirectory);
            using var dateLock = new FileStream(journal + ".lock", FileMode.OpenOrCreate, FileAccess.ReadWrite, FileShare.None);
            if (File.Exists(journal) && JsonNode.Parse(await File.ReadAllTextAsync(journal, cancellationToken))?["pending"]?.GetValue<bool>() == true)
                throw new InvalidOperationException("该日期上次新增响应不确定，已阻止重复写入；请先核对 Teable 和写入日志。");
            var existing = await ReadAllAsync(client, source, schema, cancellationToken);
            if (existing.Any(record => record["fields"]?[date.TeableId] is { } current && LocalDate(current)[..10] == day))
                throw new InvalidOperationException("该业务日期已有记录，已停止新增；请重新检查后按字段确认更新。");
            var entry = new JsonObject { ["pending"] = true, ["sourceId"] = source.Id, ["tableId"] = source.TableId,
                ["date"] = day, ["fields"] = fields.DeepClone(), ["startedAt"] = DateTimeOffset.UtcNow.ToString("o") };
            WriteJournal(journal, entry);
            var response = await client.CreateRecordAsync(source.TableId, fields, cancellationToken);
            var id = response["records"]?[0]?["id"]?.GetValue<string>()
                ?? throw new InvalidOperationException("新增响应缺少 ID，请核对表内记录，不要重试。");
            await VerifyWriteAsync(client, source, id, fields, cancellationToken);
            _snapshots[id] = await client.ReadRecordFieldsAsync(source.TableId, id, schema.Select(field => field!["id"]!.GetValue<string>()), cancellationToken);
            entry["pending"] = false;
            entry["recordId"] = id;
            entry["completedAt"] = DateTimeOffset.UtcNow.ToString("o");
            WriteJournal(journal, entry);
            _recordSources[id] = source.Id;
            return id;
        }
        finally { Writes.Release(); }
    }

    public async Task UpdateAsync(string recordId, Dictionary<string, object> properties, CancellationToken cancellationToken = default, string? sourceId = null)
    {
        await Writes.WaitAsync(cancellationToken);
        try
        {
            if (sourceId is null && !_recordSources.TryGetValue(recordId, out sourceId))
                throw new InvalidOperationException("更新目标未经当前查询确认，请重新检查后写入。");
            var source = Source(sourceId!);
            using var client = _client();
            var schema = await ValidateAsync(client, source, cancellationToken);
            var fields = ToFields(source, properties, schema);
            if (!_snapshots.TryGetValue(recordId, out var snapshot))
                throw new InvalidOperationException("更新缺少检查快照，请重新检查后写入。");
            Directory.CreateDirectory(_journalDirectory);
            var lockKey = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(source.TableId + ":" + recordId)));
            using var recordLock = new FileStream(Path.Combine(_journalDirectory, lockKey + ".lock"), FileMode.OpenOrCreate, FileAccess.ReadWrite, FileShare.None);
            var current = await client.ReadRecordFieldsAsync(source.TableId, recordId, fields.Select(field => field.Key), cancellationToken);
            foreach (var field in fields)
                if (!JsonNode.DeepEquals(snapshot["fields"]?[field.Key], current["fields"]?[field.Key]))
                    throw new InvalidOperationException("检查后目标字段发生变化，请重新检查并确认冲突。");
            await client.UpdateRecordAsync(source.TableId, recordId, fields, cancellationToken);
            await VerifyWriteAsync(client, source, recordId, fields, cancellationToken);
            // 保留最新快照，避免同一次焊接层级操作的后续更新错误使用旧值。
            _snapshots[recordId] = await client.ReadRecordFieldsAsync(source.TableId, recordId, schema.Select(field => field!["id"]!.GetValue<string>()), cancellationToken);
        }
        finally { Writes.Release(); }
    }

    private static JsonObject ToFields(TeableQuerySource source, Dictionary<string, object> properties, JsonArray schema)
    {
        var result = new JsonObject();
        foreach (var property in properties)
        {
            var field = Field(source, property.Key);
            var payload = JsonSerializer.SerializeToNode(property.Value)!;
            var value = payload[field.Type];
            result[field.TeableId] = field.Type switch
            {
                "title" or "rich_text" => value is null ? null : JsonValue.Create(string.Concat(value.AsArray().Select(item =>
                    item?["text"]?["content"]?.GetValue<string>() ?? item?["plain_text"]?.GetValue<string>() ?? ""))),
                "number" or "checkbox" or "url" or "email" or "phone_number" => value?.DeepClone(),
                "select" or "status" => value?["name"]?.DeepClone(),
                "date" => value?["start"] is { } start ? JsonValue.Create(ApiDate(start.GetValue<string>())) : null,
                "relation" => value is null ? new JsonArray() : new JsonArray(value.AsArray().Select(item => (JsonNode)new JsonObject
                    { ["id"] = item!["id"]!.GetValue<string>() }).ToArray()),
                _ => throw new InvalidOperationException("公式、汇总或不支持的字段不可直接写入。")
            };
            if (field.Type == "date")
            {
                var end = value?["end"];
                var hasEndField = field.EndFieldId is not null && schema.Any(item => item?["id"]?.GetValue<string>() == field.EndFieldId);
                if (end is not null && !hasEndField) throw new InvalidOperationException("日期区间缺少结束字段，已停止写入。");
                if (hasEndField) result[field.EndFieldId!] = end is null ? null : JsonValue.Create(ApiDate(end.GetValue<string>()));
            }
        }
        return result;
    }

    private static string ApiDate(string value) => DateOnly.TryParseExact(value, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var date)
        ? new DateTimeOffset(date.ToDateTime(TimeOnly.MinValue), TimeSpan.FromHours(8)).ToString("o")
        : DateTimeOffset.Parse(value, CultureInfo.InvariantCulture).ToString("o");

    private static async Task VerifyWriteAsync(TeableClient client, TeableQuerySource source, string id, JsonObject expected, CancellationToken cancellationToken)
    {
        // 显式投影绑定字段，服务端默认视图隐藏列不得造成错误回读。
        var record = await client.ReadRecordFieldsAsync(source.TableId, id, expected.Select(field => field.Key), cancellationToken);
        var actual = record["fields"]?.AsObject() ?? throw new InvalidOperationException("回读缺少字段，请核对目标记录。");
        foreach (var cell in expected)
        {
            var field = source.Fields.FirstOrDefault(field => field.TeableId == cell.Key || field.EndFieldId == cell.Key);
            var same = field?.Type == "date" && cell.Value is not null && actual[cell.Key] is not null
                ? DateTimeOffset.Parse(cell.Value.GetValue<string>(), CultureInfo.InvariantCulture) == DateTimeOffset.Parse(actual[cell.Key]!.GetValue<string>(), CultureInfo.InvariantCulture)
                : field?.Type == "relation" && cell.Value is JsonArray links && actual[cell.Key] is JsonArray actualLinks
                    ? links.Select(link => link!["id"]!.GetValue<string>()).Order().SequenceEqual(actualLinks.Select(link => link!["id"]!.GetValue<string>()).Order())
                    : JsonNode.DeepEquals(cell.Value, actual[cell.Key]);
            if (!same) throw new InvalidOperationException("写入回读不一致，请核对目标记录后再操作。");
        }
    }

    private static void WriteJournal(string path, JsonObject value)
    {
        File.WriteAllText(path + ".tmp", value.ToJsonString());
        File.Move(path + ".tmp", path, true);
    }
}
