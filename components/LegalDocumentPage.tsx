'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { MarkdownRenderer } from './MarkdownRenderer';

type LegalDoc = {
  title: string;
  content_markdown: string;
  effective_date: string;
  version: string;
  updated_at: string;
};

type Props = {
  slug: string;
  fallbackTitle: string;
  fallbackContent: React.ReactNode;
};

export function LegalDocumentPage({ slug, fallbackTitle, fallbackContent }: Props) {
  const [doc, setDoc] = useState<LegalDoc | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (supabase as any)
      .from('legal_documents')
      .select('title, content_markdown, effective_date, version, updated_at')
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle()
      .then(({ data }: any) => {
        setDoc(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const formattedDate = doc?.updated_at
    ? new Date(doc.updated_at).toLocaleDateString('pl-PL')
    : null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-16">
      <div className="container mx-auto px-6 md:px-4">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-1/4" />
              <div className="space-y-3 mt-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-100 dark:bg-gray-800 rounded" />
                ))}
              </div>
            </div>
          ) : doc ? (
            <>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">{doc.title}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
                Ostatnia aktualizacja: {formattedDate} · Wersja {doc.version}
              </p>
              <MarkdownRenderer content={doc.content_markdown} />
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">{fallbackTitle}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
                Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}
              </p>
              {fallbackContent}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
