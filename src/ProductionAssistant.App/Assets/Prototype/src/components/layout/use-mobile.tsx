// Adapted from satnaing/shadcn-admin @ e16c87f; Copyright (c) 2024 Sat Naing; MIT.
import { useSyncExternalStore } from 'react'
const MOBILE_QUERY = '(max-width: 767px)'
export function useIsMobile() {
  return useSyncExternalStore(
    callback => {
      const query = window.matchMedia?.(MOBILE_QUERY)
      query?.addEventListener('change', callback)
      return () => query?.removeEventListener('change', callback)
    },
    () => window.matchMedia?.(MOBILE_QUERY).matches ?? false,
    () => false,
  )
}
