using System.Globalization;
using System.Text.Json;
using ProductionAssistant.Models;
using ProductionAssistant.Services;

namespace ProductionAssistant;

internal sealed partial class PrototypeBridge
{
    private const string WeldModuleKey = "daily-weld-simulation";

    private static object GetWeldState()
    {
        var settings = NotionSettingsStore.Load();
        var binding = settings.Targets.FirstOrDefault(target => target.ModuleKey == WeldModuleKey);
        return new
        {
            configured = !string.IsNullOrWhiteSpace(settings.Token),
            binding = new
            {
                bound = binding is not null &&
                        !string.IsNullOrWhiteSpace(binding.Id) &&
                        !string.IsNullOrWhiteSpace(binding.DateProperty) &&
                        !string.IsNullOrWhiteSpace(binding.QuantityProperty),
                name = binding?.Name ?? string.Empty,
                path = binding?.Path ?? string.Empty
            },
            sources = settings.CachedDataSources.Select(source => new { source.Id, source.Name, source.Path }),
            selected = binding?.Id ?? string.Empty
        };
    }

    private static object GenerateWeld(JsonElement payload)
    {
        var (year, month) = ReadWeldMonth(payload);
        var total = ReadPositiveWeldTotal(payload);
        return WeldSimulationService.Generate(total, year, month, 22).Select(row => new
        {
            date = row.DateText,
            weekday = row.Weekday,
            isWeekend = row.Date.DayOfWeek is DayOfWeek.Saturday or DayOfWeek.Sunday,
            qty = (int)row.Quantity,
            note = row.Note
        });
    }

    private static async Task<object> SaveWeldBindingAsync(JsonElement payload, CancellationToken cancellationToken)
    {
        var sourceId = ReadString(payload, "sourceId");
        var settings = NotionSettingsStore.Load();
        if (string.IsNullOrWhiteSpace(settings.Token))
            throw new InvalidOperationException("请先到“设置 → Notion 连接”填写 API 令牌并获取数据源。");
        var source = settings.CachedDataSources.FirstOrDefault(item => item.Id == sourceId)
            ?? throw new InvalidOperationException("请选择已缓存的 Notion 数据源。");
        var schema = await AppServices.Notion.GetSchemaAsync(settings.Token, source.Id, cancellationToken);
        if (!schema.Succeeded) throw new InvalidOperationException(schema.Message);

        var title = schema.Properties.FirstOrDefault(property => property.Type == "title");
        var date = schema.Properties.FirstOrDefault(property => property.Type == "date" && property.Name.Contains("日期"))
                   ?? schema.Properties.FirstOrDefault(property => property.Type == "date");
        var quantity = schema.Properties.FirstOrDefault(property =>
                           property.Type == "number" &&
                           (property.Name.Contains("每日数据") || property.Name.Contains("产量")))
                       ?? schema.Properties.FirstOrDefault(property => property.Type == "number");
        if (title is null || date is null || quantity is null)
            throw new InvalidOperationException("需要同时存在标题、日期和数字字段，当前数据源无法自动绑定。");

        foreach (var previous in settings.Targets.Where(target => target.ModuleKey == WeldModuleKey && target.Id != source.Id))
        {
            previous.ModuleKey = string.Empty;
            previous.ModuleName = string.Empty;
        }
        var binding = settings.Targets.FirstOrDefault(target => target.Id == source.Id);
        if (binding is null)
        {
            binding = new NotionTargetSettings { Id = source.Id };
            settings.Targets.Add(binding);
        }
        binding.ModuleKey = WeldModuleKey;
        binding.ModuleName = "每日焊接数据模拟";
        binding.Name = source.Name;
        binding.Path = source.Path;
        binding.TitleProperty = title.Name;
        binding.DateProperty = date.Name;
        binding.QuantityProperty = quantity.Name;
        settings.ActiveTargetId = binding.Id;
        NotionSettingsStore.Save(settings);
        return GetWeldState();
    }

    private static async Task<object> CheckWeldAsync(JsonElement payload, CancellationToken cancellationToken)
    {
        var request = BuildWeldRequest(payload);
        var existing = await AppServices.Notion.HasExistingDataAsync(request, cancellationToken);
        if (!existing.Succeeded) throw new InvalidOperationException(existing.Message);
        var plan = await AppServices.Notion.PrepareImportAsync(request, cancellationToken);
        if (!plan.Succeeded) throw new InvalidOperationException(plan.Message);
        if (plan.Items.Any(item => item.Status == "duplicated"))
            throw new InvalidOperationException("目标月份存在重复日期记录，请先在 Notion 中合并重复记录。");
        return new { plan.Succeeded, plan.Message, existing.HasExistingData, plan.Items };
    }

