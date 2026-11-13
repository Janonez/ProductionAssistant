import { useEffect, useId, useRef, useState } from 'react'
import { toast } from 'sonner'
import { invoke } from '../../bridge/index'
import { Alert, AlertDescription } from '../../components/ui/alert'
import { Card } from '../../components/ui/card'
import { Collapsible, CollapsibleContent } from '../../components/ui/collapsible'
import { Field, FieldError, FieldLabel } from '../../components/ui/field'
import { Input } from '../../components/ui/input'
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemSeparator } from '../../components/ui/item'
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Switch } from '../../components/ui/switch'
import { ToggleGroup, ToggleGroupItem } from '../../components/ui/toggle-group'
import { documentLink } from './DocumentConnectionAlert'
import type { TencentSessionStatus } from '../daily-report/tencent-sheet/TencentSessionPanel'
import type { BusinessDataOption, ExecutionRules, SubmissionSettingsAdapter } from './business-configuration.types'
import type { SubmissionJob, SubmissionRun } from './types'

const weekdays = [{ value: 1, label: '一' }, { value: 2, label: '二' }, { value: 3, label: '三' }, { value: 4, label: '四' }, { value: 5, label: '五' }, { value: 6, label: '六' }, { value: 0, label: '日' }]
const validTime = (value: string) => /^([01]\d|2[0-3]):[0-5]\d$/.test(value)
const rowClass = 'min-h-14 rounded-none border-0'
type ValidationErrors = { time?: string; retryUntil?: string; weekdays?: string }

