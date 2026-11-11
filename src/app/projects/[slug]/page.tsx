import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchDiagram } from "@/components/project/ArchDiagram";
import { Challenges } from "@/components/project/Challenges";
import { FeatureGrid } from "@/components/project/FeatureGrid";
import { MdxBody } from "@/components/project/MdxBody";
import { MetaRow } from "@/components/project/MetaRow";
import { ProblemSolution } from "@/components/project/ProblemSolution";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ProjectPager } from "@/components/project/ProjectPager";
import { ProjectSection } from "@/components/project/ProjectSection";
import { StackList } from "@/components/project/StackList";
import { Toc } from "@/components/project/Toc";
import { BrowserFrame } from "@/components/shared/BrowserFrame";
import { Container } from "@/components/shared/Container";
import { siteConfig } from "@/config/site";
import { getAdjacentProjects, getAllProjects, getProject } from "@/lib/content/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return { title: `${project.name} · ${siteConfig.name}`, description: project.tagline };
}

const SECTIONS = siteConfig.projectSections;
const TOC = Object.entries(SECTIONS).map(([id, { label }]) => ({ id, label }));

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const adjacent = getAdjacentProjects(slug);
  // With a single project, prev and next would both point back to this page.
  const showPager = adjacent !== null && adjacent.next.slug !== slug;

  return (
    <div style={{ "--project": project.accent, "--project-2": project.accent2 } as React.CSSProperties}>
      <ProjectHero project={project}>
        <MetaRow project={project} />
        <BrowserFrame
          src={project.cover}
          alt={project.coverAlt}
          url={project.live}
          name={project.name}
          sizes="(min-width: 1160px) 1112px, calc(100vw - 32px)"
          priority
        />
      </ProjectHero>

      <Container className="grid grid-cols-1 pt-12 min-[900px]:grid-cols-[200px_minmax(0,1fr)] min-[900px]:gap-16 min-[900px]:pt-[72px]">
        <Toc sections={TOC} className="hidden min-[900px]:grid" />
        <div className="min-w-0">
          <ProjectSection id="overview" {...SECTIONS.overview}>
            <ProblemSolution problem={project.problem} solution={project.solution} />
            <MdxBody source={project.body} className="mt-10" />
          </ProjectSection>
          <ProjectSection id="features" {...SECTIONS.features}>
            <FeatureGrid features={project.features} />
          </ProjectSection>
          <ProjectSection id="stack" {...SECTIONS.stack}>
            <StackList stack={project.stack} />
          </ProjectSection>
          <ProjectSection id="architecture" {...SECTIONS.architecture}>
            <ArchDiagram arch={project.arch} />
          </ProjectSection>
          <ProjectSection id="challenges" {...SECTIONS.challenges}>
            <Challenges challenges={project.challenges} />
          </ProjectSection>
          {showPager && <ProjectPager prev={adjacent.prev} next={adjacent.next} />}
        </div>
      </Container>
    </div>
  );
}
