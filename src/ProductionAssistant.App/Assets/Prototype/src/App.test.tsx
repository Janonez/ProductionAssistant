import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { Draft } from './types'

const invoke = vi.fn();
const notifyReady = vi.fn();
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
vi.mock('./bridge', () => ({ invoke, notifyReady }))
vi.mock('motion/react', () => ({
  AnimatePresence: ({ children }: { children: unknown }) => children,
  motion: {
    div: ({ children, initial: _initial, animate: _animate, exit: _exit, transition: _transition, ...props }: React.HTMLAttributes<HTMLDivElement> & Record<string, unknown>) => <div {...props}>{children}</div>,
    section: ({ children, initial: _initial, animate: _animate, ...props }: React.HTMLAttributes<HTMLElement> & Record<string, unknown>) => <section {...props}>{children}</section>,
    button: 'button'
  },
  useReducedMotion: () => false
}))

const draft: Draft = {
  index: 1, originalText: '8.13下料2吨', parserVersion: 'test', kind: 'MaterialCutting',
  businessDate: '2026-08-13', typeDisplay: '下料日报数据库', fields: { weight: '2吨' },
  previewFields: [
    { key: 'weight', label: '重量', value: '2' },
    { key: 'raw_message', label: '原始消息', value: '8.13下料2吨' },
    { key: 'unit', label: '单位', value: '' },
  ], statusText: '待检查', warningText: '', canWrite: true
}
const readyFields = [{ key: 'weight', name: '重量', propertyType: 'number', parsedValue: '2吨', databaseValue: '', status: 'new', message: '' }]
const settingsState = {
  notion: { configured: true, rootPageId: 'root', dataSourceCount: 2, lastSyncedAt: '2026-08-28 14:10', sources: [] },
  notification: { enabled: true, channelName: '生产管理群', webhookConfigured: true, secretConfigured: true, connected: true, status: '连接正常', checkedAt: '2026-08-28 14:00', rules: [] },
  version: '1.5.3',
}

const openTaskTab = async (container: HTMLElement, label: string) => {
  const tab = [...container.querySelectorAll<HTMLButtonElement>('[role="tab"]')]
    .find(item => item.textContent === label)!
  await act(async () => { tab.click(); await Promise.resolve() })
}

