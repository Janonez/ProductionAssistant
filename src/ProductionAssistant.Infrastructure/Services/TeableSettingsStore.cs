using System.Text.Json;
using System.Text.Json.Serialization;

namespace ProductionAssistant.Services;

public sealed class TeableSettings
{
    public string ServerUrl { get; set; } = string.Empty;
    public string TableId { get; set; } = string.Empty;
    public string EncryptedToken { get; set; } = string.Empty;
    [JsonIgnore] public string Token { get; set; } = string.Empty;
}

public static class TeableSettingsStore
{
    public static string FilePath => Path.Combine(RuntimeEnvironment.DataDirectory, "teable-settings.json");

    public static TeableSettings Load()
    {
        if (!File.Exists(FilePath)) throw new InvalidOperationException("请先运行 configure 配置 Teable。");
        var settings = JsonSerializer.Deserialize<TeableSettings>(File.ReadAllText(FilePath))
            ?? throw new InvalidOperationException("Teable 配置无效。");
        settings.Token = WindowsTokenProtector.Unprotect(settings.EncryptedToken);
        return settings;
    }

    public static void Save(TeableSettings settings)
    {
        using var validation = new TeableClient(settings.ServerUrl, settings.Token);
        if (string.IsNullOrWhiteSpace(settings.TableId) ||
            !settings.TableId.StartsWith("tbl", StringComparison.Ordinal) || !settings.TableId.All(char.IsAsciiLetterOrDigit))
            throw new ArgumentException("测试表 ID 必须是 tbl 开头的字母数字 ID。");
        settings.EncryptedToken = WindowsTokenProtector.Protect(settings.Token);
        Directory.CreateDirectory(RuntimeEnvironment.DataDirectory);
        var temporary = FilePath + ".tmp";
        File.WriteAllText(temporary, JsonSerializer.Serialize(settings, new JsonSerializerOptions { WriteIndented = true }));
        File.Move(temporary, FilePath, true);
    }
}
