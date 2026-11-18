import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { expect, it, vi } from 'vitest'
import { App } from './App'
import '../features/group-submission/SubmissionSettings'
import { settleModuleImports } from '../test-utils/settle-module-imports'

const { invoke, notifyReady, service } = vi.hoisted(() => ({ invoke: vi.fn(), notifyReady: vi.fn(), service: { state: 'Ready' } }))
vi.mock('../bridge/index', () => ({ invoke, notifyReady, notifyTheme: vi.fn(), getServiceState: () => service, subscribeServiceState: () => () => {}, requestServiceState: vi.fn(), restartApplication: vi.fn() }))

it('keeps settings and history mounted across tabs and routes, without local skeletons or duplicate reads', async () => {
  service.state = 'Ready'
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
  const job = { id: 'loading-fixture', businessDate: '2026-11-18', configRevision: 1, config: { documentUrl: 'https://docs.qq.com/sheet/loading-fixture', fields: [] } }
  invoke.mockImplementation(async (operation: string) => {
    if (operation === 'automation.list') return { tasks: [{ id: job.id, name: '文档', taskType: 'tencent_sheet_fill' }] }
    if (operation === 'tencentSheet.get') return job
    if (operation === 'tencentSheet.runs') return { runs: [{ id: 'run', time: '2026-11-18 09:00', businessDate: '2026-11-17', status: '待确认' }] }
    if (operation.startsWith('tencentSheet.session')) return { state: 'closed', browserOpen: false, authentication: 'unknown', documentAccess: 'unknown', editPermission: 'unknown' }
    if (operation === 'production.getBindings') return { selected: {}, sources: [], cutting: {}, towerDaily: {}, towerMonthly: {}, towerYearly: {} }
    if (operation === 'settings.open') return { notion: { configured: false, sources: [] }, notification: { rules: [] }, version: 'test' }
    return {}
  })
  const container = document.createElement('div'); document.body.append(container)
  const root = createRoot(container)
  const search = '?route=daily-report&taskType=tencent_sheet_fill&loadId=loading-test'
  history.replaceState({}, '', search)
  const clickTab = (label: string) => act(async () => { const tab = [...container.querySelectorAll<HTMLButtonElement>('[role=tab]')].find(tab => tab.textContent === label)!; tab.focus(); tab.click() })
  const calls = (operation: string) => invoke.mock.calls.filter(([name]) => name === operation).length
  const navigate = (query: string) => act(async () => { history.pushState({}, '', query); window.dispatchEvent(new PopStateEvent('popstate')) })
  try {
    await act(async () => root.render(<App />)); await settleModuleImports()
    await clickTab('设置'); await settleModuleImports()
    const settings = container.querySelector('[aria-label="集团填报设置"]')!
    expect(settings).not.toBeNull()
    const connection = settings.querySelector('[aria-label="文档连接"]')!
    await clickTab('记录')
    const table = container.querySelector('[aria-label="集团填报历史"]')!
    expect(table.textContent).toContain('待确认')
    await clickTab('设置'); await clickTab('记录'); await clickTab('设置')
    expect(container.querySelector('[aria-label="集团填报历史"]')).toBe(table)
    expect(container.querySelector('[aria-label="文档连接"]')).toBe(connection)
    await navigate('?route=production-message'); await navigate(search)
    expect(container.querySelector('[aria-label="集团填报设置"]')).toBe(settings)
    expect(container.querySelector('[aria-label="文档连接"]')).toBe(connection)
    expect(container.querySelectorAll('.skeleton-block, [data-slot=skeleton]')).toHaveLength(0)
    for (const operation of ['automation.list', 'tencentSheet.get', 'tencentSheet.runs', 'settings.open']) expect(calls(operation), operation).toBe(1)
  } finally { await act(async () => root.unmount()); container.remove(); vi.unstubAllGlobals() }
})

it('reports renderer readiness while local service initialization still gates business reads', async () => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
  service.state = 'Initializing'; invoke.mockClear(); notifyReady.mockClear()
  history.replaceState({}, '', '?route=production-message&loadId=service-pending')
  const container = document.createElement('div'); document.body.append(container)
  const root = createRoot(container)
  try {
    await act(async () => root.render(<App />))
    expect(notifyReady).toHaveBeenCalledWith('production-message', 'service-pending')
    expect(invoke).not.toHaveBeenCalled()
    expect(container.textContent).toContain('正在初始化本地服务')
    expect(container.querySelector('.skeleton-block, [data-slot=skeleton]')).toBeNull()
  } finally { await act(async () => root.unmount()); container.remove(); service.state = 'Ready'; vi.unstubAllGlobals() }
})
