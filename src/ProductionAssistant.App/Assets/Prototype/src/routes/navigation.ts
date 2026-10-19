import { invoke } from '../bridge/index'
import { resolveHostRoute } from './index'
import { isRouteKey } from './routeTable'

export function navigate(tag: string) {
  return invoke('app.navigateNative', { tag }).catch(() => undefined)
}

const routeListeners = new Set<() => void>()

export function subscribeRoute(listener: () => void): () => void {
  routeListeners.add(listener)
  return () => { routeListeners.delete(listener) }
}

export function navigateInDocument(tag: string): boolean {
  if (!isRouteKey(tag) || resolveHostRoute(window.location.search).displayRoute === tag) return false

  const params = new URLSearchParams(window.location.search)
  params.set('route', tag)
  window.history.replaceState(null, '', '?' + params.toString())
  for (const listener of routeListeners) listener()
  return true
}
