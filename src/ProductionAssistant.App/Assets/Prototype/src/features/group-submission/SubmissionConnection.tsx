import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { toast } from 'sonner'
import { invoke } from '../../bridge/index'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../../components/ui/alert-dialog'
import { DocumentConnectionItem, connectionFromSession, documentLink, type ConnectionAction, type DocumentConnectionState, type DocumentSessionEvidence } from './DocumentConnectionItem'
import type { SubmissionJob } from './types'

export function SubmissionConnection({ job, onSaved, onCreated, onActive, onDirty, onReady }: {
  job?: SubmissionJob; onSaved: (job: SubmissionJob) => void; onCreated: (id: string) => void
  onActive: (busy: boolean) => void; onDirty: (dirty: boolean) => void; onReady: (ready: boolean) => void
}) {
  const savedUrl = job?.config.documentUrl ?? ''
  const [draft, setDraft] = useState(savedUrl), [editing, setEditing] = useState(!savedUrl)
  const [connection, setConnection] = useState<DocumentConnectionState>({ state: savedUrl ? 'idle' : 'unconfigured' })
  const [operation, setOperation] = useState<string>(), [confirmClear, setConfirmClear] = useState(false)
  const flight = useRef<symbol | null>(null), generation = useRef(0), mounted = useRef(false)
  const busy = !!operation || connection.state === 'checking'
  const dirty = editing && draft !== savedUrl
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; generation.current++ } }, [])
  const check = useCallback(async (action: 'Status' | 'Verify' | 'Open' = 'Verify') => {
    if (!savedUrl || flight.current) return
    const token = Symbol(), current = generation.current
    flight.current = token; setConnection(value => ({ ...value, state: 'checking' }))
    try {
      const result = documentLink(savedUrl) ? connectionFromSession(await invoke<DocumentSessionEvidence>(`tencentSheet.session${action}`, { documentUrl: savedUrl }, 60000)) : { state: 'invalidLink' as const }
      if (mounted.current && current === generation.current) setConnection(result)
    } catch {
      if (mounted.current && current === generation.current) setConnection({ state: 'unavailable' })
    } finally { if (flight.current === token) flight.current = null }
  }, [savedUrl])
  useEffect(() => {
    generation.current++; setDraft(savedUrl); setEditing(!savedUrl); setConnection({ state: savedUrl ? 'idle' : 'unconfigured' })
    const current = generation.current
    queueMicrotask(() => { if (mounted.current && current === generation.current) void check('Status') })
  }, [savedUrl, check])
  useEffect(() => {
    const refresh = () => { if (!editing && !flight.current) void check(connection.state === 'notLoggedIn' ? 'Verify' : 'Status') }
    window.addEventListener('focus', refresh)
    return () => window.removeEventListener('focus', refresh)
  }, [check, editing, connection.state])
  useEffect(() => { onActive(busy); return () => onActive(false) }, [busy, onActive])
  useEffect(() => { onDirty(dirty) }, [dirty, onDirty])
  useEffect(() => { onReady(!!savedUrl && connection.state === 'connected' && !editing && !busy) }, [savedUrl, connection.state, editing, busy, onReady])

  async function save(event: FormEvent) {
    event.preventDefault()
    if (flight.current || !draft.trim() || job?.enabled) return
    const target = documentLink(draft)
    if (!target) { toast.error('请粘贴腾讯文档表格的 HTTPS 链接'); return }
    const token = Symbol(), current = generation.current
    flight.current = token; setOperation('save')
    try {
      if (job) {
        const result = await invoke<SubmissionJob>('tencentSheet.save', { id: job.id, config: { documentUrl: target }, configRevision: job.configRevision ?? 0 })
        if (!result || result.id !== job.id || result.config?.documentUrl !== target) throw new Error('保存响应无效，请重新读取文档配置')
        if (mounted.current && current === generation.current) {
          flight.current = null; setEditing(false); onSaved(result)
          if (target === savedUrl) void check()
        }
      } else {
        const result = await invoke<{ id: string }>('tencentSheet.create', { documentUrl: target })
        if (!result?.id) throw new Error('创建文档配置响应无效')
        if (mounted.current && current === generation.current) { flight.current = null; onCreated(result.id) }
      }
      // The acknowledged configuration triggers verification after the parent reads it.
    } catch (failure) { if (mounted.current && current === generation.current) toast.error(failure instanceof Error ? failure.message : '保存失败，请重试') }
    finally { if (flight.current === token) flight.current = null; if (mounted.current) setOperation(undefined) }
  }
  async function action(value: ConnectionAction) {
    if (flight.current) return
    if (value === 'replace') { setDraft(savedUrl); setEditing(true); return }
    if (value === 'check' || value === 'login') { await check(value === 'login' ? 'Open' : 'Verify'); return }
    if (value === 'open') {
      const token = Symbol(); flight.current = token; setOperation('open')
      try { await invoke('tencentSheet.sessionOpen', { documentUrl: savedUrl }, 60000) }
      catch { if (mounted.current) toast.error('打开文档失败，请重试') }
      finally { if (flight.current === token) flight.current = null; if (mounted.current) setOperation(undefined) }
    }
  }
  async function copyLink() {
    try { await navigator.clipboard.writeText(savedUrl); toast.success('链接已复制') }
    catch { toast.error('复制失败，请重试') }
  }
  return <section id="submission-settings-web" aria-labelledby="web-configuration-title" className="space-y-3">
    <h2 id="web-configuration-title" className="text-base font-semibold">网页配置</h2>
    <form onSubmit={save}><DocumentConnectionItem connection={connection} url={savedUrl} draft={draft} editing={editing} busy={busy} locked={job?.enabled} onDraft={setDraft} onAction={action} onCancel={() => { setDraft(savedUrl); setEditing(false) }} onCopy={copyLink} onClear={() => setConfirmClear(true)} /></form>
    {job?.enabled && <p className="text-sm text-muted-foreground">当前任务已启用，请先在任务清单中停用后再更换文档。</p>}
    <AlertDialog open={confirmClear} onOpenChange={setConfirmClear}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>清除登录状态？</AlertDialogTitle><AlertDialogDescription>当前版本暂不支持清除登录状态。多个腾讯文档可能共用同一浏览器登录会话，清除可能影响这些文档。</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>取消</AlertDialogCancel><AlertDialogAction variant="destructive" disabled>清除登录状态</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
  </section>
}
