import { useEffect, useMemo, useRef, useState } from 'react'
import { Check, Database, RefreshCw, SlidersHorizontal, X } from 'lucide-react'
import { invoke } from './bridge'
import DatePicker from './DatePicker'
import { ChoicePicker } from './FormPickers'
import { NumericInput } from './NumericInput'
import { ThreeStepProgress } from './ThreeStepProgress'
import type { WeldCheckResult, WeldProgress, WeldRow, WeldState } from './types'

const EMPTY_STATE: WeldState = { configured: false, binding: { bound: false, name: '', path: '' }, sources: [], selected: '' }

function currentMonth() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export function DailyWeldPage({ openSettings }: { openSettings: () => void }) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [month, setMonth] = useState(currentMonth)
  const [total, setTotal] = useState('')
  const [rows, setRows] = useState<WeldRow[]>([])
  const [state, setState] = useState<WeldState>(EMPTY_STATE)
  const [bindingOpen, setBindingOpen] = useState(false)
  const [settingsSection, setSettingsSection] = useState<'rules' | 'database'>('database')
  const [selectedSource, setSelectedSource] = useState('')
  const [overwriteOpen, setOverwriteOpen] = useState(false)
  const [busy, setBusy] = useState<'state' | 'generate' | 'binding' | 'check' | 'write' | undefined>('state')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [progress, setProgress] = useState<WeldProgress>()
  const checkInFlight = useRef(false)
  const writeInFlight = useRef(false)

  useEffect(() => {
    invoke<WeldState>('weld.getState').then(value => {
      const next = value?.binding && Array.isArray(value.sources) ? value : EMPTY_STATE
      setState(next)
      setSelectedSource(next.selected)
    }).catch(reason => setError(reason instanceof Error ? reason.message : '读取 Notion 配置失败')).finally(() => setBusy(undefined))
  }, [])

  const canGenerate = /^\d+$/.test(total) && Number(total) > 0
  const sum = useMemo(() => rows.reduce((value, row) => value + Number(row.qty || 0), 0), [rows])
  const diff = sum - Number(total || 0)
  const rowsValid = rows.length > 0 && rows.every(row => /^\d+$/.test(row.qty)) && diff === 0
  const locked = busy === 'generate' || busy === 'check' || busy === 'write'

  async function generate() {
    if (!canGenerate || locked) return
    setBusy('generate'); setError('')
    try {
      const generated = await invoke<Array<Omit<WeldRow, 'qty'> & { qty: number }>>('weld.generate', { month, total })
      setRows(generated.map(row => ({ ...row, qty: String(row.qty) })))
      setStep(2)
    } catch (reason) { setError(reason instanceof Error ? reason.message : '拆分失败') }
    finally { setBusy(undefined) }
  }

  function updateQuantity(index: number, value: string) {
    if (value !== '' && !/^\d+$/.test(value)) return
    setRows(current => current.map((row, rowIndex) => rowIndex === index ? { ...row, qty: value } : row))
  }

  async function saveBinding() {
    if (!selectedSource) return
    setBusy('binding'); setError('')
    try {
      const next = await invoke<WeldState>('weld.saveBinding', { sourceId: selectedSource })
      setState(next); setSelectedSource(next.selected); setBindingOpen(false)
    } catch (reason) { setError(reason instanceof Error ? reason.message : '绑定失败') }
    finally { setBusy(undefined) }
  }

  async function checkAndWrite() {
    if (!rowsValid || !state.binding.bound || locked || checkInFlight.current) return
    checkInFlight.current = true
    setBusy('check'); setError('')
    const payload = { month, total, rows: rows.map(row => ({ date: row.date, qty: row.qty })) }
    try {
      const result = await invoke<WeldCheckResult>('weld.check', payload, 120000)
      if (result.hasExistingData) { setOverwriteOpen(true); return }
      await write(payload, false)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Notion 数据检查失败')
    } finally { checkInFlight.current = false; setBusy(current => current === 'check' ? undefined : current) }
  }

  async function write(payload: object, overwriteExisting: boolean) {
    if (writeInFlight.current) return
    writeInFlight.current = true
    setBusy('write'); setError(''); setProgress(undefined)
    try {
      const result = await invoke<{ succeeded: boolean; message: string }>('weld.write', { ...payload, overwriteExisting }, 120000, value => setProgress(value as WeldProgress))
      setMessage(result.message); setOverwriteOpen(false); setStep(3)
    } catch (reason) { setError(reason instanceof Error ? reason.message : '写入 Notion 失败') }
    finally { writeInFlight.current = false; setBusy(undefined) }
  }

  function reset() {
    setStep(1); setRows([]); setTotal(''); setMessage(''); setError(''); setProgress(undefined)
  }

  function openBinding() { setError(''); setSettingsSection('database'); setBindingOpen(true) }

  const writePayload = { month, total, rows: rows.map(row => ({ date: row.date, qty: row.qty })) }
  return <div className="app-shell"><main className="main-content">
    <header className="content-header"><div><h1>月度焊接计划拆分</h1><p>按自然日模拟产量浮动，确认后写入 Notion 焊接数据库</p></div><button type="button" className="template-config-button" disabled={busy === 'state'} onClick={openBinding}>焊接设置</button></header>
    <div className="production-message-scroll daily-weld-page">
      <ThreeStepProgress current={step} titles={['录入计划', '拆分预览', '完成']} label="焊接计划拆分进度" />

      {error && <div className="weld-notice error" role="alert">{error}</div>}
      {step === 1 && <section className="weld-plan-card" aria-labelledby="weld-plan-title">
        <div className="weld-section-heading"><h2 id="weld-plan-title">计划信息</h2><p>输入本月计划焊接总量，下一步将生成每日拆分预览。</p></div>
        <div className="weld-fields">
          <DatePicker label="计划月份" value={month} selectionMode="month" disabled={locked} onChange={setMonth} />
          <label className="weld-field"><span>计划焊接总量（吨）</span><NumericInput value={total} disabled={locked} onChange={value => { if (value === '' || /^\d+$/.test(value)) setTotal(value) }} unit="吨" ariaLabel="计划焊接总量" /></label>
        </div>
        <div className="weld-method-note"><strong>按自然日分配 · 模拟真实产量浮动</strong><span>工作日与周末采用不同权重，并叠加波动；每日取整后自动配平至计划总量。</span></div>
        <div className="weld-actions"><button type="button" className="primary-button" disabled={!canGenerate || locked} onClick={generate}>{busy === 'generate' ? '正在拆分…' : '下一步：拆分预览'}</button></div>
      </section>}

      {step === 2 && <section className="weld-preview" aria-labelledby="weld-preview-title">
        <div className="weld-preview-heading"><div><h2 id="weld-preview-title">{month.replace('-', ' 年 ')} 月每日拆分详情</h2><p>可直接修改任意一天的数值；不满意本次浮动效果可重新模拟。</p></div><button type="button" className="secondary" disabled={locked} onClick={generate}><RefreshCw />重新模拟浮动</button></div>
        <div className="weld-table-wrap"><table><thead><tr><th>日期</th><th>星期</th><th>类型</th><th>计划量（吨）</th></tr></thead><tbody>{rows.map((row, index) => <tr key={row.date}><td>{row.date}</td><td>{row.weekday}</td><td><span className={`weld-day-pill ${row.isWeekend ? 'weekend' : ''}`}>{row.isWeekend ? '休息日' : '工作日'}</span></td><td><NumericInput value={row.qty} disabled={locked} onChange={value => updateQuantity(index, value)} unit="吨" ariaLabel={`${row.date} 计划量`} /></td></tr>)}</tbody></table></div>
        <div className="weld-summary"><span>共 {rows.length} 天 · 计划总量 <strong>{total}</strong> 吨</span><span>拆分合计 <strong>{sum}</strong> 吨 {diff === 0 ? <em className="match">与计划总量一致</em> : <em className="mismatch">偏差 {diff > 0 ? '+' : ''}{diff} 吨，可手动调整</em>}</span></div>
        {busy === 'write' && <div className="weld-write-progress" role="status" aria-live="polite">{progress ? `正在写入 ${progress.date.slice(0, 10)}（${progress.current}/${progress.total}）` : '正在准备 Notion 层级数据…'}</div>}
        <div className="weld-actions split"><button type="button" className="secondary" disabled={locked} onClick={() => setStep(1)}>返回修改</button><button type="button" className="primary-button" disabled={!rowsValid || !state.binding.bound || locked} onClick={checkAndWrite}>{busy === 'check' ? '正在检查…' : busy === 'write' ? '正在写入…' : '确认并写入 Notion'}</button></div>
      </section>}

      {step === 3 && <section className="complete-view weld-complete"><div className="complete-icon"><Check /></div><h2>入库完成</h2><p>{message || `${month} 共 ${rows.length} 天的焊接计划数据已写入 Notion。`}</p><button className="primary-button" onClick={reset}>拆分下一个月</button></section>}
    </div>

    {bindingOpen && <div className="weld-settings-overlay">
      <section className="weld-settings-dialog" role="dialog" aria-modal="true" aria-labelledby="weld-settings-title">
        <aside className="weld-settings-nav">
          <h2 id="weld-settings-title">焊接设置</h2>
          <nav aria-label="焊接设置分类">
            <button type="button" className={settingsSection === 'rules' ? 'active' : ''} onClick={() => setSettingsSection('rules')}><SlidersHorizontal />拆分规则</button>
            <button type="button" className={settingsSection === 'database' ? 'active' : ''} onClick={() => setSettingsSection('database')}><Database />数据库绑定</button>
          </nav>
        </aside>
        <div className="weld-settings-main">
          <button type="button" className="weld-settings-close" aria-label="关闭焊接设置" disabled={busy === 'binding'} onClick={() => setBindingOpen(false)}><X /></button>
          {settingsSection === 'rules' ? <>
            <div className="weld-settings-heading"><h3>拆分规则</h3><p>当前规则用于生成每日焊接计划，修改每日数值后仍需保证月度合计一致。</p></div>
            <dl className="weld-rule-list">
              <div><dt>分配周期</dt><dd>按所选月份的全部自然日</dd></div>
              <div><dt>产量浮动</dt><dd>基准量叠加 22% 随机波动</dd></div>
              <div><dt>周末权重</dt><dd>周六、周日自动降低计划权重</dd></div>
              <div><dt>总量配平</dt><dd>每日取整后自动配平至月度计划</dd></div>
            </dl>
          </> : <>
            <div className="weld-settings-heading"><h3>数据库绑定</h3><p>每项业务只绑定一个主写入数据库，汇总数据库由系统自动维护。</p></div>
            {error && <div className="weld-notice error" role="alert">{error}</div>}
            <section className="weld-business-binding" aria-labelledby="weld-business-title">
              <div className="weld-business-title"><div><h4 id="weld-business-title">焊接业务</h4><p>每日焊接计划的主写入数据库</p></div><span className={state.binding.bound ? 'bound' : ''}>{state.binding.bound ? '已绑定' : '未绑定'}</span></div>
              {!state.configured || !state.sources.length ? <div className="weld-notice">请先在系统设置中完成 Notion 连接并刷新数据源。</div> : <div className="weld-dialog-field"><span>主写入数据库</span><ChoicePicker value={selectedSource} options={state.sources.map(source => ({ value: source.id, label: source.path || source.name }))} placeholder="选择每日焊接量数据库" ariaLabel="焊接业务主写入数据库" disabled={busy === 'binding'} onChange={setSelectedSource} /></div>}
              <p className="weld-binding-help">月度和周度汇总数据库由系统在写入时自动维护，无需单独绑定。</p>
            </section>
            <div className="weld-settings-actions"><button type="button" disabled={busy === 'binding'} onClick={() => setBindingOpen(false)}>取消</button>{(!state.configured || !state.sources.length) ? <button type="button" className="primary-button" onClick={openSettings}>前往系统设置</button> : <button type="button" className="primary-button" disabled={!selectedSource || busy === 'binding'} onClick={saveBinding}>{busy === 'binding' ? '正在检测…' : '保存绑定'}</button>}</div>
          </>}
        </div>
      </section>
    </div>}
    {overwriteOpen && <div className="pm-dialog-overlay"><section className="pm-dialog weld-confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="weld-overwrite-title"><h2 id="weld-overwrite-title">确认覆盖已有产量</h2><p>{month} 已存在产量数据。继续后将按本次拆分结果覆盖该月每日产量，并更新月、周、日关联。</p>{error && <div className="weld-notice error" role="alert">{error}</div>}{busy === 'write' && <div className="weld-write-progress" role="status" aria-live="polite">{progress ? `正在写入 ${progress.date.slice(0, 10)}（${progress.current}/${progress.total}）` : '正在准备 Notion 层级数据…'}</div>}<div className="pm-dialog-actions"><button type="button" disabled={busy === 'write'} onClick={() => setOverwriteOpen(false)}>取消</button><button type="button" className="primary-button" disabled={busy === 'write'} onClick={() => write(writePayload, true)}>{busy === 'write' ? '正在写入…' : '确认覆盖并写入'}</button></div></section></div>}
  </main></div>
}
