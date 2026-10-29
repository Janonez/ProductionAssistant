[CmdletBinding()]
param(
    [switch]$SkipRestore,
    [switch]$SyncRelease
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$prototype = Join-Path $root 'src\ProductionAssistant.App\Assets\Prototype'
$tencent = Join-Path $root 'src\ProductionAssistant.App\Assets\TencentSheet'
$debugPublish = Join-Path $root 'deployments\development'
$releasePublish = Join-Path $root 'deployments\production'
$env:npm_config_cache = Join-Path $root '.npm-cache'

function Assert-NativeSuccess([string]$operation) {
    if ($LASTEXITCODE -ne 0) { throw "$operation failed with exit code $LASTEXITCODE." }
}

Push-Location $root
try {
    pwsh -NoProfile -File scripts/test-teable-schema.ps1
    Assert-NativeSuccess 'Teable schema plan checks'
    pwsh -NoProfile -File scripts/test-teable-data.ps1
    Assert-NativeSuccess 'Teable data conversion checks'
    pwsh -NoProfile -File scripts/test-teable-views.ps1
    Assert-NativeSuccess 'Teable view conversion checks'
    if (-not $SkipRestore) {
        Push-Location $prototype
        try { npm.cmd ci; Assert-NativeSuccess 'Prototype npm ci' } finally { Pop-Location }
        Push-Location $tencent
        try { npm.cmd ci --ignore-scripts; Assert-NativeSuccess 'TencentSheet npm ci' } finally { Pop-Location }
        dotnet restore ProductionAssistant.sln -p:Platform=x64 -r win-x64
        Assert-NativeSuccess 'dotnet restore'
    }

    Push-Location $prototype
    try {
        npm.cmd run lint:font-weights
        Assert-NativeSuccess 'Prototype font-weight lint'
        npm.cmd test
        Assert-NativeSuccess 'Prototype tests'
        npm.cmd run build
        Assert-NativeSuccess 'Prototype build'
    } finally { Pop-Location }


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
