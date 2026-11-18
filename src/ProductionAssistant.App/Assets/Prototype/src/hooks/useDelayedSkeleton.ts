import { useEffect, useRef, useState } from 'react'

// Only first-load remote content uses this; local data and actions use normal controls.
export function useDelayedSkeleton(loading: boolean, hasData = false) {
  const [visible, setVisible] = useState(false)
  const shownAt = useRef<number | undefined>(undefined)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined
    if (loading && !hasData) {
      if (shownAt.current === undefined) timer = setTimeout(() => {
        shownAt.current = Date.now()
        setVisible(true)
      }, 200)
    } else if (shownAt.current !== undefined) {
      timer = setTimeout(() => {
        shownAt.current = undefined
        setVisible(false)
      }, Math.max(0, 300 - (Date.now() - shownAt.current)))
    }
    return () => clearTimeout(timer)
  }, [loading, hasData])
  return visible
}
