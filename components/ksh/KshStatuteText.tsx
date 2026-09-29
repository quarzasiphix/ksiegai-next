import type { KshBlock, KshStatuteArticle } from '@/lib/ksh/types';

/**
 * Renders the official wording of a KSH article. Each § gets a stable anchor
 * (#par-1, #par-1-1 for § 1¹) so poradniki can deep-link to a paragraph.
 */
function Blocks({ blocks, depth }: { blocks: KshBlock[]; depth: number }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === 'text') {
          return (
            <p key={index} className="text-[15px] leading-7 text-slate-800 dark:text-slate-200">
              {block.text}
            </p>
          );
        }
        if (block.type === 'para') {
          return (
            <div
              key={index}
              id={`par-${block.symbol}`}
              className="scroll-mt-28 rounded-2xl px-3 py-2 target:bg-sky-100/70 dark:target:bg-sky-400/10"
            >
              <div className="flex gap-3">
                <a
                  href={`#par-${block.symbol}`}
                  className="shrink-0 pt-px font-semibold text-slate-950 hover:text-sky-700 dark:text-white dark:hover:text-sky-300"
                >
                  § {block.label}.
                </a>
                <div className="min-w-0 space-y-2">
                  <Blocks blocks={block.content} depth={depth + 1} />
                </div>
              </div>
            </div>
          );
        }
        const marker = block.type === 'tire' ? '–' : `${block.label})`;
        return (
          <div key={index} className="flex gap-2 pl-2">
            <span className="shrink-0 font-medium text-slate-600 dark:text-slate-300">{marker}</span>
            <div className="min-w-0 space-y-2">
              <Blocks blocks={block.content} depth={depth + 1} />
            </div>
          </div>
        );
      })}
    </>
  );
}

export function KshStatuteText({ article }: { article: KshStatuteArticle }) {
  return (
    <div className="space-y-2">
      <Blocks blocks={article.content} depth={0} />
      {article.footnotes.length ? (
        <div className="mt-4 space-y-2 rounded-2xl border border-amber-300/60 bg-amber-50/80 p-4 text-sm leading-6 text-amber-950 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-100">
          <div className="text-xs font-semibold uppercase tracking-[0.16em]">Przypis w tekście jednolitym</div>
          {article.footnotes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
}
