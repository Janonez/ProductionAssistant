import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { toast } from 'sonner'
import { invoke } from '../../bridge/index'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../../components/ui/alert-dialog'
import { DocumentConnectionItem, documentLink, type ConnectionAction, type ConnectionStatus, type DocumentConnectionState, type DocumentSessionEvidence } from './DocumentConnectionItem'
import type { SubmissionJob } from './types'
import { TencentLoginDialog } from './TencentLoginDialog'
import { readConnectionSummary } from './connection-summary'

export function SubmissionConnection({ job, onSaved, onCreated, onActive, onDirty, onReady, onStatusChange }: {
  job?: SubmissionJob; onSaved: (job: SubmissionJob) => void; onCreated: (id: string) => void
  onActive?: (busy: boolean) => void; onDirty?: (dirty: boolean) => void; onReady: (ready: boolean) => void
  onStatusChange?: (status: ConnectionStatus) => void
}) {
  const savedUrl = job?.config.documentUrl ?? ''
  const revision = job?.configRevision ?? 0
  const id = job?.id
  const [draft, setDraft] = useState(savedUrl), [editing, setEditing] = useState(!savedUrl)
  const connectionKey = JSON.stringify([id, revision, savedUrl])
  const [summary, setSummary] = useState<{ key: string; value: DocumentConnectionState }>()
  const connection: DocumentConnectionState = !savedUrl ? { state: 'unconfigured' }
    : !documentLink(savedUrl) ? { state: 'invalidLink' }
    : summary?.key === connectionKey ? summary.value : { state: 'loadingSummary' }
  const [operation, setOperation] = useState<string>(), [confirmClear, setConfirmClear] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const latestRead = useRef(0), checkAfterSave = useRef(false)
  const createAttempt = useRef<{ id: string; url: string; unknown: boolean } | undefined>(undefined)
  const flight = useRef<symbol | null>(null), generation = useRef(0), mounted = useRef(false)
  const busy = !!operation || loginOpen
  const dirty = editing && draft !== savedUrl
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; generation.current++ } }, [])
  const refresh = useCallback(async () => {
    if (!id || !documentLink(savedUrl)) return
    const current = generation.current, request = ++latestRead.current
    const isCurrent = () => mounted.current && current === generation.current && request === latestRead.current
    try {
      const result = await readConnectionSummary(id, revision)
      if (isCurrent()) setSummary({ key: connectionKey, value: result })
    } catch (error) {
      if (isCurrent()) setSummary(previous => previous?.key === connectionKey
        ? previous : { key: connectionKey, value: { state: 'summaryUnavailable' } })
      throw error
    }
  }, [connectionKey, id, revision, savedUrl])

  const check = useCallback(async () => {
    if (!id || !savedUrl || flight.current) return
    const token = Symbol(), current = generation.current
    flight.current = token; setOperation('check')
    try {
      const evidence = await invoke<DocumentSessionEvidence>('tencentSheet.sessionVerify', { id, documentUrl: savedUrl, configRevision: revision }, 60000)
      if (mounted.current && current === generation.current) {
        await refresh()
        if (evidence?.state === 'unavailable' && evidence.message) toast.error(evidence.message)
      }
    } catch {
      if (mounted.current && current === generation.current) toast.error('暂时无法完成检测，请确认本地服务可用后重试。')
    } finally {
      if (flight.current === token) { flight.current = null; if (mounted.current) setOperation(undefined) }
    }
  }, [id, revision, savedUrl, refresh])

  useEffect(() => {
    generation.current++; flight.current = null; setOperation(undefined); setLoginOpen(false); setDraft(savedUrl); setEditing(!savedUrl)
    const current = generation.current
    queueMicrotask(() => {
      if (!mounted.current || current !== generation.current) return
      if (checkAfterSave.current) { checkAfterSave.current = false; void check() }
      else void refresh().catch(() => {})
    })
    const readLatest = () => {
      if (!document.hidden && !flight.current) void refresh().catch(() => {})
    }
    const timer = window.setInterval(readLatest, 30000)
    window.addEventListener('focus', readLatest)
    return () => { window.clearInterval(timer); window.removeEventListener('focus', readLatest) }
  }, [id, revision, savedUrl, refresh, check])
  useEffect(() => { onActive?.(busy); return () => onActive?.(false) }, [busy, onActive])
  useEffect(() => { onDirty?.(dirty) }, [dirty, onDirty])
  useEffect(() => { onReady(!!savedUrl && connection.state === 'connected' && !editing) }, [savedUrl, connection.state, editing, onReady])
  useEffect(() => { onStatusChange?.(connection.state) }, [connection.state, onStatusChange])
  const verified = useCallback(() => { void refresh().catch(() => {}) }, [refresh])
  const changeLogin = useCallback((open: boolean) => setLoginOpen(open), [])

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
          if (target !== savedUrl || result.configRevision !== job.configRevision) checkAfterSave.current = true
          flight.current = null; setOperation(undefined); setEditing(false); onSaved(result)
          if (!checkAfterSave.current) void check()
        }
      } else {
        if (createAttempt.current?.unknown && createAttempt.current.url !== target) throw new Error('上次创建结果尚未确认，请先保留原链接回读配置。')
        createAttempt.current ??= { id: crypto.randomUUID().replaceAll('-', ''), url: target, unknown: false }
        const attempt = createAttempt.current
        const result = attempt.unknown
          ? await invoke<SubmissionJob>('tencentSheet.get', { id: attempt.id })
          : await invoke<{ id: string }>('tencentSheet.create', { documentUrl: target, requestId: attempt.id })
        if (!result?.id) throw new Error('创建文档配置响应无效')
        if (attempt.unknown && (!('config' in result) || (result as SubmissionJob).config?.documentUrl !== target)) throw new Error('创建结果尚未确认')
        if (mounted.current && current === generation.current) {
          await invoke('tencentSheet.sessionVerify', { id: result.id, documentUrl: target, configRevision: 0 }, 60000).catch(() => {})
          if (mounted.current && current === generation.current) { flight.current = null; onCreated(result.id) }
        }
      }
    } catch (failure) {
      if (mounted.current && current === generation.current) {
        try {
          if (createAttempt.current) createAttempt.current.unknown = true
          const result = await invoke<SubmissionJob>('tencentSheet.get', { id: job?.id ?? createAttempt.current?.id })
          if (!mounted.current || current !== generation.current) return
          if (job && result?.id === job.id && result.config?.documentUrl && result.config.documentUrl !== target) {
            toast.error(failure instanceof Error ? failure.message : '保存失败，请重试'); return
          }
          if (result?.config?.documentUrl !== target || result.id !== (job?.id ?? createAttempt.current?.id)) throw new Error('配置尚未确认')
          flight.current = null; setOperation(undefined); setEditing(false)
          if (job) { checkAfterSave.current = true; onSaved(result) } else onCreated(result.id)
        } catch { if (mounted.current && current === generation.current) toast.error((failure instanceof Error ? failure.message : '保存失败') + '；保存结果尚未确认，请先回读配置，不会自动重复创建。') }
      }
    }
    finally { if (flight.current === token) { flight.current = null; if (mounted.current && current === generation.current) setOperation(undefined) } }
  }
  async function action(value: ConnectionAction) {
    if (flight.current) return
    if (value === 'replace') { setDraft(savedUrl); setEditing(true); return }
    if (value === 'login') { setLoginOpen(true); return }
    if (value === 'readSummary') { await refresh().catch(() => {}); return }
    if (value === 'check') { await check(); return }
    if (value === 'open') {
      const token = Symbol(); flight.current = token; setOperation('open')
      try { await invoke('tencentSheet.sessionOpen', { id, documentUrl: savedUrl, configRevision: revision }, 60000); await refresh() }
      catch { if (mounted.current) toast.error('打开文档失败，请重试') }
      finally { if (flight.current === token) flight.current = null; if (mounted.current) setOperation(undefined) }
    }
  }
  async function copyLink() {
    try { await navigator.clipboard.writeText(savedUrl); toast.success('链接已复制') }
    catch { toast.error('复制失败，请重试') }
  }
  async function clearLogin() {
    if (flight.current) return
    const token = Symbol(), current = generation.current
    flight.current = token; setConfirmClear(false); setOperation('clear')
    try {
      const result = await invoke<DocumentSessionEvidence>('tencentSheet.sessionClear', { documentUrl: savedUrl, ...(job ? { id: job.id, configRevision: job.configRevision ?? 0 } : {}), confirmClear: true }, 60000)
      if (!mounted.current || current !== generation.current) return
      if (result?.code !== 'LoginCleared') {
        toast.error(result?.message || '清除结果尚未确认，请重新检测。'); return
      }
      await refresh()
      toast.success('登录资料及专属浏览器缓存已清空')
    } catch {
      if (mounted.current && current === generation.current) toast.error('清除结果尚未确认，请重新检测。')
    } finally { if (flight.current === token) flight.current = null; if (mounted.current && current === generation.current) setOperation(undefined) }
  }
  return <section id="submission-settings-web" aria-labelledby="web-configuration-title" className="space-y-3">
    <h2 id="web-configuration-title" className="text-base font-semibold">网页配置</h2>
    <form onSubmit={save}><DocumentConnectionItem connection={operation === 'check' && connection.state !== 'connected' ? { ...connection, state: 'checking' } : connection}
      url={savedUrl} draft={draft} editing={editing} busy={busy} checking={operation === 'check'} locked={job?.enabled} onDraft={setDraft} onAction={action} onCancel={() => { setDraft(savedUrl); setEditing(false) }} onCopy={copyLink} onClear={() => setConfirmClear(true)} /></form>
    {job?.enabled && <p className="text-sm text-muted-foreground">当前任务已启用，请先在任务清单中停用后再更换文档。</p>}
    <TencentLoginDialog open={loginOpen} documentUrl={savedUrl} id={job?.id} configRevision={job?.configRevision ?? 0} onOpenChange={changeLogin} onVerified={verified} />
    <AlertDialog open={confirmClear} onOpenChange={setConfirmClear}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>清除登录状态？</AlertDialogTitle><AlertDialogDescription>将正常关闭当前环境的专属浏览器，并清空其中的登录资料及缓存。会影响共用该会话的全部腾讯文档和旧任务。文档链接、业务配置、规则与历史会保留。</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>取消</AlertDialogCancel><AlertDialogAction variant="destructive" onClick={() => void clearLogin()}>清除登录状态</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
  </section>
}
