import { useEffect, useRef } from "react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";

export function Hero() {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const offsetX = (e.clientX - window.innerWidth + window.innerWidth / 2) * 0.01;
      const offsetY = (e.clientY - window.innerHeight + window.innerHeight / 2) * 0.01;

      if (imageRef.current) {
        imageRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      }
    };

    // Only medium sized screens
    if (window.innerWidth > 768) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <img
        ref={imageRef}
        src="/assets/hero.png"
        alt="Hero background"
        className="absolute select-none -top-2.5 left-0 w-full h-full object-cover z-[-1] animate-fade-in transition-transform duration-[2000ms] ease-[cubic-bezier(0.215,0.61,0.355,1)]"
      />
      <div className="flex flex-col gap-8 items-center text-center px-6 pt-24 mx-auto mt-4 w-full max-w-5xl md:mt-16">
        <h1 className="text-6xl font-bold text-pretty tracking-tight font-serif invisible delay-500 animate-fade-in-up md:text-7xl">
          Your ML career starts here
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground invisible delay-750 animate-fade-in-up md:text-xl">
          <span className="inline md:block">Tired of confusing tutorials and dead-end videos? </span>
          <span>Our step-by-step path gets you </span>
          <span className="text-foreground">results in hours.</span>
        </p>
        <div className="flex flex-col items-center justify-center gap-2 invisible delay-1000 animate-fade-in-up md:flex-row md:justify-start">
          <Button asChild variant="outline" className="select-none text-base h-12 px-5 rounded-2xl duration-300 bg-origin-border bg-gradient-to-r from-transparent to-white/5 sm:w-auto">
            <Link
              to="/signup"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get started
            </Link>
          </Button>
          <Button asChild variant="ghost" className="group text-base text-foreground/60 !bg-transparent transition-all duration-300 sm:w-auto">
            <Link to="/courses">
              View courses
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
