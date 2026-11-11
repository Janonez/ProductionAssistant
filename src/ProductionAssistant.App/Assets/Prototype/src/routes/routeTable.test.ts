import { describe, expect, expectTypeOf, it } from 'vitest'
import { routeFor, SIDEBAR_MODULES, NAVIGATION_PLAN, ROUTES, navigationKey, parseAutomationTaskFilter, type AutomationTaskFilter } from './routeTable'
import type { useHostRoute } from '../hooks/useHostRoute'

describe('route table compatibility', () => {
  it('preserves the shared filter type through the URL and hook boundaries', () => {
    expectTypeOf<ReturnType<typeof useHostRoute>['taskType']>().toEqualTypeOf<AutomationTaskFilter | null>()
    expectTypeOf(parseAutomationTaskFilter).returns.toEqualTypeOf<AutomationTaskFilter | null>()
    for (const value of ['daily_report', 'notion_fill', 'tencent_sheet_fill']) expect(parseAutomationTaskFilter(value)).toBe(value)
    expect(parseAutomationTaskFilter(null)).toBe('')
    expect(parseAutomationTaskFilter('')).toBe('')
    for (const value of ['unknown', 'all', 'DAILY_REPORT', ' daily_report ', 'navigation:daily_report']) expect(parseAutomationTaskFilter(value)).toBeNull()
  })

  it('maps Metis entries to the original seven routes and real task types', () => {
    expect(SIDEBAR_MODULES).toEqual([
      { category: '生产数据', name: '生产消息', route: 'production-message' },
      { category: '生产数据', name: '每日焊接', route: 'daily-weld' },
      { category: '生产数据', name: '原材料入库', route: 'daily-report', taskType: 'notion_fill' },
      { category: '报表与资料', name: '生产日报', route: 'daily-report', taskType: 'daily_report' },
      { category: '报表与资料', name: '机加工统计', route: 'report-center' },
      { category: '报表与资料', name: '挂网计划', route: 'plan-pdf' },
      { category: '报表与资料', name: '生产会资料', route: 'production-meeting' },
      { category: '数据报送', name: '集团填报', route: 'daily-report', taskType: 'tencent_sheet_fill' },
      { category: '工作管理', name: '任务清单', route: 'daily-report' },
      { category: '数据管理', name: '数据浏览', route: 'database-viewer' },
    ])
    expect(new Set(SIDEBAR_MODULES.map(module => module.route))).toEqual(new Set(Object.values(ROUTES)))
    expect(new Set(SIDEBAR_MODULES.map(navigationKey)).size).toBe(10)
  })

  it('retains the long term plan but exposes only implemented destinations', () => {
    expect(NAVIGATION_PLAN.map(group => group.category)).toEqual(['工作台', '项目管理', '生产数据', '报表与资料', '数据报送', '工作管理', '数据管理', '设置'])
    expect(NAVIGATION_PLAN.flatMap(group => group.items).map(item => item.name)).toEqual(expect.arrayContaining(['工作台', '项目台账', '项目计划', '风险管控', '内网同步']))
    expect(SIDEBAR_MODULES.map(module => module.name)).not.toEqual(expect.arrayContaining(['工作台']))
    expect(SIDEBAR_MODULES.some(module => ['工作台', '项目台账', '项目计划', '风险管控', '内网同步'].includes(module.name))).toBe(false)
  })

  it('keeps the sidebar name fallback separate from the query fallback', () => {
    expect(routeFor('未知模块')).toBe('plan-pdf')
    expect(routeFor('')).toBe('plan-pdf')
    expect(routeFor(' 每日焊接数据模拟 ')).toBe('plan-pdf')
  })
})
