import { Link } from "react-router";

import { PageLayout } from "@/components/layouts/page-layout";

export function NotFound() {
  return (
    <PageLayout>
      <div className="w-full h-screen flex flex-col gap-4 grow-1 justify-center items-center">
        <div className="w-[18ch]">
          <h1 className="glitch-text font-mono" title="404 PAGE NOT FOUND" data-length="18">404 PAGE NOT FOUND</h1>
        </div>
      </div>
    </PageLayout>
  );
}
