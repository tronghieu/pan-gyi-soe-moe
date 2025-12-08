import { format } from "date-fns";
import Link from "next/link";


interface Event {
    slug: string;
    title: string;
    date: string;
    location: string;
    description?: string;
    featured?: boolean;
}

interface EventsSectionProps {
    events: Event[];
}

function getEventType(description?: string): string {
    if (!description) return "EVENT";
    const desc = description.toLowerCase();
    if (desc.includes("exhibition")) return "EXHIBITION";
    if (desc.includes("workshop")) return "WORKSHOP";
    if (desc.includes("talk") || desc.includes("conversation")) return "ARTIST TALK";
    return "EVENT";
}

export default function EventsSection({ events }: EventsSectionProps) {
    if (events.length === 0) {
        return null;
    }

    return (
        <section id="events" className="bg-background-light/50 dark:bg-black/20 py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-10 lg:px-20">
                <div className="text-center">
                    <h2 className="text-4xl font-bold leading-tight tracking-normal text-gray-900 dark:text-white sm:text-5xl">
                        Upcoming Events
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                        Join us at these upcoming exhibitions and talks to experience the latest works and gain insight into the creative process.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {events.map((event) => {
                        const eventDate = new Date(event.date);
                        const formattedDate = format(eventDate, "MMM d, yyyy");

                        return (
                            <Link
                                key={event.slug}
                                href={`/events/${event.slug}`}
                                className="flex flex-col gap-4 rounded-lg border border-primary/20 bg-background-light p-6 dark:bg-background-dark/50 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
                            >
                                <div>
                                    <p className="text-base font-medium text-primary">
                                        {getEventType(event.description)}
                                    </p>
                                    <h3 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                                        {event.title}
                                    </h3>
                                </div>
                                {event.description && (
                                    <p className="text-base text-gray-500 dark:text-gray-400 line-clamp-2">
                                        {event.description.split('\n')[0]}
                                    </p>
                                )}
                                <div className="mt-auto border-t border-primary/20 pt-4">
                                    <div className="flex items-center gap-3 text-base text-gray-600 dark:text-gray-300">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>{formattedDate}</span>
                                    </div>
                                    <div className="mt-2 flex items-center gap-3 text-base text-gray-600 dark:text-gray-300">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{event.location}</span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
