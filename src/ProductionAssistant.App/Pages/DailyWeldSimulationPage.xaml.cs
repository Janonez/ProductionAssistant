using System.Collections.ObjectModel;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using ProductionAssistant.Models;
using ProductionAssistant.Services;

namespace ProductionAssistant.Pages;

public sealed partial class DailyWeldSimulationPage : Page
{
    public ObservableCollection<DailyWeldRow> Rows { get; } = [];
    private readonly INotionImportService _notionImportService = AppServices.Notion;
    private bool _hasPendingRedistribution;
    private bool _hasNotionBinding;
    private readonly Dictionary<DailyWeldRow, double> _editOriginalValues = [];
    private readonly Dictionary<Button, object> _confirmationAnimationTokens = [];
#if DEBUG
    private Button _debugSingleImportButton = null!;
    private Button _debugSchemaButton = null!;
#endif
    private NumberBox? _activeQuantityBox;
    private const double DefaultVolatility = 22;
    private int PlannedTotal => double.IsNaN(TotalQuantityBox.Value)
        ? 0
        : Math.Max(0, (int)Math.Round(TotalQuantityBox.Value));

    public DailyWeldSimulationPage()
    {
        InitializeComponent();
        NavigationCacheMode = Microsoft.UI.Xaml.Navigation.NavigationCacheMode.Required;
        var today = DateTime.Today;
        var nextMonth = new DateTime(today.Year, today.Month, 1).AddMonths(1);
        YearComboBox.ItemsSource = Enumerable.Range(today.Year - 10, 21).ToArray();
        MonthComboBox.ItemsSource = Enumerable.Range(1, 12).Select(month => $"{month}月").ToArray();
        YearComboBox.SelectedItem = nextMonth.Year;
        MonthComboBox.SelectedIndex = nextMonth.Month - 1;
        TotalQuantityBox.Value = double.NaN;
#if DEBUG
        AddDebugTools();
#endif
        UpdateMonthHint();
        PageRoot.AddHandler(
            UIElement.KeyDownEvent,
            new Microsoft.UI.Xaml.Input.KeyEventHandler(QuantityBox_KeyDown),
            true);
        PageRoot.AddHandler(
            UIElement.TappedEvent,
            new Microsoft.UI.Xaml.Input.TappedEventHandler(PageRoot_Tapped),
            true);
        Loaded += DailyWeldSimulationPage_Loaded;
    }

    private void DailyWeldSimulationPage_Loaded(object sender, RoutedEventArgs e)
    {
        RefreshNotionBinding();
        UpdateActionButtons();
    }

    private void RightOperationPanel_SizeChanged(object sender, SizeChangedEventArgs e)
    {
        if (ResultsContentGrid is not null && e.NewSize.Height > 0)
            ResultsContentGrid.Height = e.NewSize.Height;
    }

    private async void GenerateButton_Click(object sender, RoutedEventArgs e)
    {
        if (double.IsNaN(TotalQuantityBox.Value))
        {
            await ShowResultDialogAsync("请输入月度总量", "填写月度焊接总数量后再生成模拟数据。");
            return;
        }
        GenerateRows();
    }

    private void MonthSelector_SelectionChanged(object sender, SelectionChangedEventArgs e)
    {
        if (DaysHintText is not null && YearComboBox.SelectedItem is int && MonthComboBox.SelectedIndex >= 0)
            UpdateMonthHint();
    }

    private void GenerateRows()
    {
        var year = YearComboBox.SelectedItem is int selectedYear ? selectedYear : DateTime.Today.Year;
        var month = MonthComboBox.SelectedIndex >= 0 ? MonthComboBox.SelectedIndex + 1 : DateTime.Today.Month;
        var result = WeldSimulationService.Generate(PlannedTotal, year, month, DefaultVolatility);

        _hasPendingRedistribution = false;
        _editOriginalValues.Clear();
        Rows.Clear();
        foreach (var row in result)
            Rows.Add(row);
        UpdateMonthHint();
        UpdateStatistics();
    }

    private void UpdateMonthHint()
    {
        if (DaysHintText is null) return;
        var year = YearComboBox.SelectedItem is int selectedYear ? selectedYear : DateTime.Today.Year;
        var month = MonthComboBox.SelectedIndex >= 0 ? MonthComboBox.SelectedIndex + 1 : DateTime.Today.Month;
        var days = DateTime.DaysInMonth(year, month);
        var leap = month == 2 ? DateTime.IsLeapYear(year) ? "（闰年）" : "（平年）" : string.Empty;
        DaysHintText.Text = $"{year}年{month}月：{days} 天{leap}";
    }

