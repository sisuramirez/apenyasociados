"use client";

import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { useLanguage } from "@/context/LanguageContext";
import { urlFor } from "@/sanity/lib/image";
import { portableTextComponents } from "@/components/PortableTextComponents";
import type { Post } from "@/sanity/lib/types";

interface LocalizedPostCardProps {
  post: Post;
}

function formatDate(dateString: string | undefined, language: string): string {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString(
      language === "en" ? "en-US" : "es-GT",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  } catch {
    return "";
  }
}

export function LocalizedPostCard({ post }: LocalizedPostCardProps) {
  const { language } = useLanguage();

  const slug = post?.slug?.current;
  const title = (language === "en" && post.title_en) ? post.title_en : post.title;
  const excerpt = (language === "en" && post.excerpt_en) ? post.excerpt_en : post.excerpt;
  const publishedAt = post?.publishedAt;
  const mainImage = post?.mainImage;

  if (!slug) return null;

  return (
    <Link href={`/blog/${slug}`} className="group">
      <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
        <div className="relative h-48 overflow-hidden bg-gray-100">
          {mainImage?.asset ? (
            <Image
              src={urlFor(mainImage.asset).width(600).height(400).url()}
              alt={(language === "en" && mainImage.alt_en) ? mainImage.alt_en : (mainImage.alt || title)}
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

        <div className="p-6 flex flex-col flex-grow">
          {publishedAt && (
            <time className="text-sm text-[#12ACA4] font-medium">
              {formatDate(publishedAt, language)}
            </time>
          )}
          <h2 className="text-xl font-bold text-[#17383F] mt-2 mb-3 group-hover:text-[#12ACA4] transition-colors line-clamp-2">
            {title}
          </h2>
          {excerpt && (
            <p className="text-gray-600 text-sm line-clamp-3 flex-grow">{excerpt}</p>
          )}
          <span className="inline-flex items-center mt-4 text-[#12ACA4] font-medium text-sm group-hover:underline">
            {language === "en" ? "Read more →" : "Leer más →"}
          </span>
        </div>
      </article>
    </Link>
  );
}

interface LocalizedBlogListProps {
  posts: Post[];
}

export function LocalizedBlogList({ posts }: LocalizedBlogListProps) {
  const { language } = useLanguage();

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[#17383F] mb-2">
          {language === "en" ? "Content in preparation" : "Contenido en preparación"}
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          {language === "en"
            ? "We are preparing valuable content for you. Come back soon to see our articles."
            : "Estamos preparando contenido de valor para ti. Vuelve pronto para ver nuestros artículos."}
        </p>
        <Link
          href="/#contacto"
          className="inline-block mt-6 bg-[#12ACA4] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#0e918a] transition-colors"
        >
          {language === "en" ? "Contact Us" : "Contáctanos"}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) =>
        post?._id ? <LocalizedPostCard key={post._id} post={post} /> : null
      )}
    </div>
  );
}

interface LocalizedBlogHeaderProps {
  className?: string;
}

export function LocalizedBlogHeader({ className }: LocalizedBlogHeaderProps) {
  const { language } = useLanguage();

  return (
    <div className={`text-center mb-12 ${className || ""}`}>
      <span className="inline-block px-4 py-1 bg-[#12ACA4]/10 text-[#12ACA4] text-sm font-semibold rounded-full mb-4">
        {language === "en" ? "Insights & News" : "Insights & Noticias"}
      </span>
      <h1 className="text-4xl lg:text-5xl font-bold text-[#17383F] mb-4">
        Blog
      </h1>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        {language === "en"
          ? "Articles, news, and updates on financial auditing, business consulting, and accounting best practices."
          : "Artículos, noticias y actualizaciones sobre auditoría financiera, consultoría empresarial y mejores prácticas contables."}
      </p>
    </div>
  );
}

interface LocalizedPostContentProps {
  post: Post;
}

export function LocalizedPostContent({ post }: LocalizedPostContentProps) {
  const { language } = useLanguage();

  const title = (language === "en" && post.title_en) ? post.title_en : post.title;
  const body = (language === "en" && post.body_en) ? post.body_en : post.body;
  const publishedAt = post.publishedAt;
  const mainImage = post.mainImage;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center text-[#12ACA4] hover:text-[#0e918a] font-medium mb-8 transition-colors"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {language === "en" ? "Back to Blog" : "Volver al Blog"}
      </Link>

      {/* Post Header */}
      <header className="mb-8">
        <span className="inline-block px-3 py-1 bg-[#12ACA4]/10 text-[#12ACA4] text-sm font-semibold rounded-full mb-4">
          Insights
        </span>
        {publishedAt && (
          <time className="block text-gray-500 font-medium mb-2">
            {formatDate(publishedAt, language)}
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
            alt={(language === "en" && mainImage.alt_en) ? mainImage.alt_en : (mainImage.alt || title)}
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
          <PortableText value={body} components={portableTextComponents} />
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p>
            {language === "en"
              ? "The content of this article will be available soon."
              : "El contenido de este artículo estará disponible pronto."}
          </p>
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
            {language === "en" ? "← See more articles" : "← Ver más artículos"}
          </Link>
          <Link
            href="/#contacto"
            className="bg-[#12ACA4] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#0e918a] transition-colors"
          >
            {language === "en" ? "Contact Us" : "Contáctanos"}
          </Link>
        </div>
      </footer>
    </article>
  );
}
