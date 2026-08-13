export interface BridgeRequest<T = unknown> { id: string; operation: string; payload?: T }
export interface BridgeResponse<T = unknown> { id: string; ok: boolean; data?: T; error?: string }

type Pending = { resolve: (value: unknown) => void; reject: (reason: Error) => void; timer: number }
type WebView = { postMessage(value: unknown): void; addEventListener(name: string, handler: (event: MessageEvent) => void): void }

const pending = new Map<string, Pending>()
let nextId = 0
const webview = () => (window as typeof window & { chrome?: { webview?: WebView } }).chrome?.webview

export function receive(response: BridgeResponse) {
  const request = pending.get(response.id)
  if (!request) return
  window.clearTimeout(request.timer)
  pending.delete(response.id)
  response.ok ? request.resolve(response.data) : request.reject(new Error(response.error || '操作失败'))
}

webview()?.addEventListener('message', event => receive(event.data as BridgeResponse))

export function invoke<T>(operation: string, payload?: unknown, timeoutMs = 30000): Promise<T> {
  const host = webview()
  if (!host) return Promise.reject(new Error('当前页面未连接到桌面宿主'))
  const id = `${Date.now()}-${++nextId}`
  return new Promise<T>((resolve, reject) => {
    const timer = window.setTimeout(() => {
      pending.delete(id)
      reject(new Error('操作超时，请重试'))
    }, timeoutMs)
    pending.set(id, { resolve: value => resolve(value as T), reject, timer })
    host.postMessage({ id, operation, payload } satisfies BridgeRequest)
  })
}

export function cancelPending(reason = '操作已取消') {
  for (const request of pending.values()) {
    window.clearTimeout(request.timer)
    request.reject(new Error(reason))
  }
  pending.clear()
}
