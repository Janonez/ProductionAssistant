import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { SubmissionSettings } from './SubmissionSettings'
import { configurationFixture } from './submission-configuration.test-fixture'
import type { ConfigurationSaveResult, ExecutionRules, SubmissionConfiguration } from './business-configuration.types'

const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }))
vi.mock('../../bridge/index', () => ({ invoke }))
let root: Root, container: HTMLDivElement, stored: SubmissionConfiguration
const save = vi.fn()
const job = { id: 'one', configRevision: 7, name: '原始文档名称', config: { documentUrl: 'https://docs.qq.com/sheet/one' } }
const button = (text: string) => [...container.querySelectorAll<HTMLButtonElement>('button')].find(element => element.textContent?.trim() === text)!
const click = async (element: HTMLElement) => act(async () => { element.focus(); element.click() })
const change = async (selector: string, value: string) => act(async () => {
  const input = container.querySelector<HTMLInputElement>(selector)!
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, value)
  input.dispatchEvent(new Event('input', { bubbles: true }))
})
const advance = () => act(async () => { await vi.advanceTimersByTimeAsync(400) })
const mount = () => act(async () => root.render(<SubmissionSettings job={job} onSaved={vi.fn()} onCreated={vi.fn()} />))

beforeEach(async () => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
  vi.useFakeTimers()
  stored = configurationFixture()
  save.mockReset().mockImplementation(async ({ rules }: { rules: ExecutionRules }): Promise<ConfigurationSaveResult> => {
    stored = { ...stored, revision: stored.revision + 1, rules }
    return { configuration: structuredClone(stored) }
  })
  invoke.mockReset().mockImplementation(async (operation, payload) => {
    if (operation === 'groupSubmission.getConfiguration') return structuredClone(stored)
    if (operation === 'groupSubmission.saveConfiguration') return save(payload)
    if (operation === 'tencentSheet.getConnectionSummary') return { state: 'NotConnected', configRevision: 7 }
    if (operation === 'tencentSheet.runs') return { runs: [] }
    return { state: 'closed', browserOpen: false, authentication: 'unknown', documentAccess: 'unknown' }
  })
  container = document.createElement('div'); document.body.append(container); root = createRoot(container)
  await mount()
})
afterEach(async () => {
  await act(async () => root.unmount())
  container.remove(); vi.useRealTimers(); vi.unstubAllGlobals()
})

it('uses the backend default and keeps the existing section layout', () => {
  expect([...container.querySelectorAll('h2')].map(element => element.textContent)).toEqual(['网页配置', '业务配置', '执行规则'])
  expect(container.querySelectorAll('[data-slot=separator]')).toHaveLength(0)
  expect(container.querySelector('nav')).toBeNull()
  expect(container.querySelectorAll('[data-slot=card]')).toHaveLength(1)
  expect(button('连接').disabled).toBe(false)
  expect(container.textContent).toContain('计划时间：08:45')
  expect(invoke).toHaveBeenCalledWith('groupSubmission.getConfiguration', { documentId: job.id })
})

it('debounces edits, sends the configuration revision and shows the acknowledged plan', async () => {
  let resolve!: (result: ConfigurationSaveResult) => void
  save.mockImplementationOnce(() => new Promise(done => { resolve = done }))
  await click(container.querySelector('#submission-auto')!)
  await change('#submission-time', '10:00')
  await change('#submission-time', '10:30')
  expect(container.textContent).toContain('保存中…')
  expect(save).not.toHaveBeenCalled()
  await advance()
  const rules = { ...stored.rules, time: '10:30', automatic: true }
  expect(save).toHaveBeenCalledOnce()
  expect(save).toHaveBeenCalledWith({ documentId: job.id, documentRevision: 7, revision: 0, rules })
  expect(container.textContent).toContain('保存中…')
  const acknowledged = { ...stored, revision: 1, rules, hasBusiness: true, nextRunAt: '2026-11-25T10:30:00' }
  await act(async () => resolve({ configuration: acknowledged }))
  expect(container.textContent).toContain('已保存')
  expect(container.textContent).toContain('10:30')
  expect(container.textContent).not.toContain('下次执行：—')
  expect(invoke.mock.calls.some(([operation]) => operation === 'tencentSheet.save')).toBe(false)
})

it('preserves the draft on a conflict and keeps other window changes after an explicit refresh and retry', async () => {
  stored = { ...stored, revision: 1, rules: { ...stored.rules, retryMinutes: 23 } }
  save.mockResolvedValueOnce({ error: '配置已在其他窗口更新。请刷新后核对你的修改。', conflict: true })
  await click(container.querySelector('#submission-auto')!)
  await change('#submission-time', '09:25')
  await advance()
  expect(container.textContent).toContain('请刷新后核对你的修改')
  expect(container.querySelector<HTMLInputElement>('#submission-time')?.value).toBe('09:25')
  expect(container.textContent).toContain('保存失败')
  await click(button('刷新配置'))
  expect(save).toHaveBeenCalledTimes(1)
  expect(container.querySelector<HTMLInputElement>('#submission-time')?.value).toBe('09:25')
  await click(button('重试保存'))
  await advance()
  expect(save.mock.calls[1][0]).toMatchObject({ revision: 1, rules: { time: '09:25', retryMinutes: 23, automatic: true } })
  expect(container.textContent).toContain('已保存')
  await act(async () => root.unmount()); root = createRoot(container); await mount()
  expect(container.querySelector<HTMLInputElement>('#submission-time')?.value).toBe('09:25')
})

it('displays backend field errors next to controls and keeps the pending edit', async () => {
  save.mockResolvedValueOnce({ error: '请检查标记的字段。', fieldErrors: { 'rules.time': '服务器拒绝此执行时间。' } })
  await click(container.querySelector('#submission-auto')!)
  await change('#submission-time', '10:15')
  await advance()
  expect(container.querySelector('#submission-time-error')?.textContent).toContain('服务器拒绝')
  expect(container.querySelector<HTMLInputElement>('#submission-time')?.value).toBe('10:15')
  expect(container.textContent).toContain('保存失败')
})

it('saves edits made during an in-flight request against the newly acknowledged revision', async () => {
  let finish!: () => void
  save.mockImplementationOnce(({ rules }: { rules: ExecutionRules }) => new Promise(resolve => {
    finish = () => {
      stored = { ...stored, revision: 1, rules }
      resolve({ configuration: structuredClone(stored) })
    }
  }))
  await click(container.querySelector('#submission-auto')!)
  await advance()
  await change('#submission-time', '12:15')
  await advance()
  expect(save).toHaveBeenCalledOnce()
  await act(async () => finish())
  expect(container.querySelector<HTMLInputElement>('#submission-time')?.value).toBe('12:15')
  await advance()
  expect(save.mock.calls[1][0]).toMatchObject({ revision: 1, rules: { time: '12:15', automatic: true } })
  expect(container.textContent).toContain('已保存')
})
