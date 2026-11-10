import { Container } from "@/components/shared/Container";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  alt?: boolean;
  className?: string;
}

export function Section({ children, id, alt = false, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("overflow-x-clip py-16 sm:py-24", alt && "border-y bg-bg-2", className)}
    >
      <Container>{children}</Container>
    </section>
  );
}
