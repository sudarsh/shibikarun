import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { safeFetch } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import type { SanityDocument } from "@sanity/client";

export const metadata: Metadata = { title: "Stories" };

async function getStories(): Promise<SanityDocument[]> {
  return safeFetch(
    `*[_type == "story"] | order(date desc) {
      _id, title, location, excerpt, coverImage, readTime, date, slug
    }`
  );
}

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto">
      <h1 className="font-serif text-5xl md:text-6xl mb-4">Stories</h1>
      <p className="text-muted mb-16 max-w-md">
        Travel writing from Kerala and across the world.
      </p>

      {stories.length === 0 ? (
        <p className="text-center text-muted text-sm py-20">No stories yet.</p>
      ) : (
        <div className="divide-y divide-ink/8">
          {stories.map((story) => {
            const imageUrl = story.coverImage
              ? urlFor(story.coverImage).width(400).height(300).url()
              : null;
            const formattedDate = story.date
              ? new Date(story.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : null;

            return (
              <Link
                key={story._id}
                href={`/stories/${story.slug?.current}`}
                className="group flex items-start gap-8 py-10"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
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
                  <h2 className="font-serif text-2xl md:text-3xl mb-3 group-hover:text-accent transition-colors">
                    {story.title}
                  </h2>
                  <p className="text-ink/60 text-sm leading-relaxed line-clamp-2">
                    {story.excerpt}
                  </p>
                </div>
                {imageUrl && (
                  <div className="flex-shrink-0 w-28 md:w-40 relative aspect-[4/3] overflow-hidden bg-ink/5">
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
            );
          })}
        </div>
      )}
    </div>
  );
}
