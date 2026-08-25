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

  it('checks only after a field value actually changes', async () => {
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
    expect(invoke.mock.calls.filter(([operation]) => operation === 'production.check')).toHaveLength(2)
    await act(async () => { (container.querySelector('.identity-section .date-picker-trigger') as HTMLButtonElement).click() })
    const nextDate = [...document.querySelectorAll('.date-picker-grid button')].find(item => item.textContent === '14') as HTMLButtonElement
    await act(async () => { nextDate.click() })
    await act(async () => { await Promise.resolve() })
    expect(invoke.mock.calls.filter(([operation]) => operation === 'production.check')).toHaveLength(3)
    expect((button('确认入库') as HTMLButtonElement).disabled).toBe(false)
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
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-08-23T16:30:00Z'))
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
    vi.useRealTimers()
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
      ? Promise.resolve({ configured: true, cutting: { bound: false, name: '', path: '' }, towerDaily: { bound: true, name: '日报', path: '生产/日报' }, towerMonthly: { bound: true, name: '月报', path: '生产/月报' }, towerYearly: { bound: true, name: '年报', path: '生产/年报' }, sources: [], selected: {} })
      : Promise.resolve({}))
    const { App } = await import('./App')
    const root = createRoot(container)

    await act(async () => { root.render(<App />) })

    expect(container.querySelectorAll('.desktop-shell > .desktop-shell-navigation .sidebar')).toHaveLength(1)
    expect(container.querySelector('.production-message-content')).toBeTruthy()
    expect(container.querySelector('.content-header h1')?.textContent).toBe('生产消息入库')
    expect(container.querySelector('.content-header + .production-message-scroll')).toBeTruthy()
    const templateConfig = container.querySelector('.template-config-button') as HTMLButtonElement
    expect(templateConfig.textContent).toBe('模板配置')
    expect(templateConfig.disabled).toBe(true)
    expect((container.querySelector('.message-textarea') as HTMLTextAreaElement).value).toBe('')
    expect(invoke).toHaveBeenCalledWith('production.getBindings')

    await act(async () => { root.unmount() })
    container.remove()
  })
})

describe('shared operation sidebar', () => {
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
})

