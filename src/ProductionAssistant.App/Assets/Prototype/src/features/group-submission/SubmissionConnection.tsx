import { useEffect, useRef, useState, type FormEvent } from 'react'
import { LoaderCircle } from 'lucide-react'
import { invoke } from '../../bridge/index'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Alert, AlertDescription } from '../../components/ui/alert'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card'
import { TencentSessionPanel } from '../daily-report/tencent-sheet/TencentSessionPanel'
import type { SubmissionJob } from './types'

export function SubmissionConnection({ job, onSaved, onCreated, onActive, onDirty }: {
  job?: SubmissionJob
  onSaved: (job: SubmissionJob) => void
  onCreated: (id: string) => void
  onActive: (busy: boolean) => void
  onDirty: (dirty: boolean) => void
}) {
  const [draft, setDraft] = useState(job?.config.documentUrl ?? '')
  const [saving, setSaving] = useState(false), [sessionBusy, setSessionBusy] = useState(false)
  const [error, setError] = useState(''), [notice, setNotice] = useState('')
  const inFlight = useRef(false), mounted = useRef(false)
  const savedUrl = job?.config.documentUrl ?? ''
  const dirty = draft !== savedUrl
  const blocked = saving || sessionBusy
  useEffect(() => { mounted.current = true; return () => { mounted.current = false } }, [])
  useEffect(() => { setDraft(savedUrl) }, [savedUrl])
  useEffect(() => { onActive(blocked) }, [blocked, onActive])
  useEffect(() => { onDirty(dirty) }, [dirty, onDirty])

  async function save(event: FormEvent) {
    event.preventDefault()
    if (inFlight.current || sessionBusy || job?.enabled || !draft.trim() || !dirty) return
    inFlight.current = true; setSaving(true); setError(''); setNotice('')
    try {
      if (job) {
        const result = await invoke<SubmissionJob>('tencentSheet.save', { id: job.id, config: { documentUrl: draft }, configRevision: job.configRevision ?? 0 })
        if (mounted.current) { onSaved(result); setNotice('文档链接已保存。') }
      } else {
        const result = await invoke<{ id: string }>('tencentSheet.create', { documentUrl: draft })
        // Select the persisted identity before loading it, so a failed get cannot create a duplicate.
        if (mounted.current) onCreated(result.id)
      }
    } catch (failure) {
      if (mounted.current) setError(failure instanceof Error ? failure.message : String(failure))
    } finally {
      inFlight.current = false
      if (mounted.current) setSaving(false)
    }
  }

  return <div className="space-y-4">
    <Card><CardHeader><CardTitle><h2>文档连接</h2></CardTitle><CardDescription>保存腾讯文档链接，再打开浏览器检查登录与访问权限。</CardDescription></CardHeader>
      <CardContent className="space-y-4">
        {job?.enabled && <Alert><AlertDescription>此文档已启用定时执行。请先在任务清单中停用，再修改链接；本阶段未接入调度开关。</AlertDescription></Alert>}
        <form onSubmit={save} className="space-y-3" aria-busy={saving}>
          <div className="space-y-2"><label htmlFor="submission-document-url" className="text-sm font-medium">目标腾讯文档链接</label>
            <Input id="submission-document-url" type="url" required value={draft} disabled={blocked || !!job?.enabled} placeholder="https://docs.qq.com/sheet/…" aria-describedby="submission-link-help" onChange={event => { setDraft(event.target.value); setError(''); setNotice('') }} />
            <p id="submission-link-help" className="text-sm text-muted-foreground">{dirty ? '链接尚未保存。保存后才能检查新目标；切换标签保留草稿，离开页面会放弃草稿。' : job ? '已保存，重启应用后自动恢复。' : '尚未配置目标文档。'}</p>
          </div>
          <div className="flex flex-wrap gap-2"><Button type="submit" disabled={blocked || !!job?.enabled || !dirty || !draft.trim()}>{saving && <LoaderCircle className="size-4 animate-spin" />}{job ? '保存文档链接' : '保存文档连接'}</Button>
            {dirty && <Button type="button" variant="outline" disabled={blocked} onClick={() => { setDraft(savedUrl); setError(''); setNotice('') }}>放弃修改</Button>}</div>
        </form>
        {notice && <p role="status" className="text-sm">{notice}</p>}
        {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
      </CardContent>
    </Card>
    {job && <TencentSessionPanel key={job.id} documentUrl={savedUrl} disabled={dirty || saving} onActive={setSessionBusy} />}
  </div>
}
