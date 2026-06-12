'use client';

import React from 'react';

function parseInline(text: string): React.ReactNode {
  // Process inline markdown: **bold**, *italic*, [text](url)
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Bold: **text**
    const boldMatch = remaining.match(/^([\s\S]*?)\*\*([\s\S]+?)\*\*([\s\S]*)/);
    // Italic: *text* (not **)
    const italicMatch = remaining.match(/^([\s\S]*?)\*([^*\n][\s\S]*?)\*(?!\*)([\s\S]*)/);
    // Link: [text](url)
    const linkMatch = remaining.match(/^([\s\S]*?)\[([^\]]+)\]\(([^)]+)\)([\s\S]*)/);

    const boldIdx = boldMatch ? boldMatch[1].length : Infinity;
    const italicIdx = italicMatch ? italicMatch[1].length : Infinity;
    const linkIdx = linkMatch ? linkMatch[1].length : Infinity;

    const minIdx = Math.min(boldIdx, italicIdx, linkIdx);

    if (minIdx === Infinity) {
      parts.push(remaining);
      break;
    }

    if (minIdx === boldIdx && boldMatch) {
      if (boldMatch[1]) parts.push(boldMatch[1]);
      parts.push(<strong key={key++}>{boldMatch[2]}</strong>);
      remaining = boldMatch[3];
    } else if (minIdx === linkIdx && linkMatch) {
      if (linkMatch[1]) parts.push(linkMatch[1]);
      parts.push(
        <a key={key++} href={linkMatch[3]} className="text-blue-600 hover:underline" target={linkMatch[3].startsWith('http') ? '_blank' : undefined} rel={linkMatch[3].startsWith('http') ? 'noopener noreferrer' : undefined}>
          {linkMatch[2]}
        </a>
      );
      remaining = linkMatch[4];
    } else if (minIdx === italicIdx && italicMatch) {
      if (italicMatch[1]) parts.push(italicMatch[1]);
      parts.push(<em key={key++}>{italicMatch[2]}</em>);
      remaining = italicMatch[3];
    } else {
      parts.push(remaining);
      break;
    }
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

export function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let keyCounter = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines
    if (line.trim() === '') {
      i++;
      continue;
    }

    // h2: ## Text
    if (line.startsWith('## ')) {
      elements.push(
        <h2
          key={keyCounter++}
          className="mt-12 scroll-mt-28 border-t border-black/5 pt-8 text-2xl font-semibold tracking-tight text-slate-950 dark:border-white/10 dark:text-white md:text-[1.85rem]"
        >
          {parseInline(line.slice(3))}
        </h2>
      );
      i++;
      continue;
    }

    // h3: ### Text
    if (line.startsWith('### ')) {
      elements.push(
        <h3
          key={keyCounter++}
          className="mt-8 text-xl font-semibold tracking-tight text-slate-950 dark:text-white"
        >
          {parseInline(line.slice(4))}
        </h3>
      );
      i++;
      continue;
    }

    // Blockquote: > Text
    if (line.startsWith('> ')) {
      elements.push(
        <div
          key={keyCounter++}
          className="mb-6 rounded-2xl border border-sky-200/80 bg-sky-50/80 px-5 py-4 text-[15px] leading-7 text-slate-700 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-slate-200"
        >
          {parseInline(line.slice(2))}
        </div>
      );
      i++;
      continue;
    }

    // Unordered list: - item
    if (line.startsWith('- ')) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(
          <li key={keyCounter++}>{parseInline(lines[i].slice(2))}</li>
        );
        i++;
      }
      elements.push(
        <ul
          key={keyCounter++}
          className="mb-6 list-disc space-y-3 pl-6 text-[16px] leading-8 text-slate-700 marker:text-sky-500 dark:text-slate-300"
        >
          {items}
        </ul>
      );
      continue;
    }

    // Ordered list: 1. item, 2. item, etc.
    if (/^\d+\.\s/.test(line)) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        const text = lines[i].replace(/^\d+\.\s/, '');
        items.push(
          <li key={keyCounter++}>{parseInline(text)}</li>
        );
        i++;
      }
      elements.push(
        <ol
          key={keyCounter++}
          className="mb-6 list-decimal space-y-3 pl-6 text-[16px] leading-8 text-slate-700 marker:font-semibold marker:text-sky-600 dark:text-slate-300 dark:marker:text-sky-300"
        >
          {items}
        </ol>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p
        key={keyCounter++}
        className="mb-5 text-[16px] leading-8 text-slate-700 dark:text-slate-300 md:text-[17px]"
      >
        {parseInline(line)}
      </p>
    );
    i++;
  }

  return <div className="text-pretty">{elements}</div>;
}
