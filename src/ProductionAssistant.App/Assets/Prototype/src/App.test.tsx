import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { Draft } from './types'

const invoke = vi.fn();
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
vi.mock('./bridge', () => ({ invoke }))
vi.mock('motion/react', () => ({
  AnimatePresence: ({ children }: { children: unknown }) => children,
  motion: {
    div: ({ children, initial: _initial, animate: _animate, exit: _exit, transition: _transition, ...props }: React.HTMLAttributes<HTMLDivElement> & Record<string, unknown>) => <div {...props}>{children}</div>,
    section: ({ children, initial: _initial, animate: _animate, ...props }: React.HTMLAttributes<HTMLElement> & Record<string, unknown>) => <section {...props}>{children}</section>,
    button: 'button'
  },
  useReducedMotion: () => true
}))

const draft: Draft = {
  index: 1, originalText: '8.13下料2吨', parserVersion: 'test', kind: 'MaterialCutting',
  businessDate: '2026-08-13', typeDisplay: '下料日报数据库', fields: { weight: '2吨' },
  previewFields: [{ key: 'weight', label: '重量', value: '2' }], statusText: '可写入', warningText: '', canWrite: true
}

describe('production message workflow', () => {
  let container: HTMLDivElement
  beforeEach(async () => {
    history.replaceState({}, '', '?route=production-message')
    container = document.createElement('div')
    document.body.append(container)
    invoke.mockReset().mockImplementation((operation: string) => {
      if (operation === 'app.getOverview') return Promise.resolve({})
      if (operation === 'production.getBindings') return Promise.resolve({ configured: true, cutting: { bound: false, name: '', path: '' }, towerDaily: { bound: false, name: '', path: '' }, towerMonthly: { bound: false, name: '', path: '' }, towerYearly: { bound: false, name: '', path: '' }, sources: [], selected: {} })
      if (operation === 'production.parse') return Promise.resolve([draft])
      if (operation === 'production.check') return Promise.resolve({ succeeded: true, message: '可以写入', items: [{ index: 1, businessDate: '2026-08-13', status: 'ready', message: '' }], requiredMonths: [] })
      return Promise.resolve({})
    })
    const { App } = await import('./App')
    await act(async () => { createRoot(container).render(<App />) })
  })
  afterEach(() => container.remove())

  it('parses without checking and invalidates a completed check after editing', async () => {
    const textarea = container.querySelector('textarea')!
    await act(async () => { Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value')!.set!.call(textarea, '8.13下料2吨'); textarea.dispatchEvent(new Event('input', { bubbles: true })) })
    const button = (label: string) => [...container.querySelectorAll('button')].find(item => item.textContent?.includes(label)) as HTMLButtonElement
    await act(async () => { button('解析并预览').click() })
    expect(invoke.mock.calls.filter(([operation]) => operation === 'production.parse')).toHaveLength(1)
    expect(invoke.mock.calls.filter(([operation]) => operation === 'production.check')).toHaveLength(0)
    expect(button('确认写入').disabled).toBe(true)

    await act(async () => { button('检查是否存在').click() })
    expect(button('确认写入').disabled).toBe(false)
    const select = container.querySelector('.draft-controls select') as HTMLSelectElement
    await act(async () => { select.value = 'TowerLineDaily'; select.dispatchEvent(new Event('change', { bubbles: true })) })
    expect(button('确认写入').disabled).toBe(true)
    expect(container.textContent).toContain('检查结果已失效')
  })

  it('keeps parse and check feedback beside the button that started the operation', async () => {
    let finishCheck!: (value: unknown) => void
    invoke.mockImplementation((operation: string) => {
      if (operation === 'app.getOverview') return Promise.resolve({})
      if (operation === 'production.getBindings') return Promise.resolve({ configured: true, cutting: { bound: false, name: '', path: '' }, towerDaily: { bound: false, name: '', path: '' }, towerMonthly: { bound: false, name: '', path: '' }, towerYearly: { bound: false, name: '', path: '' }, sources: [], selected: {} })
      if (operation === 'production.parse') return Promise.resolve([draft])
      if (operation === 'production.check') return new Promise(resolve => { finishCheck = resolve })
      return Promise.resolve({})
    })
    const textarea = container.querySelector('textarea')!
    await act(async () => { Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value')!.set!.call(textarea, '8.13下料2吨'); textarea.dispatchEvent(new Event('input', { bubbles: true })) })
    const button = (label: string) => [...container.querySelectorAll('button')].find(item => item.textContent?.includes(label)) as HTMLButtonElement
    await act(async () => { button('解析并预览').click() })
    expect(container.querySelector('.input-surface > .notice')?.textContent).toContain('解析完成')
    await act(async () => { button('检查是否存在').click(); await Promise.resolve() })
    expect(button('正在检查…')).toBeTruthy()
    expect(button('解析并预览').textContent).not.toContain('正在检查')
    await act(async () => { finishCheck({ succeeded: true, message: '可以正常写入', items: [{ index: 1, businessDate: '2026-08-13', status: 'ready', message: '可以正常写入' }], requiredMonths: [] }) })
    expect(container.querySelector('.results > .notice')?.textContent).toContain('检查完成，可以正常写入')
    expect(container.querySelector('.result-text.success')?.textContent).toContain('可以正常写入')
  })
})
