import { act, useState } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { TencentLoginDialog } from './TencentLoginDialog'
const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }))
vi.mock('../../bridge/index', () => ({ invoke }))
const url = 'https://docs.qq.com/sheet/fixture'
const verified = vi.fn()
let root: Root, container: HTMLDivElement
const qr = () => ({ state: 'login-required', browserOpen: true, authentication: 'required', loginState: 'waiting', loginOperationId: 'synthetic-login', targetDocumentUrl: url, loginWaitUntil: new Date(Date.now() + 120000).toISOString(), qrImage: 'data:image/png;base64,c3ludGhldGlj', message: '等待扫码及手机确认。' })
function Harness() { const [open, setOpen] = useState(true); return <TencentLoginDialog open={open} documentUrl={url} onOpenChange={setOpen} onVerified={verified} /> }
beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true); vi.useFakeTimers(); verified.mockClear()
  invoke.mockReset().mockImplementation(async (operation: string) => operation.endsWith('Begin') ? qr() : { loginState: 'waiting', loginOperationId: 'synthetic-login', message: '等待扫码及手机确认。' })
  container = document.createElement('div'); document.body.append(container); root = createRoot(container)
})
afterEach(async () => { await act(async () => root.unmount()); container.remove(); vi.useRealTimers(); vi.restoreAllMocks(); vi.unstubAllGlobals() })
it('shows an in-memory QR and closes only after server authentication, even if document permission remains unknown', async () => {
  await act(async () => root.render(<Harness />))
  expect(document.querySelector('img[alt="企业微信登录二维码"]')).not.toBeNull()
  expect(verified).not.toHaveBeenCalled()
  invoke.mockImplementation(async (operation: string) => operation.endsWith('Status') ? { state: 'unverified', loginState: 'authenticated', authentication: 'authenticated', authenticationSource: 'server', targetDocumentUrl: url, editPermission: 'unknown' } : {})
  await act(async () => { await vi.advanceTimersByTimeAsync(2000) })
  expect(verified).toHaveBeenCalledTimes(1); expect(document.querySelector('[role=dialog]')).toBeNull()
  expect(invoke.mock.calls.some(([operation]) => operation === 'tencentSheet.sessionOpen')).toBe(false)
})
it('cancels and releases the image when closed and stops observing', async () => {
  await act(async () => root.render(<Harness />))
  const cancel = [...document.querySelectorAll<HTMLButtonElement>('button')].find(el => el.textContent === '取消')!
  await act(async () => cancel.click())
  expect(invoke).toHaveBeenCalledWith('tencentSheet.sessionLoginCancel', { documentUrl: url, loginOperationId: 'synthetic-login' }, 15000)
  await act(async () => { await vi.advanceTimersByTimeAsync(5000) })
  expect(invoke.mock.calls.some(([operation]) => operation.endsWith('Status'))).toBe(false)
  expect(document.querySelector('img')).toBeNull()
})
it('cancels a late Begin after unmount without displaying it', async () => {
  let resolve!: (value: unknown) => void
  invoke.mockImplementationOnce(() => new Promise(done => { resolve = done }))
  await act(async () => root.render(<Harness />)); await act(async () => root.render(null))
  await act(async () => resolve(qr()))
  expect(invoke).toHaveBeenCalledWith('tencentSheet.sessionLoginCancel', { documentUrl: url, loginOperationId: 'synthetic-login' }, 15000)
  expect(verified).not.toHaveBeenCalled()
})
it('waits for explicit agreement before starting enterprise QR and opens only the selected official agreement', async () => {
  invoke.mockImplementation(async (operation: string) => operation.endsWith('Begin') ? { ...qr(), loginState: 'consent', qrImage: undefined, message: '请确认腾讯文档协议。' } : operation.endsWith('Consent') ? qr() : {})
  await act(async () => root.render(<Harness />))
  expect(document.querySelector('img')).toBeNull()
  await act(async () => { await vi.advanceTimersByTimeAsync(30000) })
  expect(invoke.mock.calls.map(([operation]) => operation)).toEqual(['tencentSheet.sessionLoginBegin'])
  const button = (label: string) => [...document.querySelectorAll<HTMLButtonElement>('button')].find(el => el.textContent === label)!
  await act(async () => button('服务协议').click())
  expect(invoke).toHaveBeenCalledWith('tencentSheet.sessionLoginAgreement', { kind: 'service' })
  expect(invoke.mock.calls.some(([operation]) => operation.endsWith('Consent'))).toBe(false)
  await act(async () => button('同意协议并继续').click())
  expect(invoke).toHaveBeenCalledWith('tencentSheet.sessionLoginConsent', { documentUrl: url, loginOperationId: 'synthetic-login' }, 35000)
  expect(document.querySelector('img[alt="企业微信登录二维码"]')).not.toBeNull()
})
it('bounds the agreement wait without polling or automatically accepting it', async () => {
  invoke.mockImplementation(async () => ({ ...qr(), loginState: 'consent', qrImage: undefined }))
  await act(async () => root.render(<Harness />))
  await act(async () => { await vi.advanceTimersByTimeAsync(120001) })
  expect(document.body.textContent).toContain('本地等待已超时')
  expect(invoke.mock.calls.some(([operation]) => operation.endsWith('Status') || operation.endsWith('Consent'))).toBe(false)
  expect(invoke).toHaveBeenCalledWith('tencentSheet.sessionLoginCancel', { documentUrl: url, loginOperationId: 'synthetic-login' }, 15000)
})
