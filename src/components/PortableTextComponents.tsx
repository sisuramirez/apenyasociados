"use client";

import Image from "next/image";
import type { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

// Custom Image Component with Alignment Support
interface ImageValue {
  asset?: {
    _ref: string;
  };
  alt?: string;
  alignment?: "left" | "center" | "right" | "full";
  caption?: string;
}

function PortableImage({ value }: { value: ImageValue }) {
  if (!value?.asset) {
    return null;
  }

  const alignment = value.alignment || "center";

  // Tailwind classes based on alignment
  const alignmentClasses: Record<string, string> = {
    left: "float-left mr-6 mb-4 max-w-[50%]",
    right: "float-right ml-6 mb-4 max-w-[50%]",
    center: "mx-auto block my-8",
    full: "w-full my-8",
  };

  const imageUrl = urlFor(value.asset).width(800).quality(80).url();

  return (
    <figure className={`${alignmentClasses[alignment]} clear-none`}>
      <Image
        src={imageUrl}
        alt={value.alt || "Blog image"}
        width={800}
        height={600}
        className={`rounded-lg shadow-md ${
          alignment === "full" ? "w-full h-auto" : "w-full h-auto"
        }`}
        style={{
          maxWidth: alignment === "full" ? "100%" : undefined,
        }}
      />
      {value.caption && (
        <figcaption className="text-sm text-gray-500 mt-2 text-center italic">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}

// Export the complete portable text components configuration
export const portableTextComponents: PortableTextComponents = {
  types: {
    image: PortableImage,
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href || "#";
      const blank = value?.blank;
      return (
        <a
          href={href}
          target={blank ? "_blank" : undefined}
          rel={blank ? "noopener noreferrer" : undefined}
          className="text-[#12ACA4] hover:text-[#0e918a] underline transition-colors"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <u className="underline">{children}</u>,
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-[#17383F] mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-[#17383F] mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-[#17383F] mt-4 mb-2">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#12ACA4] pl-4 my-6 italic text-gray-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-4">{children}</li>,
    number: ({ children }) => <li className="ml-4">{children}</li>,
  },
};
