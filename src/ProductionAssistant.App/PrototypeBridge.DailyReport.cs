using System.Text.Json;
using ProductionAssistant.Models;
using ProductionAssistant.Services;

namespace ProductionAssistant;

internal sealed partial class PrototypeBridge
{
    private static readonly DailyReportService DailyReports = AppServices.DailyReports;

    private static async Task<object> ListDailyJobsAsync()
    {
        var jobs = DailyReportSettingsStore.LoadCatalog().Jobs;
        var items = new List<object>();
        foreach (var job in jobs)
        {
            var scheduler = await DailyReportTaskScheduler.GetStatusAsync(job.Id, job.SendTime);
            items.Add(ToDailyJobSummary(job, scheduler.Installed, scheduler.Message));
        }
        return new { jobs = items };
    }

    private static object CreateDailyJob()
    {
        var catalog = DailyReportSettingsStore.LoadCatalog();
        var job = new DailyReportJob { Name = $"日报任务 {catalog.Jobs.Count + 1}" };
        DailyReportSettingsStore.SaveJob(job);
        return new { job.Id };
    }

    private static async Task<object> GetDailyJobAsync(JsonElement payload)
    {
        var job = FindDailyJob(payload);
        var notification = NotificationSettingsStore.Load();
        var scheduler = await DailyReportTaskScheduler.GetStatusAsync(job.Id, job.SendTime);
        var catalog = DatabaseSourceCatalog.Create(AppServices.DatabaseProvider.GetSources());
        return new
        {
            job.Id, job.Name, job.SendTime,
            isEnabled = DailyReportTaskScheduler.IsSchedulingAvailable && job.IsEnabled,
            schedulingAvailable = DailyReportTaskScheduler.IsSchedulingAvailable,
            validated = IsDailyValidated(job),
            job.DraftTemplate, job.DraftTemplateDocument,
            notificationConfigured = notification.DingTalkEnabled &&
                !string.IsNullOrWhiteSpace(notification.EncryptedWebhook) &&
                !string.IsNullOrWhiteSpace(notification.EncryptedSecret),
            notificationConnected = notification.DingTalkConnected,
            notificationStatus = notification.DingTalkStatus,
            schedulerInstalled = scheduler.Installed, schedulerMessage = scheduler.Message,
            usesBusinessSections = catalog.UsesBusinessSections,
            businessSections = catalog.BusinessSections,
            sources = catalog.Sources.Select(source => new { source.Id, source.Name, source.Path, businessSection = source.BusinessSection }),
            fields = DailyFieldDtos(job),
            runs = DailyRunDtos(DailyReportSettingsStore.LoadRunRecords(job.Id).Take(5))
        };
    }

    private static async Task<object> SaveDailyBasicsAsync(JsonElement payload)
    {
        var job = FindDailyJob(payload);
        var name = ReadString(payload, "name").Trim();
        var sendTime = ReadString(payload, "sendTime");
        if (string.IsNullOrWhiteSpace(name)) throw new InvalidOperationException("任务名称不能为空。");
        if (!TimeSpan.TryParse(sendTime, out var time)) throw new InvalidOperationException("发送时间无效。");
        var timeChanged = job.SendTime != sendTime;
        if (job.IsEnabled && timeChanged && !DailyReportTaskScheduler.IsSchedulingAvailable)
            job.IsEnabled = false;
        job.Name = name;
        job.SendTime = time.ToString(@"hh\:mm");
        DailyReportSettingsStore.SaveJob(job);
        if (job.IsEnabled && timeChanged)
        {
            var result = await DailyReportTaskScheduler.InstallAsync(job.Id, time);
            if (!result.Succeeded) throw new InvalidOperationException(result.Message);
        }
        return new { saved = true, job.SendTime };
    }

    private static async Task<object> SaveDailyTemplateAsync(JsonElement payload)
    {
        var job = FindDailyJob(payload);
        var text = ReadString(payload, "text");
        var document = ReadString(payload, "document");
        if (job.DraftTemplate == text && job.DraftTemplateDocument == document)
            return new { saved = true, invalidated = false };
        await InvalidateDailyJobAsync(job);
        job.DraftTemplate = text;
        job.DraftTemplateDocument = document;
        DailyReportSettingsStore.SaveJob(job);
        return new { saved = true, invalidated = true };
    }

