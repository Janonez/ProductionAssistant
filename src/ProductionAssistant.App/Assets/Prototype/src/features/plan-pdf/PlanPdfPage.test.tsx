import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { PlanPdfPage } from './PlanPdfPage'

const invoke = vi.fn()
vi.mock('../../bridge/index', () => ({ invoke: (...args: unknown[]) => invoke(...args) }))
;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
const formatWarning = { severity: '警告', sheet: '技术准备', location: '打印设置', message: '打印缩放不符合规则', canAutoFix: true }
const audit = { auditId: 'audit-1', workspace: { rootPath: 'D:/plans', workbookPath: 'D:/plans/一二三级计划.xlsx', year: 2026, month: 9 }, issues: [formatWarning], sheetCount: 12, repaired: false, canExport: false }
const repair = { audit: { ...audit, issues: [], repaired: true, canExport: true }, repair: { backupPath: 'D:/backup.xlsx', changedCells: 2, changedRows: 4 } }
const output = { outputFolder: 'D:/candidate', files: ['D:/candidate/生产计划.pdf'] }
let container: HTMLDivElement
let root: Root
const button = (text: string, scope: ParentNode = document) => [...scope.querySelectorAll<HTMLButtonElement>('button')].find(item => item.textContent === text)!
async function click(text: string, scope: ParentNode = document) { await act(async () => { button(text, scope).click() }) }
async function choose() { await click('选择目录') }
async function checkAndRepair() {
  await choose(); await click('检查计划'); await click('备份并修复')
  await click('备份并修复', document.querySelector('[role="dialog"]')!)
}
beforeEach(async () => {
  invoke.mockReset().mockImplementation((method: string) => Promise.resolve(method === 'plan.pickFolder' ? { path: 'D:/plans' } : method === 'plan.audit' ? audit : method === 'plan.repair' ? repair : output))
  container = document.createElement('div'); document.body.append(container); root = createRoot(container)
  await act(async () => { root.render(<PlanPdfPage />) })
})
afterEach(() => { act(() => root.unmount()); container.remove() })

it('does no work on entry or folder selection and keeps repair and export behind confirmations', async () => {
  expect(invoke).not.toHaveBeenCalled()
  await choose()
  expect(invoke.mock.calls.map(call => call[0])).toEqual(['plan.pickFolder'])
  expect(button('导出 PDF').disabled).toBe(true)
  await click('检查计划'); await click('备份并修复'); await click('取消')
  expect(invoke.mock.calls.some(call => call[0] === 'plan.repair')).toBe(false)
  await click('备份并修复'); await click('备份并修复', document.querySelector('[role="dialog"]')!)
  expect(invoke).toHaveBeenCalledWith('plan.repair', expect.objectContaining({ auditId: 'audit-1', confirmed: true }), 1800000, expect.any(Function))
  expect(container.textContent).toContain('备份与修复明细')
  expect(button('导出 PDF').disabled).toBe(false)
  await click('导出 PDF'); await click('取消')
  expect(invoke.mock.calls.some(call => call[0] === 'plan.export')).toBe(false)
})

it('locks the folder during export, shows progress, then opens only the completed output', async () => {
  await checkAndRepair()
  let finish!: (value: typeof output) => void
  invoke.mockImplementation((method: string) => method === 'plan.export' ? new Promise(resolve => { finish = resolve }) : Promise.resolve({ opened: true }))
  await click('导出 PDF'); await click('确认导出')
  expect(container.querySelector<HTMLInputElement>('input')!.disabled).toBe(true)
  const request = invoke.mock.calls.find(call => call[0] === 'plan.export')!
  await act(async () => { request[3]({ current: 3, total: 11, name: '技术准备' }) })
  expect(container.textContent).toContain('3 / 11 · 技术准备')
  await act(async () => { finish(output) })
  expect(container.textContent).toContain('生产计划.pdf')
  await click('打开输出目录')
  expect(invoke).toHaveBeenCalledWith('plan.openOutput', expect.objectContaining({ auditId: 'audit-1' }), 1800000, expect.any(Function))
  await act(async () => { request[3]({ current: 4, total: 11, name: 'late' }) })
  expect(container.querySelector('progress')).toBeNull()
})

