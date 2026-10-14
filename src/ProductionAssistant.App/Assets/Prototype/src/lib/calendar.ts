export interface CalendarDay { date: string; day: number; currentMonth: boolean }

export function yearGrid(year: number) {
  const start = year - 5
  return Array.from({ length: 12 }, (_, index) => start + index)
}

export function monthGrid(year: number, month: number): CalendarDay[] {
  const first = new Date(year, month, 1)
  const start = new Date(year, month, 1 - first.getDay())
  return Array.from({ length: 42 }, (_, index) => {
    const value = new Date(start.getFullYear(), start.getMonth(), start.getDate() + index)
    return {
      date: formatDate(value),
      day: value.getDate(),
      currentMonth: value.getMonth() === month
    }
  })
}

export function formatDate(value: Date) {
  const year = value.getFullYear()
  const month = String(value.getMonth() + 1).padStart(2, '0')
  const day = String(value.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function parseDate(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  const parsed = new Date(year, month - 1, day)
  return year && month && day && parsed.getFullYear() === year && parsed.getMonth() === month - 1 && parsed.getDate() === day ? parsed : new Date()
}
