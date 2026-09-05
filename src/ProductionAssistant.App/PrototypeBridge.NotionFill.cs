using System.Text.Json;
using ProductionAssistant.Models;
using ProductionAssistant.Services;

namespace ProductionAssistant;

internal sealed partial class PrototypeBridge
{
    private static object CreateNotionFillJob(JsonElement payload)
    {
        var catalog = NotionFillSettingsStore.LoadCatalog();
        var name = ReadString(payload, "name").Trim();
        var sourcePageUrl = NormalizeNotionFillSourcePageUrl(ReadString(payload, "sourcePageUrl"));
        var baseUrl = new Uri(sourcePageUrl).GetLeftPart(UriPartial.Authority);
        var username = ReadString(payload, "username").Trim();
        var password = ReadString(payload, "password");
        if (string.IsNullOrWhiteSpace(name))
            name = catalog.Jobs.Count == 0 ? "原材料入库自动填报" : $"原材料入库自动填报 {catalog.Jobs.Count + 1}";
        if (payload.ValueKind == JsonValueKind.Object && string.IsNullOrWhiteSpace(username))
            throw new InvalidOperationException("93系统用户名不能为空。");
        if (payload.ValueKind == JsonValueKind.Object && string.IsNullOrWhiteSpace(password))
            throw new InvalidOperationException("93系统密码不能为空。");
        var target = AppServices.DatabaseProvider.GetSources().FirstOrDefault(source =>
            string.Equals(source.Name, "原材料入库数据库", StringComparison.Ordinal));
        var job = new NotionFillJob
        {
            Name = name,
            BaseUrl = baseUrl,
            SourcePageUrl = sourcePageUrl,
            TargetDataSourceId = target?.Id ?? string.Empty,
            TargetDataSourceName = target?.Name ?? "原材料入库数据库"
        };
        if (string.IsNullOrWhiteSpace(username)) NotionFillSettingsStore.SaveJob(job);
        else NotionFillSettingsStore.SaveCredentials(job, username, password);
        return new { job.Id };
    }

    private static async Task<object> GetNotionFillJobAsync(JsonElement payload)
    {
        var job = FindNotionFillJob(payload);
        if (string.IsNullOrWhiteSpace(job.TargetDataSourceId))
        {
            var target = AppServices.DatabaseProvider.GetSources().FirstOrDefault(source =>
                string.Equals(source.Name, "原材料入库数据库", StringComparison.Ordinal));
            if (target is not null)
            {
                job.TargetDataSourceId = target.Id;
                job.TargetDataSourceName = target.Name;
                NotionFillSettingsStore.SaveJob(job);
            }
        }
        var scheduler = await NotionFillTaskScheduler.GetStatusAsync(job.Id);
        var notion = NotionSettingsStore.Load();
        return new
        {
            job.Id,
            job.Name,
            job.SourcePageUrl,
            job.Username,
            passwordConfigured = !string.IsNullOrWhiteSpace(job.EncryptedPassword),
            notionConfigured = !string.IsNullOrWhiteSpace(notion.Token),
            job.TargetDataSourceName,
            validated = job.ConfigurationValidated,
            isEnabled = NotionFillTaskScheduler.IsSchedulingAvailable && job.IsEnabled,
            schedulingAvailable = NotionFillTaskScheduler.IsSchedulingAvailable,
            schedule = "每天 00:00 · 填报前一天",
            schedulerInstalled = scheduler.Installed,
            schedulerMessage = scheduler.Message,
            runs = NotionFillRunDtos(NotionFillSettingsStore.LoadRunRecords(job.Id).Take(5))
        };
    }

    private static async Task<object> SaveNotionFillJobAsync(JsonElement payload)
    {
        var job = FindNotionFillJob(payload);
        var name = ReadString(payload, "name").Trim();
        var sourcePageUrl = NormalizeNotionFillSourcePageUrl(ReadString(payload, "sourcePageUrl"));
        var baseUrl = new Uri(sourcePageUrl).GetLeftPart(UriPartial.Authority);
        var username = ReadString(payload, "username").Trim();
        var password = ReadString(payload, "password");
        if (string.IsNullOrWhiteSpace(name)) throw new InvalidOperationException("任务名称不能为空。");
        if (string.IsNullOrWhiteSpace(username)) throw new InvalidOperationException("93系统用户名不能为空。");
        if (string.IsNullOrWhiteSpace(password) && string.IsNullOrWhiteSpace(job.EncryptedPassword))
            throw new InvalidOperationException("93系统密码不能为空。");
        var changed = job.Name != name || job.BaseUrl != baseUrl || job.SourcePageUrl != sourcePageUrl ||
            job.Username != username || !string.IsNullOrEmpty(password);
        if (changed && job.IsEnabled)
        {
            var removed = await NotionFillTaskScheduler.RemoveAsync(job.Id);
            if (!removed.Succeeded) throw new InvalidOperationException(removed.Message);
            job.IsEnabled = false;
        }
        job.Name = name;
        job.BaseUrl = baseUrl;
        job.SourcePageUrl = sourcePageUrl;
        if (changed) job.ConfigurationValidated = false;
        NotionFillSettingsStore.SaveCredentials(job, username, password);
        return new { saved = true, invalidated = changed };
    }

