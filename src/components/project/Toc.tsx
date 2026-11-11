"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocProps {
  sections: { id: string; label: string }[];
  className?: string;
}

/** "On this page" menu that highlights the section crossing the middle of the viewport. */
export function Toc({ sections, className }: TocProps) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="On this page" className={cn("sticky top-24 gap-0.5 self-start", className)}>
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          aria-current={active === id ? "location" : undefined}
          className={cn(
            "border-l-2 px-3 py-2 text-sm font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50",
            active === id && "border-(--project) text-foreground",
          )}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
