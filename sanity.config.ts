'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemas'
import { TranslateToEnglishAction } from './src/sanity/lib/translateAction'

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

  // Add custom document actions
  document: {
    actions: (prev, context) => {
      // Add translate action for post and service documents
      if (context.schemaType === 'post' || context.schemaType === 'service') {
        return [...prev, TranslateToEnglishAction]
      }
      return prev
    },
  },
})
