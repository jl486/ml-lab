import React, { useContext, useMemo } from "react";

import { getCourses } from "@/lib/content-utils";

const CourseContext = React.createContext<{
  id?: string;
  name?: string;
  description?: string;
  Comp?: React.ComponentType;
}>({});

interface CourseProviderProps {
  id: string | undefined;
  children: React.ReactNode;
}

export function CourseProvider({ id, children }: CourseProviderProps) {
  const course = useMemo(() => {
    return getCourses().find((course) => course.id === id);
  }, [id]);

  return (
    <CourseContext.Provider value={{
      id,
      name: course?.name,
      description: course?.description,
      Comp: course?.Comp
    }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  return useContext(CourseContext);
}
