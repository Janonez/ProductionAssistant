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
})
