import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { toast } from 'sonner'
import { invoke } from '../../bridge/index'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../../components/ui/alert-dialog'
import { DocumentConnectionItem, connectionFromSession, documentLink, type ConnectionAction, type ConnectionStatus, type DocumentConnectionState, type DocumentSessionEvidence } from './DocumentConnectionItem'
import type { SubmissionJob } from './types'
import { TencentLoginDialog } from './TencentLoginDialog'

function readConnection(key: string | undefined, revision: number, hasUrl: boolean): DocumentConnectionState {
  if (!hasUrl) return { state: 'unconfigured' }
  if (key) {
    try {
      const value = JSON.parse(localStorage.getItem(key) ?? 'null')
      if (value?.revision === revision && typeof value.checkedAt === 'string' && Number.isFinite(Date.parse(value.checkedAt))) {
        return { state: 'connected', documentName: typeof value.documentName === 'string' ? value.documentName : undefined, checkedAt: value.checkedAt }
      }
    } catch { /* Storage is optional for the live connection. */ }
  }
  return { state: 'idle' }
}

function rememberConnection(key: string | undefined, revision: number, result?: DocumentConnectionState) {
  if (!key) return
  try {
    if (result?.state === 'connected' && result.checkedAt) {
      localStorage.setItem(key, JSON.stringify({ revision, checkedAt: result.checkedAt, documentName: result.documentName }))
    } else {
      localStorage.removeItem(key)
    }
  } catch { /* Storage is optional for the live connection. */ }
}

