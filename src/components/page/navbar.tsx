import { useEffect, useState } from "react";
import { Link } from "react-router";

import Logo from "@/assets/images/logo-full.svg?react";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight / 8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <header className={cn(
      "select-none fixed isolate inset-x-0 top-0 mx-auto z-100 flex items-center transition-color duration-300",
      scrolled ? "bg-background/60 backdrop-blur-2xl" : "bg-transparent"
    )}>
      <nav className="w-full max-w-5xl mx-auto px-5 py-4 items-center">
        <ul className="flex justify-between">
          <li className="flex flex-1 justify-start items-center">
            <Link to="/" className="flex items-center">
              <Logo className="h-7 w-[84px]" />
            </Link>
          </li>
          <li className="flex flex-1 justify-end items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="text-sm transition-all duration-300 text-muted-foreground hover:!bg-transparent">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="select-none text-foreground text-sm rounded-xl duration-300 bg-origin-border bg-gradient-to-r from-transparent to-white/5 sm:w-auto">
              <Link 
                to="/signup"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sign up
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
