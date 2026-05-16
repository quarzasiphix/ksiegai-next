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
        <h2 key={keyCounter++} className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
          {parseInline(line.slice(3))}
        </h2>
      );
      i++;
      continue;
    }

    // h3: ### Text
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={keyCounter++} className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">
          {parseInline(line.slice(4))}
        </h3>
      );
      i++;
      continue;
    }

    // Blockquote: > Text
    if (line.startsWith('> ')) {
      elements.push(
        <div key={keyCounter++} className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-gray-700 dark:text-gray-300 mb-4">
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
        <ul key={keyCounter++} className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
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
        <ol key={keyCounter++} className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
          {items}
        </ol>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={keyCounter++} className="text-gray-700 dark:text-gray-300 mb-4">
        {parseInline(line)}
      </p>
    );
    i++;
  }

  return <div>{elements}</div>;
}
