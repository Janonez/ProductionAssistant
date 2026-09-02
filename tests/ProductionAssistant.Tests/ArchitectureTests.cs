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
    public void Simulation_keeps_low_monthly_totals_non_negative()
    {
        var rows = WeldSimulationService.Generate(16, 2026, 8, 22, new Random(42));

        Assert.Equal(16, rows.Sum(row => row.Quantity));
        Assert.All(rows, row => Assert.True(row.Quantity >= 0));
    }

    [Fact]
    public void Daily_report_lists_every_database_returned_by_notion()
    {
        var sources = new[]
        {
            new NotionDataSourceOption("daily", "塔筒产线数据库", "生产数据 / 塔筒 / 塔筒产线数据库"),
            new NotionDataSourceOption("monthly", "塔筒产线每月累计", "生产数据 / 塔筒 / 塔筒产线每月累计"),
            new NotionDataSourceOption("yearly", "塔筒产线每年累计", "生产数据 / 塔筒 / 塔筒产线每年累计")
        };
        var targets = new[]
        {
            new NotionTargetSettings { ModuleKey = ProductionMessageKinds.TowerDailyModuleKey, Id = "daily" },
            new NotionTargetSettings { ModuleKey = ProductionMessageKinds.TowerMonthlyModuleKey, Id = "monthly" },
            new NotionTargetSettings { ModuleKey = ProductionMessageKinds.TowerYearlyModuleKey, Id = "yearly" }
        };

        var visible = DailyReportPresentation.VisibleSources(sources, targets);

        Assert.Equal(new[] { "daily", "monthly", "yearly" }, visible.Select(source => source.Id));
    }

    [Fact]
    public void Database_root_exposes_business_pages_before_their_databases()
    {
        var sources = new[]
        {
            new DatabaseSourceInfo("cutting", "下料数据库", "数据库 / 下料数据库 / 下料数据库", "下料数据库"),
            new DatabaseSourceInfo("plan", "下料每月计划数据库", "数据库 / 下料数据库 / 下料每月计划数据库", "下料数据库"),
            new DatabaseSourceInfo("toolbox", "工具箱", "数据库 / 工具箱")
        };

        Assert.Equal(["下料数据库"], DailyReportPresentation.BusinessSections(sources));
        Assert.Equal("下料数据库", DailyReportPresentation.BusinessSection(sources[0].Path));
        Assert.Equal(string.Empty, DailyReportPresentation.BusinessSection(sources[2].Path));
    }

    [Fact]
    public void Flat_database_provider_does_not_require_business_pages()
    {
        var catalog = DatabaseSourceCatalog.Create([
            new DatabaseSourceInfo("daily", "本地产量表", "本地产量表"),
            new DatabaseSourceInfo("plan", "本地计划表", "本地计划表")
        ]);

        Assert.False(catalog.UsesBusinessSections);
        Assert.Empty(catalog.BusinessSections);
        Assert.Equal(2, catalog.Sources.Count);
    }

    [Fact]
    public void Daily_report_keeps_separate_tokens_for_each_view()
    {
        var job = new DailyReportJob();

        var day = DailyReportSettingsStore.AddOrUpdateField(job,
            new("tower", "塔筒产线数据库", "weld", "焊接（吨）", "number", ViewId: "day", ViewName: "日"));
        var month = DailyReportSettingsStore.AddOrUpdateField(job,
            new("tower", "塔筒产线数据库", "weld", "焊接（吨）", "number", ViewId: "month", ViewName: "月"));
        var year = DailyReportSettingsStore.AddOrUpdateField(job,
            new("tower", "塔筒产线数据库", "weld", "焊接（吨）", "number", ViewId: "year", ViewName: "年"));

        Assert.Equal(3, job.Fields.Count);
        Assert.Equal(3, new[] { day, month, year }.Distinct().Count());
    }

    [Fact]
    public void Weld_notion_title_includes_the_business_name()
    {
        var titleBuilder = typeof(NotionImportService).GetMethod(
            "BuildWeldTitle",
            System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Static);
        var titleNormalizer = typeof(NotionImportService).GetMethod(
            "NormalizeWeldTitleDate",
            System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Static);

        Assert.Equal("2026-08-01 焊接", titleBuilder?.Invoke(null, [new DateTime(2026, 8, 1)]));
        Assert.Equal("2026-08-01", titleNormalizer?.Invoke(null, ["2026-08-01 焊接"]));
        Assert.Equal("2026-08-01", titleNormalizer?.Invoke(null, ["2026-08-01"]));
    }

    [Fact]
    public void Prototype_bridge_rejects_unknown_operations()
    {
        Assert.True(PrototypeBridgeProtocol.IsAllowed("production.parse"));
        Assert.True(PrototypeBridgeProtocol.IsAllowed("weld.generate"));
        Assert.True(PrototypeBridgeProtocol.IsAllowed("weld.write"));
        Assert.True(PrototypeBridgeProtocol.IsAllowed("app.navigateNative"));
        Assert.True(PrototypeBridgeProtocol.IsAllowed("daily.list"));
        Assert.True(PrototypeBridgeProtocol.IsAllowed("daily.test"));
        Assert.True(PrototypeBridgeProtocol.IsAllowed("daily.sendToday"));
        Assert.True(PrototypeBridgeProtocol.IsAllowed("settings.open"));
        Assert.True(PrototypeBridgeProtocol.IsAllowed("settings.saveNotification"));
        Assert.False(PrototypeBridgeProtocol.IsAllowed("filesystem.read"));
        Assert.False(PrototypeBridgeProtocol.IsAllowed(string.Empty));
        Assert.True(PrototypeBridgeProtocol.IsNavigationAllowed("production-message"));
        Assert.True(PrototypeBridgeProtocol.IsNavigationAllowed("daily-report"));
        Assert.False(PrototypeBridgeProtocol.IsNavigationAllowed("settings"));
        Assert.False(PrototypeBridgeProtocol.IsNavigationAllowed("filesystem"));
        Assert.False(PrototypeBridgeProtocol.IsNavigationAllowed("home"));
        Assert.True(PrototypeBridgeProtocol.IsTrustedPrototypeSource(
            "https://prototype.production-assistant.local/index.html?route=daily-weld"));
        Assert.False(PrototypeBridgeProtocol.IsTrustedPrototypeSource(
            "https://example.com/index.html?route=daily-weld"));
        Assert.False(PrototypeBridgeProtocol.IsTrustedPrototypeSource(
            "http://prototype.production-assistant.local/index.html"));
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
    public void Natural_cutting_message_parses_sheet_count_without_project_suffix()
    {
        var date = new DateTime(2026, 9, 1);
        var draft = ProductionMessageParser.Parse(
            ProductionMessageParser.Split(
                "9.1下料今日双班，计划切割新疆新业气化炉钢板2张16吨",
                date).Single(),
            1,
            date,
            false);

        Assert.Equal("新疆新业气化炉", draft.Fields[ProductionMessageFields.Project]);
        Assert.Equal("钢板", draft.Fields[ProductionMessageFields.Material]);
        Assert.Equal("2张", draft.Fields[ProductionMessageFields.PieceCount]);
        Assert.Equal("16吨", draft.Fields[ProductionMessageFields.Weight]);
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
