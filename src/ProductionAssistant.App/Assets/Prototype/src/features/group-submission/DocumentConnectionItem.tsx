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

export type ConnectionStatus = 'unconfigured' | 'idle' | 'checking' | 'connected' | 'notLoggedIn' | 'invalidLink' | 'readOnly' | 'permissionUnknown' | 'unavailable'
export type DocumentConnectionState = { state: ConnectionStatus; documentName?: string; checkedAt?: string; expiresAt?: string; reason?: string; loginExpired?: boolean; loginAvailable?: boolean }
export type ConnectionAction = 'connect' | 'check' | 'open' | 'login' | 'replace'
const states: Record<ConnectionStatus, { label?: string; action?: ConnectionAction; button?: string; className?: string }> = {
  unconfigured: { action: 'connect', button: '连接' },
  idle: { label: '未检测', action: 'check', button: '检测' },
  checking: { label: '检测中' },
  connected: { label: '已连接', action: 'open', button: '打开文档', className: 'border-emerald-600/30 text-emerald-700 dark:border-emerald-400/30 dark:text-emerald-400' },
  notLoggedIn: { label: '需要登录', action: 'login', button: '扫码登录', className: 'border-destructive/40 text-destructive' },
  invalidLink: { label: '不是表格链接', action: 'replace', button: '更换文档', className: 'border-destructive/40 text-destructive' },
  readOnly: { label: '只有查看权限', action: 'open', button: '打开文档', className: 'border-destructive/40 text-destructive' },
  permissionUnknown: { label: '权限未知', action: 'check', button: '重新核验' },
  unavailable: { label: '无法打开', action: 'check', button: '重新检测', className: 'border-destructive/40 text-destructive' },
}

export function documentLink(value: string) {
  const target = value.trim()
  try {
    const url = new URL(target)
    return url.protocol === 'https:' && ['docs.qq.com', 'doc.weixin.qq.com'].includes(url.hostname)
      && !url.username && !url.password && !url.port && /^\/sheets?\/[^/\s]+\/?$/.test(url.pathname) && !/\s/.test(target) ? url.href : undefined
  } catch { return undefined }
}

export function connectionFromSession(result: DocumentSessionEvidence, expectedTarget?: string, expectedRevision?: number): DocumentConnectionState {
  if (!result || typeof result.browserOpen !== 'boolean') throw new Error('文档检测响应无效')
  if ((expectedTarget && result.targetDocumentUrl && result.targetDocumentUrl !== expectedTarget)
    || (expectedRevision !== undefined && result.configRevision !== undefined && result.configRevision !== null && result.configRevision !== expectedRevision)) return { state: 'unavailable', reason: '文档配置已变化，请重新检测。' }
  const evidence = { documentName: result.documentName?.trim() || undefined, checkedAt: result.documentCheckedAt ?? result.authenticationObservedAt ?? undefined, expiresAt: result.permissionCheck?.expiresAt, reason: result.message || undefined,
    loginAvailable: result.authentication === 'unknown' && ['AuthenticationUnknown', 'SessionTimeout'].includes(result.code ?? '') }
  let identity: string | undefined
  try { const target = new URL(result.targetDocumentUrl ?? ''); identity = target.origin + target.pathname.replace(/\/$/, '') } catch { /* Unknown target cannot establish a connection. */ }
  if (result.code === 'InvalidDocumentUrl' || result.code === 'NotSpreadsheet') return { state: 'invalidLink', ...evidence }
  if (result.authentication === 'required') return { state: 'notLoggedIn', ...evidence, loginExpired: !!result.authenticationPreviouslyConfirmed }
  if (result.state === 'login-required' && result.code === 'LoginCredentialsMissing') return { state: 'notLoggedIn', ...evidence, loginExpired: false }
  if (result.state === 'unavailable' || result.state === 'access-denied' || result.state === 'profile-busy') return { state: 'unavailable', ...evidence }
  if (result.browserOpen && result.documentAccess === 'allowed' && result.editPermission === 'read-only') return { state: 'readOnly', ...evidence }
  if (result.browserOpen && result.authentication === 'authenticated' && result.documentAccess === 'allowed' && result.editPermission === 'unknown') return { state: 'permissionUnknown', ...evidence }
  if (result.browserOpen && result.authentication === 'authenticated' && result.authenticationSource === 'server' && !result.authenticationStale
    && result.documentType === 'spreadsheet' && result.documentIdentity === identity && identity && result.targetDocumentUrl
    && result.documentAccess === 'allowed' && result.editPermission === 'editable'
    && result.verifiedAt && Number.isFinite(Date.parse(result.verifiedAt))
    && result.authenticationObservedAt && Number.isFinite(Date.parse(result.authenticationObservedAt))
    && result.documentCheckedAt && Number.isFinite(Date.parse(result.documentCheckedAt))) return { state: 'connected', ...evidence, reason: undefined }
  if (result.code) return { state: 'unavailable', ...evidence }
  return { state: 'idle', ...evidence }
}

export function DocumentConnectionItem({ connection, url, draft, editing, busy, locked, onDraft, onAction, onCancel, onCopy, onClear }: {
  connection: DocumentConnectionState; url: string; draft: string; editing: boolean; busy: boolean; locked?: boolean
  onDraft: (value: string) => void; onAction: (action: ConnectionAction) => void; onCancel: () => void; onCopy: () => void; onClear: () => void
}) {
  const view = connection.state === 'unavailable' && connection.loginAvailable ? { ...states.unavailable, action: 'login' as const, button: '登录' } : states[connection.state]
  const name = connection.documentName?.trim() || '腾讯文档'
  return <Item variant="outline" size="sm" className="h-14 min-w-0 flex-nowrap gap-3 py-0 has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-[3px] has-[input:focus-visible]:ring-ring/50" data-connection-state={connection.state} aria-label="文档连接" aria-busy={busy}>
    <ItemMedia><FileText className="size-5 text-muted-foreground" aria-hidden="true" /></ItemMedia>
    <ItemContent className="min-w-0 flex-row items-center gap-2">
      {editing ? <Input id="submission-document-url" aria-label="文档链接" type="text" inputMode="url" autoComplete="off" autoFocus={!!url} value={draft} placeholder="粘贴腾讯文档链接" disabled={busy || locked} onChange={event => onDraft(event.target.value)} className="h-9 min-w-0 rounded-none border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 dark:bg-transparent" />
        : <><Tooltip><TooltipTrigger asChild><ItemTitle tabIndex={0} aria-label="文档名称" className="block min-w-0 truncate">{name}</ItemTitle></TooltipTrigger><TooltipContent className="max-w-sm break-all">{url}</TooltipContent></Tooltip>
          {view.label && <Badge variant="outline" className={'shrink-0 gap-1 ' + (view.className ?? '')} role="status" aria-live="polite">{connection.state === 'checking' && <Spinner aria-label="正在检测文档连接" />}{connection.state === 'notLoggedIn' && connection.loginExpired ? '登录已失效' : view.label}</Badge>}
          {connection.reason && !['checking', 'idle'].includes(connection.state) && <span className="min-w-0 truncate text-xs text-muted-foreground" title={connection.reason}>{connection.reason}</span>}</>}
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
