import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { settleModuleImports } from '../test-utils/settle-module-imports'

vi.mock('../features/production-message/ProductionMessagePage', () => ({ default: () => <h1>生产消息入库</h1> }))
vi.mock('motion/react', () => ({
  AnimatePresence: ({ children }: { children: unknown }) => children,
  motion: { div: ({ children, initial: _initial, animate: _animate, exit: _exit, transition: _transition, ...props }: React.HTMLAttributes<HTMLDivElement> & Record<string, unknown>) => <div {...props}>{children}</div> },
  useReducedMotion: () => true,
}))

let App: typeof import('./App')['App']
let invoke: ReturnType<typeof vi.fn>, notifyReady: ReturnType<typeof vi.fn>
let delayed: { resolve?: (value: { DailyWeldPage: () => React.ReactNode }) => void }
beforeEach(async () => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
  vi.resetModules()
  invoke = vi.fn().mockResolvedValue({})
  notifyReady = vi.fn()
  delayed = {}
  const service = { state: 'Ready' as const }
  vi.doMock('../bridge/index', () => ({ invoke, notifyReady, notifyTheme: vi.fn(), getServiceState: () => service, subscribeServiceState: () => () => {}, requestServiceState: vi.fn(), restartApplication: vi.fn() }))
  vi.doMock('../features/daily-weld/DailyWeldPage', () => new Promise<{ DailyWeldPage: () => React.ReactNode }>(resolve => { delayed.resolve = resolve }))
  // Finish module initialization before starting a UI scenario or an act scope.
  // Each test still gets a fresh App, route state and mock module registry.
  App = (await import('./App')).App
})
afterEach(() => vi.unstubAllGlobals())

function clickSidebar(container: HTMLDivElement, label: string) {
  const button = [...container.querySelectorAll<HTMLButtonElement>('.sidebar button')]
    .find(button => button.textContent?.trim() === label)!
  button.click()
}

it('enters group submission without an automation fallback while its list and configuration are pending', async () => {
  let finishList!: (value: unknown) => void, finishJob!: (value: unknown) => void
  invoke.mockImplementation((operation: string) => {
    if (operation === 'automation.list') return new Promise(resolve => { finishList = resolve })
    if (operation === 'tencentSheet.get') return new Promise(resolve => { finishJob = resolve })
    return Promise.resolve({ state: 'closed', browserOpen: false, authentication: 'unknown', documentAccess: 'unknown', editPermission: 'unknown', verifiedAt: null, message: '浏览器已关闭' })
  })
  history.replaceState({}, '', '?route=production-message&loadId=group-entry')
  const container = document.createElement('div'), root = createRoot(container)
  document.body.append(container)
  const oldContent: string[] = []
  const observer = new MutationObserver(() => {
    if (container.querySelector('[data-current-page-title]')?.textContent === '集团填报') {
      const legacy = container.querySelector('.automation-list-page')
      if (legacy) oldContent.push(legacy.textContent ?? '')
    }
  })
  try {
    await act(async () => root.render(<App />))
    observer.observe(container, { childList: true, subtree: true, characterData: true })
    await act(async () => clickSidebar(container, '集团填报'))
    const workbench = container.querySelector('[aria-label="集团填报工作台"]')!
    expect(workbench).not.toBeNull()
    expect([...workbench.querySelectorAll('[role=tab]')].map(tab => tab.textContent)).toEqual(['概览', '记录', '设置'])
    const placeholder = () => container.querySelector('[aria-label="正在读取填报日期"]')!
    expect(placeholder()).not.toBeNull()
    const table = workbench.querySelector('[aria-label="本次填报数据"]')!
    expect(table.querySelectorAll('tbody tr')).toHaveLength(4)
    expect(workbench.textContent).toContain('获取数据 → 检查目标 → 确认填报')
    expect([...workbench.querySelectorAll<HTMLButtonElement>('button')].find(button => button.textContent === '配置文档连接')?.disabled).toBe(false)
    expect(container.textContent).not.toMatch(/管理定时推送与自动填报|自动化任务名称/)
    await act(async () => finishList({ tasks: [{ id: 'group', name: '文档', taskType: 'tencent_sheet_fill' }] }))
    expect(placeholder()).not.toBeNull()
    expect(workbench.querySelector('[aria-label="本次填报数据"]')).toBe(table)
    await act(async () => finishJob({ id: 'group', businessDate: '2026-11-10', config: { documentUrl: 'https://docs.qq.com/sheet/fixture', fields: [], rules: {} } }))
    expect(placeholder()).toBeNull()
    expect(workbench.querySelector('[aria-label="本次填报数据"]')).not.toBeNull()
    expect(oldContent).toEqual([])
    expect(notifyReady).toHaveBeenLastCalledWith('daily-report', 'group-entry')
    expect(new URLSearchParams(location.search).get('loadId')).toBe('group-entry')
  } finally {
    observer.disconnect()
    try {
      await act(async () => {
        // Settle test-owned reads even when an assertion fails before delivery.
        finishList?.({ tasks: [] })
        finishJob?.({ id: 'group', config: { documentUrl: 'https://docs.qq.com/sheet/fixture' } })
        root.unmount()
      })
    } finally { container.remove() }
  }
})

