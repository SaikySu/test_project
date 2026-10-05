import React from 'react';
import { useGarden } from '../context/GardenContext';
import {
  Search,
  Moon,
  Sun,
  FileCode2,
  Eye,
  SlidersHorizontal,
  Compass,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    language,
    toggleLanguage,
    theme,
    toggleTheme,
    stats,
    setIsSearchOpen,
    setIsYamlModalOpen,
    setIsSettingsOpen,
    setSelectedCategory,
    setSelectedSubcategory,
    setSelectedTag,
  } = useGarden();

  const handleNavClick = (cat: string, sub?: string) => {
    setSelectedCategory(cat);
    if (sub) setSelectedSubcategory(sub);
    else setSelectedSubcategory('all');
    setSelectedTag(null);
  };

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-stone-50/90 dark:bg-stone-950/90 border-b border-stone-200/80 dark:border-stone-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand & Sprout */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => handleNavClick('all')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-base transition-transform group-hover:scale-105 border border-emerald-500/20">
              🌱
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-tight text-stone-900 dark:text-stone-100 block leading-tight">
                {language === 'vi' ? 'Khu Vườn Số' : 'Digital Garden'}
              </span>
              <span className="text-[11px] text-stone-500 dark:text-stone-400 block font-mono">
                {language === 'vi' ? 'Gieo mầm · Tích luỹ tri thức' : 'Cultivating digital thoughts'}
              </span>
            </div>
          </button>

          {/* Quick Nav Categories */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => handleNavClick('work_research')}
              className="px-3 py-1.5 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/50 dark:hover:bg-stone-900 rounded-md transition-colors"
            >
              {language === 'vi' ? 'Làm việc & Nghiên cứu' : 'Work & Research'}
            </button>
            <button
              onClick={() => handleNavClick('interests')}
              className="px-3 py-1.5 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/50 dark:hover:bg-stone-900 rounded-md transition-colors"
            >
              {language === 'vi' ? 'Sở thích cá nhân' : 'Personal Interests'}
            </button>
          </nav>
        </div>

        {/* Right Section: Visitor Counter, Search, Language, Theme, YAML */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Visitor Counter badge */}
          <div
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono text-stone-600 dark:text-stone-300 bg-stone-200/60 dark:bg-stone-900 border border-stone-300/60 dark:border-stone-800"
            title={language === 'vi' ? 'Tổng số lượt ghé thăm trang web' : 'Total page visits'}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Eye className="w-3.5 h-3.5 text-stone-500" />
            <span className="font-semibold text-stone-900 dark:text-stone-100">
              {stats.totalViews.toLocaleString()}
            </span>
            <span className="text-[11px] text-stone-500 dark:text-stone-400 hidden lg:inline">
              {language === 'vi' ? 'lượt xem' : 'visits'}
            </span>
          </div>

          {/* Search Trigger Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-emerald-500/50 hover:text-stone-900 dark:hover:text-stone-100 transition-colors shadow-2xs"
            title={language === 'vi' ? 'Tìm kiếm nhanh (Ctrl+K)' : 'Quick search (Cmd+K)'}
          >
            <Search className="w-4 h-4 text-stone-400" />
            <span className="hidden sm:inline text-xs">
              {language === 'vi' ? 'Tìm kiếm...' : 'Search garden...'}
            </span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-stone-500 dark:text-stone-400 bg-stone-200/80 dark:bg-stone-800 rounded border border-stone-300 dark:border-stone-700">
              ⌘K
            </kbd>
          </button>

          {/* YAML Backend Data Manager */}
          <button
            onClick={() => setIsYamlModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
            title={language === 'vi' ? 'Xem & Tải file cấu hình .yaml từ backend' : 'Inspect & Download backend .yaml'}
          >
            <FileCode2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden md:inline">.yaml</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center justify-center px-2 py-1 rounded-lg text-xs font-mono font-semibold tracking-wider text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
            title={language === 'vi' ? 'Chuyển sang Tiếng Anh' : 'Switch to Vietnamese'}
          >
            {language === 'vi' ? 'VI' : 'EN'}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
            title={theme === 'dark' ? 'Chế độ sáng' : 'Chế độ tối'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
          </button>

          {/* Settings Modal Button */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 rounded-lg text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
            title={language === 'vi' ? 'Cài đặt giao diện & thông tin' : 'Garden Settings'}
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
