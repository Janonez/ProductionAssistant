using System.Collections.ObjectModel;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using ProductionAssistant.Models;
using ProductionAssistant.Services;

namespace ProductionAssistant.Pages;

public sealed partial class ProductionMessagePage : Page
{
    private static readonly IReadOnlyDictionary<string, string[]> MappingAliases =
        new Dictionary<string, string[]>(StringComparer.Ordinal)
        {
            [ProductionMessageFields.Process] = ["工序", "动作", "工艺"],
            [ProductionMessageFields.Shift] = ["班次", "班组"],
            [ProductionMessageFields.Project] = ["项目号", "项目", "产品"],
            [ProductionMessageFields.Material] = ["材料", "材质", "规格"],
            [ProductionMessageFields.PieceCount] = ["张数", "件数", "数量", "件"],
            [ProductionMessageFields.Weight] = ["日模拟产量/吨", "重量", "吨位"],
            [ProductionMessageFields.Unit] = ["单位"],
            [ProductionMessageFields.SheetInStock] = ["板材入库", "板材入库量", "板材"],
            [ProductionMessageFields.ProfileInStock] = ["型材入库", "型材入库量", "型材"],
            [ProductionMessageFields.Cutting] = ["下料量", "下料"],
            [ProductionMessageFields.Welding] = ["焊接量", "焊接"],
            [ProductionMessageFields.DailyOutput] = ["产出情况（套）", "当日产出", "日产出", "当日产量"],
            [ProductionMessageFields.OutputSections] = ["产出情况（节）", "产出节数", "产出", "完成节数", "节数", "出塔节数"],
            [ProductionMessageFields.RawMessage] = ["原始消息", "原文", "消息原文"],
            [ProductionMessageFields.MessageType] = ["消息类型", "类型"],
            [ProductionMessageFields.ParserVersion] = ["解析器版本", "解析版本"]
        };

    public ObservableCollection<ProductionMessageDraft> Messages { get; } = [];

    private readonly INotionImportService _notionService = AppServices.Notion;
    private NotionSettings _settings = new();
    private bool _busy;
    private bool _overwriteExistingRequired;

    private static readonly string[] TowerBindingKeys =
    [
        ProductionMessageKinds.TowerDailyModuleKey,
        ProductionMessageKinds.TowerMonthlyModuleKey,
        ProductionMessageKinds.TowerYearlyModuleKey
    ];

    public ProductionMessagePage()
    {
        InitializeComponent();
        MessagesList.ItemsSource = Messages;
        NavigationCacheMode = Microsoft.UI.Xaml.Navigation.NavigationCacheMode.Required;
        DefaultDatePicker.Date = DateTimeOffset.Now;
        Loaded += ProductionMessagePage_Loaded;
    }

    private void ProductionMessagePage_Loaded(object sender, RoutedEventArgs e) =>
        RefreshBindingStatus();

    private async void ParseButton_Click(object sender, RoutedEventArgs e)
    {
        var text = MessageInputBox.Text;
        SetOverwriteState(false);
        if (string.IsNullOrWhiteSpace(text))
        {
            await ShowResultDialogAsync("没有消息", "请先粘贴一条或多段生产消息。");
            return;
        }

        var defaultDate = (DefaultDatePicker.Date ?? DateTimeOffset.Now).Date;
        var segments = ProductionMessageParser.Split(text, defaultDate);
        var batch = segments.Count > 1;
        Messages.Clear();
        for (var index = 0; index < segments.Count; index++)
        {
            var segment = segments[index];
            var draft = ProductionMessageParser.Parse(
                segment,
                index + 1,
                defaultDate,
                allowDefaultDate: !batch && segments.Count == 1);
            if (batch && !segment.DateWasExplicit)
            {
                draft.BusinessDate = null;
                draft.BusinessDateText = string.Empty;
                draft.CanWrite = false;
                draft.StatusText = "待补日期";
                draft.WarningText = "已识别为多条消息；每段都需要业务日期，请补充后再写入。";
                draft.RefreshSummary();
            }
            ApplyPreviewMappings(draft);
            Messages.Add(draft);
        }

        UpdatePreviewStatus();
        await CheckParsedMessagesAsync();
    }

