import { useState, type ComponentProps, type ReactNode } from 'react'
import { Alert, AlertDescription } from '../../components/ui/alert'
import { Button } from '../../components/ui/button'
import { Spinner } from '../../components/ui/spinner'
import { Toaster } from '../../components/ui/sonner'
import { SubmissionConnection } from './SubmissionConnection'
import { SubmissionExecutionRules } from './SubmissionExecutionRules'
import { BusinessConfiguration } from './BusinessConfiguration'
import { createPositionPreview } from './submission-settings.mock'
import { useSubmissionConfiguration } from './useSubmissionConfiguration'
import { SubmissionSettingsLoading } from './SubmissionSettingsLoading'
import type { ConnectionStatus } from './DocumentConnectionItem'

type Props = Omit<ComponentProps<typeof SubmissionConnection>, 'onReady' | 'onStatusChange'> & {
  configurationLoading?: boolean; configurationError?: ReactNode
}
export function SubmissionSettings({ configurationLoading, configurationError, ...props }: Props) {
  const [adapter] = useState(createPositionPreview)
  const { configuration, loading, loadError, refresh, save } = useSubmissionConfiguration(props.job?.id, props.job?.configRevision)
  const [canPick, setCanPick] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('unconfigured')
  const connected = connectionStatus === 'connected'
  return <div className="min-w-0 space-y-6" aria-label="集团填报设置">
    {configurationLoading || configurationError
      ? <SubmissionSettingsLoading error={configurationError} />
      : <SubmissionConnection key={props.job?.id} {...props} onReady={setCanPick} onStatusChange={setConnectionStatus} />}
    {loading && !configuration && <Spinner aria-label="正在读取集团填报配置" />}
    {loadError && <Alert variant="destructive"><AlertDescription>{loadError}<Button variant="outline" size="sm" onClick={() => void refresh()}>重新读取配置</Button></AlertDescription></Alert>}
    {configuration && <>
      <BusinessConfiguration items={configuration.businesses} dataOptions={configuration.dataOptions} adapter={adapter} save={save} refresh={refresh}
        connected={connected && !configurationLoading && !configurationError} canPick={canPick && !configurationLoading && !configurationError} />
      <SubmissionExecutionRules configuration={configuration} job={props.job} save={save} refresh={refresh}
        loginRequired={!configurationLoading && !configurationError && connectionStatus === 'notLoggedIn'} />
    </>}
    <Toaster containerAriaLabel="通知" />
  </div>
}
