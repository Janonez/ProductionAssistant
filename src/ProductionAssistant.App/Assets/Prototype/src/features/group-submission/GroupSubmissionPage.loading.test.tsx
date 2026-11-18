import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { afterEach, expect, it, vi } from 'vitest'
import { GroupSubmissionPage } from './GroupSubmissionPage'
import { configurationFixture } from './submission-configuration.test-fixture'

const state = vi.hoisted(() => ({ invoke: vi.fn() }))
vi.mock('../../bridge/index', () => ({ invoke: state.invoke }))
afterEach(() => vi.unstubAllGlobals())

it('renders settings on the first click and confines config reads and failures to the document section', async () => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
  let list!: (value: unknown) => void, rejectConfig!: (error: Error) => void, loadConfig!: (value: unknown) => void
  state.invoke.mockImplementation((operation: string) => {
    if (operation === 'automation.list') return new Promise(resolve => { list = resolve })
    if (operation === 'tencentSheet.get') return new Promise((resolve, reject) => { loadConfig = resolve; rejectConfig = reject })
    if (operation === 'tencentSheet.runs') return Promise.resolve({ runs: [] })
    if (operation === 'groupSubmission.getConfiguration') return Promise.resolve(configurationFixture())
    throw new Error(operation)
  })
  const container = document.createElement('div'); document.body.append(container)
  const root = createRoot(container)
  const button = (name: string) => [...container.querySelectorAll<HTMLButtonElement>('button')].find(node => node.textContent === name)!
  const panel = () => container.querySelector('[role=tabpanel][data-state=active]')!
  const headings = () => [...panel().querySelectorAll('h2')].map(node => node.textContent)
  try {
    await act(async () => root.render(<GroupSubmissionPage />))
    expect(container.querySelector('h1')?.textContent).toBe('集团填报')
    expect(panel().textContent).toContain('获取数据 → 检查目标 → 确认填报')
    expect(panel().querySelector('[aria-label="本次填报数据"]')).not.toBeNull()
    expect(panel().querySelectorAll('tbody tr')).toHaveLength(4)
    expect(panel().querySelector('[aria-label="正在读取填报日期"]')).not.toBeNull()
    expect(button('配置文档连接').disabled).toBe(false)
    await act(async () => button('配置文档连接').click())
    expect(button('设置').getAttribute('aria-selected')).toBe('true')
    expect(panel().textContent).not.toContain('正在加载设置界面')
    expect(headings()).toEqual(['网页配置', '业务配置', '执行规则'])
    expect(button('新建业务').disabled).toBe(true)
    expect(panel().querySelector('[aria-label="本次填报数据"]')).toBeNull()
    expect(panel().querySelector('[aria-label="正在读取网页配置"]')).not.toBeNull()
    expect(panel().querySelector('form')).toBeNull()
    await act(async () => list({ tasks: [{ id: 'group', taskType: 'tencent_sheet_fill', name: '文档' }] }))
    await act(async () => rejectConfig(new Error('配置读取中断')))
    expect(panel().querySelector('[role=alert]')?.textContent).toContain('配置读取中断')
    expect(panel().querySelector('[aria-busy]')?.getAttribute('aria-busy')).toBe('false')
    expect(headings()).toEqual(['网页配置', '业务配置', '执行规则'])
    await act(async () => { button('概览').focus(); button('概览').click() })
    expect(panel().querySelector('[aria-label="本次填报数据"]')).not.toBeNull()
    expect(panel().querySelector('[role=alert]')?.textContent).toContain('配置读取中断')
    await act(async () => { button('设置').focus(); button('设置').click() })
    await act(async () => button('重新读取文档配置').click())
    expect(panel().querySelector('[aria-label="正在读取网页配置"]')).not.toBeNull()
    await act(async () => loadConfig({ id: 'group', config: { documentUrl: 'https://docs.qq.com/sheet/example' } }))
    expect(panel().querySelector('[aria-label="网页配置加载"]')).toBeNull()
    expect(panel().querySelector('[aria-label="集团填报设置"]')).not.toBeNull()
    expect(headings()).toEqual(['网页配置', '业务配置', '执行规则'])
    expect(state.invoke.mock.calls.some(([operation]) => /create|save|write|sessionOpen/.test(operation))).toBe(false)
  } finally { await act(async () => root.unmount()); container.remove() }
})
