'use client';

import { TranslateIcon } from '@sanity/icons';
import type { DocumentActionComponent } from 'sanity';

/**
 * Translation Document Action - Apen & Asociados
 *
 * This action provides a "Translate to English" button in Sanity Studio.
 * To enable automatic translation, configure one of the following APIs:
 *
 * Option 1: Google Cloud Translation API
 * 1. Enable Cloud Translation API in Google Cloud Console
 * 2. Create an API key
 * 3. Add NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY to your .env.local
 *
 * Option 2: DeepL API
 * 1. Sign up at deepl.com/pro-api
 * 2. Get your API key
 * 3. Add NEXT_PUBLIC_DEEPL_API_KEY to your .env.local
 *
 * Option 3: OpenAI API (GPT-4)
 * 1. Get an API key from platform.openai.com
 * 2. Add NEXT_PUBLIC_OPENAI_API_KEY to your .env.local
 */

export const TranslateToEnglishAction: DocumentActionComponent = (props) => {
  const { draft, published } = props;
  const doc = draft || published;

  // Only show for documents that have translatable fields
  const hasSpanishContent = doc?.title && typeof doc.title === 'string';
  const needsTranslation = !doc?.title_en;

  if (!hasSpanishContent) {
    return null;
  }

  return {
    label: needsTranslation ? 'Translate to English' : 'Update Translation',
    icon: TranslateIcon,
    title: needsTranslation
      ? 'Translate Spanish content to English fields'
      : 'Re-translate content to English',
    onHandle: () => {
      // Show instruction dialog
      const message = `Translation Feature Setup

To enable automatic translation, add one of these API keys to your .env.local:

1. Google Translate:
   NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY=your_key

2. DeepL:
   NEXT_PUBLIC_DEEPL_API_KEY=your_key

3. OpenAI:
   NEXT_PUBLIC_OPENAI_API_KEY=your_key

For now, please manually enter the English translations in the "English (EN)" tab.

Current Spanish content:
- Title: ${doc?.title || 'N/A'}
- Excerpt: ${(doc?.excerpt || doc?.description || 'N/A').toString().substring(0, 100)}...`;

      window.alert(message);
    },
  };
};
