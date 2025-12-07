# pan-gyi-soe-moe

**pan-gyi-soe-moe** is a modern web application built with Next.js that serves as a comprehensive platform for showcasing and preserving Myanmar's cultural heritage, traditional events, historical artifacts, and portfolio items. Named after a traditional Myanmar percussion instrument, the project aims to bridge traditional Myanmar culture with modern technology. The platform focuses on providing an immersive digital experience that celebrates cultural diversity while following established engineering principles focusing on code quality, testing standards, user experience consistency, and performance requirements as outlined in our project constitution.

## Technical Stack

- **Framework**: [Next.js](https://nextjs.org) 16 (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom theme
- **Fonts**: [Geist](https://vercel.com/font) family optimized via `next/font`
- **Package Manager**: npm
- **Runtime**: Node.js
- **Architecture**: Server-Side Rendering (SSR) and Static Site Generation (SSG) capabilities
- **UI Components**: Pre-designed components using industry-standard libraries
- **State Management**: Client and server state management following Next.js 16 best practices
- **API Layer**: Built-in API routes with RESTful services and JSON Web Token (JWT) authentication
- **Database**: Integrated with modern databases (PostgreSQL/MySQL/MongoDB) with ORM/ODM support
- **Testing**: Jest, React Testing Library, and Cypress for unit, integration, and end-to-end tests
- **CI/CD**: Automated workflows with GitHub Actions for testing and deployment
- **Deployment**: Optimized for Vercel platform with edge caching and global CDN

## Project Principles

This project adheres to the following core principles defined in our constitution:

- **Code Quality Standards**: All code follows established style guides, passes linting, uses static analysis, maintains complexity metrics, and includes documentation for public interfaces
- **Testing Standards**: TDD encouraged with minimum 80% test coverage, integration tests for critical paths
- **User Experience Consistency**: Consistent UI/UX patterns, design system guidelines, WCAG 2.1 AA accessibility, responsive design
- **Performance Requirements**: Page load times under 3 seconds, Core Web Vitals optimization, efficient bundle sizes
- **Security and Privacy**: Secure coding practices, data protection compliance, input validation

## Development Environment Setup

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 18.17.0 or higher)
- [npm](https://www.npmjs.com/) (version 9.0.0 or higher) or [Yarn](https://yarnpkg.com/) (version 1.22.0 or higher)
- [Git](https://git-scm.com/)
- A modern code editor (VS Code recommended with recommended extensions)

### Clone the Repository

```bash
git clone https://github.com/your-username/pan-gyi-soe-moe.git
cd pan-gyi-soe-moe
```

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Local Environment Configuration

1. Create a `.env.local` file in the project root and add the following environment variables:
   ```
   DATABASE_URL=your_database_connection_string
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_auth_secret
   JWT_SECRET=your_jwt_secret
   ```

2. For development, you can use SQLite as a local database option:
   ```
   DATABASE_URL="file:./dev.db"
   ```

### Running the Development Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Available Scripts

In the project directory, you can run:

- `npm run dev` - Starts the development server
- `npm run build` - Creates an optimized production build
- `npm run start` - Starts the production server
- `npm run lint` - Runs ESLint to check for code issues
- `npm run test` - Runs unit and integration tests
- `npm run test:watch` - Runs tests in watch mode
- `npm run test:e2e` - Runs end-to-end tests
- `npm run db:migrate` - Runs database migrations
- `npm run db:seed` - Seeds the database with initial data

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

We welcome contributions to this project. Please read our [project constitution](./.specify/memory/constitution.md) to understand our engineering principles and development guidelines before submitting pull requests.