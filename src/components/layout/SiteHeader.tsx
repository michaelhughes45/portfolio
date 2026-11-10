import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { ProjectsMenu, type ProjectsMenuItem } from "@/components/layout/ProjectsMenu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { siteConfig } from "@/config/site";

interface SiteHeaderProps {
  projects: ProjectsMenuItem[];
}

const NAV_LINK =
  "hidden h-11 items-center rounded-[8px] px-3 text-[14.5px] font-medium text-muted-foreground transition-colors outline-none hover:bg-surface-2 hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:inline-flex";

export function SiteHeader({ projects }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/78 backdrop-blur-[14px]">
      <Container className="flex h-16 items-center gap-2 sm:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-[8px] font-display text-[17px] font-bold whitespace-nowrap outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <span aria-hidden="true" className="grid size-8 place-items-center rounded-[9px] bg-logo text-sm text-white">
            {siteConfig.initials}
          </span>
          {siteConfig.name}
        </Link>
        <nav aria-label="Main" className="ml-auto flex items-center gap-1">
          <Link href="/" className={NAV_LINK}>
            Home
          </Link>
          <ProjectsMenu projects={projects} />
          <Link href="/#about" className={NAV_LINK}>
            About
          </Link>
        </nav>
        <ThemeToggle />
      </Container>
    </header>
  );
}
