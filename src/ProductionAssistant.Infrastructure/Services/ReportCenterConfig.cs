using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public sealed class ReportCenterConfig
{
    public const string DefaultReportUrl = "https://fr.tz.com.cn:8443/webroot/decision";
    public string Name { get; set; } = "机加工实开台时汇总";
    public string ReportUrl { get; set; } = string.Empty;
    public List<string> ReportPath { get; set; } = [];
    public string SourceRoot { get; set; } = @"D:\zhang\工作\制造部\01.机加工日报";
    public string OutputRoot { get; set; } = @"D:\zhang\工作\制造部\01.机加工日报";
    public string RawFolder { get; set; } = "原始日报";
    public string SummaryFolder { get; set; } = "汇总";
    public int HeaderSearchRows { get; set; } = 10;
    public string DeviceColumn { get; set; } = "设备名称";
    public string ValueColumn { get; set; } = "实开台时";
    public bool Headless { get; set; } = true;
    public int RetryCount { get; set; } = 3;
    public int QueryTimeoutSeconds { get; set; } = 30;
    public int DownloadTimeoutSeconds { get; set; } = 30;
    public List<ReportDeviceDefinition> Devices { get; set; } = [];
}

public static class ReportCenterConfigStore
{
    private const string FileName = "report-center.yaml";

    public static string DataDirectory => RuntimeEnvironment.DataDirectory;
    public static string ConfigPath => Path.Combine(DataDirectory, FileName);
    public static string AuthStatePath => Path.Combine(DataDirectory, "runtime", "auth", "finereport-state.json");
    public static string LogPath => Path.Combine(DataDirectory, "report-center-runs.jsonl");

    public static ReportCenterConfig Load()
    {
        Directory.CreateDirectory(DataDirectory);
        if (!File.Exists(ConfigPath)) File.WriteAllText(ConfigPath, DefaultYaml());
        var config = Parse(File.ReadAllLines(ConfigPath));
        config.Headless = true;
        Validate(config);
        return config;
    }

    public static void Save(ReportCenterConfig config)
    {
        Validate(config);
        Directory.CreateDirectory(DataDirectory);
        var lines = new List<string>
        {
            $"name: {Quote(config.Name)}",
            $"report_url: {Quote(config.ReportUrl)}",
            "report_path:"
        };
        lines.AddRange(config.ReportPath.Select(item => $"  - {Quote(item)}"));
        lines.AddRange([
            $"source_root: {Quote(config.SourceRoot)}",
            $"output_root: {Quote(config.OutputRoot)}",
            $"raw_folder: {Quote(config.RawFolder)}",
            $"summary_folder: {Quote(config.SummaryFolder)}",
            $"header_search_rows: {config.HeaderSearchRows}",
            $"device_column: {Quote(config.DeviceColumn)}",
            $"value_column: {Quote(config.ValueColumn)}",
            $"headless: {config.Headless.ToString().ToLowerInvariant()}",
            $"retry_count: {config.RetryCount}",
            $"query_timeout_seconds: {config.QueryTimeoutSeconds}",
            $"download_timeout_seconds: {config.DownloadTimeoutSeconds}",
            "devices:"
        ]);
        lines.AddRange(config.Devices.Select(device => $"  - {{ name: {Quote(device.Name)}, code: {Quote(device.Code)} }}"));
        File.WriteAllLines(ConfigPath, lines);
    }

    private static ReportCenterConfig Parse(IEnumerable<string> lines)
    {
        var config = new ReportCenterConfig();
        var path = new List<string>();
        var devices = new List<ReportDeviceDefinition>();
        string section = string.Empty;
        foreach (var source in lines)
        {
            var line = source.Trim();
            if (line.Length == 0 || line.StartsWith('#')) continue;
            if (!source.StartsWith(' ') && line.EndsWith(':')) { section = line[..^1]; continue; }
            if (section == "report_path" && line.StartsWith("- ")) { path.Add(Unquote(line[2..])); continue; }
            if (section == "devices" && line.StartsWith("- {"))
            {
                var fields = line.TrimStart('-', ' ', '{').TrimEnd('}').Split(',')
                    .Select(part => part.Split(':', 2)).ToDictionary(pair => pair[0].Trim(), pair => Unquote(pair[1].Trim()));
                devices.Add(new(fields["name"], fields["code"]));
                continue;
            }
            if (source.StartsWith(' ')) continue;
            section = string.Empty;
            var pair = line.Split(':', 2);
            if (pair.Length != 2) continue;
            var value = Unquote(pair[1].Trim());
            switch (pair[0])
            {
                case "name": config.Name = value; break;
                case "login_url": config.ReportUrl = ReportCenterConfig.DefaultReportUrl; break;
                case "report_url": config.ReportUrl = value; break;
                case "storage_root": config.SourceRoot = config.OutputRoot = value; break;
                case "source_root": config.SourceRoot = value; break;
                case "output_root": config.OutputRoot = value; break;
                case "raw_folder": config.RawFolder = value; break;
                case "summary_folder": config.SummaryFolder = value; break;
                case "header_search_rows": config.HeaderSearchRows = int.Parse(value); break;
                case "device_column": config.DeviceColumn = value; break;
                case "value_column": config.ValueColumn = value; break;
                case "headless": config.Headless = bool.Parse(value); break;
                case "retry_count": config.RetryCount = int.Parse(value); break;
                case "query_timeout_seconds": config.QueryTimeoutSeconds = int.Parse(value); break;
                case "download_timeout_seconds": config.DownloadTimeoutSeconds = int.Parse(value); break;
            }
        }
        config.ReportPath = path;
        config.Devices = devices;
        return config;
    }