    private async Task CheckParsedMessagesAsync()
    {
        var values = new List<ProductionMessageValue>();
        foreach (var draft in Messages)
            if (ProductionMessageParser.TryCreateValue(draft, out var value, out _))
                values.Add(value);
        if (values.Count == 0) return;

        SetBusy(true, showImportProgress: true);
        SetResultStatus("正在查询数据库", $"正在检查 {values.Count} 条解析结果", InfoBarSeverity.Informational);
        try
        {
            var result = await _notionService.ImportProductionMessagesAsync(
                new ProductionMessageImportRequest(values, OverwriteExisting: false, CheckOnly: true));
            foreach (var item in result.Items)
            {
                var draft = Messages.FirstOrDefault(message => message.Index == item.Index);
                if (draft is null) continue;
                draft.StatusText = item.Status switch
                {
                    "ready" => "可写入",
                    "existing" => "已存在",
                    _ => "查询失败"
                };
                draft.WarningText = item.Status == "ready" ? string.Empty : item.Message;
                draft.CanWrite = item.Status is "ready" or "existing";
                draft.RefreshSummary();
            }

            var hasExisting = result.Items.Any(item => item.Status == "existing");
            SetOverwriteState(hasExisting);
            SetResultStatus(
                hasExisting ? "发现已有数据" : result.Succeeded ? "数据库检查完成" : "数据库检查有失败项",
                result.Message,
                hasExisting || !result.Succeeded ? InfoBarSeverity.Warning : InfoBarSeverity.Success);
        }
        catch (Exception ex)
        {
            SetResultStatus("数据库检查失败", ex.Message, InfoBarSeverity.Error);
        }
        finally
        {
            SetBusy(false);
        }
    }

