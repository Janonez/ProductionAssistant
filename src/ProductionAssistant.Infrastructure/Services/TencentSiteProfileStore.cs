using System.Text.Json.Nodes;

namespace ProductionAssistant.Services;

// Site controls are reusable; sheet names, date rules and cell anchors remain in each job.
public static class TencentSiteProfileStore
{
    private static readonly object StoreLock = new();
    private static string StorePath => Path.Combine(RuntimeEnvironment.DataDirectory, "tencent-site-profiles.json");

    public static JsonArray Load()
    {
        TencentSheetService.RequireDevelopment();
        lock (StoreLock) return File.Exists(StorePath) ? JsonNode.Parse(File.ReadAllText(StorePath))!.AsArray() : new();
    }

    public static JsonObject Save(JsonObject tested, string id, int expectedRevision)
    {
        TencentSheetService.RequireDevelopment();
        lock (StoreLock)
        {
            var profiles = Load();
            var previous = profiles.OfType<JsonObject>().FirstOrDefault(item => (string?)item["id"] == id);
            if (!string.IsNullOrEmpty(id) && (previous is null || (int?)previous["revision"] != expectedRevision))
                throw new InvalidOperationException("适配配置已变化，请重新打开并测试后保存。");
            var profile = tested.DeepClone().AsObject();
            profile["id"] = string.IsNullOrEmpty(id) ? Guid.NewGuid().ToString("N") : id;
            profile["revision"] = expectedRevision + 1;
            profile["testedAt"] = DateTimeOffset.Now.ToString("O");
            if (previous is not null) profiles.Remove(previous);
            profiles.Add(profile);
            Directory.CreateDirectory(RuntimeEnvironment.DataDirectory);
            var temporary = StorePath + ".tmp";
            File.WriteAllText(temporary, profiles.ToJsonString(new() { WriteIndented = true }));
            File.Move(temporary, StorePath, true);
            return profile.DeepClone().AsObject();
        }
    }

    public static JsonObject Resolve(JsonNode raw)
    {
        var config = raw.DeepClone().AsObject();
        // Always resolve from the local store. A supplied snapshot is never authoritative.
        config.Remove("siteProfile");
        var id = (string?)config["siteProfileId"];
        if (string.IsNullOrEmpty(id)) return config;
        var profile = Load().OfType<JsonObject>().FirstOrDefault(item => (string?)item["id"] == id)
            ?? throw new InvalidOperationException("找不到引用的网页适配配置，请重新选择适配。");
        config["siteProfile"] = profile.DeepClone();
        return config;
    }

    public static JsonObject ForStorage(JsonNode raw)
    {
        var config = raw.DeepClone().AsObject();
        config.Remove("siteProfile");
        return config;
    }
}
