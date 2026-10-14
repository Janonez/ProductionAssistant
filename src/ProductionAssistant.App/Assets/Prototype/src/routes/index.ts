import type { Route } from '../lib/types'

export function resolveHostRoute(location: string): { route: Route; navigation: string } {
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
  return { route, navigation: search.get('navigation') || '' }
}
