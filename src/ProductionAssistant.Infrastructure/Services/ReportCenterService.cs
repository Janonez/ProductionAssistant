using System.Text.Json;
using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public sealed class ReportCenterService
{
    private readonly FineReportCollector _collector = new();
    private readonly MachineReportExcelService _excel = new();

    public object GetState()
    {
        var config = ReportCenterConfigStore.Load();
        return new
        {
            config.Name,
            authenticated = _collector.HasAuthenticationState,
            credentialsConfigured = ReportCenterCredentialsStore.IsConfigured(),
            configPath = ReportCenterConfigStore.ConfigPath,
            sourceRoot = config.SourceRoot,
            outputRoot = config.OutputRoot,
            reportUrl = config.ReportUrl,
            username = ReportCenterCredentialsStore.Load().Username,
            devices = config.Devices.Count
        };
    }

    public object SaveConfig(string sourceRoot, string outputRoot, string reportUrl, string username, string password)
    {
        if (!Uri.TryCreate(reportUrl, UriKind.Absolute, out var uri) || uri.Scheme is not ("http" or "https"))
            throw new InvalidOperationException("请输入有效的报表网页地址。");
        if (string.IsNullOrWhiteSpace(sourceRoot) || string.IsNullOrWhiteSpace(outputRoot))
            throw new InvalidOperationException("源文件位置和输出位置不能为空。");
        Directory.CreateDirectory(sourceRoot.Trim());
        Directory.CreateDirectory(outputRoot.Trim());
        var config = ReportCenterConfigStore.Load();
        config.SourceRoot = sourceRoot.Trim();
        config.OutputRoot = outputRoot.Trim();
        config.ReportUrl = reportUrl.Trim();
        ReportCenterConfigStore.Save(config);
        ReportCenterCredentialsStore.Save(username, password);
        if (File.Exists(ReportCenterConfigStore.AuthStatePath)) File.Delete(ReportCenterConfigStore.AuthStatePath);
        return GetState();
    }

    public Task CaptureAuthenticationAsync(CancellationToken cancellationToken) =>
        _collector.CaptureAuthenticationAsync(ReportCenterConfigStore.Load(), cancellationToken);

    public async Task<ReportRunSummary> RunAsync(
        DateOnly startDate,
        DateOnly endDate,
        IProgress<ReportRunProgress>? progress,
        CancellationToken cancellationToken)
    {
        var config = ReportCenterConfigStore.Load();
        if (endDate < startDate) throw new InvalidOperationException("结束日期不能早于开始日期。");
        if (endDate.DayNumber - startDate.DayNumber > 366) throw new InvalidOperationException("单次统计范围不能超过 366 天。");
        var period = new ReportPeriod(startDate, endDate);
        var started = DateTimeOffset.Now;
        var runId = Guid.NewGuid().ToString("N");
        var reports = new List<MachineDailyReport>();
        var warnings = new List<string>();
        var dates = period.Dates;
        progress?.Report(new("collect", 0, dates.Count, "正在批量导出日报"));
        var collection = await _collector.CollectAsync(dates, config, progress, cancellationToken);
        var failures = collection.Failures.Select(failure => $"{failure.ReportDate:yyyy-MM-dd} 导出失败：{failure.Error}").ToList();

        for (var index = 0; index < collection.Succeeded.Count; index++)
        {
            var item = collection.Succeeded[index];
            try
            {
                reports.Add(_excel.Read(item.Path, item.ReportDate, config));
                progress?.Report(new("parse", index + 1, dates.Count, $"{item.ReportDate:yyyy-MM-dd} 已解析"));
            }
            catch (Exception ex)
            {
                failures.Add($"{item.ReportDate:yyyy-MM-dd} 解析失败：{ex.Message}");
            }
        }

        if (failures.Count > 0)
        {
            await AppendRunLogAsync(new { runId, started, finishedAt = DateTimeOffset.Now, period, plannedReports = dates.Count,
                exportedReports = collection.Succeeded.Count, parsedReports = reports.Count, failures }, cancellationToken);
            throw new InvalidOperationException($"本次任务有 {failures.Count} 个失败日期，未生成汇总：{string.Join("；", failures)}");
        }

        var matrix = MachiningHoursProcessor.Build(period, config.Devices, reports);
        progress?.Report(new("summary", dates.Count, dates.Count, "正在生成周期汇总"));
        var summaryPath = _excel.WriteSummary(matrix, config);
        progress?.Report(new("complete", dates.Count, dates.Count, "汇总文件已生成"));
        var summary = new ReportRunSummary(runId, started, DateTimeOffset.Now, period, dates.Count, dates.Count,
            reports.Count, config.Devices.Count, config.Devices.Count * dates.Count, config.Devices.Count * dates.Count,
            summaryPath, warnings);
        await AppendRunLogAsync(summary, cancellationToken);
        return summary;
    }

    private static async Task AppendRunLogAsync(object value, CancellationToken cancellationToken)
    {
        Directory.CreateDirectory(Path.GetDirectoryName(ReportCenterConfigStore.LogPath)!);
        await File.AppendAllTextAsync(ReportCenterConfigStore.LogPath, JsonSerializer.Serialize(value) + Environment.NewLine, cancellationToken);
    }
}