describe('host lifecycle', () => {
  it('reports each host navigation after React renders the requested route', async () => {
    history.replaceState({}, '', '?route=navigation:plan-pdf&navigation=first')
    const container = document.createElement('div')
    document.body.append(container)
    invoke.mockReset().mockImplementation((operation: string) =>
      operation === 'daily.list' ? Promise.resolve({ jobs: [] }) : Promise.resolve({}))
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

describe('daily report workflow', () => {
  let container: HTMLDivElement
  beforeEach(async () => {
    history.replaceState({}, '', '?route=daily-report')
    container = document.createElement('div')
    document.body.append(container)
    invoke.mockReset().mockImplementation((operation: string) => {
      if (operation === 'app.getOverview') return Promise.resolve({})
      if (operation === 'daily.list') return Promise.resolve({ jobs: [{ id: 'job-1', name: '塔筒日报', sendTime: '17:30', isEnabled: false, schedulingAvailable: true, status: 'pending-test', schedulerMessage: '', dingTalkStatus: '连接正常', lastRun: '暂无运行记录', missingStep: 'template', missingMessage: '请先完成测试发送。' }] })
      if (operation === 'daily.setEnabled') return Promise.resolve({ enabled: false, missingStep: 'template', message: '请先完成测试发送。' })
      if (operation === 'daily.get') return Promise.resolve({ id: 'job-1', name: '塔筒日报', sendTime: '17:30', isEnabled: false, validated: false, draftTemplate: '', draftTemplateDocument: '', credentialMask: '••••••••（已保存）', webhookSaved: true, secretSaved: true, dingTalkStatus: '连接正常', schedulerInstalled: false, schedulerMessage: '', pagePaths: [], sources: [], fields: [], runs: [] })
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
    expect(invoke).toHaveBeenCalledWith('daily.setEnabled', { id: 'job-1', enabled: true }, 60000)
    expect(container.textContent).toContain('配置尚未完成')
    expect(container.textContent).toContain('启停与删除请返回任务列表操作')
    expect(container.querySelector('.daily-progress')).toBeTruthy()
    expect(container.textContent).toContain('编辑消息')
    expect(container.querySelector('.daily-focus-card')?.classList.contains('template-focus-card')).toBe(false)
    expect([...container.querySelectorAll('.field-label-title')].map(item => item.textContent)).toEqual(['1. 数据页', '2. 数据库', '3. 数据字段'])
    const completedMarks = [...container.querySelectorAll('.daily-progress li.done > span')]
    expect(completedMarks.map(mark => mark.textContent)).toEqual(['✓', '✓'])
    expect(completedMarks.some(mark => mark.querySelector('svg'))).toBe(false)
    expect([...container.querySelectorAll<HTMLElement>('.progress-segments i')].map(item => item.style.width)).toEqual(['100%', '100%', '0%'])
    const previewButton = [...container.querySelectorAll('button')].find(item => item.textContent?.includes('生成消息预览')) as HTMLButtonElement
    expect(previewButton.disabled).toBe(true)
    const previous = [...container.querySelectorAll('button')].find(item => item.textContent?.includes('返回上一步')) as HTMLButtonElement
    await act(async () => { previous.click() })
    expect(container.querySelector('.daily-progress ol')?.classList.contains('backward')).toBe(true)
    expect([...container.querySelectorAll<HTMLElement>('.progress-segments i')].map(item => item.style.width)).toEqual(['100%', '100%', '0%'])
    expect(container.querySelectorAll('.daily-progress li')[1].classList.contains('just-back-active')).toBe(false)
    expect(container.querySelectorAll('.daily-progress li')[2].classList.contains('just-back-leave')).toBe(true)
    expect(container.textContent).toContain('编辑消息')
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 280)) })
    expect([...container.querySelectorAll<HTMLElement>('.progress-segments i')].map(item => item.style.width)).toEqual(['100%', '0%', '0%'])
    expect(container.querySelectorAll('.daily-progress li')[1].classList.contains('just-back-active')).toBe(false)
    expect(container.textContent).toContain('编辑消息')
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 460)) })
    expect(container.querySelectorAll('.daily-progress li')[1].classList.contains('just-back-active')).toBe(true)
    expect(container.textContent).toContain('配置钉钉机器人')
  })

  it('keeps creation independent and exposes deletion from the card context menu', async () => {
    let finishToggle!: (value: { enabled: boolean }) => void
    invoke.mockImplementation((operation: string) => {
      if (operation === 'app.getOverview') return Promise.resolve({})
      if (operation === 'daily.list') return Promise.resolve({ jobs: [{ id: 'job-1', name: '濉旂瓛鏃ユ姤', sendTime: '17:30', isEnabled: false, schedulingAvailable: true, status: 'pending-test', dingTalkStatus: '杩炴帴姝ｅ父', lastRun: '鏆傛棤杩愯璁板綍' }] })
      if (operation === 'daily.setEnabled') return new Promise(resolve => { finishToggle = resolve })
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
      if (operation === 'daily.list') return Promise.resolve({ jobs: [{ id: 'job-1', name: '', sendTime: '17:30', isEnabled: false, schedulingAvailable: true, status: 'pending-test', dingTalkStatus: '待配置', lastRun: '暂无运行记录' }] })
      if (operation === 'daily.get') return Promise.resolve({ id: 'job-1', name: '', sendTime: '17:30', isEnabled: false, validated: false, draftTemplate: '', draftTemplateDocument: '', credentialMask: '••••••••（已保存）', webhookSaved: false, secretSaved: false, dingTalkConnected: false, pagePaths: [], sources: [], fields: [], runs: [] })
      return Promise.resolve({})
    })
    const card = container.querySelector('.daily-job-card') as HTMLElement
    await act(async () => { card.click() })
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 700)) })
    expect(invoke.mock.calls.filter(([operation]) => operation === 'daily.saveBasics')).toHaveLength(0)

    const name = container.querySelector('.basic-grid input') as HTMLInputElement
    await act(async () => { Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(name, '塔筒日报'); name.dispatchEvent(new Event('input', { bubbles: true })) })
    const save = [...container.querySelectorAll('button')].find(item => item.textContent?.includes('保存设置')) as HTMLButtonElement
    await act(async () => { save.click() })
    expect(invoke.mock.calls.filter(([operation]) => operation === 'daily.saveBasics')).toHaveLength(1)
    expect(container.querySelectorAll('.daily-progress li')[0].classList.contains('just-completed')).toBe(true)
    expect([...container.querySelectorAll<HTMLElement>('.progress-segments i')].map(item => item.style.width)).toEqual(['0%', '0%', '0%'])
    expect(container.textContent).toContain('先确认任务的基本信息')
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 350)) })
    expect([...container.querySelectorAll<HTMLElement>('.progress-segments i')].map(item => item.style.width)).toEqual(['100%', '0%', '0%'])
    expect(container.querySelectorAll('.daily-progress li')[1].classList.contains('just-active')).toBe(false)
    expect(container.textContent).toContain('先确认任务的基本信息')
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 460)) })
    expect(container.querySelectorAll('.daily-progress li')[1].classList.contains('just-active')).toBe(true)
    expect(container.textContent).toContain('配置钉钉机器人')
  })

  it('restores the test node before returning from completion to editing', async () => {
    invoke.mockImplementation((operation: string) => {
      if (operation === 'daily.get') return Promise.resolve({ id: 'job-1', name: '塔筒日报', sendTime: '17:30', isEnabled: false, validated: true, draftTemplate: '日报内容', draftTemplateDocument: '', credentialMask: '••••••••（已保存）', webhookSaved: true, secretSaved: true, dingTalkConnected: true, pagePaths: [], sources: [], fields: [], runs: [] })
      return Promise.resolve({})
    })
    await act(async () => { (container.querySelector('.daily-job-card') as HTMLElement).click() })
    expect(container.textContent).toContain('配置完成，可以启用')

    const edit = [...container.querySelectorAll('button')].find(item => item.textContent?.includes('修改消息内容')) as HTMLButtonElement
    await act(async () => { edit.click() })
    expect(container.querySelectorAll('.daily-progress li')[3].classList.contains('just-back-leave')).toBe(true)
    expect(container.querySelectorAll('.daily-progress li')[3].querySelector('span')?.textContent).toBe('4')
    expect([...container.querySelectorAll<HTMLElement>('.progress-segments i')].map(item => item.style.width)).toEqual(['100%', '100%', '100%'])
    expect(container.textContent).toContain('配置完成，可以启用')

    await act(async () => { await new Promise(resolve => setTimeout(resolve, 280)) })
    expect([...container.querySelectorAll<HTMLElement>('.progress-segments i')].map(item => item.style.width)).toEqual(['100%', '100%', '0%'])
    expect(container.textContent).toContain('配置完成，可以启用')

    await act(async () => { await new Promise(resolve => setTimeout(resolve, 460)) })
    expect(container.querySelectorAll('.daily-progress li')[2].classList.contains('just-back-active')).toBe(true)
    expect(container.textContent).toContain('编辑消息')
  })

  it('keeps a failed robot connection on the credential step', async () => {
    invoke.mockImplementation((operation: string) => {
      if (operation === 'app.getOverview') return Promise.resolve({})
      if (operation === 'daily.list') return Promise.resolve({ jobs: [{ id: 'job-1', name: '塔筒日报', sendTime: '17:30', isEnabled: false, schedulingAvailable: true, status: 'pending-test', dingTalkStatus: '待测试', lastRun: '暂无运行记录' }] })
      if (operation === 'daily.get') return Promise.resolve({ id: 'job-1', name: '塔筒日报', sendTime: '17:30', isEnabled: false, validated: false, draftTemplate: '', draftTemplateDocument: '', credentialMask: '••••••••（已保存）', webhookSaved: true, secretSaved: true, dingTalkConnected: false, pagePaths: [], sources: [], fields: [], runs: [] })
      if (operation === 'daily.checkConnection') return Promise.resolve({ succeeded: false, message: '机器人无法连接' })
      return Promise.resolve({})
    })
    await act(async () => { (container.querySelector('.daily-job-card') as HTMLElement).click() })
    const test = [...container.querySelectorAll('button')].find(item => item.textContent?.includes('保存并检查连通')) as HTMLButtonElement
    await act(async () => { test.click() })
    expect(container.textContent).toContain('机器人无法连接')
    expect(container.textContent).toContain('配置中')
    expect(container.querySelector('[aria-current="step"]')?.textContent).toContain('钉钉机器人')
  })
})
