import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { BusinessConfiguration } from './BusinessConfiguration'
import { createSubmissionSettingsMock } from './submission-settings.mock'
import type { BusinessDataOption, BusinessListItem, ConfiguredPosition, PickEvent, SubmissionSettingsAdapter } from './business-configuration.types'

const options: BusinessDataOption[] = [{ value: 'source-a', label: '数据库指标甲' }, { value: 'source-b', label: '数据库指标乙' }]
let container: HTMLDivElement, root: Root, adapter: SubmissionSettingsAdapter, configured: BusinessListItem, mountId = 0
let captures: { emit: (event: PickEvent) => void; late: (event: PickEvent) => void; cancel: ReturnType<typeof vi.fn> }[]
const originalScroll = HTMLElement.prototype.scrollIntoView
const dialog = () => document.querySelector<HTMLElement>('[data-slot=dialog-content]')!
const button = (text: string, parent: ParentNode = document) => [...parent.querySelectorAll<HTMLButtonElement>('button')].find(value => value.textContent?.trim() === text)!
const click = async (element: HTMLElement) => act(async () => { element.focus(); element.click() })
const settle = async () => act(async () => { await new Promise(resolve => setTimeout(resolve, 0)) })
const rows = () => [...container.querySelectorAll<HTMLElement>('tbody tr')]
const changeName = async (value: string) => act(async () => {
  const input = dialog().querySelector<HTMLInputElement>('#business-name')!
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, value)
  input.dispatchEvent(new Event('input', { bubbles: true }))
})
const mount = async (items: BusinessListItem[] = [], canPick = true, sources = options) => act(async () => root.render(<BusinessConfiguration key={++mountId} initialItems={items} dataOptions={sources} adapter={adapter} canPick={canPick} />))
async function chooseSource(label: string) {
  const trigger = dialog().querySelector<HTMLButtonElement>('[role=combobox]')!
  await act(async () => { trigger.focus(); trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true })) }); await settle()
  const item = [...document.querySelectorAll<HTMLElement>('[role=option]')].find(value => value.textContent === label)!
  await act(async () => { item.focus(); item.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true })) }); await settle()
}
async function menu(index: number, item: string) {
  const trigger = rows()[index].querySelector<HTMLButtonElement>('[data-slot=dropdown-menu-trigger]')!
  await act(async () => { trigger.focus(); trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true })) }); await settle()
  const choice = [...document.querySelectorAll<HTMLElement>('[role=menuitem]')].find(value => value.textContent === item)!
  await click(choice); await settle()
}
async function next() { await click(button('下一步', dialog())); await settle() }
async function create(name = '任意业务') { await click(button('新建业务', container)); await chooseSource(options[0].label); await changeName(name); await next() }
async function selectPoint(index: number, cell: string) {
  const group = dialog().querySelector<HTMLElement>('[aria-label="' + (index === 0 ? '第一点' : '第二点') + '"]')!
  await click(button('选择单元格', group)); await act(async () => captures.at(-1)!.emit({ type: 'confirmed', cell })); await settle()
}
beforeEach(async () => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
  vi.useFakeTimers({ toFake: ['Date'] }); vi.setSystemTime(new Date(2026, 10, 13, 12))
  HTMLElement.prototype.scrollIntoView = vi.fn()
  captures = []; const mock = createSubmissionSettingsMock()
  adapter = { ...mock, startPick: vi.fn(() => {
    let listener: ((event: PickEvent) => void) | undefined, last: ((event: PickEvent) => void) | undefined
    const cancel = vi.fn(() => listener?.({ type: 'cancelled' }))
    captures.push({ emit: event => listener?.(event), late: event => last?.(event), cancel })
    return { subscribe(next: (event: PickEvent) => void) { listener = last = next; next({ type: 'waiting' }); return () => { listener = undefined } }, cancel }
  }) }
  const position = await adapter.recognizePosition({ date: '2026-11-13', cell: 'F9' }, { date: '2026-11-14', cell: 'G9' }) as ConfiguredPosition
  configured = { id: 'existing', name: '已有业务', dataSource: options[0], position: { ...position, range: 'B12:AF12' } }
  container = document.createElement('div'); document.body.append(container); root = createRoot(container); await mount()
})
afterEach(async () => { await act(async () => root.unmount()); await settle(); container.remove(); HTMLElement.prototype.scrollIntoView = originalScroll; vi.restoreAllMocks(); vi.useRealTimers(); vi.unstubAllGlobals() })

