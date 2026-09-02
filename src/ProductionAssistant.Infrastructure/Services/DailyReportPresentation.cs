using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public static class DailyReportPresentation
{
    public static IReadOnlyList<NotionDataSourceOption> VisibleSources(
        IEnumerable<NotionDataSourceOption> sources,
        IEnumerable<NotionTargetSettings> targets) => sources.ToArray();

    public static IReadOnlyList<string> BusinessSections(IEnumerable<NotionDataSourceOption> sources) => sources
        .Select(source => BusinessSection(source.Path))
        .Where(section => !string.IsNullOrWhiteSpace(section))
        .Distinct(StringComparer.CurrentCultureIgnoreCase)
        .OrderBy(section => section, StringComparer.CurrentCultureIgnoreCase)
        .ToArray();

    public static IReadOnlyList<string> BusinessSections(IEnumerable<DatabaseSourceInfo> sources) => sources
        .Select(source => source.BusinessSection)
        .Where(section => !string.IsNullOrWhiteSpace(section))
        .Distinct(StringComparer.CurrentCultureIgnoreCase)
        .OrderBy(section => section, StringComparer.CurrentCultureIgnoreCase)
        .ToArray();

    public static IReadOnlyList<NotionDataSourceOption> SourcesForBusiness(
        IEnumerable<NotionDataSourceOption> sources,
        string businessSection) => sources
        .Where(source => string.Equals(BusinessSection(source.Path), businessSection, StringComparison.CurrentCultureIgnoreCase) &&
                         !string.IsNullOrWhiteSpace(source.Id))
        .OrderBy(source => source.Name, StringComparer.CurrentCultureIgnoreCase)
        .ThenBy(source => source.Path, StringComparer.CurrentCultureIgnoreCase)
        .ThenBy(source => source.Id, StringComparer.Ordinal)
        .ToArray();

    public static string PeriodFor(NotionDataSourceOption source, IEnumerable<NotionTargetSettings> targets)
    {
        var key = targets.FirstOrDefault(target => target.Id == source.Id)?.ModuleKey;
        if (key == ProductionMessageKinds.TowerMonthlyModuleKey) return "month";
        if (key == ProductionMessageKinds.TowerYearlyModuleKey) return "year";
        if (key == ProductionMessageKinds.TowerDailyModuleKey) return "day";
        if (ContainsAny(source.Name, "每年", "年累计", "全年", "本年")) return "year";
        if (ContainsAny(source.Name, "每月", "月累计", "当月", "本月")) return "month";
        return "day";
    }

    public static DailyReportCredentialSummary CredentialSummary(NotificationSettings settings) => new(
        string.IsNullOrWhiteSpace(settings.EncryptedWebhook) ? "Webhook 未配置" : "Webhook 已保存",
        string.IsNullOrWhiteSpace(settings.EncryptedSecret) ? "Secret 未配置" : "Secret 已保存",
        settings.DingTalkConnected switch
        {
            true => $"连接正常 · 检测于 {settings.DingTalkCheckedAt:yyyy-MM-dd HH:mm}",
            false => $"连接失败 · {settings.DingTalkStatus}",
            _ => "尚未检测连接"
        });

    public static IReadOnlyList<DailyReportRunRecord> RecentRuns(IEnumerable<DailyReportRunRecord> records) =>
        records.Take(5).ToArray();

    public static string BusinessSection(string path)
    {
        var parts = path.Split('/', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
        return parts.Length >= 3 ? parts[1] : string.Empty;
    }

    private static bool ContainsAny(string value, params string[] terms) =>
        terms.Any(term => value.Contains(term, StringComparison.CurrentCultureIgnoreCase));

}

public sealed record DailyReportCredentialSummary(string WebhookText, string SecretText, string ConnectionText);
