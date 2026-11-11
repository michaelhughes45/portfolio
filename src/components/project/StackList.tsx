import { Reveal } from "@/components/shared/Reveal";
import type { Project } from "@/lib/content/schema";

interface StackListProps {
  stack: Project["stack"];
}

export function StackList({ stack }: StackListProps) {
  return (
    <div className="grid gap-7">
      {stack.map((group) => (
        <Reveal key={group.group}>
          <h3 className="mb-3 font-mono text-[12.5px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
            {group.group}
          </h3>
          <ul className="grid grid-cols-1 gap-3 min-[640px]:grid-cols-2">
            {group.items.map((item) => (
              <li key={item.name} className="flex gap-3.5 rounded-[16px] border bg-card px-[18px] py-4">
                {/* The badge only repeats the name beside it, so screen readers skip it. */}
                <span
                  aria-hidden="true"
                  className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-linear-135 from-(--project) to-(--project-2) font-display text-sm font-bold text-white"
                >
                  {item.short}
                </span>
                <div className="min-w-0">
                  <strong className="block text-[15px] font-semibold">{item.name}</strong>
                  <span className="block text-[13.5px] leading-normal text-muted-foreground">{item.why}</span>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}
