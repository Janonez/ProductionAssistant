using System.Text.Json;
using System.Text.Json.Nodes;
using ProductionAssistant.Services;

namespace ProductionAssistant;

internal sealed partial class PrototypeBridge
{
    private static async Task<object> TencentSiteAsync(string operation, JsonElement payload, CancellationToken cancellationToken)
    {
        TencentSheetService.RequireDevelopment();
        if (operation == "list") return new { profiles = TencentSiteProfileStore.Load() };
        var profile = JsonNode.Parse(payload.GetProperty("profile").GetRawText())!.AsObject();
        var request = new JsonObject
        {
            ["operation"] = "site" + char.ToUpperInvariant(operation[0]) + operation[1..],
            ["config"] = new JsonObject { ["documentUrl"] = ReadString(payload, "documentUrl") },
            ["profile"] = profile.DeepClone(),
            ["key"] = ReadString(payload, "key"),
            ["token"] = ReadString(payload, "token")
        };
        var response = await AppServices.TencentSheetTasks.Service.CallAsync(request, cancellationToken);
        if (operation != "save") return response;
        var tested = JsonNode.Parse(response.GetProperty("profile").GetRawText())!.AsObject();
        tested["sampleUrl"] = ReadString(payload, "documentUrl");
        var saved = TencentSiteProfileStore.Save(tested, (string?)profile["id"] ?? "", (int?)profile["revision"] ?? 0);
        return new { profile = saved, message = "已保存网页适配，可在其他腾讯文档中复用。" };
    }
}
