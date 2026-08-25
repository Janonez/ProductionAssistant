using ProductionAssistant.Services;
using ProductionAssistant.Models;
using Xunit;

namespace ProductionAssistant.Tests;

public sealed class ArchitectureTests
{
    [Fact]
    public void Core_does_not_reference_UI_or_infrastructure()
    {
        var references = typeof(ProductionMessageParser).Assembly
            .GetReferencedAssemblies()
            .Select(reference => reference.Name)
            .ToArray();

        Assert.DoesNotContain("ProductionAssistant.Infrastructure", references);
        Assert.DoesNotContain("Microsoft.WinUI", references);
        Assert.DoesNotContain("Microsoft.WindowsAppSDK", references);
    }

    [Fact]
    public void Simulation_preserves_requested_total()
    {
        var rows = WeldSimulationService.Generate(500, 2026, 8, 15, new Random(42));

        Assert.Equal(31, rows.Count);
        Assert.Equal(500, rows.Sum(row => row.Quantity));
    }

    [Fact]
    public void Prototype_bridge_rejects_unknown_operations()
    {
        Assert.True(PrototypeBridgeProtocol.IsAllowed("production.parse"));
        Assert.True(PrototypeBridgeProtocol.IsAllowed("app.navigateNative"));
        Assert.True(PrototypeBridgeProtocol.IsAllowed("daily.list"));
        Assert.True(PrototypeBridgeProtocol.IsAllowed("daily.test"));
        Assert.True(PrototypeBridgeProtocol.IsAllowed("daily.sendToday"));
        Assert.False(PrototypeBridgeProtocol.IsAllowed("filesystem.read"));
        Assert.False(PrototypeBridgeProtocol.IsAllowed(string.Empty));
        Assert.True(PrototypeBridgeProtocol.IsNavigationAllowed("production-message"));
        Assert.True(PrototypeBridgeProtocol.IsNavigationAllowed("daily-report"));
        Assert.False(PrototypeBridgeProtocol.IsNavigationAllowed("filesystem"));
        Assert.False(PrototypeBridgeProtocol.IsNavigationAllowed("home"));
        Assert.Equal("输入无效", PrototypeBridgeProtocol.SafeError(new InvalidOperationException("输入无效")));
        Assert.DoesNotContain("secret", PrototypeBridgeProtocol.SafeError(new Exception("secret")));
    }

    [Fact]
    public void Prototype_ready_message_only_matches_the_current_navigation()
    {
        Assert.True(PrototypeBridgeProtocol.IsCurrentNavigation(
            "daily-report", "current", "daily-report", "current"));
        Assert.False(PrototypeBridgeProtocol.IsCurrentNavigation(
            "production-message", "old", "daily-report", "current"));
        Assert.False(PrototypeBridgeProtocol.IsCurrentNavigation(
            "daily-report", string.Empty, "daily-report", string.Empty));
    }

    [Fact]
    public void Prototype_field_roundtrip_remains_writeable()
    {
        var date = new DateTime(2026, 8, 13);
        var original = ProductionMessageParser.Parse(ProductionMessageParser.Split("2026-08-13 下料 10 张 5 吨", date).Single(), 1, date, true);
        var roundtrip = new ProductionMessageDraft
        {
            Index = original.Index,
            Kind = original.Kind,
            TypeDisplay = original.TypeDisplay,
            BusinessDateText = original.BusinessDateText,
            OriginalText = original.OriginalText,
            ParserVersion = original.ParserVersion
        };
        roundtrip.SetFields(original.Fields);
        roundtrip.SetDatabaseFieldMappings(new Dictionary<ProductionMessageKind, IReadOnlyDictionary<string, string>>
        {
            [ProductionMessageKind.MaterialCutting] = new Dictionary<string, string>
            {
                [ProductionMessageFields.Weight] = "重量"
            }
        });
        roundtrip.FieldsText = ProductionMessageParser.FormatFields(roundtrip.Kind, roundtrip.Fields, roundtrip.PlanMonth);

        Assert.True(ProductionMessageParser.ApplyEdits(roundtrip, new DateTime(2026, 8, 13), true, out _));
        Assert.True(ProductionMessageParser.TryCreateValue(roundtrip, out var value, out _));
        Assert.Equal("5", ProductionMessageFields.DisplayValue(
            ProductionMessageFields.Weight,
            value.Fields[ProductionMessageFields.Weight]));
        Assert.DoesNotContain(ProductionMessageFields.PieceCount, value.Fields.Keys);
    }

