import React from "react";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { MiniCollapsibleProvider, useMiniCollapsible } from "@/contexts/mini-collapsible-context";

export function MiniCollapsible({ children }: { children: React.ReactNode }) {
  return (
    <MiniCollapsibleProvider>
      <div className="w-full">{children}</div>
    </MiniCollapsibleProvider>
  );
}

export function MiniCollapsibleTrigger({ children }: { children: React.ReactNode }) {
  const { open, setOpen } = useMiniCollapsible();

  return (
    <button
      onClick={() => setOpen(!open)}
      className="flex items-center gap-1 text-accent"
    >
      <span>{children}</span>
      <motion.div
        animate={{ rotate: open ? 90 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronRight className="w-4 h-4" />
      </motion.div>
    </button>

  );
}

export function MiniCollapsibleContent({ children }: { children: React.ReactNode }) {
  const { open } = useMiniCollapsible();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0, marginTop: 0 }}
          animate={{ height: "auto", opacity: 1, marginTop: 16 }}
          exit={{ height: 0, opacity: 0, marginTop: 0 }}
          transition={{ duration: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
          className=""
        >
          <div className="px-6 py-8 rounded-lg border [&_p]:!m-0 has-[pre]:p-0">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
