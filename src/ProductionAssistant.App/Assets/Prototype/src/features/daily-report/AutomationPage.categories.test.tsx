import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import type { AutomationTaskSummary } from '../../lib/types'
import { App } from '../../app/App'
import { AutomationPage } from './AutomationPage'
import type { AutomationTaskFilter } from '../../routes/routeTable'

const { invoke, notifyReady } = vi.hoisted(() => ({ invoke: vi.fn(), notifyReady: vi.fn() }))
vi.mock('../../bridge/index', () => ({ invoke, notifyReady, notifyTheme: vi.fn() }))

let container: HTMLDivElement, root: Root, tasks: AutomationTaskSummary[]
const closed = { state: 'closed', browserOpen: false, authentication: 'unknown', documentAccess: 'unknown', editPermission: 'unknown', verifiedAt: null, message: '浏览器已关闭' }
const summary = (taskType: string, id: string, name: string): AutomationTaskSummary => ({
  taskType, id, name, taskTypeName: taskType, schedule: '手动', isEnabled: false,
  schedulingAvailable: true, status: 'ready', schedulerMessage: '', connectionStatus: '', lastRun: '暂无运行记录',
})
const names = () => [...container.querySelectorAll('.automation-task-name')].map(button => button.textContent)
const button = (name: string) => [...document.querySelectorAll<HTMLButtonElement>('button')].find(button => button.textContent?.trim() === name)!
const navigate = async (name: string) => act(async () => {
  container.querySelector<HTMLButtonElement>(`.sidebar-nav button[aria-label="${name}"]`)!.click()
  await vi.dynamicImportSettled()
})
const input = async (selector: string, value: string) => act(async () => {
  const element = document.querySelector<HTMLInputElement>(selector)!
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(element, value)
  element.dispatchEvent(new Event('input', { bubbles: true }))
})

beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
  history.replaceState({}, '', '?route=daily-report&loadId=category-test')
  tasks = [summary('daily_report', 'daily', '集团填报（仅任务名称）'), summary('notion_fill', 'inbound', '原材料任务'), summary('tencent_sheet_fill', 'tencent', '自定义填报任务')]
  invoke.mockReset().mockImplementation(async (operation: string, payload: any) => {
    if (operation === 'automation.list') return { tasks: structuredClone(tasks), availableTaskTypes: ['daily_report', 'notion_fill', 'tencent_sheet_fill'] }
    if (operation === 'automation.setEnabled') {
      tasks.find(task => task.id === payload.id && task.taskType === payload.taskType)!.isEnabled = payload.enabled
      return { enabled: payload.enabled }
    }
    if (operation === 'tencentSheet.create') {
      tasks.push(summary('tencent_sheet_fill', 'created', '新建填报任务'))
      return { id: 'created' }
    }
    if (operation === 'tencentSheet.get') return { id: payload.id, config: { documentUrl: 'https://docs.qq.com/sheet/fixture', fields: [], rules: {} } }
    if (operation === 'tencentSheet.sessionStatus') return closed
    throw new Error(`Unexpected operation in category test: ${operation}`)
  })
  notifyReady.mockReset()
  container = document.createElement('div'); document.body.append(container); root = createRoot(container)
})
afterEach(async () => { await act(async () => root.unmount()); container.remove(); vi.unstubAllGlobals() })

it.each([
  ['daily_report', '生产日报', ['集团填报（仅任务名称）']],
  ['notion_fill', '原材料入库', ['原材料任务']],
  ['tencent_sheet_fill', '集团填报', ['自定义填报任务']],
  ['', '任务清单', ['集团填报（仅任务名称）', '原材料任务', '自定义填报任务']],
] satisfies [AutomationTaskFilter, string, string[]][] )('filters %s using the actual taskType, independently of task names', async (taskType, title, expected) => {
  await act(async () => root.render(<AutomationPage taskType={taskType} />))
  expect(container.querySelector('h1')?.textContent).toBe(title)
  expect(names()).toEqual(expected)
})

it('switches categories through the real sidebar and restores the URL-selected category after remount', async () => {
  await act(async () => { root.render(<App />); await vi.dynamicImportSettled() })
  for (const [name, taskType, expected] of [
    ['集团填报', 'tencent_sheet_fill', []],
    ['生产日报', 'daily_report', ['集团填报（仅任务名称）']],
    ['原材料入库', 'notion_fill', ['原材料任务']],
    ['任务清单', '', ['集团填报（仅任务名称）', '原材料任务', '自定义填报任务']],
  ] as const) {
    await navigate(name)
    const query = new URLSearchParams(location.search)
    expect(query.get('route')).toBe('daily-report')
    expect(query.get('taskType') ?? '').toBe(taskType)
    expect(query.get('loadId')).toBe('category-test')
    expect(container.querySelector('h1')?.textContent).toBe(name)
    expect(container.querySelector('[data-current-page-title]')?.textContent).toBe(name)
    expect(container.querySelector('[aria-current=page]')?.textContent).toBe(name)
    expect(names()).toEqual(expected)
    if (taskType === 'tencent_sheet_fill') {
      expect(container.querySelector('[aria-label="集团填报工作台"]')).not.toBeNull()
      expect(container.querySelectorAll('[role=tab]')).toHaveLength(3)
      expect(container.querySelector('.automation-list-page')).toBeNull()
      expect(container.querySelector('[data-page-route]')?.classList.contains('pa-legacy-content')).toBe(false)
    }
  }
  await navigate('集团填报')
  const query = location.search
  await act(async () => root.unmount())
  root = createRoot(container)
  await act(async () => { root.render(<App />); await vi.dynamicImportSettled() })
  expect(location.search).toBe(query)
  expect(container.querySelector('h1')?.textContent).toBe('集团填报')
  expect(names()).toEqual([])
  expect(container.querySelector('[aria-label="集团填报工作台"]')).not.toBeNull()
  expect(notifyReady).toHaveBeenLastCalledWith('daily-report', 'category-test')
  expect(invoke.mock.calls.some(([operation]) => operation === 'app.navigateNative')).toBe(false)
  expect([...container.querySelectorAll('.sidebar-nav button')].map(button => button.textContent)).not.toEqual(expect.arrayContaining(['工作台', '项目台账', '项目计划', '风险管控', '内网同步']))
})

