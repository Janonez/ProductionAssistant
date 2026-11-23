import { Component, lazy, Suspense, useCallback, useEffect, useState, type ReactNode } from 'react'
import { Spinner } from '../components/ui/spinner'
import { LocalDataBootstrap, LocalDataProvider } from './LocalData'
import { navigateInDocument } from '../routes/navigation'
import { useHostRoute } from '../hooks/useHostRoute'
import { RouteReady } from '../routes/RouteReady'
import { ROUTES } from '../routes/routeTable'
import { AppLayout } from '../components/layout/AppLayout'
import { LocalServiceBoundary } from '../components/layout/LocalServiceBoundary'
import { ThemeProvider } from '../components/layout/ThemeProvider'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../components/ui/dialog'
import ProductionMessagePage from '../features/production-message/ProductionMessagePage'
let preparedGroupPage: typeof import('../features/group-submission/GroupSubmissionPage')['GroupSubmissionPage'] | undefined
const loadGroupPage = () => import('../features/group-submission/GroupSubmissionPage').then(({ GroupSubmissionPage }) => {
  preparedGroupPage = GroupSubmissionPage
  return { default: GroupSubmissionPage }
})
const LazyGroupPage = lazy(loadGroupPage)

function GroupSubmissionRoute() {
  const [Page] = useState(() => preparedGroupPage ?? LazyGroupPage)
  return <Page />
}
const AutomationPage = lazy(() => import('../features/daily-report/AutomationPage').then(module => ({ default: module.AutomationPage })))
const DailyWeldPage = lazy(() => import('../features/daily-weld/DailyWeldPage').then(module => ({ default: module.DailyWeldPage })))
const PlanPdfPage = lazy(() => import('../features/plan-pdf/PlanPdfPage').then(module => ({ default: module.PlanPdfPage })))
const ProductionMeetingPage = lazy(() => import('../features/production-meeting/ProductionMeetingPage').then(module => ({ default: module.ProductionMeetingPage })))
const ReportCenterPage = lazy(() => import('../features/report-center/ReportCenterPage').then(module => ({ default: module.ReportCenterPage })))
const DatabaseViewerPage = lazy(() => import('../features/database-viewer/DatabaseViewerPage').then(module => ({ default: module.DatabaseViewerPage })))
import SettingsModal from './SettingsModal'

class LoadBoundary extends Component<{ children: ReactNode; onClose?: () => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (!this.state.failed) return this.props.children
    const error = <div className="route-load-status" role="alert">界面加载失败，请重新加载。<button className="secondary" onClick={() => window.location.reload()}>重新加载</button>{this.props.onClose && <button className="secondary" onClick={this.props.onClose}>关闭</button>}</div>
    return this.props.onClose ? <Dialog open onOpenChange={open => { if (!open) this.props.onClose?.() }}><DialogContent closeLabel="关闭设置"><DialogTitle>设置</DialogTitle><DialogDescription>设置界面暂时无法加载。</DialogDescription>{error}</DialogContent></Dialog> : error
  }
}



export function App() {
  const { route, loadId, taskType } = useHostRoute()
  useEffect(() => {
    // Warm the workbench without mounting it or issuing any business requests.
    const frame = window.requestAnimationFrame(() => { void loadGroupPage().catch(() => {}) })
    return () => window.cancelAnimationFrame(frame)
  }, [])
  const [settingsOpen, setSettingsOpen] = useState(false)
  const pageKey = `${route}:${taskType}`
  const [visited, setVisited] = useState([{ route, taskType, key: pageKey }])
  if (!visited.some(page => page.key === pageKey)) setVisited([...visited, { route, taskType, key: pageKey }])
  const pages = [{ route, taskType, key: pageKey }, ...visited.filter(page => page.key !== pageKey)]


  const goTo = (tag: string) => { navigateInDocument(tag) }

  const closeSettings = useCallback(() => {
    setSettingsOpen(false)
    window.dispatchEvent(new Event('production-settings-updated'))
  }, [])

  return <ThemeProvider><LocalDataProvider>
    <AppLayout route={route} taskType={taskType} navigate={goTo} openSettings={() => setSettingsOpen(true)}>
      <LocalDataBootstrap enabled={taskType !== null} />{pages.map(page => {
        const active = page.key === pageKey
        const group = page.route === ROUTES.dailyReport && page.taskType === 'tencent_sheet_fill'
        const productionMessage = page.route === ROUTES.productionMessage
        return <div
        key={page.key}
        hidden={!active}
        style={active ? undefined : { display: 'none' }}
        className={group || productionMessage ? 'min-w-0' : `pa-legacy-content ${page.route === ROUTES.dailyWeld ? 'production-message-demo production-message-content' : 'app-shell'}`}
        data-shadcn-surface={group ? '' : undefined}
        data-page-route={active ? page.route : undefined}
      >
        <LoadBoundary>
          <Suspense fallback={<p role="status" aria-label="正在加载页面" className="flex items-center gap-2"><Spinner />正在加载页面…</p>}>
            {active && <RouteReady route={page.route} loadId={loadId} />}
            {productionMessage && page.taskType !== null
              ? <LocalServiceBoundary>{ready => <ProductionMessagePage serviceReady={ready} />}</LocalServiceBoundary>
              : <LocalServiceBoundary>
                {page.taskType === null ? <p role="alert">任务分类无效，请从左侧重新选择业务分类。</p> : page.route === ROUTES.dailyWeld ? <DailyWeldPage openSettings={() => setSettingsOpen(true)} /> : <main>{page.route === ROUTES.productionMeeting ? <ProductionMeetingPage /> : page.route === ROUTES.planPdf ? <PlanPdfPage /> : page.route === ROUTES.databaseViewer ? <DatabaseViewerPage /> : group ? <GroupSubmissionRoute /> : page.route === ROUTES.dailyReport ? <AutomationPage taskType={page.taskType} openSettings={() => setSettingsOpen(true)} /> : <ReportCenterPage />}</main>}
              </LocalServiceBoundary>}
          </Suspense>
        </LoadBoundary>
      </div>})}
    </AppLayout>
    {settingsOpen && <LoadBoundary onClose={closeSettings}><SettingsModal open onClose={closeSettings} /></LoadBoundary>}
  </LocalDataProvider></ThemeProvider>
}
