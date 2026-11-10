import { cn } from "@/lib/utils";

interface StatusDotProps {
  children: React.ReactNode;
  className?: string;
}

export function StatusDot({ children, className }: StatusDotProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[13px] font-medium text-muted-foreground",
        className,
      )}
    >
      <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-status ring-4 ring-status/18" />
      {children}
    </span>
  );
}
