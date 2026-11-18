import { useEffect, useSyncExternalStore, type ReactNode } from 'react'
import { getServiceState, subscribeServiceState, requestServiceState, restartApplication } from '../../bridge/index'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { Button } from '../ui/button'
import { Spinner } from '../ui/spinner'

export function LocalServiceBoundary({ children }: { children: ReactNode | ((ready: boolean) => ReactNode) }) {
  const service = useSyncExternalStore(subscribeServiceState, getServiceState)
  useEffect(requestServiceState, [])
  const ready = service.state === 'Ready'
  const renderContent = typeof children === 'function'
  const failed = ['Failed', 'Stopped', 'Stopping'].includes(service.state)
  return <>
    {!ready && (!renderContent || failed) && <div className="space-y-6" data-shadcn-surface="" aria-busy={!failed}>
    <Alert variant={failed ? 'destructive' : 'default'} role={failed ? 'alert' : 'status'}>
      <AlertTitle>{failed ? '本地服务暂不可用' : '正在初始化本地服务'}</AlertTitle>
      <AlertDescription>{failed ? '请重新启动应用；未完成操作的结果请先核对。' : '正在准备本地配置，完成后将读取业务数据。'}</AlertDescription>
      {failed && <Button variant="outline" className="mt-3" onClick={restartApplication}>重新启动应用</Button>}
    </Alert>
    {!failed && <Spinner aria-label="正在初始化本地服务" />}
    </div>}
    {renderContent ? children(ready) : ready && children}
  </>
}
