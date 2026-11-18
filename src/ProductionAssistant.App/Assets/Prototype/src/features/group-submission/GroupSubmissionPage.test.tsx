import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { toast } from 'sonner'
import { GroupSubmissionPage } from './GroupSubmissionPage'
// These integration cases use the real, loaded settings. The separate loading
// suite controls module delivery; Vite compilation is not a timed UI action here.
import './SubmissionSettings'
import { settleModuleImports } from '../../test-utils/settle-module-imports'
import type { SubmissionJob, SubmissionRun } from './types'

const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }))
vi.mock('../../bridge/index', () => ({ invoke }))
let container: HTMLDivElement, root: Root, job: SubmissionJob, tasks: { id: string; name: string; taskType: string }[], runs: SubmissionRun[]
const closed = { state: 'closed', browserOpen: false, authentication: 'unknown', documentAccess: 'unknown', editPermission: 'unknown', verifiedAt: null, message: '当前没有浏览器会话。' }
const button = (label: string) => [...container.querySelectorAll<HTMLButtonElement>('button')].find(element => element.textContent?.trim() === label)!
const tab = async (label: string) => {
  await act(async () => { button(label).focus(); button(label).click() })
  await settleModuleImports()
}
async function replaceDocument() {
  const trigger = container.querySelector<HTMLButtonElement>('[aria-label="文档更多操作"]')!
  await act(async () => { trigger.focus(); trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true })) })
  await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)) })
  await act(async () => [...document.querySelectorAll<HTMLElement>('[role=menuitem]')].find(element => element.textContent === '更换文档')!.click())
}
const changeUrl = async (value: string) => {
  if (!container.querySelector('#submission-document-url')) await replaceDocument()
  await act(async () => {
  const input = container.querySelector<HTMLInputElement>('#submission-document-url')!
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, value)
  input.dispatchEvent(new Event('input', { bubbles: true }))
  })
}
const submit = () => container.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
const mount = async () => act(async () => root.render(<GroupSubmissionPage />))
beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
  vi.spyOn(toast, 'error').mockReturnValue('error')
  job = { id: 'group', name: '现有文档', businessDate: '2026-11-10', configRevision: 8, config: { documentUrl: 'https://docs.qq.com/sheet/original', fields: [{ id: 'custom', name: '自定义指标', notion: { sourceName: '现有来源' } }], rules: { custom: { rowStep: 3 } } } }
  tasks = [{ id: 'other', name: '集团填报（只是名称）', taskType: 'daily_report' }, { id: 'group', name: '现有文档', taskType: 'tencent_sheet_fill' }]
  runs = []
  invoke.mockReset().mockImplementation(async (operation: string, payload: any) => {
    if (operation === 'automation.list') return { tasks }
    if (operation === 'tencentSheet.get') return structuredClone({ ...job, id: payload.id })
    if (operation === 'tencentSheet.create') {
      job = { ...job, id: 'created', config: { ...job.config, documentUrl: payload.documentUrl } }
      return { id: 'created' }
    }
    if (operation === 'tencentSheet.save') {
      job = { ...job, configRevision: payload.configRevision + 1, config: { ...job.config, ...payload.config } }
      return structuredClone(job)
    }
    if (operation === 'tencentSheet.runs') return { runs }
    if (operation.startsWith('tencentSheet.session')) return closed
    throw new Error(`Unexpected operation: ${operation}`)
  })
  container = document.createElement('div'); document.body.append(container); root = createRoot(container)
})
afterEach(async () => {
  try {
    await act(async () => root.unmount())
    expect(container.childElementCount).toBe(0)
  } finally { container.remove(); vi.restoreAllMocks(); vi.unstubAllGlobals() }
})

it('opens the business workbench with four empty metrics, backend date, and no runnable write actions', async () => {
  await mount()
  expect([...container.querySelectorAll('[role=tab]')].map(element => element.textContent)).toEqual(['概览', '记录', '设置'])
  const panel = container.querySelector('[role=tabpanel][data-state=active]')!
  expect([...panel.querySelectorAll('tbody tr')].map(element => element.textContent)).toEqual(['下料量—吨', '焊接量—吨', '板材入库量—吨', '型材入库量—吨'])
  expect(panel.querySelector<HTMLInputElement>('input[type=date]')?.value).toBe('2026-11-10')
  expect(panel.textContent).toContain('尚未接入')
  expect(panel.textContent).not.toMatch(/DOM|iframe|原值|选择器/)
  expect(container.querySelector('.automation-list-page')).toBeNull()
  expect(invoke).toHaveBeenCalledWith('automation.list')
  expect(invoke).toHaveBeenCalledWith('tencentSheet.get', { id: 'group' })
  expect(invoke.mock.calls.some(([operation]) => /fetch|inspect|write|setEnabled|backgroundTest/.test(operation))).toBe(false)
  await act(async () => button('检查文档连接').click())
  await settleModuleImports()
  expect(button('设置').getAttribute('aria-selected')).toBe('true')
  expect(container.querySelector('[data-slot=item][data-variant=outline]')).not.toBeNull()
})

