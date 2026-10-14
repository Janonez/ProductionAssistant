import * as webview from '../bridge'

type ProgressListener = (value: unknown) => void
const progressListeners = new Map<string, Set<ProgressListener>>()

export function invoke<T>(operation: string, payload?: unknown, timeoutMs = 30000, progress?: ProgressListener): Promise<T> {
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

export const notifyReady = webview.notifyReady
export const bridge = { invoke, onProgress, ready: notifyReady }
export { cancelPending } from '../bridge'
export type { BridgeRequest, BridgeResponse } from '../bridge'