describe('connected production message workflow', () => {
  let container: HTMLDivElement
  beforeEach(async () => {
    history.replaceState({}, '', '?route=production-message')
    container = document.createElement('div')
    document.body.append(container)
    invoke.mockReset().mockImplementation((operation: string) => {
      if (operation === 'app.getOverview') return Promise.resolve({})
      if (operation === 'production.getBindings') return Promise.resolve({ configured: true, cutting: { bound: false, name: '', path: '' }, towerDaily: { bound: false, name: '', path: '' }, towerMonthly: { bound: false, name: '', path: '' }, towerYearly: { bound: false, name: '', path: '' }, sources: [], selected: { towerDaily: 'daily', towerMonthly: 'monthly', towerYearly: 'yearly' } })
      if (operation === 'production.parse') return Promise.resolve([draft])
      if (operation === 'production.check') return Promise.resolve({ succeeded: true, message: '可以写入', items: [{ index: 1, businessDate: '2026-08-13', status: 'ready', message: '', fields: readyFields }], requiredMonths: [] })
      return Promise.resolve({})
    })
    const { App } = await import('./App')
    await act(async () => { createRoot(container).render(<App />) })
  })
  afterEach(() => { vi.useRealTimers(); container.remove() })

  it('keeps field edits local and only rechecks after the target date changes', async () => {
    expect(container.querySelector('.content-header h1')?.textContent).toBe('生产消息入库')
    expect(container.querySelectorAll('.desktop-shell > .desktop-shell-navigation .sidebar')).toHaveLength(1)
    expect(container.querySelector('[aria-current="page"]')?.textContent).toContain('生产消息 Notion 入库')
    expect(container.querySelector('.workspace-panel')).toBeTruthy()
    const textarea = container.querySelector('textarea')!
    await act(async () => { Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value')!.set!.call(textarea, '8.13下料2吨'); textarea.dispatchEvent(new Event('input', { bubbles: true })) })
    const button = (label: string) => [...container.querySelectorAll('button')].find(item => item.textContent?.includes(label)) as HTMLButtonElement
    await act(async () => { button('解析消息').click(); await Promise.resolve() })
    expect(invoke.mock.calls.filter(([operation]) => operation === 'production.parse')).toHaveLength(1)
    expect(invoke.mock.calls.filter(([operation]) => operation === 'production.check')).toHaveLength(1)
    expect(container.querySelector('.field-table')?.textContent).toContain('重量')
    expect(container.querySelector('.field-table')?.textContent).not.toContain('原始消息')
    expect(container.querySelector('.field-table')?.textContent).not.toContain('单位')
    expect((container.querySelector('.identity-section .field-input') as HTMLInputElement).value).toBe('下料日报数据库')
    expect((button('确认入库') as HTMLButtonElement).disabled).toBe(false)
    expect(button('检查已有数据')).toBeUndefined()
    const fieldInput = container.querySelector('.field-editor input') as HTMLInputElement
    await act(async () => { fieldInput.dispatchEvent(new FocusEvent('focusin', { bubbles: true })); fieldInput.dispatchEvent(new FocusEvent('focusout', { bubbles: true })); await Promise.resolve() })
    expect(invoke.mock.calls.filter(([operation]) => operation === 'production.check')).toHaveLength(1)
    await act(async () => {
      fieldInput.dispatchEvent(new FocusEvent('focusin', { bubbles: true }))
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(fieldInput, '3')
      fieldInput.dispatchEvent(new Event('input', { bubbles: true }))
      fieldInput.dispatchEvent(new FocusEvent('focusout', { bubbles: true }))
      await Promise.resolve()
    })
    expect(invoke.mock.calls.filter(([operation]) => operation === 'production.check')).toHaveLength(1)
    expect(container.querySelector('.pill-new')?.textContent).toBe('新增')
    await act(async () => { (container.querySelector('.identity-section .date-picker-trigger') as HTMLButtonElement).click() })
    const nextDate = [...document.querySelectorAll('.date-picker-grid button')].find(item => item.textContent === '14') as HTMLButtonElement
    await act(async () => { nextDate.click() })
    await act(async () => { await Promise.resolve() })
    expect(invoke.mock.calls.filter(([operation]) => operation === 'production.check')).toHaveLength(2)
    expect((button('确认入库') as HTMLButtonElement).disabled).toBe(false)
  })

  it('groups a batch by each draft date and edits only the selected date', async () => {
    const secondDraft: Draft = {
      ...draft,
      index: 2,
      originalText: '8.14下料3吨',
      businessDate: '2026-08-14',
      fields: { weight: '3吨' },
      previewFields: [{ key: 'weight', label: '重量', value: '3吨' }],
    }
    invoke.mockImplementation((operation: string) => {
      if (operation === 'production.getBindings') return Promise.resolve({ configured: true, sources: [], selected: {} })
      if (operation === 'production.parse') return Promise.resolve([draft, secondDraft])
      if (operation === 'production.check') return Promise.resolve({
        succeeded: true,
        message: '可以写入',
        requiredMonths: [],
        items: [
          { index: 1, businessDate: '2026-08-13', status: 'ready', message: '', fields: readyFields },
          { index: 2, businessDate: '2026-08-14', status: 'ready', message: '', fields: [{ ...readyFields[0], parsedValue: '3吨' }] },
        ],
      })
      return Promise.resolve({})
    })
    const textarea = container.querySelector('textarea')!
    await act(async () => { Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value')!.set!.call(textarea, '两天消息'); textarea.dispatchEvent(new Event('input', { bubbles: true })) })
    const parse = [...container.querySelectorAll('button')].find(item => item.textContent?.includes('解析消息')) as HTMLButtonElement
    await act(async () => { parse.click(); await Promise.resolve() })

    const groups = [...container.querySelectorAll<HTMLElement>('.date-group')]
    expect(groups).toHaveLength(2)
    expect(groups.map(group => group.dataset.businessDate)).toEqual(['2026-08-13', '2026-08-14'])
    expect(groups.map(group => group.querySelector('.date-picker-trigger')?.textContent)).toEqual(['2026/08/13', '2026/08/14'])
    expect(groups.map(group => group.querySelector('.field-editor input')?.getAttribute('value'))).toEqual(['2', '3'])
    expect(groups.every(group => group.querySelector('.field-name')?.textContent === '重量')).toBe(true)

    await act(async () => { (groups[1].querySelector('.date-picker-trigger') as HTMLButtonElement).click() })
    const nextDate = [...document.querySelectorAll('.date-picker-grid button')].find(item => item.textContent === '15') as HTMLButtonElement
    await act(async () => { nextDate.click(); await Promise.resolve() })
    const checkCalls = invoke.mock.calls.filter(([operation]) => operation === 'production.check')
    expect(checkCalls.at(-1)?.[1].drafts.map((item: Draft) => item.businessDate)).toEqual(['2026-08-13', '2026-08-15'])
  })

  it('keeps Notion field rows stable and resolves an edited missing field locally', async () => {
    const towerDraft: Draft = {
      ...draft,
      kind: 'TowerLineDaily',
      typeDisplay: '塔筒产线日报库',
      fields: { sheet_in_stock: '0吨', profile_in_stock: '0吨', cutting: '0吨', welding: '36.4吨', daily_output: '1套' },
      previewFields: [
        { key: 'sheet_in_stock', label: '板材（吨）', value: '0吨' },
        { key: 'profile_in_stock', label: '型材（吨）', value: '0吨' },
        { key: 'cutting', label: '下料（吨）', value: '0吨' },
        { key: 'welding', label: '焊接（吨）', value: '36.4吨' },
        { key: 'daily_output', label: '产出（套）', value: '1套' },
        { key: 'output_sections', label: '产出（节）', value: '' },
      ],
    }
    const initialFields = [
      { key: 'sheet_in_stock', name: '板材（吨）', propertyType: 'number', parsedValue: '0吨', databaseValue: '', status: 'new', message: '' },
      { key: 'profile_in_stock', name: '型材（吨）', propertyType: 'number', parsedValue: '0吨', databaseValue: '', status: 'new', message: '' },
      { key: 'cutting', name: '下料（吨）', propertyType: 'number', parsedValue: '0吨', databaseValue: '', status: 'new', message: '' },
      { key: 'welding', name: '焊接（吨）', propertyType: 'number', parsedValue: '36.4吨', databaseValue: '', status: 'new', message: '' },
      { key: 'daily_output', name: '产出（套）', propertyType: 'number', parsedValue: '1套', databaseValue: '', status: 'new', message: '' },
      { key: 'output_sections', name: '产出（节）', propertyType: 'number', parsedValue: '', databaseValue: '8', status: 'exception', message: '消息中未解析到产出（节）的值' },
    ]
    let finishCheck!: (value: unknown) => void
    invoke.mockImplementation((operation: string) => {
      if (operation === 'production.getBindings') return Promise.resolve({ configured: true, sources: [], selected: {} })
      if (operation === 'production.parse') return Promise.resolve([towerDraft])
      if (operation === 'production.check') return new Promise(resolve => { finishCheck = resolve })
      return Promise.resolve({})
    })
    const textarea = container.querySelector('textarea')!
    await act(async () => { Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value')!.set!.call(textarea, '塔筒日报缺少节数'); textarea.dispatchEvent(new Event('input', { bubbles: true })) })
    const parse = [...container.querySelectorAll('button')].find(item => item.textContent?.includes('解析消息')) as HTMLButtonElement
    await act(async () => { parse.click(); await Promise.resolve() })
    const sectionRow = [...container.querySelectorAll('.field-row')].find(row => row.querySelector('.field-name')?.textContent === '产出（节）') as HTMLDivElement
    const sectionInput = sectionRow.querySelector('input') as HTMLInputElement
    expect(container.querySelectorAll('.field-row')).toHaveLength(6)
    expect(sectionRow.querySelector('.input-unit-wrap span')?.textContent).toBe('节')
    expect(sectionRow.querySelector('.database-value')?.textContent).toBe('—')
    await act(async () => { finishCheck({ succeeded: false, message: '存在异常', items: [{ index: 1, businessDate: '2026-08-13', status: 'error', message: '', fields: initialFields }], requiredMonths: [] }) })
    expect(sectionRow.querySelector('.database-value')?.textContent).toBe('8')
    await act(async () => { Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(sectionInput, '12'); sectionInput.dispatchEvent(new Event('input', { bubbles: true })) })
    await act(async () => { sectionInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })); await Promise.resolve() })
    expect(container.querySelectorAll('.field-row')).toHaveLength(6)
    expect(container.textContent).not.toContain('待检查')
    expect(invoke.mock.calls.filter(([operation]) => operation === 'production.check')).toHaveLength(1)
    expect(container.querySelectorAll('.field-row')).toHaveLength(6)
    expect(sectionRow.querySelector('.pill-confirm')?.textContent).toBe('待确认')
    expect(container.querySelector('.conflict-panel')?.textContent).toContain('原值8')
    expect(container.querySelector('.conflict-panel')?.textContent).toContain('新值12节')
  })

  it('renders live Notion field names, editable values, units, and four field states', async () => {
    invoke.mockImplementation((operation: string) => {
      if (operation === 'production.getBindings') return Promise.resolve({ configured: true, sources: [], selected: {} })
      if (operation === 'production.parse') return Promise.resolve([draft])
      if (operation === 'production.check') return Promise.resolve({
        succeeded: false,
        message: '存在待确认或异常字段',
        requiredMonths: [],
        items: [{ index: 1, businessDate: '2026-08-13', status: 'existing', message: '', fields: [
          { key: 'weight', name: '日模拟产量/吨', propertyType: 'number', parsedValue: '2吨', databaseValue: '', status: 'new', message: '' },
          { key: 'same', name: '班次', propertyType: 'select', parsedValue: '白班', databaseValue: '白班', status: 'same', message: '' },
          { key: 'confirm', name: '项目', propertyType: 'rich_text', parsedValue: 'A', databaseValue: 'B', status: 'confirm', message: '与数据库现值不同' },
          { key: 'bad', name: '异常字段', propertyType: 'number', parsedValue: 'abc', databaseValue: '', status: 'exception', message: '数值格式无效' },
        ] }],
      })
      return Promise.resolve({})
    })
    const textarea = container.querySelector('textarea')!
    await act(async () => { Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value')!.set!.call(textarea, '8.13下料2吨'); textarea.dispatchEvent(new Event('input', { bubbles: true })) })
    const parse = [...container.querySelectorAll('button')].find(item => item.textContent?.includes('解析消息')) as HTMLButtonElement
    await act(async () => { parse.click(); await Promise.resolve() })
    expect(container.querySelectorAll('.match-status')).toHaveLength(1)
    expect(container.querySelector('.review-pane > .pm-notice')).toBeNull()
    expect(container.querySelector('.field-name')?.textContent).toBe('日模拟产量/吨')
    const value = container.querySelector('.field-editor input') as HTMLInputElement
    expect(value.value).toBe('2')
    expect(container.querySelector('.input-unit-wrap span')?.textContent).toBe('吨')
    expect(container.querySelector('.pill-new')?.textContent).toBe('新增')
    expect(container.querySelector('.pill-same')?.textContent).toBe('一致')
    expect(container.querySelector('.pill-confirm')?.textContent).toBe('待确认')
    expect(container.querySelector('.pill-exception')?.textContent).toBe('异常')
    await act(async () => { Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(value, '3'); value.dispatchEvent(new Event('input', { bubbles: true })) })
    expect(value.value).toBe('3')
  })

  it('derives the top status from the field pills instead of a conflicting record status', async () => {
    invoke.mockImplementation((operation: string) => {
      if (operation === 'production.getBindings') return Promise.resolve({ configured: true, sources: [], selected: {} })
      if (operation === 'production.parse') return Promise.resolve([draft])
      if (operation === 'production.check') return Promise.resolve({
        succeeded: true,
        message: '可以写入',
        requiredMonths: [],
        items: [{ index: 1, businessDate: '2026-08-13', status: 'ready', message: '', fields: [
          { key: 'piece_count', name: '张数', propertyType: 'number', parsedValue: '2张', databaseValue: '2', status: 'same', message: '' },
          { key: 'weight', name: '日模拟产量/吨', propertyType: 'number', parsedValue: '18吨', databaseValue: '18', status: 'same', message: '' },
        ] }],
      })
      return Promise.resolve({})
    })
    const textarea = container.querySelector('textarea')!
    await act(async () => { Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value')!.set!.call(textarea, '8.13下料2张18吨'); textarea.dispatchEvent(new Event('input', { bubbles: true })) })
    const parse = [...container.querySelectorAll('button')].find(item => item.textContent?.includes('解析消息')) as HTMLButtonElement
    await act(async () => { parse.click(); await Promise.resolve() })
    const matchStatus = container.querySelector('.match-status')
    expect(matchStatus?.textContent).toContain('已找到对应记录，数据一致')
    expect(matchStatus?.textContent).not.toContain('将新建')
    expect(matchStatus?.classList.contains('match-status-neutral')).toBe(true)
    expect(matchStatus?.classList.contains('match-status-error')).toBe(false)
    expect(matchStatus?.querySelector('.match-check')).toBeTruthy()
    expect(container.querySelector('.review-summary')?.textContent).toContain('新增0')
    expect(container.querySelector('.review-summary')?.textContent).toContain('一致2')
  })

  it('keeps parse and check feedback inside their workflow steps', async () => {
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
    await act(async () => { button('解析消息').click(); await Promise.resolve() })
    expect(container.textContent).toContain('解析结果')
    expect(container.querySelector('.match-status')?.textContent).toContain('正在检查 Notion 数据')
    expect(container.querySelector('.step-done .step-circle svg')).toBeTruthy()
    expect(container.querySelector('.step-done')?.firstElementChild?.nextElementSibling?.textContent).toBe('录入消息')
    expect(button('重新解析').disabled).toBe(true)
    expect((container.querySelector('.message-textarea') as HTMLTextAreaElement).disabled).toBe(true)
    expect((container.querySelector('.identity-section .date-picker-trigger') as HTMLButtonElement).disabled).toBe(true)
    await act(async () => { finishCheck({ succeeded: true, message: '可以正常写入', items: [{ index: 1, businessDate: '2026-08-13', status: 'ready', message: '可以正常写入', fields: readyFields }], requiredMonths: [] }) })
    expect(container.querySelector('.review-pane .pm-notice')).toBeNull()
    expect(container.querySelector('.match-status')?.textContent).toContain('未找到对应记录，将新建')
    expect(container.querySelector('.match-status')?.classList.contains('match-status-neutral')).toBe(false)
    expect(container.querySelector('.match-status .match-check')).toBeTruthy()
  })

  it('requires an explicit overwrite choice before writing an existing record', async () => {
    invoke.mockImplementation((operation: string) => {
      if (operation === 'app.getOverview') return Promise.resolve({})
      if (operation === 'production.getBindings') return Promise.resolve({ configured: true, cutting: { bound: false, name: '', path: '' }, towerDaily: { bound: false, name: '', path: '' }, towerMonthly: { bound: false, name: '', path: '' }, towerYearly: { bound: false, name: '', path: '' }, sources: [], selected: {} })
      if (operation === 'production.parse') return Promise.resolve([draft])
      if (operation === 'production.check') return Promise.resolve({ succeeded: true, message: '已找到已有记录', items: [{ index: 1, businessDate: '2026-08-13', status: 'existing', message: '已有记录', fields: [{ key: 'weight', name: '重量', propertyType: 'number', parsedValue: '2吨', databaseValue: '1', status: 'confirm', message: '与数据库现值不同' }] }], requiredMonths: [] })
      if (operation === 'production.write') return Promise.resolve({ succeeded: true, message: '写入完成', items: [{ index: 1, businessDate: '2026-08-13', status: 'updated', message: '已更新' }], requiredMonths: [] })
      return Promise.resolve({})
    })
    const textarea = container.querySelector('textarea')!
    await act(async () => { Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value')!.set!.call(textarea, '8.13下料2吨'); textarea.dispatchEvent(new Event('input', { bubbles: true })) })
    const button = (label: string) => [...container.querySelectorAll('button')].find(item => item.textContent?.includes(label)) as HTMLButtonElement
    await act(async () => { button('解析消息').click(); await Promise.resolve() })
    expect(button('确认入库').disabled).toBe(true)
    expect(container.querySelector('.conflict-panel')?.textContent).toContain('原值1')
    expect(container.querySelector('.conflict-panel')?.textContent).toContain('新值2吨')
    expect(container.querySelector('.field-table .conflict-panel')).toBeNull()
    expect(container.querySelector('.conflict-section .conflict-panel')).toBeTruthy()
    const overwrite = [...container.querySelectorAll<HTMLInputElement>('.conflict-options input')][1]
    await act(async () => { overwrite.click() })
    expect(button('确认入库').disabled).toBe(false)
    await act(async () => { button('确认入库').click(); await Promise.resolve() })
    expect(invoke).toHaveBeenCalledWith('production.write', expect.objectContaining({ overwriteExisting: false, fieldChoices: { '1:weight': 'use' } }), 120000)
    expect(container.textContent).toContain('入库完成')
    expect(container.querySelectorAll('.step-done .step-circle svg')).toHaveLength(2)
    expect(container.querySelector('.complete-icon svg')).toBeTruthy()
  })

  it('allows a server check to validate a draft after a missing batch date is filled', async () => {
    const missingDate = { ...draft, businessDate: '', canWrite: false, statusText: '待补日期', warningText: '批量消息中的每一段都需要业务日期。' }
    invoke.mockImplementation((operation: string) => {
      if (operation === 'app.getOverview') return Promise.resolve({})
      if (operation === 'production.getBindings') return Promise.resolve({ configured: true, cutting: { bound: false, name: '', path: '' }, towerDaily: { bound: false, name: '', path: '' }, towerMonthly: { bound: false, name: '', path: '' }, towerYearly: { bound: false, name: '', path: '' }, sources: [], selected: {} })
      if (operation === 'production.parse') return Promise.resolve([missingDate])
      if (operation === 'production.check') return Promise.resolve({ succeeded: true, message: '可以写入', items: [{ index: 1, businessDate: '2026-08-14', status: 'ready', message: '', fields: readyFields }], requiredMonths: [] })
      return Promise.resolve({})
    })
    const textarea = container.querySelector('textarea')!
    await act(async () => { Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value')!.set!.call(textarea, '无日期批量消息'); textarea.dispatchEvent(new Event('input', { bubbles: true })) })
    const button = (label: string) => [...container.querySelectorAll('button')].find(item => item.textContent?.includes(label)) as HTMLButtonElement
    await act(async () => { button('解析消息').click(); await Promise.resolve() })
    await act(async () => { (container.querySelector('.identity-section .date-picker-trigger') as HTMLButtonElement).click() })
    const day = [...document.querySelectorAll('.date-picker-grid button')].find(item => item.textContent === '14') as HTMLButtonElement
    await act(async () => { day.click() })
    await act(async () => { await Promise.resolve() })
    expect(button('确认入库').disabled).toBe(false)
  })

  it('uses the local calendar day for the default date', async () => {
    const getFullYear = vi.spyOn(Date.prototype, 'getFullYear').mockReturnValue(2026)
    const getMonth = vi.spyOn(Date.prototype, 'getMonth').mockReturnValue(7)
    const getDate = vi.spyOn(Date.prototype, 'getDate').mockReturnValue(24)
    const extra = document.createElement('div')
    document.body.append(extra)
    const { default: ProductionMessagePage } = await import('./ProductionMessagePage')
    const root = createRoot(extra)
    await act(async () => { root.render(<ProductionMessagePage />) })
    const textarea = extra.querySelector('textarea')!
    await act(async () => { Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value')!.set!.call(textarea, '8.24下料2吨'); textarea.dispatchEvent(new Event('input', { bubbles: true })) })
    const parseButton = [...extra.querySelectorAll('button')].find(item => item.textContent?.includes('解析消息')) as HTMLButtonElement
    await act(async () => { parseButton.click(); await Promise.resolve() })
    expect(invoke).toHaveBeenCalledWith('production.parse', expect.objectContaining({ defaultDate: '2026-08-24' }))
    await act(async () => root.unmount())
    extra.remove()
    getFullYear.mockRestore()
    getMonth.mockRestore()
    getDate.mockRestore()
  })

  it('renders the Debug navigation taxonomy in the Demo sidebar and routes through the host', async () => {
    await act(async () => {
      history.replaceState({}, '', '?route=navigation:production-message&navigation=sidebar')
      window.dispatchEvent(new PopStateEvent('popstate'))
    })
    expect(container.textContent).toContain('文件处理')
    expect(container.textContent).toContain('挂网计划 PDF 导出')
    expect(container.textContent).toContain('生产会资料拆分')
    expect(container.textContent).toContain('数据同步')
    expect(container.textContent).toContain('每日焊接数据模拟')
    expect(container.textContent).toContain('生产消息 Notion 入库')
    expect(container.textContent).toContain('自动化任务')
    expect(container.textContent).toContain('报表中心')
    expect(container.textContent).toContain('日报推送')
    expect(container.querySelectorAll('.desktop-shell')).toHaveLength(1)
    expect(container.querySelectorAll('.desktop-shell > .desktop-shell-navigation .sidebar')).toHaveLength(1)
    expect(container.querySelector('[aria-current="page"]')?.textContent).toContain('生产消息 Notion 入库')
    const dailyReport = [...container.querySelectorAll('button')].find(item => item.textContent?.includes('日报推送')) as HTMLButtonElement
    await act(async () => { dailyReport.click(); await Promise.resolve() })
    expect(invoke).toHaveBeenCalledWith('app.navigateNative', { tag: 'daily-report' })
  })
})

describe('production message Demo UI', () => {
  it('renders the approved UI without sample input and reads the Notion binding', async () => {
    history.replaceState({}, '', '?route=production-message')
    const container = document.createElement('div')
    document.body.append(container)
    invoke.mockReset().mockImplementation((operation: string) => operation === 'production.getBindings'
      ? Promise.resolve({ configured: true, cutting: { bound: false, name: '', path: '' }, towerDaily: { bound: false, name: '', path: '' }, usesBusinessSections: true, businessSections: ['下料数据库', '塔筒产线数据库'], sources: [{ id: 'cutting', name: '下料数据库', path: '数据库/下料数据库/下料数据库', businessSection: '下料数据库' }, { id: 'tower', name: '塔筒产线数据库', path: '数据库/塔筒产线数据库/塔筒产线数据库', businessSection: '塔筒产线数据库' }], selected: {} })
      : Promise.resolve({}))
    const { App } = await import('./App')
    const root = createRoot(container)

    await act(async () => { root.render(<App />) })

    expect(container.querySelectorAll('.desktop-shell > .desktop-shell-navigation .sidebar')).toHaveLength(1)
    expect(container.querySelector('.production-message-content')).toBeTruthy()
    expect(container.querySelector('.content-header h1')?.textContent).toBe('生产消息入库')
    expect(container.querySelector('.content-header + .production-message-scroll')).toBeTruthy()
    const templateConfig = container.querySelector('.template-config-button') as HTMLButtonElement
    expect(templateConfig.textContent).toBe('数据库绑定')
    expect(templateConfig.disabled).toBe(false)
    expect((container.querySelector('.message-textarea') as HTMLTextAreaElement).value).toBe('')
    expect(invoke).toHaveBeenCalledWith('production.getBindings')

    await act(async () => { templateConfig.click() })
    const selects = container.querySelectorAll<HTMLSelectElement>('.pm-binding-dialog select')
    await act(async () => {
      selects[0].value = '下料数据库'; selects[0].dispatchEvent(new Event('change', { bubbles: true }))
      selects[2].value = '塔筒产线数据库'; selects[2].dispatchEvent(new Event('change', { bubbles: true }))
    })
    const databaseSelects = container.querySelectorAll<HTMLSelectElement>('.pm-binding-dialog select')
    await act(async () => {
      databaseSelects[1].value = 'cutting'; databaseSelects[1].dispatchEvent(new Event('change', { bubbles: true }))
      databaseSelects[3].value = 'tower'; databaseSelects[3].dispatchEvent(new Event('change', { bubbles: true }))
    })
    const save = [...container.querySelectorAll<HTMLButtonElement>('button')].find(button => button.textContent === '保存绑定')!
    await act(async () => { save.click(); await Promise.resolve() })
    expect(invoke).toHaveBeenCalledWith('production.saveBindings', { cutting: 'cutting', towerDaily: 'tower' }, 120000)

    await act(async () => { root.unmount() })
    container.remove()
  })

  it('uses direct database selectors for a flat local provider', async () => {
    history.replaceState({}, '', '?route=production-message')
    const container = document.createElement('div')
    document.body.append(container)
    invoke.mockReset().mockImplementation((operation: string) => operation === 'production.getBindings'
      ? Promise.resolve({ configured: true, cutting: { bound: false, name: '', path: '' }, towerDaily: { bound: false, name: '', path: '' }, usesBusinessSections: false, businessSections: [], sources: [{ id: 'local', name: '本地生产表', path: '本地生产表', businessSection: '' }], selected: {} })
      : Promise.resolve({}))
    const { App } = await import('./App')
    const root = createRoot(container)
    await act(async () => { root.render(<App />) })
    await act(async () => { (container.querySelector('.template-config-button') as HTMLButtonElement).click() })

    expect(container.querySelectorAll('.pm-binding-dialog select')).toHaveLength(2)
    expect(container.textContent).not.toContain('下料业务板块')
    expect(container.textContent).toContain('本地生产表')

    await act(async () => root.unmount())
    container.remove()
  })
})

describe('shared operation sidebar', () => {
  it('renders daily weld as a React route with the shared sidebar selected', async () => {
    history.replaceState({}, '', '?route=daily-weld&navigation=weld')
    const container = document.createElement('div')
    document.body.append(container)
    invoke.mockReset().mockResolvedValue({})
    notifyReady.mockReset()
    const { App } = await import('./App')
    const root = createRoot(container)

    await act(async () => { root.render(<App />) })

    expect(container.querySelector('.production-message-content h1')?.textContent).toBe('月度焊接计划拆分')
    expect(container.querySelector('[aria-current="page"]')?.textContent).toContain('每日焊接数据模拟')
    expect(container.querySelector('.native-content-slot')).toBeNull()
    expect(notifyReady).toHaveBeenLastCalledWith('daily-weld', 'weld')

    await act(async () => { root.unmount() })
    container.remove()
  })

  it('shows only the module taxonomy, has no homepage, and routes through the host', async () => {
    history.replaceState({}, '', '?route=navigation:production-message&navigation=sidebar')
    const container = document.createElement('div')
    document.body.append(container)
    invoke.mockReset().mockResolvedValue({})
    const { App } = await import('./App')
    const root = createRoot(container)

    await act(async () => { root.render(<App />) })

    expect(container.textContent).toContain('文件处理')
    expect(container.textContent).toContain('挂网计划 PDF 导出')
    expect(container.textContent).toContain('生产会资料拆分')
    expect(container.textContent).toContain('数据同步')
    expect(container.textContent).toContain('每日焊接数据模拟')
    expect(container.textContent).toContain('生产消息 Notion 入库')
    expect(container.textContent).toContain('自动化任务')
    expect(container.textContent).toContain('报表中心')
    expect(container.textContent).toContain('日报推送')
    expect(container.textContent).not.toContain('首页')
    expect(container.textContent).not.toContain('概览')
    expect(container.querySelectorAll('.desktop-shell')).toHaveLength(1)
    expect(container.querySelectorAll('.desktop-shell > .desktop-shell-navigation .sidebar')).toHaveLength(1)
    expect(container.querySelector('[aria-current="page"]')?.textContent).toContain('生产消息 Notion 入库')

    const dailyReport = [...container.querySelectorAll('button')]
      .find(button => button.textContent?.includes('日报推送')) as HTMLButtonElement
    await act(async () => { dailyReport.click(); await Promise.resolve() })
    expect(invoke).toHaveBeenCalledWith('app.navigateNative', { tag: 'daily-report' })

    await act(async () => { root.unmount() })
    container.remove()
  })

  it('opens settings over the current route and closes without native navigation', async () => {
    history.replaceState({}, '', '?route=navigation:production-message&navigation=settings-modal')
    const container = document.createElement('div')
    document.body.append(container)
    let finishRefresh!: (value: unknown) => void
    invoke.mockReset().mockImplementation((operation: string) => {
      if (operation === 'settings.open') return Promise.resolve(settingsState)
      if (operation === 'settings.refreshDataSources') return new Promise(resolve => { finishRefresh = resolve })
      return Promise.resolve({})
    })
    const { App } = await import('./App')
    const root = createRoot(container)
    await act(async () => { root.render(<App />) })

    const settings = [...container.querySelectorAll('button')]
      .find(button => button.textContent?.trim() === '设置') as HTMLButtonElement
    await act(async () => { settings.click(); await Promise.resolve() })

    expect(container.querySelector('[role="dialog"]')).toBeTruthy()
    expect(container.querySelector('.settings-page-header h1')?.textContent).toBe('连接')
    expect((container.querySelector('.settings-input[type="password"]') as HTMLInputElement).value).not.toBe('')
    expect(container.querySelector('[aria-current="page"]')?.textContent).toContain('生产消息 Notion 入库')
    expect(invoke).toHaveBeenCalledWith('settings.open')
    expect(invoke).not.toHaveBeenCalledWith('app.navigateNative', { tag: 'settings' })

    const tab = (label: string) => [...container.querySelectorAll('.settings-nav-item')]
      .find(button => button.textContent?.trim() === label) as HTMLButtonElement
    await act(async () => { tab('通知').click() })
    expect([...container.querySelectorAll<HTMLInputElement>('.settings-input[type="password"]')].map(input => input.value))
      .toEqual(expect.arrayContaining([expect.not.stringMatching(/^$/), expect.not.stringMatching(/^$/)]))

    await act(async () => { tab('数据与缓存').click() })
    expect(container.textContent).not.toContain('模块绑定')
    vi.useFakeTimers()
    const refresh = [...container.querySelectorAll('button')]
      .find(button => button.textContent?.trim() === '刷新') as HTMLButtonElement
    await act(async () => { refresh.click() })
    expect(container.querySelector('.settings-spinner')).toBeTruthy()
    await act(async () => { finishRefresh({ state: settingsState, message: '数据源已刷新。' }); await Promise.resolve() })
    expect(container.querySelector('.settings-message')?.textContent).toBe('数据源已刷新。')
    await act(async () => { vi.advanceTimersByTime(3000) })
    expect(container.querySelector('.settings-message')).toBeNull()
    vi.useRealTimers()

    const close = container.querySelector('[aria-label="关闭设置"]') as HTMLButtonElement
    await act(async () => { close.click(); await Promise.resolve() })
    expect(container.querySelector('[role="dialog"]')).toBeNull()
    expect(invoke).toHaveBeenCalledWith('settings.close')

    await act(async () => { root.unmount() })
    container.remove()
  })
})

describe('host lifecycle', () => {
  it('reports each host navigation after React renders the requested route', async () => {
    history.replaceState({}, '', '?route=navigation:plan-pdf&navigation=first')
    const container = document.createElement('div')
    document.body.append(container)
    invoke.mockReset().mockImplementation((operation: string) =>
      operation === 'automation.list' ? Promise.resolve({ tasks: [] }) : Promise.resolve({}))
    notifyReady.mockReset()
    const { App } = await import('./App')
    const root = createRoot(container)
    await act(async () => { root.render(<App />) })
    expect(notifyReady).toHaveBeenLastCalledWith('navigation:plan-pdf', 'first')
    const openProduction = [...container.querySelectorAll('button')]
      .find(button => button.textContent?.includes('生产消息 Notion 入库')) as HTMLButtonElement
    await act(async () => { openProduction.click() })
    expect(invoke).toHaveBeenCalledWith('app.navigateNative', { tag: 'production-message' })

    await act(async () => {
      history.replaceState({}, '', '?route=daily-report&navigation=second')
      window.dispatchEvent(new PopStateEvent('popstate'))
    })
    expect(notifyReady).toHaveBeenLastCalledWith('daily-report', 'second')
    expect(container.querySelectorAll('.desktop-shell > .desktop-shell-navigation .sidebar')).toHaveLength(1)
    expect(container.querySelector('[aria-current="page"]')?.textContent).toContain('日报推送')
    await act(async () => root.unmount())
    container.remove()
  })
})

describe('automation task creation', () => {
  it('creates a daily report only after the type-specific wizard is confirmed', async () => {
    history.replaceState({}, '', '?route=daily-report')
    const container = document.createElement('div')
    document.body.append(container)
    let created = false
    invoke.mockReset().mockImplementation((operation: string) => {
      if (operation === 'automation.list') return Promise.resolve({ tasks: created ? [{ taskType: 'daily_report', taskTypeName: '日报推送', id: 'new-daily', name: '日报任务', schedule: '17:30', isEnabled: false, schedulingAvailable: true, status: 'pending-test', schedulerMessage: '', connectionStatus: '全局通知正常', lastRun: '暂无运行记录' }] : [] })
      if (operation === 'daily.create') { created = true; return Promise.resolve({ id: 'new-daily' }) }
      if (operation === 'daily.get') return Promise.resolve({ id: 'new-daily', name: '日报任务', sendTime: '17:30', isEnabled: false, validated: false, draftTemplate: '', draftTemplateDocument: '', notificationConfigured: true, notificationConnected: true, notificationStatus: '全局通知正常', businessSections: [], sources: [], fields: [], runs: [] })
      return Promise.resolve({})
    })
    const { App } = await import('./App')
    const root = createRoot(container)
    await act(async () => { root.render(<App />) })

    const newTask = [...container.querySelectorAll<HTMLButtonElement>('button')].find(button => button.textContent?.includes('新建任务'))!
    await act(async () => { newTask.click() })
    expect(document.body.textContent).toContain('先选择任务类型')
    expect(document.body.textContent).toContain('日报推送')
    expect(document.body.textContent).toContain('Notion 自动填报')

    const daily = [...document.querySelectorAll<HTMLButtonElement>('.automation-create-types button')].find(button => button.textContent?.includes('日报推送'))!
    await act(async () => { daily.click() })
    expect(document.body.textContent).toContain('2 基本信息')
    expect(invoke.mock.calls.some(([operation]) => operation === 'daily.create')).toBe(false)
    const next = [...document.querySelectorAll<HTMLButtonElement>('button')].find(button => button.textContent === '下一步')!
    await act(async () => { next.click() })
    expect(document.body.textContent).toContain('日报必要配置')
    const create = [...document.querySelectorAll<HTMLButtonElement>('button')].find(button => button.textContent?.includes('创建任务'))!
    await act(async () => { create.click(); await Promise.resolve(); await Promise.resolve() })

    expect(invoke).toHaveBeenCalledWith('daily.create', { name: '日报任务', sendTime: '17:30' })
    expect(document.querySelector('[role="dialog"]')).toBeNull()
    expect(container.querySelector('[role="tab"][aria-selected="true"]')?.textContent).toBe('基本信息')
    await act(async () => root.unmount())
    container.remove()
  })

  it('keeps NotionFill credentials inside its own creation UI', async () => {
    history.replaceState({}, '', '?route=daily-report')
    const container = document.createElement('div')
    document.body.append(container)
    let created = false
    invoke.mockReset().mockImplementation((operation: string) => {
      if (operation === 'automation.list') return Promise.resolve({ tasks: created ? [{ taskType: 'notion_fill', taskTypeName: 'Notion 自动填报', id: 'new-fill', name: '原材料入库自动填报', schedule: '每天 00:00 · 前一天', isEnabled: false, schedulingAvailable: true, status: 'pending-test', schedulerMessage: '', connectionStatus: '93系统 + Notion', lastRun: '暂无运行记录' }] : [] })
      if (operation === 'notionFill.create') { created = true; return Promise.resolve({ id: 'new-fill' }) }
      if (operation === 'notionFill.get') return Promise.resolve({ id: 'new-fill', name: '原材料入库自动填报', baseUrl: 'https://internal.example.test', sourcePageUrl: 'https://internal.example.test/inbound/summary.php', username: 'tester', passwordConfigured: true, notionConfigured: true, targetDataSourceName: '原材料入库数据库', validated: false, isEnabled: false, schedulingAvailable: true, schedule: '每天 00:00 · 填报前一天', schedulerInstalled: false, schedulerMessage: '', runs: [] })
      return Promise.resolve({})
    })
    const { App } = await import('./App')
    const root = createRoot(container)
    await act(async () => { root.render(<App />) })

    await act(async () => { ([...container.querySelectorAll<HTMLButtonElement>('button')].find(button => button.textContent?.includes('新建任务'))!).click() })
    await act(async () => { ([...document.querySelectorAll<HTMLButtonElement>('.automation-create-types button')].find(button => button.textContent?.includes('Notion 自动填报'))!).click() })
    await act(async () => { ([...document.querySelectorAll<HTMLButtonElement>('button')].find(button => button.textContent === '下一步')!).click() })
    expect(document.body.textContent).toContain('凭据只归 NotionFill 任务所有')
    expect(document.body.textContent).toContain('按日期查重，仅新增')

    const inputs = document.querySelectorAll<HTMLInputElement>('.automation-create-step input')
    await act(async () => {
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(inputs[0], 'https://internal.example.test/inbound/summary.php')
      inputs[0].dispatchEvent(new Event('input', { bubbles: true }))
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(inputs[1], 'tester')
      inputs[1].dispatchEvent(new Event('input', { bubbles: true }))
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(inputs[2], 'secret')
      inputs[2].dispatchEvent(new Event('input', { bubbles: true }))
    })
    const create = [...document.querySelectorAll<HTMLButtonElement>('button')].find(button => button.textContent?.includes('创建任务'))!
    await act(async () => { create.click(); await Promise.resolve(); await Promise.resolve() })

    expect(invoke).toHaveBeenCalledWith('notionFill.create', { name: '原材料入库自动填报', sourcePageUrl: 'https://internal.example.test/inbound/summary.php', username: 'tester', password: 'secret' })
    expect(document.querySelector('[role="dialog"]')).toBeNull()
    expect(container.textContent).toContain('Notion 自动填报 · 每天 00:00 · 前一天')
    await act(async () => root.unmount())
    container.remove()
  })
})

describe('daily report workflow', () => {
  let container: HTMLDivElement
  beforeEach(async () => {
    history.replaceState({}, '', '?route=daily-report')
    container = document.createElement('div')
    document.body.append(container)
    invoke.mockReset().mockImplementation((operation: string) => {
      if (operation === 'app.getOverview') return Promise.resolve({})
      if (operation === 'automation.list') return Promise.resolve({ tasks: [{ taskType: 'daily_report', taskTypeName: '日报推送', id: 'job-1', name: '塔筒日报', schedule: '17:30', isEnabled: false, schedulingAvailable: true, status: 'pending-test', schedulerMessage: '', connectionStatus: '连接正常', lastRun: '暂无运行记录', missingStep: 'template', missingMessage: '请先完成测试发送。' }] })
      if (operation === 'automation.setEnabled') return Promise.resolve({ enabled: false, missingStep: 'template', message: '请先完成测试发送。' })
      if (operation === 'daily.get') return Promise.resolve({ id: 'job-1', name: '塔筒日报', sendTime: '17:30', isEnabled: false, validated: false, draftTemplate: '', draftTemplateDocument: '', notificationConfigured: true, notificationConnected: true, notificationStatus: '全局通知正常', schedulerInstalled: false, schedulerMessage: '', businessSections: [], sources: [], fields: [], runs: [] })
      return Promise.resolve({})
    })
    const { App } = await import('./App')
    await act(async () => { createRoot(container).render(<App />) })
  })
  afterEach(() => container.remove())

  it('keeps enable switch honest and opens the missing configuration step', async () => {
    expect(container.textContent).toContain('待测试')
    const toggle = container.querySelector('.switch input') as HTMLInputElement
    await act(async () => { toggle.click() })
    expect(invoke).toHaveBeenCalledWith('automation.setEnabled', { taskType: 'daily_report', id: 'job-1', enabled: true }, 60000)
    expect(container.textContent).toContain('配置尚未完成')
    expect(container.textContent).toContain('日报推送 · 17:30')
    expect([...container.querySelectorAll('[role="tab"]')].map(item => item.textContent)).toEqual(['基本信息', '任务配置', '运行与测试', '运行记录'])
    expect(container.querySelector('[role="tab"][aria-selected="true"]')?.textContent).toBe('任务配置')
    expect(container.querySelector('.daily-progress')).toBeNull()
    expect(container.textContent).toContain('配置问题')
    expect(container.textContent).toContain('日报配置尚未验证')
    expect(container.textContent).toContain('前往任务配置')
    await openTaskTab(container, '基本信息')
    const issueLink = [...container.querySelectorAll<HTMLButtonElement>('button')].find(item => item.textContent?.includes('前往任务配置'))!
    await act(async () => { issueLink.click() })
    expect(container.querySelector('[role="tab"][aria-selected="true"]')?.textContent).toBe('任务配置')
    expect(container.textContent).toContain('消息内容')
    expect([...container.querySelectorAll('.field-label-title')].map(item => item.textContent)).toEqual(['1. 数据库'])
    const previewButton = [...container.querySelectorAll('button')].find(item => item.textContent?.includes('生成消息预览')) as HTMLButtonElement
    expect(previewButton.disabled).toBe(true)
    await openTaskTab(container, '基本信息')
    expect(container.textContent).toContain('保存基本信息')
  })

  it('keeps shell-owned basics and run history independent from task configuration', async () => {
    const original = invoke.getMockImplementation()!
    invoke.mockImplementation((operation: string, payload?: unknown) => {
      if (operation === 'daily.runs') return Promise.resolve({ runs: [{ id: 'run-1', time: '2026-09-04 00:01', source: '自动运行', status: '成功', businessDate: '2026-09-03', templateVersion: 2, stage: 'sent', attempts: 1, response: '', error: '', textSummary: '昨日生产日报' }] })
      return original(operation, payload)
    })
    await act(async () => { (container.querySelector('.daily-job-card') as HTMLElement).click() })
    expect(container.querySelector('[role="tab"][aria-selected="true"]')?.textContent).toBe('基本信息')
    expect(container.textContent).toContain('名称和发送时间由日报任务自己的配置保存')
    expect(container.textContent).toContain('请先完成测试发送。')
    expect(container.querySelector('.daily-progress')).toBeNull()

    await openTaskTab(container, '运行记录')
    expect(invoke).toHaveBeenCalledWith('daily.runs', { id: 'job-1' })
    expect(container.textContent).toContain('昨日生产日报')
    expect(container.textContent).toContain('业务日期：2026-09-03')
    expect(container.querySelector('.daily-progress')).toBeNull()
  })

  it('preserves the database directory business hierarchy without reclassifying sources', async () => {
    invoke.mockImplementation((operation: string) => {
      if (operation === 'daily.get') return Promise.resolve({ id: 'job-1', name: '塔筒日报', sendTime: '17:30', isEnabled: false, validated: false, draftTemplate: '', draftTemplateDocument: '', notificationConfigured: true, notificationConnected: true, notificationStatus: '全局通知正常', usesBusinessSections: true, businessSections: ['焊接业务', '下料业务'], sources: [{ id: 'weld-total', name: '焊接总库', path: '数据库 / 焊接业务 / 焊接总库', businessSection: '焊接业务' }, { id: 'weld-plan', name: '焊接计划库', path: '数据库 / 焊接业务 / 焊接计划库', businessSection: '焊接业务' }, { id: 'cut-total', name: '下料总库', path: '数据库 / 下料业务 / 下料总库', businessSection: '下料业务' }], fields: [], runs: [] })
      return Promise.resolve({})
    })
    await act(async () => { (container.querySelector('.daily-job-card') as HTMLElement).click() })
    await openTaskTab(container, '任务配置')
    const business = container.querySelector<HTMLButtonElement>('.progressive-field-picker .picker-trigger')!
    await act(async () => { business.click() })
    const weld = [...container.querySelectorAll<HTMLButtonElement>('.choice-popover [role="option"]')]
      .find(item => item.textContent === '焊接业务')!
    await act(async () => { weld.click() })
    await act(async () => { container.querySelectorAll<HTMLButtonElement>('.progressive-field-picker .picker-trigger')[1].click() })
    const options = [...container.querySelectorAll<HTMLButtonElement>('.choice-popover [role="option"]')].map(item => item.textContent)
    expect(options).toEqual(['焊接总库', '焊接计划库'])
  })

  it('saves business metric, period, and aggregation without exposing query strategy', async () => {
    Object.defineProperty(Range.prototype, 'getClientRects', { configurable: true, value: () => [] })
    Object.defineProperty(Range.prototype, 'getBoundingClientRect', { configurable: true, value: () => new DOMRect() })
    invoke.mockImplementation((operation: string) => {
      if (operation === 'daily.get') return Promise.resolve({ id: 'job-1', name: '塔筒日报', businessId: 'tower.daily', businessName: '塔筒日报', sendTime: '17:30', isEnabled: false, validated: false, draftTemplate: '', draftTemplateDocument: '', notificationConfigured: true, notificationConnected: true, notificationStatus: '全局通知正常', usesBusinessSections: false, businessSections: [], sources: [{ id: 'tower', name: '塔筒产线数据库', path: '数据库 / 塔筒产线数据库 / 塔筒产线数据库', businessSection: '塔筒产线数据库' }], fields: [], runs: [] })
      if (operation === 'daily.getProperties') return Promise.resolve({ metrics: [{ id: 'tower.welding', name: '焊接量', defaultAggregate: 'sum', granularity: 'daily', hasFixedFilter: false, filterDescription: '' }] })
      if (operation === 'daily.addField') return Promise.resolve({ field: { placeholder: 'prop("去年同期 · 塔筒产线数据库 · 焊接（吨）")', label: '去年同期 · 焊接（吨）', tooltip: '塔筒产线数据库 · 业务日期 · 去年同期 · Sum(焊接（吨）)' } })
      return Promise.resolve({})
    })
    await act(async () => { (container.querySelector('.daily-job-card') as HTMLElement).click() })
    await openTaskTab(container, '任务配置')

    const choose = async (triggerIndex: number, label: string) => {
      const trigger = container.querySelectorAll<HTMLButtonElement>('.progressive-field-picker .picker-trigger')[triggerIndex]
      await act(async () => { trigger.click() })
      const option = [...container.querySelectorAll<HTMLButtonElement>('.choice-popover [role="option"]')]
        .find(item => item.textContent?.includes(label)) as HTMLButtonElement
      await act(async () => { option.click() })
    }
    await choose(0, '塔筒产线数据库')
    await choose(1, '焊接量')
    expect(container.textContent).not.toContain('QueryMode')
    expect(container.textContent).not.toContain('精确匹配')
    expect([...container.querySelectorAll('.system-variable button')].map(item => item.textContent)).toEqual(['年', '月', '日', '完整日期'])

    await choose(2, '去年同期')
    const insert = container.querySelector('.insert-field-button') as HTMLButtonElement
    await act(async () => { insert.click() })
    expect(invoke).toHaveBeenCalledWith('daily.addField', {
      id: 'job-1', sourceId: 'tower', metricId: 'tower.welding', placeholder: '',
      rangeKind: 'last-year-to-date', aggregateKind: 'sum', customStartDate: '', customEndDate: '',
    })
    expect(insert.querySelector('.spin')).toBeNull()
  })

  it('reopens and saves a monthly plan binding without showing ExactMatch', async () => {
    invoke.mockImplementation((operation: string) => {
      if (operation === 'daily.get') return Promise.resolve({ id: 'job-1', name: '月计划日报', businessId: 'tower.daily', businessName: '塔筒日报', sendTime: '17:30', isEnabled: false, validated: false, draftTemplate: '', draftTemplateDocument: '', notificationConfigured: true, notificationConnected: true, notificationStatus: '全局通知正常', usesBusinessSections: false, businessSections: [], sources: [{ id: 'cut-month', name: '下料月计划数据库', path: '数据库 / 下料月计划数据库', businessSection: '下料月计划' }], fields: [{ placeholder: '{plan}', label: '本月 · 计划下料量', tooltip: '月计划', binding: { dataSourceId: 'cut-month', queryMode: 'exact-match', propertyId: 'plan', businessMetricId: 'cut.plan', businessMetricName: '计划下料量', dataGranularity: 'monthly', exactMatchPropertyId: 'month', exactMatchValueKind: 'business-month', rangeKind: 'current-month', aggregateKind: 'value', filterPropertyId: '', filterOperator: '', filterValue: '', customStartDate: '', customEndDate: '' } }], runs: [] })
      if (operation === 'daily.getProperties') return Promise.resolve({ metrics: [{ id: 'cut.plan', name: '计划下料量', defaultAggregate: 'value', granularity: 'monthly', hasFixedFilter: false, filterDescription: '' }] })
      if (operation === 'daily.addField') return Promise.resolve({ field: { placeholder: '{plan}', label: '业务月份 · 月总计划', tooltip: '下料月计划数据库 · 计划月份 = 业务月份 · 月总计划' } })
      return Promise.resolve({})
    })
    await act(async () => { (container.querySelector('.daily-job-card') as HTMLElement).click() })
    await openTaskTab(container, '任务配置')
    const configured = container.querySelector<HTMLButtonElement>('.binding-list button')!
    await act(async () => { configured.click() })
    expect(container.textContent).toContain('正在编辑字段')
    expect([...container.querySelectorAll<HTMLButtonElement>('.picker-trigger')].map(item => item.textContent)).toEqual(expect.arrayContaining(['下料月计划数据库', '计划下料量', '本月', '取值']))
    expect(container.textContent).not.toContain('精确匹配')
    await act(async () => { (container.querySelector('.insert-field-button') as HTMLButtonElement).click() })

    expect(invoke).toHaveBeenCalledWith('daily.addField', {
      id: 'job-1', sourceId: 'cut-month', metricId: 'cut.plan', placeholder: '{plan}',
      rangeKind: 'current-month', aggregateKind: 'value', customStartDate: '', customEndDate: '',
    })
  })

  it('reloads business metrics after the database changes', async () => {
    invoke.mockImplementation((operation: string, payload?: { sourceId?: string }) => {
      if (operation === 'daily.get') return Promise.resolve({ id: 'job-1', name: '联动测试', sendTime: '17:30', isEnabled: false, validated: false, draftTemplate: '', draftTemplateDocument: '', notificationConfigured: true, notificationConnected: true, notificationStatus: '全局通知正常', usesBusinessSections: false, businessSections: [], sources: [{ id: 'a', name: '数据源 A', path: 'A' }, { id: 'b', name: '数据源 B', path: 'B' }], fields: [], runs: [] })
      if (operation === 'daily.getProperties' && payload?.sourceId === 'a') return Promise.resolve({ metrics: [{ id: 'metric-a', name: '指标 A', defaultAggregate: 'sum', granularity: 'daily', hasFixedFilter: false, filterDescription: '' }] })
      if (operation === 'daily.getProperties' && payload?.sourceId === 'b') return Promise.resolve({ metrics: [{ id: 'metric-b', name: '指标 B', defaultAggregate: 'sum', granularity: 'daily', hasFixedFilter: false, filterDescription: '' }] })
      return Promise.resolve({})
    })
    await act(async () => { (container.querySelector('.daily-job-card') as HTMLElement).click() })
    await openTaskTab(container, '任务配置')
    const choose = async (triggerIndex: number, label: string) => {
      const trigger = container.querySelectorAll<HTMLButtonElement>('.progressive-field-picker .picker-trigger')[triggerIndex]
      await act(async () => { trigger.click() })
      const option = [...container.querySelectorAll<HTMLButtonElement>('.choice-popover [role="option"]')]
        .find(item => item.textContent?.includes(label)) as HTMLButtonElement
      await act(async () => { option.click() })
    }

    await choose(0, '数据源 A')
    await choose(0, '数据源 B')
    expect(invoke).toHaveBeenCalledWith('daily.getProperties', { id: 'job-1', sourceId: 'a' })
    expect(invoke).toHaveBeenCalledWith('daily.getProperties', { id: 'job-1', sourceId: 'b' })
    await act(async () => { container.querySelectorAll<HTMLButtonElement>('.progressive-field-picker .picker-trigger')[1].click() })
    expect(container.textContent).toContain('指标 B')
    expect(container.textContent).not.toContain('指标 A')
    const metricB = [...container.querySelectorAll<HTMLButtonElement>('.choice-popover [role="option"]')]
      .find(item => item.textContent?.includes('指标 B'))!
    await act(async () => { metricB.click() })
    expect(container.textContent).toContain('日期范围')
    expect(container.textContent).toContain('取值方式')
    expect(container.textContent).not.toContain('查询方式')
  })

  it('consumes a template insertion once when returning from preview', async () => {
    Object.defineProperty(Range.prototype, 'getClientRects', { configurable: true, value: () => [] })
    Object.defineProperty(Range.prototype, 'getBoundingClientRect', { configurable: true, value: () => new DOMRect() })
    invoke.mockImplementation((operation: string) => {
      if (operation === 'daily.get') return Promise.resolve({ id: 'job-1', name: '塔筒日报', sendTime: '17:30', isEnabled: false, validated: false, draftTemplate: '计划', draftTemplateDocument: '', notificationConfigured: true, notificationConnected: true, notificationStatus: '全局通知正常', businessSections: [], sources: [], fields: [], runs: [] })
      if (operation === 'daily.preview') return Promise.resolve({ succeeded: true, message: '成功', text: '8月计划' })
      return Promise.resolve({})
    })
    await act(async () => { (container.querySelector('.daily-job-card') as HTMLElement).click() })
    await openTaskTab(container, '任务配置')

    const month = [...container.querySelectorAll<HTMLButtonElement>('.system-variable button')].find(item => item.textContent === '月')!
    await act(async () => { month.click() })
    expect(container.querySelectorAll('.date-token')).toHaveLength(1)

    const preview = [...container.querySelectorAll<HTMLButtonElement>('button')].find(item => item.textContent?.includes('生成消息预览'))!
    await act(async () => { preview.click(); await new Promise(resolve => setTimeout(resolve, 1100)) })
    const back = [...container.querySelectorAll<HTMLButtonElement>('button')].find(item => item.textContent?.includes('修改消息内容'))!
    await act(async () => { back.click() })
    for (let attempt = 0; attempt < 20 && container.querySelectorAll('.date-token').length !== 1; attempt++)
      await act(async () => { await new Promise(resolve => setTimeout(resolve, 100)) })

    expect(container.querySelectorAll('.date-token')).toHaveLength(1)
  })

  it('keeps creation independent and exposes deletion from the card context menu', async () => {
    let finishToggle!: (value: { enabled: boolean }) => void
    invoke.mockImplementation((operation: string) => {
      if (operation === 'app.getOverview') return Promise.resolve({})
      if (operation === 'automation.list') return Promise.resolve({ tasks: [{ taskType: 'daily_report', taskTypeName: '日报推送', id: 'job-1', name: '濉旂瓛鏃ユ姤', schedule: '17:30', isEnabled: false, schedulingAvailable: true, status: 'pending-test', connectionStatus: '杩炴帴姝ｅ父', lastRun: '鏆傛棤杩愯璁板綍' }] })
      if (operation === 'automation.setEnabled') return new Promise(resolve => { finishToggle = resolve })
      return Promise.resolve({})
    })
    await act(async () => { await Promise.resolve() })

    const card = container.querySelector('.daily-job-card') as HTMLElement
    expect(container.querySelector('[aria-label="打开配置"]')).toBeNull()
    expect(container.querySelector('[aria-label="更多操作"]')).toBeNull()
    await act(async () => { card.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, clientX: 80, clientY: 90 })) })
    expect(container.querySelector('.job-context-menu')?.textContent).toContain('删除任务')

    const toggle = container.querySelector('.switch input') as HTMLInputElement
    await act(async () => { toggle.click() })
    expect((container.querySelector('.daily-page > header .primary') as HTMLButtonElement).disabled).toBe(false)
    await act(async () => { finishToggle({ enabled: true }) })
  })

  it('saves basic information only from the explicit step action', async () => {
    invoke.mockImplementation((operation: string) => {
      if (operation === 'app.getOverview') return Promise.resolve({})
      if (operation === 'automation.list') return Promise.resolve({ tasks: [{ taskType: 'daily_report', taskTypeName: '日报推送', id: 'job-1', name: '', schedule: '17:30', isEnabled: false, schedulingAvailable: true, status: 'pending-test', connectionStatus: '待配置', lastRun: '暂无运行记录' }] })
      if (operation === 'daily.get') return Promise.resolve({ id: 'job-1', name: '', sendTime: '17:30', isEnabled: false, validated: false, draftTemplate: '', draftTemplateDocument: '', notificationConfigured: true, notificationConnected: true, notificationStatus: '全局通知正常', businessSections: [], sources: [], fields: [], runs: [] })
      return Promise.resolve({})
    })
    const card = container.querySelector('.daily-job-card') as HTMLElement
    await act(async () => { card.click() })
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 700)) })
    expect(invoke.mock.calls.filter(([operation]) => operation === 'daily.saveBasics')).toHaveLength(0)

    const name = container.querySelector('.basic-grid input') as HTMLInputElement
    await act(async () => { Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(name, '塔筒日报'); name.dispatchEvent(new Event('input', { bubbles: true })) })
    const save = [...container.querySelectorAll('button')].find(item => item.textContent?.includes('保存基本信息')) as HTMLButtonElement
    await act(async () => { save.click() })
    expect(invoke.mock.calls.filter(([operation]) => operation === 'daily.saveBasics')).toHaveLength(1)
    expect(container.querySelector('[role="tab"][aria-selected="true"]')?.textContent).toBe('基本信息')
    expect(container.textContent).toContain('已保存')
    expect(container.querySelector('.daily-progress')).toBeNull()
  })

  it('keeps a validated task freely editable without restoring a wizard step', async () => {
    invoke.mockImplementation((operation: string) => {
      if (operation === 'automation.list') return Promise.resolve({ tasks: [{ taskType: 'daily_report', taskTypeName: '日报推送', id: 'job-1', name: '塔筒日报', schedule: '17:30', isEnabled: false, schedulingAvailable: true, status: 'ready', schedulerMessage: '', connectionStatus: '连接正常', lastRun: '暂无运行记录' }] })
      if (operation === 'daily.get') return Promise.resolve({ id: 'job-1', name: '塔筒日报', sendTime: '17:30', isEnabled: false, validated: true, draftTemplate: '日报内容', draftTemplateDocument: '', notificationConfigured: true, notificationConnected: true, notificationStatus: '全局通知正常', businessSections: [], sources: [], fields: [], runs: [] })
      if (operation === 'daily.sendToday') return Promise.resolve({ succeeded: true, alreadySent: false })
      return Promise.resolve({})
    })
    await act(async () => { (container.querySelector('.daily-job-card') as HTMLElement).click() })
    await openTaskTab(container, '运行与测试')
    expect(container.textContent).toContain('当前配置已验证')
    const sendToday = [...container.querySelectorAll<HTMLButtonElement>('button')].find(item => item.textContent?.includes('发送今日消息'))!
    await act(async () => { sendToday.click(); await Promise.resolve() })
    expect(invoke).toHaveBeenCalledWith('daily.sendToday', { id: 'job-1' }, 120000)

    const edit = [...container.querySelectorAll('button')].find(item => item.textContent?.includes('修改消息内容')) as HTMLButtonElement
    await act(async () => { edit.click() })
    expect(container.querySelector('[role="tab"][aria-selected="true"]')?.textContent).toBe('任务配置')
    expect(container.textContent).toContain('从当前数据库目录中选择字段')
    expect(container.querySelector('.daily-progress')).toBeNull()
    expect(container.textContent).not.toContain('下一步')
  })

  it('keeps notification credentials out of the task editor', async () => {
    invoke.mockImplementation((operation: string) => {
      if (operation === 'app.getOverview') return Promise.resolve({})
      if (operation === 'automation.list') return Promise.resolve({ tasks: [{ taskType: 'daily_report', taskTypeName: '日报推送', id: 'job-1', name: '塔筒日报', schedule: '17:30', isEnabled: false, schedulingAvailable: true, status: 'pending-test', connectionStatus: '待测试', lastRun: '暂无运行记录' }] })
      if (operation === 'daily.get') return Promise.resolve({ id: 'job-1', name: '塔筒日报', sendTime: '17:30', isEnabled: false, validated: false, draftTemplate: '', draftTemplateDocument: '', notificationConfigured: false, notificationConnected: false, notificationStatus: '尚未配置', businessSections: [], sources: [], fields: [], runs: [] })
      return Promise.resolve({})
    })
    await act(async () => { (container.querySelector('.daily-job-card') as HTMLElement).click() })
    await openTaskTab(container, '任务配置')
    expect(container.textContent).toContain('全局通知尚未就绪')
    expect(container.textContent).toContain('设置 → 通知设置')
    expect(container.textContent).not.toContain('Webhook')
    expect(container.textContent).not.toContain('加签 Secret')
  })
})

describe('Notion fill workflow', () => {
  it('uses a dedicated fixed-contract editor and runs a read-only validation', async () => {
    history.replaceState({}, '', '?route=daily-report')
    const container = document.createElement('div')
    document.body.append(container)
    let runCount = 0
    invoke.mockReset().mockImplementation((operation: string) => {
      if (operation === 'automation.list') return Promise.resolve({ tasks: [{ taskType: 'notion_fill', taskTypeName: 'Notion 自动填报', id: 'fill-1', name: '原材料入库自动填报', schedule: '每天 00:00 · 前一天', isEnabled: false, schedulingAvailable: true, status: 'pending-test', schedulerMessage: '', connectionStatus: '93系统 + Notion', lastRun: '暂无运行记录' }] })
      if (operation === 'notionFill.get') return Promise.resolve({ id: 'fill-1', name: '原材料入库自动填报', baseUrl: 'https://internal.example.test', sourcePageUrl: 'https://internal.example.test/inbound/summary.php', username: 'tester', passwordConfigured: true, notionConfigured: true, targetDataSourceName: '原材料入库数据库', validated: false, isEnabled: false, schedulingAvailable: true, schedule: '每天 00:00 · 填报前一天', schedulerInstalled: false, schedulerMessage: '', runs: [] })
      if (operation === 'notionFill.testSource') return Promise.resolve({ succeeded: true, businessDate: '2026-09-03', plateWeight: 9.425, sectionWeight: 3.15, totalWeight: 12.575, message: '93系统材料入库读取成功；本次未访问 Notion。' })
      if (operation === 'notionFill.test') return Promise.resolve({ succeeded: true, businessDate: '2026-09-03', plateWeight: 9.425, sectionWeight: 3.15, totalWeight: 12.575, targetRecordExists: false, message: '可以新增' })
      if (operation === 'notionFill.runNow') return Promise.resolve(++runCount === 1
        ? { succeeded: true, exitCode: 0, created: true, skipped: false, message: '新增完成' }
        : { succeeded: true, exitCode: 10, created: false, skipped: true, message: '2026-09-03 已有记录，本次未重复新增。' })
      return Promise.resolve({})
    })
    const { App } = await import('./App')
    const root = createRoot(container)
    await act(async () => { root.render(<App />) })
    await act(async () => { (container.querySelector('.daily-job-card') as HTMLElement).click(); await Promise.resolve() })
    await openTaskTab(container, '任务配置')

    expect(container.textContent).toContain('每天 00:00 · 填报前一天')
    expect(container.textContent).toContain('按日期查重，仅新增，不覆盖')
    expect(container.textContent).toContain('当前任务只支持已确认的原材料入库日汇总')
    await openTaskTab(container, '任务配置')
    expect([...container.querySelectorAll<HTMLInputElement>('input')].some(input => input.value === 'https://internal.example.test/inbound/summary.php')).toBe(true)
    await openTaskTab(container, '运行与测试')
    const sourceTest = [...container.querySelectorAll<HTMLButtonElement>('button')].find(button => button.textContent?.includes('仅测试 93 读取'))!
    await act(async () => { sourceTest.click(); await Promise.resolve(); await Promise.resolve() })
    expect(invoke).toHaveBeenCalledWith('notionFill.testSource', expect.objectContaining({ id: 'fill-1' }), 120000)
    expect(container.textContent).toContain('本次未访问 Notion')
    const test = [...container.querySelectorAll<HTMLButtonElement>('button')].find(button => button.textContent?.includes('测试读取与查重'))!
    await act(async () => { test.click(); await Promise.resolve(); await Promise.resolve() })
    expect(invoke).toHaveBeenCalledWith('notionFill.save', expect.objectContaining({ id: 'fill-1', sourcePageUrl: 'https://internal.example.test/inbound/summary.php', username: 'tester', password: '' }))
    expect(invoke).toHaveBeenCalledWith('notionFill.test', expect.objectContaining({ id: 'fill-1' }), 120000)
    expect(container.textContent).toContain('12.575 吨')
    expect(container.textContent).toContain('目标日期暂无记录，可以新增')
    const run = [...container.querySelectorAll<HTMLButtonElement>('button')].find(button => button.textContent?.includes('执行本日期'))!
    await act(async () => { run.click() })
    expect(container.textContent).toContain('确认正式执行')
    const confirm = [...container.querySelectorAll<HTMLButtonElement>('button')].find(button => button.textContent?.includes('确认执行'))!
    await act(async () => { confirm.click(); await Promise.resolve(); await Promise.resolve() })
    expect(invoke).toHaveBeenCalledWith('notionFill.runNow', expect.objectContaining({ id: 'fill-1' }), 120000)
    expect(container.textContent).toContain('Notion 写入成功')
    const repeat = [...container.querySelectorAll<HTMLButtonElement>('button')].find(button => button.textContent?.includes('再次执行验证查重'))!
    await act(async () => { repeat.click() })
    const confirmRepeat = [...container.querySelectorAll<HTMLButtonElement>('button')].find(button => button.textContent?.includes('确认执行'))!
    await act(async () => { confirmRepeat.click(); await Promise.resolve(); await Promise.resolve() })
    expect(container.textContent).toContain('重复执行验证通过')
    expect(container.textContent).toContain('首次写入已成功')

    await act(async () => root.unmount())
    container.remove()
  })
})
