import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllArtwork, getArtistInfo, getArtworkBySlug, getSiteConfig } from "@/lib/keystatic-reader";

export const dynamic = "force-static";

type Params = { slug: string };

export async function generateStaticParams() {
  const all = await getAllArtwork();
  return all.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const [art, site] = await Promise.all([
    getArtworkBySlug(slug),
    getSiteConfig(),
  ]);
  if (!art) return {};
  const siteName = site?.siteName || "Artwork";
  const siteUrl = site?.siteUrl || "https://pangyisoemoe.art";
  const title = `${art.title} | ${siteName}`;
  const description = art.description || `${art.medium} • ${new Date(art.date).getFullYear()}`;
  const url = new URL(`/artwork/${slug}`, siteUrl).toString();
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: art.image ? [{ url: art.image, width: 1200, height: 800, alt: art.title }] : [],
    },
    alternates: { canonical: url },
  };
}

export default async function ArtworkDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const [art, artist, site, allArtworks] = await Promise.all([
    getArtworkBySlug(slug),
    getArtistInfo(),
    getSiteConfig(),
    getAllArtwork(),
  ]);

  if (!art) notFound();

  const year = new Date(art.date).getFullYear();
  const mail = artist?.email ? `mailto:${artist.email}?subject=Inquiry about ${encodeURIComponent(art.title)}` : undefined;
  const displayName = artist?.name || site?.siteName || "Artist";
  const moreArtworks = allArtworks.filter((item) => item.slug !== slug).slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Header artistName={displayName} />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-10 lg:px-20 py-10">
        <div className="mb-6 text-sm text-muted-foreground">
          <Link href="/gallery" className="hover:text-primary">Gallery</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">{art.title}</span>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-xl border border-border bg-card">
            <div className="relative w-full aspect-[4/5]">
              <Image
                src={art.image || "/images/artworks/placeholder.jpg"}
                alt={art.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <header className="border-b border-border pb-4">
              <h1 className="text-4xl font-bold tracking-tight">{art.title}</h1>
            </header>

            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between border-b border-border pb-2">
                <dt className="text-muted-foreground">Medium</dt>
                <dd className="text-foreground font-medium">{art.medium}</dd>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <dt className="text-muted-foreground">Year</dt>
                <dd className="text-foreground font-medium">{year}</dd>
              </div>
            </dl>

            <section className="space-y-3">
              <h2 className="text-sm font-semibold text-muted-foreground">Artist’s Statement</h2>
              <p className="text-base leading-relaxed text-foreground/90">
                {art.description || "Details coming soon."}
              </p>
            </section>

            {mail && (
              <div className="pt-2">
                <a
                  href={mail}
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-90"
                >
                  Inquire About This Piece
                </a>
              </div>
            )}
          </div>
        </div>
        {moreArtworks.length > 0 && (
          <section className="mt-16 border-t border-border pt-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-primary/80">More Works</p>
                <h2 className="mt-2 text-3xl font-semibold">Other Artworks</h2>
              </div>
              <Link
                href="/gallery"
                className="text-sm font-semibold text-primary hover:text-primary/80"
              >
                View Gallery
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {moreArtworks.map((item) => (
                <Link
                  key={item.slug}
                  href={`/artwork/${item.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:border-primary/60"
                >
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={item.image || "/images/artworks/placeholder.jpg"}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-lg font-semibold text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.medium}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer
        copyrightText={site?.copyrightText || `© ${new Date().getFullYear()} ${displayName}. All Rights Reserved.`}
        socialLinks={{ instagram: artist?.instagram, twitter: artist?.twitter, dribbble: artist?.dribbble }}
      />
    </div>
  );
}
