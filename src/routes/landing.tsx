import { useEffect } from "react";

import { PageLayout } from "@/components/layouts/page-layout";
import { Hero } from "@/components/landing/hero";

import { useTheme } from "@/contexts/theme-context";

export function Landing() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("dark");
    return () => setTheme("system");
  }, [setTheme]);

  return (
    <>
      <title>ml lab – It starts here</title>
      <PageLayout>
        <Hero />
      </PageLayout>
    </>
  );
}
