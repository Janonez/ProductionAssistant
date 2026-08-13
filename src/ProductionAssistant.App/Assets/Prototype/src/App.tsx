import { useEffect, useMemo, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, Database, FileText, LoaderCircle, MessageSquareText, Settings2, Sparkles, WandSparkles, X } from 'lucide-react'
import { invoke } from './bridge'
import type { BindingState, BindingTarget, Draft, ImportResult, Overview, Route } from './types'
import { formatDate, monthGrid, parseDate, yearGrid } from './calendar'

const modules = [
  { title: '挂网计划 PDF', text: '审查计划并导出候选文件', icon: FileText, native: 'plan-pdf' },
  { title: '生产会资料拆分', text: '按项目整理生产会 Excel', icon: Sparkles, native: 'production-meeting' },
  { title: '每日焊接模拟', text: '生成并同步每日焊接数据', icon: WandSparkles, native: 'daily-weld' },
  { title: '生产消息入库', text: '解析消息、核对并写入 Notion', icon: MessageSquareText, native: 'production-message' },
  { title: '日报推送', text: '组合 Notion 数据并定时推送', icon: Database, native: 'daily-report' }
]

export function App() {
  const route = (new URLSearchParams(window.location.search).get('route') === 'production-message' ? 'production-message' : 'home') as Route
  const [overview, setOverview] = useState<Overview>()
  const reduced = useReducedMotion()
  useEffect(() => { invoke<Overview>('app.getOverview').then(setOverview).catch(() => undefined) }, [])
  const goNative = (tag: string) => invoke('app.navigateNative', { tag }).catch(() => undefined)
  return <div className="app-shell"><main>
      <AnimatePresence mode="wait">
        <motion.div key={route} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -6 }} transition={{ duration: .2 }}>
          {route === 'home' ? <HomePage overview={overview} native={goNative} /> : <ProductionMessagePage />}
        </motion.div>
      </AnimatePresence>
    </main></div>
}

function HomePage({ overview, native }: { overview?: Overview; native: (tag: string) => void }) {
  return <div className="page home-page">
    <header><div><span className="eyebrow">工作台</span><h1>今天要处理什么？</h1><p>常用生产流程集中在一个清爽、可预期的工作区。</p></div><div className={`readiness ${overview?.notionConfigured ? 'ready' : ''}`}><span />{overview?.notionConfigured ? 'Notion 已连接' : 'Notion 待配置'}</div></header>
    <section className="hero"><div><span className="hero-chip"><Sparkles />生产工作台</span><h2>更轻盈的生产工作流</h2><p>常用模块集中呈现，生产消息入库已接入现有业务能力。</p></div><button onClick={() => native('production-message')}>打开生产消息 <ChevronRight /></button></section>
    <div className="section-heading"><div><h2>业务模块</h2><p>保持原有模块边界，仅更新使用体验。</p></div></div>
    <section className="module-grid">{modules.map(({ title, text, icon: Icon, native: nativeTag }) =>
      <motion.button whileHover={{ y: -3 }} whileTap={{ scale: .99 }} key={title} onClick={() => native(nativeTag!)}>
        <span className="module-icon"><Icon /></span><span><strong>{title}</strong><small>{text}</small></span><ChevronRight className="chevron" />
      </motion.button>)}</section>
  </div>
}

