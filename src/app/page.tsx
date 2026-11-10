import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-[1160px] flex-col justify-center gap-6 px-4 py-16 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-[12.5px] font-semibold tracking-[0.12em] text-brand uppercase">
          Placeholder
        </span>
        <ThemeToggle />
      </div>
      <h1 className="text-[clamp(44px,8vw,80px)] font-extrabold">{siteConfig.name}</h1>
      <p className="max-w-xl text-muted-foreground">
        {siteConfig.role}. This page checks the theme tokens and fonts in light and dark mode.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Button className="h-11 rounded-[11px] px-[18px] text-[14.5px] font-semibold">
          Primary button
        </Button>
        <span className="inline-flex h-7 items-center rounded-full border bg-surface-2 px-2.5 font-mono text-[12.5px] font-medium text-muted-foreground">
          TypeScript
        </span>
        <span className="text-sm text-faint">faint text</span>
      </div>
    </main>
  );
}
