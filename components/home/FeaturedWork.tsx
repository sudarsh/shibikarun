"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/image";
import type { SanityDocument } from "@sanity/client";
import type { StaticProject } from "@/lib/staticProjects";

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

interface Props {
  projects: SanityDocument[];
  useStatic?: boolean;
}

export function FeaturedWork({ projects, useStatic = false }: Props) {
  return (
    <section className="px-6 md:px-12 max-w-7xl mx-auto py-20">
      <div className="flex items-end justify-between mb-12">
        <h2 className="font-serif text-3xl md:text-4xl">Selected Work</h2>
        <Link
          href="/work"
          className="text-sm text-muted hover:text-ink transition-colors border-b border-transparent hover:border-ink/30 pb-0.5"
        >
          All projects &rarr;
        </Link>
      </div>

      {projects.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={useStatic ? (project as unknown as StaticProject).id : project._id}
              project={project}
              index={i}
              useStatic={useStatic}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function ProjectCard({
  project,
  index,
  useStatic,
}: {
  project: SanityDocument;
  index: number;
  useStatic: boolean;
}) {
  const isLarge = index === 0;
  const sp = project as unknown as StaticProject;

  const imageUrl = useStatic
    ? sp.coverImage
    : project.coverImage
      ? urlFor(project.coverImage).width(1200).height(isLarge ? 800 : 600).url()
      : null;

  const href = `/work/${useStatic ? sp.slug : project.slug?.current}`;
  const title = useStatic ? sp.title : project.title;
  const client = useStatic ? sp.client : project.client;
  const category = useStatic ? sp.category : project.category;
  const year = useStatic ? sp.year : project.year;

  return (
    <motion.article
      variants={FADE_UP}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={isLarge ? "md:col-span-2" : ""}
    >
      <Link href={href} className="group block">
        <div
          className={`relative overflow-hidden bg-ink/5 ${isLarge ? "aspect-[16/9]" : "aspect-[4/3]"}`}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes={
                isLarge
                  ? "(max-width: 768px) 100vw, 100vw"
                  : "(max-width: 768px) 100vw, 50vw"
              }
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-ink/20 text-sm">
              No image
            </div>
          )}
          <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-500" />
        </div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl md:text-2xl group-hover:text-accent transition-colors">
              {title}
            </h3>
            {client && (
              <p className="text-sm text-muted mt-1">{client}</p>
            )}
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xs tracking-widest uppercase text-muted">
              {category?.replace(/-/g, " ")}
            </p>
            <p className="text-xs text-muted mt-0.5">{year}</p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function EmptyState() {
  return (
    <div className="py-24 text-center text-muted text-sm">
      No featured projects yet. Add some in Sanity Studio.
    </div>
  );
}
