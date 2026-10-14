import { describe, expect, it } from 'vitest'
import { formatDate, monthGrid, parseDate, yearGrid } from './calendar'

describe('calendar', () => {
  it('builds a stable six-week month without UTC date drift', () => {
    const days = monthGrid(2026, 7)
    expect(days).toHaveLength(42)
    expect(days[0].date).toBe('2026-07-26')
    expect(days.find(day => day.date === '2026-08-13')).toEqual({ date: '2026-08-13', day: 13, currentMonth: true })
    expect(formatDate(new Date(2026, 7, 3))).toBe('2026-08-03')
  })

  it('builds twelve-year pages and rejects impossible dates', () => {
    expect(yearGrid(2026)).toEqual([2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032])
    expect(parseDate('2026-02-30').getDate()).not.toBe(30)
  })
})
