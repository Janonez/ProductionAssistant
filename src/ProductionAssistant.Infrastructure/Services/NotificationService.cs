using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public sealed class NotificationService(DailyReportService? sender = null)
{
    private readonly DailyReportService _sender = sender ?? new();

    public async Task<DailyReportSendResult> SendMessageAsync(string text, CancellationToken cancellationToken = default)
    {
        var settings = NotificationSettingsStore.Load();
        if (!settings.DingTalkEnabled) return new(false, "系统通知渠道未启用。");
        return await _sender.SendAsync(NotificationSettingsStore.ReadWebhook(settings),
            NotificationSettingsStore.ReadSecret(settings), text, cancellationToken);
    }

    public async Task<DailyReportSendResult> NotifyAsync(
        string eventType,
        IReadOnlyDictionary<string, string> context,
        CancellationToken cancellationToken = default)
    {
        var settings = NotificationSettingsStore.Load();
        var rule = settings.Rules.FirstOrDefault(item => item.EventType == eventType);
        if (!settings.DingTalkEnabled || rule?.Enabled != true) return new(true, "当前通知规则已关闭。", 0);
        var message = context.Aggregate(rule.Template,
            (text, item) => text.Replace($"{{{{{item.Key}}}}}", item.Value, StringComparison.Ordinal));
        return await _sender.SendAsync(NotificationSettingsStore.ReadWebhook(settings),
            NotificationSettingsStore.ReadSecret(settings), message, cancellationToken);
    }

    public async Task<DailyReportSendResult> CheckConnectionAsync(CancellationToken cancellationToken = default)
    {
        var settings = NotificationSettingsStore.Load();
        return await _sender.CheckConnectionAsync(NotificationSettingsStore.ReadWebhook(settings), cancellationToken);
    }
}
