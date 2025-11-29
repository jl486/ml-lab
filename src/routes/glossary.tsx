import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { MDXProvider } from "@mdx-js/react";

import { PageLayout } from "@/components/layouts/page-layout";
import { components } from "@/components/mdx/components";
import { TableOfContents } from "@/components/content/table-of-contents";
import { Separator } from "@/components/ui/separator";

const files = import.meta.glob("/content/glossary/*.mdx", { eager: true }) as Record<
  string,
  {
    default: React.ComponentType,
    id: string,
  }
>;

export function Glossary() {
  const location = useLocation();
  const [searchInput, setSearchInput] = useState("");

  // Scroll to the term when user clicks on a glossary link
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ block: "start" });
      }
    }
  }, [location]);

  const glossary = Object.entries(files).map(([path, mod]) => ({
    id: path.split("/").pop()?.replace(".mdx", ""),
    Comp: mod.default
  }))

  const filtered = useMemo(() => {
    const normalize = (str: string) => str.toLowerCase().replace(/[-_]/g, " ");

    const query = normalize(searchInput.trim());
    return glossary.filter(({ id }) => normalize(id || "").includes(query));
  }, [glossary, searchInput])

  return (
    <>
      <title>Glossary</title>
      <PageLayout>
        <div className="w-full flex flex-row py-36 mx-auto px-6 max-w-5xl">
          <article className="w-[65ch] flex flex-col">
            <header className="flex flex-col gap-8">
              <h1 className="text-5xl text-foreground font-bold text-pretty tracking-tight font-serif">
                Glossary
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
                A comprehensive glossary of machine learning and data science terms.
              </p> 
              <input
                type="text"
                placeholder="Search terms"
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-input/30 text-sm px-3 py-2 mb-6 rounded-xl transition duration-300 hover:ring-1 hover:ring-foreground focus:ring-2 focus:ring-foreground outline-none md:w-1/2"
              />
            </header>
            <Separator className="my-12" />
            <MDXProvider components={components}>
              {filtered.map(({ id, Comp }) => {
                return (
                  <div key={id} className="prose max-w-full border rounded-xl p-8 my-4 text-muted-foreground">
                    <Comp />
                  </div>
                );
              })}
            </MDXProvider>
          </article>
          <aside className="sticky top-28 hidden ml-auto h-max max-h-[80vh] overflow-y-auto no-scrollbar lg:flex">
            <TableOfContents />
          </aside>
        </div>
      </PageLayout>
    </>
  );
}
