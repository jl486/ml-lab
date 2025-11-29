import { useMemo } from "react";
import { Link } from "react-router";

import { PageLayout } from "@/components/layouts/page-layout";
import { getCourses } from "@/lib/content-utils";

interface Course {
  id: string;
  name: string;
  description: string;
  Image: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export function Courses() {
  const coursesByCategory: Record<string, Course[]> = useMemo(() => {
    const courses = getCourses();

    return courses.reduce((acc, course) => {
      const { id, name, description, category, Image } = course;
      if (!acc[category]) {
        acc[category] = [];
      }

      acc[category].push({ id, name, description, Image });
      return acc;
    }, {} as Record<string, Course[]>);
  }, []);

  return (
    <>
      <title>Courses</title>
      <PageLayout>
        <div className="flex flex-col gap-12 px-6 py-36 mx-auto w-full max-w-5xl">
          <header className="flex flex-col gap-8">
            <h1 className="text-5xl font-bold text-pretty tracking-tight font-serif">
              Courses
            </h1>
            <p className="mb-8 max-w-xl text-base text-muted-foreground">
              Get started with some courses below.
            </p>
          </header>
          <div className="max-w-5xl mx-auto flex flex-col gap-12">
            {Object.entries(coursesByCategory).map(([category, courses]) => (
              <div key={category.toLowerCase()} className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold font-serif mb-6">{category}</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {courses.map(({ id, name, description, Image }) => (
                    <Link
                      key={id}
                      to={`/courses/${id}`}
                      className="overflow-hidden flex flex-col gap-4 border rounded-lg transition-border duration-200 hover:border-foreground/20"
                    >
                      <div className="px-5 pt-6">
                        <Image className="w-32 h-32 lg:w-full md:h-full" />
                      </div>
                      <div className="flex flex-col gap-4 px-5 pb-12">
                        <h3 className="text-base font-medium">{name}</h3>
                        <p className="text-base text-muted-foreground">{description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageLayout>
    </>
  );
}
