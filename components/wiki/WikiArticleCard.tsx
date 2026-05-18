import Link from 'next/link';
import { ArrowRight, Clock3 } from 'lucide-react';
import type { WikiArticle, WikiArticleListItem, WikiCategory } from '@/lib/wiki';
import {
  formatWikiDate,
  getWikiArticleTypeLabel,
  getWikiPresentationCategory,
} from '@/lib/wiki-presentation';

type ArticleCard = WikiArticleListItem | WikiArticle;

type WikiArticleCardProps = {
  article: ArticleCard;
  category?: WikiCategory | null;
  showCategory?: boolean;
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
};

function joinClassNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

export function WikiArticleCard({
  article,
  category,
  showCategory = true,
  variant = 'default',
  className,
}: WikiArticleCardProps) {
  const resolvedCategory = category ?? ('category' in article ? article.category : null);
  const presentation = getWikiPresentationCategory(resolvedCategory?.slug);

  const cardClassName =
    variant === 'featured'
      ? 'rounded-3xl border border-black/10 bg-white/95 p-6 shadow-[0_28px_80px_-40px_rgba(15,23,42,0.45)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_32px_90px_-42px_rgba(15,23,42,0.5)] dark:border-white/10 dark:bg-white/[0.05] dark:shadow-black/30'
      : variant === 'compact'
        ? 'rounded-2xl border border-black/10 bg-white/90 p-4 shadow-[0_18px_50px_-36px_rgba(15,23,42,0.35)] transition duration-200 hover:border-sky-500/30 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.06]'
        : 'rounded-[28px] border border-black/10 bg-white/90 p-5 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.4)] transition duration-200 hover:-translate-y-0.5 hover:border-sky-500/30 hover:bg-white hover:shadow-[0_24px_70px_-42px_rgba(15,23,42,0.45)] dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.06]';

  return (
    <Link
      href={`/poradnik/${article.slug}`}
      className={joinClassNames('group relative flex h-full flex-col justify-between overflow-hidden', cardClassName, className)}
    >
      <div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
          <span className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-foreground/80 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/80">
            {getWikiArticleTypeLabel(article.article_type)}
          </span>
          {showCategory && resolvedCategory ? (
            <span className="rounded-full bg-sky-500/10 px-3 py-1 text-sky-700 dark:text-sky-300">
              {resolvedCategory.name}
            </span>
          ) : null}
        </div>

        <div className={joinClassNames('mt-4 space-y-3', variant === 'featured' && 'max-w-3xl')}>
          <h3
            className={joinClassNames(
              'font-semibold tracking-tight text-foreground transition-colors group-hover:text-sky-700 dark:text-white dark:group-hover:text-sky-300',
              variant === 'featured' ? 'text-2xl md:text-[2rem]' : 'text-lg'
            )}
          >
            {article.title}
          </h3>
          <p className={joinClassNames('text-sm leading-7 text-muted-foreground', variant === 'featured' && 'text-[15px] md:text-base')}>
            {article.excerpt || article.summary}
          </p>
        </div>
      </div>

      <div className={joinClassNames('mt-6 flex items-center justify-between gap-4', variant === 'featured' && 'mt-8')}>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock3 className="h-3.5 w-3.5" />
          <span>Aktualizacja: {formatWikiDate(article.updated_at || article.published_at)}</span>
        </div>
        <div className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/80 transition-colors group-hover:text-sky-700 dark:text-white/80 dark:group-hover:text-sky-300">
          <span>{variant === 'featured' ? 'Otwórz poradnik' : 'Czytaj dalej'}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>

      <div
        aria-hidden="true"
        className={joinClassNames(
          'pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100',
          presentation.accentClassName
        )}
      />
    </Link>
  );
}
