using System.Text.Json;
using System.Text.Json.Serialization;

namespace ProductionAssistant.Services;

public sealed class TeableSettings
{
    public string ServerUrl { get; set; } = string.Empty;
    public string TableId { get; set; } = string.Empty;
    public string EncryptedToken { get; set; } = string.Empty;
    // 明文只在进程内使用；落盘仅保存 DPAPI 密文，不能把本对象作为前端凭据 DTO。
    [JsonIgnore] public string Token { get; set; } = string.Empty;
}

/// <summary>按现有运行环境隔离配置，复用 Windows DPAPI；必须由保存配置的同一 Windows 用户解密。</summary>
public static class TeableSettingsStore
{
    public static string FilePath => Path.Combine(RuntimeEnvironment.DataDirectory, "teable-settings.json");

    public static TeableSettings Load()
    {
        if (!File.Exists(FilePath)) return new();
        var settings = JsonSerializer.Deserialize<TeableSettings>(File.ReadAllText(FilePath))
            ?? throw new InvalidOperationException("Teable 配置无效。");
        settings.Token = WindowsTokenProtector.Unprotect(settings.EncryptedToken);
        return settings;
    }

    public static void Save(TeableSettings settings)
    {
        using var validation = new TeableClient(settings.ServerUrl, settings.Token);
        if (!string.IsNullOrWhiteSpace(settings.TableId) &&
            (!settings.TableId.StartsWith("tbl", StringComparison.Ordinal) || !settings.TableId.All(char.IsAsciiLetterOrDigit)))
            throw new ArgumentException("测试表 ID 必须是 tbl 开头的字母数字 ID。");
        settings.EncryptedToken = WindowsTokenProtector.Protect(settings.Token);
        Directory.CreateDirectory(RuntimeEnvironment.DataDirectory);
        // 完整写入临时文件后替换，避免直接覆盖配置时留下半个 JSON 文件。
        var temporary = FilePath + ".tmp";
        File.WriteAllText(temporary, JsonSerializer.Serialize(settings, new JsonSerializerOptions { WriteIndented = true }));
        File.Move(temporary, FilePath, true);
    }
}
