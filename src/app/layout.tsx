import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { pageCss } from "./page-css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export const metadata: Metadata = {
  title: "Claude Builders Club | Student AI Club at Ohio State",
  description:
    "The Claude Builders Club is a student AI club at The Ohio State University. We run workshops, build projects and ship apps on Claude.",
  openGraph: {
    title: "Claude Builders Club at Ohio State",
    description:
      "A student AI club at The Ohio State University. Learn, build and ship with Claude.",
    type: "website",
    siteName: "Claude Builders Club",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claude Builders Club at Ohio State",
    description:
      "A student AI club at The Ohio State University. Learn, build and ship with Claude.",
  },
  icons: {
    icon: "/assets/icons/claude.svg",
  },
  metadataBase: new URL("https://claudehacks.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-type="software"
      data-radius="soft"
      data-ground="sky"
      data-buttons="arrow"
      data-motion=""
      suppressHydrationWarning
    >
      <head>
        <meta name="site-kind" content="software" />
        <meta name="page-type" content="software" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@400..700&family=JetBrains+Mono:wght@400..500&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/assets/system.css" />
        <link rel="stylesheet" href="/assets/ui/cards.css" />
        <link rel="stylesheet" href="/assets/motion/motion.css" />
        <link rel="stylesheet" href="/assets/backgrounds/backgrounds.css" />
        <link rel="stylesheet" href="/assets/layout/layout.css" />
        <link rel="stylesheet" href="/assets/icons/icon.css" />
        <link rel="stylesheet" href="/assets/ui/base.css" />
        <link rel="stylesheet" href="/assets/diagrams/diagram.css" />
        <style dangerouslySetInnerHTML={{ __html: pageCss }} />
      </head>
      {/* type: software (an AI hackathon: a tech subject, no app of its own)
          deal: hero triptych (first deal collage needed a product UI the brief lacks; dealt again
          without --has), nav nav-centre, close close-word, footer footer-statement, rhythm
          surface-pairs, buttons arrow, mark wordmark, ground sky, section grounds winners:bg-mist
          judges:bg-band, effect grain-gradient (in the hero collage), card ground: none fit (the
          panels take the lit ground plain). moments: none built. letters-assemble (dealt first) fails
          heading-scale: its 180px statement beside the triptych's 52px h1; line-carries-colour (dealt
          second, on the judges band) fails flush, hole and section-gaps through its inset stage.
          Six sections and the footer.
          palette: the client's own (start.mjs brand), pairing host. */}
      <body className="antialiased">
        <Script src="/assets/backgrounds/backgrounds.js" strategy="beforeInteractive" />
        <Navbar />
        <main id="top">{children}</main>
        <Footer />
        <Script type="module" src="/assets/system.js" strategy="afterInteractive" />
        <Script type="module" src="/assets/motion/motion.js" strategy="afterInteractive" />
        <Script type="module" src="/assets/layout/layout.js" strategy="afterInteractive" />
        <Script type="module" src="/assets/diagrams/mount.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
