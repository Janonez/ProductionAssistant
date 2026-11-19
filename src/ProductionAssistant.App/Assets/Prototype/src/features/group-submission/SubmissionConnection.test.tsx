import { act, useState } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { toast } from 'sonner'
import { SubmissionConnection } from './SubmissionConnection'
import { DocumentConnectionItem, documentLink, type ConnectionStatus, type DocumentSessionEvidence } from './DocumentConnectionItem'
import type { SubmissionJob } from './types'
import { migrateLegacyConnections } from './connection-summary'

const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }))
vi.mock('../../bridge/index', () => ({ invoke }))
const firstUrl = 'https://docs.qq.com/sheet/one', secondUrl = 'https://docs.qq.com/sheet/two'
const closed: DocumentSessionEvidence = { state: 'closed', browserOpen: false, authentication: 'unknown', documentAccess: 'unknown', editPermission: 'unknown', verifiedAt: null, message: '' }
const connected: DocumentSessionEvidence = { state: 'authenticated', browserOpen: true, authentication: 'authenticated', authenticationSource: 'server', authenticationObservedAt: '2026-11-16T01:30:00Z', documentAccess: 'allowed', editPermission: 'editable', verifiedAt: '2026-11-16T01:30:00Z', documentCheckedAt: '2026-11-16T01:30:00Z', documentType: 'spreadsheet', documentIdentity: firstUrl, targetDocumentUrl: firstUrl, documentName: '集团日报', message: '' }
const initialSummary = { state: 'NotConnected', configRevision: 8, confirmedAt: undefined as string | undefined, documentName: undefined as string | undefined }
const connectedSummary = { ...initialSummary, state: 'Connected', confirmedAt: connected.documentCheckedAt!, documentName: '集团日报' }
let summary: typeof initialSummary
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
  localStorage.clear()
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
  summary = { ...initialSummary }
  invoke.mockReset().mockImplementation(async operation => operation === 'tencentSheet.getConnectionSummary' ? summary : closed)
  vi.spyOn(toast, 'success').mockReturnValue('success')
  vi.spyOn(toast, 'error').mockReturnValue('error')
  ready.mockClear(); active.mockClear(); dirty.mockClear()
  container = document.createElement('div'); document.body.append(container); root = createRoot(container)
})
afterEach(async () => { await act(async () => root.unmount()); container.remove(); vi.restoreAllMocks(); vi.unstubAllGlobals() })

it.each([
  ['unconfigured', '', '连接'], ['loadingSummary', '读取连接状态…', undefined], ['notConnected', '未连接', '连接'], ['checking', '检测中…', undefined],
  ['connected', '已连接', '打开文档'], ['notLoggedIn', '需要重新登录', '扫码登录'],
  ['invalidLink', '不是表格链接', '更换文档'], ['readOnly', '只读', '打开文档'], ['accessDenied', '无编辑权限', '重新检测'],
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
  expect(invoke).toHaveBeenCalledTimes(1); expect(invoke).toHaveBeenCalledWith('tencentSheet.create', { documentUrl: secondUrl, requestId: expect.stringMatching(/^[a-f0-9]{32}$/) })
  await act(async () => resolve({ id: 'new' }))
  expect(invoke).toHaveBeenCalledWith('tencentSheet.sessionVerify', { documentUrl: secondUrl, id: 'new', configRevision: 0 }, 60000)
  expect(container.querySelector('[data-connection-state=connected]')).toBeNull()
})

