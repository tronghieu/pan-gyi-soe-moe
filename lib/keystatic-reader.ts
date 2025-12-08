import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic/keystatic.config";
import fs from "fs";
import path from "path";

const reader = createReader(process.cwd(), keystaticConfig);

// Type definitions
export interface SiteConfig {
    siteName: string;
    siteDescription: string;
    siteUrl: string;
    seoTitle?: string;
    seoDescription?: string;
    ogImage?: string;
    twitterHandle?: string;
    favicon?: string;
    copyrightText: string;
}

export interface ArtistInfo {
    name: string;
    title: string;
    bio?: string;
    artistStatement?: string;
    profileImage?: string;
    email: string;
    instagram?: string;
    twitter?: string;
    dribbble?: string;
    careerHighlights?: string[];
}

export interface Event {
    slug: string;
    title: string;
    date: string;
    location: string;
    image?: string;
    description?: string;
    featured?: boolean;
}

export interface Artwork {
    slug: string;
    title: string;
    date: string;
    medium: string;
    image?: string;
    description?: string;
    featured?: boolean;
}

// Helper function to read text files directly (for bio.mdoc)
function readTextFile(filePath: string): string | null {
    try {
        const fullPath = path.join(process.cwd(), filePath);
        return fs.readFileSync(fullPath, "utf8");
    } catch (error) {
        console.error(`Error reading ${filePath}:`, error);
        return null;
    }
}

// Helper to parse YAML frontmatter-like format
function parseSimpleYaml(content: string): Record<string, string | string[]> {
    const lines = content.split('\n');
    const result: Record<string, string | string[]> = {};
    let currentKey = '';
    let currentValue = '';

    for (const line of lines) {
        if (line.includes(':')) {
            if (currentKey) {
                result[currentKey] = currentValue.trim();
            }
            const [key, ...valueParts] = line.split(':');
            currentKey = key.trim();
            currentValue = valueParts.join(':').trim();

            // Handle special characters
            if (currentValue.startsWith('>-')) {
                currentValue = '';
            } else if (currentValue.startsWith('-')) {
                // Array item
                const existing = result[currentKey];
                const arr = Array.isArray(existing) ? existing : [];
                arr.push(currentValue.substring(1).trim());
                result[currentKey] = arr;
                currentKey = '';
            }
        } else if (currentKey && line.trim()) {
            currentValue += ' ' + line.trim();
        } else if (currentKey && !line.trim() && currentValue) {
            const trimmedLine = line.trimStart();
            if (trimmedLine.startsWith('-') && currentKey) {
                const existing = result[currentKey];
                const arr = Array.isArray(existing) ? existing : [];
                arr.push(trimmedLine.substring(1).trim());
                result[currentKey] = arr;
            }
        }
    }

    if (currentKey && currentValue) {
        result[currentKey] = currentValue.trim();
    }

    return result;
}

export async function getSiteConfig(): Promise<SiteConfig | null> {
    try {
        // Read YAML file directly
        const content = readTextFile("content/site-config.yaml");
        if (content) {
            const parsed = parseSimpleYaml(content);
            return parsed as unknown as SiteConfig;
        }
    } catch {
        // Best-effort read; ignore parse errors and return null in caller
    }
    return null;
}

export async function getArtistInfo(): Promise<ArtistInfo | null> {
    try {
        // Read YAML file directly
        const yamlContent = readTextFile("content/artist.yaml");
        const bioContent = readTextFile("content/artist/bio.mdoc");
        const statementContent = readTextFile("content/artist/artistStatement.mdoc");

        if (yamlContent) {
            const parsed = parseSimpleYaml(yamlContent);
            return {
                ...parsed,
                bio: bioContent || undefined,
                artistStatement: statementContent || undefined,
            } as unknown as ArtistInfo;
        }
    } catch {
        // Ignore parse errors; return null for missing content
    }
    return null;
}

