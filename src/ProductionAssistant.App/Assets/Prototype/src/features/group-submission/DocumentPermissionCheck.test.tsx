import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { DocumentPermissionCheck } from './DocumentPermissionCheck'
const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }))
vi.mock('../../bridge/index', () => ({ invoke }))
let root: Root, container: HTMLDivElement
const active = vi.fn(), verified = vi.fn(), url = 'https://docs.qq.com/sheet/fixture'
const response = (eligibility: 'eligible' | 'denied' | 'unknown', reason: string) => ({ state: 'authenticated', browserOpen: true, authentication: 'authenticated', documentAccess: 'allowed', editPermission: 'editable', targetDocumentUrl: url, configRevision: 2,
  permissionCheck: { document: { value: 'editable' }, model: { value: 'complete' }, checkedAt: new Date().toISOString(), expiresAt: new Date(Date.now() + 15000).toISOString(), targets: [{ sheetName: '月报', address: 'B9', protection: eligibility === 'eligible' ? 'unprotected' : 'protected', eligibility, reason }] } })
async function change(id: string, value: string) { await act(async () => { const input = container.querySelector<HTMLInputElement>('#' + id)!; Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, value); input.dispatchEvent(new Event('input', { bubbles: true })) }) }
async function mount() { await act(async () => root.render(<DocumentPermissionCheck documentUrl={url} id="job" configRevision={2} disabled={false} onActive={active} onVerified={verified} />)); await change('permission-sheet', '月报'); await change('permission-address', 'B9') }
const click = async () => act(async () => container.querySelector('button')!.click())
beforeEach(() => { vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true); invoke.mockReset(); active.mockReset(); verified.mockReset(); container = document.createElement('div'); document.body.append(container); root = createRoot(container) })
afterEach(async () => { await act(async () => root.unmount()); container.remove(); vi.useRealTimers(); vi.unstubAllGlobals() })
it.each([['denied', 'protected-read-only', '无法填写'], ['unknown', 'range-privilege-missing', '填写资格未知'], ['eligible', 'verified-prerequisites', '满足填写前置条件']] as const)('renders %s from a real Verify response with explicit coordinates', async (eligibility, reason, text) => {
  invoke.mockResolvedValue(response(eligibility, reason)); await mount(); await click()
  expect(invoke).toHaveBeenCalledTimes(1)
  expect(invoke).toHaveBeenCalledWith('tencentSheet.sessionVerify', { documentUrl: url, id: 'job', configRevision: 2, permissionTargets: [{ sheetName: '月报', address: 'B9' }], refreshPermissions: true }, 60000)
  expect(container.textContent).toContain('月报 · B9'); expect(container.textContent).toContain(text); expect(container.textContent).not.toMatch(/rangeId|iframe|DOM/)
  expect(verified).toHaveBeenCalledTimes(1)
})
it('blocks duplicates and shows an actionable failure without reusing a prior success', async () => {
  let reject!: (error: Error) => void
  invoke.mockImplementation(() => new Promise((_, fail) => { reject = fail }))
  await mount(); await act(async () => { container.querySelector('button')!.click(); container.querySelector('button')!.click() })
  expect(invoke).toHaveBeenCalledTimes(1); expect(container.textContent).toContain('权限核验中')
  await act(async () => reject(new Error('权限检查失败，请重试。')))
  expect(container.querySelector('[role=alert]')?.textContent).toBe('权限检查失败，请重试。'); expect(verified).not.toHaveBeenCalled()
})
it('rejects stale configuration replies and clears evidence after coordinate changes', async () => {
  invoke.mockResolvedValue({ ...response('eligible', 'verified-prerequisites'), configRevision: 1 }); await mount(); await click()
  expect(container.textContent).toContain('文档配置已变化'); expect(verified).not.toHaveBeenCalled()
  invoke.mockResolvedValue(response('eligible', 'verified-prerequisites')); await click(); await change('permission-address', 'C9')
  expect(container.textContent).not.toContain('满足填写前置条件')
})
it('expires displayed permission claims and ignores results after unmount', async () => {
  vi.useFakeTimers(); invoke.mockResolvedValue(response('eligible', 'verified-prerequisites')); await mount(); await click()
  await act(async () => vi.advanceTimersByTime(15001)); expect(container.textContent).toContain('检查已过期')
  let resolve!: (result: unknown) => void; invoke.mockImplementation(() => new Promise(done => { resolve = done })); await click()
  await act(async () => root.unmount()); root = createRoot(container); verified.mockClear()
  await act(async () => resolve(response('eligible', 'verified-prerequisites'))); expect(verified).not.toHaveBeenCalled()
})
