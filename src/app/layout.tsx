import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Claude Hacks @ Ohio State | April 17–19, 2026",
  description: "A hackathon powered by Claude AI, hosted by the Claude Builders Club at The Ohio State University. April 17–19 at Pomerene 280. Registration closed — 100 participants.",
  openGraph: {
    title: "Claude Hacks @ Ohio State",
    description: "Build the future with AI. A hackathon at The Ohio State University, April 17–19, 2026. Registration closed — all 100 spots filled.",
    type: "website",
    siteName: "Claude Hacks",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claude Hacks @ Ohio State",
    description: "Build the future with AI. A hackathon at The Ohio State University, April 17–19, 2026. Registration closed.",
  },
  metadataBase: new URL("https://claudehacks.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-body noise">
        <div className="mesh-gradient" />
        <Navbar />
        <main className="relative z-10 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
