using System.Text.Json.Nodes;

namespace ProductionAssistant.Services;

// Web controls and business positions belong to the same job. Old shared references are read-only migration input.
public static class TencentSheetConfig
{
    public static JsonObject Resolve(JsonNode raw)
    {
        var config = raw.DeepClone().AsObject();
        var id = (string?)config["siteProfileId"];
        if (config["webControls"] is null && !string.IsNullOrEmpty(id))
        {
            TencentSheetService.RequireDevelopment();
            var path = Path.Combine(RuntimeEnvironment.DataDirectory, "tencent-site-profiles.json");
            var profiles = File.Exists(path) ? JsonNode.Parse(File.ReadAllText(path))!.AsArray() : new JsonArray();
            var profile = profiles.FirstOrDefault(item => (string?)item?["id"] == id);
            // Missing old controls must require recording, never fall back to unrelated legacy selectors.
            config["webControls"] = profile?["controls"]?.DeepClone() ?? new JsonObject();
        }
        config.Remove("siteProfileId");
        config.Remove("siteProfile");
        return config;
    }
}
