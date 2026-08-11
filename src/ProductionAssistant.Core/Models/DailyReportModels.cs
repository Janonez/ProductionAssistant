namespace ProductionAssistant.Models;

public sealed class DailyReportSettings
{
    public int ConfigVersion { get; set; } = 1;
    public string DraftTemplate { get; set; } = string.Empty;
    public string DraftTemplateDocument { get; set; } = string.Empty;
    public string ActiveTemplate { get; set; } = string.Empty;
    public string ActiveTemplateDocument { get; set; } = string.Empty;
    public int ActiveTemplateVersion { get; set; }
    public string EncryptedWebhook { get; set; } = string.Empty;
    public string EncryptedSecret { get; set; } = string.Empty;
    public string SendTime { get; set; } = "17:30";
    public List<DailyReportSourceBinding> Sources { get; set; } = [];
    public List<DailyReportFieldDefinition> Fields { get; set; } = [];
    public DateTimeOffset? DingTalkCheckedAt { get; set; }
    public bool? DingTalkConnected { get; set; }
    public string DingTalkStatus { get; set; } = string.Empty;
}

public sealed class DailyReportSourceBinding
{
    public string DataSourceId { get; set; } = string.Empty;
    public string DataSourceName { get; set; } = string.Empty;
    public string MatchPropertyId { get; set; } = string.Empty;
    public string MatchPropertyName { get; set; } = string.Empty;
    public string MatchPropertyType { get; set; } = "date";
    public string PeriodKind { get; set; } = "day";

    // Compatibility with the first preview build.
    public string DatePropertyId { get; set; } = string.Empty;
    public string DatePropertyName { get; set; } = string.Empty;
}

public sealed class DailyReportFieldDefinition
{
    public string Placeholder { get; set; } = string.Empty;
    public DailyReportFieldToken Token { get; set; } = new("", "", "", "", "");
}

public sealed record DailyReportFieldToken(
    string DataSourceId,
    string DataSourceName,
    string PropertyId,
    string PropertyName,
    string PropertyType,
    string Format = "");

public sealed class DailyReportRunState
{
    public DateTimeOffset? LastRunAt { get; set; }
    public DateTimeOffset? LastSuccessAt { get; set; }
    public string LastSuccessDate { get; set; } = string.Empty;
    public int LastTemplateVersion { get; set; }
    public string LastSuccessSendTime { get; set; } = string.Empty;
    public string LastError { get; set; } = string.Empty;
    public string LastTextSummary { get; set; } = string.Empty;
    public string LastResponse { get; set; } = string.Empty;
    public int LastAttempts { get; set; }

    public bool WasSent(string date, int templateVersion, string sendTime) =>
        LastSuccessDate == date &&
        LastTemplateVersion == templateVersion &&
        LastSuccessSendTime == sendTime;
}

public sealed record DailyReportBuildResult(bool Succeeded, string Message, string Text);

public sealed record DailyReportSendResult(bool Succeeded, string Message, int Attempts = 1);

public enum DailyReportExitCode
{
    Success = 0,
    AlreadySent = 10,
    CrossDaySkipped = 11,
    InvalidData = 20,
    NetworkFailure = 30
}
