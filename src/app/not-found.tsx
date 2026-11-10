import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="grid justify-items-start gap-5 py-24 sm:py-32">
      <span className="font-mono text-[12.5px] font-semibold tracking-[0.12em] text-brand uppercase">404</span>
      <h1 className="text-[clamp(36px,6vw,56px)] font-extrabold">Page not found</h1>
      <p className="max-w-lg text-muted-foreground">
        That page doesn&apos;t exist or has moved. The projects are all one click away.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/">
            <ArrowLeft aria-hidden="true" />
            Back home
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/#work">See the projects</Link>
        </Button>
      </div>
    </Container>
  );
}
