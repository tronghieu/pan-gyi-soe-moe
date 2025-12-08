import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EventsSection from "@/components/EventsSection";
import {
  getSiteConfig,
  getArtistInfo,
  getFeaturedArtwork,
  getUpcomingEvents
} from "@/lib/keystatic-reader";

export const dynamic = 'force-static';

export default async function Home() {
  // Fetch all data
  const [siteConfig, artistInfo, featuredArtwork, upcomingEvents] = await Promise.all([
    getSiteConfig(),
    getArtistInfo(),
    getFeaturedArtwork(),
    getUpcomingEvents(3),
  ]);

  const displayName = artistInfo?.name || siteConfig?.siteName || "Pan Gyi Soe Moe";

  // Prepare hero slides from featured artwork
  const heroSlides: { title: string; description: string; image: string; slug?: string }[] = featuredArtwork.slice(0, 5).map((artwork) => ({
    title: artwork.title,
    description: artwork.description || `${artwork.medium} - ${new Date(artwork.date).getFullYear()}`,
    image: artwork.image || "/images/placeholder-artwork.jpg",
    slug: artwork.slug,
  }));

  // Fallback data if no featured artwork
  if (heroSlides.length === 0) {
    heroSlides.push({
      title: displayName,
      description: siteConfig?.siteDescription || "Contemporary visual artist exploring Myanmar's cultural heritage through modern artistic expressions",
      image: "/images/placeholder-hero.jpg",
    });
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header artistName={displayName} />

      <main className="flex-grow">
        <HeroSection slides={heroSlides} />

        <AboutSection
          artistName={displayName}
          bio={artistInfo?.bio || "Contemporary visual artist."}
          profileImage={artistInfo?.profileImage}
        />

        {upcomingEvents.length > 0 && (
          <EventsSection events={upcomingEvents} />
        )}
      </main>

      <Footer
        copyrightText={siteConfig?.copyrightText || `© ${new Date().getFullYear()} ${displayName}. All Rights Reserved.`}
        socialLinks={{
          instagram: artistInfo?.instagram,
          twitter: artistInfo?.twitter,
          dribbble: artistInfo?.dribbble,
        }}
      />
    </div>
  );
}
