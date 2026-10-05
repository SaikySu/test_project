import React, { useState } from 'react';
import katex from 'katex';
import { Copy, Check, ExternalLink, Play } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
  onWikilinkClick?: (slug: string) => void;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  onWikilinkClick,
}) => {
  // Pre-process LaTeX equations to avoid markdown conflict
  // We can parse line-by-line or section-by-section
  const elements = parseMarkdownBlocks(content, onWikilinkClick);
  return <div className="markdown-body space-y-5 leading-relaxed text-stone-700 dark:text-stone-300 font-normal">{elements}</div>;
};

// Helper component for Code Block with copy button
const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-5 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-900 text-stone-100 overflow-hidden text-sm font-mono shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 border-b border-stone-800 bg-stone-950/60 text-xs text-stone-400">
        <span className="font-semibold uppercase tracking-wider">{language || 'text'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded text-stone-400 hover:text-stone-100 hover:bg-stone-800/80 transition-colors"
          title="Copy code"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Đã sao chép' : 'Sao chép'}</span>
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-[13px] leading-6 scrollbar-thin">
        <code>{code}</code>
      </pre>
    </div>
  );
};

// Helper component for KaTeX display math block
const MathBlock: React.FC<{ math: string }> = ({ math }) => {
  let html = '';
  try {
    html = katex.renderToString(math.trim(), {
      displayMode: true,
      throwOnError: false,
      output: 'htmlAndMathml',
    });
  } catch (err: any) {
    html = `<span class="text-rose-500 font-mono text-sm">${err.message}</span>`;
  }

  return (
    <div
      className="my-5 p-4 rounded-lg bg-stone-100/70 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800/80 overflow-x-auto text-center"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

// Inline parser for bold, italic, inline math ($...$), code, links
export function renderInlineFormatted(
  text: string,
  onWikilinkClick?: (slug: string) => void
): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let remaining = text;
  let keyIndex = 0;

  while (remaining.length > 0) {
    // 1. Wikilinks: [[slug|title]] or [[slug]]
    const wikiMatch = remaining.match(/^\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/);
    if (wikiMatch) {
      const slug = wikiMatch[1].trim();
      const title = wikiMatch[2]?.trim() || slug;
      nodes.push(
        <button
          key={`wiki-${keyIndex++}`}
          onClick={() => onWikilinkClick?.(slug)}
          className="inline-flex items-center text-emerald-600 dark:text-emerald-400 underline underline-offset-4 decoration-emerald-500/40 hover:decoration-emerald-500 font-medium hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
        >
          {title}
        </button>
      );
      remaining = remaining.slice(wikiMatch[0].length);
      continue;
    }

    // 2. Inline KaTeX Math: $math$ (non-greedy, no leading/trailing spaces)
    const mathMatch = remaining.match(/^\$([^$\n]+?)\$/);
    if (mathMatch) {
      const mathCode = mathMatch[1];
      let html = '';
      try {
        html = katex.renderToString(mathCode, {
          displayMode: false,
          throwOnError: false,
        });
      } catch {
        html = `<span class="text-rose-500 font-mono">${mathCode}</span>`;
      }
      nodes.push(
        <span
          key={`math-inline-${keyIndex++}`}
          className="inline-block px-1 align-baseline text-stone-900 dark:text-stone-100"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
      remaining = remaining.slice(mathMatch[0].length);
      continue;
    }

    // 3. Inline Code: `code`
    const codeMatch = remaining.match(/^`([^`]+)`/);
    if (codeMatch) {
      nodes.push(
        <code
          key={`code-inline-${keyIndex++}`}
          className="px-1.5 py-0.5 mx-0.5 rounded text-xs font-mono bg-stone-100 dark:bg-stone-800 text-emerald-700 dark:text-emerald-300 border border-stone-200 dark:border-stone-700"
        >
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    // 4. Markdown links: [title](url)
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      const title = linkMatch[1];
      const url = linkMatch[2];
      const isExternal = url.startsWith('http');
      nodes.push(
        <a
          key={`link-${keyIndex++}`}
          href={url}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 underline underline-offset-4 decoration-emerald-500/40 hover:decoration-emerald-500 transition-colors"
        >
          <span>{title}</span>
          {isExternal && <ExternalLink className="w-3 h-3 opacity-70" />}
        </a>
      );
      remaining = remaining.slice(linkMatch[0].length);
      continue;
    }

    // 5. Bold: **text**
    const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);
    if (boldMatch) {
      nodes.push(
        <strong key={`bold-${keyIndex++}`} className="font-semibold text-stone-900 dark:text-stone-100">
          {renderInlineFormatted(boldMatch[1], onWikilinkClick)}
        </strong>
      );
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    // 6. Italic: *text* or _text_
    const italicMatch = remaining.match(/^(\*|_)([^*_]+)\1/);
    if (italicMatch) {
      nodes.push(
        <em key={`italic-${keyIndex++}`} className="italic text-stone-800 dark:text-stone-200">
          {renderInlineFormatted(italicMatch[2], onWikilinkClick)}
        </em>
      );
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }

    // 7. Regular character chunk until next special delimiter
    const nextSpecial = remaining.search(/(\[\[|\$|`|\[|\*\*|\*|_)/);
    if (nextSpecial === -1) {
      nodes.push(remaining);
      break;
    } else if (nextSpecial === 0) {
      // First character is a delimiter that didn't match the regex patterns above
      nodes.push(remaining[0]);
      remaining = remaining.slice(1);
    } else {
      nodes.push(remaining.slice(0, nextSpecial));
      remaining = remaining.slice(nextSpecial);
    }
  }

  return nodes;
}

