using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Media;
using Windows.Foundation;

namespace ProductionAssistant.Controls;

// Native equivalent of CSS border-radius: 20px; corner-shape: squircle.
public sealed class SkeletonShape : Grid
{
    private readonly Microsoft.UI.Xaml.Shapes.Path _shape = new();

    public static readonly DependencyProperty FillProperty = DependencyProperty.Register(
        nameof(Fill), typeof(Brush), typeof(SkeletonShape), new PropertyMetadata(null,
            (sender, args) => ((SkeletonShape)sender)._shape.Fill = (Brush)args.NewValue));

    public Brush Fill
    {
        get => (Brush)GetValue(FillProperty);
        set => SetValue(FillProperty, value);
    }

    public SkeletonShape()
    {
        IsHitTestVisible = false;
        Children.Add(_shape);
        SizeChanged += (_, _) => UpdateGeometry();
    }

    private void UpdateGeometry()
    {
        var width = ActualWidth;
        var height = ActualHeight;
        if (width <= 0 || height <= 0) return;
        var radius = Math.Min(20, Math.Min(width, height) / 2);
        var figure = new PathFigure { StartPoint = new Point(width - radius, 0), IsClosed = true, IsFilled = true };
        // CSS squircle uses a fourth-power superellipse. Sample each corner
        // in x/y space to avoid long straight segments near the axes.
        for (var corner = 0; corner < 4; corner++)
        {
            for (var step = 0; step <= 32; step++)
            {
                var t = step / 32.0;
                var x = t <= .5 ? 2 * t * Math.Pow(.5, .25) : Math.Pow(1 - Math.Pow(2 * (1 - t) * Math.Pow(.5, .25), 4), .25);
                var y = t <= .5 ? Math.Pow(1 - Math.Pow(x, 4), .25) : 2 * (1 - t) * Math.Pow(.5, .25);
                var point = corner switch
                {
                    0 => new Point(width - radius + radius * x, radius - radius * y),
                    1 => new Point(width - radius + radius * y, height - radius + radius * x),
                    2 => new Point(radius - radius * x, height - radius + radius * y),
                    _ => new Point(radius - radius * y, radius - radius * x)
                };
                figure.Segments.Add(new LineSegment { Point = point });
            }
        }
        var geometry = new PathGeometry();
        geometry.Figures.Add(figure);
        _shape.Data = geometry;
    }
}
