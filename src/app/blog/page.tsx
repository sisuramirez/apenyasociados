import { client, postsQuery, isSanityConfigured } from "@/sanity/lib/client";
import type { Post } from "@/sanity/lib/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LocalizedBlogList, LocalizedBlogHeader } from "@/components/LocalizedBlogContent";

// Enable ISR with 60 second revalidation for fresh content
export const revalidate = 60;

async function getPosts(): Promise<Post[]> {
  if (!isSanityConfigured) {
    return [];
  }

  try {
    const posts = await client.fetch<Post[]>(postsQuery, {}, {
      next: { revalidate: 60 }
    });
    return posts || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <LocalizedBlogHeader />
          <LocalizedBlogList posts={posts} />
        </div>
      </main>
      <Footer />
    </>
  );
}
