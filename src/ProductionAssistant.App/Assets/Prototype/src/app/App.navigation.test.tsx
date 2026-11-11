import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { App } from './App'

const { invoke, notifyReady } = vi.hoisted(() => ({ invoke: vi.fn(), notifyReady: vi.fn() }))
vi.mock('../bridge/index', () => ({ invoke, notifyReady, notifyTheme: vi.fn() }))
vi.mock('motion/react', () => ({
  AnimatePresence: ({ children }: { children: unknown }) => children,
  motion: {
    div: ({ children, initial: _initial, animate: _animate, exit: _exit, transition: _transition, ...props }: React.HTMLAttributes<HTMLDivElement> & Record<string, unknown>) => <div {...props}>{children}</div>,
    section: ({ children, initial: _initial, animate: _animate, ...props }: React.HTMLAttributes<HTMLElement> & Record<string, unknown>) => <section {...props}>{children}</section>,
    button: 'button',
  },
  useReducedMotion: () => false,
}))

function defaultOperationResult(operation: string): Promise<unknown> {
  if (operation === 'production.getBindings') return Promise.resolve({
    configured: true,
    cutting: { bound: false, name: '', path: '' },
    towerDaily: { bound: false, name: '', path: '' },
    towerMonthly: { bound: false, name: '', path: '' },
    towerYearly: { bound: false, name: '', path: '' },
    sources: [],
    selected: { towerDaily: 'daily', towerMonthly: 'monthly', towerYearly: 'yearly' },
    usesBusinessSections: false, businessSections: [],
  })
  if (operation === 'automation.list') return Promise.resolve({ tasks: [] })
  if (operation === 'database.getState') return Promise.resolve({
    provider: '', usesBusinessSections: false, businessSections: [], sources: [],
  })
  return Promise.resolve({})
}

