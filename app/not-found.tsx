import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-40 pb-24 px-6 text-center">
      <p className="text-xs tracking-widest uppercase text-muted mb-4">404</p>
      <h1 className="font-serif text-5xl mb-6">Page not found</h1>
      <Link
        href="/"
        className="text-sm text-muted hover:text-ink transition-colors border-b border-ink/20"
      >
        Back home
      </Link>
    </div>
  );
}
