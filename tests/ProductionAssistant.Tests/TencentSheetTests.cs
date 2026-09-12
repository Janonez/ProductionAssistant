using ProductionAssistant.Services;
using System.Text.Json.Nodes;
using Xunit;

namespace ProductionAssistant.Tests;

public sealed class TencentSheetTests
{
    [Theory]
    [InlineData("2026-09-08T15:59:59Z", "previous_day", "2026-09-07")]
    [InlineData("2026-09-08T16:00:00Z", "previous_day", "2026-09-08")]
    [InlineData("2026-01-01T00:00:00+08:00", "previous_day", "2025-12-31")]
    [InlineData("2024-03-01T00:00:00+08:00", "previous_day", "2024-02-29")]
    [InlineData("2026-09-08T16:00:00Z", "today", "2026-09-09")]
    public void Business_date_uses_China_calendar(string started, string mode, string expected) =>
        Assert.Equal(DateOnly.Parse(expected), TencentSheetService.ResolveBusinessDate(DateTimeOffset.Parse(started), mode));

    [Fact]
    public void Manual_date_is_frozen_and_invalid_modes_fail()
    {
        var started = DateTimeOffset.Parse("2026-09-09T00:00:00+08:00");
        var manual = new DateOnly(2026, 8, 31);
        Assert.Equal(manual, TencentSheetService.ResolveBusinessDate(started, "previous_day", manual));
        Assert.Throws<InvalidOperationException>(() => TencentSheetService.ResolveBusinessDate(started, "invalid"));
    }

    [Fact]
    public void Document_storage_keeps_profile_reference_and_business_rules_without_an_embedded_site_snapshot()
    {
        var config = JsonNode.Parse("""
            {"siteProfileId":"shared","documentUrl":"https://docs.qq.com/sheet/document",
             "siteProfile":{"name":"untrusted snapshot"},"rules":{"cutting":{"rowStep":3}}}
            """)!;
        var stored = TencentSiteProfileStore.ForStorage(config);
        Assert.Equal("shared", (string?)stored["siteProfileId"]);
        Assert.Null(stored["siteProfile"]);
        Assert.Equal(3, (int?)stored["rules"]?["cutting"]?["rowStep"]);
        Assert.NotNull(config["siteProfile"]);
        var legacy = JsonNode.Parse("""{"adapter":{"nameBox":"#legacy"},"siteProfile":{"name":"ignored"}}""")!;
        var resolved = TencentSiteProfileStore.Resolve(legacy);
        Assert.Null(resolved["siteProfile"]);
        Assert.Equal("#legacy", (string?)resolved["adapter"]?["nameBox"]);
    }
}