    private void UpdateStatistics()
    {
        if (ActualTotalText is null) return;
        if (Rows.Count == 0)
        {
            PlannedTotalText.Text = "—";
            ActualTotalText.Text = "—";
            TotalCheckInfoBar.Title = "等待生成数据";
            TotalCheckInfoBar.Message = string.Empty;
            TotalCheckInfoBar.Severity = InfoBarSeverity.Informational;
            ResultInfoBar.Message = "0 行数据 · 可修改特殊日期的产量，确认后系统会固定这些日期并重新分配其余产量。";
            UpdateActionButtons();
            return;
        }
        var actual = Rows.Sum(row => (int)Math.Round(row.Quantity));
        var difference = actual - PlannedTotal;

        PlannedTotalText.Text = PlannedTotal.ToString("N0");
        ActualTotalText.Text = actual.ToString("N0");
        ResultInfoBar.Message = $"{Rows.Count} 行数据 · 可修改特殊日期的产量，确认后系统会固定这些日期并重新分配其余产量。";

        TotalCheckInfoBar.Title = difference == 0 ? "核对正确" : "核对不一致";
        TotalCheckInfoBar.Message = difference == 0
            ? "当前合计与月度计划一致"
            : $"当前合计与计划相差 {difference:+#;-#;0}";
        TotalCheckInfoBar.Severity = difference == 0
            ? InfoBarSeverity.Success
            : InfoBarSeverity.Error;
        UpdateActionButtons();
    }

    private void RowQuantityBox_ValueChanged(
        NumberBox sender,
        NumberBoxValueChangedEventArgs args)
    {
        if (!double.IsNaN(args.NewValue) && sender.DataContext is DailyWeldRow row)
        {
            row.Quantity = args.NewValue;
        }
        UpdateStatistics();
    }

    private void QuantityBox_GotFocus(object sender, RoutedEventArgs e)
    {
        if (sender is NumberBox { DataContext: DailyWeldRow row } numberBox)
        {
            if (!ReferenceEquals(_activeQuantityBox, numberBox))
                _editOriginalValues[row] = row.Quantity;
            _activeQuantityBox = numberBox;
        }
    }

    private void QuantityBox_KeyDown(
        object sender,
        Microsoft.UI.Xaml.Input.KeyRoutedEventArgs e)
    {
        var numberBox = FindAncestor<NumberBox>(e.OriginalSource as DependencyObject);
        if (numberBox is null || numberBox.DataContext is not DailyWeldRow) return;

        if (e.Key != Windows.System.VirtualKey.Enter)
        {
            if (IsQuantityEditKey(e.Key) && FindConfirmButton(numberBox) is { } confirmButton)
            {
                if (FindManualStatusIndicator(confirmButton) is { } statusIndicator)
                    statusIndicator.Visibility = Visibility.Collapsed;
                confirmButton.Opacity = 1;
                confirmButton.Visibility = Visibility.Visible;
            }
            return;
        }

        ConfirmQuantityEdit(numberBox);
        e.Handled = true;
    }

    private static bool IsQuantityEditKey(Windows.System.VirtualKey key) =>
        key is >= Windows.System.VirtualKey.Number0 and <= Windows.System.VirtualKey.Number9 or
        >= Windows.System.VirtualKey.NumberPad0 and <= Windows.System.VirtualKey.NumberPad9 or
        Windows.System.VirtualKey.Back or
        Windows.System.VirtualKey.Delete or
        Windows.System.VirtualKey.Decimal or
        Windows.System.VirtualKey.Subtract;

    private void ConfirmQuantityButton_Click(object sender, RoutedEventArgs e)
    {
        if (sender is Button button &&
            (button.Tag as NumberBox ??
             (button.Parent is StackPanel panel
                 ? panel.Children.OfType<NumberBox>().FirstOrDefault()
                 : null)) is { } numberBox)
        {
            ConfirmQuantityEdit(numberBox);
        }
    }

    private void ConfirmQuantityEdit(NumberBox numberBox)
    {
        var confirmButton = FindConfirmButton(numberBox);
        var statusIndicator = confirmButton is null
            ? null
            : FindManualStatusIndicator(confirmButton);
        if (statusIndicator is not null)
            statusIndicator.Visibility = Visibility.Collapsed;

        var valid = double.TryParse(
            numberBox.Text,
            System.Globalization.NumberStyles.Float |
            System.Globalization.NumberStyles.AllowThousands,
            System.Globalization.CultureInfo.CurrentCulture,
            out _);
        CommitQuantityEdit(numberBox);
        if (valid && numberBox.DataContext is DailyWeldRow row)
        {
            row.IsManuallyAdjusted = true;
            _hasPendingRedistribution = true;
            UpdateStatistics();
        }
        if (statusIndicator is not null)
            statusIndicator.Visibility = Visibility.Collapsed;
        CloseQuantityEditor(numberBox);

        if (!valid)
        {
            CompleteQuantityConfirmation(numberBox, false);
            return;
        }

        DispatcherQueue.TryEnqueue(
            Microsoft.UI.Dispatching.DispatcherQueuePriority.High,
            () => CompleteQuantityConfirmation(numberBox, true));
    }

