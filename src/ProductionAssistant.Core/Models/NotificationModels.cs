namespace ProductionAssistant.Models;

public static class NotificationEvents
{
    public const string ReportDataNotReady = "REPORT_DATA_NOT_READY";
    public const string ReportSendFailed = "REPORT_SEND_FAILED";
    public const string FineReportExportFailed = "FINEREPORT_EXPORT_FAILED";
    public const string WeChatDocumentLoginRequired = "WECHAT_DOC_LOGIN_REQUIRED";
    public const string TaskSucceeded = "TASK_SUCCEEDED";
    public const string AutomationFailed = "AUTOMATION_FAILED";
}

public sealed class NotificationSettings
{
    public int ConfigVersion { get; set; } = 1;
    public bool DingTalkEnabled { get; set; } = true;
    public string DingTalkChannelName { get; set; } = "生产管理群";
    public string EncryptedWebhook { get; set; } = string.Empty;
    public string EncryptedSecret { get; set; } = string.Empty;
    public DateTimeOffset? DingTalkCheckedAt { get; set; }
    public bool? DingTalkConnected { get; set; }
    public string DingTalkStatus { get; set; } = string.Empty;
    public List<NotificationRule> Rules { get; set; } = NotificationRule.CreateDefaults();
}

public sealed class NotificationRule
{
    public string EventType { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public bool Enabled { get; set; }
    public string Level { get; set; } = "error";
    public string Template { get; set; } = string.Empty;

    public static List<NotificationRule> CreateDefaults() =>
    [
        new() { EventType = NotificationEvents.ReportDataNotReady, Name = "日报数据未就绪", Enabled = true, Level = "warning", Template = "【数据未就绪】\n任务：{{taskName}}\n日期：{{reportDate}}\n原因：{{reason}}" },
        new() { EventType = NotificationEvents.ReportSendFailed, Name = "日报发送失败", Enabled = true, Level = "error", Template = "【日报发送失败】\n任务：{{taskName}}\n日期：{{reportDate}}\n原因：{{reason}}" },
        new() { EventType = NotificationEvents.FineReportExportFailed, Name = "FineReport 导出失败", Enabled = true, Level = "error", Template = "【FineReport 导出失败】\n任务：{{taskName}}\n原因：{{reason}}" },
        new() { EventType = NotificationEvents.WeChatDocumentLoginRequired, Name = "微信文档登录失效", Enabled = true, Level = "error", Template = "任务「{{taskName}}」登录状态已失效，请重新扫码登录。" },
        new() { EventType = NotificationEvents.TaskSucceeded, Name = "任务执行成功", Enabled = false, Level = "info", Template = "任务「{{taskName}}」已执行成功。" },
        new() { EventType = NotificationEvents.AutomationFailed, Name = "自动任务异常", Enabled = true, Level = "error", Template = "【自动任务异常】\n任务：{{taskName}}\n原因：{{reason}}" }
    ];
}
