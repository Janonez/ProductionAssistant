using ProductionAssistant.Services;
using System.Text.Json.Nodes;
using Xunit;

namespace ProductionAssistant.Tests;

public sealed class TencentSheetTests
{
    [Fact]
    public void Schedule_uses_all_weekdays_times_development_identity_and_no_catchup_or_retries()
    {
        var config = JsonNode.Parse("""{"executionSchedule":{"weekdays":[0,1,5],"times":["08:00","17:30"]}}""")!.AsObject();
        var id = "0123456789abcdef0123456789abcdef";
        var xml = System.Xml.Linq.XDocument.Parse(TencentSheetTaskScheduler.CreateXml(id, @"C:\Test & App\ProductionAssistant.exe", "S-1-5-test", config));
        var elements = xml.Descendants().ToArray();
        Assert.Equal(2, elements.Count(element => element.Name.LocalName == "CalendarTrigger"));
        Assert.Equal(["2026-01-01T08:00:00+08:00", "2026-01-01T17:30:00+08:00"], elements.Where(element => element.Name.LocalName == "StartBoundary").Select(element => element.Value));
        Assert.All(elements.Where(element => element.Name.LocalName == "DaysOfWeek"), element => Assert.Equal(["Sunday", "Monday", "Friday"], element.Elements().Select(day => day.Name.LocalName)));
        Assert.Contains(elements, element => element.Name.LocalName == "Arguments" && element.Value == $"--environment Development --run-automation-task --task-type tencent_sheet_fill --task-id {id}");
        Assert.Contains(elements, element => element.Name.LocalName == "Command" && element.Value == @"C:\Test & App\ProductionAssistant.exe");
        Assert.Contains(elements, element => element.Name.LocalName == "MultipleInstancesPolicy" && element.Value == "IgnoreNew");
        Assert.Contains(elements, element => element.Name.LocalName == "StartWhenAvailable" && element.Value == "false");
        Assert.DoesNotContain(elements, element => element.Name.LocalName == "RestartOnFailure");
        Assert.Throws<InvalidOperationException>(() => TencentSheetTaskScheduler.CreateXml("bad --task", "app.exe", "user", config));
    }

    [Fact]
    public void Background_execution_requires_fresh_database_bindings_and_learned_positions()
    {
        var config = JsonNode.Parse("""{"fields":[{"id":"custom","notion":{"sourceId":"source","valueFieldId":"value","queryMode":"date","dateFieldId":"date"}}],"rules":{"custom":{}}}""")!.AsObject();
        TencentSheetTaskHandler.ValidateBackgroundConfig(config);
        config["rules"] = new JsonObject();
        Assert.Throws<InvalidOperationException>(() => TencentSheetTaskHandler.ValidateBackgroundConfig(config));
        config["fields"]![0]!["legacyKey"] = "cutting";
        TencentSheetTaskHandler.ValidateBackgroundConfig(config);
        config["fields"]![0]!["notion"] = null;
        Assert.Throws<InvalidOperationException>(() => TencentSheetTaskHandler.ValidateBackgroundConfig(config));
        config["fields"] = new JsonArray();
        Assert.Throws<InvalidOperationException>(() => TencentSheetTaskHandler.ValidateBackgroundConfig(config));
    }

    [Theory]
    [InlineData("2026-09-01T08:00:00+08:00", -1, "2026-08-31")]
    [InlineData("2027-01-01T08:00:00+08:00", -1, "2026-12-31")]
    [InlineData("2024-03-01T08:00:00+08:00", -1, "2024-02-29")]
    [InlineData("2026-09-01T08:00:00+08:00", 0, "2026-09-01")]
    [InlineData("2026-09-01T08:00:00+08:00", -7, "2026-08-25")]
    [InlineData("2026-12-31T16:01:00Z", 2, "2027-01-03")]
    public void Configured_offset_resolves_business_date_across_calendar_boundaries(string started, int offset, string expected)
    {
        var config = new JsonObject { ["businessDateRule"] = new JsonObject { ["kind"] = "relative", ["offsetDays"] = offset } };
        Assert.Equal(DateOnly.Parse(expected), TencentSheetService.ResolveBusinessDate(DateTimeOffset.Parse(started), config));
    }

    [Fact]
    public void Explicit_business_date_is_frozen_independently_of_current_time_and_saved_rule()
    {
        var config = JsonNode.Parse("""{"businessDateRule":{"kind":"fixed","date":"2026-08-31"},"executionSchedule":{"weekdays":[1,3,5],"times":["08:00","17:30"]}}""")!.AsObject();
        Assert.Equal(new DateOnly(2026, 8, 31), TencentSheetService.ResolveBusinessDate(DateTimeOffset.Parse("2027-01-01T08:00:00+08:00"), config));
        Assert.Equal(new DateOnly(2025, 12, 31), TencentSheetService.ResolveBusinessDate(DateTimeOffset.Parse("2027-01-01T08:00:00+08:00"), config, manualDate: new(2025, 12, 31)));
    }

    [Theory]
    [InlineData("{\"businessDateRule\":{\"kind\":\"relative\",\"offsetDays\":0.5}}")]
    [InlineData("{\"businessDateRule\":{\"kind\":\"fixed\",\"date\":\"2026-02-30\"}}")]
    [InlineData("{\"executionSchedule\":{\"weekdays\":[],\"times\":[\"08:00\"]}}")]
    [InlineData("{\"executionSchedule\":{\"weekdays\":[1],\"times\":[\"24:00\"]}}")]
    [InlineData("{\"executionSchedule\":{\"weekdays\":[1],\"times\":[\"08:00\",\"08:00\"]}}")]
    public void Invalid_or_duplicate_execution_options_are_rejected(string json) =>
        Assert.Throws<InvalidOperationException>(() => TencentSheetService.ValidateExecutionRules(JsonNode.Parse(json)!.AsObject()));

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
