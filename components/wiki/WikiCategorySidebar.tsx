import Link from 'next/link';
import { BookOpen, ChevronRight } from 'lucide-react';
import type { WikiCategory } from '@/lib/wiki';

type WikiCategorySidebarItem = {
  category: WikiCategory;
  count: number;
};

type WikiCategorySidebarProps = {
  items: WikiCategorySidebarItem[];
  activeCategorySlug?: string | null;
  showHomeLink?: boolean;
  className?: string;
  desktopVariant?: 'card' | 'rail';
};

function joinClassNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

export function WikiCategorySidebar({
  items,
  activeCategorySlug,
  showHomeLink = true,
  className,
  desktopVariant = 'card',
}: WikiCategorySidebarProps) {
  const isRail = desktopVariant === 'rail';
  const desktopHiddenClass = isRail ? 'hidden lg:block' : 'hidden md:block';

  return (
    <>
      <div className={joinClassNames(
        'sticky top-0 z-20 -mx-4 border-b border-black/5 bg-white/92 px-4 py-3 backdrop-blur dark:border-white/10 dark:bg-slate-950/88',
        isRail ? 'lg:hidden' : 'md:hidden'
      )}>
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
          <BookOpen className="h-4 w-4 text-sky-600 dark:text-sky-300" />
          <span>Kategorie poradnika</span>
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {showHomeLink ? (
            <Link
              href="/poradnik"
              className={joinClassNames(
                'whitespace-nowrap rounded-full border px-3 py-2 text-sm transition',
                !activeCategorySlug
                  ? 'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300'
                  : 'border-black/10 bg-white text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200'
              )}
            >
              Wszystkie kategorie
            </Link>
          ) : null}
          {items.map(({ category, count }) => {
            const isActive = category.slug === activeCategorySlug;

            return (
              <Link
                key={category.slug}
                href={`/poradnik/kategoria/${category.slug}`}
                aria-current={isActive ? 'page' : undefined}
                className={joinClassNames(
                  'inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-2 text-sm transition',
                  isActive
                    ? 'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300'
                    : 'border-black/10 bg-white text-slate-700 hover:border-sky-500/30 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:text-sky-300'
                )}
              >
                <span>{category.name}</span>
                <span className="rounded-full bg-black/[0.04] px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-white/[0.08] dark:text-slate-300">
                  {count}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <aside className={joinClassNames(desktopHiddenClass, className)}>
        <div
          className={joinClassNames(
            isRail
              ? 'fixed left-0 top-0 z-[70] h-screen w-80 overflow-y-auto border-r border-black/10 bg-white/98 p-6 shadow-[24px_0_90px_-54px_rgba(15,23,42,0.5)] dark:border-white/10 dark:bg-slate-950/98'
              : 'sticky top-24 rounded-[28px] border border-black/10 bg-white/88 p-5 shadow-[0_24px_80px_-52px_rgba(15,23,42,0.38)] dark:border-white/10 dark:bg-white/[0.04]'
          )}
        >
          <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            <BookOpen className="h-4 w-4 text-sky-600 dark:text-sky-300" />
            <span>Kategorie poradnika</span>
          </div>

          {showHomeLink ? (
            <div className="mt-4">
              <Link
                href="/poradnik"
                className={joinClassNames(
                  'flex items-center justify-between gap-3 rounded-2xl border px-3 py-3 text-sm transition',
                  !activeCategorySlug
                    ? 'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300'
                    : 'border-black/5 bg-black/[0.02] text-slate-700 hover:border-sky-500/30 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-200 dark:hover:text-sky-300'
                )}
              >
                <span>Wszystkie kategorie</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          ) : null}

          <div className="mt-3 space-y-2">
            {items.map(({ category, count }) => {
              const isActive = category.slug === activeCategorySlug;

              return (
                <Link
                  key={category.slug}
                  href={`/poradnik/kategoria/${category.slug}`}
                  aria-current={isActive ? 'page' : undefined}
                  className={joinClassNames(
                    'flex items-center justify-between gap-3 rounded-2xl border px-3 py-3 text-sm transition',
                    isActive
                      ? 'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300'
                      : 'border-black/5 bg-black/[0.02] text-slate-700 hover:border-sky-500/30 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-200 dark:hover:text-sky-300'
                  )}
                >
                  <span>{category.name}</span>
                  <span className="rounded-full bg-white/80 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-white/[0.08] dark:text-slate-300">
                    {count}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}
