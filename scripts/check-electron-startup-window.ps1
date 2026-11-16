[CmdletBinding()]
param()
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$desktop = Join-Path $root 'src\ProductionAssistant.Desktop'
$userDirectory = Join-Path $env:LOCALAPPDATA 'ProductionAssistant\Electron\Development'
$identityFile = Join-Path $userDirectory 'instance-identity.json'
if (Test-Path -LiteralPath $identityFile) {
    $existing = Get-Content -LiteralPath $identityFile -Raw | ConvertFrom-Json
    if (Get-Process -Id $existing.pid -ErrorAction SilentlyContinue) {
        throw 'An existing Development instance is running. Close it normally before this test; no existing process was stopped.'
    }
}
Add-Type -TypeDefinition @'
using System;
using System.Runtime.InteropServices;
public static class MetisStartupWindow {
    private delegate bool EnumCallback(IntPtr hwnd, IntPtr data);
    [DllImport("user32.dll")] private static extern bool EnumWindows(EnumCallback callback, IntPtr data);
    [DllImport("user32.dll")] private static extern uint GetWindowThreadProcessId(IntPtr hwnd, out uint pid);
    [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr hwnd);
    [DllImport("user32.dll")] public static extern bool IsIconic(IntPtr hwnd);
    [DllImport("user32.dll")] public static extern bool PostMessage(IntPtr hwnd, uint message, IntPtr wparam, IntPtr lparam);
    public static IntPtr Find(uint target) {
        IntPtr found = IntPtr.Zero;
        EnumWindows((hwnd, data) => { uint pid; GetWindowThreadProcessId(hwnd, out pid);
            if (pid == target && IsWindowVisible(hwnd)) { found = hwnd; return false; } return true; }, IntPtr.Zero);
        return found;
    }
}
'@
$previousDist = $env:PRODUCTIONASSISTANT_DIST
$previousRunAsNode = $env:ELECTRON_RUN_AS_NODE
$launcher = $null
$identity = $null
$handle = [IntPtr]::Zero
try {
    $env:PRODUCTIONASSISTANT_DIST = Join-Path $root 'deployments\development\Assets\Prototype'
    Remove-Item Env:\ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue
    $startedAt = [DateTime]::UtcNow
    $startFile = Join-Path $desktop 'scripts\start.js'
    $launcher = [Diagnostics.Process]::new()
    $launcher.StartInfo.FileName = (Get-Command node.exe).Source
    $launcher.StartInfo.WorkingDirectory = $desktop
    $launcher.StartInfo.UseShellExecute = $false
    $launcher.StartInfo.CreateNoWindow = $true
    $launcher.StartInfo.RedirectStandardOutput = $true
    $launcher.StartInfo.RedirectStandardError = $true
    foreach ($argument in @($startFile, '--environment', 'Development')) { $launcher.StartInfo.ArgumentList.Add($argument) }
    [void]$launcher.Start()
    $standardOutput = $launcher.StandardOutput.ReadToEndAsync()
    $standardError = $launcher.StandardError.ReadToEndAsync()
    Write-Output "Normal-entry launcher PID: $($launcher.Id)"
    $clock = [Diagnostics.Stopwatch]::StartNew()
    while ($clock.ElapsedMilliseconds -lt 30000) {
        if ((Test-Path -LiteralPath $identityFile) -and (Get-Item -LiteralPath $identityFile).LastWriteTimeUtc -ge $startedAt) {
            $identity = Get-Content -LiteralPath $identityFile -Raw | ConvertFrom-Json
            $handle = [MetisStartupWindow]::Find($identity.pid)
            if ($handle -ne [IntPtr]::Zero) { break }
        }
        if ($launcher.HasExited) { throw "Normal startup launcher exited before a visible window (exit $($launcher.ExitCode)): $($standardOutput.Result) $($standardError.Result)" }
        Start-Sleep -Milliseconds 100
    }
    if ($handle -eq [IntPtr]::Zero) { throw 'Normal startup did not produce a visible native window within 30000ms.' }
    if (-not [MetisStartupWindow]::IsWindowVisible($handle) -or [MetisStartupWindow]::IsIconic($handle)) { throw 'Native window is hidden or minimized.' }
    [pscustomobject]@{ test='normal-start-native-window'; visible=$true; minimized=$false; electronPid=$identity.pid; startupId=$identity.startupId; buildId=$identity.buildId; hwnd=$handle.ToInt64() } | ConvertTo-Json
}
finally {
    $env:PRODUCTIONASSISTANT_DIST = $previousDist
    $env:ELECTRON_RUN_AS_NODE = $previousRunAsNode
    if ($handle -ne [IntPtr]::Zero) {
        [void][MetisStartupWindow]::PostMessage($handle, 0x0010, [IntPtr]::Zero, [IntPtr]::Zero)
        if (-not $launcher.WaitForExit(15000)) { throw 'The owned Development window did not close normally within 15000ms. No process was forcibly stopped.' }
    }
}