it('clears a previous export when the directory changes and preserves it if the picker is cancelled', async () => {
  await checkAndRepair(); await click('导出 PDF'); await click('确认导出')
  invoke.mockResolvedValueOnce({ path: null })
  await choose()
  expect(invoke).toHaveBeenLastCalledWith('plan.pickFolder', { path: 'D:/plans' }, 600000)
  expect(container.textContent).toContain('生产计划.pdf')
  invoke.mockResolvedValueOnce({ path: 'D:/new-month' })
  await choose()
  expect(container.textContent).not.toContain('生产计划.pdf')
  expect(button('导出 PDF').disabled).toBe(true)
  expect(button('检查计划')).toBeTruthy()
})

it('keeps remaining errors actionable and blocks export after a failed source check', async () => {
  await checkAndRepair()
  invoke.mockRejectedValueOnce(new Error('源 Excel 已变化，请重新检查并修复后再导出。'))
  await click('导出 PDF'); await click('确认导出')
  expect(container.querySelector('[role="alert"]')?.textContent).toContain('源 Excel 已变化')
  expect(button('导出 PDF').disabled).toBe(true)
  invoke.mockResolvedValueOnce({ ...audit, issues: [{ severity: '错误', sheet: '项目计划', location: 'E12', message: '日期超出计划月份', canAutoFix: false }] })
  await click('重新检查')
  expect(container.textContent).toContain('需手动处理')
  expect(container.textContent).toContain('日期超出计划月份')
  expect(button('导出 PDF').disabled).toBe(true)
  expect(button('备份并修复').disabled).toBe(true)
})

it('keeps format warnings blocking until reinspection is clear, even after a repair', async () => {
  await choose(); await click('检查计划')
  expect(container.textContent).toContain('格式警告必须修复并复查通过后才能导出')
  expect(button('导出 PDF').disabled).toBe(true)
  invoke.mockResolvedValueOnce({ ...repair, audit: { ...audit, repaired: true, canExport: false } })
  await click('备份并修复'); await click('备份并修复', document.querySelector('[role="dialog"]')!)
  expect(button('导出 PDF').disabled).toBe(true)
  expect(button('再次修复').disabled).toBe(false)
})

it('permits export after manual correction and a clean audit without modifying Excel again', async () => {
  await choose()
  invoke.mockResolvedValueOnce({ ...audit, issues: [], canExport: true })
  await click('检查计划')
  expect(button('备份并修复').disabled).toBe(true)
  expect(button('导出 PDF').disabled).toBe(false)
  await click('导出 PDF')
  expect(document.querySelector('[role="dialog"]')?.textContent).toContain('当前月度目录的“生产助手预览”')
  await click('确认导出')
  expect(invoke.mock.calls.some(call => call[0] === 'plan.repair')).toBe(false)
  expect(invoke.mock.calls.some(call => call[0] === 'plan.export')).toBe(true)
})

it('shows the actual folder access failure with its diagnostic reference and allows checking again', async () => {
  await choose()
  const error = '没有权限创建文件夹：D:/plans/正式版。\n诊断编号：diag-1；日志：D:/logs/bridge-errors.log'
  invoke.mockRejectedValueOnce(new Error(error))
  await click('检查计划')
  expect(container.querySelector('[role="alert"]')?.textContent).toBe(error)
  expect(button('导出 PDF').disabled).toBe(true)
  expect(button('检查计划').disabled).toBe(false)
  await click('检查计划')
  expect(container.querySelector('[role="alert"]')).toBeNull()
  expect(container.textContent).toContain('12 个工作表')
})
