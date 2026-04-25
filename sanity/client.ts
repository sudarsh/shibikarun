import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export const client = createClient({
  projectId: projectId ?? "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_READ_TOKEN,
});

/** Wrap fetch calls so missing env vars return empty arrays instead of crashing */
export async function safeFetch<T>(query: string, params?: Record<string, unknown>): Promise<T[]> {
  if (!projectId) return [];
  try {
    return await client.fetch<T[]>(query, params ?? {});
  } catch {
    return [];
  }
}
