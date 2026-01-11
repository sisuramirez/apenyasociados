import type { PortableTextBlock } from "@portabletext/types";

export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
  excerpt?: string;
  publishedAt?: string;
  body?: PortableTextBlock[];
}
