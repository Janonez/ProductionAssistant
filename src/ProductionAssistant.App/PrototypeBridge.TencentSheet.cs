using System.Text.Json;
using System.Text.Json.Nodes;
using ProductionAssistant.Automation;
using ProductionAssistant.Services;

namespace ProductionAssistant;

internal sealed partial class PrototypeBridge
{
    private static async Task<object> TencentSheetAsync(string operation, JsonElement payload, CancellationToken cancellationToken)
    {
        if (operation == "loginAgreement")
        {
            var url = ReadString(payload, "kind") switch
            {
                "service" => "https://docs.qq.com/doc/p/41c65c813fe78d2f262bf35b825c214f0f459bfe",
                "privacy" => "https://docs.qq.com/doc/p/79d8f25f4f022ccca80949ea89b3fe8a137d8940",
                _ => throw new InvalidOperationException("请选择腾讯文档服务协议或隐私政策。")
            };
            System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo(url) { UseShellExecute = true });
            return new { opened = true };
        }
        var handler = AppServices.TencentSheetTasks;
        if (operation == "login" && ReadString(payload, "stage") == "cancel")
        {
            // Cleanup must work even if the task was removed or its document link changed.
            return await handler.Service.CallAsync(new JsonObject
            {
                ["operation"] = "login", ["stage"] = "cancel",
                ["jobId"] = ReadString(payload, "id"), ["sessionToken"] = ReadString(payload, "sessionToken")
            }, cancellationToken);
        }
        if (operation == "create")
        {
            var config = new JsonObject { ["documentUrl"] = ReadString(payload, "documentUrl") };
            config["fields"] = new JsonArray();
            config["rules"] = new JsonObject();
            TencentSheetService.ValidateExecutionRules(config.AsObject());
            var validated = await handler.Service.CallAsync(new() { ["operation"] = "validate", ["config"] = config.DeepClone().AsObject() }, cancellationToken);
            var id = Guid.NewGuid().ToString("N");
            TencentSheetTaskHandler.Save(new() { ["id"] = id, ["name"] = "腾讯文档填报", ["config"] = JsonNode.Parse(validated.GetProperty("config").GetRawText())! });
            return new { id };
        }
        var job = TencentSheetTaskHandler.Find(ReadString(payload, "id"));
        if (operation == "get") return TencentSheetPresentation(job);
        if (operation == "runs") return new { runs = job["runs"] ?? new JsonArray() };
        if (operation == "sources") return new { sources = AppServices.DatabaseProvider.GetSources() };
        if (operation is "schema" or "views")
        {
            var sourceId = ReadString(payload, "sourceId");
            if (!AppServices.DatabaseProvider.GetSources().Any(source => source.Id == sourceId)) throw new InvalidOperationException("请选择现有 Teable 数据库。");
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
            var validated = await handler.Service.CallAsync(new() { ["operation"] = "validate", ["config"] = config.DeepClone().AsObject() }, cancellationToken);
            job["config"] = JsonNode.Parse(validated.GetProperty("config").GetRawText())!;
            job["validated"] = false;
            TencentSheetTaskHandler.Save(job);
            return TencentSheetPresentation(job);
        }
        if (operation == "save")
        {
            var expectedRevision = payload.TryGetProperty("configRevision", out var revision) ? revision.GetInt32() : 0;
            if (expectedRevision != ((int?)job["configRevision"] ?? 0))
                throw new InvalidOperationException("任务配置已变化，请重新打开后再修改。");
            var config = job["config"]!.DeepClone().AsObject();
            // Recording and field flows own controls, positions and data bindings.
            foreach (var key in new[] { "documentUrl", "sheetReferenceName", "businessDateRule", "executionSchedule" })
                if (payload.GetProperty("config").TryGetProperty(key, out var value)) config[key] = JsonNode.Parse(value.GetRawText());
            TencentSheetService.ValidateExecutionRules(config);
            var validated = await handler.Service.CallAsync(new() { ["operation"] = "validate", ["config"] = config }, cancellationToken);
            job["config"] = JsonNode.Parse(validated.GetProperty("config").GetRawText())!;
            job["validated"] = false;
            TencentSheetTaskHandler.Save(job);
            return TencentSheetPresentation(job);
        }
        var startedAt = DateTimeOffset.Now;
        var manualText = ReadString(payload, "businessDate");
        if (!string.IsNullOrEmpty(manualText) && !DateOnly.TryParseExact(manualText, "yyyy-MM-dd", out _))
            throw new InvalidOperationException("请选择有效的业务日期。");
        var date = TencentSheetService.ResolveBusinessDate(startedAt, job["config"]!.AsObject(),
            string.IsNullOrEmpty(manualText) ? null : DateOnly.ParseExact(manualText, "yyyy-MM-dd"));
        if (operation == "fetch") return await AppServices.TencentNotion.FetchAsync((string)job["id"]!, job["config"]!.AsObject(), date, cancellationToken);
        if (operation == "backgroundTest")
        {
            job["manualDate"] = date.ToString("yyyy-MM-dd");
            var result = await handler.ExecuteAsync(new((string)job["id"]!, TencentSheetTaskHandler.Type, (string)job["name"]!, "background-test", startedAt), JsonSerializer.SerializeToElement(job), cancellationToken);
            if (!result.Succeeded) throw new InvalidOperationException(result.Message);
            return new { message = result.Message };
        }
        var executionValues = operation is "write" or "inspect"
            ? AppServices.TencentNotion.RequireValues((string)job["id"]!, job["config"]!.AsObject(), date, ReadString(payload, "dataToken"))
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
        var request = new JsonObject { ["operation"] = operation, ["jobId"] = (string)job["id"]!, ["config"] = job["config"]!.DeepClone().AsObject(), ["date"] = date.ToString("yyyy-MM-dd") };
        if (executionValues is not null) request["values"] = executionValues.DeepClone();
        if (operation == "login")
        {
            request["stage"] = ReadString(payload, "stage");
            request["sessionToken"] = ReadString(payload, "sessionToken");
        }
        if (operation == "teach")
        {
            request["jobId"] = (string)job["id"]!;
            foreach (var key in new[] { "stage", "metric", "firstDate", "secondDate", "sessionToken", "previewToken", "slot" })
                request[key] = ReadString(payload, key);
        }
        var response = await handler.Service.CallAsync(request, cancellationToken);
        if (response.TryGetProperty("config", out var updated)) { job["config"] = JsonNode.Parse(updated.GetRawText())!; job["validated"] = false; TencentSheetTaskHandler.Save(job); }
        if (operation == "inspect") { job["validated"] = response.GetProperty("prewriteVerified").GetBoolean(); TencentSheetTaskHandler.Save(job); }
        return response;
    }

    private static JsonObject TencentSheetPresentation(JsonObject job)
    {
        var result = job.DeepClone().AsObject();
        result["config"] = job["config"]!.DeepClone().AsObject();
        result["businessDate"] = TencentSheetService.ResolveBusinessDate(DateTimeOffset.Now, job["config"]!.AsObject()).ToString("yyyy-MM-dd");
        return result;
    }
}
