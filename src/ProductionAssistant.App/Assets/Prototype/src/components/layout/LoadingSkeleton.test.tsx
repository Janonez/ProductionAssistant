import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { expect, it, vi } from 'vitest'
import { AutomationPage } from '../../features/daily-report/AutomationPage'
import { ChoicePicker } from '../ui/FormPickers'
import { setRegionLoading } from '../../lib/skeletonRegion'

const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }))
vi.mock('../../bridge/index', () => ({ invoke }));
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

it('keeps fixed task controls without skeletons and shows empty only after local loading', async () => {
  let resolve!: (value: unknown) => void
  invoke.mockImplementation(() => new Promise(done => { resolve = done }))
  const container = document.createElement('div'), root = createRoot(container)
  document.body.append(container)
  try {
    await act(async () => root.render(<AutomationPage />))
    expect(container.querySelector('[aria-busy="true"]')).toBeTruthy()
    expect(container.querySelectorAll('.daily-job-card')).toHaveLength(0)
    expect(container.querySelectorAll('.skeleton-block, [data-slot=skeleton]')).toHaveLength(0)
    expect(container.querySelector('h1')?.textContent).toBe('任务清单')
    expect(container.textContent).not.toContain('还没有自动化任务')
    expect(container.querySelector('button')?.disabled).toBe(true)
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
  setRegionLoading(panel, true)
  expect(panel.querySelectorAll('[data-loading-status]')).toHaveLength(1)
  expect(panel.querySelectorAll('.skeleton-block')).toHaveLength(0)
  expect(field.style.visibility).toBe('')
  setRegionLoading(panel, false)
  expect(panel.querySelector('[data-loading-status]')).toBeNull()
  expect(panel.firstChild).toBe(field)
  expect(field.value).toBe('未保存内容')
  expect(panel.style.minHeight).toBe('')
  expect(panel.hasAttribute('aria-busy')).toBe(false)
})
