import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getArtistInfo, getSiteConfig } from "@/lib/keystatic-reader";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const [site, artist] = await Promise.all([getSiteConfig(), getArtistInfo()]);
  const siteName = site?.siteName || artist?.name || "About";
  const siteUrl = site?.siteUrl || "https://pangyisoemoe.art";
  const description = artist?.bio?.split("\n\n")[0] || site?.siteDescription || "Artist profile and statement.";

  return {
    title: `About ${siteName}`,
    description,
    openGraph: {
      title: `About ${siteName}`,
      description,
      type: "profile",
      images: artist?.profileImage ? [{ url: artist.profileImage, width: 1200, height: 900, alt: siteName }] : [],
    },
    alternates: {
      canonical: new URL("/about", siteUrl).toString(),
    },
  };
}

export default async function AboutPage() {
  const [artist, site] = await Promise.all([getArtistInfo(), getSiteConfig()]);
  const displayName = artist?.name || site?.siteName || "Artist";
  const highlights = Array.isArray(artist?.careerHighlights) ? artist?.careerHighlights : [];
  const bioParagraphs = artist?.bio ? artist.bio.split("\n\n").filter(Boolean) : [];
  const statementParagraphs = artist?.artistStatement ? artist.artistStatement.split("\n\n").filter(Boolean) : [];
  const contactMethods = [
    artist?.email && {
      label: "Email",
      description: "Direct inquiries, commissions, and collaborations",
      value: artist.email,
      href: `mailto:${artist.email}`,
    },
    artist?.instagram && {
      label: "Instagram",
      description: "Studio updates & behind-the-scenes",
      value: artist.instagram,
      href: artist.instagram,
    },
    artist?.twitter && {
      label: "Twitter",
      description: "Thoughts on process and culture",
      value: artist.twitter,
      href: artist.twitter,
    },
    artist?.dribbble && {
      label: "Dribbble",
      description: "Selected design explorations",
      value: artist.dribbble,
      href: artist.dribbble,
    },
  ].filter(Boolean) as Array<{ label: string; description: string; value: string; href: string }>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header artistName={displayName} />
      <main className="flex-1 bg-background text-foreground">
        <section className="bg-background-dark/95 text-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16 sm:px-10 md:flex-row md:items-center">
            <div className="flex-1 space-y-6">
              <p className="text-base uppercase tracking-[0.3em] text-primary/80">About</p>
              <h1 className="text-4xl font-black leading-tight sm:text-5xl">{displayName}</h1>
              <p className="text-lg text-white/80">
                {artist?.title || site?.siteDescription || "Contemporary visual artist exploring Myanmar's cultural heritage."}
              </p>
            </div>
            {artist?.profileImage && (
              <div className="relative h-64 w-full overflow-hidden rounded-3xl border border-primary/40 md:h-80 md:w-80">
                <Image
                  src={artist.profileImage}
                  alt={`Portrait of ${displayName}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 320px"
                  priority
                />
              </div>
            )}
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-16 sm:px-10 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">Biography</h2>
            {bioParagraphs.length > 0 ? (
              bioParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-lg leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-muted-foreground">Biography coming soon.</p>
            )}
          </div>
          <div className="rounded-3xl border border-border bg-background-light/60 p-6 dark:bg-background-dark/40">
            <p className="text-sm uppercase tracking-[0.2em] text-primary">Highlights</p>
            <ul className="mt-4 space-y-3 text-base text-foreground/80">
              {highlights?.length ? (
                highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden />
                    {item}
                  </li>
                ))
              ) : (
                <li>No highlights added yet.</li>
              )}
            </ul>
          </div>
        </section>

        <section className="bg-background-light/60 dark:bg-black/20">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-10">
            <p className="text-sm uppercase tracking-[0.25em] text-primary/80">Artist Statement</p>
            <h2 className="mt-4 text-3xl font-semibold">Creative Philosophy</h2>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-foreground/90">
              {statementParagraphs.length > 0 ? (
                statementParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))
              ) : (
                <p>Artist statement coming soon.</p>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-10">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.25em] text-primary/80">Contact</p>
            <h3 className="mt-3 text-3xl font-semibold">Connect with {displayName.split(' ')[0]}</h3>
            <p className="mt-2 text-base text-muted-foreground">
              Reach out for exhibitions, commissions, collaborations, or speaking engagements.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {contactMethods.length > 0 ? (
              contactMethods.map((method) => (
                <div key={method.label} className="rounded-3xl border border-border bg-background-light/80 p-6 dark:bg-background-dark/40">
                  <p className="text-sm uppercase tracking-[0.25em] text-primary">{method.label}</p>
                  <p className="mt-3 text-base text-muted-foreground">{method.description}</p>
                  <Link
                    href={method.href}
                    className="mt-5 inline-flex items-center gap-2 text-lg font-semibold text-primary hover:text-primary/80"
                  >
                    {method.value}
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">Contact information coming soon.</p>
            )}
          </div>
        </section>
      </main>
      <Footer
        copyrightText={site?.copyrightText || `© ${new Date().getFullYear()} ${displayName}. All Rights Reserved.`}
        socialLinks={{ instagram: artist?.instagram, twitter: artist?.twitter, dribbble: artist?.dribbble }}
      />
    </div>
  );
}
