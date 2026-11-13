import { useEffect, useRef, useState, type FormEvent } from 'react'
import { FileText } from 'lucide-react'
import { invoke } from '../../bridge/index'
import { Button } from '../../components/ui/button'
import { ButtonGroupSeparator } from '../../components/ui/button-group'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '../../components/ui/input-group'
import { Spinner } from '../../components/ui/spinner'
import { Alert, AlertDescription } from '../../components/ui/alert'
import { Field, FieldDescription, FieldLabel } from '../../components/ui/field'
import { DocumentConnectionAlert, documentLink, type DocumentConnectionState } from './DocumentConnectionAlert'
import type { SubmissionSettingsAdapter } from './business-configuration.types'
import type { SubmissionJob } from './types'

export function SubmissionConnection({ job, adapter, onSaved, onCreated, onActive, onDirty, onReady }: {
  job?: SubmissionJob
  adapter: SubmissionSettingsAdapter
  onSaved: (job: SubmissionJob) => void
  onCreated: (id: string) => void
  onActive: (busy: boolean) => void
  onDirty: (dirty: boolean) => void
  onReady: (ready: boolean) => void
}) {
  const savedUrl = job?.config.documentUrl ?? ''
  const [draft, setDraft] = useState(savedUrl)
  const [connection, setConnection] = useState<DocumentConnectionState>({ state: 'idle' })
  const [saving, setSaving] = useState(false), [opening, setOpening] = useState(false)
  const [error, setError] = useState(''), [notice, setNotice] = useState('')
  const inFlight = useRef(false), generation = useRef(0), mounted = useRef(false)
  const dirty = draft !== savedUrl
  const blocked = saving || opening || connection.state === 'checking'
  const target = documentLink(draft)
  const documentName = (connection.state === 'connected' ? connection.documentName : adapter.readDocumentName(draft.trim()))?.trim() || '共享文档'
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; generation.current++ } }, [])
  useEffect(() => { generation.current++; setDraft(savedUrl); setConnection({ state: 'idle' }); setError('') }, [savedUrl, adapter])
  useEffect(() => { onActive(blocked); return () => onActive(false) }, [blocked, onActive])
  useEffect(() => { onDirty(dirty) }, [dirty, onDirty])
  useEffect(() => { onReady(!!savedUrl && connection.state === 'connected' && !dirty && !blocked) }, [savedUrl, connection.state, dirty, blocked, onReady])
  async function checkConnection() {
    if (blocked) return
    const current = ++generation.current
    setError(''); setNotice('')
    if (!target) { setConnection({ state: 'invalidLink' }); return }
    setConnection({ state: 'checking' })
    try {
      const result = await adapter.checkDocumentConnection(target)
      if (result.state === 'connected' && (!result.documentName?.trim() || !Number.isFinite(Date.parse(result.checkedAt)))) throw new Error('检测结果缺少文档名称或检测时间')
      if (current === generation.current) setConnection(result)
    } catch {
      if (current === generation.current) setConnection({ state: 'unavailable' })
    }
  }
  async function openDocument() {
    if (!target || inFlight.current || blocked) return
    inFlight.current = true; setOpening(true); setError(''); setNotice('')
    try {
      // Reuse the existing document/browser entry. Opening never establishes a connection result.
      await invoke('tencentSheet.sessionOpen', { documentUrl: target }, 60000)
    } catch (failure) {
      if (mounted.current) setError(failure instanceof Error ? failure.message : '打开文档失败，请重试')
    } finally { inFlight.current = false; if (mounted.current) setOpening(false) }
  }
  async function save(event: FormEvent) {
    event.preventDefault()
    if (inFlight.current || blocked || !dirty || !target || job?.enabled) return
    inFlight.current = true; setSaving(true); setError(''); setNotice('')
    try {
      if (job) {
        const result = await invoke<SubmissionJob>('tencentSheet.save', { id: job.id, config: { documentUrl: target }, configRevision: job.configRevision ?? 0 })
        if (mounted.current) onSaved(result)
      } else if (!job) {
        const result = await invoke<{ id: string }>('tencentSheet.create', { documentUrl: target })
        if (mounted.current) onCreated(result.id)
      }
      if (mounted.current) setNotice('已保存')
    } catch (failure) { if (mounted.current) setError(failure instanceof Error ? failure.message : '保存失败，请重试') }
    finally { inFlight.current = false; if (mounted.current) setSaving(false) }
  }
  return <section id="submission-settings-web" aria-labelledby="web-configuration-title" className="space-y-3">
    <h2 id="web-configuration-title" className="text-base font-semibold">网页配置</h2>
    <form onSubmit={save} className="space-y-4">
      <Field className="gap-2">
        <FieldLabel htmlFor="submission-document-url">文档链接</FieldLabel>
        <InputGroup aria-labelledby="web-configuration-title" className="h-11 items-stretch" data-disabled={saving || opening || !!job?.enabled}>
          <InputGroupInput id="submission-document-url" className="h-full basis-0 px-3" type="url" required value={draft} disabled={saving || opening || !!job?.enabled} placeholder="https://docs.qq.com/sheet/…" onChange={event => {
            generation.current++; setDraft(event.target.value); setConnection({ state: 'idle' }); setNotice(''); setError('')
          }} />
          <InputGroupAddon align="inline-start" className="h-full max-w-[min(35%,12rem)] min-w-0 shrink-0 gap-0 rounded-l-[calc(var(--radius)-1px)] bg-muted/50 p-0">
            <span className="flex min-w-0 items-center gap-2 px-3"><FileText className="size-4 shrink-0" aria-hidden="true" /><span className="truncate" title={documentName} aria-label="文档名称">{documentName}</span></span>
            <ButtonGroupSeparator />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end" className="h-full shrink-0 gap-0 p-0 has-[>button]:mr-0">
            <ButtonGroupSeparator />
            <InputGroupButton variant="secondary" size="sm" className="h-full rounded-none rounded-r-[calc(var(--radius)-1px)] px-3" disabled={!target || blocked} onClick={openDocument}>打开文档</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <DocumentConnectionAlert connection={connection} onLogin={() => setNotice('扫码登录尚未接入')} />
        {adapter.isMock && <FieldDescription>当前为本地界面预览，文档名称识别、连接检测和扫码登录尚未接入。</FieldDescription>}
        {job?.enabled && <FieldDescription>当前任务已启用，请先在任务清单中停用后再修改文档链接。</FieldDescription>}
      </Field>
      {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={blocked || !dirty || !target || !!job?.enabled}>{saving && <Spinner />}保存</Button>
        <Button type="button" variant="outline" disabled={blocked || !draft.trim()} onClick={checkConnection}>检测连接</Button>
        {notice && <span role="status" className="text-sm text-muted-foreground">{notice}</span>}
      </div>
    </form>
  </section>
}
