import { AlertCircle, CircleCheck, CircleHelp, LoaderCircle } from 'lucide-react'
import { format } from 'date-fns/format'
import { Alert, AlertDescription } from '../../components/ui/alert'
import { Button } from '../../components/ui/button'

export type DocumentConnectionState =
  | { state: 'idle' | 'checking' | 'notLoggedIn' | 'readOnly' | 'invalidLink' | 'unavailable' }
  | { state: 'connected'; documentName: string; checkedAt: string }

export function documentLink(value: string) {
  const target = value.trim()
  try {
    const url = new URL(target)
    return url.protocol === 'https:' && ['docs.qq.com', 'doc.weixin.qq.com'].includes(url.hostname)
      && !url.username && !url.password && !url.port && url.pathname !== '/' && !/\s/.test(target) ? target : undefined
  } catch { return undefined }
}

const messages = {
  idle: '尚未检测文档连接',
  checking: '正在检测文档连接...',
  notLoggedIn: '尚未登录共享文档账号',
  readOnly: '当前账号只有查看权限，无法进行数据填报',
  invalidLink: '文档链接无效，请检查链接',
  unavailable: '无法打开文档，请检查网络或文档访问权限',
}

export function DocumentConnectionAlert({ connection, onLogin }: { connection: DocumentConnectionState; onLogin: () => void }) {
  const success = connection.state === 'connected'
  const destructive = !['idle', 'checking', 'connected'].includes(connection.state)
  const Icon = success ? CircleCheck : connection.state === 'checking' ? LoaderCircle : destructive ? AlertCircle : CircleHelp
  return <Alert variant={destructive ? 'destructive' : 'default'} role={destructive ? 'alert' : 'status'}
    data-connection-state={connection.state} aria-live="polite" aria-atomic="true" aria-busy={connection.state === 'checking'}
    className={'min-h-12 items-center py-2 ' + (success ? 'border-emerald-600/30 text-emerald-700 dark:border-emerald-400/30 dark:text-emerald-400' : '')}>
    <Icon aria-hidden="true" className={connection.state === 'checking' ? 'animate-spin' : undefined} />
    <AlertDescription className={'flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-2 ' + (success ? 'text-inherit' : '')}>
      {connection.state === 'connected' ? <span className="min-w-0 break-words">已连接 · {connection.documentName} · 可编辑 · 最近检测：<time dateTime={connection.checkedAt}>{format(new Date(connection.checkedAt), 'yyyy-MM-dd HH:mm')}</time></span>
        : <span>{messages[connection.state]}</span>}
      {connection.state === 'notLoggedIn' && <Button type="button" variant="outline" size="sm" onClick={onLogin}>扫码登录</Button>}
    </AlertDescription>
  </Alert>
}
