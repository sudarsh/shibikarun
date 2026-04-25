"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/image";
import type { SanityDocument } from "@sanity/client";

interface Props {
  stories: SanityDocument[];
}

export function LatestStories({ stories }: Props) {
  return (
    <section className="px-6 md:px-12 max-w-7xl mx-auto py-24">
      <div className="flex items-end justify-between mb-12">
        <h2 className="font-serif text-3xl md:text-4xl">From the road</h2>
        <Link
          href="/stories"
          className="text-sm text-muted hover:text-ink transition-colors border-b border-transparent hover:border-ink/30 pb-0.5"
        >
          All stories &rarr;
        </Link>
      </div>

      {stories.length === 0 ? (
        <p className="text-muted text-sm py-16 text-center">
          No stories yet. Add some in Sanity Studio.
        </p>
      ) : (
        <div className="divide-y divide-ink/8">
          {stories.map((story, i) => (
            <StoryRow key={story._id} story={story} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}

function StoryRow({ story, index }: { story: SanityDocument; index: number }) {
  const imageUrl = story.coverImage
    ? urlFor(story.coverImage).width(400).height(300).url()
    : null;

  const formattedDate = story.date
    ? new Date(story.date).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
      })
    : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/stories/${story.slug?.current}`}
        className="group flex items-start gap-8 py-8"
      >
        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs tracking-widest uppercase text-muted">
              {story.location}
            </span>
            {formattedDate && (
              <>
                <span className="text-ink/20">·</span>
                <span className="text-xs text-muted">{formattedDate}</span>
              </>
            )}
            {story.readTime && (
              <>
                <span className="text-ink/20">·</span>
                <span className="text-xs text-muted">
                  {story.readTime} min read
                </span>
              </>
            )}
          </div>
          <h3 className="font-serif text-2xl md:text-3xl leading-snug group-hover:text-accent transition-colors mb-3">
            {story.title}
          </h3>
          <p className="text-ink/60 text-sm leading-relaxed line-clamp-2 max-w-xl">
            {story.excerpt}
          </p>
        </div>

        {/* Thumbnail */}
        {imageUrl && (
          <div className="flex-shrink-0 w-28 md:w-40 aspect-[4/3] relative overflow-hidden bg-ink/5">
            <Image
              src={imageUrl}
              alt={story.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="160px"
            />
          </div>
        )}
      </Link>
    </motion.article>
  );
}
