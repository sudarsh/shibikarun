import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { safeFetch } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { staticProjects } from "@/lib/staticProjects";
import type { SanityDocument } from "@sanity/client";
import type { StaticProject } from "@/lib/staticProjects";

export const metadata: Metadata = { title: "Work" };

async function getProjects(): Promise<SanityDocument[]> {
  return safeFetch(
    `*[_type == "project"] | order(order asc, year desc) {
      _id, title, client, category, year, slug, coverImage
    }`
  );
}

export default async function WorkPage() {
  const sanityProjects = await getProjects();
  const useStatic = sanityProjects.length === 0;
  const projects = useStatic
    ? (staticProjects as unknown as SanityDocument[])
    : sanityProjects;

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <h1 className="font-serif text-5xl md:text-6xl mb-4">Work</h1>
      <p className="text-muted mb-16 max-w-md">
        A selection of graphic design and visual identity projects.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {projects.map((project) => {
          const sp = project as unknown as StaticProject;
          const imageUrl = useStatic
            ? sp.coverImage
            : project.coverImage
              ? urlFor(project.coverImage).width(800).height(600).url()
              : null;
          const slug = useStatic ? sp.slug : project.slug?.current;
          const title = useStatic ? sp.title : project.title;
          const category = useStatic ? sp.category : project.category;
          const year = useStatic ? sp.year : project.year;

          return (
            <Link key={slug} href={`/work/${slug}`} className="group">
              <div className="relative aspect-[4/3] overflow-hidden bg-ink/5 mb-4">
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
              </div>
              <h2 className="font-serif text-xl group-hover:text-accent transition-colors">
                {title}
              </h2>
              <p className="text-xs text-muted mt-1 uppercase tracking-wide">
                {category?.replace(/-/g, " ")} · {year}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
