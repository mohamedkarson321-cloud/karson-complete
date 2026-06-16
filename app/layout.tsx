import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://karson.ai";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "KARSON — AI-Powered Software Development & Technology Solutions",
    template: "%s | KARSON",
  },
  description:
    "KARSON builds intelligent software solutions powered by cutting-edge AI. From custom AI development and automation to cloud architecture and cybersecurity — we engineer the future.",
  keywords: [
    "AI software development",
    "artificial intelligence solutions",
    "software automation",
    "cloud solutions",
    "machine learning",
    "web development",
    "mobile apps",
    "data analytics",
    "cybersecurity",
    "technology consulting",
    "KARSON",
    "enterprise software",
  ],
  authors: [{ name: "KARSON Team", url: APP_URL }],
  creator: "KARSON",
  publisher: "KARSON",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: "KARSON",
    title: "KARSON — AI-Powered Software Development & Technology Solutions",
    description:
      "KARSON builds intelligent software solutions powered by cutting-edge AI. From custom AI development and automation to cloud architecture — we engineer the future.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KARSON — AI Technology Solutions",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@karsonai",
    creator: "@karsonai",
    title: "KARSON — AI-Powered Software Development",
    description:
      "KARSON builds intelligent software solutions powered by cutting-edge AI.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#3B82F6",
      },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: APP_URL,
    languages: {
      "en-US": APP_URL,
    },
  },
  category: "technology",
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Structured data — Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "KARSON",
              url: APP_URL,
              logo: `${APP_URL}/logo.png`,
              sameAs: [
                "https://twitter.com/karsonai",
                "https://linkedin.com/company/karsonai",
                "https://github.com/karsonai",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-800-KARSON",
                contactType: "customer service",
                availableLanguage: ["English"],
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "100 Innovation Drive",
                addressLocality: "San Francisco",
                addressRegion: "CA",
                postalCode: "94105",
                addressCountry: "US",
              },
              description:
                "KARSON builds intelligent software solutions powered by cutting-edge AI.",
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-background antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <AuthProvider>
            <QueryProvider>
              {children}
              <Toaster richColors position="bottom-right" expand />
              <Analytics />
              <SpeedInsights />
            </QueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
