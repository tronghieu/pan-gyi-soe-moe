# Qwen Code Project Context - Pan Gyi Soe Moe

## Project Overview

This is a Next.js 16 application bootstrapped with `create-next-app`. The project follows the Next.js App Router pattern and is configured with modern development tools including TypeScript, Tailwind CSS, and ESLint. The application uses the Geist font family from Vercel and implements dark mode support.

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

## Environment & Configuration

- TypeScript configured with ES2017 target and React JSX transformation
- ES Module resolution with bundler module resolution
- Path aliases configured: `@/*` maps to project root
- Tailwind CSS configured via PostCSS plugin
- ESLint extends Next.js recommended configurations