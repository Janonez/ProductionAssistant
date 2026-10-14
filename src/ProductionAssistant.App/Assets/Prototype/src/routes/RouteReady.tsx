import { useEffect } from 'react'
import { notifyReady } from '../bridge/index'

// Keep this handshake inside Suspense: a pending route is not ready yet.
export function RouteReady({ route, navigation }: { route: string; navigation: string }) {
  useEffect(() => { notifyReady(route, navigation) }, [route, navigation])
  return null
}
