using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.UI.Xaml.Controls;
using ProductionAssistant.Models;
using ProductionAssistant.Services;
using ProductionAssistant.Pages;

namespace ProductionAssistant;

internal sealed partial class PrototypeBridge
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web)
    {
        Converters = { new JsonStringEnumConverter() }
    };
    private readonly WebView2 _webView;
    private readonly Action<string> _navigate;
    private readonly Action<string, string> _ready;
    private CancellationTokenSource? _activeOperation;

    internal PrototypeBridge(WebView2 webView, Action<string> navigate, Action<string, string> ready)
    {
        _webView = webView;
        _navigate = navigate;
        _ready = ready;
        _webView.CoreWebView2.WebMessageReceived += OnMessageReceived;
    }

    private async void OnMessageReceived(
        object? sender,
        Microsoft.Web.WebView2.Core.CoreWebView2WebMessageReceivedEventArgs args)
    {
        if (!PrototypeBridgeProtocol.IsTrustedPrototypeSource(args.Source)) return;
        string id = string.Empty;
        try
        {
            using var document = JsonDocument.Parse(args.WebMessageAsJson);
            var root = document.RootElement;
            if (ReadString(root, "type") == "app.ready")
            {
                _ready(ReadString(root, "route"), ReadString(root, "navigation"));
                return;
            }
            id = ReadString(root, "id");
            var operation = ReadString(root, "operation");
            if (string.IsNullOrWhiteSpace(id) || !PrototypeBridgeProtocol.IsAllowed(operation))
                throw new InvalidOperationException("无效或不允许的界面请求。");
            var payload = root.TryGetProperty("payload", out var value) ? value.Clone() : default;

            if (operation == "production.cancel")
            {
                _activeOperation?.Cancel();
                Respond(id, new { cancelled = true });
                return;
            }

            _activeOperation?.Dispose();
            _activeOperation = new CancellationTokenSource();
            var result = await DispatchAsync(id, operation, payload, _activeOperation.Token);
            Respond(id, result);
        }
        catch (OperationCanceledException)
        {
            RespondError(id, "操作已取消。");
        }
        catch (Exception ex)
        {
            RespondError(id, PrototypeBridgeProtocol.SafeError(ex));
        }
    }

    private async Task<object?> DispatchAsync(string id, string operation, JsonElement payload, CancellationToken cancellationToken) =>
        operation switch
        {
            "app.navigateNative" => Navigate(payload),
            "settings.open" => OpenSettings(),
            "settings.close" => CloseSettings(),
            "settings.saveConnection" => await SaveSettingsConnectionAsync(payload, refresh: false, cancellationToken),
            "settings.refreshDataSources" => await SaveSettingsConnectionAsync(payload, refresh: true, cancellationToken),
            "settings.saveNotification" => SaveSettingsNotification(payload),
            "settings.testNotification" => await TestSettingsNotificationAsync(payload, cancellationToken),
            "settings.saveNotificationRules" => SaveSettingsNotificationRules(payload),
            "production.parse" => await ParseAsync(payload, cancellationToken),
            "production.check" => await ImportAsync(payload, checkOnly: true, cancellationToken),
            "production.write" => await ImportAsync(payload, checkOnly: false, cancellationToken),
            "production.getBindings" => GetBindings(),
            "production.saveBindings" => await SaveBindingsAsync(payload, cancellationToken),
            "weld.getState" => GetWeldState(),
            "weld.generate" => GenerateWeld(payload),
            "weld.saveBinding" => await SaveWeldBindingAsync(payload, cancellationToken),
            "weld.check" => await CheckWeldAsync(payload, cancellationToken),
            "weld.write" => await WriteWeldAsync(id, payload, cancellationToken),
            "database.getState" => GetDatabaseState(),
            "database.getSchema" => await GetDatabaseSchemaAsync(payload, cancellationToken),
            "database.inspect" => await InspectDatabaseAsync(payload, cancellationToken),
            "automation.list" => await ListAutomationTasksAsync(),
            "automation.setEnabled" => await SetAutomationTaskEnabledAsync(payload),
            "automation.delete" => await DeleteAutomationTaskAsync(payload),
            "notionFill.create" => CreateNotionFillJob(payload),
            "notionFill.get" => await GetNotionFillJobAsync(payload),
            "notionFill.save" => await SaveNotionFillJobAsync(payload),
            "notionFill.testSource" => await TestNotionFillSourceAsync(payload, cancellationToken),
            "notionFill.test" => await TestNotionFillJobAsync(payload, cancellationToken),
            "notionFill.runNow" => await RunNotionFillJobAsync(payload, cancellationToken),
            "notionFill.runs" => NotionFillRuns(payload),
            "daily.list" => await ListDailyJobsAsync(),
            "daily.create" => CreateDailyJob(payload),
            "daily.get" => await GetDailyJobAsync(payload),
            "daily.saveBasics" => await SaveDailyBasicsAsync(payload),
            "daily.saveTemplate" => await SaveDailyTemplateAsync(payload),
            "daily.getProperties" => await GetDailyPropertiesAsync(payload, cancellationToken),
            "daily.addField" => await AddDailyFieldAsync(payload, cancellationToken),
            "daily.preview" => await PreviewDailyReportAsync(payload, cancellationToken),
            "daily.test" => await TestDailyReportAsync(payload, cancellationToken),
            "daily.sendToday" => await SendDailyReportTodayAsync(payload, cancellationToken),
            "daily.setEnabled" => await SetDailyEnabledAsync(payload),
            "daily.delete" => await DeleteDailyJobAsync(payload),
            "daily.runs" => DailyRuns(payload),
            "report.getState" => AppServices.ReportCenter.GetState(),
            "report.saveConfig" => SaveReportCenterConfig(payload),
            "report.authenticate" => await AuthenticateReportCenterAsync(cancellationToken),
            "report.run" => await RunReportCenterAsync(id, payload, cancellationToken),
            _ => throw new InvalidOperationException("不允许的界面请求。")
        };

    private static async Task<object> AuthenticateReportCenterAsync(CancellationToken cancellationToken)
    {
        await AppServices.ReportCenter.CaptureAuthenticationAsync(cancellationToken);
        return new { authenticated = true };
    }

    private static object SaveReportCenterConfig(JsonElement payload) => AppServices.ReportCenter.SaveConfig(
        ReadString(payload, "sourceRoot"),
        ReadString(payload, "outputRoot"),
        ReadString(payload, "reportUrl"),
        ReadString(payload, "username"),
        ReadString(payload, "password"));

    private async Task<object> RunReportCenterAsync(string id, JsonElement payload, CancellationToken cancellationToken)
    {
        if (!DateOnly.TryParse(ReadString(payload, "startDate"), out var startDate) ||
            !DateOnly.TryParse(ReadString(payload, "endDate"), out var endDate))
            throw new InvalidOperationException("请选择有效的开始日期和结束日期。");
        var progress = new Progress<ReportRunProgress>(value => Post(new { id, type = "progress", data = value }));
        return await AppServices.ReportCenter.RunAsync(startDate, endDate, progress, cancellationToken);
    }

    private object Navigate(JsonElement payload)
    {
        var tag = ReadString(payload, "tag");
        if (!PrototypeBridgeProtocol.IsNavigationAllowed(tag))
            throw new InvalidOperationException("不允许导航到该页面。");
        _navigate(tag);
        return new { navigated = true };
    }

    private static async Task<object> ParseAsync(JsonElement payload, CancellationToken cancellationToken)
    {
        var text = ReadString(payload, "text");
        if (string.IsNullOrWhiteSpace(text)) throw new InvalidOperationException("请先粘贴生产消息。");
        var defaultDate = ReadDate(payload, "defaultDate");
        var segments = ProductionMessageParser.Split(text, defaultDate);
        var batch = segments.Count > 1;
        var parsedDrafts = segments.Select((segment, index) =>
        {
            var draft = ProductionMessageParser.Parse(segment, index + 1, defaultDate, !batch);
            if (batch && !segment.DateWasExplicit)
            {
                draft.BusinessDate = null;
                draft.BusinessDateText = string.Empty;
                draft.CanWrite = false;
                draft.StatusText = "待补日期";
                draft.WarningText = "批量消息中的每一段都需要业务日期。";
            }
            return (Draft: draft, segment.Text);
        }).ToArray();
        var settings = await RefreshProductionBindingsAsync(
            NotionSettingsStore.Load(),
            parsedDrafts.Select(item => item.Draft.Kind).ToHashSet(),
            cancellationToken);
        return parsedDrafts.Select(item =>
        {
            ApplyMappings(item.Draft, settings);
            ProductionMessageParser.ApplyMappedDatabaseFields(item.Draft, item.Text);
            ProductionMessageParser.ValidateDatabaseMapping(item.Draft);
            return ToDto(item.Draft);
        }).ToArray();
    }

    private static async Task<object> ImportAsync(
        JsonElement payload,
        bool checkOnly,
        CancellationToken cancellationToken)
    {
        var draftsElement = payload.GetProperty("drafts");
        var defaultDate = ReadDate(payload, "defaultDate");
        var overwrite = !checkOnly && payload.TryGetProperty("overwriteExisting", out var overwriteElement) && overwriteElement.GetBoolean();
        var drafts = draftsElement.EnumerateArray().Select(ToDraft).ToArray();
        var batch = drafts.Length > 1;
        var settings = NotionSettingsStore.Load();
        foreach (var draft in drafts)
        {
            ProductionMessageParser.ApplyEdits(draft, defaultDate, !batch, out _);
            ApplyMappings(draft, settings);
            ProductionMessageParser.ValidateDatabaseMapping(draft);
        }
        var converted = drafts.Select(draft =>
        {
            var succeeded = ProductionMessageParser.TryCreateValue(draft, out var value, out var message);
            return new { draft.Index, Succeeded = succeeded, Value = value, Message = message };
        }).ToArray();
        var invalid = converted.Where(item => !item.Succeeded).ToArray();
        if (invalid.Length > 0)
            throw new InvalidOperationException("整批已停止：" + string.Join("；", invalid.Select(item => $"第 {item.Index} 条 {item.Message}")));
        var values = converted.Select(item => item.Value!).ToArray();

        IReadOnlyDictionary<string, double>? monthlyPlans = null;
        if (payload.TryGetProperty("monthlyPlans", out var plansElement) && plansElement.ValueKind == JsonValueKind.Object)
            monthlyPlans = plansElement.EnumerateObject().ToDictionary(item => item.Name, item => item.Value.GetDouble(), StringComparer.Ordinal);
        IReadOnlyDictionary<int, IReadOnlyDictionary<string, string>>? fieldChoices = null;
        if (payload.TryGetProperty("fieldChoices", out var choicesElement) && choicesElement.ValueKind == JsonValueKind.Object)
            fieldChoices = choicesElement.EnumerateObject()
                .Select(item => (Parts: item.Name.Split(':', 2), Choice: item.Value.GetString() ?? string.Empty))
                .Where(item => item.Parts.Length == 2 && int.TryParse(item.Parts[0], out _))
                .GroupBy(item => int.Parse(item.Parts[0]))
                .ToDictionary(
                    group => group.Key,
                    group => (IReadOnlyDictionary<string, string>)group.ToDictionary(item => item.Parts[1], item => item.Choice, StringComparer.Ordinal));
        var result = await AppServices.Notion.ImportProductionMessagesAsync(
            new ProductionMessageImportRequest(values, overwrite, monthlyPlans, checkOnly, fieldChoices), cancellationToken);
        var requiredMonths = result.Items.Where(item => item.Status == "monthly_plan_required")
            .Select(item => item.BusinessDate.ToString("yyyy-MM")).Distinct().ToArray();
        return new
        {
            result.Succeeded,
            result.Message,
            items = result.Items.Select(item => new
            {
                item.Index,
                businessDate = item.BusinessDate.ToString("yyyy-MM-dd"),
                item.Status,
                item.Message,
                fields = item.Fields
            }),
            requiredMonths
        };
    }

    private static object GetBindings()
    {
        var settings = NotionSettingsStore.Load();
        var catalog = DatabaseSourceCatalog.Create(AppServices.DatabaseProvider.GetSources());
        return new
        {
            configured = !string.IsNullOrWhiteSpace(settings.Token),
            cutting = ToBindingTarget(FindTarget(settings, ProductionMessageKinds.CuttingModuleKey), settings.CachedDataSources),
            towerDaily = ToBindingTarget(FindTarget(settings, ProductionMessageKinds.TowerDailyModuleKey), settings.CachedDataSources),
            usesBusinessSections = catalog.UsesBusinessSections,
            businessSections = catalog.BusinessSections,
            sources = catalog.Sources.Select(source => new { source.Id, source.Name, source.Path, businessSection = source.BusinessSection }),
            selected = new Dictionary<string, string>
            {
                ["cutting"] = CurrentTargetId(settings, ProductionMessageKinds.CuttingModuleKey),
                ["towerDaily"] = CurrentTargetId(settings, ProductionMessageKinds.TowerDailyModuleKey)
            }
        };
    }

    private static string CurrentTargetId(NotionSettings settings, string key)
    {
        var id = FindTarget(settings, key)?.Id ?? string.Empty;
        return settings.CachedDataSources.Any(source => source.Id == id) ? id : string.Empty;
    }

    private static object ToBindingTarget(
        NotionTargetSettings? target,
        IReadOnlyList<NotionDataSourceOption> sources) => new
    {
        bound = target is not null && sources.Any(source => source.Id == target.Id),
        name = target?.Name ?? string.Empty,
        path = target?.Path ?? string.Empty
    };

    private static async Task<object> SaveBindingsAsync(JsonElement payload, CancellationToken cancellationToken)
    {
        var settings = NotionSettingsStore.Load();
        if (string.IsNullOrWhiteSpace(settings.Token)) throw new InvalidOperationException("请先在原版设置页配置 Notion 连接。");
        var selections = new Dictionary<string, string>
        {
            ["cutting"] = ReadString(payload, "cutting"),
            ["towerDaily"] = ReadString(payload, "towerDaily")
        };
        if (string.IsNullOrWhiteSpace(selections["towerDaily"]))
            throw new InvalidOperationException("请选择塔筒产线主数据库。");
        var sources = selections.ToDictionary(pair => pair.Key,
            pair => string.IsNullOrWhiteSpace(pair.Value) ? null : settings.CachedDataSources.FirstOrDefault(source => source.Id == pair.Value));
        if (sources.Where(pair => !string.IsNullOrWhiteSpace(selections[pair.Key])).Any(pair => pair.Value is null))
            throw new InvalidOperationException("选择的数据源已不在缓存中，请先刷新 Notion 数据源。");

        var bindings = new List<NotionTargetSettings>();
        if (sources["cutting"] is not null)
            bindings.Add(await BuildBindingAsync(settings.Token, sources["cutting"]!, ProductionMessageKinds.CuttingModuleKey, "生产消息 · 下料日报库", ProductionMessageKind.MaterialCutting, cancellationToken));
        bindings.Add(await BuildBindingAsync(settings.Token, sources["towerDaily"]!, ProductionMessageKinds.TowerDailyModuleKey, "生产消息 · 塔筒产线日报库", ProductionMessageKind.TowerLineDaily, cancellationToken));
        settings.Targets.RemoveAll(target => target.ModuleKey == ProductionMessageKinds.CuttingModuleKey && sources["cutting"] is null);
        settings.Targets.RemoveAll(target => target.ModuleKey is ProductionMessageKinds.TowerMonthlyModuleKey or ProductionMessageKinds.TowerYearlyModuleKey);
        foreach (var binding in bindings)
        {
            var index = settings.Targets.FindIndex(target => target.ModuleKey == binding.ModuleKey);
            if (index < 0) settings.Targets.Add(binding); else settings.Targets[index] = binding;
        }
        NotionSettingsStore.Save(settings);
        return new { saved = true };
    }

    private static async Task<NotionTargetSettings> BuildBindingAsync(
        string token, NotionDataSourceOption source, string moduleKey, string moduleName,
        ProductionMessageKind kind, CancellationToken cancellationToken)
    {
        var schema = await AppServices.Notion.GetSchemaAsync(token, source.Id, cancellationToken);
        if (!schema.Succeeded) throw new InvalidOperationException($"{source.Name}：{schema.Message}");
        var title = schema.Properties.FirstOrDefault(property => property.Type == "title");
        var date = schema.Properties.FirstOrDefault(property => property.Type == "date" &&
            (property.Name.Contains("日期", StringComparison.Ordinal) || property.Name.Contains("时间", StringComparison.Ordinal)))
            ?? schema.Properties.FirstOrDefault(property => property.Type == "date");
        if (title is null || date is null) throw new InvalidOperationException($"{source.Name} 缺少标题或日期字段。");
        var mapping = ProductionMessagePage.AutoMap(schema.Properties, kind);
        AddDynamicPropertyMappings(mapping, schema.Properties, title.Name, date?.Name);
        if (kind == ProductionMessageKind.MaterialCutting)
        {
            var monthly = schema.Properties.FirstOrDefault(property =>
                property.Type == "relation" && property.Name.Contains("月份", StringComparison.Ordinal));
            if (monthly is not null) mapping[ProductionMessageFields.MonthlySummaryRelation] = monthly.Name;
        }
        return new NotionTargetSettings { ModuleKey = moduleKey, ModuleName = moduleName, Id = source.Id, Name = source.Name, Path = source.Path, TitleProperty = title.Name, DateProperty = date?.Name ?? string.Empty, PropertyMappings = mapping };
    }

    private static async Task<NotionSettings> RefreshProductionBindingsAsync(
        NotionSettings settings,
        IReadOnlySet<ProductionMessageKind> kinds,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(settings.Token)) return settings;
        var refreshed = new List<NotionTargetSettings>();
        if (kinds.Contains(ProductionMessageKind.MaterialCutting) &&
            FindCurrentSource(settings, ProductionMessageKinds.CuttingModuleKey) is { } cutting)
            refreshed.Add(await BuildBindingAsync(settings.Token,
                cutting.Source,
                cutting.Target.ModuleKey, cutting.Target.ModuleName, ProductionMessageKind.MaterialCutting,
                cancellationToken));
        if (kinds.Contains(ProductionMessageKind.TowerLineDaily) &&
            FindCurrentSource(settings, ProductionMessageKinds.TowerDailyModuleKey) is { } daily)
            refreshed.Add(await BuildBindingAsync(settings.Token,
                daily.Source,
                daily.Target.ModuleKey, daily.Target.ModuleName, ProductionMessageKind.TowerLineDaily,
                cancellationToken));
        foreach (var target in refreshed)
        {
            var index = settings.Targets.FindIndex(item => item.ModuleKey == target.ModuleKey);
            if (index >= 0) settings.Targets[index] = target;
        }
        if (refreshed.Count > 0) NotionSettingsStore.Save(settings);
        return settings;
    }

    private static (NotionTargetSettings Target, NotionDataSourceOption Source)? FindCurrentSource(
        NotionSettings settings,
        string key)
    {
        var target = FindTarget(settings, key);
        var source = target is null
            ? null
            : settings.CachedDataSources.FirstOrDefault(item => item.Id == target.Id);
        return target is not null && source is not null ? (target, source) : null;
    }

    private static void AddDynamicPropertyMappings(
        IDictionary<string, string> mapping,
        IReadOnlyList<NotionPropertyOption> properties,
        string titleProperty,
        string? dateProperty)
    {
        var mappedNames = mapping.Values.ToHashSet(StringComparer.Ordinal);
        foreach (var property in properties.Where(property =>
                     property.Name != titleProperty && property.Name != dateProperty &&
                     property.Type is "number" or "rich_text" or "select" or "status" or "url" &&
                     !mappedNames.Contains(property.Name)))
            mapping[ProductionMessageFields.DatabasePropertyKey(property.Name)] = property.Name;
    }

    private static ProductionMessageDraft ToDraft(JsonElement element)
    {
        var kind = Enum.TryParse<ProductionMessageKind>(ReadString(element, "kind"), out var parsedKind) ? parsedKind : ProductionMessageKind.Unknown;
        var draft = new ProductionMessageDraft
        {
            Index = element.GetProperty("index").GetInt32(),
            OriginalText = ReadString(element, "originalText"),
            ParserVersion = ReadString(element, "parserVersion"),
            Kind = kind,
            TypeDisplay = ProductionMessageKinds.DatabaseDisplay(kind),
            BusinessDate = DateTime.TryParse(ReadString(element, "businessDate"), out var date) ? date.Date : null,
            BusinessDateText = ReadString(element, "businessDate")
        };
        if (element.TryGetProperty("fields", out var fields))
            draft.SetFields(fields.EnumerateObject().Select(property => new KeyValuePair<string, string>(property.Name, property.Value.GetString() ?? string.Empty)));
        draft.FieldsText = ProductionMessageParser.FormatFields(draft.Kind, draft.Fields, draft.PlanMonth);
        return draft;
    }

    private static object ToDto(ProductionMessageDraft draft) => new
    {
        draft.Index, draft.OriginalText, draft.ParserVersion,
        kind = draft.Kind.ToString(),
        businessDate = draft.BusinessDate?.ToString("yyyy-MM-dd") ?? string.Empty,
        draft.TypeDisplay,
        fields = draft.Fields,
        previewFields = draft.PreviewFields,
        draft.StatusText, draft.WarningText, draft.CanWrite
    };

    private static void ApplyMappings(ProductionMessageDraft draft, NotionSettings settings) =>
        draft.SetDatabaseFieldMappings(new Dictionary<ProductionMessageKind, IReadOnlyDictionary<string, string>>
        {
            [ProductionMessageKind.MaterialCutting] = FindTarget(settings, ProductionMessageKinds.CuttingModuleKey)?.PropertyMappings ?? new Dictionary<string, string>(),
            [ProductionMessageKind.TowerLineDaily] = FindTarget(settings, ProductionMessageKinds.TowerDailyModuleKey)?.PropertyMappings ?? new Dictionary<string, string>()
        });

    private static NotionTargetSettings? FindTarget(NotionSettings settings, string key) => settings.Targets.FirstOrDefault(target => target.ModuleKey == key);
    private static string ReadString(JsonElement element, string name) => element.ValueKind == JsonValueKind.Object && element.TryGetProperty(name, out var value) ? value.GetString() ?? string.Empty : string.Empty;
    private static DateTime ReadDate(JsonElement element, string name) => DateTime.TryParse(ReadString(element, name), out var date) ? date.Date : DateTime.Today;
    private void Respond(string id, object? data) => Post(new { id, ok = true, data });
    private void RespondError(string id, string error) => Post(new { id, ok = false, error });
    private void Post(object response) => _webView.CoreWebView2.PostWebMessageAsJson(JsonSerializer.Serialize(response, JsonOptions));
}