export function SubmissionConnection({ job, onSaved, onCreated, onActive, onDirty, onReady, onStatusChange }: {
  job?: SubmissionJob; onSaved: (job: SubmissionJob) => void; onCreated: (id: string) => void
  onActive?: (busy: boolean) => void; onDirty?: (dirty: boolean) => void; onReady: (ready: boolean) => void
  onStatusChange?: (status: ConnectionStatus) => void
}) {
  const savedUrl = job?.config.documentUrl ?? ''
  const revision = job?.configRevision ?? 0
  const storageKey = job?.id && 'pa.submission.last-connection.' + job.id
  const [draft, setDraft] = useState(savedUrl), [editing, setEditing] = useState(!savedUrl)
  const [connection, setConnection] = useState(() => readConnection(storageKey, revision, !!savedUrl))
  const [operation, setOperation] = useState<string>(), [confirmClear, setConfirmClear] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const confirmedConnection = useRef(connection)
  const createAttempt = useRef<{ id: string; url: string; unknown: boolean } | undefined>(undefined)
  const flight = useRef<symbol | null>(null), generation = useRef(0), mounted = useRef(false)
  const busy = !!operation || loginOpen
  const dirty = editing && draft !== savedUrl
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; generation.current++ } }, [])
  const reportConnection = useCallback((result: DocumentConnectionState) => {
    const indeterminate = result.state === 'idle' || result.state === 'unavailable'
    const previous = confirmedConnection.current
    if (indeterminate && previous.state !== 'idle' && previous.state !== 'unavailable' && previous.state !== 'unconfigured') {
      toast.error(result.reason || '暂时无法核验文档连接。')
      return
    }
    const next = { ...result, documentName: result.documentName ?? previous.documentName }
    confirmedConnection.current = next
    rememberConnection(storageKey, revision, next)
    setConnection(next)
  }, [storageKey, revision])
  const check = useCallback(async (action: 'Status' | 'Verify' = 'Verify', autoVerify = false) => {
    if (!savedUrl || flight.current) return
    const token = Symbol(), current = generation.current
    flight.current = token; setOperation('check')
    try {
      const payload = { documentUrl: savedUrl, ...(job ? { id: job.id, configRevision: job.configRevision ?? 0 } : {}) }
      let evidence = documentLink(savedUrl) ? await invoke<DocumentSessionEvidence>(`tencentSheet.session${action}`, payload, 60000) : undefined
      if (autoVerify && evidence && (evidence.state === 'closed' || evidence.state === 'unverified' || evidence.authenticationStale)
        && mounted.current && current === generation.current) evidence = await invoke<DocumentSessionEvidence>('tencentSheet.sessionVerify', payload, 60000)
      const result = evidence ? connectionFromSession(evidence, savedUrl, job?.configRevision ?? 0) : { state: 'invalidLink' as const }
      if (mounted.current && current === generation.current) reportConnection(result)
    } catch {
      if (mounted.current && current === generation.current) reportConnection({ state: 'unavailable', reason: '暂时无法完成检测，请确认本地服务可用后重试。' })
    } finally {
      if (flight.current === token) { flight.current = null; if (mounted.current) setOperation(undefined) }
    }
  }, [savedUrl, job?.id, job?.configRevision, reportConnection])
  useEffect(() => {
    const initial = readConnection(storageKey, revision, !!savedUrl)
    confirmedConnection.current = initial
    generation.current++; flight.current = null; setOperation(undefined); setLoginOpen(false); setDraft(savedUrl); setEditing(!savedUrl); setConnection(initial)
    const current = generation.current
    if (initial.state === 'idle') queueMicrotask(() => { if (mounted.current && current === generation.current) void check('Status', true) })
  }, [savedUrl, check, storageKey, revision])
  useEffect(() => { onActive?.(busy); return () => onActive?.(false) }, [busy, onActive])
  useEffect(() => { onDirty?.(dirty) }, [dirty, onDirty])
  useEffect(() => { onReady(!!savedUrl && connection.state === 'connected' && !editing) }, [savedUrl, connection.state, editing, onReady])
  useEffect(() => { onStatusChange?.(connection.state) }, [connection.state, onStatusChange])
  const verified = useCallback((result: DocumentSessionEvidence) => reportConnection(connectionFromSession(result, savedUrl, revision)), [savedUrl, revision, reportConnection])
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
          flight.current = null; setOperation(undefined); setEditing(false); onSaved(result)
          if (target === savedUrl && result.configRevision === job.configRevision) void check()
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
        if (mounted.current && current === generation.current) { flight.current = null; onCreated(result.id) }
      }
      // The acknowledged configuration triggers verification after the parent reads it.
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
          if (job) onSaved(result); else onCreated(result.id)
        } catch { if (mounted.current && current === generation.current) toast.error((failure instanceof Error ? failure.message : '保存失败') + '；保存结果尚未确认，请先回读配置，不会自动重复创建。') }
      }
    }
    finally { if (flight.current === token) { flight.current = null; if (mounted.current && current === generation.current) setOperation(undefined) } }
  }
  async function action(value: ConnectionAction) {
    if (flight.current) return
    if (value === 'replace') { setDraft(savedUrl); setEditing(true); return }
    if (value === 'login') { setLoginOpen(true); return }
    if (value === 'check') { await check(); return }
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
  async function clearLogin() {
    if (flight.current) return
    const token = Symbol(), current = generation.current
    rememberConnection(storageKey, revision)
    confirmedConnection.current = { state: 'unconfigured' }
    flight.current = token; setConfirmClear(false); setOperation('clear')
    try {
      const result = await invoke<DocumentSessionEvidence>('tencentSheet.sessionClear', { documentUrl: savedUrl, ...(job ? { id: job.id, configRevision: job.configRevision ?? 0 } : {}), confirmClear: true }, 60000)
      if (!mounted.current || current !== generation.current) return
      if (result?.code !== 'LoginCleared') {
        reportConnection({ state: 'unavailable', reason: result?.message || '清除结果尚未确认，请重新检测。' }); return
      }
      reportConnection({ state: 'notLoggedIn', loginExpired: false, reason: '登录资料已清空，请重新登录。' })
      toast.success('登录资料及专属浏览器缓存已清空')
    } catch {
      if (mounted.current && current === generation.current) reportConnection({ state: 'unavailable', reason: '清除结果尚未确认，请重新检测。' })
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