    private async void BindSourcesButton_Click(object sender, RoutedEventArgs e)
    {
        SetBusy(true);
        try
        {
            _settings = NotionSettingsStore.Load();
            if (string.IsNullOrWhiteSpace(_settings.Token))
            {
                await ShowResultDialogAsync(
                    "需要配置 Notion",
                    "请先到“设置 → Notion 连接”填写令牌并刷新数据源。");
                return;
            }

            if (HasCompleteTowerBindings(_settings) &&
                IsBound(FindTarget(_settings, ProductionMessageKinds.CuttingModuleKey)))
            {
                await VerifyProductionBindingsAsync();
                return;
            }

            var sources = _settings.CachedDataSources
                .OrderBy(source => source.Path)
                .ToArray();
            if (sources.Length == 0)
            {
                await ShowResultDialogAsync(
                    "尚未获取数据源",
                    "请先到“设置 → Notion 连接”保存连接并刷新数据源。");
                return;
            }

            var cuttingBox = CreateSourcePicker(
                "下料日报库（可选）",
                sources,
                FindTarget(_settings, ProductionMessageKinds.CuttingModuleKey),
                source => source.Name.Contains("下料", StringComparison.OrdinalIgnoreCase));
            var towerDailyBox = CreateSourcePicker(
                "塔筒产线日报库",
                sources,
                FindTarget(_settings, ProductionMessageKinds.TowerDailyModuleKey),
                source => source.Name.Contains("塔筒", StringComparison.OrdinalIgnoreCase) &&
                          (source.Name.Contains("日报", StringComparison.OrdinalIgnoreCase) ||
                           source.Name.Contains("产线", StringComparison.OrdinalIgnoreCase)));
            var towerMonthlyBox = CreateSourcePicker(
                "塔筒产线每月累计库",
                sources,
                FindTarget(_settings, ProductionMessageKinds.TowerMonthlyModuleKey),
                source => source.Name.Contains("塔筒", StringComparison.OrdinalIgnoreCase) &&
                          source.Name.Contains("月", StringComparison.OrdinalIgnoreCase));
            var towerYearlyBox = CreateSourcePicker(
                "塔筒产线每年累计库",
                sources,
                FindTarget(_settings, ProductionMessageKinds.TowerYearlyModuleKey),
                source => source.Name.Contains("塔筒", StringComparison.OrdinalIgnoreCase) &&
                          source.Name.Contains("年", StringComparison.OrdinalIgnoreCase));

            var content = new StackPanel { Width = 520, Spacing = 8 };
            content.Children.Add(new TextBlock
            {
                Text = "首次绑定后会保存配置。下料与塔筒产线分开管理；塔筒日报、每月累计、每年累计为必选。",
                TextWrapping = TextWrapping.Wrap
            });
            content.Children.Add(new TextBlock
            {
                Text = "下料业务",
                FontSize = 16,
                Margin = new Thickness(0, 6, 0, 0)
            });
            content.Children.Add(new TextBlock
            {
                Text = "下料日报数据库（可选）",
                Foreground = (Microsoft.UI.Xaml.Media.Brush)Application.Current.Resources["MutedTextBrush"]
            });
            content.Children.Add(cuttingBox);
            content.Children.Add(new TextBlock
            {
                Text = "塔筒产线业务",
                FontSize = 16,
                Margin = new Thickness(0, 8, 0, 0)
            });
            content.Children.Add(new TextBlock
            {
                Text = "日报、每月累计、每年累计分别绑定到对应数据库。",
                Foreground = (Microsoft.UI.Xaml.Media.Brush)Application.Current.Resources["MutedTextBrush"]
            });
            content.Children.Add(towerDailyBox);
            content.Children.Add(towerMonthlyBox);
            content.Children.Add(towerYearlyBox);

            var picker = new ContentDialog
            {
                XamlRoot = XamlRoot,
                Title = "绑定 Notion 数据源",
                Content = content,
                PrimaryButtonText = "检测并保存",
                CloseButtonText = "取消"
            };
            if (await picker.ShowAsync() != ContentDialogResult.Primary ||
                towerDailyBox.SelectedItem is not NotionDataSourceOption towerDaily ||
                towerMonthlyBox.SelectedItem is not NotionDataSourceOption towerMonthly ||
                towerYearlyBox.SelectedItem is not NotionDataSourceOption towerYearly)
            {
                await ShowResultDialogAsync(
                    "请选择数据源",
                    "请同时选择塔筒产线日报库、每月累计库和每年累计库。下料日报库可以留空。");
                return;
            }

            var cutting = cuttingBox.SelectedItem as NotionDataSourceOption;
            var bindings = new List<NotionTargetSettings>();
            if (cutting is not null)
                bindings.Add(await BuildBindingAsync(
                    cutting,
                    ProductionMessageKinds.CuttingModuleKey,
                    "生产消息 · 下料日报库",
                    ProductionMessageKind.MaterialCutting,
                    monthly: false,
                    monthlyRelationTargetId: string.Empty,
                    yearlyRelationTargetId: string.Empty));
            bindings.Add(await BuildBindingAsync(
                    towerDaily,
                    ProductionMessageKinds.TowerDailyModuleKey,
                    "生产消息 · 塔筒产线日报库",
                    ProductionMessageKind.TowerLineDaily,
                    monthly: false,
                    monthlyRelationTargetId: towerMonthly.Id,
                    yearlyRelationTargetId: towerYearly.Id));
            bindings.Add(await BuildBindingAsync(
                    towerMonthly,
                    ProductionMessageKinds.TowerMonthlyModuleKey,
                    "生产消息 · 塔筒产线每月累计库",
                    ProductionMessageKind.TowerLineDaily,
                    monthly: true,
                    monthlyRelationTargetId: string.Empty,
                    yearlyRelationTargetId: string.Empty));
            bindings.Add(await BuildBindingAsync(
                    towerYearly,
                    ProductionMessageKinds.TowerYearlyModuleKey,
                    "生产消息 · 塔筒产线每年累计库",
                    ProductionMessageKind.TowerLineDaily,
                    monthly: true,
                    monthlyRelationTargetId: string.Empty,
                    yearlyRelationTargetId: string.Empty));
            foreach (var binding in bindings)
            {
                var previous = _settings.Targets.FirstOrDefault(target =>
                    target.ModuleKey == binding.ModuleKey);
                if (previous is null)
                    _settings.Targets.Add(binding);
                else
                {
                    previous.ModuleName = binding.ModuleName;
                    previous.Id = binding.Id;
                    previous.Name = binding.Name;
                    previous.Path = binding.Path;
                    previous.TitleProperty = binding.TitleProperty;
                    previous.DateProperty = binding.DateProperty;
                    previous.QuantityProperty = binding.QuantityProperty;
                    previous.PropertyMappings = binding.PropertyMappings;
                }
            }
            NotionSettingsStore.Save(_settings);
            RefreshBindingStatus();
            SetResultStatus("绑定已保存", "已检测并保存已选择的数据源字段；后续写入会复用这些映射。", InfoBarSeverity.Success);
        }
        catch (Exception ex)
        {
            SetResultStatus("字段检测失败", ex.Message, InfoBarSeverity.Error);
            CuttingBindingInfoBar.Title = "下料数据库";
            CuttingBindingInfoBar.Message = "字段检测失败";
            CuttingBindingInfoBar.Severity = InfoBarSeverity.Error;
            TowerBindingInfoBar.Title = "塔筒产线数据库";
            TowerBindingInfoBar.Message = "字段检测失败";
            TowerBindingInfoBar.Severity = InfoBarSeverity.Error;
        }
        finally
        {
            SetBusy(false);
        }
    }

