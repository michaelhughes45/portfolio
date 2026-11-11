import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { GitHubIcon } from "@/components/shared/BrandIcons";
import { Container } from "@/components/shared/Container";
import { ExternalAnchor } from "@/components/shared/ExternalAnchor";
import { Glow } from "@/components/shared/Glow";
import { StatusDot } from "@/components/shared/StatusDot";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/content/schema";

interface ProjectHeroProps {
  project: Pick<Project, "name" | "tagline" | "status" | "live" | "repo">;
  /** Meta row and cover, shown under the title inside the hero's glow. */
  children?: React.ReactNode;
}

export function ProjectHero({ project: p, children }: ProjectHeroProps) {
  return (
    <section className="relative overflow-hidden pt-14 pb-10">
      <Glow className="-top-40 -right-35 size-[460px] bg-(--project) opacity-30" />
      <Glow className="top-50 -left-40 size-[360px] bg-(--project-2) opacity-18" />
      <Container className="relative">
        <Link
          href="/"
          className="mb-5 inline-flex h-11 items-center gap-2 rounded-md text-sm font-medium text-muted-foreground outline-none hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to home
        </Link>
        <div className="grid grid-cols-1 items-end gap-8 min-[800px]:grid-cols-[1fr_auto]">
          <div>
            <StatusDot>{p.status}</StatusDot>
            <h1 className="my-3.5 text-[clamp(44px,7vw,76px)] font-extrabold">{p.name}</h1>
            <p className="max-w-[640px] text-xl text-muted-foreground">{p.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Button asChild variant="accent">
              <ExternalAnchor href={p.live}>Visit live site</ExternalAnchor>
            </Button>
            <Button asChild variant="outline">
              <ExternalAnchor href={p.repo}>
                <GitHubIcon />
                View code
              </ExternalAnchor>
            </Button>
          </div>
        </div>
        {children}
      </Container>
    </section>
  );
}
