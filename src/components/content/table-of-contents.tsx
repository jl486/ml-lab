import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  name: string;
  level: number;
}

export function TableOfContents() {
  const { lessonId } = useParams<{ courseId: string, lessonId: string }>();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // Generating table of contents
  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) {
      return;
    }

    const headingElements = Array.from(article.querySelectorAll("h2, h3, h4")) as HTMLHeadingElement[];

    const headings: Heading[] = headingElements.map((element) => {
      const id = element.id || element.textContent?.toLowerCase().replace(/\s+/g, "-") || "";
      return {
        id,
        name: element.textContent || "",
        level: parseInt(element.tagName.slice(1), 10)
      };
    });

    setHeadings(headings);

    // Find the current heading the user is reading so it can be highlighted
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "0px 0px -80% 0px",
        threshold: 0,
      }
    );

    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [lessonId]);

  return (
    <div className="flex flex-col gap-2">
      <ul className="space-y-2 text-sm text-muted-foreground">
        {headings.map(({ id, name, level }) => (
          <li
            key={id}
            className={cn(
              "transition-colors hover:text-foreground",
              activeId === id ? "text-foreground" : "text-muted-foreground"
            )}
            style={{ marginLeft: `${(level - 2) * 12}px`}}
          >
            <a href={`#${id}`}>
              {name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
