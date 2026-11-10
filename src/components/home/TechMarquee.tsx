interface TechMarqueeProps {
  items: string[];
}

/**
 * Slow scrolling strip of technologies. The list is rendered twice and the track moves by half its
 * width, so the loop is seamless. Decorative (the Toolbox lists the same skills), so hidden from screen readers.
 */
export function TechMarquee({ items }: TechMarqueeProps) {
  return (
    <div aria-hidden="true" className="overflow-hidden border-y bg-bg-2 py-[18px]">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 pr-10 font-display text-[15px] font-semibold whitespace-nowrap text-faint after:text-[10px] after:text-border after:content-['✦']"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
