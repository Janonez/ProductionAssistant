using System.Globalization;
using System.Net;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public sealed class NotionImportService : INotionImportService
{
    private const string ApiVersion = "2026-03-11";
    private const string WeldTitleSuffix = " 焊接";
    private const int MaxTransientRetries = 2;
    private readonly HttpClient _client;

    public NotionImportService(HttpClient? client = null)
    {
        _client = client ?? new HttpClient();
        _client.BaseAddress ??= new Uri("https://api.notion.com/v1/");
    }

    public async Task<NotionDiscoveryResult> DiscoverAsync(
        string token,
        string rootPageId,
        CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(token))
            return new(false, "请先填写 API 令牌。", []);

        try
        {
            var sources = new List<NotionDataSourceOption>();
            if (string.IsNullOrWhiteSpace(rootPageId))
            {
                await SearchAuthorizedDataSourcesAsync(token, sources, cancellationToken);
                return new(true, $"已按令牌权限找到 {sources.Count} 个数据源。", sources);
            }

            var rootTitle = await GetPageTitleAsync(token, rootPageId.Trim(), cancellationToken);
            await DiscoverPageChildrenAsync(
                token,
                rootPageId.Trim(),
                [string.IsNullOrWhiteSpace(rootTitle) ? "数据库" : rootTitle],
                sources,
                cancellationToken);
            return new(true, $"找到 {sources.Count} 个可用数据源。", sources);
        }
        catch (Exception ex)
        {
            return new(false, $"发现数据源失败：{ex.Message}", []);
        }
    }

    private async Task SearchAuthorizedDataSourcesAsync(
        string token,
        List<NotionDataSourceOption> sources,
        CancellationToken cancellationToken)
    {
        string? cursor = null;
        do
        {
            var body = new Dictionary<string, object?>
            {
                ["page_size"] = 100,
                ["filter"] = new { property = "object", value = "data_source" }
            };
            if (!string.IsNullOrWhiteSpace(cursor))
                body["start_cursor"] = cursor;

            using var response = await SendWithRetryAsync(
                () => CreateRequest(
                    HttpMethod.Post,
                    "search",
                    token,
                    JsonSerializer.Serialize(body)),
                cancellationToken);
            response.EnsureSuccessStatusCode();
            using var document = JsonDocument.Parse(
                await response.Content.ReadAsStringAsync(cancellationToken));

            foreach (var source in document.RootElement.GetProperty("results").EnumerateArray())
            {
                var id = source.GetProperty("id").GetString() ?? string.Empty;
                if (string.IsNullOrWhiteSpace(id) ||
                    sources.Any(item => string.Equals(item.Id, id, StringComparison.OrdinalIgnoreCase)))
                    continue;

                var name = ReadRichTextTitle(source, "未命名数据源");
                var icon = ReadIcon(source);
                sources.Add(new(id, name, "令牌授权  /  Notion 数据源", icon.Text, icon.Url,
                    ReadParentDatabaseId(source)));
            }

            cursor = document.RootElement.GetProperty("has_more").GetBoolean()
                ? document.RootElement.GetProperty("next_cursor").GetString()
                : null;
        } while (!string.IsNullOrWhiteSpace(cursor));

        var pageCache = new Dictionary<string, (string Title, string ParentPageId)>(StringComparer.OrdinalIgnoreCase);
        for (var index = 0; index < sources.Count; index++)
        {
            var source = sources[index];
            if (string.IsNullOrWhiteSpace(source.DatabaseId)) continue;
            try
            {
                var path = await ResolveAuthorizedSourcePathAsync(
                    token, source.DatabaseId, source.Name, pageCache, cancellationToken);
                sources[index] = source with { Path = path };
            }
            catch
            {
                // The source stays selectable even when Notion denies one of its parent pages.
            }
        }

        sources.Sort((left, right) =>
        {
            var path = StringComparer.CurrentCultureIgnoreCase.Compare(left.Path, right.Path);
            return path != 0 ? path : StringComparer.CurrentCultureIgnoreCase.Compare(left.Name, right.Name);
        });
    }

    private async Task<string> ResolveAuthorizedSourcePathAsync(
        string token,
        string databaseId,
        string sourceName,
        Dictionary<string, (string Title, string ParentPageId)> pageCache,
        CancellationToken cancellationToken)
    {
        using var databaseResponse = await SendWithRetryAsync(
            () => CreateRequest(HttpMethod.Get, $"databases/{databaseId}", token), cancellationToken);
        databaseResponse.EnsureSuccessStatusCode();
        using var databaseDocument = JsonDocument.Parse(
            await databaseResponse.Content.ReadAsStringAsync(cancellationToken));
        var parentPageId = ReadParentPageId(databaseDocument.RootElement);
        var path = new List<string> { sourceName };
        while (!string.IsNullOrWhiteSpace(parentPageId))
        {
            if (!pageCache.TryGetValue(parentPageId, out var page))
            {
                using var pageResponse = await SendWithRetryAsync(
                    () => CreateRequest(HttpMethod.Get, $"pages/{parentPageId}", token), cancellationToken);
                pageResponse.EnsureSuccessStatusCode();
                using var pageDocument = JsonDocument.Parse(
                    await pageResponse.Content.ReadAsStringAsync(cancellationToken));
                page = (ReadPageTitle(pageDocument.RootElement), ReadParentPageId(pageDocument.RootElement));
                pageCache[parentPageId] = page;
            }
            if (!string.IsNullOrWhiteSpace(page.Title)) path.Insert(0, page.Title);
            parentPageId = page.ParentPageId;
        }
        return string.Join("  /  ", path);
    }

    private static string ReadParentPageId(JsonElement owner) =>
        owner.TryGetProperty("parent", out var parent) &&
        parent.TryGetProperty("type", out var type) && type.GetString() == "page_id" &&
        parent.TryGetProperty("page_id", out var pageId)
            ? pageId.GetString() ?? string.Empty
            : string.Empty;

    private static string ReadPageTitle(JsonElement page)
    {
        if (!page.TryGetProperty("properties", out var properties)) return string.Empty;
        foreach (var property in properties.EnumerateObject())
            if (property.Value.TryGetProperty("type", out var type) && type.GetString() == "title" &&
                property.Value.TryGetProperty("title", out var title))
                return string.Concat(title.EnumerateArray().Select(item =>
                    item.TryGetProperty("plain_text", out var text) ? text.GetString() : string.Empty));
        return string.Empty;
    }

    private static string ReadRichTextTitle(JsonElement owner, string fallback)
    {
        if (!owner.TryGetProperty("title", out var title) ||
            title.ValueKind != JsonValueKind.Array)
            return fallback;
        var value = string.Concat(title.EnumerateArray().Select(item =>
            item.TryGetProperty("plain_text", out var text) ? text.GetString() : string.Empty));
        return string.IsNullOrWhiteSpace(value) ? fallback : value;
    }

    private async Task DiscoverPageChildrenAsync(
        string token,
        string pageId,
        IReadOnlyList<string> path,
        List<NotionDataSourceOption> sources,
        CancellationToken cancellationToken)
    {
        string? cursor = null;
        do
        {
            var url = $"blocks/{pageId}/children?page_size=100";
            if (!string.IsNullOrWhiteSpace(cursor))
                url += $"&start_cursor={Uri.EscapeDataString(cursor)}";
            using var response = await SendWithRetryAsync(
                () => CreateRequest(HttpMethod.Get, url, token),
                cancellationToken);
            response.EnsureSuccessStatusCode();
            using var document = JsonDocument.Parse(
                await response.Content.ReadAsStringAsync(cancellationToken));

            foreach (var block in document.RootElement.GetProperty("results").EnumerateArray())
            {
                var type = block.GetProperty("type").GetString();
                var id = block.GetProperty("id").GetString() ?? string.Empty;
                if (type == "child_page")
                {
                    var title = block.GetProperty("child_page").GetProperty("title").GetString()
                        ?? "未命名页面";
                    await DiscoverPageChildrenAsync(
                        token, id, [.. path, title], sources, cancellationToken);
                }
                else if (type == "child_database")
                {
                    var title = block.GetProperty("child_database").GetProperty("title").GetString()
                        ?? "未命名数据库";
                    await AddDatabaseSourcesAsync(
                        token, id, [.. path, title], sources, cancellationToken);
                }
            }

            cursor = document.RootElement.GetProperty("has_more").GetBoolean()
                ? document.RootElement.GetProperty("next_cursor").GetString()
                : null;
        } while (!string.IsNullOrWhiteSpace(cursor));
    }

    private async Task AddDatabaseSourcesAsync(
        string token,
        string databaseId,
        IReadOnlyList<string> path,
        List<NotionDataSourceOption> sources,
        CancellationToken cancellationToken)
    {
        using var response = await SendWithRetryAsync(
            () => CreateRequest(HttpMethod.Get, $"databases/{databaseId}", token),
            cancellationToken);
        response.EnsureSuccessStatusCode();
        using var document = JsonDocument.Parse(
            await response.Content.ReadAsStringAsync(cancellationToken));
        if (!document.RootElement.TryGetProperty("data_sources", out var dataSources)) return;
        var databaseIcon = ReadIcon(document.RootElement);
        foreach (var source in dataSources.EnumerateArray())
        {
            var id = source.GetProperty("id").GetString() ?? string.Empty;
            var name = source.TryGetProperty("name", out var nameElement)
                ? nameElement.GetString() ?? path[^1]
                : path[^1];
            var fullPath = name == path[^1]
                ? string.Join("  /  ", path)
                : string.Join("  /  ", [.. path, name]);
            var sourceIcon = ReadIcon(source);
            var icon = string.IsNullOrWhiteSpace(sourceIcon.Text) &&
                       string.IsNullOrWhiteSpace(sourceIcon.Url)
                ? databaseIcon
                : sourceIcon;
            sources.Add(new(id, name, fullPath, icon.Text, icon.Url, databaseId));
        }
    }

    private static string ReadParentDatabaseId(JsonElement owner) =>
        owner.TryGetProperty("parent", out var parent) &&
        parent.TryGetProperty("database_id", out var databaseId)
            ? databaseId.GetString() ?? string.Empty
            : string.Empty;

    private static (string Text, string Url) ReadIcon(JsonElement owner)
    {
        if (!owner.TryGetProperty("icon", out var icon) ||
            icon.ValueKind is JsonValueKind.Null or JsonValueKind.Undefined ||
            !icon.TryGetProperty("type", out var typeElement))
            return (string.Empty, string.Empty);

        var type = typeElement.GetString();
        if (type == "emoji" &&
            icon.TryGetProperty("emoji", out var emoji))
            return (emoji.GetString() ?? string.Empty, string.Empty);

        if (type is "external" or "file" &&
            icon.TryGetProperty(type, out var file) &&
            file.TryGetProperty("url", out var url))
            return (string.Empty, url.GetString() ?? string.Empty);

        if (type == "custom_emoji" &&
            icon.TryGetProperty("custom_emoji", out var customEmoji) &&
            customEmoji.TryGetProperty("url", out var customUrl))
            return (string.Empty, customUrl.GetString() ?? string.Empty);

        return (string.Empty, string.Empty);
    }

    private async Task<string> GetPageTitleAsync(
        string token,
        string pageId,
        CancellationToken cancellationToken)
    {
        using var response = await SendWithRetryAsync(
            () => CreateRequest(HttpMethod.Get, $"pages/{pageId}", token),
            cancellationToken);
        response.EnsureSuccessStatusCode();
        using var document = JsonDocument.Parse(
            await response.Content.ReadAsStringAsync(cancellationToken));
        return ReadPageTitle(document.RootElement);
    }

    public async Task<NotionSchemaResult> GetSchemaAsync(
        string token,
        string dataSourceId,
        CancellationToken cancellationToken = default)
    {
        try
        {
            using var response = await SendWithRetryAsync(
                () => CreateRequest(HttpMethod.Get, $"data_sources/{dataSourceId}", token),
                cancellationToken);
            if (!response.IsSuccessStatusCode)
                return new(false, await ReadErrorAsync(response, cancellationToken), []);
            using var document = JsonDocument.Parse(
                await response.Content.ReadAsStringAsync(cancellationToken));
            var properties = document.RootElement.GetProperty("properties")
                .EnumerateObject()
                .Select(property => new NotionPropertyOption(
                    property.Name,
                    property.Value.GetProperty("type").GetString() ?? string.Empty,
                    ReadRelationDataSourceId(property.Value),
                    property.Value.TryGetProperty("id", out var id) ? id.GetString() ?? property.Name : property.Name))
                .ToArray();
            return new(true, $"已读取 {properties.Length} 个字段。", properties);
        }
        catch (Exception ex)
        {
            return new(false, $"读取字段失败：{ex.Message}", []);
        }
    }

    public async Task<ProductionMessageImportResult> ImportProductionMessagesAsync(
        ProductionMessageImportRequest request,
        CancellationToken cancellationToken = default)
    {
        if (request.Items.Count == 0)
            return new(false, "没有可写入的消息。", []);

        var settings = NotionSettingsStore.Load();
        if (string.IsNullOrWhiteSpace(settings.Token))
            return new(false, "请先在“设置”中填写 Notion API 令牌。", []);

        var results = new List<ProductionMessageWriteResult>();
        foreach (var group in request.Items.GroupBy(item => item.Kind))
        {
            var target = settings.Targets.FirstOrDefault(item =>
                item.ModuleKey == ModuleKeyFor(group.Key));
            if (target is null)
            {
                results.AddRange(group.Select(item => WriteFailure(
                    item,
                    $"未绑定{ProductionMessageKinds.Display(group.Key)}目标数据源。")));
                continue;
            }

            var schema = await GetSchemaAsync(settings.Token, target.Id, cancellationToken);
            if (!schema.Succeeded)
            {
                results.AddRange(group.Select(item => WriteFailure(item, schema.Message)));
                continue;
            }

            var resolution = ResolveMessageSchema(settings, target, schema, group.Key, summary: false);
            if (!resolution.Succeeded)
            {
                results.AddRange(group.Select(item => WriteFailure(item, resolution.Message)));
                continue;
            }

            var duplicateDates = group.GroupBy(item => item.BusinessDate.Date)
                .Where(items => items.Count() > 1)
                .Select(items => items.Key)
                .ToHashSet();
            foreach (var item in group)
            {
                if (duplicateDates.Contains(item.BusinessDate.Date))
                {
                    results.Add(WriteFailure(
                        item,
                        $"{item.BusinessDate:yyyy-MM-dd} 在本批次重复，日报库按业务日期只保留一条记录。"));
                    continue;
                }

                try
                {
                    var result = await ImportProductionMessageAsync(
                        settings,
                        target,
                        resolution,
                        item,
                        request,
                        cancellationToken);
                    results.Add(result);
                }
                catch (Exception ex)
                {
                    results.Add(WriteFailure(item, $"写入失败：{ex.Message}"));
                }
            }
        }

        var errors = results.Count(item => item.Status == "error");
        if (request.CheckOnly)
        {
            var ready = results.Count(item => item.Status == "ready");
            var found = results.Count(item => item.Status == "existing");
            var checkMessage = $"已查询 {results.Count} 条：可写入 {ready} 条，已存在 {found} 条";
            if (errors > 0) checkMessage += $"，查询失败 {errors} 条";
            return new(errors == 0, checkMessage + "。", results);
        }

        var written = results.Count(item => item.Status is "created" or "updated");
        var unchanged = results.Count(item => item.Status == "unchanged");
        var existing = results.Count(item => item.Status == "existing");
        var conflicts = results.Count(item => item.Status == "conflict");
        var message = $"本批次 {results.Count} 条：已写入 {written} 条";
        if (unchanged > 0) message += $"，无需写入 {unchanged} 条";
        if (existing > 0) message += $"，已有记录 {existing} 条";
        if (conflicts > 0) message += $"，字段冲突 {conflicts} 条";
        if (errors > 0) message += $"，失败 {errors} 条";
        return new(errors == 0 && existing == 0 && conflicts == 0, message + "。", results);
    }

    private static string ReadRelationDataSourceId(JsonElement property)
    {
        if (!property.TryGetProperty("type", out var type) ||
            type.GetString() != "relation" ||
            !property.TryGetProperty("relation", out var relation))
            return string.Empty;
        return relation.TryGetProperty("data_source_id", out var sourceId)
            ? sourceId.GetString() ?? string.Empty
            : string.Empty;
    }

    public async Task<NotionImportResult> TestConnectionAsync(
        NotionSettings settings,
        CancellationToken cancellationToken = default)
    {
        var validation = Validate(settings, settings.ActiveTarget);
        if (validation is not null) return validation;

        return await SendAsync(
            () => CreateRequest(
                HttpMethod.Get,
                $"data_sources/{settings.ActiveTarget!.Id}",
                settings.Token),
            "连接成功，已找到 Notion 数据源。",
            cancellationToken);
    }

    public async Task<NotionImportResult> ImportAsync(
        NotionImportRequest request,
        CancellationToken cancellationToken = default)
    {
        var plan = await PrepareImportAsync(request, cancellationToken);
        if (!plan.Succeeded) return NotionImportResult.Failure(plan.Message);
        return await ExecuteImportAsync(plan, true, null, cancellationToken);
    }

    public async Task<NotionImportPlanResult> PrepareImportAsync(
        NotionImportRequest request,
        CancellationToken cancellationToken = default)
    {
        if (request.Values.Count == 0)
            return new(false, "没有可导入的数据。", string.Empty, []);
        var settings = NotionSettingsStore.Load();
        var target = settings.Targets.FirstOrDefault(item =>
            item.ModuleKey == "daily-weld-simulation");
        var validation = Validate(settings, target);
        if (validation is not null)
            return new(false, validation.Message, string.Empty, []);

        var firstDate = request.Values.Min(value => value.Date).ToString("yyyy-MM-dd");
        var lastDate = request.Values.Max(value => value.Date).ToString("yyyy-MM-dd");
        object? filter = null;
        if (!string.IsNullOrWhiteSpace(target!.DateProperty))
            filter = new
            {
                and = new object[]
                {
                    new { property = target.DateProperty, date = new { on_or_after = firstDate } },
                    new { property = target.DateProperty, date = new { on_or_before = lastDate } }
                }
            };
        var queryBody = JsonSerializer.Serialize(new { filter, page_size = 100 });
        using var queryResponse = await SendWithRetryAsync(
            () => CreateRequest(
                HttpMethod.Post,
                $"data_sources/{target.Id}/query",
                settings.Token,
                queryBody),
            cancellationToken);
        if (!queryResponse.IsSuccessStatusCode)
        {
            var detail = await ReadErrorAsync(queryResponse, cancellationToken);
            return new(false, $"读取整月数据失败：{detail}", target.QuantityProperty, []);
        }

        using var queryDocument = JsonDocument.Parse(
            await queryResponse.Content.ReadAsStringAsync(cancellationToken));
        var pagesByDate = new Dictionary<string, List<JsonElement>>();
        foreach (var page in queryDocument.RootElement.GetProperty("results").EnumerateArray())
        {
            var date = ReadPageDate(page, target);
            if (string.IsNullOrWhiteSpace(date)) continue;
            if (!pagesByDate.TryGetValue(date, out var pages))
                pagesByDate[date] = pages = [];
            pages.Add(page.Clone());
        }

        var items = new List<NotionImportPlanItem>();
        foreach (var value in request.Values)
        {
            var dateKey = value.Date.ToString("yyyy-MM-dd");
            if (!pagesByDate.TryGetValue(dateKey, out var matches))
                matches = [];
            if (matches.Count == 0)
            {
                items.Add(new(value.Date, value.Quantity, null, null, "missing"));
                continue;
            }
            if (matches.Count > 1)
            {
                items.Add(new(value.Date, value.Quantity, null, null, "duplicated"));
                continue;
            }

            var pageId = matches[0].GetProperty("id").GetString();
            double? existingQuantity = null;
            if (matches[0].TryGetProperty("properties", out var properties) &&
                properties.TryGetProperty(target.QuantityProperty, out var quantityProperty) &&
                quantityProperty.TryGetProperty("number", out var number) &&
                number.ValueKind == JsonValueKind.Number)
                existingQuantity = number.GetDouble();
            items.Add(new(
                value.Date,
                value.Quantity,
                pageId,
                existingQuantity,
                existingQuantity.HasValue ? "existing" : "empty"));
        }

        return new(true, "检查完成。", target!.QuantityProperty, items);
    }

    public async Task<NotionExistingDataResult> HasExistingDataAsync(
        NotionImportRequest request,
        CancellationToken cancellationToken = default)
    {
        if (request.Values.Count == 0)
            return new(false, false, "没有可导入的数据。");
        var settings = NotionSettingsStore.Load();
        var target = settings.Targets.FirstOrDefault(item =>
            item.ModuleKey == "daily-weld-simulation");
        var validation = Validate(settings, target);
        if (validation is not null)
            return new(false, false, validation.Message);

        var filters = new List<object>
        {
            new { property = target!.QuantityProperty, number = new { is_not_empty = true } }
        };
        if (!string.IsNullOrWhiteSpace(target.DateProperty))
        {
            filters.Add(new
            {
                property = target.DateProperty,
                date = new { on_or_after = request.Values.Min(value => value.Date).ToString("yyyy-MM-dd") }
            });
            filters.Add(new
            {
                property = target.DateProperty,
                date = new { on_or_before = request.Values.Max(value => value.Date).ToString("yyyy-MM-dd") }
            });
        }
        var body = JsonSerializer.Serialize(new { filter = new { and = filters }, page_size = 1 });
        using var httpRequest = CreateRequest(
            HttpMethod.Post,
            $"data_sources/{target.Id}/query",
            settings.Token,
            body);
        using var response = await _client.SendAsync(httpRequest, cancellationToken);
        if (!response.IsSuccessStatusCode)
            return new(false, false, await ReadErrorAsync(response, cancellationToken));
        using var document = JsonDocument.Parse(
            await response.Content.ReadAsStringAsync(cancellationToken));
        var hasData = document.RootElement.GetProperty("results").GetArrayLength() > 0;
        return new(true, hasData, hasData ? "目标月份已有产量。" : "目标月份暂无产量。");
    }

    private static string ReadPageDate(JsonElement page, NotionTargetSettings target)
    {
        if (!page.TryGetProperty("properties", out var properties)) return string.Empty;
        if (!string.IsNullOrWhiteSpace(target.DateProperty) &&
            properties.TryGetProperty(target.DateProperty, out var dateProperty) &&
            dateProperty.TryGetProperty("date", out var date) &&
            date.ValueKind == JsonValueKind.Object &&
            date.TryGetProperty("start", out var start))
            return (start.GetString() ?? string.Empty).Split('T')[0];
        if (properties.TryGetProperty(target.TitleProperty, out var titleProperty) &&
            titleProperty.TryGetProperty("title", out var title))
            return string.Concat(title.EnumerateArray().Select(item =>
                item.TryGetProperty("plain_text", out var text) ? text.GetString() : string.Empty));
        return string.Empty;
    }

    public async Task<NotionImportResult> ExecuteImportAsync(
        NotionImportPlanResult plan,
        bool overwriteExisting,
        IProgress<NotionImportProgress>? progress = null,
        CancellationToken cancellationToken = default)
    {
        if (!plan.Succeeded) return NotionImportResult.Failure(plan.Message);
        var settings = NotionSettingsStore.Load();
        var writableItems = plan.Items.Where(item =>
            item.PageId is not null &&
            (overwriteExisting || !item.ExistingQuantity.HasValue)).ToArray();
        var updated = 0;
        var skippedExisting = 0;
        for (var index = 0; index < plan.Items.Count; index++)
        {
            var item = plan.Items[index];
            progress?.Report(new(index, plan.Items.Count, item.Date, "正在写入"));
            if (item.PageId is null) continue;
            if (item.ExistingQuantity.HasValue && !overwriteExisting)
            {
                skippedExisting++;
                continue;
            }

            var updateBody = JsonSerializer.Serialize(new
            {
                properties = new Dictionary<string, object>
                {
                    [plan.QuantityProperty] = new { number = item.NewQuantity }
                }
            });
            using var updateRequest = CreateRequest(
                HttpMethod.Patch,
                $"pages/{item.PageId}",
                settings.Token,
                updateBody);
            using var updateResponse = await _client.SendAsync(updateRequest, cancellationToken);
            if (!updateResponse.IsSuccessStatusCode)
            {
                var detail = await ReadErrorAsync(updateResponse, cancellationToken);
                return NotionImportResult.Failure($"更新 {item.Date:yyyy-MM-dd} 失败：{detail}");
            }

            updated++;
            progress?.Report(new(index + 1, plan.Items.Count, item.Date, "已完成"));
            if (updated < writableItems.Length)
                await Task.Delay(350, cancellationToken);
        }

        progress?.Report(new(plan.Items.Count, plan.Items.Count, DateTime.MinValue, "写入完成"));
        var missing = plan.Items.Count(item => item.Status == "missing");
        var duplicated = plan.Items.Count(item => item.Status == "duplicated");
        var message = $"已更新 {updated} 条";
        if (skippedExisting > 0) message += $"，已有数据跳过 {skippedExisting} 条";
        if (missing > 0) message += $"，待创建 {missing} 条（当前已跳过）";
        if (duplicated > 0) message += $"，重复日期 {duplicated} 条（已跳过）";
        return NotionImportResult.Success(message + "。");
    }

    // 保留给后续“缺少日期时创建记录”的实现；当前导入流程不会调用。
    public async Task<NotionImportResult> ImportWeldHierarchyAsync(
        NotionImportRequest request,
        IProgress<NotionImportProgress>? progress = null,
        CancellationToken cancellationToken = default)
    {
        if (request.Values.Count == 0)
            return NotionImportResult.Failure("没有可导入的数据。");

        var settings = NotionSettingsStore.Load();
        var dayTarget = settings.Targets.FirstOrDefault(target =>
            target.ModuleKey == "daily-weld-simulation");
        var validation = Validate(settings, dayTarget);
        if (validation is not null) return validation;

        var monthSource = settings.CachedDataSources.FirstOrDefault(source =>
            source.Name == "每月焊接量" ||
            source.Path.Contains("焊接数据库") && source.Name.Contains("每月焊接量"));
        var weekSource = settings.CachedDataSources.FirstOrDefault(source =>
            source.Name == "上周焊接量" ||
            source.Path.Contains("焊接数据库") && source.Name.Contains("上周焊接量"));
        if (monthSource is null || weekSource is null)
            return NotionImportResult.Failure(
                "未找到“每月焊接量”或“上周焊接量”数据源，请先在设置中刷新数据源。");

        var monthSchema = await GetSchemaAsync(settings.Token, monthSource.Id, cancellationToken);
        var weekSchema = await GetSchemaAsync(settings.Token, weekSource.Id, cancellationToken);
        var daySchema = await GetSchemaAsync(settings.Token, dayTarget!.Id, cancellationToken);
        if (!monthSchema.Succeeded || !weekSchema.Succeeded || !daySchema.Succeeded)
            return NotionImportResult.Failure(
                $"读取三层数据库结构失败：{monthSchema.Message} {weekSchema.Message} {daySchema.Message}");

        var monthTitle = FindProperty(monthSchema, "title", "月份");
        var monthQuantity = FindProperty(monthSchema, "number", "产量/吨", "产量");
        var monthDate = FindProperty(monthSchema, "date", "日期变量");
        var weekTitle = FindProperty(weekSchema, "title", "周期");
        var weekRange = FindProperty(weekSchema, "date", "日期范围");
        var dayTitle = FindProperty(daySchema, "title", dayTarget.TitleProperty);
        var dayQuantity = FindProperty(daySchema, "number", dayTarget.QuantityProperty);
        var dayDate = FindProperty(daySchema, "date", dayTarget.DateProperty);
        var dayToMonth = FindRelation(daySchema, monthSource.Id);
        var dayToWeek = FindRelation(daySchema, weekSource.Id);
        var missingSchema = new[]
        {
            (monthTitle, "月.月份"), (monthQuantity, "月.产量"), (monthDate, "月.日期变量"),
            (weekTitle, "周.周期"), (weekRange, "周.日期范围"),
            (dayTitle, "日.日期"), (dayQuantity, "日.每日数据"), (dayDate, "日.日期变量"),
            (dayToMonth, "日→月 Relation"), (dayToWeek, "日→周 Relation")
        }.Where(item => item.Item1 is null).Select(item => item.Item2).ToArray();
        if (missingSchema.Length > 0)
            return NotionImportResult.Failure(
                $"三层数据库字段或关联不完整：{string.Join("、", missingSchema)}。\n\n" +
                $"程序选中的月库：{monthSource.Name}\n路径：{monthSource.Path}\nID：{monthSource.Id}\n" +
                $"实际字段：{DescribeSchema(monthSchema)}\n\n" +
                $"程序选中的周库：{weekSource.Name}\n路径：{weekSource.Path}\nID：{weekSource.Id}\n" +
                $"实际字段：{DescribeSchema(weekSchema)}\n\n" +
                $"程序选中的日库：{dayTarget.Name}\n路径：{dayTarget.Path}\nID：{dayTarget.Id}\n" +
                $"实际字段：{DescribeSchema(daySchema)}");

        var orderedValues = request.Values.OrderBy(value => value.Date).ToArray();
        var monthStart = new DateTime(orderedValues[0].Date.Year, orderedValues[0].Date.Month, 1);
        if (orderedValues.Any(value => value.Date.Year != monthStart.Year ||
                                       value.Date.Month != monthStart.Month))
            return NotionImportResult.Failure("一次导入只能包含同一个自然月的数据。");
        var monthKey = monthStart.ToString("yyyy-MM");
        var weekStarts = orderedValues.Select(value => GetBusinessWeekStart(value.Date))
            .Distinct().OrderBy(date => date).ToArray();

        var monthPages = await QueryDataSourceAsync(
            settings.Token, monthSource.Id,
            new
            {
                or = new object[]
                {
                    new { property = monthTitle!.Name, title = new { equals = monthKey } },
                    new { property = monthDate!.Name, date = new { equals = monthStart.ToString("yyyy-MM-dd") } }
                }
            },
            cancellationToken);
        if (!monthPages.Succeeded) return NotionImportResult.Failure(monthPages.Message);
        if (monthPages.Pages.Count > 1)
            return NotionImportResult.Failure($"月数据库存在重复月份 {monthKey}，已停止导入。");

        var weekKeys = weekStarts.ToDictionary(start => start, GetBusinessWeekKey);
        var weekPages = await QueryDataSourceAsync(
            settings.Token, weekSource.Id,
            new
            {
                or = weekKeys.Values.Select(key =>
                    (object)new { property = weekTitle!.Name, title = new { equals = key } }).ToArray()
            }, cancellationToken);
        if (!weekPages.Succeeded) return NotionImportResult.Failure(weekPages.Message);
        var weekPagesByKey = weekPages.Pages
            .GroupBy(page => ReadTitle(page, weekTitle!.Name))
            .ToDictionary(group => group.Key, group => group.ToArray());
        var duplicatedWeek = weekPagesByKey.FirstOrDefault(pair => pair.Value.Length > 1);
        if (!string.IsNullOrWhiteSpace(duplicatedWeek.Key))
            return NotionImportResult.Failure(
                $"周数据库存在重复周期 {duplicatedWeek.Key}，已停止导入。");

        var dayFilters = new List<object>
        {
            new
            {
                and = new object[]
                {
                    new { property = dayDate!.Name, date = new { on_or_after = orderedValues[0].Date.ToString("yyyy-MM-dd") } },
                    new { property = dayDate.Name, date = new { on_or_before = orderedValues[^1].Date.ToString("yyyy-MM-dd") } }
                }
            }
        };
        dayFilters.AddRange(orderedValues.SelectMany(value => new[]
        {
            value.Date.ToString("yyyy-MM-dd"),
            BuildWeldTitle(value.Date)
        }).Distinct(StringComparer.Ordinal).Select(title =>
            (object)new
            {
                property = dayTitle!.Name,
                title = new { equals = title }
            }));
        var dayPages = await QueryDataSourceAsync(
            settings.Token, dayTarget.Id, new { or = dayFilters }, cancellationToken);
        if (!dayPages.Succeeded) return NotionImportResult.Failure(dayPages.Message);
        var dayPagesByDate = dayPages.Pages
            .GroupBy(page =>
            {
                var date = ReadDate(page, dayDate!.Name);
                return string.IsNullOrWhiteSpace(date)
                    ? NormalizeWeldTitleDate(ReadTitle(page, dayTitle!.Name))
                    : date;
            })
            .Where(group => !string.IsNullOrWhiteSpace(group.Key))
            .ToDictionary(group => group.Key, group => group.ToArray());
        var duplicatedDay = dayPagesByDate.FirstOrDefault(pair => pair.Value.Length > 1);
        if (!string.IsNullOrWhiteSpace(duplicatedDay.Key))
            return NotionImportResult.Failure(
                $"日数据库存在重复日期 {duplicatedDay.Key}，已停止导入。");

        var monthProperties = new Dictionary<string, object>
        {
            [monthTitle.Name] = TitleValue(monthKey),
            [monthQuantity!.Name] = new { number = orderedValues.Sum(value => value.Quantity) },
            [monthDate!.Name] = DateValue(monthStart)
        };
        var monthPageId = monthPages.Pages.Count == 0
            ? await CreateDataSourcePageAsync(
                settings.Token, monthSource.Id, monthProperties, $"创建月份 {monthKey}", cancellationToken)
            : monthPages.Pages[0].GetProperty("id").GetString();
        if (string.IsNullOrWhiteSpace(monthPageId))
            return NotionImportResult.Failure($"创建月份 {monthKey} 失败。");
        if (monthPages.Pages.Count == 1)
            await UpdatePageAsync(settings.Token, monthPageId, monthProperties, cancellationToken);

        var weekPageIds = new Dictionary<DateTime, string>();
        foreach (var start in weekStarts)
        {
            var key = weekKeys[start];
            var properties = new Dictionary<string, object>
            {
                [weekTitle!.Name] = TitleValue(key),
                [weekRange!.Name] = DateRangeValue(start, start.AddDays(6))
            };
            weekPagesByKey.TryGetValue(key, out var matches);
            var pageId = matches is { Length: 1 }
                ? matches[0].GetProperty("id").GetString()
                : await CreateDataSourcePageAsync(
                    settings.Token, weekSource.Id, properties, $"创建周期 {key}", cancellationToken);
            if (string.IsNullOrWhiteSpace(pageId))
                return NotionImportResult.Failure($"创建周期 {key} 失败。");
            if (matches is { Length: 1 })
                await UpdatePageAsync(settings.Token, pageId, properties, cancellationToken);
            weekPageIds[start] = pageId;
        }

        var created = 0;
        var updated = 0;
        for (var index = 0; index < orderedValues.Length; index++)
        {
            var value = orderedValues[index];
            var dateKey = value.Date.ToString("yyyy-MM-dd");
            progress?.Report(new(index, orderedValues.Length, value.Date, "正在同步日记录"));
            var properties = new Dictionary<string, object>
            {
                [dayTitle!.Name] = TitleValue(BuildWeldTitle(value.Date)),
                [dayQuantity!.Name] = new { number = value.Quantity },
                [dayDate!.Name] = DateValue(value.Date),
                [dayToMonth!.Name] = RelationValue(monthPageId),
                [dayToWeek!.Name] = RelationValue(weekPageIds[GetBusinessWeekStart(value.Date)])
            };
            dayPagesByDate.TryGetValue(dateKey, out var matches);
            if (matches is { Length: 1 })
            {
                var pageId = matches[0].GetProperty("id").GetString();
                if (string.IsNullOrWhiteSpace(pageId))
                    return NotionImportResult.Failure($"读取日期 {dateKey} 的 Page ID 失败。");
                await UpdatePageAsync(settings.Token, pageId, properties, cancellationToken);
                updated++;
            }
            else
            {
                var pageId = await CreateDataSourcePageAsync(
                    settings.Token, dayTarget.Id, properties, $"创建日期 {dateKey}", cancellationToken);
                if (string.IsNullOrWhiteSpace(pageId))
                    return NotionImportResult.Failure($"创建日期 {dateKey} 失败。");
                created++;
            }
            progress?.Report(new(index + 1, orderedValues.Length, value.Date, "已完成"));
            if (index + 1 < orderedValues.Length)
                await Task.Delay(350, cancellationToken);
        }

        progress?.Report(new(orderedValues.Length, orderedValues.Length, DateTime.MinValue, "写入完成"));
        return NotionImportResult.Success(
            $"已同步月份 {monthKey}、{weekStarts.Length} 个周期；每日记录新增 {created} 条、更新 {updated} 条。");
    }

    private static NotionPropertyOption? FindProperty(
        NotionSchemaResult schema, string type, params string[] preferredNames) =>
        schema.Properties.FirstOrDefault(property =>
            property.Type == type && preferredNames.Any(name =>
                string.Equals(NormalizePropertyName(property.Name), NormalizePropertyName(name),
                    StringComparison.Ordinal)));

    private static string NormalizePropertyName(string value) =>
        value.Trim().Normalize(NormalizationForm.FormC);

    private static string DescribeSchema(NotionSchemaResult schema) =>
        schema.Properties.Count == 0
            ? "（API 未返回任何字段，请检查数据库是否已授权给 Notion Integration）"
            : string.Join("；", schema.Properties.Select(property =>
                $"{property.Name} [{property.Type}]" +
                (string.IsNullOrWhiteSpace(property.RelationDataSourceId)
                    ? string.Empty
                    : $" → {property.RelationDataSourceId}")));

    private static NotionPropertyOption? FindRelation(
        NotionSchemaResult schema, string targetDataSourceId) =>
        schema.Properties.FirstOrDefault(property =>
            property.Type == "relation" &&
            string.Equals(property.RelationDataSourceId, targetDataSourceId,
                StringComparison.OrdinalIgnoreCase));

    private static DateTime GetBusinessWeekStart(DateTime date)
    {
        var daysSinceSaturday = ((int)date.DayOfWeek - (int)DayOfWeek.Saturday + 7) % 7;
        return date.Date.AddDays(-daysSinceSaturday);
    }

    private static string GetBusinessWeekKey(DateTime saturday) =>
        $"{ISOWeek.GetYear(saturday):0000}-W{ISOWeek.GetWeekOfYear(saturday):00}";

    private static readonly IReadOnlyDictionary<string, string[]> MessagePropertyAliases =
        new Dictionary<string, string[]>(StringComparer.Ordinal)
        {
            [ProductionMessageFields.Process] = ["工序", "动作", "工艺"],
            [ProductionMessageFields.Shift] = ["班次", "班组"],
            [ProductionMessageFields.Project] = ["项目号", "项目", "产品"],
            [ProductionMessageFields.Material] = ["材料", "材质", "规格"],
            [ProductionMessageFields.PieceCount] = ["张数", "件数", "数量", "件"],
            [ProductionMessageFields.Weight] = ["日模拟产量/吨", "下料（吨）", "下料量", "重量", "吨位"],
            [ProductionMessageFields.Unit] = ["单位"],
            [ProductionMessageFields.Line] = ["产线", "线别", "生产线"],
            [ProductionMessageFields.SheetInStock] = ["板材入库", "板材入库量", "板材"],
            [ProductionMessageFields.ProfileInStock] = ["型材入库", "型材入库量", "型材"],
            [ProductionMessageFields.Cutting] = ["下料量", "下料"],
            [ProductionMessageFields.Welding] = ["焊接量", "焊接"],
            [ProductionMessageFields.DailyOutput] = ["产出情况（套）", "产出（套）", "当日产出", "日产出", "当日产量"],
            [ProductionMessageFields.MonthlyOutput] = ["当月累计", "当月产出", "本月累计", "本月"],
            [ProductionMessageFields.YearlyOutput] = ["全年累计", "全年产出", "年度累计", "年度"],
            [ProductionMessageFields.MonthlyReference] = ["月度参考量", "月度计划", "月计划", "参考量"],
            [ProductionMessageFields.OutputSections] = ["产出情况（节）", "产出（节）", "产出节数", "产出", "完成节数", "节数", "出塔节数"],
            [ProductionMessageFields.RawMessage] = ["原始消息", "原文", "消息原文"],
            [ProductionMessageFields.MessageType] = ["消息类型", "类型"],
            [ProductionMessageFields.ParserVersion] = ["解析器版本", "解析版本"],
        };

    private sealed record MessageSchemaResolution(
        bool Succeeded,
        string Message,
        string TitleProperty,
        string DateProperty,
        IReadOnlyDictionary<string, NotionPropertyOption> Properties);

    private static string ModuleKeyFor(ProductionMessageKind kind) => kind switch
    {
        ProductionMessageKind.MaterialCutting => ProductionMessageKinds.CuttingModuleKey,
        ProductionMessageKind.TowerLineDaily => ProductionMessageKinds.TowerDailyModuleKey,
        _ => string.Empty
    };

    private static MessageSchemaResolution ResolveMessageSchema(
        NotionSettings settings,
        NotionTargetSettings target,
        NotionSchemaResult schema,
        ProductionMessageKind kind,
        bool summary)
    {
        var properties = schema.Properties.ToDictionary(
            property => property.Name,
            StringComparer.Ordinal);
        var title = FindConfiguredProperty(
            target.TitleProperty,
            schema.Properties,
            "title",
            ["标题", "名称", "日期"]);
        var date = FindConfiguredProperty(
            target.DateProperty,
            schema.Properties,
            "date",
            ["业务日期", "日期", "日期变量"]);
        var mapping = new Dictionary<string, NotionPropertyOption>(StringComparer.Ordinal);
        foreach (var pair in target.PropertyMappings ?? [])
        {
            if (properties.TryGetValue(pair.Value, out var property))
                mapping[pair.Key] = property;
        }

        var fieldKeys = ProductionMessageFields.FieldsFor(kind)
            .Concat([ProductionMessageFields.RawMessage,
                     ProductionMessageFields.MessageType,
                     ProductionMessageFields.ParserVersion])
            .Distinct(StringComparer.Ordinal);
        foreach (var key in fieldKeys)
        {
            if (mapping.ContainsKey(key) ||
                !MessagePropertyAliases.TryGetValue(key, out var aliases))
                continue;
            var candidate = FindMessageProperty(schema.Properties, aliases);
            if (candidate is not null) mapping[key] = candidate;
        }

        if (kind == ProductionMessageKind.MaterialCutting && !summary)
        {
            var monthlyRelation = schema.Properties.FirstOrDefault(property =>
                property.Type == "relation" &&
                property.Name.Contains("所属月份", StringComparison.OrdinalIgnoreCase));
            if (monthlyRelation is not null)
                mapping[ProductionMessageFields.MonthlySummaryRelation] = monthlyRelation;
        }

        var missing = new List<string>();
        if (title is null) missing.Add("标题字段");
        if (!summary && date is null) missing.Add("业务日期字段");
        if (missing.Count > 0)
            return new(
                false,
                $"数据源缺少{string.Join("、", missing)}，请在模块中重新检测字段。",
                "",
                "",
                new Dictionary<string, NotionPropertyOption>());

        if (title is not null) mapping["__title"] = title;
        if (date is not null) mapping["__date"] = date;
        return new(true, "字段检查通过。", title!.Name, date?.Name ?? string.Empty, mapping);
    }

    private static string NormalizeDataSourceId(string value)
    {
        var normalized = value.Trim();
        if (normalized.StartsWith("collection://", StringComparison.OrdinalIgnoreCase))
            normalized = normalized["collection://".Length..];
        return Guid.TryParse(normalized, out var id) ? id.ToString() : normalized;
    }

    private static NotionPropertyOption? FindConfiguredProperty(
        string configuredName,
        IReadOnlyList<NotionPropertyOption> properties,
        string type,
        IReadOnlyList<string> aliases)
    {
        if (!string.IsNullOrWhiteSpace(configuredName))
        {
            var configured = properties.FirstOrDefault(property =>
                property.Type == type &&
                string.Equals(property.Name, configuredName, StringComparison.Ordinal));
            if (configured is not null) return configured;
        }

        return properties.FirstOrDefault(property =>
            property.Type == type &&
            aliases.Any(alias => string.Equals(property.Name, alias, StringComparison.Ordinal))) ??
            properties.FirstOrDefault(property => property.Type == type);
    }

    private static NotionPropertyOption? FindMessageProperty(
        IReadOnlyList<NotionPropertyOption> properties,
        IReadOnlyList<string> aliases)
    {
        return properties.FirstOrDefault(property =>
                   aliases.Any(alias => string.Equals(property.Name, alias, StringComparison.Ordinal))) ??
               properties.FirstOrDefault(property =>
                   aliases.Any(alias => property.Name.Contains(alias, StringComparison.OrdinalIgnoreCase)));
    }

    private async Task<ProductionMessageWriteResult> ImportProductionMessageAsync(
        NotionSettings settings,
        NotionTargetSettings target,
        MessageSchemaResolution resolution,
        ProductionMessageValue item,
        ProductionMessageImportRequest request,
        CancellationToken cancellationToken)
    {
        var existing = await QueryDataSourceAsync(
            settings.Token,
            target.Id,
            new
            {
                property = resolution.DateProperty,
                date = new { equals = item.BusinessDate.ToString("yyyy-MM-dd") }
            },
            cancellationToken);
        if (!existing.Succeeded)
            return WriteFailure(item, $"读取已有记录失败：{existing.Message}");
        if (existing.Pages.Count > 1)
            return WriteFailure(item, $"{item.BusinessDate:yyyy-MM-dd} 已有重复日报记录，已停止写入。");
        if (request.CheckOnly)
        {
            var fieldChecks = InspectFieldChecks(
                existing.Pages.Count == 0 ? null : existing.Pages[0],
                resolution,
                item);
            if (fieldChecks.Any(field => field.Status == "exception"))
                return new(item.Index, item.BusinessDate, item.Kind, "error",
                    "部分解析值无法写入，请先修正异常字段。", fieldChecks);
            if (fieldChecks.Any(field => field.Status == "confirm"))
                return new(item.Index, item.BusinessDate, item.Kind, "existing",
                    "部分字段与 Notion 现值不同，需要确认是否覆盖。", fieldChecks);
            return new(item.Index, item.BusinessDate, item.Kind, "ready",
                existing.Pages.Count == 0
                    ? "数据库中没有同日期记录，可以写入。"
                    : fieldChecks.Any(field => field.Status == "new")
                        ? "同日期记录存在，可补写数据库空字段。"
                        : "同日期记录的相关字段与本次输入一致，无需覆盖。",
                fieldChecks);
        }

        var existingFields = existing.Pages.Count == 1 && !request.OverwriteExisting
            ? InspectExistingFields(existing.Pages[0], resolution, item)
            : null;
        IReadOnlyDictionary<string, string>? fieldChoices = null;
        request.FieldChoices?.TryGetValue(item.Index, out fieldChoices);
        var unresolved = existingFields?.ConflictKeys
            .Where(key => fieldChoices is null ||
                          !fieldChoices.TryGetValue(key, out var choice) ||
                          choice is not ("keep" or "use"))
            .ToArray() ?? [];
        if (unresolved.Length > 0)
            return new(item.Index, item.BusinessDate, item.Kind, "conflict",
                $"以下字段尚未选择处理方式：{string.Join("、", unresolved.Select(ProductionMessageFields.Label))}。");

        if (existing.Pages.Count == 1 &&
            !request.OverwriteExisting &&
            existingFields is { MissingKeys.Count: 0, ConflictKeys.Count: 0 })
            return new(item.Index, item.BusinessDate, item.Kind, "unchanged",
                "相关字段与本次输入一致，无需写入。");

        string? monthlyPageId = null;
        if (item.Kind == ProductionMessageKind.MaterialCutting)
        {
            var month = await ResolveCuttingMonthAsync(
                settings.Token,
                item,
                request.CuttingMonthlyPlans,
                resolution,
                cancellationToken);
            if (!month.Succeeded)
                return new(item.Index, item.BusinessDate, item.Kind, month.Status, month.Message);
            monthlyPageId = month.PageId;
        }

        if (!TryBuildMessageProperties(
                item,
                resolution,
                out var pageProperties,
                out var propertyMessage))
            return WriteFailure(item, propertyMessage);

        if (item.Kind == ProductionMessageKind.MaterialCutting)
        {
            if (!resolution.Properties.TryGetValue(
                    ProductionMessageFields.MonthlySummaryRelation,
                    out var monthlyRelation) ||
                string.IsNullOrWhiteSpace(monthlyPageId))
                return WriteFailure(item, "下料日库缺少“所属月份”关联字段，未写入。");
            pageProperties[monthlyRelation.Name] = RelationValue(monthlyPageId);
        }

        if (existing.Pages.Count == 1 && !request.OverwriteExisting)
        {
            var missingProperties = new Dictionary<string, object>(StringComparer.Ordinal)
            {
                [resolution.TitleProperty] = pageProperties[resolution.TitleProperty]
            };
            foreach (var relationKey in item.Kind == ProductionMessageKind.MaterialCutting
                         ? new[] { ProductionMessageFields.MonthlySummaryRelation }
                         : Array.Empty<string>())
            {
                if (resolution.Properties.TryGetValue(relationKey, out var relation) &&
                    pageProperties.TryGetValue(relation.Name, out var relationPayload))
                    missingProperties[relation.Name] = relationPayload;
            }
            foreach (var key in existingFields!.MissingKeys)
            {
                if (resolution.Properties.TryGetValue(key, out var property) &&
                    pageProperties.TryGetValue(property.Name, out var payload))
                    missingProperties[property.Name] = payload;
            }
            foreach (var key in existingFields.ConflictKeys.Where(key =>
                         fieldChoices is not null &&
                         fieldChoices.TryGetValue(key, out var choice) &&
                         choice == "use"))
            {
                if (resolution.Properties.TryGetValue(key, out var property) &&
                    pageProperties.TryGetValue(property.Name, out var payload))
                    missingProperties[property.Name] = payload;
            }

            var pageId = existing.Pages[0].GetProperty("id").GetString();
            if (string.IsNullOrWhiteSpace(pageId))
                return WriteFailure(item, "已有记录缺少页面标识，未写入。");
            await UpdatePageAsync(settings.Token, pageId, missingProperties, cancellationToken);

            return new(item.Index, item.BusinessDate, item.Kind,
                "updated",
                existingFields.MissingKeys.Count > 0 || existingFields.ConflictKeys.Count > 0
                    ? "已按逐字段选择补写或保留数据。"
                    : "相关字段与本次输入一致，无需覆盖。");
        }

        var operation = existing.Pages.Count == 1 ? "updated" : "created";
        if (existing.Pages.Count == 1)
        {
            var pageId = existing.Pages[0].GetProperty("id").GetString();
            if (string.IsNullOrWhiteSpace(pageId))
                return WriteFailure(item, "已有记录缺少页面标识，未写入。");
            await UpdatePageAsync(settings.Token, pageId, pageProperties, cancellationToken);
        }
        else
        {
            await CreateDataSourcePageAsync(
                settings.Token,
                target.Id,
                pageProperties,
                $"创建 {item.BusinessDate:yyyy-MM-dd} 日报",
                cancellationToken);
        }

        var message = operation == "updated" ? "已覆盖同日期记录" : "已创建日报记录";
        if (!string.IsNullOrWhiteSpace(propertyMessage))
            message += $"；{propertyMessage.TrimEnd('。')}";
        return new(item.Index, item.BusinessDate, item.Kind, operation, message + "。");
    }

    private sealed record CuttingMonthResolution(
        bool Succeeded,
        string Status,
        string Message,
        string? PageId);

    private async Task<CuttingMonthResolution> ResolveCuttingMonthAsync(
        string token,
        ProductionMessageValue item,
        IReadOnlyDictionary<string, double>? monthlyPlans,
        MessageSchemaResolution dailyResolution,
        CancellationToken cancellationToken)
    {
        if (!dailyResolution.Properties.TryGetValue(
                ProductionMessageFields.MonthlySummaryRelation,
                out var relation) ||
            string.IsNullOrWhiteSpace(relation.RelationDataSourceId))
            return new(false, "error", "下料日库缺少指向月库的“所属月份”Relation。", null);

        var monthlySourceId = NormalizeDataSourceId(relation.RelationDataSourceId);
        var schema = await GetSchemaAsync(token, monthlySourceId, cancellationToken);
        if (!schema.Succeeded)
            return new(false, "error", $"读取下料月库失败：{schema.Message}", null);

        var title = schema.Properties.FirstOrDefault(property => property.Type == "title");
        var date = schema.Properties.FirstOrDefault(property =>
            property.Type == "date" && property.Name.Contains("日期", StringComparison.OrdinalIgnoreCase));
        var plan = schema.Properties.FirstOrDefault(property =>
            property.Type == "number" && property.Name.Contains("计划", StringComparison.OrdinalIgnoreCase));
        if (title is null || date is null || plan is null)
            return new(false, "error", "下料月计划库缺少标题、日期或计划数值字段。", null);

        var monthStart = new DateTime(item.BusinessDate.Year, item.BusinessDate.Month, 1);
        var monthKey = monthStart.ToString("yyyy-MM");
        var pages = await QueryDataSourceAsync(token, monthlySourceId, new
        {
            property = date.Name,
            date = new { equals = monthStart.ToString("yyyy-MM-dd") }
        }, cancellationToken);
        if (!pages.Succeeded)
            return new(false, "error", $"读取 {monthKey} 下料月数据失败：{pages.Message}", null);
        if (pages.Pages.Count > 1)
            return new(false, "error", $"下料月库存在重复的 {monthKey} 记录。", null);
        if (pages.Pages.Count == 1)
        {
            var id = pages.Pages[0].GetProperty("id").GetString();
            return string.IsNullOrWhiteSpace(id)
                ? new(false, "error", $"{monthKey} 月记录缺少页面标识。", null)
                : new(true, string.Empty, string.Empty, id);
        }

        if (monthlyPlans is null || !monthlyPlans.TryGetValue(monthKey, out var expectedOutput))
            return new(false, "monthly_plan_required", $"{monthKey} 月数据不存在，请填写月预计产量。", null);

        var properties = new Dictionary<string, object>
        {
            [title.Name] = TitleValue(monthKey),
            [date.Name] = DateValue(monthStart),
            [plan.Name] = new { number = expectedOutput }
        };
        var pageId = await CreateDataSourcePageAsync(
            token,
            monthlySourceId,
            properties,
            $"创建 {monthKey} 下料月数据",
            cancellationToken);
        return string.IsNullOrWhiteSpace(pageId)
            ? new(false, "error", $"创建 {monthKey} 下料月数据后未返回页面标识。", null)
            : new(true, string.Empty, string.Empty, pageId);
    }

    private static bool TryBuildMessageProperties(
        ProductionMessageValue item,
        MessageSchemaResolution resolution,
        out Dictionary<string, object> properties,
        out string message)
    {
        properties = new()
        {
            [resolution.TitleProperty] = TitleValue(BuildMessageTitle(item)),
            [resolution.DateProperty] = DateValue(item.BusinessDate)
        };
        var missingValues = ProductionMessageFields.FieldsFor(item.Kind)
            .Where(resolution.Properties.ContainsKey)
            .Where(key => !item.Fields.TryGetValue(key, out var value) || string.IsNullOrWhiteSpace(value))
            .Select(key => resolution.Properties[key].Name)
            .ToArray();
        if (missingValues.Length > 0)
        {
            message = $"消息中未解析到 Notion 字段：{string.Join("、", missingValues)}。";
            return false;
        }
        var missingMappings = new List<string>();
        foreach (var pair in item.Fields)
        {
            if (pair.Key is ProductionMessageFields.PlanMonth or
                ProductionMessageFields.MonthlyPlanRelation or
                ProductionMessageFields.MonthlySummaryRelation or
                ProductionMessageFields.YearlySummaryRelation)
                continue;
            if (pair.Key == ProductionMessageFields.MonthlyReference &&
                item.Kind == ProductionMessageKind.TowerLineDaily)
                continue;
            if (pair.Key is ProductionMessageFields.RawMessage or
                ProductionMessageFields.MessageType or
                ProductionMessageFields.ParserVersion)
            {
                AddOptionalMappedProperty(properties, resolution, item.Fields, pair.Key);
                continue;
            }
            if (!resolution.Properties.TryGetValue(pair.Key, out var property))
            {
                missingMappings.Add(ProductionMessageFields.Label(pair.Key));
                continue;
            }
            if (!TryBuildNotionProperty(property, pair.Key, pair.Value, out var value, out var error))
            {
                message = $"{ProductionMessageFields.Label(pair.Key)}{error}";
                return false;
            }
            properties[property.Name] = value;
        }

        message = missingMappings.Count > 0
            ? $"未映射字段已跳过：{string.Join("、", missingMappings)}。"
            : string.Empty;
        return true;
    }

    private static void AddOptionalMappedProperty(
        IDictionary<string, object> properties,
        MessageSchemaResolution resolution,
        IReadOnlyDictionary<string, string> fields,
        string key)
    {
        if (!fields.TryGetValue(key, out var value) ||
            string.IsNullOrWhiteSpace(value) ||
            !resolution.Properties.TryGetValue(key, out var property) ||
            !TryBuildNotionProperty(property, key, value, out var payload, out _))
            return;
        properties[property.Name] = payload;
    }

    private static bool TryBuildNotionProperty(
        NotionPropertyOption property,
        string key,
        string value,
        out object payload,
        out string message)
    {
        payload = new { };
        message = string.Empty;
        if (property.Type == "number" || ProductionMessageFields.Numeric.Contains(key))
        {
            if (property.Type != "number" || !TryParseNumber(value, out var number))
            {
                message = "不是可写入的数字字段或数值无效。";
                return false;
            }
            payload = new { number };
            return true;
        }

        if (property.Type == "rich_text")
        {
            payload = new
            {
                rich_text = new[] { new { text = new { content = value[..Math.Min(1900, value.Length)] } } }
            };
            return true;
        }
        if (property.Type is "select" or "status")
        {
            payload = property.Type == "select"
                ? (object)new { select = new { name = value[..Math.Min(100, value.Length)] } }
                : new { status = new { name = value[..Math.Min(100, value.Length)] } };
            return true;
        }
        if (property.Type == "url")
        {
            payload = new { url = value };
            return true;
        }

        message = $"字段类型为 {property.Type}，当前不支持自动写入。";
        return false;
    }

    private static bool TryParseNumber(string value, out double number)
    {
        number = 0;
        var match = Regex.Match(value.Replace(",", string.Empty, StringComparison.Ordinal),
            @"[-+]?\d+(?:\.\d+)?");
        return match.Success &&
               double.TryParse(
                   match.Value,
                   NumberStyles.Float,
                   CultureInfo.InvariantCulture,
                   out number);
    }

    private static string BuildMessageTitle(ProductionMessageValue item)
        => item.Kind == ProductionMessageKind.MaterialCutting
            ? $"{item.BusinessDate:yyyy-MM-dd} 下料"
            : $"{item.BusinessDate:yyyy-MM-dd} {ProductionMessageKinds.Display(item.Kind)}";

    private static string BuildWeldTitle(DateTime date) => $"{date:yyyy-MM-dd}{WeldTitleSuffix}";

    private static string NormalizeWeldTitleDate(string title) =>
        title.EndsWith(WeldTitleSuffix, StringComparison.Ordinal)
            ? title[..^WeldTitleSuffix.Length]
            : title;

    private static string ReadExistingValue(JsonElement page, NotionPropertyOption property)
    {
        if (!page.TryGetProperty("properties", out var properties) ||
            !properties.TryGetProperty(property.Name, out var value))
            return string.Empty;

        if (property.Type == "number" &&
            value.TryGetProperty("number", out var number) &&
            number.ValueKind == JsonValueKind.Number)
            return number.GetDouble().ToString("0.################", CultureInfo.InvariantCulture);
        if (property.Type == "rich_text" && value.TryGetProperty("rich_text", out var richText))
            return string.Concat(richText.EnumerateArray().Select(item =>
                item.TryGetProperty("plain_text", out var text) ? text.GetString() : string.Empty));
        if (property.Type is "select" or "status" &&
            value.TryGetProperty(property.Type, out var option) &&
            option.ValueKind == JsonValueKind.Object &&
            option.TryGetProperty("name", out var name))
            return name.GetString() ?? string.Empty;
        if (property.Type == "url" && value.TryGetProperty("url", out var url))
            return url.GetString() ?? string.Empty;
        return string.Empty;
    }

    private static bool ValuesMatch(string existing, string incoming, string propertyType)
    {
        if (propertyType == "number" &&
            TryParseNumber(existing, out var existingNumber) &&
            TryParseNumber(incoming, out var incomingNumber))
            return Math.Abs(existingNumber - incomingNumber) < 0.000001;
        return string.Equals(existing.Trim(), incoming.Trim(), StringComparison.OrdinalIgnoreCase);
    }

    private static ExistingFieldInspection InspectExistingFields(
        JsonElement page,
        MessageSchemaResolution resolution,
        ProductionMessageValue item)
    {
        var missingKeys = new List<string>();
        var missingNames = new List<string>();
        var conflicts = new List<string>();
        var conflictKeys = new List<string>();
        foreach (var (key, incoming) in item.Fields)
        {
            if (!resolution.Properties.TryGetValue(key, out var property) ||
                key is ProductionMessageFields.PlanMonth or
                    ProductionMessageFields.MonthlyPlanRelation or
                    ProductionMessageFields.MonthlySummaryRelation or
                    ProductionMessageFields.YearlySummaryRelation ||
                !TryBuildNotionProperty(property, key, incoming, out _, out _))
                continue;
            var existing = ReadExistingValue(page, property);
            if (string.IsNullOrWhiteSpace(existing))
            {
                missingKeys.Add(key);
                missingNames.Add(property.Name);
            }
            else if (!ValuesMatch(existing, incoming, property.Type))
            {
                conflictKeys.Add(key);
                conflicts.Add(
                    $"{property.Name}：已有 {existing}，本次 {ProductionMessageFields.DisplayValue(key, incoming)}");
            }
        }
        return new(missingKeys, missingNames, conflictKeys, conflicts);
    }

    private static IReadOnlyList<ProductionMessageFieldCheck> InspectFieldChecks(
        JsonElement? page,
        MessageSchemaResolution resolution,
        ProductionMessageValue item)
    {
        var checks = new List<ProductionMessageFieldCheck>();
        var keys = ProductionMessageFields.FieldsFor(item.Kind)
            .Concat(resolution.Properties.Keys)
            .Concat(item.Fields.Keys)
            .Distinct(StringComparer.Ordinal);
        foreach (var key in keys)
        {
            if (!resolution.Properties.TryGetValue(key, out var property) ||
                key is "__title" or "__date" or
                    ProductionMessageFields.PlanMonth or
                    ProductionMessageFields.MonthlyPlanRelation or
                    ProductionMessageFields.MonthlySummaryRelation or
                    ProductionMessageFields.YearlySummaryRelation)
                continue;
            var existing = page is null ? string.Empty : ReadExistingValue(page.Value, property);
            if (!item.Fields.TryGetValue(key, out var incoming) || string.IsNullOrWhiteSpace(incoming))
            {
                checks.Add(new(key, property.Name, property.Type, string.Empty, existing,
                    "exception", $"消息中未解析到 {property.Name} 的值"));
                continue;
            }
            if (!TryBuildNotionProperty(property, key, incoming, out _, out var error))
            {
                checks.Add(new(key, property.Name, property.Type, incoming, existing, "exception", $"{property.Name}{error}"));
                continue;
            }
            var status = string.IsNullOrWhiteSpace(existing)
                ? "new"
                : ValuesMatch(existing, incoming, property.Type) ? "same" : "confirm";
            checks.Add(new(
                key,
                property.Name,
                property.Type,
                incoming,
                existing,
                status,
                status == "confirm" ? "与数据库现值不同" : string.Empty));
        }
        return checks;
    }

    private sealed record ExistingFieldInspection(
        IReadOnlyList<string> MissingKeys,
        IReadOnlyList<string> MissingNames,
        IReadOnlyList<string> ConflictKeys,
        IReadOnlyList<string> Conflicts);

    private static string SummarizeExisting(
        JsonElement page,
        MessageSchemaResolution resolution)
    {
        var title = ReadTitle(page, resolution.TitleProperty);
        var date = ReadDate(page, resolution.DateProperty);
        return string.IsNullOrWhiteSpace(title)
            ? date
            : $"{title}（{date}）";
    }

    private static ProductionMessageWriteResult WriteFailure(
        ProductionMessageValue item,
        string message) =>
        new(item.Index, item.BusinessDate, item.Kind, "error", message);

    private sealed record QueryPagesResult(bool Succeeded, string Message, List<JsonElement> Pages);

    private async Task<QueryPagesResult> QueryDataSourceAsync(
        string token, string dataSourceId, object filter, CancellationToken cancellationToken)
    {
        var pages = new List<JsonElement>();
        string? cursor = null;
        do
        {
            var body = new Dictionary<string, object?>
            {
                ["filter"] = filter,
                ["page_size"] = 100
            };
            if (!string.IsNullOrWhiteSpace(cursor)) body["start_cursor"] = cursor;
            using var request = CreateRequest(HttpMethod.Post, $"data_sources/{dataSourceId}/query",
                token, JsonSerializer.Serialize(body));
            using var response = await _client.SendAsync(request, cancellationToken);
            if (!response.IsSuccessStatusCode)
                return new(false, await ReadErrorAsync(response, cancellationToken), pages);
            using var document = JsonDocument.Parse(
                await response.Content.ReadAsStringAsync(cancellationToken));
            pages.AddRange(document.RootElement.GetProperty("results")
                .EnumerateArray().Select(page => page.Clone()));
            cursor = document.RootElement.GetProperty("has_more").GetBoolean()
                ? document.RootElement.GetProperty("next_cursor").GetString()
                : null;
        } while (!string.IsNullOrWhiteSpace(cursor));
        return new(true, string.Empty, pages);
    }

    private async Task<string?> CreateDataSourcePageAsync(
        string token, string dataSourceId, Dictionary<string, object> properties,
        string operation,
        CancellationToken cancellationToken)
    {
        using var request = CreateRequest(HttpMethod.Post, "pages", token,
            JsonSerializer.Serialize(new
            {
                parent = new { type = "data_source_id", data_source_id = dataSourceId },
                template = new { type = "default" },
                properties
            }));
        using var response = await _client.SendAsync(request, cancellationToken);
        if (!response.IsSuccessStatusCode)
            throw new InvalidOperationException(
                $"{operation}失败：{await ReadErrorAsync(response, cancellationToken)}");
        using var document = JsonDocument.Parse(
            await response.Content.ReadAsStringAsync(cancellationToken));
        return document.RootElement.GetProperty("id").GetString();
    }

    private async Task UpdatePageAsync(
        string token, string pageId, Dictionary<string, object> properties,
        CancellationToken cancellationToken)
    {
        using var request = CreateRequest(HttpMethod.Patch, $"pages/{pageId}", token,
            JsonSerializer.Serialize(new { properties }));
        using var response = await _client.SendAsync(request, cancellationToken);
        if (!response.IsSuccessStatusCode)
            throw new InvalidOperationException(await ReadErrorAsync(response, cancellationToken));
    }

    private static object TitleValue(string value) => new
    {
        title = new[] { new { text = new { content = value } } }
    };

    private static object DateValue(DateTime value) => new
    {
        date = new { start = value.ToString("yyyy-MM-dd"), end = (string?)null }
    };

    private static object DateRangeValue(DateTime start, DateTime end) => new
    {
        date = new { start = start.ToString("yyyy-MM-dd"), end = end.ToString("yyyy-MM-dd") }
    };

    private static object RelationValue(string pageId) => new
    {
        relation = new[] { new { id = pageId } }
    };

    private static string ReadTitle(JsonElement page, string propertyName)
    {
        if (!page.TryGetProperty("properties", out var properties) ||
            !properties.TryGetProperty(propertyName, out var property) ||
            !property.TryGetProperty("title", out var title)) return string.Empty;
        return string.Concat(title.EnumerateArray().Select(item =>
            item.TryGetProperty("plain_text", out var text) ? text.GetString() : string.Empty));
    }

    private static string ReadDate(JsonElement page, string propertyName)
    {
        if (!page.TryGetProperty("properties", out var properties) ||
            !properties.TryGetProperty(propertyName, out var property) ||
            !property.TryGetProperty("date", out var date) ||
            date.ValueKind != JsonValueKind.Object ||
            !date.TryGetProperty("start", out var start)) return string.Empty;
        return (start.GetString() ?? string.Empty).Split('T')[0];
    }

    private Task<NotionImportResult> CreateMissingRecordAsync(
        NotionTargetSettings target,
        NotionDailyWeldValue value,
        CancellationToken cancellationToken) =>
        Task.FromResult(NotionImportResult.Failure(
            $"{value.Date:yyyy-MM-dd} 尚无记录，创建功能暂未启用。"));

    private static NotionImportResult? Validate(NotionSettings settings, NotionTargetSettings? target)
    {
        if (string.IsNullOrWhiteSpace(settings.Token))
            return NotionImportResult.Failure("请先在“设置”中填写 Notion API 令牌。");
        if (target is null)
            return NotionImportResult.Failure("请先在“设置”中为每日焊接数据模拟绑定目标数据源。");
        if (string.IsNullOrWhiteSpace(target.TitleProperty) ||
            string.IsNullOrWhiteSpace(target.QuantityProperty))
            return NotionImportResult.Failure("当前数据源缺少标题或数量字段映射。");
        return null;
    }


    private static HttpRequestMessage CreateRequest(
        HttpMethod method,
        string path,
        string token,
        string? json = null)
    {
        var request = new HttpRequestMessage(method, path);
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token.Trim());
        request.Headers.Add("Notion-Version", ApiVersion);
        if (json is not null)
            request.Content = new StringContent(json, Encoding.UTF8, "application/json");
        return request;
    }

    private async Task<HttpResponseMessage> SendWithRetryAsync(
        Func<HttpRequestMessage> requestFactory,
        CancellationToken cancellationToken)
    {
        for (var attempt = 0; ; attempt++)
        {
            using var request = requestFactory();
            try
            {
                var response = await _client.SendAsync(request, cancellationToken);
                if (response.IsSuccessStatusCode ||
                    (response.StatusCode != HttpStatusCode.TooManyRequests &&
                     (int)response.StatusCode < 500) ||
                    attempt >= MaxTransientRetries)
                    return response;

                response.Dispose();
            }
            catch (HttpRequestException) when (attempt < MaxTransientRetries)
            {
            }

            await Task.Delay(TimeSpan.FromMilliseconds(300 * (attempt + 1)), cancellationToken);
        }
    }

    private async Task<NotionImportResult> SendAsync(
        Func<HttpRequestMessage> requestFactory,
        string successMessage,
        CancellationToken cancellationToken)
    {
        try
        {
            using var response = await SendWithRetryAsync(requestFactory, cancellationToken);
            return response.IsSuccessStatusCode
                ? NotionImportResult.Success(successMessage)
                : NotionImportResult.Failure(await ReadErrorAsync(response, cancellationToken));
        }
        catch (Exception ex)
        {
            return NotionImportResult.Failure($"连接失败：{ex.Message}");
        }
    }

    private static async Task<string> ReadErrorAsync(
        HttpResponseMessage response,
        CancellationToken cancellationToken)
    {
        var content = await response.Content.ReadAsStringAsync(cancellationToken);
        try
        {
            using var document = JsonDocument.Parse(content);
            if (document.RootElement.TryGetProperty("message", out var message))
                return message.GetString() ?? $"Notion 返回错误 {(int)response.StatusCode}";
        }
        catch (JsonException)
        {
        }
        return $"Notion 返回错误 {(int)response.StatusCode}";
    }
}
