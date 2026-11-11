// Adapted from AppSidebar/AppTitle in satnaing/shadcn-admin @ e16c87f.
// Copyright (c) 2024 Sat Naing. MIT; see docs/third-party/shadcn-admin-LICENSE.txt.
import { CalendarCheck, ChartNoAxesCombined, Command, Database, FileOutput, Files, Inbox, Settings2, Workflow } from 'lucide-react'
import { SIDEBAR_MODULES, navigationKey } from '../../routes/routeTable'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from '../ui/sidebar'
import { NavGroup } from './NavGroup'

export const modules = SIDEBAR_MODULES
const icons: Record<string, typeof Inbox> = { 'production-message': Inbox, 'daily-weld': CalendarCheck, 'database-viewer': Database, 'plan-pdf': FileOutput, 'production-meeting': Files, 'report-center': ChartNoAxesCombined, 'daily-report': Workflow }
const categories = [...new Set(modules.map(module => module.category))]

export function OperationSidebar({ active, navigate, openSettings }: {
  active: string; navigate: (tag: string) => void; openSettings: () => void
}) {
  return <Sidebar collapsible="icon" variant="inset" aria-label="应用导航">
    <SidebarHeader>
      <SidebarMenu><SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild tooltip="生产助手">
          <div>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"><Command className="size-4" aria-hidden="true" /></div>
            <div className="grid flex-1 text-start text-sm leading-tight"><span className="truncate font-semibold">生产助手</span><span className="truncate text-xs">ProductionAssistant</span></div>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem></SidebarMenu>
    </SidebarHeader>
    <SidebarContent id="business-navigation" className="sidebar-nav" role="navigation" aria-label="业务模块">
      {categories.map(category => <NavGroup key={category} title={category} active={active} navigate={navigate}
        items={modules.filter(module => module.category === category).map(module => ({ ...module, route: navigationKey(module), icon: icons[module.route] }))} />)}
    </SidebarContent>
    <SidebarFooter className="sidebar-bottom">
      <SidebarMenu><SidebarMenuItem><SidebarMenuButton tooltip="设置" aria-haspopup="dialog" onClick={openSettings}>
        <Settings2 aria-hidden="true" /><span>设置</span>
      </SidebarMenuButton></SidebarMenuItem></SidebarMenu>
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
}
