# 只转换当前生产库确实使用的规则；未知筛选/排序必须停止，不能删条件后扩大结果集。
function Find-ViewField($Table, [string]$Id) {
    $matches=@($Table.fields | Where-Object { [Uri]::UnescapeDataString($_.notionId) -ceq [Uri]::UnescapeDataString($Id) })
    if($matches.Count -ne 1){throw "视图引用了未迁移字段：$Id"}
    return $matches[0]
}
function Convert-ViewFilter($Table, $Filter) {
    if($null -eq $Filter){return $null}
    foreach($join in @('and','or')) {
        if($Filter.ContainsKey($join)) {
            return @{conjunction=$join;filterSet=@($Filter[$join] | ForEach-Object {Convert-ViewFilter $Table $_})}
        }
    }
    $field=Find-ViewField $Table $Filter.property
    $keys=@($Filter.Keys | Where-Object {$_ -ne 'property'})
    if($keys.Count -ne 1){throw '不支持的 Notion 筛选规则。'}
    $type=$keys[0];$condition=$Filter[$type]
    if($condition.Count -ne 1){throw '不支持的复合筛选条件。'}
    $op=@($condition.Keys)[0];$value=$condition[$op]
    if($type -eq 'select' -and $field.notionType -eq 'select') {
        $operator=switch($op){'equals'{'is'} 'does_not_equal'{'isNot'} default{throw "不支持的选项筛选：$op"}}
    } elseif($type -eq 'date' -and $field.notionType -eq 'date' -and $op -eq 'on_or_before' -and $value -eq 'today') {
        $operator='isOnOrBefore';$value=@{mode='today';timeZone='Asia/Shanghai'}
    } else {throw "不支持的筛选类型：$type/$op"}
    return @{fieldId=$field.field.id;operator=$operator;value=$value}
}
function New-TeableViewPlan($Snapshot) {
    $views=@();$omitted=@()
    foreach($entry in $Snapshot.tables) {
        $table=$entry.table
        foreach($view in $entry.views) {
            if($view.type -ne 'table'){throw "不支持的视图类型：$($view.type)"}
            $sorts=@()
            foreach($sort in $view.sorts) {
                $field=Find-ViewField $table $sort.property
                $order=switch($sort.direction){'ascending'{'asc'} 'descending'{'desc'} default{throw '不支持的排序方向。'}}
                $sorts+=@{fieldId=$field.field.id;order=$order}
            }
            $columns=@{};$order=0;$frozen=0;$originalIndex=0
            foreach($property in $view.configuration.properties) {
                $fields=@($table.fields | Where-Object { [Uri]::UnescapeDataString($_.notionId) -ceq [Uri]::UnescapeDataString($property.property_id) })
                if($fields.Count -eq 0){$omitted+=@{viewId=$view.id;propertyId=$property.property_id;reason='Notion 已删除字段的显示配置'};$originalIndex++;continue}
                $column=@{order=$order;hidden=(!$property.visible)}
                if($property.ContainsKey('width')){$column.width=$property.width}
                $columns[$fields[0].field.id]=$column
                if($view.configuration.ContainsKey('frozen_column_index') -and $originalIndex -le $view.configuration.frozen_column_index){$frozen++}
                $order++;$originalIndex++
            }
            # 日期结束列是迁移新增的拆分列，不改变原视图可见列；追加并隐藏。
            foreach($field in $table.fields) {
                $ids=@($field.field.id)
                if($field.ContainsKey('endField')){$ids+= $field.endField.id}
                foreach($id in $ids | Where-Object {$_ -in @($entry.fields.id)}) {
                    if(!$columns.ContainsKey($id)){$columns[$id]=@{order=$order;hidden=$true};$order++}
                }
            }
            $options=@{frozenColumnCount=$frozen;rowHeight='short'}
            if($view.configuration['wrap_cells']){$options.rowHeight='tall'}
            $body=@{name=$view.name;type='grid';description="NotionView:$($view.id)";columnMeta=$columns;options=$options;sort=@{sortObjs=$sorts;manualSort=$false}}
            $filter=Convert-ViewFilter $table $view.filter
            # Notion API 对这些视图漏报本年下界；实际查询只包含当年记录。
            # 保持动态年份，不能固化 2026-01-01。执行阶段仍逐个比对源视图记录集合。
            if($view.name.Trim() -eq '本年截止今日') {
                $dateRules=@($view.filter['and'] | Where-Object { $_.ContainsKey('date') -and $_.date['on_or_before'] -eq 'today' })
                if($dateRules.Count -ne 1){throw '本年截止今日视图规则已变化，请重新确认年份口径。'}
                $dateField=Find-ViewField $table $dateRules[0].property
                $filter=@{conjunction='and';filterSet=@($filter,@{fieldId=$dateField.field.id;operator='isOnOrAfter';value=@{mode='currentYear';timeZone='Asia/Shanghai'}})}
            }
            if($null -ne $filter){$body.filter=$filter}
            $views+=@{notionId=$view.id;sourceId=$table.notionId;tableId=$table.teableId;name=$view.name;body=$body}
        }
    }
    return @{views=$views;omittedColumns=$omitted}
}
