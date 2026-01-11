/**
 * Sanity Schema for Auditing Services
 *
 * Schema for Financial Auditing and Consulting services offered by Apen & Asociados.
 */

// =============================================================================
// SERVICE SCHEMA - Auditing Services document
// =============================================================================
export const service = {
  name: "service",
  title: "Auditing Services",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Service Title",
      type: "string",
      description: "Name of the auditing or consulting service",
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
      name: "icon",
      title: "Service Icon",
      type: "image",
      description: "Icon or image representing this financial auditing service",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Describe the icon for accessibility",
        },
      ],
    },
    {
      name: "description",
      title: "Service Description",
      type: "text",
      rows: 4,
      description: "Brief overview of the financial auditing or consulting service",
    },
    {
      name: "content",
      title: "Detailed Content",
      type: "blockContent",
      description: "Full description of the auditing service, methodology, and deliverables",
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "icon",
    },
  },
};
