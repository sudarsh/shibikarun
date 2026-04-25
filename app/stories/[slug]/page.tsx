import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import type { SanityDocument } from "@sanity/client";

interface Props {
  params: { slug: string };
}

async function getStory(slug: string): Promise<SanityDocument | null> {
  return client.fetch(
    `*[_type == "story" && slug.current == $slug][0] {
      _id, title, location, excerpt, coverImage, body, readTime, date
    }`,
    { slug }
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const story = await getStory(params.slug);
  if (!story) return { title: "Not Found" };
  return {
    title: story.title,
    description: story.excerpt,
  };
}

const portableComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-serif text-3xl mt-12 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-serif text-2xl mt-10 mb-3">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-2 border-accent pl-6 my-8 text-ink/70 italic font-serif text-xl">
        {children}
      </blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-5 leading-relaxed text-ink/80">{children}</p>
    ),
  },
  types: {
    image: ({ value }: { value: SanityDocument }) => {
      const imageUrl = urlFor(value).width(1200).url();
      return (
        <figure className="my-10 -mx-6 md:-mx-12">
          <div className="relative w-full aspect-[16/9]">
            <Image
              src={imageUrl}
              alt={value.alt ?? ""}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-xs text-muted mt-3 px-6">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default async function StoryPage({ params }: Props) {
  const story = await getStory(params.slug);
  if (!story) notFound();

  const coverUrl = story.coverImage
    ? urlFor(story.coverImage).width(1600).height(900).url()
    : null;

  const formattedDate = story.date
    ? new Date(story.date).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <article className="pt-32 pb-24">
      {/* Header */}
      <header className="px-6 md:px-12 max-w-3xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-6 flex-wrap">
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
        <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6">
          {story.title}
        </h1>
        {story.excerpt && (
          <p className="text-lg text-ink/60 leading-relaxed">{story.excerpt}</p>
        )}
      </header>

      {/* Cover image */}
      {coverUrl && (
        <div className="relative w-full aspect-[16/9] mb-16">
          <Image
            src={coverUrl}
            alt={story.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}

      {/* Body */}
      {story.body && (
        <div className="px-6 md:px-12 max-w-3xl mx-auto text-base">
          <PortableText value={story.body} components={portableComponents} />
        </div>
      )}
    </article>
  );
}
