export type Route = 'daily-weld' | 'production-message' | 'daily-report' | 'report-center' | `navigation:${string}`

export interface ReportCenterState { name: string; authenticated: boolean; credentialsConfigured: boolean; configPath: string; sourceRoot: string; outputRoot: string; reportUrl: string; username: string; devices: number }
export interface ReportRunSummary { runId: string; startedAt: string; finishedAt: string; period: { startDate: string; endDate: string }; plannedReports: number; exportedReports: number; parsedReports: number; deviceCount: number; actualDataPoints: number; expectedDataPoints: number; summaryPath: string; warnings: string[] }
export interface ReportRunProgress { stage: 'prepare' | 'collect' | 'parse' | 'summary' | 'complete'; current: number; total: number; message: string }

export interface DailyJobSummary { id: string; name: string; sendTime: string; isEnabled: boolean; schedulingAvailable: boolean; status: string; schedulerMessage: string; dingTalkStatus: string; lastRun: string; missingStep?: string; missingMessage?: string }
export interface DailyField { placeholder: string; label: string; tooltip: string }
export interface DailyRun { id: string; time: string; source: string; status: string; businessDate: string; templateVersion: number; stage: string; attempts: number; response: string; error: string; textSummary: string }
export interface DailyJobDetail { id: string; name: string; sendTime: string; isEnabled: boolean; schedulingAvailable: boolean; validated: boolean; draftTemplate: string; draftTemplateDocument: string; notificationConfigured: boolean; notificationConnected?: boolean; notificationStatus: string; schedulerInstalled: boolean; schedulerMessage: string; pagePaths: string[]; sources: Array<{ id: string; name: string; path: string }>; fields: DailyField[]; runs: DailyRun[] }

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
export interface ImportField { key: string; name: string; propertyType: string; parsedValue: string; databaseValue: string; status: 'new' | 'same' | 'confirm' | 'exception'; message: string }
export interface ImportItem { index: number; businessDate: string; status: string; message: string; fields?: ImportField[] }
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

export interface WeldRow { date: string; weekday: string; isWeekend: boolean; qty: string; note: string }
export interface WeldState { configured: boolean; binding: BindingTarget; sources: Array<{ id: string; name: string; path: string }>; selected: string }
export interface WeldPlanItem { date: string; newQuantity: number; pageId?: string; existingQuantity?: number; status: string }
export interface WeldCheckResult { succeeded: boolean; message: string; hasExistingData: boolean; items: WeldPlanItem[] }
export interface WeldProgress { current: number; total: number; date: string; status: string }