    private static async Task<object> GetDailyPropertiesAsync(JsonElement payload, CancellationToken cancellationToken)
    {
        var job = FindDailyJob(payload);
        var sourceId = ReadString(payload, "sourceId");
        var source = AppServices.DatabaseProvider.GetSources().FirstOrDefault(item => item.Id == sourceId)
            ?? throw new InvalidOperationException("找不到所选数据源。");
        var schema = await AppServices.DatabaseProvider.GetSchemaAsync(source.Id, cancellationToken);
        if (!schema.Succeeded) throw new InvalidOperationException(schema.Message);
        var match = ResolveDailyDateProperty(job, source, schema.Fields);
        var views = await AppServices.DatabaseProvider.GetDatasetsAsync(source.Id, cancellationToken);
        return new
        {
            views = views.Select(view => new
            {
                id = view.Id,
                name = view.Name,
                supportsPeriods = SupportsDailyPeriods(view.Name)
            }),
            matchProperty = match is null ? null : new { match.Id, match.Name, match.Type },
            properties = schema.Fields
                .Where(IsDailySupportedValue)
                .Select(item => new { item.Id, item.Name, item.Type })
        };
    }

    private static async Task<object> AddDailyFieldAsync(JsonElement payload, CancellationToken cancellationToken)
    {
        var job = FindDailyJob(payload);
        var sourceId = ReadString(payload, "sourceId");
        var propertyId = ReadString(payload, "propertyId");
        var propertyName = ReadString(payload, "propertyName");
        var propertyType = ReadString(payload, "propertyType");
        var source = AppServices.DatabaseProvider.GetSources().FirstOrDefault(item => item.Id == sourceId)
            ?? throw new InvalidOperationException("找不到所选数据源。");
        if (string.IsNullOrWhiteSpace(propertyId) || string.IsNullOrWhiteSpace(propertyName) || string.IsNullOrWhiteSpace(propertyType))
            throw new InvalidOperationException("请选择要插入的字段。");
        var viewId = ReadString(payload, "viewId");
        var viewName = ReadString(payload, "viewName");
        var period = ReadString(payload, "periodKind");
        if (string.IsNullOrWhiteSpace(viewId))
            throw new InvalidOperationException("请选择统计 View。");
        if (SupportsDailyPeriods(viewName) && period is not ("day" or "month" or "year"))
            throw new InvalidOperationException("请选择日、月或年统计口径。");
        if (!SupportsDailyPeriods(viewName) && period is not ("direct-month" or "view-sum"))
            throw new InvalidOperationException("请选择直接获取业务月份或累计 View 全部记录。");
        if (SupportsDailyPeriods(viewName) &&
            (ReadString(payload, "matchPropertyType") != "date" ||
             string.IsNullOrWhiteSpace(ReadString(payload, "matchPropertyName"))))
            throw new InvalidOperationException("“本年截止今日”View 需要数据库中存在可用的日期字段。");
        await InvalidateDailyJobAsync(job);
        var binding = job.Sources.FirstOrDefault(item => item.DataSourceId == source.Id);
        if (binding is null) { binding = new() { DataSourceId = source.Id }; job.Sources.Add(binding); }
        binding.DataSourceName = source.Name;
        binding.PeriodKind = period;
        binding.MatchPropertyId = ReadString(payload, "matchPropertyId");
        binding.MatchPropertyName = ReadString(payload, "matchPropertyName");
        binding.MatchPropertyType = ReadString(payload, "matchPropertyType");
        binding.ViewId = string.Empty;
        binding.ViewName = viewName;
        var placeholder = DailyReportSettingsStore.AddOrUpdateField(job,
            new(source.Id, source.Name, propertyId, propertyName, propertyType,
                PeriodKind: period,
                ViewId: viewId, ViewName: viewName));
        DailyReportSettingsStore.SaveJob(job);
        return new { field = DailyFieldDto(job.Fields.First(field => field.Placeholder == placeholder)) };
    }

    private static async Task<object> PreviewDailyReportAsync(JsonElement payload, CancellationToken cancellationToken)
    {
        var job = FindDailyJob(payload);
        var date = ReadDate(payload, "businessDate");
        var result = await DailyReports.BuildAsync(job, job.DraftTemplate, date, cancellationToken);
        return new { result.Succeeded, result.Message, result.Text };
    }

    private static async Task<object> TestDailyReportAsync(JsonElement payload, CancellationToken cancellationToken)
    {
        var job = FindDailyJob(payload);
        var date = ReadDate(payload, "businessDate");
        var result = await new DailyReportRunner().TestAsync(job, date, job.DraftTemplate, cancellationToken);
        if (result == DailyReportExitCode.Success)
        {
            job.ActiveTemplate = job.DraftTemplate;
            job.ActiveTemplateDocument = job.DraftTemplateDocument;
            job.ActiveTemplateVersion++;
            job.ConfigurationValidated = true;
            DailyReportSettingsStore.SaveJob(job);
        }
        return new { succeeded = result == DailyReportExitCode.Success, exitCode = result.ToString() };
    }

