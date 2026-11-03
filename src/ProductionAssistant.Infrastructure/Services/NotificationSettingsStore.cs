using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public static class NotificationSettingsStore
{
    private static readonly JsonSerializerOptions JsonOptions = new() { WriteIndented = true };
    private static string SettingsPath => Path.Combine(Path.GetFullPath(RuntimeEnvironment.DataDirectory), "notification-settings.json");

    public static NotificationSettings Load() => WithLock(LoadCore);

    public static NotificationSettings Update(Action<NotificationSettings> update, string webhook = "", string secret = "") =>
        WithLock(path =>
        {
            var settings = LoadCore(path);
            update(settings);
            SaveCore(path, settings, webhook, secret);
            return settings;
        });

    private static NotificationSettings LoadCore(string path)
    {
        try
        {
            var settings = JsonSerializer.Deserialize<NotificationSettings>(File.ReadAllText(path));
            if (settings is null || settings.Rules is null || settings.Rules.Any(rule => rule is null))
                throw new JsonException();
            AddMissingRules(settings);
            return settings;
        }
        catch (FileNotFoundException) { return new(); }
        catch (DirectoryNotFoundException) { return new(); }
        catch (JsonException ex)
        {
            throw new InvalidOperationException("通知配置文件损坏，请修复或恢复备份后重试。", ex);
        }
    }

    public static void Save(NotificationSettings settings, string webhook = "", string secret = "") =>
        WithLock(path =>
        {
            // Snapshot callers must not overwrite an unreadable existing configuration either.
            _ = LoadCore(path);
            SaveCore(path, settings, webhook, secret);
            return true;
        });

    private static void SaveCore(string path, NotificationSettings settings, string webhook = "", string secret = "")
    {
        if (!string.IsNullOrWhiteSpace(webhook)) settings.EncryptedWebhook = WindowsTokenProtector.Protect(webhook.Trim());
        if (!string.IsNullOrWhiteSpace(secret)) settings.EncryptedSecret = WindowsTokenProtector.Protect(secret.Trim());
        Directory.CreateDirectory(Path.GetDirectoryName(path)!);
        var temporary = path + ".tmp";
        File.WriteAllText(temporary, JsonSerializer.Serialize(settings, JsonOptions));
        File.Move(temporary, path, true);
    }

    public static string ReadWebhook(NotificationSettings settings) => Unprotect(settings.EncryptedWebhook);
    public static string ReadSecret(NotificationSettings settings) => Unprotect(settings.EncryptedSecret);

    public static void ImportLegacy(string encryptedWebhook, string encryptedSecret)
    {
        if (string.IsNullOrWhiteSpace(encryptedWebhook) && string.IsNullOrWhiteSpace(encryptedSecret)) return;
        WithLock(path =>
        {
            var settings = LoadCore(path);
            if (!string.IsNullOrWhiteSpace(settings.EncryptedWebhook) || !string.IsNullOrWhiteSpace(settings.EncryptedSecret)) return false;
            settings.EncryptedWebhook = encryptedWebhook;
            settings.EncryptedSecret = encryptedSecret;
            settings.DingTalkStatus = "已从日报任务迁移，请重新测试。";
            SaveCore(path, settings);
            return true;
        });
    }

    internal static string MutexName() => MutexName(Path.GetDirectoryName(SettingsPath)!);

    private static string MutexName(string directory)
    {
        var normalized = Path.TrimEndingDirectorySeparator(Path.GetFullPath(directory)).ToUpperInvariant();
        return @"Local\ProductionAssistant.NotificationSettings." +
            Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(normalized)));
    }

    private static T WithLock<T>(Func<string, T> action)
    {
        // One synchronous mutex covers reads, updates, snapshot saves and legacy imports.
        // Never await while owning this thread-affine mutex; core methods do not reacquire it.
        var path = SettingsPath;
        using var mutex = new Mutex(false, MutexName(Path.GetDirectoryName(path)!));
        var acquired = false;
        try
        {
            try { acquired = mutex.WaitOne(TimeSpan.FromSeconds(5)); }
            catch (AbandonedMutexException) { acquired = true; }
            if (!acquired) throw new IOException("通知配置正在更新，请稍后重试。");
            return action(path);
        }
        finally
        {
            if (acquired) mutex.ReleaseMutex();
        }
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
