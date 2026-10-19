import { resolveHostRoute } from './index'
import { isRouteKey } from './routeTable'

const routeListeners = new Set<() => void>()

export function subscribeRoute(listener: () => void): () => void {
  routeListeners.add(listener)
  return () => { routeListeners.delete(listener) }
}

// 文档内导航只改 URL 的 route 参数并通知订阅者，不经宿主。
export function navigateInDocument(tag: string): boolean {
  if (!isRouteKey(tag) || resolveHostRoute(window.location.search).route === tag) return false

  const params = new URLSearchParams(window.location.search)
  params.set('route', tag)
  window.history.replaceState(null, '', '?' + params.toString())
  for (const listener of routeListeners) listener()
  return true
}
