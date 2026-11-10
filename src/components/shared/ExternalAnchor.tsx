import { ArrowUpRight } from "lucide-react";
import type { ComponentProps } from "react";

/**
 * A plain `<a>` that opens http(s) links in a new tab, with a small arrow icon and a
 * screen-reader note. `#`, `mailto:` and site paths stay normal links. Works with `<Button asChild>`.
 */
export function ExternalAnchor({ href = "#", children, ...props }: ComponentProps<"a">) {
  const external = /^https?:\/\//.test(href);

  return (
    <a href={href} {...(external && { target: "_blank", rel: "noopener noreferrer" })} {...props}>
      {children}
      {external && (
        <>
          <ArrowUpRight aria-hidden="true" className="-ml-1 size-4 opacity-60" />
          <span className="sr-only"> (opens in a new tab)</span>
        </>
      )}
    </a>
  );
}
