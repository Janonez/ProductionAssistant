using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public static class ReportPeriodResolver
{
    public static ReportPeriod CrossMonth(int year, int month, int startDay = 21, int endDay = 20)
    {
        if (month is < 1 or > 12) throw new ArgumentOutOfRangeException(nameof(month));
        if (startDay is < 1 or > 28 || endDay is < 1 or > 28)
            throw new ArgumentOutOfRangeException(nameof(startDay), "跨月周期日期必须在 1 到 28 之间。");

        var end = new DateOnly(year, month, endDay);
        var previous = end.AddMonths(-1);
        return new ReportPeriod(new DateOnly(previous.Year, previous.Month, startDay), end);
    }
}
