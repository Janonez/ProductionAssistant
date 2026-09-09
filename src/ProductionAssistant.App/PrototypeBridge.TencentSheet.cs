using System.Text.Json;
using System.Text.Json.Nodes;
using ProductionAssistant.Automation;
using ProductionAssistant.Services;

namespace ProductionAssistant;

internal sealed partial class PrototypeBridge
{
    private static async Task<object> TencentSheetAsync(string operation, JsonElement payload, CancellationToken cancellationToken)
    {
        TencentSheetService.RequireDevelopment();
        var handler = AppServices.TencentSheetTasks;
        if (operation == "defaults")
        {
            for (var dir = new DirectoryInfo(AppContext.BaseDirectory); dir is not null; dir = dir.Parent)
            {
                if (!File.Exists(Path.Combine(dir.FullName, "ProductionAssistant.sln"))) continue;
                var demoPath = Path.Combine(dir.FullName, "artifacts", "tencent-docs-demo", "config.json");
                if (File.Exists(demoPath)) return new { config = JsonNode.Parse(File.ReadAllText(demoPath)), imported = true };
            }
            return new { config = new JsonObject { ["documentUrl"] = "" }, imported = false };
        }
        if (operation == "create")
        {
            var config = payload.TryGetProperty("config", out var supplied) ? JsonNode.Parse(supplied.GetRawText())! : new JsonObject { ["documentUrl"] = ReadString(payload, "documentUrl") };
            var validated = await handler.Service.CallAsync(new() { ["operation"] = "validate", ["config"] = config }, cancellationToken);
            var id = Guid.NewGuid().ToString("N");
            TencentSheetTaskHandler.Save(new() { ["id"] = id, ["name"] = "腾讯文档生产填报", ["dateMode"] = "previous_day", ["config"] = JsonNode.Parse(validated.GetProperty("config").GetRawText()) });
            return new { id };
        }
        var job = TencentSheetTaskHandler.Find(ReadString(payload, "id"));
        if (operation == "get") return job;
        if (operation == "runs") return new { runs = job["runs"] ?? new JsonArray() };
        if (operation == "save")
        {
            var config = JsonNode.Parse(payload.GetProperty("config").GetRawText());
            var validated = await handler.Service.CallAsync(new() { ["operation"] = "validate", ["config"] = config }, cancellationToken);
            job["config"] = JsonNode.Parse(validated.GetProperty("config").GetRawText());
            job["validated"] = false;
            TencentSheetTaskHandler.Save(job);
            return job;
        }
        var startedAt = DateTimeOffset.Now;
        var manualText = ReadString(payload, "businessDate");
        if (!string.IsNullOrEmpty(manualText) && !DateOnly.TryParseExact(manualText, "yyyy-MM-dd", out _))
            throw new InvalidOperationException("请选择有效的业务日期。");
        var date = TencentSheetService.ResolveBusinessDate(startedAt, (string?)job["dateMode"] ?? "previous_day",
            string.IsNullOrEmpty(manualText) ? null : DateOnly.ParseExact(manualText, "yyyy-MM-dd"));
        if (operation == "write")
        {
            // Execution-only data is never saved as future scheduled input.
            job["values"] = JsonNode.Parse(payload.GetProperty("values").GetRawText());
            job["confirmationToken"] = ReadString(payload, "token");
            job["manualDate"] = date.ToString("yyyy-MM-dd");
            var result = await handler.ExecuteAsync(new((string)job["id"]!, TencentSheetTaskHandler.Type, (string)job["name"]!, "manual", startedAt), JsonSerializer.SerializeToElement(job), cancellationToken);
            if (!result.Succeeded) throw new InvalidOperationException(result.Message);
            return new { message = result.Message };
        }
        var request = new JsonObject { ["operation"] = operation, ["config"] = job["config"]!.DeepClone(), ["date"] = date.ToString("yyyy-MM-dd") };
        if (payload.TryGetProperty("values", out var values)) request["values"] = JsonNode.Parse(values.GetRawText());
        if (operation == "pick") request["key"] = ReadString(payload, "key");
        var response = await handler.Service.CallAsync(request, cancellationToken);
        if (response.TryGetProperty("config", out var updated)) { job["config"] = JsonNode.Parse(updated.GetRawText()); job["validated"] = false; TencentSheetTaskHandler.Save(job); }
        if (operation == "inspect") { job["validated"] = response.GetProperty("prewriteVerified").GetBoolean(); TencentSheetTaskHandler.Save(job); }
        return response;
    }
}
