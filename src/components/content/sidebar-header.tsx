import { Link, useLocation } from "react-router";

import Logo from "@/assets/images/logo-icon.svg?react";
import SlantedSeparator from "@/assets/images/slanted-separator.svg?react";
import {
  SidebarMenu,
  SidebarMenuButton, 
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { useCourse } from "@/contexts/course-context";

export function SidebarLogo() {
  const course = useCourse();

  const location = useLocation();

  const isGlossary = location.pathname.startsWith("/glossary");
  const path = isGlossary ? "/glossary" : `/courses/${course.id}`;
  const label = isGlossary ? "Glossary" : course.name;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          size="lg"
          className="data-[slot=sidebar-menu-button]:!p-3 hover:bg-transparent active:bg-transparent"
        >
          <div className="flex items-center gap-2">
            <Link to="/">
              <Logo className="!w-7 !h-7" />
            </Link>
            <SlantedSeparator className="!w-6 !h-6 text-muted" />
            <Link to={path}>
              <span className="text-base font-medium tracking-tight text-foreground hover:text-foreground/80 transition-color duration-300">
                {label}
              </span>
            </Link>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
