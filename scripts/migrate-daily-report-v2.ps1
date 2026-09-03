param(
    [Parameter(Mandatory = $true)]
    [string]$CatalogPath,

    [Parameter(Mandatory = $true)]
    [string]$JobId
)

$ErrorActionPreference = 'Stop'
$resolvedCatalog = (Resolve-Path -LiteralPath $CatalogPath).Path
$catalog = Get-Content -Raw -LiteralPath $resolvedCatalog | ConvertFrom-Json
$job = $catalog.Jobs | Where-Object { $_.Id -eq $JobId }
if ($null -eq $job) {
    throw "DailyReportJob '$JobId' was not found in '$resolvedCatalog'."
}

function Set-JsonProperty($target, [string]$name, $value) {
    if ($target.PSObject.Properties.Name -contains $name) {
        $target.$name = $value
    } else {
        $target | Add-Member -NotePropertyName $name -NotePropertyValue $value
    }
}

$usedFields = @($job.Fields | Where-Object { $job.DraftTemplate.Contains($_.Placeholder) })
$monthlyTotalSourceIds = @(
    '4278f2c6-f226-8295-9c8a-8722d51fe868',
    '3758f2c6-f226-8067-87a2-000bec3f8a7d'
)
if ($usedFields.Count -eq 0) {
    throw "DailyReportJob '$JobId' has no field referenced by its draft template."
}

foreach ($field in $usedFields) {
    $token = $field.Token
    $source = $job.Sources | Where-Object { $_.DataSourceId -eq $token.DataSourceId } | Select-Object -First 1
    if ($null -eq $source -or [string]::IsNullOrWhiteSpace($source.MatchPropertyId)) {
        throw "Field '$($field.Placeholder)' has no stable date property binding."
    }

    $isMonthlyTotal = $token.DataSourceId -in $monthlyTotalSourceIds
    Set-JsonProperty $token 'QueryMode' $(if ($isMonthlyTotal) { 'exact-match' } else { 'date-range' })
    Set-JsonProperty $token 'AggregateKind' $(if ($isMonthlyTotal) { 'value' } else { 'sum' })
    Set-JsonProperty $token 'ViewId' ''
    Set-JsonProperty $token 'ViewName' ''
    Set-JsonProperty $token 'FilterPropertyId' ''
    Set-JsonProperty $token 'FilterPropertyName' ''
    Set-JsonProperty $token 'FilterOperator' ''
    Set-JsonProperty $token 'FilterValue' ''
    Set-JsonProperty $token 'CustomStartDate' ''
    Set-JsonProperty $token 'CustomEndDate' ''

    if ($isMonthlyTotal) {
        Set-JsonProperty $token 'DatePropertyId' ''
        Set-JsonProperty $token 'DatePropertyName' ''
        Set-JsonProperty $token 'QueryRangeKind' ''
        Set-JsonProperty $token 'ExactMatchPropertyId' $source.MatchPropertyId
        Set-JsonProperty $token 'ExactMatchPropertyName' $source.MatchPropertyName
        Set-JsonProperty $token 'ExactMatchPropertyType' 'date'
        Set-JsonProperty $token 'ExactMatchValueKind' 'business-month'
    } else {
        $rangeKind = if ([string]::IsNullOrWhiteSpace($token.QueryRangeKind)) { $token.PeriodKind } else { $token.QueryRangeKind }
        Set-JsonProperty $token 'DatePropertyId' $source.MatchPropertyId
        Set-JsonProperty $token 'DatePropertyName' $source.MatchPropertyName
        Set-JsonProperty $token 'QueryRangeKind' $rangeKind
        Set-JsonProperty $token 'ExactMatchPropertyId' ''
        Set-JsonProperty $token 'ExactMatchPropertyName' ''
        Set-JsonProperty $token 'ExactMatchPropertyType' ''
        Set-JsonProperty $token 'ExactMatchValueKind' ''
    }
}

$job.Fields = $usedFields
$backup = "$resolvedCatalog.before-v2-$((Get-Date).ToString('yyyyMMdd-HHmmss')).json"
Copy-Item -LiteralPath $resolvedCatalog -Destination $backup
[System.IO.File]::WriteAllText(
    $resolvedCatalog,
    ($catalog | ConvertTo-Json -Depth 100),
    [System.Text.UTF8Encoding]::new($false))

[pscustomobject]@{
    JobId = $JobId
    MigratedFields = $usedFields.Count
    DateRangeFields = @($usedFields | Where-Object { $_.Token.QueryMode -eq 'date-range' }).Count
    ExactMatchFields = @($usedFields | Where-Object { $_.Token.QueryMode -eq 'exact-match' }).Count
    Backup = $backup
}
