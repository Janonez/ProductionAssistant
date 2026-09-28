import { Component, lazy, Suspense, useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { invoke, notifyReady } from './bridge'
import type { Route } from './types'
import { OperationSidebar } from './OperationSidebar'
import ProductionMessagePage from './ProductionMessagePage'
const AutomationPage = lazy(() => import('./AutomationPage').then(module => ({ default: module.AutomationPage })))
const DailyWeldPage = lazy(() => import('./DailyWeldPage').then(module => ({ default: module.DailyWeldPage })))
const PlanPdfPage = lazy(() => import('./PlanPdfPage').then(module => ({ default: module.PlanPdfPage })))
const ProductionMeetingPage = lazy(() => import('./ProductionMeetingPage').then(module => ({ default: module.ProductionMeetingPage })))
const ReportCenterPage = lazy(() => import('./ReportCenterPage').then(module => ({ default: module.ReportCenterPage })))
const DatabaseViewerPage = lazy(() => import('./DatabaseViewerPage').then(module => ({ default: module.DatabaseViewerPage })))
const SettingsModal = lazy(() => import('./SettingsModal'))

// Keep the handshake inside Suspense: a pending route is not ready yet.
function RouteReady({ route, navigation }: { route: string; navigation: string }) {
  useEffect(() => { notifyReady(route, navigation) }, [route, navigation])
  return null
}

class LoadBoundary extends Component<{ children: ReactNode; onClose?: () => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (!this.state.failed) return this.props.children
    const error = <div className="route-load-status" role="alert">界面加载失败，请重新加载。<button className="secondary" onClick={() => window.location.reload()}>重新加载</button>{this.props.onClose && <button className="secondary" onClick={this.props.onClose}>关闭</button>}</div>
    return this.props.onClose ? <div className="settings-overlay"><div className="settings-window">{error}</div></div> : error
  }
}

const loading = <div className="route-load-status" role="status">正在加载界面…</div>

export function App() {
  const [location, setLocation] = useState(() => window.location.search)
  const [settingsOpen, setSettingsOpen] = useState(false)
  useEffect(() => {
    const changed = () => setLocation(window.location.search)
    window.addEventListener('popstate', changed)
    return () => window.removeEventListener('popstate', changed)
  }, [])

  const search = new URLSearchParams(location)
  const requested = search.get('route')
  const route = (
    requested?.startsWith('navigation:') ||
    requested === 'daily-weld' ||
    requested === 'production-message' ||
    requested === 'database-viewer' ||
    requested === 'daily-report' ||
    requested === 'report-center' || requested === 'plan-pdf' || requested === 'production-meeting'
      ? requested
      : 'production-message'
  ) as Route
  const navigation = search.get('navigation') || ''
  const reduced = useReducedMotion()

  const goNative = (tag: string) => invoke('app.navigateNative', { tag }).catch(() => undefined)
  const active = route.startsWith('navigation:') ? route.slice('navigation:'.length) : route
  const native = route.startsWith('navigation:')

  useEffect(() => {
    document.body.classList.toggle('settings-over-native', native && settingsOpen)
    return () => document.body.classList.remove('settings-over-native')
  }, [native, settingsOpen])

  const closeSettings = () => {
    setSettingsOpen(false)
    window.dispatchEvent(new Event('production-settings-updated'))
    invoke('settings.close').catch(() => undefined)
  }

  return <div className={`desktop-shell ${native && settingsOpen ? 'settings-over-native' : ''}`}>
    <div className="production-message-demo desktop-shell-navigation">
      <OperationSidebar active={active} navigate={goNative} openSettings={() => setSettingsOpen(true)} />
    </div>
    <div className={`desktop-shell-content ${native ? 'desktop-shell-content-native' : ''}`}>
      {native ? <><div className="native-content-slot" aria-hidden="true" /><RouteReady route={route} navigation={navigation} /></>
        : <AnimatePresence mode="wait">
            <motion.div
              key={route}
              className={route === 'production-message' || route === 'daily-weld' ? 'production-message-demo production-message-content' : 'app-shell'}
              data-page-route={route}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: .2 }}
            >
              <LoadBoundary key={navigation}>
                <Suspense fallback={loading}>
                  {route === 'production-message' ? <ProductionMessagePage /> : route === 'daily-weld' ? <DailyWeldPage openSettings={() => setSettingsOpen(true)} /> : <main>{route === 'production-meeting' ? <ProductionMeetingPage /> : route === 'plan-pdf' ? <PlanPdfPage /> : route === 'database-viewer' ? <DatabaseViewerPage /> : route === 'daily-report' ? <AutomationPage openSettings={() => setSettingsOpen(true)} /> : <ReportCenterPage />}</main>}
                  <RouteReady route={route} navigation={navigation} />
                </Suspense>
              </LoadBoundary>
            </motion.div>
          </AnimatePresence>}
    </div>
    {settingsOpen && <LoadBoundary onClose={closeSettings}><Suspense fallback={<div className="settings-overlay"><div className="settings-window"><div className="route-load-status" role="status">正在加载设置…<button className="secondary" onClick={closeSettings}>取消</button></div></div></div>}><SettingsModal open onClose={closeSettings} /></Suspense></LoadBoundary>}
  </div>
}
