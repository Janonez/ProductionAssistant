import { useEffect, useRef, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Copy, FileSpreadsheet, LoaderCircle, Settings2, X } from 'lucide-react'
import { invoke } from './bridge'
import DatePicker from './DatePicker'
import type { ReportCenterState, ReportRunProgress, ReportRunSummary } from './types'

type Config = { sourceRoot: string; outputRoot: string; reportUrl: string; username: string; password: string }
const period = (offset = 0) => {
  const today = new Date()
  return { startDate: new Date(Date.UTC(today.getFullYear(), today.getMonth() + offset - 1, 21)).toISOString().slice(0, 10),
    endDate: new Date(Date.UTC(today.getFullYear(), today.getMonth() + offset, 20)).toISOString().slice(0, 10) }
}
const blankConfig: Config = { sourceRoot: '', outputRoot: '', reportUrl: '', username: '', password: '' }
const configFrom = (state: ReportCenterState): Config => ({ sourceRoot: state.sourceRoot, outputRoot: state.outputRoot, reportUrl: state.reportUrl, username: state.username, password: '' })
const errorText = (error: unknown) => error instanceof Error ? error.message : String(error)
const monthLabel = (date: string) => date ? `${date.slice(0, 4)} 年 ${Number(date.slice(5, 7))} 月` : '—'
const stageLabels = { prepare: '准备中', collect: '正在导出日报', parse: '正在读取数据', summary: '正在生成汇总', complete: '正在完成' }