    private static NotionTargetSettings? FindTarget(
        NotionSettings settings,
        string moduleKey) =>
        settings.Targets.FirstOrDefault(target => target.ModuleKey == moduleKey);

    private static bool HasCompleteTowerBindings(NotionSettings settings) =>
        TowerBindingKeys.All(key =>
        {
            var target = FindTarget(settings, key);
            return target is not null &&
                   !string.IsNullOrWhiteSpace(target.Id) &&
                   !string.IsNullOrWhiteSpace(target.TitleProperty) &&
                   (key != ProductionMessageKinds.TowerDailyModuleKey ||
                    !string.IsNullOrWhiteSpace(target.DateProperty));
        });

    private static ComboBox CreateSourcePicker(
        string header,
        IReadOnlyList<NotionDataSourceOption> sources,
        NotionTargetSettings? existing,
        Func<NotionDataSourceOption, bool> preferred)
    {
        var box = new ComboBox
        {
            Header = header,
            ItemsSource = sources,
            DisplayMemberPath = "Path",
            HorizontalAlignment = HorizontalAlignment.Stretch,
            PlaceholderText = "请选择数据源"
        };
        box.SelectedItem = sources.FirstOrDefault(source => source.Id == existing?.Id)
                           ?? sources.FirstOrDefault(preferred);
        return box;
    }

    private async Task VerifyProductionBindingsAsync()
    {
        _settings = NotionSettingsStore.Load();
        var targets = TowerBindingKeys
            .Select(key => FindTarget(_settings, key))
            .ToArray();
        if (targets.Any(target => target is null))
        {
            RefreshBindingStatus();
            return;
        }

        BindSourcesButton.IsEnabled = false;
        BindSourcesButton.Content = "检查中";
        TowerBindingInfoBar.Title = "塔筒产线数据库";
        TowerBindingInfoBar.Message = "正在检查三库连接";
        TowerBindingInfoBar.Severity = InfoBarSeverity.Informational;
        try
        {
            foreach (var target in targets.OfType<NotionTargetSettings>())
            {
                var schema = await _notionService.GetSchemaAsync(_settings.Token, target.Id);
                if (!schema.Succeeded)
                {
                    TowerBindingInfoBar.Message = $"{target.ModuleName}：连接失败";
                    TowerBindingInfoBar.Severity = InfoBarSeverity.Error;
                    return;
                }

                var titleValid = schema.Properties.Any(property =>
                    property.Type == "title" && property.Name == target.TitleProperty);
                var dateValid = string.IsNullOrWhiteSpace(target.DateProperty) ||
                                schema.Properties.Any(property =>
                                    property.Type == "date" && property.Name == target.DateProperty);
                if (!titleValid || !dateValid)
                {
                    TowerBindingInfoBar.Message = $"{target.ModuleName}：字段已变更";
                    TowerBindingInfoBar.Severity = InfoBarSeverity.Warning;
                    return;
                }
            }

            TowerBindingInfoBar.Title = "塔筒产线数据库";
            TowerBindingInfoBar.Message = "连接正常，已绑定日报、每月累计和每年累计";
            TowerBindingInfoBar.Severity = InfoBarSeverity.Success;
        }
        catch
        {
            TowerBindingInfoBar.Message = "连接失败";
            TowerBindingInfoBar.Severity = InfoBarSeverity.Error;
        }
        finally
        {
            BindSourcesButton.Content = "刷新";
            BindSourcesButton.IsEnabled = true;
        }
    }

