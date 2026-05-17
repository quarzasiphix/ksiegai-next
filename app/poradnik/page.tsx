import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, CheckSquare, ExternalLink } from 'lucide-react';
import { getWikiArticlesByCategory } from '@/lib/wiki';

export const metadata: Metadata = {
  title: 'Poradnik dla przedsiębiorców | KsięgaI',
  description: 'Praktyczne przewodniki, checklisy i instrukcje dla polskich przedsiębiorców. KSeF, rejestracja spółki, CRBR, e-Doręczenia, podatki – krok po kroku.',
  keywords: 'poradnik przedsiębiorcy, KSeF jak zacząć, rejestracja spółki krok po kroku, CRBR zgłoszenie, e-doręczenia firma, checklist przedsiębiorca',
  alternates: { canonical: 'https://ksiegai.pl/poradnik' },
  openGraph: {
    title: 'Poradnik dla przedsiębiorców | KsięgaI',
    description: 'Praktyczne przewodniki i checklisy dla polskich przedsiębiorców.',
    url: 'https://ksiegai.pl/poradnik',
    type: 'website',
  },
};

export default async function PoradnikPage() {
  const grouped = await getWikiArticlesByCategory();
  const totalArticles = grouped.reduce((n, g) => n + g.articles.length, 0);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Poradnik dla przedsiębiorców – KsięgaI',
    description: 'Praktyczne przewodniki i checklisy dla polskich przedsiębiorców.',
    url: 'https://ksiegai.pl/poradnik',
    publisher: {
      '@type': 'Organization',
      name: 'Tovernet Sp. z o.o.',
      url: 'https://ksiegai.pl',
    },
    numberOfItems: totalArticles,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="border-b border-border/40 bg-gradient-to-b from-background to-muted/20 py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted/60 rounded-full px-3 py-1 mb-6">
              <BookOpen className="h-3.5 w-3.5" />
              <span>{totalArticles} przewodników</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Poradnik dla przedsiębiorców
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Praktyczne checklisy i instrukcje krok po kroku — rejestracja firmy, KSeF,
              obowiązki podatkowe i więcej. Zero lania wody.
            </p>
          </div>
        </section>

        {/* Categories + articles */}
        <section className="py-14 px-4">
          <div className="max-w-3xl mx-auto space-y-12">
            {grouped.map(({ category, articles }) => (
                <div key={category.slug}>
                  <div className="mb-5">
                  <Link href={`/poradnik/kategoria/${category.slug}`} className="inline-block">
                    <h2 className="text-xl font-semibold transition-colors hover:text-primary">{category.name}</h2>
                  </Link>
                  {category.description && (
                    <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                  )}
                  </div>

                <div className="space-y-3">
                  {articles.map((article) => (
                    <Link
                      key={article.slug}
                      href={`/poradnik/${article.slug}`}
                      className="group flex items-start gap-4 rounded-xl border border-border/60 bg-card p-4 transition-colors hover:border-primary/40 hover:bg-muted/30"
                    >
                      <div className="mt-0.5 flex-shrink-0 rounded-md bg-primary/10 p-2">
                        <CheckSquare className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium group-hover:text-primary transition-colors">
                          {article.title}
                        </p>
                        {article.excerpt && (
                          <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                            {article.excerpt}
                          </p>
                        )}
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0 group-hover:text-primary transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border/40 bg-muted/20 py-14 px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-3">
              Zajmij się firmą, resztą zajmie się KsięgaI
            </h2>
            <p className="text-muted-foreground mb-6">
              Automatyczne faktury, pełna obsługa KSeF, płatności online przez Stripe, JPK i rozliczenia — wszystko w jednym miejscu.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="https://app.ksiegai.pl/rejestracja"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Zacznij za darmo
                <ExternalLink className="h-4 w-4" />
              </Link>
              <Link
                href="/cennik"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold hover:bg-muted/40 transition-colors"
              >
                Zobacz cennik
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
