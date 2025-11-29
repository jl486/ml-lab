import React from "react";

type CourseRecord = Record<
  string,
  {
    default: React.ComponentType,
    frontmatter: {
      id: string,
      name: string,
      description: string,
      category: string,
      image: string
    };
  }
>;

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

interface Section {
  name: string;
  lessons: {
    id: string;
    name: string;
  }[];
}

interface Course {
  id: string;
  sections: Section[];
}

const courseMetadataFiles = import.meta.glob("/content/courses/**/course.mdx", { eager: true }) as CourseRecord;
const lessonFiles = import.meta.glob("/content/courses/**/*.mdx", { eager: true }) as LessonRecord;

export function getCourses() {
  const images = import.meta.glob("@/assets/images/course/*.svg", {
    eager: true,
    query: "?react"
  }) as Record<
    string,
    { default: React.ComponentType<React.SVGProps<SVGSVGElement>> }
  >;

  const courses = Object.entries(courseMetadataFiles).map(([, mod]) => {
    const { id, name, description, category, image } = mod.frontmatter;
    const path = image.replace(/^@\//, "/src/");

    const Image = images[path]?.default ?? (() => {
      console.error(`Image not found: ${path}`);
      return null;
    });

    return {
      Comp: mod.default,
      id,
      name,
      description,
      category,
      Image
    };
  });

  return courses;
}

export function getCourse(courseId: string | undefined): Course | undefined {
  const courseFolderToId = new Map(
    Object.entries(lessonFiles)
      .filter(([path]) => path.endsWith("course.mdx"))
      .map(([path, mod]) => [getCourseFolderName(path), mod.frontmatter.id])
  );

  const courseMap = new Map<string, Map<string, Section>>();

  for (const [path, mod] of Object.entries(lessonFiles)) {
    if (path.endsWith("course.mdx")) continue;

    const folder = getCourseFolderName(path);
    const courseId = folder && courseFolderToId.get(folder);
    if (!courseId) continue;

    const { sectionName } = mod.frontmatter;

    const sectionMap = courseMap.get(courseId) ?? new Map();
    const section = sectionMap.get(sectionName) ?? { name: sectionName, lessons: [] };

    section.lessons.push({ id: mod.frontmatter.id, name: mod.frontmatter.name });
    sectionMap.set(sectionName, section);
    courseMap.set(courseId, sectionMap);
  }

  const courses = Array.from(courseMap.entries()).map(([courseId, sectionMap]) => ({
    id: courseId,
    sections: Array.from(sectionMap.values())
  }));

  return courses.find((course) => course.id === courseId);
}

function getCourseFolderName(path: string) {
  // Matches any path to an lesson in /content/courses/,
  // Index 1 contains the course folder name.
  return path.match(/\/content\/courses\/([^/]+)\//)?.[1];
}