    private async Task<NotionTargetSettings> BuildBindingAsync(
        NotionDataSourceOption source,
        string moduleKey,
        string moduleName,
        ProductionMessageKind kind,
        bool monthly,
        string monthlyRelationTargetId,
        string yearlyRelationTargetId)
    {
        var schema = await _notionService.GetSchemaAsync(_settings.Token, source.Id);
        if (!schema.Succeeded)
            throw new InvalidOperationException($"{source.Name}：{schema.Message}");

        var title = schema.Properties.FirstOrDefault(property => property.Type == "title");
        var date = schema.Properties.FirstOrDefault(property =>
            property.Type == "date" &&
            (property.Name.Contains("日期", StringComparison.Ordinal) ||
             property.Name.Contains("时间", StringComparison.Ordinal)));
        date ??= schema.Properties.FirstOrDefault(property => property.Type == "date");
        if (title is null || (!monthly && date is null))
            throw new InvalidOperationException(
                $"{source.Name}：需要标题字段" + (monthly ? "。" : "和日期字段。"));

        var mapping = AutoMap(schema.Properties, kind);
        if (!monthly)
        {
            var monthlyRelation = schema.Properties.FirstOrDefault(property =>
                property.Type == "relation" &&
                SameDataSourceId(property.RelationDataSourceId, monthlyRelationTargetId));
            if (monthlyRelation is not null)
                mapping[ProductionMessageFields.MonthlySummaryRelation] = monthlyRelation.Name;

            var yearlyRelation = schema.Properties.FirstOrDefault(property =>
                property.Type == "relation" &&
                SameDataSourceId(property.RelationDataSourceId, yearlyRelationTargetId));
            if (yearlyRelation is not null)
                mapping[ProductionMessageFields.YearlySummaryRelation] = yearlyRelation.Name;
        }

        return new NotionTargetSettings
        {
            ModuleKey = moduleKey,
            ModuleName = moduleName,
            Id = source.Id,
            Name = source.Name,
            Path = source.Path,
            TitleProperty = title.Name,
            DateProperty = date?.Name ?? string.Empty,
            PropertyMappings = mapping
        };
    }

    internal static Dictionary<string, string> AutoMap(
        IReadOnlyList<NotionPropertyOption> properties,
        ProductionMessageKind kind)
    {
        var mapping = new Dictionary<string, string>(StringComparer.Ordinal);
        var used = new HashSet<string>(StringComparer.Ordinal);
        foreach (var key in ProductionMessageFields.FieldsFor(kind)
                     .Concat([ProductionMessageFields.RawMessage,
                              ProductionMessageFields.MessageType,
                              ProductionMessageFields.ParserVersion]))
        {
            if (!MappingAliases.TryGetValue(key, out var aliases)) continue;
            var property = properties.FirstOrDefault(candidate =>
                !used.Contains(candidate.Name) &&
                aliases.Any(alias => string.Equals(candidate.Name, alias, StringComparison.Ordinal)));
            property ??= properties.FirstOrDefault(candidate =>
                !used.Contains(candidate.Name) &&
                aliases.Any(alias => candidate.Name.Contains(alias, StringComparison.OrdinalIgnoreCase)));
            if (property is null) continue;
            mapping[key] = property.Name;
            used.Add(property.Name);
        }
        return mapping;
    }

    internal static bool SameDataSourceId(string left, string right)
    {
        if (string.IsNullOrWhiteSpace(left) || string.IsNullOrWhiteSpace(right))
            return false;
        var normalizedLeft = NormalizeDataSourceId(left);
        var normalizedRight = NormalizeDataSourceId(right);
        return string.Equals(normalizedLeft, normalizedRight, StringComparison.OrdinalIgnoreCase);
    }

