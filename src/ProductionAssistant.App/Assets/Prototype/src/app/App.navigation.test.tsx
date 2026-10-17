import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { App } from './App'
import type { Draft } from '../lib/types'

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

describe('App host navigation contracts', () => {
  it('renders the Debug navigation taxonomy in the Demo sidebar and routes through the host', async () => {
    (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
    const invoke = vi.fn()
    const notifyReady = vi.fn()
    vi.resetModules()
    vi.doMock('../bridge/index', () => ({ invoke, notifyReady }))

    const draft: Draft = {
      index: 1, originalText: '8.13下料2吨', parserVersion: 'test', kind: 'MaterialCutting',
      businessDate: '2026-08-13', typeDisplay: '下料日报数据库', fields: { weight: '2吨' },
      previewFields: [
        { key: 'weight', label: '重量', value: '2' },
        { key: 'raw_message', label: '原始消息', value: '8.13下料2吨' },
        { key: 'unit', label: '单位', value: '' },
      ], statusText: '待检查', warningText: '', canWrite: true
    }
    const readyFields = [{ key: 'weight', name: '重量', propertyType: 'number', parsedValue: '2吨', databaseValue: '', status: 'new', message: '' }]

    ;(await import("../features/daily-report/dailyFieldCache")).clearDailyFieldCache();
    localStorage.clear();
    history.replaceState({}, '', '?route=production-message')
    const container = document.createElement('div')
    document.body.append(container)
    invoke.mockReset().mockImplementation((operation: string) => {
      if (operation === 'app.getOverview') return Promise.resolve({})
      if (operation === 'production.getBindings') return Promise.resolve({ configured: true, cutting: { bound: false, name: '', path: '' }, towerDaily: { bound: false, name: '', path: '' }, towerMonthly: { bound: false, name: '', path: '' }, towerYearly: { bound: false, name: '', path: '' }, sources: [], selected: { towerDaily: 'daily', towerMonthly: 'monthly', towerYearly: 'yearly' } })
      if (operation === 'production.parse') return Promise.resolve([draft])
      if (operation === 'production.check') return Promise.resolve({ succeeded: true, message: '可以写入', items: [{ index: 1, businessDate: '2026-08-13', status: 'ready', message: '', fields: readyFields }], requiredMonths: [] })
      return Promise.resolve({})
    })
    const { App } = await import('./App')
    const root = createRoot(container)
    await act(async () => { root.render(<App />) })

    await act(async () => {
      history.replaceState({}, '', '?route=navigation:production-message&navigation=sidebar')
      window.dispatchEvent(new PopStateEvent('popstate'))
    })
    expect(container.textContent).toContain('数据文件处理')
    expect(container.textContent).toContain('挂网计划 PDF 导出')
    expect(container.textContent).toContain('生产会资料拆分')
    expect(container.textContent).toContain('数据同步')
    expect(container.textContent).toContain('每日焊接数据模拟')
    expect(container.textContent).toContain('生产消息 Teable 入库')
    expect(container.textContent).toContain('自动化任务')
    expect(container.textContent).toContain('文件统计汇总')
    expect(container.textContent).toContain('自动化任务')
    expect(container.querySelectorAll('.desktop-shell')).toHaveLength(1)
    expect(container.querySelectorAll('.desktop-shell > .desktop-shell-navigation .sidebar')).toHaveLength(1)
    expect(container.querySelector('[aria-current="page"]')?.textContent).toContain('生产消息 Teable 入库')
    const dailyReport = [...container.querySelectorAll('button')].find(item => item.textContent?.includes('自动化任务')) as HTMLButtonElement
    await act(async () => { dailyReport.click(); await Promise.resolve() })
    expect(invoke).toHaveBeenCalledWith('app.navigateNative', { tag: 'daily-report' })

    await act(async () => root.unmount())
    vi.useRealTimers()
    container.remove()
  })

  it('shows only the module taxonomy, has no homepage, and routes through the host', async () => {
    (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
    const invoke = vi.fn()
    const notifyReady = vi.fn()
    vi.resetModules()
    vi.doMock('../bridge/index', () => ({ invoke, notifyReady }))

    history.replaceState({}, '', '?route=navigation:production-message&navigation=sidebar')
    const container = document.createElement('div')
    document.body.append(container)
    invoke.mockReset().mockResolvedValue({})
    const { App } = await import('./App')
    const root = createRoot(container)

    await act(async () => { root.render(<App />) })
    await act(async () => { await vi.dynamicImportSettled() })

    expect(container.textContent).toContain('数据文件处理')
    expect(container.textContent).toContain('挂网计划 PDF 导出')
    expect(container.textContent).toContain('生产会资料拆分')
    expect(container.textContent).toContain('数据同步')
    expect(container.textContent).toContain('每日焊接数据模拟')
    expect(container.textContent).toContain('生产消息 Teable 入库')
    expect(container.textContent).toContain('自动化任务')
    expect(container.textContent).toContain('文件统计汇总')
    expect(container.textContent).toContain('自动化任务')
    expect(container.textContent).not.toContain('首页')
    expect(container.textContent).not.toContain('概览')
    expect(container.querySelectorAll('.desktop-shell')).toHaveLength(1)
    expect(container.querySelectorAll('.desktop-shell > .desktop-shell-navigation .sidebar')).toHaveLength(1)
    expect(container.querySelector('[aria-current="page"]')?.textContent).toContain('生产消息 Teable 入库')

    const dailyReport = [...container.querySelectorAll('button')]
      .find(button => button.textContent?.includes('自动化任务')) as HTMLButtonElement
    await act(async () => { dailyReport.click(); await Promise.resolve() })
    expect(invoke).toHaveBeenCalledWith('app.navigateNative', { tag: 'daily-report' })

    await act(async () => { root.unmount() })
    container.remove()
  })

  it('reports each host navigation after React renders the requested route', async () => {
    (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
    const invoke = vi.fn()
    const notifyReady = vi.fn()
    vi.resetModules()
    vi.doMock('../bridge/index', () => ({ invoke, notifyReady }))

    history.replaceState({}, '', '?route=navigation:plan-pdf&navigation=first')
    const container = document.createElement('div')
    document.body.append(container)
    invoke.mockReset().mockImplementation((operation: string) =>
      operation === 'automation.list' ? Promise.resolve({ tasks: [] }) : Promise.resolve({}))
    notifyReady.mockReset()
    const { App } = await import('./App')
    const root = createRoot(container)
    await act(async () => { root.render(<App />) })
    await act(async () => { await vi.dynamicImportSettled() })
    expect(notifyReady).toHaveBeenLastCalledWith('navigation:plan-pdf', 'first')
    const openProduction = [...container.querySelectorAll('button')]
      .find(button => button.textContent?.includes('生产消息 Teable 入库')) as HTMLButtonElement
    await act(async () => { openProduction.click() })
    expect(invoke).toHaveBeenCalledWith('app.navigateNative', { tag: 'production-message' })

    await act(async () => {
      history.replaceState({}, '', '?route=daily-report&navigation=second')
      window.dispatchEvent(new PopStateEvent('popstate'))
    })
    await act(async () => { await vi.dynamicImportSettled() })
    expect(notifyReady).toHaveBeenLastCalledWith('daily-report', 'second')
    expect(container.querySelectorAll('.desktop-shell > .desktop-shell-navigation .sidebar')).toHaveLength(1)
    expect(container.querySelector('[aria-current="page"]')?.textContent).toContain('自动化任务')
    await act(async () => root.unmount())
    container.remove()
  })

  it('opens and closes settings over the current module', async () => {
    (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
    const invoke = vi.fn()
    const notifyReady = vi.fn()
    vi.resetModules()
    vi.doMock('../bridge/index', () => ({ invoke, notifyReady }))

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
    const container = document.createElement('div')
    document.body.append(container)
    const { App } = await import('./App')
    const root = createRoot(container)
    await act(async () => { root.render(<App />) })

    try {
      const settings = [...container.querySelectorAll<HTMLButtonElement>('.sidebar button')]
        .find(button => button.textContent?.trim() === '设置')!
      await act(async () => { settings.click() })
      expect(container.querySelector('[role="dialog"]')).not.toBeNull()
      expect(container.querySelector('[data-page-route]')?.getAttribute('data-page-route')).toBe('production-message')

      await act(async () => { container.querySelector<HTMLButtonElement>('[aria-label="关闭设置"]')!.click() })
      expect(container.querySelector('[role="dialog"]')).toBeNull()
      expect(container.querySelector('[data-page-route]')?.getAttribute('data-page-route')).toBe('production-message')
    } finally {
      await act(async () => root.unmount())
      container.remove()
    }
  })
})

describe('legacy navigation prefix host contract', () => {
  let mounted: { container: HTMLDivElement; root: ReturnType<typeof createRoot> } | undefined

  beforeEach(() => {
    (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
    vi.resetModules()
  })

  afterEach(async () => {
    await act(async () => {
      try {
        mounted?.root.unmount()
      } finally {
        mounted?.container.remove()
        mounted = undefined
        vi.doUnmock('../bridge/index')
        vi.doUnmock('motion/react')
      }
    })
  })

  async function mountAppAt(search: string) {
    const invoke = vi.fn().mockResolvedValue({})
    const notifyReady = vi.fn()
    vi.doMock('../bridge/index', () => ({ invoke, notifyReady }))
    vi.doMock('motion/react', () => ({
      AnimatePresence: ({ children }: { children: unknown }) => children,
      motion: {
        div: ({ children, initial: _initial, animate: _animate, exit: _exit, transition: _transition, ...props }: React.HTMLAttributes<HTMLDivElement> & Record<string, unknown>) => <div {...props}>{children}</div>,
        section: ({ children, initial: _initial, animate: _animate, exit: _exit, transition: _transition, ...props }: React.HTMLAttributes<HTMLElement> & Record<string, unknown>) => <section {...props}>{children}</section>,
        button: 'button',
      },
      useReducedMotion: () => false,
    }))
    history.replaceState({}, '', search)
    const container = document.createElement('div')
    document.body.append(container)
    const root = createRoot(container)
    mounted = { container, root }
    const { App } = await import('./App')
    await act(async () => { root.render(<App />) })
    return { container, root, invoke, notifyReady }
  }

  const sidebarButton = (container: HTMLDivElement, label: string) => [...container.querySelectorAll<HTMLButtonElement>('.sidebar button')]
    .find(button => button.textContent?.trim() === label)!

  it.each([
    ['navigation:production-message', ' first '],
    ['navigation:daily-weld', 'first'],
    ['navigation:database-viewer', 'first'],
    ['navigation:plan-pdf', 'first'],
    ['navigation:production-meeting', 'first'],
    ['navigation:report-center', 'first'],
    ['navigation:daily-report', 'first'],
    ['navigation:unknown', 'first'],
    ['navigation:', 'first'],
    ['navigation: ', 'first'],
    ['navigation:PRODUCTION-MESSAGE', 'first'],
  ] as const)('preserves the host ready route and token for legacy input %s', async (route, navigation) => {
    const { notifyReady } = await mountAppAt(`?route=${encodeURIComponent(route)}&navigation=${encodeURIComponent(navigation)}`)

    expect(notifyReady.mock.calls).toEqual([[route, navigation]])
  })

  it.each([
    ['production-message', '生产消息 Teable 入库'],
    ['daily-weld', '每日焊接数据模拟'],
    ['database-viewer', '数据库查看'],
    ['plan-pdf', '挂网计划 PDF 导出'],
    ['production-meeting', '生产会资料拆分'],
    ['report-center', '文件统计汇总'],
    ['daily-report', '自动化任务'],
  ] as const)('sends exactly one unchanged host request for sidebar tag %s from a legacy URL', async (tag, label) => {
    const { container, invoke } = await mountAppAt(`?route=${encodeURIComponent('navigation:production-message')}&navigation=first`)

    await act(async () => { sidebarButton(container, label).click() })

    const navigationCalls = invoke.mock.calls.filter(([operation]) => operation === 'app.navigateNative')
    expect(navigationCalls).toEqual([['app.navigateNative', { tag }]])
  })
})
