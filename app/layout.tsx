import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import { getSiteConfig } from "@/lib/keystatic-reader";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();

  const siteName = siteConfig?.siteName || "Pan Gyi Soe Moe";
  const siteDescription = siteConfig?.siteDescription || "Contemporary visual artist portfolio";
  const siteUrl = siteConfig?.siteUrl || "https://pangyisoemoe.art";
  const seoTitle = siteConfig?.seoTitle || siteName;
  const seoDescription = siteConfig?.seoDescription || siteDescription;

  return {
    title: {
      default: seoTitle,
      template: `%s | ${siteName}`,
    },
    description: seoDescription,
    keywords: ["artist", "visual art", "Myanmar", "cultural heritage", "contemporary art", "exhibition"],
    authors: [{ name: siteName }],
    creator: siteName,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName: siteName,
      title: seoTitle,
      description: seoDescription,
      images: siteConfig?.ogImage ? [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      creator: siteConfig?.twitterHandle ? `@${siteConfig.twitterHandle}` : undefined,
      images: siteConfig?.ogImage ? [siteConfig.ogImage] : [],
    },
    icons: {
      icon: siteConfig?.favicon || "/favicon.ico",
    },
    metadataBase: new URL(siteUrl),
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${lora.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

