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
        var metrics = BuildDailyBusinessMetrics(job, source, schema.Fields);
        return new
        {
            metrics = metrics.Select(metric => new
            {
                metric.Id, metric.Name, metric.DefaultAggregate, metric.Granularity,
                hasFixedFilter = !string.IsNullOrWhiteSpace(metric.FilterPropertyId),
                filterDescription = string.IsNullOrWhiteSpace(metric.FilterPropertyId)
                    ? string.Empty
                    : $"{metric.FilterPropertyName} = {metric.FilterValue}"
            })
        };
    }

    private static async Task<object> AddDailyFieldAsync(JsonElement payload, CancellationToken cancellationToken)
    {
        var job = FindDailyJob(payload);
        var sourceId = ReadString(payload, "sourceId");
        var metricId = ReadString(payload, "metricId");
        var source = AppServices.DatabaseProvider.GetSources().FirstOrDefault(item => item.Id == sourceId)
            ?? throw new InvalidOperationException("找不到所选数据源。");
        var schema = await AppServices.DatabaseProvider.GetSchemaAsync(source.Id, cancellationToken);
        if (!schema.Succeeded) throw new InvalidOperationException(schema.Message);
        var metric = BuildDailyBusinessMetrics(job, source, schema.Fields)
            .FirstOrDefault(item => item.Id == metricId)
            ?? throw new InvalidOperationException("请选择当前数据库支持的具体业务。");
        var rangeKind = ReadString(payload, "rangeKind");
        if (rangeKind is not ("day" or "current-month" or "month" or "current-year" or "year" or
            "last-year-to-date" or "last-year" or "specific-date" or "specific-month" or "custom"))
            throw new InvalidOperationException("请选择日期范围。");
        var aggregateKind = ReadString(payload, "aggregateKind");
        if (aggregateKind is not ("sum" or "value"))
            throw new InvalidOperationException("请选择取值方式。");
        var customStartDate = ReadString(payload, "customStartDate");
        var customEndDate = ReadString(payload, "customEndDate");
        if (rangeKind is "specific-date" or "specific-month" && string.IsNullOrWhiteSpace(customStartDate))
            throw new InvalidOperationException("请选择指定日期或月份。");
        if (rangeKind == "custom" &&
            (string.IsNullOrWhiteSpace(customStartDate) || string.IsNullOrWhiteSpace(customEndDate)))
            throw new InvalidOperationException("请选择开始和结束日期。");
        var useExactMonth = metric.Granularity == "monthly" && rangeKind is "current-month" or "specific-month";
        var queryMode = useExactMonth ? "exact-match" : "date-range";
        await InvalidateDailyJobAsync(job);
        var binding = job.Sources.FirstOrDefault(item => item.DataSourceId == source.Id);
        if (binding is null) { binding = new() { DataSourceId = source.Id }; job.Sources.Add(binding); }
        binding.DataSourceName = source.Name;
        binding.MatchPropertyId = metric.DatePropertyId;
        binding.MatchPropertyName = metric.DatePropertyName;
        binding.MatchPropertyType = "date";
        var token = new DailyReportFieldToken(source.Id, source.Name,
            metric.PropertyId, metric.PropertyName, metric.PropertyType,
            QueryMode: queryMode,
            DatePropertyId: queryMode == "date-range" ? metric.DatePropertyId : "",
            DatePropertyName: queryMode == "date-range" ? metric.DatePropertyName : "",
            QueryRangeKind: rangeKind,
            AggregateKind: aggregateKind,
            FilterPropertyId: metric.FilterPropertyId,
            FilterPropertyName: metric.FilterPropertyName,
            FilterOperator: string.IsNullOrWhiteSpace(metric.FilterPropertyId) ? "" : "equals",
            FilterValue: metric.FilterValue,
            ExactMatchPropertyId: useExactMonth ? metric.DatePropertyId : "",
            ExactMatchPropertyName: useExactMonth ? metric.DatePropertyName : "",
            ExactMatchPropertyType: useExactMonth ? "date" : "",
            ExactMatchValueKind: useExactMonth
                ? rangeKind == "specific-month" ? "specific-month" : "business-month"
                : "",
            CustomStartDate: customStartDate,
            CustomEndDate: customEndDate,
            BusinessMetricId: metric.Id,
            BusinessMetricName: metric.Name,
            DataGranularity: metric.Granularity);
        var editedPlaceholder = ReadString(payload, "placeholder");
        var edited = job.Fields.FirstOrDefault(field => field.Placeholder == editedPlaceholder);
        var placeholder = edited is null
            ? DailyReportSettingsStore.AddOrUpdateField(job, token)
            : edited.Placeholder;
        if (edited is not null) edited.Token = token;
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
            throw new InvalidOperationException("Development 环境默认不启用定时发送。");
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
        var invalidField = field.Token.QueryMode switch
        {
            "date-range" => string.IsNullOrWhiteSpace(field.Token.DatePropertyId),
            "exact-match" => string.IsNullOrWhiteSpace(field.Token.ExactMatchPropertyId),
            _ => string.IsNullOrWhiteSpace(field.Token.ViewId)
        };
        var rangeKind = !string.IsNullOrWhiteSpace(field.Token.QueryRangeKind)
            ? field.Token.QueryRangeKind
            : field.Token.QueryMode == "exact-match" && field.Token.ExactMatchValueKind == "business-month"
                ? "current-month"
                : field.Token.PeriodKind switch
                {
                    "direct-month" => "current-month",
                    _ => field.Token.PeriodKind
                };
        var periodLabel = rangeKind switch
        {
            "day" => "今日",
            "current-month" => "本月",
            "month" => "本月截至业务日",
            "current-year" => "本年",
            "year" => "本年截至业务日",
            "last-year-to-date" => "去年同期",
            "last-year" => "去年全年",
            "specific-date" => "指定日期",
            "specific-month" => "指定月份",
            "custom" => "指定日期范围",
            _ => string.Empty
        };
        var metricId = ResolveBusinessMetricId(field.Token);
        var metricName = ResolveBusinessMetricName(field.Token);
        var aggregateLabel = field.Token.AggregateKind == "value" ? "取值" : "求和";
        var label = $"{periodLabel} · {metricName}";
        return new
        {
            field.Placeholder,
            label = invalidField ? $"待迁移 · {field.Token.PropertyName}" : label,
            tooltip = invalidField
                ? "字段绑定不完整，请重新编辑"
                : $"{field.Token.DataSourceName} · {metricName} · {periodLabel} · {aggregateLabel}",
            binding = new
            {
                field.Token.DataSourceId,
                businessMetricId = metricId,
                businessMetricName = metricName,
                dataGranularity = string.IsNullOrWhiteSpace(field.Token.DataGranularity)
                    ? ResolveDailyGranularity(field.Token.DataSourceName)
                    : field.Token.DataGranularity,
                rangeKind,
                field.Token.AggregateKind,
                field.Token.CustomStartDate,
                field.Token.CustomEndDate
            }
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

    private static IReadOnlyList<DailyBusinessMetric> BuildDailyBusinessMetrics(
        DailyReportJob job,
        DatabaseSourceInfo source,
        IReadOnlyList<DatabaseFieldInfo> properties)
    {
        var date = ResolveDailyDateProperty(job, source, properties);
        if (date is null) return [];
        var metrics = new List<DailyBusinessMetric>();

        void Add(string id, string name, DatabaseFieldInfo? property, string aggregate, string granularity,
            DatabaseFieldInfo? filterProperty = null, string filterValue = "")
        {
            if (property is null || metrics.Any(item => item.Id == id)) return;
            metrics.Add(new(id, name, property.Id, property.Name, property.Type, date.Id, date.Name,
                aggregate, granularity, filterProperty?.Id ?? "", filterProperty?.Name ?? "", filterValue));
        }

        if (source.Name.Contains("焊接", StringComparison.CurrentCultureIgnoreCase) &&
            source.Name.Contains("月计划", StringComparison.CurrentCultureIgnoreCase))
        {
            Add("weld.plan", "计划焊接量", FindMetricProperty(properties, "计划焊接", "焊接", "计划"), "value", "monthly");
        }
        else if (source.Name.Contains("下料", StringComparison.CurrentCultureIgnoreCase) &&
                 (source.Name.Contains("月计划", StringComparison.CurrentCultureIgnoreCase) ||
                  source.Name.Contains("每月计划", StringComparison.CurrentCultureIgnoreCase)))
        {
            Add("cut.plan", "计划下料量", FindMetricProperty(properties, "计划下料", "下料", "计划"), "value", "monthly");
        }
        else if (source.Name.Contains("原材料", StringComparison.CurrentCultureIgnoreCase))
        {
            var plate = FindMetricProperty(properties, "板材", "钢板");
            var section = FindMetricProperty(properties, "型材");
            var weight = FindMetricProperty(properties, "重量", "入库量", "吨数");
            var kind = properties.FirstOrDefault(item =>
                item.Type is "select" or "status" or "title" or "rich_text" &&
                (item.Name.Contains("类型") || item.Name.Contains("类别") || item.Name.Contains("材料")));
            Add("material.plate", "板材入库量", plate ?? weight, "sum", "daily",
                plate is null ? kind : null, plate is null ? "钢板" : "");
            Add("material.section", "型材入库量", section ?? weight, "sum", "daily",
                section is null ? kind : null, section is null ? "型材" : "");
        }
        else
        {
            Add("tower.material.plate", "板材入库量", FindMetricProperty(properties, "板材", "钢板"), "sum", "daily");
            Add("tower.material.section", "型材入库量", FindMetricProperty(properties, "型材"), "sum", "daily");
            Add("tower.cutting", "下料量", FindMetricProperty(properties, "下料"), "sum", "daily");
            Add("tower.welding", "焊接量", FindMetricProperty(properties, "焊接"), "sum", "daily");
            Add("tower.output.sets", "产出量（套）", FindMetricProperty(properties, "产出（套", "产出套", "套数"), "sum", "daily");
            Add("tower.output.sections", "产出量（节）", FindMetricProperty(properties, "产出（节", "产出节", "节数"), "sum", "daily");
        }
        if (metrics.Count == 0)
        {
            var granularity = ResolveDailyGranularity(source.Name);
            foreach (var property in properties.Where(item => item.Type is "number" or "formula" or "rollup"))
                Add($"property:{property.Id}", property.Name, property,
                    granularity == "monthly" ? "value" : "sum", granularity);
        }
        return metrics;
    }

    private static DatabaseFieldInfo? FindMetricProperty(
        IReadOnlyList<DatabaseFieldInfo> properties,
        params string[] names)
    {
        var candidates = properties.Where(item => item.Type is "number" or "formula" or "rollup").ToArray();
        return candidates.FirstOrDefault(item => names.Any(name =>
                   string.Equals(item.Name, name, StringComparison.CurrentCultureIgnoreCase)))
               ?? candidates.FirstOrDefault(item => names.Any(name =>
                   item.Name.Contains(name, StringComparison.CurrentCultureIgnoreCase)));
    }

    private static string ResolveBusinessMetricId(DailyReportFieldToken token)
    {
        if (!string.IsNullOrWhiteSpace(token.BusinessMetricId)) return token.BusinessMetricId;
        if (token.DataSourceName.Contains("焊接") && token.DataSourceName.Contains("月计划")) return "weld.plan";
        if (token.DataSourceName.Contains("下料") &&
            (token.DataSourceName.Contains("月计划") || token.DataSourceName.Contains("每月计划"))) return "cut.plan";
        if (token.DataSourceName.Contains("原材料") &&
            (token.FilterValue.Contains("钢板") || token.PropertyName.Contains("板材"))) return "material.plate";
        if (token.DataSourceName.Contains("原材料") &&
            (token.FilterValue.Contains("型材") || token.PropertyName.Contains("型材"))) return "material.section";
        if (token.PropertyName.Contains("板材")) return "tower.material.plate";
        if (token.PropertyName.Contains("型材")) return "tower.material.section";
        if (token.PropertyName.Contains("下料")) return "tower.cutting";
        if (token.PropertyName.Contains("焊接")) return "tower.welding";
        if (token.PropertyName.Contains("套")) return "tower.output.sets";
        if (token.PropertyName.Contains("节")) return "tower.output.sections";
        return string.Empty;
    }

    private static string ResolveBusinessMetricName(DailyReportFieldToken token)
    {
        if (!string.IsNullOrWhiteSpace(token.BusinessMetricName)) return token.BusinessMetricName;
        return ResolveBusinessMetricId(token) switch
        {
            "weld.plan" => "计划焊接量",
            "cut.plan" => "计划下料量",
            "material.plate" => "板材入库量",
            "material.section" => "型材入库量",
            "tower.material.plate" => "板材入库量",
            "tower.material.section" => "型材入库量",
            "tower.cutting" => "下料量",
            "tower.welding" => "焊接量",
            "tower.output.sets" => "产出量（套）",
            "tower.output.sections" => "产出量（节）",
            _ => token.PropertyName
        };
    }

    private static string ResolveDailyGranularity(string sourceName) =>
        sourceName.Contains("月计划") || sourceName.Contains("每月计划") ? "monthly" : "daily";

    private sealed record DailyBusinessMetric(
        string Id,
        string Name,
        string PropertyId,
        string PropertyName,
        string PropertyType,
        string DatePropertyId,
        string DatePropertyName,
        string DefaultAggregate,
        string Granularity,
        string FilterPropertyId,
        string FilterPropertyName,
        string FilterValue);

}
