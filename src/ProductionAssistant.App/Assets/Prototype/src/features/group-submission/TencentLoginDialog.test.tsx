import { act, useState } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { TencentLoginDialog } from './TencentLoginDialog'

const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }))
vi.mock('../../bridge/index', () => ({ invoke }))
const url = 'https://docs.qq.com/sheet/fixture'
const verified = vi.fn()
let root: Root, container: HTMLDivElement
const evidence = (loginState: string) => ({
  state: 'login-required', browserOpen: true, authentication: 'required', loginState,
  loginOperationId: 'synthetic-login', targetDocumentUrl: url, loginWaitUntil: new Date(Date.now() + 120000).toISOString(),
})
const qr = () => ({ ...evidence('waiting'), qrImage: 'data:image/png;base64,c3ludGhldGlj' })
const operations = () => invoke.mock.calls.map(([operation]) => operation)
const checkbox = () => document.querySelector<HTMLButtonElement>('[role="checkbox"]')
const phase = () => document.querySelector('[aria-label="二维码区域"]')?.getAttribute('data-phase')
const button = (label: string) => [...document.querySelectorAll<HTMLButtonElement>('button')].find(el => el.textContent === label)!
const mount = () => act(async () => root.render(<Harness />))
const tick = (ms: number) => act(async () => { await vi.advanceTimersByTimeAsync(ms) })
function Harness() {
  const [open, setOpen] = useState(true)
  return <TencentLoginDialog open={open} documentUrl={url} onOpenChange={setOpen} onVerified={verified} />
}

beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true); vi.useFakeTimers(); verified.mockClear()
  invoke.mockReset().mockImplementation(async (operation: string) => operation.endsWith('Begin') ? qr() : evidence('waiting'))
  container = document.createElement('div'); document.body.append(container); root = createRoot(container)
})
afterEach(async () => { await act(async () => root.unmount()); container.remove(); vi.useRealTimers(); vi.restoreAllMocks(); vi.unstubAllGlobals() })

it('keeps a fixed QR area through scanned, confirming and server authentication without regenerating a QR', async () => {
  await mount()
  expect(document.querySelector('img[alt="企业微信登录二维码"]')).not.toBeNull()
  expect(checkbox()?.getAttribute('aria-checked')).toBe('true')
  expect(checkbox()?.disabled).toBe(true)
  expect(document.body.textContent).not.toContain('剩余')
  const region = document.querySelector('[aria-label="二维码区域"]')!
  expect(region.classList.contains('size-[212px]')).toBe(true)
  invoke.mockResolvedValueOnce(evidence('scanned')).mockResolvedValueOnce(evidence('confirming')).mockResolvedValueOnce({
    ...evidence('authenticated'), authentication: 'authenticated', authenticationSource: 'server', editPermission: 'unknown',
  })
  await tick(750)
  expect(phase()).toBe('scanned')
  expect(region.textContent).toBe('已扫码请在手机上确认')
  expect(region.querySelector('img, [aria-label="正在获取二维码"]')).toBeNull()
  expect(button('刷新')).toBeUndefined()
  await tick(750)
  expect(phase()).toBe('confirming')
  expect(region.textContent).toBe('已扫码')
  expect(region.querySelector('[aria-label="已扫码"]')).not.toBeNull()
  expect(region.querySelector('img, [data-slot=skeleton]')).toBeNull()
  expect(verified).not.toHaveBeenCalled()
  await tick(250)
  expect(phase()).toBe('authenticated')
  expect(region.textContent).toBe('登录成功')
  expect(button('完成')).toBeDefined()
  expect(verified).toHaveBeenCalledTimes(1)
  expect(verified).toHaveBeenCalledWith(expect.objectContaining({ editPermission: 'unknown' }))
  expect(document.querySelector('[aria-label="二维码区域"]')).toBe(region)
  await tick(900)
  expect(document.querySelector('[role=dialog]')).toBeNull()
  expect(operations()).toEqual([
    'tencentSheet.sessionLoginBegin', 'tencentSheet.sessionLoginStatus', 'tencentSheet.sessionLoginStatus', 'tencentSheet.sessionLoginStatus',
  ])
})

