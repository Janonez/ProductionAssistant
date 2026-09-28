import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { expect, it, vi } from 'vitest'

const { notifyReady, invoke, delayed } = vi.hoisted(() => ({
  notifyReady: vi.fn(), invoke: vi.fn().mockResolvedValue({}),
  delayed: { resolve: undefined as undefined | ((value: { DailyWeldPage: () => React.ReactNode }) => void) },
}))
vi.mock('./bridge', () => ({ notifyReady, invoke }))
vi.mock('./DailyWeldPage', () => new Promise<{ DailyWeldPage: () => React.ReactNode }>(resolve => { delayed.resolve = resolve }))
vi.mock('./ProductionMessagePage', () => ({ default: () => <h1>生产消息入库</h1> }))
vi.mock('motion/react', () => ({
  AnimatePresence: ({ children }: { children: unknown }) => children,
  motion: { div: ({ children, initial: _initial, animate: _animate, exit: _exit, transition: _transition, ...props }: React.HTMLAttributes<HTMLDivElement> & Record<string, unknown>) => <div {...props}>{children}</div> },
  useReducedMotion: () => true,
}))

it('opens production messages first and keeps navigation usable while another route loads', async () => {
  (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
  history.replaceState({}, '', '?navigation=start')
  const container = document.createElement('div')
  document.body.append(container)
  const root = createRoot(container)
  const { App } = await import('./App')
  try {
    await act(async () => root.render(<App />))
    expect(container.querySelector('h1')?.textContent).toBe('生产消息入库')
    expect(container.querySelector('.sidebar-nav button')?.getAttribute('aria-current')).toBe('page')
    expect(container.querySelector('.sidebar-nav button')?.textContent).toContain('生产消息 Notion 入库')
    expect(notifyReady).toHaveBeenLastCalledWith('production-message', 'start')
    expect(delayed.resolve).toBeUndefined()

    await act(async () => {
      history.replaceState({}, '', '?route=daily-weld&navigation=waiting')
      window.dispatchEvent(new PopStateEvent('popstate'))
    })
    expect(container.querySelector('[role="status"]')?.textContent).toContain('正在加载')
    expect(notifyReady).not.toHaveBeenCalledWith('daily-weld', 'waiting')
    await act(async () => { container.querySelector<HTMLButtonElement>('.sidebar-nav button')!.click() })
    expect(invoke).toHaveBeenCalledWith('app.navigateNative', { tag: 'production-message' })

    // Switch away before the slow module resolves: stale readiness must not win.
    await act(async () => {
      history.replaceState({}, '', '?route=production-message&navigation=back')
      window.dispatchEvent(new PopStateEvent('popstate'))
    })
    await vi.waitFor(() => expect(delayed.resolve).toBeTypeOf('function'))
    await act(async () => {
      delayed.resolve!({ DailyWeldPage: () => <h1>每日焊接数据模拟</h1> })
      await vi.dynamicImportSettled()
    })
    expect(notifyReady).not.toHaveBeenCalledWith('daily-weld', 'waiting')
    expect(notifyReady).toHaveBeenLastCalledWith('production-message', 'back')

    await act(async () => {
      history.replaceState({}, '', '?route=daily-weld&navigation=loaded')
      window.dispatchEvent(new PopStateEvent('popstate'))
    })
    expect(container.querySelector('h1')?.textContent).toBe('每日焊接数据模拟')
    expect(notifyReady).toHaveBeenLastCalledWith('daily-weld', 'loaded')
  } finally {
    await act(async () => root.unmount())
    container.remove()
  }
})