    private void CloseQuantityEditor(NumberBox numberBox)
    {
        // Toggling the editor closes NumberBox's inner TextBox reliably; simply
        // moving focus can leave the caret active inside that template child.
        numberBox.IsEnabled = false;
        numberBox.IsEnabled = true;
        QuantityEditFocusTarget.Focus(FocusState.Programmatic);
        if (ReferenceEquals(_activeQuantityBox, numberBox))
            _activeQuantityBox = null;
    }

    private void PageRoot_Tapped(
        object sender,
        Microsoft.UI.Xaml.Input.TappedRoutedEventArgs e)
    {
        var originalSource = e.OriginalSource as DependencyObject;
        if (FindAncestor<NumberBox>(originalSource) is not null ||
            FindAncestor<Button>(originalSource) is not null)
            return;

        var quantityBox = _activeQuantityBox;
        if (quantityBox is null) return;

        ConfirmQuantityEdit(quantityBox);
        e.Handled = true;
    }

    private bool CommitQuantityEdit(NumberBox numberBox)
    {
        if (numberBox.DataContext is not DailyWeldRow row) return false;

        if (!double.TryParse(
                numberBox.Text,
                System.Globalization.NumberStyles.Float |
                System.Globalization.NumberStyles.AllowThousands,
                System.Globalization.CultureInfo.CurrentCulture,
                out var parsedValue))
        {
            numberBox.Value = row.Quantity;
            return false;
        }

        var normalized = Math.Max(0, Math.Round(parsedValue));
        var originalValue = _editOriginalValues.TryGetValue(row, out var original)
            ? original
            : row.Quantity;
        var changed = Math.Abs(originalValue - normalized) >= 0.001;

        numberBox.Value = normalized;
        row.Quantity = normalized;
        if (changed)
        {
            row.IsManuallyAdjusted = true;
            _hasPendingRedistribution = true;
        }
        _editOriginalValues[row] = normalized;
        UpdateStatistics();
        return changed;
    }

    private void UpdateConfirmButtonVisibility(NumberBox numberBox)
    {
        var button = FindConfirmButton(numberBox);
        if (button is null || numberBox.DataContext is not DailyWeldRow row) return;

        var originalValue = _editOriginalValues.TryGetValue(row, out var original)
            ? original
            : row.Quantity;
        var hasChangedText = double.TryParse(
            numberBox.Text,
            System.Globalization.NumberStyles.Float |
            System.Globalization.NumberStyles.AllowThousands,
            System.Globalization.CultureInfo.CurrentCulture,
            out var value) &&
            Math.Abs(Math.Max(0, Math.Round(value)) - originalValue) >= 0.001;

        if (FindManualStatusIndicator(button) is { } statusIndicator)
            statusIndicator.Visibility = hasChangedText
                ? Visibility.Collapsed
                : row.IsManuallyAdjusted ? Visibility.Visible : Visibility.Collapsed;
        button.Opacity = 1;
        button.Visibility = hasChangedText ? Visibility.Visible : Visibility.Collapsed;
    }

    private static Button? FindConfirmButton(NumberBox numberBox) =>
        numberBox.Tag as Button ??
        (numberBox.Parent is StackPanel panel
            ? panel.Children.OfType<Grid>()
                .SelectMany(grid => grid.Children.OfType<Button>())
                .FirstOrDefault()
            : null);

    private static Border? FindManualStatusIndicator(Button button) =>
        button.Parent is Grid stateGrid
            ? stateGrid.Children.OfType<Border>().FirstOrDefault()
            : null;

    private static Microsoft.UI.Xaml.Shapes.Path? FindCompletionPath(Border indicator, string tag) =>
        indicator.Child is Grid grid
            ? grid.Children.OfType<Microsoft.UI.Xaml.Shapes.Path>()
                .FirstOrDefault(path => Equals(path.Tag, tag))
            : null;

