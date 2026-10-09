#requires -Version 7.0
$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'teable-schema-plan.ps1')
function Assert($Condition, $Message) { if (!$Condition) { throw $Message } }
$names = @('焊接数据库','焊接月计划数据库','下料每月计划数据库','下料数据库','原材料入库数据库',
    '塔筒产线数据库','塔筒产线月计划数据库','机加工数据库','发运量数据库')
$sources = @(for ($index=0; $index -lt $names.Count; $index++) {
    @{ id="source$index"; name=$names[$index]; path=$names[$index]; schema=@{ properties=@{
        title=@{ id='title'; name='名称'; type='title'; description=$null }
    } } }
})
$sources[7].schema.properties.date = @{ id='date'; name='实际加工时间'; type='date'; description=$null }
$sources[7].schema.properties.formula = @{ id='formula'; name='实际加工'; type='formula'; description=$null;
    formula=@{ expression='dateBetween(dateEnd(prop("实际加工时间")),dateStart(prop("实际加工时间")),"days")+1' } }
$sources[4].schema.properties.date = @{ id='date'; name='日期'; type='date'; description=$null }
$sources[4].schema.properties.formula = @{ id='formula'; name='去年同期'; type='formula'; description=$null;
    formula=@{ expression='lets(d,prop("日期"),lastYearToday,dateSubtract(today(),1,"years"),lastYearStart,parseDate(formatDate(lastYearToday,"YYYY")+"-01-01"),and(d>=lastYearStart,d<=lastYearToday))' } }
$plan = New-TeableSchemaPlan @{sources=$sources} 'bseTest'
Set-TeableDerivedFields $plan
$date = @($plan.tables[7].fields | Where-Object notionType -eq 'date')[0]
$formula = @($plan.tables[7].fields | Where-Object notionType -eq 'formula')[0]
Assert ($date.endField.id -ne $date.field.id) '日期起止字段必须独立。'
Assert ($formula.field.options.expression.Contains($date.endField.id)) '天数公式必须引用结束日期。'
Assert ($formula.field.options.expression.Contains('BLANK()')) '单日与空日期必须有明确处理。'
Assert (!$formula.field.options.expression.Contains('DATETIME_DIFF(IF(')) '日期差不能包入日期 IF 分支，避免实例时区重复转换。'
$yearFormula = @($plan.tables[4].fields | Where-Object notionType -eq 'formula')[0]
Assert ($yearFormula.field.options.expression.Contains('DATE_ADD(')) '必须使用 Teable 实际支持的 DATE_ADD。'
$ids = @($plan.tables.fields.field.id)
Assert (@($ids | Sort-Object -Unique).Count -eq $ids.Count) '跨表字段 ID 冲突。'
$second = New-TeableSchemaPlan @{sources=$sources} 'bseTest'
Assert ($second.tables[7].fields[0].field.id -eq $plan.tables[7].fields[0].field.id) '重复计划的 ID 不稳定。'
$sources[7].schema.properties.formula.formula.expression = '未知公式()'
$rejected = $false
try { $null = New-TeableSchemaPlan @{sources=$sources} 'bseTest' } catch { $rejected = $true }
Assert $rejected '未知公式必须在写入前拒绝。'
Write-Host 'Teable 结构计划检查通过：日期区间、公式依赖、稳定 ID、未知公式拦截。'
