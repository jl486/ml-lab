import { MDXProvider } from "@mdx-js/react";
import { useParams } from "react-router";

import { CourseProvider, useCourse } from "@/contexts/course-context";
import { ContentLayout } from "@/components/layouts/content-layout";
import { components } from "@/components/mdx/components";
import { getCourse } from "@/lib/content-utils";
import { NotFound } from "./not-found";

export function Course() {
  const { courseId } = useParams<{ courseId: string }>();

  const course = getCourse(courseId);
  if (!course) {
    return <NotFound />;
  }

  return (
    <CourseProvider id={courseId}>
      <CourseContent />
    </CourseProvider>
  );
}

function CourseContent() {
  const course = useCourse();
  const MDXComponent = course.Comp;

  if (!MDXComponent) {
    return null;
  }

  return (
    <>
      <title>{course.name}</title>
      <MDXProvider components={components}>
        <ContentLayout>
          <p className="text-accent text-sm font-medium">Course</p>
          <h1 className="text-4xl mb-2 font-bold font-serif text-foreground">
            {course.name}
          </h1>
          <p className="mb-8 max-w-xl text-base italic text-muted-foreground">
            {course.description}
          </p>
          <MDXComponent />
        </ContentLayout>
      </MDXProvider>
    </>
  )
}
