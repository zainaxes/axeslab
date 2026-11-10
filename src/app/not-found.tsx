import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[65vh] bg-paper text-ink flex flex-col items-center justify-center text-center px-4 py-16 space-y-4">
      <p className="font-mono text-xs text-muted">404</p>
      <h1 className="text-2xl sm:text-4xl font-display font-medium text-ink">
        Resource Not Found
      </h1>
      <p className="text-sm text-muted max-w-md leading-relaxed">
        The resource or page you requested could not be found or has moved.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          href="/"
          className="h-9 px-4 rounded-pill bg-accent text-accent-ink text-xs font-medium inline-flex items-center hover:opacity-90 transition-opacity"
        >
          Return to library
        </Link>
        <Link
          href="/categories"
          className="h-9 px-4 rounded-pill bg-paper-2 border border-rule hover:border-rule-2 text-xs font-medium text-ink inline-flex items-center transition-colors"
        >
          Browse categories
        </Link>
      </div>
    </div>
  );
}
