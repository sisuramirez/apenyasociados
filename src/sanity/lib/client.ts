import { createClient } from "next-sanity";

// Check if Sanity is properly configured
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Sanity is configured only if we have a valid project ID
export const isSanityConfigured = Boolean(projectId && projectId.length > 0 && projectId !== "placeholder");

// Create client with defensive fallback
let client: ReturnType<typeof createClient>;

try {
  client = createClient({
    projectId: projectId || "placeholder",
    dataset: dataset,
    apiVersion: "2024-01-01",
    useCdn: true,
  });
} catch (error) {
  console.error("Failed to create Sanity client:", error);
  // Create a minimal client that won't be used
  client = createClient({
    projectId: "placeholder",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: true,
  });
}

export { client };

// Safe fetch wrapper that returns empty data if Sanity is not configured
export async function safeFetch<T>(query: string, params?: Record<string, string>): Promise<T | null> {
  if (!isSanityConfigured) {
    return null;
  }

  try {
    const result = params
      ? await client.fetch<T>(query, params)
      : await client.fetch<T>(query);
    return result;
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return null;
  }
}

// GROQ Queries
export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  publishedAt
}`;

export const postQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage,
  body,
  publishedAt
}`;

export const postSlugsQuery = `*[_type == "post" && defined(slug.current)][].slug.current`;
