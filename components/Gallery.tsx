"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export type GalleryArtwork = {
  slug: string;
  title: string;
  medium: string;
  image?: string;
};

interface GalleryProps {
  artworks: GalleryArtwork[];
  filters: string[]; // list of mediums
}

export default function Gallery({ artworks, filters }: GalleryProps) {
  const [active, setActive] = useState<string>("All");

  const filtered = useMemo(() => {
    if (active === "All") return artworks;
    return artworks.filter((a) => a.medium === active);
  }, [active, artworks]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setActive("All")}
          className={`h-8 rounded-full border px-3 text-sm transition-colors ${
            active === "All"
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border text-foreground/80 hover:bg-accent"
          }`}
        >
          All
        </button>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`h-8 rounded-full border px-3 text-sm transition-colors ${
              active === f
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-foreground/80 hover:bg-accent"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((art) => (
          <Link
            key={art.slug}
            href={`/artwork/${art.slug}`}
            className="group overflow-hidden rounded-xl border border-border bg-card hover:border-primary/60 transition-all"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={art.image || "/images/artworks/placeholder.jpg"}
                alt={art.title}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                priority={false}
              />
            </div>
            <div className="p-3">
              <p className="text-sm font-semibold leading-tight">{art.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{art.medium}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