it('starts QR loading only after a choice, then shows a timeout and retry', async () => {
  let resolve!: (value: unknown) => void
  invoke.mockResolvedValueOnce(evidence('starting-browser')).mockResolvedValueOnce(evidence('getting-qr'))
    .mockImplementationOnce(() => new Promise(done => { resolve = done }))
  await mount()
  expect(phase()).toBe('starting-browser')
  expect(document.body.textContent).toContain('同意协议后获取二维码')
  expect(document.body.textContent).not.toContain('正在获取二维码…')
  expect(checkbox()?.disabled).toBe(false)
  await act(async () => checkbox()!.click())
  expect(document.body.textContent).toContain('正在获取二维码…')
  await tick(1)
  expect(document.body.textContent).toContain('正在获取二维码…')
  await tick(5000)
  expect(document.body.textContent).toContain('正在获取二维码…')
  await act(async () => resolve({ ...evidence('timeout'), message: '获取二维码超时，请重试。' }))
  expect(document.body.textContent).toContain('扫码登录超时')
  invoke.mockResolvedValueOnce(qr())
  await act(async () => button('重试').click())
  expect(operations().at(-1)).toBe('tencentSheet.sessionLoginRefresh')
  expect(phase()).toBe('waiting')
})

it('accepts the agreement while prewarming and forwards it once the Worker asks', async () => {
  let finishOpening!: (value: unknown) => void
  invoke.mockImplementationOnce(() => new Promise(resolve => { finishOpening = resolve }))
    .mockResolvedValueOnce(evidence('consent')).mockResolvedValueOnce(qr())
  await mount()
  expect(checkbox()?.disabled).toBe(false)
  await act(async () => checkbox()!.click())
  expect(checkbox()?.getAttribute('aria-checked')).toBe('true')
  expect(operations()).toEqual(['tencentSheet.sessionLoginBegin'])
  await act(async () => finishOpening(evidence('getting-qr')))
  await tick(5)
  expect(phase()).toBe('waiting')
  expect(operations()).toEqual(['tencentSheet.sessionLoginBegin', 'tencentSheet.sessionLoginStatus', 'tencentSheet.sessionLoginConsent'])
})

it('cancels and releases the image when closed and stops observing', async () => {
  await mount()
  await act(async () => button('取消').click())
  expect(invoke).toHaveBeenCalledWith('tencentSheet.sessionLoginCancel', { documentUrl: url, loginOperationId: 'synthetic-login' }, 15000)
  await tick(5000)
  expect(operations().some(operation => operation.endsWith('Status'))).toBe(false)
  expect(document.querySelector('img')).toBeNull()
})

it('cancels a late Begin after unmount without displaying it', async () => {
  let resolve!: (value: unknown) => void
  invoke.mockImplementationOnce(() => new Promise(done => { resolve = done }))
  await mount()
  await act(async () => root.render(null))
  await act(async () => resolve(qr()))
  expect(invoke).toHaveBeenCalledWith('tencentSheet.sessionLoginCancel', { documentUrl: url, loginOperationId: 'synthetic-login' }, 15000)
  expect(verified).not.toHaveBeenCalled()
})

