import { Link, useParams } from "react-router";

import { getLessonsInCourse } from "@/lib/content-utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ContentPagination() {
  const { courseId, lessonId } = useParams<{ courseId: string, lessonId: string }>();
  const lessons = getLessonsInCourse(courseId);

  const lessonIdx = lessons.findIndex((lesson) => lesson.id === lessonId);
  const prev = lessonIdx > 0 ? lessons[lessonIdx - 1] : null;
  const next = lessonIdx < lessons.length - 1 ? lessons[lessonIdx + 1] : null;

  return (
    <div className="flex gap-6 my-12">
      {prev ? (
        <Link
          className="grow w-full no-underline transition-opacity duration-300 hover:opacity-80"
          to={`/courses/${courseId}/${prev?.id}`}
        >
          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-0.5 items-center -ml-0.5">
              <ChevronLeft className="text-muted-foreground h-4 w-4"/>
              <span className="text-xs text-muted-foreground">Previous</span>
            </div>
            <p className="text-foreground font-normal !m-0">{prev?.name}</p>
          </div>
        </Link>
      ) : <div className="p-4 w-full" />}
      {next ? (
        <Link
          className="grow w-full no-underline transition-opacity duration-300 hover:opacity-80"
          to={`/courses/${courseId}/${next?.id}`}
        >
          <div className="flex flex-col gap-1 items-end">
            <div className="flex flex-row gap-0.5 items-center -mr-0.5">
              <span className="text-xs text-muted-foreground">Next</span>
              <ChevronRight className="text-muted-foreground h-4 w-4"/>
            </div>
            <p className="text-foreground font-normal text-right !m-0">{next?.name}</p>
          </div>
        </Link>
      ) : <div className="p-4 w-full" />}
    </div>
  );
}
