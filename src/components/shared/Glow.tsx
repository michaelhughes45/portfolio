import { cn } from "@/lib/utils";

interface GlowProps {
  /** Size, position and color, e.g. "size-[460px] -right-36 -top-40 bg-(--project)". */
  className?: string;
}

export function Glow({ className }: GlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute rounded-full opacity-35 blur-[90px]", className)}
    />
  );
}
