import React from 'react';
import { useGarden } from '../context/GardenContext';
import { getLocalizedText } from '../types/garden';
import { Tag, Sparkles, Filter, X, ArrowUpDown } from 'lucide-react';

export const CategoryNav: React.FC = () => {
  const {
    language,
    data,
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    selectedTag,
    setSelectedTag,
    allTags,
  } = useGarden();

  // Find subcategories based on current category selection
  const currentCategoryObj = data.categories.find((c) => c.id === selectedCategory);
  const availableSubcategories = currentCategoryObj
    ? currentCategoryObj.subcategories
    : data.categories.flatMap((c) => c.subcategories);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedSubcategory('all');
    setSelectedTag(null);
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedSubcategory !== 'all' ||
    selectedTag !== null;

  return (
    <div className="space-y-4 pt-6 pb-4">
      {/* Category Segmented Control (Interactive functional buttons) */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/80 dark:border-stone-800/80 pb-4">
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/60 dark:bg-stone-900 rounded-xl">
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedSubcategory('all');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              selectedCategory === 'all'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-2xs font-semibold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            {language === 'vi' ? 'Tất cả bài viết' : 'All Garden Notes'}
          </button>

          {data.categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSelectedSubcategory('all');
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  isSelected
                    ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-2xs font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                {getLocalizedText(cat.name, language)}
              </button>
            );
          })}
        </div>

        {/* Sort indicator & Reset button */}
        <div className="flex items-center gap-3 text-xs text-stone-500 font-mono">
          <div className="flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'vi' ? 'Mới nhất' : 'Newest first'}</span>
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>{language === 'vi' ? 'Xoá bộ lọc' : 'Clear filters'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Subcategory Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        <span className="text-stone-400 shrink-0 font-medium font-mono text-[11px]">
          {language === 'vi' ? 'Chủ đề:' : 'Topic:'}
        </span>

        <button
          onClick={() => setSelectedSubcategory('all')}
          className={`px-2.5 py-1 rounded-md transition-colors shrink-0 ${
            selectedSubcategory === 'all'
              ? 'bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 font-semibold'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900'
          }`}
        >
          {language === 'vi' ? 'Toàn bộ' : 'Everything'}
        </button>

        {availableSubcategories.map((sub) => {
          const isSelected = selectedSubcategory === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => setSelectedSubcategory(sub.id)}
              className={`px-2.5 py-1 rounded-md transition-colors shrink-0 ${
                isSelected
                  ? 'bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900'
              }`}
            >
              {getLocalizedText(sub.name, language)}
            </button>
          );
        })}
      </div>

      {/* Tag Cloud Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-stone-400 shrink-0 font-mono text-[11px] flex items-center gap-1">
          <Tag className="w-3 h-3 text-stone-400" />
          {language === 'vi' ? 'Thẻ tag:' : 'Tags:'}
        </span>

        {allTags.map(({ name, count }) => {
          const isSelected = selectedTag === name;
          return (
            <button
              key={name}
              onClick={() => setSelectedTag(isSelected ? null : name)}
              className={`shrink-0 font-mono transition-colors text-xs px-2 py-0.5 rounded ${
                isSelected
                  ? 'bg-emerald-600 text-white font-medium'
                  : 'text-stone-500 dark:text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-stone-100 dark:hover:bg-stone-900'
              }`}
            >
              #{name}
              <span className="opacity-60 text-[10px] ml-1">({count})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
