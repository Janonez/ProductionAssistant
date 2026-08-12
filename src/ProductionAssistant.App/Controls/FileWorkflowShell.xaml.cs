using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using ProductionAssistant.Models;

namespace ProductionAssistant.Controls;

public sealed partial class FileWorkflowShell : UserControl
{
    private FileWorkflowCapabilities _capabilities;
    private bool _busy;
    private bool _canRepair;
    private bool _canExecute;
    private bool _hasOutput;

    public event RoutedEventHandler? BrowseRequested;
    public event RoutedEventHandler? InspectRequested;
    public event RoutedEventHandler? RepairRequested;
    public event RoutedEventHandler? ExecuteRequested;
    public event RoutedEventHandler? OpenOutputRequested;
    public event TextChangedEventHandler? InputChanged;

    public FileWorkflowShell() => InitializeComponent();

    public string InputPath
    {
        get => InputPathBox.Text;
        set => InputPathBox.Text = value;
    }

    public TextBox InputBox => InputPathBox;
    public Button InspectAction => InspectButton;
    public Button RepairAction => RepairButton;
    public Button ExecuteAction => ExecuteButton;
    public Button OutputAction => OpenOutputButton;
    public ProgressBar ProgressBar => OperationProgress;
    public TextBlock ProgressLabel => ProgressText;
    public InfoBar StatusBar => OperationInfoBar;

    public object? Details
    {
        get => DetailsPresenter.Content;
        set => DetailsPresenter.Content = value;
    }

    public void Configure(
        string title,
        string description,
        string inputLabel,
        string inputPlaceholder,
        string browseLabel,
        string executeLabel,
        bool isInputReadOnly,
        FileWorkflowCapabilities capabilities)
    {
        TitleText.Text = title;
        DescriptionText.Text = description;
        InputLabelText.Text = inputLabel;
        InputPathBox.PlaceholderText = inputPlaceholder;
        BrowseButton.Content = browseLabel;
        ExecuteButton.Content = executeLabel;
        InputPathBox.IsReadOnly = isInputReadOnly;
        _capabilities = capabilities;
        InspectButton.Visibility = capabilities.HasFlag(FileWorkflowCapabilities.Inspect) ? Visibility.Visible : Visibility.Collapsed;
        RepairButton.Visibility = capabilities.HasFlag(FileWorkflowCapabilities.Repair) ? Visibility.Visible : Visibility.Collapsed;
        OpenOutputButton.Visibility = capabilities.HasFlag(FileWorkflowCapabilities.OpenOutput) ? Visibility.Visible : Visibility.Collapsed;
        OperationProgress.Visibility = capabilities.HasFlag(FileWorkflowCapabilities.Progress) ? Visibility.Visible : Visibility.Collapsed;
        ProgressText.Visibility = OperationProgress.Visibility;
        TransitionTo(WorkflowOperationState.WaitingForInput, "等待选择", "请选择输入后继续。", InfoBarSeverity.Informational);
    }

    public void SetActionAvailability(bool canRepair, bool canExecute, bool hasOutput = false)
    {
        _canRepair = canRepair;
        _canExecute = canExecute;
        _hasOutput = hasOutput;
        UpdateButtons();
    }

    public void SetBusy(bool busy)
    {
        _busy = busy;
        UpdateButtons();
    }

    public void TransitionTo(
        WorkflowOperationState state,
        string title,
        string message,
        InfoBarSeverity severity)
    {
        OperationInfoBar.Title = title;
        OperationInfoBar.Message = message;
        OperationInfoBar.Severity = severity;
        SetBusy(state is WorkflowOperationState.Inspecting or WorkflowOperationState.Repairing or WorkflowOperationState.Executing);
    }

    public void SetProgress(double value, double maximum, string text)
    {
        OperationProgress.Maximum = maximum;
        OperationProgress.Value = value;
        ProgressText.Text = text;
    }

    private void UpdateButtons()
    {
        var hasInput = !string.IsNullOrWhiteSpace(InputPath);
        BrowseButton.IsEnabled = !_busy;
        InputPathBox.IsEnabled = !_busy;
        InspectButton.IsEnabled = !_busy && hasInput;
        RepairButton.IsEnabled = !_busy && _canRepair;
        ExecuteButton.IsEnabled = !_busy && hasInput && _canExecute;
        OpenOutputButton.IsEnabled = !_busy && _hasOutput;
    }

    private void BrowseButton_Click(object sender, RoutedEventArgs e) => BrowseRequested?.Invoke(this, e);
    private void InspectButton_Click(object sender, RoutedEventArgs e) => InspectRequested?.Invoke(this, e);
    private void RepairButton_Click(object sender, RoutedEventArgs e) => RepairRequested?.Invoke(this, e);
    private void ExecuteButton_Click(object sender, RoutedEventArgs e) => ExecuteRequested?.Invoke(this, e);
    private void OpenOutputButton_Click(object sender, RoutedEventArgs e) => OpenOutputRequested?.Invoke(this, e);
    private void InputPathBox_TextChanged(object sender, TextChangedEventArgs e)
    {
        UpdateButtons();
        InputChanged?.Invoke(this, e);
    }
}
