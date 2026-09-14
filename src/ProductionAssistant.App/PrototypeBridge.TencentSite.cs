using System.Text.Json;
using System.Text.Json.Nodes;
using ProductionAssistant.Services;

namespace ProductionAssistant;

internal sealed partial class PrototypeBridge
{
    private static async Task<object> TencentSiteAsync(string operation, JsonElement payload, CancellationToken cancellationToken)
    {
        TencentSheetService.RequireDevelopment();
        var id = ReadString(payload, "id");
        var job = TencentSheetTaskHandler.Find(id);
        if ((bool?)job["enabled"] == true) throw new InvalidOperationException("请先停用定时填报，再录制网页控件。");
        var signature = TencentSheetTaskHandler.ConfigSignature(job["config"]!.AsObject());
        var request = new JsonObject
        {
            ["operation"] = "site" + char.ToUpperInvariant(operation[0]) + operation[1..],
            ["jobId"] = id,
            ["configSignature"] = signature,
            ["config"] = new JsonObject { ["documentUrl"] = (string?)job["config"]?["documentUrl"] },
            ["controls"] = JsonNode.Parse(payload.GetProperty("controls").GetRawText()),
            ["key"] = ReadString(payload, "key"),
            ["token"] = ReadString(payload, "token")
        };
        var response = await AppServices.TencentSheetTasks.Service.CallAsync(request, cancellationToken);
        if (operation != "save") return response;
        job = TencentSheetTaskHandler.Find(id);
        if (signature != TencentSheetTaskHandler.ConfigSignature(job["config"]!.AsObject()))
            throw new InvalidOperationException("任务配置已变化，请重新测试网页控件。");
        job["config"] = TencentSheetConfig.Resolve(job["config"]!);
        job["config"]!["webControls"] = JsonNode.Parse(response.GetProperty("controls").GetRawText());
        job["validated"] = false;
        TencentSheetTaskHandler.Save(job);
        return new { message = "已保存本任务的网页控件，业务位置保持不变。" };
    }
}
