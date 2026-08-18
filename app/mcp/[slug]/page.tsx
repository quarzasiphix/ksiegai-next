import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CircleDot, Pencil, Zap } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { PageAnalytics } from "@/components/analytics/PageAnalytics";
import { mcpCategories, getMcpCategory, TIER_LABELS, TIER_DESCRIPTIONS, type McpTier } from "@/lib/mcpTools";

type PageProps = {
  params: { slug: string };
};

const TIER_ICON: Record<McpTier, typeof CircleDot> = {
  read_only: CircleDot,
  draft_write: Pencil,
  full_post: Zap,
};

const TIER_BADGE_CLASS: Record<McpTier, string> = {
  read_only: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  draft_write: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  full_post: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
};

export async function generateStaticParams() {
  return mcpCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = getMcpCategory(params.slug);
  if (!category) {
    return { title: "Kategoria nie znaleziona | KsięgaI MCP" };
  }
  const title = `${category.title} — narzędzia MCP | KsięgaI`;
  const description = `${category.summary} Pełna lista narzędzi MCP w kategorii „${category.title}”, ich opis i wymagany poziom uprawnień.`;
  return {
    title,
    description,
    alternates: { canonical: `https://www.ksiegai.pl/mcp/${category.slug}/` },
    openGraph: {
      title,
      description,
      url: `https://www.ksiegai.pl/mcp/${category.slug}`,
      type: "website",
      locale: "pl_PL",
    },
  };
}

export default function McpCategoryPage({ params }: PageProps) {
  const category = getMcpCategory(params.slug);
  if (!category) notFound();
  const Icon = category.icon;

  const otherCategories = mcpCategories.filter((c) => c.slug !== category.slug);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageAnalytics page={`mcp-${category.slug}`} intent="ai_integration" />

      {/* Header */}
      <section className="py-14 sm:py-16 bg-gray-950 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/mcp"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Wszystkie kategorie
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${category.bgClass}`}>
                <Icon className={`h-5 w-5 ${category.iconClass}`} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{category.title}</h1>
              <span className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-gray-300">
                {category.tools.length} {category.tools.length === 1 ? "narzędzie" : "narzędzi"}
              </span>
            </div>
            <p className="text-gray-300 text-base sm:text-lg">{category.summary}</p>
          </div>
        </div>
      </section>

      {/* Tier legend */}
      <section className="py-6 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto flex flex-wrap gap-3">
            {(Object.keys(TIER_LABELS) as McpTier[]).map((tier) => {
              const TierIcon = TIER_ICON[tier];
              return (
                <div
                  key={tier}
                  className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800"
                  title={TIER_DESCRIPTIONS[tier]}
                >
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold ${TIER_BADGE_CLASS[tier]}`}>
                    <TierIcon className="h-3 w-3" />
                    {TIER_LABELS[tier]}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">{TIER_DESCRIPTIONS[tier]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tool list */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto space-y-4">
            {category.tools.map((tool) => {
              const TierIcon = TIER_ICON[tool.tier];
              return (
                <div
                  key={tool.name}
                  id={tool.name}
                  className="scroll-mt-24 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5 sm:p-6"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <code className="text-sm font-mono font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20 px-2 py-1 rounded">
                      {tool.name}
                    </code>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${TIER_BADGE_CLASS[tool.tier]}`}>
                      <TierIcon className="h-3 w-3" />
                      {TIER_LABELS[tool.tier]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{tool.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Other categories */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Pozostałe kategorie</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherCategories.map((c) => {
                const CIcon = c.icon;
                return (
                  <Link
                    key={c.slug}
                    href={`/mcp/${c.slug}`}
                    className="group bg-white dark:bg-gray-950 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${c.bgClass}`}>
                        <CIcon className={`h-4 w-4 ${c.iconClass}`} />
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                        {c.title}
                        <ArrowRight className="h-3.5 w-3.5 text-gray-400 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all" />
                      </h3>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{c.summary}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-purple-600 to-blue-700">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Gotowy podłączyć swoją AI?</h2>
          <p className="text-purple-100 mb-8 max-w-md mx-auto">
            Wróć na stronę MCP, żeby zobaczyć instrukcję podłączenia i pełną listę kategorii narzędzi.
          </p>
          <TrackedLink
            href="/mcp#tutorial"
            event="cta_clicked"
            eventProps={{ page: `mcp-${category.slug}`, cta_id: "footer_cta", text: "Podłącz swoją AI", destination: "/mcp#tutorial" }}
            className="inline-flex items-center justify-center gap-2 bg-white text-purple-700 hover:bg-gray-100 px-8 py-3.5 rounded-2xl font-semibold shadow-xl transition-all text-sm"
          >
            Podłącz swoją AI
            <ArrowRight className="h-4 w-4" />
          </TrackedLink>
        </div>
      </section>
    </div>
  );
}
