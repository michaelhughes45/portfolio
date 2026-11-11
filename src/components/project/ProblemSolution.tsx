import { Reveal } from "@/components/shared/Reveal";
import type { Project } from "@/lib/content/schema";
import { cn } from "@/lib/utils";

interface ProblemSolutionProps {
  problem: Project["problem"];
  solution: Project["solution"];
}

const LABEL = "mb-2.5 font-mono text-[15px] font-semibold tracking-[0.08em] uppercase";

export function ProblemSolution({ problem, solution }: ProblemSolutionProps) {
  return (
    <Reveal className="grid grid-cols-1 gap-4 min-[640px]:grid-cols-2">
      <div className="rounded-[16px] border bg-card p-[26px]">
        <h3 className={cn(LABEL, "text-muted-foreground")}>The problem</h3>
        <p>{problem}</p>
      </div>
      <div className="rounded-[16px] border border-[color-mix(in_srgb,var(--project)_45%,var(--border))] bg-[color-mix(in_srgb,var(--project)_6%,var(--card))] p-[26px]">
        <h3 className={cn(LABEL, "text-project-ink")}>The solution</h3>
        <p>{solution}</p>
      </div>
    </Reveal>
  );
}
