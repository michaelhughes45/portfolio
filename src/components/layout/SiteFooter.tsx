import { Container } from "@/components/shared/Container";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t py-8 text-sm text-muted-foreground">
      <Container className="flex flex-wrap justify-between gap-4">
        <span>
          © {new Date().getFullYear()} {siteConfig.name}
        </span>
        <span>{siteConfig.footerNote}</span>
      </Container>
    </footer>
  );
}
