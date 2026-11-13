import { formatDate } from '../../lib/calendar'
import type { DocumentConnectionState } from './DocumentConnectionAlert'

// Replaceable frontend view data; not backend DTOs or persisted automation rules.
export type BusinessDataOption = { value: string; label: string }
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
export type BusinessPosition = { status: 'unconfigured' } | ConfiguredPosition
export type BusinessConfigValue = { name: string; dataSource?: BusinessDataOption; position: BusinessPosition }
export type BusinessListItem = BusinessConfigValue & { id: string }
export type ExecutionRules = {
  automatic: boolean
  time: string
  weekdays: number[]
  missingData: 'wait' | 'skip'
  retryMinutes: 5 | 10 | 15 | 30
  retryUntil: string
  notify: boolean
  catchUp: boolean
}
export const defaultExecutionRules: ExecutionRules = {
  automatic: false, time: '09:00', weekdays: [1, 2, 3, 4, 5, 6, 0],
  missingData: 'wait', retryMinutes: 10, retryUntil: '18:00', notify: false, catchUp: false,
}
export type PickEvent =
  | { type: 'waiting' }
  | { type: 'confirmed'; cell: string }
  | { type: 'cancelled' | 'timeout' }
  | { type: 'error'; code: string; message: string }
export type PickSession = { subscribe: (listener: (event: PickEvent) => void) => () => void; cancel: () => void }
export interface SubmissionSettingsAdapter {
  isMock: boolean
  readBusinessDrafts: () => BusinessListItem[]
  writeBusinessDrafts: (items: readonly BusinessListItem[]) => void
  subscribeBusinessDrafts: (listener: () => void) => () => void
  readRuleDraft: () => ExecutionRules
  listDataSources: () => Promise<readonly BusinessDataOption[]>
  readDocumentName: (url: string) => string | undefined
  checkDocumentConnection: (url: string) => Promise<DocumentConnectionState>
  saveRules: (rules: ExecutionRules) => Promise<ExecutionRules>
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
