import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { toast } from 'sonner'
import { SubmissionSettings } from './SubmissionSettings'
import { createSubmissionSettingsMock } from './submission-settings.mock'
import { defaultExecutionRules, type ExecutionRules, type SubmissionSettingsAdapter } from './business-configuration.types'

const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }))
vi.mock('../../bridge/index', () => ({ invoke }))
let root: Root, container: HTMLDivElement, adapter: SubmissionSettingsAdapter
const button = (text: string, parent: ParentNode = container) => [...parent.querySelectorAll<HTMLButtonElement>('button')].find(element => element.textContent?.trim() === text)!
const click = async (element: HTMLElement) => act(async () => { element.focus(); element.click() })
const change = async (selector: string, value: string) => act(async () => {
  const input = container.querySelector<HTMLInputElement>(selector)!
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, value)
  input.dispatchEvent(new Event('input', { bubbles: true }))
})
beforeEach(async () => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
  vi.spyOn(toast, 'success').mockReturnValue('saved')
  vi.spyOn(toast, 'info').mockReturnValue('local')
  invoke.mockReset().mockImplementation(async operation => operation === 'tencentSheet.runs' ? { runs: [] } : { state: 'authenticated', browserOpen: true, authentication: 'authenticated', documentAccess: 'allowed' })
  adapter = createSubmissionSettingsMock()
  container = document.createElement('div'); document.body.append(container); root = createRoot(container)
  await act(async () => root.render(<SubmissionSettings adapter={adapter} job={{ id: 'one', name: '原始文档名称', config: { documentUrl: 'https://docs.qq.com/sheet/one' } }} onSaved={vi.fn()} onCreated={vi.fn()} onActive={vi.fn()} onDirty={vi.fn()} />))
})
afterEach(async () => { await act(async () => root.unmount()); container.remove(); vi.restoreAllMocks(); vi.unstubAllGlobals() })

it('uses three consecutive sections with two page separators and one execution-rules Card', () => {
  expect([...container.querySelectorAll('h2')].map(element => element.textContent)).toEqual(['网页配置', '业务配置', '执行规则'])
  expect(container.querySelectorAll('[data-slot=separator]')).toHaveLength(2)
  expect(container.querySelector('nav')).toBeNull()
  expect(container.querySelectorAll('[data-slot=card]')).toHaveLength(1)
  expect(container.querySelector('[aria-labelledby=execution-rules-title] [data-slot=card]')).not.toBeNull()
  expect(button('保存').disabled).toBe(true)
  expect(container.textContent).toContain('尚未检测文档连接')
  expect(container.querySelector('#submission-document-note')).toBeNull()
  expect(container.querySelector('[aria-label="集团填报设置"]')?.className).not.toMatch(/max-w|w-\[/)
})
it('saves rules on change and only shows the saved toast after adapter acknowledgement', async () => {
  adapter.isMock = false
  let resolve!: (value: ExecutionRules) => void
  adapter.saveRules = vi.fn(() => new Promise<ExecutionRules>(done => { resolve = done }))
  const toggle = container.querySelector<HTMLButtonElement>('#submission-auto')!
  await click(toggle)
  expect(toast.success).not.toHaveBeenCalled()
  expect(toggle.disabled).toBe(true)
  expect(adapter.saveRules).toHaveBeenCalledWith({ ...defaultExecutionRules, automatic: true })
  await act(async () => resolve({ ...defaultExecutionRules, automatic: true }))
  expect(toggle.getAttribute('aria-checked')).toBe('true')
  expect(toast.success).toHaveBeenCalledWith('已保存', expect.any(Object))
  expect(container.querySelector('[aria-labelledby=execution-rules-title] button[type=submit]')).toBeNull()
})
it('does not report success for rejected rule changes', async () => {
  await click(container.querySelector<HTMLButtonElement>('#submission-auto')!)
  adapter.saveRules = vi.fn().mockRejectedValue(new Error('暂时无法保存执行规则'))
  const toggle = container.querySelector<HTMLButtonElement>('#submission-notify')!
  await click(toggle)
  expect(toggle.getAttribute('aria-checked')).toBe('false')
  expect(container.textContent).toContain('暂时无法保存执行规则')
  expect(toast.success).not.toHaveBeenCalled()
})
it('validates HH:mm and saves complete valid time edits on blur through the adapter', async () => {
  await click(container.querySelector<HTMLButtonElement>('#submission-auto')!)
  adapter.isMock = false
  adapter.saveRules = vi.fn(async value => ({ ...value }))
  await change('#submission-time', '25:00')
  await act(async () => container.querySelector<HTMLInputElement>('#submission-time')!.dispatchEvent(new FocusEvent('focusout', { bubbles: true })))
  expect(adapter.saveRules).not.toHaveBeenCalled()
  expect(container.textContent).toContain('请输入有效时间')
  await change('#submission-time', '08:30')
  expect(adapter.saveRules).not.toHaveBeenCalled()
  await act(async () => container.querySelector<HTMLInputElement>('#submission-time')!.dispatchEvent(new FocusEvent('focusout', { bubbles: true })))
  expect(adapter.saveRules).toHaveBeenCalledWith({ ...defaultExecutionRules, automatic: true, time: '08:30' })
  expect(toast.success).toHaveBeenCalled()
})
