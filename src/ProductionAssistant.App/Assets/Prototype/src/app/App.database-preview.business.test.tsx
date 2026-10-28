import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

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
  it('opens the database route and queries mock records without a desktop host', async () => {
    const mock = await import('../bridge/mock')
    const invoked = vi.spyOn(mock, 'invoke')
    history.replaceState({}, '', '?route=database-viewer&loadId=browser-preview')
    container = document.createElement('div')
    document.body.append(container)
    root = createRoot(container)
    const { App } = await import('./App')
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
