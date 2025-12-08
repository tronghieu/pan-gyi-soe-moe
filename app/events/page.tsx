import type { Metadata } from 'next';
import Link from 'next/link';
import { Lora } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllEvents, getArtistInfo, getSiteConfig } from '@/lib/keystatic-reader';

export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteConfig();
  const siteName = site?.siteName || 'Pan Gyi Soe Moe';
  const description = site?.siteDescription || 'Explore upcoming and past events, exhibitions, and artistic showcases.';
  const siteUrl = site?.siteUrl || 'https://pangyisoemoe.art';

  return {
    title: `Events & Exhibitions | ${siteName}`,
    description,
    keywords: ['events', 'exhibitions', 'art', 'artist', 'showcase', 'cultural heritage', 'Myanmar art'],
    openGraph: {
      title: `Events & Exhibitions | ${siteName}`,
      description,
      type: 'website',
      locale: 'en_US',
    },
    alternates: {
      canonical: new URL('/events', siteUrl).toString(),
    },
  };
}

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  display: 'swap',
});

const EventListingsPage = async () => {
  // Fetch events, artist profile, and site data from Keystatic CMS
  const [events, artist, site] = await Promise.all([
    getAllEvents(),
    getArtistInfo(),
    getSiteConfig(),
  ]);

  // Determine if an event is upcoming or past based on the date
  const now = new Date();
  const upcomingEvents = events.filter(event => new Date(event.date) >= now);
  const pastEvents = events.filter(event => new Date(event.date) < now);

  const displayName = artist?.name || site?.siteName || 'Artist';

  return (
    <div className={`min-h-screen flex flex-col bg-background text-foreground font-display ${lora.variable} font-serif`}>
      <Header artistName={displayName} />

      <main className="flex flex-1 flex-col px-4 py-10 md:px-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-wrap items-baseline justify-between gap-4 pb-8">
          <div>
            <h1 className="text-4xl font-black leading-tight tracking-[-0.033em]">Events & Exhibitions</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Discover upcoming exhibitions, workshops, and past showcases
            </p>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-12 md:grid-cols-2 md:gap-8 lg:gap-16">
          <section className="flex flex-col">
            <h2 className="font-serif text-2xl font-semibold leading-tight pb-5 pt-5 border-b border-border mb-5">Upcoming Events</h2>
            <div className="flex flex-col gap-8">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <article
                    key={event.slug}
                    className="flex flex-col items-stretch justify-start rounded-lg transition-colors hover:bg-accent"
                  >
                    <div className="flex w-full flex-col items-stretch justify-center gap-2 py-4">
                      <h3 className="text-xl font-bold leading-tight">{event.title}</h3>
                      <div className="flex flex-col gap-1">
                        <p className="text-muted-foreground text-lg font-normal leading-relaxed">{event.date} • {event.location}</p>
                        <p className="text-muted-foreground text-base font-normal leading-relaxed">{event.description || 'Event details coming soon'}</p>
                      </div>
                      <div className="pt-2">
                        <Link
                          className="font-sans flex min-w-[84px] max-w-max cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-primary text-primary-foreground text-sm font-medium leading-normal transition-opacity hover:opacity-90"
                          href={`/events/${event.slug}`}
                        >
                          <span className="truncate">Learn More</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <p className="text-muted-foreground py-4">No upcoming events scheduled at the moment.</p>
              )}
            </div>
          </section>

          <section className="flex flex-col">
            <h2 className="font-serif text-2xl font-semibold leading-tight pb-5 pt-5 border-b border-border mb-5">Past Events</h2>
            <div className="flex flex-col gap-8">
              {pastEvents.length > 0 ? (
                pastEvents.map((event) => (
                  <article
                    key={event.slug}
                    className="flex flex-col items-stretch justify-start rounded-lg transition-colors hover:bg-accent"
                  >
                    <div className="flex w-full flex-col items-stretch justify-center gap-2 py-4">
                      <h3 className="text-muted-foreground text-xl font-bold leading-tight">{event.title}</h3>
                      <div className="flex flex-col gap-1">
                        <p className="text-muted-foreground/70 text-lg font-normal leading-relaxed">{event.date} • {event.location}</p>
                        <p className="text-muted-foreground/70 text-base font-normal leading-relaxed">{event.description || 'Event details coming soon'}</p>
                      </div>
                      <div className="pt-2">
                        <Link
                          className="font-sans flex min-w-[84px] max-w-max cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-primary text-primary-foreground text-sm font-medium leading-normal transition-opacity hover:opacity-90"
                          href={`/events/${event.slug}`}
                        >
                          <span className="truncate">View Details</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <p className="text-muted-foreground py-4">No past events to display.</p>
              )}
            </div>
          </section>
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

export default EventListingsPage;
