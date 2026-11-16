import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { afterEach, expect, it, vi } from 'vitest'

afterEach(() => { delete (window as any).paHost; vi.unstubAllGlobals(); vi.resetModules() })

it('keeps a startup skeleton until backend Ready and exposes failure and explicit restart', async () => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
  let receive!: (event: { data: unknown }) => void
  const postMessage = vi.fn()
  Object.assign(window, { paHost: { postMessage, addEventListener: (_: string, handler: typeof receive) => { receive = handler } } })
  const { LocalServiceBoundary } = await import('./LocalServiceBoundary')
  const container = document.createElement('div'); document.body.append(container)
  const root = createRoot(container)
  try {
    await act(async () => root.render(<LocalServiceBoundary><p>业务内容</p></LocalServiceBoundary>))
    expect(container.textContent).toContain('正在初始化本地服务')
    expect(container.textContent).not.toContain('业务内容')
    expect(postMessage).toHaveBeenCalledWith({ type: 'app.serviceState' })
    await act(async () => receive({ data: { type: 'service.state', data: { state: 'Initializing', phase: 'migration' } } }))
    expect(container.textContent).not.toContain('业务内容')
    await act(async () => receive({ data: { type: 'service.state', data: { state: 'Ready' } } }))
    expect(container.textContent).toContain('业务内容')
    await act(async () => receive({ data: { type: 'service.state', data: { state: 'Failed', errorCode: 'SIDECAR_EXITED' } } }))
    expect(container.textContent).toContain('本地服务暂不可用')
    await act(async () => container.querySelector('button')!.click())
    expect(postMessage).toHaveBeenCalledWith({ type: 'app.restart' })
  } finally { await act(async () => root.unmount()); container.remove() }
})
