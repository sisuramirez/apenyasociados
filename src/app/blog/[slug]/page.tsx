import { notFound } from "next/navigation";
import { client, postQuery, postSlugsQuery, isSanityConfigured } from "@/sanity/lib/client";
import type { Post } from "@/sanity/lib/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LocalizedPostContent } from "@/components/LocalizedBlogContent";

// Enable ISR with 60 second revalidation
export const revalidate = 60;

// Allow dynamic params for new posts
export const dynamicParams = true;

// Generate static params for known posts at build time
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  if (!isSanityConfigured) {
    return [];
  }

  try {
    const slugs = await client.fetch<string[]>(postSlugsQuery);
    if (!slugs || slugs.length === 0) {
      return [];
    }
    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error("Error fetching slugs:", error);
    return [];
  }
}

async function getPost(slug: string): Promise<Post | null> {
  if (!isSanityConfigured) {
    return null;
  }

  try {
    const post = await client.fetch<Post>(postQuery, { slug }, {
      next: { revalidate: 60 }
    });
    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24">
        <LocalizedPostContent post={post} />
      </main>
      <Footer />
    </>
  );
}
