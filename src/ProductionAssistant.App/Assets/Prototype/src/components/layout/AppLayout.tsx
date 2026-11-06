// Adapted from AuthenticatedLayout in satnaing/shadcn-admin @ e16c87f.
// Copyright (c) 2024 Sat Naing. MIT; see docs/third-party/shadcn-admin-LICENSE.txt.
import type { ReactNode } from 'react'
import { Settings2 } from 'lucide-react'
import { SIDEBAR_MODULES } from '../../routes/routeTable'
import { SidebarInset, SidebarProvider } from '../ui/sidebar'
import { Button } from '../ui/button'
import { Header } from './AppHeader'
import { OperationSidebar } from './OperationSidebar'
import { PageContainer } from './PageContainer'
import { useTheme } from './ThemeProvider'
import { ThemeSwitch } from './ThemeSwitch'
export function hasNativeTitleBar(location: Pick<Location, 'protocol' | 'hostname'>) {
  return location.protocol === 'https:' && location.hostname === 'prototype.production-assistant.local'
}
export function AppLayout({ route, navigate, openSettings, children }: { route: string; navigate: (route: string) => void; openSettings: () => void; children: ReactNode }) {
  const { resolvedTheme } = useTheme()
  // WinUI's 48px native title bar overlays the document; Electron's frame does not.
  const winui = hasNativeTitleBar(window.location)
  const title = SIDEBAR_MODULES.find(module => module.route === route)?.name ?? SIDEBAR_MODULES[0].name
  return <SidebarProvider className={`desktop-shell pa-shell-theme h-svh min-h-0 overflow-hidden ${resolvedTheme === 'dark' ? 'dark' : ''}`} data-winui={winui}>
    <OperationSidebar active={route} navigate={navigate} openSettings={openSettings} />
    <SidebarInset className="@container/content min-h-0 min-w-0 overflow-hidden">
      <Header className="shrink-0" data-shadcn-surface="" aria-label="页面工具栏">
        <span className="min-w-0 truncate text-sm font-medium" data-current-page-title="">{title}</span>
        <div className="ms-auto flex shrink-0 items-center gap-2">
          <ThemeSwitch />
          <Button variant="ghost" size="icon" aria-label="打开设置" aria-haspopup="dialog" onClick={openSettings}><Settings2 /></Button>
        </div>
      </Header>
      <div className="pa-page-scroll min-h-0 flex-1 overflow-auto">
        <PageContainer fluid className="min-w-0">{children}</PageContainer>
      </div>
    </SidebarInset>
  </SidebarProvider>
}
