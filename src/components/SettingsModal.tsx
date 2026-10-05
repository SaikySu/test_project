import React from 'react';
import { useGarden } from '../context/GardenContext';
import {
  SlidersHorizontal,
  X,
  Globe,
  Sun,
  Moon,
  Eye,
  RotateCcw,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export const SettingsModal: React.FC = () => {
  const {
    isSettingsOpen,
    setIsSettingsOpen,
    language,
    setLanguage,
    theme,
    setTheme,
    stats,
    data,
  } = useGarden();

  if (!isSettingsOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Garden Settings"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 dark:bg-black/80 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
              {language === 'vi' ? 'Cài đặt Khu Vườn' : 'Garden Settings'}
            </h3>
          </div>
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content options */}
        <div className="p-6 space-y-6 text-sm">
          {/* 1. Language Preference */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 font-medium text-stone-900 dark:text-stone-100">
              <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{language === 'vi' ? 'Ngôn ngữ hiển thị' : 'Display Language'}</span>
            </label>
            <p className="text-xs text-stone-500">
              {language === 'vi'
                ? 'Chuyển đổi linh hoạt giữa Tiếng Việt và Tiếng Anh'
                : 'Seamlessly switch between Vietnamese and English'}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={() => setLanguage('vi')}
                className={`p-3 rounded-xl border text-left flex items-center justify-between transition-colors ${
                  language === 'vi'
                    ? 'border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold'
                    : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/60 text-stone-700 dark:text-stone-300'
                }`}
              >
                <div>
                  <p className="text-sm">Tiếng Việt</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">Vietnamese</p>
                </div>
                <span className="text-lg">🇻🇳</span>
              </button>

              <button
                onClick={() => setLanguage('en')}
                className={`p-3 rounded-xl border text-left flex items-center justify-between transition-colors ${
                  language === 'en'
                    ? 'border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold'
                    : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/60 text-stone-700 dark:text-stone-300'
                }`}
              >
                <div>
                  <p className="text-sm">English</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">Tiếng Anh</p>
                </div>
                <span className="text-lg">🇬🇧</span>
              </button>
            </div>
          </div>

          {/* 2. Appearance & Dark Mode */}
          <div className="space-y-2 pt-2 border-t border-stone-200 dark:border-stone-800">
            <label className="flex items-center gap-2 font-medium text-stone-900 dark:text-stone-100">
              <Sun className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{language === 'vi' ? 'Giao diện & Chế độ màu' : 'Theme & Color Scheme'}</span>
            </label>
            <p className="text-xs text-stone-500">
              {language === 'vi'
                ? 'Tối ưu độ tương phản cho trải nghiệm đọc lâu không mỏi mắt'
                : 'High-contrast typography tuned for focused reading'}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={() => setTheme('light')}
                className={`p-3 rounded-xl border flex items-center gap-3 transition-colors ${
                  theme === 'light'
                    ? 'border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold'
                    : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/60 text-stone-700 dark:text-stone-300'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-500" />
                <span>{language === 'vi' ? 'Giao diện Sáng' : 'Light Mode'}</span>
              </button>

              <button
                onClick={() => setTheme('dark')}
                className={`p-3 rounded-xl border flex items-center gap-3 transition-colors ${
                  theme === 'dark'
                    ? 'border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold'
                    : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/60 text-stone-700 dark:text-stone-300'
                }`}
              >
                <Moon className="w-4 h-4 text-indigo-400" />
                <span>{language === 'vi' ? 'Giao diện Tối' : 'Dark Mode'}</span>
              </button>
            </div>
          </div>

          {/* 3. Site Statistics Overview */}
          <div className="space-y-2 pt-2 border-t border-stone-200 dark:border-stone-800">
            <label className="flex items-center gap-2 font-medium text-stone-900 dark:text-stone-100">
              <Eye className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{language === 'vi' ? 'Thống kê lượng người ghé thăm' : 'Visit Analytics'}</span>
            </label>

            <div className="grid grid-cols-2 gap-3 p-3 bg-stone-100/70 dark:bg-stone-800/50 rounded-xl text-xs font-mono">
              <div>
                <p className="text-stone-500">{language === 'vi' ? 'Tổng lượt xem' : 'Total Pageviews'}</p>
                <p className="text-lg font-bold text-stone-900 dark:text-stone-100">
                  {stats.totalViews.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-stone-500">{language === 'vi' ? 'Khách ghé thăm' : 'Unique Visitors'}</p>
                <p className="text-lg font-bold text-stone-900 dark:text-stone-100">
                  {stats.uniqueVisitors.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 flex justify-end">
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
          >
            {language === 'vi' ? 'Hoàn tất' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};
