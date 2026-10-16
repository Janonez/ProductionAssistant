import { DEFAULT_ROUTE, isRouteKey, LEGACY_NAVIGATION_PREFIX, type Route } from './routeTable'

export function resolveHostRoute(location: string): { route: Route; navigation: string } {
  const search = new URLSearchParams(location)
  const requested = search.get('route')
  const route = (
    requested?.startsWith(LEGACY_NAVIGATION_PREFIX) || isRouteKey(requested)
      ? requested
      : DEFAULT_ROUTE
  ) as Route
  return { route, navigation: search.get('navigation') || '' }
}
