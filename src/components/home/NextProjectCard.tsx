import { Plus } from "lucide-react";

interface NextProjectCardProps {
  title: string;
  text: string;
}

export function NextProjectCard({ title, text }: NextProjectCardProps) {
  return (
    <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-2.5 rounded-[20px] border-2 border-dashed px-6 py-10 text-center text-muted-foreground">
      <div className="grid size-14 place-items-center rounded-[16px] bg-surface-2">
        <Plus aria-hidden="true" className="size-[18px]" />
      </div>
      <strong className="font-display text-xl font-bold text-foreground">{title}</strong>
      <span className="max-w-[260px] text-[14.5px]">{text}</span>
    </div>
  );
}
