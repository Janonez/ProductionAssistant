namespace ProductionAssistant.Models;

public sealed record DailyMaterialInboundSummary(
    DateOnly Date,
    decimal PlateWeight,
    decimal SectionWeight)
{
    public decimal TotalWeight => PlateWeight + SectionWeight;
}

public sealed class NotionFillJob
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N");
    public string Name { get; set; } = "原材料入库自动填报";
    public bool IsEnabled { get; set; }
    public string BaseUrl { get; set; } = string.Empty;
    public string SourcePageUrl { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string EncryptedPassword { get; set; } = string.Empty;
    public string TargetDataSourceId { get; set; } = string.Empty;
    public string TargetDataSourceName { get; set; } = "原材料入库数据库";
    public bool ConfigurationValidated { get; set; }
}

public sealed class NotionFillJobCatalog
{
    public int ConfigVersion { get; set; } = 1;
    public List<NotionFillJob> Jobs { get; set; } = [];
}

public sealed class NotionFillRunRecord
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N");
    public string JobId { get; set; } = string.Empty;
    public string Source { get; set; } = "automatic";
    public DateTimeOffset StartedAt { get; set; } = DateTimeOffset.Now;
    public DateTimeOffset? FinishedAt { get; set; }
    public string BusinessDate { get; set; } = string.Empty;
    public bool Succeeded { get; set; }
    public bool Created { get; set; }
    public decimal PlateWeight { get; set; }
    public decimal SectionWeight { get; set; }
    public string Message { get; set; } = string.Empty;
    public string Error { get; set; } = string.Empty;
}

public sealed record NotionFillPreview(
    DailyMaterialInboundSummary Summary,
    bool TargetRecordExists,
    string Message);

public enum NotionFillExitCode
{
    Success = 0,
    AlreadyExists = 10,
    InvalidConfiguration = 20,
    SourceFailure = 30,
    NotionFailure = 40,
    JobNotFound = 50
}
