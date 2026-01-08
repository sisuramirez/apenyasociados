# Custom Breakpoint Implementation - Mobile-First Responsive Design

## Overview
The Navbar has been refactored with a mobile-first approach using custom breakpoints to ensure a premium look across all devices.

---

## Breakpoint Configuration

### Tailwind Config (`tailwind.config.ts`)

```typescript
screens: {
  tablet: "800px",   // Custom tablet breakpoint
  // Default Tailwind breakpoints:
  // sm: "640px"
  // md: "768px"
  lg: "1024px",      // Desktop breakpoint (unchanged)
  // xl: "1280px"
  // 2xl: "1536px"
}
```

### Breakpoint Strategy

| Device | Range | Breakpoint | Layout Method |
|--------|-------|------------|---------------|
| **Mobile** | 0 - 799px | Default (no prefix) | Grid `grid-cols-3` |
| **Tablet** | 800 - 1023px | `tablet:` | Grid `grid-cols-3` |
| **Desktop** | 1024px+ | `lg:` | Flexbox `flex` |

---

## Responsive Behavior by Device

### 📱 Mobile (< 800px)

**Layout:** 3-Column Grid
```
┌──────────────────────────────────┐
│ [Logo]  [ESP⚪ENG]      [☰]     │
│  h-8       center        menu    │
└──────────────────────────────────┘
```

**Specifications:**
- **Logo:** `h-8` (32px) - Small and compact
- **Language Toggle:** Centered, `text-xs` (12px)
- **Menu:** Hamburger icon visible
- **IECnet Logo:** Hidden (not shown)
- **Nav Links:** Hidden (in drawer menu)

**Classes:**
```tsx
<div className="grid grid-cols-3 items-center h-20 lg:hidden">
  <Image className="h-8 tablet:h-16 w-auto transition-all duration-300" />
</div>
```

---

### 📱 Tablet (800px - 1023px)

**Layout:** 3-Column Grid (same structure as mobile)
```
┌──────────────────────────────────┐
│ [Logo]  [ESP⚪ENG]      [☰]     │
│  h-16      center        menu    │
└──────────────────────────────────┘
```

**Specifications:**
- **Logo:** `h-16` (64px) - **Large version** (upgraded from h-8)
- **Language Toggle:** Centered, `text-xs` (12px)
- **Menu:** **Still uses hamburger** (horizontal links NOT shown yet)
- **IECnet Logo:** Hidden (maintains clean aesthetic)
- **Nav Links:** Hidden (in drawer menu)

**Classes:**
```tsx
<Image className="h-8 tablet:h-16 w-auto transition-all duration-300" />
```
The logo smoothly transitions from 32px to 64px at the 800px breakpoint.

---

### 💻 Desktop (≥ 1024px)

**Layout:** Flexbox with Justify-Between
```
┌──────────────────────────────────────────────────────────┐
│ [Logo h-16]  [Links···]  [IECnet] [ESP⚪ENG]            │
│  Flex-start   Center      Flex-end                       │
└──────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Logo:** `h-16` (64px) - Large version maintained
- **Nav Links:** **Horizontal links visible** (Inicio, Nosotros, Equipo, etc.)
- **IECnet Logo:** **Visible** (40px height)
- **Language Toggle:** Full size, `text-sm` (14px)
- **Menu:** Hamburger hidden

**Classes:**
```tsx
<div className="hidden lg:flex items-center justify-between h-20">
  <Image className="h-16 w-auto transition-all duration-300" />
</div>
```

---

## Logo Size Transitions

### Mobile-First Sizing Chart

| Breakpoint | Class | Height | Visual Impact |
|------------|-------|--------|---------------|
| **Mobile** (<800px) | `h-8` | 32px | Compact, saves space |
| **Tablet** (800-1023px) | `tablet:h-16` | 64px | **Premium, prominent branding** |
| **Desktop** (≥1024px) | `h-16` | 64px | Consistent with tablet |

### Smooth Transitions

All logo size changes use:
```css
transition-all duration-300
```

**Result:** Smooth 300ms animation when:
- Rotating device from portrait to landscape
- Resizing browser window
- Switching between breakpoints

---

## Layout Method Comparison

### Grid (Mobile & Tablet)
```tsx
<div className="grid grid-cols-3 items-center h-20 lg:hidden">
  <div className="flex justify-start">Logo</div>
  <div className="flex justify-center">Toggle</div>
  <div className="flex justify-end">Menu</div>
</div>
```

**Benefits:**
- Perfect centering of language toggle
- Equal column widths (33.33% each)
- Maintains balance regardless of content

### Flexbox (Desktop)
```tsx
<div className="hidden lg:flex items-center justify-between h-20">
  <div>Logo</div>
  <div>Nav Links</div>
  <div>IECnet + Toggle</div>
</div>
```

**Benefits:**
- Natural spacing for navigation links
- Flexible content distribution
- Professional horizontal layout

---

## Mobile Menu Drawer

### Visibility Rules

The hamburger menu and drawer are visible for:
- ✅ Mobile (< 800px)
- ✅ Tablet (800px - 1023px)
- ❌ Desktop (≥ 1024px) - Hidden, uses horizontal links instead

### Implementation
```tsx
{/* Mobile & Tablet Menu Overlay */}
<AnimatePresence>
  {mobileMenuOpen && (
    <>
      <motion.div className="... lg:hidden" /> {/* Backdrop */}
      <motion.div className="... lg:hidden">   {/* Panel */}
        {/* Menu content */}
      </motion.div>
    </>
  )}
