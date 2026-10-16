import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { App } from './App'

const { invoke, notifyReady } = vi.hoisted(() => ({ invoke: vi.fn(), notifyReady: vi.fn() }))
vi.mock('../bridge/index', () => ({ invoke, notifyReady }))
vi.mock('motion/react', () => ({
  AnimatePresence: ({ children }: { children: unknown }) => children,
  motion: {
    div: ({ children, initial: _initial, animate: _animate, exit: _exit, transition: _transition, ...props }: React.HTMLAttributes<HTMLDivElement> & Record<string, unknown>) => <div {...props}>{children}</div>,
    section: ({ children, initial: _initial, animate: _animate, ...props }: React.HTMLAttributes<HTMLElement> & Record<string, unknown>) => <section {...props}>{children}</section>,
    button: 'button',
  },
  useReducedMotion: () => false,
}))

describe('App host navigation compatibility', () => {
  let container: HTMLDivElement
  let root: ReturnType<typeof createRoot>
  const navigationCalls = () => invoke.mock.calls.filter(([operation]) => operation === 'app.navigateNative')
  const sidebarButton = (label: string) => [...container.querySelectorAll<HTMLButtonElement>('.sidebar button')]
    .find(button => button.textContent?.trim() === label)!

  beforeEach(async () => {
    (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
    history.replaceState({}, '', '?route=production-message&navigation=initial')
    invoke.mockReset().mockImplementation((operation: string) => {
      if (operation === 'production.getBindings') return Promise.resolve({
        configured: true, cutting: { bound: false }, towerDaily: { bound: false },
        towerMonthly: { bound: false }, towerYearly: { bound: false }, sources: [], selected: {},
      })
      if (operation === 'automation.list') return Promise.resolve({ tasks: [] })
      if (operation === 'settings.open') return Promise.resolve({
        notion: { configured: false, rootPageId: '', dataSourceCount: 0, lastSyncedAt: '', sources: [] },
        notification: { enabled: false, channelName: '', webhookConfigured: false, secretConfigured: false, connected: null, status: '', checkedAt: '', rules: [] },
        version: '',
      })
      return Promise.resolve({})
    })
    notifyReady.mockReset()
    container = document.createElement('div')
    document.body.append(container)
    root = createRoot(container)
    await act(async () => { root.render(<App />) })
  })

  afterEach(async () => {
    await act(async () => { root.unmount() })
    container.remove()
  })

  it('immediately sends a request for every consecutive click', async () => {
    const button = sidebarButton('自动化任务')

    await act(async () => {
      button.click()
      expect(navigationCalls()).toHaveLength(1)
      button.click()
      expect(navigationCalls()).toHaveLength(2)
      button.click()
      expect(navigationCalls()).toEqual([
        ['app.navigateNative', { tag: 'daily-report' }],
        ['app.navigateNative', { tag: 'daily-report' }],
        ['app.navigateNative', { tag: 'daily-report' }],
      ])
    })
    expect(container.querySelector('[data-page-route]')?.getAttribute('data-page-route')).toBe('production-message')
    expect(window.location.search).toBe('?route=production-message&navigation=initial')
  })

  it('immediately sends a request when the current module is clicked', async () => {
    await act(async () => {
      sidebarButton('生产消息 Teable 入库').click()
      expect(navigationCalls()).toEqual([['app.navigateNative', { tag: 'production-message' }]])
    })
  })

  it('immediately sends every request while a previous navigation is pending', async () => {
    let finish!: (value: unknown) => void
    const pending = new Promise(resolve => { finish = resolve })
    invoke.mockImplementation((operation: string) => operation === 'app.navigateNative' ? pending : Promise.resolve({}))

    await act(async () => {
      sidebarButton('自动化任务').click()
      expect(navigationCalls()).toHaveLength(1)
      sidebarButton('自动化任务').click()
      expect(navigationCalls()).toHaveLength(2)
      sidebarButton('生产消息 Teable 入库').click()
      expect(navigationCalls()).toEqual([
        ['app.navigateNative', { tag: 'daily-report' }],
        ['app.navigateNative', { tag: 'daily-report' }],
        ['app.navigateNative', { tag: 'production-message' }],
      ])
      finish(undefined)
    })
  })

  it('updates the displayed route on popstate without sending navigation back', async () => {
    expect(navigationCalls()).toEqual([])
    await act(async () => {
      history.replaceState({}, '', '?route=daily-report&navigation=host-update')
      window.dispatchEvent(new PopStateEvent('popstate'))
      await vi.dynamicImportSettled()
    })

    expect(container.querySelector('[data-page-route]')?.getAttribute('data-page-route')).toBe('daily-report')
    expect(container.querySelector('h1')?.textContent).toBe('自动化任务')
    expect(sidebarButton('自动化任务').getAttribute('aria-current')).toBe('page')
    expect(navigationCalls()).toEqual([])
  })

  it('dispatches production-settings-updated before requesting settings.close', async () => {
    const order: string[] = []
    const updated = () => { order.push('production-settings-updated') }
    window.addEventListener('production-settings-updated', updated)
    try {
      await act(async () => { sidebarButton('设置').click() })
      expect(container.querySelector('[role="dialog"]')).not.toBeNull()
      invoke.mockImplementation((operation: string) => {
        if (operation === 'settings.close') order.push('settings.close')
        return Promise.resolve({})
      })

      await act(async () => { container.querySelector<HTMLButtonElement>('[aria-label="关闭设置"]')!.click() })

      expect(order).toEqual(['production-settings-updated', 'settings.close'])
      expect(invoke.mock.calls.filter(([operation]) => operation === 'settings.close')).toEqual([['settings.close']])
      expect(container.querySelector('[role="dialog"]')).toBeNull()
      expect(navigationCalls()).toEqual([])
    } finally {
      window.removeEventListener('production-settings-updated', updated)
    }
  })
})
