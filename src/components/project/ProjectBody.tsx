import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { MDXRemote, type MDXComponents } from "next-mdx-remote-client/rsc";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const LINK = "font-medium text-foreground underline decoration-(--project,var(--brand)) decoration-2 underline-offset-3 hover:decoration-foreground";

function MdxLink({ href = "", className, children, ...props }: ComponentProps<"a">) {
  if ((href.startsWith("/") && !href.startsWith("//")) || href.startsWith("#")) {
    return (
      <Link href={href} className={cn(LINK, className)} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn(LINK, className)} {...props}>
      {children}
      <ExternalLink aria-hidden="true" className="ml-0.5 inline size-3.5 align-[-2px]" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/** Body headings sit inside a section that already has an h2, so they start at h3. */
const components: MDXComponents = {
  h1: (props) => <h3 className="mt-8 text-[22px] text-foreground" {...props} />,
  h2: (props) => <h3 className="mt-8 text-[22px] text-foreground" {...props} />,
  h3: (props) => <h3 className="mt-8 text-[22px] text-foreground" {...props} />,
  h4: (props) => <h4 className="mt-6 text-lg font-semibold text-foreground" {...props} />,
  p: (props) => <p className="mt-4" {...props} />,
  a: MdxLink,
  ul: (props) => <ul className="mt-4 grid list-disc gap-2 pl-5 marker:text-(--project,var(--brand))" {...props} />,
  ol: (props) => <ol className="mt-4 grid list-decimal gap-2 pl-5 marker:text-faint" {...props} />,
  strong: (props) => <strong className="font-semibold text-foreground" {...props} />,
  blockquote: (props) => <blockquote className="mt-4 border-l-3 border-(--project,var(--brand)) pl-4 italic" {...props} />,
  code: (props) => <code className="rounded-[5px] bg-surface-2 px-1.5 py-0.5 font-mono text-[0.88em] text-foreground" {...props} />,
  hr: () => <hr className="my-8 border-border" />,
};

interface ProjectBodyProps {
  source: string;
  className?: string;
}

/** Renders a project's optional long-form MDX body. Renders nothing when the body is empty. */
export function ProjectBody({ source, className }: ProjectBodyProps) {
  if (source.trim() === "") return null;

  return (
    <div className={cn("max-w-[72ch] text-[16.5px] leading-relaxed text-muted-foreground *:first:mt-0", className)}>
      <MDXRemote source={source} components={components} options={{ disableImports: true, disableExports: true }} />
    </div>
  );
}
