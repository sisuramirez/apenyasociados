# CONTEXTO_DEL_PROYECTO.md

> **Propósito**: Este archivo sirve como memoria a largo plazo para los desarrolladores que trabajan en este proyecto. Lea este archivo al inicio de cada sesión para mantener el contexto y evitar alucinaciones.

---

## Resumen del Proyecto

**Nombre del Proyecto**: Apen Y Asociados
**Descripción**: Sitio web corporativo para una firma legal/de consultoría con funcionalidad de blog impulsada por Sanity CMS
**Repositorio**: Desarrollo local en `/Users/sisu/Documents/sisucorp/apenyasociados`

---

## Pila Tecnológica

| Tecnología | Versión | Propósito |
|------------|---------|---------|
| Next.js | 15.1.6 | Framework del App Router |
| React | 19.0.0 | Biblioteca de UI |
| TypeScript | 5.7.2 | Seguridad de tipos |
| Tailwind CSS | 3.4.17 | Estilización (primaria) |
| Sanity CMS | 5.2.0 | CMS headless para blog |
| next-sanity | 12.0.10 | Integración Sanity + Next.js |
| Framer Motion | 11.15.0 | Animaciones |
| Lucide React | 0.469.0 | Iconos |
| styled-components | 6.3.5 | **Solo para UI de Sanity Studio** |

---

## Configuración Actual

### Servidor de Desarrollo
- **URL**: `http://localhost:3001`
- **Sanity Studio**: `http://localhost:3001/studio`

### Sanity CMS
- **ID del Proyecto**: `vdxr2ggf`
- **Dataset**: `production`
- **Versión de API**: `2024-01-01`

### Variables de Entorno (`.env.local`)
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=vdxr2ggf
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=<redacted>
```

> **Importante**: Las variables deben usar el prefijo `NEXT_PUBLIC_` para accesibilidad en el navegador.

---

## Estructura del Proyecto

```
src/
├── app/
│   ├── layout.tsx              # Layout raíz
│   ├── page.tsx                # Página de inicio
│   ├── blog/
│   │   ├── page.tsx            # Listado de blog
│   │   ├── [slug]/page.tsx     # Publicación individual del blog
│   │   ├── layout.tsx          # Layout del blog
│   │   ├── loading.tsx         # Estado de carga
│   │   └── error.tsx           # Límite de error
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
│   └── LanguageContext.tsx     # Contexto i18n
└── sanity/
    ├── lib/
    │   ├── client.ts           # Configuración del cliente Sanity
    │   ├── image.ts            # Constructor de URL de imagen
    │   └── types.ts            # Tipos TypeScript
    └── schemas/
        ├── index.ts            # Exportaciones de esquema
        └── post.ts             # Esquema de publicación de blog
```

---

## Decisiones de Infraestructura

### 1. Uso de Styled-Components
- **Propósito**: Requerido **SOLO** para componentes de UI de Sanity Studio
- **NO use** para ningún otro componente de UI en el proyecto
- Configurado en `next.config.ts`:
  ```ts
  compiler: {
    styledComponents: true,
  }
  ```

### 2. Limitación de Exportación Estática
- `output: 'export'` está **comentado** en `next.config.ts`
- Razón: Incompatible con la ruta catch-all `[[...index]]` de Sanity Studio
- Para builds estáticos de producción, use Sanity Studio alojado en su lugar

### 3. Ruta de Sanity Studio
- Ubicación: `/studio` usando ruta dinámica `[[...index]]`
- Archivo: `src/app/studio/[[...index]]/page.tsx`
- **Debe tener** directiva `'use client'` en la parte superior
- Configuración: `sanity.config.ts` en la raíz con `basePath: '/studio'`

### 4. Configuración Personalizada de Tailwind
```ts
// tailwind.config.ts
colors: {
  primary: "#12ACA4",    // Teal/turquesa
  secondary: "#17383F",  // Teal oscuro
  background: "#FFFFFF", // Blanco
}
screens: {
  tablet: "800px",       // Punto de ruptura personalizado
}
```

---

## Correcciones Recientes Aplicadas

### Sesión: Enero 2026

1. **Pantalla en Blanco de Sanity Studio**
   - Creó el archivo faltante `src/app/studio/[[...index]]/page.tsx` con `'use client'`
   - Creó `sanity.config.ts` en la raíz con `basePath: '/studio'` correcto
   - Comentó `output: 'export'` en `next.config.ts`
   - Instaló el paquete faltante `sanity`

2. **Error de Módulo styled-components**
   - Instaló la dependencia `styled-components`
   - Agregó `compiler: { styledComponents: true }` a `next.config.ts`

3. **Configuración CORS**
   - Verificó orígenes en Sanity Manage para `http://localhost:3001`