    private static string NormalizeDataSourceId(string value)
    {
        var normalized = value.Trim();
        if (normalized.StartsWith("collection://", StringComparison.OrdinalIgnoreCase))
            normalized = normalized["collection://".Length..];
        return Guid.TryParse(normalized, out var id) ? id.ToString() : normalized;
    }

    private void RefreshBindingStatus()
    {
        _settings = NotionSettingsStore.Load();
        BindSourcesButton.Visibility = Visibility.Visible;
        if (string.IsNullOrWhiteSpace(_settings.Token))
        {
            CuttingBindingInfoBar.Title = "下料数据库";
            CuttingBindingInfoBar.Message = "未绑定";
            CuttingBindingInfoBar.Severity = InfoBarSeverity.Informational;
            TowerBindingInfoBar.Title = "塔筒产线数据库";
            TowerBindingInfoBar.Message = "未绑定";
            TowerBindingInfoBar.Severity = InfoBarSeverity.Informational;
            BindSourcesButton.Content = "去绑定";
            ApplyPreviewMappings();
            return;
        }

        var boundCount = TowerBindingKeys.Count(key => IsBound(FindTarget(_settings, key)));
        var cuttingTarget = FindTarget(_settings, ProductionMessageKinds.CuttingModuleKey);
        if (IsBound(cuttingTarget))
        {
            CuttingBindingInfoBar.Title = "下料数据库";
            CuttingBindingInfoBar.Message = "已绑定";
            CuttingBindingInfoBar.Severity = InfoBarSeverity.Success;
        }
        else
        {
            CuttingBindingInfoBar.Title = "下料数据库";
            CuttingBindingInfoBar.Message = "未绑定";
            CuttingBindingInfoBar.Severity = InfoBarSeverity.Informational;
        }

        if (boundCount == TowerBindingKeys.Length)
        {
            TowerBindingInfoBar.Title = "塔筒产线数据库";
            TowerBindingInfoBar.Message = "已绑定";
            TowerBindingInfoBar.Severity = InfoBarSeverity.Success;
            BindSourcesButton.Content = "刷新";
        }
        else
        {
            TowerBindingInfoBar.Title = "塔筒产线数据库";
            TowerBindingInfoBar.Message = boundCount == 0 ? "未绑定" : "绑定不完整";
            TowerBindingInfoBar.Severity = boundCount == 0
                ? InfoBarSeverity.Informational
                : InfoBarSeverity.Warning;
            BindSourcesButton.Content = boundCount == 0 ? "绑定" : "继续绑定";
        }
        ApplyPreviewMappings();
    }

    private static bool IsBound(NotionTargetSettings? target) =>
        target is not null && !string.IsNullOrWhiteSpace(target.Id);

    private void ApplyPreviewMappings(ProductionMessageDraft? draft = null)
    {
        var mappings = new Dictionary<ProductionMessageKind, IReadOnlyDictionary<string, string>>
        {
            [ProductionMessageKind.MaterialCutting] =
                FindTarget(_settings, ProductionMessageKinds.CuttingModuleKey)?.PropertyMappings
                ?? new Dictionary<string, string>(),
            [ProductionMessageKind.TowerLineDaily] =
                FindTarget(_settings, ProductionMessageKinds.TowerDailyModuleKey)?.PropertyMappings
                ?? new Dictionary<string, string>()
        };

        if (draft is not null)
        {
            draft.SetDatabaseFieldMappings(mappings);
            return;
        }

        foreach (var message in Messages)
            message.SetDatabaseFieldMappings(mappings);
    }

    private async void ImportButton_Click(object sender, RoutedEventArgs e)
        => await ImportProductionMessagesAsync(_overwriteExistingRequired);

