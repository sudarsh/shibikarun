import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { PhotographyStrip } from "@/components/home/PhotographyStrip";
import { LatestStories } from "@/components/home/LatestStories";
import { safeFetch } from "@/sanity/client";
import type { SanityDocument } from "@sanity/client";

async function getFeaturedProjects(): Promise<SanityDocument[]> {
  return safeFetch(
    `*[_type == "project" && featured == true] | order(order asc)[0...4] {
      _id, title, client, category, year, slug, coverImage
    }`
  );
}

async function getFeaturedPhotos(): Promise<SanityDocument[]> {
  return safeFetch(
    `*[_type == "photography" && featured == true] | order(date desc)[0...6] {
      _id, title, series, location, image
    }`
  );
}

async function getLatestStories(): Promise<SanityDocument[]> {
  return safeFetch(
    `*[_type == "story"] | order(date desc)[0...3] {
      _id, title, location, excerpt, coverImage, readTime, date, slug
    }`
  );
}

export default async function HomePage() {
  const [projects, photos, stories] = await Promise.all([
    getFeaturedProjects(),
    getFeaturedPhotos(),
    getLatestStories(),
  ]);

  return (
    <>
      <HeroSection />
      <FeaturedWork projects={projects} useStatic={false} />
      <PhotographyStrip photos={photos} />
      <LatestStories stories={stories} />
    </>
  );
}
