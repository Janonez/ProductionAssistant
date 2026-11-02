import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

describe('desktop bridge', () => {
  beforeEach(() => { vi.resetModules() })

  it('correlates a response with its request', async () => {
    let handler: ((event: MessageEvent) => void) | undefined
    let sent: { id: string } | undefined
    Object.assign(window, { chrome: { webview: {
      postMessage: (value: { id: string }) => { sent = value },
      addEventListener: (_: string, value: (event: MessageEvent) => void) => { handler = value }
    } } })
    const { invoke } = await import('./webview')
    const result = invoke<{ value: number }>('test')
    handler?.({ data: { id: sent?.id, ok: true, data: { value: 0 } } } as MessageEvent)
    await expect(result).resolves.toEqual({ value: 0 })
  })

  it('rejects host errors', async () => {
    let handler: ((event: MessageEvent) => void) | undefined
    let id = ''
    Object.assign(window, { chrome: { webview: {
      postMessage: (value: { id: string }) => { id = value.id },
      addEventListener: (_: string, value: (event: MessageEvent) => void) => { handler = value }
    } } })
    const { invoke } = await import('./webview')
    const result = invoke('bad')
    handler?.({ data: { id, ok: false, error: '无效请求' } } as MessageEvent)
    await expect(result).rejects.toThrow('无效请求')
  })

  it('delivers progress without completing the request', async () => {
    let handler: ((event: MessageEvent) => void) | undefined
    let id = ''
    const progress = vi.fn()
    Object.assign(window, { chrome: { webview: {
      postMessage: (value: { id: string }) => { id = value.id },
      addEventListener: (_: string, value: (event: MessageEvent) => void) => { handler = value }
    } } })
    const { invoke } = await import('./webview')
    const result = invoke<{ done: boolean }>('report.run', undefined, 30000, progress)
    handler?.({ data: { id, type: 'progress', data: { stage: 'collect', current: 1, total: 2, message: '正在下载' } } } as MessageEvent)
    expect(progress).toHaveBeenCalledWith({ stage: 'collect', current: 1, total: 2, message: '正在下载' })
    handler?.({ data: { id, ok: true, data: { done: true } } } as MessageEvent)
    await expect(result).resolves.toEqual({ done: true })
  })

  it('[nav-switch] reports React readiness with the loadId token', async () => {
    let sent: unknown
    const postMessage = vi.fn((value: unknown) => { sent = value })
    Object.assign(window, { chrome: { webview: {
      postMessage,
      addEventListener: () => undefined
    } } })
    const { notifyReady } = await import('./webview')
    notifyReady('daily-report', 'load-id-2')
    expect(sent).toEqual({ type: 'app.ready', route: 'daily-report', loadId: 'load-id-2', moduleEntryMs: expect.any(Number), readyMs: expect.any(Number) })
    expect(postMessage).toHaveBeenCalledTimes(1)
  })
})

// 去重已移至适配层，这里只验证传输层每次调用都发送。
describe('[nav-switch] webview ready transport', () => {
  let previousChrome: PropertyDescriptor | undefined
  let messages: { type: string; route: string; loadId: string }[]
  const readyMessages = () => messages.filter(message => message.type === 'app.ready')

  beforeEach(() => {
    vi.resetModules()
    messages = []
    previousChrome = Object.getOwnPropertyDescriptor(window, 'chrome')
    Object.assign(window, { chrome: { webview: {
      postMessage: vi.fn((message: { type: string; route: string; loadId: string }) => { messages.push(message) }),
      addEventListener: () => undefined,
    } } })
  })

  afterEach(() => {
    if (previousChrome) Object.defineProperty(window, 'chrome', previousChrome)
    else Reflect.deleteProperty(window, 'chrome')
  })

  it.each(['navigation:plan-pdf', 'plan-pdf'])('sends every ready with an empty token for route %s', async route => {
    const { notifyReady } = await import('./webview')

    notifyReady(route, '')
    notifyReady(route, '')

    expect(readyMessages()).toEqual([
      expect.objectContaining({ type: 'app.ready', route, loadId: '' }),
      expect.objectContaining({ type: 'app.ready', route, loadId: '' }),
    ])
  })

  it('[nav-switch] transport posts every ready; idempotency belongs to the adapter', async () => {
    const { notifyReady } = await import('./webview')
    notifyReady('plan-pdf', ' first ')
    notifyReady('production-message', ' first ')
    notifyReady('plan-pdf', 'first')
    notifyReady('plan-pdf', 'first')
    expect(readyMessages()).toEqual([
      expect.objectContaining({ type: 'app.ready', route: 'plan-pdf', loadId: ' first ' }),
      expect.objectContaining({ type: 'app.ready', route: 'production-message', loadId: ' first ' }),
      expect.objectContaining({ type: 'app.ready', route: 'plan-pdf', loadId: 'first' }),
      expect.objectContaining({ type: 'app.ready', route: 'plan-pdf', loadId: 'first' }),
    ])
  })
})

