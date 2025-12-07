import React from "react";

import courseOrderJson from "../../../content/courses/order.json";

const courseFiles = import.meta.glob("/content/courses/**/course.mdx", { eager: true }) as CourseRecord;
const lessonFiles = import.meta.glob("/content/courses/**/*.mdx", { eager: true }) as LessonRecord;
const orderFiles = import.meta.glob("/content/courses/**/order.json", { eager: true }) as Record<string, { default: Section[] }>;

type CourseRecord = Record<
  string,
  {
    default: React.ComponentType,
    frontmatter: {
      id: string,
      name: string,
      description: string,
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
    };
  }
>;

interface Course {
  id: string;
  sections: {
    name: string;
    lessons: {
      id: string;
      name: string;
    }[];
  }[];
}

interface Section {
  section: string;
  lessons: string[];
}

/**
 * Get frontmatter data from all the courses as a list
 *
 * @returns A list of the individual metadata (Comp, id, name, description, category, Image) for each course
 */
export function getCourses() {
  const images = import.meta.glob("@/assets/images/course/*.svg", {
    eager: true,
    query: "?react"
  }) as Record<string, { default: React.ComponentType<React.SVGProps<SVGSVGElement>> }>;

  const categories: { category: string, courses: string[] }[] = courseOrderJson ?? [];

  const courses = Object.entries(courseFiles).map(([, mod]) => {
    const { id, name, description, image } = mod.frontmatter;
    const path = image.replace(/^@\//, "/src/");

    const Image = images[path]?.default ?? (() => {
      console.error(`Image not found: ${path}`);
      return null;
    });

    const categoryEntry = categories.find((cat) => cat.courses.includes(id));
    const category = categoryEntry?.category ?? "Uncategorized";

    return {
      Comp: mod.default,
      id,
      name,
      description,
      category,
      Image
    };
  });

  const sorted: typeof courses = [];
  categories.forEach((cat) => {
    cat.courses.forEach((courseId) => {
      const course = courses.find((x) => x.id === courseId);
      if (course) sorted.push(course);
    });
  });

  courses.forEach((course) => {
    if (!sorted.includes(course)) sorted.push(course);
  });

  return sorted;
}

/**
 * Get the data from a course
 *
 * @param courseId - The course's id
 * @returns An entire course and its structure
 */
export function getCourse(courseId: string | undefined): Course | undefined {
  if (!courseId) return undefined;

  const courseFolder = `/content/courses/${courseId}`;
  const orderPath = `${courseFolder}/order.json`;
  const sectionDefs = orderFiles[orderPath]?.default;

  if (!sectionDefs) {
    console.error(`order.json not found for course: ${courseId}`);
    return undefined;
  }
  
  // Maps lesson id to its metadata
  const lessonsInCourse: Record<string, { id: string; name: string, description: string }> = {};

  for (const [path, mod] of Object.entries(lessonFiles)) {
    if (path.endsWith("course.mdx")) continue;

    const folderName = getCourseFolderName(path);
    if (folderName !== courseId) continue;

    lessonsInCourse[mod.frontmatter.id] = {
      id: mod.frontmatter.id,
      name: mod.frontmatter.name,
      description: mod.frontmatter.description
    };
  }

  // Build sections based on order.json
  const sections = sectionDefs.map((def) => ({
    name: def.section,
    lessons: def.lessons
      .map((id) => lessonsInCourse[id])
      .filter(Boolean)
  }));

  return {
    id: courseId,
    sections
  };
}

/**
 * Extracts the course folder name from a given path that ends at a course folder or lesson
 *
 * A course folder is a subdirectory of /content/courses/
 *
 * @param path - The path to extract the folder name from
 * @returns The course folder name
 */
function getCourseFolderName(path: string) {
  // Matches any path to an lesson in /content/courses/,
  // Index 1 contains the course folder name.
  return path.match(/\/content\/courses\/([^/]+)\//)?.[1];
}
