"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/image";
import type { SanityDocument } from "@sanity/client";

interface Props {
  photos: SanityDocument[];
}

export function PhotographyStrip({ photos }: Props) {
  return (
    <section className="py-20 bg-ink overflow-hidden">
      {/* Header */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto flex items-end justify-between mb-10">
        <h2 className="font-serif text-3xl md:text-4xl text-canvas">
          Through the lens
        </h2>
        <Link
          href="/photography"
          className="text-sm text-canvas/50 hover:text-canvas transition-colors border-b border-transparent hover:border-canvas/30 pb-0.5"
        >
          All photos &rarr;
        </Link>
      </div>

      {/* Horizontal scroll strip */}
      <div className="flex gap-3 px-6 md:px-12 overflow-x-auto scrollbar-none snap-x snap-mandatory">
        {photos.length === 0 ? (
          <p className="text-canvas/30 text-sm py-16 px-4">
            No featured photos yet.
          </p>
        ) : (
          photos.map((photo, i) => <PhotoThumb key={photo._id} photo={photo} index={i} />)
        )}
      </div>
    </section>
  );
}

function PhotoThumb({
  photo,
  index,
}: {
  photo: SanityDocument;
  index: number;
}) {
  const imageUrl = photo.image
    ? urlFor(photo.image).width(600).height(800).url()
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="flex-shrink-0 w-52 md:w-64 snap-start group"
    >
      <Link href="/photography" className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-ink/50">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={photo.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              sizes="256px"
            />
          ) : (
            <div className="absolute inset-0 bg-white/5" />
          )}
        </div>
        <div className="mt-3">
          <p className="text-canvas/70 text-xs tracking-wide">{photo.title}</p>
          {photo.location && (
            <p className="text-canvas/30 text-xs mt-0.5">{photo.location}</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
