#requires -Version 7.5
<#
生产视图迁移：只读 Notion，向 Teable 新建带唯一来源标记的视图，不覆盖用户已有视图。
筛选、排序、列布局从快照转换；执行后用原数据迁移的 ID 映射比对两边实际视图记录集合。
创建前保存 pending；响应不确定时只能按唯一来源标记回读恢复，不能盲目重发 POST。
#>
[CmdletBinding()]
param(
    [ValidateSet('Inspect','Plan','Apply','Verify')][string]$Mode='Inspect',
    [string]$SchemaStatePath=(Join-Path $env:LOCALAPPDATA 'ProductionAssistant/Development/teable-data-20261009/schema-state.json'),
    [string]$DataStatePath=(Join-Path $env:LOCALAPPDATA 'ProductionAssistant/Development/teable-data-20261009/state.json'),
    [string]$OutputDirectory=(Join-Path $PSScriptRoot '../artifacts/teable-views')
)
$ErrorActionPreference='Stop'
. "$PSScriptRoot/teable-api.ps1"
. "$PSScriptRoot/teable-view-plan.ps1"
Add-Type -AssemblyName System.Security
New-Item -ItemType Directory -Force $OutputDirectory | Out-Null
$snapshotPath=Join-Path $OutputDirectory 'snapshot.json'
$planPath=Join-Path $OutputDirectory 'plan.json'
$statePath=Join-Path $OutputDirectory 'state.json'
if($Mode -eq 'Plan') {
    if(Test-Path $statePath){throw '已有执行状态，不能覆盖计划。'}
    $plan=New-TeableViewPlan (Read-Settings $snapshotPath)
    Write-Json 'plan.json' $plan
    Write-Host "计划 $($plan.views.Count) 个视图；忽略 $($plan.omittedColumns.Count) 项已删除字段布局。"
    return
}
$n=Read-Settings (Join-Path $env:LOCALAPPDATA 'ProductionAssistant/notion-settings.json')
$t=Read-Settings (Join-Path $env:LOCALAPPDATA 'ProductionAssistant/Development/teable-settings.json')
$server=[Uri]$t.ServerUrl
if(!$server.IsAbsoluteUri -or ($server.Scheme -ne 'https' -and !($server.Scheme -eq 'http' -and $server.IsLoopback)) -or $server.UserInfo -or $server.Query -or $server.Fragment){throw '无效实例地址。'}
$root=$t.ServerUrl.TrimEnd('/');if(!$root.EndsWith('/api')){$root+='/api'}
$nc=New-ApiClient (Read-Token $n) $false
$nc.DefaultRequestHeaders.Add('Notion-Version','2026-03-11')
$tc=New-ApiClient (Read-Token $t) $true
try {
    if($Mode -eq 'Inspect') {
        if((Test-Path $snapshotPath) -or (Test-Path $statePath)){throw '目录已有快照或执行状态，请使用新目录。'}
        $schema=Read-Settings $SchemaStatePath;$tables=@()
        foreach($table in $schema.plan.tables) {
            $source=Invoke-Api $nc "https://api.notion.com/v1/data_sources/$($table.notionId)"
            $views=@();$cursor=$null
            do {
                $url="https://api.notion.com/v1/views?database_id=$($source.parent.database_id)&page_size=100"
                if($cursor){$url+="&start_cursor=$cursor"}
                $page=Invoke-Api $nc $url
                foreach($item in $page.results) {
                    $id=if($item.id){$item.id}else{$item.view.id}
                    $view=Invoke-Api $nc "https://api.notion.com/v1/views/$id"
                    if($view.data_source_id -eq $table.notionId){$views+=,$view}
                }
                $cursor=$page.next_cursor
            }while($page.has_more)
            $tables+=@{table=$table;views=$views;before=@(Invoke-Api $tc "$root/table/$($table.teableId)/view");fields=@(Invoke-Api $tc "$root/table/$($table.teableId)/field")}
            Write-Host "$($table.name)：$($views.Count) 个视图。"
        }
        Write-Json 'snapshot.json' @{capturedAt=[DateTimeOffset]::UtcNow.ToString('o');tables=$tables;server=$root}
        return
    }
    $snapshot=Read-Settings $snapshotPath
    if($snapshot.server -ne $root){throw '快照实例地址不匹配。'}
    $plan=Read-Settings $planPath;$hash=(Get-FileHash $planPath -Algorithm SHA256).Hash
    $data=Read-Settings $DataStatePath
    if($data.api -ne $root){throw '数据迁移实例不匹配。'}
    $state=if(Test-Path $statePath){Read-Settings $statePath}else{@{planHash=$hash;server=$root;views=@{};pending=$null}}
    if($state.planHash -ne $hash -or $state.server -ne $root){throw '计划或目标发生变化，停止恢复。'}
    if($Mode -eq 'Verify' -and !(Test-Path $statePath)){throw '尚无视图执行状态。'}
    $reports=@()
    foreach($view in $plan.views) {
        $old=@($snapshot.tables.views | Where-Object id -CEQ $view.notionId)[0]
        $fresh=Invoke-Api $nc "https://api.notion.com/v1/views/$($view.notionId)"
        if($fresh.last_edited_time -ne $old.last_edited_time){throw "Notion 视图发生变化：$($view.name)，请重新盘点。"}
        $existing=@(Invoke-Api $tc "$root/table/$($view.tableId)/view" | Where-Object description -CEQ $view.body.description)
        if($existing.Count -gt 1){throw '来源标记重复，停止迁移。'}
        if(!$existing.Count) {
            if($Mode -eq 'Verify'){throw "迁移视图缺失：$($view.name)"}
            if($state.pending){throw '存在响应不确定的创建，请先核对 pending 对应视图，不能重新 POST。'}
            $state.pending=$view.notionId;Write-Json 'state.json' $state
            $created=Invoke-Api $tc "$root/table/$($view.tableId)/view" 'POST' $view.body
        } else {$created=$existing[0]}
        # 已有用户同名视图时 Teable 自动追加编号；保留用户视图，记录实际名称而非覆盖。
        if($created.name -cne $view.name -and $created.name -cnotmatch ('^'+[regex]::Escape($view.name)+' [0-9]+$')){throw '迁移视图名称发生非预期变化。'}
        $state.views[$view.notionId]=@{sourceId=$view.sourceId;tableId=$view.tableId;id=$created.id;name=$view.name;teableName=$created.name}
        if($state.pending -eq $view.notionId){$state.pending=$null}
        Write-Json 'state.json' $state
        # 逐项回读配置。服务端可能填充默认值；只比较请求指定的每个叶子值。
        function Assert-Subset($Expected,$Actual,[string]$Path) {
            if($null -eq $Expected){if($null -ne $Actual){throw "配置不一致：$Path"};return}
            if($Expected -is [Collections.IDictionary]){foreach($key in $Expected.Keys){Assert-Subset $Expected[$key] $Actual[$key] "$Path/$key"};return}
            if($Expected -is [array]){if($Expected.Count -ne $Actual.Count){throw "配置长度不一致：$Path"};for($i=0;$i -lt $Expected.Count;$i++){Assert-Subset $Expected[$i] $Actual[$i] "$Path/$i"};return}
            if($Expected -cne $Actual){throw "配置不一致：$Path"}
        }
        $actual=Invoke-Api $tc "$root/table/$($view.tableId)/view/$($created.id)"
        $expectedBody=$view.body.Clone();$expectedBody.name=$created.name
        Assert-Subset $expectedBody $actual $view.name
        $query=$null;$notionIds=@()
        try {
            $page=Invoke-Api $nc "https://api.notion.com/v1/views/$($view.notionId)/queries" 'POST' @{page_size=100}
            $query=$page.id
            do {
                if($page.request_status -eq 'incomplete'){throw 'Notion 返回不完整视图结果。'}
                foreach($record in $page.results){$notionIds+=if($record.id){$record.id}else{$record.page.id}}
                if($notionIds.Count -ge 10000){throw 'Notion 视图达到查询上限。'}
                $cursor=$page.next_cursor
                if($page.has_more){$page=Invoke-Api $nc "https://api.notion.com/v1/views/$($view.notionId)/queries/$query`?page_size=100&start_cursor=$cursor"}
            }while($cursor)
        } finally {if($query){Invoke-Api $nc "https://api.notion.com/v1/views/$($view.notionId)/queries/$query" 'DELETE' | Out-Null}}
        $targetIds=@();$skip=0
        do {
            $page=Invoke-Api $tc "$root/table/$($view.tableId)/record?fieldKeyType=id&viewId=$($created.id)&take=1000&skip=$skip"
            foreach($record in $page.records){$targetIds+= $record.id};$skip+=1000
        }while($page.records.Count -eq 1000)
        $expected=@($notionIds | ForEach-Object {if(!$data.recordMap.ContainsKey($_)){throw '视图包含未迁移源记录。'};$data.recordMap[$_]})
        $difference=if($expected.Count -and $targetIds.Count){@(Compare-Object ($expected | Sort-Object) ($targetIds | Sort-Object))}elseif($expected.Count -ne $targetIds.Count){@('count')}else{@()}
        if($difference.Count){throw "视图结果不一致：$($view.name)，源 $($expected.Count)/目标 $($targetIds.Count)。"}
        $reports+=@{notionId=$view.notionId;teableId=$created.id;name=$view.name;count=$targetIds.Count;matched=$true}
        Write-Json 'verification.json' @{verifiedAt=[DateTimeOffset]::UtcNow.ToString('o');views=$reports;omittedColumns=$plan.omittedColumns}
        Write-Host "$($view.name)：配置和 $($targetIds.Count) 条记录集合一致。"
    }
} finally {$nc.Dispose();$tc.Dispose()}
