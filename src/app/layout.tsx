import type { Metadata } from "next";
import { Manrope, Caveat } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { IS_SITE_URL_CONFIGURED, SITE_URL } from "@/lib/site";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Restrained hand-drawn accent used only for small annotation marks — reinforces the doodle identity.
const caveat = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Independent InstaDoodle Guide | Whiteboard Animation", template: "%s | Independent InstaDoodle Guide" },
  description: "An independent guide to InstaDoodle's AI-powered whiteboard animation and doodle video creation workflow.",
  applicationName: "Independent InstaDoodle Guide",
  alternates: { canonical: "/" },
  robots: IS_SITE_URL_CONFIGURED ? { index: true, follow: true } : { index: false, follow: true },
  openGraph: { type: "website", siteName: "Independent InstaDoodle Guide", locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${caveat.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
