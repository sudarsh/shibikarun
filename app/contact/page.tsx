import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-3xl mx-auto">
      <p className="text-xs tracking-widest uppercase text-muted mb-6">
        Get in touch
      </p>
      <h1 className="font-serif text-5xl md:text-6xl mb-6 leading-tight">
        Let&apos;s work together
      </h1>
      <p className="text-ink/60 mb-16 max-w-md leading-relaxed">
        Available for design commissions, photography projects and travel writing
        collaborations. Currently based in Thalassery, Kerala.
      </p>

      {/* Contact links */}
      <div className="space-y-6 mb-20">
        <a
          href="mailto:hello@shibikarun.com"
          className="group flex items-center justify-between py-5 border-b border-ink/10 hover:border-accent/40 transition-colors"
        >
          <div>
            <p className="text-xs tracking-widest uppercase text-muted mb-1">
              Email
            </p>
            <p className="font-serif text-2xl group-hover:text-accent transition-colors">
              hello@shibikarun.com
            </p>
          </div>
          <span className="text-muted group-hover:text-accent transition-colors text-xl">
            &rarr;
          </span>
        </a>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between py-5 border-b border-ink/10 hover:border-accent/40 transition-colors"
        >
          <div>
            <p className="text-xs tracking-widest uppercase text-muted mb-1">
              Instagram
            </p>
            <p className="font-serif text-2xl group-hover:text-accent transition-colors">
              @shibikarun
            </p>
          </div>
          <span className="text-muted group-hover:text-accent transition-colors text-xl">
            &rarr;
          </span>
        </a>
      </div>

      {/* Simple contact form */}
      <form
        action="https://formspree.io/f/your_form_id"
        method="POST"
        className="space-y-6"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-xs tracking-widest uppercase text-muted mb-2"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full bg-transparent border-b border-ink/20 focus:border-ink pb-2 outline-none text-ink placeholder:text-muted transition-colors"
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-xs tracking-widest uppercase text-muted mb-2"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full bg-transparent border-b border-ink/20 focus:border-ink pb-2 outline-none text-ink placeholder:text-muted transition-colors"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-xs tracking-widest uppercase text-muted mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full bg-transparent border-b border-ink/20 focus:border-ink pb-2 outline-none text-ink placeholder:text-muted transition-colors resize-none"
            placeholder="Tell me about your project…"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-ink text-canvas text-sm px-6 py-3 hover:bg-accent transition-colors duration-300 mt-4"
        >
          Send message &rarr;
        </button>
      </form>
    </div>
  );
}