    [Fact]
    public void Explicit_database_property_is_parsed_without_a_new_field_constant()
    {
        var date = new DateTime(2026, 8, 17);
        var draft = ProductionMessageParser.Parse(
            ProductionMessageParser.Split("2026-08-17 下料 5吨\n检验备注：已复核", date).Single(),
            1,
            date,
            true);
        var dynamicKey = ProductionMessageFields.DatabasePropertyKey("检验备注");
        draft.SetDatabaseFieldMappings(new Dictionary<ProductionMessageKind, IReadOnlyDictionary<string, string>>
        {
            [ProductionMessageKind.MaterialCutting] = new Dictionary<string, string>
            {
                [ProductionMessageFields.Weight] = "重量",
                [dynamicKey] = "检验备注"
            }
        });

        ProductionMessageParser.ApplyMappedDatabaseFields(draft, draft.OriginalText);

        Assert.True(ProductionMessageParser.ValidateDatabaseMapping(draft));
        Assert.Equal("待检查", draft.StatusText);
        Assert.Equal("已复核", draft.Fields[dynamicKey]);
        Assert.Contains(draft.PreviewFields, field => field.Label == "检验备注" && field.Value == "已复核");
        Assert.True(ProductionMessageParser.TryCreateValue(draft, out var value, out _));
        Assert.Equal("已复核", value.Fields[dynamicKey]);
    }

    [Fact]
    public void Tower_output_keeps_daily_sets_and_sections_separate_from_annual_totals()
    {
        var date = new DateTime(2026, 8, 24);
        var draft = ProductionMessageParser.Parse(
            ProductionMessageParser.Split("""
                **2026‑08‑24 塔筒产线：**
                （一）板材、型材入库情况
                板材：当日：0 吨；当月：0 吨；全年累计：4803.41 吨
                型材：当日：0 吨；当月：0 吨；全年累计：0 吨
                （二）下料情况
                当日：0 吨；当月：0 吨；全年累计：4803.41 吨
                （三）焊接情况
                当日：43.22吨；当月：914.63吨；全年累计：4178.06吨
                （四）产出情况：
                当日：0套；当月：0套；全年累计：2套（八节）
                """, date).Single(),
            1,
            date,
            false);
        draft.SetDatabaseFieldMappings(new Dictionary<ProductionMessageKind, IReadOnlyDictionary<string, string>>
        {
            [ProductionMessageKind.TowerLineDaily] = new Dictionary<string, string>
            {
                [ProductionMessageFields.DailyOutput] = "产出（套）",
                [ProductionMessageFields.OutputSections] = "产出（节）"
            }
        });

        Assert.Equal("0套", draft.Fields[ProductionMessageFields.DailyOutput]);
        Assert.Equal("0节", draft.Fields[ProductionMessageFields.OutputSections]);
        Assert.Contains(draft.PreviewFields, field => field.Label == "产出（套）" && field.Value == "0套");
        Assert.Contains(draft.PreviewFields, field => field.Label == "产出（节）" && field.Value == "0节");
    }

    [Fact]
    public void Preview_fields_follow_the_database_mapping_even_when_the_message_has_no_value()
    {
        var draft = new ProductionMessageDraft
        {
            Index = 1,
            Kind = ProductionMessageKind.TowerLineDaily,
            BusinessDate = new DateTime(2026, 8, 25),
            CanWrite = true
        };
        draft.SetFields(new Dictionary<string, string>
        {
            [ProductionMessageFields.DailyOutput] = "1套"
        });
        draft.SetDatabaseFieldMappings(new Dictionary<ProductionMessageKind, IReadOnlyDictionary<string, string>>
        {
            [ProductionMessageKind.TowerLineDaily] = new Dictionary<string, string>
            {
                [ProductionMessageFields.DailyOutput] = "产出（套）",
                [ProductionMessageFields.OutputSections] = "产出（节）"
            }
        });

        Assert.Contains(draft.PreviewFields, field => field.Key == ProductionMessageFields.DailyOutput);
        Assert.Contains(draft.PreviewFields, field =>
            field.Key == ProductionMessageFields.OutputSections && field.Value == string.Empty);
    }
}
