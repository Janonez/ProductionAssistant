[CmdletBinding()]
param(
    [switch]$SkipRestore,
    [switch]$SyncRelease
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$editor = Join-Path $root 'src\ProductionAssistant.App\Assets\ReportEditor'
$prototype = Join-Path $root 'src\ProductionAssistant.App\Assets\Prototype'
$debugPublish = Join-Path $root 'publish\Debug'
$releasePublish = Join-Path $root 'publish\Release'

Push-Location $root
try {
    if (-not $SkipRestore) {
        Push-Location $editor
        try { npm ci } finally { Pop-Location }
        Push-Location $prototype
        try { npm ci } finally { Pop-Location }
        dotnet restore ProductionAssistant.sln -p:Platform=x64 -r win-x64
    }

    Push-Location $editor
    try { npm run build } finally { Pop-Location }
    Push-Location $prototype
    try {
        npm test
        npm run build
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
    dotnet test tests\ProductionAssistant.Tests\ProductionAssistant.Tests.csproj `
        -c Release -p:Platform=x64 --no-build
    dotnet publish src\ProductionAssistant.App\ProductionAssistant.csproj `
        -c Debug -p:Platform=x64 --self-contained true --no-restore -o $debugPublish
    if ($SyncRelease) {
        dotnet publish src\ProductionAssistant.App\ProductionAssistant.csproj `
            -c Release -p:Platform=x64 --self-contained true --no-restore -o $releasePublish
    }
}
finally {
    Pop-Location
}