it('opens the default production message page and reports its first readiness', async () => {
  history.replaceState({}, '', '?loadId=start')
  const container = document.createElement('div')
  document.body.append(container)
  const root = createRoot(container)
  try {
    await act(async () => root.render(<App />))
    expect(container.querySelector('h1')?.textContent).toBe('生产消息入库')
    expect(container.querySelector('.sidebar-nav button')?.getAttribute('aria-current')).toBe('page')
    expect(container.querySelector('.sidebar-nav button')?.textContent).toContain('生产消息')
    expect(notifyReady).toHaveBeenLastCalledWith('production-message', 'start')
    expect(delayed.resolve).toBeUndefined()
  } finally {
    try { await act(async () => root.unmount()) }
    finally { container.remove() }
  }
})

it('[nav-switch] keeps readiness stable while a delayed route module loads', async () => {
  // 旧契约由宿主 popstate 和多个令牌驱动路由；新契约在文档内切页，令牌保持不变。
  // 改为经真实适配层转发，去重属于适配层，不依赖 webview 传输内部实现。
  const { notifyReady: sendReady } = await vi.importActual<typeof import('../bridge/index')>('../bridge/index')
  const previousChrome = Object.getOwnPropertyDescriptor(window, 'chrome')
  const postMessage = vi.fn()
  Object.assign(window, { chrome: { webview: { postMessage, addEventListener: () => undefined } } })
  notifyReady.mockImplementation(sendReady)
  const readyMessages = () => postMessage.mock.calls.filter(([message]) => message.type === 'app.ready')

  history.replaceState({}, '', '?loadId=start')
  const container = document.createElement('div')
  document.body.append(container)
  const root = createRoot(container)
  try {
    await act(async () => root.render(<App />))
    await settleModuleImports()
    expect(container.querySelector('h1')?.textContent).toBe('生产消息入库')
    expect(container.querySelector('.sidebar-nav button')?.getAttribute('aria-current')).toBe('page')
    expect(container.querySelector('.sidebar-nav button')?.textContent).toContain('生产消息')
    expect(delayed.resolve).toBeUndefined()
    expect(readyMessages()).toEqual([[expect.objectContaining({ type: 'app.ready', route: 'production-message', loadId: 'start' })]])

    await act(async () => { clickSidebar(container, '每日焊接') })
    let params = new URLSearchParams(window.location.search)
    expect(params.get('route')).toBe('daily-weld')
    expect(params.get('loadId')).toBe('start')
    expect(container.querySelector('[role="status"]')?.getAttribute('aria-label')).toContain('正在加载')
    expect(notifyReady).not.toHaveBeenCalledWith('daily-weld', 'start')
    expect(readyMessages()).toHaveLength(1)
    expect(invoke.mock.calls.some(([operation]) => operation === 'app.navigateNative')).toBe(false)

    await act(async () => { clickSidebar(container, '生产消息') })
    params = new URLSearchParams(window.location.search)
    expect(params.get('route')).toBe('production-message')
    expect(params.get('loadId')).toBe('start')
    expect(container.querySelector('h1')?.textContent).toBe('生产消息入库')
    expect(invoke.mock.calls.some(([operation]) => operation === 'app.navigateNative')).toBe(false)

    await vi.waitFor(() => expect(delayed.resolve).toBeTypeOf('function'))
    await act(async () => {
      delayed.resolve!({ DailyWeldPage: () => <h1>每日焊接数据模拟</h1> })
    })
    await settleModuleImports()
    expect(container.querySelector('h1')?.textContent).toBe('生产消息入库')
    expect(notifyReady).not.toHaveBeenCalledWith('daily-weld', 'start')
    expect(readyMessages()).toHaveLength(1)

    await act(async () => {
      clickSidebar(container, '每日焊接')
    })
    await settleModuleImports()
    params = new URLSearchParams(window.location.search)
    expect(params.get('route')).toBe('daily-weld')
    expect(params.get('loadId')).toBe('start')
    expect(container.querySelector('h1')?.textContent).toBe('每日焊接数据模拟')
    expect(readyMessages()).toHaveLength(1)
    expect(invoke.mock.calls.some(([operation]) => operation === 'app.navigateNative')).toBe(false)
  } finally {
    try {
      // Release the simulated route module if the scenario failed before delivery.
      delayed.resolve?.({ DailyWeldPage: () => <h1>每日焊接数据模拟</h1> })
      await act(async () => root.unmount())
    } finally {
      container.remove()
      if (previousChrome) Object.defineProperty(window, 'chrome', previousChrome)
      else Reflect.deleteProperty(window, 'chrome')
    }
  }
})
