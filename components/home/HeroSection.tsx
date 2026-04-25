"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function HeroSection() {
  return (
    <section className="pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="max-w-4xl">
        {/* Eyebrow */}
        <motion.p
          custom={0}
          variants={FADE_UP}
          initial="hidden"
          animate="show"
          className="text-xs tracking-widest uppercase text-muted mb-8"
        >
          Thalassery, Kerala
        </motion.p>

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={FADE_UP}
          initial="hidden"
          animate="show"
          className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight text-balance mb-10"
        >
          Graphic designer,{" "}
          <em className="not-italic text-accent">photographer</em>
          {" & "}
          travel writer.
        </motion.h1>

        {/* Body */}
        <motion.p
          custom={2}
          variants={FADE_UP}
          initial="hidden"
          animate="show"
          className="text-base md:text-lg text-ink/60 max-w-xl leading-relaxed mb-12"
        >
          I make images, identities and stories — for brands that want to be
          remembered and places that deserve to be seen.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          variants={FADE_UP}
          initial="hidden"
          animate="show"
          className="flex items-center gap-6 flex-wrap"
        >
          <Link
            href="/work"
            className="inline-flex items-center gap-2 bg-ink text-canvas text-sm px-6 py-3 hover:bg-accent transition-colors duration-300"
          >
            View Work
            <span aria-hidden className="text-lg leading-none">
              &rarr;
            </span>
          </Link>
          <Link
            href="/about"
            className="text-sm text-ink/60 hover:text-ink transition-colors border-b border-ink/20 hover:border-ink pb-0.5"
          >
            About me
          </Link>
        </motion.div>
      </div>

      {/* Decorative rule */}
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-20 h-px bg-ink/10"
      />
    </section>
  );
}
