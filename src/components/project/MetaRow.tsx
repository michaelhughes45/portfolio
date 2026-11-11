import type { Project } from "@/lib/content/schema";
import { cn } from "@/lib/utils";

interface MetaRowProps {
  project: Pick<Project, "role" | "type" | "timeline" | "chips">;
}

/** 4 columns from 720px, 2×2 below; inner borders follow the grid. */
const CELL_BORDERS = [
  "",
  "border-l",
  "border-t min-[720px]:border-t-0 min-[720px]:border-l",
  "border-t border-l min-[720px]:border-t-0",
];

export function MetaRow({ project: p }: MetaRowProps) {
  const items = [
    { term: "Role", value: p.role },
    { term: "Type", value: p.type },
    { term: "Timeline", value: p.timeline },
    { term: "Stack", value: p.chips.slice(0, 3).join(" · ") },
  ];

  return (
    <dl className="mt-10 mb-9 grid grid-cols-2 rounded-[16px] border bg-card min-[720px]:grid-cols-4">
      {items.map(({ term, value }, i) => (
        <div key={term} className={cn("min-w-0 px-[22px] py-[18px]", CELL_BORDERS[i])}>
          <dt className="mb-1 font-mono text-[11.5px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
            {term}
          </dt>
          <dd className="text-[15px] font-semibold">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
