import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "About" };

const achievements = [
  {
    year: "2015",
    title: "Winner — World Environment Day Logo Design Contest",
    body: "Selected from thousands of global entries by the United Nations Environment Programme.",
  },
  {
    year: "2010",
    title: "Finalist — Indian Rupee Symbol Design",
    body: "Among the shortlisted designers in the Government of India's national competition to create the ₹ symbol.",
  },
];

const services = [
  "Logo design & brand identity",
  "Visual brand systems",
  "Brand guidelines & strategy",
  "Print & packaging design",
  "Photography",
  "Travel writing & content",
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      {/* ── Hero row ── */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-28">
        {/* Text */}
        <div>
          <p className="text-xs tracking-widest uppercase text-muted mb-6">
            About
          </p>
          <h1 className="font-serif text-5xl md:text-6xl mb-2 leading-tight">
            Shibi Karun
          </h1>
          <p className="text-accent text-sm tracking-wide mb-10">
            Graphic Designer · Photographer · Thalassery, Kerala
          </p>

          <div className="space-y-5 text-ink/70 leading-relaxed">
            <p>
              I am a graphic designer with over two decades of practice,
              specialising in logo design and visual brand identity. My work
              lives at the intersection of concept and craft — where an idea
              earns its form and a mark becomes a memory.
            </p>
            <p>
              Every brand has a story waiting to be distilled into a single,
              resonant image. That search — for the essential shape, the right
              weight of type, the colour that carries meaning — is what drives
              me every time I open a blank canvas.
            </p>
            <p>
              Beyond the studio, I am a photographer and travel writer drawn to
              the textures of everyday life on the Malabar coast and beyond.
              Welcome to the world of imagination, ideas and creativity — a
              journey where you can experience the magic of pixels and colour.
            </p>
          </div>

          {/* Services */}
          <div className="mt-10 pt-10 border-t border-ink/10">
            <p className="text-xs tracking-widest uppercase text-muted mb-5">
              What I do
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
              {services.map((s) => (
                <li key={s} className="text-sm text-ink/70 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Portrait */}
        <div className="relative">
          <div className="relative aspect-[3/4] overflow-hidden bg-ink/5">
            <Image
              src="/shibi-karun.jpg"
              alt="Shibi Karun"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          {/* Subtle accent line */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-accent/30 -z-10" />
        </div>
      </div>

      {/* ── Achievements ── */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="h-px bg-ink/10 mb-16" />
        <p className="text-xs tracking-widest uppercase text-muted mb-10">
          Recognition
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((a) => (
            <div
              key={a.year}
              className="border border-ink/8 p-8 hover:border-accent/30 transition-colors"
            >
              <p className="text-xs tracking-widest text-accent mb-3">{a.year}</p>
              <h3 className="font-serif text-xl mb-3 leading-snug">{a.title}</h3>
              <p className="text-sm text-ink/60 leading-relaxed">{a.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
