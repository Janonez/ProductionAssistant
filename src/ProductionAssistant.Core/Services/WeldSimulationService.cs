using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public static class WeldSimulationService
{
    public static IReadOnlyList<DailyWeldRow> Generate(int total, int year, int month, double volatilityPercent, Random? random = null)
    {
        total = Math.Max(0, total);
        var dayCount = DateTime.DaysInMonth(year, month);
        var firstDay = new DateTime(year, month, 1);
        var volatility = Math.Clamp(volatilityPercent, 0, 80) / 100d;
        random ??= Random.Shared;

        var weights = new double[dayCount];
        for (var index = 0; index < dayCount; index++)
        {
            var date = firstDay.AddDays(index);
            var weekdayFactor = date.DayOfWeek switch
            {
                DayOfWeek.Sunday => 0.66,
                DayOfWeek.Saturday => 0.80,
                _ => 1.0
            };
            var wave = 1 + Math.Sin(index / (double)Math.Max(7, dayCount) * Math.PI * 2) * 0.08;
            var noise = 1 + (random.NextDouble() * 2 - 1) * volatility;
            weights[index] = Math.Max(0.05, weekdayFactor * wave * noise);
        }

        var weightSum = weights.Sum();
        var raw = weights.Select(weight => weight / weightSum * total).ToArray();
        var values = raw.Select(value => (int)Math.Floor(value)).ToArray();
        var remainder = total - values.Sum();

        foreach (var item in raw.Select((value, index) => new { index, fraction = value - Math.Floor(value) })
                     .OrderByDescending(item => item.fraction).Take(remainder))
            values[item.index]++;

        return Enumerable.Range(0, dayCount).Select(index =>
        {
            var date = firstDay.AddDays(index);
            return new DailyWeldRow
            {
                Index = index + 1,
                Date = date,
                Quantity = values[index],
                Note = date.DayOfWeek switch
                {
                    DayOfWeek.Sunday => "周日低产",
                    DayOfWeek.Saturday => "周末减产",
                    _ => string.Empty
                }
            };
        }).ToArray();
    }
}