it('shows a category-specific empty state and creates a Tencent task through its existing form and operation', async () => {
  tasks = tasks.filter(task => task.taskType !== 'tencent_sheet_fill')
  await act(async () => root.render(<AutomationPage taskType="tencent_sheet_fill" />))
  expect(container.textContent).toContain('暂无集团填报任务')
  expect(names()).toEqual([])
  await act(async () => button('新建任务').click())
  expect(document.querySelector('.automation-create-types')).toBeNull()
  expect(document.body.textContent).not.toContain('93 系统连接')
  await input('input[type=url]', 'https://docs.qq.com/sheet/fixture')
  await act(async () => button('创建并配置').click())
  expect(invoke).toHaveBeenCalledWith('tencentSheet.create', { documentUrl: 'https://docs.qq.com/sheet/fixture' })
  expect(invoke).toHaveBeenCalledWith('tencentSheet.get', { id: 'created' })
  expect(container.querySelector('[role=tablist]')?.textContent).toContain('网页控件')
  expect(container.querySelector('[role=tablist]')?.textContent).toContain('执行规则')
})

it('keeps enable and disable addressed to the selected task type and prevents repeated actions while busy', async () => {
  await act(async () => root.render(<AutomationPage taskType="daily_report" />))
  const toggle = () => container.querySelector<HTMLInputElement>('input[type=checkbox]')!
  await act(async () => toggle().click())
  expect(invoke).toHaveBeenCalledWith('automation.setEnabled', { taskType: 'daily_report', id: 'daily', enabled: true }, 60000)
  expect(toggle().checked).toBe(true)
  let finish!: (value: unknown) => void
  invoke.mockImplementationOnce(() => new Promise(resolve => { finish = resolve }))
  await act(async () => toggle().click())
  expect(toggle().disabled).toBe(true)
  const calls = invoke.mock.calls.length
  await act(async () => toggle().click())
  expect(invoke.mock.calls).toHaveLength(calls)
  tasks[0].isEnabled = false
  await act(async () => finish({ enabled: false }))
  expect(invoke).toHaveBeenCalledWith('automation.setEnabled', { taskType: 'daily_report', id: 'daily', enabled: false }, 60000)
  expect(toggle().checked).toBe(false)
})

it.each(['unknown', 'DAILY_REPORT', ' daily_report '])('rejects an invalid URL category %s without querying or displaying other tasks', async value => {
  history.replaceState({}, '', `?route=daily-report&taskType=${encodeURIComponent(value)}&loadId=invalid-filter`)
  await act(async () => { root.render(<App />); await vi.dynamicImportSettled() })
  expect(container.querySelector('[role=alert]')?.textContent).toContain('任务分类无效')
  expect(container.querySelector('[data-current-page-title]')?.textContent).toBe('无效任务分类')
  expect(names()).toEqual([])
  const navigation = container.querySelector('[role=navigation][aria-label="业务模块"]')!
  expect(navigation).not.toBeNull()
  expect(navigation.querySelector('[aria-current=page]')).toBeNull()
  expect(invoke.mock.calls.some(([operation]) => operation === 'automation.list')).toBe(false)
  await navigate('集团填报')
  expect(container.querySelector('[role=alert]')).toBeNull()
  expect(names()).toEqual([])
  expect(container.querySelector('[aria-label="集团填报工作台"]')).not.toBeNull()
  expect(new URLSearchParams(location.search).get('taskType')).toBe('tencent_sheet_fill')
  expect(new URLSearchParams(location.search).get('loadId')).toBe('invalid-filter')
})

it('rejects ambiguous repeated category parameters', async () => {
  history.replaceState({}, '', '?route=daily-report&taskType=daily_report&taskType=notion_fill')
  await act(async () => { root.render(<App />); await vi.dynamicImportSettled() })
  expect(container.querySelector('[role=alert]')?.textContent).toContain('任务分类无效')
  expect(names()).toEqual([])
  expect(invoke.mock.calls.some(([operation]) => operation === 'automation.list')).toBe(false)
})

it.each(['?route=daily-report', '?route=daily-report&taskType='])('keeps the unfiltered task list for %s', async query => {
  history.replaceState({}, '', query)
  await act(async () => { root.render(<App />); await vi.dynamicImportSettled() })
  expect(container.querySelector('h1')?.textContent).toBe('任务清单')
  expect(names()).toEqual(['集团填报（仅任务名称）', '原材料任务', '自定义填报任务'])
})
