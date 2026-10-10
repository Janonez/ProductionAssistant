import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { expect, it, vi } from 'vitest'
import SettingsModal from './SettingsModal'
const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }))
vi.mock('./bridge', () => ({ invoke }))
it('opens the real settings form immediately and retains it when local settings arrive', async () => {
  (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
  let resolve!: (state: unknown) => void
  invoke.mockReturnValue(new Promise(done => { resolve = done }))
  const container = document.createElement('div'), root = createRoot(container)
  const close = vi.fn()
  document.body.append(container)
  try {
    await act(async () => root.render(<SettingsModal open onClose={close} />))
    const dialog = container.querySelector('[role="dialog"]')
    const token = container.querySelector<HTMLInputElement>('input[type="password"]')!
    expect(token).not.toBeNull()
    expect(token.matches(':disabled')).toBe(true)
    expect(container.querySelector('.skeleton-block')).toBeNull()
    expect(container.textContent).toContain('读取中')
    expect(container.textContent).not.toContain('未配置')
    await act(async () => resolve({ notion: { configured: true, rootPageId: 'root', dataSourceCount: 2, lastSyncedAt: 'today', sources: [] }, notification: {}, version: 'test' }))
    expect(container.querySelector('[role="dialog"]')).toBe(dialog)
    expect(container.querySelector('input[type="password"]')).toBe(token)
    expect(token.matches(':disabled')).toBe(false)
    expect(container.textContent).toContain('已配置')
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
    expect(container.textContent).toContain('Teable')
    expect(container.textContent).toContain('实例地址')
    expect(container.textContent).not.toContain('根页面 ID')
    const token = container.querySelector<HTMLInputElement>('input[type="password"]')!
    expect(token.value).toBe('••••••••••••')
    const refresh = [...container.querySelectorAll<HTMLButtonElement>('button')].find(button => button.textContent?.trim() === '刷新数据源')!
    await act(async () => refresh.click())
    expect(invoke).toHaveBeenLastCalledWith('settings.refreshDataSources', { token: '', rootPageId: '', serverUrl: 'http://127.0.0.1:3000' }, 60000)
    expect(token.value).toBe('••••••••••••')
  } finally { await act(async () => root.unmount()); container.remove() }
})
