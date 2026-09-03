[CmdletBinding()]
param(
    [switch]$SkipRestore,
    [switch]$SyncRelease
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$editor = Join-Path $root 'src\ProductionAssistant.App\Assets\ReportEditor'
$prototype = Join-Path $root 'src\ProductionAssistant.App\Assets\Prototype'
$debugPublish = Join-Path $root 'deployments\development'
$releasePublish = Join-Path $root 'deployments\production'
$env:npm_config_cache = Join-Path $root '.npm-cache'

function Assert-NativeSuccess([string]$operation) {
    if ($LASTEXITCODE -ne 0) { throw "$operation failed with exit code $LASTEXITCODE." }
}

Push-Location $root
try {
    if (-not $SkipRestore) {
        Push-Location $editor
        try { npm.cmd ci; Assert-NativeSuccess 'ReportEditor npm ci' } finally { Pop-Location }
        Push-Location $prototype
        try { npm.cmd ci; Assert-NativeSuccess 'Prototype npm ci' } finally { Pop-Location }
        dotnet restore ProductionAssistant.sln -p:Platform=x64 -r win-x64
        Assert-NativeSuccess 'dotnet restore'
    }

    Push-Location $editor
    try { npm.cmd run build; Assert-NativeSuccess 'ReportEditor build' } finally { Pop-Location }
    Push-Location $prototype
    try {
        npm.cmd run lint:font-weights
        Assert-NativeSuccess 'Prototype font-weight lint'
        npm.cmd test
        Assert-NativeSuccess 'Prototype tests'
        npm.cmd run build
        Assert-NativeSuccess 'Prototype build'
    } finally { Pop-Location }

    $git = if (Test-Path 'C:\Program Files\Git\cmd\git.exe') {
        'C:\Program Files\Git\cmd\git.exe'
    } else {
        'git'
    }
    & $git diff --exit-code -- 'src/ProductionAssistant.App/Assets/ReportEditor/editor.js'
    if ($LASTEXITCODE -ne 0) {
        throw 'ReportEditor bundle differs from the committed editor.js.'
    }

    dotnet build ProductionAssistant.sln -c Release -p:Platform=x64 --no-restore
    Assert-NativeSuccess 'Release build'
    dotnet test tests\ProductionAssistant.Tests\ProductionAssistant.Tests.csproj `
        -c Release -p:Platform=x64 --no-build
    Assert-NativeSuccess 'xUnit tests'
    dotnet publish src\ProductionAssistant.App\ProductionAssistant.csproj `
        -c Debug -p:Platform=x64 -p:RuntimeEnvironment=Development --self-contained true --no-restore -o $debugPublish
    Assert-NativeSuccess 'Debug publish'
    if ($SyncRelease) {
        dotnet publish src\ProductionAssistant.App\ProductionAssistant.csproj `
            -c Release -p:Platform=x64 -p:RuntimeEnvironment=Production --self-contained true --no-restore -o $releasePublish
        Assert-NativeSuccess 'Release publish'
    }
}
finally {
    Pop-Location
}
