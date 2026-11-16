export interface BridgeRequest<T = unknown> { id: string; operation: string; payload?: T; timeoutMs?: number }
export interface BridgeResponse<T = unknown> { id: string; ok?: boolean; type?: 'progress'; data?: T; error?: string; errorCode?: string; retryable?: boolean; state?: string }

export type ServiceState = { state: 'NotStarted' | 'Starting' | 'Initializing' | 'Ready' | 'Failed' | 'Stopping' | 'Stopped'; startupId?: string; phase?: string; errorCode?: string }
const serviceListeners = new Set<() => void>()
let serviceState: ServiceState = { state: 'NotStarted' }
const browserReady: ServiceState = { state: 'Ready' }
const electronHost = () => {
  const desktop = window as typeof window & { chrome?: { webview?: Host }; paHost?: Host }
  return desktop.chrome?.webview ? undefined : desktop.paHost
}
export const getServiceState = () => electronHost() ? serviceState : browserReady
export const subscribeServiceState = (listener: () => void) => { serviceListeners.add(listener); return () => { serviceListeners.delete(listener) } }
export const requestServiceState = () => electronHost()?.postMessage({ type: 'app.serviceState' })
export const restartApplication = () => electronHost()?.postMessage({ type: 'app.restart' })

type Pending = { resolve: (value: unknown) => void; reject: (reason: Error) => void; timer: number; progress?: (value: unknown) => void }
type Host = { postMessage(value: unknown): void; addEventListener(name: string, handler: (event: { data: unknown }) => void): void }

const pending = new Map<string, Pending>()
let nextId = 0
const host = () => {
  const desktop = window as typeof window & { chrome?: { webview?: Host }; paHost?: Host }
  return desktop.chrome?.webview ?? desktop.paHost
}
export const hasHost = () => Boolean(host())

// Electron shell preference only; never send this message to WinUI or the Sidecar.
export function notifyTheme(theme: 'light' | 'dark' | 'system') {
  const desktop = window as typeof window & { chrome?: { webview?: Host }; paHost?: Host }
  if (!desktop.chrome?.webview) desktop.paHost?.postMessage({ type: 'app.theme', theme })
}

export function receive(response: BridgeResponse) {
  const event = response as unknown as { type?: string; data?: ServiceState }
  if (event.type === 'service.state') {
    if (event.data && ['NotStarted', 'Starting', 'Initializing', 'Ready', 'Failed', 'Stopping', 'Stopped'].includes(event.data.state)) {
      serviceState = event.data
      serviceListeners.forEach(listener => listener())
    }
    return
  }
  const request = pending.get(response.id)
  if (!request) return
  if (response.type === 'progress') { request.progress?.(response.data); return }
  window.clearTimeout(request.timer)
  pending.delete(response.id)
  response.ok ? request.resolve(response.data) : request.reject(Object.assign(new Error(response.error || '操作失败'), { code: response.errorCode, retryable: response.retryable, state: response.state }))
}

host()?.addEventListener('message', event => receive(event.data as BridgeResponse))

// 传输层只负责发送 app.ready；同一文档加载代次的幂等（按 loadId 令牌去重）由 bridge/index.ts 适配层保证。
export function notifyReady(route: string, loadId: string) {
  host()?.postMessage({ type: 'app.ready', route, loadId,
    ...(import.meta.env.VITE_METIS_BUILD_ID ? { buildId: import.meta.env.VITE_METIS_BUILD_ID } : {}),
    moduleEntryMs: Math.round(performance.getEntriesByName('module-entry')[0]?.startTime || 0),
    readyMs: Math.round(performance.now()) })
}

export function invoke<T>(operation: string, payload?: unknown, timeoutMs = 30000, onProgress?: (value: unknown) => void): Promise<T> {
  const desktop = host()
  if (!desktop) return Promise.reject(new Error('当前页面未连接到桌面宿主'))
  const id = `${Date.now()}-${++nextId}`
  return new Promise<T>((resolve, reject) => {
    const timer = window.setTimeout(() => {
      pending.delete(id)
      reject(new Error('操作超时，执行结果尚未确认，请先核对状态。'))
    }, timeoutMs)
    pending.set(id, { resolve: value => resolve(value as T), reject, timer, progress: onProgress })
    desktop.postMessage({ id, operation, payload, ...(electronHost() ? { timeoutMs } : {}) } satisfies BridgeRequest)
  })
}

export function cancelPending(reason = '操作已取消') {
  for (const request of pending.values()) {
    window.clearTimeout(request.timer)
    request.reject(new Error(reason))
  }
  pending.clear()
}
