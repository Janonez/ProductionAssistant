# 迁移脚本共用的本机 DPAPI、HTTP 与原子 JSON 文件操作；不向控制台输出凭据。
function Read-Settings([string]$Path) {
    return Get-Content -LiteralPath $Path -Raw | ConvertFrom-Json -AsHashtable
}
function Read-Token($Settings) {
    $bytes = [Security.Cryptography.ProtectedData]::Unprotect(
        [Convert]::FromBase64String($Settings.EncryptedToken), $null,
        [Security.Cryptography.DataProtectionScope]::CurrentUser)
    try { return [Text.Encoding]::UTF8.GetString($bytes) }
    finally { [Array]::Clear($bytes, 0, $bytes.Length) }
}
function New-ApiClient([string]$Token, [bool]$Direct) {
    $handler = [Net.Http.HttpClientHandler]::new()
    $handler.UseProxy = !$Direct
    $handler.AllowAutoRedirect = $false
    $client = [Net.Http.HttpClient]::new($handler)
    $client.Timeout = [TimeSpan]::FromSeconds(30)
    $client.DefaultRequestHeaders.Authorization = [Net.Http.Headers.AuthenticationHeaderValue]::new('Bearer', $Token)
    return $client
}
function Invoke-Api($Client, [string]$Url, [string]$Method = 'GET', $Body = $null) {
    $request = [Net.Http.HttpRequestMessage]::new([Net.Http.HttpMethod]::new($Method), $Url)
    if ($null -ne $Body) {
        $request.Content = [Net.Http.StringContent]::new((ConvertTo-Json -InputObject $Body -Depth 100 -Compress), [Text.Encoding]::UTF8, 'application/json')
    }
    # 不自动重试创建；结构迁移按稳定字段 ID 恢复，数据迁移按 pending 与逐值核对恢复。
    $response = $Client.SendAsync($request).GetAwaiter().GetResult()
    try {
        if (!$response.IsSuccessStatusCode) {
            # 错误详情只留在 Git 忽略的本机目录；不记录请求头或 Token。
            $detail = $response.Content.ReadAsStringAsync().GetAwaiter().GetResult()
            $detail = $detail.Replace($Client.DefaultRequestHeaders.Authorization.Parameter, '[REDACTED]')
            Write-Json 'last-error.json' @{ method=$Method; url=$Url; status=[int]$response.StatusCode; detail=$detail }
            throw "API $Method 失败：HTTP $([int]$response.StatusCode)，$Url"
        }
        return $response.Content.ReadAsStringAsync().GetAwaiter().GetResult() | ConvertFrom-Json -AsHashtable
    } finally { $response.Dispose(); $request.Dispose() }
}
function Write-Json([string]$Name, $Value) {
    $path = Join-Path $OutputDirectory $Name
    [IO.File]::WriteAllText($path + '.tmp',
        (ConvertTo-Json -InputObject $Value -Depth 100), [Text.UTF8Encoding]::new($false))
    [IO.File]::Move($path + '.tmp', $path, $true)
}

