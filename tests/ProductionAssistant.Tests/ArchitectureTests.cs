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
        Assert.False(PrototypeBridgeProtocol.IsAllowed("filesystem.read"));
        Assert.False(PrototypeBridgeProtocol.IsAllowed(string.Empty));
        Assert.Equal("输入无效", PrototypeBridgeProtocol.SafeError(new InvalidOperationException("输入无效")));
        Assert.DoesNotContain("secret", PrototypeBridgeProtocol.SafeError(new Exception("secret")));
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
        roundtrip.FieldsText = ProductionMessageParser.FormatFields(roundtrip.Kind, roundtrip.Fields, roundtrip.PlanMonth);

        Assert.True(ProductionMessageParser.ApplyEdits(roundtrip, new DateTime(2026, 8, 13), true, out _));
        Assert.True(ProductionMessageParser.TryCreateValue(roundtrip, out var value, out _));
        Assert.NotEmpty(value.Fields);
    }
}
