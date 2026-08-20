import { useEffect, useMemo, useRef, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, CheckCircle2, Database, LoaderCircle, Settings2, ShieldCheck, X } from 'lucide-react'
import { invoke } from './bridge'
import { ChoicePicker, ReportDatePicker } from './FormPickers'
import type { BindingState, BindingTarget, Draft, ImportResult } from './types'
import { WorkflowProgress, type WorkflowStepTransition } from './WorkflowProgress'

type MessageStep = 0 | 1 | 2 | 3
type NoticeValue = { tone: string; title: string; message: string }
const steps = ['粘贴解析', '核对结果', '检查数据库', '确认写入']
const errorNotice = (error: unknown): NoticeValue => ({ tone: 'error', title: '操作失败', message: error instanceof Error ? error.message : String(error) })

export function ProductionMessagePage() {
  const [text, setText] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [drafts, setDrafts] = useState<Draft[]>([])
  const [selected, setSelected] = useState(0)
  const [busy, setBusy] = useState<'parse' | 'check' | 'write'>()
  const [notice, setNotice] = useState<NoticeValue>()
  const [overwrite, setOverwrite] = useState(false)
  const [overwriteConfirmed, setOverwriteConfirmed] = useState(false)
  const [checked, setChecked] = useState(false)
  const [checkResult, setCheckResult] = useState<ImportResult>()
  const [bindings, setBindings] = useState<BindingState>()
  const [bindingsError, setBindingsError] = useState('')
  const [bindingOpen, setBindingOpen] = useState(false)
  const [plans, setPlans] = useState<string[]>([])
  const [planValues, setPlanValues] = useState<Record<string, string>>({})
  const [currentStep, setCurrentStep] = useState<MessageStep>(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [transition, setTransition] = useState<WorkflowStepTransition>()
  const transitionTimer = useRef<number | undefined>(undefined)
  const reduced = useReducedMotion()

  const refreshBindings = () => {
    setBindingsError('')
    return invoke<BindingState>('production.getBindings').then(setBindings).catch(error => setBindingsError(error instanceof Error ? error.message : String(error)))
  }
  useEffect(() => { refreshBindings() }, [])
  useEffect(() => () => { if (transitionTimer.current) window.clearTimeout(transitionTimer.current) }, [])

  function advanceTo(step: MessageStep) {
    if (transition || step === currentStep) return
    const nextDirection: 1 | -1 = step > currentStep ? 1 : -1
    setDirection(nextDirection)
    if (reduced) { setCurrentStep(step); return }
    const next: WorkflowStepTransition = { from: currentStep, target: step, direction: nextDirection, phase: 'node' }
    setTransition(next)
    transitionTimer.current = window.setTimeout(() => {
      setTransition({ ...next, phase: 'rail' })
      transitionTimer.current = window.setTimeout(() => {
        setCurrentStep(step)
        setTransition({ ...next, phase: 'arrive' })
        transitionTimer.current = window.setTimeout(() => setTransition(undefined), 320)
      }, 440)
    }, nextDirection > 0 ? 320 : 240)
  }

  async function parse() {
    if (!text.trim()) { setNotice({ tone: 'warning', title: '还没有消息', message: '请先粘贴一条或多条生产消息。' }); return }
    setBusy('parse'); setNotice(undefined); setOverwrite(false); setOverwriteConfirmed(false); setChecked(false); setCheckResult(undefined)
    try {
      const parsed = await invoke<Draft[]>('production.parse', { text, defaultDate: date })
      setDrafts(parsed); setSelected(0)
      if (!parsed.length) { setNotice({ tone: 'warning', title: '没有解析结果', message: '请检查消息格式后重试。' }); return }
      advanceTo(1)
    } catch (error) { setNotice(errorNotice(error)) } finally { setBusy(undefined) }
  }

  function invalidateCheck(message = '解析结果已经修改，请重新检查数据库。') {
    setChecked(false); setCheckResult(undefined); setOverwrite(false); setOverwriteConfirmed(false)
    setNotice({ tone: 'warning', title: '检查结果已失效', message })
  }
  function changeDraft(position: number, value: Draft) {
    setDrafts(items => items.map((item, index) => index === position ? { ...value, statusText: value.canWrite ? '待检查' : value.statusText, warningText: value.canWrite ? '' : value.warningText } : item))
    if (checked) invalidateCheck()
  }

  function applyResult(result: ImportResult, source = drafts) {
    setDrafts(source.map(draft => {
      const item = result.items.find(value => value.index === draft.index)
      return item ? { ...draft, statusText: statusLabel(item.status), warningText: item.message } : draft
    }))
    const needsOverwrite = result.items.some(item => item.status === 'existing' || item.status === 'conflict')
    setOverwrite(needsOverwrite); setOverwriteConfirmed(false); setCheckResult(result)
  }

  async function check() {
    setBusy('check'); setNotice(undefined)
    try {
      const result = await invoke<ImportResult>('production.check', { drafts, defaultDate: date })
      applyResult(result); setChecked(true)
      setNotice({ tone: result.succeeded ? 'success' : 'warning', title: result.succeeded ? '检查完成，可以正常写入' : '检查完成，有待处理项目', message: result.message })
    } catch (error) { setChecked(false); setNotice(errorNotice(error)) } finally { setBusy(undefined) }
  }

  async function write(monthlyPlans?: Record<string, number>) {
    setBusy('write'); setNotice(undefined)
    try {
      const result = await invoke<ImportResult>('production.write', { drafts, defaultDate: date, overwriteExisting: overwrite, monthlyPlans }, 120000)
      applyResult(result)
      if (result.requiredMonths.length) { setPlans(result.requiredMonths); setPlanValues({}); return }
      setNotice({ tone: result.succeeded ? 'success' : 'warning', title: result.succeeded ? '写入完成' : '写入结果', message: result.message })
    } catch (error) { setNotice(errorNotice(error)) } finally { setBusy(undefined) }
  }

  const selectedDraft = drafts[selected]
  const hasWritable = useMemo(() => drafts.some(draft => draft.canWrite), [drafts])
  const counts = useMemo(() => checkResult?.items.reduce<Record<string, number>>((result, item) => ({ ...result, [item.status]: (result[item.status] || 0) + 1 }), {}) || {}, [checkResult])
  const motionProps = reduced ? { initial: false as const } : { initial: { opacity: 0, x: direction * 28, filter: 'blur(5px)' }, animate: { opacity: 1, x: 0, filter: 'blur(0px)', transitionEnd: { transform: 'none', filter: 'none' } }, exit: { opacity: 0, x: direction * -20, filter: 'blur(4px)' }, transition: { duration: .3, ease: [0.16, 1, 0.3, 1] as const } }

  return <div className="page message-page message-workbench">
    <header className="message-header"><div><span className="eyebrow">数据同步</span><h1>生产消息入库</h1><p>按顺序解析、核对、检查数据库，再安全写入 Notion。</p></div><button className="secondary" onClick={() => setBindingOpen(true)}><Settings2 />数据源设置</button></header>
    {bindingsError && <Notice value={{ tone: 'error', title: '数据源读取失败', message: bindingsError }} close={() => setBindingsError('')} />}
    <WorkflowProgress label="生产消息入库进度" steps={steps} currentStep={currentStep} direction={direction} transition={transition} busy={!!busy} />
    <div className="message-stage"><AnimatePresence mode="wait" initial={false}><motion.section key={currentStep} className="surface message-focus-card" {...motionProps}>
      {currentStep === 0 && <InputStep text={text} date={date} busy={busy === 'parse'} notice={notice} setText={setText} setDate={setDate} parse={parse} />}
      {currentStep === 1 && selectedDraft && <ReviewStep drafts={drafts} selected={selected} setSelected={setSelected} draft={selectedDraft} notice={notice} change={value => changeDraft(selected, value)} back={() => advanceTo(0)} next={() => { setNotice(undefined); advanceTo(2) }} />}
      {currentStep === 2 && <CheckStep drafts={drafts} result={checkResult} counts={counts} busy={busy === 'check'} notice={notice} checked={checked} back={() => advanceTo(1)} check={check} next={() => advanceTo(3)} />}
      {currentStep === 3 && <WriteStep drafts={drafts} result={checkResult} overwrite={overwrite} confirmed={overwriteConfirmed} setConfirmed={setOverwriteConfirmed} busy={busy === 'write'} notice={notice} back={() => advanceTo(2)} write={() => write()} hasWritable={hasWritable} />}
    </motion.section></AnimatePresence></div>
    <BindingDialog open={bindingOpen} state={bindings} close={() => setBindingOpen(false)} saved={() => { setBindingOpen(false); refreshBindings() }} />
    <MonthlyPlanDialog plans={plans} values={planValues} setValues={setPlanValues} close={() => setPlans([])} submit={values => { setPlans([]); write(values) }} />
  </div>
}

function InputStep({ text, date, busy, notice, setText, setDate, parse }: { text: string; date: string; busy: boolean; notice?: NoticeValue; setText: (value: string) => void; setDate: (value: string) => void; parse: () => void }) {
  return <><StepHeading title="粘贴并解析生产消息" text="支持一条或多段消息。默认日期只补充没有明确日期的单条消息，不覆盖原文日期。" />
    <div className="parse-toolbar"><div><strong>解析基准</strong><span>批量消息仍需分别包含业务日期；解析不会查询或写入 Notion。</span></div><label>默认日期<ReportDatePicker value={date} onChange={setDate} /></label></div>
    <label className="message-textarea">生产消息<textarea value={text} onChange={event => setText(event.target.value)} placeholder="在这里粘贴生产消息…" /></label>
    {notice && <Notice value={notice} />}
    <div className="focus-actions"><button className="primary" disabled={busy} onClick={parse}>{busy && <LoaderCircle className="spin" />}{busy ? '正在解析…' : '解析并继续'}</button></div></>
}

function ReviewStep({ drafts, selected, setSelected, draft, notice, change, back, next }: { drafts: Draft[]; selected: number; setSelected: (value: number) => void; draft: Draft; notice?: NoticeValue; change: (value: Draft) => void; back: () => void; next: () => void }) {
  const fields = writablePreviewFields(draft)
  return <><StepHeading title="核对解析结果" text="从左侧逐条检查，必要时修改业务日期。写入位置由消息类型和已绑定数据库自动确定。" />
    <div className="message-review"><aside className="message-queue"><div className="queue-heading"><strong>消息队列</strong><span>{drafts.length} 条</span></div>{drafts.map((item, index) => <button key={item.index} className={index === selected ? 'active' : ''} onClick={() => setSelected(index)}><span className="queue-index">{item.index}</span><span><strong>{item.typeDisplay}</strong><small>{item.businessDate || '日期待确认'}</small></span><i className={`queue-state ${statusTone(item.statusText)}`} /></button>)}</aside>
      <div className="message-detail"><div className="detail-heading"><h3>第 {draft.index} 条 · {draft.typeDisplay}</h3><span className={`status ${statusTone(draft.statusText)}`}>{draft.statusText}</span></div><div className="draft-controls"><label>业务日期<ReportDatePicker value={draft.businessDate} onChange={businessDate => change({ ...draft, businessDate })} /></label><div className="database-route-field"><span>写入位置</span><div className="database-route"><Database /><strong>{draft.typeDisplay}</strong></div></div></div><div className="write-field-heading"><strong>将写入的字段</strong><span>仅显示数据库已映射且本次有值的字段</span></div>{fields.length ? <div className="field-grid">{fields.map(field => <div key={field.key}><span>{field.label}</span><strong>{field.value}</strong></div>)}</div> : <p className="empty-write-fields">未解析到目标数据库中可写入的字段，请返回修改原文或检查数据源绑定。</p>}{draft.warningText && <p className={`result-text ${statusTone(draft.statusText)}`}>{draft.warningText}</p>}</div></div>
    {notice && <Notice value={notice} />}
    <div className="focus-actions split"><button className="ghost" onClick={back}><ArrowLeft />返回修改原文</button><button className="primary" disabled={!drafts.some(item => item.canWrite)} onClick={next}>确认核对</button></div></>
}

function CheckStep({ drafts, result, counts, busy, notice, checked, back, check, next }: { drafts: Draft[]; result?: ImportResult; counts: Record<string, number>; busy: boolean; notice?: NoticeValue; checked: boolean; back: () => void; check: () => void; next: () => void }) {
  return <><StepHeading title="检查数据库" text="正式写入前单独查询 Notion，识别新增、已有、一致和冲突数据。" />
    <div className="check-layout"><div><div className="check-summary"><Summary value={counts.ready || 0} label="可新增" /><Summary value={counts.unchanged || 0} label="数据一致" /><Summary value={counts.existing || 0} label="已有数据" /><Summary value={counts.conflict || 0} label="存在冲突" /></div><div className="check-results">{result ? drafts.map(draft => <div key={draft.index}><span>第 {draft.index} 条</span><p><strong>{draft.typeDisplay}</strong><small>{draft.warningText || '可以写入'}</small></p><span className={`status ${statusTone(draft.statusText)}`}>{draft.statusText}</span></div>) : <div className="check-empty"><Database /><p><strong>尚未查询数据库</strong><small>点击“开始检查”获取写入前状态。</small></p></div>}</div></div><aside className="check-explainer"><ShieldCheck /><h3>为什么单独检查？</h3><p>解析只判断消息内容；数据库检查负责发现已有记录。返回修改任何字段后，当前结果立即失效，写入时服务端仍会再次核对。</p></aside></div>
    {notice && <Notice value={notice} />}
    <div className="focus-actions split"><button className="ghost" onClick={back}><ArrowLeft />返回核对</button><span><button className="secondary" disabled={busy} onClick={check}>{busy && <LoaderCircle className="spin" />}{busy ? '正在检查…' : checked ? '重新检查' : '开始检查'}</button><button className="primary" disabled={!checked || busy} onClick={next}>查看写入确认</button></span></div></>
}

function WriteStep({ drafts, result, overwrite, confirmed, setConfirmed, busy, notice, back, write, hasWritable }: { drafts: Draft[]; result?: ImportResult; overwrite: boolean; confirmed: boolean; setConfirmed: (value: boolean) => void; busy: boolean; notice?: NoticeValue; back: () => void; write: () => void; hasWritable: boolean }) {
  const affected = result?.items.filter(item => item.status === 'existing' || item.status === 'conflict').length || 0
  return <><StepHeading title="确认本批写入" text="这是最后一步。复查数据库范围和冲突处理方式，再执行整批写入。" />
    <div className="write-summary">{overwrite && <div className="overwrite-warning"><span>!</span><div><strong>本批包含 {affected} 条已有或冲突数据</strong><p>继续后将按当前批次覆盖对应记录。</p></div></div>}<div className="write-details"><h3>写入摘要</h3><div><span>下料日报数据库</span><strong>{drafts.filter(draft => draft.kind === 'MaterialCutting').length} 条</strong></div><div><span>塔筒产线日报库</span><strong>{drafts.filter(draft => draft.kind === 'TowerLineDaily').length} 条</strong></div><div><span>业务日期</span><strong>{[...new Set(drafts.map(draft => draft.businessDate))].join('、')}</strong></div></div>{overwrite && <label className="overwrite-confirm"><input type="checkbox" checked={confirmed} onChange={event => setConfirmed(event.target.checked)} />我已核对冲突条目，确认整批写入并覆盖已有数据。</label>}</div>
    {notice && <Notice value={notice} />}
    <div className="focus-actions split"><button className="ghost" onClick={back}><ArrowLeft />返回检查结果</button><button className={overwrite ? 'danger' : 'primary'} disabled={busy || !hasWritable || (overwrite && !confirmed)} onClick={write}>{busy && <LoaderCircle className="spin" />}{busy ? '正在写入…' : overwrite ? '确认覆盖并写入' : '确认写入'}</button></div></>
}

function StepHeading({ title, text }: { title: string; text: string }) { return <div className="message-step-heading"><h2>{title}</h2><p>{text}</p></div> }
function Summary({ value, label }: { value: number; label: string }) { return <div><strong>{value}</strong><span>{label}</span></div> }
function Notice({ value, close }: { value: NoticeValue; close?: () => void }) { return <div className={`notice ${value.tone}`} role={value.tone === 'error' ? 'alert' : 'status'}><CheckCircle2 /><div><strong>{value.title}</strong><span>{value.message}</span></div>{close && <button aria-label="关闭提示" onClick={close}><X /></button>}</div> }
function Status({ label, target }: { label: string; target?: BindingTarget }) { return <div className={`binding-status ${target && !target.bound ? 'missing' : ''}`}><CheckCircle2 /><div><span>{label}</span><strong>{target ? (target.bound ? target.name : '未绑定') : '正在读取…'}</strong>{target?.bound && <small>{target.path}</small>}</div></div> }

function BindingDialog({ open, state, close, saved }: { open: boolean; state?: BindingState; close: () => void; saved: () => void }) {
  const keys = [['cutting', '下料日报数据库（可选）'], ['towerDaily', '塔筒产线日报库'], ['towerMonthly', '塔筒每月累计库'], ['towerYearly', '塔筒每年累计库']] as const
  const [selected, setSelected] = useState<Record<string, string>>({}); const [busy, setBusy] = useState(false); const [error, setError] = useState('')
  useEffect(() => { if (open) setSelected(state?.selected || {}) }, [open, state])
  async function save() { setBusy(true); setError(''); try { await invoke('production.saveBindings', selected, 120000); saved() } catch (cause) { setError(cause instanceof Error ? cause.message : String(cause)) } finally { setBusy(false) } }
  return <Dialog.Root open={open} onOpenChange={value => !value && close()}><Dialog.Portal><Dialog.Overlay className="dialog-overlay"/><Dialog.Content className="dialog binding-dialog"><Dialog.Title>Notion 数据源设置</Dialog.Title><Dialog.Description>选择业务数据对应的数据库，保存时检测所需字段。</Dialog.Description><div className="binding-overview"><div><h3>下料消息</h3><Status label="下料日报" target={state?.cutting} /></div><div><h3>塔筒消息</h3><div className="binding-chain"><Status label="产线日报" target={state?.towerDaily} /><span>→</span><Status label="每月累计" target={state?.towerMonthly} /><span>→</span><Status label="每年累计" target={state?.towerYearly} /></div></div></div>{keys.map(([key, label]) => <label key={key}>{label}<ChoicePicker value={selected[key] || ''} placeholder={key === 'cutting' ? '不绑定' : '请选择'} options={(state?.sources || []).map(source => ({ value: source.id, label: source.path }))} onChange={sourceId => setSelected(value => ({ ...value, [key]: sourceId }))} /></label>)}{error && <p className="warning-text">{error}</p>}<div className="dialog-actions"><button className="ghost" onClick={close}>取消</button><button className="primary" disabled={busy || !selected.towerDaily || !selected.towerMonthly || !selected.towerYearly} onClick={save}>{busy ? '检测中…' : '检测并保存'}</button></div></Dialog.Content></Dialog.Portal></Dialog.Root>
}

function MonthlyPlanDialog({ plans, values, setValues, close, submit }: { plans: string[]; values: Record<string, string>; setValues: (value: Record<string, string>) => void; close: () => void; submit: (value: Record<string, number>) => void }) {
  const parsed = Object.fromEntries(plans.map(month => [month, Number(values[month])]))
  return <Dialog.Root open={plans.length > 0}><Dialog.Portal><Dialog.Overlay className="dialog-overlay"/><Dialog.Content className="dialog"><Dialog.Title>补充月预计产量</Dialog.Title><Dialog.Description>创建下料月数据前需要补充预计产量（吨）。</Dialog.Description>{plans.map(month => <label key={month}>{month}<input type="number" min="0" value={values[month] || ''} onChange={event => setValues({ ...values, [month]: event.target.value })}/></label>)}<div className="dialog-actions"><button className="ghost" onClick={close}>取消</button><button className="primary" disabled={!Object.values(parsed).every(Number.isFinite)} onClick={() => submit(parsed)}>创建并继续</button></div></Dialog.Content></Dialog.Portal></Dialog.Root>
}

function statusLabel(status: string) { return ({ ready: '可写入', existing: '已有数据', created: '已创建', updated: '已更新', unchanged: '数据一致', conflict: '存在冲突', monthly_plan_required: '待填月计划', error: '处理失败' } as Record<string, string>)[status] || status }
function statusTone(status: string) { return ['可写入', '数据一致', '已创建', '已更新', 'ready', 'success'].includes(status) ? 'success' : ['处理失败', '存在冲突', 'error', 'conflict'].includes(status) ? 'error' : 'warning' }
const nonBusinessPreviewKeys = new Set(['raw_message', 'message_type', 'parser_version'])
function writablePreviewFields(draft: Draft) { return draft.previewFields.filter(field => !nonBusinessPreviewKeys.has(field.key) && field.value.trim() && field.value !== '—') }
