import { afterEach, expect, it, vi } from 'vitest'
import { createPositionPreview } from './submission-settings.mock'

afterEach(() => { vi.useRealTimers() })
it('keeps document detection outside the business preview adapter', () => {
  const adapter = createPositionPreview()
  expect(adapter).not.toHaveProperty('readDocumentName')
  expect(adapter).not.toHaveProperty('checkDocumentConnection')
})
it('uses a cancellable event session and never confirms after cancellation', async () => {
  vi.useFakeTimers(); vi.setSystemTime(new Date(2026, 10, 13, 12))
  const adapter = createPositionPreview(), events = vi.fn()
  const cancelled = adapter.startPick('one', '2026-11-13')
  cancelled.subscribe(events); cancelled.cancel(); await vi.runAllTimersAsync()
  expect(events.mock.calls.map(([event]) => event.type)).toEqual(['waiting', 'cancelled'])
  events.mockClear()
  adapter.startPick('one', '2026-11-13').subscribe(events); await vi.runAllTimersAsync()
  expect(events.mock.calls.map(([event]) => event)).toEqual([{ type: 'waiting' }, { type: 'confirmed', cell: 'F9' }])
})
it('previews horizontal and vertical mock patterns across columns and years', async () => {
  const adapter = createPositionPreview()
  const horizontal = await adapter.recognizePosition({ date: '2026-12-30', cell: 'Z9' }, { date: '2026-12-31', cell: 'AA9' })
  expect(horizontal?.preview).toEqual([{ date: '2027-01-01', cell: 'AB9' }, { date: '2027-01-02', cell: 'AC9' }, { date: '2027-01-03', cell: 'AD9' }])
  const vertical = await adapter.recognizePosition({ date: '2026-11-13', cell: 'F9' }, { date: '2026-11-15', cell: 'F13' })
  expect(vertical?.direction).toBe('down'); expect(vertical?.step).toBe(2)
  expect(vertical?.preview[0]).toEqual({ date: '2026-11-16', cell: 'F15' })
})
it.each([
  ['2026-11-13', 'F9', '2026-11-14', 'G10'],
  ['2026-11-13', 'F9', '2026-11-13', 'G9'],
  ['2026-11-13', 'F9', '2026-11-15', 'G9'],
  ['2026-11-13', 'F9', '2026-11-14', 'F9'],
  ['2026-11-13', 'F9', '2026-11-14', 'E9'],
  ['2026-02-30', 'F9', '2026-03-01', 'G9'],
  ['2026-11-13', 'XFD9', '2026-11-14', 'XFE9'],
])('rejects irregular or invalid mock samples %s %s %s %s', async (firstDate, firstCell, secondDate, secondCell) => {
  expect(await createPositionPreview().recognizePosition({ date: firstDate, cell: firstCell }, { date: secondDate, cell: secondCell })).toBeNull()
})
