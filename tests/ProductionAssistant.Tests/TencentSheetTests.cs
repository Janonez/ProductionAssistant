using ProductionAssistant.Services;
using System.Text.Json.Nodes;
using Xunit;

namespace ProductionAssistant.Tests;

public sealed class TencentSheetTests
{
    [Theory]
    [InlineData("check", "[]", "null", true)]
    [InlineData("check", "[{\"address\":\"F9\"}]", "null", false)]
    [InlineData("check", "[]", "\"F9\"", false)]
    [InlineData("write", "[]", "null", false)]
    [InlineData(null, "[]", "null", false)]
    public void Worker_must_prove_preflight_only_before_clearing_write_guard(string? phase, string completed, string uncertain, bool safe)
    {
        var response = new JsonObject { ["ok"] = false, ["error"] = "failure", ["phase"] = phase,
            ["completed"] = JsonNode.Parse(completed), ["uncertainAddress"] = JsonNode.Parse(uncertain) };
        using var json = System.Text.Json.JsonDocument.Parse(response.ToJsonString());
        var error = Assert.ThrowsAny<InvalidOperationException>(() => TencentSheetService.ReadResponse(json.RootElement));
        Assert.Equal(safe, error is TencentSheetPreflightException);
        var run = new JsonObject { ["businessDate"] = "2026-09-30", ["status"] = "失败或待确认",
            ["phase"] = error is TencentSheetPreflightException ? "check" : "write" };
        Assert.Equal(!safe, TencentSheetTaskHandler.BlocksAutomaticRetry(run, new(2026, 9, 30)));
    }

    [Fact]
    public void Task_storage_isolates_controls_rejects_stale_changes_and_preserves_history()
    {
        var folder = Path.Combine(Path.GetTempPath(), "tencent-storage-test-" + Guid.NewGuid().ToString("N"));
        var previous = Environment.GetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR");
        Environment.SetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR", folder);
        try
        {
            Directory.CreateDirectory(RuntimeEnvironment.DataDirectory);
            foreach (var id in new[] { "one", "two" })
                TencentSheetTaskHandler.Save(new JsonObject { ["id"] = id, ["config"] = JsonNode.Parse("""{"webControls":{"cellAddressBox":{"sampleText":"A1"}}}""") });
            var first = TencentSheetTaskHandler.Find("one");
            first["config"]!["webControls"]!["cellAddressBox"]!["sampleText"] = "B2";
            TencentSheetTaskHandler.Save(first);
            Assert.Equal("A1", (string?)TencentSheetTaskHandler.Find("two")["config"]?["webControls"]?["cellAddressBox"]?["sampleText"]);
            var stale = TencentSheetTaskHandler.Find("one");
            first["config"]!["documentUrl"] = "new-document";
            TencentSheetTaskHandler.Save(first);
            Assert.Throws<InvalidOperationException>(() => TencentSheetTaskHandler.Save(stale));
            Assert.Equal("new-document", (string?)TencentSheetTaskHandler.Find("one")["config"]?["documentUrl"]);
            stale = TencentSheetTaskHandler.Find("one");
            first["runs"] = new JsonArray(new JsonObject { ["status"] = "成功" });
            TencentSheetTaskHandler.Save(first, updateRun: true);
            TencentSheetTaskHandler.Save(stale);
            Assert.Equal("成功", (string?)TencentSheetTaskHandler.Find("one")["runs"]?[0]?["status"]);
        }
        finally
        {
            Environment.SetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR", previous);
            if (Directory.Exists(folder)) Directory.Delete(folder, true);
        }
    }

    [Theory]
    [InlineData("fetch", "失败或待确认", false)]
    [InlineData("check", "失败或待确认", false)]
    [InlineData("write", "执行中，结果待确认", true)]
    [InlineData("write", "成功", true)]
    [InlineData("write", "失败或待确认", true)]
    [InlineData(null, "失败或待确认", true)]
    [InlineData(null, "已跳过", false)]
    public void Retry_gate_distinguishes_no_write_failures_from_uncertain_writes(string? phase, string status, bool blocked)
    {
        var record = new JsonObject { ["businessDate"] = "2026-09-14", ["phase"] = phase, ["status"] = status };
        Assert.Equal(blocked, TencentSheetTaskHandler.BlocksAutomaticRetry(record, new(2026, 9, 14)));
        Assert.False(TencentSheetTaskHandler.BlocksAutomaticRetry(record, new(2026, 9, 15)));
    }

    [Fact]
    public void Schedule_uses_all_weekdays_times_environment_identity_and_no_catchup_or_retries()
    {
        var config = JsonNode.Parse("""{"executionSchedule":{"weekdays":[0,1,5],"times":["08:00","17:30"]}}""")!.AsObject();
        var id = "0123456789abcdef0123456789abcdef";
        Assert.Equal("ProductionAssistant-" + RuntimeEnvironment.Current.Name + "-TencentSheet-" + id, TencentSheetTaskScheduler.TaskName(id));
        Assert.Equal(RuntimeEnvironment.Current.SchedulerEnabled, TencentSheetTaskScheduler.IsAvailable);
        var xml = System.Xml.Linq.XDocument.Parse(TencentSheetTaskScheduler.CreateXml(id, @"C:\工作 & App\ProductionAssistant.exe", "S-1-5-test", config));
        var elements = xml.Descendants().ToArray();
        Assert.Equal(2, elements.Count(element => element.Name.LocalName == "CalendarTrigger"));
        Assert.Equal(["2026-01-01T08:00:00+08:00", "2026-01-01T17:30:00+08:00"], elements.Where(element => element.Name.LocalName == "StartBoundary").Select(element => element.Value));
        Assert.All(elements.Where(element => element.Name.LocalName == "DaysOfWeek"), element => Assert.Equal(["Sunday", "Monday", "Friday"], element.Elements().Select(day => day.Name.LocalName)));
        Assert.Contains(elements, element => element.Name.LocalName == "Arguments" && element.Value == $"--environment {RuntimeEnvironment.Current.Name} --run-automation-task --task-type tencent_sheet_fill --task-id {id}");
        Assert.Contains(elements, element => element.Name.LocalName == "Command" && element.Value == @"C:\工作 & App\ProductionAssistant.exe");
        Assert.Contains(elements, element => element.Name.LocalName == "WorkingDirectory" && element.Value == @"C:\工作 & App");
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

}
