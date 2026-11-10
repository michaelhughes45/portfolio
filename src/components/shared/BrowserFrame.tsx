import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrowserFrameProps {
  src: string;
  alt: string;
  url: string;
  sizes: string;
  priority?: boolean;
  /** Shown on the placeholder when the image file doesn't exist yet. */
  name?: string;
  className?: string;
}

function imageExists(src: string) {
  return existsSync(path.join(process.cwd(), "public", src));
}

export function BrowserFrame({ src, alt, url, sizes, priority = false, name, className }: BrowserFrameProps) {
  const host = new URL(url).host;

  return (
    <div className={cn("overflow-hidden rounded-[14px] border bg-card shadow-soft", className)}>
      <div className="flex items-center gap-[7px] border-b bg-surface-2 px-3 py-2.5">
        <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-dot-red" />
        <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-dot-yellow" />
        <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-dot-green" />
        <span className="ml-2 h-[26px] min-w-0 flex-1 truncate rounded-[7px] border bg-card px-2.5 font-mono text-xs leading-6 font-medium text-faint">
          {host}
        </span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-linear-135 from-(--project,var(--brand)) to-(--project-2,var(--brand))">
        {imageExists(src) ? (
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
        ) : (
          <div role="img" aria-label={alt} className="absolute inset-0 grid place-items-center bg-grid-frame text-center text-white">
            <div>
              <span className="block font-display text-[clamp(22px,4vw,40px)] font-extrabold text-shadow-lg">
                {name ?? host}
              </span>
              <small className="mt-2 block font-mono text-xs font-medium opacity-75">screenshot coming soon</small>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
