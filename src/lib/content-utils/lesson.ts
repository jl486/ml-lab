import { getCourse } from "./course";

const files = import.meta.glob("/content/courses/**/*.mdx", { eager: true }) as LessonRecord;

type LessonRecord = Record<
  string,
  {
    default: React.ComponentType,
    frontmatter: {
      id: string,
      name: string,
      description: string,
    };
  }
>;


export function getLessons() {
  return Object.entries(files)
    .filter(([path]) => !path.endsWith("course.mdx"))
    .map(([, mod]) => {
      const frontmatter = mod.frontmatter ?? {};
      return {
        Comp: mod.default,
        id: frontmatter.id,
        name: frontmatter.name,
        description: frontmatter.description,
      };
    });
}

export function getLessonsInCourse(courseId: string | undefined) {
  const course = getCourse(courseId);
  if (!course) return [];

  return course.sections.flatMap((section) =>
    section.lessons.map((lesson) => ({
      id: lesson.id,
      name: lesson.name
    }))
  );
}
