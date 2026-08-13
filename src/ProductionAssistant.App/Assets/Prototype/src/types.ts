export type Route = 'home' | 'production-message'

export interface FieldPreview { key: string; label: string; value: string }
export interface Draft {
  index: number
  originalText: string
  parserVersion: string
  kind: 'Unknown' | 'MaterialCutting' | 'TowerLineDaily'
  businessDate: string
  typeDisplay: string
  fields: Record<string, string>
  previewFields: FieldPreview[]
  statusText: string
  warningText: string
  canWrite: boolean
}
export interface ImportItem { index: number; businessDate: string; status: string; message: string }
export interface ImportResult { succeeded: boolean; message: string; items: ImportItem[]; requiredMonths: string[] }
export interface BindingTarget { bound: boolean; name: string; path: string }
export interface BindingState {
  configured: boolean
  cutting: BindingTarget
  towerDaily: BindingTarget
  towerMonthly: BindingTarget
  towerYearly: BindingTarget
  sources: Array<{ id: string; name: string; path: string }>
  selected: Record<string, string>
}
export interface Overview {
  notionConfigured: boolean
  productionMessageReady: boolean
  dailyWeldReady: boolean
  dailyReportJobs: number
}
