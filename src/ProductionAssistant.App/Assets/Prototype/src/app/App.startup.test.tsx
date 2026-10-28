import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { expect, it, vi } from 'vitest'

vi.mock('../features/production-message/ProductionMessagePage', () => ({ default: () => <h1>生产消息入库</h1> }))
vi.mock('motion/react', () => ({
  AnimatePresence: ({ children }: { children: unknown }) => children,
  motion: { div: ({ children, initial: _initial, animate: _animate, exit: _exit, transition: _transition, ...props }: React.HTMLAttributes<HTMLDivElement> & Record<string, unknown>) => <div {...props}>{children}</div> },
  useReducedMotion: () => true,
}))

function clickSidebar(container: HTMLDivElement, label: string) {
  const button = [...container.querySelectorAll<HTMLButtonElement>('.sidebar button')]
    .find(button => button.textContent?.trim() === label)!
  button.click()
}

it('opens the default production message page and reports its first readiness', async () => {
  (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
  const notifyReady = vi.fn()
  const invoke = vi.fn().mockResolvedValue({})
  const delayed = { resolve: undefined as undefined | ((value: { DailyWeldPage: () => React.ReactNode }) => void) }
  vi.resetModules()
  vi.doMock('../bridge/index', () => ({ notifyReady, invoke }))
  vi.doMock('../features/daily-weld/DailyWeldPage', () => new Promise<{ DailyWeldPage: () => React.ReactNode }>(resolve => { delayed.resolve = resolve }))

  history.replaceState({}, '', '?loadId=start')
  const container = document.createElement('div')
  document.body.append(container)
  const root = createRoot(container)
  const { App } = await import('./App')
  try {
    await act(async () => root.render(<App />))
    expect(container.querySelector('h1')?.textContent).toBe('生产消息入库')
    expect(container.querySelector('.sidebar-nav button')?.getAttribute('aria-current')).toBe('page')
    expect(container.querySelector('.sidebar-nav button')?.textContent).toContain('生产消息 Teable 入库')
    expect(notifyReady).toHaveBeenLastCalledWith('production-message', 'start')
    expect(delayed.resolve).toBeUndefined()
  } finally {
    await act(async () => root.unmount())
    container.remove()
  }
})

it('[nav-switch] keeps readiness stable while a delayed route module loads', async () => {
  // 旧契约由宿主 popstate 和多个令牌驱动路由；新契约在文档内切页，令牌保持不变。
  (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
  const notifyReady = vi.fn()
  const invoke = vi.fn().mockResolvedValue({})
  const delayed = { resolve: undefined as undefined | ((value: { DailyWeldPage: () => React.ReactNode }) => void) }
  vi.resetModules()
  // 改为经真实适配层转发，去重属于适配层，不依赖 webview 传输内部实现。
  const { notifyReady: sendReady } = await vi.importActual<typeof import('../bridge/index')>('../bridge/index')
  const previousChrome = Object.getOwnPropertyDescriptor(window, 'chrome')
  const postMessage = vi.fn()
  Object.assign(window, { chrome: { webview: { postMessage, addEventListener: () => undefined } } })
  vi.doMock('../bridge/index', () => ({ notifyReady, invoke }))
  notifyReady.mockImplementation(sendReady)
  const readyMessages = () => postMessage.mock.calls.filter(([message]) => message.type === 'app.ready')
  vi.doMock('../features/daily-weld/DailyWeldPage', () => new Promise<{ DailyWeldPage: () => React.ReactNode }>(resolve => { delayed.resolve = resolve }))

  history.replaceState({}, '', '?loadId=start')
  const container = document.createElement('div')
  document.body.append(container)
  const root = createRoot(container)
  try {
    const { App } = await import('./App')
    await act(async () => root.render(<App />))
    await act(async () => { await vi.dynamicImportSettled() })
    expect(container.querySelector('h1')?.textContent).toBe('生产消息入库')
    expect(container.querySelector('.sidebar-nav button')?.getAttribute('aria-current')).toBe('page')
    expect(container.querySelector('.sidebar-nav button')?.textContent).toContain('生产消息 Teable 入库')
    expect(delayed.resolve).toBeUndefined()
    expect(readyMessages()).toEqual([[expect.objectContaining({ type: 'app.ready', route: 'production-message', loadId: 'start' })]])

    await act(async () => { clickSidebar(container, '每日焊接数据模拟') })
    let params = new URLSearchParams(window.location.search)
    expect(params.get('route')).toBe('daily-weld')
    expect(params.get('loadId')).toBe('start')
    expect(container.querySelector('[role="status"]')?.getAttribute('aria-label')).toContain('正在加载')
    expect(notifyReady).not.toHaveBeenCalledWith('daily-weld', 'start')
    expect(readyMessages()).toHaveLength(1)
    expect(invoke.mock.calls.some(([operation]) => operation === 'app.navigateNative')).toBe(false)

    await act(async () => { clickSidebar(container, '生产消息 Teable 入库') })
    params = new URLSearchParams(window.location.search)
    expect(params.get('route')).toBe('production-message')
    expect(params.get('loadId')).toBe('start')
    expect(container.querySelector('h1')?.textContent).toBe('生产消息入库')
    expect(invoke.mock.calls.some(([operation]) => operation === 'app.navigateNative')).toBe(false)

    await vi.waitFor(() => expect(delayed.resolve).toBeTypeOf('function'))
    await act(async () => {
      delayed.resolve!({ DailyWeldPage: () => <h1>每日焊接数据模拟</h1> })
      await vi.dynamicImportSettled()
    })
    expect(container.querySelector('h1')?.textContent).toBe('生产消息入库')
    expect(notifyReady).not.toHaveBeenCalledWith('daily-weld', 'start')
    expect(readyMessages()).toHaveLength(1)

    await act(async () => {
      clickSidebar(container, '每日焊接数据模拟')
      await vi.dynamicImportSettled()
    })
    params = new URLSearchParams(window.location.search)
    expect(params.get('route')).toBe('daily-weld')
    expect(params.get('loadId')).toBe('start')
    expect(container.querySelector('h1')?.textContent).toBe('每日焊接数据模拟')
    expect(readyMessages()).toHaveLength(1)
    expect(invoke.mock.calls.some(([operation]) => operation === 'app.navigateNative')).toBe(false)
  } finally {
    await act(async () => root.unmount())
    container.remove()
    if (previousChrome) Object.defineProperty(window, 'chrome', previousChrome)
    else Reflect.deleteProperty(window, 'chrome')
  }
})
