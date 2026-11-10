"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface ProjectsMenuItem {
  slug: string;
  name: string;
  type: string;
  accent: string;
  accent2: string;
}

interface ProjectsMenuProps {
  projects: ProjectsMenuItem[];
}

export function ProjectsMenu({ projects }: ProjectsMenuProps) {
  const pathname = usePathname();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="inline-flex h-11 items-center gap-1 rounded-[8px] px-3 text-[14.5px] font-medium text-muted-foreground transition-colors outline-none hover:bg-surface-2 hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[state=open]:bg-surface-2 data-[state=open]:text-foreground">
        Projects
        <ChevronDown aria-hidden="true" className="size-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        sideOffset={8}
        collisionPadding={16}
        className="grid min-w-[280px] rounded-[14px] bg-card p-1.5 shadow-soft"
      >
        {projects.map((p) => {
          const href = `/projects/${p.slug}`;
          const isCurrent = pathname === href;
          return (
            <DropdownMenuItem key={p.slug} asChild>
              <Link
                href={href}
                aria-current={isCurrent ? "page" : undefined}
                style={{ "--project": p.accent, "--project-2": p.accent2 } as React.CSSProperties}
                className={cn(
                  "min-h-11 cursor-pointer gap-3 rounded-[10px] px-3 py-2.5 focus:bg-surface-2",
                  isCurrent && "bg-surface-2",
                )}
              >
                <span
                  aria-hidden="true"
                  className="size-[30px] flex-none rounded-[8px] bg-linear-135 from-(--project) to-(--project-2)"
                />
                <span>
                  <span className="block text-sm font-semibold text-foreground">{p.name}</span>
                  <span className="block text-[12.5px] text-muted-foreground">{p.type}</span>
                </span>
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
