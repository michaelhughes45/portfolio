import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Code, ExternalLink } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { ProjectBody } from "@/components/project/ProjectBody";
import { BrowserFrame } from "@/components/shared/BrowserFrame";
import { Chip } from "@/components/shared/Chip";
import { Container } from "@/components/shared/Container";
import { Glow } from "@/components/shared/Glow";
import { PROJECT_ICON_NAMES, ProjectIcon } from "@/components/shared/ProjectIcon";
import { Reveal } from "@/components/shared/Reveal";
import { Section } from "@/components/shared/Section";
import { SectionHead } from "@/components/shared/SectionHead";
import { StatusDot } from "@/components/shared/StatusDot";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "UI kit (dev only)",
  robots: { index: false },
};

const DEMO_BODY = `## Long-form body

Optional MDX after the **problem and solution** cards, with [an internal link](/#projects) and [an external one](https://nextjs.org/).

- Lists use the project color for markers
- Inline \`code\` gets a soft background

> A short quote to show the accent border.`;

const DEMO_ACCENT ={ "--project": "#0f766e", "--project-2": "#6366f1" } as React.CSSProperties;

function Kit({ theme }: { theme: "light" | "dark" }) {
  return (
    <div className={`${theme} relative overflow-hidden rounded-3xl border bg-background text-foreground`}>
      <Glow className="-top-40 -right-36 size-[460px] bg-brand" />
      <Section>
        <SectionHead
          eyebrow={`${theme} theme`}
          title="Section head"
          description="An optional description sits on the right and wraps below the heading on phones."
        />
        <div className="grid gap-10">
          <div className="flex flex-wrap gap-2.5">
            <Button>
              See my work <ArrowRight />
            </Button>
            <Button variant="outline">
              <Code /> View code
            </Button>
            <Button size="sm">Small default</Button>
            <Button variant="outline" size="sm">
              Small outline
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <StatusDot>Open to full-stack and front-end roles</StatusDot>
            <div className="flex flex-wrap gap-1.5">
              {["Next.js", "TypeScript", "Postgres", "Tailwind"].map((c) => (
                <Chip key={c}>{c}</Chip>
              ))}
            </div>
          </div>
        </div>
      </Section>
      <Section alt>
        <div style={DEMO_ACCENT} className="grid gap-10">
          <SectionHead accent eyebrow="Project accent" title="Accent from CSS variables" />
          <div className="flex flex-wrap gap-2.5">
            <Button variant="accent">
              Visit live site <ExternalLink />
            </Button>
            <Button variant="accent" size="sm">
              Small accent
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-7">
            {PROJECT_ICON_NAMES.map((name) => (
              <div key={name} className="grid justify-items-center gap-2 rounded-xl border bg-card p-3">
                <span className="grid size-11 place-items-center rounded-xl bg-(--project)/13 text-(--project)">
                  <ProjectIcon name={name} className="size-[18px]" />
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">{name}</span>
              </div>
            ))}
          </div>
          <BrowserFrame
            src="/projects/demo/cover.png"
            alt="Placeholder screenshot for a demo project"
            url="https://example.vercel.app/"
            name="Demo Project"
            sizes="(min-width: 1160px) 1112px, 100vw"
          />
          <ProjectBody source={DEMO_BODY} />
          <div className="grid gap-4 sm:grid-cols-3">
            {[0, 0.1, 0.2].map((delay) => (
              <Reveal key={delay} delay={delay} className="rounded-2xl border bg-card p-6">
                <h3 className="text-[19px]">Reveal</h3>
                <p className="text-muted-foreground">Fades and lifts in once. Delay {delay}s.</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}

export default function DevUiPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div className="py-10">
      <Container className="grid gap-10">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-[clamp(32px,5vw,48px)] font-extrabold">UI kit</h1>
          <ThemeToggle />
        </div>
        <div className="relative isolate overflow-hidden rounded-3xl border p-10">
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-55" />
          <p className="text-muted-foreground">Hero grid background (bg-grid) follows the page theme.</p>
        </div>
        <Kit theme="light" />
        <Kit theme="dark" />
      </Container>
    </div>
  );
}
