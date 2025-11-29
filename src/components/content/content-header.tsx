import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router";

import Logo from "@/assets/images/logo-icon.svg?react";
import SlantedSeparator from "@/assets/images/slanted-separator.svg?react";
import MenuIcon from "@/assets/images/menu-icon.svg?react";
import CloseIcon from "@/assets/images/close-icon.svg?react";
import { SidebarMain } from "@/components/content/sidebar-main";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useCourse } from "@/contexts/course-context";
import { useLesson } from "@/contexts/lesson-context";

export function ContentHeader() {
  const course = useCourse();
  const lesson = useLesson();

  const { pathname } = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const breadcrumbData = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    const crumbs: { label: string, to: string }[] = [];

    segments.forEach((segment, i) => {
      const path = "/" + segments.slice(0, i + 1).join("/");
      const labelOverrides: Record<string, string> = {
        courses: "Courses",
        ...(course.id && course.name ? { [course.id]: course.name }: {}),
        ...(lesson.id && lesson.name ? { [lesson.id]: lesson.name }: {}),

      };

      const label = labelOverrides[segment];

      crumbs.push({ label, to: path });
    })

    return crumbs;
  }, [pathname, course, lesson]);

  return (
    <header className="fixed top-0 right-0 left-0 flex h-16 shrink-0 items-center gap-2 z-100 bg-background transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 md:left-64">
      <div className="flex w-full items-center gap-2 px-5 md:px-4">
        <div className="flex items-center gap-2 md:hidden">
          <Link to="/">
            <Logo className="!w-7 !h-7" />
          </Link>
          <SlantedSeparator className="!w-6 !h-6 text-muted" />
          <Link to={`/courses/${course.id}`}>
            <span className="text-base font-medium tracking-tight text-foreground hover:text-foreground/80 transition-color duration-300">
              {course.name}
            </span>
          </Link>
        </div>
        <Breadcrumb className="hidden md:flex md:ml-2">
          <BreadcrumbList>
            {breadcrumbData.map((item, i) => (
              <React.Fragment key={`${item.to}-${i}`}>
                <BreadcrumbItem>
                  {i === breadcrumbData.length - 1 ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                      <BreadcrumbLink asChild>
                        <Link to={`${item.to}`}>{item.label}</Link>
                      </BreadcrumbLink>
                    )}
                </BreadcrumbItem>

                {i < breadcrumbData.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center gap-1 ml-auto md:hidden">
          <Button variant="secondary" size="icon" className="bg-transparent" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </Button>
        </div>
        {menuOpen && (
          <div className="fixed top-16 left-0 right-0 bottom-0 h-[calc(100dvh-64px)] z-100 backdrop-blur-2xl bg-background/60 overflow-y-auto md:hidden">
            <SidebarMain className="w-full px-4 " />
          </div>
        )}
      </div>
    </header>
  );
}