    private async Task ImportProductionMessagesAsync(bool overwriteExisting)
    {
        var defaultDate = (DefaultDatePicker.Date ?? DateTimeOffset.Now).Date;
        var batch = Messages.Count > 1;
        foreach (var draft in Messages)
            ProductionMessageParser.ApplyEdits(
                draft,
                defaultDate,
                allowDefaultDate: !batch && Messages.Count == 1,
                out _);
        UpdatePreviewStatus();

        var values = new List<ProductionMessageValue>();
        foreach (var draft in Messages)
        {
            if (ProductionMessageParser.TryCreateValue(draft, out var value, out _))
                values.Add(value);
        }
        if (values.Count == 0)
        {
            await ShowResultDialogAsync("没有可写入记录", "请先修正日期、类型、单位或关键数值，再重试。");
            return;
        }

        var settings = NotionSettingsStore.Load();
        var missingTargets = values.Select(value => value.Kind switch
            {
                ProductionMessageKind.MaterialCutting => ProductionMessageKinds.CuttingModuleKey,
                ProductionMessageKind.TowerLineDaily => ProductionMessageKinds.TowerDailyModuleKey,
                _ => string.Empty
            })
            .Distinct()
            .Where(key => settings.Targets.All(target => target.ModuleKey != key))
            .ToArray();
        if (missingTargets.Length > 0)
        {
            await ShowResultDialogAsync("尚未绑定数据源", "请先检测并保存对应的 Notion 数据源字段映射。");
            return;
        }

        SetBusy(true, showImportProgress: true);
        try
        {
            var result = await ImportWithProgressDialogAsync(
                new ProductionMessageImportRequest(
                    values,
                    overwriteExisting));
            var requiredMonths = result.Items
                .Where(item => item.Status == "monthly_plan_required")
                .Select(item => item.BusinessDate.ToString("yyyy-MM"))
                .Distinct()
                .ToArray();
            if (requiredMonths.Length > 0)
            {
                var monthlyPlans = await PromptMonthlyPlansAsync(requiredMonths);
                if (monthlyPlans is null) return;
                result = await ImportWithProgressDialogAsync(
                    new ProductionMessageImportRequest(
                        values,
                        overwriteExisting,
                        monthlyPlans));
            }
            foreach (var item in result.Items)
            {
                var draft = Messages.FirstOrDefault(message => message.Index == item.Index);
                if (draft is null) continue;
                draft.StatusText = item.Status switch
                {
                    "created" => "已创建",
                    "updated" => "已更新",
                    "existing" => "待确认覆盖",
                    "unchanged" => "数据一致",
                    "conflict" => "存在冲突",
                    "monthly_plan_required" => "待填月计划",
                    _ => "写入失败"
                };
                draft.WarningText = item.Status is "error" or "existing" or "conflict"
                    ? item.Message
                    : string.Empty;
                draft.RefreshSummary();
            }

            SetResultStatus(
                result.Succeeded ? "写入完成" : "批量写入有待处理项",
                result.Message,
                result.Succeeded ? InfoBarSeverity.Success : InfoBarSeverity.Warning);
            SetOverwriteState(!overwriteExisting && result.Items.Any(item =>
                item.Status is "existing" or "conflict"));
            await ShowResultDialogAsync(
                result.Succeeded ? "写入完成" : "写入结果",
                result.Message);
        }
        catch (Exception ex)
        {
            SetResultStatus("写入失败", ex.Message, InfoBarSeverity.Error);
        }
        finally
        {
            SetBusy(false);
        }
    }

    private async Task<ProductionMessageImportResult> ImportWithProgressDialogAsync(
        ProductionMessageImportRequest request)
    {
        var content = new StackPanel
        {
            Orientation = Orientation.Horizontal,
            Spacing = 12,
            Children =
            {
                new ProgressRing { IsActive = true, Width = 24, Height = 24 },
                new TextBlock { Text = $"正在处理 {request.Items.Count} 条数据…", VerticalAlignment = VerticalAlignment.Center }
            }
        };
        var dialog = new ContentDialog
        {
            XamlRoot = XamlRoot,
            Title = "正在写入 Notion",
            Content = content
        };
        _ = dialog.ShowAsync();
        await Task.Yield();
        try
        {
            return await _notionService.ImportProductionMessagesAsync(request);
        }
        finally
        {
            dialog.Hide();
        }
    }

