import { act, useState } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { toast } from 'sonner'
import { SubmissionConnection } from './SubmissionConnection'
import { DocumentConnectionItem, connectionFromSession, documentLink, type ConnectionStatus, type DocumentSessionEvidence } from './DocumentConnectionItem'
import type { SubmissionJob } from './types'

const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }))
vi.mock('../../bridge/index', () => ({ invoke }))
const firstUrl = 'https://docs.qq.com/sheet/one', secondUrl = 'https://docs.qq.com/sheet/two'
const closed: DocumentSessionEvidence = { state: 'closed', browserOpen: false, authentication: 'unknown', documentAccess: 'unknown', editPermission: 'unknown', verifiedAt: null, message: '' }
const connected: DocumentSessionEvidence = { state: 'authenticated', browserOpen: true, authentication: 'authenticated', authenticationSource: 'server', documentAccess: 'allowed', editPermission: 'editable', verifiedAt: '2026-11-16T01:30:00Z', documentName: '集团日报', message: '' }
let root: Root, container: HTMLDivElement
const ready = vi.fn(), active = vi.fn(), dirty = vi.fn()
const button = (name: string, parent: ParentNode = document) => [...parent.querySelectorAll<HTMLButtonElement>('button')].find(element => element.textContent?.trim() === name)!
const click = async (element: HTMLElement) => act(async () => { element.focus(); element.click() })
const settle = async () => act(async () => { await new Promise(resolve => setTimeout(resolve, 0)) })
const change = async (value: string) => act(async () => {
  const input = container.querySelector<HTMLInputElement>('#submission-document-url')!
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, value)
  input.dispatchEvent(new Event('input', { bubbles: true }))
})
const submit = () => container.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
async function menu(name?: string) {
  const trigger = container.querySelector<HTMLButtonElement>('[aria-label="文档更多操作"]')!
  await act(async () => { trigger.focus(); trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true })) }); await settle()
  if (name) { await click([...document.querySelectorAll<HTMLElement>('[role=menuitem]')].find(element => element.textContent === name)!); await settle() }
}
function Harness({ initial = firstUrl }: { initial?: string }) {
  const [job, setJob] = useState<SubmissionJob | undefined>(initial ? { id: 'one', configRevision: 8, config: { documentUrl: initial } } : undefined)
  return <SubmissionConnection job={job} onSaved={setJob} onCreated={id => setJob({ id, config: { documentUrl: secondUrl } })} onActive={active} onDirty={dirty} onReady={ready} />
}
const mount = async (initial = firstUrl) => act(async () => root.render(<Harness initial={initial} />))
beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
  invoke.mockReset().mockResolvedValue(closed)
  vi.spyOn(toast, 'success').mockReturnValue('success')
  vi.spyOn(toast, 'error').mockReturnValue('error')
  ready.mockClear(); active.mockClear(); dirty.mockClear()
  container = document.createElement('div'); document.body.append(container); root = createRoot(container)
})
afterEach(async () => { await act(async () => root.unmount()); container.remove(); vi.restoreAllMocks(); vi.unstubAllGlobals() })

it.each([
  ['unconfigured', '', '连接'], ['idle', '未检测', '检测'], ['checking', '检测中', undefined],
  ['connected', '已连接', '打开文档'], ['notLoggedIn', '登录已失效', '扫码登录'],
  ['invalidLink', '不是表格链接', '更换文档'], ['readOnly', '只有查看权限', '打开文档'], ['unavailable', '无法打开', '重新检测'],
] as [ConnectionStatus, string, string | undefined][])('renders %s in the same outline Item with exactly its primary action', async (state, badge, primary) => {
  const action = vi.fn()
  await act(async () => root.render(<DocumentConnectionItem connection={{ state, documentName: '很长的集团日报名称'.repeat(30) }} url={state === 'unconfigured' ? '' : firstUrl} draft="" editing={state === 'unconfigured'} busy={state === 'checking'} onDraft={vi.fn()} onAction={action} onCancel={vi.fn()} onCopy={vi.fn()} onClear={vi.fn()} />))
  const item = container.querySelector<HTMLElement>('[data-slot=item]')!
  expect(item.dataset.variant).toBe('outline'); expect(item.className).toContain('h-14')
  expect(item.querySelector('[data-slot=item-media]')?.getAttribute('data-variant')).toBe('default')
  expect(item.querySelector('[data-slot=item-media] svg')?.getAttribute('class')).toContain('size-5')
  expect(item.querySelector('[data-slot=badge]')?.textContent ?? '').toBe(badge)
  const actions = [...item.querySelectorAll<HTMLButtonElement>('[data-slot=item-actions] > button')].filter(element => element.getAttribute('aria-label') !== '文档更多操作')
  expect(actions).toHaveLength(primary ? 1 : 0)
  if (primary) expect(actions[0].textContent).toBe(primary)
  if (state === 'checking') expect(item.querySelector('[data-slot=badge] [aria-label="正在检测文档连接"]')).not.toBeNull()
  if (state !== 'unconfigured') expect(item.querySelector('[aria-label="文档名称"]')?.className).toContain('truncate')
})

