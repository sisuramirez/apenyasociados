/**
 * Sanity Schema for Auditing Services - Apen & Asociados
 *
 * Internationalized schema for Financial Auditing and Consulting services.
 */

// =============================================================================
// SERVICE SCHEMA - Internationalized Auditing Services document
// =============================================================================
export const service = {
  name: "service",
  title: "Auditing Services",
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
      title: "Título del Servicio (ES)",
      type: "string",
      group: "spanish",
      description: "Nombre del servicio de auditoría o consultoría",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "description",
      title: "Descripción (ES)",
      type: "text",
      rows: 4,
      group: "spanish",
      description: "Resumen breve del servicio de auditoría financiera o consultoría",
    },
    {
      name: "content",
      title: "Contenido Detallado (ES)",
      type: "blockContent",
      group: "spanish",
      description: "Descripción completa del servicio, metodología y entregables",
    },

    // === ENGLISH CONTENT ===
    {
      name: "title_en",
      title: "Service Title (EN)",
      type: "string",
      group: "english",
      description: "Name of the auditing or consulting service in English",
    },
    {
      name: "description_en",
      title: "Description (EN)",
      type: "text",
      rows: 4,
      group: "english",
      description: "Brief overview of the financial auditing or consulting service",
    },
    {
      name: "content_en",
      title: "Detailed Content (EN)",
      type: "blockContent",
      group: "english",
      description: "Full description of the auditing service, methodology, and deliverables",
    },

    // === MEDIA ===
    {
      name: "icon",
      title: "Service Icon",
      type: "image",
      group: "media",
      description: "Icon or image representing this financial auditing service",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text (ES)",
          description: "Describe el ícono para accesibilidad",
        },
        {
          name: "alt_en",
          type: "string",
          title: "Alternative Text (EN)",
          description: "Describe the icon for accessibility",
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
      name: "order",
      title: "Display Order",
      type: "number",
      group: "settings",
      description: "Order in which the service appears on the website",
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "title_en",
      media: "icon",
    },
  },
};