    private void CompleteQuantityConfirmation(NumberBox numberBox, bool changed)
    {
        var button = FindConfirmButton(numberBox);
        if (button is null) return;
        var statusIndicator = FindManualStatusIndicator(button);
        if (!changed)
        {
            button.Visibility = Visibility.Collapsed;
            if (numberBox.DataContext is DailyWeldRow row && statusIndicator is not null)
                statusIndicator.Visibility = row.IsManuallyAdjusted
                    ? Visibility.Visible
                    : Visibility.Collapsed;
            return;
        }

        var animationToken = new object();
        _confirmationAnimationTokens[button] = animationToken;
        button.Visibility = Visibility.Collapsed;
        button.Opacity = 1;
        var checkPath = statusIndicator is null ? null : FindCompletionPath(statusIndicator, "CompletionCheck");
        var ringPath = statusIndicator is null ? null : FindCompletionPath(statusIndicator, "CompletionRing");
        if (statusIndicator is null || checkPath is null || ringPath is null) return;
        statusIndicator.Visibility = Visibility.Visible;
        statusIndicator.Opacity = 1;
        checkPath.StrokeDashOffset = 18;
        ringPath.StrokeDashOffset = -52;
        var storyboard = new Microsoft.UI.Xaml.Media.Animation.Storyboard();
        var drawCheck = new Microsoft.UI.Xaml.Media.Animation.DoubleAnimation
        {
            From = 18,
            To = 0,
            Duration = TimeSpan.FromMilliseconds(340),
            EnableDependentAnimation = true,
            EasingFunction = new Microsoft.UI.Xaml.Media.Animation.QuadraticEase
            {
                EasingMode = Microsoft.UI.Xaml.Media.Animation.EasingMode.EaseInOut
            }
        };
        var drawRing = new Microsoft.UI.Xaml.Media.Animation.DoubleAnimation
        {
            From = -52,
            To = 0,
            BeginTime = TimeSpan.FromMilliseconds(280),
            Duration = TimeSpan.FromMilliseconds(500),
            EnableDependentAnimation = true,
            EasingFunction = new Microsoft.UI.Xaml.Media.Animation.QuadraticEase
            {
                EasingMode = Microsoft.UI.Xaml.Media.Animation.EasingMode.EaseInOut
            }
        };
        Microsoft.UI.Xaml.Media.Animation.Storyboard.SetTarget(drawCheck, checkPath);
        Microsoft.UI.Xaml.Media.Animation.Storyboard.SetTargetProperty(drawCheck, "StrokeDashOffset");
        Microsoft.UI.Xaml.Media.Animation.Storyboard.SetTarget(drawRing, ringPath);
        Microsoft.UI.Xaml.Media.Animation.Storyboard.SetTargetProperty(drawRing, "StrokeDashOffset");
        storyboard.Children.Add(drawCheck);
        storyboard.Children.Add(drawRing);
        storyboard.Completed += (_, _) =>
        {
            if (!_confirmationAnimationTokens.TryGetValue(button, out var currentToken) ||
                !ReferenceEquals(currentToken, animationToken)) return;
            _confirmationAnimationTokens.Remove(button);
            button.Visibility = Visibility.Collapsed;
            button.Opacity = 1;
            statusIndicator.Visibility = Visibility.Visible;
            statusIndicator.Opacity = 1;
            checkPath.StrokeDashOffset = 0;
            ringPath.StrokeDashOffset = 0;
        };
        storyboard.Begin();
    }

    private static T? FindAncestor<T>(DependencyObject? element)
        where T : DependencyObject
    {
        while (element is not null)
        {
            if (element is T match) return match;
            element = Microsoft.UI.Xaml.Media.VisualTreeHelper.GetParent(element);
        }
        return null;
    }

    private async void RedistributeButton_Click(object sender, RoutedEventArgs e)
    {
        if (Rows.Count == 0)
        {
            await ShowResultDialogAsync("尚未生成数据", "请先生成本月模拟数据。");
            return;
        }
        if (!Rows.Any(row => row.IsManuallyAdjusted))
        {
            await ShowResultDialogAsync("没有待确认的调整", "请先修改一个或多个特殊日期的焊接数量。");
            return;
        }

        var fixedRows = Rows.Where(row => row.IsManuallyAdjusted).ToArray();
        var flexibleRows = Rows.Where(row => !row.IsManuallyAdjusted).ToArray();
        var fixedTotal = fixedRows.Sum(row => (int)Math.Round(row.Quantity));
        if (fixedTotal > PlannedTotal)
        {
            await ShowResultDialogAsync(
                "无法重新分配",
                $"特殊日期合计 {fixedTotal:N0}，已经超过月度计划 {PlannedTotal:N0}。请先调低特殊日期产量。");
            return;
        }

        var remaining = PlannedTotal - fixedTotal;
        if (flexibleRows.Length == 0)
        {
            if (remaining != 0)
                await ShowResultDialogAsync("无法重新分配", "所有日期都已手动调整，但合计与月度计划不一致。");
            return;
        }

        var weights = flexibleRows
            .Select(row => Math.Max(1d, row.Quantity))
            .ToArray();
        var weightTotal = weights.Sum();
        var rawValues = weights
            .Select(weight => weight / weightTotal * remaining)
            .ToArray();
        var values = rawValues.Select(value => (int)Math.Floor(value)).ToArray();
        var unallocated = remaining - values.Sum();
        foreach (var index in rawValues
                     .Select((value, index) => new
                     {
                         Index = index,
                         Fraction = value - Math.Floor(value)
                     })
                     .OrderByDescending(item => item.Fraction)
                     .Take(unallocated)
                     .Select(item => item.Index))
            values[index]++;

        for (var index = 0; index < flexibleRows.Length; index++)
            flexibleRows[index].Quantity = values[index];

        _hasPendingRedistribution = false;
        UpdateStatistics();
        await ShowResultDialogAsync(
            "调整完成",
            $"已固定 {fixedRows.Length} 个手动修改日期，并重新分配其余 {flexibleRows.Length} 天的产量。月度合计保持为 {PlannedTotal:N0}。");
    }

