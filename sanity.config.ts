'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemas'

// Debug: Log environment variables
console.log("Sanity Project ID:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
console.log("Sanity Dataset:", process.env.NEXT_PUBLIC_SANITY_DATASET)

export default defineConfig({
  name: 'default',
  title: 'Apen & Asociados',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'vdxr2ggf',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
})
