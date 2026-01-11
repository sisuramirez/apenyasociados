import Link from "next/link";
import Image from "next/image";
import { client, postsQuery, isSanityConfigured } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { Post } from "@/sanity/lib/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

// Empty state component
function EmptyState() {
  return (
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
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-[#17383F] mb-2">
        Contenido en preparación
      </h2>
      <p className="text-gray-600 max-w-md mx-auto">
        Estamos preparando contenido de valor para ti. Vuelve pronto para ver
        nuestros artículos.
      </p>
      <Link
        href="/#contacto"
        className="inline-block mt-6 bg-[#12ACA4] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#0e918a] transition-colors"
      >
        Contáctanos
      </Link>
    </div>
  );
}

// Post card component
function PostCard({ post }: { post: Post }) {
  const slug = post?.slug?.current;
  const title = post?.title || "Sin título";
  const excerpt = post?.excerpt;
  const publishedAt = post?.publishedAt;
  const mainImage = post?.mainImage;

  if (!slug) return null;

  return (
    <Link href={`/blog/${slug}`} className="group">
      <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
        {/* Post Image */}
        <div className="relative h-48 overflow-hidden bg-gray-100">
          {mainImage?.asset ? (
            <Image
              src={urlFor(mainImage.asset).width(600).height(400).url()}
              alt={mainImage?.alt || title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#17383F] to-[#12ACA4]">
              <svg className="w-12 h-12 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          )}
        </div>

        {/* Post Content */}
        <div className="p-6 flex flex-col flex-grow">
          {publishedAt && (
            <time className="text-sm text-[#12ACA4] font-medium">
              {formatDate(publishedAt)}
            </time>
          )}
          <h2 className="text-xl font-bold text-[#17383F] mt-2 mb-3 group-hover:text-[#12ACA4] transition-colors line-clamp-2">
            {title}
          </h2>
          {excerpt && (
            <p className="text-gray-600 text-sm line-clamp-3 flex-grow">{excerpt}</p>
          )}
          <span className="inline-flex items-center mt-4 text-[#12ACA4] font-medium text-sm group-hover:underline">
            Leer más →
          </span>
        </div>
      </article>
    </Link>
  );
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-[#12ACA4]/10 text-[#12ACA4] text-sm font-semibold rounded-full mb-4">
              Insights & Noticias
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#17383F] mb-4">
              Blog
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Artículos, noticias y actualizaciones sobre auditoría financiera,
              consultoría empresarial y mejores prácticas contables.
            </p>
          </div>

          {/* Posts Grid or Empty State */}
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) =>
                post?._id ? <PostCard key={post._id} post={post} /> : null
              )}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