    private async void AutomaticImportButton_Click(object sender, RoutedEventArgs e)
    {
        if (sender is Button button) button.IsEnabled = false;
        ContentDialog? activeProgressDialog = null;
        var request = new NotionImportRequest(
            Rows.Select(row => new NotionDailyWeldValue(
                row.Date,
                (int)Math.Round(row.Quantity))).ToArray());

        try
        {
            var probe = await _notionImportService.HasExistingDataAsync(request);
            if (!probe.Succeeded)
            {
                await ShowResultDialogAsync("自动导入", probe.Message);
                return;
            }

            if (probe.HasExistingData)
            {
                var confirmContent = new StackPanel { Width = 390, Spacing = 8 };
                confirmContent.Children.Add(new TextBlock
                {
                    Text = "目标月份已有产量数据",
                    FontSize = 17,
                    FontWeight = Microsoft.UI.Text.FontWeights.SemiBold
                });
                confirmContent.Children.Add(new TextBlock
                {
                    Text = "继续后才会匹配具体日期，并使用本次模拟结果覆盖已有产量。",
                    TextWrapping = TextWrapping.Wrap,
                    Foreground = (Microsoft.UI.Xaml.Media.Brush)Application.Current.Resources["MutedTextBrush"]
                });

                var confirm = new ContentDialog
                {
                    XamlRoot = XamlRoot,
                    Title = "检测到已有数据",
                    Content = confirmContent,
                    PrimaryButtonText = "确认覆盖",
                    CloseButtonText = "取消",
                    DefaultButton = ContentDialogButton.Close
                };
                if (await confirm.ShowAsync() != ContentDialogResult.Primary) return;
            }

            var stageText = new TextBlock
            {
                Text = "正在匹配整月记录",
                FontSize = 18,
                FontWeight = Microsoft.UI.Text.FontWeights.SemiBold
            };
            var progressText = new TextBlock
            {
                Text = "一次性读取日期和产量，请稍候…",
                TextWrapping = TextWrapping.Wrap,
                Foreground = (Microsoft.UI.Xaml.Media.Brush)Application.Current.Resources["MutedTextBrush"]
            };
            var progressBar = new ProgressBar
            {
                Minimum = 0,
                Maximum = Math.Max(1, request.Values.Count),
                IsIndeterminate = true,
                Width = 410
            };
            var countText = new TextBlock
            {
                HorizontalAlignment = HorizontalAlignment.Right,
                FontSize = 12,
                Foreground = (Microsoft.UI.Xaml.Media.Brush)Application.Current.Resources["MutedTextBrush"],
                Text = "准备中"
            };
            var progressContent = new StackPanel { Width = 410, Spacing = 12 };
            progressContent.Children.Add(stageText);
            progressContent.Children.Add(progressText);
            progressContent.Children.Add(progressBar);
            progressContent.Children.Add(countText);
            var progressDialog = new ContentDialog
            {
                XamlRoot = XamlRoot,
                Title = "自动导入",
                Content = progressContent
            };
            activeProgressDialog = progressDialog;
            var progressOperation = progressDialog.ShowAsync();
            await Task.Delay(80);

            var plan = await _notionImportService.PrepareImportAsync(request);
            if (!plan.Succeeded)
            {
                progressDialog.Hide();
                await progressOperation;
                activeProgressDialog = null;
                await ShowResultDialogAsync("自动导入", plan.Message);
                return;
            }

            stageText.Text = "正在填写 Notion 数据";
            progressBar.IsIndeterminate = false;
            progressBar.Value = 0;
            var progress = new Progress<NotionImportProgress>(state =>
            {
                progressBar.Value = state.Current;
                var percent = state.Total == 0 ? 0 : state.Current * 100 / state.Total;
                if (state.Date == DateTime.MinValue)
                {
                    progressText.Text = "所有可写入记录均已处理。";
                }
                else
                {
                    var item = plan.Items.FirstOrDefault(value => value.Date == state.Date);
                    progressText.Text = item?.ExistingQuantity is double oldValue
                        ? $"{state.Date:yyyy-MM-dd}    {oldValue:0.##} → {item.NewQuantity}"
                        : $"{state.Date:yyyy-MM-dd}    写入 {item?.NewQuantity}";
                }
                countText.Text = $"{state.Current} / {state.Total}    {percent}%";
            });
            var result = await _notionImportService.ImportWeldHierarchyAsync(
                request,
                progress);
            progressDialog.Hide();
            await progressOperation;
            activeProgressDialog = null;
            await ShowResultDialogAsync(result.Succeeded ? "导入完成" : "自动导入", result.Message);
        }
        catch (Exception ex)
        {
            activeProgressDialog?.Hide();
            await Task.Delay(80);
            await ShowResultDialogAsync("自动导入失败", ex.Message);
        }
        finally
        {
            UpdateActionButtons();
        }
    }

#if DEBUG
    private void AddDebugTools()
    {
        _debugSingleImportButton = new Button
        {
            Height = 40,
            HorizontalAlignment = HorizontalAlignment.Stretch,
            HorizontalContentAlignment = HorizontalAlignment.Center,
            Content = "Debug：导入 2027-08 随机样本"
        };
        _debugSingleImportButton.Click += DebugSingleImportButton_Click;

        _debugSchemaButton = new Button
        {
            Height = 40,
            HorizontalAlignment = HorizontalAlignment.Stretch,
            HorizontalContentAlignment = HorizontalAlignment.Center,
            Content = "Debug：只读检查三库结构"
        };
        _debugSchemaButton.Click += DebugSchemaButton_Click;

        DebugToolsPanel.Children.Add(_debugSingleImportButton);
        DebugToolsPanel.Children.Add(_debugSchemaButton);
    }

