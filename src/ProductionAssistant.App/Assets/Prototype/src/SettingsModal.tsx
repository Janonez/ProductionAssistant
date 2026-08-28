import { useEffect, useMemo, useRef, useState } from 'react'
import { invoke } from './bridge'

type SettingsPage = 'connection' | 'notification' | 'data' | 'about'
type SettingsRule = { eventType: string; name: string; enabled: boolean; level: string }
type SettingsState = {
  notion: {
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
const maskedCredential = '••••••••••••'

const navItems: { key: SettingsPage; label: string; keywords: string; icon: React.ReactNode }[] = [
  { key: 'connection', label: '连接', keywords: 'Notion API 令牌 根页面 数据源', icon: <LinkIcon /> },
  { key: 'notification', label: '通知', keywords: '钉钉 Webhook Secret 规则', icon: <BellIcon /> },
  { key: 'data', label: '数据与缓存', keywords: 'Notion 数据源 缓存 绑定', icon: <DatabaseIcon /> },
  { key: 'about', label: '关于', keywords: '版本 WebView2 React TypeScript', icon: <InfoIcon /> },
]

export default function SettingsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [page, setPage] = useState<SettingsPage>('connection')
  const [query, setQuery] = useState('')
  const [state, setState] = useState<SettingsState | null>(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState('')
  const closeButton = useRef<HTMLButtonElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setBusy('settings.open')
    setError('')
    invoke<SettingsState>('settings.open')
      .then(value => setState(value))
      .catch(reason => setError(reason instanceof Error ? reason.message : '设置加载失败，请重试。'))
      .finally(() => setBusy(''))
    window.setTimeout(() => closeButton.current?.focus(), 0)
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', keydown)
    return () => {
      window.removeEventListener('keydown', keydown)
      returnFocus.current?.focus()
    }
  }, [open, onClose])

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

  return <div className="settings-overlay" onMouseDown={event => {
    if (event.target === event.currentTarget) onClose()
  }}>
    <div className="settings-window" role="dialog" aria-modal="true" aria-label="设置">
      <aside className="settings-sidebar">
        <label className="settings-search">
          <SearchIcon />
          <input value={query} onChange={event => setQuery(event.target.value)} placeholder="搜索设置" aria-label="搜索设置" />
        </label>
        <div className="settings-sidebar-title">设置</div>
        <nav className="settings-nav" aria-label="设置分类">
          {filteredItems.map(item => <button
            key={item.key}
            type="button"
            className={page === item.key ? 'settings-nav-item active' : 'settings-nav-item'}
            aria-current={page === item.key ? 'page' : undefined}
            onClick={() => setPage(item.key)}
          >
            <span className="settings-nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>)}
          {filteredItems.length === 0 && <p className="settings-empty-search">没有匹配的设置</p>}
        </nav>
      </aside>

      <main className="settings-main">
        <button ref={closeButton} type="button" className="settings-close" onClick={onClose} aria-label="关闭设置">
          <CloseIcon />
        </button>
        <div className="settings-content">
          {busy === 'settings.open' && !state ? <div className="settings-loading">正在读取本机设置…</div> : <>
            {page === 'connection' && state && <ConnectionSettings state={state} busy={busy} run={run} />}
            {page === 'notification' && state && <NotificationSettings state={state} busy={busy} run={run} />}
            {page === 'data' && state && <DataSettings state={state} busy={busy} run={run} />}
            {page === 'about' && state && <AboutSettings state={state} />}
          </>}
          {(message || error) && <div className={`settings-message ${error ? 'error' : ''}`} role="status" aria-live="polite">
            {error || message}
          </div>}
        </div>
      </main>
    </div>
  </div>
}

function ConnectionSettings({ state, busy, run }: {
  state: SettingsState
  busy: string
  run: (operation: string, payload?: unknown) => Promise<boolean>
}) {
  const [token, setToken] = useState('')
  const [tokenChanged, setTokenChanged] = useState(false)
  const [rootPageId, setRootPageId] = useState(state.notion.rootPageId)
  useEffect(() => setRootPageId(state.notion.rootPageId), [state.notion.rootPageId])

  const submit = async (operation: string) => {
    if (await run(operation, { token: tokenChanged ? token : '', rootPageId })) {
      setToken('')
      setTokenChanged(false)
    }
  }

  const refreshing = busy === 'settings.refreshDataSources'
  const connecting = busy === 'settings.saveConnection'

  return <SettingsPageLayout title="连接" description="管理生产助手使用的外部数据源和服务连接。">
    <SettingsSection title="Notion">
      <SettingsRow title="连接状态" description="当前本机连接配置和数据源缓存状态">
        <Status connected={state.notion.configured} label={state.notion.configured ? '已配置' : '未配置'} />
      </SettingsRow>
      <SettingsField title="API 令牌" description="使用 Windows 当前用户加密后保存在本机">
        <input className="settings-input" type="password" autoComplete="off"
          placeholder="输入 Notion API Token"
          value={tokenChanged ? token : state.notion.configured ? maskedCredential : ''}
          onFocus={event => { if (!tokenChanged && state.notion.configured) event.currentTarget.select() }}
          onChange={event => { setTokenChanged(true); setToken(event.target.value) }} />
      </SettingsField>
      <SettingsField title="根页面 ID" description="可选。留空时自动发现当前令牌有权限访问的数据源">
        <input className="settings-input" value={rootPageId} onChange={event => setRootPageId(event.target.value)} />
      </SettingsField>
      <div className="settings-buttons">
        <button type="button" className="settings-button-primary" disabled={!!busy} onClick={() => submit('settings.saveConnection')}>{connecting && <Spinner />} {connecting ? '正在连接…' : '保存并连接'}</button>
        <button type="button" className="settings-button-secondary" disabled={!!busy} onClick={() => submit('settings.refreshDataSources')}>{refreshing && <Spinner />} {refreshing ? '正在刷新…' : '刷新数据源'}</button>
      </div>
    </SettingsSection>
    <SettingsSection title="数据源">
      <SettingsRow title="已发现数据源" description="最近一次从 Notion 获取的数据源"><span className="settings-value">{state.notion.dataSourceCount} 个</span></SettingsRow>
      <SettingsRow title="上次同步" description="数据源元信息最后更新时间"><span className="settings-value">{state.notion.lastSyncedAt || '尚未同步'}</span></SettingsRow>
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
        <input className="settings-input" type="password" autoComplete="off"
          placeholder="https://oapi.dingtalk.com/robot/send?..."
          value={webhookChanged ? webhook : notification.webhookConfigured ? maskedCredential : ''}
          onFocus={event => { if (!webhookChanged && notification.webhookConfigured) event.currentTarget.select() }}
          onChange={event => { setWebhookChanged(true); setWebhook(event.target.value) }} />
      </SettingsField>
      <SettingsField title="加签密钥" description="钉钉机器人 Secret，使用 Windows 当前用户加密保存">
        <input className="settings-input" type="password" autoComplete="off"
          placeholder="SEC..."
          value={secretChanged ? secret : notification.secretConfigured ? maskedCredential : ''}
          onFocus={event => { if (!secretChanged && notification.secretConfigured) event.currentTarget.select() }}
          onChange={event => { setSecretChanged(true); setSecret(event.target.value) }} />
      </SettingsField>
      <SettingsField title="默认接收群" description="用于识别当前通知渠道">
        <input className="settings-input" value={channelName} onChange={event => setChannelName(event.target.value)} placeholder="生产管理群" />
      </SettingsField>
      <div className="settings-buttons">
        <button type="button" className="settings-button-primary" disabled={!!busy} onClick={() => saveChannel('settings.saveNotification')}>{saving && <Spinner />} {saving ? '正在保存…' : '保存设置'}</button>
        <button type="button" className="settings-button-secondary" disabled={!!busy} onClick={() => saveChannel('settings.testNotification')}>{testing && <Spinner />} {testing ? '正在发送…' : '发送测试'}</button>
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
        <button type="button" className="settings-button-primary" disabled={!!busy} onClick={() => run('settings.saveNotificationRules', { rules })}>保存通知规则</button>
      </div>
    </SettingsSection>
  </SettingsPageLayout>
}

function DataSettings({ state, busy, run }: {
  state: SettingsState
  busy: string
  run: (operation: string, payload?: unknown) => Promise<boolean>
}) {
  return <SettingsPageLayout title="数据与缓存" description="查看和维护生产助手保存在本机的 Notion 数据源缓存。">
    <SettingsSection title="本地数据">
      <SettingsRow title="Notion 数据源缓存" description="用于减少重复的网络请求">
        <div className="settings-inline-actions"><span className="settings-value">{state.notion.dataSourceCount} 个</span><button type="button" className="settings-text-button" disabled={!!busy} onClick={() => run('settings.refreshDataSources')}>{busy === 'settings.refreshDataSources' && <Spinner />} {busy === 'settings.refreshDataSources' ? '刷新中…' : '刷新'}</button></div>
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

function SearchIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg> }
function LinkIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" /><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1" /></svg> }
function BellIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></svg> }
function DatabaseIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5" rx="7" ry="3" /><path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" /><path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" /></svg> }
function InfoIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 11v6" /><path d="M12 7h.01" /></svg> }
function CloseIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12" /><path d="m18 6-12 12" /></svg> }