    private static async Task<object> TestNotionFillJobAsync(
        JsonElement payload,
        CancellationToken cancellationToken)
    {
        var job = FindNotionFillJob(payload);
        if (!DateOnly.TryParse(ReadString(payload, "businessDate"), out var businessDate))
            throw new InvalidOperationException("测试日期无效。");
        var startedAt = DateTimeOffset.Now;
        try
        {
            var preview = await new MaterialInboundNotionFillService()
                .PreviewAsync(job, businessDate, cancellationToken);
            job.ConfigurationValidated = true;
            NotionFillSettingsStore.SaveJob(job);
            NotionFillSettingsStore.AddRunRecord(new NotionFillRunRecord
            {
                JobId = job.Id,
                Source = "test",
                StartedAt = startedAt,
                FinishedAt = DateTimeOffset.Now,
                BusinessDate = businessDate.ToString("yyyy-MM-dd"),
                Succeeded = true,
                PlateWeight = preview.Summary.PlateWeight,
                SectionWeight = preview.Summary.SectionWeight,
                Message = preview.Message
            });
            return new
            {
                succeeded = true,
                businessDate = businessDate.ToString("yyyy-MM-dd"),
                plateWeight = preview.Summary.PlateWeight,
                sectionWeight = preview.Summary.SectionWeight,
                totalWeight = preview.Summary.TotalWeight,
                preview.TargetRecordExists,
                preview.Message
            };
        }
        catch (Exception ex) when (ex is not OperationCanceledException)
        {
            NotionFillSettingsStore.AddRunRecord(new NotionFillRunRecord
            {
                JobId = job.Id,
                Source = "test",
                StartedAt = startedAt,
                FinishedAt = DateTimeOffset.Now,
                BusinessDate = businessDate.ToString("yyyy-MM-dd"),
                Error = ex.Message
            });
            throw;
        }
    }

    private static async Task<object> TestNotionFillSourceAsync(
        JsonElement payload,
        CancellationToken cancellationToken)
    {
        var job = FindNotionFillJob(payload);
        if (!DateOnly.TryParse(ReadString(payload, "businessDate"), out var businessDate))
            throw new InvalidOperationException("测试日期无效。");
        var startedAt = DateTimeOffset.Now;
        var record = new NotionFillRunRecord
        {
            JobId = job.Id,
            Source = "source-test",
            StartedAt = startedAt,
            BusinessDate = businessDate.ToString("yyyy-MM-dd")
        };
        try
        {
            var summary = await MaterialInboundNotionFillService.ReadSourceAsync(
                job, businessDate, cancellationToken);
            record.Succeeded = true;
            record.PlateWeight = summary.PlateWeight;
            record.SectionWeight = summary.SectionWeight;
            record.Message = "93系统材料入库读取成功；本次未访问 Notion。";
            return new
            {
                succeeded = true,
                businessDate = businessDate.ToString("yyyy-MM-dd"),
                summary.PlateWeight,
                summary.SectionWeight,
                summary.TotalWeight,
                record.Message
            };
        }
        catch (Exception ex) when (ex is not OperationCanceledException)
        {
            record.Error = ex.Message;
            throw;
        }
        finally
        {
            record.FinishedAt = DateTimeOffset.Now;
            NotionFillSettingsStore.AddRunRecord(record);
        }
    }

    private static async Task<object> RunNotionFillJobAsync(
        JsonElement payload,
        CancellationToken cancellationToken)
    {
        var job = FindNotionFillJob(payload);
        if (!DateOnly.TryParse(ReadString(payload, "businessDate"), out var businessDate))
            throw new InvalidOperationException("执行日期无效。");
        if (!job.ConfigurationValidated)
            throw new InvalidOperationException("请先完成只读测试，再执行正式新增。");

        var result = await AppServices.NotionFillTasks.ExecuteForDateAsync(
            job, businessDate, "manual", DateTimeOffset.Now, cancellationToken);
        if (!result.Succeeded) throw new InvalidOperationException(result.Message);
        return new
        {
            result.Succeeded,
            result.ExitCode,
            created = result.ExitCode == (int)NotionFillExitCode.Success,
            skipped = result.ExitCode == (int)NotionFillExitCode.AlreadyExists,
            result.Message
        };
    }

    private static object NotionFillRuns(JsonElement payload)
    {
        var job = FindNotionFillJob(payload);
        return new { runs = NotionFillRunDtos(NotionFillSettingsStore.LoadRunRecords(job.Id)) };
    }

    private static object[] NotionFillRunDtos(IEnumerable<NotionFillRunRecord> records) =>
        records.Select(record => (object)new
        {
            record.Id,
            time = record.StartedAt.ToString("yyyy-MM-dd HH:mm:ss"),
            record.Source,
            status = record.Succeeded ? record.Created ? "created" : "checked" : "failed",
            record.BusinessDate,
            record.PlateWeight,
            record.SectionWeight,
            record.Message,
            record.Error
        }).ToArray();

    private static NotionFillJob FindNotionFillJob(JsonElement payload)
    {
        var id = ReadString(payload, "id");
        return NotionFillSettingsStore.LoadCatalog().Jobs.FirstOrDefault(job => job.Id == id)
            ?? throw new InvalidOperationException("找不到指定的 Notion 自动填报任务。");
    }

    private static string NormalizeNotionFillSourcePageUrl(string value)
    {
        value = value.Trim().TrimEnd('/');
        if (!Uri.TryCreate(value, UriKind.Absolute, out var uri) || uri.Scheme is not ("http" or "https"))
            throw new InvalidOperationException("93系统业务页面地址无效。");
        return value;
    }
}
