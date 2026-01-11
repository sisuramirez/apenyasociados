import { client, recentPostsQuery, isSanityConfigured } from "@/sanity/lib/client";
import type { Post } from "@/sanity/lib/types";
import { LocalizedLatestNewsContent } from "./LocalizedLatestNewsContent";

async function getRecentPosts(): Promise<Post[]> {
  if (!isSanityConfigured) {
    return [];
  }

  try {
    const posts = await client.fetch<Post[]>(recentPostsQuery, {}, {
      next: { revalidate: 60 }
    });
    return posts || [];
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    return [];
  }
}

export default async function LatestNews() {
  const posts = await getRecentPosts();

  // Don't render the section if there are no posts
  if (!posts || posts.length === 0) {
    return null;
  }

  return <LocalizedLatestNewsContent posts={posts} />;
}
