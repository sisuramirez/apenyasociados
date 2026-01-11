/**
 * Sanity Schema for Blog Posts
 *
 * IMPORTANT: Copy these schemas to your Sanity Studio project's schemas folder.
 * This file serves as both documentation and a reference implementation.
 *
 * To use in Sanity Studio:
 * 1. Create a new Sanity project: npx sanity@latest init
 * 2. Copy the 'post' and 'blockContent' schemas to your studio's schemas folder
 * 3. Import them in your schema index file
 */

// =============================================================================
// POST SCHEMA - Main blog post document
// =============================================================================
export const post = {
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Brief description for blog list preview",
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
    },
  },
};

// =============================================================================
// BLOCK CONTENT SCHEMA - Rich text with custom image alignment (Word-like)
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
    // CUSTOM IMAGE BLOCK with Alignment - THE "WORD-LIKE" EXPERIENCE
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
          description: "Position the image like in Word",
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
  ],
};

// Export schema types array for Sanity Studio
export const schemaTypes = [post, blockContent];
