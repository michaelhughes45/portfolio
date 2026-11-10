import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BrowserFrame } from "@/components/shared/BrowserFrame";
import { Chip } from "@/components/shared/Chip";
import type { Project } from "@/lib/content/schema";

interface ProjectCardProps {
  project: Pick<Project, "slug" | "name" | "tagline" | "type" | "chips" | "accent" | "accent2" | "cover" | "coverAlt" | "live">;
  index: number;
}

/** The whole card is a single link to the project page; nothing inside it is interactive. */
export function ProjectCard({ project: p, index }: ProjectCardProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/projects/${p.slug}`}
      style={{ "--project": p.accent, "--project-2": p.accent2 } as React.CSSProperties}
      className="group flex h-full flex-col rounded-[20px] border bg-card p-3 transition-[translate,border-color,box-shadow] duration-250 outline-none hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--project)_55%,var(--border))] hover:shadow-[0_24px_48px_-24px_color-mix(in_srgb,var(--project)_45%,transparent)] focus-visible:ring-[3px] focus-visible:ring-ring/50 motion-reduce:hover:translate-y-0"
    >
      <BrowserFrame
        src={p.cover}
        alt={p.coverAlt}
        url={p.live}
        name={p.name}
        sizes="(min-width: 760px) 50vw, 100vw"
        className="rounded-[12px] shadow-none"
      />
      <div className="flex flex-1 flex-col gap-3 px-3 pt-5 pb-3">
        <span className="flex items-center gap-2.5 font-mono text-[13px] font-semibold text-project-ink after:h-px after:w-12 after:shrink-0 after:bg-(--project) after:opacity-50">
          {number} · {p.type}
        </span>
        <h3 className="text-[28px]">{p.name}</h3>
        <p className="text-[15.5px] text-muted-foreground">{p.tagline}</p>
        <div className="flex flex-wrap gap-1.5">
          {p.chips.slice(0, 4).map((chip) => (
            <Chip key={chip}>{chip}</Chip>
          ))}
        </div>
        <span className="mt-auto inline-flex items-center gap-2 pt-1.5 text-[15px] font-semibold text-project-ink">
          View project
          <ArrowRight
            aria-hidden="true"
            className="size-[18px] transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
          />
        </span>
      </div>
    </Link>
  );
}
