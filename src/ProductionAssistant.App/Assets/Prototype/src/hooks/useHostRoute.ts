import { useEffect, useState } from 'react'
import { resolveHostRoute } from '../routes'
import { subscribeRoute } from '../routes/navigation'

export function useHostRoute() {
  const [location, setLocation] = useState(() => window.location.search)
  useEffect(() => {
    const changed = () => setLocation(window.location.search)
    window.addEventListener('popstate', changed)
    const unsubscribe = subscribeRoute(changed)
    setLocation(window.location.search)
    return () => {
      window.removeEventListener('popstate', changed)
      unsubscribe()
    }
  }, [])
  return resolveHostRoute(location)
}
