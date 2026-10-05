import React, { useState, useEffect, useRef } from 'react';
import { useGarden } from '../context/GardenContext';
import { getLocalizedText } from '../types/garden';
import { MarkdownRenderer, VideoEmbed } from '../utils/markdownRenderer';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  MessageSquare,
  Share2,
  Check,
  Send,
  User,
  Tag,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const ArticleDetailModal: React.FC = () => {
  const {
    activeArticle,
    setActiveArticleId,
    language,
    stats,
    comments,
    addComment,
    setSelectedTag,
  } = useGarden();

  // Comment input form states
  const [commentName, setCommentName] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll to top when article opens
  useEffect(() => {
    if (activeArticle) {
      window.scrollTo({ top: 0, behavior: 'instant' as any });
      // Reset reading progress
      setReadingProgress(0);
    }
  }, [activeArticle]);

  // Track reading scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const el = contentRef.current;
      const totalHeight = el.clientHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeArticle]);

  if (!activeArticle) return null;

  const title = getLocalizedText(activeArticle.title, language);
  const summary = getLocalizedText(activeArticle.summary, language);
  const content = getLocalizedText(activeArticle.content, language);
  const articleViews = stats.postViews?.[activeArticle.id] || 0;
  const articleComments = comments.filter((c) => c.slug === activeArticle.id);

  // Growth Stage info
  const stageInfo = {
    seedling: { icon: '🌱', label: language === 'vi' ? 'Gieo mầm (Seedling)' : 'Seedling stage' },
    budding: { icon: '🌿', label: language === 'vi' ? 'Chồi non (Budding)' : 'Budding stage' },
    evergreen: { icon: '🌲', label: language === 'vi' ? 'Bền vững (Evergreen)' : 'Evergreen note' },
  }[activeArticle.growthStage];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentContent.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const success = await addComment(
      activeArticle.id,
      commentName.trim(),
      commentContent.trim()
    );
    setIsSubmitting(false);

    if (success) {
      setCommentContent('');
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    }
  };

  return (
    <div ref={contentRef} className="min-h-screen pb-24 bg-stone-50 dark:bg-stone-950 transition-colors">
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 z-50 transition-all duration-150 ease-out"
        style={{ width: `${readingProgress}%` }}
      />

      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-20 backdrop-blur-md bg-stone-50/90 dark:bg-stone-950/90 border-b border-stone-200/80 dark:border-stone-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => setActiveArticleId(null)}
            className="flex items-center gap-2 text-xs sm:text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'vi' ? 'Quay lại Khu Vườn' : 'Back to Garden'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 transition-colors"
              title="Sao chép liên kết bài viết"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? (language === 'vi' ? 'Đã sao chép' : 'Copied link') : (language === 'vi' ? 'Chia sẻ' : 'Share')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Article Body */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        {/* Article Header Meta */}
        <header className="space-y-4 pb-8 border-b border-stone-200 dark:border-stone-800">
          {/* Metadata Row (Zero-pill typographic style) */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500 dark:text-stone-400 font-mono">
            <span className="flex items-center gap-1 text-stone-700 dark:text-stone-300 font-medium">
              <span>{stageInfo.icon}</span>
              <span>{stageInfo.label}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{activeArticle.date}</span>
            </span>
            {activeArticle.readTime && (
              <>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{activeArticle.readTime}</span>
                </span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
              <Eye className="w-3.5 h-3.5" />
              <span>{articleViews} {language === 'vi' ? 'lượt đọc' : 'reads'}</span>
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
            {title}
          </h1>

          {/* Abstract / Summary */}
          <div className="p-4 rounded-xl bg-stone-100/70 dark:bg-stone-900/60 border-l-4 border-emerald-500 text-sm sm:text-base text-stone-700 dark:text-stone-300 italic leading-relaxed">
            <span className="font-semibold not-italic font-mono text-xs uppercase tracking-wider block text-emerald-700 dark:text-emerald-400 mb-1">
              {language === 'vi' ? 'Tóm tắt nội dung' : 'Abstract & Summary'}
            </span>
            {summary}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs text-emerald-700 dark:text-emerald-400">
            {activeArticle.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSelectedTag(tag);
                  setActiveArticleId(null);
                }}
                className="hover:underline"
              >
                #{tag}
              </button>
            ))}
          </div>
        </header>

        {/* Hero Illustrated Media / Cover Image */}
        <div className="my-8 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-md">
          <img
            src={activeArticle.coverImage}
            alt={title}
            className="w-full max-h-[500px] object-cover"
          />
        </div>

        {/* Embedded Video (if provided) */}
        {activeArticle.videoUrl && (
          <div className="my-8 space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <span>🎬</span>
              <span>{language === 'vi' ? 'Video đính kèm' : 'Attached Video Player'}</span>
            </span>
            <VideoEmbed url={activeArticle.videoUrl} />
          </div>
        )}

        {/* Formatted Markdown & KaTeX Content */}
        <div className="py-6">
          <MarkdownRenderer
            content={content}
            onWikilinkClick={(slug) => {
              const target = stats.postViews?.[slug] !== undefined;
              if (target) setActiveArticleId(slug);
            }}
          />
        </div>

        {/* Additional Attachments Gallery (if any) */}
        {activeArticle.attachments && activeArticle.attachments.length > 0 && (
          <div className="my-10 space-y-4 pt-6 border-t border-stone-200 dark:border-stone-800">
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
              {language === 'vi' ? 'Tài liệu và hình ảnh đính kèm' : 'Attachments & Figures'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeArticle.attachments.map((att, index) => (
                <figure key={index} className="rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
                  <img src={att.url} alt="Attachment" className="w-full h-48 object-cover" />
                  {att.caption && (
                    <figcaption className="p-3 text-xs text-stone-500 text-center italic">
                      {getLocalizedText(att.caption, language)}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* COMMENTS SECTION (Tên, Bình Luận theo yêu cầu đề bài)     */}
        {/* ========================================================= */}
        <section className="mt-16 pt-10 border-t border-stone-200 dark:border-stone-800 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
                {language === 'vi' ? 'Bình luận & Thảo luận' : 'Reader Comments & Discussions'}
              </h3>
            </div>
            <span className="font-mono text-xs text-stone-500">
              {articleComments.length} {language === 'vi' ? 'ý kiến' : 'comments'}
            </span>
          </div>

          {/* New Comment Submission Form */}
          <form
            onSubmit={handleCommentSubmit}
            className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4"
          >
            <h4 className="text-sm font-semibold text-stone-800 dark:text-stone-200">
              {language === 'vi' ? 'Để lại bình luận của bạn' : 'Leave your comment'}
            </h4>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                  {language === 'vi' ? 'Tên của bạn *' : 'Your Name *'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    placeholder={
                      language === 'vi'
                        ? 'Ví dụ: Nguyễn Văn An, Độc giả Hà Nội...'
                        : 'e.g., Alex Walker, Researcher...'
                    }
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                  {language === 'vi' ? 'Nội dung bình luận *' : 'Your Comment *'}
                </label>
                <textarea
                  required
                  rows={3}
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder={
                    language === 'vi'
                      ? 'Chia sẻ suy nghĩ, câu hỏi hoặc đóng góp ý kiến về bài viết...'
                      : 'Share your perspective, feedback or questions on this note...'
                  }
                  className="w-full p-3 text-sm rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-emerald-500 resize-y"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-stone-400">
                {submitSuccess && (
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    {language === 'vi' ? 'Đã gửi bình luận thành công!' : 'Comment posted successfully!'}
                  </span>
                )}
              </span>

              <button
                type="submit"
                disabled={isSubmitting || !commentName.trim() || !commentContent.trim()}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>
                  {isSubmitting
                    ? (language === 'vi' ? 'Đang gửi...' : 'Posting...')
                    : (language === 'vi' ? 'Gửi bình luận' : 'Post Comment')}
                </span>
              </button>
            </div>
          </form>

          {/* List of Comments */}
          <div className="space-y-4">
            {articleComments.length === 0 ? (
              <div className="p-8 text-center text-sm text-stone-500 dark:text-stone-400 bg-stone-100/50 dark:bg-stone-900/40 rounded-xl">
                {language === 'vi'
                  ? 'Chưa có bình luận nào. Hãy là người đầu tiên gieo mầm thảo luận!'
                  : 'No comments yet. Be the first to start a conversation!'}
              </div>
            ) : (
              articleComments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-xs uppercase">
                        {comment.name.slice(0, 1)}
                      </div>
                      <span className="font-semibold text-sm text-stone-900 dark:text-stone-100">
                        {comment.name}
                      </span>
                    </div>
                    <time className="text-[11px] font-mono text-stone-400">
                      {new Date(comment.createdAt).toLocaleDateString(
                        language === 'vi' ? 'vi-VN' : 'en-US',
                        { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
                      )}
                    </time>
                  </div>
                  <p className="text-sm text-stone-700 dark:text-stone-300 pl-9 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};
