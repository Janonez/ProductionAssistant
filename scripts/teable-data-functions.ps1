# 数据转换和比较：保留 null/0、文本、日期时间精度；网络分页仅由入口显式调用。
function Read-Data($Path) { return Get-Content -LiteralPath $Path -Raw | ConvertFrom-Json -AsHashtable -DateKind String }
function Get-TargetRows($Table) {
    $rows=[Collections.Generic.List[object]]::new();$skip=0
    do {
        $page=Invoke-Api $teable "$api/table/$($Table.teableId)/record?fieldKeyType=id&take=1000&skip=$skip"
        foreach($row in $page.records){$rows.Add($row)}
        $skip+=$page.records.Count
    } while($page.records.Count -eq 1000)
    if(@($rows.id|Sort-Object -Unique).Count -ne $rows.Count){throw '目标分页含重复记录，请重新核对。'}
    return ,$rows.ToArray()
}
function Get-Property($Row,$Mapping) {
    $p=@($Row.properties.Values|Where-Object { [Uri]::UnescapeDataString($_.id) -ceq [Uri]::UnescapeDataString($Mapping.notionId) })
    if($p.Count -ne 1 -or $p[0].type -ne $Mapping.notionType){throw "源属性缺失或类型变化：$($Mapping.field.name)"}
    return $p[0]
}
function Convert-Date($Value) {
    if(!$Value){return $null}
    if($Value -match '^\d{4}-\d{2}-\d{2}$'){return $Value+'T00:00:00+08:00'}
    return $Value
}
function Get-FieldsToWrite($Row,$Table,$TargetFields) {
    $result=@{}
    foreach($m in $Table.fields|Where-Object notionType -NotIn @('relation','rollup','formula')) {
        $p=Get-Property $Row $m
        $value=switch($m.notionType){
            'title' {($p.title|ForEach-Object plain_text)-join ''}
            'rich_text' {($p.rich_text|ForEach-Object plain_text)-join ''}
            'number' {$p.number}
            'select' {$p.select.name}
            'status' {$p.status.name}
            'date' {Convert-Date $p.date.start}
            default {throw "未适配数据类型 $($m.notionType)"}
        }
        $result[$m.field.id]=$value
        if($m.notionType -eq 'date'){
            if($m.endField.id -in $TargetFields.id){$result[$m.endField.id]=Convert-Date $p.date.end}
            elseif($p.date.end){throw '日期存在结束值但目标结束字段已被删除，停止以防丢失区间。'}
        }
    }
    return $result
}
function Values-Equal($Expected,$Actual,[string]$Type) {
    # Teable 的 LongTextFieldCore.convertStringToCellValue 会 trim 两端空白。
    # 仅对这一已确认的类型接受平台规范化；原始文本仍完整保存在源快照，报告单列差异。
    if($Type -eq 'longText'){return ([string]$Expected).Trim() -ceq [string]$Actual}
    if($Type -eq 'singleLineText'){return [string]$Expected -ceq [string]$Actual}
    if($null -eq $Expected -or $null -eq $Actual){return $null -eq $Expected -and $null -eq $Actual}
    if($Type -eq 'date'){
        $e=if($Expected -is [datetime]){[DateTimeOffset]::new($Expected)}else{[DateTimeOffset]::Parse($Expected)}
        $a=if($Actual -is [datetime]){[DateTimeOffset]::new($Actual)}else{[DateTimeOffset]::Parse($Actual)}
        return $e.UtcTicks -eq $a.UtcTicks
    }
    if($Type -eq 'number'){return [decimal]$Expected -eq [decimal]$Actual}
    return $Expected -ceq $Actual
}
