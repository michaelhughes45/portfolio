import { Reveal } from "@/components/shared/Reveal";
import type { Project } from "@/lib/content/schema";

interface ChallengesProps {
  challenges: Project["challenges"];
}

export function Challenges({ challenges }: ChallengesProps) {
  return (
    <ol className="grid gap-4">
      {challenges.map((c, i) => (
        <li key={c.title}>
          <Reveal className="relative rounded-[16px] border bg-card px-5 pt-[72px] pb-[22px] min-[520px]:py-[26px] min-[520px]:pr-[26px] min-[520px]:pl-[76px]">
            <span
              aria-hidden="true"
              className="absolute top-5 left-5 grid size-9 place-items-center rounded-[10px] border border-[color-mix(in_srgb,var(--project)_40%,var(--border))] font-mono text-[15px] font-bold text-project-ink min-[520px]:top-6 min-[520px]:left-6"
            >
              {i + 1}
            </span>
            <h3 className="mb-2 text-[19px]">{c.title}</h3>
            <p className="text-[15px] text-muted-foreground">{c.text}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
