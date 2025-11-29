import React from "react";

export function GlossaryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex grow flex-col relative">
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex items-start w-full gap-12 max-w-5xl px-6 py-28 mx-auto md:pl-12">
          <article className="flex flex-1 flex-col text-muted-foreground">
            {children}
          </article>
          <aside className="sticky top-28 hidden min-w-3xs px-8 h-max lg:flex">
          </aside>
        </div>
      </div>
    </div>
  );
}
