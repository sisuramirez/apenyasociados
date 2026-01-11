import imageUrlBuilder from "@sanity/image-url";
import { client, isSanityConfigured } from "./client";

interface ImageSource {
  asset?: {
    _ref?: string;
    _id?: string;
  };
  _ref?: string;
}

// Placeholder chain for when Sanity is not configured
const placeholderChain = {
  width: () => placeholderChain,
  height: () => placeholderChain,
  quality: () => placeholderChain,
  url: () => "/placeholder.svg",
};

// Create builder with defensive fallback
let builder: ReturnType<typeof imageUrlBuilder> | null = null;

try {
  if (isSanityConfigured) {
    builder = imageUrlBuilder(client);
  }
} catch (error) {
  console.error("Failed to create image URL builder:", error);
  builder = null;
}

export function urlFor(source: ImageSource | null | undefined) {
  if (!builder || !source) {
    return placeholderChain;
  }

  try {
    return builder.image(source);
  } catch (error) {
    console.error("Error building image URL:", error);
    return placeholderChain;
  }
}
