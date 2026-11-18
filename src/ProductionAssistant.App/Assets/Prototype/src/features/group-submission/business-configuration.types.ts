import { formatDate } from '../../lib/calendar'

export type BusinessDataOption = { value: string; label: string; sourceId?: string; fieldId?: string }
export type PositionSample = { date: string; cell: string }
export type ConfiguredPosition = {
  status: 'configured'
  first: PositionSample
  second: PositionSample
  direction: 'right' | 'down'
  step: number
  preview: PositionSample[]
  range?: string
}
export type BusinessPosition = { status: 'unconfigured' } | ConfiguredPosition | (Omit<ConfiguredPosition, 'status'> & { status: 'invalid' })
export type BusinessConfigValue = { name: string; dataSource?: BusinessDataOption; position: BusinessPosition }
export type BusinessListItem = BusinessConfigValue & { id: string }
export type ExecutionRules = {
  automatic: boolean
  time: string
  weekdays: number[]
  missingData: 'wait' | 'skip'
  retryMinutes: number
  retryUntil: string
}
export type SubmissionConfiguration = {
  revision: number
  businesses: BusinessListItem[]
  rules: ExecutionRules
  hasBusiness: boolean
  nextRunAt: string | null
  dataOptions: BusinessDataOption[]
}
export type ConfigurationChange = { rules: ExecutionRules } | { business: BusinessListItem } | { deleteBusinessId: string }
export type ConfigurationSaveResult = { configuration?: SubmissionConfiguration; error?: string; fieldErrors?: Record<string, string>; conflict?: boolean }
export type SaveConfiguration = (change: ConfigurationChange) => Promise<ConfigurationSaveResult>
export type PickEvent =
  | { type: 'waiting' }
  | { type: 'confirmed'; cell: string }
  | { type: 'cancelled' | 'timeout' }
  | { type: 'error'; code: string; message: string }
export type PickSession = { subscribe: (listener: (event: PickEvent) => void) => () => void; cancel: () => void }
export interface SubmissionPositionAdapter {
  isMock: boolean
  startPick: (businessId: string, date: string) => PickSession
  recognizePosition: (first: PositionSample, second: PositionSample) => Promise<ConfiguredPosition | null>
}

export function defaultPositionDates() {
  const today = new Date(), tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  return { firstDate: formatDate(today), secondDate: formatDate(tomorrow) }
}
export function directionText(position: ConfiguredPosition) {
  return position.direction === 'right' ? '每天向右移 ' + position.step + ' 列' : '每天向下移 ' + position.step + ' 行'
}
export function positionSummary(position: ConfiguredPosition) {
  return position.first.cell + ' 起 · ' + directionText(position)
}
