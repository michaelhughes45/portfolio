import { ProjectIcon } from "@/components/shared/ProjectIcon";
import { Reveal } from "@/components/shared/Reveal";
import type { Project } from "@/lib/content/schema";

interface FeatureGridProps {
  features: Project["features"];
}

export function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 min-[640px]:grid-cols-2">
      {features.map((f, i) => (
        <li key={f.title}>
          <Reveal delay={(i % 2) * 0.06} className="h-full rounded-[16px] border bg-card p-6">
            <div className="mb-4 grid size-11 place-items-center rounded-[12px] bg-(--project)/13 text-(--project)">
              <ProjectIcon name={f.icon} className="size-[22px]" />
            </div>
            <h3 className="mb-1.5 text-[19px]">{f.title}</h3>
            <p className="text-[14.5px] text-muted-foreground">{f.text}</p>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
