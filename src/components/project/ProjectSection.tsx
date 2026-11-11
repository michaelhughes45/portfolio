interface ProjectSectionProps {
  id: string;
  label: string;
  title: string;
  children: React.ReactNode;
}

/**
 * One case-study section: anchor target for the Toc, accent eyebrow and h2.
 * `scroll-mt-4` adds to the global 80px `scroll-padding-top`, landing headings 96px down as in the prototype.
 */
export function ProjectSection({ id, label, title, children }: ProjectSectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-4 pb-18">
      <p className="font-mono text-[12.5px] font-semibold tracking-[0.12em] text-project-ink uppercase">{label}</p>
      <h2 id={`${id}-title`} className="mt-2.5 mb-6 text-[clamp(28px,3.5vw,36px)]">
        {title}
      </h2>
      {children}
    </section>
  );
}
