using System.Globalization;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using ProductionAssistant.Models;

namespace ProductionAssistant.Services;

public sealed class Internal93Options
{
    public string BaseUrl { get; init; } = string.Empty;
    public string SourcePageUrl { get; init; } = string.Empty;
    public string Username { get; init; } = string.Empty;
    public string Password { get; init; } = string.Empty;
}

public sealed class Internal93MaterialInboundClient : IDisposable
{
    private const string LoginPath = "/logindata.php";
    private readonly Internal93Options _options;
    private readonly string _materialPagePath;
    private readonly string _materialDataPath;
    private readonly CookieContainer _cookies = new();
    private readonly HttpClient _httpClient;
    private readonly SemaphoreSlim _loginLock = new(1, 1);
    private bool _authenticated;
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };

    public Internal93MaterialInboundClient(Internal93Options options)
        : this(options, null)
    {
    }

    public Internal93MaterialInboundClient(Internal93Options options, HttpMessageHandler? handler)
    {
        _options = options ?? throw new ArgumentNullException(nameof(options));
        if (string.IsNullOrWhiteSpace(options.BaseUrl))
            throw new ArgumentException("93系统地址不能为空。", nameof(options));
        if (!Uri.TryCreate(options.SourcePageUrl, UriKind.Absolute, out var sourcePage))
            throw new ArgumentException("93系统业务页面地址无效。", nameof(options));
        _materialPagePath = sourcePage.PathAndQuery;
        _materialDataPath = DataPath(sourcePage.AbsolutePath);
        handler ??= new HttpClientHandler
        {
            CookieContainer = _cookies,
            UseCookies = true,
            AllowAutoRedirect = true,
            UseProxy = false
        };
        _httpClient = new HttpClient(handler)
        {
            BaseAddress = new Uri(options.BaseUrl.TrimEnd('/')),
            Timeout = TimeSpan.FromSeconds(30)
        };
    }

    public async Task<DailyMaterialInboundSummary> GetDailySummaryAsync(
        DateOnly date,
        CancellationToken cancellationToken = default)
    {
        await EnsureLoggedInAsync(cancellationToken);
        var responseText = await QueryMaterialInboundAsync(date, cancellationToken);
        if (IsUnauthorized(responseText))
        {
            _authenticated = false;
            await EnsureLoggedInAsync(cancellationToken);
            responseText = await QueryMaterialInboundAsync(date, cancellationToken);
            if (IsUnauthorized(responseText))
                throw new InvalidOperationException("93系统认证失败，重新登录后仍无权访问入库数据。");
        }

        var response = JsonSerializer.Deserialize<MaterialInboundResponse>(responseText, JsonOptions)
            ?? throw new InvalidOperationException("93系统入库数据解析失败。");
        if (response.Code != 0)
            throw new InvalidOperationException($"93系统入库接口返回异常：{response.Message}");

        decimal plateWeight = 0;
        decimal sectionWeight = 0;
        foreach (var record in response.Data)
        {
            if (!decimal.TryParse(record.InWeight, NumberStyles.Number,
                    CultureInfo.InvariantCulture, out var weight))
                continue;
            if (string.Equals(record.Type.Trim(), "钢板", StringComparison.Ordinal))
                plateWeight += weight;
            else
                sectionWeight += weight;
        }
        return new(date, plateWeight, sectionWeight);
    }

    private async Task EnsureLoggedInAsync(CancellationToken cancellationToken)
    {
        if (_authenticated) return;
        await _loginLock.WaitAsync(cancellationToken);
        try
        {
            if (_authenticated) return;
            await LoginAsync(cancellationToken);
            _authenticated = true;
        }
        finally
        {
            _loginLock.Release();
        }
    }

    private async Task LoginAsync(CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(_options.Username))
            throw new InvalidOperationException("93系统用户名未配置。");
        if (string.IsNullOrWhiteSpace(_options.Password))
            throw new InvalidOperationException("93系统密码未配置。");

        using var content = new FormUrlEncodedContent(new Dictionary<string, string>
        {
            ["username"] = _options.Username,
            ["password"] = CalculateMd5(_options.Password),
            ["last_url"] = _materialPagePath,
            ["client_ip"] = "IP_UNKNOWN"
        });
        using var response = await _httpClient.PostAsync(LoginPath, content, cancellationToken);
        response.EnsureSuccessStatusCode();
        var text = await response.Content.ReadAsStringAsync(cancellationToken);
        var login = JsonSerializer.Deserialize<Internal93LoginResponse>(text, JsonOptions)
            ?? throw new InvalidOperationException("93系统登录响应解析失败。");
        if (!string.Equals(login.State, "success", StringComparison.OrdinalIgnoreCase))
            throw new InvalidOperationException(GetLoginErrorMessage(login.State));
        if (!string.Equals(login.LastUrlState, "authorized", StringComparison.OrdinalIgnoreCase))
            throw new InvalidOperationException("当前93系统账号没有材料入库页面访问权限。");
        SetAuthenticationCookies(login);
    }

    private void SetAuthenticationCookies(Internal93LoginResponse login)
    {
        var uri = _httpClient.BaseAddress
            ?? throw new InvalidOperationException("93系统BaseAddress未配置。");
        AddCookie(uri, "user_type", login.UserType.ToString(CultureInfo.InvariantCulture));
        AddCookie(uri, "supplier_inf", "undefined");
        AddCookie(uri, "login_id", login.LoginId);
        AddCookie(uri, "login_username", login.LoginUsername);
        AddCookie(uri, "code", login.Code);
        AddCookie(uri, "validity", login.Validity);
        AddCookie(uri, "toolcode", $"{login.LoginUsername}-{login.Code}-{login.Validity}");
    }

    private void AddCookie(Uri uri, string name, string value) =>
        _cookies.Add(uri, new Cookie(name, value, "/", uri.Host));

    private async Task<string> QueryMaterialInboundAsync(
        DateOnly date,
        CancellationToken cancellationToken)
    {
        var dateText = date.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);
        var parameters = new Dictionary<string, string?>
        {
            ["data[inid]"] = "",
            ["data[inperson]"] = "",
            ["data[supplier]"] = "",
            ["data[stardata]"] = dateText,
            ["data[stopdata]"] = dateText,
            ["data[instate]"] = "",
            ["data[mid]"] = "",
            ["data[type]"] = "",
            ["data[materialnum]"] = "",
            ["data[steelnum]"] = "",
            ["data[stockthick]"] = "",
            ["data[stockwidth]"] = "",
            ["data[stocklong]"] = "",
            ["data[workorder]"] = ""
        };
        var queryString = string.Join("&", parameters.Select(pair =>
            $"{Uri.EscapeDataString(pair.Key)}={Uri.EscapeDataString(pair.Value ?? string.Empty)}"));
        using var request = new HttpRequestMessage(HttpMethod.Get, $"{_materialDataPath}?{queryString}");
        request.Headers.TryAddWithoutValidation("X-Requested-With", "XMLHttpRequest");
        request.Headers.TryAddWithoutValidation("Accept", "application/json, text/javascript, */*; q=0.01");
        request.Headers.Referrer = new Uri(_httpClient.BaseAddress!, _materialPagePath);
        using var response = await _httpClient.SendAsync(request, cancellationToken);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync(cancellationToken);
    }

    private static bool IsUnauthorized(string content) =>
        content.Contains("unauthorized access", StringComparison.OrdinalIgnoreCase);

    private static string DataPath(string sourcePagePath)
    {
        var extension = Path.GetExtension(sourcePagePath);
        if (string.IsNullOrEmpty(extension))
            throw new ArgumentException("93系统业务页面必须包含文件名。", nameof(sourcePagePath));
        return $"{sourcePagePath[..^extension.Length]}data{extension}";
    }

    private static string CalculateMd5(string value) =>
        Convert.ToHexString(MD5.HashData(Encoding.UTF8.GetBytes(value))).ToLowerInvariant();

    private static string GetLoginErrorMessage(string state) => state switch
    {
        "error0" => "93系统登录失败：用户名不能为空。",
        "error1" => "93系统登录失败：用户名或密码错误。",
        "error2" => "93系统登录失败：密码错误次数过多，请5分钟后再试。",
        "unauthorized" => "93系统登录失败：当前账号无访问权限。",
        "离职" => "93系统登录失败：当前账号已无访问权限。",
        _ => $"93系统登录失败：{state}"
    };

    public void Dispose()
    {
        _httpClient.Dispose();
        _loginLock.Dispose();
    }

    private sealed class Internal93LoginResponse
    {
        [JsonPropertyName("state")] public string State { get; set; } = string.Empty;
        [JsonPropertyName("user_type")] public int UserType { get; set; }
        [JsonPropertyName("login_id")] public string LoginId { get; set; } = string.Empty;
        [JsonPropertyName("login_username")] public string LoginUsername { get; set; } = string.Empty;
        [JsonPropertyName("code")] public string Code { get; set; } = string.Empty;
        [JsonPropertyName("validity")] public string Validity { get; set; } = string.Empty;
        [JsonPropertyName("last_url_state")] public string LastUrlState { get; set; } = string.Empty;
    }

    private sealed class MaterialInboundResponse
    {
        [JsonPropertyName("code")] public int Code { get; set; }
        [JsonPropertyName("msg")] public string Message { get; set; } = string.Empty;
        [JsonPropertyName("data")] public List<MaterialInboundRecord> Data { get; set; } = [];
    }

    private sealed class MaterialInboundRecord
    {
        [JsonPropertyName("type")] public string Type { get; set; } = string.Empty;
        [JsonPropertyName("inweight")] public string InWeight { get; set; } = string.Empty;
    }
}
