#requires -Version 7.5
<#
以 Notion 数据源快照为准迁移九个生产库的字段值和关联。绝不写 Notion。
Snapshot 只读；Apply 按源页 ID 保存检查点；Verify 逐值核对。
POST 前记录 pending，响应不确定时停止，禁止盲目重发导致重复记录。
#>
[CmdletBinding()]
param(
    [ValidateSet('Snapshot','RepairWeld','CleanEmpty','ReconcilePending','FixFormulas','CheckSource','Apply','Verify')][string]$Mode='Snapshot',
    [string]$OutputDirectory=(Join-Path $PSScriptRoot '../artifacts/teable-data-migration'),
    [string]$SchemaState=(Join-Path $PSScriptRoot '../artifacts/teable-schema/migration-state.json')
)
$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.Security
. (Join-Path $PSScriptRoot 'teable-api.ps1')
New-Item -ItemType Directory -Path $OutputDirectory -Force | Out-Null
. (Join-Path $PSScriptRoot 'teable-data-functions.ps1')
$schema=Read-Data $SchemaState
$plan=$schema.plan;$api=$schema.server
$settings=Read-Settings (Join-Path $env:LOCALAPPDATA 'ProductionAssistant/Development/teable-settings.json')
if($api.TrimEnd('/') -ne ($settings.ServerUrl.TrimEnd('/')+'/api')){throw 'Teable 配置与结构映射的实例不一致。'}
$teable=New-ApiClient (Read-Token $settings) $true
$statePath=Join-Path $OutputDirectory 'state.json'
try {
    if($Mode -eq 'Snapshot'){
        if(Test-Path $statePath){throw '已有执行检查点，不得覆盖源快照。'}
        $ns=Read-Settings (Join-Path $env:LOCALAPPDATA 'ProductionAssistant/notion-settings.json')
        $notion=New-ApiClient (Read-Token $ns) $false
        $notion.DefaultRequestHeaders.Add('Notion-Version','2026-03-11')
        try {
            foreach($table in $plan.tables){
                $sourceSchema=Invoke-Api $notion "https://api.notion.com/v1/data_sources/$($table.notionId)"
                $rows=[Collections.Generic.List[object]]::new();$cursor=$null
                do {
                    $body=@{page_size=100};if($cursor){$body.start_cursor=$cursor}
                    $page=Invoke-Api $notion "https://api.notion.com/v1/data_sources/$($table.notionId)/query" 'POST' $body
                    foreach($row in $page.results){
                        foreach($p in $row.properties.Values){
                            if($p.type -eq 'relation' -and $p.has_more){
                                $items=@();$next=$null
                                do {
                                    $url="https://api.notion.com/v1/pages/$($row.id)/properties/$($p.id)?page_size=100"
                                    if($next){$url+='&start_cursor='+[Uri]::EscapeDataString($next)}
                                    $full=Invoke-Api $notion $url
                                    $items+=@($full.results|ForEach-Object relation);$next=$full.next_cursor
                                } while($full.has_more)
                                $p.relation=$items;$p.has_more=$false
                            }
                            if($p.type -in @('title','rich_text') -and @($p[$p.type]).Count -ge 25){throw '富文本可能截断，需先扩展属性分页读取。'}
                        }
                        $rows.Add($row)
                    }
                    $cursor=$page.next_cursor
                } while($page.has_more)
                $fields=@(Invoke-Api $teable "$api/table/$($table.teableId)/field")
                $target=Get-TargetRows $table
                Write-Json "$($table.notionId)-source.json" @{schema=$sourceSchema;records=$rows.ToArray()}
                Write-Json "$($table.notionId)-before.json" @{fields=$fields;records=$target}
                Write-Host "$($table.name)：Notion $($rows.Count)，Teable $($target.Count)"
            }
            Write-Json 'snapshot.json' @{capturedAt=[DateTimeOffset]::Now.ToString('O');schema=$schema}
        } finally {$notion.Dispose()}
        return
    }
    $snapshot=Read-Data (Join-Path $OutputDirectory 'snapshot.json')
    if($snapshot.schema.server -ne $api -or $snapshot.schema.plan.baseId -ne $plan.baseId){throw '快照实例与当前映射不一致。'}
    $sources=@{};$targetFields=@{};$hashes=@{}
    foreach($table in $plan.tables){
        $path=Join-Path $OutputDirectory "$($table.notionId)-source.json"
        $sources[$table.notionId]=Read-Data $path
        $hashes[$table.notionId]=(Get-FileHash $path -Algorithm SHA256).Hash
        $fields=@(Invoke-Api $teable "$api/table/$($table.teableId)/field")
        $targetFields[$table.notionId]=$fields
        if(@($sources[$table.notionId].schema.properties.Values).Count -ne $table.fields.Count){throw "源结构已变化：$($table.name)"}
        foreach($m in $table.fields){
            $field=@($fields|Where-Object id -CEQ $m.field.id)
            if($field.Count -ne 1 -or $field[0].type -ne $m.field.type -or $field[0]['hasError']){throw "目标结构不符：$($table.name)/$($m.field.name)"}
        }
        $seen=[Collections.Generic.HashSet[string]]::new()
        foreach($row in $sources[$table.notionId].records){
            if(!$seen.Add($row.id)){throw '源快照包含重复页 ID。'}
            # 在任何写入前转换所有记录，检查不支持类型、缺失属性、日期结束值等。
            $null=Get-FieldsToWrite $row $table $fields
        }
    }
    if(Test-Path $statePath){
        $state=Read-Data $statePath
        if($state.api -ne $api -or $state.baseId -ne $plan.baseId){throw '执行检查点目标不一致。'}
        foreach($id in $hashes.Keys){if($state.hashes[$id] -ne $hashes[$id]){throw '源快照发生变化，不能继续既有迁移。'}}
        if($state.pending -and $Mode -ne 'ReconcilePending'){throw '存在响应未确认的创建批次；先核对并恢复 pending，禁止重复 POST。'}
    }else{
        if($Mode -eq 'Verify'){throw '不存在数据迁移检查点。'}
        $state=@{api=$api;baseId=$plan.baseId;hashes=$hashes;recordMap=@{};ignored=@{};pending=$null;created=0;updated=0;linksUpdated=0}
        foreach($table in $plan.tables){
            $rows=Get-TargetRows $table
            if($table.name -in @('焊接数据库','焊接月计划数据库','下料每月计划数据库')){
                $title=@($table.fields|Where-Object notionType -eq title)[0]
                $index=@{}
                $empty=@()
                foreach($r in $rows){
                    $key=[string]$r.fields[$title.field.id]
                    if(!$key -and $table.name -eq '下料每月计划数据库'){
                        foreach($field in $targetFields[$table.notionId]|Where-Object type -NotIn @('formula','rollup')){
                            $v=$r.fields[$field.id]
                            if($null -ne $v -and !($v -is [string] -and $v -eq '')){throw '无标题记录包含数据，不能按空记录处理。'}
                        }
                        $empty+=$r.id;continue
                    }
                    if($index.ContainsKey($key)){throw '现有表标题重复，不能安全匹配。'};$index[$key]=$r.id
                }
                $state.ignored[$table.notionId]=$empty
                $matched=[Collections.Generic.HashSet[string]]::new()
                foreach($r in $sources[$table.notionId].records){
                    $p=Get-Property $r $title;$key=($p.title|ForEach-Object plain_text)-join ''
                    if(!$index.ContainsKey($key) -or !$matched.Add($index[$key])){throw '焊接源/目标记录不能一一匹配。'}
                    $state.recordMap[$r.id]=$index[$key]
                }
                if($matched.Count+$empty.Count -ne $rows.Count){throw '目标存在额外记录。'}
            }elseif($rows.Count){throw "未登记的目标数据：$($table.name)，停止避免覆盖或重复。"}
        }
        Write-Json 'state.json' $state
    }
    function Save-DataState { Write-Json 'state.json' $state }
    if($Mode -eq 'CheckSource'){
        $ns=Read-Settings (Join-Path $env:LOCALAPPDATA 'ProductionAssistant/notion-settings.json')
        $notion=New-ApiClient (Read-Token $ns) $false
        $notion.DefaultRequestHeaders.Add('Notion-Version','2026-03-11')
        $changes=@()
        try {
            foreach($table in $plan.tables){
                $expected=@{};foreach($r in $sources[$table.notionId].records){$expected[$r.id]=$r.last_edited_time}
                $seen=[Collections.Generic.HashSet[string]]::new();$cursor=$null
                do {
                    $body=@{page_size=100};if($cursor){$body.start_cursor=$cursor}
                    $page=Invoke-Api $notion "https://api.notion.com/v1/data_sources/$($table.notionId)/query" 'POST' $body
                    foreach($r in $page.results){
                        $null=$seen.Add($r.id)
                        if(!$expected.ContainsKey($r.id) -or !(Values-Equal $expected[$r.id] $r.last_edited_time 'date')){
                            $changes+=@{table=$table.name;notionId=$r.id;reason='源记录新增或修改'}
                        }
                    }
                    $cursor=$page.next_cursor
                }while($page.has_more)
                foreach($id in $expected.Keys){if(!$seen.Contains($id)){$changes+=@{table=$table.name;notionId=$id;reason='源记录移出或删除'}}}
                Write-Host "$($table.name)：源端结束时复查 $($seen.Count) 条。"
            }
        }finally{$notion.Dispose()}
        Write-Json 'source-check.json' @{checkedAt=[DateTimeOffset]::Now.ToString('O');changes=$changes}
        if($changes.Count){throw "迁移期间源端发生 $($changes.Count) 处变化，需要重新对账。"}
        Write-Host '源端记录集合与修改时间均未发生变化。';return
    }
    if($Mode -eq 'FixFormulas'){
        . (Join-Path $PSScriptRoot 'teable-schema-plan.ps1')
        Set-TeableDerivedFields $plan
        foreach($table in $plan.tables){
            foreach($m in $table.fields|Where-Object {$_['formulaKind'] -eq 'inclusiveDays'}){
                $actual=@($targetFields[$table.notionId]|Where-Object id -CEQ $m.field.id)[0]
                if($actual.options.expression -cne $m.field.options.expression){
                    Write-Json "$($m.field.id)-formula-before.json" $actual
                    $null=Invoke-Api $teable "$api/table/$($table.teableId)/field/$($m.field.id)/convert" 'PUT' @{
                        type='formula';name=$m.field.name;description=$actual.description;options=$m.field.options}
                }
            }
        }
        Write-Json 'schema-state-current.json' $schema
        Write-Host '日期差公式已使用数值层条件分支，避免日期条件表达式重复时区换算。';return
    }
    if($Mode -eq 'ReconcilePending'){
        if(!$state.pending){throw '不存在待恢复批次。'}
        $table=@($plan.tables|Where-Object teableId -eq $state.pending.tableId)[0]
        $rows=@((Get-TargetRows $table)|Where-Object id -NotIn @($state.recordMap.Values))
        if($rows.Count -ne $state.pending.rows.Count){throw '未登记目标记录数与 pending 不一致，不自动恢复。'}
        $found=@{};$used=[Collections.Generic.HashSet[string]]::new()
        foreach($pending in $state.pending.rows){
            $candidates=@(foreach($r in $rows){
                $equal=$true
                foreach($id in $pending.fields.Keys){
                    $type=@($targetFields[$table.notionId]|Where-Object id -CEQ $id)[0].type
                    if(!(Values-Equal $pending.fields[$id] $r.fields[$id] $type)){$equal=$false;break}
                }
                if($equal){$r}
            })
            if($candidates.Count -ne 1 -or !$used.Add($candidates[0].id)){throw 'pending 无法按全部字段唯一匹配，不自动恢复。'}
            $found[$pending.notionId]=$candidates[0].id
        }
        foreach($id in $found.Keys){$state.recordMap[$id]=$found[$id]}
        $state.created+=$found.Count;$state.pending=$null;Save-DataState
        Write-Host "只读核对并恢复 $($found.Count) 条已落库记录映射，没有重复 POST。"
        return
    }
    if($Mode -eq 'CleanEmpty'){
        # 仅清理本轮已备份、用户明确批准的下料月计划空记录；逐条复查，绝不按数量猜测删除。
        $table=@($plan.tables|Where-Object name -eq '下料每月计划数据库')[0]
        $rows=Get-TargetRows $table;$index=@{};foreach($r in $rows){$index[$r.id]=$r}
        foreach($id in @($state.ignored[$table.notionId])){
            if(!$index.ContainsKey($id)){continue}
            $row=Invoke-Api $teable "$api/table/$($table.teableId)/record/$id" 
            foreach($field in $targetFields[$table.notionId]|Where-Object type -NotIn @('formula','rollup')){
                $v=$row.fields[$field.id]
                if($null -ne $v -and !($v -is [string] -and $v -eq '')){throw '待清理记录已填入数据，停止删除。'}
            }
            $null=Invoke-Api $teable "$api/table/$($table.teableId)/record/$id" 'DELETE'
            if(!$state.ContainsKey('deletedEmpty')){$state.deletedEmpty=@()}
            $state.deletedEmpty+=,$id;Save-DataState
        }
        $state.ignored[$table.notionId]=@();Save-DataState
        Write-Host "已清理 $($state.deletedEmpty.Count) 条确认的空记录。"
        return
    }
    function Get-Differences($Expected,$Actual,$Fields){
        $diff=@{}
        foreach($id in $Expected.Keys){
            $type=@($Fields|Where-Object id -CEQ $id)[0].type
            if(!(Values-Equal $Expected[$id] $Actual[$id] $type)){$diff[$id]=$Expected[$id]}
        }
        return $diff
    }
    function Verify-Primitives($Table){
        $rows=Get-TargetRows $Table;$index=@{};foreach($r in $rows){$index[$r.id]=$r}
        $source=$sources[$Table.notionId].records
        $rows=@($rows|Where-Object id -NotIn @($state.ignored[$Table.notionId]))
        if($rows.Count -ne $source.Count){throw "条数不一致：$($Table.name)"}
        foreach($r in $source){
            $id=$state.recordMap[$r.id]
            if(!$id -or !$index.ContainsKey($id)){throw "缺少记录映射：$($Table.name)"}
            $expected=Get-FieldsToWrite $r $Table $targetFields[$Table.notionId]
            $diff=Get-Differences $expected $index[$id].fields $targetFields[$Table.notionId]
            if($diff.Count){Write-Json 'verification-error.json' @{table=$Table.name;notionId=$r.id;teableId=$id;expected=$diff;actual=$index[$id].fields};throw "字段回读不一致：$($Table.name)"}
        }
        Write-Host "$($Table.name)：$($source.Count) 条基本字段逐值验证通过。"
    }
    if($Mode -ne 'Verify'){
        $tables=if($Mode -eq 'RepairWeld'){@($plan.tables|Where-Object name -In @('焊接数据库','焊接月计划数据库'))}else{$plan.tables}
        foreach($table in $tables){
            $rows=Get-TargetRows $table;$index=@{};foreach($r in $rows){$index[$r.id]=$r}
            $known=@($sources[$table.notionId].records|ForEach-Object {$state.recordMap[$_.id]}|Where-Object {$_})
            if(@($rows|Where-Object { $_.id -notin $known -and $_.id -notin @($state.ignored[$table.notionId]) }).Count){throw "目标存在未登记记录：$($table.name)"}
            $new=@()
            foreach($r in $sources[$table.notionId].records){
                $expected=Get-FieldsToWrite $r $table $targetFields[$table.notionId]
                if($state.recordMap.ContainsKey($r.id)){
                    $id=$state.recordMap[$r.id];if(!$index.ContainsKey($id)){throw '已有目标记录被删除，停止。'}
                    $diff=Get-Differences $expected $index[$id].fields $targetFields[$table.notionId]
                    if($diff.Count){
                        $null=Invoke-Api $teable "$api/table/$($table.teableId)/record/$id" 'PATCH' @{fieldKeyType='id';typecast=$false;record=@{fields=$diff}}
                        $state.updated++;Save-DataState
                    }
                }else{$new+=@{notionId=$r.id;fields=$expected}}
            }
            for($offset=0;$offset -lt $new.Count;$offset+=100){
                $batch=@($new|Select-Object -Skip $offset -First 100)
                $state.pending=@{tableId=$table.teableId;rows=$batch;startedAt=[DateTimeOffset]::Now.ToString('O')};Save-DataState
                $created=Invoke-Api $teable "$api/table/$($table.teableId)/record" 'POST' @{
                    fieldKeyType='id';typecast=$false;records=@($batch|ForEach-Object {@{fields=$_.fields}})}
                if($created.records.Count -ne $batch.Count){throw '创建响应数量不一致，保留 pending 以供核对。'}
                for($i=0;$i -lt $batch.Count;$i++){
                    $diff=Get-Differences $batch[$i].fields $created.records[$i].fields $targetFields[$table.notionId]
                    if($diff.Count){throw '创建响应字段/顺序不符，保留 pending。'}
                    $state.recordMap[$batch[$i].notionId]=$created.records[$i].id
                }
                $state.created+=$batch.Count;$state.pending=$null;Save-DataState
                Write-Host "$($table.name)：本轮新增 $([Math]::Min($offset+100,$new.Count))/$($new.Count)"
            }
            Verify-Primitives $table
        }
        if($Mode -eq 'RepairWeld'){Write-Host '焊接修复及字段复验完成。';return}
        # 所有记录 ID 已生成后回填关系；不写反向端，避免重复边和来回覆盖。
        $completedRelations=[Collections.Generic.HashSet[string]]::new()
        foreach($table in $plan.tables){
            foreach($m in $table.fields|Where-Object notionType -eq relation){
                if(!$completedRelations.Add($m.field.id)){continue}
                $field=@($targetFields[$table.notionId]|Where-Object id -CEQ $m.field.id)[0]
                $null=$completedRelations.Add($field.options.symmetricFieldId)
                $rows=Get-TargetRows $table;$index=@{};foreach($r in $rows){$index[$r.id]=$r}
                foreach($r in $sources[$table.notionId].records){
                    $p=Get-Property $r $m;$wanted=@()
                    foreach($link in $p.relation){if(!$state.recordMap.ContainsKey($link.id)){throw '关联目标未迁移。'};$wanted+=$state.recordMap[$link.id]}
                    $id=$state.recordMap[$r.id];$actual=@($index[$id].fields[$m.field.id]|ForEach-Object id)
                    if((($wanted|Sort-Object)-join ',') -cne (($actual|Sort-Object)-join ',')){
                        $fields=@{};$fields[$m.field.id]=if($wanted.Count){@($wanted|ForEach-Object {@{id=$_}})}else{$null}
                        $null=Invoke-Api $teable "$api/table/$($table.teableId)/record/$id" 'PATCH' @{fieldKeyType='id';typecast=$false;record=@{fields=$fields}}
                        $state.linksUpdated++;Save-DataState
                    }
                }
                Write-Host "$($table.name)/$($m.field.name)：关联已核对并回填。"
            }
        }
    }
    $report=@();$computedDifferences=[Collections.Generic.List[object]]::new();$textNormalizations=@()
    foreach($table in $plan.tables){
        Verify-Primitives $table
        $rows=Get-TargetRows $table;$index=@{};foreach($r in $rows){$index[$r.id]=$r}
        foreach($r in $sources[$table.notionId].records){
            $actual=$index[$state.recordMap[$r.id]]
            foreach($m in $table.fields|Where-Object notionType -eq rich_text){
                $p=Get-Property $r $m;$original=($p.rich_text|ForEach-Object plain_text)-join ''
                if([string]$original -cne [string]$actual.fields[$m.field.id]){
                    $textNormalizations+=@{table=$table.name;notionId=$r.id;field=$m.field.name;reason='Teable 自动去除多行文本首尾空白，原文保留在源快照'}
                }
            }
            foreach($m in $table.fields|Where-Object notionType -In @('relation','rollup','formula')){
                $p=Get-Property $r $m;$v=$actual.fields[$m.field.id]
                if($m.notionType -eq 'relation'){
                    $want=@($p.relation|ForEach-Object {$state.recordMap[$_.id]})
                    if((($want|Sort-Object)-join ',') -cne ((@($v|ForEach-Object id)|Sort-Object)-join ',')){throw "关联回读不一致：$($table.name)"}
                }else{
                    $value=$p[$m.notionType];$expected=$value[$value.type]
                    $equal=if($value.type -eq 'number'){Values-Equal $expected $v 'number'}elseif($value.type -eq 'boolean'){
                        if($null -eq $expected -or $null -eq $v){$null -eq $expected -and $null -eq $v}else{[bool]$expected -eq [bool]$v}
                    }else{$expected -ceq $v}
                    if(!$equal){$computedDifferences.Add(@{table=$table.name;field=$m.field.name;notionId=$r.id;expected=$expected;actual=$v})}
                }
            }
        }
        Write-Json "$($table.notionId)-after.json" @{fields=$targetFields[$table.notionId];records=$rows}
        $report+=@{name=$table.name;count=$rows.Count;tableId=$table.teableId}
    }
    Write-Json 'verification.json' @{verifiedAt=[DateTimeOffset]::Now.ToString('O');tables=$report;created=$state.created;
        updated=$state.updated;linksUpdated=$state.linksUpdated;computedDifferences=$computedDifferences.ToArray();textNormalizations=$textNormalizations}
    if($computedDifferences.Count){throw "基础字段和关联通过，但有 $($computedDifferences.Count) 个计算值差异，详见本地验证报告。"}
    Write-Host "迁移验证通过：累计新增 $($state.created)，修正 $($state.updated)，关联更新 $($state.linksUpdated)。"
} finally {$teable.Dispose()}
