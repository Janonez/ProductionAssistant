import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { ProductionMeetingPage } from './ProductionMeetingPage'

const invoke = vi.fn()
vi.mock('./bridge', () => ({ invoke: (...args: unknown[]) => invoke(...args) }))
;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
const result = { resultId: 'result-1', outputPath: 'D:/meeting/资料拆分.xlsx', meetingDate: '2026-09-08', sheetNames: ['已发运项目', '在制项目', '预投项目'] }
let container: HTMLDivElement
let root: Root
const button = (text: string) => [...container.querySelectorAll<HTMLButtonElement>('button')].find(item => item.textContent === text)!
async function click(text: string) { await act(async () => { button(text).click() }) }
beforeEach(async () => {
  invoke.mockReset().mockImplementation((method: string) => Promise.resolve(method === 'meeting.pickFile' ? { path: 'D:/meeting/资料.xlsx' } : result))
  container = document.createElement('div'); document.body.append(container); root = createRoot(container)
  await act(async () => { root.render(<ProductionMeetingPage />) })
})
afterEach(() => { act(() => root.unmount()); container.remove() })

it('waits for explicit splitting and locks input until the result returns', async () => {
  expect(invoke).not.toHaveBeenCalled()
  expect(button('开始拆分').disabled).toBe(true)
  await click('选择文件')
  expect(invoke.mock.calls.map(call => call[0])).toEqual(['meeting.pickFile'])
  let finish!: (value: typeof result) => void
  invoke.mockImplementation(() => new Promise(resolve => { finish = resolve }))
  await click('开始拆分')
  expect(container.querySelector<HTMLInputElement>('input')!.disabled).toBe(true)
  expect(invoke).toHaveBeenCalledWith('meeting.export', { path: 'D:/meeting/资料.xlsx' }, 1800000)
  await act(async () => { finish(result) })
  expect([...container.querySelectorAll('li')].map(item => item.textContent)).toEqual(result.sheetNames)
  expect(container.textContent).toContain('2026-09-08')
  invoke.mockResolvedValue({ opened: true })
  await click('打开文件位置')
  expect(invoke).toHaveBeenCalledWith('meeting.openOutput', { resultId: 'result-1' })
})

it('preserves results on picker cancellation and discards them for a different file', async () => {
  await click('选择文件'); await click('开始拆分')
  invoke.mockResolvedValueOnce({ path: null }); await click('选择文件')
  expect(container.textContent).toContain(result.outputPath)
  invoke.mockResolvedValueOnce({ path: 'D:/next.xlsx' }); await click('选择文件')
  expect(container.textContent).not.toContain(result.outputPath)
  expect(invoke.mock.calls.filter(call => call[0] === 'meeting.export')).toHaveLength(1)
})

it('removes a previous result on failed rerun and lets the user explicitly retry', async () => {
  await click('选择文件'); await click('开始拆分')
  invoke.mockRejectedValueOnce(new Error('源文件必须只有一个 Sheet'))
  await click('重新拆分')
  expect(container.querySelector('[role="alert"]')?.textContent).toContain('必须只有一个 Sheet')
  expect(container.textContent).not.toContain(result.outputPath)
  expect(button('开始拆分').disabled).toBe(false)
})