it('omits the document chooser with multiple connections and retains the original connection load', async () => {
  tasks.push({ id: 'second-group', name: '另一个文档', taskType: 'tencent_sheet_fill' })
  await mount()
  expect(button('选择文档连接')).toBeUndefined()
  expect(invoke).toHaveBeenCalledWith('tencentSheet.get', { id: 'group' })
  await tab('设置')
  expect(container.querySelector('[aria-label="文档名称"]')?.textContent).toBe('腾讯文档')
})

it('loads history independently while configuration is pending', async () => {
  const normal = invoke.getMockImplementation()!
  invoke.mockImplementation((operation: string, payload: any) => operation === 'tencentSheet.get' ? new Promise(() => {}) : normal(operation, payload))
  await mount(); await tab('记录')
  expect(invoke).toHaveBeenCalledWith('tencentSheet.runs', { id: 'group' })
  expect(container.querySelector('[aria-label="集团填报历史"]')).not.toBeNull()
  expect(container.querySelector('[aria-label="正在读取集团填报配置"]')).toBeNull()
})

it('shows all settings sections without secondary navigation and retains the overview shortcut', async () => {
  await mount(); await tab('设置')
  expect(container.querySelector('nav[aria-label="填报设置"]')).toBeNull()
  expect([...container.querySelectorAll('[aria-label="集团填报设置"] h2')].map(element => element.textContent)).toEqual(['网页配置', '业务配置', '执行规则'])
  expect(container.querySelectorAll('[aria-label="集团填报设置"] [data-slot=separator]')).toHaveLength(2)
  await tab('概览')
  await act(async () => button('检查文档连接').click())
  expect(button('设置').getAttribute('aria-selected')).toBe('true')
  expect(container.querySelector('#submission-settings-web')!.hasAttribute('hidden')).toBe(false)
  expect(container.querySelector('[aria-labelledby="business-configuration-title"]')).not.toBeNull()
})

it('saves the real document link with its revision and checks the newly saved target', async () => {
  await mount(); await tab('设置'); await changeUrl('https://docs.qq.com/sheet/new')
  expect(container.querySelector('[data-connection-state=idle]')).not.toBeNull()
  await act(async () => { submit() })
  expect(invoke).toHaveBeenCalledWith('tencentSheet.save', { id: 'group', config: { documentUrl: 'https://docs.qq.com/sheet/new' }, configRevision: 8 })
  expect(job.config.fields?.[0].name).toBe('自定义指标')
  expect(job.config.rules).toEqual({ custom: { rowStep: 3 } })
  expect(invoke).toHaveBeenCalledWith('tencentSheet.sessionStatus', { documentUrl: 'https://docs.qq.com/sheet/new', id: 'group', configRevision: 9 }, 60000)
  expect(container.querySelector('[data-connection-state=connected]')).toBeNull()
  await act(async () => window.dispatchEvent(new Event('focus')))
  expect(invoke).toHaveBeenCalledWith('tencentSheet.sessionStatus', { documentUrl: 'https://docs.qq.com/sheet/new', id: 'group', configRevision: 9 }, 60000)
})
it('returns to the configured row after save and preserves a replacement draft across tabs until cancelled', async () => {
  await mount(); await tab('设置'); await changeUrl('https://docs.qq.com/sheet/saved')
  await act(async () => { submit() })
  expect(container.querySelector('#submission-document-url')).toBeNull()
  await changeUrl('https://docs.qq.com/sheet/next-draft')
  await tab('概览'); await tab('设置')
  expect(container.querySelector<HTMLInputElement>('#submission-document-url')!.value).toBe('https://docs.qq.com/sheet/next-draft')
  expect(job.config.documentUrl).toBe('https://docs.qq.com/sheet/saved')
  await act(async () => button('取消').click())
  expect(container.querySelector('#submission-document-url')).toBeNull()
  await replaceDocument()
  expect(container.querySelector<HTMLInputElement>('#submission-document-url')!.value).toBe(job.config.documentUrl)
})