    private async void DebugSingleImportButton_Click(object sender, RoutedEventArgs e)
{
        _debugSingleImportButton.IsEnabled = false;
        try
        {
            var result = await _notionImportService.ImportWeldHierarchyAsync(
                new NotionImportRequest([
                    new NotionDailyWeldValue(new DateTime(2027, 8, 3), 37),
                    new NotionDailyWeldValue(new DateTime(2027, 8, 12), 64),
                    new NotionDailyWeldValue(new DateTime(2027, 8, 21), 48),
                    new NotionDailyWeldValue(new DateTime(2027, 8, 27), 72)
                ]));
            await ShowResultDialogAsync(
                result.Succeeded ? "Debug 导入完成" : "Debug 导入失败",
                result.Message);
        }
        catch (Exception ex)
        {
            await ShowResultDialogAsync("Debug 导入失败", ex.Message);
        }
        finally
        {
            _debugSingleImportButton.IsEnabled = true;
        }
    }

    private async void DebugSchemaButton_Click(object sender, RoutedEventArgs e)
{
        _debugSchemaButton.IsEnabled = false;
        try
        {
            var settings = NotionSettingsStore.Load();
            var sources = new[]
            {
                settings.CachedDataSources.FirstOrDefault(source => source.Name == "每月焊接量"),
                settings.CachedDataSources.FirstOrDefault(source => source.Name == "每日焊接量"),
                settings.CachedDataSources.FirstOrDefault(source => source.Name == "上周焊接量")
            };
            if (sources.Any(source => source is null))
            {
                await ShowResultDialogAsync("Debug 结构检查", "缓存中缺少月、日或周焊接数据源。");
                return;
            }

            var lines = new List<string>();
            foreach (var source in sources.OfType<NotionDataSourceOption>())
            {
                var schema = await _notionImportService.GetSchemaAsync(settings.Token, source.Id);
                lines.Add($"【{source.Name}】{(schema.Succeeded ? string.Empty : schema.Message)}");
                lines.AddRange(schema.Properties.Select(property =>
                    $"{property.Name} : {property.Type}" +
                    (string.IsNullOrWhiteSpace(property.RelationDataSourceId)
                        ? string.Empty
                        : $" → {property.RelationDataSourceId}")));
            }
            await ShowResultDialogAsync("Debug 三库结构", string.Join("\n", lines));
        }
        catch (Exception ex)
        {
            await ShowResultDialogAsync("Debug 结构检查失败", ex.Message);
        }
        finally
        {
            _debugSchemaButton.IsEnabled = true;
        }
    }
#endif

    private void UpdateActionButtons()
    {
        if (RedistributeButton is null || AutomaticImportButton is null) return;

        var hasRows = Rows.Count > 0;
        var actual = Rows.Sum(row => (int)Math.Round(row.Quantity));
        var totalsMatch = hasRows && actual == PlannedTotal;
        RedistributeButton.IsEnabled = hasRows && _hasPendingRedistribution;
        SetActionButtonColor(
            RedistributeButton,
            RedistributeButton.IsEnabled ? "SystemFillColorCriticalBrush" : null,
            useDarkText: false);

        AutomaticImportButton.IsEnabled =
            totalsMatch && !_hasPendingRedistribution && _hasNotionBinding;
        SetActionButtonColor(
            AutomaticImportButton,
            AutomaticImportButton.IsEnabled ? "SystemFillColorSuccessBrush" : null,
            useDarkText: false);
    }

    private static void SetActionButtonColor(
        Button button,
        string? backgroundResourceKey,
        bool useDarkText)
    {
        if (backgroundResourceKey is null)
        {
            var disabled = new Microsoft.UI.Xaml.Media.SolidColorBrush(
                Microsoft.UI.ColorHelper.FromArgb(255, 208, 208, 208));
            SetButtonStateBrushes(button, disabled);
            button.Background = disabled;
            button.BorderBrush = disabled;
            button.Foreground = (Microsoft.UI.Xaml.Media.Brush)
                Application.Current.Resources["TextFillColorDisabledBrush"];
            SetButtonStateForegrounds(button, button.Foreground);
            return;
        }

        var background = (Microsoft.UI.Xaml.Media.Brush)
            Application.Current.Resources[backgroundResourceKey];
        button.Background = background;
        button.BorderBrush = background;
        SetButtonStateBrushes(button, background);
        button.Foreground = useDarkText
            ? (Microsoft.UI.Xaml.Media.Brush)Application.Current.Resources["TextFillColorPrimaryBrush"]
            : new Microsoft.UI.Xaml.Media.SolidColorBrush(Microsoft.UI.Colors.White);
        SetButtonStateForegrounds(button, button.Foreground);
    }

