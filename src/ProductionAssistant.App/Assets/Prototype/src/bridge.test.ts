import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('desktop bridge', () => {
  beforeEach(() => { vi.resetModules() })

  it('correlates a response with its request', async () => {
    let handler: ((event: MessageEvent) => void) | undefined
    let sent: { id: string } | undefined
    Object.assign(window, { chrome: { webview: {
      postMessage: (value: { id: string }) => { sent = value },
      addEventListener: (_: string, value: (event: MessageEvent) => void) => { handler = value }
    } } })
    const { invoke } = await import('./bridge')
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
    const { invoke } = await import('./bridge')
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
    const { invoke } = await import('./bridge')
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
    const { notifyReady } = await import('./bridge')
    notifyReady('daily-report', 'navigation-2')
    notifyReady('daily-report', 'navigation-2')
    expect(sent).toEqual({ type: 'app.ready', route: 'daily-report', navigation: 'navigation-2' })
    expect(postMessage).toHaveBeenCalledTimes(1)
  })
})
