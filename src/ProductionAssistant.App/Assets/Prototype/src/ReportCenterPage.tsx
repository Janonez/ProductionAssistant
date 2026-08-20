import { useEffect, useMemo, useState } from 'react'
import { AlertCircle, CalendarDays, CheckCircle2, FileSpreadsheet, FolderInput, FolderOpen, Globe2, KeyRound, LockKeyhole, Play, Save, Settings2, UserRound } from 'lucide-react'
import { invoke } from './bridge'
import type { ReportCenterState, ReportRunProgress, ReportRunSummary } from './types'
import { ReportDatePicker } from './FormPickers'
import { WorkflowProgress } from './WorkflowProgress'

const iso = (date: Date) => date.toISOString().slice(0, 10)

export function ReportCenterPage() {
  const today = new Date()
  const defaultEnd = new Date(Date.UTC(today.getFullYear(), today.getMonth(), 20))
  const defaultStart = new Date(Date.UTC(today.getFullYear(), today.getMonth() - 1, 21))
  const [state, setState] = useState<ReportCenterState>()
  const [startDate, setStartDate] = useState(iso(defaultStart))
  const [endDate, setEndDate] = useState(iso(defaultEnd))
  const [config, setConfig] = useState({ sourceRoot: '', outputRoot: '', reportUrl: '', username: '', password: '' })
  const [busy, setBusy] = useState<'save' | 'auth' | 'run'>()
  const [error, setError] = useState('')
  const [saved, setSaved] = useState('')
  const [result, setResult] = useState<ReportRunSummary>()
  const [progress, setProgress] = useState<ReportRunProgress>()
  const summaryMonth = endDate ? `${Number(endDate.slice(5, 7))} 月` : '—'
  const days = useMemo(() => {
    const start = Date.parse(`${startDate}T00:00:00Z`)
    const end = Date.parse(`${endDate}T00:00:00Z`)
    return Number.isFinite(start) && Number.isFinite(end) && end >= start ? Math.floor((end - start) / 86400000) + 1 : 0
  }, [startDate, endDate])

  const applyState = (value: ReportCenterState) => {
    setState(value)
    setConfig(current => ({ sourceRoot: value.sourceRoot, outputRoot: value.outputRoot, reportUrl: value.reportUrl, username: value.username, password: current.password }))
  }
  const load = () => invoke<ReportCenterState>('report.getState').then(applyState).catch(error => setError(error.message))
  useEffect(() => { void load() }, [])

  const saveConfig = async () => {
    setBusy('save'); setError(''); setSaved('')
    try {
      const next = await invoke<ReportCenterState>('report.saveConfig', config)
      applyState(next); setConfig(current => ({ ...current, password: '' })); setSaved('配置已保存，请验证登录。')
    } catch (error) { setError(error instanceof Error ? error.message : '配置保存失败') }
    finally { setBusy(undefined) }
  }
  const authenticate = async () => {
    setBusy('auth'); setError(''); setSaved('')
    try { await invoke('report.authenticate', undefined, 10 * 60 * 1000); await load(); setSaved('登录验证通过。') }
    catch (error) { setError(error instanceof Error ? error.message : '登录验证失败') }
    finally { setBusy(undefined) }
  }
  const run = async () => {
    setBusy('run'); setError(''); setSaved(''); setResult(undefined); setProgress({ stage: 'prepare', current: 0, total: days, message: '正在准备任务' })
    try { setResult(await invoke<ReportRunSummary>('report.run', { startDate, endDate }, 30 * 60 * 1000, value => setProgress(value as ReportRunProgress))) }
    catch (error) { setError(error instanceof Error ? error.message : '任务执行失败') }
    finally { setBusy(undefined) }
  }
  const progressSteps = ['准备报表', '导出日报', '解析数据', '生成汇总', '完成']
  const progressStep = progress ? { prepare: 0, collect: 1, parse: 2, summary: 3, complete: 5 }[progress.stage] : 0
  const progressPercent = progress?.total ? Math.round(progress.current / progress.total * 100) : 0

  return <div className="page report-center-page">
    <header><div><h1>报表中心</h1><p>手动选择统计日期，自动采集加工日报并生成设备实开台时汇总。</p></div><span className={`report-auth ${state?.authenticated ? 'ready' : ''}`}>{state?.authenticated ? <CheckCircle2 /> : <AlertCircle />}{state?.authenticated ? '登录可用' : '待验证登录'}</span></header>

    <section className="report-workspace">
      <div className="report-period">
        <div className="report-section-title"><CalendarDays /><div><h2>选择统计范围</h2><p>汇总月份自动取结束日期所在月份</p></div></div>
        <div className="report-fields"><label>开始日期<ReportDatePicker value={startDate} onChange={setStartDate} /></label><label>结束日期<ReportDatePicker value={endDate} onChange={setEndDate} /></label></div>
        <div className="report-period-preview"><div><span>统计范围</span><strong>{startDate || '—'} ～ {endDate || '—'}</strong></div><div><span>汇总月份</span><strong>{summaryMonth}</strong></div><div><span>日报数量</span><strong>{days || '—'} 天</strong></div></div>
        {(busy === 'run' || progress) && <div className="report-run-progress" aria-live="polite">
          <WorkflowProgress label="报表任务进度" steps={progressSteps} currentStep={progressStep} direction={1} busy={busy === 'run'} />
          <div className="report-progress-detail"><span>{progress?.message || '正在准备任务'}</span><strong>{progress?.total ? `${progress.current}/${progress.total}` : '准备中'}</strong></div>
          <div className="report-progress-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressPercent}><i style={{ width: `${progressPercent}%` }} /></div>
        </div>}
        <div className="report-actions"><button className="secondary" disabled={!!busy || !state?.credentialsConfigured} onClick={authenticate}><KeyRound />{busy === 'auth' ? '正在验证登录…' : '验证登录'}</button><button className="primary" disabled={!!busy || !state?.authenticated || days === 0} onClick={run}><Play />{busy === 'run' ? '正在导出并汇总…' : '开始运行'}</button></div>
        <p className="report-note">Playwright 在后台运行。测试阶段已有原始日报会重新导出并覆盖。</p>
      </div>

      <div className="report-side"><h2>输出位置</h2><div className="report-path"><FolderOpen /><span>{state?.outputRoot || '正在读取配置…'}</span></div><dl><div><dt>原始日报</dt><dd>{state?.sourceRoot || '—'} · 按年份、月份归档</dd></div><div><dt>汇总文件</dt><dd>按结束日期所在月份归档</dd></div><div><dt>本次月份</dt><dd>{summaryMonth}</dd></div></dl></div>
    </section>

    <section className="report-config">
      <div className="report-section-title"><Settings2 /><div><h2>报表配置</h2><p>保存后登录状态会失效，需要重新验证一次</p></div></div>
      <div className="report-config-grid">
        <label><span><FolderInput />源文件位置</span><input value={config.sourceRoot} onChange={event => setConfig({ ...config, sourceRoot: event.target.value })} placeholder="原始日报保存根目录" /></label>
        <label><span><FolderOpen />输出位置</span><input value={config.outputRoot} onChange={event => setConfig({ ...config, outputRoot: event.target.value })} placeholder="汇总文件保存根目录" /></label>
        <label className="wide"><span><Globe2 />报表网页</span><input type="url" value={config.reportUrl} onChange={event => setConfig({ ...config, reportUrl: event.target.value })} placeholder="https://…" /></label>
        <label><span><UserRound />账号</span><input autoComplete="username" value={config.username} onChange={event => setConfig({ ...config, username: event.target.value })} /></label>
        <label><span><LockKeyhole />密码</span><input type="password" autoComplete="new-password" value={config.password} onChange={event => setConfig({ ...config, password: event.target.value })} placeholder={state?.credentialsConfigured ? '已保存，留空表示不修改' : '请输入密码'} /></label>
      </div>
      <div className="report-config-footer"><p>账号和密码使用 Windows 本机加密保存，不写入 YAML，也不会回传显示密码。</p><button className="primary" disabled={!!busy} onClick={saveConfig}><Save />{busy === 'save' ? '正在保存…' : '保存配置'}</button></div>
    </section>

    {error && <div className="report-message error" role="alert"><AlertCircle /><div><strong>操作未完成</strong><span>{error}</span></div></div>}
    {saved && <div className="report-message success" role="status"><CheckCircle2 /><div><strong>操作成功</strong><span>{saved}</span></div></div>}
    {result && <section className="report-result"><div className="report-section-title"><FileSpreadsheet /><div><h2>{summaryMonth}汇总已完成</h2><p>{result.period.startDate} ～ {result.period.endDate}</p></div></div><div className="report-stats"><span><strong>{result.parsedReports}/{result.plannedReports}</strong>日报完整</span><span><strong>{result.deviceCount}</strong>台设备</span><span><strong>{result.actualDataPoints}/{result.expectedDataPoints}</strong>数据点</span></div><div className="report-output"><span>汇总文件</span><strong>{result.summaryPath}</strong></div>{result.warnings.length > 0 && <p className="report-warning">{result.warnings.length} 份日报使用了已有归档文件。</p>}</section>}
  </div>
}
