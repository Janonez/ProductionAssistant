import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { expect, it, vi } from 'vitest'
import { AutomationPage } from './AutomationPage'
import { ChoicePicker } from './FormPickers'
import { setRegionLoading } from './skeletonRegion'

const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }))
vi.mock('./bridge', () => ({ invoke }));
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

it('keeps task placeholders until data arrives and shows an empty state only after loading', async () => {
  let resolve!: (value: unknown) => void
  invoke.mockImplementation(() => new Promise(done => { resolve = done }))
  const container = document.createElement('div'), root = createRoot(container)
  document.body.append(container)
  try {
    await act(async () => root.render(<AutomationPage />))
    expect(container.querySelector('[aria-busy="true"]')).toBeTruthy()
    expect(container.querySelectorAll('.daily-job-card')).toHaveLength(3)
    expect(container.textContent).not.toContain('还没有自动化任务')
    expect(container.querySelector('button')).toBeNull()
    await act(async () => resolve({ tasks: [] }))
    expect(container.querySelector('[aria-busy="true"]')).toBeNull()
    expect(container.textContent).toContain('还没有自动化任务')
  } finally { await act(async () => root.unmount()); container.remove() }
})

it('keeps a loading selector disabled and preserves its control when options arrive', async () => {
  const container = document.createElement('div'), root = createRoot(container)
  const change = vi.fn()
  try {
    await act(async () => root.render(<ChoicePicker value="" options={[]} placeholder="选择 View" loading onChange={change} />))
    const button = container.querySelector('button')!
    expect(button.disabled).toBe(true)
    expect(button.getAttribute('aria-busy')).toBe('true')
    await act(async () => root.render(<ChoicePicker value="v" options={[{ value: 'v', label: '当前 View' }]} placeholder="选择 View" onChange={change} />))
    expect(container.querySelector('button')).toBe(button)
    expect(button.textContent).toContain('当前 View')
    expect(button.disabled).toBe(false)
  } finally { await act(async () => root.unmount()) }
})

it('retains iframe content identity and reserved height across loading', () => {
  const panel = document.createElement('div'), field = document.createElement('input')
  field.value = '未保存内容'; panel.append(field)
  setRegionLoading(panel, true)
  expect(panel.getAttribute('aria-busy')).toBe('true')
  setRegionLoading(panel, false)
  expect(panel.firstChild).toBe(field)
  expect(field.value).toBe('未保存内容')
  expect(panel.style.minHeight).toBe('100px')
  expect(panel.hasAttribute('aria-busy')).toBe(false)
})
