import React from 'react';
import { Article, getLocalizedText } from '../types/garden';
import { useGarden } from '../context/GardenContext';
import { Calendar, Clock, Eye, MessageSquare, ArrowUpRight, Play } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const { language, stats, comments, setActiveArticleId, setSelectedTag } = useGarden();

  const title = getLocalizedText(article.title, language);
  const summary = getLocalizedText(article.summary, language);
  const articleViews = stats.postViews?.[article.id] || 0;
  const articleComments = comments.filter((c) => c.slug === article.id);

  // Growth Stage Indicator icon & label
  const stageDetails = {
    seedling: { icon: '🌱', label: language === 'vi' ? 'Gieo mầm' : 'Seedling' },
    budding: { icon: '🌿', label: language === 'vi' ? 'Chồi non' : 'Budding' },
    evergreen: { icon: '🌲', label: language === 'vi' ? 'Bền vững' : 'Evergreen' },
  }[article.growthStage];

  return (
    <article
      onClick={() => setActiveArticleId(article.id)}
      className="group relative flex flex-col md:flex-row gap-5 p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white/70 dark:bg-stone-900/40 hover:bg-white dark:hover:bg-stone-900/80 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md"
    >
      {/* Illustrated Cover Image */}
      <div className="relative md:w-64 h-48 md:h-auto shrink-0 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200/60 dark:border-stone-800">
        <img
          src={article.coverImage}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {article.videoUrl && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center backdrop-blur-2xs">
            <div className="w-10 h-10 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-4 h-4 fill-stone-900 ml-0.5" />
            </div>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="flex-1 flex flex-col justify-between space-y-3 min-w-0">
        <div className="space-y-2">
          {/* Metadata Bar (Zero-pill typographic style) */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-stone-500 dark:text-stone-400 font-mono">
            <span title={stageDetails.label} className="flex items-center gap-1 text-stone-700 dark:text-stone-300">
              <span>{stageDetails.icon}</span>
              <span className="capitalize">{stageDetails.label}</span>
            </span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.date} className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{article.date}</span>
            </time>
            {article.readTime && (
              <>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTime}</span>
                </span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span className="capitalize text-emerald-700 dark:text-emerald-400 font-medium">
              {article.subcategory.replace('_', ' ')}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold font-serif text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors leading-snug line-clamp-2">
            {title}
          </h3>

          {/* Summary */}
          <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
            {summary}
          </p>
        </div>

        {/* Footer: Tags and Stats */}
        <div className="pt-2 border-t border-stone-100 dark:border-stone-800/60 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Tags list (No static pill enclosures - clean unboxed typography) */}
          <div
            className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-stone-500 dark:text-stone-400 font-mono text-[11px]"
            onClick={(e) => e.stopPropagation()}
          >
            {article.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* Article Engagement Metrics (Page Views & Comments) */}
          <div className="flex items-center gap-3 text-stone-400 dark:text-stone-500 font-mono text-[11px]">
            <span className="flex items-center gap-1" title="Lượt đọc ghi chú">
              <Eye className="w-3.5 h-3.5" />
              <span>{articleViews}</span>
            </span>
            <span className="flex items-center gap-1" title="Bình luận">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{articleComments.length}</span>
            </span>
            <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </article>
  );
};