export function ReportCenterPage() {
  const [state, setState] = useState<ReportCenterState>()
  const [range, setRange] = useState(period)
  const [config, setConfig] = useState<Config>(blankConfig)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [busy, setBusy] = useState<'load' | 'save' | 'auth' | 'run' | undefined>('load')
  const [error, setError] = useState('')
  const [settingsError, setSettingsError] = useState('')
  const [result, setResult] = useState<ReportRunSummary>()
  const [progress, setProgress] = useState<ReportRunProgress>()
  const [failed, setFailed] = useState(false)
  const [copied, setCopied] = useState(false)
  const operation = useRef(0)
  const locked = useRef(false)
  const days = Math.floor((Date.parse(`${range.endDate}T00:00:00Z`) - Date.parse(`${range.startDate}T00:00:00Z`)) / 86400000) + 1
  const rangeError = !Number.isFinite(days) ? '请选择完整日期。' : days < 1 ? '结束日期不能早于开始日期。' : days > 366 ? '单次统计范围不能超过 366 天。' : ''
  const percentage = progress?.total ? Math.min(100, Math.max(0, Math.round(progress.current / progress.total * 100))) : 0

  async function load() {
    const version = ++operation.current
    locked.current = true; setBusy('load'); setError('')
    try { const next = await invoke<ReportCenterState>('report.getState'); if (version === operation.current) setState(next) }
    catch (error) { if (version === operation.current) setError(errorText(error)) }
    finally { if (version === operation.current) { locked.current = false; setBusy(undefined) } }
  }
  useEffect(() => { void load(); return () => { operation.current++ } }, [])

  function changeRange(next: typeof range) {
    if (locked.current) return
    setRange(next); setResult(undefined); setProgress(undefined); setFailed(false); setError(''); setCopied(false)
  }
  function changeSettings(open: boolean) {
    if (locked.current) return
    setSettingsOpen(open); setSettingsError('')
    setConfig(open && state ? configFrom(state) : blankConfig)
  }
  async function saveConfig(event: React.FormEvent) {
    event.preventDefault()
    if (locked.current || !state) return
    const payload = { ...config, sourceRoot: config.sourceRoot.trim(), outputRoot: config.outputRoot.trim(), reportUrl: config.reportUrl.trim(), username: config.username.trim() }
    if (JSON.stringify(payload) === JSON.stringify(configFrom(state))) { changeSettings(false); return }
    const version = ++operation.current
    locked.current = true; setBusy('save'); setSettingsError('')
    try {
      const next = await invoke<ReportCenterState>('report.saveConfig', payload)
      if (version !== operation.current) return
      setState(next); setSettingsOpen(false); setConfig(blankConfig); setResult(undefined); setProgress(undefined); setFailed(false); setError('')
    } catch (error) { if (version === operation.current) setSettingsError(errorText(error)) }
    finally { if (version === operation.current) { locked.current = false; setBusy(undefined) } }
  }
  async function authenticate() {
    if (locked.current || !state?.credentialsConfigured) return
    const version = ++operation.current
    locked.current = true; setBusy('auth'); setError('')
    try {
      await invoke('report.authenticate', undefined, 10 * 60 * 1000)
      const next = await invoke<ReportCenterState>('report.getState')
      if (version === operation.current) setState(next)
    } catch (error) { if (version === operation.current) setError(errorText(error)) }
    finally { if (version === operation.current) { locked.current = false; setBusy(undefined) } }
  }
  async function run() {
    if (locked.current || !state?.authenticated || rangeError) return
    const version = ++operation.current
    const snapshot = { ...range }
    locked.current = true; setBusy('run'); setError(''); setResult(undefined); setFailed(false); setCopied(false)
    setProgress({ stage: 'prepare', current: 0, total: days, message: '' })
    try {
      const next = await invoke<ReportRunSummary>('report.run', snapshot, 30 * 60 * 1000, value => {
        if (version === operation.current && locked.current) setProgress(value as ReportRunProgress)
      })
      if (version === operation.current) { setResult(next); setProgress(undefined) }
    } catch (error) { if (version === operation.current) { setError(errorText(error)); setFailed(true); setProgress(undefined) } }
    finally { if (version === operation.current) { locked.current = false; setBusy(undefined) } }
  }
  async function copyPath() {
    if (!result) return
    try { await navigator.clipboard.writeText(result.summaryPath); setCopied(true) }
    catch { setError('无法复制，请选中文件路径手动复制。') }
  }

  return <div className="page report-center-page">
    <header className="report-header"><h1>文件统计汇总</h1><div className="report-header-actions">
      <span className="report-status">{busy === 'load' ? '加载中' : state?.authenticated ? '已验证登录' : '未验证登录'}</span>
      <button className="secondary report-icon-button" aria-label="报表设置" title="报表设置" disabled={!!busy || !state} onClick={() => changeSettings(true)}><Settings2 /></button>
    </div></header>
    <div className="report-content">
      {error && <div className="report-error" role="alert"><span>{error}</span>{!state && <button className="secondary" disabled={!!busy} onClick={() => void load()}>重新加载</button>}</div>}
      <section className="report-workspace">
        <div className="report-pane report-period">
          <div className="report-pane-heading"><h2>统计范围</h2>{!rangeError && <span>{days} 天</span>}</div>
          <div className="report-dates"><DatePicker label="开始日期" value={range.startDate} disabled={!!busy} onChange={startDate => changeRange({ ...range, startDate })} /><DatePicker label="结束日期" value={range.endDate} disabled={!!busy} onChange={endDate => changeRange({ ...range, endDate })} /></div>
          <div className="report-range-tools"><div><button disabled={!!busy} onClick={() => changeRange(period())}>本期</button><button disabled={!!busy} onClick={() => changeRange(period(-1))}>上期</button></div><span>{rangeError || `汇总月份 · ${monthLabel(range.endDate)}`}</span></div>
          <div className="report-execution">
            {busy === 'run' && <div className="report-progress" role="status"><div><span><LoaderCircle className="spin" />{stageLabels[progress?.stage || 'prepare']}</span>{progress && ['collect', 'parse'].includes(progress.stage) && <span>{progress.current} / {progress.total}</span>}</div>
              <div className="report-progress-bar" role="progressbar" aria-label={stageLabels[progress?.stage || 'prepare']} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage}><i style={{ width: `${percentage}%` }} /></div>
              {progress?.message && <details className="report-details"><summary>处理详情</summary><p>{progress.message}</p></details>}
            </div>}
            {!state?.credentialsConfigured && state && <p className="report-setup">请先配置报表连接。<button onClick={() => changeSettings(true)}>报表设置</button></p>}
            {state?.credentialsConfigured && !state.authenticated && <p className="report-setup">请先验证登录。</p>}
            <div className="report-actions">
              {state?.credentialsConfigured && <button className="secondary" disabled={!!busy} onClick={authenticate}>{busy === 'auth' && <LoaderCircle className="spin" />}{busy === 'auth' ? '验证中…' : state?.authenticated ? '重新验证' : '验证登录'}</button>}
              <button className="primary" disabled={!!busy || !state?.authenticated || !!rangeError} onClick={run}>{busy === 'run' ? '正在汇总…' : failed ? '重新汇总' : '开始汇总'}</button>
            </div>
          </div>
        </div>
        <div className="report-pane report-result" aria-live="polite">
          <div className="report-pane-heading"><h2>汇总结果</h2>{result && <span>已完成</span>}</div>
          {result ? <>
            <div className="report-file"><FileSpreadsheet /><div><h3>{monthLabel(result.period.endDate)}设备台时汇总</h3><p>{result.period.startDate} — {result.period.endDate}</p></div></div>
            <dl className="report-result-stats"><div><dt>日报</dt><dd>{result.parsedReports} / {result.plannedReports} 份</dd></div><div><dt>设备</dt><dd>{result.deviceCount} 台</dd></div></dl>
            <div className="report-output"><span>文件位置</span><p>{result.summaryPath}</p><button className="secondary" onClick={copyPath}><Copy />{copied ? '已复制' : '复制路径'}</button></div>
            <details className="report-details"><summary>汇总明细</summary><p>数据点：{result.actualDataPoints} / {result.expectedDataPoints}</p>{result.warnings.map((warning, index) => <p key={index}>{warning}</p>)}</details>
          </> : <div className="report-empty"><FileSpreadsheet /><strong>{busy === 'run' ? '正在生成汇总' : failed ? '未生成汇总文件' : '尚未生成汇总'}</strong><p>{busy === 'run' ? '完成后可在这里查看文件。' : failed ? '处理错误后，可重新汇总。' : '选择统计范围后开始汇总。'}</p></div>}
        </div>
      </section>
    </div>
    <Dialog.Root open={settingsOpen} onOpenChange={changeSettings}><Dialog.Portal><Dialog.Overlay className="dialog-overlay" /><Dialog.Content className="report-settings-dialog">
      <div className="report-settings-heading"><Dialog.Title>报表设置</Dialog.Title><Dialog.Close asChild><button className="secondary report-icon-button" disabled={!!busy} aria-label="关闭报表设置"><X /></button></Dialog.Close></div>
      <Dialog.Description className="report-sr-only">设置报表连接与文件保存位置。</Dialog.Description>
      <form onSubmit={saveConfig}>
        <fieldset disabled={!!busy}><legend>报表连接</legend>
          <label>报表网页<input type="url" required value={config.reportUrl} onChange={event => setConfig({ ...config, reportUrl: event.target.value })} placeholder="https://…" /></label>
          <div className="report-settings-grid"><label>账号<input required autoComplete="username" value={config.username} onChange={event => setConfig({ ...config, username: event.target.value })} /></label><label>密码<input type="password" required={!state?.credentialsConfigured} autoComplete="new-password" value={config.password} onChange={event => setConfig({ ...config, password: event.target.value })} placeholder={state?.credentialsConfigured ? '留空保持原密码' : '请输入密码'} /></label></div>
        </fieldset>
        <fieldset disabled={!!busy}><legend>保存位置</legend><label>原始日报<input required value={config.sourceRoot} onChange={event => setConfig({ ...config, sourceRoot: event.target.value })} /></label><label>汇总文件<input required value={config.outputRoot} onChange={event => setConfig({ ...config, outputRoot: event.target.value })} /></label></fieldset>
        {settingsError && <p className="report-error" role="alert">{settingsError}</p>}
        <div className="report-settings-actions"><Dialog.Close asChild><button className="secondary" type="button" disabled={!!busy}>取消</button></Dialog.Close><button className="primary" type="submit" disabled={!!busy}>{busy === 'save' ? '保存中…' : '保存设置'}</button></div>
      </form>
    </Dialog.Content></Dialog.Portal></Dialog.Root>
  </div>
}
