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
