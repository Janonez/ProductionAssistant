import { act, useState } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { SubmissionExecutionRules } from './SubmissionExecutionRules'
import { configurationFixture } from './submission-configuration.test-fixture'
import type { ConfigurationChange, SubmissionConfiguration } from './business-configuration.types'

const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }))
vi.mock('../../bridge/index', () => ({ invoke }))
let root: Root, container: HTMLDivElement, initial: SubmissionConfiguration
const save = vi.fn()
const get = <T extends HTMLElement = HTMLButtonElement>(selector: string) => container.querySelector<T>(selector)!
const click = async (selector: string) => act(async () => { get(selector).click() })
const edit = async (selector: string, value: string) => act(async () => {
  const input = get<HTMLInputElement>(selector)
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, value)
  input.dispatchEvent(new Event('input', { bubbles: true }))
})
const advance = () => act(async () => { await vi.advanceTimersByTimeAsync(400) })
const job = { id: 'job', config: { documentUrl: 'https://docs.qq.com/sheet/fixture' } }
const refresh = async () => undefined

function Harness({ loginRequired = false }: { loginRequired?: boolean }) {
  const [configuration, setConfiguration] = useState(initial)
  return <SubmissionExecutionRules configuration={configuration} refresh={refresh} job={job} loginRequired={loginRequired}
    save={async (change: ConfigurationChange) => {
      const result = await save(change)
      if (result) return result
      if (!('rules' in change)) throw new Error('expected rules')
      const saved = { ...configuration, revision: configuration.revision + 1, rules: change.rules }
      setConfiguration(saved)
      return { configuration: saved }
    }} />
}
const mount = async (loginRequired = false) => act(async () => root.render(<Harness loginRequired={loginRequired} />))
beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
  vi.useFakeTimers()
  save.mockReset()
  initial = configurationFixture()
  invoke.mockReset().mockResolvedValue({ runs: [] })
  container = document.createElement('div'); document.body.append(container); root = createRoot(container)
})
afterEach(async () => {
  await act(async () => root.unmount())
  container.remove(); vi.useRealTimers(); vi.unstubAllGlobals()
})

it('keeps the top row visible and uses one Collapsible for edits', async () => {
  await mount()
  expect(container.querySelectorAll('[data-slot=card]')).toHaveLength(1)
  expect(container.querySelector('[data-slot=collapsible-trigger], button button')).toBeNull()
  expect(get('[data-slot=collapsible]').getAttribute('data-state')).toBe('closed')
  expect(container.textContent).toContain('下次执行：— · 上次：尚未执行')
  await click('#submission-auto')
  expect(get('[data-slot=collapsible]').getAttribute('data-state')).toBe('open')
  await advance()
  expect(container.textContent).toContain('已保存')
  expect(container.textContent).toContain('没有可填报的业务')
})

it('rejects an empty set of weekdays and preserves the selected days on acknowledgement', async () => {
  initial.rules = { ...initial.rules, automatic: true }
  await mount()
  expect(container.querySelectorAll('[data-slot=toggle-group-item][data-state=on]')).toHaveLength(7)
  for (const day of ['一', '二', '三', '四', '五', '六', '日']) await click('[aria-label="星期' + day + '"]')
  await advance()
  expect(container.textContent).toContain('至少选择一个执行日')
  expect(save).not.toHaveBeenCalled()
  await click('[aria-label="星期一"]')
  await click('[aria-label="星期三"]')
  await advance()
  expect(save).toHaveBeenCalledOnce()
  expect(save).toHaveBeenCalledWith({ rules: { ...initial.rules, weekdays: [1, 3] } })
})

it('retains the saved interval and deadline when switching between skip and wait', async () => {
  initial.rules = { ...initial.rules, automatic: true, retryMinutes: 15, retryUntil: '20:30' }
  await mount(); await click('#submission-skip'); await advance()
  expect(container.querySelector('#submission-retry-until')).toBeNull()
  expect(container.textContent).toContain('通知功能待接入')
  expect(save.mock.calls[0][0].rules).toMatchObject({ retryMinutes: 15, retryUntil: '20:30', missingData: 'skip' })
  await click('#submission-wait')
  expect(get<HTMLInputElement>('#submission-retry-until').value).toBe('20:30')
  expect(get<HTMLInputElement>('[aria-label="重试间隔"]').value).toBe('15')
})

it.each(['08:45', '08:30', '25:00', ''])('blocks an invalid deadline %j with FieldError', async value => {
  initial.rules.automatic = true
  await mount(); await edit('#submission-retry-until', value); await advance()
  expect(save).not.toHaveBeenCalled()
  expect(get('#submission-retry-until').getAttribute('aria-invalid')).toBe('true')
  expect(get('#submission-retry-error').getAttribute('data-slot')).toBe('field-error')
  expect(get('#submission-retry-error').textContent).toMatch(/最晚时间必须晚于|请输入有效时间/)
})

it('blocks a nonpositive retry interval and preserves a positive edit together with schedule edits', async () => {
  initial.rules.automatic = true
  await mount()
  await edit('[aria-label="重试间隔"]', '0'); await advance()
  expect(get('#submission-interval-error').textContent).toContain('重试间隔必须为正整数')
  expect(save).not.toHaveBeenCalled()
  await edit('[aria-label="重试间隔"]', '12')
  await edit('#submission-time', '09:15')
  await edit('#submission-retry-until', '19:00')
  await advance()
  expect(save).toHaveBeenCalledOnce()
  expect(save).toHaveBeenCalledWith({ rules: { ...initial.rules, time: '09:15', retryMinutes: 12, retryUntil: '19:00' } })
})

it('shows a generic save error without rolling back the switch', async () => {
  save.mockResolvedValueOnce({ error: '保存失败测试' })
  await mount(); await click('#submission-auto'); await advance()
  expect(get('#submission-auto').getAttribute('aria-checked')).toBe('true')
  expect(container.textContent).toContain('保存失败测试')
  expect(container.textContent).not.toContain('已保存')
})

it('uses explicit login evidence and backend business eligibility', async () => {
  initial.rules.automatic = true
  initial.hasBusiness = true
  await mount(true)
  expect(invoke.mock.calls.some(([operation]) => operation.startsWith('tencentSheet.session'))).toBe(false)
  expect(container.textContent).toContain('请先登录腾讯文档')
  expect(container.textContent).not.toContain('没有可填报的业务')
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
  expect(container.textContent).not.toContain('请先登录腾讯文档')
})
