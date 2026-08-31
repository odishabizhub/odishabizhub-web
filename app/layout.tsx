import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site-config";

const display = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — DPR, DIC Approval, MSME Subsidy & Business Registration`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — DPR, DIC Approval, MSME Subsidy & Business Registration`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: "/images/hero-illustration.webp", width: 1200, height: 675 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — DPR, DIC Approval, MSME Subsidy & Business Registration`,
    description: SITE_DESCRIPTION,
    images: ["/images/hero-illustration.webp"],
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  areaServed: {
    "@type": "State",
    name: "Odisha",
  },
  address: {
    "@type": "PostalAddress",
    addressRegion: "Odisha",
    addressCountry: "IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col bg-paper font-sans text-ink antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
