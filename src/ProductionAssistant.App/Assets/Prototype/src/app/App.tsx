import { Component, lazy, Suspense, useCallback, useState, type ReactNode } from 'react'
import { RouteSkeleton } from '../components/layout/LoadingSkeleton'
import { navigateInDocument } from '../routes/navigation'
import { useHostRoute } from '../hooks/useHostRoute'
import { RouteReady } from '../routes/RouteReady'
import { ROUTES } from '../routes/routeTable'
import { OperationSidebar } from '../components/layout/OperationSidebar'
import ProductionMessagePage from '../features/production-message/ProductionMessagePage'
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
    return this.props.onClose ? <div className="settings-overlay"><div className="settings-window">{error}</div></div> : error
  }
}



export function App() {
  const { route, navigation } = useHostRoute()
  const [settingsOpen, setSettingsOpen] = useState(false)


  const goTo = (tag: string) => { navigateInDocument(tag) }

  const closeSettings = useCallback(() => {
    setSettingsOpen(false)
    window.dispatchEvent(new Event('production-settings-updated'))
  }, [])

  return <div className="desktop-shell">
    <div className="production-message-demo desktop-shell-navigation">
      <OperationSidebar active={route} navigate={goTo} openSettings={() => setSettingsOpen(true)} />
    </div>
    <div className="desktop-shell-content">
      <div
        key={route}
        className={route === ROUTES.productionMessage || route === ROUTES.dailyWeld ? 'production-message-demo production-message-content' : 'app-shell'}
        data-page-route={route}
      >
        <LoadBoundary>
          <Suspense fallback={<RouteSkeleton route={route} />}>
            <RouteReady route={route} navigation={navigation} />
            {route === ROUTES.productionMessage ? <ProductionMessagePage /> : route === ROUTES.dailyWeld ? <DailyWeldPage openSettings={() => setSettingsOpen(true)} /> : <main>{route === ROUTES.productionMeeting ? <ProductionMeetingPage /> : route === ROUTES.planPdf ? <PlanPdfPage /> : route === ROUTES.databaseViewer ? <DatabaseViewerPage /> : route === ROUTES.dailyReport ? <AutomationPage openSettings={() => setSettingsOpen(true)} /> : <ReportCenterPage />}</main>}

          </Suspense>
        </LoadBoundary>
      </div>
    </div>
    {settingsOpen && <LoadBoundary onClose={closeSettings}><SettingsModal open onClose={closeSettings} /></LoadBoundary>}
  </div>
}
