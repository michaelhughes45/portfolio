import type { Metadata } from "next";
import { AboutPanel } from "@/components/home/AboutPanel";
import { Hero } from "@/components/home/Hero";
import { NextProjectCard } from "@/components/home/NextProjectCard";
import { ProjectCard } from "@/components/home/ProjectCard";
import { Steps } from "@/components/home/Steps";
import { TechMarquee } from "@/components/home/TechMarquee";
import { Toolbox } from "@/components/home/Toolbox";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { Section } from "@/components/shared/Section";
import { SectionHead } from "@/components/shared/SectionHead";
import { siteConfig } from "@/config/site";
import { getAllProjects } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: `${siteConfig.name} · ${siteConfig.role}`,
  description: siteConfig.description,
};

export default function Home() {
  const projects = getAllProjects();
  const { sections } = siteConfig;

  return (
    <>
      <Hero projectCount={projects.length} />
      <TechMarquee items={siteConfig.marquee} />

      <Section id="work">
        <Reveal>
          <SectionHead {...sections.work} />
        </Reveal>
        <div className="grid grid-cols-1 gap-6 min-[760px]:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 0.08} className="h-full">
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
          {siteConfig.showNextProjectCard && (
            <Reveal delay={(projects.length % 2) * 0.08} className="h-full">
              <NextProjectCard {...sections.nextProject} />
            </Reveal>
          )}
        </div>
      </Section>

      <Section id="how" alt>
        <Reveal>
          <SectionHead {...sections.how} />
        </Reveal>
        <Steps steps={siteConfig.steps} />
      </Section>

      <Section>
        <Reveal>
          <SectionHead {...sections.toolbox} />
        </Reveal>
        <Toolbox groups={siteConfig.toolbox} />
      </Section>

      <section id="about">
        <Container>
          <Reveal>
            <AboutPanel />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
