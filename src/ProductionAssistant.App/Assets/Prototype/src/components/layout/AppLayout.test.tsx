import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { App } from '../../app/App'
import { SIDEBAR_MODULES } from '../../routes/routeTable'
import * as routeTable from '../../routes/routeTable'
import { AppLayout, hasNativeTitleBar, hasElectronTitleBar } from './AppLayout'
import { ThemeProvider } from './ThemeProvider'

const { invoke, notifyReady } = vi.hoisted(() => ({ invoke: vi.fn(), notifyReady: vi.fn() }))
vi.mock('../../bridge/index', () => ({ invoke, notifyReady, notifyTheme: vi.fn() }))
vi.mock('../../features/production-message/ProductionMessagePage', () => ({ default: () => <h1 data-business-page="production-message">生产消息入库</h1> }))
vi.mock('../../features/daily-weld/DailyWeldPage', () => ({ DailyWeldPage: () => <h1 data-business-page="daily-weld">每日焊接</h1> }))
vi.mock('../../features/database-viewer/DatabaseViewerPage', () => ({ DatabaseViewerPage: () => <h1 data-business-page="database-viewer">数据浏览</h1> }))
vi.mock('../../features/plan-pdf/PlanPdfPage', () => ({ PlanPdfPage: () => <h1 data-business-page="plan-pdf">挂网计划导出</h1> }))
vi.mock('../../features/production-meeting/ProductionMeetingPage', () => ({ ProductionMeetingPage: () => <h1 data-business-page="production-meeting">生产会资料</h1> }))
vi.mock('../../features/report-center/ReportCenterPage', () => ({ ReportCenterPage: () => <h1 data-business-page="report-center">机加工统计</h1> }))
vi.mock('../../features/daily-report/AutomationPage', () => ({ AutomationPage: () => <h1 data-business-page="daily-report">任务清单</h1> }))

