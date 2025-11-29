import React from "react";

import { ContentSidebar } from "@/components/content/sidebar";
import { ContentHeader } from "@/components/content/content-header";
import { TableOfContents } from "@/components/content/table-of-contents";
import { ContentPagination } from "@/components/content/content-pagination";
import { ScrollToTop } from "@/components/scroll-to-top";

export function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex grow flex-col relative md:pl-64">
      <ScrollToTop />
      <ContentSidebar />
      <div className="flex flex-1 flex-col">
        <ContentHeader />
        <div className="@container/main flex items-start w-full gap-12 max-w-5xl px-6 py-28 mx-auto md:pl-12">
          <article className="prose prose-headings:mb-6 [&_pre]:m-0 [&_figure:has(pre)]:m-0 flex flex-1 flex-col text-muted-foreground">
            {children}
            <ContentPagination />
          </article>
          <aside className="sticky top-28 hidden min-w-3xs px-8 h-max lg:flex">
            <TableOfContents />
          </aside>
        </div>
      </div>
    </div>
  );
}
