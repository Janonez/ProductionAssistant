#requires -Version 7.0
<#
结构迁移工具：只读 Notion 元数据，将计划和执行证据写入 artifacts。
凭据沿用软件的 DPAPI 配置；必须由保存凭据的 Windows 用户运行。
不读取 Notion 业务记录，不导出 Token，不修改 Notion。
#>
[CmdletBinding()]
param(
    [ValidateSet('Inspect','Plan','Apply','Verify')][string]$Mode = 'Inspect',
    [string]$BaseId = 'bseP4L13CHZZyCtTMZS',
    [string]$OutputDirectory = (Join-Path $PSScriptRoot '../artifacts/teable-schema')
)
$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest
Add-Type -AssemblyName System.Security
. (Join-Path $PSScriptRoot 'teable-schema-plan.ps1')

. (Join-Path $PSScriptRoot 'teable-api.ps1')

New-Item -ItemType Directory -Path $OutputDirectory -Force | Out-Null
$planPath = Join-Path $OutputDirectory 'plan.json'
$statePath = Join-Path $OutputDirectory 'migration-state.json'
if ($Mode -eq 'Inspect' -and (Test-Path $statePath)) {
    throw '此目录已有迁移状态，不能覆盖迁移前快照。重新盘点请指定另一个 OutputDirectory。'
}
if ($Mode -eq 'Plan') {
    if (Test-Path $statePath) { throw '已有执行状态；不可覆盖计划，请使用 Apply 恢复或 Verify 核对。' }
    $snapshot = Read-Settings (Join-Path $OutputDirectory 'notion-schema.json')
    $plan = New-TeableSchemaPlan $snapshot $BaseId
    Write-Json 'plan.json' $plan
    Write-Host "已生成 $($plan.tables.Count) 张生产表的结构计划，不写入 Teable。"
    return
}

$teableSettings = Read-Settings (Join-Path $env:LOCALAPPDATA 'ProductionAssistant/Development/teable-settings.json')
$server = [Uri]$teableSettings.ServerUrl
if (!$server.IsAbsoluteUri -or ($server.Scheme -ne 'https' -and !($server.Scheme -eq 'http' -and $server.IsLoopback)) -or
    $server.UserInfo -or $server.Query -or $server.Fragment -or $BaseId -cnotmatch '^bse[a-zA-Z0-9]+$') { throw '无效的实例地址或 Base ID。' }
$teable = New-ApiClient (Read-Token $teableSettings) $true
$teableRoot = $teableSettings.ServerUrl.TrimEnd('/')
if (!$teableRoot.EndsWith('/api')) { $teableRoot += '/api' }