    private static async Task<object> SendDailyReportTodayAsync(JsonElement payload, CancellationToken cancellationToken)
    {
        var job = FindDailyJob(payload);
        if (!IsDailyValidated(job)) throw new InvalidOperationException("请先完成测试发送，再发送今日消息。");
        var result = await new DailyReportRunner().SendTodayAsync(job.Id, cancellationToken);
        return new
        {
            succeeded = result is DailyReportExitCode.Success or DailyReportExitCode.AlreadySent,
            alreadySent = result == DailyReportExitCode.AlreadySent,
            exitCode = result.ToString()
        };
    }

    private static async Task<object> SetDailyEnabledAsync(JsonElement payload)
    {
        if (!DailyReportTaskScheduler.IsSchedulingAvailable)
            throw new InvalidOperationException("Debug 版本不支持定时发送，请使用 Release 版本。");
        var job = FindDailyJob(payload);
        var enabled = payload.TryGetProperty("enabled", out var value) && value.GetBoolean();
        if (!enabled)
        {
            var removed = await DailyReportTaskScheduler.RemoveAsync(job.Id);
            if (!removed.Succeeded) throw new InvalidOperationException(removed.Message);
            job.IsEnabled = false;
            DailyReportSettingsStore.SaveJob(job);
            return new { enabled = false };
        }
        var missing = DailyMissingStep(job);
        if (missing is not null) return new { enabled = false, missingStep = missing.Value.Step, message = missing.Value.Message };
        var installed = await DailyReportTaskScheduler.InstallAsync(job.Id, TimeSpan.Parse(job.SendTime));
        if (!installed.Succeeded) throw new InvalidOperationException(installed.Message);
        job.IsEnabled = true;
        DailyReportSettingsStore.SaveJob(job);
        var catchUp = DateTime.Now.TimeOfDay >= TimeSpan.Parse(job.SendTime) &&
            !DailyReportSettingsStore.LoadRunRecords(job.Id).Any(record =>
                record.Source != "test" && record.Succeeded &&
                record.BusinessDate == DateTime.Today.ToString("yyyy-MM-dd") &&
                record.TemplateVersion == job.ActiveTemplateVersion);
        var sentToday = catchUp && await new DailyReportRunner().RunAsync(job.Id) == DailyReportExitCode.Success;
        return new { enabled = true, sentToday };
    }

    private static async Task<object> DeleteDailyJobAsync(JsonElement payload)
    {
        var job = FindDailyJob(payload);
        if (job.IsEnabled) throw new InvalidOperationException("请先停用任务，再删除配置和运行记录。");
        await DailyReportTaskScheduler.RemoveAsync(job.Id);
        if (!DailyReportSettingsStore.DeleteJob(job.Id)) throw new InvalidOperationException("没有找到要删除的任务。");
        return new { deleted = true };
    }

    private static object DailyRuns(JsonElement payload)
    {
        var job = FindDailyJob(payload);
        return new { runs = DailyRunDtos(DailyReportSettingsStore.LoadRunRecords(job.Id)) };
    }

    private static DailyReportJob FindDailyJob(JsonElement payload)
    {
        var id = ReadString(payload, "id");
        return DailyReportSettingsStore.LoadCatalog().Jobs.FirstOrDefault(item => item.Id == id)
            ?? throw new InvalidOperationException("找不到指定的日报任务。");
    }

    private static async Task InvalidateDailyJobAsync(DailyReportJob job)
    {
        if (job.IsEnabled)
        {
            if (DailyReportTaskScheduler.IsSchedulingAvailable)
            {
                var removed = await DailyReportTaskScheduler.RemoveAsync(job.Id);
                if (!removed.Succeeded) throw new InvalidOperationException(removed.Message);
            }
            job.IsEnabled = false;
        }
        job.ConfigurationValidated = false;
    }

    private static bool IsDailyValidated(DailyReportJob job) =>
        job.ConfigurationValidated ?? (job.ActiveTemplateVersion > 0 && !string.IsNullOrWhiteSpace(job.ActiveTemplate));

    private static (string Step, string Message)? DailyMissingStep(DailyReportJob job)
    {
        if (string.IsNullOrWhiteSpace(job.Name)) return ("basics", "请先填写任务名称。");
        var notification = NotificationSettingsStore.Load();
        if (!notification.DingTalkEnabled || string.IsNullOrWhiteSpace(notification.EncryptedWebhook) ||
            string.IsNullOrWhiteSpace(notification.EncryptedSecret))
            return ("notification", "请先在系统设置中完成通知渠道配置。");
        if (notification.DingTalkConnected != true)
            return ("notification", "请先在系统设置中测试钉钉通知。");
        if (!IsDailyValidated(job)) return ("template", "请先生成预览并完成测试发送。");
        return null;
    }

