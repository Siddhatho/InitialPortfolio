import type { Metadata } from "next";
import { Space_Grotesk, Geist } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import StructuredData from "@/components/seo/StructuredData";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const geistSans = GeistSans;

const title = "Siddartho Sarker Bipro — Software & AI Engineer";
const description =
  "Portfolio of Siddartho Sarker Bipro. Software Engineer, AI Research Engineer, and Full Stack Developer.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://siddartho.vercel.app"),
  openGraph: {
    title,
    description,
    url: "https://siddartho.vercel.app",
    siteName: "Siddartho Sarker Bipro",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(spaceGrotesk.variable, geistSans.variable, "font-sans", geist.variable)}
    >
      <body className="font-body antialiased bg-brand-bg text-brand-text">
        <StructuredData />
        <Navbar />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
