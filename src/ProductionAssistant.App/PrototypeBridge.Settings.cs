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
        var settings = NotionSettingsStore.Load();
        var token = ReadString(payload, "token").Trim();
        var rootPageId = payload.ValueKind == JsonValueKind.Object && payload.TryGetProperty("rootPageId", out _)
            ? ReadString(payload, "rootPageId").Trim()
            : settings.RootPageId;
        var connectionChanged =
            !string.Equals(settings.RootPageId, rootPageId, StringComparison.OrdinalIgnoreCase) ||
            (!string.IsNullOrWhiteSpace(token) && !string.Equals(settings.Token, token, StringComparison.Ordinal));

        if (!string.IsNullOrWhiteSpace(token)) settings.Token = token;
        if (string.IsNullOrWhiteSpace(settings.Token))
            throw new InvalidOperationException("请输入 Notion API 令牌。");

        if (connectionChanged)
        {
            settings.CachedDataSources.Clear();
            settings.DataSourcesCachedAtUtc = null;
        }

        settings.RootPageId = rootPageId;
        NotionSettingsStore.Save(settings);

        if (refresh || connectionChanged || settings.CachedDataSources.Count == 0)
        {
            var result = await AppServices.Notion.DiscoverAsync(settings.Token, settings.RootPageId, cancellationToken);
            if (!result.Succeeded) throw new InvalidOperationException(result.Message);
            settings.CachedDataSources = result.DataSources.ToList();
            settings.DataSourcesCachedAtUtc = DateTime.UtcNow;
            NotionSettingsStore.Save(settings);
            return SettingsResult("数据源已刷新。", settings);
        }

        return SettingsResult("连接配置已保存。", settings);
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
        notion ??= NotionSettingsStore.Load();
        notification ??= NotificationSettingsStore.Load();
        var version = Assembly.GetExecutingAssembly()
            .GetCustomAttribute<AssemblyInformationalVersionAttribute>()?
            .InformationalVersion ?? "1.5.2";
        return new
        {
            notion = new
            {
                configured = !string.IsNullOrWhiteSpace(notion.Token),
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
