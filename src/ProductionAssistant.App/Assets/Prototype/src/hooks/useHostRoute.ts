import { useEffect, useState } from 'react'
import { resolveHostRoute } from '../routes'
import { subscribeRoute } from '../routes/navigation'
import { ROUTES, parseAutomationTaskFilter, type AutomationTaskFilter } from '../routes/routeTable'

export function useHostRoute(): ReturnType<typeof resolveHostRoute> & { taskType: AutomationTaskFilter | null } {
  const [location, setLocation] = useState(() => window.location.search)
  useEffect(() => {
    const changed = () => setLocation(window.location.search)
    window.addEventListener('popstate', changed)
    const unsubscribe = subscribeRoute(changed)
    setLocation(window.location.search)
    return () => {
      window.removeEventListener('popstate', changed)
      unsubscribe()
    }
  }, [])
  const resolved = resolveHostRoute(location)
  const values = new URLSearchParams(location).getAll('taskType')
  const taskType = values.length > 1 ? null : parseAutomationTaskFilter(values[0] ?? null)
  return { ...resolved, taskType: resolved.route === ROUTES.dailyReport ? taskType : '' }
}
