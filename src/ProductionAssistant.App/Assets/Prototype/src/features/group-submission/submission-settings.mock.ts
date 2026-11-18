import { formatDate } from '../../lib/calendar'
import { defaultPositionDates, type PickEvent, type PositionSample, type SubmissionPositionAdapter } from './business-configuration.types'

// Cell picking remains a preview until the document recording flow is connected.
export function createPositionPreview({ pickDelay = 900, outcomes = [] as PickEvent[] } = {}): SubmissionPositionAdapter {
  const queued = [...outcomes]
  const anchor = dateNumber(defaultPositionDates().firstDate)
  return {
    isMock: true,
    startPick(_businessId, date) {
      let listener: ((event: PickEvent) => void) | undefined
      let finished = false
      const column = 6 + (dateNumber(date) - anchor) / 86400000
      const outcome: PickEvent = queued.shift() ?? (Number.isInteger(column) && column >= 1 && column <= 16384
        ? { type: 'confirmed', cell: columnName(column) + '9' }
        : { type: 'error', code: 'preview-date', message: '该日期超出当前预览范围，请调整日期。' })
      const timer = setTimeout(() => { if (!finished) { finished = true; listener?.(outcome) } }, pickDelay)
      return {
        subscribe(next) { listener = next; next({ type: 'waiting' }); return () => { listener = undefined } },
        cancel() { clearTimeout(timer); if (!finished) { finished = true; listener?.({ type: 'cancelled' }) } },
      }
    },
    async recognizePosition(first, second) {
      const a = cellNumbers(first.cell), b = cellNumbers(second.cell)
      const start = dateNumber(first.date), end = dateNumber(second.date), days = (end - start) / 86400000
      if (!a || !b || !Number.isInteger(days) || days <= 0) return null
      const dx = (b.column - a.column) / days, dy = (b.row - a.row) / days
      if (!((dx > 0 && Number.isInteger(dx) && dy === 0) || (dy > 0 && Number.isInteger(dy) && dx === 0))) return null
      const preview: PositionSample[] = []
      for (let index = 1; index <= 3; index++) {
        const row = b.row + dy * index, column = b.column + dx * index
        if (row > 1048576 || column > 16384) return null
        const date = new Date(end + index * 86400000)
        preview.push({ date: formatDate(new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 12)), cell: columnName(column) + row })
      }
      return { status: 'configured', first: { ...first }, second: { ...second }, direction: dx ? 'right' : 'down', step: dx || dy, preview }
    },
  }
}

function dateNumber(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return NaN
  const date = new Date(value + 'T00:00:00Z')
  return Number.isFinite(+date) && date.toISOString().slice(0, 10) === value ? +date : NaN
}
function cellNumbers(cell: string) {
  const match = /^([A-Z]{1,3})([1-9]\d*)$/.exec(cell)
  if (!match) return null
  const column = [...match[1]].reduce((value, letter) => value * 26 + letter.charCodeAt(0) - 64, 0), row = Number(match[2])
  return column <= 16384 && row <= 1048576 ? { column, row } : null
}
function columnName(value: number): string {
  let name = ''
  while (value > 0) { value--; name = String.fromCharCode(65 + value % 26) + name; value = Math.floor(value / 26) }
  return name
}
