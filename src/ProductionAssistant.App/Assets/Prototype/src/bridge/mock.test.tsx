import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { DatabaseState, DatabaseSchema, DatabaseInspectResult } from '../features/database-viewer/types'

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

  it('rejects mock navigation operations', async () => {
    const { bridge } = await import('./index')
    await expect(bridge.invoke('app.navigateNative', { tag: 'database-viewer' })).rejects.toThrow('mock 未实现: app.navigateNative')
  })

  it('rejects other unimplemented operations instead of silently succeeding', async () => {
    const { bridge } = await import('./index')
    await expect(bridge.invoke('production.write', {})).rejects.toThrow('mock 未实现: production.write')
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

  it('[nav-switch] calls the mock ready once per navigation token', async () => {
    const mock = await import('./mock')
    const ready = vi.spyOn(mock, 'ready')
    const { bridge } = await import('./index')
    bridge.ready('plan-pdf', 't1')
    bridge.ready('production-message', 't1')
    bridge.ready('plan-pdf', 't2')
    bridge.ready('plan-pdf', ' t2 ')
    await vi.dynamicImportSettled()
    expect(ready.mock.calls).toEqual([
      ['plan-pdf', 't1'],
      ['plan-pdf', 't2'],
      ['plan-pdf', ' t2 '],
    ])
  })

  it('[nav-switch] does not deduplicate an empty navigation token', async () => {
    const mock = await import('./mock')
    const ready = vi.spyOn(mock, 'ready')
    const { bridge } = await import('./index')
    bridge.ready('plan-pdf', '')
    bridge.ready('plan-pdf', '')
    await vi.dynamicImportSettled()
    expect(ready).toHaveBeenCalledTimes(2)
  })
})