    private async Task<object> WriteWeldAsync(string id, JsonElement payload, CancellationToken cancellationToken)
    {
        var request = BuildWeldRequest(payload);
        var existing = await AppServices.Notion.HasExistingDataAsync(request, cancellationToken);
        if (!existing.Succeeded) throw new InvalidOperationException(existing.Message);
        var overwrite = payload.TryGetProperty("overwriteExisting", out var value) && value.ValueKind == JsonValueKind.True;
        if (existing.HasExistingData && !overwrite)
            throw new InvalidOperationException("目标月份已有产量，请确认覆盖后再写入。");
        var plan = await AppServices.Notion.PrepareImportAsync(request, cancellationToken);
        if (!plan.Succeeded) throw new InvalidOperationException(plan.Message);
        if (plan.Items.Any(item => item.Status == "duplicated"))
            throw new InvalidOperationException("目标月份存在重复日期记录，请先在 Notion 中合并重复记录。");
        var progress = new Progress<NotionImportProgress>(item => Post(new { id, type = "progress", data = item }));
        var result = await AppServices.Notion.ImportWeldHierarchyAsync(request, progress, cancellationToken);
        if (!result.Succeeded) throw new InvalidOperationException(result.Message);
        return result;
    }

    private static NotionImportRequest BuildWeldRequest(JsonElement payload)
    {
        var (year, month) = ReadWeldMonth(payload);
        var total = ReadPositiveWeldTotal(payload);
        if (!payload.TryGetProperty("rows", out var rows) || rows.ValueKind != JsonValueKind.Array)
            throw new InvalidOperationException("每日拆分数据无效，请重新生成。");
        var values = new List<NotionDailyWeldValue>();
        foreach (var row in rows.EnumerateArray())
        {
            if (!DateTime.TryParseExact(ReadString(row, "date"), "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var date) ||
                date.Year != year || date.Month != month)
                throw new InvalidOperationException("每日拆分包含无效日期，请重新生成。");
            if (!TryReadNonNegativeInteger(row, "qty", out var quantity))
                throw new InvalidOperationException($"{date:yyyy-MM-dd} 的计划量必须是非负整数。");
            values.Add(new NotionDailyWeldValue(date, quantity));
        }
        var expectedDays = DateTime.DaysInMonth(year, month);
        if (values.Count != expectedDays || values.Select(item => item.Date.Date).Distinct().Count() != expectedDays ||
            values.Min(item => item.Date).Day != 1 || values.Max(item => item.Date).Day != expectedDays)
            throw new InvalidOperationException("每日拆分必须完整覆盖所选月份的每一天。");
        if (values.Sum(item => item.Quantity) != total)
            throw new InvalidOperationException("每日拆分合计必须与计划焊接总量一致。");
        return new NotionImportRequest(values.OrderBy(item => item.Date).ToArray());
    }

    private static (int Year, int Month) ReadWeldMonth(JsonElement payload)
    {
        var text = ReadString(payload, "month");
        if (!DateTime.TryParseExact(text, "yyyy-MM", CultureInfo.InvariantCulture, DateTimeStyles.None, out var date))
            throw new InvalidOperationException("请选择有效的计划月份。");
        return (date.Year, date.Month);
    }

    private static int ReadPositiveWeldTotal(JsonElement payload)
    {
        if (!TryReadNonNegativeInteger(payload, "total", out var total) || total <= 0)
            throw new InvalidOperationException("计划焊接总量必须是大于 0 的整数吨数。");
        return total;
    }

    private static bool TryReadNonNegativeInteger(JsonElement element, string propertyName, out int result)
    {
        result = 0;
        if (!element.TryGetProperty(propertyName, out var value)) return false;
        return value.ValueKind switch
        {
            JsonValueKind.Number => value.TryGetInt32(out result) && result >= 0,
            JsonValueKind.String => int.TryParse(value.GetString(), NumberStyles.None, CultureInfo.InvariantCulture, out result) && result >= 0,
            _ => false
        };
    }
}
