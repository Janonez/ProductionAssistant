using System.Reflection;
using System.Text.Json;
using ProductionAssistant.Models;
using ProductionAssistant.Services;

namespace ProductionAssistant;

internal sealed partial class PrototypeBridge
{
    private static readonly NotificationService SettingsNotifications = new();

    private static object OpenSettings()
    {
        App.MainWindow.SetSettingsModalOpen(true);
        return GetSettingsState();
    }

    private static object CloseSettings()
    {
        App.MainWindow.SetSettingsModalOpen(false);
        return new { closed = true };
    }

    private static async Task<object> SaveSettingsConnectionAsync(
        JsonElement payload,
        bool refresh,
        CancellationToken cancellationToken)
    {
        var settings = BusinessDatabaseSettingsStore.Load();
        var connection = TeableSettingsStore.Load();
        var serverUrl = ReadString(payload, "serverUrl").Trim();
        var newToken = ReadString(payload, "token").Trim();
        if (!string.IsNullOrWhiteSpace(serverUrl)) connection.ServerUrl = serverUrl;
        if (!string.IsNullOrWhiteSpace(newToken)) connection.Token = newToken;
        // 新连接先验证全部已绑定字段，失败不覆盖当前可用凭据。
        var store = new TeableBusinessStore(TeableQuerySettingsStore.Load(),
            () => new TeableClient(connection.ServerUrl, connection.Token));
        if (store.Sources.Count == 0) throw new InvalidOperationException("请先导入 Teable 生产数据库映射。");
        foreach (var source in store.Sources) await store.GetSchemaAsync(source.Id, cancellationToken);
        TeableSettingsStore.Save(connection);
        settings.CachedDataSources = store.Sources.ToList();
        settings.DataSourcesCachedAtUtc = DateTime.UtcNow;
        BusinessDatabaseSettingsStore.Save(settings);
        settings.TeableConfigured = true;
        return SettingsResult("Teable 连接及生产数据源已验证。", settings);
    }

    private static object SaveSettingsNotification(JsonElement payload)
    {
        var settings = SaveNotificationChannel(payload);
        return SettingsResult("通知渠道已保存，建议发送一次测试。", notification: settings);
    }

    private static async Task<object> TestSettingsNotificationAsync(
        JsonElement payload,
        CancellationToken cancellationToken)
    {
        var settings = SaveNotificationChannel(payload);
        var result = await SettingsNotifications.SendMessageAsync(
            $"【生产助手测试通知】\n渠道：{settings.DingTalkChannelName}\n时间：{DateTime.Now:yyyy-MM-dd HH:mm}",
            cancellationToken);
        settings.DingTalkConnected = result.Succeeded;
        settings.DingTalkCheckedAt = DateTimeOffset.Now;
        settings.DingTalkStatus = result.Message;
        NotificationSettingsStore.Save(settings);
        return SettingsResult(result.Message, notification: settings);
    }

    private static object SaveSettingsNotificationRules(JsonElement payload)
    {
        var settings = NotificationSettingsStore.Load();
        if (payload.ValueKind == JsonValueKind.Object &&
            payload.TryGetProperty("rules", out var rules) &&
            rules.ValueKind == JsonValueKind.Array)
        {
            var enabledByEvent = rules.EnumerateArray()
                .Where(item => item.ValueKind == JsonValueKind.Object)
                .Select(item => new
                {
                    EventType = ReadString(item, "eventType"),
                    Enabled = item.TryGetProperty("enabled", out var enabled) && enabled.ValueKind == JsonValueKind.True
                })
                .Where(item => !string.IsNullOrWhiteSpace(item.EventType))
                .ToDictionary(item => item.EventType, item => item.Enabled, StringComparer.Ordinal);
            foreach (var rule in settings.Rules)
                if (enabledByEvent.TryGetValue(rule.EventType, out var enabled)) rule.Enabled = enabled;
        }
        NotificationSettingsStore.Save(settings);
        return SettingsResult("通知规则已保存。", notification: settings);
    }

    private static NotificationSettings SaveNotificationChannel(JsonElement payload)
    {
        var settings = NotificationSettingsStore.Load();
        var webhook = ReadString(payload, "webhook").Trim();
        var secret = ReadString(payload, "secret").Trim();
        if (!string.IsNullOrWhiteSpace(webhook) || !string.IsNullOrWhiteSpace(secret))
        {
            settings.DingTalkConnected = null;
            settings.DingTalkStatus = "凭据已更新，请发送测试。";
        }
        settings.DingTalkEnabled = payload.ValueKind == JsonValueKind.Object &&
            payload.TryGetProperty("enabled", out var enabled) && enabled.ValueKind == JsonValueKind.True;
        settings.DingTalkChannelName = string.IsNullOrWhiteSpace(ReadString(payload, "channelName"))
            ? "生产管理群"
            : ReadString(payload, "channelName").Trim();
        NotificationSettingsStore.Save(settings, webhook, secret);
        return NotificationSettingsStore.Load();
    }

    private static object SettingsResult(
        string message,
        NotionSettings? notion = null,
        NotificationSettings? notification = null) => new
    {
        state = GetSettingsState(notion, notification),
        message
    };

    private static object GetSettingsState(
        NotionSettings? notion = null,
        NotificationSettings? notification = null)
    {
        notion ??= BusinessDatabaseSettingsStore.Load();
        notification ??= NotificationSettingsStore.Load();
        var version = Assembly.GetExecutingAssembly()
            .GetCustomAttribute<AssemblyInformationalVersionAttribute>()?
            .InformationalVersion ?? "1.5.3";
        return new
        {
            notion = new
            {
                configured = notion.ConnectionConfigured,
                provider = "Teable",
                serverUrl = TeableSettingsStore.Load().ServerUrl,
                notion.RootPageId,
                dataSourceCount = notion.CachedDataSources.Count,
                lastSyncedAt = notion.DataSourcesCachedAtUtc?.ToLocalTime().ToString("yyyy-MM-dd HH:mm") ?? string.Empty,
                sources = notion.CachedDataSources.OrderBy(source => source.Path)
                    .Select(source => new { source.Id, source.Name, source.Path })
            },
            notification = new
            {
                enabled = notification.DingTalkEnabled,
                channelName = notification.DingTalkChannelName,
                webhookConfigured = !string.IsNullOrWhiteSpace(notification.EncryptedWebhook),
                secretConfigured = !string.IsNullOrWhiteSpace(notification.EncryptedSecret),
                connected = notification.DingTalkConnected,
                status = notification.DingTalkStatus,
                checkedAt = notification.DingTalkCheckedAt?.ToLocalTime().ToString("yyyy-MM-dd HH:mm") ?? string.Empty,
                rules = notification.Rules.Select(rule => new
                {
                    rule.EventType,
                    rule.Name,
                    rule.Enabled,
                    rule.Level
                })
            },
            version
        };
    }
}