4. **Variables de Entorno**
   - Confirmó que `.env.local` usa prefijo `NEXT_PUBLIC_` para acceso del lado del cliente

5. **Build de Vercel: Error useEffectEvent**
   - Fijó `react` y `react-dom` a la versión exacta `19.0.0` (eliminó prefijo `^`)
   - Agregó sección `overrides` en `package.json` para forzar que todas las sub-dependencias usen React 19 estable:
     ```json
     "overrides": {
       "react": "$react",
       "react-dom": "$react-dom"
     }
     ```
   - Regeneró `package-lock.json` con `npm install --legacy-peer-deps`

6. **Ruta de Studio Lista para Producción**
   - Agregó `export const dynamic = 'force-dynamic'` para prevenir generación estática

---

## Directrices de Codificación

### Reglas Generales
1. **Use Componentes Funcionales** con TypeScript
2. **Prefiera Tailwind CSS** para todos los nuevos componentes de UI
3. **Nunca use styled-components** fuera de Sanity Studio
4. **Mantenga la directiva `'use client'`** en rutas de studio

### Nomenclatura de Archivos
- Componentes: PascalCase (ej., `HeroSection.tsx`)
- Utilidades: camelCase (ej., `client.ts`)
- Rutas: minúsculas con guiones (ej., `blog/[slug]`)

### TypeScript
- Modo estricto habilitado
- Use alias de ruta `@/*` para importaciones desde `src/`
- Defina tipos en `src/sanity/lib/types.ts` para tipos relacionados con Sanity

### Integración con Sanity
- Use el wrapper `safeFetch` de `src/sanity/lib/client.ts` para manejo de errores
- Verifique `isSanityConfigured` antes de hacer consultas
- Use `@sanity/image-url` para transformaciones de imagen

---

## Comandos Comunes

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo (puerto 3000 por defecto)
npm run dev -- -p 3001  # Iniciar en puerto 3001

# Build & Producción
npm run build        # Build para producción
npm run start        # Iniciar servidor de producción

# Linting
npm run lint         # Ejecutar ESLint
```

---

## Problemas Conocidos y Soluciones

| Problema | Solución |
|-------|------------|
| `output: 'export'` incompatible con Studio | Use renderizado del lado del servidor localmente; Studio alojado para producción |
| Advertencias de dependencias peer en instalación | Use bandera `--legacy-peer-deps` |
| next-sanity requiere Next.js 16+ | Funciona con advertencias en Next.js 15 |

---

## Modelo de Contenido de Sanity

### Esquema de Publicación
```ts
{
  name: "post",
  fields: [
    "title",      // string, requerido
    "slug",       // slug, requerido
    "mainImage",  // imagen con hotspot + alt
    "publishedAt",// datetime
    "excerpt",    // text
    "body",       // blockContent (texto rico)
  ]
}
```

### Características de Contenido de Bloque
- Bloques de texto estándar (H2, H3, H4, blockquote)
- Listas (viñetas, numeradas)
- Marcas (strong, em, underline, enlaces)
- Imágenes con opciones de alineación (izquierda, centro, derecha, completo)

---

## Instrucciones para Desarrollador

1. **Siempre lea este archivo primero** al inicio de cada sesión
2. **Verifique la existencia de archivos** antes de sugerir ediciones
3. **Use Tailwind CSS** para nuevos componentes, no styled-components
4. **Verifique `next.config.ts`** antes de sugerir cambios relacionados con build
5. **Pruebe Sanity Studio** en `/studio` después de cualquier cambio relacionado con CMS
6. **Mantenga la directiva `'use client'`** en archivos de ruta de studio

---

*Última Actualización: 10 de enero de 2026*