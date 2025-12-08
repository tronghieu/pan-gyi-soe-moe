import Image from "next/image";
import Link from "next/link";

interface AboutSectionProps {
    artistName: string;
    bio: string;
    profileImage?: string;
}

export default function AboutSection({ artistName, bio, profileImage }: AboutSectionProps) {
    return (
        <section id="about" className="bg-background-light dark:bg-background-dark py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-10 lg:px-20">
                <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
                    <div className="order-2 lg:order-1">
                        <h2 className="text-4xl font-bold leading-tight tracking-normal text-gray-900 dark:text-white sm:text-5xl">
                            Meet the Artist
                        </h2>
                        <div className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300 space-y-4">
                            {bio.split('\n\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                        <div className="mt-8">
                            <Link
                                className="inline-flex items-center gap-2 text-lg font-bold text-primary transition-colors hover:text-primary/80"
                                href="/about"
                            >
                                <span>Learn More About {artistName.split(' ')[0]}</span>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                    <div className="order-1 h-96 w-full overflow-hidden rounded-lg lg:order-2 lg:h-auto lg:aspect-[4/5]">
                        {profileImage ? (
                            <Image
                                alt={`Portrait of ${artistName}`}
                                src={profileImage}
                                width={800}
                                height={1000}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="h-full w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                <span className="text-gray-400 dark:text-gray-500">Profile Image</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
