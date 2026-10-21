using ProductionAssistant.Models;
using ProductionAssistant.Services;
using Xunit;

namespace ProductionAssistant.Tests;

public sealed class ProductionMessageMappingTests
{
    [Fact]
    public void material_cutting_matches_exact_property_names()
    {
        NotionPropertyOption[] properties =
        [
            new NotionPropertyOption("工序", "rich_text"),
            new NotionPropertyOption("班次", "rich_text"),
            new NotionPropertyOption("项目号", "rich_text"),
            new NotionPropertyOption("材料", "rich_text"),
            new NotionPropertyOption("张数", "rich_text"),
            new NotionPropertyOption("日模拟产量/吨", "rich_text"),
            new NotionPropertyOption("单位", "rich_text"),
            new NotionPropertyOption("原始消息", "rich_text"),
            new NotionPropertyOption("消息类型", "rich_text"),
            new NotionPropertyOption("解析器版本", "rich_text")
        ];
        var expected = new Dictionary<string, string>
        {
            [ProductionMessageFields.Process] = "工序",
            [ProductionMessageFields.Shift] = "班次",
            [ProductionMessageFields.Project] = "项目号",
            [ProductionMessageFields.Material] = "材料",
            [ProductionMessageFields.PieceCount] = "张数",
            [ProductionMessageFields.Weight] = "日模拟产量/吨",
            [ProductionMessageFields.Unit] = "单位",
            [ProductionMessageFields.RawMessage] = "原始消息",
            [ProductionMessageFields.MessageType] = "消息类型",
            [ProductionMessageFields.ParserVersion] = "解析器版本"
        };

        var actual = ProductionMessageMapping.AutoMap(properties, ProductionMessageKind.MaterialCutting);

        Assert.Equal(expected, actual);
    }

    [Fact]
    public void tower_line_daily_falls_back_to_containing_property_names()
    {
        NotionPropertyOption[] properties =
        [
            new NotionPropertyOption("板材入库情况（吨）", "rich_text"),
            new NotionPropertyOption("焊接情况（吨）", "rich_text")
        ];
        var expected = new Dictionary<string, string>
        {
            [ProductionMessageFields.SheetInStock] = "板材入库情况（吨）",
            [ProductionMessageFields.Welding] = "焊接情况（吨）"
        };

        var actual = ProductionMessageMapping.AutoMap(properties, ProductionMessageKind.TowerLineDaily);

        Assert.Equal(expected, actual);
    }

    [Fact]
    public void exact_match_precedes_containing_match()
    {
        NotionPropertyOption[] properties =
        [
            new NotionPropertyOption("下料情况（吨）", "rich_text"),
            new NotionPropertyOption("下料", "rich_text")
        ];
        var expected = new Dictionary<string, string>
        {
            [ProductionMessageFields.Cutting] = "下料"
        };

        var actual = ProductionMessageMapping.AutoMap(properties, ProductionMessageKind.TowerLineDaily);

        Assert.Equal(expected, actual);
    }

    [Fact]
    public void property_is_used_only_once()
    {
        NotionPropertyOption[] properties =
        [
            new NotionPropertyOption("产出情况（套）", "rich_text")
        ];
        var expected = new Dictionary<string, string>
        {
            [ProductionMessageFields.DailyOutput] = "产出情况（套）"
        };

        var actual = ProductionMessageMapping.AutoMap(properties, ProductionMessageKind.TowerLineDaily);

        Assert.Equal(expected, actual);
    }

    [Fact]
    public void unknown_kind_maps_only_common_fields()
    {
        NotionPropertyOption[] properties =
        [
            new NotionPropertyOption("原始消息", "rich_text"),
            new NotionPropertyOption("无关字段", "rich_text")
        ];
        var expected = new Dictionary<string, string>
        {
            [ProductionMessageFields.RawMessage] = "原始消息"
        };

        var actual = ProductionMessageMapping.AutoMap(properties, ProductionMessageKind.Unknown);

        Assert.Equal(expected, actual);
    }

    [Fact]
    public void empty_properties_returns_empty_dictionary()
    {
        var actual = ProductionMessageMapping.AutoMap([], ProductionMessageKind.MaterialCutting);

        Assert.Empty(actual);
    }
}
