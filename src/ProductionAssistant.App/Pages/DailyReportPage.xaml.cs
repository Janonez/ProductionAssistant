using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Navigation;
using Microsoft.Web.WebView2.Core;
using ProductionAssistant.Models;
using ProductionAssistant.Services;
using System.Text.Json;

namespace ProductionAssistant.Pages;

public sealed partial class DailyReportPage : Page
{
    private readonly INotionImportService _notion = AppServices.Notion;
    private readonly DailyReportService _reports = AppServices.DailyReports;
    private DailyReportSettings _settings = new();
    private IReadOnlyList<NotionPropertyOption> _properties = [];
    private string _previewedTemplate = string.Empty;
    private string _testedTemplate = string.Empty;
    private string _templateText = string.Empty;
    private string _templateDocument = string.Empty;
    private bool _editorReady;
    private bool _loaded;
    public DailyReportPage()
    {
        InitializeComponent();
        NavigationCacheMode = NavigationCacheMode.Required;
        Loaded += DailyReportPage_Loaded;
    }

    protected override void OnNavigatedTo(NavigationEventArgs e)
    {
        base.OnNavigatedTo(e);
        var mode = e.Parameter as string;
        var configuration = mode == "daily-report-config";
        var records = mode == "daily-report-records";
        PageTitleText.Text = configuration
            ? "日报自动推送 · 推送配置"
            : records ? "日报自动推送 · 运行记录" : "日报自动推送 · 模板编辑";
        PageDescriptionText.Text = configuration
            ? "配置钉钉机器人和本机定时发送任务。"
            : records ? "查看本机最近一次自动运行结果。" : "编辑结构化模板，预览并测试发送内容。";
        TemplateContent.Visibility = configuration || records ? Visibility.Collapsed : Visibility.Visible;
        ConfigurationContent.Visibility = Visibility.Visible;
        FieldConfigurationCard.Visibility = configuration || records ? Visibility.Collapsed : Visibility.Visible;
        DingTalkConfigurationCard.Visibility = configuration ? Visibility.Visible : Visibility.Collapsed;
        ScheduleConfigurationCard.Visibility = configuration ? Visibility.Visible : Visibility.Collapsed;
        RunRecordCard.Visibility = records ? Visibility.Visible : Visibility.Collapsed;
        Grid.SetColumn(ConfigurationContent, configuration || records ? 0 : 1);
        Grid.SetColumnSpan(ConfigurationContent, configuration || records ? 2 : 1);
    }

    private async void DailyReportPage_Loaded(object sender, RoutedEventArgs e)
    {
        if (_loaded)
        {
            DataSourceBox.ItemsSource = NotionSettingsStore.Load().CachedDataSources;
            RefreshBindingSummary();
            RefreshDingTalkStatus();
            await RefreshTaskStatusAsync();
            RefreshRunStatus();
            return;
        }
        _settings = DailyReportSettingsStore.Load();
        _templateText = _settings.DraftTemplate;
        _templateDocument = _settings.DraftTemplateDocument;
        PreviewDatePicker.Date = DateTimeOffset.Now;
        SendTimePicker.Time = TimeSpan.TryParse(_settings.SendTime, out var sendTime)
            ? sendTime
            : new TimeSpan(17, 30, 0);
        var notion = NotionSettingsStore.Load();
        DataSourceBox.ItemsSource = notion.CachedDataSources;
        RefreshBindingSummary();
        RefreshDingTalkStatus();
        await RefreshTaskStatusAsync();
        RefreshRunStatus();
        var editorAvailable = await InitializeEditorAsync();
        SetStatus(editorAvailable ? "配置已加载" : "模板编辑器不可用", editorAvailable
            ? _settings.ActiveTemplateVersion > 0
                ? $"当前启用模板版本：{_settings.ActiveTemplateVersion}"
                : "尚未启用模板。"
            : "无法启动 WebView2，请确认系统已安装 WebView2 Runtime。",
            editorAvailable ? InfoBarSeverity.Informational : InfoBarSeverity.Error);
        _loaded = true;
    }

