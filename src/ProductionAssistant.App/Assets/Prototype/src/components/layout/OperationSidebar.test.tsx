import { act, createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { describe, expect, it, vi } from 'vitest'
import { OperationSidebar } from './OperationSidebar'

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

describe('operation sidebar compatibility', () => {
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
})
