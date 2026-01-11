import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { client, postQuery, postSlugsQuery, isSanityConfigured } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { portableTextComponents } from "@/components/PortableTextComponents";
import type { Post } from "@/sanity/lib/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

function formatDate(dateString?: string): string {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString("es-GT", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
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

  const title = post.title || "Sin título";
  const publishedAt = post.publishedAt;
  const mainImage = post.mainImage;
  const body = post.body;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center text-[#12ACA4] hover:text-[#0e918a] font-medium mb-8 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Volver al Blog
          </Link>

          {/* Post Header */}
          <header className="mb-8">
            <span className="inline-block px-3 py-1 bg-[#12ACA4]/10 text-[#12ACA4] text-sm font-semibold rounded-full mb-4">
              Insights
            </span>
            {publishedAt && (
              <time className="block text-gray-500 font-medium mb-2">
                {formatDate(publishedAt)}
              </time>
            )}
            <h1 className="text-3xl lg:text-4xl font-bold text-[#17383F] leading-tight">
              {title}
            </h1>
          </header>

          {/* Main Image */}
          {mainImage?.asset ? (
            <div className="relative w-full h-64 md:h-96 mb-10 rounded-2xl overflow-hidden">
              <Image
                src={urlFor(mainImage.asset).width(1200).height(600).url()}
                alt={mainImage?.alt || title}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="w-full h-64 md:h-96 mb-10 rounded-2xl overflow-hidden bg-gradient-to-br from-[#17383F] to-[#12ACA4] flex items-center justify-center">
              <svg className="w-24 h-24 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          )}

          {/* Post Body - Portable Text */}
          {body && body.length > 0 ? (
            <div className="prose prose-lg max-w-none prose-headings:text-[#17383F] prose-a:text-[#12ACA4] prose-strong:text-[#17383F]">
              <PortableText
                value={body}
                components={portableTextComponents}
              />
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>El contenido de este artículo estará disponible pronto.</p>
            </div>
          )}

          {/* Clear floats from aligned images */}
          <div className="clear-both" />

          {/* Post Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/blog"
                className="text-[#12ACA4] hover:text-[#0e918a] font-medium transition-colors"
              >
                ← Ver más artículos
              </Link>
              <Link
                href="/#contacto"
                className="bg-[#12ACA4] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#0e918a] transition-colors"
              >
                Contáctanos
              </Link>
            </div>
          </footer>
        </article>
      </main>
      <Footer />
    </>
  );
}
