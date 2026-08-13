export type Route = 'home' | 'production-message' | 'daily-report'

export interface DailyJobSummary { id: string; name: string; sendTime: string; isEnabled: boolean; status: string; schedulerMessage: string; dingTalkStatus: string; lastRun: string; missingStep?: string; missingMessage?: string }
export interface DailyField { placeholder: string; label: string; tooltip: string }
export interface DailyRun { id: string; time: string; source: string; status: string; businessDate: string; templateVersion: number; stage: string; attempts: number; response: string; error: string; textSummary: string }
export interface DailyJobDetail { id: string; name: string; sendTime: string; isEnabled: boolean; validated: boolean; draftTemplate: string; draftTemplateDocument: string; credentialMask: string; webhookSaved: boolean; secretSaved: boolean; dingTalkConnected?: boolean; dingTalkStatus: string; dingTalkCheckedAt?: string; schedulerInstalled: boolean; schedulerMessage: string; pagePaths: string[]; sources: Array<{ id: string; name: string; path: string }>; fields: DailyField[]; runs: DailyRun[] }

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