describe('transplanted shadcn application shell', () => {
  let container: HTMLDivElement
  let root: ReturnType<typeof createRoot>
  let colorScheme: MediaQueryList
  let savedPreference: string | null
  const storageKey = 'production-assistant-ui-theme-v1'
  const chrome = Object.getOwnPropertyDescriptor(window, 'chrome')
  const navButton = (name: string) => container.querySelector<HTMLButtonElement>(`[data-sidebar="content"] button[aria-label="${name}"]`)!
  const breadcrumbItems = () => [...container.querySelectorAll('[data-slot="breadcrumb"] [data-slot="breadcrumb-item"]')].map(item => item.textContent)
  const openThemeMenu = async () => {
    await act(async () => container.querySelector('[data-slot="dropdown-menu-trigger"]')!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true })))
  }
  const settings = {
    notion: { configured: false, rootPageId: '', dataSourceCount: 0, lastSyncedAt: '', sources: [] },
    notification: { enabled: false, channelName: '', webhookConfigured: false, secretConfigured: false, connected: null, status: '', checkedAt: '', rules: [] },
    version: '',
  }
  beforeEach(async () => {
    vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
    savedPreference = localStorage.getItem(storageKey)
    localStorage.removeItem(storageKey)
    colorScheme = Object.assign(new EventTarget(), { matches: false, media: '(prefers-color-scheme: dark)' }) as MediaQueryList
    const desktop = Object.assign(new EventTarget(), { matches: false, media: '(max-width: 767px)' }) as MediaQueryList
    vi.stubGlobal('matchMedia', vi.fn((query: string) => query === colorScheme.media ? colorScheme : desktop))
    Reflect.deleteProperty(window, 'chrome')
    history.replaceState({}, '', '?loadId=document-one')
    invoke.mockReset().mockImplementation(async (operation: string) => operation === 'automation.list' ? { tasks: [] } : settings)
    notifyReady.mockReset()
    container = document.createElement('div')
    document.body.append(container)
    root = createRoot(container)
    await act(async () => root.render(<App />))
  })
  afterEach(async () => {
    await act(async () => root.unmount())
    container.remove()
    if (chrome) Object.defineProperty(window, 'chrome', chrome)
    else Reflect.deleteProperty(window, 'chrome')
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
    if (savedPreference === null) localStorage.removeItem(storageKey)
    else localStorage.setItem(storageKey, savedPreference)
  })
  it('keeps one selected theme across the sidebar, Header, routes and settings entry', async () => {
    await openThemeMenu()
    await act(async () => [...document.querySelectorAll<HTMLElement>('[role="menuitem"]')].find(item => item.textContent?.startsWith('深色'))!.click())
    const shell = container.querySelector('.pa-shell-theme')!
    expect(shell.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem(storageKey)).toBe('dark')
    expect(container.querySelector('[data-slot="sidebar"]')?.closest('.pa-shell-theme')).toBe(shell)
    expect(container.querySelector('[aria-label="页面工具栏"]')?.closest('.pa-shell-theme')).toBe(shell)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(document.body.classList.contains('dark')).toBe(false)
    for (const module of SIDEBAR_MODULES) {
      await act(async () => { navButton(module.name).click(); await vi.dynamicImportSettled() })
      expect(container.querySelector('.pa-shell-theme')).toBe(shell)
      expect(shell.classList.contains('dark')).toBe(true)
      expect(breadcrumbItems()).toEqual([module.category, module.name])
      const content = container.querySelector('[data-page-route]')!
      expect(content.getAttribute('data-page-route')).toBe(module.route)
      if (module.taskType === 'tencent_sheet_fill') {
        expect(container.querySelector<HTMLDivElement>('.pa-page-scroll')!.style.scrollbarGutter).toBe('stable')
        expect(content.classList.contains('pa-legacy-content')).toBe(false)
        expect(content.hasAttribute('data-shadcn-surface')).toBe(true)
        expect(content.closest('.pa-shell-theme')).toBe(shell)
        expect(content.querySelector('[aria-label="集团填报工作台"]')).not.toBeNull()
      } else {
        expect(container.querySelector<HTMLDivElement>('.pa-page-scroll')!.style.scrollbarGutter).toBe('')
        expect(content.classList.contains('pa-legacy-content')).toBe(true)
        expect(content.hasAttribute('data-shadcn-surface')).toBe(false)
      }
      expect(new URLSearchParams(location.search).get('loadId')).toBe('document-one')
    }
    const query = location.search
    await act(async () => container.querySelector<HTMLButtonElement>('[aria-label="打开设置"]')!.click())
    const dialog = document.querySelector('[role="dialog"]')!
    expect(dialog.closest('.pa-shell-theme')?.classList.contains('dark')).toBe(true)
    expect(dialog.closest('[data-shadcn-surface]')).not.toBeNull()
    expect(container.contains(dialog)).toBe(false)
    await act(async () => document.querySelector<HTMLButtonElement>('[aria-label="关闭设置"]')!.click())
    expect(location.search).toBe(query)
    expect(shell.classList.contains('dark')).toBe(true)
    expect(notifyReady).toHaveBeenLastCalledWith('database-viewer', 'document-one')
  })
  it('gives the real theme-menu portal the resolved system theme', async () => {
    await act(async () => { Reflect.set(colorScheme, 'matches', true); colorScheme.dispatchEvent(new Event('change')) })
    await openThemeMenu()
    const portal = document.querySelector('.pa-shell-portal')!
    expect(portal).not.toBeNull()
    expect(portal.hasAttribute('data-shadcn-surface')).toBe(true)
    expect(portal.classList.contains('dark')).toBe(true)
    expect(container.querySelector('.pa-shell-theme')?.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem(storageKey)).toBeNull()
    await act(async () => { Reflect.set(colorScheme, 'matches', false); colorScheme.dispatchEvent(new Event('change')) })
    expect(portal.classList.contains('dark')).toBe(false)
    expect(container.querySelector('.pa-shell-theme')?.classList.contains('dark')).toBe(false)
  })
  it('[breadcrumb] mounts all ten navigation entries across seven query routes and keeps the document/sidebar alive', async () => {
    const sidebar = container.querySelector('[data-slot="sidebar"]')
    const breadcrumb = container.querySelector('[data-slot="breadcrumb"]')
    const errors = vi.spyOn(console, 'error')
    const replace = vi.spyOn(history, 'replaceState')
    expect(container.querySelectorAll('[data-slot="sidebar-inset"]')).toHaveLength(1)
    expect(container.querySelectorAll('[data-sidebar="content"] button')).toHaveLength(10)
    for (const module of SIDEBAR_MODULES) {
      await act(async () => { navButton(module.name).click(); await vi.dynamicImportSettled() })
      expect(container.querySelector('[data-current-page-title]')?.textContent).toBe(module.name)
      expect(container.querySelectorAll('[data-slot="breadcrumb"]')).toHaveLength(1)
      expect(container.querySelector('[data-slot="breadcrumb"]')).toBe(breadcrumb)
      expect(breadcrumbItems()).toEqual([module.category, module.name])
      expect(breadcrumb!.querySelectorAll('[data-slot="breadcrumb-separator"]')).toHaveLength(1)
      expect(breadcrumb!.querySelector('a, [data-slot="breadcrumb-link"]')).toBeNull()
      const current = breadcrumb!.querySelector('[data-slot="breadcrumb-page"]')!
      expect(current.tagName).toBe('SPAN')
      expect(current.getAttribute('aria-current')).toBe('page')
      expect(current.getAttribute('aria-disabled')).toBe('true')
      expect(current.hasAttribute('data-current-page-title')).toBe(true)
      expect(navButton(module.name).getAttribute('data-active')).toBe('true')
      expect(navButton(module.name).getAttribute('aria-current')).toBe('page')
      if (module.taskType === 'tencent_sheet_fill') {
        const workbench = container.querySelector('[aria-label="集团填报工作台"]')!
        expect(workbench).not.toBeNull()
        expect(workbench.querySelector('h1')!.textContent).toBe('集团填报')
        expect([...workbench.querySelectorAll('[role="tab"]')].map(tab => tab.textContent)).toEqual(['填报', '历史记录', '设置'])
        expect(container.querySelector('[data-business-page]')).toBeNull()
      } else {
        const business = container.querySelector('[data-business-page]')!
        expect(business).not.toBeNull()
        expect(business.getAttribute('data-business-page')).toBe(module.route)
      }
      expect(new URLSearchParams(location.search).get('loadId')).toBe('document-one')
      expect(container.querySelector('[data-slot="sidebar"]')).toBe(sidebar)
    }
    expect(replace).toHaveBeenCalledTimes(9)
    expect(notifyReady).toHaveBeenLastCalledWith('database-viewer', 'document-one')
    expect(invoke.mock.calls.some(([operation]) => operation === 'app.navigateNative')).toBe(false)
    expect(errors.mock.calls).toEqual([])
  })
  it.each([
    ['?loadId=document-one', routeTable.DEFAULT_ROUTE],
    ['?route=&loadId=document-one', routeTable.DEFAULT_ROUTE],
    ['?route=unknown&loadId=document-one', routeTable.DEFAULT_ROUTE],
    ['?route=navigation:plan-pdf&loadId=document-one', routeTable.ROUTES.planPdf],
  ])('[breadcrumb] follows the existing default/legacy route resolution for %s', async (query, route) => {
    await act(async () => {
      history.replaceState({}, '', query)
      window.dispatchEvent(new PopStateEvent('popstate'))
      await vi.dynamicImportSettled()
    })
    const module = SIDEBAR_MODULES.find(item => item.route === route && !item.taskType)!
    expect(breadcrumbItems()).toEqual([module.category, module.name])
    expect(navButton(module.name).getAttribute('aria-current')).toBe('page')
    expect(new URLSearchParams(location.search).get('loadId')).toBe('document-one')
  })
  it('[breadcrumb] renders a top-level entry as only the current page', async () => {
    // Current entries all have groups; exercise this boundary with an existing route.
    const module = SIDEBAR_MODULES[0]
    vi.spyOn(routeTable, 'navigationModule').mockReturnValue({ ...module, category: '' })
    await act(async () => root.render(<ThemeProvider><AppLayout route={module.route} navigate={vi.fn()} openSettings={vi.fn()}><h1>{module.name}</h1></AppLayout></ThemeProvider>))
    expect(breadcrumbItems()).toEqual([module.name])
    expect(container.querySelector('[data-slot="breadcrumb-separator"]')).toBeNull()
    expect(container.querySelector('[data-slot="breadcrumb-page"]')?.textContent).toBe(module.name)
  })
  it('[breadcrumb] safely labels an unmatched shell route without guessing a business name', async () => {
    await act(async () => root.render(<ThemeProvider><AppLayout route="unmatched-route" navigate={vi.fn()} openSettings={vi.fn()}><p>未匹配内容</p></AppLayout></ThemeProvider>))
    expect(breadcrumbItems()).toEqual(['未知页面'])
    expect(container.querySelector('[data-slot="breadcrumb-separator"]')).toBeNull()
    expect(container.querySelector('[data-slot="breadcrumb-link"]')).toBeNull()
    expect(container.querySelector('[data-sidebar="content"] [aria-current="page"]')).toBeNull()
  })
  it.each([
    '?route=daily-report&taskType=unknown',
    '?route=daily-report&taskType=DAILY_REPORT',
    '?route=daily-report&taskType=%20daily_report%20',
    '?route=daily-report&taskType=daily_report&taskType=notion_fill',
  ])('[breadcrumb] preserves invalid task-filter feedback for %s', async query => {
    await act(async () => {
      history.replaceState({}, '', query)
      window.dispatchEvent(new PopStateEvent('popstate'))
    })
    expect(breadcrumbItems()).toEqual(['无效任务分类'])
    const current = container.querySelector('[data-slot="breadcrumb-page"]')!
    expect(current.textContent).toBe('无效任务分类')
    expect(current.getAttribute('role')).toBe('link')
    expect(current.getAttribute('aria-current')).toBe('page')
    expect(current.getAttribute('aria-disabled')).toBe('true')
    expect(container.querySelector('[data-slot="breadcrumb-separator"]')).toBeNull()
    expect(container.querySelector('[data-sidebar="content"] [aria-current="page"]')).toBeNull()
    expect(container.querySelector('[role="alert"]')?.textContent).toContain('任务分类无效')
  })
  it('restores the independent group URL and switches back to the legacy task list without replacing the shell', async () => {
    await act(async () => root.unmount())
    history.replaceState({}, '', '?route=daily-report&taskType=tencent_sheet_fill&loadId=group-document')
    root = createRoot(container)
    await act(async () => { root.render(<App />); await vi.dynamicImportSettled() })
    const shell = container.querySelector('.pa-shell-theme')!
    const sidebar = container.querySelector('[data-slot="sidebar"]')!
    const content = container.querySelector('[data-page-route]')!
    expect(content.getAttribute('data-page-route')).toBe('daily-report')
    expect(content.hasAttribute('data-shadcn-surface')).toBe(true)
    expect(container.querySelector('.pa-legacy-content')).toBeNull()
    expect(container.querySelector('[aria-label="集团填报工作台"]')).not.toBeNull()
    expect(navButton('集团填报').getAttribute('aria-current')).toBe('page')
    expect(notifyReady).toHaveBeenLastCalledWith('daily-report', 'group-document')
    await act(async () => { navButton('任务清单').click(); await vi.dynamicImportSettled() })
    const legacy = container.querySelector('.pa-legacy-content')!
    expect(legacy).not.toBeNull()
    expect(legacy.getAttribute('data-page-route')).toBe('daily-report')
    expect(legacy.hasAttribute('data-shadcn-surface')).toBe(false)
    expect(legacy.querySelector('[data-business-page="daily-report"]')).not.toBeNull()
    expect(container.querySelector('[aria-label="集团填报工作台"]')).toBeNull()
    expect(new URLSearchParams(location.search).get('taskType')).toBeNull()
    expect(new URLSearchParams(location.search).get('loadId')).toBe('group-document')
    expect(container.querySelector('.pa-shell-theme')).toBe(shell)
    expect(container.querySelector('[data-slot="sidebar"]')).toBe(sidebar)
  })
  it('collapses the upstream sidebar with its trigger and restores it with Ctrl+B', async () => {
    const trigger = container.querySelector<HTMLButtonElement>('[data-slot="sidebar-trigger"]')!
    const breadcrumb = container.querySelector('[data-slot="breadcrumb"]')
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    await act(async () => trigger.click())
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
    expect(container.querySelector('[data-collapsible="icon"]')).not.toBeNull()
    expect(navButton(SIDEBAR_MODULES[0].name).getAttribute('aria-label')).toBe(SIDEBAR_MODULES[0].name)
    await act(async () => { navButton('数据浏览').click(); await vi.dynamicImportSettled() })
    expect(container.querySelector('[data-current-page-title]')?.textContent).toBe('数据浏览')
    const module = SIDEBAR_MODULES.find(item => item.route === routeTable.ROUTES.databaseViewer)!
    expect(breadcrumbItems()).toEqual([module.category, module.name])
    expect(container.querySelector('[data-slot="breadcrumb"]')).toBe(breadcrumb)
    expect(navButton('数据浏览').getAttribute('aria-current')).toBe('page')
    expect(new URLSearchParams(location.search).get('loadId')).toBe('document-one')
    await act(async () => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b', ctrlKey: true })))
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    expect(navButton('数据浏览').getAttribute('aria-current')).toBe('page')
    expect(breadcrumbItems()).toEqual([module.category, module.name])
  })
  it('opens the existing SettingsModal from Header and sidebar without changing the route', async () => {
    const updated = vi.fn()
    window.addEventListener('production-settings-updated', updated)
    try {
      for (const selector of ['[aria-label="打开设置"]', '.sidebar-bottom button']) {
        const trigger = container.querySelector<HTMLButtonElement>(selector)!
        await act(async () => { trigger.focus(); trigger.click() })
        const dialog = document.querySelector('[role="dialog"]')!
        expect(container.getAttribute('aria-hidden')).toBe('true')
        expect(dialog.closest('[aria-hidden="true"]')).toBeNull()
        expect(dialog.contains(document.activeElement)).toBe(true)
        expect(document.getElementById(dialog.getAttribute('aria-labelledby')!)?.textContent).toBe('设置')
        await act(async () => document.querySelector<HTMLButtonElement>('[aria-label="关闭设置"]')!.click())
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)) })
        expect(document.querySelector('[role="dialog"]')).toBeNull()
        expect(document.activeElement).toBe(trigger)
        expect(container.hasAttribute('aria-hidden')).toBe(false)
        expect(location.search).toBe('?loadId=document-one')
      }
      expect(invoke.mock.calls.filter(([operation]) => operation === 'settings.open')).toHaveLength(2)
      expect(updated).toHaveBeenCalledTimes(2)
    } finally { window.removeEventListener('production-settings-updated', updated) }
  })
  it('does not consume editor/form Ctrl+B shortcuts', async () => {
    const editor = document.createElement('textarea')
    container.append(editor)
    const event = new KeyboardEvent('keydown', { key: 'b', ctrlKey: true, bubbles: true, cancelable: true })
    await act(async () => editor.dispatchEvent(event))
    expect(event.defaultPrevented).toBe(false)
    expect(container.querySelector('[data-slot="sidebar-trigger"]')?.getAttribute('aria-expanded')).toBe('true')
    editor.remove()
  })
  it('restores a URL-selected route and new host loadId when the React document is remounted', async () => {
    await act(async () => root.unmount())
    localStorage.setItem(storageKey, 'dark')
    history.replaceState({}, '', '?route=plan-pdf&loadId=document-two')
    root = createRoot(container)
    await act(async () => { root.render(<App />); await vi.dynamicImportSettled() })
    expect(container.querySelector('[data-business-page]')?.getAttribute('data-business-page')).toBe('plan-pdf')
    expect(navButton('挂网计划').getAttribute('aria-current')).toBe('page')
    expect(notifyReady).toHaveBeenLastCalledWith('plan-pdf', 'document-two')
    expect(container.querySelector('.pa-shell-theme')?.classList.contains('dark')).toBe(true)
  })
  it('reserves the native title-bar inset only for WinUI', async () => {
    expect(container.querySelector('[data-winui]')?.getAttribute('data-winui')).toBe('false')
    expect(container.querySelector('[data-electron]')?.getAttribute('data-electron')).toBe('false')
    expect(container.querySelector('.pa-electron-titlebar')).toBeNull()
    expect(hasElectronTitleBar({ protocol: 'pa:', hostname: 'app' })).toBe(true)
    expect(hasElectronTitleBar({ protocol: 'https:', hostname: 'prototype.production-assistant.local' })).toBe(false)
    expect(hasElectronTitleBar({ protocol: 'https:', hostname: 'example.com' })).toBe(false)
    expect(hasNativeTitleBar({ protocol: 'https:', hostname: 'prototype.production-assistant.local' })).toBe(true)
    expect(hasNativeTitleBar({ protocol: 'pa:', hostname: 'app' })).toBe(false)
    expect(hasNativeTitleBar({ protocol: 'http:', hostname: 'localhost' })).toBe(false)
    expect(hasNativeTitleBar({ protocol: 'https:', hostname: 'example.com' })).toBe(false)
  })
})
