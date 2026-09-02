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

public sealed class DailyReportJob
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N");
    public string Name { get; set; } = "未命名日报";
    public bool IsEnabled { get; set; }
    public string DraftTemplate { get; set; } = string.Empty;
    public string DraftTemplateDocument { get; set; } = string.Empty;
    public string ActiveTemplate { get; set; } = string.Empty;
    public string ActiveTemplateDocument { get; set; } = string.Empty;
    public int ActiveTemplateVersion { get; set; }
    public string SendTime { get; set; } = "17:30";
    public List<DailyReportSourceBinding> Sources { get; set; } = [];
    public List<DailyReportFieldDefinition> Fields { get; set; } = [];
    public bool? ConfigurationValidated { get; set; }
}

public sealed class DailyReportJobCatalog
{
    public int ConfigVersion { get; set; } = 2;
    public List<DailyReportJob> Jobs { get; set; } = [];
}

public sealed class DailyReportSourceBinding
{
    public string DataSourceId { get; set; } = string.Empty;
    public string DataSourceName { get; set; } = string.Empty;
    public string MatchPropertyId { get; set; } = string.Empty;
    public string MatchPropertyName { get; set; } = string.Empty;
    public string MatchPropertyType { get; set; } = "date";
    public string PeriodKind { get; set; } = "day";
    public string DatePropertyId { get; set; } = string.Empty;
    public string DatePropertyName { get; set; } = string.Empty;
    public string ViewId { get; set; } = string.Empty;
    public string ViewName { get; set; } = string.Empty;
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
    string Format = "",
    string PeriodKind = "",
    string ViewId = "",
    string ViewName = "");

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
        LastSuccessDate == date && LastTemplateVersion == templateVersion && LastSuccessSendTime == sendTime;
}

public sealed class DailyReportRunRecord
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N");
    public string JobId { get; set; } = string.Empty;
    public string Source { get; set; } = "automatic";
    public DateTimeOffset StartedAt { get; set; } = DateTimeOffset.Now;
    public DateTimeOffset? FinishedAt { get; set; }
    public string BusinessDate { get; set; } = string.Empty;
    public int TemplateVersion { get; set; }
    public string Stage { get; set; } = "started";
    public bool Succeeded { get; set; }
    public int Attempts { get; set; }
    public string Response { get; set; } = string.Empty;
    public string Error { get; set; } = string.Empty;
    public string TextSummary { get; set; } = string.Empty;
}

public sealed record DailyReportBuildResult(bool Succeeded, string Message, string Text);
public sealed record DailyReportSendResult(bool Succeeded, string Message, int Attempts = 1);
public sealed record DailyReportViewResult(bool Succeeded, string Message, string Id = "", string Name = "");

public enum DailyReportExitCode
{
    Success = 0,
    AlreadySent = 10,
    CrossDaySkipped = 11,
    InvalidData = 20,
    NetworkFailure = 30,
    JobNotFound = 40
}
