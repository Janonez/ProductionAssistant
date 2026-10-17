import { DEFAULT_ROUTE, isRouteKey, LEGACY_NAVIGATION_PREFIX, type Route, type RouteKey } from './routeTable'

export function resolveHostRoute(location: string): { route: Route; navigation: string; displayRoute: RouteKey } {
  const search = new URLSearchParams(location)
  const requested = search.get('route')
  const route = (
    requested?.startsWith(LEGACY_NAVIGATION_PREFIX) || isRouteKey(requested)
      ? requested
      : DEFAULT_ROUTE
  ) as Route
  const displayCandidate = route.startsWith(LEGACY_NAVIGATION_PREFIX)
    ? route.slice(LEGACY_NAVIGATION_PREFIX.length)
    : route
  const displayRoute = isRouteKey(displayCandidate) ? displayCandidate : DEFAULT_ROUTE
  return { route, navigation: search.get('navigation') || '', displayRoute }
}
