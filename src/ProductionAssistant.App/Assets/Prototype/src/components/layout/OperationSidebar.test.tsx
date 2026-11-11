import { act, createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { describe, expect, it, vi } from 'vitest'
import { OperationSidebar } from './OperationSidebar'
import { SidebarProvider } from '../ui/sidebar'

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

describe('operation sidebar compatibility', () => {
  it('keeps sidebar button order, categories, highlight and click tags', async () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    const navigate = vi.fn()
    const openSettings = vi.fn()
    try {
      await act(async () => root.render(createElement(SidebarProvider, null, createElement(OperationSidebar, { active: 'daily-weld', navigate, openSettings }))))
      const sections = Array.from(container.querySelectorAll('.sidebar-section'))
      expect(sections.map(section => ({
        category: section.querySelector('.sidebar-section-label')?.textContent,
        names: Array.from(section.querySelectorAll('button')).map(button => button.textContent),
      }))).toEqual([
        { category: '生产数据', names: ['生产消息', '每日焊接', '原材料入库'] },
        { category: '报表与资料', names: ['生产日报', '机加工统计', '挂网计划', '生产会资料'] },
        { category: '数据报送', names: ['集团填报'] },
        { category: '工作管理', names: ['任务清单'] },
        { category: '数据管理', names: ['数据浏览'] },
      ])
      const buttons = Array.from(container.querySelectorAll<HTMLButtonElement>('.sidebar-nav button'))
      expect(buttons.map(button => button.getAttribute('aria-current'))).toEqual([null, 'page', null, null, null, null, null, null, null, null])
      expect(buttons.map(button => button.getAttribute('data-active'))).toEqual(['false', 'true', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false'])
      await act(async () => { buttons.forEach(button => button.click()) })
      expect(navigate.mock.calls).toEqual([
        ['production-message'], ['daily-weld'], ['daily-report:notion_fill'], ['daily-report:daily_report'],
        ['report-center'], ['plan-pdf'], ['production-meeting'], ['daily-report:tencent_sheet_fill'], ['daily-report'], ['database-viewer'],
      ])
      await act(async () => container.querySelector<HTMLButtonElement>('.sidebar-bottom button')!.click())
      expect(openSettings).toHaveBeenCalledTimes(1)
      expect(navigate).toHaveBeenCalledTimes(10)
    } finally {
      await act(async () => root.unmount())
    }
  })
})
