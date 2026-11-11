import { Component, lazy, Suspense, useCallback, useState, type ReactNode } from 'react'
import { RouteSkeleton } from '../components/layout/LoadingSkeleton'
import { navigateInDocument } from '../routes/navigation'
import { useHostRoute } from '../hooks/useHostRoute'
import { RouteReady } from '../routes/RouteReady'
import { ROUTES } from '../routes/routeTable'
import { AppLayout } from '../components/layout/AppLayout'
import { ThemeProvider } from '../components/layout/ThemeProvider'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../components/ui/dialog'
import ProductionMessagePage from '../features/production-message/ProductionMessagePage'
import { GroupSubmissionPage } from '../features/group-submission/GroupSubmissionPage'
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
  const groupSubmission = route === ROUTES.dailyReport && taskType === 'tencent_sheet_fill'
  const [settingsOpen, setSettingsOpen] = useState(false)


  const goTo = (tag: string) => { navigateInDocument(tag) }

  const closeSettings = useCallback(() => {
    setSettingsOpen(false)
    window.dispatchEvent(new Event('production-settings-updated'))
  }, [])

  return <ThemeProvider>
    <AppLayout route={route} taskType={taskType} navigate={goTo} openSettings={() => setSettingsOpen(true)}>
      <div
        key={`${route}:${taskType}`}
        className={groupSubmission ? 'min-w-0' : `pa-legacy-content ${route === ROUTES.productionMessage || route === ROUTES.dailyWeld ? 'production-message-demo production-message-content' : 'app-shell'}`}
        data-shadcn-surface={groupSubmission ? '' : undefined}
        data-page-route={route}
      >
        <LoadBoundary>
          <Suspense fallback={<RouteSkeleton route={route} />}>
            <RouteReady route={route} loadId={loadId} />
            {taskType === null ? <p role="alert">任务分类无效，请从左侧重新选择业务分类。</p> : route === ROUTES.productionMessage ? <ProductionMessagePage /> : route === ROUTES.dailyWeld ? <DailyWeldPage openSettings={() => setSettingsOpen(true)} /> : <main>{route === ROUTES.productionMeeting ? <ProductionMeetingPage /> : route === ROUTES.planPdf ? <PlanPdfPage /> : route === ROUTES.databaseViewer ? <DatabaseViewerPage /> : groupSubmission ? <GroupSubmissionPage /> : route === ROUTES.dailyReport ? <AutomationPage taskType={taskType} openSettings={() => setSettingsOpen(true)} /> : <ReportCenterPage />}</main>}

          </Suspense>
        </LoadBoundary>
      </div>
    </AppLayout>
    {settingsOpen && <LoadBoundary onClose={closeSettings}><SettingsModal open onClose={closeSettings} /></LoadBoundary>}
  </ThemeProvider>
}
