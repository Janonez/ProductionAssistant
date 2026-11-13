import { useEffect, useState, type ComponentProps } from 'react'
import { Alert, AlertDescription } from '../../components/ui/alert'
import { Button } from '../../components/ui/button'
import { Separator } from '../../components/ui/separator'
import { Spinner } from '../../components/ui/spinner'
import { Toaster } from '../../components/ui/sonner'
import { SubmissionConnection } from './SubmissionConnection'
import { SubmissionExecutionRules } from './SubmissionExecutionRules'
import { BusinessConfiguration } from './BusinessConfiguration'
import { createSubmissionSettingsMock } from './submission-settings.mock'
import type { BusinessDataOption, SubmissionSettingsAdapter } from './business-configuration.types'

type Props = Omit<ComponentProps<typeof SubmissionConnection>, 'adapter' | 'onReady'> & { adapter?: SubmissionSettingsAdapter }
export function SubmissionSettings({ adapter: suppliedAdapter, ...props }: Props) {
  const [adapter] = useState(() => suppliedAdapter ?? createSubmissionSettingsMock())
  const [canPick, setCanPick] = useState(false)
  const [sources, setSources] = useState<readonly BusinessDataOption[]>([]), [loading, setLoading] = useState(true)
  const [error, setError] = useState(''), [reload, setReload] = useState(0)
  useEffect(() => {
    let active = true
    setLoading(true); setError('')
    adapter.listDataSources().then(values => { if (active) setSources(values) }).catch(failure => { if (active) setError(failure instanceof Error ? failure.message : '读取数据来源失败') }).finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [adapter, reload])
  return <div className="min-w-0 space-y-6" aria-label="集团填报设置">
    <SubmissionConnection {...props} adapter={adapter} onReady={setCanPick} />
    <Separator />
    {loading && <Spinner aria-label="正在读取数据来源" />}
    {error && <Alert variant="destructive"><AlertDescription>{error}<Button variant="outline" size="sm" onClick={() => setReload(value => value + 1)}>重新读取</Button></AlertDescription></Alert>}
    <BusinessConfiguration dataOptions={sources} adapter={adapter} canPick={canPick} />
    <Separator />
    <SubmissionExecutionRules adapter={adapter} job={props.job} dataOptions={sources} />
    <Alert role="note"><AlertDescription>业务配置和执行规则仅保留在当前页面。</AlertDescription></Alert>
    <Toaster containerAriaLabel="通知" />
  </div>
}
