import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { staticProjects } from "@/lib/staticProjects";
import type { SanityDocument } from "@sanity/client";

interface Props {
  params: { slug: string };
}

async function getSanityProject(slug: string): Promise<SanityDocument | null> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null;
  try {
    return await client.fetch(
      `*[_type == "project" && slug.current == $slug][0] {
        _id, title, client, category, year, coverImage, gallery[], concept
      }`,
      { slug }
    );
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const sanity = await getSanityProject(params.slug);
  if (sanity) return { title: sanity.title };
  const local = staticProjects.find((p) => p.slug === params.slug);
  if (local) return { title: local.title };
  return { title: "Not Found" };
}

export default async function ProjectPage({ params }: Props) {
  const sanity = await getSanityProject(params.slug);

  if (sanity) {
    // Render from Sanity
    const coverUrl = sanity.coverImage
      ? urlFor(sanity.coverImage).width(1600).height(1000).url()
      : null;

    return <ProjectLayout
      title={sanity.title}
      client={sanity.client}
      category={sanity.category}
      year={sanity.year}
      concept={sanity.concept}
      coverUrl={coverUrl}
      gallery={(sanity.gallery ?? []).map((img: SanityDocument) => ({
        url: urlFor(img).width(1200).height(800).url(),
        alt: img.alt ?? sanity.title,
        span: false,
      }))}
    />;
  }

  // Fall back to static
  const project = staticProjects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return <ProjectLayout
    title={project.title}
    client={project.client}
    category={project.category}
    year={project.year}
    concept={project.concept}
    coverUrl={project.coverImage}
    gallery={project.gallery.map((url, i) => ({ url, alt: project.title, span: i === 0 }))}
  />;
}

interface LayoutProps {
  title: string;
  client?: string;
  category?: string;
  year?: number;
  concept?: string;
  coverUrl: string | null;
  gallery: { url: string; alt: string; span: boolean }[];
}

function ProjectLayout({ title, client, category, year, concept, coverUrl, gallery }: LayoutProps) {
  return (
    <article className="pt-32 pb-24">
      <div className="px-6 md:px-12 max-w-7xl mx-auto mb-12">
        <p className="text-xs tracking-widest uppercase text-muted mb-4">
          {category?.replace(/-/g, " ")} · {year}
        </p>
        <h1 className="font-serif text-5xl md:text-7xl mb-3">{title}</h1>
        {client && <p className="text-muted">For {client}</p>}
      </div>

      {coverUrl && (
        <div className="relative w-full aspect-[16/9] mb-16">
          <Image
            src={coverUrl}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}

      {concept && (
        <div className="px-6 md:px-12 max-w-3xl mx-auto mb-20">
          <h2 className="font-serif text-sm uppercase tracking-widest text-muted mb-4">
            Concept
          </h2>
          <p className="text-lg leading-relaxed text-ink/80">{concept}</p>
        </div>
      )}

      {gallery.length > 0 && (
        <div className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {gallery.map(({ url, alt, span }, i) => (
            <div
              key={i}
              className={`relative overflow-hidden bg-ink/5 ${span ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/3]"}`}
            >
              <Image
                src={url}
                alt={alt}
                fill
                className="object-cover"
                sizes={span ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
              />
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
