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
    private DailyReportJobCatalog _catalog = new();
    private DailyReportJob? _job;
    private IReadOnlyList<NotionPropertyOption> _properties = [];
    private string _templateText = string.Empty;
    private string _templateDocument = string.Empty;
    private string _previewedTemplate = string.Empty;
    private string _testedTemplate = string.Empty;
    private bool _editorReady;
    private bool _editorAvailable = true;
    private bool _loaded;
    private bool _loadingJob;
    private TaskCompletionSource<string>? _editorSnapshot;

    public DailyReportPage()
    {
        InitializeComponent();
        NavigationCacheMode = NavigationCacheMode.Required;
        Loaded += DailyReportPage_Loaded;
    }

    protected override void OnNavigatedTo(NavigationEventArgs e)
    {
        base.OnNavigatedTo(e);
        ShowList();
    }

    private async void DailyReportPage_Loaded(object sender, RoutedEventArgs e)
    {
        _catalog = DailyReportSettingsStore.LoadCatalog();
        RefreshJobList();
        if (!_loaded)
        {
            PreviewDatePicker.Date = DateTimeOffset.Now;
            _editorAvailable = await InitializeEditorAsync();
            _loaded = true;
        }
    }

    private void RefreshJobList()
    {
        _catalog = DailyReportSettingsStore.LoadCatalog();
        JobList.ItemsSource = _catalog.Jobs.Select(job =>
        {
            var last = DailyReportSettingsStore.LoadRunRecords(job.Id).FirstOrDefault();
            return new JobListItem(job,
                job.IsEnabled ? "已启用" : job.ActiveTemplateVersion > 0 ? "已停用" : "草稿",
                last is null ? "尚无运行记录" : $"{last.StartedAt:MM-dd HH:mm} · {(last.Succeeded ? "成功" : "失败")}",
                job.DingTalkConnected == true ? "钉钉连接正常" :
                    string.IsNullOrWhiteSpace(job.EncryptedWebhook) ? "尚未配置钉钉" : "钉钉连接待检测");
        }).ToArray();
        EmptyJobsText.Visibility = _catalog.Jobs.Count == 0 ? Visibility.Visible : Visibility.Collapsed;
        var normal = _catalog.Jobs.Count(job => job.IsEnabled);
        var abnormal = _catalog.Jobs.Count - normal;
        if (_catalog.Jobs.Count == 0)
            SetStatus("暂无日报任务", "新建并启用任务后，将计入正常任务。", InfoBarSeverity.Informational);
        else if (abnormal == 0)
            SetStatus("任务状态正常", $"共 {_catalog.Jobs.Count} 个任务，{normal} 个正常，0 个异常。", InfoBarSeverity.Success);
        else
            SetStatus("任务状态需处理", $"共 {_catalog.Jobs.Count} 个任务，{normal} 个正常，{abnormal} 个异常。只有已启用的任务计为正常。", InfoBarSeverity.Warning);
    }

    private void NewJobButton_Click(object sender, RoutedEventArgs e)
    {
        var job = new DailyReportJob { Name = $"日报任务 {_catalog.Jobs.Count + 1}" };
        DailyReportSettingsStore.SaveJob(job);
        _catalog = DailyReportSettingsStore.LoadCatalog();
        OpenJob(job.Id);
    }

    private void JobList_ItemClick(object sender, ItemClickEventArgs e)
    {
        if (e.ClickedItem is JobListItem item) OpenJob(item.Job.Id);
    }

    private async void OpenJob(string jobId)
    {
        _catalog = DailyReportSettingsStore.LoadCatalog();
        _job = _catalog.Jobs.FirstOrDefault(item => item.Id == jobId);
        if (_job is null) return;
        _loadingJob = true;
        _templateText = _job.DraftTemplate;
        _templateDocument = _job.DraftTemplateDocument;
        _previewedTemplate = string.Empty;
        _testedTemplate = string.Empty;
        JobNameBox.Text = _job.Name;
        SendTimePicker.Time = TimeSpan.TryParse(_job.SendTime, out var time) ? time : new(17, 30, 0);
        DataSourceBox.ItemsSource = NotionSettingsStore.Load().CachedDataSources;
        RefreshBindingSummary();
        RefreshDingTalkStatus();
        RefreshOverview();
        RefreshRunRecords();
        await RefreshTaskStatusAsync();
        InitializeEditorContent();
        ShowEditMode();
        _loadingJob = false;
        JobListPanel.Visibility = Visibility.Collapsed;
        JobDetailPanel.Visibility = Visibility.Visible;
        StatusInfoBar.Visibility = Visibility.Collapsed;
        OverviewStatusInfoBar.IsOpen = ContentStatusInfoBar.IsOpen = NotionStatusInfoBar.IsOpen =
            DingTalkStatusInfoBar.IsOpen = ScheduleStatusInfoBar.IsOpen = false;
        if (!_editorAvailable)
            SetStatus(ContentStatusInfoBar, "模板编辑器不可用",
                "无法编辑、预览或发布模板；请安装 WebView2 Runtime 后重新打开页面。", InfoBarSeverity.Error);
        NewJobButton.Visibility = Visibility.Collapsed;
        PageDescriptionText.Text = "当前任务的内容、推送、定时和运行记录。";
    }

    private async void BackButton_Click(object sender, RoutedEventArgs e)
    {
        await CaptureEditorStateAsync();
        SaveDraft();
        ShowList();
    }

    private void ShowList()
    {
        _job = null;
        JobDetailPanel.Visibility = Visibility.Collapsed;
        JobListPanel.Visibility = Visibility.Visible;
        StatusInfoBar.Visibility = Visibility.Visible;
        NewJobButton.Visibility = Visibility.Visible;
        PageDescriptionText.Text = "管理日报内容、推送计划和运行记录。";
        if (_loaded) RefreshJobList();
    }

    private void JobNameBox_TextChanged(object sender, TextChangedEventArgs e)
    {
        if (_loadingJob || _job is null) return;
        _job.Name = JobNameBox.Text.Trim();
        DailyReportSettingsStore.SaveJob(_job);
        RefreshOverview();
    }

    private async void EnableJobButton_Click(object sender, RoutedEventArgs e)
    {
        if (_job is null) return;
        if (_job.IsEnabled)
        {
            var removed = await DailyReportTaskScheduler.RemoveAsync(_job.Id);
            if (!removed.Succeeded) { SetStatus(OverviewStatusInfoBar, "停用失败", removed.Message, InfoBarSeverity.Error); return; }
            _job.IsEnabled = false;
            DailyReportSettingsStore.SaveJob(_job);
            RefreshOverview();
            await RefreshTaskStatusAsync();
            return;
        }
        if (_job.ActiveTemplateVersion <= 0 || string.IsNullOrWhiteSpace(_job.ActiveTemplate))
        {
            SetStatus(OverviewStatusInfoBar, "无法启用", "请先完成预览、测试发送并发布模板。", InfoBarSeverity.Warning);
            return;
        }
        if (string.IsNullOrWhiteSpace(DailyReportSettingsStore.ReadWebhook(_job)) ||
            string.IsNullOrWhiteSpace(DailyReportSettingsStore.ReadSecret(_job)))
        {
            SetStatus(OverviewStatusInfoBar, "无法启用", "请先配置钉钉机器人。", InfoBarSeverity.Warning);
            return;
        }
        SaveSchedule();
        var installed = await DailyReportTaskScheduler.InstallAsync(_job.Id, SendTimePicker.Time);
        if (!installed.Succeeded) { SetStatus(OverviewStatusInfoBar, "启用失败", installed.Message, InfoBarSeverity.Error); return; }
        _job.IsEnabled = true;
        DailyReportSettingsStore.SaveJob(_job);
        RefreshOverview();
        await RefreshTaskStatusAsync();
        SetStatus(OverviewStatusInfoBar, "任务已启用", installed.Message, InfoBarSeverity.Success);
    }

    private async void DeleteJobButton_Click(object sender, RoutedEventArgs e)
    {
        if (_job is null) return;
        if (_job.IsEnabled)
        {
            SetStatus(OverviewStatusInfoBar, "无法删除", "请先停用任务，再删除配置和运行记录。", InfoBarSeverity.Warning);
            return;
        }
        var job = _job;
        var dialog = new ContentDialog
        {
            XamlRoot = XamlRoot, Title = "删除日报任务？",
            Content = $"将删除“{job.Name}”及其运行记录，此操作无法撤销。",
            PrimaryButtonText = "删除", CloseButtonText = "取消", DefaultButton = ContentDialogButton.Close
        };
        if (await dialog.ShowAsync() != ContentDialogResult.Primary) return;
        try
        {
            // A new or already stopped job may not have a Windows scheduled task to remove.
            await DailyReportTaskScheduler.RemoveAsync(job.Id);
            if (!DailyReportSettingsStore.DeleteJob(job.Id))
            {
                SetStatus(OverviewStatusInfoBar, "无法删除", "没有找到要删除的任务，请返回列表后重试。", InfoBarSeverity.Warning);
                return;
            }
            ShowList();
            await new ContentDialog
            {
                XamlRoot = XamlRoot,
                Title = "任务已删除",
                Content = "任务配置、运行记录和任务计划已清理。",
                CloseButtonText = "知道了"
            }.ShowAsync();
        }
        catch (Exception ex)
        {
            SetStatus(OverviewStatusInfoBar, "删除失败", ex.Message, InfoBarSeverity.Error);
        }
    }

    private async void DataSourceBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
    {
        if (DataSourceBox.SelectedItem is not NotionDataSourceOption source) return;
        var notion = NotionSettingsStore.Load();
        if (string.IsNullOrWhiteSpace(notion.Token))
        {
            SetStatus(NotionStatusInfoBar, "需要配置 Notion", "请先到设置页保存 Notion 令牌并刷新数据源。", InfoBarSeverity.Warning);
            return;
        }
        SetBusy(true);
        var schema = await _notion.GetSchemaAsync(notion.Token, source.Id);
        SetBusy(false);
        if (!schema.Succeeded) { SetStatus(NotionStatusInfoBar, "读取字段失败", schema.Message, InfoBarSeverity.Error); return; }
        _properties = schema.Properties;
        ValuePropertyBox.ItemsSource = _properties.Where(IsSupportedValue).ToArray();
        RefreshSourceDetection(source);
    }

    private void ValuePropertyBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
    {
        if (ValuePropertyBox.SelectedItem is not NotionPropertyOption property) return;
        FormatBox.PlaceholderText = property.Type == "date" ? "例如 yyyy-MM-dd 或 MM月dd日" :
            property.Type is "number" or "formula" or "rollup" ? "例如 0、0.0 或 0.##" : "该字段无需格式";
    }

    private void InsertFieldButton_Click(object sender, RoutedEventArgs e)
    {
        if (_job is null || DataSourceBox.SelectedItem is not NotionDataSourceOption source ||
            ValuePropertyBox.SelectedItem is not NotionPropertyOption property)
        { SetStatus(NotionStatusInfoBar, "字段未选完整", "请选择数据库和要插入的数据字段。", InfoBarSeverity.Warning); return; }
        var notion = NotionSettingsStore.Load();
        var period = ResolvePeriod(source, notion);
        var matchProperty = ResolveDateProperty(source, notion);
        if (matchProperty is null)
        { SetStatus(NotionStatusInfoBar, "未找到日期字段", $"数据库“{source.Name}”中没有可用于查询的日期字段。", InfoBarSeverity.Warning); return; }
        var binding = _job.Sources.FirstOrDefault(item => item.DataSourceId == source.Id);
        if (binding is null) { binding = new() { DataSourceId = source.Id }; _job.Sources.Add(binding); }
        binding.DataSourceName = source.Name;
        binding.PeriodKind = period;
        binding.MatchPropertyId = matchProperty.Id;
        binding.MatchPropertyName = matchProperty.Name;
        binding.MatchPropertyType = matchProperty.Type;
        var token = DailyReportSettingsStore.AddOrUpdateField(_job,
            new(source.Id, source.Name, property.Id, property.Name, property.Type, FormatBox.Text.Trim()));
        PostEditorMessage(new { type = "insertField", field = new
        {
            placeholder = token, label = $"{CapsulePeriodLabel(period)} · {property.Name}",
            tooltip = $"{PeriodLabel(period)} · {source.Name} · {property.Name}"
        } });
        RefreshBindingSummary();
    }

    private void InsertTodayButton_Click(object sender, RoutedEventArgs e) => PostEditorMessage(new { type = "insertToday" });

    private async void SaveDraftButton_Click(object sender, RoutedEventArgs e)
    {
        await CaptureEditorStateAsync();
        SaveDraft();
        SetStatus(ContentStatusInfoBar, "草稿已保存", "自动任务仍使用已发布版本。", InfoBarSeverity.Success);
    }

    private async void PreviewModeButton_Click(object sender, RoutedEventArgs e)
    {
        if (await GeneratePreviewAsync())
        {
            EditorBorder.Visibility = Visibility.Collapsed;
            PreviewBox.Visibility = Visibility.Visible;
        }
    }

    private void EditModeButton_Click(object sender, RoutedEventArgs e) => ShowEditMode();
    private void ShowEditMode()
    {
        EditorBorder.Visibility = Visibility.Visible;
        PreviewBox.Visibility = Visibility.Collapsed;
    }

    private async Task<bool> GeneratePreviewAsync()
    {
        if (_job is null) return false;
        await CaptureEditorStateAsync();
        SaveDraft();
        var date = PreviewDatePicker.Date?.DateTime.Date ?? DateTime.Today;
        SetBusy(true);
        var result = await _reports.BuildAsync(_job, _templateText, date);
        SetBusy(false);
        PreviewBox.Text = result.Succeeded ? result.Text : string.Empty;
        _previewedTemplate = result.Succeeded ? _templateText : string.Empty;
        SetStatus(ContentStatusInfoBar, result.Succeeded ? "预览已生成" : "无法生成日报", result.Message,
            result.Succeeded ? InfoBarSeverity.Success : InfoBarSeverity.Error);
        return result.Succeeded;
    }

    private async void TestSendButton_Click(object sender, RoutedEventArgs e)
    {
        if (_job is null || !await GeneratePreviewAsync()) return;
        SetBusy(true);
        var result = await new DailyReportRunner().TestAsync(
            _job, PreviewDatePicker.Date?.DateTime.Date ?? DateTime.Today, _templateText);
        SetBusy(false);
        _testedTemplate = result == DailyReportExitCode.Success ? _templateText : string.Empty;
        RefreshRunRecords();
        SetStatus(ContentStatusInfoBar, result == DailyReportExitCode.Success ? "测试发送成功" : "测试发送失败",
            result == DailyReportExitCode.Success ? "当前草稿可以发布。" : "请在运行记录中查看失败阶段。",
            result == DailyReportExitCode.Success ? InfoBarSeverity.Success : InfoBarSeverity.Error);
    }

    private async void ActivateTemplateButton_Click(object sender, RoutedEventArgs e)
    {
        if (_job is null) return;
        await CaptureEditorStateAsync();
        if (!string.Equals(_previewedTemplate, _templateText, StringComparison.Ordinal) ||
            !string.Equals(_testedTemplate, _templateText, StringComparison.Ordinal))
        { SetStatus(ContentStatusInfoBar, "请先预览并测试发送", "当前草稿测试发送成功后才能发布。", InfoBarSeverity.Warning); return; }
        SaveDraft();
        _job.ActiveTemplate = _job.DraftTemplate;
        _job.ActiveTemplateDocument = _job.DraftTemplateDocument;
        _job.ActiveTemplateVersion++;
        DailyReportSettingsStore.SaveJob(_job);
        RefreshOverview();
        SetStatus(ContentStatusInfoBar, "模板已发布", $"自动任务将使用版本 {_job.ActiveTemplateVersion}。", InfoBarSeverity.Success);
    }

    private void SaveDingTalkButton_Click(object sender, RoutedEventArgs e)
    {
        if (_job is null) return;
        DailyReportSettingsStore.SaveJob(_job, WebhookBox.Password, SecretBox.Password);
        WebhookBox.Password = SecretBox.Password = string.Empty;
        RefreshDingTalkStatus();
        SetStatus(DingTalkStatusInfoBar, "推送配置已保存", "未输入的凭据保持原值。", InfoBarSeverity.Success);
    }

    private async void CheckDingTalkButton_Click(object sender, RoutedEventArgs e)
    {
        if (_job is null) return;
        DailyReportSettingsStore.SaveJob(_job, WebhookBox.Password, SecretBox.Password);
        WebhookBox.Password = SecretBox.Password = string.Empty;
        SetBusy(true);
        var result = await _reports.SendAsync(DailyReportSettingsStore.ReadWebhook(_job),
            DailyReportSettingsStore.ReadSecret(_job), "【生产助手】日报机器人连接检测成功。");
        SetBusy(false);
        _job.DingTalkConnected = result.Succeeded;
        _job.DingTalkStatus = result.Message;
        _job.DingTalkCheckedAt = DateTimeOffset.Now;
        DailyReportSettingsStore.SaveJob(_job);
        RefreshDingTalkStatus();
        SetStatus(DingTalkStatusInfoBar, result.Succeeded ? "连接正常" : "连接失败", result.Message,
            result.Succeeded ? InfoBarSeverity.Success : InfoBarSeverity.Error);
    }

    private async void InstallTaskButton_Click(object sender, RoutedEventArgs e)
    {
        if (_job is null) return;
        SaveSchedule();
        var result = await DailyReportTaskScheduler.InstallAsync(_job.Id, SendTimePicker.Time);
        SetStatus(ScheduleStatusInfoBar, result.Succeeded ? "任务计划已更新" : "任务计划更新失败", result.Message,
            result.Succeeded ? InfoBarSeverity.Success : InfoBarSeverity.Error);
        await RefreshTaskStatusAsync();
    }

    private async void RemoveTaskButton_Click(object sender, RoutedEventArgs e)
    {
        if (_job is null) return;
        var result = await DailyReportTaskScheduler.RemoveAsync(_job.Id);
        if (result.Succeeded)
        {
            _job.IsEnabled = false;
            DailyReportSettingsStore.SaveJob(_job);
            RefreshOverview();
        }
        SetStatus(ScheduleStatusInfoBar, result.Succeeded ? "任务计划已停用" : "停用失败", result.Message,
            result.Succeeded ? InfoBarSeverity.Success : InfoBarSeverity.Error);
        await RefreshTaskStatusAsync();
    }

    private void SendTimePicker_TimeChanged(object sender, TimePickerValueChangedEventArgs e)
    {
        if (_loadingJob || _job is null) return;
        SaveSchedule();
        TaskStatusText.Text = "发送时间已修改，请更新任务计划使其生效";
    }

    private void SaveDraft()
    {
        if (_job is null) return;
        _job.DraftTemplate = _templateText;
        _job.DraftTemplateDocument = _templateDocument;
        DailyReportSettingsStore.SaveJob(_job);
    }

    private void SaveSchedule()
    {
        if (_job is null) return;
        _job.SendTime = SendTimePicker.Time.ToString(@"hh\:mm");
        DailyReportSettingsStore.SaveJob(_job);
        RefreshOverview();
    }

    private void RefreshOverview()
    {
        if (_job is null) return;
        EnableJobButton.Content = _job.IsEnabled ? "停用任务" : "启用任务";
        JobOverviewText.Text = $"{(_job.IsEnabled ? "已启用" : _job.ActiveTemplateVersion > 0 ? "已停用" : "草稿")} · " +
                               $"每天 {_job.SendTime} · 已发布版本 {_job.ActiveTemplateVersion}";
    }

    private void RefreshDingTalkStatus()
    {
        if (_job is null) return;
        WebhookBox.PlaceholderText = DailyReportSettingsStore.MaskWebhook(_job);
        SecretBox.PlaceholderText = DailyReportSettingsStore.MaskSecret(_job);
        DingTalkConnectionText.Text = _job.DingTalkConnected switch
        {
            true => $"连接正常 · 检测于 {_job.DingTalkCheckedAt:yyyy-MM-dd HH:mm}",
            false => $"连接失败 · {_job.DingTalkStatus}",
            _ => "尚未检测连接"
        };
    }

    private void RefreshRunRecords()
    {
        if (_job is null) return;
        RunRecordList.ItemsSource = DailyReportSettingsStore.LoadRunRecords(_job.Id)
            .Select(record => new RunRecordItem(record,
                record.StartedAt.ToString("yyyy-MM-dd HH:mm"), record.Source == "test" ? "测试发送" : "自动运行",
                record.Succeeded ? $"成功 · {record.Stage} · 尝试 {record.Attempts} 次" :
                    record.FinishedAt is null ? $"执行中 · {record.Stage}" : $"失败 · {record.Stage} · {record.Error}"))
            .ToArray();
    }

    private async void RunRecordList_ItemClick(object sender, ItemClickEventArgs e)
    {
        if (e.ClickedItem is not RunRecordItem item) return;
        var record = item.Record;
        var dialog = new ContentDialog
        {
            XamlRoot = XamlRoot,
            Title = $"{item.SourceText} · {item.TimeText}",
            Content = new TextBlock
            {
                Text = $"业务日期：{record.BusinessDate}\n模板版本：{record.TemplateVersion}\n" +
                       $"执行阶段：{record.Stage}\n结果：{(record.Succeeded ? "成功" : record.FinishedAt is null ? "执行中" : "失败")}\n" +
                       $"尝试次数：{record.Attempts}\n响应：{record.Response}\n错误：{record.Error}\n内容摘要：{record.TextSummary}",
                TextWrapping = TextWrapping.Wrap
            },
            CloseButtonText = "关闭"
        };
        await dialog.ShowAsync();
    }

    private async Task RefreshTaskStatusAsync()
    {
        if (_job is null) return;
        TaskStatusText.Text = (await DailyReportTaskScheduler.GetStatusAsync(_job.Id, _job.SendTime)).Message;
    }

    private async Task<bool> InitializeEditorAsync()
    {
        try
        {
            await TemplateEditor.EnsureCoreWebView2Async();
            TemplateEditor.CoreWebView2.WebMessageReceived += TemplateEditor_WebMessageReceived;
            TemplateEditor.CoreWebView2.SetVirtualHostNameToFolderMapping("report-editor.local",
                Path.Combine(AppContext.BaseDirectory, "Assets", "ReportEditor"), CoreWebView2HostResourceAccessKind.Allow);
            TemplateEditor.Source = new Uri("https://report-editor.local/editor.html");
            return true;
        }
        catch { return false; }
    }

    private void TemplateEditor_WebMessageReceived(CoreWebView2 sender, CoreWebView2WebMessageReceivedEventArgs args)
    {
        using var message = JsonDocument.Parse(args.WebMessageAsJson);
        var root = message.RootElement;
        var type = root.TryGetProperty("type", out var element) ? element.GetString() : string.Empty;
        if (type == "ready") { _editorReady = true; InsertTodayButton.IsEnabled = InsertFieldButton.IsEnabled = true; InitializeEditorContent(); }
        else if (type is "update" or "state")
        {
            _templateText = root.GetProperty("text").GetString() ?? string.Empty;
            _templateDocument = root.GetProperty("document").GetString() ?? string.Empty;
            if (type == "state" && root.TryGetProperty("requestId", out var requestId))
                _editorSnapshot?.TrySetResult(requestId.GetString() ?? string.Empty);
        }
    }

    private void InitializeEditorContent()
    {
        if (!_editorReady || _job is null) return;
        PostEditorMessage(new
        {
            type = "init", text = _templateText, document = _templateDocument,
            fields = _job.Fields.Select(field => new
            {
                placeholder = field.Placeholder,
                label = $"{CapsulePeriodLabel(_job.Sources.FirstOrDefault(source => source.DataSourceId == field.Token.DataSourceId)?.PeriodKind ?? "day")} · {field.Token.PropertyName}",
                tooltip = $"{PeriodLabel(_job.Sources.FirstOrDefault(source => source.DataSourceId == field.Token.DataSourceId)?.PeriodKind ?? "day")} · {field.Token.DataSourceName} · {field.Token.PropertyName}"
            })
        });
    }

    private void PostEditorMessage(object message)
    {
        if (_editorReady) TemplateEditor.CoreWebView2.PostWebMessageAsJson(JsonSerializer.Serialize(message));
    }

    private async Task CaptureEditorStateAsync()
    {
        if (!_editorReady || _job is null) return;
        var requestId = Guid.NewGuid().ToString("N");
        _editorSnapshot = new(TaskCreationOptions.RunContinuationsAsynchronously);
        PostEditorMessage(new { type = "getState", requestId });
        await Task.WhenAny(_editorSnapshot.Task, Task.Delay(1000));
        _editorSnapshot = null;
    }

    private void RefreshBindingSummary() => BindingSummaryText.Text = _job is null || _job.Sources.Count == 0
        ? "尚未绑定数据源"
        : "已绑定：" + string.Join("、", _job.Sources.Select(source => $"{source.DataSourceName}（{PeriodLabel(source.PeriodKind)}）"));

    private void RefreshSourceDetection(NotionDataSourceOption source)
    {
        var notion = NotionSettingsStore.Load();
        var period = ResolvePeriod(source, notion);
        var date = ResolveDateProperty(source, notion);
        SourceDetectionText.Text = date is null ? $"已识别：{PeriodLabel(period)} · 未找到日期字段" : $"已识别：{PeriodLabel(period)} · 日期字段：{date.Name}";
    }

    private string ResolvePeriod(NotionDataSourceOption source, NotionSettings notion)
    {
        var key = notion.Targets.FirstOrDefault(target => target.Id == source.Id)?.ModuleKey;
        if (key == ProductionMessageKinds.TowerMonthlyModuleKey) return "month";
        if (key == ProductionMessageKinds.TowerYearlyModuleKey) return "year";
        if (key == ProductionMessageKinds.TowerDailyModuleKey) return "day";
        if (source.Name.Contains("每月") || source.Name.Contains("月累计")) return "month";
        return source.Name.Contains("每年") || source.Name.Contains("年累计") ? "year" : "day";
    }

    private NotionPropertyOption? ResolveDateProperty(NotionDataSourceOption source, NotionSettings notion)
    {
        var existing = _job?.Sources.FirstOrDefault(item => item.DataSourceId == source.Id);
        var configured = notion.Targets.FirstOrDefault(target => target.Id == source.Id)?.DateProperty;
        return _properties.FirstOrDefault(property => property.Type == "date" && (property.Id == existing?.MatchPropertyId || property.Name == existing?.MatchPropertyName))
               ?? _properties.FirstOrDefault(property => property.Type == "date" && property.Name == configured)
               ?? _properties.FirstOrDefault(property => property.Type == "date" && property.Name.Contains("日期"))
               ?? _properties.FirstOrDefault(property => property.Type == "date");
    }

    private static string PeriodLabel(string value) => value switch { "month" => "本月", "year" => "本年累计", _ => "今日" };
    private static string CapsulePeriodLabel(string value) => value switch { "month" => "月", "year" => "年", _ => "日" };
    private static bool IsSupportedValue(NotionPropertyOption property) => property.Type is
        "number" or "title" or "rich_text" or "select" or "status" or "date" or "checkbox" or
        "url" or "email" or "phone_number" or "formula" or "rollup";

    private void SetBusy(bool busy) { BusyRing.IsActive = busy; BusyRing.Visibility = busy ? Visibility.Visible : Visibility.Collapsed; }
    private void SetStatus(string title, string message, InfoBarSeverity severity)
        => SetStatus(StatusInfoBar, title, message, severity);

    private static void SetStatus(InfoBar infoBar, string title, string message, InfoBarSeverity severity)
    {
        infoBar.Title = title;
        infoBar.Message = message;
        infoBar.Severity = severity;
        infoBar.IsOpen = true;
    }

    private sealed record JobListItem(DailyReportJob Job, string StatusText, string LastRunText, string DingTalkStatus)
    { public string Name => Job.Name; public string ScheduleText => $"每天 {Job.SendTime}"; }
    private sealed record RunRecordItem(DailyReportRunRecord Record, string TimeText, string SourceText, string DetailText);
}