it('keeps a draft across tabs without persisting or checking the unsaved target', async () => {
  await mount(); await tab('设置'); await changeUrl('https://docs.qq.com/sheet/draft')
  await tab('概览'); await tab('设置')
  expect(container.querySelector<HTMLInputElement>('#submission-document-url')!.value).toContain('/draft')
  expect(container.querySelector('[data-connection-state=idle]')).not.toBeNull()
  expect(job.config.documentUrl).toContain('/original')
  expect(invoke.mock.calls.some(([operation]) => operation === 'tencentSheet.save')).toBe(false)
  expect(invoke.mock.calls.some(([operation, payload]) => operation.startsWith('tencentSheet.session') && payload.documentUrl.endsWith('/draft'))).toBe(false)
})

it('does not overwrite the saved target on a rejected save and blocks duplicate submissions', async () => {
  await mount(); await tab('设置'); await changeUrl('https://docs.qq.com/sheet/rejected')
  let reject!: (error: Error) => void
  invoke.mockImplementationOnce(() => new Promise((_, fail) => { reject = fail }))
  await act(async () => { submit(); submit() })
  expect(invoke.mock.calls.filter(([operation]) => operation === 'tencentSheet.save')).toHaveLength(1)
  expect(button('连接').disabled).toBe(true)
  expect(button('概览').disabled).toBe(true)
  await act(async () => reject(new Error('任务配置已变化，请重新打开后再修改。')))
  expect(toast.error).toHaveBeenCalledWith('任务配置已变化，请重新打开后再修改。')
  expect(job.config.documentUrl).toContain('/original')
  expect(container.querySelector('[data-connection-state=idle]')).not.toBeNull()
})

it('creates one persisted connection without a generic task wizard and restores it on remount', async () => {
  tasks = []
  await mount(); await tab('设置'); await changeUrl('https://docs.qq.com/sheet/new-connection')
  await act(async () => { submit(); submit() })
  expect(invoke.mock.calls.filter(([operation]) => operation === 'tencentSheet.create')).toEqual([['tencentSheet.create', { documentUrl: 'https://docs.qq.com/sheet/new-connection', requestId: expect.stringMatching(/^[a-f0-9]{32}$/) }]])
  expect(invoke).toHaveBeenCalledWith('tencentSheet.get', { id: 'created' })
  expect(container.querySelector('.automation-create-dialog')).toBeNull()
  tasks = [{ id: 'created', name: '恢复的文档', taskType: 'tencent_sheet_fill' }]
  invoke.mockClear()
  await act(async () => root.unmount()); root = createRoot(container); await mount(); await tab('设置')
  expect(invoke).toHaveBeenCalledWith('tencentSheet.get', { id: 'created' })
  expect(container.querySelector('[aria-label="文档名称"]')?.textContent).toBe('腾讯文档')
})

it('retains a business created before the first document connection is saved', async () => {
  tasks = []; await mount(); await tab('设置')
  await act(async () => button('新建业务').click())
  const originalScroll = HTMLElement.prototype.scrollIntoView
  HTMLElement.prototype.scrollIntoView = vi.fn()
  try {
    const trigger = document.querySelector<HTMLButtonElement>('[data-slot=dialog-content] [role=combobox]')!
    await act(async () => trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true })))
    const option = document.querySelector<HTMLElement>('[role=option]')!
    await act(async () => { option.focus(); option.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true })) })
    const next = [...document.querySelectorAll<HTMLButtonElement>('[data-slot=dialog-content] button')].find(element => element.textContent === '下一步')!
    await act(async () => next.click())
    await act(async () => document.querySelector<HTMLButtonElement>('[data-slot=dialog-content] [aria-label=关闭]')!.click())
  } finally { HTMLElement.prototype.scrollIntoView = originalScroll }
  expect(container.querySelectorAll('[aria-label="业务列表"] tbody tr')).toHaveLength(1)
  await changeUrl('https://docs.qq.com/sheet/new-with-business'); await act(async () => { submit() })
  expect(invoke).toHaveBeenCalledWith('tencentSheet.get', { id: 'created' })
  expect(container.querySelectorAll('[aria-label="业务列表"] tbody tr')).toHaveLength(1)
  expect(container.querySelector('[aria-label="业务列表"] tbody')?.textContent).toContain('未设置位置')
  expect(container.querySelector('[aria-label="业务列表"] [role=switch]')).toBeNull()
})

it('keeps the created identity when its first read fails, so retry cannot create another record', async () => {
  tasks = []; await mount(); await tab('设置'); await changeUrl('https://docs.qq.com/sheet/created')
  const normal = invoke.getMockImplementation()!
  invoke.mockImplementation((operation: string, payload: any) => operation === 'tencentSheet.get' ? Promise.reject(new Error('读取中断')) : normal(operation, payload))
  await act(async () => { submit() })
  expect(container.querySelector('[role=alert]')?.textContent).toContain('读取中断')
  expect([...container.querySelectorAll('button')].some(element => element.textContent === '保存')).toBe(false)
  invoke.mockImplementation(normal)
  await act(async () => button('重新读取文档配置').click())
  expect(invoke.mock.calls.filter(([operation]) => operation === 'tencentSheet.create')).toHaveLength(1)
  expect(container.querySelector('[aria-label="文档名称"]')?.textContent).toBe('腾讯文档')
})