it('reads the Sidecar summary and uses the returned name and confirmation age', async () => {
  summary = connectedSummary
  await mount()
  expect(invoke.mock.calls).toEqual([['tencentSheet.getConnectionSummary', { id: 'one' }]])
  expect(container.querySelector('[aria-label="文档名称"]')?.textContent).toBe('集团日报')
  expect(container.querySelector('[data-slot=badge]')?.textContent).toMatch(/已连接 · .*确认/)
  expect(ready).toHaveBeenLastCalledWith(true)
  await click(button('打开文档'))
  expect(invoke).toHaveBeenCalledWith('tencentSheet.sessionOpen', { id: 'one', documentUrl: firstUrl, configRevision: 8 }, 60000)
})
it('refreshes from Sidecar on remount and focus without probing Tencent', async () => {
  summary = connectedSummary
  await mount()
  await act(async () => root.unmount())
  root = createRoot(container)
  invoke.mockClear()
  await mount()
  expect(ready).toHaveBeenLastCalledWith(true)
  summary = { ...initialSummary, state: 'NeedsLogin' }
  await act(async () => window.dispatchEvent(new Event('focus')))
  expect(container.querySelector('[data-connection-state=notLoggedIn]')?.textContent).toContain('需要重新登录')
  expect(invoke.mock.calls.map(([operation]) => operation)).toEqual(['tencentSheet.getConnectionSummary', 'tencentSheet.getConnectionSummary'])
})
it('keeps editing available after temporary errors and shows explicit denial from Sidecar', async () => {
  summary = connectedSummary
  await mount()
  invoke.mockRejectedValueOnce(new Error('temporary'))
  await menu('重新检测')
  expect(container.querySelector('[data-connection-state=connected]')).not.toBeNull()
  expect(ready).toHaveBeenLastCalledWith(true)
  summary = { ...initialSummary, state: 'AccessDenied' }
  await menu('重新检测')
  expect(container.querySelector('[data-connection-state=accessDenied]')?.textContent).toContain('无编辑权限')
})
it.each([undefined, '', '   '])('uses 腾讯文档 if title retrieval returns %j', async documentName => {
  summary = { ...connectedSummary, documentName }
  await mount()
  expect(container.querySelector('[aria-label="文档名称"]')?.textContent).toBe('腾讯文档')
  expect(container.querySelector('[data-connection-state=connected]')).not.toBeNull()
})
it('imports the original timestamp and deletes the legacy keys only after acknowledgement', async () => {
  const key = 'pa.submission.last-connection.one'
  const legacy = JSON.stringify({ revision: 8, checkedAt: connected.documentCheckedAt, documentName: '日报' })
  localStorage.setItem(key, legacy)
  localStorage.setItem('another.preference', 'keep')
  invoke.mockRejectedValueOnce(new Error('Sidecar unavailable'))
  await expect(migrateLegacyConnections(localStorage)).rejects.toThrow('Sidecar unavailable')
  expect(localStorage.getItem(key)).not.toBeNull()

  invoke.mockResolvedValueOnce({ acknowledged: false })
  await expect(migrateLegacyConnections(localStorage)).rejects.toThrow('旧连接摘要尚未确认迁移')
  expect(localStorage.getItem(key)).toBe(legacy)

  let acknowledge!: (result: { acknowledged: boolean }) => void
  invoke.mockImplementationOnce(() => new Promise(resolve => { acknowledge = resolve }))
  const migrating = migrateLegacyConnections(localStorage)
  expect(invoke).toHaveBeenLastCalledWith('tencentSheet.importConnectionSummaries', { entries: [{
    taskId: 'one', configRevision: 8, checkedAt: connected.documentCheckedAt, documentName: '日报',
  }] })
  expect(localStorage.getItem(key)).toBe(legacy)
  acknowledge({ acknowledged: true })
  await migrating
  expect(localStorage.getItem(key)).toBeNull()
  expect(localStorage.getItem('another.preference')).toBe('keep')
  invoke.mockClear()
  await migrateLegacyConnections(localStorage)
  expect(invoke).not.toHaveBeenCalled()
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
  summary = connectedSummary; await mount(); await menu()
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
  expect(container.querySelector('#submission-document-url')).toBeNull()
  expect(invoke.mock.calls.some(([operation]) => operation === 'tencentSheet.save')).toBe(false)
  await menu('更换文档'); await change(secondUrl)
  invoke.mockImplementation(async (operation, payload) => operation === 'tencentSheet.save' ? { id: 'one', configRevision: 9, config: { documentUrl: payload.config.documentUrl } } : operation === 'tencentSheet.getConnectionSummary' ? { ...initialSummary, configRevision: 9 } : connected)
  await act(async () => { submit(); submit() })
  expect(invoke.mock.calls.filter(([operation]) => operation === 'tencentSheet.save')).toHaveLength(1)
  expect(invoke).toHaveBeenCalledWith('tencentSheet.save', { id: 'one', config: { documentUrl: secondUrl }, configRevision: 8 })
  expect(invoke).toHaveBeenCalledWith('tencentSheet.sessionVerify', { documentUrl: secondUrl, id: 'one', configRevision: 9 }, 60000)
})
it('retains the draft and original configuration when saving fails', async () => {
  await mount(); await menu('更换文档'); await change(secondUrl)
  invoke.mockRejectedValueOnce(new Error('配置已变化'))
  await act(async () => { submit() })
  expect(container.querySelector<HTMLInputElement>('input')?.value).toBe(secondUrl)
  expect(toast.error).toHaveBeenCalledWith(expect.stringContaining('配置已变化'))
  await click(button('取消')); await menu('更换文档')
  expect(container.querySelector<HTMLInputElement>('input')?.value).toBe(firstUrl)
})
it('suppresses duplicate checks while showing a Spinner and no primary action', async () => {
  await mount()
  let resolve!: (value: DocumentSessionEvidence) => void
  invoke.mockImplementationOnce(() => new Promise(done => { resolve = done }))
  const before = invoke.mock.calls.length
  await act(async () => { button('连接').click(); button('连接')?.click(); window.dispatchEvent(new Event('focus')) })
  expect(invoke.mock.calls.length).toBe(before + 1)
  expect(button('连接')).toBeUndefined(); expect(button('打开文档')).toBeUndefined()
  expect(container.querySelector('[aria-label="正在检测文档连接"]')).not.toBeNull()
  summary = connectedSummary
  await act(async () => resolve(connected)); expect(ready).toHaveBeenLastCalledWith(true)
})
it('opens a Metis QR dialog without opening Edge for login', async () => {
  summary = { ...initialSummary, state: 'NeedsLogin' }
  await mount(); await click(button('扫码登录'))
  expect(document.querySelector('[role=dialog]')?.textContent).toContain('扫码登录腾讯文档')
  expect(invoke).toHaveBeenCalledWith('tencentSheet.sessionLoginBegin', { documentUrl: firstUrl, id: 'one', configRevision: 8 }, 35000)
  expect(invoke.mock.calls.some(([operation]) => operation === 'tencentSheet.sessionOpen')).toBe(false)
  expect(ready).toHaveBeenLastCalledWith(false)
})
it('keeps the unconnected display and connect entry after an incomplete detection', async () => {
  await mount()
  invoke.mockResolvedValueOnce({ ...closed, state: 'unavailable', code: 'SessionTimeout', message: '检测超时' })
  await click(button('连接'))
  expect(container.querySelector('[data-slot=badge]')?.textContent).toBe('未连接')
  expect(ready).toHaveBeenLastCalledWith(false)
  expect(button('连接')).toBeDefined()
})
it('requires confirmation of shared scope before clearing and preserves the saved document', async () => {
  await mount(); await menu('清除登录状态')
  const dialog = document.querySelector('[role=alertdialog]')!
  expect(dialog.textContent).toContain('全部腾讯文档和旧任务')
  expect(dialog.textContent).toContain('登录资料及缓存')
  expect(button('清除登录状态', dialog).disabled).toBe(false)
  expect(invoke.mock.calls.some(([operation]) => operation === 'tencentSheet.sessionClear')).toBe(false)
  await click(button('取消', dialog)); await settle()
  await menu('更换文档'); expect(container.querySelector<HTMLInputElement>('input')?.value).toBe(firstUrl)
})
it('shows clear success only for backend acknowledgement and keeps the document configuration', async () => {
  const normal = invoke.getMockImplementation()!
  summary = connectedSummary
  invoke.mockImplementation(async operation => {
    if (operation !== 'tencentSheet.sessionClear') return normal(operation)
    summary = { ...initialSummary, state: 'NeedsLogin' }
    return { ...closed, code: 'LoginCleared' }
  })
  await mount(); await menu('清除登录状态')
  await click(button('清除登录状态', document.querySelector('[role=alertdialog]')!))
  expect(invoke).toHaveBeenCalledWith('tencentSheet.sessionClear', { documentUrl: firstUrl, id: 'one', configRevision: 8, confirmClear: true }, 60000)
  expect(container.querySelector('[data-slot=badge]')?.textContent).toBe('需要重新登录')
  expect(toast.success).toHaveBeenCalledWith('登录资料及专属浏览器缓存已清空')
  await menu('更换文档'); expect(container.querySelector<HTMLInputElement>('input')?.value).toBe(firstUrl)
})
it('keeps the persisted confirmation after an unacknowledged clear', async () => {
  summary = connectedSummary
  const normal = invoke.getMockImplementation()!
  invoke.mockImplementation(async operation => operation === 'tencentSheet.sessionClear'
    ? { ...closed, state: 'unavailable', code: 'ClearIncomplete', message: '清除结果尚未确认。' } : normal(operation))
  await mount(); await menu('清除登录状态')
  await click(button('清除登录状态', document.querySelector('[role=alertdialog]')!))
  expect(container.querySelector('[data-connection-state=connected]')).not.toBeNull()
  expect(ready).toHaveBeenLastCalledWith(true)
  expect(toast.success).not.toHaveBeenCalled()
})
it('ignores a late connection result after the target changes or unmounts', async () => {
  let resolve!: (value: typeof connectedSummary) => void
  invoke.mockImplementationOnce(() => new Promise(done => { resolve = done }))
  const render = (url: string) => <SubmissionConnection job={{ id: 'one', config: { documentUrl: url } }} onSaved={vi.fn()} onCreated={vi.fn()} onActive={active} onDirty={dirty} onReady={ready} />
  await act(async () => root.render(render(firstUrl)))
  await act(async () => root.render(render(secondUrl)))
  await act(async () => resolve({ ...connectedSummary, configRevision: 0 }))
  expect(container.querySelector('[data-connection-state=connected]')).toBeNull(); expect(ready).toHaveBeenLastCalledWith(false)
})
it.each(['', 'https://docs.qq.com/', 'https://docs.qq.com/doc/one', 'http://docs.qq.com/sheet/one', 'https://docs.qq.com.evil.invalid/sheet/one', 'https://user:secret@docs.qq.com/sheet/one', 'https://docs.qq.com:8080/sheet/one'])('rejects invalid or unsafe sheet URLs: %s', value => expect(documentLink(value)).toBeUndefined())
it('accepts the two existing HTTPS document hosts', () => {
  expect(documentLink(' ' + firstUrl + ' ')).toBe(firstUrl)
  expect(documentLink('https://doc.weixin.qq.com/sheet/one')).toBe('https://doc.weixin.qq.com/sheet/one')
  expect(documentLink('https://DOCS.QQ.COM:443/sheet/one')).toBe(firstUrl)
})
