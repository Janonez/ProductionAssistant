using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public static class DailyReportPresentation
{
    public static IReadOnlyList<string> PagePaths(IEnumerable<NotionDataSourceOption> sources) => sources
        .Select(source => PagePath(source.Path))
        .Distinct(StringComparer.CurrentCultureIgnoreCase)
        .OrderBy(path => path, StringComparer.CurrentCultureIgnoreCase)
        .ToArray();

    public static IReadOnlyList<NotionDataSourceOption> SourcesForPage(
        IEnumerable<NotionDataSourceOption> sources,
        string pagePath) => sources
        .Where(source => string.Equals(PagePath(source.Path), pagePath, StringComparison.CurrentCultureIgnoreCase) &&
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

    public static DailyReportCredentialSummary CredentialSummary(DailyReportJob job) => new(
        string.IsNullOrWhiteSpace(job.EncryptedWebhook) ? "Webhook 未配置" : "Webhook 已保存",
        string.IsNullOrWhiteSpace(job.EncryptedSecret) ? "Secret 未配置" : "Secret 已保存",
        job.DingTalkConnected switch
        {
            true => $"连接正常 · 检测于 {job.DingTalkCheckedAt:yyyy-MM-dd HH:mm}",
            false => $"连接失败 · {job.DingTalkStatus}",
            _ => "尚未检测连接"
        });

    public static IReadOnlyList<DailyReportRunRecord> RecentRuns(IEnumerable<DailyReportRunRecord> records) =>
        records.Take(5).ToArray();

    private static string PagePath(string path)
    {
        var parts = path.Split('/', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
        return parts.Length > 1 ? string.Join(" / ", parts[..^1]) : "根页面";
    }

    private static bool ContainsAny(string value, params string[] terms) =>
        terms.Any(term => value.Contains(term, StringComparison.CurrentCultureIgnoreCase));

}

public sealed record DailyReportCredentialSummary(string WebhookText, string SecretText, string ConnectionText);
