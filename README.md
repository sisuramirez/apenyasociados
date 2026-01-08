# Apen y Asociados - Financial Audit Firm Website

A professional website for Apen y Asociados, built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Deployment**: Static Export (for shared hosting)

## Project Structure

```
apenyasociados/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout with LanguageProvider
│   │   ├── page.tsx         # Home page
│   │   └── globals.css      # Global styles
│   ├── components/
│   │   ├── Navbar.tsx       # Navigation bar with language toggle
│   │   └── Hero.tsx         # Hero section with video background
│   ├── context/
│   │   └── LanguageContext.tsx  # i18n context provider
│   ├── locales/
│   │   ├── es.json         # Spanish translations
│   │   └── en.json         # English translations
│   └── hooks/              # Custom hooks (empty for now)
├── public/
│   └── assets/             # Static assets (images, videos)
└── [config files]
```

## Color Palette

- **Primary**: #12ACA4 (Teal)
- **Secondary**: #17383F (Dark Navy)
- **Background**: #FFFFFF (White)

## Features

### ✅ Implemented
- Responsive Navbar with logo and menu items
- Bilingual support (English/Spanish) with language toggle
- Hero section with background video
- Smooth animations using Framer Motion
- Static export configuration for shared hosting

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm start
```

## Deployment

This project is configured for static export. To build for deployment:

```bash
npm run build
```

The static files will be generated in the `out/` directory, ready to be uploaded to Hostinger or any static hosting service.

## i18n System

The project uses a dictionary-based internationalization system:

1. **Language Context** (`src/context/LanguageContext.tsx`):
   - Manages current language state
   - Provides translations via `useLanguage()` hook

2. **Translation Files** (`src/locales/*.json`):
   - `es.json` - Spanish translations
   - `en.json` - English translations

3. **Usage**:
   ```tsx
   const { t, language, setLanguage } = useLanguage();
   <h1>{t.hero.title}</h1>
   ```

## Next Steps

- [ ] Add About Us section
- [ ] Add Team section
- [ ] Add Services section
- [ ] Add Contact form
- [ ] Add Footer
- [ ] Implement mobile menu
- [ ] Add SEO optimizations
- [ ] Add analytics

## License

Private - All rights reserved
