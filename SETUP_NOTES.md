# Setup Notes

## Asset Management System

### ✅ Implemented (Professional Asset Management)

**Directory Structure:**
```
src/assets/           # Imported images (cache-busted automatically)
├── Logo-Apen-y-Asociadoss.png
└── iec-net.png

public/assets/        # Public assets (manual versioning)
├── animated-people.webm (versioned: ?v=1.0.0)
└── video-poster.webp (⚠️ NEEDS TO BE CREATED)
```

**Benefits:**
- ✅ Automatic cache busting for images via content hashes
- ✅ Build-time optimization
- ✅ TypeScript type safety
- ✅ No manual width/height needed
- ✅ Manual versioning for videos via query strings

**See:** `ASSET_MANAGEMENT_SYSTEM.md` for complete documentation.

---

## ⚠️ Required Action: Video Poster Image

**Location**: `/public/assets/video-poster.webp`

The Hero component uses a `poster` attribute (with versioning) for the background video to improve mobile loading experience. You need to create this poster image:

### Option 1: Extract from Video (Recommended)
```bash
# Using ffmpeg
ffmpeg -i public/assets/animated-people.webm \
  -ss 00:00:02 \
  -vframes 1 \
  -q:v 2 \
  public/assets/video-poster.webp
```

### Option 2: Manual Screenshot
1. Open `animated-people.webm` in browser/player
2. Pause at appealing frame (2-3 seconds in)
3. Take screenshot
4. Convert to WebP format
5. Save as `public/assets/video-poster.webp`

### Option 3: Use Existing Image
```bash
cp path/to/your/image.jpg public/assets/video-poster.webp
```

**Recommended Dimensions:** 1920x1080px (Full HD)

**Current Status:** Hero.tsx references `video-poster.webp?v=1.0.0` but file doesn't exist yet.

---

## Current Assets Status

### Imported Assets (src/assets/)
- ✅ `Logo-Apen-y-Asociadoss.png` - Main logo (imported in Navbar.tsx)
- ✅ `iec-net.png` - IECnet partner logo (imported in Navbar.tsx)

### Public Assets (public/assets/)
- ✅ `animated-people.webm` - Hero background video (versioned: ?v=1.0.0)
- ⚠️ `video-poster.webp` - **NEEDS TO BE CREATED**

---

## Version Management

### For Images (Automatic)
Images in `src/assets/` are automatically cache-busted via content hashes.
No manual intervention needed! Just update the file and rebuild.

### For Videos (Manual)
Update version query string in `src/components/Hero.tsx`:
```tsx
// Current
<source src="/assets/animated-people.webm?v=1.0.0" />

// After updating video
<source src="/assets/animated-people.webm?v=1.0.1" />
```
