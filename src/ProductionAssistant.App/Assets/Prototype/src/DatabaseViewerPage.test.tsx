import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { DatabaseViewerPage } from './DatabaseViewerPage'

const invoke = vi.fn()
vi.mock('./bridge', () => ({ invoke: (...args: unknown[]) => invoke(...args) }))
;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

let container: HTMLDivElement
let root: Root

beforeEach(async () => {
  invoke.mockReset().mockImplementation((operation: string) => {
    if (operation === 'database.getState') return Promise.resolve({ provider: '测试适配器', usesBusinessSections: true, businessSections: ['焊接数据库'], sources: [{ id: 'weld', name: '焊接数据库', path: '数据库 / 焊接数据库 / 焊接数据库', businessSection: '焊接数据库' }, { id: 'plan', name: '焊接月计划数据库', path: '数据库 / 焊接数据库 / 焊接月计划数据库', businessSection: '焊接数据库' }] })
    if (operation === 'database.getSchema') return Promise.resolve({
      datasets: [{ id: 'current', name: '本年截止今日' }],
      fields: [{ id: 'date', name: '日期', type: 'date' }, { id: 'value', name: '焊接量', type: 'number' }],
    })
    if (operation === 'database.inspect') return Promise.resolve({ providerName: '测试适配器', sourceName: '焊接数据库', datasetName: '本年截止今日', startDate: '2026-09-09', endDate: '2026-09-09', recordCount: 1, total: 12.5, truncated: false, records: [{ id: 'row', values: { date: '2026-09-09', value: 12.5 } }] })
    return Promise.resolve({})
  })
  container = document.createElement('div')
  document.body.append(container)
  root = createRoot(container)
  await act(async () => { root.render(<DatabaseViewerPage />) })
})

afterEach(() => {
  act(() => root.unmount())
  container.remove()
})

describe('database viewer', () => {
  it('queries a provider-neutral dataset with the selected date scope', async () => {
    const businessTrigger = container.querySelectorAll<HTMLButtonElement>('.picker-trigger')[0]
    await act(async () => { businessTrigger.click() })
    const business = [...container.querySelectorAll<HTMLButtonElement>('[role="option"]')]
      .find(option => option.textContent === '焊接数据库')!
    await act(async () => { business.click() })
    const sourceTrigger = container.querySelectorAll<HTMLButtonElement>('.picker-trigger')[1]
    await act(async () => { sourceTrigger.click() })
    expect(container.textContent).toContain('焊接月计划数据库')
    const source = [...container.querySelectorAll<HTMLButtonElement>('[role="option"]')]
      .find(option => option.textContent === '焊接数据库')!
    await act(async () => { source.click(); await Promise.resolve() })

    expect(container.textContent).toContain('本年截止今日')
    expect(container.textContent).toContain('焊接量')
    const query = [...container.querySelectorAll<HTMLButtonElement>('button')]
      .find(button => button.textContent?.includes('执行查询'))!
    await act(async () => { query.click(); await Promise.resolve() })

    expect(invoke).toHaveBeenCalledWith('database.inspect', expect.objectContaining({
      sourceId: 'weld', datasetId: 'current', dateFieldId: 'date', valueFieldId: 'value', rangeKind: 'day',
    }), 120000)
    expect(container.textContent).toContain('12.5')
    expect(container.textContent).toContain('命中记录')
  })

  it('reads an ordinary view whole without showing software date scopes', async () => {
    invoke.mockImplementation((operation: string) => {
      if (operation === 'database.getState') return Promise.resolve({ provider: '测试适配器', usesBusinessSections: true, businessSections: ['下料数据库'], sources: [{ id: 'plan', name: '月计划数据库', path: '数据库 / 下料数据库 / 月计划数据库', businessSection: '下料数据库' }] })
      if (operation === 'database.getSchema') return Promise.resolve({ datasets: [{ id: 'plan-view', name: '月计划' }], fields: [{ id: 'month', name: '月份', type: 'date' }, { id: 'value', name: '计划量', type: 'number' }] })
      if (operation === 'database.inspect') return Promise.resolve({ providerName: '测试适配器', sourceName: '月计划数据库', datasetName: '月计划', startDate: '全部', endDate: '全部', recordCount: 1, truncated: false, records: [{ id: 'row', values: { month: '2026-09-01', value: 20 } }] })
      return Promise.resolve({})
    })
    await act(async () => { root.unmount(); root = createRoot(container); root.render(<DatabaseViewerPage />); await Promise.resolve() })
    const businessTrigger = container.querySelectorAll<HTMLButtonElement>('.picker-trigger')[0]
    await act(async () => { businessTrigger.click() })
    const business = [...container.querySelectorAll<HTMLButtonElement>('[role="option"]')]
      .find(option => option.textContent === '下料数据库')!
    await act(async () => { business.click() })
    const sourceTrigger = container.querySelectorAll<HTMLButtonElement>('.picker-trigger')[1]
    await act(async () => { sourceTrigger.click() })
    const source = [...container.querySelectorAll<HTMLButtonElement>('[role="option"]')]
      .find(option => option.textContent === '月计划数据库')!
    await act(async () => { source.click(); await Promise.resolve() })

    expect(container.textContent).toContain('月计划')
    expect([...container.querySelectorAll('label')].some(label => label.textContent?.startsWith('软件查询口径'))).toBe(false)
    const query = [...container.querySelectorAll<HTMLButtonElement>('button')]
      .find(button => button.textContent?.includes('执行查询'))!
    await act(async () => { query.click(); await Promise.resolve() })
    expect(invoke).toHaveBeenCalledWith('database.inspect', expect.objectContaining({
      sourceId: 'plan', datasetId: 'plan-view', dateFieldId: '', valueFieldId: '', rangeKind: 'all',
    }), 120000)
    expect(container.textContent).toContain('完整 View 结果')
  })

  it('uses a single database level when the provider has no business sections', async () => {
    invoke.mockImplementation((operation: string) => {
      if (operation === 'database.getState') return Promise.resolve({ provider: '本地数据库', usesBusinessSections: false, businessSections: [], sources: [{ id: 'local', name: '本地产量表', path: '本地产量表', businessSection: '' }] })
      if (operation === 'database.getSchema') return Promise.resolve({ datasets: [{ id: 'all', name: '全部' }], fields: [] })
      return Promise.resolve({})
    })
    await act(async () => { root.unmount(); root = createRoot(container); root.render(<DatabaseViewerPage />); await Promise.resolve() })

    expect([...container.querySelectorAll('label')].some(label => label.textContent?.startsWith('业务板块'))).toBe(false)
    const database = container.querySelector<HTMLButtonElement>('.picker-trigger')!
    await act(async () => { database.click() })
    expect(container.textContent).toContain('本地产量表')
  })
})
