import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { invoke, notifyReady } from './bridge'
import type { Route } from './types'
import { AutomationPage } from './AutomationPage'
import { DailyWeldPage } from './DailyWeldPage'
import { OperationSidebar } from './OperationSidebar'
import ProductionMessagePage from './ProductionMessagePage'
import { PlanPdfPage } from './PlanPdfPage'
import { ProductionMeetingPage } from './ProductionMeetingPage'
import { ReportCenterPage } from './ReportCenterPage'
import SettingsModal from './SettingsModal'
import { DatabaseViewerPage } from './DatabaseViewerPage'

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

  useEffect(() => { notifyReady(route, navigation) }, [route, navigation])
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
      {native ? <div className="native-content-slot" aria-hidden="true" />
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
              {route === 'production-message' ? <ProductionMessagePage /> : route === 'daily-weld' ? <DailyWeldPage openSettings={() => setSettingsOpen(true)} /> : <main>{route === 'production-meeting' ? <ProductionMeetingPage /> : route === 'plan-pdf' ? <PlanPdfPage /> : route === 'database-viewer' ? <DatabaseViewerPage /> : route === 'daily-report' ? <AutomationPage openSettings={() => setSettingsOpen(true)} /> : <ReportCenterPage />}</main>}
            </motion.div>
          </AnimatePresence>}
    </div>
    <SettingsModal open={settingsOpen} onClose={closeSettings} />
  </div>
}