    private void RefreshRunStatus()
    {
        var state = DailyReportSettingsStore.LoadState();
        RunStatusText.Text = state.LastRunAt is null
            ? "尚无自动运行记录"
            : $"最近运行：{state.LastRunAt:yyyy-MM-dd HH:mm} · " +
              (string.IsNullOrWhiteSpace(state.LastError)
                  ? $"最近成功：{state.LastSuccessAt:yyyy-MM-dd HH:mm}"
                  : $"失败：{state.LastError}");
    }

    private async void DataSourceBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
    {
        if (DataSourceBox.SelectedItem is not NotionDataSourceOption source) return;
        var notion = NotionSettingsStore.Load();
        if (string.IsNullOrWhiteSpace(notion.Token))
        {
            SetStatus("需要配置 Notion", "请先到设置页保存 Notion 令牌并刷新数据源。", InfoBarSeverity.Warning);
            return;
        }
        SetBusy(true);
        var schema = await _notion.GetSchemaAsync(notion.Token, source.Id);
        SetBusy(false);
        if (!schema.Succeeded)
        {
            SetStatus("读取字段失败", schema.Message, InfoBarSeverity.Error);
            return;
        }
        _properties = schema.Properties;
        ValuePropertyBox.ItemsSource = _properties.Where(IsSupportedValue).ToArray();
        RefreshSourceDetection(source);
    }

    private void ValuePropertyBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
    {
        if (ValuePropertyBox.SelectedItem is not NotionPropertyOption property) return;
        FormatBox.PlaceholderText = property.Type == "date"
            ? "例如 yyyy-MM-dd 或 MM月dd日"
            : property.Type is "number" or "formula" or "rollup"
                ? "例如 0、0.0 或 0.##"
                : "该字段无需格式";
    }

    private void InsertFieldButton_Click(object sender, RoutedEventArgs e)
    {
        if (DataSourceBox.SelectedItem is not NotionDataSourceOption source ||
            ValuePropertyBox.SelectedItem is not NotionPropertyOption valueProperty)
        {
            SetStatus("字段未选完整", "请选择数据库和要插入的数据字段。", InfoBarSeverity.Warning);
            return;
        }

        var notion = NotionSettingsStore.Load();
        var period = ResolvePeriod(source, notion);
        var matchProperty = ResolveDateProperty(source, notion);
        if (matchProperty is null)
        {
            SetStatus("未找到日期字段", $"数据库“{source.Name}”中没有可用于查询的日期字段。", InfoBarSeverity.Warning);
            return;
        }

        var binding = _settings.Sources.FirstOrDefault(item => item.DataSourceId == source.Id);
        if (binding is null)
        {
            binding = new DailyReportSourceBinding { DataSourceId = source.Id };
            _settings.Sources.Add(binding);
        }
        binding.DataSourceName = source.Name;
        binding.PeriodKind = period;
        binding.MatchPropertyId = matchProperty.Id;
        binding.MatchPropertyName = matchProperty.Name;
        binding.MatchPropertyType = matchProperty.Type;
        var token = DailyReportSettingsStore.AddOrUpdateField(_settings, new(
            source.Id, source.Name, valueProperty.Id, valueProperty.Name,
            valueProperty.Type, FormatBox.Text.Trim()));
        PostEditorMessage(new
        {
            type = "insertField",
            field = new
            {
                placeholder = token,
                label = $"{CapsulePeriodLabel(period)} · {valueProperty.Name}",
                tooltip = $"{PeriodLabel(period)} · {source.Name} · {valueProperty.Name}"
            }
        });
        RefreshBindingSummary();
    }

    private void InsertTodayButton_Click(object sender, RoutedEventArgs e) =>
        PostEditorMessage(new { type = "insertToday" });

    private void SaveDraftButton_Click(object sender, RoutedEventArgs e)
    {
        SaveDraft();
        SetStatus("草稿已保存", "自动任务仍使用已启用版本。", InfoBarSeverity.Success);
    }

