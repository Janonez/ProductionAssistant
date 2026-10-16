import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { BridgeRequest, BridgeResponse } from './index'
import type { DatabaseState } from '../features/database-viewer/types'

describe('WebView2 bridge adapter', () => {
  let receive: (event: MessageEvent<BridgeResponse>) => void
  let requests: BridgeRequest[]
  let postMessage: ReturnType<typeof vi.fn>

  beforeEach(() => {
    vi.resetModules()
    vi.stubEnv('DEV', false)
    requests = []
    postMessage = vi.fn((request: BridgeRequest) => requests.push(request))
    Object.assign(window, { chrome: { webview: {
      postMessage,
      addEventListener: (_: string, handler: typeof receive) => { receive = handler }
    } } })
  })

  afterEach(() => { vi.unstubAllEnvs(); Reflect.deleteProperty(window, 'chrome') })

  it('preserves the request payload and resolves the matching response', async () => {
    const { bridge } = await import('./index')
    const payload = { sourceId: 'fixture' }
    const pending = bridge.invoke<{ fields: string[] }>('database.getSchema', payload)
    expect(requests[0]).toEqual({ id: expect.any(String), operation: 'database.getSchema', payload })
    receive({ data: { id: requests[0].id, ok: true, data: { fields: ['date'] } } } as MessageEvent<BridgeResponse>)
    await expect(pending).resolves.toEqual({ fields: ['date'] })
  })

  it('scopes subscriptions by operation and preserves request callbacks after unsubscribe', async () => {
    const { bridge } = await import('./index')
    const subscribed = vi.fn()
    const other = vi.fn()
    const perRequest = vi.fn()
    const unsubscribe = bridge.onProgress('report.run', subscribed)
    const unsubscribeOther = bridge.onProgress('weld.write', other)
    const pending = bridge.invoke('report.run', undefined, 30000, perRequest)
    const progress = { stage: 'collect', current: 1 }
    const event = { data: { id: requests[0].id, type: 'progress', data: progress } } as MessageEvent<BridgeResponse>
    receive(event)
    expect(subscribed).toHaveBeenCalledWith(progress)
    expect(other).not.toHaveBeenCalled()
    expect(perRequest).toHaveBeenCalledWith(progress)
    unsubscribe()
    unsubscribeOther()
    receive(event)
    expect(subscribed).toHaveBeenCalledTimes(1)
    expect(perRequest).toHaveBeenCalledTimes(2)
    const resubscribed = vi.fn()
    const unsubscribeNew = bridge.onProgress('report.run', resubscribed)
    unsubscribe()
    receive(event)
    expect(resubscribed).toHaveBeenCalledTimes(1)
    unsubscribeNew()
    receive({ data: { id: requests[0].id, ok: true, data: { done: true } } } as MessageEvent<BridgeResponse>)
    await expect(pending).resolves.toEqual({ done: true })
  })

  it('retains the navigation token and duplicate-ready guard', async () => {
    const { bridge } = await import('./index')
    bridge.ready('production-message', 'navigation-1')
    bridge.ready('production-message', 'navigation-1')
    expect(postMessage).toHaveBeenCalledTimes(1)
    expect(postMessage).toHaveBeenCalledWith({
      type: 'app.ready', route: 'production-message', navigation: 'navigation-1',
      moduleEntryMs: expect.any(Number), readyMs: expect.any(Number)
    })
  })

  it('propagates host errors and rejects calls without a desktop host', async () => {
    const { bridge } = await import('./index')
    const pending = bridge.invoke('database.inspect')
    receive({ data: { id: requests[0].id, ok: false, error: 'fixture error' } } as MessageEvent<BridgeResponse>)
    await expect(pending).rejects.toThrow('fixture error')
    Reflect.deleteProperty(window, 'chrome')
    await expect(bridge.invoke('database.inspect')).rejects.toThrow('当前页面未连接到桌面宿主')
  })
})

describe('bridge transport selection', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.stubEnv('DEV', true)
    Reflect.deleteProperty(window, 'chrome')
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllEnvs()
    Reflect.deleteProperty(window, 'chrome')
  })

  it('keeps the original missing-host error outside DEV', async () => {
    vi.stubEnv('DEV', false)
    const mock = await import('./mock')
    const mocked = vi.spyOn(mock, 'invoke')
    const { bridge } = await import('./index')
    await expect(bridge.invoke('database.getState')).rejects.toThrow('当前页面未连接到桌面宿主')
    bridge.ready('database-viewer', 'production-navigation')
    expect(mocked).not.toHaveBeenCalled()
  })

  it('uses the real WebView2 host when present even in DEV', async () => {
    let receive!: (event: MessageEvent<BridgeResponse>) => void
    const hostState: DatabaseState = { provider: 'Host fixture', usesBusinessSections: false, businessSections: [], sources: [] }
    const postMessage = vi.fn((request: BridgeRequest) => {
      queueMicrotask(() => receive({ data: { id: request.id, ok: true, data: hostState } } as MessageEvent<BridgeResponse>))
    })
    Object.assign(window, { chrome: { webview: { postMessage, addEventListener: (_: string, handler: typeof receive) => { receive = handler } } } })
    const { bridge } = await import('./index')
    await expect(bridge.invoke('database.getState')).resolves.toEqual(hostState)
    expect(postMessage).toHaveBeenCalledWith({ id: expect.any(String), operation: 'database.getState', payload: undefined })
  })
})
