import { useEffect } from 'react'
import { notifyReady } from '../bridge/index'

// Keep this handshake inside Suspense: a pending route is not ready yet.
// route 仅用于诊断日志，宿主只校验 navigation（文档加载代次）。
export function RouteReady({ route, navigation }: { route: string; navigation: string }) {
  useEffect(() => { notifyReady(route, navigation) }, [route, navigation])
  return null
}
