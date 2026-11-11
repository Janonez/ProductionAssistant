export const ROUTES = {
  productionMessage: 'production-message',
  dailyWeld: 'daily-weld',
  databaseViewer: 'database-viewer',
  planPdf: 'plan-pdf',
  productionMeeting: 'production-meeting',
  reportCenter: 'report-center',
  dailyReport: 'daily-report',
} as const

export type RouteKey = typeof ROUTES[keyof typeof ROUTES]
export const LEGACY_NAVIGATION_PREFIX = 'navigation:'
export type Route = RouteKey | `${typeof LEGACY_NAVIGATION_PREFIX}${string}`
export const DEFAULT_ROUTE = ROUTES.productionMessage

export type AutomationTaskFilter = '' | 'daily_report' | 'notion_fill' | 'tencent_sheet_fill'
type NavigationEntry = { name: string; route?: RouteKey; taskType?: Exclude<AutomationTaskFilter, ''> }
const TASK_NAVIGATION = {
  daily_report: { name: '生产日报', route: ROUTES.dailyReport, taskType: 'daily_report' },
  notion_fill: { name: '原材料入库', route: ROUTES.dailyReport, taskType: 'notion_fill' },
  tencent_sheet_fill: { name: '集团填报', route: ROUTES.dailyReport, taskType: 'tencent_sheet_fill' },
} satisfies { [TaskType in Exclude<AutomationTaskFilter, ''>]: NavigationEntry & { taskType: TaskType } }

export function parseAutomationTaskFilter(value: string | null): AutomationTaskFilter | null {
  if (value === null || value === '') return ''
  return Object.values(TASK_NAVIGATION).find(module => module.taskType === value)?.taskType ?? null
}

// Entries without an implemented route remain in the plan, never in a clickable menu.
export const NAVIGATION_PLAN: { category: string; items: NavigationEntry[] }[] = [
  { category: '工作台', items: [{ name: '工作台' }] },
  { category: '项目管理', items: [{ name: '项目台账' }, { name: '项目计划' }, { name: '风险管控' }] },
  { category: '生产数据', items: [
    { name: '生产消息', route: ROUTES.productionMessage },
    { name: '每日焊接', route: ROUTES.dailyWeld },
    TASK_NAVIGATION.notion_fill,
  ] },
  { category: '报表与资料', items: [
    TASK_NAVIGATION.daily_report,
    { name: '机加工统计', route: ROUTES.reportCenter },
    { name: '挂网计划', route: ROUTES.planPdf },
    { name: '生产会资料', route: ROUTES.productionMeeting },
  ] },
  { category: '数据报送', items: [
    TASK_NAVIGATION.tencent_sheet_fill, { name: '内网同步' },
  ] },
  { category: '工作管理', items: [{ name: '任务清单', route: ROUTES.dailyReport }] },
  { category: '数据管理', items: [{ name: '数据浏览', route: ROUTES.databaseViewer }] },
  { category: '设置', items: [{ name: '设置' }] },
]
export const SIDEBAR_MODULES = NAVIGATION_PLAN.flatMap(group => group.items
  .filter((item): item is NavigationEntry & { route: RouteKey } => !!item.route)
  .map(item => ({ ...item, category: group.category })))

export function navigationKey(module: { route: string; taskType?: string }): string {
  return module.taskType ? `${module.route}:${module.taskType}` : module.route
}

export function navigationModule(route: string, taskType: AutomationTaskFilter = '') {
  return SIDEBAR_MODULES.find(module => module.route === route && (module.taskType ?? '') === taskType)
    ?? SIDEBAR_MODULES.find(module => module.route === route && !module.taskType)
}

export function isRouteKey(value: unknown): value is RouteKey {
  return Object.values(ROUTES).some(route => route === value)
}

export function routeFor(name: string): RouteKey {
  return SIDEBAR_MODULES.find(module => module.name === name)?.route ?? ROUTES.planPdf
}
