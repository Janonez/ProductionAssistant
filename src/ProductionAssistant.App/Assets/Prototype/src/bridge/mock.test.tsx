import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { DatabaseState, DatabaseSchema, DatabaseInspectResult } from '../features/database-viewer/types'
import type { BridgeRequest, BridgeResponse } from './index'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
let root: Root | undefined
let container: HTMLDivElement | undefined

beforeEach(() => {
  vi.resetModules()
  vi.stubEnv('DEV', true)
  Reflect.deleteProperty(window, 'chrome')
})

afterEach(() => {
  if (root) act(() => root!.unmount())
  root = undefined
  container?.remove()
  container = undefined
  vi.restoreAllMocks()
  vi.unstubAllEnvs()
  Reflect.deleteProperty(window, 'chrome')
})

describe('browser mock transport', () => {
  it('returns fixed, typed database state, schema and records', async () => {
    const { bridge } = await import('./index')
    const state = await bridge.invoke<DatabaseState>('database.getState')
    expect(state).toEqual({
      provider: 'MOCK_BROWSER_PREVIEW_1_2', usesBusinessSections: false, businessSections: [],
      sources: [{ id: 'mock-source', name: 'Mock table', path: 'Mock catalog / Mock table', businessSection: '' }]
    })
    const schema = await bridge.invoke<DatabaseSchema>('database.getSchema', { sourceId: state.sources[0].id })
    expect(schema.datasets).toEqual([{ id: 'mock-view', name: 'Mock view' }])
    expect(schema.fields.map(field => field.type)).toEqual(['date', 'number', 'text'])
    const result = await bridge.invoke<DatabaseInspectResult>('database.inspect', { sourceId: state.sources[0].id, datasetId: schema.datasets[0].id })
    expect(result).toMatchObject({ providerName: state.provider, sourceName: state.sources[0].name, datasetName: schema.datasets[0].name, recordCount: 2, total: 30, truncated: false })
    expect(result.records).toEqual([
      { id: 'mock-row-a', values: { date: '2000-01-01', value: 10, label: 'MOCK_ROW_ALPHA_1_2' } },
      { id: 'mock-row-b', values: { date: '2000-01-02', value: 20, label: 'MOCK_ROW_BETA_1_2' } }
    ])
    state.sources[0].name = 'Changed fixture'
    expect((await bridge.invoke<DatabaseState>('database.getState')).sources[0].name).toBe('Mock table')
  })

  it('rejects unimplemented operations instead of silently succeeding', async () => {
    const { bridge } = await import('./index')
    await expect(bridge.invoke('production.write', {})).rejects.toThrow('mock 未实现: production.write')
    await expect(bridge.invoke('app.navigateNative', { tag: 'database-viewer' })).rejects.toThrow('mock 未实现: app.navigateNative')
    await expect(bridge.invoke('toString')).rejects.toThrow('mock 未实现: toString')
  })

  it('handles the ready handshake with its route and navigation token', async () => {
    const mock = await import('./mock')
    const ready = vi.spyOn(mock, 'ready')
    const { bridge } = await import('./index')
    bridge.ready('database-viewer', 'browser-navigation')
    await vi.dynamicImportSettled()
    expect(ready).toHaveBeenCalledWith('database-viewer', 'browser-navigation')
    expect(ready.mock.results[0].value).toEqual({
      type: 'app.ready', route: 'database-viewer', navigation: 'browser-navigation',
      moduleEntryMs: expect.any(Number), readyMs: expect.any(Number)
    })
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

  it('opens the database route and queries mock records without a desktop host', async () => {
    const mock = await import('./mock')
    const invoked = vi.spyOn(mock, 'invoke')
    history.replaceState({}, '', '?route=database-viewer&navigation=browser-preview')
    container = document.createElement('div')
    document.body.append(container)
    root = createRoot(container)
    const { App } = await import('../app/App')
    await act(async () => { root!.render(<App />) })
    await vi.waitFor(async () => {
      await act(async () => { await vi.dynamicImportSettled() })
      expect(container!.textContent).toContain('MOCK_BROWSER_PREVIEW_1_2')
    })
    expect(invoked.mock.calls.map(([operation]) => operation)).toEqual(['database.getState'])
    expect(container.querySelector('tbody')).toBeNull()
    expect(container.querySelector<HTMLButtonElement>('.database-query-actions button')!.disabled).toBe(true)
    await act(async () => { container!.querySelector<HTMLButtonElement>('.picker-trigger')!.click() })
    const option = [...container.querySelectorAll<HTMLButtonElement>('[role="option"]')].find(button => button.textContent === 'Mock table')!
    await act(async () => { option.click() })
    await vi.waitFor(async () => {
      await act(async () => { await vi.dynamicImportSettled() })
      expect(container!.querySelectorAll('.picker-trigger')[1]?.textContent).toContain('Mock view')
      expect(container!.querySelector<HTMLButtonElement>('.database-query-actions button')!.disabled).toBe(false)
    })
    expect(invoked).toHaveBeenNthCalledWith(2, 'database.getSchema', { sourceId: 'mock-source' })
    expect(container.querySelector('tbody')).toBeNull()
    await act(async () => { container!.querySelector<HTMLButtonElement>('.database-query-actions button')!.click() })
    await vi.waitFor(async () => {
      await act(async () => { await vi.dynamicImportSettled() })
      expect(container!.querySelectorAll('tbody tr')).toHaveLength(2)
      expect(container!.textContent).toContain('MOCK_ROW_ALPHA_1_2')
      expect(container!.textContent).toContain('MOCK_ROW_BETA_1_2')
    })
    expect(invoked).toHaveBeenNthCalledWith(3, 'database.inspect', expect.objectContaining({ sourceId: 'mock-source', datasetId: 'mock-view', rangeKind: 'all' }))
    const operations = invoked.mock.calls.map(([operation]) => operation)
    expect(operations).toEqual(['database.getState', 'database.getSchema', 'database.inspect'])
    console.info('Database browser integration operations:', JSON.stringify(operations))
  })
})
