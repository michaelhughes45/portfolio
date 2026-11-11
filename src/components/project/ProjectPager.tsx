import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/lib/content/schema";
import { cn } from "@/lib/utils";

type PagerProject = Pick<Project, "slug" | "name" | "accent" | "accent2">;

interface ProjectPagerProps {
  prev: PagerProject;
  next: PagerProject;
}

interface PagerLinkProps {
  project: PagerProject;
  direction: "prev" | "next";
}

function PagerLink({ project: p, direction }: PagerLinkProps) {
  const isNext = direction === "next";

  return (
    <Link
      href={`/projects/${p.slug}`}
      rel={direction}
      style={{ "--project": p.accent, "--project-2": p.accent2 } as React.CSSProperties}
      className={cn(
        "rounded-[16px] border bg-card p-6 outline-none transition-[translate,border-color] duration-200 hover:-translate-y-0.5 hover:border-(--project) focus-visible:ring-[3px] focus-visible:ring-ring/50 motion-reduce:hover:translate-y-0",
        isNext && "min-[520px]:text-right",
      )}
    >
      <span
        className={cn(
          "flex items-center gap-1.5 font-mono text-[12.5px] font-medium text-muted-foreground",
          isNext && "min-[520px]:justify-end",
        )}
      >
        {!isNext && <ArrowLeft aria-hidden="true" className="size-4" />}
        {isNext ? "Next" : "Previous"}
        {isNext && <ArrowRight aria-hidden="true" className="size-4" />}
      </span>
      <strong className="mt-2 block font-display text-[22px] font-bold">{p.name}</strong>
    </Link>
  );
}

export function ProjectPager({ prev, next }: ProjectPagerProps) {
  return (
    <nav aria-label="More projects" className="grid grid-cols-1 gap-4 border-t pt-6 min-[520px]:grid-cols-2">
      <PagerLink project={prev} direction="prev" />
      <PagerLink project={next} direction="next" />
    </nav>
  );
}
