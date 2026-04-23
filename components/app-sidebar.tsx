import * as React from "react"
import { STUDENT_NAV } from "@/data/Dashboarddata";
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { ADMINISTRATOR_NAV } from "@/data/Dashboarddata";
import { SOCIETYHEAD_NAV } from "@/data/Dashboarddata";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// Accept the user prop we passed from page.tsx
export function AppSidebar({ user, ...props }: React.ComponentProps<typeof Sidebar> & { user: any }) {
  const NavITEMS = 
  user?.role === "Administrator" ? ADMINISTRATOR_NAV : 
  user?.role === "SocietyHead" ? SOCIETYHEAD_NAV : STUDENT_NAV;  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <NavMain items={NavITEMS} />  
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}