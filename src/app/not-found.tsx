import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4 space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Resource Not Found</h2>
      <p className="text-sm text-mutedText-secondary max-w-md">
        The resource or page you are looking for does not exist or may have been relocated.
      </p>
      <Link
        href="/"
        className="rounded-btn bg-state-inverse px-4 py-2 text-xs font-semibold text-state-inverseText"
      >
        Return to Home
      </Link>
    </div>
  );
}
