import type { Metadata } from "next";
import Image from "next/image";
import { safeFetch } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import type { SanityDocument } from "@sanity/client";

export const metadata: Metadata = { title: "Photography" };

async function getPhotos(): Promise<SanityDocument[]> {
  return safeFetch(
    `*[_type == "photography"] | order(date desc) {
      _id, title, series, location, date, image
    }`
  );
}

export default async function PhotographyPage() {
  const photos = await getPhotos();

  // Group by series
  const grouped = photos.reduce<Record<string, SanityDocument[]>>((acc, p) => {
    const key = p.series ?? "Uncategorised";
    if (!acc[key]) acc[key] = [];
    acc[key].push(p);
    return acc;
  }, {});

  return (
    <div className="pt-32 pb-24">
      <div className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
        <h1 className="font-serif text-5xl md:text-6xl mb-4">Photography</h1>
        <p className="text-muted max-w-md">
          Frames from Kerala and beyond — documenting light, life and landscape.
        </p>
      </div>

      {photos.length === 0 ? (
        <p className="text-center text-muted text-sm py-20">No photos yet.</p>
      ) : (
        Object.entries(grouped).map(([series, seriesPhotos]) => (
          <section key={series} className="px-6 md:px-12 max-w-7xl mx-auto mb-20">
            <h2 className="font-serif text-2xl mb-8 flex items-center gap-4">
              {series}
              <span className="h-px flex-1 bg-ink/10" />
            </h2>

            {/* Masonry-like grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {seriesPhotos.map((photo) => {
                const imageUrl = photo.image
                  ? urlFor(photo.image).width(800).url()
                  : null;
                return (
                  <div key={photo._id} className="break-inside-avoid group">
                    {imageUrl ? (
                      <div className="relative overflow-hidden bg-ink/5">
                        <Image
                          src={imageUrl}
                          alt={photo.title}
                          width={800}
                          height={600}
                          className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[4/3] bg-ink/5" />
                    )}
                    <div className="mt-2 flex justify-between">
                      <p className="text-sm text-ink/70">{photo.title}</p>
                      {photo.location && (
                        <p className="text-xs text-muted">{photo.location}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