// Helper to extract description from MDOC file
function extractDescription(filePath: string): string | undefined {
    try {
        const content = readTextFile(filePath);
        if (!content) return undefined;

        // Find the description field in YAML frontmatter
        const descMatch = content.match(/description:\s*"([^"]*)"/);
        if (descMatch) {
            return descMatch[1];
        }

        // Try multiline description
        const lines = content.split('\n');
        let inDescription = false;
        let description = '';

        for (const line of lines) {
            if (line.startsWith('description:')) {
                inDescription = true;
                const value = line.substring('description:'.length).trim();
                if (value.startsWith('"')) {
                    description = value.substring(1);
                }
                continue;
            }

            if (inDescription) {
                if (line.startsWith('---') || line.match(/^[a-z]+:/)) {
                    break;
                }
                description += ' ' + line.trim();
            }
        }

        // Remove trailing quote and clean up
        description = description.replace(/"$/, '').trim();
        // Replace escaped newlines with actual newlines
        description = description.replace(/\\n/g, '\n');

        return description || undefined;
    } catch {
        return undefined;
    }
}

export async function getFeaturedArtwork(): Promise<Artwork[]> {
    try {
        const artworks = await reader.collections.artwork.all();
        return artworks
            .filter((artwork) => artwork.entry.featured)
            .map((artwork) => {
                const descPath = `content/artwork/${artwork.slug}.mdoc`;
                return {
                    slug: artwork.slug,
                    title: artwork.entry.title,
                    date: artwork.entry.date,
                    medium: artwork.entry.medium,
                    image: artwork.entry.image || undefined,
                    description: extractDescription(descPath),
                    featured: artwork.entry.featured,
                };
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch {
        // Ignore read errors; surface as empty list
        return [];
    }
}

export async function getUpcomingEvents(limit: number = 3): Promise<Event[]> {
    try {
        const events = await reader.collections.events.all();
        const now = new Date();

        return events
            .map((event) => {
                const descPath = `content/events/${event.slug}.mdoc`;
                return {
                    slug: event.slug,
                    title: event.entry.title,
                    date: event.entry.date,
                    location: event.entry.location,
                    image: event.entry.image || undefined,
                    description: extractDescription(descPath),
                    featured: event.entry.featured,
                };
            })
            .filter((event) => new Date(event.date) >= now || event.featured)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, limit);
    } catch {
        // Ignore read errors; surface as empty list
        return [];
    }
}

export async function getAllArtwork(): Promise<Artwork[]> {
    try {
        const artworks = await reader.collections.artwork.all();
        return artworks
            .map((artwork) => {
                const descPath = `content/artwork/${artwork.slug}.mdoc`;
                return {
                    slug: artwork.slug,
                    title: artwork.entry.title,
                    date: artwork.entry.date,
                    medium: artwork.entry.medium,
                    image: artwork.entry.image || undefined,
                    description: extractDescription(descPath),
                    featured: artwork.entry.featured,
                };
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch {
        // Ignore read errors; surface as empty list
        return [];
    }
}

export async function getAllEvents(): Promise<Event[]> {
    try {
        const events = await reader.collections.events.all();
        return events
            .map((event) => {
                const descPath = `content/events/${event.slug}.mdoc`;
                return {
                    slug: event.slug,
                    title: event.entry.title,
                    date: event.entry.date,
                    location: event.entry.location,
                    image: event.entry.image || undefined,
                    description: extractDescription(descPath),
                    featured: event.entry.featured,
                };
            })
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } catch {
        // Ignore read errors; surface as empty list
        return [];
    }
}

export async function getArtworkBySlug(slug: string): Promise<Artwork | null> {
    try {
        const entry = await reader.collections.artwork.read(slug);
        if (!entry) return null;
        const descPath = `content/artwork/${slug}.mdoc`;
        return {
            slug,
            title: entry.title,
            date: entry.date,
            medium: entry.medium,
            image: entry.image || undefined,
            description: extractDescription(descPath),
            featured: entry.featured,
        };
    } catch (error) {
        console.error(`Error reading artwork ${slug}:`, error);
        return null;
    }
}

export async function getArtworkMediums(): Promise<string[]> {
    const all = await getAllArtwork();
    const set = new Set<string>();
    for (const a of all) {
        if (a.medium) set.add(a.medium);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
}
