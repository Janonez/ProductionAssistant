import { useEffect, useId, useState } from 'react'
import { useLocalData } from '../../app/LocalData'
import { Alert, AlertDescription } from '../../components/ui/alert'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { Collapsible, CollapsibleContent } from '../../components/ui/collapsible'
import { Field, FieldError, FieldLabel } from '../../components/ui/field'
import { Input } from '../../components/ui/input'
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemSeparator } from '../../components/ui/item'
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group'
import { Switch } from '../../components/ui/switch'
import { ToggleGroup, ToggleGroupItem } from '../../components/ui/toggle-group'
import type { ConfigurationSaveResult, ExecutionRules, SaveConfiguration, SubmissionConfiguration } from './business-configuration.types'
import type { SubmissionJob, SubmissionRun } from './types'

const weekdays = [{ value: 1, label: '一' }, { value: 2, label: '二' }, { value: 3, label: '三' }, { value: 4, label: '四' }, { value: 5, label: '五' }, { value: 6, label: '六' }, { value: 0, label: '日' }]
const validTime = (value: string) => /^([01]\d|2[0-3]):[0-5]\d$/.test(value)
const rowClass = 'min-h-14 rounded-none border-0'
const nextRunFormat = new Intl.DateTimeFormat('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
type RuleDraft = Omit<ExecutionRules, 'retryMinutes'> & { retryMinutes: string }
const toDraft = (rules: ExecutionRules): RuleDraft => ({ ...rules, retryMinutes: String(rules.retryMinutes) })

function validate(value: RuleDraft) {
  const errors: Record<string, string> = {}
  if (!validTime(value.time)) errors['rules.time'] = '请输入有效时间，格式为 HH:mm'
  if (!value.weekdays.length) errors['rules.weekdays'] = '至少选择一个执行日'
  if (!/^\d+$/.test(value.retryMinutes) || Number(value.retryMinutes) <= 0 || Number(value.retryMinutes) > 2147483647)
    errors['rules.retryMinutes'] = '重试间隔必须为正整数'
  if (!validTime(value.retryUntil)) errors['rules.retryUntil'] = '请输入有效时间，格式为 HH:mm'
  else if (value.missingData === 'wait' && validTime(value.time) && value.retryUntil <= value.time)
    errors['rules.retryUntil'] = '最晚时间必须晚于执行时间'
  return errors
}

export function SubmissionExecutionRules({ configuration, save, refresh, job, loginRequired = false }: {
  configuration: SubmissionConfiguration
  save: SaveConfiguration
  refresh: () => Promise<SubmissionConfiguration | undefined>
  job?: SubmissionJob
  loginRequired?: boolean
}) {
  const local = useLocalData()
  const [draft, setDraft] = useState<Partial<RuleDraft>>()
  const [saving, setSaving] = useState(false)
  const [failure, setFailure] = useState<ConfigurationSaveResult>()
  const [retryManually, setRetryManually] = useState(false)
  const [lastRun, setLastRun] = useState<SubmissionRun>(), [historyState, setHistoryState] = useState('loading')
  const contentId = useId()
  const stored = toDraft(configuration.rules)
  const rules = { ...stored, ...draft }
  const validation = draft ? validate(rules) : {}
  const hasErrors = Object.keys(validation).length > 0
  const errors = { ...failure?.fieldErrors, ...validation }
  const expanded = rules.automatic || !!(draft && (hasErrors || failure?.fieldErrors))

  useEffect(() => {
    let active = true
    setLastRun(undefined)
    if (!job?.id) { setHistoryState('loaded'); return }
    setHistoryState('loading')
    local.read<{ runs: SubmissionRun[] }>('tencentSheet.runs', { id: job.id }).then(result => {
      if (!Array.isArray(result?.runs)) throw new Error('执行记录响应无效')
      if (active) {
        setLastRun(result.runs.filter(run => run.time && run.status && Number.isFinite(Date.parse(run.time))).sort((a, b) => Date.parse(b.time) - Date.parse(a.time))[0])
        setHistoryState('loaded')
      }
    }).catch(() => { if (active) setHistoryState('error') })
    return () => { active = false }
  }, [job?.id])

  useEffect(() => {
    if (!draft || saving || failure || retryManually || hasErrors) return
    const timer = window.setTimeout(async () => {
      setSaving(true)
      const result = await save({ rules: { ...rules, retryMinutes: Number(rules.retryMinutes) } })
      if (result.configuration) setDraft(current => {
        if (!current || current === draft) return undefined
        const newerEdits = Object.entries(current).filter(([key, value]) => value !== draft[key as keyof RuleDraft])
        return newerEdits.length ? Object.fromEntries(newerEdits) : undefined
      })
      else setFailure(result)
      setSaving(false)
    }, 400)
    return () => window.clearTimeout(timer)
  }, [configuration.rules, draft, saving, failure, retryManually, hasErrors, save])

  function change(patch: Partial<RuleDraft>) {
    if (!failure?.conflict) setFailure(undefined)
    setDraft(current => ({ ...current, ...patch }))
  }

  async function refreshAfterConflict() {
    if (!await refresh()) return
    setRetryManually(true)
    setFailure(undefined)
  }

  const nextRun = configuration.nextRunAt ? nextRunFormat.format(new Date(configuration.nextRunAt)) : '—'
  const status = failure ? '保存失败' : retryManually ? '有未保存的修改' : draft && hasErrors ? '待修正' : draft || saving ? '保存中…' : '已保存'
  const timeError = errors['rules.time'], weekdaysError = errors['rules.weekdays'], untilError = errors['rules.retryUntil'], intervalError = errors['rules.retryMinutes']
  return <section aria-labelledby="execution-rules-title" className="min-w-0 space-y-3">
    <div className="flex items-center justify-between gap-3"><h2 id="execution-rules-title" className="text-base font-semibold">执行规则</h2>
      <span role="status" className={failure ? 'text-sm text-destructive' : 'text-sm text-muted-foreground'}>{status}</span></div>
    {failure && <Alert variant="destructive"><AlertDescription>{failure.error ?? '执行规则保存失败，请重试。'}
      {failure.conflict ? <Button variant="outline" size="sm" onClick={() => void refreshAfterConflict()}>刷新配置</Button> : !failure.fieldErrors && <Button variant="outline" size="sm" onClick={() => setFailure(undefined)}>重试保存</Button>}
    </AlertDescription></Alert>}
    {retryManually && <Alert><AlertDescription>已刷新配置。请核对当前修改后再重试保存。<Button variant="outline" size="sm" disabled={hasErrors} onClick={() => setRetryManually(false)}>重试保存</Button></AlertDescription></Alert>}
    <Card className="gap-0 overflow-hidden py-0 shadow-none">
      <Collapsible open={expanded}>
        <ItemGroup><Item size="sm" role="listitem" className={rowClass}>
          <ItemContent className="min-w-0"><FieldLabel htmlFor="submission-auto">自动填报</FieldLabel>
            <ItemDescription className="line-clamp-none text-xs">下次执行：{nextRun} · 上次：{historyState === 'loading' ? '读取中…' : historyState === 'error' ? '读取失败' : lastRun ? `${lastRun.time} ${lastRun.status}` : '尚未执行'}{!expanded && ` · 计划时间：${stored.time}`}</ItemDescription>
          </ItemContent>
          <ItemActions className="ml-auto"><Switch id="submission-auto" checked={rules.automatic} aria-controls={contentId} aria-expanded={expanded} onCheckedChange={automatic => change({ automatic })} /></ItemActions>
          <FieldError className="basis-full">{errors['rules.automatic']}</FieldError>
        </Item></ItemGroup>
        <CollapsibleContent id={contentId} className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up motion-reduce:animate-none">
          <ItemSeparator />
          {(loginRequired || !configuration.hasBusiness) && <div className="space-y-2 px-4 pt-3">
            {loginRequired && <Alert variant="destructive"><AlertDescription>请先登录腾讯文档</AlertDescription></Alert>}
            {!configuration.hasBusiness && <Alert><AlertDescription>没有可填报的业务，自动填报不会填任何内容</AlertDescription></Alert>}
          </div>}
          <ItemGroup>
            <Item size="sm" role="listitem" className={rowClass}>
              <Field orientation="horizontal" className="flex-wrap gap-x-4 gap-y-2" data-invalid={!!timeError}>
                <FieldLabel htmlFor="submission-time">执行时间</FieldLabel>
                <div className="ml-auto flex items-center gap-2"><Input id="submission-time" className="h-8 w-24" inputMode="numeric" placeholder="HH:mm" maxLength={5} value={rules.time} aria-invalid={!!timeError} aria-describedby={timeError ? 'submission-time-error' : undefined} onChange={event => change({ time: event.target.value })} /></div>
                <FieldError id="submission-time-error" className="basis-full">{timeError}</FieldError>
              </Field>
            </Item>
            <ItemSeparator />
            <Item size="sm" role="listitem" className={rowClass}>
              <ItemContent className="min-w-0"><span id="submission-weekdays-label" className="font-medium">执行日</span></ItemContent>
              <ItemActions className="ml-auto min-w-0"><ToggleGroup type="multiple" variant="outline" size="sm" aria-labelledby="submission-weekdays-label" aria-invalid={!!weekdaysError} aria-describedby={weekdaysError ? 'submission-weekdays-error' : undefined} value={rules.weekdays.map(String)} onValueChange={values => change({ weekdays: values.map(Number) })}>{weekdays.map(day => <ToggleGroupItem key={day.value} value={String(day.value)} aria-label={'星期' + day.label} className="px-2.5">{day.label}</ToggleGroupItem>)}</ToggleGroup></ItemActions>
              <FieldError id="submission-weekdays-error" className="basis-full">{weekdaysError}</FieldError>
            </Item>
            <ItemSeparator />
            <Item size="sm" role="listitem" className={rowClass + ' items-start'}>
              <ItemContent className="min-w-0"><span id="submission-missing-data-label" className="font-medium">昨日数据没录完时</span></ItemContent>
              <Field className="min-w-0 flex-1 basis-72 gap-3">
                <RadioGroup value={rules.missingData} aria-labelledby="submission-missing-data-label" onValueChange={value => {
                  const missingData = value as ExecutionRules['missingData']
                  change({ missingData, ...(missingData === 'skip' && {
                    retryUntil: validTime(rules.retryUntil) ? rules.retryUntil : stored.retryUntil,
                    retryMinutes: intervalError ? stored.retryMinutes : rules.retryMinutes,
                  }) })
                }}>
                  <div className="flex items-center gap-2"><RadioGroupItem id="submission-wait" value="wait" /><FieldLabel htmlFor="submission-wait">等到录完再填</FieldLabel></div>
                  {rules.missingData === 'wait' && <div className="ml-6 flex min-w-0 flex-wrap items-center gap-2">
                    <span>每</span><Input type="number" min={1} aria-label="重试间隔" aria-invalid={!!intervalError} aria-describedby={intervalError ? 'submission-interval-error' : undefined} className="h-8 w-20" value={rules.retryMinutes} onChange={event => change({ retryMinutes: event.target.value })} /><span>分钟重试，最晚到</span>
                    <Input id="submission-retry-until" aria-label="最晚时间" className="h-8 w-24" inputMode="numeric" maxLength={5} placeholder="HH:mm" value={rules.retryUntil} aria-invalid={!!untilError} aria-describedby={untilError ? 'submission-retry-error' : undefined} onChange={event => change({ retryUntil: event.target.value })} />
                  </div>}
                  <div className="flex items-center gap-2"><RadioGroupItem id="submission-skip" value="skip" /><FieldLabel htmlFor="submission-skip">直接跳过并通知我</FieldLabel></div>
                </RadioGroup>
                {rules.missingData === 'skip' && <p className="text-xs text-muted-foreground">通知功能待接入</p>}
                <FieldError id="submission-missing-data-error">{errors['rules.missingData']}</FieldError>
                <FieldError id="submission-interval-error">{intervalError}</FieldError>
                <FieldError id="submission-retry-error">{untilError}</FieldError>
              </Field>
            </Item>
          </ItemGroup>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  </section>
}
