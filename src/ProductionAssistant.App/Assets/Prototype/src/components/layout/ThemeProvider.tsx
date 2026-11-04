// Adapted from satnaing/shadcn-admin @ e16c87f; Copyright (c) 2024 Sat Naing; MIT.
// Scope the theme to the shell and its portals; legacy business pages remain light.
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
type Theme = 'light' | 'dark' | 'system'
const ThemeContext = createContext<{
  theme: Theme; resolvedTheme: 'light' | 'dark'; setTheme: (theme: Theme) => void
}>({ theme: 'system', resolvedTheme: 'light', setTheme: () => {} })
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system')
  const [systemDark, setSystemDark] = useState(() => window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false)
  useEffect(() => {
    const query = window.matchMedia?.('(prefers-color-scheme: dark)')
    if (!query) return
    const changed = () => setSystemDark(query.matches)
    changed()
    query.addEventListener('change', changed)
    return () => query.removeEventListener('change', changed)
  }, [])
  const resolvedTheme = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme
  return <ThemeContext value={{ theme, resolvedTheme, setTheme }}>{children}</ThemeContext>
}
export const useTheme = () => useContext(ThemeContext)
