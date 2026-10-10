using System.Diagnostics;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace ProductionAssistant.Services;

public sealed record TeableQueryField(string Id, string Name, string Type, string TeableId, string TeableType,
    string RelationSourceId = "", string? EndFieldId = null);
public sealed record TeableQueryView(string Id, string Name, string TeableId, string? TeableName = null);
public sealed record TeableQuerySource(string Id, string Name, string Path, string TableId, IReadOnlyList<TeableQueryField> Fields,
    IReadOnlyList<TeableQueryView>? Views = null);
// Enabled/WritesEnabled 保留以读取旧配置；v1.7 起不再决定运行时数据库提供方。
public sealed record TeableQuerySettings(bool Enabled, IReadOnlyList<TeableQuerySource> Sources, bool WritesEnabled = false);

/// <summary>保存迁移映射和兼容字段，不保存凭据。原 ID 保持稳定，使现有日期、数值绑定无需重配。</summary>
public static class TeableQuerySettingsStore
{
    public static string FilePath => Path.Combine(RuntimeEnvironment.DataDirectory, "teable-query-settings.json");
    public static TeableQuerySettings Load() => File.Exists(FilePath)
        ? JsonSerializer.Deserialize<TeableQuerySettings>(File.ReadAllText(FilePath))
            ?? throw new InvalidOperationException("Teable 业务查询配置无效。")
        : new(false, []);

    public static void Save(TeableQuerySettings settings)
    {
        if (settings.WritesEnabled && !settings.Enabled)
            throw new InvalidOperationException("Teable 业务写入必须同时启用 Teable 查询，不能混用两份数据库。");
        Directory.CreateDirectory(RuntimeEnvironment.DataDirectory);
        File.WriteAllText(FilePath + ".tmp", JsonSerializer.Serialize(settings, new JsonSerializerOptions { WriteIndented = true }));
        File.Move(FilePath + ".tmp", FilePath, true);
    }

    public static TeableQuerySettings Import(string schemaStatePath, string? viewsStatePath = null)
    {
        var root = JsonNode.Parse(File.ReadAllText(schemaStatePath)) ?? throw new InvalidOperationException("迁移映射为空。");
        var tables = root["plan"]?["tables"]?.AsArray() ?? throw new InvalidOperationException("迁移映射缺少表定义。");
        var sources = tables.Select(table => new TeableQuerySource(
            table!["notionId"]!.GetValue<string>(), table["name"]!.GetValue<string>(), table["path"]!.GetValue<string>(),
            table["teableId"]!.GetValue<string>(), table["fields"]!.AsArray().Select(field => new TeableQueryField(
                field!["notionId"]!.GetValue<string>(), field["field"]!["name"]!.GetValue<string>(),
                field["notionType"]!.GetValue<string>(), field["field"]!["id"]!.GetValue<string>(),
                field["field"]!["type"]!.GetValue<string>(),
                field["source"]?["relation"]?["data_source_id"]?.GetValue<string>() ?? "",
                field["endField"]?["id"]?.GetValue<string>())).ToArray())).ToArray();
        if (sources.Length == 0 || sources.Select(source => source.Id).Distinct().Count() != sources.Length ||
            sources.Any(source => source.Fields.Count == 0 || source.Fields.Select(field => field.Id).Distinct().Count() != source.Fields.Count))
            throw new InvalidOperationException("迁移映射为空或存在重复 ID。");
        if (viewsStatePath is not null)
        {
            var state = JsonNode.Parse(File.ReadAllText(viewsStatePath))!["views"]!.AsObject();
            sources = sources.Select(source => source with { Views = state.Where(view =>
                view.Value!["sourceId"]!.GetValue<string>() == source.Id).Select(view => new TeableQueryView(
                    view.Key, view.Value!["name"]!.GetValue<string>(), view.Value["id"]!.GetValue<string>(),
                    view.Value["teableName"]?.GetValue<string>())).ToArray() }).ToArray();
        }
        return new(false, sources);
    }
}

/// <summary>
/// 第一阶段只读接入：使用迁移后的真实字段，按原 Notion ID 输出现有业务模型。
/// 迁移后的视图沿用原 Notion View ID；未映射的旧视图必须停止，不能悄悄扩大统计范围。
/// </summary>
public sealed class TeableDatabaseQueryProvider : IDatabaseQueryProvider
{
    private readonly TeableQuerySettings _mapping;
    private readonly Func<TeableClient> _client;

    public TeableDatabaseQueryProvider(TeableQuerySettings mapping, Func<TeableClient>? client = null)
    {
        _mapping = mapping;
        _client = client ?? (() => { var settings = TeableSettingsStore.Load(); return new(settings.ServerUrl, settings.Token); });
    }

    public string Name => "Teable";
    public IReadOnlyList<DatabaseSourceInfo> GetSources() => _mapping.Sources.Select(source =>
        new DatabaseSourceInfo(source.Id, source.Name, source.Path, DailyReportPresentation.BusinessSection(source.Path))).ToArray();

    private TeableQuerySource Source(string id) => _mapping.Sources.SingleOrDefault(source => source.Id == id)
        ?? throw new InvalidOperationException("该数据库尚未迁移至 Teable。");

    private static async Task ValidateSchemaAsync(TeableClient client, TeableQuerySource source, CancellationToken cancellationToken)
    {
        var fields = await client.ReadFieldsAsync(source.TableId, cancellationToken);
        foreach (var field in source.Fields)
        {
            var actual = fields.SingleOrDefault(item => item?["id"]?.GetValue<string>() == field.TeableId);
            if (actual?["type"]?.GetValue<string>() != field.TeableType || actual?["name"]?.GetValue<string>() != field.Name)
                throw new InvalidOperationException("Teable 字段与迁移映射不一致，请核对业务字段后更新映射。");
        }
    }

