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
  useReducedMotion: () => false
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

describe('daily report workflow', () => {
  let container: HTMLDivElement
  beforeEach(async () => {
    history.replaceState({}, '', '?route=daily-report')
    container = document.createElement('div')
    document.body.append(container)
    invoke.mockReset().mockImplementation((operation: string) => {
      if (operation === 'app.getOverview') return Promise.resolve({})
      if (operation === 'daily.list') return Promise.resolve({ jobs: [{ id: 'job-1', name: '塔筒日报', sendTime: '17:30', isEnabled: false, status: 'pending-test', schedulerMessage: '', dingTalkStatus: '连接正常', lastRun: '暂无运行记录', missingStep: 'template', missingMessage: '请先完成测试发送。' }] })
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
      if (operation === 'daily.list') return Promise.resolve({ jobs: [{ id: 'job-1', name: '濉旂瓛鏃ユ姤', sendTime: '17:30', isEnabled: false, status: 'pending-test', dingTalkStatus: '杩炴帴姝ｅ父', lastRun: '鏆傛棤杩愯璁板綍' }] })
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
      if (operation === 'daily.list') return Promise.resolve({ jobs: [{ id: 'job-1', name: '', sendTime: '17:30', isEnabled: false, status: 'pending-test', dingTalkStatus: '待配置', lastRun: '暂无运行记录' }] })
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
      if (operation === 'daily.list') return Promise.resolve({ jobs: [{ id: 'job-1', name: '塔筒日报', sendTime: '17:30', isEnabled: false, status: 'pending-test', dingTalkStatus: '待测试', lastRun: '暂无运行记录' }] })
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
