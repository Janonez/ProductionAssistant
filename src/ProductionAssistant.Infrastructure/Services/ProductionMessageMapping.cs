using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public static class ProductionMessageMapping
{
    private static readonly IReadOnlyDictionary<string, string[]> MappingAliases =
        new Dictionary<string, string[]>(StringComparer.Ordinal)
        {
            [ProductionMessageFields.Process] = ["工序", "动作", "工艺"],
            [ProductionMessageFields.Shift] = ["班次", "班组"],
            [ProductionMessageFields.Project] = ["项目号", "项目", "产品"],
            [ProductionMessageFields.Material] = ["材料", "材质", "规格"],
            [ProductionMessageFields.PieceCount] = ["张数", "件数", "数量", "件"],
            [ProductionMessageFields.Weight] = ["日模拟产量/吨", "下料（吨）", "下料量", "重量", "吨位"],
            [ProductionMessageFields.Unit] = ["单位"],
            [ProductionMessageFields.SheetInStock] = ["板材入库", "板材入库量", "板材"],
            [ProductionMessageFields.ProfileInStock] = ["型材入库", "型材入库量", "型材"],
            [ProductionMessageFields.Cutting] = ["下料量", "下料"],
            [ProductionMessageFields.Welding] = ["焊接量", "焊接"],
            [ProductionMessageFields.DailyOutput] = ["产出情况（套）", "产出（套）", "当日产出", "日产出", "当日产量"],
            [ProductionMessageFields.OutputSections] = ["产出情况（节）", "产出（节）", "产出节数", "产出", "完成节数", "节数", "出塔节数"],
            [ProductionMessageFields.RawMessage] = ["原始消息", "原文", "消息原文"],
            [ProductionMessageFields.MessageType] = ["消息类型", "类型"],
            [ProductionMessageFields.ParserVersion] = ["解析器版本", "解析版本"]
        };

    public static Dictionary<string, string> AutoMap(
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
}
