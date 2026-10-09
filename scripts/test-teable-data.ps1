#requires -Version 7.5
$ErrorActionPreference='Stop'
. (Join-Path $PSScriptRoot 'teable-data-functions.ps1')
function Assert($Condition,$Message){if(!$Condition){throw $Message}}
Assert (!(Values-Equal $null 0 'number')) '空数值不能当作 0。'
Assert (!(Values-Equal 48.501 48.5 'number')) '不能按显示位数舍入源精度。'
Assert (Values-Equal 48.501 48.501 'number') '相同数值应相等。'
Assert (Values-Equal (Convert-Date '2026-06-01') '2026-05-31T16:00:00Z' 'date') '日期必须按北京时间对齐 UTC。'
Assert (!(Values-Equal '2026-06-01T00:00:00+08:00' '2026-06-01T01:00:00+08:00' 'date')) '不能只比年月日丢失时间。'
Assert (Values-Equal '用户名称 ' '用户名称' 'longText') '多行文本需识别平台 trim 行为。'
Assert (!(Values-Equal '用户 名称' '用户名 称' 'longText')) '不能忽略文本内部空格差异。'
$mapping=@{notionId='d';notionType='date';field=@{id='fldStart';name='日期'};endField=@{id='fldEnd'}}
$table=@{fields=@($mapping)}
$row=@{properties=@{date=@{id='d';type='date';date=@{start='2026-01-01';end='2026-01-03'}}}}
$result=Get-FieldsToWrite $row $table @(@{id='fldStart'},@{id='fldEnd'})
Assert ($result.fldEnd -eq '2026-01-03T00:00:00+08:00') '日期结束值必须保留。'
$blocked=$false
try{$null=Get-FieldsToWrite $row $table @(@{id='fldStart'})}catch{$blocked=$true}
Assert $blocked '目标结束字段缺失时必须阻止有范围的数据迁移。'
Write-Host '数据迁移转换检查通过：数值精度、空值、时区、文本规范化及日期区间防丢失。'
