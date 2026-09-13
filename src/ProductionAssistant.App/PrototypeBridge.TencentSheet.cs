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
            if (string.IsNullOrWhiteSpace((string?)config["siteProfileId"]))
                throw new InvalidOperationException("请先选择已测试并保存的网页适配配置。");
            config["requireTeaching"] = true;
            config["fields"] = new JsonArray();
            config["rules"] = new JsonObject();
            TencentSheetService.ValidateExecutionRules(config.AsObject());
            var validated = await handler.Service.CallAsync(new() { ["operation"] = "validate", ["config"] = TencentSiteProfileStore.Resolve(config) }, cancellationToken);
            var id = Guid.NewGuid().ToString("N");
            TencentSheetTaskHandler.Save(new() { ["id"] = id, ["name"] = "腾讯文档生产填报", ["dateMode"] = "previous_day", ["config"] = TencentSiteProfileStore.ForStorage(JsonNode.Parse(validated.GetProperty("config").GetRawText())!) });
            return new { id };
        }
        var job = TencentSheetTaskHandler.Find(ReadString(payload, "id"));
        if (job["config"]?["fields"] is null)
        {
            var original = job["config"]!.AsObject();
            var fields = new JsonArray();
            if ((bool?)original["requireTeaching"] != true || original["rules"] is JsonObject { Count: > 0 })
                foreach (var (key, name) in new[] { ("cutting", "下料量"), ("welding", "装焊量"), ("section", "型材入库量"), ("plate", "板材入库量") })
                {
                    if ((bool?)original["requireTeaching"] == true && original["rules"]?[key] is null) continue;
                    fields.Add(new JsonObject { ["id"] = key, ["name"] = name, ["unit"] = "吨", ["legacyKey"] = key });
                }
            original["fields"] = fields;
            TencentSheetTaskHandler.Save(job);
        }
        if (operation == "get") return TencentSheetPresentation(job);
        if (operation == "runs") return new { runs = job["runs"] ?? new JsonArray() };
        if (operation == "sources") return new { sources = AppServices.DatabaseProvider.GetSources() };
        if (operation is "schema" or "views")
        {
            var sourceId = ReadString(payload, "sourceId");
            if (!AppServices.DatabaseProvider.GetSources().Any(source => source.Id == sourceId)) throw new InvalidOperationException("请选择现有 Notion 数据库。");
            if (operation == "views") return new { views = await AppServices.DatabaseProvider.GetDatasetsAsync(sourceId, cancellationToken) };
            var schema = await AppServices.DatabaseProvider.GetSchemaAsync(sourceId, cancellationToken);
            if (!schema.Succeeded) throw new InvalidOperationException(schema.Message);
            return new { fields = schema.Fields };
        }
        if (operation is "addField" or "updateField" or "deleteField")
        {
            var config = job["config"]!.AsObject();
            var fields = config["fields"]!.AsArray();
            var fieldId = ReadString(payload, "fieldId");
            var field = fields.OfType<JsonObject>().FirstOrDefault(field => (string?)field["id"] == fieldId);
            if (operation == "addField")
            {
                field = new JsonObject { ["id"] = "field_" + Guid.NewGuid().ToString("N") };
                fields.Add(field);
            }
            if (field is null) throw new InvalidOperationException("找不到业务字段。");
            if (operation == "deleteField")
            {
                fields.Remove(field);
                (config["rules"] as JsonObject)?.Remove(fieldId);
            }
            else
            {
                field["name"] = ReadString(payload, "name").Trim();
                field["unit"] = ReadString(payload, "unit").Trim();
                if (payload.TryGetProperty("notion", out var notion))
                {
                    if (notion.ValueKind != JsonValueKind.Null)
                    {
                        TencentSheetNotionService.ReadBinding(JsonNode.Parse(notion.GetRawText()));
                    }
                    field["notion"] = notion.ValueKind == JsonValueKind.Null ? null : JsonNode.Parse(notion.GetRawText());
                }
            }
            var validated = await handler.Service.CallAsync(new() { ["operation"] = "validate", ["config"] = TencentSiteProfileStore.Resolve(config) }, cancellationToken);
            job["config"] = TencentSiteProfileStore.ForStorage(JsonNode.Parse(validated.GetProperty("config").GetRawText())!);
            job["validated"] = false;
            TencentSheetTaskHandler.Save(job);
            return TencentSheetPresentation(job);
        }
        if (operation == "save")
        {
            var config = JsonNode.Parse(payload.GetProperty("config").GetRawText());
            TencentSheetService.ValidateExecutionRules(config!.AsObject());
            if ((bool?)job["config"]?["requireTeaching"] == true) config!["requireTeaching"] = true;
            var validated = await handler.Service.CallAsync(new() { ["operation"] = "validate", ["config"] = TencentSiteProfileStore.Resolve(config!) }, cancellationToken);
            job["config"] = TencentSiteProfileStore.ForStorage(JsonNode.Parse(validated.GetProperty("config").GetRawText())!);
            job["validated"] = false;
            TencentSheetTaskHandler.Save(job);
            return TencentSheetPresentation(job);
        }
        var startedAt = DateTimeOffset.Now;
        var manualText = ReadString(payload, "businessDate");
        if (!string.IsNullOrEmpty(manualText) && !DateOnly.TryParseExact(manualText, "yyyy-MM-dd", out _))
            throw new InvalidOperationException("请选择有效的业务日期。");
        var date = TencentSheetService.ResolveBusinessDate(startedAt, job["config"]!.AsObject(), (string?)job["dateMode"] ?? "previous_day",
            string.IsNullOrEmpty(manualText) ? null : DateOnly.ParseExact(manualText, "yyyy-MM-dd"));
        if (operation == "fetch") return await AppServices.TencentNotion.FetchAsync((string)job["id"]!, job["config"]!.AsObject(), date,
            payload.TryGetProperty("values", out var manualValues) ? JsonNode.Parse(manualValues.GetRawText())?.AsObject() : null, cancellationToken);
        if (operation == "backgroundTest")
        {
            job["manualDate"] = date.ToString("yyyy-MM-dd");
            var result = await handler.ExecuteAsync(new((string)job["id"]!, TencentSheetTaskHandler.Type, (string)job["name"]!, "background-test", startedAt), JsonSerializer.SerializeToElement(job), cancellationToken);
            if (!result.Succeeded) throw new InvalidOperationException(result.Message);
            return new { message = result.Message };
        }
        var executionValues = operation is "write" or "inspect"
            ? TencentSheetNotionService.RequiresFetch(job["config"]!.AsObject())
                ? AppServices.TencentNotion.RequireValues((string)job["id"]!, job["config"]!.AsObject(), date, ReadString(payload, "dataToken"))
                : payload.TryGetProperty("values", out var inputValues) ? JsonNode.Parse(inputValues.GetRawText()) : null
            : null;
        if (operation == "write")
        {
            // Execution-only data is never saved as future scheduled input.
            job["values"] = executionValues;
            job["dataToken"] = ReadString(payload, "dataToken");
            job["confirmationToken"] = ReadString(payload, "token");
            job["manualDate"] = date.ToString("yyyy-MM-dd");
            var result = await handler.ExecuteAsync(new((string)job["id"]!, TencentSheetTaskHandler.Type, (string)job["name"]!, "manual", startedAt), JsonSerializer.SerializeToElement(job), cancellationToken);
            if (!result.Succeeded) throw new InvalidOperationException(result.Message);
            return new { message = result.Message };
        }
        var request = new JsonObject { ["operation"] = operation, ["config"] = TencentSiteProfileStore.Resolve(job["config"]!), ["date"] = date.ToString("yyyy-MM-dd") };
        if (executionValues is not null) request["values"] = executionValues.DeepClone();
        if (operation == "pick") request["key"] = ReadString(payload, "key");
        if (operation == "teach")
        {
            request["jobId"] = (string)job["id"]!;
            foreach (var key in new[] { "stage", "metric", "firstDate", "secondDate", "sessionToken", "previewToken", "slot" })
                request[key] = ReadString(payload, key);
        }
        var response = await handler.Service.CallAsync(request, cancellationToken);
        if (response.TryGetProperty("config", out var updated)) { job["config"] = TencentSiteProfileStore.ForStorage(JsonNode.Parse(updated.GetRawText())!); job["validated"] = false; TencentSheetTaskHandler.Save(job); }
        if (operation == "inspect") { job["validated"] = response.GetProperty("prewriteVerified").GetBoolean(); TencentSheetTaskHandler.Save(job); }
        return response;
    }

    private static JsonObject TencentSheetPresentation(JsonObject job)
    {
        var result = job.DeepClone().AsObject();
        result["businessDate"] = TencentSheetService.ResolveBusinessDate(DateTimeOffset.Now, job["config"]!.AsObject(),
            (string?)job["dateMode"] ?? "previous_day").ToString("yyyy-MM-dd");
        return result;
    }
}