export function SubmissionExecutionRules({ adapter, job, dataOptions = [] }: { adapter: SubmissionSettingsAdapter; job?: SubmissionJob; dataOptions?: readonly BusinessDataOption[] }) {
  const [rules, setRules] = useState<ExecutionRules>(() => adapter.readRuleDraft())
  const [time, setTime] = useState(rules.time), [retryUntil, setRetryUntil] = useState(rules.retryUntil)
  const [missingData, setMissingData] = useState(rules.missingData)
  const [busy, setBusy] = useState(false), [error, setError] = useState('')
  const [validation, setValidation] = useState<ValidationErrors>({})
  const [businesses, setBusinesses] = useState(() => adapter.readBusinessDrafts())
  const [loginRequired, setLoginRequired] = useState(false)
  const [lastRun, setLastRun] = useState<SubmissionRun>(), [historyState, setHistoryState] = useState('loading')
  const contentId = useId()
  const inFlight = useRef(false)
  const mounted = useRef(false)
  useEffect(() => { mounted.current = true; return () => { mounted.current = false } }, [])
  useEffect(() => adapter.subscribeBusinessDrafts(() => setBusinesses(adapter.readBusinessDrafts())), [adapter])
  useEffect(() => {
    let active = true
    setLastRun(undefined)
    if (!job?.id) { setHistoryState('loaded'); return }
    setHistoryState('loading')
    invoke<{ runs: SubmissionRun[] }>('tencentSheet.runs', { id: job.id }).then(result => {
      if (!Array.isArray(result?.runs)) throw new Error('执行记录响应无效')
      if (active) {
        setLastRun(result.runs.filter(run => run.time && run.status && Number.isFinite(Date.parse(run.time))).sort((a, b) => Date.parse(b.time) - Date.parse(a.time))[0])
        setHistoryState('loaded')
      }
    }).catch(() => { if (active) setHistoryState('error') })
    return () => { active = false }
  }, [job?.id])
  useEffect(() => {
    let active = true
    setLoginRequired(false)
    const target = documentLink(job?.config.documentUrl ?? '')
    if (!rules.automatic || !target) return
    const refresh = () => {
      void invoke<TencentSessionStatus>('tencentSheet.sessionStatus', { documentUrl: target }, 60000).then(status => {
        if (active) setLoginRequired(status?.browserOpen === true && status.authentication === 'required')
      }).catch(() => { if (active) setLoginRequired(false) })
    }
    refresh(); window.addEventListener('focus', refresh)
    return () => { active = false; window.removeEventListener('focus', refresh) }
  }, [job?.config.documentUrl, rules.automatic])
  const hasBusiness = businesses.some(business => dataOptions.some(option => option.value === business.dataSource?.value) && business.position.status === 'configured' && business.position.first.cell && business.position.second.cell)
  function validate(value: ExecutionRules) {
    const errors: ValidationErrors = {}
    if (!validTime(value.time)) errors.time = '请输入有效时间，格式为 HH:mm'
    if (!validTime(value.retryUntil)) errors.retryUntil = '请输入有效时间，格式为 HH:mm'
    else if (value.missingData === 'wait' && validTime(value.time) && value.retryUntil <= value.time) errors.retryUntil = '最晚时间必须晚于执行时间'
    if (!value.weekdays.length) errors.weekdays = '至少选择一个执行日'
    return errors
  }
  async function save(value: ExecutionRules) {
    if (inFlight.current) return
    const errors = validate(value)
    setValidation(errors)
    if (Object.keys(errors).length) return
    inFlight.current = true; setBusy(true); setError('')
    try {
      const saved = await adapter.saveRules(value)
      if (mounted.current) {
        setRules(saved); setTime(saved.time); setRetryUntil(saved.retryUntil); setMissingData(saved.missingData)
        if (adapter.isMock) toast.info('仅保留在当前页面，尚未保存到后端', { id: 'submission-rules-saved' })
        else toast.success('已保存', { id: 'submission-rules-saved' })
      }
    } catch (failure) {
      if (mounted.current) {
        const restored = adapter.readRuleDraft()
        setRules(restored); setTime(restored.time); setRetryUntil(restored.retryUntil); setMissingData(restored.missingData)
        setError(failure instanceof Error ? failure.message : '保存失败，请重试')
      }
    }
    finally { inFlight.current = false; if (mounted.current) setBusy(false) }
  }
  function change(patch: Partial<ExecutionRules>) { return save({ ...rules, time, retryUntil, missingData, ...patch }) }
  function commitTime() {
    const candidate = { ...rules, time, retryUntil, missingData }
    if (time !== rules.time || retryUntil !== rules.retryUntil || missingData !== rules.missingData) void save(candidate)
    else setValidation(validate(candidate))
  }
  return <section aria-labelledby="execution-rules-title" className="min-w-0 space-y-3">
    <h2 id="execution-rules-title" className="text-base font-semibold">执行规则</h2>
    <Card className="gap-0 overflow-hidden py-0 shadow-none">
      <Collapsible open={rules.automatic}>
        <ItemGroup><Item size="sm" role="listitem" className={rowClass}>
          <ItemContent className="min-w-0"><FieldLabel htmlFor="submission-auto">自动填报</FieldLabel>
            <ItemDescription className="line-clamp-none text-xs">下次执行：— · 上次：{historyState === 'loading' ? '读取中…' : historyState === 'error' ? '读取失败' : lastRun ? `${lastRun.time} ${lastRun.status}` : '尚未执行'}</ItemDescription>
          </ItemContent>
          <ItemActions className="ml-auto"><Switch id="submission-auto" checked={rules.automatic} aria-controls={contentId} aria-expanded={rules.automatic} disabled={busy} onCheckedChange={automatic => change({ automatic })} /></ItemActions>
        </Item></ItemGroup>
        <CollapsibleContent id={contentId} className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up motion-reduce:animate-none">
          <ItemSeparator />
          {(loginRequired || !hasBusiness) && <div className="space-y-2 px-4 pt-3">
            {loginRequired && <Alert variant="destructive"><AlertDescription>未登录，下次自动填报会失败</AlertDescription></Alert>}
            {!hasBusiness && <Alert><AlertDescription>没有可填报的业务，自动填报不会填任何内容</AlertDescription></Alert>}
          </div>}
          <ItemGroup>
            <Item size="sm" role="listitem" className={rowClass}>
              <Field orientation="horizontal" className="flex-wrap gap-x-4 gap-y-2" data-invalid={!!validation.time}>
                <FieldLabel htmlFor="submission-time">执行时间</FieldLabel>
                <div className="ml-auto flex items-center gap-2"><span>每天</span><Input id="submission-time" className="h-8 w-24" inputMode="numeric" placeholder="HH:mm" maxLength={5} value={time} disabled={busy} aria-invalid={!!validation.time} aria-describedby={validation.time ? 'submission-time-error' : undefined} onChange={event => setTime(event.target.value)} onBlur={commitTime} onKeyDown={event => { if (event.key === 'Enter') { event.preventDefault(); commitTime() } }} /></div>
                <FieldError id="submission-time-error" className="basis-full">{validation.time}</FieldError>
              </Field>
            </Item>
            <ItemSeparator />
            <Item size="sm" role="listitem" className={rowClass}>
              <ItemContent className="min-w-0"><span id="submission-weekdays-label" className="font-medium">执行日</span></ItemContent>
              <ItemActions className="ml-auto min-w-0"><ToggleGroup type="multiple" variant="outline" size="sm" aria-labelledby="submission-weekdays-label" value={rules.weekdays.map(String)} disabled={busy} onValueChange={values => {
                if (!values.length) { setValidation(current => ({ ...current, weekdays: '至少选择一个执行日' })); return }
                void change({ weekdays: values.map(Number) })
              }}>{weekdays.map(day => <ToggleGroupItem key={day.value} value={String(day.value)} aria-label={'星期' + day.label} className="px-2.5">{day.label}</ToggleGroupItem>)}</ToggleGroup></ItemActions>
              <FieldError className="basis-full">{validation.weekdays}</FieldError>
            </Item>
            <ItemSeparator />
            <Item size="sm" role="listitem" className={rowClass + ' items-start'}>
              <ItemContent className="min-w-0"><span id="submission-missing-data-label" className="font-medium">昨日数据没录完时</span></ItemContent>
              <Field className="min-w-0 flex-1 basis-72 gap-3">
                <RadioGroup value={missingData} disabled={busy} aria-labelledby="submission-missing-data-label" onValueChange={value => { const mode = value as ExecutionRules['missingData']; setMissingData(mode); void change({ missingData: mode }) }}>
                  <div className="flex items-center gap-2"><RadioGroupItem id="submission-wait" value="wait" /><FieldLabel htmlFor="submission-wait">等到录完再填</FieldLabel></div>
                  {missingData === 'wait' && <div className="ml-6 flex min-w-0 flex-wrap items-center gap-2">
                    <span>每</span><Select value={String(rules.retryMinutes)} disabled={busy} onValueChange={value => change({ retryMinutes: Number(value) as ExecutionRules['retryMinutes'] })}>
                      <SelectTrigger aria-label="重试间隔" size="sm" className="w-28"><SelectValue /></SelectTrigger>
                      <SelectContent>{[5, 10, 15, 30].map(minutes => <SelectItem key={minutes} value={String(minutes)}>{minutes} 分钟</SelectItem>)}</SelectContent>
                    </Select><span>重试，最晚到</span>
                    <Input id="submission-retry-until" aria-label="最晚时间" className="h-8 w-24" inputMode="numeric" maxLength={5} placeholder="HH:mm" value={retryUntil} disabled={busy} aria-invalid={!!validation.retryUntil} aria-describedby={validation.retryUntil ? 'submission-retry-error' : undefined} onChange={event => setRetryUntil(event.target.value)} onBlur={commitTime} onKeyDown={event => { if (event.key === 'Enter') { event.preventDefault(); commitTime() } }} />
                  </div>}
                  <div className="flex items-center gap-2"><RadioGroupItem id="submission-skip" value="skip" /><FieldLabel htmlFor="submission-skip">直接跳过，并通知我</FieldLabel></div>
                </RadioGroup>
                <FieldError id="submission-retry-error">{validation.retryUntil}</FieldError>
              </Field>
            </Item>
            <ItemSeparator />
            <Item size="sm" role="listitem" className={rowClass}><ItemContent className="min-w-0"><FieldLabel htmlFor="submission-notify">失败或需要登录时，钉钉通知我</FieldLabel></ItemContent><ItemActions className="ml-auto"><Switch id="submission-notify" checked={rules.notify} disabled={busy} onCheckedChange={notify => change({ notify })} /></ItemActions></Item>
            <ItemSeparator />
            <Item size="sm" role="listitem" className={rowClass}><ItemContent className="min-w-0"><FieldLabel htmlFor="submission-catch-up">错过执行时间，启动应用时补跑</FieldLabel></ItemContent><ItemActions className="ml-auto"><Switch id="submission-catch-up" checked={rules.catchUp} disabled={busy} onCheckedChange={catchUp => change({ catchUp })} /></ItemActions></Item>
          </ItemGroup>
        </CollapsibleContent>
      </Collapsible>
    </Card>
    {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
  </section>
}
