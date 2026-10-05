import React from 'react';
import { GardenProvider, useGarden } from './context/GardenContext';
import { Navbar } from './components/Navbar';
import { HeroProfile } from './components/HeroProfile';
import { CategoryNav } from './components/CategoryNav';
import { ArticleCard } from './components/ArticleCard';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { SearchModal } from './components/SearchModal';
import { YamlManagerModal } from './components/YamlManagerModal';
import { SettingsModal } from './components/SettingsModal';
import { InterestsShowcase } from './components/InterestsShowcase';
import { getLocalizedText } from './types/garden';
import { Sprout, FileCode2, Sparkles, BookOpen } from 'lucide-react';

const GardenMain: React.FC = () => {
  const {
    data,
    language,
    selectedCategory,
    selectedSubcategory,
    selectedTag,
    activeArticle,
    stats,
    downloadYamlFile,
    setIsYamlModalOpen,
  } = useGarden();

  // Filter and sort articles (newest first)
  const filteredArticles = React.useMemo(() => {
    let list = [...(data.articles || [])];

    // Filter by Category
    if (selectedCategory !== 'all') {
      list = list.filter((a) => a.category === selectedCategory);
    }

    // Filter by Subcategory
    if (selectedSubcategory !== 'all') {
      list = list.filter((a) => a.subcategory === selectedSubcategory);
    }

    // Filter by Tag
    if (selectedTag) {
      list = list.filter((a) => a.tags?.includes(selectedTag));
    }

    // Sort by publication date descending (newest first)
    list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return list;
  }, [data.articles, selectedCategory, selectedSubcategory, selectedTag]);

  // If reading an article, render full reading mode
  if (activeArticle) {
    return (
      <>
        <ArticleDetailModal />
        <SearchModal />
        <YamlManagerModal />
        <SettingsModal />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6">
        {/* Author & Garden Profile Header */}
        <HeroProfile />

        {/* Interests Showcase (Novels, Music, Videos, Blog, Game Ideas) */}
        <InterestsShowcase />

        {/* Navigation & Tag Filtering */}
        <CategoryNav />

        {/* Articles List */}
        <section className="py-6 space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-500 font-mono pb-2">
            <span>
              {language === 'vi'
                ? `Hiển thị ${filteredArticles.length} bài viết`
                : `Showing ${filteredArticles.length} notes`}
            </span>
            <span>{language === 'vi' ? 'Sắp xếp: Ngày mới nhất' : 'Sorted: Newest date'}</span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="py-16 text-center rounded-2xl border border-dashed border-stone-300 dark:border-stone-800 bg-white/50 dark:bg-stone-900/30">
              <BookOpen className="w-10 h-10 mx-auto text-stone-400 mb-3 stroke-1" />
              <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                {language === 'vi'
                  ? 'Không tìm thấy bài viết nào theo bộ lọc này'
                  : 'No digital notes found matching this filter'}
              </p>
              <p className="text-xs text-stone-500 mt-1">
                {language === 'vi'
                  ? 'Hãy thử chọn chủ đề khác hoặc bấm "Xoá bộ lọc" để xem toàn bộ khu vườn.'
                  : 'Try selecting a different topic or click "Clear filters".'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-stone-200/80 dark:border-stone-800/80 py-10 bg-white/40 dark:bg-stone-900/30 text-xs text-stone-500 font-mono">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>🌱</span>
            <span className="font-serif font-bold text-stone-800 dark:text-stone-200">
              {language === 'vi' ? 'Khu Vườn Số' : 'Digital Garden'}
            </span>
            <span>—</span>
            <span>Astro & Tailwind & KaTeX Architecture</span>
          </div>

          <div className="flex items-center gap-4">
            <span title="Lượt ghé thăm">
              {stats.totalViews.toLocaleString()} {language === 'vi' ? 'lượt truy cập' : 'total visits'}
            </span>
            <span>·</span>
            <button
              onClick={() => setIsYamlModalOpen(true)}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              content.yaml
            </button>
            <span>·</span>
            <button
              onClick={downloadYamlFile}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              {language === 'vi' ? 'Tải tệp .yaml' : 'Download .yaml'}
            </button>
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <SearchModal />
      <YamlManagerModal />
      <SettingsModal />
    </div>
  );
};

export default function App() {
  return (
    <GardenProvider>
      <GardenMain />
    </GardenProvider>
  );
}
