import { useEffect, useRef, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { FileCheck2, FolderOpen, LoaderCircle, X } from 'lucide-react'
import { invoke } from './bridge'
import { SkeletonLines } from './LoadingSkeleton'
import './plan-pdf.css'

interface Audit {
  auditId: string
  workspace: { rootPath: string; workbookPath: string; year: number; month: number }
  issues: { severity: string; sheet: string; location: string; message: string; canAutoFix: boolean }[]
  sheetCount: number; repaired: boolean; canExport: boolean
}
interface Output { outputFolder: string; files: string[] }
interface Repair { backupPath: string; changedCells: number; changedRows: number }
type Action = 'audit' | 'repair' | 'export' | 'pickFolder' | 'openOutput'
const labels = { audit: '正在检查', repair: '正在备份修复并复查', export: '正在导出', pickFolder: '选择目录', openOutput: '正在打开目录' }
const fileName = (path: string) => path.split(/[\\/]/).pop()

export function PlanPdfPage() {
  const [path, setPath] = useState('')
  const [audit, setAudit] = useState<Audit>()
  const [repair, setRepair] = useState<Repair>()
  const [output, setOutput] = useState<Output>()
  const [busy, setBusy] = useState<Action>()
  const [confirm, setConfirm] = useState<'repair' | 'export'>()
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('全部')
  const [progress, setProgress] = useState<{ current: number; total: number; name: string }>()
  const locked = useRef(false)
  const version = useRef(0)
  useEffect(() => () => { version.current++ }, [])
  const errors = audit?.issues.filter(issue => issue.severity === '错误').length || 0
  const warnings = audit?.issues.filter(issue => issue.severity === '警告').length || 0

  function changePath(value: string) {
    if (locked.current) return
    setPath(value); setAudit(undefined); setOutput(undefined); setRepair(undefined); setError(''); setProgress(undefined); setFilter('全部')
  }
  async function execute(action: Action) {
    if (locked.current || (action === 'audit' && !path.trim())) return
    if (['repair', 'export', 'openOutput'].includes(action) && !audit) return
    const current = ++version.current
    locked.current = true; setBusy(action); setError(''); setConfirm(undefined)
    if (action === 'audit') { setAudit(undefined); setRepair(undefined); setFilter('全部') }
    if (action === 'repair') { setAudit(value => value && { ...value, repaired: false, canExport: false }); setRepair(undefined) }
    if (['audit', 'repair', 'export'].includes(action)) { setOutput(undefined); setProgress(undefined) }
    try {
      if (action === 'pickFolder') {
        const next = await invoke<{ path?: string }>('plan.pickFolder', undefined, 10 * 60 * 1000)
        if (current !== version.current) return
        if (next.path) { locked.current = false; changePath(next.path); locked.current = true }
      } else {
        const next = await invoke<Audit | Output | { audit: Audit; repair: Repair }>(`plan.${action}`, { path: path.trim(), auditId: audit?.auditId, confirmed: action === 'repair' || action === 'export' }, 30 * 60 * 1000, value => {
          if (current === version.current && locked.current) setProgress(value as typeof progress)
        })
        if (current !== version.current) return
        if (action === 'audit') setAudit(next as Audit)
        if (action === 'repair') { const result = next as { audit: Audit; repair: Repair }; setAudit(result.audit); setRepair(result.repair) }
        if (action === 'export') setOutput(next as Output)
      }
    } catch (error) {
      if (current === version.current) {
        setError(error instanceof Error ? error.message : String(error))
        if (action === 'repair' || action === 'export') setAudit(value => value && { ...value, canExport: false, repaired: false })
      }
    } finally { if (current === version.current) { locked.current = false; setBusy(undefined); setProgress(undefined) } }
  }

  const status = busy ? labels[busy] : output ? '候选 PDF 已生成' : !audit ? '等待检查' : errors ? '存在待处理错误' : audit.canExport ? '可以导出' : '检查完成，待修复'
  return <div className="page plan-pdf-page">
    <header className="plan-header"><h1>挂网计划导出</h1><span>{status}</span></header>
    <div className="plan-content">
      <section className="plan-source"><label htmlFor="plan-folder">月度目录</label><div><input id="plan-folder" value={path} disabled={!!busy} placeholder="选择包含一二三级计划的月份目录" onChange={event => changePath(event.target.value)} /><button className="secondary" disabled={!!busy} onClick={() => void execute('pickFolder')}><FolderOpen />选择目录</button><button className="primary" disabled={!!busy || !path.trim()} onClick={() => void execute('audit')}>{audit ? '重新检查' : '检查计划'}</button></div></section>
      {error && <p className="plan-error" role="alert">{error}</p>}
      {busy && <div className="plan-progress" role="status"><span><LoaderCircle className="spin" />{labels[busy]}</span>{busy === 'export' && progress && <><span>{progress.current} / {progress.total} · {progress.name}</span><progress aria-label="PDF 导出进度" max={progress.total || 11} value={progress.current} /></>}</div>}
      <div className="plan-workspace">
        <section className="plan-inspection">
          <div className="plan-pane-heading"><h2>检查结果</h2>{audit && <span>{audit.sheetCount} 个工作表</span>}</div>
          {audit ? <>
            <div className="plan-workbook"><strong>{audit.workspace.year} 年 {audit.workspace.month} 月计划</strong><span>{fileName(audit.workspace.workbookPath)}</span></div>
            <div className="plan-filters" aria-label="问题筛选">{['全部', '错误', '警告'].map(value => <button key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{value} <span>{value === '全部' ? audit.issues.length : value === '错误' ? errors : warnings}</span></button>)}</div>
            <div className="plan-issues">{audit.issues.filter(issue => filter === '全部' || issue.severity === filter).map((issue, index) => <article key={index}><div><span className={issue.severity === '错误' ? 'plan-severity-error' : ''}>{issue.severity}</span><strong>{issue.sheet}{issue.location && ` · ${issue.location}`}</strong><span>{issue.canAutoFix ? '可自动修复' : '需手动处理'}</span></div><p>{issue.message}</p></article>)}{!audit.issues.some(issue => filter === '全部' || issue.severity === filter) && <p className="plan-clear">{audit.issues.length ? `没有${filter}` : '未发现检查问题'}</p>}</div>
            <div className="plan-next"><span>{errors ? audit.repaired ? '请手动处理剩余错误，再重新检查。' : '修复后自动复查，剩余错误需手动处理。' : audit.canExport ? '复查通过，可以导出候选 PDF。' : '继续备份并修复，完成导出前准备。'}</span><button className="secondary" disabled={!!busy} onClick={() => setConfirm('repair')}>{audit.repaired ? '再次修复' : '备份并修复'}</button></div>
            {repair && <details className="plan-details"><summary>备份与修复明细</summary><p>已调整 {repair.changedCells} 个单元格、{repair.changedRows} 行。</p><p>备份：{repair.backupPath}</p></details>}
          </> : busy === 'audit' ? <SkeletonLines rows={7} label="正在加载计划检查结果" /> : <div className="plan-empty"><FileCheck2 /><strong>尚未检查计划</strong><p>选择月度目录后，查看需要处理的问题。</p></div>}
        </section>
        <section className="plan-result"><div className="plan-pane-heading"><h2>导出结果</h2>{output && <span>{output.files.length} 份 PDF</span>}</div>
          {output ? <><div className="plan-file-list">{output.files.map(file => <p key={file}>{fileName(file)}</p>)}</div><div className="plan-output"><span>文件位置</span><p>{output.outputFolder}</p><button className="secondary" disabled={!!busy} onClick={() => void execute('openOutput')}><FolderOpen />打开输出目录</button></div></> : <div className="plan-empty">{busy === 'export' ? <SkeletonLines rows={4} label="正在加载导出文件" /> : <FileCheck2 />}<strong>{busy === 'export' ? '正在生成候选 PDF' : '尚未导出'}</strong><p>完成检查和修复后，生成 11 份候选 PDF。</p></div>}
          <div className="plan-export-action"><button className="primary" disabled={!!busy || !audit?.canExport} onClick={() => setConfirm('export')}>{output ? '重新导出 PDF' : '导出 PDF'}</button></div>
        </section>
      </div>
    </div>
    <Dialog.Root open={!!confirm} onOpenChange={open => { if (!open) setConfirm(undefined) }}><Dialog.Portal><Dialog.Overlay className="dialog-overlay" /><Dialog.Content className="plan-confirm">
      <div><Dialog.Title>{confirm === 'repair' ? '确认备份并修复' : '确认导出 PDF'}</Dialog.Title><Dialog.Close asChild><button className="secondary" aria-label="关闭确认"><X /></button></Dialog.Close></div>
      <Dialog.Description>{confirm === 'repair' ? '将先备份 Excel，再修复格式和序号，并自动复查。' : '将生成 11 份候选 PDF，不修改 Excel。'}</Dialog.Description>
      <footer><Dialog.Close asChild><button className="secondary" autoFocus>取消</button></Dialog.Close><button className="primary" onClick={() => confirm && void execute(confirm)}>{confirm === 'repair' ? '备份并修复' : '确认导出'}</button></footer>
    </Dialog.Content></Dialog.Portal></Dialog.Root>
  </div>
}
