import { lazy, Suspense, useEffect, useState } from 'react'
import { invoke } from '../../bridge/index'
import { Button } from '../../components/ui/button'
import { Alert, AlertDescription } from '../../components/ui/alert'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs'
import { SubmissionWorkbench } from './SubmissionWorkbench'
import { SubmissionSettingsLoading } from './SubmissionSettingsLoading'
import { SubmissionHistory } from './SubmissionHistory'
import { createSubmissionSettingsMock } from './submission-settings.mock'
import type { SubmissionJob } from './types'

const SubmissionSettings = lazy(() => import('./SubmissionSettings').then(module => ({ default: module.SubmissionSettings })))

export function GroupSubmissionPage() {
  const [tab, setTab] = useState('submission')
  const [settingsOpened, setSettingsOpened] = useState(false)
  const [settingsAdapter] = useState(createSubmissionSettingsMock)
  const [documents, setDocuments] = useState<{ id: string; name: string }[]>([])
  const [selectedId, setSelectedId] = useState<string>()
  const [job, setJob] = useState<SubmissionJob>(), [loadingJob, setLoadingJob] = useState(false)
  const [listError, setListError] = useState(''), [jobError, setJobError] = useState('')
  const [listReload, setListReload] = useState(0), [jobReload, setJobReload] = useState(0)
  const [busy, setBusy] = useState(false)
  useEffect(() => {
    let active = true
    setListError('')
    invoke<{ tasks: { id: string; name: string; taskType: string }[] }>('automation.list', { taskType: 'tencent_sheet_fill' }).then(result => {
      if (!Array.isArray(result.tasks)) throw new Error('文档连接列表响应无效。')
      if (!active) return
      const values = result.tasks.filter(task => task.taskType === 'tencent_sheet_fill')
      setDocuments(values); setSelectedId(values[0]?.id ?? '')
    }).catch(failure => { if (active) setListError(failure instanceof Error ? failure.message : String(failure)) })
    return () => { active = false }
  }, [listReload])
  useEffect(() => {
    let active = true
    setJob(undefined); setJobError(''); setBusy(false)
    if (!selectedId) { setLoadingJob(false); return }
    setLoadingJob(true)
    invoke<SubmissionJob>('tencentSheet.get', { id: selectedId }).then(value => {
      if (!active) return
      if (value?.id !== selectedId || typeof value.config?.documentUrl !== 'string') throw new Error('文档配置响应无效，请重新读取。')
      setJob(value)
      setDocuments(current => current.some(document => document.id === value.id) ? current : [...current, { id: value.id, name: value.name ?? '文档连接' }])
    }).catch(failure => { if (active) setJobError(failure instanceof Error ? failure.message : String(failure)) })
      .finally(() => { if (active) setLoadingJob(false) })
    return () => { active = false }
  }, [selectedId, jobReload])
  const ready = selectedId !== undefined && !listError && !loadingJob && !jobError && (!selectedId || job?.id === selectedId)
  const listReady = selectedId !== undefined && !listError
  const configurationError = listError
    ? <Alert variant="destructive"><AlertDescription>{listError}<Button variant="outline" onClick={() => setListReload(value => value + 1)}>重新读取连接列表</Button></AlertDescription></Alert>
    : jobError ? <Alert variant="destructive"><AlertDescription>{jobError}<Button variant="outline" onClick={() => setJobReload(value => value + 1)}>重新读取文档配置</Button></AlertDescription></Alert> : undefined
  return <section aria-label="集团填报工作台" className="mx-auto w-full max-w-5xl space-y-6">
    <header><h1 className="text-2xl font-semibold tracking-tight">集团填报</h1></header>
    <Tabs value={tab} onValueChange={value => { if (value === 'settings') setSettingsOpened(true); setTab(value) }} className="gap-5">
      <TabsList aria-label="集团填报"><TabsTrigger value="submission" disabled={busy}>概览</TabsTrigger><TabsTrigger value="history" disabled={busy}>记录</TabsTrigger><TabsTrigger value="settings" disabled={busy}>设置</TabsTrigger></TabsList>
      <TabsContent value="submission"><SubmissionWorkbench key={job?.id ?? 'new'} businessDate={job?.businessDate} connected={ready && !!job} loading={!ready && !configurationError} error={configurationError} configure={() => { setSettingsOpened(true); setTab('settings') }} /></TabsContent>
      <TabsContent value="history">{listError ? configurationError : listReady && tab === 'history' && <SubmissionHistory key={selectedId || 'new'} id={selectedId || undefined} />}</TabsContent>
      <TabsContent value="settings" forceMount hidden={tab !== 'settings'}>{settingsOpened && <Suspense fallback={<SubmissionSettingsLoading stage="module" />}>
        <SubmissionSettings key={selectedId} configurationLoading={!ready} configurationError={configurationError} adapter={settingsAdapter} job={job} onSaved={setJob} onCreated={setSelectedId} onActive={setBusy} onDirty={() => {}} />
      </Suspense>}</TabsContent>
    </Tabs>
  </section>
}
