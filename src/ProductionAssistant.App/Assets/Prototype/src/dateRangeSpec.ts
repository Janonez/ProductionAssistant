export type Granularity = 'day' | 'mtd' | 'ytd' | 'fullyear'
export type DateRangeSpec = { granularity: Granularity; yearOffset: number }
export const granularityLabels: Record<Granularity,string> = {day:'日',mtd:'月累计',ytd:'年累计',fullyear:'全年'}
export function labelFor(spec: DateRangeSpec) {
  const year = spec.yearOffset === 0 ? '今年' : spec.yearOffset === -1 ? '去年' : spec.yearOffset === -2 ? '前年' : spec.yearOffset < 0 ? `${-spec.yearOffset}年前` : `${spec.yearOffset}年后`
  return year + (spec.yearOffset !== 0 && spec.granularity !== 'fullyear' ? '同期' : '') + granularityLabels[spec.granularity]
}
