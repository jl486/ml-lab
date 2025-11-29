import { useMemo } from "react";
import { Link, useParams } from "react-router";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";
import { getCourse } from "@/lib/content-utils";

export function SidebarMain({ className }: { className?: string }) {
  const { courseId, lessonId } = useParams<{ courseId: string, lessonId: string }>();

  const sections = useMemo(() => {
    const course = getCourse(courseId);
    if (!course) {
      return [];
    }

    return course.sections?.map((section) => ({
      id: course.id,
      name: section.name,
      lessons: section.lessons
    })).filter((section) => section.id === courseId);
  }, [courseId]);

  return (
    <>
      {sections.map((section, i) => (
        <SidebarGroup key={i} className={cn("pt-4", className)}>
          <SidebarGroupLabel>{section.name}</SidebarGroupLabel>
          <SidebarMenu className="gap-0">
            {section.lessons.map((lesson) => {
              const isActive = lesson.id === lessonId;
              return (
                <SidebarMenuItem key={lesson.id}>
                  <SidebarMenuButton
                    className={cn(
                      isActive ? "text-sidebar-foreground hover:!text-sidebar-foreground" : "text-muted-foreground",
                      "hover:text-sidebar-foreground/80 hover:bg-transparent",
                      "active:bg-transparent active:text-sidebar-foreground/80"
                    )}
                    asChild
                  >
                    <Link to={`/courses/${courseId}/${lesson.id}`}>{lesson.name}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  ); 
}
