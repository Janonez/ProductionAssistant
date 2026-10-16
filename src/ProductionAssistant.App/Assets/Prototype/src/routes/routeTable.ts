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

export const SIDEBAR_MODULES = [
  { category: '数据同步', name: '生产消息 Teable 入库', route: ROUTES.productionMessage },
  { category: '数据同步', name: '每日焊接数据模拟', route: ROUTES.dailyWeld },
  { category: '数据同步', name: '数据库查看', route: ROUTES.databaseViewer },
  { category: '数据文件处理', name: '挂网计划 PDF 导出', route: ROUTES.planPdf },
  { category: '数据文件处理', name: '生产会资料拆分', route: ROUTES.productionMeeting },
  { category: '数据文件处理', name: '文件统计汇总', route: ROUTES.reportCenter },
  { category: '自动化', name: '自动化任务', route: ROUTES.dailyReport },
] as const

export function isRouteKey(value: unknown): value is RouteKey {
  return Object.values(ROUTES).some(route => route === value)
}

export function routeFor(name: string): RouteKey {
  return SIDEBAR_MODULES.find(module => module.name === name)?.route ?? ROUTES.planPdf
}
