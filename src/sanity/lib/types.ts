import type { PortableTextBlock } from "@portabletext/types";

// Base image type
export interface SanityImage {
  asset: {
    _ref: string;
  };
  alt?: string;
  alt_en?: string;
}

// Internationalized Post type
export interface Post {
  _id: string;
  // Spanish (primary)
  title: string;
  excerpt?: string;
  body?: PortableTextBlock[];
  // English translations
  title_en?: string;
  excerpt_en?: string;
  body_en?: PortableTextBlock[];
  // Common fields
  slug: {
    current: string;
  };
  mainImage?: SanityImage;
  publishedAt?: string;
}

// Internationalized Service type
export interface Service {
  _id: string;
  // Spanish (primary)
  title: string;
  description?: string;
  content?: PortableTextBlock[];
  // English translations
  title_en?: string;
  description_en?: string;
  content_en?: PortableTextBlock[];
  // Common fields
  slug: {
    current: string;
  };
  icon?: SanityImage;
  order?: number;
}

// Helper type for getting localized content
export type Language = "es" | "en";

// Helper function to get localized field
export function getLocalizedField<T extends Post | Service>(
  item: T,
  field: "title" | "excerpt" | "description" | "body" | "content",
  language: Language
): string | PortableTextBlock[] | undefined {
  if (language === "en") {
    const enField = `${field}_en` as keyof T;
    const enValue = item[enField];
    // Return English if available, fallback to Spanish
    if (enValue !== undefined && enValue !== null) {
      return enValue as string | PortableTextBlock[];
    }
  }
  // Return Spanish (default)
  return item[field as keyof T] as string | PortableTextBlock[] | undefined;
}

// Helper to get localized post
export function getLocalizedPost(post: Post, language: Language) {
  return {
    ...post,
    title: (language === "en" && post.title_en) ? post.title_en : post.title,
    excerpt: (language === "en" && post.excerpt_en) ? post.excerpt_en : post.excerpt,
    body: (language === "en" && post.body_en) ? post.body_en : post.body,
  };
}

// Helper to get localized service
export function getLocalizedService(service: Service, language: Language) {
  return {
    ...service,
    title: (language === "en" && service.title_en) ? service.title_en : service.title,
    description: (language === "en" && service.description_en) ? service.description_en : service.description,
    content: (language === "en" && service.content_en) ? service.content_en : service.content,
  };
}
