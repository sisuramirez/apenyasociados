# Setup Notes

## Required Assets

### Video Poster Image
**Location**: `/public/assets/video-poster.webp`

The Hero component now includes a `poster` attribute for the background video to improve mobile loading experience. You need to add a poster image:

1. **Extract a frame** from `animated-people.webm` at an appealing moment
2. **Convert to WebP format** (recommended for performance)
3. **Save as**: `public/assets/video-poster.webp`

**Recommended dimensions**: 1920x1080px (Full HD)

**Alternative**: You can also use JPG format and update the poster path in `src/components/Hero.tsx:20` to `/assets/video-poster.jpg`

### How to extract a frame from video:
```bash
# Using ffmpeg (if installed)
ffmpeg -i public/assets/animated-people.webm -ss 00:00:02 -vframes 1 -q:v 2 public/assets/video-poster.webp
```

## Current Assets
- ✅ `Logo-Apen-y-Asociadoss.png` - Main company logo
- ✅ `iec-net.png` - IECnet partner logo
- ✅ `animated-people.webm` - Hero background video
- ⚠️ `video-poster.webp` - **NEEDS TO BE ADDED**