describe('App host navigation compatibility', () => {
  let container: HTMLDivElement
  let root: ReturnType<typeof createRoot>
  const navigationCalls = () => invoke.mock.calls.filter(([operation]) => operation === 'app.navigateNative')
  const sidebarButton = (label: string) => [...container.querySelectorAll<HTMLButtonElement>('.sidebar button')]
    .find(button => button.textContent?.trim() === label)!

  beforeEach(async () => {
    (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
    history.replaceState({}, '', '?route=production-message&loadId=initial')
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

  it('[nav-switch] switches once for consecutive clicks to the same module', async () => {
    // Every click used to request host navigation; document navigation now ignores repeated clicks on the displayed route.
    const button = sidebarButton('任务清单')
    const replaceState = vi.spyOn(window.history, 'replaceState')

    try {
      await act(async () => {
        button.click()
        button.click()
        button.click()
      })
      await act(async () => { await vi.dynamicImportSettled() })

      const params = new URLSearchParams(window.location.search)
      expect(replaceState).toHaveBeenCalledTimes(1)
      expect(params.get('route')).toBe('daily-report')
      expect(params.get('loadId')).toBe('initial')
      expect(container.querySelector('[data-page-route]')?.getAttribute('data-page-route')).toBe('daily-report')
      expect(sidebarButton('任务清单').getAttribute('aria-current')).toBe('page')
      expect(navigationCalls()).toEqual([])
    } finally {
      replaceState.mockRestore()
    }
  })

  it('[nav-switch] ignores a click on the current module', async () => {
    // Clicking the current module used to request the host; document navigation now leaves the displayed route unchanged.
    const replaceState = vi.spyOn(window.history, 'replaceState')

    try {
      await act(async () => { sidebarButton('生产消息').click() })

      expect(replaceState).not.toHaveBeenCalled()
      expect(window.location.search).toBe('?route=production-message&loadId=initial')
      expect(navigationCalls()).toEqual([])
      expect(container.querySelector('[data-page-route]')?.getAttribute('data-page-route')).toBe('production-message')
    } finally {
      replaceState.mockRestore()
    }
  })

  it('[nav-switch] switches locally and ignores the repeated current target', async () => {
    // Host navigation used to remain pending; document navigation now switches synchronously and skips the current target.
    const replaceState = vi.spyOn(window.history, 'replaceState')

    try {
      await act(async () => {
        sidebarButton('任务清单').click()
        sidebarButton('任务清单').click()
        sidebarButton('生产消息').click()
      })
      await act(async () => { await vi.dynamicImportSettled() })

      expect(replaceState).toHaveBeenCalledTimes(2)
      expect(window.location.search).toBe('?route=production-message&loadId=initial')
      expect(container.querySelector('[data-page-route]')?.getAttribute('data-page-route')).toBe('production-message')
      expect(navigationCalls()).toEqual([])
    } finally {
      replaceState.mockRestore()
    }
  })

  it('updates the displayed route on popstate without sending navigation back', async () => {
    expect(navigationCalls()).toEqual([])
    await act(async () => {
      history.replaceState({}, '', '?route=daily-report&loadId=host-update')
      window.dispatchEvent(new PopStateEvent('popstate'))
      await vi.dynamicImportSettled()
    })

    expect(container.querySelector('[data-page-route]')?.getAttribute('data-page-route')).toBe('daily-report')
    expect(container.querySelector('h1')?.textContent).toBe('任务清单')
    expect(sidebarButton('任务清单').getAttribute('aria-current')).toBe('page')
    expect(navigationCalls()).toEqual([])
  })

  it('dispatches production-settings-updated and no longer requests settings.close', async () => {
    const order: string[] = []
    const updated = () => { order.push('production-settings-updated') }
    window.addEventListener('production-settings-updated', updated)
    try {
      await act(async () => { sidebarButton('设置').click() })
      expect(document.querySelector('[role="dialog"]')).not.toBeNull()
      invoke.mockImplementation(() => Promise.resolve({}))

      await act(async () => { document.querySelector<HTMLButtonElement>('[aria-label="关闭设置"]')!.click() })

      expect(order).toEqual(['production-settings-updated'])
      expect(invoke.mock.calls.filter(([operation]) => operation === 'settings.close')).toEqual([])
      expect(document.querySelector('[role="dialog"]')).toBeNull()
      expect(navigationCalls()).toEqual([])
    } finally {
      window.removeEventListener('production-settings-updated', updated)
    }
  })
})

describe('App host navigation contracts', () => {
  const expectMetisNavigation = (container: HTMLDivElement) => {
    expect([...container.querySelectorAll('.sidebar-section')].map(section => ({
      category: section.querySelector('.sidebar-section-label')?.textContent,
      names: [...section.querySelectorAll('button')].map(button => button.textContent),
    }))).toEqual([
      { category: '生产数据', names: ['生产消息', '每日焊接', '原材料入库'] },
      { category: '报表与资料', names: ['生产日报', '机加工统计', '挂网计划', '生产会资料'] },
      { category: '数据报送', names: ['集团填报'] },
      { category: '工作管理', names: ['任务清单'] },
      { category: '数据管理', names: ['数据浏览'] },
    ])
    expect(container.querySelector('.sidebar-bottom button')?.textContent).toBe('设置')
    const navigation = container.querySelector('.sidebar-nav')!.textContent
    for (const unavailable of ['工作台', '项目管理', '项目台账', '项目计划', '风险管控', '内网同步', '数据文件处理', '数据同步', '自动化']) {
      expect(navigation).not.toContain(unavailable)
    }
  }

  it('[nav-switch] applies the Metis navigation contract after a Demo document route update', async () => {
    // The sidebar used to request the host; document navigation now changes route locally while preserving the token.
    (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
    const invoke = vi.fn()
    const notifyReady = vi.fn()
    vi.resetModules()
    vi.doMock('../bridge/index', () => ({ invoke, notifyReady, notifyTheme: vi.fn() }))

    ;(await import("../features/daily-report/dailyFieldCache")).clearDailyFieldCache();
    localStorage.clear();
    history.replaceState({}, '', '?route=production-message')
    const container = document.createElement('div')
    document.body.append(container)
    invoke.mockReset().mockImplementation(defaultOperationResult)
    const { App } = await import('./App')
    const root = createRoot(container)

    try {
      await act(async () => { root.render(<App />) })

      await act(async () => {
        history.replaceState({}, '', '?route=navigation:production-message&loadId=sidebar')
        window.dispatchEvent(new PopStateEvent('popstate'))
      })
      expectMetisNavigation(container)
      expect(container.querySelectorAll('.desktop-shell')).toHaveLength(1)
      expect(container.querySelectorAll('.desktop-shell > .desktop-shell-navigation .sidebar')).toHaveLength(1)
      expect(container.querySelector('[aria-current="page"]')?.textContent).toContain('生产消息')
      await act(async () => { container.querySelector<HTMLButtonElement>('.sidebar-nav [aria-label="集团填报"]')!.click(); await vi.dynamicImportSettled() })
      expect(new URLSearchParams(location.search).get('taskType')).toBe('tencent_sheet_fill')
      expect(container.querySelector('[aria-current="page"]')?.textContent).toBe('集团填报')
      const dailyReport = [...container.querySelectorAll('button')].find(item => item.textContent?.includes('任务清单')) as HTMLButtonElement
      await act(async () => { dailyReport.click(); await Promise.resolve() })
      await act(async () => { await vi.dynamicImportSettled() })

      const params = new URLSearchParams(window.location.search)
      expect(params.get('route')).toBe('daily-report')
      expect(params.get('loadId')).toBe('sidebar')
      expect(params.has('taskType')).toBe(false)
      expect(invoke).not.toHaveBeenCalledWith('app.navigateNative', expect.anything())
      expect(container.querySelector('[data-page-route]')?.getAttribute('data-page-route')).toBe('daily-report')
      expect(container.querySelector('[aria-current="page"]')?.textContent).toContain('任务清单')
    } finally {
      await act(async () => root.unmount())
      vi.useRealTimers()
      container.remove()
    }
  })

  it('[nav-switch] restores the same Metis navigation contract on Document startup', async () => {
    // The sidebar used to request the host; document navigation now preserves the token and updates the displayed module locally.
    (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
    const invoke = vi.fn()
    const notifyReady = vi.fn()
    vi.resetModules()
    vi.doMock('../bridge/index', () => ({ invoke, notifyReady, notifyTheme: vi.fn() }))

    history.replaceState({}, '', '?route=navigation:production-message&loadId=sidebar')
    const container = document.createElement('div')
    document.body.append(container)
    invoke.mockReset().mockImplementation(defaultOperationResult)
    const { App } = await import('./App')
    const root = createRoot(container)

    try {
      await act(async () => { root.render(<App />) })
      await act(async () => { await vi.dynamicImportSettled() })

      expectMetisNavigation(container)
      expect(container.textContent).not.toContain('首页')
      expect(container.textContent).not.toContain('概览')
      expect(container.querySelectorAll('.desktop-shell')).toHaveLength(1)
      expect(container.querySelectorAll('.desktop-shell > .desktop-shell-navigation .sidebar')).toHaveLength(1)
      expect(container.querySelector('[aria-current="page"]')?.textContent).toContain('生产消息')

      await act(async () => { container.querySelector<HTMLButtonElement>('.sidebar-nav [aria-label="集团填报"]')!.click(); await vi.dynamicImportSettled() })
      expect(new URLSearchParams(location.search).get('taskType')).toBe('tencent_sheet_fill')
      expect(container.querySelector('[aria-current="page"]')?.textContent).toBe('集团填报')

      const dailyReport = [...container.querySelectorAll('button')]
        .find(button => button.textContent?.includes('任务清单')) as HTMLButtonElement
      await act(async () => { dailyReport.click(); await Promise.resolve() })
      await act(async () => { await vi.dynamicImportSettled() })

      const params = new URLSearchParams(window.location.search)
      expect(params.get('route')).toBe('daily-report')
      expect(params.get('loadId')).toBe('sidebar')
      expect(params.has('taskType')).toBe(false)
      expect(invoke).not.toHaveBeenCalledWith('app.navigateNative', expect.anything())
      expect(container.querySelector('[data-page-route]')?.getAttribute('data-page-route')).toBe('daily-report')
      expect(container.querySelector('[aria-current="page"]')?.textContent).toContain('任务清单')
    } finally {
      await act(async () => { root.unmount() })
      container.remove()
    }
  })

  it('[nav-switch] reports readiness once per document across in-document navigation', async () => {
    // 旧 ready 上报带前缀 route；nav-switch 改报归一值，同一令牌的真实传输仍只发送一次。
    (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
    const invoke = vi.fn().mockImplementation(defaultOperationResult)
    const notifyReady = vi.fn()
    vi.resetModules()
    // 改为经真实适配层转发，去重属于适配层，不依赖 webview 传输内部实现。
    const { notifyReady: sendReady } = await vi.importActual<typeof import('../bridge/index')>('../bridge/index')
    const previousChrome = Object.getOwnPropertyDescriptor(window, 'chrome')
    const postMessage = vi.fn()
    Object.assign(window, { chrome: { webview: { postMessage, addEventListener: () => undefined } } })
    vi.doMock('../bridge/index', () => ({ invoke, notifyReady, notifyTheme: vi.fn() }))
    notifyReady.mockImplementation(sendReady)
    const readyMessages = () => postMessage.mock.calls.filter(([message]) => message.type === 'app.ready')

    history.replaceState({}, '', '?route=navigation:plan-pdf&loadId=first')
    const container = document.createElement('div')
    document.body.append(container)
    const root = createRoot(container)

    try {
      const { App } = await import('./App')
      await act(async () => { root.render(<App />) })
      await act(async () => { await vi.dynamicImportSettled() })
      expect(notifyReady).toHaveBeenLastCalledWith('plan-pdf', 'first')
      expect(readyMessages()).toEqual([[expect.objectContaining({ type: 'app.ready', route: 'plan-pdf', loadId: 'first' })]])

      const openProduction = [...container.querySelectorAll('button')]
        .find(button => button.textContent?.includes('生产消息')) as HTMLButtonElement
      await act(async () => { openProduction.click() })
      await act(async () => { await vi.dynamicImportSettled() })

      const params = new URLSearchParams(window.location.search)
      expect(params.get('route')).toBe('production-message')
      expect(params.get('loadId')).toBe('first')
      expect(container.querySelector('[data-page-route]')?.getAttribute('data-page-route')).toBe('production-message')
      expect(container.querySelectorAll('.desktop-shell > .desktop-shell-navigation .sidebar')).toHaveLength(1)
      expect(container.querySelector('[aria-current="page"]')?.textContent).toContain('生产消息')
      expect(invoke).not.toHaveBeenCalledWith('app.navigateNative', expect.anything())
      expect(notifyReady.mock.calls).toEqual([['plan-pdf', 'first'], ['production-message', 'first']])
      expect(readyMessages()).toEqual([[expect.objectContaining({ type: 'app.ready', route: 'plan-pdf', loadId: 'first' })]])
    } finally {
      await act(async () => root.unmount())
      container.remove()
      if (previousChrome) Object.defineProperty(window, 'chrome', previousChrome)
      else Reflect.deleteProperty(window, 'chrome')
    }
  })

  it('opens and closes settings over the current module', async () => {
    (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
    const invoke = vi.fn()
    const notifyReady = vi.fn()
    vi.resetModules()
    vi.doMock('../bridge/index', () => ({ invoke, notifyReady, notifyTheme: vi.fn() }))

    history.replaceState({}, '', '?route=production-message&loadId=initial')
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
      expect(document.querySelector('[role="dialog"]')).not.toBeNull()
      expect(container.querySelector('[data-page-route]')?.getAttribute('data-page-route')).toBe('production-message')

      await act(async () => { document.querySelector<HTMLButtonElement>('[aria-label="关闭设置"]')!.click() })
      expect(document.querySelector('[role="dialog"]')).toBeNull()
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
    const invoke = vi.fn().mockImplementation((operation: string) => {
      if (operation === 'database.getState') return Promise.resolve({
        provider: '', usesBusinessSections: false, businessSections: [], sources: [],
      })
      if (operation === 'production.getBindings') return Promise.resolve({
        configured: false,
        cutting: { bound: false, name: '', path: '' },
        towerDaily: { bound: false, name: '', path: '' },
        selected: { cutting: '', towerDaily: '' },
        usesBusinessSections: false, businessSections: [], sources: [],
      })
      return Promise.resolve({})
    })
    const notifyReady = vi.fn()
    vi.doMock('../bridge/index', () => ({ invoke, notifyReady, notifyTheme: vi.fn() }))
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
    await act(async () => { await vi.dynamicImportSettled() })
    return { container, root, invoke, notifyReady }
  }

  const sidebarButton = (container: HTMLDivElement, label: string) => [...container.querySelectorAll<HTMLButtonElement>('.sidebar button')]
    .find(button => button.textContent?.trim() === label)!

  // 旧 ready 原样上报带前缀 route；nav-switch 上报归一页面路由，令牌仍原样保留。
  it.each([
    ['navigation:production-message', ' first ', 'production-message'],
    ['navigation:daily-weld', 'first', 'daily-weld'],
    ['navigation:database-viewer', 'first', 'database-viewer'],
    ['navigation:plan-pdf', 'first', 'plan-pdf'],
    ['navigation:production-meeting', 'first', 'production-meeting'],
    ['navigation:report-center', 'first', 'report-center'],
    ['navigation:daily-report', 'first', 'daily-report'],
    ['navigation:unknown', 'first', 'production-message'],
    ['navigation:', 'first', 'production-message'],
    ['navigation: ', 'first', 'production-message'],
    ['navigation:PRODUCTION-MESSAGE', 'first', 'production-message'],
  ] as const)('[nav-switch] reports the normalized route and the unchanged token for legacy input %s', async (route, loadId, expectedRoute) => {
    const { notifyReady } = await mountAppAt(`?route=${encodeURIComponent(route)}&loadId=${encodeURIComponent(loadId)}`)

    expect(notifyReady.mock.calls).toEqual([[expectedRoute, loadId]])
  })

  it.each([
    ['daily-weld', '每日焊接'],
    ['database-viewer', '数据浏览'],
    ['plan-pdf', '挂网计划'],
    ['production-meeting', '生产会资料'],
    ['report-center', '机加工统计'],
    ['daily-report', '任务清单'],
  ] as const)('[nav-switch] switches to sidebar tag %s from a legacy URL without a host request', async (tag, label) => {
    // 旧契约要求宿主导航；文档内切页只更新 route 并保留 loadId。
    const { container, invoke } = await mountAppAt(`?route=${encodeURIComponent('navigation:production-message')}&loadId=first`)
    const replaceState = vi.spyOn(window.history, 'replaceState')

    try {
      await act(async () => { sidebarButton(container, label).click() })
      await act(async () => { await vi.dynamicImportSettled() })

      const params = new URLSearchParams(window.location.search)
      expect(replaceState).toHaveBeenCalledTimes(1)
      expect(params.get('route')).toBe(tag)
      expect(params.get('loadId')).toBe('first')
      expect(container.querySelector('[data-page-route]')?.getAttribute('data-page-route')).toBe(tag)
      expect(sidebarButton(container, label).getAttribute('aria-current')).toBe('page')
      const navigationCalls = invoke.mock.calls.filter(([operation]) => operation === 'app.navigateNative')
      expect(navigationCalls).toEqual([])
    } finally {
      replaceState.mockRestore()
    }
  })

  it('[nav-switch] ignores the sidebar tag already displayed from a legacy URL', async () => {
    // 旧契约会请求宿主；文档内导航对当前显示页保持 URL 不变。
    const initialSearch = `?route=${encodeURIComponent('navigation:production-message')}&loadId=first`
    const { container, invoke } = await mountAppAt(initialSearch)
    const replaceState = vi.spyOn(window.history, 'replaceState')

    try {
      await act(async () => { sidebarButton(container, '生产消息').click() })
      await act(async () => { await vi.dynamicImportSettled() })

      expect(replaceState).not.toHaveBeenCalled()
      expect(window.location.search).toBe(initialSearch)
      expect(container.querySelector('[data-page-route]')?.getAttribute('data-page-route')).toBe('production-message')
      expect(sidebarButton(container, '生产消息').getAttribute('aria-current')).toBe('page')
      const navigationCalls = invoke.mock.calls.filter(([operation]) => operation === 'app.navigateNative')
      expect(navigationCalls).toEqual([])
    } finally {
      replaceState.mockRestore()
    }
  })

  // 旧 ready 保留带前缀 route；nav-switch 将已知后缀直接作为 ready 的页面路由。
  it.each([
    ['production-message', '生产消息'],
    ['daily-weld', '每日焊接'],
    ['database-viewer', '数据浏览'],
    ['plan-pdf', '挂网计划'],
    ['production-meeting', '生产会资料'],
    ['report-center', '机加工统计'],
    ['daily-report', '任务清单'],
  ] as const)('[nav-switch][legacy-prefix:display] renders the known legacy suffix %s', async (tag, label) => {
    const route = `navigation:${tag}`
    const loadId = 'first'
    const { container, notifyReady } = await mountAppAt(`?route=${encodeURIComponent(route)}&loadId=${encodeURIComponent(loadId)}`)

    expect(container.querySelector('[data-page-route]')?.getAttribute('data-page-route')).toBe(tag)
    expect(sidebarButton(container, label).getAttribute('aria-current')).toBe('page')
    expect(notifyReady.mock.calls).toEqual([[tag, loadId]])
  })

  // 旧 ready 保留未知旧路由；nav-switch 对无效旧路由上报默认页面路由。
  it.each([
    'navigation:unknown', 'navigation:', 'navigation: ', 'navigation:PRODUCTION-MESSAGE',
  ])('[nav-switch][legacy-prefix:display] renders the default page for %s', async route => {
    const loadId = 'first'
    const { container, notifyReady } = await mountAppAt(`?route=${encodeURIComponent(route)}&loadId=${encodeURIComponent(loadId)}`)

    expect(container.querySelector('[data-page-route]')?.getAttribute('data-page-route')).toBe('production-message')
    expect(sidebarButton(container, '生产消息').getAttribute('aria-current')).toBe('page')
    expect(notifyReady.mock.calls).toEqual([['production-message', loadId]])
  })

  // 旧 ready 使用原始路由；nav-switch 使用归一值，真实传输仍按令牌只发送一次。
  it.each([
    ['plain to legacy', 'production-message', 'navigation:plan-pdf', 'plan-pdf', '挂网计划', 'production-message', 'plan-pdf'],
    ['legacy to plain', 'navigation:plan-pdf', 'production-message', 'production-message', '生产消息', 'plan-pdf', 'production-message'],
  ] as const)('[nav-switch][legacy-prefix:display] updates on popstate from %s with one ready per token', async (_direction, firstRoute, nextRoute, displayRoute, label, firstReadyRoute, nextReadyRoute) => {
    const loadId = 'first'
    const previousChrome = Object.getOwnPropertyDescriptor(window, 'chrome')
    const postMessage = vi.fn()
    Object.assign(window, { chrome: { webview: { postMessage, addEventListener: () => undefined } } })

    try {
      const { container, notifyReady } = await mountAppAt(`?route=${encodeURIComponent(firstRoute)}&loadId=${encodeURIComponent(loadId)}`)
      // 改为经真实适配层转发，去重属于适配层，不依赖 webview 传输内部实现。
      const { notifyReady: sendReady } = await vi.importActual<typeof import('../bridge/index')>('../bridge/index')
      // Forward the captured initial ready and later updates through the real token deduplication.
      for (const [route, token] of notifyReady.mock.calls) sendReady(route, token)
      notifyReady.mockImplementation(sendReady)
      expect(notifyReady.mock.calls).toEqual([[firstReadyRoute, loadId]])
      expect(postMessage.mock.calls).toEqual([[expect.objectContaining({ type: 'app.ready', route: firstReadyRoute, loadId })]])

      await act(async () => {
        history.replaceState({}, '', `?route=${encodeURIComponent(nextRoute)}&loadId=${encodeURIComponent(loadId)}`)
        window.dispatchEvent(new PopStateEvent('popstate'))
      })
      await act(async () => { await vi.dynamicImportSettled() })

      expect(container.querySelector('[data-page-route]')?.getAttribute('data-page-route')).toBe(displayRoute)
      expect(sidebarButton(container, label).getAttribute('aria-current')).toBe('page')
      expect(notifyReady.mock.calls).toEqual([[firstReadyRoute, loadId], [nextReadyRoute, loadId]])
      expect(postMessage.mock.calls).toEqual([[expect.objectContaining({ type: 'app.ready', route: firstReadyRoute, loadId })]])
    } finally {
      if (previousChrome) Object.defineProperty(window, 'chrome', previousChrome)
      else Reflect.deleteProperty(window, 'chrome')
    }
  })
})