    public async Task<DatabaseSchemaResult> GetSchemaAsync(string sourceId, CancellationToken cancellationToken = default)
    {
        var source = Source(sourceId);
        using var client = _client();
        await ValidateSchemaAsync(client, source, cancellationToken);
        return new(true, "", source.Fields.Select(field => new DatabaseFieldInfo(field.Id, field.Name, field.Type)).ToArray());
    }

    public Task<IReadOnlyList<DatabaseDatasetInfo>> GetDatasetsAsync(string sourceId, CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();
        var source = Source(sourceId);
        return Task.FromResult<IReadOnlyList<DatabaseDatasetInfo>>([
            .. (source.Views ?? []).Select(view => new DatabaseDatasetInfo(view.Id, view.Name)),
            new(source.TableId, "全部记录")]);
    }

    public Task<DatabaseRecordSet> QueryDatasetAsync(string sourceId, string datasetId, CancellationToken cancellationToken = default) =>
        QueryAsync(sourceId, datasetId, null, null, null, cancellationToken);

    public Task<DatabaseRecordSet> QueryDateRangeAsync(string sourceId, string dateFieldId, DateOnly startDate, DateOnly endDate,
        CancellationToken cancellationToken = default) => QueryAsync(sourceId, null, dateFieldId, startDate, endDate, cancellationToken);

    public Task<DatabaseRecordSet> QueryExactMatchAsync(string sourceId, string propertyId, DateOnly value,
        CancellationToken cancellationToken = default) => QueryDateRangeAsync(sourceId, propertyId, value, value, cancellationToken);

    private async Task<DatabaseRecordSet> QueryAsync(string sourceId, string? datasetId, string? dateFieldId,
        DateOnly? start, DateOnly? end, CancellationToken cancellationToken)
    {
        var timer = Stopwatch.StartNew();
        var requests = 0;
        var name = sourceId;
        var dataset = dateFieldId is null ? "全部记录" : "日期范围";
        try
        {
            var source = Source(sourceId);
            name = source.Name;
            var view = datasetId is null || datasetId == source.TableId ? null
                : source.Views?.SingleOrDefault(view => view.Id == datasetId);
            if (datasetId is not null && datasetId != source.TableId && view is null)
                throw new InvalidOperationException("该 View 尚未映射至 Teable，请核对视图迁移配置。");
            if (dateFieldId is not null && (start > end || !source.Fields.Any(field => field.Id == dateFieldId && field.Type == "date")))
                throw new InvalidOperationException("日期范围或日期字段无效。");
            using var client = _client();
            requests++;
            await ValidateSchemaAsync(client, source, cancellationToken);
            if (view is not null)
            {
                requests++;
                var actual = await client.ReadViewAsync(source.TableId, view.TeableId, cancellationToken);
                if (actual["name"]?.GetValue<string>() != (view.TeableName ?? view.Name) || actual["type"]?.GetValue<string>() != "grid")
                    throw new InvalidOperationException("Teable 视图与迁移映射不一致。");
                dataset = view.Name;
            }
            var records = new List<DatabaseRecord>();
            var ids = new HashSet<string>();
            // ponytail: 当前生产库不足千条，分页全读后按北京时间筛选；规模增长时改为服务端日期过滤。
            for (var skip = 0; ; skip += 1000)
            {
                requests++;
                var response = await client.ReadQueryRecordsAsync(source.TableId,
                    source.Fields.Select(field => field.TeableId).ToArray(), skip, view?.TeableId, cancellationToken);
                var page = response["records"]?.AsArray() ?? throw new InvalidOperationException("Teable 响应缺少记录数组。");
                foreach (var item in page)
                {
                    var id = item?["id"]?.GetValue<string>() ?? throw new InvalidOperationException("Teable 记录缺少 ID。");
                    if (!ids.Add(id)) throw new InvalidOperationException("Teable 分页出现重复记录，已停止统计。");
                    var values = item!["fields"]?.AsObject() ?? throw new InvalidOperationException("Teable 记录缺少字段。");
                    var record = new DatabaseRecord(id, source.Fields.Select(field => new DatabaseFieldValue(
                        field.Id, field.Name, field.Type, ReadValue(values[field.TeableId], field.Type))).ToArray());
                    if (dateFieldId is null || record.Fields.First(field => field.Id == dateFieldId).Value is DateTime date &&
                        DateOnly.FromDateTime(date) >= start && DateOnly.FromDateTime(date) <= end)
                        records.Add(record);
                }
                if (page.Count < 1000) break;
                if (skip >= 99_000) throw new InvalidOperationException("Teable 查询达到十万条上限，已停止统计。");
            }
            return new(true, "数据库查询成功。", name, dataset, records, requests, timer.ElapsedMilliseconds);
        }
        catch (Exception ex) when (ex is HttpRequestException or JsonException or InvalidOperationException or ArgumentException or FormatException)
        {
            return new(false, ex.Message, name, dataset, [], requests, timer.ElapsedMilliseconds);
        }
        // 取消和超时向上传递，不能把取消查询当作零记录成功。
    }

    private static object? ReadValue(JsonNode? value, string type)
    {
        if (value is null) return null;
        if (type == "date")
            return DateTimeOffset.Parse(value.GetValue<string>(), CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal)
                .ToOffset(TimeSpan.FromHours(8)).DateTime;
        if (value is JsonValue scalar)
        {
            if (scalar.TryGetValue<double>(out var number)) return number;
            if (scalar.TryGetValue<bool>(out var boolean)) return boolean;
            if (scalar.TryGetValue<string>(out var text)) return text;
        }
        return null; // 与现有查询模型一致：不将关联、附件等复合值当作可汇总数字。
    }
}
