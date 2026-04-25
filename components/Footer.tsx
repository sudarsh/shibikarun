import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-ink/5 mt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} Shibi Karun. Thalassery, Kerala.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="mailto:hello@shibikarun.com"
            className="text-sm text-muted hover:text-ink transition-colors"
          >
            hello@shibikarun.com
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-ink transition-colors"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