    private void ActivateTemplateButton_Click(object sender, RoutedEventArgs e)
    {
        if (string.IsNullOrWhiteSpace(PreviewBox.Text) ||
            !string.Equals(_previewedTemplate, _templateText, StringComparison.Ordinal) ||
            !string.Equals(_testedTemplate, _templateText, StringComparison.Ordinal))
        {
            SetStatus("请先预览并测试发送", "只有当前模板测试发送成功后才能启用。", InfoBarSeverity.Warning);
            return;
        }
        SaveDraft();
        _settings.ActiveTemplate = _settings.DraftTemplate;
        _settings.ActiveTemplateDocument = _settings.DraftTemplateDocument;
        _settings.ActiveTemplateVersion++;
        DailyReportSettingsStore.Save(_settings, string.Empty, string.Empty);
        SetStatus("模板已启用", $"自动任务将使用版本 {_settings.ActiveTemplateVersion}。", InfoBarSeverity.Success);
    }

    private async void PreviewButton_Click(object sender, RoutedEventArgs e) =>
        await GeneratePreviewAsync();

    private async void TestSendButton_Click(object sender, RoutedEventArgs e)
    {
        if (!await GeneratePreviewAsync()) return;
        var webhook = DailyReportSettingsStore.ReadWebhook(_settings);
        var secret = DailyReportSettingsStore.ReadSecret(_settings);
        if (string.IsNullOrWhiteSpace(webhook) || string.IsNullOrWhiteSpace(secret))
        {
            SetStatus("机器人未配置", "请先保存 Webhook 和加签 Secret。", InfoBarSeverity.Warning);
            return;
        }
        SetBusy(true);
        var result = await _reports.SendAsync(webhook, secret, $"【测试消息】\n{PreviewBox.Text}");
        SetBusy(false);
        _testedTemplate = result.Succeeded ? _templateText : string.Empty;
        SaveDingTalkCheck(result);
        SetStatus(result.Succeeded ? "测试发送成功" : "测试发送失败",
            result.Message, result.Succeeded ? InfoBarSeverity.Success : InfoBarSeverity.Error);
    }

    private void SaveDingTalkButton_Click(object sender, RoutedEventArgs e)
    {
        SaveDraft();
        DailyReportSettingsStore.Save(_settings, WebhookBox.Password, SecretBox.Password);
        WebhookBox.Password = string.Empty;
        SecretBox.Password = string.Empty;
        _settings.DingTalkConnected = null;
        _settings.DingTalkStatus = "配置已更新，尚未检测";
        _settings.DingTalkCheckedAt = null;
        DailyReportSettingsStore.Save(_settings, string.Empty, string.Empty);
        RefreshDingTalkStatus();
        SetStatus("机器人配置已保存", "Webhook 和 Secret 已使用当前 Windows 用户加密保存。", InfoBarSeverity.Success);
    }

    private async void CheckDingTalkButton_Click(object sender, RoutedEventArgs e)
    {
        var webhook = DailyReportSettingsStore.ReadWebhook(_settings);
        var secret = DailyReportSettingsStore.ReadSecret(_settings);
        SetBusy(true);
        var result = await _reports.SendAsync(
            webhook, secret, $"【连接测试】生产助手已于 {DateTime.Now:yyyy-MM-dd HH:mm} 成功连接钉钉机器人。");
        SetBusy(false);
        SaveDingTalkCheck(result);
        SetStatus(result.Succeeded ? "钉钉连接正常" : "钉钉连接失败",
            result.Message, result.Succeeded ? InfoBarSeverity.Success : InfoBarSeverity.Error);
    }

    private async void InstallTaskButton_Click(object sender, RoutedEventArgs e)
    {
        SaveSchedule();
        var result = await DailyReportTaskScheduler.InstallAsync(SendTimePicker.Time);
        SetStatus(result.Succeeded ? "任务计划已更新" : "任务计划安装失败",
            result.Message, result.Succeeded ? InfoBarSeverity.Success : InfoBarSeverity.Error);
        await RefreshTaskStatusAsync();
    }

    private void SendTimePicker_TimeChanged(object sender, TimePickerValueChangedEventArgs e)
    {
        if (!_loaded) return;
        SaveSchedule();
        TaskStatusText.Text = "发送时间已修改，请点击“安装 / 更新任务”使其生效";
    }

    private async void RemoveTaskButton_Click(object sender, RoutedEventArgs e)
    {
        var result = await DailyReportTaskScheduler.RemoveAsync();
        SetStatus(result.Succeeded ? "任务计划已停用" : "停用失败",
            result.Message, result.Succeeded ? InfoBarSeverity.Success : InfoBarSeverity.Error);
        await RefreshTaskStatusAsync();
    }

