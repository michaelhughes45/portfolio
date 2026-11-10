import { Chip } from "@/components/shared/Chip";
import { Reveal } from "@/components/shared/Reveal";
import type { ToolGroup } from "@/config/site";

interface ToolboxProps {
  groups: ToolGroup[];
}

export function Toolbox({ groups }: ToolboxProps) {
  return (
    <div className="grid grid-cols-1 gap-4 min-[521px]:grid-cols-2 min-[900px]:grid-cols-4">
      {groups.map(({ title, icon: Icon, items }, i) => (
        <Reveal key={title} delay={i * 0.06} className="rounded-[16px] border bg-card p-[22px]">
          <h3 className="mb-3.5 flex items-center gap-2.5 text-[17px]">
            <Icon aria-hidden="true" className="size-[18px] text-brand" />
            {title}
          </h3>
          <ul className="flex flex-wrap gap-1.5">
            {items.map((item) => (
              <li key={item}>
                <Chip>{item}</Chip>
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}
