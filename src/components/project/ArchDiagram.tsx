import { ArrowRight } from "lucide-react";
import { Fragment } from "react";
import { Reveal } from "@/components/shared/Reveal";
import type { Project } from "@/lib/content/schema";
import { cn } from "@/lib/utils";

interface ArchDiagramProps {
  arch: Project["arch"];
}

const NODE = "rounded-[12px] border bg-card p-4";
const NODE_SUB = "mt-1 block font-mono text-[12.5px] text-muted-foreground";

/** Flow left to right from 720px (top to bottom below), with supporting services under a dashed line. */
export function ArchDiagram({ arch }: ArchDiagramProps) {
  const summary = arch.flow.map((n) => n.title).join(" → ");

  return (
    <Reveal className="rounded-[16px] border bg-card bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[18px_18px] p-5 min-[720px]:p-8">
      <p className="sr-only">Request flow: {summary}.</p>
      <div className="flex flex-col min-[720px]:flex-row">
        {arch.flow.map((node, i) => (
          <Fragment key={node.title}>
            {i > 0 && (
              <div
                aria-hidden="true"
                className="flex h-11 items-center justify-center gap-2 text-(--project) min-[720px]:relative min-[720px]:h-auto min-[720px]:w-[76px] min-[720px]:shrink-0"
              >
                <ArrowRight className="size-5 rotate-90 min-[720px]:rotate-0" />
                {node.label && (
                  <small className="font-mono text-[10.5px] font-medium whitespace-nowrap text-muted-foreground min-[720px]:absolute min-[720px]:top-[calc(50%+12px)] min-[720px]:left-1/2 min-[720px]:-translate-x-1/2">
                    {node.label}
                  </small>
                )}
              </div>
            )}
            <div
              className={cn(
                NODE,
                "flex-1 text-center shadow-soft",
                node.main &&
                  "border-(--project) shadow-[0_0_0_4px_color-mix(in_srgb,var(--project)_15%,transparent),var(--soft-shadow)]",
              )}
            >
              <strong className="block text-[14.5px] font-semibold">{node.title}</strong>
              <span className={NODE_SUB}>{node.sub}</span>
            </div>
          </Fragment>
        ))}
      </div>
      {arch.extras.length > 0 && (
        <ul className="mt-7 grid grid-cols-1 gap-3 border-t border-dashed pt-6 min-[720px]:grid-cols-3">
          {arch.extras.map((extra) => (
            <li key={extra.title} className={NODE}>
              <span className="block font-mono text-[10.5px] font-semibold tracking-[0.08em] text-project-ink uppercase">
                {extra.tag}
              </span>
              <strong className="block text-[14.5px] font-semibold">{extra.title}</strong>
              <span className={NODE_SUB}>{extra.sub}</span>
            </li>
          ))}
        </ul>
      )}
    </Reveal>
  );
}