    private async Task<bool> GeneratePreviewAsync()
    {
        SaveDraft();
        var date = PreviewDatePicker.Date?.DateTime.Date ?? DateTime.Today;
        SetBusy(true);
        var result = await _reports.BuildAsync(_settings, _templateText, date);
        SetBusy(false);
        PreviewBox.Text = result.Succeeded ? result.Text : string.Empty;
        _previewedTemplate = result.Succeeded ? _templateText : string.Empty;
        SetStatus(result.Succeeded ? "预览已生成" : "无法生成日报",
            result.Message, result.Succeeded ? InfoBarSeverity.Success : InfoBarSeverity.Error);
        return result.Succeeded;
    }

    private void SaveDraft()
    {
        _settings.DraftTemplate = _templateText;
        _settings.DraftTemplateDocument = _templateDocument;
        DailyReportSettingsStore.Save(_settings, string.Empty, string.Empty);
    }

    private async Task<bool> InitializeEditorAsync()
    {
        try
        {
            await TemplateEditor.EnsureCoreWebView2Async();
            TemplateEditor.CoreWebView2.WebMessageReceived += TemplateEditor_WebMessageReceived;
            var editorFolder = Path.Combine(AppContext.BaseDirectory, "Assets", "ReportEditor");
            TemplateEditor.CoreWebView2.SetVirtualHostNameToFolderMapping(
                "report-editor.local", editorFolder, CoreWebView2HostResourceAccessKind.Allow);
            TemplateEditor.Source = new Uri("https://report-editor.local/editor.html");
            return true;
        }
        catch
        {
            return false;
        }
    }

    private void TemplateEditor_WebMessageReceived(
        CoreWebView2 sender,
        CoreWebView2WebMessageReceivedEventArgs args)
    {
        using var message = JsonDocument.Parse(args.WebMessageAsJson);
        var root = message.RootElement;
        var type = root.TryGetProperty("type", out var typeElement) ? typeElement.GetString() : string.Empty;
        if (type == "ready")
        {
            _editorReady = true;
            InsertTodayButton.IsEnabled = true;
            InsertFieldButton.IsEnabled = true;
            PostEditorMessage(new
            {
                type = "init",
                text = _templateText,
                document = _templateDocument,
                fields = _settings.Fields.Select(field => new
                {
                    placeholder = field.Placeholder,
                    label = $"{CapsulePeriodLabel(_settings.Sources.FirstOrDefault(source => source.DataSourceId == field.Token.DataSourceId)?.PeriodKind ?? "day")} · {field.Token.PropertyName}",
                    tooltip = $"{PeriodLabel(_settings.Sources.FirstOrDefault(source => source.DataSourceId == field.Token.DataSourceId)?.PeriodKind ?? "day")} · {field.Token.DataSourceName} · {field.Token.PropertyName}"
                })
            });
        }
        else if (type == "update")
        {
            _templateText = root.GetProperty("text").GetString() ?? string.Empty;
            _templateDocument = root.GetProperty("document").GetString() ?? string.Empty;
        }
    }

    private void PostEditorMessage(object message)
    {
        if (_editorReady)
            TemplateEditor.CoreWebView2.PostWebMessageAsJson(JsonSerializer.Serialize(message));
    }

    private void SaveSchedule()
    {
        _settings.SendTime = SendTimePicker.Time.ToString(@"hh\:mm");
        DailyReportSettingsStore.Save(_settings, string.Empty, string.Empty);
    }

    private async Task RefreshTaskStatusAsync()
    {
        var status = await DailyReportTaskScheduler.GetStatusAsync(_settings.SendTime);
        TaskStatusText.Text = status.Message;
    }

    private void RefreshBindingSummary() =>
        BindingSummaryText.Text = _settings.Sources.Count == 0
            ? "尚未绑定数据源"
            : "已绑定：" + string.Join("、", _settings.Sources.Select(source =>
                $"{source.DataSourceName}（{PeriodLabel(source.PeriodKind)}：{FirstNotBlank(source.MatchPropertyName, source.DatePropertyName)}）"));

