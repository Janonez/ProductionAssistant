namespace ProductionAssistant;

public interface IBridgeHost
{
    void Post(string json);
    nint GetWindowHandle();
    void Mark(string stage);
    string? AppVersion { get; }
}
