# PROJECT_CONTEXT.md

> **Purpose**: This file serves as long-term memory for AI assistants working on this project. Read this file at the start of every session to maintain context and avoid hallucinations.

---

## Project Overview

**Project Name**: AP&N Y Asociados
**Description**: Corporate website for a legal/consulting firm with blog functionality powered by Sanity CMS
**Repository**: Local development at `/Users/sisu/Documents/sisucorp/apenyasociados`

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.1.6 | App Router framework |
| React | 19.0.0 | UI library |
| TypeScript | 5.7.2 | Type safety |
| Tailwind CSS | 3.4.17 | Styling (primary) |
| Sanity CMS | 5.2.0 | Headless CMS for blog |
| next-sanity | 12.0.10 | Sanity + Next.js integration |
| Framer Motion | 11.15.0 | Animations |
| Lucide React | 0.469.0 | Icons |
| styled-components | 6.3.5 | **Sanity Studio UI only** |

---

## Current Configuration

### Development Server
- **URL**: `http://localhost:3001`
- **Sanity Studio**: `http://localhost:3001/studio`

### Sanity CMS
- **Project ID**: `vdxr2ggf`
- **Dataset**: `production`
- **API Version**: `2024-01-01`

### Environment Variables (`.env.local`)
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=vdxr2ggf
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=<redacted>
```

> **Important**: Variables must use `NEXT_PUBLIC_` prefix for browser accessibility.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage
│   ├── blog/
│   │   ├── page.tsx            # Blog listing
│   │   ├── [slug]/page.tsx     # Individual blog post
│   │   ├── layout.tsx          # Blog layout
│   │   ├── loading.tsx         # Loading state
│   │   └── error.tsx           # Error boundary
│   └── studio/
│       └── [[...index]]/
│           └── page.tsx        # Sanity Studio (use client)
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── AboutSection.tsx
│   ├── PhilosophySection.tsx
│   ├── ServicesSection.tsx
│   ├── TeamSection.tsx
│   ├── InternationalSection.tsx
│   ├── ContactSection.tsx
│   ├── Footer.tsx
│   ├── FloatingWhatsApp.tsx
│   └── PortableTextComponents.tsx
├── context/
│   └── LanguageContext.tsx     # i18n context
└── sanity/
    ├── lib/
    │   ├── client.ts           # Sanity client configuration
    │   ├── image.ts            # Image URL builder
    │   └── types.ts            # TypeScript types
    └── schemas/
        ├── index.ts            # Schema exports
        └── post.ts             # Blog post schema
```

---

## Infrastructure Decisions

### 1. Styled-Components Usage
- **Purpose**: Required **ONLY** for Sanity Studio UI components
- **Do NOT use** for any other UI components in the project
- Configured in `next.config.ts`:
  ```ts
  compiler: {
    styledComponents: true,
  }
  ```

### 2. Static Export Limitation
- `output: 'export'` is **commented out** in `next.config.ts`
- Reason: Incompatible with Sanity Studio's `[[...index]]` catch-all route
- For production static builds, use hosted Sanity Studio instead

### 3. Sanity Studio Route
- Location: `/studio` using `[[...index]]` dynamic route
- File: `src/app/studio/[[...index]]/page.tsx`
- **Must have** `'use client'` directive at the top
- Configuration: `sanity.config.ts` at project root with `basePath: '/studio'`

### 4. Tailwind Custom Configuration
```ts
// tailwind.config.ts
colors: {
  primary: "#12ACA4",    // Teal/turquoise
  secondary: "#17383F",  // Dark teal
  background: "#FFFFFF", // White
}
screens: {
  tablet: "800px",       // Custom breakpoint
}
```

---

## Recent Fixes Applied

### Session: January 2026

1. **Sanity Studio Blank Screen**
   - Created missing `src/app/studio/[[...index]]/page.tsx` with `'use client'`
   - Created `sanity.config.ts` at root with correct `basePath: '/studio'`
   - Commented out `output: 'export'` in `next.config.ts`
   - Installed missing `sanity` package

2. **styled-components Module Error**
   - Installed `styled-components` dependency
   - Added `compiler: { styledComponents: true }` to `next.config.ts`

3. **CORS Configuration**
   - Verified origins in Sanity Manage for `http://localhost:3001`

4. **Environment Variables**
   - Confirmed `.env.local` uses `NEXT_PUBLIC_` prefix for client-side access

---

## Coding Guidelines

### General Rules
1. **Use Functional Components** with TypeScript
2. **Prefer Tailwind CSS** for all new UI components
3. **Never use styled-components** outside of Sanity Studio
4. **Keep `'use client'`** directive in Sanity Studio routes

### File Naming
- Components: PascalCase (e.g., `HeroSection.tsx`)
- Utilities: camelCase (e.g., `client.ts`)
- Routes: lowercase with hyphens (e.g., `blog/[slug]`)

### TypeScript
- Strict mode enabled
- Use `@/*` path alias for imports from `src/`
- Define types in `src/sanity/lib/types.ts` for Sanity-related types

### Sanity Integration
- Use `safeFetch` wrapper from `src/sanity/lib/client.ts` for error handling
- Check `isSanityConfigured` before making queries
- Use `@sanity/image-url` for image transformations

---

## Common Commands

```bash
# Development
npm run dev          # Start dev server (port 3000 by default)
npm run dev -- -p 3001  # Start on port 3001

# Build & Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
```

---

## Known Issues & Workarounds

| Issue | Workaround |
|-------|------------|
| `output: 'export'` incompatible with Studio | Use server-side rendering locally; hosted Studio for production |
| Peer dependency warnings on install | Use `--legacy-peer-deps` flag |
| next-sanity requires Next.js 16+ | Works with warnings on Next.js 15 |

---

## Sanity Content Model

### Post Schema
```ts
{
  name: "post",
  fields: [
    "title",      // string, required
    "slug",       // slug, required
    "mainImage",  // image with hotspot + alt
    "publishedAt",// datetime
    "excerpt",    // text
    "body",       // blockContent (rich text)
  ]
}
```

### Block Content Features
- Standard text blocks (H2, H3, H4, blockquote)
- Lists (bullet, numbered)
- Marks (strong, em, underline, links)
- Images with alignment options (left, center, right, full)

---

## AI Assistant Instructions

1. **Always read this file first** at the start of each session
2. **Verify file existence** before suggesting edits
3. **Use Tailwind CSS** for new components, not styled-components
4. **Check `next.config.ts`** before suggesting build-related changes
5. **Test Sanity Studio** at `/studio` after any CMS-related changes
6. **Keep the `'use client'` directive** in studio route files

---

*Last Updated: January 10, 2026*