    private static void SetButtonStateBrushes(
        Button button, Microsoft.UI.Xaml.Media.Brush brush)
    {
        button.Resources["ButtonBackgroundPointerOver"] = brush;
        button.Resources["ButtonBackgroundPressed"] = brush;
        button.Resources["ButtonBackgroundDisabled"] = brush;
        button.Resources["ButtonBorderBrushPointerOver"] = brush;
        button.Resources["ButtonBorderBrushPressed"] = brush;
        button.Resources["ButtonBorderBrushDisabled"] = brush;
    }

    private static void SetButtonStateForegrounds(
        Button button, Microsoft.UI.Xaml.Media.Brush brush)
    {
        button.Resources["ButtonForegroundPointerOver"] = brush;
        button.Resources["ButtonForegroundPressed"] = brush;
        button.Resources["ButtonForegroundDisabled"] = brush;
    }

    private void RefreshNotionBinding()
    {
        var settings = NotionSettingsStore.Load();
        _hasNotionBinding = false;
        if (string.IsNullOrWhiteSpace(settings.Token))
        {
            NotionBindingInfoBar.Title = "数据库";
            NotionBindingInfoBar.Message = "未连接";
            BindNotionButton.Content = "去绑定";
            SetNotionDisconnectedState();
            return;
        }
        var binding = settings.Targets.FirstOrDefault(target =>
            target.ModuleKey == "daily-weld-simulation");
        if (binding is null)
        {
            NotionBindingInfoBar.Title = "数据库";
            NotionBindingInfoBar.Message = "未绑定";
            BindNotionButton.Content = "绑定";
            SetNotionDisconnectedState();
            return;
        }

        if (!string.IsNullOrWhiteSpace(binding.DateProperty) &&
            !string.IsNullOrWhiteSpace(binding.QuantityProperty))
        {
            _hasNotionBinding = true;
            NotionBindingInfoBar.Title = binding.Name;
            NotionBindingInfoBar.Message = "已绑定";
            NotionBindingInfoBar.Severity = InfoBarSeverity.Success;
            BindNotionButton.Content = "刷新";
            BindNotionButton.Visibility = Visibility.Visible;
        }
        else
        {
            NotionBindingInfoBar.Title = "数据库";
            NotionBindingInfoBar.Message = "连接异常";
            BindNotionButton.Content = "重新绑定";
            SetNotionDisconnectedState();
        }
        UpdateActionButtons();
    }

    private void SetNotionDisconnectedState()
    {
        _hasNotionBinding = false;
        NotionBindingInfoBar.Severity = InfoBarSeverity.Informational;
        BindNotionButton.Visibility = Visibility.Visible;
        UpdateActionButtons();
    }

    private async Task VerifyNotionConnectionAsync()
    {
        var settings = NotionSettingsStore.Load();
        var binding = settings.Targets.FirstOrDefault(target =>
            target.ModuleKey == "daily-weld-simulation");
        if (string.IsNullOrWhiteSpace(settings.Token) || binding is null ||
            string.IsNullOrWhiteSpace(binding.Id))
            return;

        BindNotionButton.IsEnabled = false;
        BindNotionButton.Content = "检查中";
        NotionBindingInfoBar.Title = binding.Name;
        NotionBindingInfoBar.Message = "正在检查连接";
        NotionBindingInfoBar.Severity = InfoBarSeverity.Informational;

        try
        {
            var schema = await _notionImportService.GetSchemaAsync(
                settings.Token,
                binding.Id);
            if (!schema.Succeeded)
            {
                NotionBindingInfoBar.Message = "连接失败";
                NotionBindingInfoBar.Severity = InfoBarSeverity.Error;
                return;
            }

            var hasDate = schema.Properties.Any(property =>
                property.Type == "date" &&
                property.Name == binding.DateProperty);
            var hasQuantity = schema.Properties.Any(property =>
                property.Type == "number" &&
                property.Name == binding.QuantityProperty);
            if (!hasDate || !hasQuantity)
            {
                NotionBindingInfoBar.Message = "字段已变更";
                NotionBindingInfoBar.Severity = InfoBarSeverity.Warning;
                return;
            }

            NotionBindingInfoBar.Message = "连接正常";
            NotionBindingInfoBar.Severity = InfoBarSeverity.Success;
        }
        catch
        {
            NotionBindingInfoBar.Message = "连接失败";
            NotionBindingInfoBar.Severity = InfoBarSeverity.Error;
        }
        finally
        {
            BindNotionButton.Content = "刷新";
            BindNotionButton.IsEnabled = true;
        }
    }

