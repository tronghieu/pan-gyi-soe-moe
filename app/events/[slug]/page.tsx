import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Lora } from 'next/font/google';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllEvents, getArtistInfo, getSiteConfig } from '@/lib/keystatic-reader';

export const dynamic = 'force-static';

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  display: 'swap',
});

// Generate metadata for the event page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [events, site] = await Promise.all([
    getAllEvents(),
    getSiteConfig(),
  ]);
  const event = events.find(e => e.slug === slug);

  if (!event) {
    return {};
  }

  const siteName = site?.siteName || 'Pan Gyi Soe Moe';
  const siteUrl = site?.siteUrl || 'https://pangyisoemoe.art';
  const title = `${event.title} | Events | ${siteName}`;
  const description = event.description || `Details about ${event.title} event`;

  return {
    title,
    description,
    keywords: ['event', 'exhibition', 'art', 'show', 'cultural heritage', 'Myanmar art'],
    openGraph: {
      title,
      description,
      type: 'article',
      locale: 'en_US',
      images: event.image ? [{ url: event.image, width: 1200, height: 630, alt: event.title }] : [],
    },
    alternates: {
      canonical: new URL(`/events/${slug}`, siteUrl).toString(),
    },
  };
}

// Generate static params for all events (for SSG)
export async function generateStaticParams() {
  const events = await getAllEvents();
  return events.map((event) => ({
    slug: event.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

const EventDetailPage = async ({ params }: Props) => {
  // Await params for Next.js 16 (breaking change introduced in Next.js 15)
  const { slug } = await params;

  // Fetch events, artist profile, and site configuration
  const [events, artist, site] = await Promise.all([
    getAllEvents(),
    getArtistInfo(),
    getSiteConfig(),
  ]);
  const event = events.find(e => e.slug === slug);

  // If event is not found, return 404
  if (!event) {
    notFound();
  }

  // Format date for display
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const eventTime = "6:00 PM - 9:00 PM"; // This would come from the CMS in a real implementation
  const location = event.location || "TBD";

  // Use event cover image or fallback
  const coverImage = event.image || '/images/events/default-event.jpg';

  // Get 3 other events (excluding current event)
  const otherEvents = events
    .filter(e => e.slug !== slug)
    .slice(0, 3);
  const displayName = artist?.name || site?.siteName || 'Artist';

  return (
    <div className={`min-h-screen flex flex-col bg-background text-foreground font-display ${lora.variable} font-serif`}>
      <Header artistName={displayName} />

      <main className="flex flex-1 justify-center px-4 py-10 sm:px-10 lg:px-20">
        <div className="layout-content-container flex w-full max-w-4xl flex-col gap-8">
          <div className="flex flex-wrap gap-2 px-4">
            <Link
              className="text-muted-foreground/60 hover:text-primary transition-colors text-sm font-medium leading-normal flex items-center gap-1 font-sans"
              href="/events"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Events
            </Link>
          </div>

          <div className="relative w-full">
            <div className="w-full">
              <div
                className="bg-cover bg-center flex flex-col justify-end overflow-hidden min-h-[500px] rounded-xl"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(24, 22, 17, 0.8) 0%, rgba(24, 22, 17, 0) 40%), url("${coverImage}")`
                }}
              >
                <div className="flex p-8">
                  <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight">{event.title}</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="border-y border-border">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex-1 p-4 flex justify-between gap-x-6 border-b md:border-b-0 md:border-r border-border">
                <p className="text-muted-foreground/60 text-base font-normal leading-normal">Date</p>
                <p className="text-foreground text-base font-medium leading-normal text-right">{formattedDate}</p>
              </div>
              <div className="flex-1 p-4 flex justify-between gap-x-6 border-b md:border-b-0 md:border-r border-border">
                <p className="text-muted-foreground/60 text-base font-normal leading-normal">Time</p>
                <p className="text-foreground text-base font-medium leading-normal text-right">{eventTime}</p>
              </div>
              <div className="flex-1 p-4 flex justify-between gap-x-6">
                <p className="text-muted-foreground/60 text-base font-normal leading-normal">Location</p>
                <a
                  className="text-foreground text-base font-medium leading-normal text-right hover:text-primary transition-colors"
                  href="#"
                >
                  {location}
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            <div className="md:col-span-1">
              <h3 className="text-foreground text-2xl font-bold leading-tight">About the Event</h3>
            </div>
            <div className="md:col-span-2 flex flex-col gap-6 text-muted-foreground/80 text-lg leading-relaxed">
              <p>
                {event.description || "Event details coming soon. Check back later for more information about this special event."}
              </p>
            </div>
          </div>

          {/* Other Events Section */}
          {otherEvents.length > 0 && (
            <div className="px-4 pt-12">
              <div className="border-t border-border pt-8">
                <h2 className="text-foreground text-3xl font-bold leading-tight pb-6">Other Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {otherEvents.map((otherEvent) => {
                    const eventDate = new Date(otherEvent.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    });
                    const eventImage = otherEvent.image || '/images/events/default-event.jpg';

                    return (
                      <Link
                        key={otherEvent.slug}
                        href={`/events/${otherEvent.slug}`}
                        className="group flex flex-col rounded-xl overflow-hidden border border-border hover:border-primary transition-all hover:shadow-lg"
                      >
                        <div
                          className="h-48 bg-cover bg-center"
                          style={{ backgroundImage: `url("${eventImage}")` }}
                        />
                        <div className="p-4 flex flex-col gap-2">
                          <h3 className="text-foreground text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                            {otherEvent.title}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {eventDate} • {otherEvent.location}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer
        copyrightText={site?.copyrightText || `© ${new Date().getFullYear()} ${displayName}. All Rights Reserved.`}
        socialLinks={{
          instagram: artist?.instagram,
          twitter: artist?.twitter,
          dribbble: artist?.dribbble
        }}
      />
    </div>
  );
};

export default EventDetailPage;
