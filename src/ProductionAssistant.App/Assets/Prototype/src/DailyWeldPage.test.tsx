import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { DailyWeldPage } from './DailyWeldPage'

const invoke = vi.fn()
vi.mock('./bridge', () => ({ invoke: (...args: unknown[]) => invoke(...args) }))

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
let container: HTMLDivElement
let root: Root

const state = {
  configured: true,
  binding: { bound: true, name: '每日焊接量', path: '焊接数据库 / 每日焊接量' },
  sources: [{ id: 'day-source', name: '每日焊接量', path: '焊接数据库 / 每日焊接量' }],
  selected: 'day-source',
}

function generatedRows(month: string, total: number) {
  const [year, monthNumber] = month.split('-').map(Number)
  const days = new Date(year, monthNumber, 0).getDate()
  return Array.from({ length: days }, (_, index) => ({
    date: `${month}-${String(index + 1).padStart(2, '0')}`,
    weekday: '周一', isWeekend: false, qty: index < total ? 1 : 0, note: '',
  }))
}

beforeEach(() => {
  invoke.mockReset()
  invoke.mockImplementation((operation: string, payload?: { month?: string; total?: string }) => {
    if (operation === 'weld.getState') return Promise.resolve(state)
    if (operation === 'weld.generate') return Promise.resolve(generatedRows(payload!.month!, Number(payload!.total)))
    if (operation === 'weld.check') return Promise.resolve({ succeeded: true, message: '检查完成。', hasExistingData: false, items: [] })
    if (operation === 'weld.write') return Promise.resolve({ succeeded: true, message: '已写入 Notion。' })
    return Promise.resolve({})
  })
})

afterEach(() => {
  act(() => root?.unmount())
  document.querySelectorAll('.date-picker-popover').forEach(element => element.remove())
  container?.remove()
})

async function renderPage() {
  container = document.createElement('div')
  container.className = 'production-message-demo'
  document.body.append(container)
  root = createRoot(container)
  await act(async () => { root.render(<DailyWeldPage openSettings={() => undefined} />) })
}

async function enterTotalAndGenerate(value: string) {
  const total = container.querySelector('[aria-label="计划焊接总量"]') as HTMLInputElement
  await act(async () => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(total, value)
    total.dispatchEvent(new Event('input', { bubbles: true }))
  })
  const next = [...container.querySelectorAll('button')].find(button => button.textContent?.includes('拆分预览')) as HTMLButtonElement
  await act(async () => next.click())
}

describe('daily weld workflow', () => {
  it('uses the shared production-message progress component and tonnes', async () => {
    await renderPage()
    expect(container.querySelector('.step-bar')).toBeTruthy()
    expect([...container.querySelectorAll('.step span')].map(item => item.textContent)).toEqual(['录入计划', '拆分预览', '完成'])
    expect(container.textContent).toContain('计划焊接总量（吨）')
    expect(container.textContent).not.toContain('米')
    expect(invoke).toHaveBeenCalledWith('weld.getState')
  })

  it('keeps the single business database binding inside the floating settings panel', async () => {
    await renderPage()
    const settings = [...container.querySelectorAll('button')].find(button => button.textContent === '焊接设置') as HTMLButtonElement
    await act(async () => settings.click())
    const dialog = container.querySelector('.weld-settings-dialog')
    expect(dialog?.getAttribute('aria-modal')).toBe('true')
    expect(dialog?.textContent).toContain('焊接业务')
    expect(dialog?.textContent).toContain('主写入数据库')
    expect(dialog?.textContent).toContain('汇总数据库由系统在写入时自动维护')
    expect(dialog?.querySelectorAll('[aria-label="焊接业务主写入数据库"]')).toHaveLength(1)
  })

  it('asks the host service to generate an editable monthly preview', async () => {
    await renderPage()
    const monthTrigger = container.querySelector('.date-picker-trigger') as HTMLButtonElement
    expect(monthTrigger.getAttribute('aria-labelledby')).toBeTruthy()
    await enterTotalAndGenerate('16')
    const month = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`
    expect(invoke).toHaveBeenCalledWith('weld.generate', { month, total: '16' })
    expect(container.querySelectorAll('tbody tr')).toHaveLength(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate())
    expect(container.textContent).toContain('拆分合计 16 吨')
  })

  it('checks and writes the complete month to Notion', async () => {
    await renderPage()
    await enterTotalAndGenerate('16')
    const writeButton = [...container.querySelectorAll('button')].find(button => button.textContent === '确认并写入 Notion') as HTMLButtonElement
    await act(async () => writeButton.click())
    expect(invoke.mock.calls.map(call => call[0])).toContain('weld.check')
    expect(invoke.mock.calls.map(call => call[0])).toContain('weld.write')
    expect(container.textContent).toContain('入库完成')
    expect(container.textContent).toContain('已写入 Notion。')
  })

  it('requires explicit confirmation before overwriting an existing month', async () => {
    invoke.mockImplementation((operation: string, payload?: { month?: string; total?: string }) => {
      if (operation === 'weld.getState') return Promise.resolve(state)
      if (operation === 'weld.generate') return Promise.resolve(generatedRows(payload!.month!, Number(payload!.total)))
      if (operation === 'weld.check') return Promise.resolve({ succeeded: true, message: '检查完成。', hasExistingData: true, items: [] })
      if (operation === 'weld.write') return Promise.resolve({ succeeded: true, message: '覆盖完成。' })
      return Promise.resolve({})
    })
    await renderPage()
    await enterTotalAndGenerate('16')
    const writeButton = [...container.querySelectorAll('button')].find(button => button.textContent === '确认并写入 Notion') as HTMLButtonElement
    await act(async () => writeButton.click())
    expect(container.textContent).toContain('确认覆盖已有产量')
    expect(invoke.mock.calls.map(call => call[0])).not.toContain('weld.write')
    const confirm = [...container.querySelectorAll('button')].find(button => button.textContent === '确认覆盖并写入') as HTMLButtonElement
    await act(async () => { confirm.click(); confirm.click() })
    const writeCall = invoke.mock.calls.find(call => call[0] === 'weld.write')
    expect(writeCall?.[1].overwriteExisting).toBe(true)
    expect(invoke.mock.calls.filter(call => call[0] === 'weld.write')).toHaveLength(1)
  })

  it('keeps overwrite failures visible inside the active dialog', async () => {
    invoke.mockImplementation((operation: string, payload?: { month?: string; total?: string }) => {
      if (operation === 'weld.getState') return Promise.resolve(state)
      if (operation === 'weld.generate') return Promise.resolve(generatedRows(payload!.month!, Number(payload!.total)))
      if (operation === 'weld.check') return Promise.resolve({ succeeded: true, message: '检查完成。', hasExistingData: true, items: [] })
      if (operation === 'weld.write') return Promise.reject(new Error('测试库写入失败'))
      return Promise.resolve({})
    })
    await renderPage()
    await enterTotalAndGenerate('16')
    const writeButton = [...container.querySelectorAll('button')].find(button => button.textContent === '确认并写入 Notion') as HTMLButtonElement
    await act(async () => writeButton.click())
    const confirm = [...container.querySelectorAll('button')].find(button => button.textContent === '确认覆盖并写入') as HTMLButtonElement
    await act(async () => confirm.click())
    const dialog = container.querySelector('[role="alertdialog"]')
    expect(dialog?.textContent).toContain('测试库写入失败')
    expect(dialog).toBeTruthy()
  })
})
