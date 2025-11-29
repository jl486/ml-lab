import React from "react";
import { Link as RouterLink } from "react-router";
import { Download } from "lucide-react";

import { cn } from "@/lib/utils";

interface LinkProps extends React.HTMLAttributes<HTMLSpanElement> {
  href: string;
  download?: boolean;
}

export function Link({ href, download, children, className, ...props }: LinkProps) {
  const isExternal = /^https?:\/\//.test(href);

  const baseClasses = cn(
    "relative no-underline text-accent hover:text-accent/90 transition-colors duration-300 [&_*]:text-inherit",
    className
  );

  const content = children

  if (download) {
    return (
      <a href={href} download className={cn(baseClasses, "inline-flex items-center gap-1")} {...props}>
        {content}
        <Download className="w-4 h-4" />
      </a>
    );
  }

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <RouterLink to={href} className={baseClasses} {...props}>
      {content}
    </RouterLink>
  );
}
