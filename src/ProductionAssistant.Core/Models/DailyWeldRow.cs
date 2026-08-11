using System.ComponentModel;
using System.Globalization;
using System.Runtime.CompilerServices;

namespace ProductionAssistant.Models;

public sealed class DailyWeldRow : INotifyPropertyChanged
{
    private double _quantity;
    private string _note = string.Empty;
    private bool _isManuallyAdjusted;

    public int Index { get; set; }
    public DateTime Date { get; set; }
    public string DateText => Date.ToString("yyyy-MM-dd");
    public string Weekday => Date.ToString("ddd", CultureInfo.GetCultureInfo("zh-CN"));

    public double Quantity
    {
        get => _quantity;
        set
        {
            var normalized = Math.Max(0, Math.Round(value));
            if (Math.Abs(_quantity - normalized) < 0.001) return;
            _quantity = normalized;
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Quantity)));
        }
    }

    public string Note
    {
        get => _note;
        set
        {
            if (_note == value) return;
            _note = value;
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Note)));
        }
    }

    public bool IsManuallyAdjusted
    {
        get => _isManuallyAdjusted;
        set
        {
            if (_isManuallyAdjusted == value) return;
            _isManuallyAdjusted = value;
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(IsManuallyAdjusted)));
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(ManualMarker)));
        }
    }

    public string ManualMarker => IsManuallyAdjusted ? "● 手动" : string.Empty;

    public event PropertyChangedEventHandler? PropertyChanged;
}
