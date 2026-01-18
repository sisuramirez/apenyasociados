/**
 * Sanity Schema for Blog Posts - Apen & Asociados
 *
 * Internationalized schema with Spanish (primary) and English fields.
 * Financial Auditing and Consulting insights.
 */

// =============================================================================
// POST SCHEMA - Internationalized Blog Post document
// =============================================================================
export const post = {
  name: "post",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "spanish", title: "Español (ES)", default: true },
    { name: "english", title: "English (EN)" },
    { name: "media", title: "Media" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    // === SPANISH CONTENT ===
    {
      name: "title",
      title: "Título (ES)",
      type: "string",
      group: "spanish",
      description: "Título del artículo en español",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Resumen (ES)",
      type: "text",
      rows: 3,
      group: "spanish",
      description: "Breve descripción para la vista previa del blog",
    },
    {
      name: "body",
      title: "Contenido (ES)",
      type: "blockContent",
      group: "spanish",
      description: "Contenido principal del artículo en español",
    },

    // === ENGLISH CONTENT ===
    {
      name: "title_en",
      title: "Title (EN)",
      type: "string",
      group: "english",
      description: "Article title in English",
    },
    {
      name: "excerpt_en",
      title: "Excerpt (EN)",
      type: "text",
      rows: 3,
      group: "english",
      description: "Brief description for blog list preview in English",
    },
    {
      name: "body_en",
      title: "Content (EN)",
      type: "blockContent",
      group: "english",
      description: "Main article content in English",
    },

    // === MEDIA ===
    {
      name: "mainImage",
      title: "Main Image",
      type: "image",
      group: "media",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text (ES)",
          description: "Texto alternativo para accesibilidad",
        },
        {
          name: "alt_en",
          type: "string",
          title: "Alternative Text (EN)",
          description: "Alternative text for accessibility",
        },
      ],
    },

    // === SETTINGS ===
    {
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      group: "settings",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      group: "settings",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "title_en",
      media: "mainImage",
    },
  },
};

// =============================================================================
// BLOCK CONTENT SCHEMA - Rich text with custom image alignment
// =============================================================================
export const blockContent = {
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    // Standard text block
    {
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Underline", value: "underline" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
              },
              {
                name: "blank",
                type: "boolean",
                title: "Open in new tab",
                initialValue: true,
              },
            ],
          },
        ],
      },
    },
    // CUSTOM IMAGE BLOCK with Alignment
    {
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Important for accessibility and SEO",
        },
        {
          name: "alignment",
          type: "string",
          title: "Alignment",
          description: "Position the image",
          options: {
            list: [
              { title: "Left (text wraps right)", value: "left" },
              { title: "Center", value: "center" },
              { title: "Right (text wraps left)", value: "right" },
              { title: "Full Width", value: "full" },
            ],
            layout: "radio",
          },
          initialValue: "center",
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
          description: "Optional caption below the image",
        },
      ],
    },
    // INSTAGRAM EMBED BLOCK
    {
      name: "instagramEmbed",
      type: "object",
      title: "Instagram Embed",
      fields: [
        {
          name: "url",
          type: "url",
          title: "Instagram URL",
          description: "URL del post o reel de Instagram (ej: https://www.instagram.com/reel/DSX7WM7DES3/)",
          validation: (Rule: { required: () => unknown }) => Rule.required(),
        },
      ],
      preview: {
        select: {
          url: "url",
        },
        prepare({ url }: { url?: string }) {
          return {
            title: "Instagram Embed",
            subtitle: url || "No URL",
          };
        },
      },
    },
  ],
};

// Export schema types array for Sanity Studio
export const schemaTypes = [post, blockContent];