    private async void BindNotionButton_Click(object sender, RoutedEventArgs e)
    {
        BindNotionButton.IsEnabled = false;
        try
        {
            var settings = NotionSettingsStore.Load();
            var existingBinding = settings.Targets.FirstOrDefault(target =>
                target.ModuleKey == "daily-weld-simulation");
            if (!string.IsNullOrWhiteSpace(settings.Token) &&
                existingBinding is not null &&
                !string.IsNullOrWhiteSpace(existingBinding.Id))
            {
                await VerifyNotionConnectionAsync();
                return;
            }
            if (string.IsNullOrWhiteSpace(settings.Token))
            {
                await ShowResultDialogAsync(
                    "需要配置 Notion",
                    "请先到“设置 → Notion 连接”填写 API 令牌并获取数据源。");
                return;
            }

            IReadOnlyList<NotionDataSourceOption> availableSources = settings.CachedDataSources;
            if (availableSources.Count == 0)
            {
                await ShowResultDialogAsync(
                    "尚未获取数据源",
                    "请先到“设置 → Notion 连接”保存连接。设置会自动获取并缓存数据源，业务模块不会重复获取。");
                return;
            }

            var sourceBox = new ComboBox
            {
                ItemsSource = availableSources,
                DisplayMemberPath = "Path",
                HorizontalAlignment = HorizontalAlignment.Stretch
            };
            sourceBox.SelectedItem = availableSources.FirstOrDefault(source =>
                source.Name.Contains("每日焊接量")) ?? availableSources[0];
            var content = new StackPanel { Width = 520, Spacing = 8 };
            content.Children.Add(new TextBlock
            {
                Text = "选择每日焊接数据模拟要写入的数据源。",
                TextWrapping = TextWrapping.Wrap
            });
            content.Children.Add(sourceBox);
            var picker = new ContentDialog
            {
                XamlRoot = XamlRoot,
                Title = "绑定 Notion 数据源",
                Content = content,
                PrimaryButtonText = "检测并绑定",
                CloseButtonText = "取消"
            };
            if (await picker.ShowAsync() != ContentDialogResult.Primary ||
                sourceBox.SelectedItem is not NotionDataSourceOption source)
                return;

            NotionBindingInfoBar.Title = source.Name;
            NotionBindingInfoBar.Message = "正在连接";
            var schema = await _notionImportService.GetSchemaAsync(
                settings.Token,
                source.Id);
            if (!schema.Succeeded)
            {
                await ShowResultDialogAsync("字段检测失败", schema.Message);
                return;
            }

            var title = schema.Properties.FirstOrDefault(property => property.Type == "title");
            var date = schema.Properties.FirstOrDefault(property =>
                           property.Type == "date" && property.Name.Contains("日期"))
                       ?? schema.Properties.FirstOrDefault(property => property.Type == "date");
            var quantity = schema.Properties.FirstOrDefault(property =>
                               property.Type == "number" &&
                               (property.Name.Contains("每日数据") || property.Name.Contains("产量")))
                           ?? schema.Properties.FirstOrDefault(property => property.Type == "number");
            if (title is null || date is null || quantity is null)
            {
                await ShowResultDialogAsync(
                    "数据源不兼容",
                    "需要同时存在标题、日期和数字字段，当前数据源无法自动绑定。");
                return;
            }

            foreach (var previous in settings.Targets.Where(target =>
                         target.ModuleKey == "daily-weld-simulation" && target.Id != source.Id))
            {
                previous.ModuleKey = string.Empty;
                previous.ModuleName = string.Empty;
            }
            var binding = settings.Targets.FirstOrDefault(target => target.Id == source.Id);
            if (binding is null)
            {
                binding = new NotionTargetSettings { Id = source.Id };
                settings.Targets.Add(binding);
            }
            binding.ModuleKey = "daily-weld-simulation";
            binding.ModuleName = "每日焊接数据模拟";
            binding.Name = source.Name;
            binding.Path = source.Path;
            binding.TitleProperty = title.Name;
            binding.DateProperty = date.Name;
            binding.QuantityProperty = quantity.Name;
            settings.ActiveTargetId = binding.Id;
            NotionSettingsStore.Save(settings);
            RefreshNotionBinding();
            await VerifyNotionConnectionAsync();
            await ShowResultDialogAsync(
                "绑定成功",
                $"每日焊接数据模拟 → {source.Path}\n日期：{date.Name}\n产量：{quantity.Name}");
        }
        finally
        {
            BindNotionButton.IsEnabled = true;
        }
    }

    private async Task ShowResultDialogAsync(string title, string message) =>
        await new ContentDialog
        {
            XamlRoot = XamlRoot,
            Title = title,
            Content = message,
            CloseButtonText = "确定"
        }.ShowAsync();

}