function ProductionMessagePage() {
  const [text, setText] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [drafts, setDrafts] = useState<Draft[]>([])
  const [busy, setBusy] = useState<'parse' | 'check' | 'write'>()
  const [parseNotice, setParseNotice] = useState<{ tone: string; title: string; message: string }>()
  const [resultNotice, setResultNotice] = useState<{ tone: string; title: string; message: string }>()
  const [overwrite, setOverwrite] = useState(false)
  const [checked, setChecked] = useState(false)
  const [bindings, setBindings] = useState<BindingState>()
  const [bindingsError, setBindingsError] = useState('')
  const [bindingOpen, setBindingOpen] = useState(false)
  const [plans, setPlans] = useState<string[]>([])
  const [planValues, setPlanValues] = useState<Record<string, string>>({})
  const reduced = useReducedMotion()
  const refreshBindings = () => { setBindingsError(''); return invoke<BindingState>('production.getBindings').then(setBindings).catch(error => setBindingsError(error instanceof Error ? error.message : String(error))) }
  useEffect(() => { refreshBindings() }, [])
  const errorNotice = (error: unknown) => ({ tone: 'error', title: '操作失败', message: error instanceof Error ? error.message : String(error) })

  async function parse() {
    if (!text.trim()) return setParseNotice({ tone: 'warning', title: '还没有消息', message: '请先粘贴一条或多条生产消息。' })
    setBusy('parse'); setParseNotice(undefined); setResultNotice(undefined); setOverwrite(false); setChecked(false)
    try {
      const parsed = await invoke<Draft[]>('production.parse', { text, defaultDate: date })
      setDrafts(parsed)
      setParseNotice({ tone: 'success', title: '解析完成', message: `已解析 ${parsed.length} 条消息，请在下方核对结果。` })
    } catch (error) { setParseNotice(errorNotice(error)) } finally { setBusy(undefined) }
  }

  async function check() {
    setBusy('check'); setResultNotice(undefined)
    try {
      applyResult(await invoke<ImportResult>('production.check', { drafts, defaultDate: date }))
      setChecked(true)
    } catch (error) { setChecked(false); setResultNotice(errorNotice(error)) } finally { setBusy(undefined) }
  }

  function changeDraft(position: number, value: Draft) {
    setDrafts(items => items.map((item, index) => index === position ? { ...value, statusText: value.canWrite ? '待检查' : value.statusText, warningText: value.canWrite ? '' : value.warningText } : item))
    if (checked) setResultNotice({ tone: 'warning', title: '检查结果已失效', message: '解析结果已经修改，请重新检查数据库。' })
    setChecked(false); setOverwrite(false)
  }

  function applyResult(result: ImportResult, source = drafts) {
    setDrafts(source.map(draft => {
      const item = result.items.find(value => value.index === draft.index)
      return item ? { ...draft, statusText: statusLabel(item.status), warningText: item.message } : draft
    }))
    setOverwrite(result.items.some(item => item.status === 'existing' || item.status === 'conflict'))
    setResultNotice({ tone: result.succeeded ? 'success' : 'warning', title: result.succeeded ? '检查完成，可以正常写入' : '有待处理项目', message: result.message })
  }

  async function write(monthlyPlans?: Record<string, number>) {
    setBusy('write'); setResultNotice(undefined)
    try {
      const result = await invoke<ImportResult>('production.write', { drafts, defaultDate: date, overwriteExisting: overwrite, monthlyPlans }, 120000)
      applyResult(result)
      if (result.requiredMonths.length) {
        setPlans(result.requiredMonths); setPlanValues({}); return
      }
      setResultNotice({ tone: result.succeeded ? 'success' : 'warning', title: result.succeeded ? '写入完成' : '写入结果', message: result.message })
    } catch (error) { setResultNotice(errorNotice(error)) } finally { setBusy(undefined) }
  }

  const hasWritable = useMemo(() => drafts.some(d => d.canWrite), [drafts])
  const canWrite = checked && hasWritable && !busy
  return <div className="page message-page">
    <header><div><span className="eyebrow">数据同步</span><h1>生产消息入库</h1><p>解析消息，核对结果，检查数据库后再安全写入 Notion。</p></div></header>
    <section className="surface input-surface"><div className="surface-title"><div><span className="step">1</span><div><h2>粘贴生产消息</h2><p>支持一条或多段消息，批量消息需分别包含业务日期。</p></div></div></div>
      <textarea value={text} onChange={event => setText(event.target.value)} placeholder="在这里粘贴生产消息…" />
      <div className="actions"><label>默认日期<DatePicker value={date} onChange={setDate} /></label><button className="primary" disabled={!!busy} onClick={parse}>{busy === 'parse' ? <LoaderCircle className="spin" /> : <WandSparkles />}{busy === 'parse' ? '正在解析…' : '解析并预览'}</button></div>
      {parseNotice && <Notice value={parseNotice} close={() => setParseNotice(undefined)} />}
    </section>
    <AnimatePresence>{drafts.length > 0 && <motion.section className="surface results" initial={reduced ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
      <div className="surface-title"><div><span className="step">2</span><div><h2>核对解析结果</h2><p>{drafts.length} 条消息；修改后需要重新检查数据库。</p></div></div><div className="result-actions"><button className="secondary" disabled={!hasWritable || !!busy} onClick={check}>{busy === 'check' && <LoaderCircle className="spin" />}{busy === 'check' ? '正在检查…' : '检查是否存在'}</button><button className={overwrite ? 'danger' : 'primary'} disabled={!canWrite} onClick={() => write()}>{busy === 'write' && <LoaderCircle className="spin" />}{busy === 'write' ? (overwrite ? '正在覆盖并写入…' : '正在写入…') : (overwrite ? '确认覆盖已有数据' : '确认写入')}</button></div></div>
      {resultNotice && <Notice value={resultNotice} close={() => setResultNotice(undefined)} />}
      <div className="draft-list">{drafts.map((draft, position) => <DraftCard key={draft.index} draft={draft} onChange={value => changeDraft(position, value)} />)}</div>
    </motion.section>}</AnimatePresence>
    <section className="surface config"><div className="surface-title"><div><span className="step"><Settings2 /></span><div><h2>数据源配置</h2><p>操作区之后集中管理生产消息使用的 Notion 数据库。</p></div></div><button className="secondary" onClick={() => setBindingOpen(true)}>管理绑定</button></div>
      {bindingsError && <p className="warning-text">数据源配置读取失败：{bindingsError}</p>}
      <div className="binding-flow"><div><h3>下料消息</h3><p>解析出的下料日报数据写入以下数据库（可选）。</p><Status label="下料日报" target={bindings?.cutting} /></div><div><h3>塔筒消息</h3><p>日报写入后关联月、年累计数据。</p><div className="binding-chain"><Status label="产线日报" target={bindings?.towerDaily} /><span>→</span><Status label="每月累计" target={bindings?.towerMonthly} /><span>→</span><Status label="每年累计" target={bindings?.towerYearly} /></div></div></div>
    </section>
    <BindingDialog open={bindingOpen} state={bindings} close={() => setBindingOpen(false)} saved={() => { setBindingOpen(false); refreshBindings() }} />
    <Dialog.Root open={plans.length > 0}><Dialog.Portal><Dialog.Overlay className="dialog-overlay"/><Dialog.Content className="dialog"><Dialog.Title>补充月预计产量</Dialog.Title><Dialog.Description>创建下料月数据前需要补充预计产量（吨）。</Dialog.Description>{plans.map(month => <label key={month}>{month}<input type="number" min="0" value={planValues[month] || ''} onChange={e => setPlanValues(v => ({ ...v, [month]: e.target.value }))}/></label>)}<div className="dialog-actions"><button className="ghost" onClick={() => setPlans([])}>取消</button><button className="primary" onClick={() => { const values = Object.fromEntries(plans.map(month => [month, Number(planValues[month])])); if (Object.values(values).every(Number.isFinite)) { setPlans([]); write(values) } }}>创建并继续</button></div></Dialog.Content></Dialog.Portal></Dialog.Root>
  </div>
}

function DraftCard({ draft, onChange }: { draft: Draft; onChange: (value: Draft) => void }) {
  return <article className="draft-card"><div className="draft-head"><div><strong>第 {draft.index} 条 · {draft.businessDate || '日期待确认'}</strong><span>{draft.typeDisplay}</span></div><span className={`status ${draft.statusText.includes('可') || draft.statusText.includes('完成') ? 'ok' : ''}`}>{draft.statusText}</span></div>
    <div className="draft-controls"><label>业务日期<DatePicker value={draft.businessDate} onChange={businessDate => onChange({ ...draft, businessDate })} /></label><label>目标数据库<select value={draft.kind} onChange={e => onChange({ ...draft, kind: e.target.value as Draft['kind'] })}><option value="MaterialCutting">下料日报数据库</option><option value="TowerLineDaily">塔筒产线日报库</option><option value="Unknown">无法判断</option></select></label></div>
    <div className="field-grid">{draft.previewFields.map(field => <div key={field.key}><span>{field.label}</span><strong>{field.value === '' ? '—' : field.value}</strong></div>)}</div>
    {draft.warningText && <p className={`result-text ${statusTone(draft.statusText)}`}>{draft.warningText}</p>}
  </article>
}

function Notice({ value, close }: { value: { tone: string; title: string; message: string }; close: () => void }) {
  return <div className={`notice ${value.tone}`} role="status"><CheckCircle2 /><div><strong>{value.title}</strong><span>{value.message}</span></div><button aria-label="关闭提示" onClick={close}><X /></button></div>
}

function Status({ label, target }: { label: string; target?: BindingTarget }) { return <div className={`binding-status ${target && !target.bound ? 'missing' : ''}`}><CheckCircle2 /><div><span>{label}</span><strong>{target ? (target.bound ? target.name : '未绑定') : '正在读取…'}</strong>{target?.bound && <small>{target.path}</small>}</div></div> }

function DatePicker({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const selected = parseDate(value)
  const [open, setOpen] = useState(false)
  const [view, setView] = useState<'days' | 'months' | 'years'>('days')
  const [visible, setVisible] = useState(() => new Date(selected.getFullYear(), selected.getMonth(), 1))
  const days = monthGrid(visible.getFullYear(), visible.getMonth())
  const years = yearGrid(visible.getFullYear())
  const today = formatDate(new Date())
  const choose = (date: string) => { onChange(date); setOpen(false); const chosen = parseDate(date); setVisible(new Date(chosen.getFullYear(), chosen.getMonth(), 1)) }
  const toggle = () => { const next = !open; setOpen(next); setView('days'); if (next) setVisible(new Date(selected.getFullYear(), selected.getMonth(), 1)) }
  const move = (amount: number) => setVisible(view === 'days' ? new Date(visible.getFullYear(), visible.getMonth() + amount, 1) : new Date(visible.getFullYear() + amount * (view === 'years' ? 12 : 1), visible.getMonth(), 1))
  return <div className="date-picker">
    <button type="button" className={`date-trigger ${open ? 'open' : ''}`} aria-haspopup="dialog" aria-expanded={open} onClick={toggle}><span>{value ? value.replaceAll('-', '/') : '选择日期'}</span><CalendarDays /></button>
    {open && <><button type="button" className="date-backdrop" aria-label="关闭日期选择器" onClick={() => setOpen(false)} /><motion.div className="calendar-popover" role="dialog" aria-label="选择日期" initial={{ opacity: 0, y: -6, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .14 }}>
      <div className="calendar-head"><button type="button" aria-label={view === 'days' ? '上个月' : view === 'months' ? '上一年' : '前十二年'} onClick={() => move(-1)}><ChevronLeft /></button><button type="button" className="calendar-title" onClick={() => setView(current => current === 'days' ? 'months' : 'years')}>{view === 'years' ? `${years[0]}–${years[11]} 年` : `${visible.getFullYear()} 年${view === 'days' ? ` ${visible.getMonth() + 1} 月` : ''}`}</button><button type="button" aria-label={view === 'days' ? '下个月' : view === 'months' ? '下一年' : '后十二年'} onClick={() => move(1)}><ChevronRight /></button></div>
      {view === 'days' ? <><div className="weekdays">{['日','一','二','三','四','五','六'].map(day => <span key={day}>{day}</span>)}</div>
      <div className="calendar-grid">{days.map(day => <button type="button" key={day.date} className={`${day.currentMonth ? '' : 'outside'} ${day.date === value ? 'selected' : ''} ${day.date === today ? 'today' : ''}`} aria-label={day.date} aria-pressed={day.date === value} onClick={() => choose(day.date)}>{day.day}</button>)}</div></> :
      view === 'months' ? <div className="month-grid">{Array.from({ length: 12 }, (_, month) => <button type="button" key={month} className={selected.getFullYear() === visible.getFullYear() && selected.getMonth() === month ? 'selected' : ''} onClick={() => { setVisible(new Date(visible.getFullYear(), month, 1)); setView('days') }}>{month + 1} 月</button>)}</div> :
      <div className="month-grid year-grid">{years.map(year => <button type="button" key={year} className={selected.getFullYear() === year ? 'selected' : ''} onClick={() => { setVisible(new Date(year, visible.getMonth(), 1)); setView('months') }}>{year}</button>)}</div>}
      <div className="calendar-footer"><button type="button" onClick={() => choose(today)}>今天</button></div>
    </motion.div></>}
  </div>
}

function BindingDialog({ open, state, close, saved }: { open: boolean; state?: BindingState; close: () => void; saved: () => void }) {
  const keys = [['cutting', '下料日报数据库（可选）'], ['towerDaily', '塔筒产线日报库'], ['towerMonthly', '塔筒每月累计库'], ['towerYearly', '塔筒每年累计库']] as const
  const [selected, setSelected] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => { if (open) setSelected(state?.selected || {}) }, [open, state])
  async function save() { setBusy(true); setError(''); try { await invoke('production.saveBindings', selected, 120000); saved() } catch (e) { setError(e instanceof Error ? e.message : String(e)) } finally { setBusy(false) } }
  return <Dialog.Root open={open} onOpenChange={value => !value && close()}><Dialog.Portal><Dialog.Overlay className="dialog-overlay"/><Dialog.Content className="dialog"><Dialog.Title>管理 Notion 数据源</Dialog.Title><Dialog.Description>选择“业务数据 → Notion 数据库”的对应关系，保存时检测所需字段。</Dialog.Description><h3>下料消息</h3>{keys.slice(0, 1).map(([key, label]) => <label key={key}>{label}<select value={selected[key] || ''} onChange={e => setSelected(v => ({ ...v, [key]: e.target.value }))}><option value="">不绑定</option>{state?.sources.map(source => <option key={source.id} value={source.id}>{source.path}</option>)}</select></label>)}<h3>塔筒消息：日报 → 月累计 → 年累计</h3>{keys.slice(1).map(([key, label]) => <label key={key}>{label}<select value={selected[key] || ''} onChange={e => setSelected(v => ({ ...v, [key]: e.target.value }))}><option value="">请选择</option>{state?.sources.map(source => <option key={source.id} value={source.id}>{source.path}</option>)}</select></label>)}{error && <p className="warning-text">{error}</p>}<div className="dialog-actions"><button className="ghost" onClick={close}>取消</button><button className="primary" disabled={busy || !selected.towerDaily || !selected.towerMonthly || !selected.towerYearly} onClick={save}>{busy ? '检测中…' : '检测并保存'}</button></div></Dialog.Content></Dialog.Portal></Dialog.Root>
}

function statusLabel(status: string) { return ({ ready: '可写入', existing: '已有数据', created: '已创建', updated: '已更新', unchanged: '数据一致', conflict: '存在冲突', monthly_plan_required: '待填月计划', error: '处理失败' } as Record<string, string>)[status] || status }
function statusTone(status: string) { return ['可写入', '数据一致', '已创建', '已更新'].includes(status) ? 'success' : status === '处理失败' || status === '存在冲突' ? 'error' : 'warning' }
