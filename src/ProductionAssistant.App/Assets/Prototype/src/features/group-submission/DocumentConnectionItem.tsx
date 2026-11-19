import { FileText, MoreHorizontal, ExternalLink } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Badge } from '../../components/ui/badge'
import { Item, ItemMedia, ItemContent, ItemTitle, ItemActions } from '../../components/ui/item'
import { Spinner } from '../../components/ui/spinner'
import { Tooltip, TooltipTrigger, TooltipContent } from '../../components/ui/tooltip'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '../../components/ui/dropdown-menu'
import type { TencentSessionStatus } from '../daily-report/tencent-sheet/TencentSessionPanel'

// Account, document permission and target eligibility remain separate facts.
export type DocumentSessionEvidence = Omit<TencentSessionStatus, 'editPermission'> & {
  editPermission: 'unknown' | 'read-only' | 'editable'
  documentName?: string | null
  authenticationSource?: 'server' | null
}

export type ConnectionStatus = 'unconfigured' | 'loadingSummary' | 'summaryUnavailable' | 'notConnected' | 'checking' | 'connected' | 'notLoggedIn' | 'invalidLink' | 'readOnly' | 'accessDenied'
export type DocumentConnectionState = { state: ConnectionStatus; documentName?: string; checkedAt?: string }
export type ConnectionAction = 'connect' | 'readSummary' | 'check' | 'open' | 'login' | 'replace'
const states: Record<ConnectionStatus, { label?: string; action?: ConnectionAction; button?: string; className?: string }> = {
  unconfigured: { action: 'connect', button: '连接' },
  loadingSummary: { label: '读取连接状态…', className: 'text-muted-foreground' },
  summaryUnavailable: { label: '连接状态读取失败', action: 'readSummary', button: '重新读取', className: 'text-muted-foreground' },
  notConnected: { label: '未连接', action: 'check', button: '连接' },
  checking: { label: '检测中…' },
  connected: { label: '已连接', action: 'open', button: '打开文档', className: 'border-emerald-600/30 text-emerald-700 dark:border-emerald-400/30 dark:text-emerald-400' },
  notLoggedIn: { label: '需要重新登录', action: 'login', button: '扫码登录', className: 'border-destructive/40 text-destructive' },
  invalidLink: { label: '不是表格链接', action: 'replace', button: '更换文档', className: 'border-destructive/40 text-destructive' },
  readOnly: { label: '只读', action: 'open', button: '打开文档', className: 'border-destructive/40 text-destructive' },
  accessDenied: { label: '无编辑权限', action: 'check', button: '重新检测', className: 'border-destructive/40 text-destructive' },
}

export function documentLink(value: string) {
  const target = value.trim()
  try {
    const url = new URL(target)
    return url.protocol === 'https:' && ['docs.qq.com', 'doc.weixin.qq.com'].includes(url.hostname)
      && !url.username && !url.password && !url.port && /^\/sheets?\/[^/\s]+\/?$/.test(url.pathname) && !/\s/.test(target) ? url.href : undefined
  } catch { return undefined }
}

function confirmationAge(checkedAt?: string) {
  const time = Date.parse(checkedAt ?? '')
  if (!Number.isFinite(time)) return undefined
  const minutes = Math.max(0, Math.floor((Date.now() - time) / 60000))
  const label = minutes < 1 ? '刚刚确认' : minutes < 60 ? `${minutes} 分钟前确认` : minutes < 1440
    ? `${Math.floor(minutes / 60)} 小时前确认` : `${Math.floor(minutes / 1440)} 天前确认`
  return { label, stale: minutes >= 1440, absolute: new Date(time).toLocaleString('zh-CN') }
}

export function DocumentConnectionItem({ connection, url, draft, editing, busy, checking, locked, onDraft, onAction, onCancel, onCopy, onClear }: {
  connection: DocumentConnectionState; url: string; draft: string; editing: boolean; busy: boolean; checking?: boolean; locked?: boolean
  onDraft: (value: string) => void; onAction: (action: ConnectionAction) => void; onCancel: () => void; onCopy: () => void; onClear: () => void
}) {
  const view = states[connection.state]
  const age = connection.state === 'connected' ? confirmationAge(connection.checkedAt) : undefined
  const name = connection.documentName?.trim() || '腾讯文档'
  return <Item variant="outline" size="sm" className="h-14 min-w-0 flex-nowrap gap-3 py-0 has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-[3px] has-[input:focus-visible]:ring-ring/50" data-connection-state={connection.state} aria-label="文档连接" aria-busy={busy || connection.state === 'loadingSummary'}>
    <ItemMedia><FileText className="size-5 text-muted-foreground" aria-hidden="true" /></ItemMedia>
    <ItemContent className="min-w-0 flex-row items-center gap-2">
      {editing ? <Input id="submission-document-url" aria-label="文档链接" type="text" inputMode="url" autoComplete="off" autoFocus={!!url} value={draft} placeholder="粘贴腾讯文档链接" disabled={busy || locked} onChange={event => onDraft(event.target.value)} className="h-9 min-w-0 rounded-none border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 dark:bg-transparent" />
        : <><Tooltip><TooltipTrigger asChild><ItemTitle tabIndex={0} aria-label="文档名称" className="block min-w-0 truncate">{name}</ItemTitle></TooltipTrigger><TooltipContent className="max-w-sm break-all">{url}</TooltipContent></Tooltip>
          {view.label && <Badge variant="outline" className={'shrink-0 gap-1 ' + (age?.stale ? 'text-muted-foreground' : view.className ?? '')} role="status" aria-live="polite" title={age?.absolute}>
            {(checking || connection.state === 'checking') && <Spinner aria-label="正在检测文档连接" />}
            {view.label}{age && <span> · {age.label}</span>}
          </Badge>}
          {checking && connection.state !== 'checking' && <span className="sr-only" aria-live="polite">检测中…</span>}</>}
    </ItemContent>
    <ItemActions className="shrink-0 gap-1">
      {editing ? <><Button type="submit" size="sm" disabled={busy || locked || !draft.trim()}>连接</Button>{url && <Button type="button" size="sm" variant="ghost" disabled={busy} onClick={onCancel}>取消</Button>}</>
        : <>{view.action && <Button type="button" size="sm" variant="outline" disabled={busy || (locked && view.action === 'replace')} onClick={() => onAction(view.action!)}>{view.button}{view.action === 'open' && <ExternalLink aria-hidden="true" />}</Button>}
          <DropdownMenu><DropdownMenuTrigger asChild><Button type="button" variant="ghost" size="icon" className="size-8" aria-label="文档更多操作" disabled={busy}><MoreHorizontal aria-hidden="true" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end"><DropdownMenuItem onSelect={() => onAction('check')}>重新检测</DropdownMenuItem><DropdownMenuItem disabled={locked} onSelect={() => onAction('replace')}>更换文档</DropdownMenuItem><DropdownMenuItem onSelect={onCopy}>复制链接</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem variant="destructive" onSelect={onClear}>清除登录状态</DropdownMenuItem></DropdownMenuContent>
          </DropdownMenu></>}
    </ItemActions>
  </Item>
}