it('reads existing history and preserves uncertain outcomes and PascalCase stored snapshots', async () => {
  runs = [{ id: 'run', businessDate: '2026-11-09', time: '2026-11-10 08:30:00', source: 'automatic', status: '失败或待确认', phase: 'write', error: '刷新回读未确认', data: [{ Id: 'cut', Name: '下料量', Value: 0, Unit: '吨', Source: '正式数据库', Period: '2026-11-09', RecordCount: 1 }] }]
  await mount(); await tab('记录')
  expect(invoke).toHaveBeenCalledWith('tencentSheet.runs', { id: 'group' })
  expect(container.querySelector('[aria-label="集团填报历史"]')?.textContent).toContain('定时填报失败或待确认')
  await act(async () => button('查看详情').click())
  const dialog = document.querySelector('[role=dialog]')!
  expect(dialog.textContent).toContain('刷新回读未确认')
  expect(dialog.querySelector('[aria-label="历史取数快照"]')?.textContent).toContain('下料量0 吨正式数据库')
  expect(dialog.textContent).toContain('取数快照不代表文档已保存')
  await act(async () => document.querySelector<HTMLButtonElement>('[aria-label="关闭"]')!.click())
})

it('shows a history transport error without reporting an empty successful result and allows retry', async () => {
  await mount()
  const normal = invoke.getMockImplementation()!
  invoke.mockImplementation((operation: string, payload: any) => operation === 'tencentSheet.runs' ? Promise.reject(new Error('记录服务不可用')) : normal(operation, payload))
  await tab('记录')
  expect(container.querySelector('[role=alert]')?.textContent).toContain('记录服务不可用')
  expect(container.querySelector('[aria-label="集团填报历史"]')?.textContent).not.toContain('暂无执行记录')
  invoke.mockImplementation(normal)
  await act(async () => button('刷新记录').click())
  expect(container.querySelector('[role=tabpanel][data-state=active] [role=alert]')).toBeNull()
  expect(container.querySelector('[aria-label="集团填报历史"]')?.textContent).toContain('暂无执行记录')
})

it('blocks configuration changes on an enabled task and does not expose unsupported scheduler actions', async () => {
  job.enabled = true; await mount(); await tab('设置')
  expect(container.querySelector('#submission-document-url')).toBeNull()
  const trigger = container.querySelector<HTMLButtonElement>('[aria-label="文档更多操作"]')!
  await act(async () => trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true })))
  await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)) })
  expect([...document.querySelectorAll('[role=menuitem]')].find(element => element.textContent === '更换文档')?.getAttribute('aria-disabled')).toBe('true')
  await act(async () => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })))
  expect(container.textContent).toContain('当前任务已启用')
  expect(container.querySelector('[role=switch][id=submission-auto]')).not.toBeNull()
  expect(invoke.mock.calls.some(([operation]) => operation === 'automation.setEnabled')).toBe(false)
})

it('rejects a mismatched configuration identity without starting its session and can retry', async () => {
  const normal = invoke.getMockImplementation()!
  invoke.mockImplementation((operation: string, payload: any) => operation === 'tencentSheet.get' ? Promise.resolve({ ...job, id: 'another-document' }) : normal(operation, payload))
  await mount()
  expect(container.querySelector('[role=alert]')?.textContent).toContain('文档配置响应无效')
  expect(container.querySelector('form')).toBeNull()
  expect(invoke.mock.calls.some(([operation]) => operation.startsWith('tencentSheet.session'))).toBe(false)
  invoke.mockImplementation(normal)
  await act(async () => button('重新读取文档配置').click())
  await tab('设置')
  expect(container.querySelector('[aria-label="文档名称"]')?.textContent).toBe('腾讯文档')
})

it('shows a list failure before offering creation and can reload without selecting another task type', async () => {
  invoke.mockRejectedValueOnce(new Error('连接列表读取失败')); await mount()
  expect(container.querySelector('[role=alert]')?.textContent).toContain('连接列表读取失败')
  expect(container.querySelector('form')).toBeNull()
  await act(async () => button('重新读取连接列表').click())
  expect(invoke).toHaveBeenCalledWith('tencentSheet.get', { id: 'group' })
  expect(invoke.mock.calls.some(([operation, payload]) => operation === 'tencentSheet.get' && payload.id === 'other')).toBe(false)
})
