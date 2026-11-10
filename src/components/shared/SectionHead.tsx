import { cn } from "@/lib/utils";

interface SectionHeadProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  accent?: boolean;
  className?: string;
}

export function SectionHead({ eyebrow, title, description, accent = false, className }: SectionHeadProps) {
  return (
    <div className={cn("mb-12 flex flex-wrap items-end justify-between gap-6", className)}>
      <div>
        <p
          className={cn(
            "font-mono text-[12.5px] font-semibold tracking-[0.12em] uppercase",
            accent ? "text-(--project)" : "text-brand",
          )}
        >
          {eyebrow}
        </p>
        <h2 className="mt-2.5 text-[clamp(32px,4.5vw,48px)]">{title}</h2>
      </div>
      {description && <p className="max-w-[440px] text-muted-foreground">{description}</p>}
    </div>
  );
}
