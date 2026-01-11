import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { safeFetch, postQuery, postSlugsQuery, isSanityConfigured } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { portableTextComponents } from "@/components/PortableTextComponents";
import type { Post } from "@/sanity/lib/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Required for static export with dynamic routes
export const dynamicParams = false;

// Generate static params for static export
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  // Always return at least a placeholder for static export to work
  const placeholderParams = [{ slug: "coming-soon" }];

  if (!isSanityConfigured) {
    return placeholderParams;
  }

  try {
    const slugs = await safeFetch<string[]>(postSlugsQuery);
    if (!slugs || slugs.length === 0) {
      return placeholderParams;
    }
    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error("Error fetching slugs:", error);
    return placeholderParams;
  }
}

async function getPost(slug: string): Promise<Post | null> {
  if (!isSanityConfigured) {
    return null;
  }

  try {
    const post = await safeFetch<Post>(postQuery, { slug });
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

// Not found component
function NotFoundContent() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-[#17383F] mb-4">
              Contenido en preparación
            </h1>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              Este artículo aún no está disponible. Vuelve pronto para ver
              nuestro contenido.
            </p>
            <Link
              href="/blog"
              className="inline-block bg-[#12ACA4] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#0e918a] transition-colors"
            >
              Volver al Blog
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: Props) {
  let post: Post | null = null;

  try {
    const { slug } = await params;
    post = await getPost(slug);
  } catch (error) {
    console.error("Error in BlogPostPage:", error);
    post = null;
  }

  // Show friendly message instead of crashing
  if (!post) {
    return <NotFoundContent />;
  }

  const title = post?.title || "Sin título";
  const publishedAt = post?.publishedAt;
  const mainImage = post?.mainImage;
  const body = post?.body;

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
            {publishedAt && (
              <time className="text-[#12ACA4] font-medium">
                {formatDate(publishedAt)}
              </time>
            )}
            <h1 className="text-3xl lg:text-4xl font-bold text-[#17383F] mt-2 mb-6">
              {title}
            </h1>
          </header>

          {/* Main Image */}
          {mainImage?.asset && (
            <div className="relative w-full h-64 md:h-96 mb-10 rounded-2xl overflow-hidden">
              <Image
                src={urlFor(mainImage.asset).width(1200).height(600).url()}
                alt={mainImage?.alt || title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Post Body - Portable Text */}
          {body && body.length > 0 ? (
            <div className="prose prose-lg max-w-none">
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
