import { useEffect, useState, type ComponentProps, type ReactNode } from 'react'
import { Alert, AlertDescription } from '../../components/ui/alert'
import { Button } from '../../components/ui/button'
import { Spinner } from '../../components/ui/spinner'
import { Toaster } from '../../components/ui/sonner'
import { SubmissionConnection } from './SubmissionConnection'
import { SubmissionExecutionRules } from './SubmissionExecutionRules'
import { BusinessConfiguration } from './BusinessConfiguration'
import { createSubmissionSettingsMock } from './submission-settings.mock'
import type { BusinessDataOption, SubmissionSettingsAdapter } from './business-configuration.types'
import { SubmissionSettingsLoading } from './SubmissionSettingsLoading'
import type { ConnectionStatus } from './DocumentConnectionItem'

type Props = Omit<ComponentProps<typeof SubmissionConnection>, 'onReady' | 'onStatusChange'> & {
  adapter?: SubmissionSettingsAdapter; configurationLoading?: boolean; configurationError?: ReactNode
}
export function SubmissionSettings({ adapter: suppliedAdapter, configurationLoading, configurationError, ...props }: Props) {
  const [adapter] = useState(() => suppliedAdapter ?? createSubmissionSettingsMock())
  const [canPick, setCanPick] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('unconfigured')
  const connected = connectionStatus === 'connected'
  const [sources, setSources] = useState<readonly BusinessDataOption[]>([]), [loading, setLoading] = useState(true)
  const [error, setError] = useState(''), [reload, setReload] = useState(0)
  useEffect(() => {
    let active = true
    setLoading(true); setError('')
    adapter.listDataSources().then(values => { if (active) setSources(values) }).catch(failure => { if (active) setError(failure instanceof Error ? failure.message : '读取数据来源失败') }).finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [adapter, reload])
  return <div className="min-w-0 space-y-6" aria-label="集团填报设置">
    {configurationLoading || configurationError
      ? <SubmissionSettingsLoading error={configurationError} />
      : <SubmissionConnection key={props.job?.id} {...props} onReady={setCanPick} onStatusChange={setConnectionStatus} />}
    {loading && <Spinner aria-label="正在读取数据来源" />}
    {error && <Alert variant="destructive"><AlertDescription>{error}<Button variant="outline" size="sm" onClick={() => setReload(value => value + 1)}>重新读取</Button></AlertDescription></Alert>}
    <BusinessConfiguration dataOptions={sources} adapter={adapter} documentUrl={props.job?.config.documentUrl}
      connected={connected && !configurationLoading && !configurationError} canPick={canPick && !configurationLoading && !configurationError} />
    <SubmissionExecutionRules adapter={adapter} job={props.job} dataOptions={sources}
      loginRequired={!configurationLoading && !configurationError && connectionStatus === 'notLoggedIn'} />
    <Toaster containerAriaLabel="通知" />
  </div>
}
