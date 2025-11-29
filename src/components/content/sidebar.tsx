import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { SidebarLogo } from "@/components/content/sidebar-header";
import { SidebarMain } from "@/components/content/sidebar-main";

export function ContentSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="none"
      className="hidden fixed top-0 bottom-0 left-0 z-100 md:flex" 
      {...props}
    >
      <SidebarHeader className="h-16">
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMain />
      </SidebarContent>
    </Sidebar>
  )
}