// Block parser for markdown text
function parseMarkdownBlocks(
  markdown: string,
  onWikilinkClick?: (slug: string) => void
): React.ReactNode[] {
  const blocks: React.ReactNode[] = [];
  const lines = markdown.split(/\r?\n/);
  let i = 0;
  let blockKey = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Empty lines
    if (line.trim() === '') {
      i++;
      continue;
    }

    // 1. Multi-line KaTeX display block: $$ ... $$
    if (line.trim().startsWith('$$')) {
      let mathContent = '';
      if (line.trim() === '$$') {
        i++;
        while (i < lines.length && lines[i].trim() !== '$$') {
          mathContent += (mathContent ? '\n' : '') + lines[i];
          i++;
        }
        i++; // skip closing $$
      } else {
        // Single-line $$math$$
        const match = line.match(/\$\$(.*?)\$\$/);
        if (match) {
          mathContent = match[1];
          i++;
        } else {
          // starts with $$ and ends in later line
          mathContent = line.replace(/^\$\$/, '');
          i++;
          while (i < lines.length && !lines[i].includes('$$')) {
            mathContent += '\n' + lines[i];
            i++;
          }
          if (i < lines.length) {
            mathContent += '\n' + lines[i].replace(/\$\$.*$/, '');
            i++;
          }
        }
      }
      blocks.push(<MathBlock key={`math-${blockKey++}`} math={mathContent} />);
      continue;
    }

    // 2. Code Block: ```lang
    if (line.trim().startsWith('```')) {
      const language = line.trim().replace(/^```/, '').trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      blocks.push(
        <CodeBlock
          key={`code-${blockKey++}`}
          code={codeLines.join('\n')}
          language={language}
        />
      );
      continue;
    }

    // 3. Headings
    if (line.startsWith('#### ')) {
      blocks.push(
        <h4
          key={`h4-${blockKey++}`}
          className="text-base font-semibold text-stone-900 dark:text-stone-100 tracking-tight pt-3"
        >
          {renderInlineFormatted(line.slice(5), onWikilinkClick)}
        </h4>
      );
      i++;
      continue;
    }
    if (line.startsWith('### ')) {
      blocks.push(
        <h3
          key={`h3-${blockKey++}`}
          className="text-lg font-semibold text-stone-900 dark:text-stone-100 tracking-tight pt-4 border-b border-stone-200/50 dark:border-stone-800/50 pb-1"
        >
          {renderInlineFormatted(line.slice(4), onWikilinkClick)}
        </h3>
      );
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      blocks.push(
        <h2
          key={`h2-${blockKey++}`}
          className="text-xl font-bold text-stone-950 dark:text-stone-50 tracking-tight pt-6 border-b border-stone-200 dark:border-stone-800 pb-2"
        >
          {renderInlineFormatted(line.slice(3), onWikilinkClick)}
        </h2>
      );
      i++;
      continue;
    }
    if (line.startsWith('# ')) {
      blocks.push(
        <h1
          key={`h1-${blockKey++}`}
          className="text-2xl font-bold text-stone-950 dark:text-stone-50 tracking-tight pt-6 border-b border-stone-200 dark:border-stone-800 pb-2"
        >
          {renderInlineFormatted(line.slice(2), onWikilinkClick)}
        </h1>
      );
      i++;
      continue;
    }

    // 4. Blockquotes: > quote
    if (line.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('>')) {
        quoteLines.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      blocks.push(
        <blockquote
          key={`quote-${blockKey++}`}
          className="pl-4 py-2 border-l-2 border-emerald-500/70 bg-stone-100/50 dark:bg-stone-900/40 rounded-r-lg my-4 italic text-stone-800 dark:text-stone-200 text-sm md:text-base leading-relaxed"
        >
          {quoteLines.map((ql, idx) => (
            <p key={idx} className="my-1">
              {renderInlineFormatted(ql, onWikilinkClick)}
            </p>
          ))}
        </blockquote>
      );
      continue;
    }

    // 5. Unordered List: - or *
    if (/^\s*[-*]\s+/.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\s*[-*]\s+/, ''));
        i++;
      }
      blocks.push(
        <ul key={`ul-${blockKey++}`} className="list-disc pl-6 space-y-1.5 my-3">
          {listItems.map((item, idx) => (
            <li key={idx} className="text-stone-700 dark:text-stone-300">
              {renderInlineFormatted(item, onWikilinkClick)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // 6. Ordered List: 1. or 2.
    if (/^\s*\d+\.\s+/.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\s*\d+\.\s+/, ''));
        i++;
      }
      blocks.push(
        <ol key={`ol-${blockKey++}`} className="list-decimal pl-6 space-y-1.5 my-3">
          {listItems.map((item, idx) => (
            <li key={idx} className="text-stone-700 dark:text-stone-300">
              {renderInlineFormatted(item, onWikilinkClick)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // 7. Image syntax: ![alt](url)
    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      const alt = imgMatch[1];
      const src = imgMatch[2];
      blocks.push(
        <figure key={`img-${blockKey++}`} className="my-6">
          <img
            src={src}
            alt={alt}
            className="w-full max-h-[480px] object-cover rounded-lg border border-stone-200 dark:border-stone-800 shadow-sm"
          />
          {alt && (
            <figcaption className="mt-2 text-center text-xs text-stone-500 dark:text-stone-400 italic">
              {alt}
            </figcaption>
          )}
        </figure>
      );
      i++;
      continue;
    }

    // 8. Horizontal rule: --- or ***
    if (/^(\*\*\*|---|___)$/.test(line.trim())) {
      blocks.push(
        <hr
          key={`hr-${blockKey++}`}
          className="my-6 border-t border-stone-200 dark:border-stone-800"
        />
      );
      i++;
      continue;
    }

    // 9. Standard Paragraph (gather consecutive lines until an empty line or block starter)
    const pLines: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('#') &&
      !lines[i].startsWith('$$') &&
      !lines[i].startsWith('```') &&
      !lines[i].startsWith('>') &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !lines[i].match(/^!\[([^\]]*)\]\(([^)]+)\)$/) &&
      !/^(\*\*\*|---|___)$/.test(lines[i].trim())
    ) {
      pLines.push(lines[i]);
      i++;
    }

    blocks.push(
      <p key={`p-${blockKey++}`} className="leading-relaxed text-stone-700 dark:text-stone-300">
        {renderInlineFormatted(pLines.join(' '), onWikilinkClick)}
      </p>
    );
  }

  return blocks;
}

// Video Embed Helper
export const VideoEmbed: React.FC<{ url: string }> = ({ url }) => {
  // Check for YouTube
  const youtubeMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (youtubeMatch) {
    const videoId = youtubeMatch[1];
    return (
      <div className="relative my-6 aspect-video rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-md bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Video Player"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  // HTML5 Video
  return (
    <div className="relative my-6 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-md bg-black">
      <video src={url} controls className="w-full max-h-[480px] object-cover" />
    </div>
  );
};
