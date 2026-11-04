import type { ReactNode } from 'react'
import { useTheme } from './ThemeProvider'
// Radix portals are under body: carry the same token and reset boundary.
export function PortalSurface({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme()
  return <div className={`pa-shell-theme pa-shell-portal ${resolvedTheme === 'dark' ? 'dark' : ''}`} data-shadcn-surface="">{children}</div>
}
