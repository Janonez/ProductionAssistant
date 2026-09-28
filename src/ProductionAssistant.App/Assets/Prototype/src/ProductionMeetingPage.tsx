import { useEffect, useRef, useState } from 'react'
import { FileSpreadsheet, FolderOpen, LoaderCircle } from 'lucide-react'
import { invoke } from './bridge'
import { SkeletonLines } from './LoadingSkeleton'
import './production-meeting.css'

interface Result { resultId: string; outputPath: string; meetingDate: string; sheetNames: string[] }
const name = (path: string) => path.split(/[\\/]/).pop()
export function ProductionMeetingPage() {
  const [path, setPath] = useState('')
  const [result, setResult] = useState<Result>()
  const [busy, setBusy] = useState<'pick' | 'export' | 'open'>()
  const [error, setError] = useState('')
  const locked = useRef(false)
  const version = useRef(0)
  useEffect(() => () => { version.current++ }, [])
  function changePath(value: string) {
    if (locked.current) return
    setPath(value); setResult(undefined); setError('')
  }
  async function perform(action: 'pick' | 'export' | 'open') {
    if (locked.current || (action === 'export' && !path.trim()) || (action === 'open' && !result)) return
    locked.current = true; const current = ++version.current
    setBusy(action); setError(''); if (action === 'export') setResult(undefined)
    try {
      if (action === 'pick') {
        const file = await invoke<{ path?: string }>('meeting.pickFile', undefined, 600000)
        if (current === version.current && file.path) { setPath(file.path); setResult(undefined) }
      } else if (action === 'export') {
        const next = await invoke<Result>('meeting.export', { path: path.trim() }, 1800000)
        if (current === version.current) setResult(next)
      } else await invoke('meeting.openOutput', { resultId: result!.resultId })
    } catch (error) { if (current === version.current) setError(error instanceof Error ? error.message : String(error)) }
    finally { if (current === version.current) { locked.current = false; setBusy(undefined) } }
  }
  return <div className="page meeting-page">
    <header className="meeting-header"><h1>生产会资料拆分</h1><span>{busy === 'export' ? '正在拆分' : result ? '拆分完成' : '等待拆分'}</span></header>
    <div className="meeting-content">
      {error && <p className="meeting-error" role="alert">{error}</p>}
      <div className="meeting-workspace">
        <section><h2>源文件</h2><label htmlFor="meeting-source">生产会资料 Excel</label><div className="meeting-input"><input id="meeting-source" value={path} disabled={!!busy} onChange={event => changePath(event.target.value)} placeholder="选择 .xlsx、.xlsm 或 .xls 文件" /><button className="secondary" disabled={!!busy} onClick={() => void perform('pick')}><FolderOpen />选择文件</button></div>
          <p className="meeting-hint">源文件需包含一个工作表，按已发运、在制、预投三个分段拆分。</p>
          <details className="meeting-rules"><summary>拆分规则</summary><p>生成包含三个独立工作表的 .xlsx，保存到源文件所在目录，保留源文件。</p><p>保留原有内容、公式和布局，清除红色与绿色背景填充。宏不会保留到输出文件。</p></details>
          <div className="meeting-actions"><button className="primary" disabled={!!busy || !path.trim()} onClick={() => void perform('export')}>{busy === 'export' ? '正在拆分…' : result ? '重新拆分' : '开始拆分'}</button></div>
        </section>
        <section className="meeting-result" aria-live="polite"><div className="meeting-result-heading"><h2>拆分结果</h2>{result && <span>{result.sheetNames.length} 个工作表</span>}</div>
          {result ? <><div className="meeting-file"><FileSpreadsheet /><div><h3>{name(result.outputPath)}</h3><p>开会日期 · {result.meetingDate}</p></div></div><ol>{result.sheetNames.map(sheet => <li key={sheet}>{sheet}</li>)}</ol><div className="meeting-output"><span>文件位置</span><p>{result.outputPath}</p><button className="secondary" disabled={!!busy} onClick={() => void perform('open')}><FolderOpen />打开文件位置</button></div></> : <div className="meeting-empty">{busy === 'export' ? <SkeletonLines rows={4} label="正在加载拆分结果" /> : <FileSpreadsheet />}<strong>{busy === 'export' ? '正在生成拆分文件' : '尚未生成拆分文件'}</strong><p>{busy === 'export' ? '正在检查并处理工作表，请稍候。' : '选择源文件后开始拆分。'}</p></div>}
        </section>
      </div>
    </div>
  </div>
}
