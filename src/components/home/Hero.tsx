import { ArrowRight, FileText } from "lucide-react";
import { CodeCard } from "@/components/home/CodeCard";
import { GitHubIcon } from "@/components/shared/BrandIcons";
import { Container } from "@/components/shared/Container";
import { ExternalAnchor } from "@/components/shared/ExternalAnchor";
import { Glow } from "@/components/shared/Glow";
import { Reveal } from "@/components/shared/Reveal";
import { StatusDot } from "@/components/shared/StatusDot";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

interface HeroProps {
  projectCount: number;
}

export function Hero({ projectCount }: HeroProps) {
  const { hero, links, codeCard, status } = siteConfig;

  return (
    <section className="relative overflow-hidden pt-14 pb-12 min-[900px]:pt-[88px] min-[900px]:pb-[72px]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-55" />
      <Glow className="-top-20 -left-30 size-[420px] bg-brand" />
      <Glow className="top-30 -right-25 size-[380px] bg-green-600" />
      <Container className="relative grid grid-cols-1 items-center gap-10 min-[900px]:grid-cols-[1.15fr_0.85fr] min-[900px]:gap-14">
        <Reveal>
          <StatusDot>{status}</StatusDot>
          <h1 className="mt-[18px] mb-[22px] text-[clamp(44px,7vw,80px)] font-extrabold">
            {hero.headline.line1}
            <br />
            {hero.headline.line2} <span className="text-gradient-hero">{hero.headline.highlight}</span>
          </h1>
          <p className="mb-8 max-w-[540px] text-[19px] text-muted-foreground">{hero.lead(projectCount)}</p>
          <div className="flex flex-wrap gap-2.5">
            <Button asChild>
              <a href="#work">
                See my work
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline">
              <ExternalAnchor href={links.resume}>
                <FileText aria-hidden="true" />
                Résumé
              </ExternalAnchor>
            </Button>
            <Button asChild variant="outline">
              <ExternalAnchor href={links.github}>
                <GitHubIcon />
                GitHub
              </ExternalAnchor>
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="min-w-0">
          <CodeCard {...codeCard} projectCount={projectCount} />
        </Reveal>
      </Container>
    </section>
  );
}
