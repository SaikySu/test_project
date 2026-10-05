import React from 'react';
import { useGarden } from '../context/GardenContext';
import { getLocalizedText } from '../types/garden';
import {
  FileCode,
  Download,
  Github,
  Mail,
  GraduationCap,
  Sparkles,
  Layers,
  Sprout,
  TreePine,
  Wheat,
} from 'lucide-react';

export const HeroProfile: React.FC = () => {
  const {
    data,
    language,
    setIsYamlModalOpen,
    downloadYamlFile,
    setSelectedCategory,
    setSelectedSubcategory,
  } = useGarden();

  const profile = data.profile;
  const title = getLocalizedText(profile.title, language);
  const bio = getLocalizedText(profile.bio, language);

  return (
    <section className="py-8 sm:py-12 border-b border-stone-200/80 dark:border-stone-800/80">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Profile Intro */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative shrink-0">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-emerald-500/30 dark:ring-emerald-400/20 shadow-md"
            />
            <span
              className="absolute -bottom-1 -right-1 p-1 bg-white dark:bg-stone-900 rounded-full shadow-xs text-xs"
              title="Digital Gardener"
            >
              🌱
            </span>
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                {profile.name}
              </h1>
              <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 dark:bg-emerald-500/20">
                Digital Gardener
              </span>
            </div>

            <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
              {title}
            </p>

            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl pt-1">
              {bio}
            </p>
          </div>
        </div>

        {/* Action bar and links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          {/* Social and scholarly links */}
          <div className="flex items-center gap-3 text-xs text-stone-600 dark:text-stone-400">
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            {profile.scholar && (
              <a
                href={profile.scholar}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Google Scholar</span>
              </a>
            )}
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{profile.email}</span>
              </a>
            )}
          </div>

          {/* YAML Download & Backend Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={downloadYamlFile}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-lg text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:bg-stone-200/70 dark:hover:bg-stone-800 transition-colors"
              title={language === 'vi' ? 'Tải tệp tin .yaml đầy đủ từ backend' : 'Download raw .yaml dataset'}
            >
              <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{language === 'vi' ? 'Tải file .yaml' : 'Download .yaml'}</span>
            </button>

            <button
              onClick={() => setIsYamlModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-lg text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300/60 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors"
              title={language === 'vi' ? 'Xem hoặc cập nhật dữ liệu qua file YAML' : 'View or update YAML schema'}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>{language === 'vi' ? 'Xem & Chỉnh sửa YAML' : 'Edit YAML'}</span>
            </button>
          </div>
        </div>

        {/* Digital Garden Growth Stage Guide (Anti-slop, clean typographic style) */}
        <div className="p-3.5 rounded-xl bg-stone-100/70 dark:bg-stone-900/50 border border-stone-200/80 dark:border-stone-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div
            onClick={() => {
              setSelectedCategory('all');
              setSelectedSubcategory('all');
            }}
            className="flex items-center gap-2.5 cursor-pointer text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 transition-colors"
          >
            <span className="text-base">🌱</span>
            <div>
              <p className="font-semibold text-stone-800 dark:text-stone-200">
                {language === 'vi' ? 'Gieo mầm (Seedling)' : 'Seedling stage'}
              </p>
              <p className="text-[11px] text-stone-500">
                {language === 'vi' ? 'Ý tưởng thô sơ vừa nảy nở' : 'Raw emerging notes & drafts'}
              </p>
            </div>
          </div>

          <div
            onClick={() => {
              setSelectedCategory('all');
              setSelectedSubcategory('all');
            }}
            className="flex items-center gap-2.5 cursor-pointer text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 transition-colors"
          >
            <span className="text-base">🌿</span>
            <div>
              <p className="font-semibold text-stone-800 dark:text-stone-200">
                {language === 'vi' ? 'Chồi non (Budding)' : 'Budding stage'}
              </p>
              <p className="text-[11px] text-stone-500">
                {language === 'vi' ? 'Đã thành hình có khung luận điểm' : 'Structured with initial insights'}
              </p>
            </div>
          </div>

          <div
            onClick={() => {
              setSelectedCategory('all');
              setSelectedSubcategory('all');
            }}
            className="flex items-center gap-2.5 cursor-pointer text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 transition-colors"
          >
            <span className="text-base">🌲</span>
            <div>
              <p className="font-semibold text-stone-800 dark:text-stone-200">
                {language === 'vi' ? 'Bền vững (Evergreen)' : 'Evergreen note'}
              </p>
              <p className="text-[11px] text-stone-500">
                {language === 'vi' ? 'Bài hoàn chỉnh, được bồi đắp lâu dài' : 'Polished, heavily cross-linked'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
