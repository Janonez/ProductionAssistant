import * as webview from './webview'

const hasWebView = () => Boolean((window as typeof window & { chrome?: { webview?: unknown } }).chrome?.webview)

type ProgressListener = (value: unknown) => void
const progressListeners = new Map<string, Set<ProgressListener>>()
const readyLoadIds = new Set<string>()

export function invoke<T>(operation: string, payload?: unknown, timeoutMs = 30000, progress?: ProgressListener): Promise<T> {
  if (import.meta.env.DEV && !hasWebView())
    return import('./mock').then(mock => mock.invoke<T>(operation, payload))
  return webview.invoke<T>(operation, payload, timeoutMs, value => {
    progress?.(value)
    progressListeners.get(operation)?.forEach(listener => listener(value))
  })
}

// Subscriptions observe progress for this operation through the adapter.
// The returned function removes the listener; per-request callbacks still work.
export function onProgress(operation: string, listener: ProgressListener): () => void {
  const listeners = progressListeners.get(operation) ?? new Set<ProgressListener>()
  listeners.add(listener)
  progressListeners.set(operation, listeners)
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0 && progressListeners.get(operation) === listeners) progressListeners.delete(operation)
  }
}

// ready 对同一文档加载代次（loadId 令牌）幂等，由适配层保证，各传输实现不需要各自去重；空令牌不去重；令牌不裁剪，不比较 route。
export function notifyReady(route: string, loadId: string): void {
  if (loadId && readyLoadIds.has(loadId)) return
  if (loadId) readyLoadIds.add(loadId)
  if (import.meta.env.DEV && !hasWebView()) {
    void import('./mock').then(mock => mock.ready(route, loadId))
    return
  }
  webview.notifyReady(route, loadId)
}
export const bridge = { invoke, onProgress, ready: notifyReady }
export { cancelPending } from './webview'
export type { BridgeRequest, BridgeResponse } from './webview'
