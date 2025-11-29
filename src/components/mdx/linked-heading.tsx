import { LinkIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface LinkedHeadingProps extends React.ComponentPropsWithoutRef<"h1"> {
  level?: "h2" | "h3" | "h4";
}

export function LinkedHeading({ level: Level = "h2", children, className, ...props }: LinkedHeadingProps) {
  const id = props.id;

  return (
    <Level {...props}>
      {id && (
        <a
          href={`#${id}`}
          className={cn(
            "no-underline group inline-flex items-center",
            className
          )}
        >
          {children}
          <span className="relative inline ml-2 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <LinkIcon className="w-4 h-4" />
          </span>
        </a>
      )}
    </Level>
  )
}
