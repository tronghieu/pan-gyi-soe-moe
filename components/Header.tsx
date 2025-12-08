import Link from "next/link";

interface HeaderProps {
  artistName: string;
}

const navLinks = [
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
];

export default function Header({ artistName }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-primary/20 bg-background-light/80 px-4 py-3 backdrop-blur-sm dark:bg-background-dark/80 sm:px-10 lg:px-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          <div className="size-6 text-primary">
            <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path>
            </svg>
          </div>
          <h1 className="text-xl font-bold dark:text-white">{artistName}</h1>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              className="text-base font-medium text-gray-600 transition-colors hover:text-primary dark:text-gray-300 dark:hover:text-primary"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <details className="mt-4 border-t border-primary/20 pt-4 md:hidden">
        <summary className="flex cursor-pointer items-center justify-between text-gray-900 dark:text-white">
          <span className="text-base font-medium">Menu</span>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </summary>
        <nav className="mt-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              className="text-base font-medium text-gray-600 transition-colors hover:text-primary dark:text-gray-300 dark:hover:text-primary"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </details>
    </header>
  );
}