</AnimatePresence>
```

Changed from `md:hidden` to `lg:hidden` to support tablet devices.

---

## Visual Hierarchy

### Mobile (< 800px)
```
Priority 1: Compact logo (brand recognition)
Priority 2: Language switch (always accessible)
Priority 3: Menu access (one tap away)
```

### Tablet (800px - 1023px)
```
Priority 1: Large logo (premium branding) ⭐
Priority 2: Language switch (always accessible)
Priority 3: Menu access (curated drawer experience)
```

### Desktop (≥ 1024px)
```
Priority 1: Large logo (premium branding)
Priority 2: Navigation links (immediate access)
Priority 3: Partner branding (IECnet logo)
Priority 4: Language switch (utility)
```

---

## IECnet Logo Strategy

### Visibility Matrix

| Device | IECnet Visible? | Location | Reason |
|--------|----------------|----------|---------|
| Mobile | ❌ No | N/A | Saves precious screen space |
| Tablet | ❌ No | N/A | Maintains clean 3-col layout |
| Desktop | ✅ Yes | Before language toggle | Premium branding display |

### Desktop Implementation
```tsx
<div className="flex items-center space-x-4">
  <Image src="/assets/iec-net.png" className="h-10 w-auto" />
  <LanguageToggle />
</div>
```

---

## Smooth Transitions Implementation

### Applied to:

1. **Nav Container**
```tsx
<nav className="... transition-all duration-300">
```

2. **Layout Containers**
```tsx
<div className="grid ... transition-all duration-300">
<div className="hidden lg:flex ... transition-all duration-300">
```

3. **Logo Image**
```tsx
<Image className="h-8 tablet:h-16 w-auto transition-all duration-300" />
```

4. **Desktop Right Section**
```tsx
<div className="flex items-center space-x-4 transition-all duration-300">
```

### Transition Properties

- **Duration:** 300ms (smooth but not sluggish)
- **Easing:** Default (ease) - natural acceleration curve
- **Properties:** All (size, layout, positioning)

---

## Code Structure

### Mobile-First Approach

```tsx
// Step 1: Mobile layout (default, no breakpoint prefix)
<div className="grid grid-cols-3 lg:hidden">
  <Image className="h-8 tablet:h-16" />  // Mobile: h-8, Tablet: h-16
</div>

// Step 2: Desktop layout (lg: breakpoint)
<div className="hidden lg:flex">
  <Image className="h-16" />  // Desktop: h-16
</div>
```

**Key Principles:**
1. Default styles = Mobile
2. Add `tablet:` prefix for tablet-specific changes
3. Add `lg:` prefix for desktop overrides
4. Use `lg:hidden` and `hidden lg:flex` for layout switching

---

## Testing Breakpoints

### Browser Dev Tools

1. **Mobile (< 800px)**
   - Test at: 375px (iPhone SE), 390px (iPhone 14)
   - Logo should be `h-8` (32px)
   - Grid layout with centered toggle

2. **Tablet (800px - 1023px)**
   - Test at: 800px, 820px, 1000px
   - Logo should be `h-16` (64px) - **This is the key change!**
   - Still uses hamburger menu
   - Grid layout maintained

3. **Desktop (≥ 1024px)**
   - Test at: 1024px, 1280px, 1920px
   - Logo should be `h-16` (64px)
   - Horizontal nav links visible
   - IECnet logo appears
   - Flexbox layout

### Device Rotation Test

**Tablet Landscape (e.g., iPad in landscape):**
- If width ≥ 1024px → Desktop layout
- If width < 1024px → Tablet layout with hamburger

**Expected Behavior:**
- Logo smoothly transitions between sizes
- Layout seamlessly switches between grid/flex
- No content jump or flash

---

## Performance Considerations

### CSS Transitions
- Uses GPU-accelerated properties
- 300ms duration prevents janky animations
- Applied to containers and images for cohesive feel

### Responsive Images
- Next.js Image component automatically optimizes
- Width/height attributes prevent layout shift
- `priority` prop on logo ensures immediate load

### Layout Calculations
- CSS Grid and Flexbox are native browser features
- No JavaScript calculations for positioning
- Hardware-accelerated rendering

---

## Accessibility

### Keyboard Navigation
- All breakpoints maintain focus indicators
- Tab order preserved across layouts
- ARIA labels consistent

### Touch Targets
- Mobile/Tablet: Language toggle + hamburger (44px minimum)
- Desktop: All clickable elements meet standards

### Screen Readers
- Layout changes are invisible to screen readers
- Content order remains logical
- Proper semantic HTML maintained

---

## Summary of Changes

### Files Modified

1. **`tailwind.config.ts`**
   - Added `tablet: "800px"` breakpoint

2. **`src/components/Navbar.tsx`**
   - Refactored to mobile-first approach
   - Separate grid layout for mobile/tablet (`lg:hidden`)
   - Separate flex layout for desktop (`hidden lg:flex`)
   - Logo: `h-8` → `tablet:h-16` (smooth transition)
   - Menu drawer: `md:hidden` → `lg:hidden`
   - Added `transition-all duration-300` throughout

### Key Improvements

✅ Premium tablet experience with large logo
✅ Maintains hamburger menu until 1024px
✅ Smooth transitions on device rotation
✅ Clean aesthetic (IECnet logo desktop-only)
✅ True mobile-first CSS architecture
✅ Consistent branding across breakpoints

---

## Visual Comparison

```
MOBILE (<800px):
[Logo-32px]  [ESP⚪ENG]  [☰]
    Grid 3-col layout

TABLET (800-1023px):
[Logo-64px]  [ESP⚪ENG]  [☰]
    Grid 3-col layout (logo GROWS!)

DESKTOP (≥1024px):
[Logo-64px] [Links···] [IECnet][ESP⚪ENG]
    Flexbox layout (SWITCH!)
```

The magic happens at two key breakpoints:
- **800px:** Logo doubles in size (32px → 64px)
- **1024px:** Layout switches from grid to flexbox, links appear
