import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { toast } from 'sonner'
import { SubmissionExecutionRules } from './SubmissionExecutionRules'
import { createSubmissionSettingsMock } from './submission-settings.mock'
import { defaultExecutionRules, type BusinessListItem, type ExecutionRules, type SubmissionSettingsAdapter } from './business-configuration.types'

const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }))
vi.mock('../../bridge/index', () => ({ invoke }))
let root: Root, container: HTMLDivElement, adapter: SubmissionSettingsAdapter
const sources = [{ value: 'source', label: '真实来源测试夹具' }]
const business: BusinessListItem = { id: 'one', name: '业务', dataSource: sources[0], position: { status: 'configured', first: { date: '2026-11-12', cell: 'A1' }, second: { date: '2026-11-13', cell: 'A2' }, direction: 'down', step: 1, preview: [] } }
const get = <T extends HTMLElement = HTMLButtonElement>(selector: string) => container.querySelector<T>(selector)!
const click = async (selector: string) => act(async () => { get(selector).click() })
const edit = async (selector: string, value: string, blur = true) => {
  await act(async () => {
    const input = get<HTMLInputElement>(selector)
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, value)
    input.dispatchEvent(new Event('input', { bubbles: true }))
  })
  if (blur) await act(async () => get(selector).dispatchEvent(new FocusEvent('focusout', { bubbles: true })))
}
const mount = async () => act(async () => root.render(<SubmissionExecutionRules adapter={adapter} dataOptions={sources} job={{ id: 'job', config: { documentUrl: 'https://docs.qq.com/sheet/fixture' } }} />))
beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
  vi.spyOn(toast, 'success').mockReturnValue('saved')
  vi.spyOn(toast, 'info').mockReturnValue('local')
  invoke.mockReset().mockImplementation(async operation => operation === 'tencentSheet.runs' ? { runs: [] } : { browserOpen: true, authentication: 'unknown' })
  adapter = createSubmissionSettingsMock()
  container = document.createElement('div'); document.body.append(container); root = createRoot(container)
})
afterEach(async () => { await act(async () => root.unmount()); container.remove(); vi.restoreAllMocks(); vi.unstubAllGlobals() })

it('keeps the top row visible and drives the single Collapsible from the acknowledged Switch value', async () => {
  adapter.isMock = false
  let resolve!: (rules: ExecutionRules) => void
  adapter.saveRules = vi.fn(() => new Promise<ExecutionRules>(done => { resolve = done }))
  await mount()
  expect(container.querySelectorAll('[data-slot=card]')).toHaveLength(1)
  expect(container.querySelector('[data-slot=collapsible-trigger], button button')).toBeNull()
  expect(get('[data-slot=collapsible]').getAttribute('data-state')).toBe('closed')
  expect(container.textContent).toContain('下次执行：— · 上次：尚未执行')
  await click('#submission-auto')
  expect(get<HTMLButtonElement>('#submission-auto').disabled).toBe(true)
  expect(get('#submission-auto').getAttribute('aria-checked')).toBe('false')
  expect(get('[data-slot=collapsible]').getAttribute('data-state')).toBe('closed')
  expect(toast.success).not.toHaveBeenCalled()
  await act(async () => resolve({ ...defaultExecutionRules, automatic: true }))
  expect(get('#submission-auto').getAttribute('aria-checked')).toBe('true')
  expect(get('[data-slot=collapsible]').getAttribute('data-state')).toBe('open')
  expect(toast.success).toHaveBeenCalledWith('已保存', expect.any(Object))
})

it('uses a local-only message for the preview and preserves values across collapse and remount', async () => {
  await mount(); await click('#submission-auto')
  await edit('#submission-time', '10:30')
  await click('#submission-notify'); await click('#submission-catch-up')
  await click('#submission-auto')
  expect(get('[data-slot=collapsible]').getAttribute('data-state')).toBe('closed')
  expect(container.querySelector('#submission-time')).toBeNull()
  expect(container.textContent).toContain('自动填报')
  await click('#submission-auto')
  expect(get<HTMLInputElement>('#submission-time').value).toBe('10:30')
  expect(get('#submission-notify').getAttribute('aria-checked')).toBe('true')
  expect(get('#submission-catch-up').getAttribute('aria-checked')).toBe('true')
  expect(toast.success).not.toHaveBeenCalled()
  expect(toast.info).toHaveBeenCalledWith('仅保留在当前页面，尚未保存到后端', expect.any(Object))
  await act(async () => root.unmount()); root = createRoot(container); await mount()
  expect(get<HTMLInputElement>('#submission-time').value).toBe('10:30')
})

it('defaults to all seven days and prevents deselecting the final day without saving an empty array', async () => {
  const save = vi.spyOn(adapter, 'saveRules')
  await mount(); await click('#submission-auto')
  expect(container.querySelectorAll('[data-slot=toggle-group-item][data-state=on]')).toHaveLength(7)
  for (const day of ['一', '二', '三', '四', '五', '六']) await click('[aria-label="星期' + day + '"]')
  save.mockClear()
  await click('[aria-label="星期日"]')
  expect(container.querySelectorAll('[data-slot=toggle-group-item][data-state=on]')).toHaveLength(1)
  expect(container.textContent).toContain('至少选择一个执行日')
  expect(save).not.toHaveBeenCalled()
})