    private async Task<IReadOnlyDictionary<string, double>?> PromptMonthlyPlansAsync(
        IReadOnlyList<string> months)
    {
        var plans = new Dictionary<string, double>(StringComparer.Ordinal);
        foreach (var month in months)
        {
            var input = new NumberBox
            {
                Header = $"{month} 月预计产量（吨）",
                Minimum = 0,
                SpinButtonPlacementMode = NumberBoxSpinButtonPlacementMode.Compact
            };
            var dialog = new ContentDialog
            {
                XamlRoot = XamlRoot,
                Title = "创建下料月数据",
                Content = input,
                PrimaryButtonText = "创建并继续",
                CloseButtonText = "取消",
                DefaultButton = ContentDialogButton.Primary
            };
            if (await dialog.ShowAsync() != ContentDialogResult.Primary) return null;
            if (double.IsNaN(input.Value) || input.Value < 0)
            {
                await ShowResultDialogAsync("预计产量无效", $"请填写 {month} 的月预计产量。");
                return null;
            }
            plans[month] = input.Value;
        }
        return plans;
    }

    private void UpdatePreviewStatus()
    {
        var valid = Messages.Count(message => message.CanWrite);
        var waiting = Messages.Count - valid;
        var summary = Messages.Count == 0
            ? "尚未解析消息"
            : $"{Messages.Count} 条消息 · {valid} 条可写入 · {waiting} 条待修正";
        var title = Messages.Count == 0
            ? "等待解析"
            : waiting > 0 ? "需要修正" : "解析完成";
        var severity = Messages.Count == 0
            ? InfoBarSeverity.Informational
            : waiting > 0 ? InfoBarSeverity.Warning : InfoBarSeverity.Success;
        SetResultStatus(title, summary, severity);
        ImportButton.IsEnabled = !_busy && valid > 0;
        SetOverwriteState(false);
    }

    private void SetResultStatus(string title, string message, InfoBarSeverity severity)
    {
        ResultInfoBar.Title = string.IsNullOrWhiteSpace(message)
            ? title
            : $"{title} · {message}";
        ResultInfoBar.Message = string.Empty;
        ResultInfoBar.Severity = severity;
    }

    private void SetBusy(bool busy, bool showImportProgress = false)
    {
        _busy = busy;
        ParseButton.IsEnabled = !busy;
        BindSourcesButton.IsEnabled = !busy;
        MessageInputBox.IsEnabled = !busy;
        ImportBusyRing.IsActive = busy && showImportProgress;
        ImportBusyRing.Visibility = busy && showImportProgress
            ? Visibility.Visible
            : Visibility.Collapsed;
        ImportButton.IsEnabled = !busy && Messages.Any(message => message.CanWrite);
    }

    private void SetOverwriteState(bool required)
    {
        _overwriteExistingRequired = required;
        ImportButton.Content = required ? "覆盖写入" : "确认写入";
        ImportButton.ClearValue(Control.BackgroundProperty);
        ImportButton.ClearValue(Control.BorderBrushProperty);
        ImportButton.ClearValue(Control.ForegroundProperty);
        foreach (var key in new[]
                 {
                     "ButtonBackgroundPointerOver", "ButtonBackgroundPressed",
                     "ButtonBorderBrushPointerOver", "ButtonBorderBrushPressed",
                     "ButtonForegroundPointerOver", "ButtonForegroundPressed"
                 })
            ImportButton.Resources.Remove(key);
        ImportButton.Style = null;
        ImportButton.Style = (Style)Application.Current.Resources["AccentButtonStyle"];
        if (!required) return;

        var red = (Microsoft.UI.Xaml.Media.Brush)
            Application.Current.Resources["SystemFillColorCriticalBrush"];
        var white = new Microsoft.UI.Xaml.Media.SolidColorBrush(Microsoft.UI.Colors.White);
        ImportButton.Background = red;
        ImportButton.BorderBrush = red;
        ImportButton.Foreground = white;
        ImportButton.Resources["ButtonBackgroundPointerOver"] = red;
        ImportButton.Resources["ButtonBackgroundPressed"] = red;
        ImportButton.Resources["ButtonBorderBrushPointerOver"] = red;
        ImportButton.Resources["ButtonBorderBrushPressed"] = red;
        ImportButton.Resources["ButtonForegroundPointerOver"] = white;
        ImportButton.Resources["ButtonForegroundPressed"] = white;
    }

    private async Task ShowResultDialogAsync(string title, string message) =>
        await new ContentDialog
        {
            XamlRoot = XamlRoot,
            Title = title,
            Content = message,
            CloseButtonText = "确定"
        }.ShowAsync();
}
