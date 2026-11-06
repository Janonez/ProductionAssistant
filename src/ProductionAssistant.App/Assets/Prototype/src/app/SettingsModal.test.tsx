import { act, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import SettingsModal from './SettingsModal'
import { ThemeProvider, useTheme } from '../components/layout/ThemeProvider'
const { invoke, clearDailyFieldCache } = vi.hoisted(() => ({ invoke: vi.fn(), clearDailyFieldCache: vi.fn() }))
vi.mock('../bridge/index', () => ({ invoke, notifyTheme: vi.fn() }))
vi.mock('../features/daily-report/dailyFieldCache', () => ({ clearDailyFieldCache }))
it('opens the real settings form immediately and retains it when local settings arrive', async () => {
  (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
  let resolve!: (state: unknown) => void
  invoke.mockReturnValue(new Promise(done => { resolve = done }))
  const container = document.createElement('div'), root = createRoot(container)
  const close = vi.fn()
  document.body.append(container)
  try {
    await act(async () => root.render(<SettingsModal open onClose={close} />))
    const dialog = document.querySelector('[role="dialog"]')
    const token = document.querySelector<HTMLInputElement>('input[type="password"]')!
    expect(token).not.toBeNull()
    expect(token.matches(':disabled')).toBe(true)
    expect(document.querySelector('.skeleton-block')).toBeNull()
    expect(document.body.textContent).toContain('读取中')
    expect(document.body.textContent).not.toContain('未配置')
    await act(async () => resolve({ notion: { configured: true, rootPageId: 'root', dataSourceCount: 2, lastSyncedAt: 'today', sources: [] }, notification: {}, version: 'test' }))
    expect(document.querySelector('[role="dialog"]')).toBe(dialog)
    expect(document.querySelector('input[type="password"]')).toBe(token)
    expect(token.matches(':disabled')).toBe(false)
    expect(document.body.textContent).toContain('已配置')
    expect(invoke).toHaveBeenCalledTimes(1)
  } finally { await act(async () => root.unmount()); container.remove() }
})

it('shows the Teable server and preserves a saved token when refreshing', async () => {
  invoke.mockReset()
  const state = { notion: { provider: 'Teable', serverUrl: 'http://127.0.0.1:3000', configured: true, rootPageId: '', dataSourceCount: 9, lastSyncedAt: 'today', sources: [] }, notification: {}, version: 'test' }
  invoke.mockResolvedValueOnce(state).mockResolvedValue({ state, message: 'verified' })
  const container = document.createElement('div'), root = createRoot(container)
  document.body.append(container)
  try {
    await act(async () => root.render(<SettingsModal open onClose={() => {}} />))
    expect(document.body.textContent).toContain('Teable')
    expect(document.body.textContent).toContain('实例地址')
    expect(document.body.textContent).not.toContain('根页面 ID')
    const token = document.querySelector<HTMLInputElement>('input[type="password"]')!
    expect(token.value).toBe('••••••••••••')
    const refresh = [...document.querySelectorAll<HTMLButtonElement>('button')].find(button => button.textContent?.trim() === '刷新数据源')!
    await act(async () => refresh.click())
    expect(invoke).toHaveBeenLastCalledWith('settings.refreshDataSources', { token: '', rootPageId: '', serverUrl: 'http://127.0.0.1:3000' }, 60000)
    expect(token.value).toBe('••••••••••••')
  } finally { await act(async () => root.unmount()); container.remove() }
})

const storedSettings = {
  notion: { provider: 'Teable', serverUrl: 'http://127.0.0.1:3000', configured: true, rootPageId: '', dataSourceCount: 9, lastSyncedAt: 'today', sources: [] },
  notification: { enabled: true, channelName: '测试群', webhookConfigured: true, secretConfigured: true, connected: null, status: '', checkedAt: '', rules: [{ eventType: 'daily.failed', name: '任务失败', enabled: true, level: 'error' }] },
  version: 'test-version',
}
const dialogClosed = vi.fn()
function SettingsHarness() {
  const [open, setOpen] = useState(false)
  const { setTheme } = useTheme()
  return <>
    <button data-settings-entry="" onClick={() => setOpen(true)}>测试设置入口</button>
    <button data-outside="">弹窗外按钮</button>
    {(['light', 'dark', 'system'] as const).map(theme => <button key={theme} data-set-theme={theme} onClick={() => setTheme(theme)}>{theme}</button>)}
    {open && <SettingsModal open onClose={() => { dialogClosed(); setOpen(false) }} />}
  </>
}

describe('settings Dialog behavior and data contracts', () => {
  let container: HTMLDivElement
  let root: ReturnType<typeof createRoot>
  let media: MediaQueryList
  let savedPreference: string | null
  const storageKey = 'production-assistant-ui-theme-v1'
  const modal = () => document.querySelector<HTMLElement>('[role="dialog"]')!
  const button = (label: string) => [...modal().querySelectorAll<HTMLButtonElement>('button')].find(item => item.textContent?.trim() === label)!
  const passwordInputs = () => [...modal().querySelectorAll<HTMLInputElement>('.settings-input[type="password"]')]
  const settleFocus = async () => { await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)) }) }
  const change = async (input: HTMLInputElement, value: string) => {
    await act(async () => {
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, value)
      input.dispatchEvent(new Event('input', { bubbles: true }))
    })
  }
  const click = async (label: string) => { await act(async () => button(label).click()) }
  const open = async () => {
    await act(async () => root.render(<ThemeProvider><SettingsHarness /></ThemeProvider>))
    const trigger = container.querySelector<HTMLButtonElement>('[data-settings-entry]')!
    await act(async () => { trigger.focus(); trigger.click() })
    return trigger
  }
  beforeEach(() => {
    vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
    savedPreference = localStorage.getItem(storageKey)
    localStorage.removeItem(storageKey)
    media = Object.assign(new EventTarget(), { matches: false, media: '(prefers-color-scheme: dark)' }) as MediaQueryList
    vi.stubGlobal('matchMedia', vi.fn(() => media))
    invoke.mockReset().mockResolvedValue(storedSettings)
    clearDailyFieldCache.mockReset()
    dialogClosed.mockReset()
    container = document.createElement('div')
    document.body.append(container)
    root = createRoot(container)
  })
  afterEach(async () => {
    await act(async () => root.unmount())
    await settleFocus()
    container.remove()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
    if (savedPreference === null) localStorage.removeItem(storageKey)
    else localStorage.setItem(storageKey, savedPreference)
  })

  it('does not load settings or mount a portal while closed', async () => {
    await act(async () => root.render(<ThemeProvider><SettingsModal open={false} onClose={dialogClosed} /></ThemeProvider>))
    expect(modal()).toBeNull()
    expect(invoke).not.toHaveBeenCalled()
  })
  it('opens an accessible real portal without replacing the settings content', async () => {
    await open()
    expect(container.contains(modal())).toBe(false)
    expect(container.getAttribute('aria-hidden')).toBe('true')
    expect(modal().closest('[aria-hidden="true"]')).toBeNull()
    expect(modal().contains(document.activeElement)).toBe(true)
    expect(document.getElementById(modal().getAttribute('aria-labelledby')!)?.textContent).toBe('设置')
    expect(document.getElementById(modal().getAttribute('aria-describedby')!)?.textContent).toContain('连接、通知')
    expect(modal().closest('[data-shadcn-surface]')).not.toBeNull()
    expect(modal().querySelectorAll('.settings-nav-item')).toHaveLength(4)
    expect(invoke).toHaveBeenCalledTimes(1)
    expect(invoke).toHaveBeenCalledWith('settings.open')
  })
  it.each(['button', 'escape'])('closes once using %s and restores the actual opening entry', async method => {
    const trigger = await open()
    if (method === 'button') await click('关闭设置')
    else await act(async () => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })))
    await settleFocus()
    expect(modal()).toBeNull()
    expect(dialogClosed).toHaveBeenCalledTimes(1)
    expect(document.activeElement).toBe(trigger)
    expect(container.hasAttribute('aria-hidden')).toBe(false)
    expect(invoke.mock.calls.some(([operation]) => operation === 'settings.close')).toBe(false)
  })
  it('lets Radix loop Tab and Shift+Tab and contain programmatic outside focus', async () => {
    await open()
    const first = modal().querySelector<HTMLInputElement>('[aria-label="搜索设置"]')!
    const last = modal().querySelector<HTMLButtonElement>('[aria-label="关闭设置"]')!
    expect(document.activeElement).toBe(first)
    await act(async () => {
      last.focus()
      last.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }))
    })
    expect(document.activeElement).toBe(first)
    await act(async () => first.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true })))
    expect(document.activeElement).toBe(last)
    await act(async () => container.querySelector<HTMLButtonElement>('[data-outside]')!.focus())
    expect(modal().contains(document.activeElement)).toBe(true)
    expect(dialogClosed).not.toHaveBeenCalled()
  })
  it('dismisses through the Radix overlay outside interaction', async () => {
    const trigger = await open()
    await settleFocus()
    const overlay = document.querySelector('[data-slot="dialog-overlay"]')!
    const pointer = (type: string) => overlay.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, button: 0 }))
    // Radix defers primary-button outside dismissal until the completed click.
    await act(async () => { pointer('pointerdown'); pointer('mousedown') })
    expect(modal()).not.toBeNull()
    expect(dialogClosed).not.toHaveBeenCalled()
    await act(async () => { pointer('pointerup'); pointer('mouseup'); pointer('click') })
    await settleFocus()
    expect(modal()).toBeNull()
    expect(dialogClosed).toHaveBeenCalledTimes(1)
    expect(document.activeElement).toBe(trigger)
    expect(container.hasAttribute('aria-hidden')).toBe(false)
  })
  it('keeps the disabled form and original error feedback when loading fails', async () => {
    invoke.mockRejectedValueOnce(new Error('模拟读取失败'))
    await open()
    expect(modal().querySelector('[role="status"]')?.textContent).toBe('模拟读取失败')
    expect(passwordInputs()[0].matches(':disabled')).toBe(true)
    expect(modal().textContent).toContain('读取失败')
    expect(button('通知').disabled).toBe(true)
  })
  it('preserves masked connection credentials and the save payload and cache invalidation', async () => {
    await open()
    expect(passwordInputs()[0].value).toBe('••••••••••••')
    invoke.mockResolvedValueOnce({ state: storedSettings, message: '连接已保存' })
    await click('保存并连接')
    expect(invoke).toHaveBeenLastCalledWith('settings.saveConnection', { token: '', rootPageId: '', serverUrl: 'http://127.0.0.1:3000' }, 60000)
    expect(clearDailyFieldCache).toHaveBeenCalledTimes(1)
    expect(clearDailyFieldCache).toHaveBeenCalledWith(true)
    expect(passwordInputs()[0].value).toBe('••••••••••••')
    expect(modal().querySelector('[role="status"]')?.textContent).toBe('连接已保存')
  })
  it('retains an edited token after failure and clears its plaintext after successful retry', async () => {
    await open()
    await change(passwordInputs()[0], 'test-token-only')
    invoke.mockRejectedValueOnce(new Error('模拟连接失败'))
    await click('保存并连接')
    expect(passwordInputs()[0].value).toBe('test-token-only')
    expect(modal().querySelector('[role="status"]')?.textContent).toBe('模拟连接失败')
    expect(clearDailyFieldCache).not.toHaveBeenCalled()
    invoke.mockResolvedValueOnce({ state: storedSettings, message: '已保存' })
    await click('保存并连接')
    expect(invoke).toHaveBeenLastCalledWith('settings.saveConnection', { token: 'test-token-only', rootPageId: '', serverUrl: 'http://127.0.0.1:3000' }, 60000)
    expect(passwordInputs()[0].value).toBe('••••••••••••')
  })
  it('keeps the Notion root-page field and payload available', async () => {
    const state = { ...storedSettings, notion: { ...storedSettings.notion, provider: 'Notion', rootPageId: 'test-root' } }
    invoke.mockResolvedValueOnce(state)
    await open()
    expect(modal().textContent).toContain('根页面 ID')
    expect(modal().textContent).not.toContain('实例地址')
    invoke.mockResolvedValueOnce({ state, message: '已保存' })
    await click('保存并连接')
    expect(invoke).toHaveBeenLastCalledWith('settings.saveConnection', { token: '', rootPageId: 'test-root', serverUrl: 'http://127.0.0.1:3000' }, 60000)
  })
  it('preserves both saved notification credentials without sending the masks', async () => {
    await open()
    await click('通知')
    expect(passwordInputs().map(input => input.value)).toEqual(['••••••••••••', '••••••••••••'])
    invoke.mockResolvedValueOnce({ state: storedSettings, message: '通知已保存' })
    await click('保存设置')
    expect(invoke).toHaveBeenLastCalledWith('settings.saveNotification', { enabled: true, channelName: '测试群', webhook: '', secret: '' }, 60000)
    expect(passwordInputs().map(input => input.value)).toEqual(['••••••••••••', '••••••••••••'])
  })
  it('retains notification edits after failure and clears them only after success', async () => {
    await open()
    await click('通知')
    await change(passwordInputs()[0], 'test-webhook-only')
    await change(passwordInputs()[1], 'test-secret-only')
    invoke.mockRejectedValueOnce(new Error('模拟通知保存失败'))
    await click('保存设置')
    expect(passwordInputs().map(input => input.value)).toEqual(['test-webhook-only', 'test-secret-only'])
    invoke.mockResolvedValueOnce({ state: storedSettings, message: '已保存' })
    await click('保存设置')
    expect(invoke).toHaveBeenLastCalledWith('settings.saveNotification', { enabled: true, channelName: '测试群', webhook: 'test-webhook-only', secret: 'test-secret-only' }, 60000)
    expect(passwordInputs().map(input => input.value)).toEqual(['••••••••••••', '••••••••••••'])
  })
  it('keeps the existing notification test operation and payload', async () => {
    await open()
    await click('通知')
    invoke.mockResolvedValueOnce({ state: storedSettings, message: '模拟测试完成' })
    await click('发送测试')
    expect(invoke).toHaveBeenLastCalledWith('settings.testNotification', { enabled: true, channelName: '测试群', webhook: '', secret: '' }, 60000)
  })
  it('saves notification rule identities, levels and changed enablement', async () => {
    await open()
    await click('通知')
    await act(async () => modal().querySelector<HTMLButtonElement>('[aria-label="通知规则：任务失败"]')!.click())
    invoke.mockResolvedValueOnce({ state: storedSettings, message: '规则已保存' })
    await click('保存通知规则')
    expect(invoke).toHaveBeenLastCalledWith('settings.saveNotificationRules', { rules: [{ eventType: 'daily.failed', name: '任务失败', enabled: false, level: 'error' }] }, 60000)
  })
  it('refreshes from the data page and invalidates the existing daily-field cache', async () => {
    await open()
    await click('数据与缓存')
    invoke.mockResolvedValueOnce({ state: storedSettings, message: '已刷新' })
    await click('刷新')
    expect(invoke).toHaveBeenLastCalledWith('settings.refreshDataSources', undefined, 60000)
    expect(clearDailyFieldCache).toHaveBeenCalledTimes(1)
    expect(clearDailyFieldCache).toHaveBeenCalledWith(true)
  })
  it('filters existing settings categories without additional host operations', async () => {
    await open()
    const search = modal().querySelector<HTMLInputElement>('[aria-label="搜索设置"]')!
    await change(search, 'Webhook')
    expect([...modal().querySelectorAll('.settings-nav-item')].map(item => item.textContent)).toEqual(['通知'])
    await change(search, '没有这样的设置')
    expect(modal().textContent).toContain('没有匹配的设置')
    expect(invoke).toHaveBeenCalledTimes(1)
  })
  it('retains the about information loaded by settings.open', async () => {
    await open()
    await click('关于')
    expect(modal().textContent).toContain('test-version')
    expect(modal().textContent).toContain('Windows 当前用户加密')
    expect(invoke).toHaveBeenCalledTimes(1)
  })
  it('restores persisted dark theme on the real Dialog portal without global dark', async () => {
    localStorage.setItem(storageKey, 'dark')
    await open()
    expect(modal().closest('.pa-shell-theme')?.classList.contains('dark')).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(document.body.classList.contains('dark')).toBe(false)
  })
  it('updates the open portal when system theme changes', async () => {
    await open()
    const portal = modal().closest('.pa-shell-theme')!
    expect(portal.classList.contains('dark')).toBe(false)
    await act(async () => { Reflect.set(media, 'matches', true); media.dispatchEvent(new Event('change')) })
    expect(portal.classList.contains('dark')).toBe(true)
    await act(async () => { Reflect.set(media, 'matches', false); media.dispatchEvent(new Event('change')) })
    expect(portal.classList.contains('dark')).toBe(false)
    expect(localStorage.getItem(storageKey)).toBeNull()
  })
  it('uses the same provider for explicit light/dark preference and portal updates', async () => {
    await open()
    for (const theme of ['dark', 'light']) {
      await act(async () => container.querySelector<HTMLButtonElement>(`[data-set-theme="${theme}"]`)!.click())
      expect(modal().closest('.pa-shell-theme')?.classList.contains('dark')).toBe(theme === 'dark')
      expect(localStorage.getItem(storageKey)).toBe(theme)
    }
    expect(invoke).toHaveBeenCalledTimes(1)
  })
  it('reloads settings and discards unsaved plaintext when reopened', async () => {
    await open()
    await change(passwordInputs()[0], 'unsaved-test-token')
    await click('关闭设置')
    await settleFocus()
    await open()
    expect(passwordInputs()[0].value).toBe('••••••••••••')
    expect(invoke.mock.calls.filter(([operation]) => operation === 'settings.open')).toHaveLength(2)
  })
})