    private static object ToDailyJobSummary(DailyReportJob job, bool schedulerInstalled, string schedulerMessage)
    {
        var last = DailyReportSettingsStore.LoadRunRecords(job.Id).FirstOrDefault();
        var missing = DailyMissingStep(job);
        var enabled = DailyReportTaskScheduler.IsSchedulingAvailable && job.IsEnabled;
        var status = enabled && !schedulerInstalled ? "schedule-error" : enabled ? "enabled" :
            missing?.Step is "basics" or "notification" ? "incomplete" : !IsDailyValidated(job) ? "pending-test" : "ready";
        var notification = NotificationSettingsStore.Load();
        return new
        {
            job.Id, job.Name, job.SendTime, isEnabled = enabled, status, schedulerMessage,
            schedulingAvailable = DailyReportTaskScheduler.IsSchedulingAvailable,
            dingTalkStatus = notification.DingTalkConnected == true ? "全局通知正常" :
                string.IsNullOrWhiteSpace(notification.EncryptedWebhook) ? "全局通知未配置" : "全局通知待检测",
            lastRun = last is null ? "暂无运行记录" : $"{last.StartedAt:MM-dd HH:mm} · {(last.Succeeded ? "成功" : "失败")}",
            missingStep = missing?.Step, missingMessage = missing?.Message
        };
    }

    private static IEnumerable<object> DailyFieldDtos(DailyReportJob job) =>
        job.Fields.Select(DailyFieldDto);

    private static object DailyFieldDto(DailyReportFieldDefinition field)
    {
        var invalidViewField = string.IsNullOrWhiteSpace(field.Token.ViewId);
        var periodLabel = field.Token.PeriodKind switch
        {
            "day" => "日",
            "month" => "月",
            "year" => "年",
            _ => string.Empty
        };
        var label = !string.IsNullOrWhiteSpace(field.Token.ViewId)
            ? $"{(string.IsNullOrWhiteSpace(periodLabel) ? field.Token.ViewName : periodLabel)} · {field.Token.PropertyName}"
            : field.Token.PropertyName;
        return new
        {
            field.Placeholder,
            label = invalidViewField ? $"已失效 · {field.Token.PropertyName}" : label,
            tooltip = invalidViewField
                ? "旧版字段没有绑定 View，请删除后重新插入"
                : !string.IsNullOrWhiteSpace(field.Token.ViewId)
                    ? $"{field.Token.DataSourceName} · {field.Token.ViewName} · {field.Token.PropertyName}"
                    : $"{field.Token.DataSourceName} · {field.Token.PropertyName}"
        };
    }

    private static IEnumerable<object> DailyRunDtos(IEnumerable<DailyReportRunRecord> records) => records.Select(record => new
    {
        record.Id, time = record.StartedAt.ToString("yyyy-MM-dd HH:mm"),
        source = record.Source == "test" ? "测试发送" : record.Source == "manual" ? "手动发送" : "自动运行",
        status = record.Succeeded ? "成功" : record.FinishedAt is null ? "执行中" : "失败",
        record.BusinessDate, record.TemplateVersion, record.Stage, record.Attempts,
        record.Response, record.Error, record.TextSummary
    });

    private static bool IsDailySupportedValue(DatabaseFieldInfo property) => property.Type is
        "number" or "title" or "rich_text" or "select" or "status" or "date" or "checkbox" or
        "url" or "email" or "phone_number" or "formula" or "rollup";

    private static DatabaseFieldInfo? ResolveDailyDateProperty(DailyReportJob job, DatabaseSourceInfo source,
        IReadOnlyList<DatabaseFieldInfo> properties)
    {
        var existing = job.Sources.FirstOrDefault(item => item.DataSourceId == source.Id);
        return properties.FirstOrDefault(property => property.Type == "date" && (property.Id == existing?.MatchPropertyId || property.Name == existing?.MatchPropertyName))
            ?? properties.FirstOrDefault(property => property.Type == "date" && property.Name.Contains("日期"))
            ?? properties.FirstOrDefault(property => property.Type == "date");
    }

    private static bool SupportsDailyPeriods(string viewName) =>
        string.Equals(viewName.Trim(), "本年截止今日", StringComparison.CurrentCultureIgnoreCase);

}