if ($Mode -in @('Apply','Verify')) {
    try {
        $planHash = (Get-FileHash $planPath -Algorithm SHA256).Hash
        $plan = Read-Settings $planPath
        if ($plan.baseId -ne $BaseId) { throw '计划的 Base 与本次目标不一致。' }
        if (Test-Path $statePath) {
            $state = Read-Settings $statePath
            if ($state.planHash -ne $planHash -or $state.server -ne $teableRoot) { throw '计划或实例已变化，不可恢复。' }
            $plan = $state.plan
        } else {
            if ($Mode -eq 'Verify') { throw '尚无迁移执行状态。' }
            $state = @{ planHash=$planHash; server=$teableRoot; plan=$plan }
            Write-Json 'migration-state.json' $state
        }
        function Save-State { Write-Json 'migration-state.json' $state }
        function Get-Fields($Table) { return @(Invoke-Api $teable "$teableRoot/table/$($Table.teableId)/field") }
        function Ensure-Field($Table, $Field) {
            $existing = @(Get-Fields $Table | Where-Object id -CEQ $Field.id)
            if ($existing.Count -eq 1) {
                if ($existing[0].name -cne $Field.name -or $existing[0].type -ne $Field.type) { throw "已存在字段与计划不符：$($Field.name)" }
                return $existing[0]
            }
            if (@(Get-Fields $Table | Where-Object name -CEQ $Field.name).Count) { throw "同名字段冲突：$($Field.name)" }
            $created = Invoke-Api $teable "$teableRoot/table/$($Table.teableId)/field" 'POST' $Field
            if ($created.id -cne $Field.id) { throw '创建的字段 ID 不符合计划。' }
            Save-State
            return $created
        }
        $existingTables = @(Invoke-Api $teable "$teableRoot/base/$BaseId/table")
        # 先检查所有名称，不能把用户已有 Projects/People 或同名表当作迁移目标。
        foreach ($table in $plan.tables) {
            foreach ($existing in $existingTables | Where-Object name -CEQ $table.name) {
                if (!$existing['description'] -or !$existing['description'].StartsWith($table.marker + "`n")) { throw "同名非迁移表：$($table.name)" }
            }
        }
        foreach ($table in $plan.tables) {
            $existing = @($existingTables | Where-Object { $_['description'] -and $_['description'].StartsWith($table.marker + "`n") })
            if ($existing.Count -gt 1) { throw '发现重复迁移表标记。' }
            if (!$existing.Count) {
                if ($Mode -eq 'Verify') { throw "迁移表缺失：$($table.name)" }
                $primitives = @()
                foreach ($mapping in $table.fields | Where-Object notionType -NotIn @('relation','rollup','formula')) {
                    $primitives += $mapping.field
                    if ($mapping.ContainsKey('endField')) { $primitives += $mapping.endField }
                }
                $body = @{ name=$table.name; description=$table.marker + "`n" + $table.path;
                    fields=$primitives; views=@(@{ name='全部记录'; type='grid' }); records=@() }
                $created = Invoke-Api $teable "$teableRoot/base/$BaseId/table" 'POST' $body
                $table.teableId = $created.id
                Save-State
                Write-Host "已创建空表：$($table.name)"
            } else { $table.teableId = $existing[0].id; Save-State }
            $sample = Invoke-Api $teable "$teableRoot/table/$($table.teableId)/record?take=1"
            if ($sample.records.Count -ne 0) { throw "迁移目标已有记录，停止结构修改：$($table.name)" }
        }
        if ($Mode -eq 'Apply') {
            # 双向关系只创建一次，另一端使用服务端返回的 symmetricFieldId，避免两条独立关系。
            foreach ($table in $plan.tables) {
                foreach ($mapping in $table.fields | Where-Object notionType -eq 'relation') {
                    $relation = $mapping.source.relation
                    $foreign = @($plan.tables | Where-Object notionId -eq $relation.data_source_id)[0]
                    $reverse = @($foreign.fields | Where-Object notionId -CEQ $relation.dual_property.synced_property_id)[0]
                    $mapping.field.options = @{ relationship='manyMany'; foreignTableId=$foreign.teableId; isOneWay=$false }
                    $created = Ensure-Field $table $mapping.field
                    $symmetricId = $created.options.symmetricFieldId
                    if (!$symmetricId -or $created.options.foreignTableId -ne $foreign.teableId) { throw '关联目标或反向字段缺失。' }
                    $reverse.field.id = $symmetricId
                    $actualReverse = Invoke-Api $teable "$teableRoot/table/$($foreign.teableId)/field/$symmetricId"
                    if ($actualReverse.options.symmetricFieldId -ne $created.id) { throw '双向关联不互相指向。' }
                    Save-State
                    if ($actualReverse.name -cne $reverse.field.name -or $actualReverse['description'] -cne $reverse.field.description) {
                        $null = Invoke-Api $teable "$teableRoot/table/$($foreign.teableId)/field/$symmetricId" 'PATCH' @{
                            name=$reverse.field.name; description=$reverse.field.description }
                    }
                }
            }
            Set-TeableDerivedFields $plan
            foreach ($table in $plan.tables) {
                foreach ($mapping in $table.fields | Where-Object notionType -In @('formula','rollup')) {
                    $null = Ensure-Field $table $mapping.field
                }
            }
            Save-State
        }
        # 回读每张空表，逐字段检查类型、选项、公式及双向关系；不插入任何测试记录。
        $verified = @()
        foreach ($table in $plan.tables) {
            $fields = @(Get-Fields $table)
            $expected = @($table.fields | ForEach-Object { $_.field; if ($_.ContainsKey('endField')) { $_.endField } })
            if ($fields.Count -ne $expected.Count) { throw "字段数量不符：$($table.name)" }
            foreach ($wanted in $expected) {
                $actual = @($fields | Where-Object id -CEQ $wanted.id)
                if ($actual.Count -ne 1 -or $actual[0].name -cne $wanted.name -or $actual[0].type -ne $wanted.type -or $actual[0]['hasError']) {
                    throw "字段回读不一致或计算错误：$($table.name)/$($wanted.name)"
                }
                $actual = $actual[0]
                if ($wanted.type -in @('formula','rollup') -and $actual.options.expression -cne $wanted.options.expression) { throw '公式/汇总表达式不一致。' }
                if ($wanted.type -eq 'singleSelect' -and (@($actual.options.choices.name) -join '|') -cne (@($wanted.options.choices.name) -join '|')) { throw '选项列表不一致。' }
                if ($wanted.type -eq 'singleSelect' -and (@($actual.options.choices.color) -join '|') -cne (@($wanted.options.choices.color) -join '|')) { throw '选项颜色不一致。' }
                if ($wanted.type -eq 'date') {
                    foreach ($key in @('date','time','timeZone')) {
                        if ($actual.options.formatting[$key] -cne $wanted.options.formatting[$key]) { throw "日期格式不一致：$key" }
                    }
                }
                if ($wanted.type -eq 'number' -and ($actual.options.formatting.type -ne 'decimal' -or $actual.options.formatting.precision -ne 2)) { throw '数值格式不一致。' }
                if ($wanted.type -eq 'link' -and ($actual.options.foreignTableId -ne $wanted.options.foreignTableId -or
                    $actual.options.relationship -ne 'manyMany' -or !$actual.options.symmetricFieldId)) { throw '关联结构不一致。' }
                if ($wanted.type -eq 'link') {
                    $opposite = Invoke-Api $teable "$teableRoot/table/$($actual.options.foreignTableId)/field/$($actual.options.symmetricFieldId)"
                    if ($opposite.options.symmetricFieldId -ne $actual.id -or $opposite.options.foreignTableId -ne $table.teableId) { throw '反向关联没有指回来源字段。' }
                }
                if ($wanted.type -eq 'rollup') {
                    foreach ($key in @('foreignTableId','linkFieldId','lookupFieldId')) {
                        if ($actual.lookupOptions[$key] -ne $wanted.lookupOptions[$key]) { throw "汇总依赖不一致：$key" }
                    }
                }
            }
            $primary = @($fields | Where-Object { $_['isPrimary'] })
            $title = @($table.fields | Where-Object notionType -eq 'title')[0]
            if ($primary.Count -ne 1 -or $primary[0].id -ne $title.field.id) { throw '主字段不对应 Notion 标题。' }
            $verified += @{ name=$table.name; tableId=$table.teableId; fieldCount=$fields.Count; records=0; fields=$fields }
        }
        $before = Read-Settings (Join-Path $OutputDirectory 'teable-before.json')
        foreach ($old in $before.tables) {
            $current = @(Invoke-Api $teable "$teableRoot/table/$($old.table.id)/field")
            if ((ConvertTo-Json -InputObject $current -Depth 100 -Compress) -cne (ConvertTo-Json -InputObject $old.fields -Depth 100 -Compress)) {
                throw "迁移前已有表的字段结构发生变化：$($old.table.name)"
            }
        }
        Write-Json 'verification.json' @{ verifiedAt=[DateTimeOffset]::Now.ToString('O'); tables=$verified; existingTablesUnchanged=$true }
        Write-Host "验证通过：$($verified.Count) 张空表，$((($verified | ForEach-Object fieldCount) | Measure-Object -Sum).Sum) 个字段，原有表字段结构未变。"
    } finally { $teable.Dispose() }
    return
}

