import { FileText, Mail } from "lucide-react";
import { LinkedInIcon } from "@/components/shared/BrandIcons";
import { ExternalAnchor } from "@/components/shared/ExternalAnchor";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const BUTTON = "justify-start";
const GHOST = `${BUTTON} border-white/15 bg-transparent hover:border-white/35 hover:bg-transparent`;

/** Dark panel in both themes: the `dark` class scopes the dark tokens to its contents. */
export function AboutPanel() {
  const { sections, bio, links } = siteConfig;

  return (
    <div className="overflow-hidden rounded-[22px] bg-code min-[801px]:rounded-[28px]">
      <div className="dark relative grid grid-cols-1 items-center gap-10 px-6 py-9 text-foreground min-[801px]:grid-cols-[1.2fr_0.8fr] min-[801px]:p-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-50 -right-40 size-130 rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--brand)_45%,transparent),transparent)]"
        />
        <div className="relative">
          <p className="font-mono text-[12.5px] font-semibold tracking-[0.12em] text-brand uppercase">
            {sections.about.eyebrow}
          </p>
          <h2 className="mt-3 mb-4 text-[clamp(32px,4.5vw,46px)]">{sections.about.title}</h2>
          <p className="text-muted-foreground">{bio}</p>
        </div>
        <div className="relative grid gap-2.5">
          <Button asChild className={BUTTON}>
            <ExternalAnchor href={links.email}>
              <Mail aria-hidden="true" />
              Email me
            </ExternalAnchor>
          </Button>
          <Button asChild variant="outline" className={GHOST}>
            <ExternalAnchor href={links.linkedin}>
              <LinkedInIcon />
              LinkedIn
            </ExternalAnchor>
          </Button>
          <Button asChild variant="outline" className={GHOST}>
            <ExternalAnchor href={links.resume} download={links.resume === "#" ? undefined : true}>
              <FileText aria-hidden="true" />
              Download résumé
            </ExternalAnchor>
          </Button>
        </div>
      </div>
    </div>
  );
}
