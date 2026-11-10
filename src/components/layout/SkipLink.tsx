export function SkipLink() {
  return (
    <a
      href="#main"
      className="fixed top-3 left-3 z-[60] -translate-y-[200%] rounded-[10px] bg-foreground px-4 py-3 text-sm font-semibold text-background outline-none focus:translate-y-0 focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      Skip to content
    </a>
  );
}
