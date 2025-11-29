import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";

export function Benefits() {
  return (
    <section className="py-24">
      <motion.div
        initial={{ visibility: "invisible", opacity: 0, transform: "translateY(18px)" }}
        whileInView={{ visibility: "visible", opacity: 1, transform: "translateY(0px)" }}
        transition={{ duration: 1, ease: [0.215, 0.61, 0.355, 1] }}
        className="mx-auto px-6 max-w-6xl"
      >
        <p className="mb-4 text-accent text-base font-medium">Project-based learning</p>
        <h2 className="mb-6 text-4xl font-bold text-pretty tracking-tight font-serif md:text-5xl">
          Learn by experimenting
        </h2>
        <p className="mb-6 self-end text-xl text-muted-foreground max-w-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque.
        </p>
        <Button asChild variant="link" className="group text-foreground !p-0 transition-all duration-300 hover:no-underline sm:w-auto">
          <Link to="/">
            Explore the approach
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </motion.div> 
    </section>
  );
}
