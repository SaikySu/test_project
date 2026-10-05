import React from 'react';
import { useGarden } from '../context/GardenContext';
import {
  BookMarked,
  Headphones,
  Gamepad2,
  Film,
  Sparkles,
  ArrowRight,
  Music,
} from 'lucide-react';

export const InterestsShowcase: React.FC = () => {
  const { language, setSelectedSubcategory, setSelectedCategory } = useGarden();

  const handleInterestClick = (sub: string) => {
    setSelectedCategory('interests');
    setSelectedSubcategory(sub);
  };

  return (
    <section className="my-8 p-6 rounded-2xl bg-stone-100/60 dark:bg-stone-900/50 border border-stone-200/80 dark:border-stone-800/80">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>☕</span>
            <span>{language === 'vi' ? 'Góc Sở Thích Cá Nhân' : 'Personal Curations'}</span>
          </h3>
          <p className="text-xs text-stone-500">
            {language === 'vi'
              ? 'Nơi lưu giữ những niềm say mê ngoài công việc nghiên cứu và kỹ thuật'
              : 'Passions, narratives, and creative pursuits beyond research'}
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedCategory('interests');
            setSelectedSubcategory('all');
          }}
          className="text-xs text-emerald-600 dark:text-emerald-400 font-mono hover:underline flex items-center gap-1"
        >
          <span>{language === 'vi' ? 'Xem toàn bộ' : 'View all'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {/* Novels */}
        <button
          onClick={() => handleInterestClick('novels')}
          className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 text-left hover:border-emerald-500/50 hover:shadow-xs transition-all group"
        >
          <BookMarked className="w-5 h-5 text-amber-600 mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100">
            {language === 'vi' ? 'Tiểu thuyết' : 'Novels'}
          </h4>
          <p className="text-[11px] text-stone-500 line-clamp-1">
            {language === 'vi' ? 'Tam Thể, Sci-Fi' : 'Sci-Fi & Fiction'}
          </p>
        </button>

        {/* Music */}
        <button
          onClick={() => handleInterestClick('music')}
          className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 text-left hover:border-emerald-500/50 hover:shadow-xs transition-all group"
        >
          <Headphones className="w-5 h-5 text-sky-600 mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100">
            {language === 'vi' ? 'Âm nhạc' : 'Music'}
          </h4>
          <p className="text-[11px] text-stone-500 line-clamp-1">
            {language === 'vi' ? 'Ambient, Richter' : 'Ambient & Flow'}
          </p>
        </button>

        {/* Video */}
        <button
          onClick={() => handleInterestClick('video')}
          className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 text-left hover:border-emerald-500/50 hover:shadow-xs transition-all group"
        >
          <Film className="w-5 h-5 text-rose-600 mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100">
            {language === 'vi' ? 'Video' : 'Videos'}
          </h4>
          <p className="text-[11px] text-stone-500 line-clamp-1">
            {language === 'vi' ? 'Phim tài liệu' : 'Documentaries'}
          </p>
        </button>

        {/* Game Ideas */}
        <button
          onClick={() => handleInterestClick('game_ideas')}
          className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 text-left hover:border-emerald-500/50 hover:shadow-xs transition-all group"
        >
          <Gamepad2 className="w-5 h-5 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100">
            {language === 'vi' ? 'Ý tưởng game' : 'Game Ideas'}
          </h4>
          <p className="text-[11px] text-stone-500 line-clamp-1">
            {language === 'vi' ? 'Sử Thi Aetheria' : 'Aetheria Chronicles'}
          </p>
        </button>

        {/* Blog */}
        <button
          onClick={() => handleInterestClick('blog')}
          className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 text-left hover:border-emerald-500/50 hover:shadow-xs transition-all group col-span-2 sm:col-span-1"
        >
          <Sparkles className="w-5 h-5 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100">
            {language === 'vi' ? 'Tản văn Blog' : 'Blog'}
          </h4>
          <p className="text-[11px] text-stone-500 line-clamp-1">
            {language === 'vi' ? 'Digital Gardening' : 'Garden manifesto'}
          </p>
        </button>
      </div>
    </section>
  );
};
