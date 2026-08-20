using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public static class MachiningHoursProcessor
{
    public static MachineHoursMatrix Build(
        ReportPeriod period,
        IReadOnlyList<ReportDeviceDefinition> devices,
        IReadOnlyList<MachineDailyReport> reports)
    {
        var expectedDates = period.Dates;
        var reportsByDate = reports.ToDictionary(report => report.ReportDate);
        var missingDates = expectedDates.Where(date => !reportsByDate.ContainsKey(date)).ToArray();
        if (missingDates.Length > 0)
            throw new InvalidOperationException($"周期日报不完整，缺少：{string.Join("、", missingDates.Select(date => date.ToString("yyyy-MM-dd")))}");

        var expectedNames = devices.Select(device => device.Name).ToHashSet(StringComparer.Ordinal);
        var values = devices.ToDictionary(
            device => device.Name,
            _ => (IDictionary<DateOnly, double>)new Dictionary<DateOnly, double>(),
            StringComparer.Ordinal);

        foreach (var report in reports)
        {
            var actualNames = report.Devices.Select(device => device.DeviceName).ToArray();
            var duplicates = actualNames.GroupBy(name => name, StringComparer.Ordinal).Where(group => group.Count() > 1).Select(group => group.Key).ToArray();
            var missing = expectedNames.Except(actualNames, StringComparer.Ordinal).ToArray();
            var unknown = actualNames.Except(expectedNames, StringComparer.Ordinal).ToArray();
            if (duplicates.Length > 0 || missing.Length > 0 || unknown.Length > 0)
                throw new InvalidOperationException($"{report.ReportDate:yyyy-MM-dd} 设备集合异常。重复：{List(duplicates)}；缺失：{List(missing)}；未知：{List(unknown)}。");

            foreach (var record in report.Devices)
                values[record.DeviceName].Add(report.ReportDate, record.ActualMachineHours);
        }

        return new MachineHoursMatrix(
            period,
            devices,
            values.ToDictionary(
                pair => pair.Key,
                pair => (IReadOnlyDictionary<DateOnly, double>)new Dictionary<DateOnly, double>(pair.Value),
                StringComparer.Ordinal));
    }

    private static string List(IEnumerable<string> values)
    {
        var items = values.ToArray();
        return items.Length == 0 ? "无" : string.Join("、", items);
    }
}
