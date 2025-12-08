# Repository Guidelines

## Project Structure & Module Organization
- `app/` — Next.js App Router pages and routes (e.g., `app/page.tsx`, `app/events/[slug]/page.tsx`, `app/api/keystatic/[...params]/route.ts`).
- `components/` — Shared React components. `components/ui/` contains shadcn/ui primitives.
- `lib/` — Utilities and readers (e.g., `lib/utils.ts`, `lib/keystatic-reader.ts`).
- `content/` — Markdoc content and site config (`content/events/*.mdoc`, `content/artwork/*.mdoc`, `content/site-config/config.json`).
- `keystatic/` + `app/keystatic/` — Keystatic config and admin UI.
- `public/` — Static assets (images, icons).
- `templates/` — HTML prototypes; do not treat as runtime source.
- `docs/` — Project documentation.

## Build, Test, and Development Commands
- `npm run dev` — Start local dev server at http://localhost:3000.
- `npm run build` — Production build (SSG/SSR as configured).
- `npm run start` — Serve the production build.
- `npm run lint` — Run ESLint with Next.js rules.
- `npm run keystatic` — Keystatic dev tools (admin also available at `/keystatic`).
- Optional: `npx tsc --noEmit` — Type-only checks.

## Coding Style & Naming Conventions
- Language: TypeScript (strict). Indentation: 2 spaces.
- Components: PascalCase filenames (e.g., `Header.tsx`); shadcn in `components/ui` use lowercase filenames.
- Routes follow Next.js App Router conventions (`page.tsx`, `layout.tsx`, dynamic segments in brackets).
- Imports: Prefer `@/*` path alias per `tsconfig.json`.
- Linting: ESLint (`eslint.config.mjs`, Next core-web-vitals). Fix issues before opening a PR.

## Testing Guidelines
- No test runner is bundled. If adding tests, use Jest + React Testing Library.
- Place tests alongside code or in `__tests__/`; name as `*.test.ts`/`*.test.tsx`.
- Add smoke tests for critical pages and utilities. Aim for meaningful coverage on changed code.

## Commit & Pull Request Guidelines
- Use Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, etc.
- PRs should include: clear description, linked issues, screenshots for UI changes, and reproduction/test steps.
- Keep changes scoped; avoid unrelated refactors and formatting-only diffs. Update docs when structure or behavior changes.

## Security & Configuration Tips
- Do not commit secrets. Use `.env.local`; only expose `NEXT_PUBLIC_*` vars to the client.
- Optimize images before adding to `public/`; use descriptive, kebab-case names.
- When adding packages that rely on Node APIs, review `next.config.ts` (`serverExternalPackages`, images) as needed.

## Agent-Specific Instructions
- Keep diffs minimal and targeted; respect existing structure and naming.
- Prefer editing files under `app/`, `components/`, `lib/`, `content/`. Avoid rewriting templates.
- Run `npm run lint` locally before proposing changes and ensure pages still render.
