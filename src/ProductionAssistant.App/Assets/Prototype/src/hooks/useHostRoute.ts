import { useEffect, useState } from 'react'
import { resolveHostRoute } from '../routes'

export function useHostRoute() {
  const [location, setLocation] = useState(() => window.location.search)
  useEffect(() => {
    const changed = () => setLocation(window.location.search)
    window.addEventListener('popstate', changed)
    return () => window.removeEventListener('popstate', changed)
  }, [])
  return resolveHostRoute(location)
}
