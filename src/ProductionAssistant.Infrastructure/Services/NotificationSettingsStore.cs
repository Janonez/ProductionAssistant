using System.Text.Json;
using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public static class NotificationSettingsStore
{
    private static readonly JsonSerializerOptions JsonOptions = new() { WriteIndented = true };
    private static string FolderPath => Environment.GetEnvironmentVariable("PRODUCTIONASSISTANT_DATA_DIR")
        ?? Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "ProductionAssistant");
    private static string SettingsPath => Path.Combine(FolderPath, "notification-settings.json");

    public static NotificationSettings Load()
    {
        try
        {
            var settings = File.Exists(SettingsPath)
                ? JsonSerializer.Deserialize<NotificationSettings>(File.ReadAllText(SettingsPath)) ?? new()
                : new();
            AddMissingRules(settings);
            return settings;
        }
        catch { return new(); }
    }

    public static void Save(NotificationSettings settings, string webhook = "", string secret = "")
    {
        if (!string.IsNullOrWhiteSpace(webhook)) settings.EncryptedWebhook = WindowsTokenProtector.Protect(webhook.Trim());
        if (!string.IsNullOrWhiteSpace(secret)) settings.EncryptedSecret = WindowsTokenProtector.Protect(secret.Trim());
        Directory.CreateDirectory(FolderPath);
        var temporary = SettingsPath + ".tmp";
        File.WriteAllText(temporary, JsonSerializer.Serialize(settings, JsonOptions));
        File.Move(temporary, SettingsPath, true);
    }

    public static string ReadWebhook(NotificationSettings settings) => Unprotect(settings.EncryptedWebhook);
    public static string ReadSecret(NotificationSettings settings) => Unprotect(settings.EncryptedSecret);

    public static void ImportLegacy(string encryptedWebhook, string encryptedSecret)
    {
        if (string.IsNullOrWhiteSpace(encryptedWebhook) && string.IsNullOrWhiteSpace(encryptedSecret)) return;
        var settings = Load();
        if (!string.IsNullOrWhiteSpace(settings.EncryptedWebhook) || !string.IsNullOrWhiteSpace(settings.EncryptedSecret)) return;
        settings.EncryptedWebhook = encryptedWebhook;
        settings.EncryptedSecret = encryptedSecret;
        settings.DingTalkStatus = "已从日报任务迁移，请重新测试。";
        Save(settings);
    }

    private static void AddMissingRules(NotificationSettings settings)
    {
        foreach (var rule in NotificationRule.CreateDefaults())
            if (settings.Rules.All(item => item.EventType != rule.EventType)) settings.Rules.Add(rule);
    }

    private static string Unprotect(string value)
    {
        try { return WindowsTokenProtector.Unprotect(value); }
        catch { return string.Empty; }
    }
}
