import { useEffect, useMemo, useRef, useState } from 'react'
import { invoke } from '../bridge/index'
import { clearDailyFieldCache } from '../features/daily-report/dailyFieldCache'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Bell, Database, Info, Link, Search } from 'lucide-react'


type SettingsPage = 'connection' | 'notification' | 'data' | 'about'
type SettingsRule = { eventType: string; name: string; enabled: boolean; level: string }
type SettingsState = {
  notion: {
    provider?: 'Notion' | 'Teable'
    serverUrl?: string
    configured: boolean
    rootPageId: string
    dataSourceCount: number
    lastSyncedAt: string
    sources: { id: string; name: string; path: string }[]
  }
  notification: {
    enabled: boolean
    channelName: string
    webhookConfigured: boolean
    secretConfigured: boolean
    connected: boolean | null
    status: string
    checkedAt: string
    rules: SettingsRule[]
  }
  version: string
}
type SettingsResult = { state: SettingsState; message: string }
const pendingSettings: SettingsState = { notion: { configured: false, rootPageId: '', dataSourceCount: 0, lastSyncedAt: '', sources: [] }, notification: { enabled: false, channelName: '', webhookConfigured: false, secretConfigured: false, connected: null, status: '', checkedAt: '', rules: [] }, version: '' }
const maskedCredential = '••••••••••••'

const navItems: { key: SettingsPage; label: string; keywords: string; icon: React.ReactNode }[] = [
  { key: 'connection', label: '连接', keywords: 'Teable API 令牌 实例 数据源', icon: <Link /> },
  { key: 'notification', label: '通知', keywords: '钉钉 Webhook Secret 规则', icon: <Bell /> },
  { key: 'data', label: '数据与缓存', keywords: 'Teable 数据源 缓存 绑定', icon: <Database /> },
  { key: 'about', label: '关于', keywords: '版本 WebView2 React TypeScript', icon: <Info /> },
]

