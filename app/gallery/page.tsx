import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import { getAllArtwork, getArtworkMediums, getArtistInfo, getSiteConfig } from "@/lib/keystatic-reader";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteConfig();
  const siteName = site?.siteName || "Portfolio";
  const description = site?.siteDescription || "A curated collection of selected works.";
  const siteUrl = site?.siteUrl || "https://pangyisoemoe.art";

  return {
    title: `Portfolio | ${siteName}`,
    description,
    openGraph: {
      title: `Portfolio | ${siteName}`,
      description,
      type: "website",
    },
    alternates: {
      canonical: new URL("/gallery", siteUrl).toString(),
    },
  };
}

export default async function GalleryPage() {
  const [artworks, filters, artist, site] = await Promise.all([
    getAllArtwork(),
    getArtworkMediums(),
    getArtistInfo(),
    getSiteConfig(),
  ]);

  const cards = artworks.map((a) => ({
    slug: a.slug,
    title: a.title,
    medium: a.medium,
    image: a.image,
  }));

  const displayName = artist?.name || site?.siteName || "Portfolio";

  return (
    <div className="min-h-screen flex flex-col">
      <Header artistName={displayName} />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-10 lg:px-20 py-10">
        <div className="pb-8">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">Portfolio</h1>
          <p className="mt-2 text-lg text-muted-foreground">A curated collection of my selected works.</p>
        </div>

        <Gallery artworks={cards} filters={filters} />
      </main>
      <Footer
        copyrightText={site?.copyrightText || `© ${new Date().getFullYear()} ${displayName}. All Rights Reserved.`}
        socialLinks={{
          instagram: artist?.instagram,
          twitter: artist?.twitter,
          dribbble: artist?.dribbble,
        }}
      />
    </div>
  );
}
