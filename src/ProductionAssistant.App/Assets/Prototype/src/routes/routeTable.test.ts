import { describe, expect, it } from 'vitest'
import { routeFor, SIDEBAR_MODULES } from './routeTable'

describe('route table compatibility', () => {
  it('keeps all seven sidebar names, categories and host tags in order', () => {
    expect(SIDEBAR_MODULES).toEqual([
      { category: '数据同步', name: '生产消息 Teable 入库', route: 'production-message' },
      { category: '数据同步', name: '每日焊接数据模拟', route: 'daily-weld' },
      { category: '数据同步', name: '数据库查看', route: 'database-viewer' },
      { category: '数据文件处理', name: '挂网计划 PDF 导出', route: 'plan-pdf' },
      { category: '数据文件处理', name: '生产会资料拆分', route: 'production-meeting' },
      { category: '数据文件处理', name: '文件统计汇总', route: 'report-center' },
      { category: '自动化', name: '自动化任务', route: 'daily-report' },
    ])
  })

  it('keeps the sidebar name fallback separate from the query fallback', () => {
    expect(routeFor('未知模块')).toBe('plan-pdf')
    expect(routeFor('')).toBe('plan-pdf')
    expect(routeFor(' 每日焊接数据模拟 ')).toBe('plan-pdf')
  })
})