    private static string Unquote(string value) => value.Trim().Trim('"', '\'');
    private static string Quote(string value) => $"\"{value.Replace("\"", "\\\"")}\"";

    private static void Validate(ReportCenterConfig? config)
    {
        if (config is null || string.IsNullOrWhiteSpace(config.ReportUrl) || config.ReportPath.Count < 3 ||
            string.IsNullOrWhiteSpace(config.SourceRoot) || string.IsNullOrWhiteSpace(config.OutputRoot) || config.Devices.Count == 0)
            throw new InvalidOperationException("报表中心配置缺少登录地址、报表路径、存储目录或设备定义。");
        if (config.Devices.Select(device => device.Name).Distinct(StringComparer.Ordinal).Count() != config.Devices.Count)
            throw new InvalidOperationException("报表中心配置包含重复设备名称。");
    }

    private static string DefaultYaml()
    {
        if (!RuntimeEnvironment.Current.IsDevelopment) return ProductionDefaultYaml;
        return ProductionDefaultYaml
            .Replace(@"source_root: D:\zhang\工作\制造部\01.机加工日报",
                $"source_root: {Path.Combine(DataDirectory, "report-center", "source")}", StringComparison.Ordinal)
            .Replace(@"output_root: D:\zhang\工作\制造部\01.机加工日报",
                $"output_root: {Path.Combine(DataDirectory, "report-center", "output")}", StringComparison.Ordinal);
    }

    private const string ProductionDefaultYaml = """
name: 机加工实开台时汇总
report_url: https://fr.tz.com.cn:8443/webroot/decision
report_path:
  - 制造部日报管理
  - 滨海公司
  - 加工
source_root: D:\zhang\工作\制造部\01.机加工日报
output_root: D:\zhang\工作\制造部\01.机加工日报
raw_folder: 原始日报
summary_folder: 汇总
header_search_rows: 10
device_column: 设备名称
value_column: 实开台时
headless: true
retry_count: 3
query_timeout_seconds: 30
download_timeout_seconds: 30
devices:
  - { name: PAMA西, code: 026-BH001A }
  - { name: PAMA东, code: 026-BH001B }
  - { name: 立车, code: 015-BH002 }
  - { name: 天桥铣, code: 006-BH002 }
  - { name: 车磨, code: 016-BH001 }
  - { name: 4*12米, code: 006-BH001 }
  - { name: 武重东, code: 026-BH002B }
  - { name: 车镗, code: 016-BH002 }
  - { name: 武重西, code: 026-BH002A }
""";
}

public sealed record ReportCenterCredentials(string Username, string Password);

public static class ReportCenterCredentialsStore
{
    private static string PathName => Path.Combine(ReportCenterConfigStore.DataDirectory, "report-center-credentials.json");

    public static bool IsConfigured()
    {
        var credentials = Load();
        return !string.IsNullOrWhiteSpace(credentials.Username) && !string.IsNullOrWhiteSpace(credentials.Password);
    }

    public static ReportCenterCredentials Load()
    {
        if (!File.Exists(PathName)) return new(string.Empty, string.Empty);
        try
        {
            var protectedValues = System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, string>>(File.ReadAllText(PathName)) ?? [];
            return new(
                protectedValues.TryGetValue("username", out var username) ? WindowsTokenProtector.Unprotect(username) : string.Empty,
                protectedValues.TryGetValue("password", out var password) ? WindowsTokenProtector.Unprotect(password) : string.Empty);
        }
        catch { return new(string.Empty, string.Empty); }
    }

    public static void Save(string username, string password)
    {
        if (string.IsNullOrWhiteSpace(username)) throw new InvalidOperationException("请输入报表账号。");
        var current = Load();
        var effectivePassword = string.IsNullOrEmpty(password) ? current.Password : password;
        if (string.IsNullOrEmpty(effectivePassword)) throw new InvalidOperationException("请输入报表密码。");
        Directory.CreateDirectory(ReportCenterConfigStore.DataDirectory);
        File.WriteAllText(PathName, System.Text.Json.JsonSerializer.Serialize(new Dictionary<string, string>
        {
            ["username"] = WindowsTokenProtector.Protect(username.Trim()),
            ["password"] = WindowsTokenProtector.Protect(effectivePassword)
        }));
    }
}