$notionSettings = Read-Settings (Join-Path $env:LOCALAPPDATA 'ProductionAssistant/notion-settings.json')
$notion = New-ApiClient (Read-Token $notionSettings) $false
$notion.DefaultRequestHeaders.Add('Notion-Version', '2026-03-11')
try {
    $sources = [Collections.Generic.List[object]]::new()
    $visited = [Collections.Generic.HashSet[string]]::new()
    function Visit-Page([string]$PageId, [string]$Path) {
        if (!$visited.Add($PageId)) { return }
        $cursor = ''
        do {
            $url = "https://api.notion.com/v1/blocks/$PageId/children?page_size=100"
            if ($cursor) { $url += '&start_cursor=' + [Uri]::EscapeDataString($cursor) }
            $page = Invoke-Api $notion $url
            foreach ($block in $page.results) {
                if ($block.type -eq 'child_database') {
                    if ($Path -eq '数据库') { continue }
                    $database = Invoke-Api $notion "https://api.notion.com/v1/databases/$($block.id)"
                    foreach ($source in $database.data_sources) {
                        $schema = Invoke-Api $notion "https://api.notion.com/v1/data_sources/$($source.id)"
                        $sources.Add(@{ id=$source.id; databaseId=$database.id; name=$source.name; path="$Path / $($source.name)"; schema=$schema })
                        Write-Json 'notion-schema.partial.json' @{ sources=$sources.ToArray() }
                        Write-Host "Notion 结构：$($source.name)（$($schema.properties.Count) 个字段）"
                    }
                } elseif ($block.type -eq 'child_page') {
                    # 仅扫描用户确认的六个生产板块，不递归任务、工具箱或共享文档页面。
                    if ($Path -ne '数据库' -or $block.child_page.title.Trim() -in @('焊接','下料','原材料入库','塔筒产线','机加工','发运')) {
                        Visit-Page $block.id "$Path / $($block.child_page.title)"
                    }
                } elseif ($block.has_children) {
                    Visit-Page $block.id $Path
                }
            }
            $cursor = if ($page.has_more) { $page.next_cursor } else { '' }
        } while ($cursor)
    }
    Visit-Page $notionSettings.RootPageId '数据库'
    Write-Json 'notion-schema.json' @{ capturedAt=[DateTimeOffset]::Now.ToString('O'); rootPageId=$notionSettings.RootPageId; sources=$sources.ToArray() }
    $tables = @(Invoke-Api $teable "$teableRoot/base/$BaseId/table")
    $target = foreach ($table in $tables) {
        @{ table=$table; fields=@(Invoke-Api $teable "$teableRoot/table/$($table.id)/field") }
    }
    Write-Json 'teable-before.json' @{ capturedAt=[DateTimeOffset]::Now.ToString('O'); baseId=$BaseId; tables=@($target) }
    Write-Host "盘点完成：Notion $($sources.Count) 个数据库，Teable $($tables.Count) 张现有表。"
} finally { $notion.Dispose(); $teable.Dispose() }