it('disables empty and whitespace URLs, permits a valid URL and submits once via the form', async () => {
  await mount('')
  expect(container.querySelector('input')?.placeholder).toBe('粘贴腾讯文档链接')
  expect(button('连接').disabled).toBe(true)
  await change('   '); expect(button('连接').disabled).toBe(true)
  await change(secondUrl); expect(button('连接').disabled).toBe(false)
  let resolve!: (value: { id: string }) => void
  invoke.mockImplementationOnce(() => new Promise(done => { resolve = done }))
  await act(async () => { submit(); submit() })
  expect(invoke).toHaveBeenCalledTimes(1); expect(invoke).toHaveBeenCalledWith('tencentSheet.create', { documentUrl: secondUrl })
  await act(async () => resolve({ id: 'new' }))
  expect(invoke).toHaveBeenCalledWith('tencentSheet.sessionStatus', { documentUrl: secondUrl }, 60000)
  expect(container.querySelector('[data-connection-state=connected]')).toBeNull()
})

it('reads the existing saved-document status and uses the returned real name', async () => {
  invoke.mockResolvedValue(connected); await mount()
  expect(invoke).toHaveBeenCalledWith('tencentSheet.sessionStatus', { documentUrl: firstUrl }, 60000)
  expect(container.querySelector('[aria-label="文档名称"]')?.textContent).toBe('集团日报')
  expect(ready).toHaveBeenLastCalledWith(true)
  await click(button('打开文档'))
  expect(invoke).toHaveBeenLastCalledWith('tencentSheet.sessionOpen', { documentUrl: firstUrl }, 60000)
})
it.each([undefined, '', '   '])('uses 腾讯文档 if title retrieval returns %j', async documentName => {
  invoke.mockResolvedValue({ ...connected, documentName }); await mount()
  expect(container.querySelector('[aria-label="文档名称"]')?.textContent).toBe('腾讯文档')
  expect(container.querySelector('[data-connection-state=connected]')).not.toBeNull()
})
it('keeps the complete URL in the keyboard-accessible Tooltip', async () => {
  await mount()
  const title = container.querySelector<HTMLElement>('[aria-label="文档名称"]')!
  await act(async () => title.focus())
  await act(async () => { await new Promise(resolve => setTimeout(resolve, 750)) })
  expect(document.querySelector('[role=tooltip]')?.textContent).toBe(firstUrl)
})
it('offers the four ordered actions and copies the complete URL without changing connection state', async () => {
  const writeText = vi.fn().mockResolvedValue(undefined)
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } })
  invoke.mockResolvedValue(connected); await mount(); await menu()
  expect([...document.querySelectorAll('[role=menuitem]')].map(element => element.textContent)).toEqual(['重新检测', '更换文档', '复制链接', '清除登录状态'])
  await click([...document.querySelectorAll<HTMLElement>('[role=menuitem]')].find(element => element.textContent === '复制链接')!)
  expect(writeText).toHaveBeenCalledWith(firstUrl)
  expect(toast.success).toHaveBeenCalledWith('链接已复制')
  expect(container.querySelector('[data-connection-state=connected]')).not.toBeNull()
})
it('can edit and cancel without changing the persisted URL, then saves with the revision and verifies the new URL', async () => {
  await mount(); await menu('更换文档')
  expect(container.querySelector<HTMLInputElement>('input')?.value).toBe(firstUrl)
  await change(secondUrl); await click(button('取消'))
  expect(container.querySelector('input')).toBeNull()
  expect(invoke.mock.calls.some(([operation]) => operation === 'tencentSheet.save')).toBe(false)
  await menu('更换文档'); await change(secondUrl)
  invoke.mockImplementation(async (operation, payload) => operation === 'tencentSheet.save' ? { id: 'one', configRevision: 9, config: { documentUrl: payload.config.documentUrl } } : connected)
  await act(async () => { submit(); submit() })
  expect(invoke.mock.calls.filter(([operation]) => operation === 'tencentSheet.save')).toHaveLength(1)
  expect(invoke).toHaveBeenCalledWith('tencentSheet.save', { id: 'one', config: { documentUrl: secondUrl }, configRevision: 8 })
  expect(invoke).toHaveBeenCalledWith('tencentSheet.sessionStatus', { documentUrl: secondUrl }, 60000)
})
it('retains the draft and original configuration when saving fails', async () => {
  await mount(); await menu('更换文档'); await change(secondUrl)
  invoke.mockRejectedValueOnce(new Error('配置已变化'))
  await act(async () => { submit() })
  expect(container.querySelector<HTMLInputElement>('input')?.value).toBe(secondUrl)
  expect(toast.error).toHaveBeenCalledWith('配置已变化')
  await click(button('取消')); await menu('更换文档')
  expect(container.querySelector<HTMLInputElement>('input')?.value).toBe(firstUrl)
})
it('suppresses duplicate checks while showing a Spinner and no primary action', async () => {
  await mount()
  let resolve!: (value: DocumentSessionEvidence) => void
  invoke.mockImplementationOnce(() => new Promise(done => { resolve = done }))
  const before = invoke.mock.calls.length
  await act(async () => { button('检测').click(); button('检测')?.click(); window.dispatchEvent(new Event('focus')) })
  expect(invoke.mock.calls.length).toBe(before + 1)
  expect(button('检测')).toBeUndefined(); expect(button('打开文档')).toBeUndefined()
  expect(container.querySelector('[aria-label="正在检测文档连接"]')).not.toBeNull()
  await act(async () => resolve(connected)); expect(ready).toHaveBeenLastCalledWith(true)
})
it('uses the same session for QR login and re-verifies on returning to the app', async () => {
  invoke.mockResolvedValue({ ...closed, browserOpen: true, state: 'login-required', authentication: 'required' })
  await mount(); await click(button('扫码登录'))
  expect(invoke).toHaveBeenLastCalledWith('tencentSheet.sessionOpen', { documentUrl: firstUrl }, 60000)
  invoke.mockResolvedValue(connected)
  await act(async () => window.dispatchEvent(new Event('focus')))
  expect(invoke).toHaveBeenLastCalledWith('tencentSheet.sessionVerify', { documentUrl: firstUrl }, 60000)
  expect(ready).toHaveBeenLastCalledWith(true)
})
it('explains the unavailable shared-session clearing action without calling a new backend operation', async () => {
  await mount(); await menu('清除登录状态')
  const dialog = document.querySelector('[role=alertdialog]')!
  expect(dialog.textContent).toContain('当前版本暂不支持清除登录状态')
  expect(dialog.textContent).toContain('多个腾讯文档可能共用')
  expect(button('清除登录状态', dialog).disabled).toBe(true)
  await click(button('清除登录状态', dialog))
  expect(invoke.mock.calls.some(([operation]) => operation === 'tencentSheet.sessionClear')).toBe(false)
  await click(button('取消', dialog)); await settle()
  await menu('更换文档'); expect(container.querySelector<HTMLInputElement>('input')?.value).toBe(firstUrl)
})
it.each([
  { ...connected, editPermission: 'read-only' }, { ...connected, editPermission: 'unknown' },
  { ...connected, authenticationSource: null }, { ...connected, authentication: 'unknown' }, { ...connected, verifiedAt: null },
  { ...connected, browserOpen: false }, { ...connected, documentAccess: 'denied', state: 'access-denied' },
] as DocumentSessionEvidence[])('never enables picking for incomplete or read-only evidence %j', async result => {
  invoke.mockResolvedValue(result); await mount()
  expect(ready).toHaveBeenLastCalledWith(false)
  expect(connectionFromSession(result).state).not.toBe('connected')
})
it('ignores a late connection result after the target changes or unmounts', async () => {
  let resolve!: (value: DocumentSessionEvidence) => void
  invoke.mockImplementationOnce(() => new Promise(done => { resolve = done }))
  const render = (url: string) => <SubmissionConnection job={{ id: 'one', config: { documentUrl: url } }} onSaved={vi.fn()} onCreated={vi.fn()} onActive={active} onDirty={dirty} onReady={ready} />
  await act(async () => root.render(render(firstUrl)))
  await act(async () => root.render(render(secondUrl)))
  await act(async () => resolve(connected))
  expect(container.querySelector('[data-connection-state=connected]')).toBeNull(); expect(ready).toHaveBeenLastCalledWith(false)
})
it.each(['', 'https://docs.qq.com/', 'https://docs.qq.com/doc/one', 'http://docs.qq.com/sheet/one', 'https://docs.qq.com.evil.invalid/sheet/one', 'https://user:secret@docs.qq.com/sheet/one', 'https://docs.qq.com:8080/sheet/one'])('rejects invalid or unsafe sheet URLs: %s', value => expect(documentLink(value)).toBeUndefined())
it('accepts the two existing HTTPS document hosts', () => {
  expect(documentLink(' ' + firstUrl + ' ')).toBe(firstUrl)
  expect(documentLink('https://doc.weixin.qq.com/sheet/one')).toBe('https://doc.weixin.qq.com/sheet/one')
  expect(documentLink('https://DOCS.QQ.COM:443/sheet/one')).toBe(firstUrl)
})
