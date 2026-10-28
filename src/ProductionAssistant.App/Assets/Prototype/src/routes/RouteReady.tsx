import { useEffect } from 'react'
import { notifyReady } from '../bridge/index'

// Keep this handshake inside Suspense: a pending route is not ready yet.
// route 仅用于诊断日志，宿主只校验 loadId（文档加载代次）。
export function RouteReady({ route, loadId }: { route: string; loadId: string }) {
  useEffect(() => { notifyReady(route, loadId) }, [route, loadId])
  return null
}
