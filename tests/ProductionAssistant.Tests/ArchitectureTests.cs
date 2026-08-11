using ProductionAssistant.Services;
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
}
