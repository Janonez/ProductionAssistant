# 只负责纯转换，不访问网络。未知字段或公式直接停止，禁止静默降级为文本。
function New-TeableSchemaPlan($Snapshot, [string]$BaseId) {
    $names = @('焊接数据库','焊接月计划数据库','下料每月计划数据库','下料数据库',
        '原材料入库数据库','塔筒产线数据库','塔筒产线月计划数据库','机加工数据库','发运量数据库')
    $sources = @($Snapshot.sources | Where-Object { $_.name -in $names })
    if ($sources.Count -ne $names.Count -or @($sources.name | Sort-Object -Unique).Count -ne $names.Count) {
        throw '生产库清单变化或缺失，请重新核对迁移范围。'
    }
    $tables = @()
    foreach ($source in $sources) {
        $fields = @()
        foreach ($property in $source.schema.properties.Values | Sort-Object { if ($_.type -eq 'title') { 0 } else { 1 } }) {
            $hash = [Convert]::ToHexString([Security.Cryptography.SHA256]::HashData(
                [Text.Encoding]::UTF8.GetBytes("$BaseId/$($source.id)/$($property.id)"))).ToLowerInvariant()
            $field = @{ id='fld' + $hash.Substring(0,16); name=$property.name;
                description="Notion 属性 $($property.id)（$($property.type)）" }
            if ($property.description) { $field.description += "`n$($property.description)" }
            $mapping = @{ notionId=$property.id; notionType=$property.type; field=$field; source=$property }
            switch ($property.type) {
                'title' { $field.type = 'singleLineText' }
                'rich_text' { $field.type = 'longText' }
                'number' {
                    if ($property.number.format -ne 'number') { throw "需要显式适配数值格式：$($property.name)" }
                    $field.type = 'number'
                    $field.options = @{ formatting=@{ type='decimal'; precision=2 } }
                }
                'date' {
                    $field.type = 'date'
                    $field.options = @{ formatting=@{ date='YYYY-MM-DD'; time='None'; timeZone='Asia/Shanghai' } }
                    # Notion 的每个日期属性均可保存区间；不读取业务数据来猜测是否使用了 end。
                    $mapping.endField = @{ id='fld' + $hash.Substring(16,16); name=$property.name + '（结束）';
                        type='date'; options=$field.options;
                        description="Notion 属性 $($property.id) 的 end；单日日期留空，原字段保存 start。" }
                }
                { $_ -in @('select','status') } {
                    $field.type = 'singleSelect'
                    $colors = @{ default='grayLight1'; gray='grayLight1'; brown='orangeLight2'; orange='orangeLight1';
                        yellow='yellowLight1'; green='greenLight1'; blue='blueLight1'; purple='purpleLight1'; pink='pinkLight1'; red='redLight1' }
                    $field.options = @{ choices=@($property[$property.type].options | ForEach-Object {
                        @{ name=$_.name; color=$colors[$_.color] }
                    }); preventAutoNewOptions=$true }
                    if ($property.type -eq 'status') {
                        $field.description += "`nNotion 状态分组（仅保留元数据）：" + (ConvertTo-Json -InputObject $property.status.groups -Depth 6 -Compress)
                    }
                }
                'relation' {
                    if ($property.relation.type -ne 'dual_property' -or $property.relation.data_source_id -notin $sources.id) {
                        throw "关联目标不在本轮生产库范围或不是双向关联：$($property.name)"
                    }
                    $field.type = 'link'
                }
                'rollup' {
                    if ($property.rollup.function -ne 'sum') { throw "未适配汇总函数：$($property.name)" }
                    $field.type = 'rollup'
                }
                'formula' {
                    $field.type = 'formula'
                    $expression = $property.formula.expression -replace '\s+', ''
                    $lastYear = 'lets(d,prop("日期"),lastYearToday,dateSubtract(today(),1,"years"),lastYearStart,parseDate(formatDate(lastYearToday,"YYYY")+"-01-01"),and(d>=lastYearStart,d<=lastYearToday))'
                    if ($source.name -eq '原材料入库数据库' -and $expression -ceq $lastYear) {
                        $mapping.formulaKind = 'lastYearToDate'
                        $mapping.dateName = '日期'
                    } elseif ($expression -cmatch '^dateBetween\(dateEnd\(prop\("(.+)"\)\),dateStart\(prop\("\1"\)\),"days"\)\+1$') {
                        $mapping.formulaKind = 'inclusiveDays'
                        $mapping.dateName = $Matches[1]
                    } else { throw "未适配 Notion 公式：$($source.name)/$($property.name)" }
                    $field.description += "`n原始公式：$($property.formula.expression)"
                }
                default { throw "不支持字段类型：$($property.type)" }
            }
            $fields += $mapping
        }
        if (@($fields | Where-Object notionType -eq 'title').Count -ne 1) { throw '每张表必须恰好有一个标题字段。' }
        $tables += @{ notionId=$source.id; name=$source.name; path=$source.path; fields=$fields;
            marker="ProductionAssistant Notion schema: $($source.id)" }
    }
    return @{ version=1; baseId=$BaseId; tables=$tables }
}

function Set-TeableDerivedFields($Plan) {
    foreach ($table in $Plan.tables) {
        foreach ($mapping in $table.fields) {
            $field = $mapping.field
            if ($mapping.notionType -eq 'formula') {
                $date = @($table.fields | Where-Object { $_.field.name -ceq $mapping.dateName })
                if ($date.Count -ne 1 -or $date[0].notionType -ne 'date') { throw '公式依赖日期不存在。' }
                $start = '{' + $date[0].field.id + '}'
                if ($mapping.formulaKind -eq 'lastYearToDate') {
                    $expression = "AND($start != BLANK(), YEAR($start) = YEAR(DATE_ADD(TODAY(), -1, 'year')), $start <= DATE_ADD(TODAY(), -1, 'year'))"
                } else {
                    $end = '{' + $date[0].endField.id + '}'
                    # 将 IF 放在数值结果外层：本机引擎对日期 IF 返回值再次换算时区，会多出 8 小时。
                    $expression = "IF($start = BLANK(), BLANK(), IF($end = BLANK(), 1, DATETIME_DIFF($end, $start, 'days') + 1))"
                }
                $field.options = @{ expression=$expression; timeZone='Asia/Shanghai' }
            } elseif ($mapping.notionType -eq 'rollup') {
                $rollup = $mapping.source.rollup
                $relation = @($table.fields | Where-Object notionId -CEQ $rollup.relation_property_id)
                if ($relation.Count -ne 1) { throw '汇总依赖关联不存在。' }
                $foreign = @($Plan.tables | Where-Object notionId -eq $relation[0].source.relation.data_source_id)
                $value = @($foreign[0].fields | Where-Object notionId -CEQ $rollup.rollup_property_id)
                if ($value.Count -ne 1 -or $value[0].field.type -ne 'number') { throw '求和目标必须为数值字段。' }
                $field.options = @{ expression='sum({values})'; formatting=@{ type='decimal'; precision=2 } }
                $field.lookupOptions = @{ foreignTableId=$foreign[0].teableId; linkFieldId=$relation[0].field.id; lookupFieldId=$value[0].field.id }
            }
        }
    }
}
