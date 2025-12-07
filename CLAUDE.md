# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

pan-gyi-soe-moe is a personal website built with Next.js 16 (App Router) that showcases Myanmar's cultural heritage. The project uses Keystatic as a headless CMS for content management and follows principles defined in `.specify/memory/constitution.md`.

## Development Commands

```bash
# Start development server (includes Keystatic CMS)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run Keystatic standalone (rarely needed, runs with dev)
npm run keystatic
```

Development server runs on http://localhost:3000. The Keystatic CMS admin panel is accessible at http://localhost:3000/keystatic.

## Architecture

### Next.js 16 App Router Structure

- `app/` - Next.js 16 App Router pages and layouts
  - `app/layout.tsx` - Root layout with Geist fonts
  - `app/page.tsx` - Homepage
  - `app/keystatic/` - Keystatic CMS admin UI (client-side)
  - `app/api/keystatic/` - Keystatic API route handlers

### Keystatic CMS Integration

**Important**: Keystatic in Next.js 16 requires a specific setup:

1. **API Route Handler**: `app/api/keystatic/[...params]/route.ts` uses `makeRouteHandler` from `@keystatic/next/route-handler`
2. **Admin UI**: `app/keystatic/[[...params]]/page.tsx` returns null (placeholder), actual UI loaded via `app/keystatic/layout.tsx` which renders the client component from `app/keystatic/keystatic.ts`
3. **Client Component**: `app/keystatic/keystatic.ts` uses `"use client"` and `makePage` from `@keystatic/next/ui/app`
4. **Configuration**: `keystatic/keystatic.config.ts` defines content schema
5. **Next.js Config**: `next.config.ts` includes `experimental.serverComponentsExternalPackages: ["@keystatic/core"]`

### Content Schema (Keystatic)

Content is stored locally in `content/` directory (configured as `storage: { kind: "local" }`):

**Collections**:
- `articles` - Cultural heritage articles with MarkDoc content (`content/articles/*`)
- `events` - Cultural events with images and descriptions (`content/events/*`)
- `artwork` - Artwork items with images (`content/artwork/*`)

**Singletons**:
- `artist` - Artist information with bio, social links, career highlights (`content/artist`)

All content uses MarkDoc format for rich content editing.

### Styling and UI

- **Tailwind CSS**: v4 with PostCSS
- **UI Components**: shadcn/ui components in `components/ui/` (Button, Card, Sheet, Dialog)
- **Fonts**: Geist Sans and Geist Mono via `next/font/google`
- **Utilities**: `lib/utils.ts` for className merging (cn function)

### TypeScript Configuration

- Strict mode enabled
- Path aliases: `@/*` maps to project root
- Configured for Next.js 16 with App Router

## Key Configuration Files

- `next.config.ts` - Next.js config with Keystatic external packages and image remote patterns
- `keystatic/keystatic.config.ts` - Content schema and CMS configuration
- `components.json` - shadcn/ui configuration (Tailwind v4, CSS variables style)
- `.specify/memory/constitution.md` - Project principles and standards

## Development Guidelines

From the project constitution:

- **Testing**: Unit tests for critical functionality only; focus on manual testing for UI
- **Code Quality**: All code must pass linting and follow TypeScript best practices
- **Performance**: Page load times under 3 seconds, optimize Core Web Vitals
- **Accessibility**: WCAG 2.1 AA standards required
- **Security**: Input validation, secure coding practices

## Adding shadcn/ui Components

```bash
npx shadcn@latest add [component-name]
```

Components will be added to `components/ui/` directory.

## Important Notes

- **Content Management**: Always edit content through Keystatic admin at `/keystatic`, not directly in `content/` directory
- **MarkDoc**: Content uses MarkDoc format (not plain Markdown) - supports custom components and tags
- **Images**: Remote images configured for `lh3.googleusercontent.com` in `next.config.ts`
- **No Database**: Project uses local file storage for content (no database required for development)