it('uses one Empty action without empty-state title or description', () => {
  expect(container.querySelector('[data-slot=empty]')).not.toBeNull()
  expect(container.querySelector('[data-slot=empty-title], [data-slot=empty-description]')).toBeNull()
  expect(container.querySelectorAll('button')).toHaveLength(1)
})
it('requires a source and autofills its name until the user edits it', async () => {
  await click(button('新建业务', container)); expect(button('下一步', dialog()).disabled).toBe(true)
  expect([...dialog().querySelectorAll('[data-slot=field-label]')].map(value => value.textContent)).toEqual(['数据来源（必填）', '业务名称'])
  await chooseSource(options[0].label); expect(dialog().querySelector<HTMLInputElement>('#business-name')!.value).toBe(options[0].label)
  await chooseSource(options[1].label); expect(dialog().querySelector<HTMLInputElement>('#business-name')!.value).toBe(options[1].label)
  await changeName('自己命名'); await chooseSource(options[0].label)
  expect(dialog().querySelector<HTMLInputElement>('#business-name')!.value).toBe('自己命名')
})
it('commits once on Next and keeps an incomplete business when step two closes', async () => {
  await click(button('新建业务', container)); await chooseSource(options[0].label)
  await act(async () => { const form = dialog().querySelector('form')!; form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })); form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })) })
  expect(dialog().querySelector('[data-slot=dialog-title]')?.textContent).toBe('设置填报位置')
  expect(button('保存', dialog()).disabled).toBe(true)
  expect(rows()).toHaveLength(1)
  await click(dialog().querySelector<HTMLElement>('[aria-label=关闭]')!); await settle()
  expect(rows()[0].textContent).toContain('未设置位置')
  expect(rows()[0].querySelector('[role=switch]')).toBeNull()
  expect(adapter.readBusinessDrafts()[0]).not.toHaveProperty('enabled')
  expect(dialog()).toBeNull()
})
it('offers a real empty source Select without fabricated options', async () => {
  await mount([], true, []); await click(button('新建业务', container))
  const trigger = dialog().querySelector<HTMLButtonElement>('[role=combobox]')!
  await act(async () => trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }))); await settle()
  expect(document.querySelectorAll('[role=option]')).toHaveLength(0)
  expect(document.querySelector('[data-slot=select-content]')?.textContent).toContain('暂无可填报数据')
})
it('allows creation before login but blocks picking with the prerequisite Alert', async () => {
  await mount([], false); await create()
  expect(dialog().textContent).toContain('请先完成网页配置并登录')
  expect([...dialog().querySelectorAll<HTMLButtonElement>('button')].filter(value => value.textContent === '选择单元格').map(value => value.disabled)).toEqual([true, true])
  expect(adapter.startPick).not.toHaveBeenCalled()
})
it('disables every control except Cancel while waiting and ignores late confirmations after cancellation', async () => {
  await create(); await click(button('选择单元格', dialog()))
  expect(dialog().textContent).toContain('等待你在文档里点击…')
  expect([...dialog().querySelectorAll<HTMLButtonElement>('button')].every(value => value.textContent?.trim() === '取消' || value.disabled)).toBe(true)
  expect(dialog().querySelector('[aria-label=关闭]')).toBeNull()
  const first = captures[0]; await click(button('取消', dialog()))
  expect(first.cancel).toHaveBeenCalledOnce()
  await act(async () => first.late({ type: 'confirmed', cell: 'Z99' }))
  expect(dialog().textContent).not.toContain('Z99')
  expect(button('保存', dialog()).disabled).toBe(true)
})
it.each([{ type: 'timeout' } as PickEvent, { type: 'error', code: 'lost', message: '文档连接已断开' } as PickEvent])('returns to idle on $type and displays an Alert', async event => {
  await create(); await click(button('选择单元格', dialog())); await act(async () => captures[0].emit(event))
  expect(dialog().querySelector('[role=alert]')?.textContent).toContain(event.type === 'timeout' ? '超时' : '文档连接已断开')
  expect(button('选择单元格', dialog()).disabled).toBe(false)
  expect(button('保存', dialog()).disabled).toBe(true)
})
it('recognizes two supplied cells, previews three days and saves without inventing a range', async () => {
  await create(); await selectPoint(0, 'F9'); await selectPoint(1, 'G9')
  expect(adapter.startPick).toHaveBeenNthCalledWith(1, expect.any(String), '2026-11-13')
  expect(adapter.startPick).toHaveBeenNthCalledWith(2, expect.any(String), '2026-11-14')
  expect(dialog().textContent).toContain('已识别：每天向右移 1 列')
  expect(dialog().querySelectorAll('tbody tr')).toHaveLength(3)
  await click(button('保存', dialog())); await settle()
  expect(rows()[0].querySelector('[aria-label="位置已配置"] svg')).not.toBeNull()
  expect(rows()[0].textContent).not.toMatch(/起|每天|步长|日期轴/)
  expect(rows()[0].textContent).toContain('—')
  expect(rows()[0].querySelector('[role=switch]')).toBeNull()
  expect(dialog()).toBeNull()
})
it('rejects irregular points and leaves Save disabled', async () => {
  await create(); await selectPoint(0, 'F9'); await selectPoint(1, 'G10')
  expect(dialog().textContent).toContain('两个位置没有规律，请重新选择')
  expect(button('保存', dialog()).disabled).toBe(true)
})
it('edits through the same wizard, keeps the saved position when reselecting is cancelled, and excludes deletion', async () => {
  await mount([configured]); await click(rows()[0])
  expect(dialog().querySelector('[data-slot=dialog-title]')?.textContent).toBe('编辑业务')
  expect(button('删除业务', dialog())).toBeUndefined()
  await changeName('修改后名称'); await next()
  expect(dialog().textContent).toContain('F9 起 · 每天向右移 1 列')
  await click(button('重新选取位置', dialog()))
  expect(button('保存', dialog()).disabled).toBe(true)
  await click(button('取消重新选取', dialog()))
  expect(button('保存', dialog()).disabled).toBe(false)
  await click(dialog().querySelector<HTMLElement>('[aria-label=关闭]')!); await settle()
  expect(rows()[0].textContent).toContain('修改后名称')
  expect(rows()[0].textContent).toContain('B12:AF12')
})
it('uses a single bordered table, no enable column and the supplied range outside the success Badge', async () => {
  await mount([configured, { id: 'new', name: '未配置业务', position: { status: 'unconfigured' } }])
  const table = container.querySelector('table')!
  expect(table.parentElement?.parentElement?.className).toContain('rounded-md border')
  expect([...table.querySelectorAll('th')].map(value => value.textContent)).toEqual(['业务', '数据来源', '填报位置', '操作'])
  expect(container.querySelector('[role=switch]')).toBeNull()
  const badge = rows()[0].querySelector('[aria-label="位置已配置"]')!
  expect(badge.getAttribute('data-variant')).toBe('outline')
  expect(badge.querySelector('svg')).not.toBeNull()
  expect(badge.textContent).toBe('')
  expect(badge.nextElementSibling?.textContent).toBe('B12:AF12')
  expect(rows()[0].textContent).not.toMatch(/F9|起|每天|✓/)
  expect(rows()[1].querySelector('[data-slot=badge]')?.textContent).toBe('未设置位置')
})
it('starts reselecting from the row menu and requires confirmation before deletion', async () => {
  await mount([configured]); await menu(0, '重新选取位置')
  expect(dialog().querySelector('[data-slot=dialog-title]')?.textContent).toBe('设置填报位置')
  expect(button('保存', dialog()).disabled).toBe(true)
  await click(dialog().querySelector<HTMLElement>('[aria-label=关闭]')!); await settle()
  await menu(0, '删除'); const confirm = document.querySelector<HTMLElement>('[role=alertdialog]')!
  expect(confirm.textContent).toContain('已有业务'); expect(rows()).toHaveLength(1)
  await click(button('取消', confirm)); await settle(); expect(rows()).toHaveLength(1)
  await menu(0, '删除'); await click(button('删除业务', document.querySelector('[role=alertdialog]')!)); await settle()
  expect(rows()).toHaveLength(0); expect(container.querySelector('[data-slot=empty]')).not.toBeNull()
  expect(document.activeElement).toBe(button('新建业务', container))
})
it('does not save a cancelled first step and keeps row keyboard editing accessible', async () => {
  await mount([configured]); await act(async () => rows()[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true })))
  await changeName('丢弃名称'); await click(button('取消', dialog())); await settle()
  expect(rows()[0].textContent).toContain('已有业务'); expect(rows()[0].textContent).not.toContain('丢弃名称')
  expect(document.activeElement).toBe(rows()[0])
})
