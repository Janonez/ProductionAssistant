namespace ProductionAssistant.Models;

// No credentials, account names, document contents or local profile paths cross the Bridge.
public sealed record TencentSessionStatus(
    string State, bool BrowserOpen, string Authentication, string DocumentAccess,
    string EditPermission, string? VerifiedAt, string Message, string? Code = null, string? RecoveryHint = null,
    int SessionGeneration = 0, string? SessionScope = null, string? TargetDocumentUrl = null, int? ConfigRevision = null,
    string? AuthenticationSource = null, string? AuthenticationObservedAt = null, string? AuthenticationReason = null,
    bool AuthenticationStale = false, bool AuthenticationPreviouslyConfirmed = false,
    string? DocumentIdentity = null, string DocumentType = "unknown", string? DocumentName = null, string? DocumentCheckedAt = null,
    string Interaction = "none", string? LoginState = null, string? LoginOperationId = null,
    string? LoginWaitUntil = null, string? QrImage = null, TencentAuthenticationDiagnostics? AuthenticationDiagnostics = null,
    int PageGeneration = 0, TencentPermissionCheck? PermissionCheck = null)
{
    public static TencentSessionStatus Closed => new("closed", false, "unknown", "unknown", "unknown", null,
        "当前没有受管浏览器会话；持久化资料可能仍在，需要后台核验。");
    public static TencentSessionStatus ProfileBusy => new("profile-busy", false, "unknown", "unknown", "unknown", null,
        "专用浏览器配置正被其他进程使用。", "ProfileBusy", "请先在占用它的应用中结束会话，再重新打开。");
}

// Explicit allowlist: no Cookie names/values, query strings, response bodies or account identifiers.
public sealed record TencentAuthenticationDiagnostics(
    string CookieEvidence, string TokenReadSource, bool TokenMatchesCookie, bool TokenInUrl, bool TokenInResponse,
    int UserInfoRequestsSeen, int UserInfoRequestsAccepted, IReadOnlyList<TencentAuthenticationRequest> Requests);
public sealed record TencentAuthenticationRequest(string Origin, string Path, string Method, int? HttpStatus);

public sealed record TencentPermissionTarget(string? SheetId, string? SheetName, string Address, string? Label = null);
public sealed record TencentPermissionEvidence(string? Value = null, string? Reason = null, string? Source = null,
    string? ObservedAt = null, string? DocumentIdentity = null, int Generation = 0, int PageGeneration = 0,
    int UserGeneration = 0, string? PageRealm = null, int PermissionRevision = 0);
public sealed record TencentTargetPermission(string? SheetId, string? SheetName, string Address, string? Label,
    string Protection, string Eligibility, string Reason, TencentPermissionEvidence? ModelEvidence = null,
    TencentPermissionEvidence? RangeEvidence = null);
public sealed record TencentPermissionCheck(TencentPermissionEvidence Document, TencentPermissionEvidence Model,
    IReadOnlyList<TencentTargetPermission> Targets, string CheckedAt, string ExpiresAt, int Generation,
    int PageGeneration, int UserGeneration, int ObservationSequence = 0);
