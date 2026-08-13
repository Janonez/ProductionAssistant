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
    private static readonly string[] TowerKeys =
    [
        ProductionMessageKinds.TowerDailyModuleKey,
        ProductionMessageKinds.TowerMonthlyModuleKey,
        ProductionMessageKinds.TowerYearlyModuleKey
    ];

    private readonly WebView2 _webView;
    private readonly Action<string> _navigate;
    private CancellationTokenSource? _activeOperation;

    internal PrototypeBridge(WebView2 webView, Action<string> navigate)
    {
        _webView = webView;
        _navigate = navigate;
        _webView.CoreWebView2.WebMessageReceived += OnMessageReceived;
    }

    private async void OnMessageReceived(
        object? sender,
        Microsoft.Web.WebView2.Core.CoreWebView2WebMessageReceivedEventArgs args)
    {
        string id = string.Empty;
        try
        {
            using var document = JsonDocument.Parse(args.WebMessageAsJson);
            var root = document.RootElement;
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
            var result = await DispatchAsync(operation, payload, _activeOperation.Token);
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

    private async Task<object?> DispatchAsync(string operation, JsonElement payload, CancellationToken cancellationToken) =>
        operation switch
        {
            "app.getOverview" => GetOverview(),
            "app.navigateNative" => Navigate(payload),
            "production.parse" => Parse(payload),
            "production.check" => await ImportAsync(payload, checkOnly: true, cancellationToken),
            "production.write" => await ImportAsync(payload, checkOnly: false, cancellationToken),
            "production.getBindings" => GetBindings(),
            "production.saveBindings" => await SaveBindingsAsync(payload, cancellationToken),
            "daily.list" => await ListDailyJobsAsync(),
            "daily.create" => CreateDailyJob(),
            "daily.get" => await GetDailyJobAsync(payload),
            "daily.saveBasics" => await SaveDailyBasicsAsync(payload),
            "daily.saveTemplate" => await SaveDailyTemplateAsync(payload),
            "daily.getProperties" => await GetDailyPropertiesAsync(payload, cancellationToken),
            "daily.addField" => await AddDailyFieldAsync(payload, cancellationToken),
            "daily.saveCredentials" => await SaveDailyCredentialsAsync(payload),
            "daily.checkConnection" => await CheckDailyConnectionAsync(payload, cancellationToken),
            "daily.preview" => await PreviewDailyReportAsync(payload, cancellationToken),
            "daily.test" => await TestDailyReportAsync(payload, cancellationToken),
            "daily.setEnabled" => await SetDailyEnabledAsync(payload),
            "daily.delete" => await DeleteDailyJobAsync(payload),
            "daily.runs" => DailyRuns(payload),
            _ => throw new InvalidOperationException("不允许的界面请求。")
        };

    private static object GetOverview()
    {
        var settings = NotionSettingsStore.Load();
        return new
        {
            notionConfigured = !string.IsNullOrWhiteSpace(settings.Token),
            productionMessageReady = IsBound(FindTarget(settings, ProductionMessageKinds.TowerDailyModuleKey)),
            dailyWeldReady = IsBound(FindTarget(settings, "daily-weld-simulation")),
            dailyReportJobs = DailyReportSettingsStore.LoadCatalog().Jobs.Count
        };
    }

    private object Navigate(JsonElement payload)
    {
        var tag = ReadString(payload, "tag");
        var allowed = new[] { "home", "plan-pdf", "production-meeting", "daily-weld", "daily-report", "settings" };
        if (!allowed.Contains(tag, StringComparer.Ordinal))
            throw new InvalidOperationException("不允许导航到该页面。");
        _navigate(tag);
        return new { navigated = true };
    }

    private static object Parse(JsonElement payload)
    {
        var text = ReadString(payload, "text");
        if (string.IsNullOrWhiteSpace(text)) throw new InvalidOperationException("请先粘贴生产消息。");
        var defaultDate = ReadDate(payload, "defaultDate");
        var segments = ProductionMessageParser.Split(text, defaultDate);
        var batch = segments.Count > 1;
        var settings = NotionSettingsStore.Load();
        var drafts = segments.Select((segment, index) =>
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
            ApplyMappings(draft, settings);
            return ToDto(draft);
        }).ToArray();
        return drafts;
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
        foreach (var draft in drafts)
            ProductionMessageParser.ApplyEdits(draft, defaultDate, !batch, out _);
        var values = drafts.Select(draft =>
            ProductionMessageParser.TryCreateValue(draft, out var value, out _) ? value : null)
            .Where(value => value is not null).Cast<ProductionMessageValue>().ToArray();
        if (values.Length == 0) throw new InvalidOperationException("没有可写入的记录，请先修正日期、类型或关键数值。");

        IReadOnlyDictionary<string, double>? monthlyPlans = null;
        if (payload.TryGetProperty("monthlyPlans", out var plansElement) && plansElement.ValueKind == JsonValueKind.Object)
            monthlyPlans = plansElement.EnumerateObject().ToDictionary(item => item.Name, item => item.Value.GetDouble(), StringComparer.Ordinal);
        var result = await AppServices.Notion.ImportProductionMessagesAsync(
            new ProductionMessageImportRequest(values, overwrite, monthlyPlans, checkOnly), cancellationToken);
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
                item.Message
            }),
            requiredMonths
        };
    }

    private static object GetBindings()
    {
        var settings = NotionSettingsStore.Load();
        return new
        {
            configured = !string.IsNullOrWhiteSpace(settings.Token),
            cutting = ToBindingTarget(FindTarget(settings, ProductionMessageKinds.CuttingModuleKey)),
            towerDaily = ToBindingTarget(FindTarget(settings, ProductionMessageKinds.TowerDailyModuleKey)),
            towerMonthly = ToBindingTarget(FindTarget(settings, ProductionMessageKinds.TowerMonthlyModuleKey)),
            towerYearly = ToBindingTarget(FindTarget(settings, ProductionMessageKinds.TowerYearlyModuleKey)),
            sources = settings.CachedDataSources.Select(source => new { source.Id, source.Name, source.Path }),
            selected = new Dictionary<string, string>
            {
                ["cutting"] = FindTarget(settings, ProductionMessageKinds.CuttingModuleKey)?.Id ?? string.Empty,
                ["towerDaily"] = FindTarget(settings, ProductionMessageKinds.TowerDailyModuleKey)?.Id ?? string.Empty,
                ["towerMonthly"] = FindTarget(settings, ProductionMessageKinds.TowerMonthlyModuleKey)?.Id ?? string.Empty,
                ["towerYearly"] = FindTarget(settings, ProductionMessageKinds.TowerYearlyModuleKey)?.Id ?? string.Empty
            }
        };
    }

    private static object ToBindingTarget(NotionTargetSettings? target) => new
    {
        bound = IsBound(target),
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
            ["towerDaily"] = ReadString(payload, "towerDaily"),
            ["towerMonthly"] = ReadString(payload, "towerMonthly"),
            ["towerYearly"] = ReadString(payload, "towerYearly")
        };
        if (new[] { "towerDaily", "towerMonthly", "towerYearly" }.Any(key => string.IsNullOrWhiteSpace(selections[key])))
            throw new InvalidOperationException("请选择塔筒日、月、年三个数据库。");
        var sources = selections.ToDictionary(pair => pair.Key,
            pair => string.IsNullOrWhiteSpace(pair.Value) ? null : settings.CachedDataSources.FirstOrDefault(source => source.Id == pair.Value));
        if (sources.Where(pair => !string.IsNullOrWhiteSpace(selections[pair.Key])).Any(pair => pair.Value is null))
            throw new InvalidOperationException("选择的数据源已不在缓存中，请先刷新 Notion 数据源。");

        var monthlyId = sources["towerMonthly"]!.Id;
        var yearlyId = sources["towerYearly"]!.Id;
        var bindings = new List<NotionTargetSettings>();
        if (sources["cutting"] is not null)
            bindings.Add(await BuildBindingAsync(settings.Token, sources["cutting"]!, ProductionMessageKinds.CuttingModuleKey, "生产消息 · 下料日报库", ProductionMessageKind.MaterialCutting, false, string.Empty, string.Empty, cancellationToken));
        bindings.Add(await BuildBindingAsync(settings.Token, sources["towerDaily"]!, ProductionMessageKinds.TowerDailyModuleKey, "生产消息 · 塔筒产线日报库", ProductionMessageKind.TowerLineDaily, false, monthlyId, yearlyId, cancellationToken));
        bindings.Add(await BuildBindingAsync(settings.Token, sources["towerMonthly"]!, ProductionMessageKinds.TowerMonthlyModuleKey, "生产消息 · 塔筒产线每月累计库", ProductionMessageKind.TowerLineDaily, true, string.Empty, string.Empty, cancellationToken));
        bindings.Add(await BuildBindingAsync(settings.Token, sources["towerYearly"]!, ProductionMessageKinds.TowerYearlyModuleKey, "生产消息 · 塔筒产线每年累计库", ProductionMessageKind.TowerLineDaily, true, string.Empty, string.Empty, cancellationToken));
        settings.Targets.RemoveAll(target => target.ModuleKey == ProductionMessageKinds.CuttingModuleKey && sources["cutting"] is null);
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
        ProductionMessageKind kind, bool summary, string monthlyId, string yearlyId,
        CancellationToken cancellationToken)
    {
        var schema = await AppServices.Notion.GetSchemaAsync(token, source.Id, cancellationToken);
        if (!schema.Succeeded) throw new InvalidOperationException($"{source.Name}：{schema.Message}");
        var title = schema.Properties.FirstOrDefault(property => property.Type == "title");
        var date = schema.Properties.FirstOrDefault(property => property.Type == "date" &&
            (property.Name.Contains("日期", StringComparison.Ordinal) || property.Name.Contains("时间", StringComparison.Ordinal)))
            ?? schema.Properties.FirstOrDefault(property => property.Type == "date");
        if (title is null || (!summary && date is null)) throw new InvalidOperationException($"{source.Name} 缺少标题或日期字段。");
        var mapping = ProductionMessagePage.AutoMap(schema.Properties, kind);
        if (!summary)
        {
            var monthly = schema.Properties.FirstOrDefault(property => property.Type == "relation" && ProductionMessagePage.SameDataSourceId(property.RelationDataSourceId, monthlyId));
            var yearly = schema.Properties.FirstOrDefault(property => property.Type == "relation" && ProductionMessagePage.SameDataSourceId(property.RelationDataSourceId, yearlyId));
            if (monthly is not null) mapping[ProductionMessageFields.MonthlySummaryRelation] = monthly.Name;
            if (yearly is not null) mapping[ProductionMessageFields.YearlySummaryRelation] = yearly.Name;
        }
        return new NotionTargetSettings { ModuleKey = moduleKey, ModuleName = moduleName, Id = source.Id, Name = source.Name, Path = source.Path, TitleProperty = title.Name, DateProperty = date?.Name ?? string.Empty, PropertyMappings = mapping };
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
    private static bool IsBound(NotionTargetSettings? target) => target is not null && !string.IsNullOrWhiteSpace(target.Id);
    private static string ReadString(JsonElement element, string name) => element.ValueKind == JsonValueKind.Object && element.TryGetProperty(name, out var value) ? value.GetString() ?? string.Empty : string.Empty;
    private static DateTime ReadDate(JsonElement element, string name) => DateTime.TryParse(ReadString(element, name), out var date) ? date.Date : DateTime.Today;
    private void Respond(string id, object? data) => Post(new { id, ok = true, data });
    private void RespondError(string id, string error) => Post(new { id, ok = false, error });
    private void Post(object response) => _webView.CoreWebView2.PostWebMessageAsJson(JsonSerializer.Serialize(response, JsonOptions));
}
