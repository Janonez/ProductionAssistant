import { act, createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { describe, expect, it, vi } from 'vitest'
import { OperationSidebar } from '../components/layout/OperationSidebar'
import { resolveHostRoute } from './index'
import { isRouteKey, routeFor, SIDEBAR_MODULES } from './routeTable'

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

describe('route table compatibility', () => {
  it.each([
    'production-message', 'daily-weld', 'database-viewer', 'plan-pdf',
    'production-meeting', 'report-center', 'daily-report',
  ])('resolves the exact host tag %s', value => {
    expect(resolveHostRoute(`?route=${value}`)).toEqual({ route: value, navigation: '' })
    expect(isRouteKey(value)).toBe(true)
  })

  it.each([
    '', '?', '?route', '?route=', '?route=unknown',
    '?route=PRODUCTION-MESSAGE', '?route=Navigation:plan-pdf',
    '?route=%20plan-pdf%20', '?route=%20navigation:plan-pdf',
  ])('keeps the query fallback for %s', query => {
    expect(resolveHostRoute(query)).toEqual({ route: 'production-message', navigation: '' })
  })

  it.each([
    'navigation:plan-pdf', 'navigation:unknown', 'navigation:', 'navigation: ',
    'navigation:PRODUCTION-MESSAGE',
  ])('preserves the legacy route %s verbatim', value => {
    expect(resolveHostRoute(`?route=${encodeURIComponent(value)}`)).toEqual({ route: value, navigation: '' })
    expect(isRouteKey(value)).toBe(false)
  })

  it.each([null, undefined, '', 'unknown', 'PRODUCTION-MESSAGE', 'Navigation:plan-pdf', ' plan-pdf '])('rejects the non-key %s', value => {
    expect(isRouteKey(value)).toBe(false)
  })

  it('preserves navigation tokens without trimming', () => {
    expect(resolveHostRoute('?route=plan-pdf&navigation=%20token%20')).toEqual({ route: 'plan-pdf', navigation: ' token ' })
    expect(resolveHostRoute('?route=plan-pdf&navigation=')).toEqual({ route: 'plan-pdf', navigation: '' })
  })

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

  it('keeps sidebar button order, categories, highlight and click tags', async () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    const navigate = vi.fn()
    const openSettings = vi.fn()
    try {
      await act(async () => root.render(createElement(OperationSidebar, { active: 'daily-weld', navigate, openSettings })))
      const sections = Array.from(container.querySelectorAll('.sidebar-section'))
      expect(sections.map(section => ({
        category: section.querySelector('.sidebar-section-label')?.textContent,
        names: Array.from(section.querySelectorAll('button')).map(button => button.textContent),
      }))).toEqual([
        { category: '数据同步', names: ['生产消息 Teable 入库', '每日焊接数据模拟', '数据库查看'] },
        { category: '数据文件处理', names: ['挂网计划 PDF 导出', '生产会资料拆分', '文件统计汇总'] },
        { category: '自动化', names: ['自动化任务'] },
      ])
      const buttons = Array.from(container.querySelectorAll<HTMLButtonElement>('.sidebar-nav button'))
      expect(buttons.map(button => button.getAttribute('aria-current'))).toEqual([null, 'page', null, null, null, null, null])
      expect(buttons.map(button => button.classList.contains('sidebar-item-active'))).toEqual([false, true, false, false, false, false, false])
      await act(async () => { buttons.forEach(button => button.click()) })
      expect(navigate.mock.calls).toEqual([
        ['production-message'], ['daily-weld'], ['database-viewer'], ['plan-pdf'],
        ['production-meeting'], ['report-center'], ['daily-report'],
      ])
      await act(async () => container.querySelector<HTMLButtonElement>('.sidebar-bottom button')!.click())
      expect(openSettings).toHaveBeenCalledTimes(1)
      expect(navigate).toHaveBeenCalledTimes(7)
    } finally {
      await act(async () => root.unmount())
    }
  })

  it('keeps the sidebar name fallback separate from the query fallback', () => {
    expect(routeFor('未知模块')).toBe('plan-pdf')
    expect(routeFor('')).toBe('plan-pdf')
    expect(routeFor(' 每日焊接数据模拟 ')).toBe('plan-pdf')
  })
})