it('hides retry controls for skip while retaining the interval and deadline for wait', async () => {
  await adapter.saveRules({ ...defaultExecutionRules, automatic: true, retryMinutes: 15, retryUntil: '20:30' })
  await mount(); await click('#submission-skip')
  expect(container.querySelector('#submission-retry-until')).toBeNull()
  expect(adapter.readRuleDraft().retryUntil).toBe('20:30')
  await click('#submission-wait')
  expect(get<HTMLInputElement>('#submission-retry-until').value).toBe('20:30')
  expect(get('[aria-label="重试间隔"]').textContent).toContain('15 分钟')
})

it.each(['09:00', '08:59', '25:00', ''])('blocks an invalid deadline %j with FieldError and makes no persistence call', async value => {
  await mount(); await click('#submission-auto')
  const save = vi.spyOn(adapter, 'saveRules')
  await edit('#submission-retry-until', value)
  expect(save).not.toHaveBeenCalled()
  expect(get('#submission-retry-until').getAttribute('aria-invalid')).toBe('true')
  expect(get('#submission-retry-error').getAttribute('data-slot')).toBe('field-error')
  expect(get('#submission-retry-error').textContent).toMatch(/最晚时间必须晚于|请输入有效时间/)
})

it('lets the user repair the retained deadline when switching back from skip after a later execution time', async () => {
  await adapter.saveRules({ ...defaultExecutionRules, automatic: true, missingData: 'skip', time: '20:00', retryUntil: '18:00' })
  await mount()
  const save = vi.spyOn(adapter, 'saveRules')
  await click('#submission-wait')
  expect(save).not.toHaveBeenCalled()
  expect(get<HTMLInputElement>('#submission-retry-until').value).toBe('18:00')
  expect(get('#submission-retry-error').textContent).toContain('最晚时间必须晚于执行时间')
  await edit('#submission-retry-until', '21:00')
  expect(adapter.readRuleDraft()).toMatchObject({ missingData: 'wait', retryUntil: '21:00' })
})

it('keeps incomplete time input local and commits a valid time only once on Enter followed by blur', async () => {
  await mount(); await click('#submission-auto')
  const save = vi.spyOn(adapter, 'saveRules')
  await edit('#submission-time', '10:', false)
  expect(save).not.toHaveBeenCalled()
  await edit('#submission-time', '10:45', false)
  expect(save).not.toHaveBeenCalled()
  await act(async () => get('#submission-time').dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })))
  await act(async () => get('#submission-time').dispatchEvent(new FocusEvent('focusout', { bubbles: true })))
  expect(save).toHaveBeenCalledTimes(1)
  expect(adapter.readRuleDraft().time).toBe('10:45')
})

it('restores the acknowledged rules after failure and never shows a success toast', async () => {
  adapter.isMock = false
  adapter.saveRules = vi.fn().mockRejectedValue(new Error('保存失败测试'))
  await mount(); await click('#submission-auto')
  expect(get('#submission-auto').getAttribute('aria-checked')).toBe('false')
  expect(get('[data-slot=collapsible]').getAttribute('data-state')).toBe('closed')
  expect(container.textContent).toContain('保存失败测试')
  expect(toast.success).not.toHaveBeenCalled()
})

it('uses explicit login evidence and updates the business Alert from valid source and position changes', async () => {
  invoke.mockImplementation(async operation => operation === 'tencentSheet.runs' ? { runs: [] } : { browserOpen: true, authentication: 'required' })
  await mount(); await click('#submission-auto')
  expect(container.textContent).toContain('未登录，下次自动填报会失败')
  expect(container.textContent).toContain('没有可填报的业务')
  await act(async () => adapter.writeBusinessDrafts([{ ...business, dataSource: { value: 'removed', label: '失效来源' } }]))
  expect(container.textContent).toContain('没有可填报的业务')
  await act(async () => adapter.writeBusinessDrafts([business]))
  expect(container.textContent).not.toContain('没有可填报的业务')
  await act(async () => adapter.writeBusinessDrafts([{ ...business, position: { status: 'unconfigured' } }]))
  expect(container.textContent).toContain('没有可填报的业务')
  await click('#submission-auto')
  expect(container.textContent).not.toContain('未登录，下次自动填报会失败')
})

it('shows only backend run facts and does not infer a future execution from the local clock', async () => {
  invoke.mockResolvedValue({ runs: [{ id: 'older', time: '2026-11-11 09:00:00', status: '成功' }, { id: 'latest', time: '2026-11-12 09:15:00', status: '跳过' }] })
  await mount()
  expect(container.textContent).toContain('下次执行：— · 上次：2026-11-12 09:15:00 跳过')
  expect(invoke).toHaveBeenCalledWith('tencentSheet.runs', { id: 'job' })
})

it('does not turn a failed history read or unknown login into a fabricated result', async () => {
  invoke.mockRejectedValue(new Error('网络不可用'))
  await mount(); await click('#submission-auto')
  expect(container.textContent).toContain('上次：读取失败')
  expect(container.textContent).not.toContain('尚未执行')
  expect(container.textContent).not.toContain('未登录，下次自动填报会失败')
})