it('locks the checkbox during QR loading and preserves the explicit choice on refresh', async () => {
  let showQr!: (value: unknown) => void
  invoke.mockImplementation(async (operation: string) => {
    if (operation.endsWith('Begin')) return evidence('consent')
    if (operation.endsWith('Consent')) return new Promise(resolve => { showQr = resolve })
    if (operation.endsWith('Refresh')) return qr()
    return {}
  })
  await mount()
  const area = document.querySelector('[aria-label="二维码区域"]')!
  expect(area.classList.contains('rounded-[12px]')).toBe(true)
  const title = document.querySelector('[data-slot=dialog-title]')!
  expect(title.compareDocumentPosition(area) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  expect(title.classList.contains('h-11')).toBe(true)
  expect(area.textContent).toBe('同意协议后获取二维码')
  expect(area.classList.contains('border-dashed')).toBe(true)
  const promptClasses = area.querySelector('span')?.className
  expect(area.querySelector('[data-slot=skeleton]')).toBeNull()
  expect(checkbox()?.getAttribute('aria-checked')).toBe('false')
  expect(document.querySelector('img')).toBeNull()
  await tick(30000)
  expect(operations()).toEqual(['tencentSheet.sessionLoginBegin'])
  const link = document.querySelector<HTMLAnchorElement>('a[href^="https://docs.qq.com/doc/p/"]')!
  expect(link.textContent).toBe('《用户协议》')
  await act(async () => link.click())
  expect(invoke).toHaveBeenCalledWith('tencentSheet.sessionLoginAgreement', { kind: 'service' })
  expect(operations().some(operation => operation.endsWith('Consent'))).toBe(false)
  await act(async () => checkbox()!.click())
  expect(invoke).toHaveBeenCalledWith('tencentSheet.sessionLoginConsent', { documentUrl: url, loginOperationId: 'synthetic-login' }, 35000)
  expect(phase()).toBe('getting-qr')
  expect(checkbox()?.getAttribute('aria-checked')).toBe('true')
  expect(checkbox()?.disabled).toBe(true)
  expect(area.querySelector('[data-slot=skeleton]')?.classList.contains('size-[180px]')).toBe(true)
  expect(area.textContent).toBe('正在获取二维码…')
  expect(area.classList.contains('border-dashed')).toBe(true)
  expect(area.querySelector('span')?.className).toBe(promptClasses)
  await act(async () => showQr(qr()))
  expect(phase()).toBe('waiting')
  expect(area.classList.contains('border-dashed')).toBe(false)
  expect(area.querySelector('[data-slot=skeleton]')).toBeNull()
  expect(document.querySelector('[aria-label="二维码区域"]')).toBe(area)
  invoke.mockResolvedValueOnce(evidence('expired'))
  await tick(750)
  await act(async () => button('刷新').click())
  expect(phase()).toBe('waiting')
  expect(checkbox()?.disabled).toBe(true)
  expect(operations().filter(op => op.endsWith('Consent'))).toHaveLength(1)
})

it('can retry after a Worker restart with the same explicit agreement for this open dialog', async () => {
  invoke.mockResolvedValueOnce(evidence('consent')).mockRejectedValueOnce(new Error('transport disconnected'))
  await mount()
  await act(async () => checkbox()!.click())
  expect(phase()).toBe('failed')
  expect(checkbox()?.getAttribute('aria-checked')).toBe('true')
  invoke.mockResolvedValueOnce({ ...evidence('cancelled'), code: 'LoginSuperseded' })
    .mockResolvedValueOnce(evidence('consent')).mockResolvedValueOnce(qr())
  await act(async () => button('重试').click())
  await tick(5)
  expect(phase()).toBe('waiting')
  expect(operations().slice(-3)).toEqual(['tencentSheet.sessionLoginRefresh', 'tencentSheet.sessionLoginBegin', 'tencentSheet.sessionLoginConsent'])
  expect(checkbox()?.disabled).toBe(true)
})

it('shows a checked, locked agreement when this Profile proceeds directly to QR', async () => {
  invoke.mockResolvedValueOnce(evidence('getting-qr'))
    .mockResolvedValueOnce(evidence('getting-qr')).mockResolvedValueOnce(qr())
  await mount()
  expect(checkbox()?.getAttribute('aria-checked')).toBe('false')
  expect(checkbox()?.disabled).toBe(false)
  await tick(5)
  expect(phase()).toBe('waiting')
  expect(checkbox()?.getAttribute('aria-checked')).toBe('true')
  expect(checkbox()?.disabled).toBe(true)
  expect(operations().some(op => op.endsWith('Consent'))).toBe(false)
})

it('surfaces the agreement timeout without automatically consenting', async () => {
  const agreement = evidence('consent')
  invoke.mockResolvedValueOnce(agreement).mockResolvedValueOnce({ ...evidence('timeout'), message: '等待同意协议超时，请重试。' })
  await mount()
  await tick(120001)
  expect(document.body.textContent).toContain('扫码登录超时')
  expect(operations().some(operation => operation.endsWith('Consent'))).toBe(false)
  expect(button('重试')).toBeDefined()
})

it('shows a refresh link on expiry and gives refusal a retry', async () => {
  await mount()
  invoke.mockResolvedValueOnce(evidence('expired'))
  await tick(750)
  expect(document.querySelector('img[alt="企业微信登录二维码"]')).toBeNull()
  expect(document.body.textContent).toContain('二维码已过期')
  expect(operations().filter(op => op.endsWith('Refresh'))).toHaveLength(0)
  invoke.mockResolvedValueOnce({ ...evidence('rejected'), message: '手机端已拒绝登录。' })
  await act(async () => button('刷新').click())
  expect(phase()).toBe('rejected')
  expect(document.body.textContent).toContain('手机端已拒绝登录')
  expect(button('重试')).toBeDefined()
})
