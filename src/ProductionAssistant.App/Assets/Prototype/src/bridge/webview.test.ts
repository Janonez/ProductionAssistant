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

  it('reports React readiness with the current navigation token', async () => {
    let sent: unknown
    const postMessage = vi.fn((value: unknown) => { sent = value })
    Object.assign(window, { chrome: { webview: {
      postMessage,
      addEventListener: () => undefined
    } } })
    const { notifyReady } = await import('./webview')
    notifyReady('daily-report', 'navigation-2')
    notifyReady('daily-report', 'navigation-2')
    expect(sent).toEqual({ type: 'app.ready', route: 'daily-report', navigation: 'navigation-2', moduleEntryMs: expect.any(Number), readyMs: expect.any(Number) })
    expect(postMessage).toHaveBeenCalledTimes(1)
  })
})

describe('legacy route ready deduplication', () => {
  let previousChrome: PropertyDescriptor | undefined
  let messages: { type: string; route: string; navigation: string }[]
  const readyMessages = () => messages.filter(message => message.type === 'app.ready')
  const routeOrders = [
    ['legacy', 'navigation:plan-pdf', 'plan-pdf'],
    ['plain', 'plan-pdf', 'navigation:plan-pdf'],
  ] as const

  beforeEach(() => {
    vi.resetModules()
    messages = []
    previousChrome = Object.getOwnPropertyDescriptor(window, 'chrome')
    Object.assign(window, { chrome: { webview: {
      postMessage: vi.fn((message: { type: string; route: string; navigation: string }) => { messages.push(message) }),
      addEventListener: () => undefined,
    } } })
  })

  afterEach(() => {
    if (previousChrome) Object.defineProperty(window, 'chrome', previousChrome)
    else Reflect.deleteProperty(window, 'chrome')
  })

  it.each(routeOrders)('sends one ready for the same token (%s first)', async (_first, firstRoute, secondRoute) => {
    const { notifyReady } = await import('./webview')
    const navigation = ' first '

    notifyReady(firstRoute, navigation)
    notifyReady(secondRoute, navigation)

    expect(readyMessages()).toEqual([
      expect.objectContaining({ type: 'app.ready', route: firstRoute, navigation }),
    ])
  })

  it.each(routeOrders)('sends a second ready when the token changes without trimming (%s first)', async (_first, firstRoute, secondRoute) => {
    const { notifyReady } = await import('./webview')

    notifyReady(firstRoute, ' first ')
    notifyReady(secondRoute, ' first ')
    notifyReady(secondRoute, 'first')

    expect(readyMessages()).toEqual([
      expect.objectContaining({ type: 'app.ready', route: firstRoute, navigation: ' first ' }),
      expect.objectContaining({ type: 'app.ready', route: secondRoute, navigation: 'first' }),
    ])
  })

  it.each(['navigation:plan-pdf', 'plan-pdf'])('sends every ready with an empty token for route %s', async route => {
    const { notifyReady } = await import('./webview')

    notifyReady(route, '')
    notifyReady(route, '')

    expect(readyMessages()).toEqual([
      expect.objectContaining({ type: 'app.ready', route, navigation: '' }),
      expect.objectContaining({ type: 'app.ready', route, navigation: '' }),
    ])
  })
})
