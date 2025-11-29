import React, { useContext, useMemo } from "react";

import { getLessons } from "@/lib/content-utils";

const LessonContext = React.createContext<{
  id?: string;
  name?: string;
  description?: string;
  sectionName?: string
  Comp?: React.ComponentType;
}>({});

interface LessonProviderProps {
  id: string | undefined;
  children: React.ReactNode;
}


export function LessonProvider({ id, children }: LessonProviderProps) {
  const lesson = useMemo(() => {
    return getLessons().find((lesson) => lesson.id === id)
  }, [id]);

  return (
    <LessonContext.Provider value={{
      id,
      name: lesson?.name,
      description: lesson?.description,
      sectionName: lesson?.sectionName,
      Comp: lesson?.Comp
    }}>
      {children}
    </LessonContext.Provider>
  );
}

export function useLesson() {
  return useContext(LessonContext);
}
