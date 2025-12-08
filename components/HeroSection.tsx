"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeroSlide {
    title: string;
    description: string;
    image: string;
    slug?: string;
}

interface HeroSectionProps {
    slides: HeroSlide[];
}

export default function HeroSection({ slides }: HeroSectionProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        if (slides.length <= 1 || isPaused) {
            return;
        }
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length, isPaused]);

    if (slides.length === 0) {
        return null;
    }

    const slide = slides[currentSlide];

    return (
        <section
            className="relative h-[calc(100vh-65px)] w-full overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                {slides.map((item, index) => (
                    <div
                        key={`${item.image}-${index}`}
                        className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
                    >
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                    </div>
                ))}
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 to-black/80" />
            </div>

            {/* Content */}
            <div className="relative z-20 flex h-full flex-col justify-end p-8 sm:p-12 lg:p-20">
                <div key={`${slide.title}-${currentSlide}`} className="max-w-3xl text-white transition-opacity duration-700">
                    <h1 className="text-5xl font-bold leading-tight tracking-normal sm:text-6xl md:text-7xl">
                        {slide.title}
                    </h1>
                    <p className="mt-4 text-lg font-normal text-gray-200 sm:text-xl">
                        {slide.description}
                    </p>
                    <div className="mt-8 flex gap-4">
                        <Link
                            href={slide.slug ? `/artwork/${slide.slug}` : "/gallery"}
                            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-black/30 transition hover:scale-105"
                        >
                            View More
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Navigation Arrows */}
                {slides.length > 1 && (
                    <div className="absolute bottom-8 right-8 flex items-center gap-4 sm:right-12 lg:right-20">
                        <button
                            onClick={prevSlide}
                            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                            aria-label="Previous slide"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={nextSlide}
                            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                            aria-label="Next slide"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