    private void RefreshSourceDetection(NotionDataSourceOption source)
    {
        var notion = NotionSettingsStore.Load();
        var period = ResolvePeriod(source, notion);
        var dateProperty = ResolveDateProperty(source, notion);
        SourceDetectionText.Text = dateProperty is null
            ? $"已识别：{PeriodLabel(period)} · 未找到日期字段，无法查询该数据库。"
            : $"已识别：{PeriodLabel(period)} · 日期字段：{dateProperty.Name}";
    }

    private string ResolvePeriod(NotionDataSourceOption source, NotionSettings notion)
    {
        var moduleKey = notion.Targets.FirstOrDefault(target => target.Id == source.Id)?.ModuleKey;
        if (moduleKey == ProductionMessageKinds.TowerMonthlyModuleKey) return "month";
        if (moduleKey == ProductionMessageKinds.TowerYearlyModuleKey) return "year";
        if (moduleKey == ProductionMessageKinds.TowerDailyModuleKey) return "day";

        if (source.Name.Contains("每月", StringComparison.Ordinal) ||
            source.Name.Contains("月累计", StringComparison.Ordinal)) return "month";
        if (source.Name.Contains("每年", StringComparison.Ordinal) ||
            source.Name.Contains("年累计", StringComparison.Ordinal)) return "year";
        return "day";
    }

    private NotionPropertyOption? ResolveDateProperty(NotionDataSourceOption source, NotionSettings notion)
    {
        var existing = _settings.Sources.FirstOrDefault(item => item.DataSourceId == source.Id);
        var configuredName = notion.Targets.FirstOrDefault(target => target.Id == source.Id)?.DateProperty;
        return _properties.FirstOrDefault(property => property.Type == "date" &&
                   (property.Id == existing?.MatchPropertyId || property.Name == existing?.MatchPropertyName))
               ?? _properties.FirstOrDefault(property => property.Type == "date" && property.Name == configuredName)
               ?? _properties.FirstOrDefault(property => property.Type == "date" && property.Name.Contains("日期", StringComparison.Ordinal))
               ?? _properties.FirstOrDefault(property => property.Type == "date");
    }

    private void RefreshDingTalkStatus()
    {
        WebhookMaskText.Text = $"Webhook：{DailyReportSettingsStore.MaskWebhook(_settings)}";
        SecretMaskText.Text = $"Secret：{DailyReportSettingsStore.MaskSecret(_settings)}";
        DingTalkConnectionText.Text = _settings.DingTalkConnected switch
        {
            true => $"连接正常 · 检测于 {_settings.DingTalkCheckedAt:yyyy-MM-dd HH:mm}",
            false => $"连接失败 · {_settings.DingTalkStatus} · {_settings.DingTalkCheckedAt:yyyy-MM-dd HH:mm}",
            _ => string.IsNullOrWhiteSpace(_settings.DingTalkStatus) ? "尚未检测连接" : _settings.DingTalkStatus
        };
    }

    private void SaveDingTalkCheck(DailyReportSendResult result)
    {
        _settings.DingTalkConnected = result.Succeeded;
        _settings.DingTalkStatus = result.Message;
        _settings.DingTalkCheckedAt = DateTimeOffset.Now;
        DailyReportSettingsStore.Save(_settings, string.Empty, string.Empty);
        RefreshDingTalkStatus();
    }

    private static string PeriodLabel(string value) => value switch
    {
        "month" => "本月",
        "year" => "本年累计",
        _ => "今日"
    };

    private static string CapsulePeriodLabel(string value) => value switch
    {
        "month" => "月",
        "year" => "年",
        _ => "日"
    };

    private static string FirstNotBlank(params string[] values) =>
        values.FirstOrDefault(value => !string.IsNullOrWhiteSpace(value)) ?? "未设置";

    private static bool IsSupportedValue(NotionPropertyOption property) =>
        property.Type is "number" or "title" or "rich_text" or "select" or "status" or
            "date" or "checkbox" or "url" or "email" or "phone_number" or "formula" or "rollup";

    private void SetBusy(bool busy)
    {
        BusyRing.IsActive = busy;
        BusyRing.Visibility = busy ? Visibility.Visible : Visibility.Collapsed;
    }

    private void SetStatus(string title, string message, InfoBarSeverity severity)
    {
        StatusInfoBar.Title = title;
        StatusInfoBar.Message = message;
        StatusInfoBar.Severity = severity;
    }

}
