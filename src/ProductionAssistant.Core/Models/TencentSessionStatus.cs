namespace ProductionAssistant.Models;

// No credentials, account names, document contents or local profile paths cross the Bridge.
public sealed record TencentSessionStatus(
    string State, bool BrowserOpen, string Authentication, string DocumentAccess,
    string EditPermission, string? VerifiedAt, string Message, string? Code = null, string? RecoveryHint = null)
{
    public static TencentSessionStatus Closed => new("closed", false, "unknown", "unknown", "unknown", null,
        "当前没有受管浏览器会话；重新打开并验证后才能确认登录状态。");
    public static TencentSessionStatus ProfileBusy => new("profile-busy", false, "unknown", "unknown", "unknown", null,
        "专用浏览器配置正被其他进程使用。", "ProfileBusy", "请先在占用它的应用中结束会话，再重新打开。");
}
