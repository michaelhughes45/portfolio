import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/site";
import { getAllProjects } from "@/lib/content/projects";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  // Variable font with the optical-size axis, so large headings get the narrower display cut (as in the prototype).
  axes: ["opsz"],
  variable: "--font-bricolage",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: `${siteConfig.name} · Portfolio`,
  description: `${siteConfig.name}, ${siteConfig.role.toLowerCase()}. Live projects with case studies.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const menuProjects = getAllProjects().map(({ slug, name, type, accent, accent2 }) => ({
    slug,
    name,
    type,
    accent,
    accent2,
  }));

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SkipLink />
          <SiteHeader projects={menuProjects} />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
