$ErrorActionPreference='Stop'
. "$PSScriptRoot/teable-view-plan.ps1"
$table=@{notionId='source';teableId='tblTest';fields=@(@{notionId='X%3B%5EB';notionType='date';field=@{id='fldDate'}},@{notionId='select';notionType='select';field=@{id='fldSelect'}})}
$filter=Convert-ViewFilter $table @{and=@(@{property='X;^B';date=@{on_or_before='today'}},@{or=@(@{property='select';select=@{equals='设备一'}},@{property='select';select=@{does_not_equal='已上报'}})})}
if($filter.conjunction -ne 'and' -or $filter.filterSet[0].fieldId -ne 'fldDate' -or $filter.filterSet[0].value.mode -ne 'today' -or $filter.filterSet[0].value.timeZone -ne 'Asia/Shanghai' -or $filter.filterSet[1].filterSet[1].operator -ne 'isNot'){throw '筛选转换失败。'}
$stopped=$false
try{Convert-ViewFilter $table @{property='select';select=@{contains='设备'}} | Out-Null}catch{$stopped=$true}
if(!$stopped){throw '未知条件不得静默删除。'}
$stopped=$false
try{Convert-ViewFilter $table @{property='deleted';select=@{equals='设备'}} | Out-Null}catch{$stopped=$true}
if(!$stopped){throw '筛选中的缺失字段必须停止。'}
Write-Host 'Teable view filter checks passed.'
