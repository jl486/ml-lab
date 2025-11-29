import { getCourse } from "./course";

type LessonRecord = Record<
  string,
  {
    default: React.ComponentType,
    frontmatter: {
      id: string,
      name: string,
      description: string,
      sectionName: string
    };
  }
>;

const files = import.meta.glob("/content/courses/**/*.mdx", { eager: true }) as LessonRecord;

export function getLessons() {
  return Object.entries(files).map(([, mod]) => {
    const frontmatter = mod.frontmatter ?? {};
    return {
      Comp: mod.default,
      id: frontmatter.id,
      name: frontmatter.name,
      description: frontmatter.description,
      sectionName: frontmatter.sectionName
    };
  });
}

export function getLessonsInCourse(courseId: string | undefined) {
  const course = getCourse(courseId);

  if (!course) {
    return [];
  }

  return course.sections.flatMap((section) =>
    section.lessons.map((lesson) => ({
      id: lesson.id,
      name: lesson.name
    }))
  );
}