export default function SettingsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [page, setPage] = useState<SettingsPage>('connection')
  const [query, setQuery] = useState('')
  const [state, setState] = useState<SettingsState | null>(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState('settings.open')
  // Several global entries open this controlled Dialog without a single Radix Trigger.
  // Customize only Radix's close autofocus target; its FocusScope owns the focus trap.
  const returnFocus = useRef(document.activeElement instanceof HTMLElement ? document.activeElement : null)

  useEffect(() => {
    if (!open) return
    setBusy('settings.open')
    setError('')
    invoke<SettingsState>('settings.open')
      .then(value => setState(value))
      .catch(reason => setError(reason instanceof Error ? reason.message : '设置加载失败，请重试。'))
      .finally(() => setBusy(''))
  }, [open])

  useEffect(() => {
    if (!message) return
    const timer = window.setTimeout(() => setMessage(''), 3000)
    return () => window.clearTimeout(timer)
  }, [message])

  const run = async (operation: string, payload?: unknown) => {
    setBusy(operation)
    setError('')
    setMessage('')
    try {
      const result = await invoke<SettingsResult>(operation, payload, 60000)
      if (operation === 'settings.refreshDataSources' || operation === 'settings.saveConnection') clearDailyFieldCache(true)
      setState(result.state)
      setMessage(result.message)
      return true
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : '操作未完成，请重试。')
      return false
    } finally {
      setBusy('')
    }
  }

  const filteredItems = useMemo(() => {
    const search = query.trim().toLocaleLowerCase('zh-CN')
    return search ? navItems.filter(item => `${item.label} ${item.keywords}`.toLocaleLowerCase('zh-CN').includes(search)) : navItems
  }, [query])

  if (!open) return null

  return <Dialog open={open} onOpenChange={nextOpen => { if (!nextOpen) onClose() }}>
    <DialogContent className="settings-window flex h-[min(720px,calc(100svh-2rem))] flex-col gap-0 overflow-hidden p-0 sm:max-w-[960px]" closeLabel="关闭设置"
      onCloseAutoFocus={event => { event.preventDefault(); returnFocus.current?.focus() }}>
      <DialogHeader className="shrink-0 border-b px-6 py-4 pr-12">
        <DialogTitle>设置</DialogTitle>
        <DialogDescription className="sr-only">连接、通知、数据与缓存和版本信息。</DialogDescription>
      </DialogHeader>
      <div className="settings-body">
      <aside className="settings-sidebar">
        <label className="settings-search">
          <Search className="size-4 shrink-0" aria-hidden="true" />
          <Input value={query} onChange={event => setQuery(event.target.value)} placeholder="搜索设置" aria-label="搜索设置" />
        </label>
        <div className="settings-sidebar-title">设置</div>
        <nav className="settings-nav" aria-label="设置分类">
          {filteredItems.map(item => <Button
            variant={page === item.key ? 'secondary' : 'ghost'}
            key={item.key} disabled={!state && item.key !== 'connection'}
            type="button"
            className={page === item.key ? 'settings-nav-item active' : 'settings-nav-item'}
            aria-current={page === item.key ? 'page' : undefined}
            onClick={() => setPage(item.key)}
          >
            <span className="settings-nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </Button>)}
          {filteredItems.length === 0 && <p className="settings-empty-search">没有匹配的设置</p>}
        </nav>
      </aside>

      <main className="settings-main">
        <div className="settings-content">
          <fieldset className="settings-form-content" disabled={!state} aria-busy={!state}>
            {page === 'connection' && <ConnectionSettings state={state ?? pendingSettings} pending={!state} busy={busy} run={run} />}
            {page === 'notification' && state && <NotificationSettings state={state} busy={busy} run={run} />}
            {page === 'data' && state && <DataSettings state={state} busy={busy} run={run} />}
            {page === 'about' && state && <AboutSettings state={state} />}
          </fieldset>
          {(message || error) && <div className={`settings-message ${error ? 'error' : ''}`} role="status" aria-live="polite">
            {error || message}
          </div>}
        </div>
      </main>
      </div>
    </DialogContent>
  </Dialog>
}

function ConnectionSettings({ state, busy, run, pending = false }: {
  pending?: boolean
  state: SettingsState
  busy: string
  run: (operation: string, payload?: unknown) => Promise<boolean>
}) {
  const [token, setToken] = useState('')
  const [tokenChanged, setTokenChanged] = useState(false)
  const [rootPageId, setRootPageId] = useState(state.notion.rootPageId)
  const [serverUrl, setServerUrl] = useState(state.notion.serverUrl ?? '')
  const provider = state.notion.provider ?? 'Teable'
  useEffect(() => setRootPageId(state.notion.rootPageId), [state.notion.rootPageId])
  useEffect(() => setServerUrl(state.notion.serverUrl ?? ''), [state.notion.serverUrl])

  const submit = async (operation: string) => {
    if (await run(operation, { token: tokenChanged ? token : '', rootPageId, serverUrl })) {
      setToken('')
      setTokenChanged(false)
    }
  }

  const refreshing = busy === 'settings.refreshDataSources'
  const connecting = busy === 'settings.saveConnection'

  return <SettingsPageLayout title="连接" description="管理生产助手使用的外部数据源和服务连接。">
    <SettingsSection title={provider}>
      <SettingsRow title="连接状态" description="当前本机连接配置和数据源缓存状态">
        <Status connected={pending ? null : state.notion.configured} label={pending ? (busy ? '读取中…' : '读取失败') : state.notion.configured ? '已配置' : '未配置'} />
      </SettingsRow>
      <SettingsField title="API 令牌" description="使用 Windows 当前用户加密后保存在本机">
        <Input className="settings-input" type="password" autoComplete="off"
          placeholder={`输入 ${provider} API Token`}
          value={tokenChanged ? token : state.notion.configured ? maskedCredential : ''}
          onFocus={event => { if (!tokenChanged && state.notion.configured) event.currentTarget.select() }}
          onChange={event => { setTokenChanged(true); setToken(event.target.value) }} />
      </SettingsField>
      {provider === 'Teable' ? <SettingsField title="实例地址" description="本机实例允许 HTTP，远程实例使用 HTTPS">
        <Input className="settings-input" value={serverUrl} onChange={event => setServerUrl(event.target.value)} />
      </SettingsField> : <SettingsField title="根页面 ID" description="可选。留空时自动发现当前令牌有权限访问的数据源">
        <Input className="settings-input" value={rootPageId} onChange={event => setRootPageId(event.target.value)} />
      </SettingsField>}
      <div className="settings-buttons">
        <Button type="button" variant="default" className="settings-button-primary" disabled={!!busy} onClick={() => submit('settings.saveConnection')}>{connecting && <Spinner />} {connecting ? '正在连接…' : '保存并连接'}</Button>
        <Button type="button" variant="outline" className="settings-button-secondary" disabled={!!busy} onClick={() => submit('settings.refreshDataSources')}>{refreshing && <Spinner />} {refreshing ? '正在刷新…' : '刷新数据源'}</Button>
      </div>
    </SettingsSection>
    <SettingsSection title="数据源">
      <SettingsRow title="已发现数据源" description={`最近一次从 ${provider} 获取的数据源`}><span className="settings-value">{pending ? '—' : `${state.notion.dataSourceCount} 个`}</span></SettingsRow>
      <SettingsRow title="上次同步" description="数据源元信息最后更新时间"><span className="settings-value">{pending ? '—' : state.notion.lastSyncedAt || '尚未同步'}</span></SettingsRow>
    </SettingsSection>
  </SettingsPageLayout>
}

function NotificationSettings({ state, busy, run }: {
  state: SettingsState
  busy: string
  run: (operation: string, payload?: unknown) => Promise<boolean>
}) {
  const notification = state.notification
  const [enabled, setEnabled] = useState(notification.enabled)
  const [channelName, setChannelName] = useState(notification.channelName)
  const [webhook, setWebhook] = useState('')
  const [secret, setSecret] = useState('')
  const [webhookChanged, setWebhookChanged] = useState(false)
  const [secretChanged, setSecretChanged] = useState(false)
  const [rules, setRules] = useState(notification.rules)
  useEffect(() => {
    setEnabled(notification.enabled)
    setChannelName(notification.channelName)
    setRules(notification.rules)
  }, [notification])

  const channelPayload = {
    enabled,
    channelName,
    webhook: webhookChanged ? webhook : '',
    secret: secretChanged ? secret : '',
  }
  const saveChannel = async (operation: string) => {
    if (await run(operation, channelPayload)) {
      setWebhook('')
      setSecret('')
      setWebhookChanged(false)
      setSecretChanged(false)
    }
  }
  const saving = busy === 'settings.saveNotification'
  const testing = busy === 'settings.testNotification'

  return <SettingsPageLayout title="通知" description="配置生产助手全局通知使用的技术通道。业务模块只决定何时通知。">
    <SettingsSection title="通知服务">
      <SettingsRow title="启用通知" description="关闭后所有业务模块都不会向外发送通知">
        <Switch checked={enabled} onChange={setEnabled} label="启用通知" />
      </SettingsRow>
      <SettingsRow title="发送方式" description="当前使用的全局通知技术通道"><span className="settings-value">钉钉机器人 Webhook</span></SettingsRow>
      <SettingsRow title="连接状态" description={notification.checkedAt ? `上次测试 ${notification.checkedAt}` : '尚未发送测试通知'}>
        <Status connected={notification.connected} label={notification.connected === true ? '连接正常' : notification.connected === false ? '连接失败' : '待测试'} />
      </SettingsRow>
    </SettingsSection>
    <SettingsSection title="钉钉机器人">
      <SettingsField title="Webhook URL" description="使用 Windows 当前用户加密后保存在本机">
        <Input className="settings-input" type="password" autoComplete="off"
          placeholder="https://oapi.dingtalk.com/robot/send?..."
          value={webhookChanged ? webhook : notification.webhookConfigured ? maskedCredential : ''}
          onFocus={event => { if (!webhookChanged && notification.webhookConfigured) event.currentTarget.select() }}
          onChange={event => { setWebhookChanged(true); setWebhook(event.target.value) }} />
      </SettingsField>
      <SettingsField title="加签密钥" description="钉钉机器人 Secret，使用 Windows 当前用户加密保存">
        <Input className="settings-input" type="password" autoComplete="off"
          placeholder="SEC..."
          value={secretChanged ? secret : notification.secretConfigured ? maskedCredential : ''}
          onFocus={event => { if (!secretChanged && notification.secretConfigured) event.currentTarget.select() }}
          onChange={event => { setSecretChanged(true); setSecret(event.target.value) }} />
      </SettingsField>
      <SettingsField title="默认接收群" description="用于识别当前通知渠道">
        <Input className="settings-input" value={channelName} onChange={event => setChannelName(event.target.value)} placeholder="生产管理群" />
      </SettingsField>
      <div className="settings-buttons">
        <Button type="button" variant="default" className="settings-button-primary" disabled={!!busy} onClick={() => saveChannel('settings.saveNotification')}>{saving && <Spinner />} {saving ? '正在保存…' : '保存设置'}</Button>
        <Button type="button" variant="outline" className="settings-button-secondary" disabled={!!busy} onClick={() => saveChannel('settings.testNotification')}>{testing && <Spinner />} {testing ? '正在发送…' : '发送测试'}</Button>
      </div>
      {notification.status && <p className="settings-inline-status">{notification.status}</p>}
    </SettingsSection>
    <SettingsSection title="通知规则">
      <div className="settings-rule-list">
        {rules.map(rule => <SettingsRow key={rule.eventType} title={rule.name} description={`钉钉 · ${levelLabel(rule.level)}`}>
          <Switch checked={rule.enabled} label={`通知规则：${rule.name}`} onChange={checked => setRules(current => current.map(item => item.eventType === rule.eventType ? { ...item, enabled: checked } : item))} />
        </SettingsRow>)}
      </div>
      <div className="settings-buttons settings-buttons-end">
        <Button type="button" variant="default" className="settings-button-primary" disabled={!!busy} onClick={() => run('settings.saveNotificationRules', { rules })}>保存通知规则</Button>
      </div>
    </SettingsSection>
  </SettingsPageLayout>
}

function DataSettings({ state, busy, run }: {
  state: SettingsState
  busy: string
  run: (operation: string, payload?: unknown) => Promise<boolean>
}) {
  return <SettingsPageLayout title="数据与缓存" description="查看和维护生产助手保存在本机的数据源缓存。">
    <SettingsSection title="本地数据">
      <SettingsRow title={`${state.notion.provider ?? 'Teable'} 数据源缓存`} description="用于减少重复的网络请求">
        <div className="settings-inline-actions"><span className="settings-value">{state.notion.dataSourceCount} 个</span><Button type="button" variant="link" className="settings-text-button" disabled={!!busy} onClick={() => run('settings.refreshDataSources')}>{busy === 'settings.refreshDataSources' && <Spinner />} {busy === 'settings.refreshDataSources' ? '刷新中…' : '刷新'}</Button></div>
      </SettingsRow>
      <SettingsRow title="上次同步" description="数据源元信息最后更新时间"><span className="settings-value">{state.notion.lastSyncedAt || '尚未同步'}</span></SettingsRow>
    </SettingsSection>
  </SettingsPageLayout>
}

function AboutSettings({ state }: { state: SettingsState }) {
  return <SettingsPageLayout title="关于" description="生产助手的版本和运行环境信息。">
    <SettingsSection title="生产助手">
      <SettingsRow title="版本" description="当前安装版本"><span className="settings-value">{state.version}</span></SettingsRow>
      <SettingsRow title="桌面环境" description="应用运行容器"><span className="settings-value">WinUI 3 + WebView2</span></SettingsRow>
      <SettingsRow title="前端" description="用户界面技术栈"><span className="settings-value">React + TypeScript</span></SettingsRow>
      <SettingsRow title="本地数据保护" description="令牌和通知凭据仅保存在本机"><span className="settings-value">Windows 当前用户加密</span></SettingsRow>
    </SettingsSection>
  </SettingsPageLayout>
}

function SettingsPageLayout({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return <div className="settings-page"><header className="settings-page-header"><h1>{title}</h1><p>{description}</p></header>{children}</div>
}
function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="settings-section"><h2>{title}</h2><div className="settings-section-body">{children}</div></section>
}
function SettingsRow({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return <div className="settings-row"><div className="settings-row-text"><div className="settings-row-title">{title}</div>{description && <div className="settings-row-description">{description}</div>}</div><div className="settings-row-control">{children}</div></div>
}
function SettingsField({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return <label className="settings-field"><span className="settings-field-title">{title}</span>{description && <span className="settings-field-description">{description}</span>}<span className="settings-field-control">{children}</span></label>
}
function Switch({ checked, onChange, label }: { checked: boolean; onChange: (checked: boolean) => void; label: string }) {
  return <button type="button" role="switch" aria-checked={checked} aria-label={label} className={checked ? 'settings-switch checked' : 'settings-switch'} onClick={() => onChange(!checked)}><span /></button>
}
function Status({ connected, label }: { connected: boolean | null; label: string }) {
  return <div className={`settings-connected ${connected === false ? 'error' : connected === null ? 'pending' : ''}`}><span className="settings-status-dot" />{label}</div>
}
function Spinner() { return <span className="settings-spinner" aria-hidden="true" /> }
const levelLabel = (level: string) => level === 'warning' ? '警告' : level === 'info' ? '信息' : '错误'
