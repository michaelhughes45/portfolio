import { Reveal } from "@/components/shared/Reveal";
import type { Step } from "@/config/site";

interface StepsProps {
  steps: Step[];
}

export function Steps({ steps }: StepsProps) {
  return (
    <ol className="grid grid-cols-1 gap-4 min-[521px]:grid-cols-2 min-[900px]:grid-cols-4">
      {steps.map(({ title, text, icon: Icon }, i) => (
        <li key={title}>
          <Reveal delay={i * 0.06} className="h-full rounded-[16px] border bg-card p-6">
            <span className="font-mono text-[13px] font-semibold text-brand">{String(i + 1).padStart(2, "0")}</span>
            <div className="mt-[18px] grid size-[42px] place-items-center rounded-[11px] bg-brand-soft text-brand">
              <Icon aria-hidden="true" className="size-[18px]" />
            </div>
            <h3 className="mt-3.5 mb-2 text-[21px]">{title}</h3>
            <p className="text-[14.5px] text-muted-foreground">{text}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
