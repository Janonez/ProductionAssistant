import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { ReportCenterPage } from './ReportCenterPage'

const invoke = vi.fn()
vi.mock('./bridge', () => ({ invoke: (...args: unknown[]) => invoke(...args) }))
;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
const state = { sourceRoot: 'D:/reports', outputRoot: 'D:/summary', reportUrl: 'https://reports.example.com', username: 'user', credentialsConfigured: true, authenticated: true }
const result = { period: { startDate: '2026-08-21', endDate: '2026-09-20' }, plannedReports: 31, parsedReports: 31, deviceCount: 12, actualDataPoints: 372, expectedDataPoints: 372, summaryPath: 'D:/summary/result.xlsx', warnings: [] }
let container: HTMLDivElement
let root: Root
const button = (text: string) => [...document.querySelectorAll<HTMLButtonElement>('button')].find(item => item.textContent === text)!
const click = async (text: string) => { await act(async () => { button(text).click() }) }

beforeEach(async () => {
  invoke.mockReset().mockImplementation((method: string) => Promise.resolve(method === 'report.getState' ? state : result))
  container = document.createElement('div'); document.body.append(container); root = createRoot(container)
  await act(async () => { root.render(<ReportCenterPage />) })
})
afterEach(() => { act(() => root.unmount()); container.remove() })

it('loads without running, discards settings on cancel, and avoids saving unchanged credentials', async () => {
  expect(invoke.mock.calls.map(call => call[0])).toEqual(['report.getState'])
  await act(async () => { container.querySelector<HTMLButtonElement>('[aria-label="报表设置"]')!.click() })
  await click('取消')
  await act(async () => { container.querySelector<HTMLButtonElement>('[aria-label="报表设置"]')!.click() })
  await act(async () => { document.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })) })
  expect(document.querySelector('[role="dialog"]')).toBeNull()
  expect(invoke.mock.calls.map(call => call[0])).toEqual(['report.getState'])
})

it('locks the selected period while running and clears the old file after changing it', async () => {
  let finish!: (value: typeof result) => void
  invoke.mockImplementation((method: string) => method === 'report.run' ? new Promise(resolve => { finish = resolve }) : Promise.resolve(state))
  await click('开始汇总')
  expect(button('上期').disabled).toBe(true)
  expect(container.querySelector<HTMLButtonElement>('.date-trigger')?.disabled ?? container.querySelector<HTMLButtonElement>('.date-picker button')!.disabled).toBe(true)
  const run = invoke.mock.calls.find(call => call[0] === 'report.run')!
  expect(run[1]).toEqual({ startDate: expect.stringMatching(/^\d{4}-\d{2}-21$/), endDate: expect.stringMatching(/^\d{4}-\d{2}-20$/) })
  await act(async () => { run[3]({ stage: 'collect', current: 5, total: 31, message: '日报导出' }) })
  expect(container.textContent).toContain('5 / 31')
  await act(async () => { finish(result) })
  expect(container.textContent).toContain(result.summaryPath)
  await act(async () => { run[3]({ stage: 'collect', current: 6, total: 31, message: 'late' }) })
  expect(container.querySelector('[role="progressbar"]')).toBeNull()
  await click('上期')
  expect(container.textContent).not.toContain(result.summaryPath)
  expect(invoke.mock.calls.filter(call => call[0] === 'report.run')).toHaveLength(1)
})

it('shows a failed run and retries only when explicitly requested', async () => {
  invoke.mockRejectedValueOnce(new Error('日报缺失'))
  await click('开始汇总')
  expect(container.querySelector('[role="alert"]')?.textContent).toContain('日报缺失')
  expect(container.textContent).toContain('未生成汇总文件')
  expect(button('重新汇总').disabled).toBe(false)
  await click('重新汇总')
  expect(container.textContent).toContain(result.summaryPath)
})
