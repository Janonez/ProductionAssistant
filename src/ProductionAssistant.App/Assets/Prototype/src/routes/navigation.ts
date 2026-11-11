import { resolveHostRoute } from './index'
import { isRouteKey, SIDEBAR_MODULES, navigationKey } from './routeTable'

const routeListeners = new Set<() => void>()

export function subscribeRoute(listener: () => void): () => void {
  routeListeners.add(listener)
  return () => { routeListeners.delete(listener) }
}

// 文档内导航只改 URL 的 route 参数并通知订阅者，不经宿主。
export function navigateInDocument(tag: string): boolean {
  const params = new URLSearchParams(window.location.search)
  const module = SIDEBAR_MODULES.find(item => navigationKey(item) === tag)
  const route = module?.route ?? tag
  if (!isRouteKey(route)) return false
  const taskType = module?.taskType ?? ''
  if (resolveHostRoute(window.location.search).route === route && (params.get('taskType') ?? '') === taskType) return false
  params.set('route', route)
  if (taskType) params.set('taskType', taskType)
  else params.delete('taskType')
  window.history.replaceState(null, '', '?' + params.toString())
  for (const listener of routeListeners) listener()
  return true
}
