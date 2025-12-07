# Qwen Code Project Context - Pan Gyi Soe Moe

## Project Overview

This is a Next.js 16 personal website bootstrapped with `create-next-app`. The project follows the Next.js App Router pattern and is configured with modern development tools including TypeScript, Tailwind CSS, and ESLint. The website uses the Geist font family from Vercel and implements dark mode support. Named after a traditional Myanmar percussion instrument, the project serves as a platform for showcasing information about Myanmar's cultural heritage and personal portfolio items.

## Project Structure

```
/Users/luutronghieu/Projects/pan-gyi-soe-moe/
├── .claude/          # Claude-specific configuration
├── .codex/           # Codex-specific configuration  
├── .gemini/          # Gemini-specific configuration
├── .next/            # Next.js build output (git-ignored)
├── .qwen/            # Qwen-specific configuration
├── .specify/         # Specify-specific configuration
├── app/              # Next.js App Router directory
│   ├── favicon.ico
│   ├── globals.css   # Global styles with Tailwind CSS
│   ├── layout.tsx    # Root layout component
│   └── page.tsx      # Home page component
├── public/           # Static assets
├── next.config.ts    # Next.js configuration
├── package.json      # Project dependencies and scripts
├── tsconfig.json     # TypeScript configuration
├── eslint.config.mjs # ESLint configuration
└── postcss.config.mjs # PostCSS configuration
```

## Key Technologies

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom theme configuration
- **Fonts**: Geist and Geist Mono (from next/font/google)
- **Package Manager**: npm (with package-lock.json)

## Building and Running

### Development
- `npm run dev` - Start the development server
- Access the application at http://localhost:3000
- The development server supports hot reloading

### Production
- `npm run build` - Build the application for production
- `npm run start` - Start the production server

### Linting
- `npm run lint` - Run ESLint to check for code issues

## Development Conventions

### Styling
- Uses Tailwind CSS v4 with inline theme configuration
- Implements dark mode support with CSS media queries
- Leverages CSS variables for theming
- Uses Geist font family as the default font

### Code Quality
- TypeScript with strict mode enabled
- ESLint with Next.js core web vitals and TypeScript configurations
- Automatic code formatting (implied by standard Next.js setup)

### File Structure (App Router)
- Components are located in the `app/` directory
- Layout components define the root HTML structure
- Page components define route-specific content
- Global styles are defined in `globals.css`

## Notable Features

- **Dark Mode Support**: Implemented with CSS media queries and theme variables
- **Font Optimization**: Uses Next.js built-in font optimization for Geist family
- **Responsive Design**: Uses Tailwind CSS utility classes for responsive layouts
- **Type Safety**: Full TypeScript support with React component typing
- **Automatic Image Optimization**: Uses Next.js Image component with priority loading
- **Minimal Testing**: Jest for critical functionality where needed

## Project Principles

This personal website follows these core principles:

- **Code Quality**: Clean, maintainable code with proper TypeScript typing
- **Testing Standards**: Unit tests for critical functionality where needed
- **User Experience**: Consistent UI/UX patterns with responsive design and WCAG 2.1 AA accessibility
- **Performance**: Page load times under 3 seconds, optimized Core Web Vitals, and efficient bundle sizes
- **Security**: Basic security practices for static content

## Project Templates

This project includes several UI templates designed for showcasing cultural heritage and portfolio items. These templates are provided as standalone HTML files using Tailwind CSS. For the Next.js application, these will be converted to React components:

- **Home Page**: Main landing page with featured content
- **About Page**: Artist/creator information section
- **Portfolio**: Gallery view for showcasing artwork and projects
- **Event Listings**: List of cultural events and exhibitions
- **Event Detail**: Detailed view for specific events
- **Artwork Insight**: Detailed view for individual artworks

## UI Components

The project uses Tailwind CSS with shadcn/ui components for styling. The following components have been added:

- Button
- Card
- Sheet
- Dialog

Additional components can be added using:
```bash
npx shadcn@latest add [component-name]
```

## Environment & Configuration

- TypeScript configured with ES2017 target and React JSX transformation
- ES Module resolution with bundler module resolution
- Path aliases configured: `@/*` maps to project root
- Tailwind CSS configured via PostCSS plugin
- ESLint extends Next.js recommended configurations