describe('Electron bridge transport', () => {
  let previousChrome: PropertyDescriptor | undefined
  let previousPaHost: PropertyDescriptor | undefined

  beforeEach(() => {
    vi.resetModules()
    previousChrome = Object.getOwnPropertyDescriptor(window, 'chrome')
    previousPaHost = Object.getOwnPropertyDescriptor(window, 'paHost')
    Reflect.deleteProperty(window, 'chrome')
    Reflect.deleteProperty(window, 'paHost')
  })

  afterEach(() => {
    vi.restoreAllMocks()
    if (previousChrome) Object.defineProperty(window, 'chrome', previousChrome)
    else Reflect.deleteProperty(window, 'chrome')
    if (previousPaHost) Object.defineProperty(window, 'paHost', previousPaHost)
    else Reflect.deleteProperty(window, 'paHost')
  })

  it('sends requests through paHost and resolves its matching response', async () => {
    let receive!: (event: { data: unknown }) => void
    let sent!: { id: string; operation: string; payload: unknown }
    Object.assign(window, { chrome: {}, paHost: {
      postMessage: (request: typeof sent) => { sent = request },
      addEventListener: (_: string, handler: typeof receive) => { receive = handler },
    } })
    const { hasHost, invoke } = await import('./webview')
    expect(hasHost()).toBe(true)
    const result = invoke('database.getState', { source: 'fixture' })
    expect(sent).toEqual({ id: expect.any(String), operation: 'database.getState', payload: { source: 'fixture' } })
    receive({ data: { id: sent.id, ok: true, data: { value: 7 } } })
    await expect(result).resolves.toEqual({ value: 7 })
  })

  it('delivers paHost progress before the final response', async () => {
    let receive!: (event: { data: unknown }) => void
    let id = ''
    const progress = vi.fn()
    Object.assign(window, { paHost: {
      postMessage: (request: { id: string }) => { id = request.id },
      addEventListener: (_: string, handler: typeof receive) => { receive = handler },
    } })
    const { invoke } = await import('./webview')
    const result = invoke('report.run', undefined, 30000, progress)
    receive({ data: { id, type: 'progress', data: { current: 1 } } })
    expect(progress).toHaveBeenCalledWith({ current: 1 })
    receive({ data: { id, ok: true, data: { done: true } } })
    await expect(result).resolves.toEqual({ done: true })
  })

  it('posts the existing ready fields and timing values through paHost', async () => {
    const postMessage = vi.fn()
    vi.spyOn(performance, 'getEntriesByName').mockReturnValue([{ startTime: 12.6 } as PerformanceEntry])
    vi.spyOn(performance, 'now').mockReturnValue(99.2)
    Object.assign(window, { paHost: { postMessage, addEventListener: () => undefined } })
    const { notifyReady } = await import('./webview')
    notifyReady('daily-report', 'electron-load')
    expect(postMessage.mock.calls).toEqual([[{
      type: 'app.ready', route: 'daily-report', loadId: 'electron-load', moduleEntryMs: 13, readyMs: 99,
    }]])
  })

  it('prefers chrome.webview for both subscription and messages when both hosts exist', async () => {
    let receive!: (event: { data: unknown }) => void
    let id = ''
    const postMessage = vi.fn((request: { id: string }) => { id = request.id })
    const paHost = { postMessage: vi.fn(), addEventListener: vi.fn() }
    Object.assign(window, { chrome: { webview: {
      postMessage, addEventListener: (_: string, handler: typeof receive) => { receive = handler },
    } }, paHost })
    const { invoke, notifyReady } = await import('./webview')
    const result = invoke('database.getState')
    receive({ data: { id, ok: true, data: 'chrome' } })
    await expect(result).resolves.toBe('chrome')
    notifyReady('database-viewer', 'chrome-load')
    expect(postMessage).toHaveBeenCalledTimes(2)
    expect(paHost.postMessage).not.toHaveBeenCalled()
    expect(paHost.addEventListener).not.toHaveBeenCalled()
  })

  it('preserves missing-host rejection and silent ready when neither host exists', async () => {
    const { hasHost, invoke, notifyReady } = await import('./webview')
    expect(hasHost()).toBe(false)
    await expect(invoke('database.getState')).rejects.toThrow('当前页面未连接到桌面宿主')
    expect(() => notifyReady('database-viewer', 'missing-host')).not.toThrow()
  })
})
