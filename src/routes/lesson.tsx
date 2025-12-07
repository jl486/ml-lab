import { useParams } from "react-router";
import { MDXProvider } from "@mdx-js/react";

import { ContentLayout } from "@/components/layouts/content-layout";
import { components } from "@/components/mdx/components";
import { LessonProvider, useLesson } from "@/contexts/lesson-context";
import { CourseProvider } from "@/contexts/course-context";
import { getCourse } from "@/lib/content-utils";
import { NotFound } from "./not-found";

export function Lesson() {
  const { courseId, lessonId } = useParams<{ courseId: string, lessonId: string }>();

  const course = getCourse(courseId);
  const lesson = course?.sections
    ?.flatMap((section) => section.lessons)
    ?.find((lesson) => lesson.id === lessonId);

  if (!course || !lesson) {
    return <NotFound />;
  }

  return (
    <CourseProvider id={courseId}>
      <LessonProvider id={lessonId}>
        <LessonContent />
      </LessonProvider>
    </CourseProvider>
  );
}

function LessonContent() {
  const lesson = useLesson();
  const MDXComponent = lesson.Comp;

  if (!MDXComponent) {
    return null;
  }

  return (
    <>
      <title>{lesson.name}</title>
      <MDXProvider components={components}>
        <ContentLayout>
          <h1 className="text-4xl mb-2 font-bold font-serif text-foreground">
            {lesson.name}
          </h1>
          <p className=" max-w-xl text-base italic text-muted-foreground">
            {lesson.description}
          </p>
          <MDXComponent />
        </ContentLayout>
      </MDXProvider>
    </>
  );
}

