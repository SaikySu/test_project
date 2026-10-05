import React, { useState, useEffect, useRef } from 'react';
import { useGarden } from '../context/GardenContext';
import { Search, X, Calendar, ArrowRight, Tag, BookOpen } from 'lucide-react';
import { getLocalizedText } from '../types/garden';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    data,
    language,
    setActiveArticleId,
  } = useGarden();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  const filteredArticles = React.useMemo(() => {
    if (!query.trim()) {
      return (data.articles || []).slice(0, 6);
    }
    const q = query.toLowerCase().trim();
    return (data.articles || []).filter((art) => {
      const title = getLocalizedText(art.title, language).toLowerCase();
      const summary = getLocalizedText(art.summary, language).toLowerCase();
      const content = getLocalizedText(art.content, language).toLowerCase();
      const tags = (art.tags || []).map((t) => t.toLowerCase());

      return (
        title.includes(q) ||
        summary.includes(q) ||
        tags.some((t) => t.includes(q)) ||
        content.includes(q)
      );
    });
  }, [data.articles, query, language]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredArticles.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredArticles.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredArticles[selectedIndex]) {
        setActiveArticleId(filteredArticles[selectedIndex].id);
        setIsSearchOpen(false);
      }
    }
  };

  if (!isSearchOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-stone-900/60 dark:bg-black/80 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-stone-200 dark:border-stone-800 gap-3">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder={
              language === 'vi'
                ? 'Tìm kiếm theo từ khóa, thẻ tag, công thức KaTeX, tác giả...'
                : 'Search notes, tags, KaTeX formulas, projects...'
            }
            className="w-full bg-transparent text-stone-900 dark:text-stone-100 placeholder-stone-400 text-base focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-2 py-1 text-xs font-mono text-stone-500 bg-stone-100 dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700"
          >
            ESC
          </button>
        </div>

        {/* Results list */}
        <div className="overflow-y-auto p-2 divide-y divide-stone-100 dark:divide-stone-800/60 scrollbar-thin">
          {filteredArticles.length === 0 ? (
            <div className="py-12 text-center text-stone-500 dark:text-stone-400">
              <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30 stroke-1" />
              <p className="text-sm font-medium">
                {language === 'vi'
                  ? `Không tìm thấy ghi chú nào phù hợp với "${query}"`
                  : `No digital notes found matching "${query}"`}
              </p>
              <p className="text-xs text-stone-400 mt-1">
                {language === 'vi'
                  ? 'Thử tìm với các từ khóa: Quantum, Rust, Tam Thể, Ambient, Game'
                  : 'Try searching: Quantum, Rust, Sci-Fi, Ambient, Game'}
              </p>
            </div>
          ) : (
            filteredArticles.map((article, idx) => {
              const isSelected = idx === selectedIndex;
              const title = getLocalizedText(article.title, language);
              const summary = getLocalizedText(article.summary, language);

              return (
                <div
                  key={article.id}
                  onClick={() => {
                    setActiveArticleId(article.id);
                    setIsSearchOpen(false);
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3.5 rounded-xl cursor-pointer transition-all flex items-start justify-between gap-4 ${
                    isSelected
                      ? 'bg-emerald-500/10 dark:bg-emerald-500/15 text-stone-900 dark:text-stone-50'
                      : 'hover:bg-stone-100 dark:hover:bg-stone-800/60'
                  }`}
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                      <span className="font-mono">
                        {article.growthStage === 'seedling'
                          ? '🌱'
                          : article.growthStage === 'budding'
                          ? '🌿'
                          : '🌲'}
                      </span>
                      <span>{article.date}</span>
                      <span aria-hidden="true">·</span>
                      <span className="capitalize">{article.subcategory}</span>
                    </div>

                    <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 truncate">
                      {title}
                    </h4>

                    <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2">
                      {summary}
                    </p>

                    {/* Tags (Zero-pill text format) */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">
                      {article.tags.map((tag) => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 mt-2 shrink-0 transition-transform ${
                      isSelected
                        ? 'translate-x-1 text-emerald-600 dark:text-emerald-400'
                        : 'text-stone-300 dark:text-stone-600'
                    }`}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-stone-50 dark:bg-stone-950/80 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 bg-stone-200 dark:bg-stone-800 rounded text-[10px] font-mono">
                ↑↓
              </kbd>{' '}
              {language === 'vi' ? 'Điều hướng' : 'Navigate'}
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-stone-200 dark:bg-stone-800 rounded text-[10px] font-mono">
                ↵
              </kbd>{' '}
              {language === 'vi' ? 'Mở bài đọc' : 'Open note'}
            </span>
          </div>
          <span className="font-mono text-[11px]">
            {filteredArticles.length} {language === 'vi' ? 'kết quả' : 'results'}
          </span>
        </div>
      </div>
    </div>
  );
};
