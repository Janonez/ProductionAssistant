import { DEFAULT_ROUTE, isRouteKey, LEGACY_NAVIGATION_PREFIX, type RouteKey } from './routeTable'

export function resolveHostRoute(location: string): { route: RouteKey; loadId: string } {
  const search = new URLSearchParams(location)
  const requested = search.get('route')
  const candidate = requested?.startsWith(LEGACY_NAVIGATION_PREFIX)
    ? requested.slice(LEGACY_NAVIGATION_PREFIX.length)
    : requested
  const route = isRouteKey(candidate) ? candidate : DEFAULT_ROUTE
  return { route, loadId: search.get('loadId') || '' }
}
