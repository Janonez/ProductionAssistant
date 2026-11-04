// Adapted from NavGroup/SidebarMenuLink in satnaing/shadcn-admin @ e16c87f.
// Copyright (c) 2024 Sat Naing. MIT; see docs/third-party/shadcn-admin-LICENSE.txt.
import type { LucideIcon } from 'lucide-react'
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '../ui/sidebar'
type Item = { name: string; route: string; icon: LucideIcon }
export function NavGroup({ title, items, active, navigate }: {
  title: string; items: Item[]; active: string; navigate: (route: string) => void
}) {
  const { setOpenMobile } = useSidebar()
  return <SidebarGroup className="sidebar-section">
    <SidebarGroupLabel className="sidebar-section-label">{title}</SidebarGroupLabel>
    <SidebarMenu>{items.map(item => <SidebarMenuItem key={item.route}>
      <SidebarMenuButton isActive={active === item.route} tooltip={item.name}
        aria-current={active === item.route ? 'page' : undefined} aria-label={item.name}
        onClick={() => { navigate(item.route); setOpenMobile(false) }}>
        <item.icon aria-hidden="true" /><span>{item.name}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>)}</SidebarMenu>
  </SidebarGroup>
}
