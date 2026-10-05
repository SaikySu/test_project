import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as yaml from 'js-yaml';
import {
  GardenData,
  Language,
  CommentItem,
  VisitorStats,
  Article,
} from '../types/garden';
import { DEFAULT_GARDEN_DATA } from '../data/defaultData';

interface GardenContextType {
  data: GardenData;
  rawYaml: string;
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
  toggleTheme: () => void;
  stats: VisitorStats;
  comments: CommentItem[];
  activeArticle: Article | null;
  setActiveArticleId: (id: string | null) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedSubcategory: string;
  setSelectedSubcategory: (sub: string) => void;
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isYamlModalOpen: boolean;
  setIsYamlModalOpen: (open: boolean) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  addComment: (slug: string, name: string, content: string) => Promise<boolean>;
  saveYamlContent: (yamlText: string) => Promise<{ success: boolean; error?: string }>;
  downloadYamlFile: () => void;
  recordView: (slug?: string) => void;
  allTags: { name: string; count: number }[];
}

const GardenContext = createContext<GardenContextType | undefined>(undefined);

export const GardenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<GardenData>(DEFAULT_GARDEN_DATA);
  const [rawYaml, setRawYaml] = useState<string>('');
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('dg_language');
    return (saved === 'en' || saved === 'vi') ? saved : 'vi';
  });
  const [theme, setThemeState] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('dg_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  const [stats, setStats] = useState<VisitorStats>({
    totalViews: 1420,
    uniqueVisitors: 894,
    postViews: {},
  });
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isYamlModalOpen, setIsYamlModalOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Apply dark mode class to html element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('dg_theme', theme);
  }, [theme]);

  // Set language
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('dg_language', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'vi' ? 'en' : 'vi');
  };

  const setTheme = (t: 'dark' | 'light') => {
    setThemeState(t);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Load YAML data from backend
  const loadDataFromBackend = useCallback(async () => {
    try {
      const res = await fetch('/api/content.yaml');
      if (res.ok) {
        const text = await res.text();
        setRawYaml(text);
        const parsed = yaml.load(text) as any;
        if (parsed && typeof parsed === 'object') {
          setData({
            profile: parsed.profile || DEFAULT_GARDEN_DATA.profile,
            categories: parsed.categories || DEFAULT_GARDEN_DATA.categories,
            articles: parsed.articles || DEFAULT_GARDEN_DATA.articles,
          });
        }
      } else {
        // Fallback: convert DEFAULT_GARDEN_DATA to YAML
        const dump = yaml.dump(DEFAULT_GARDEN_DATA);
        setRawYaml(dump);
      }
    } catch (err) {
      console.warn('Using default garden data:', err);
      const dump = yaml.dump(DEFAULT_GARDEN_DATA);
      setRawYaml(dump);
    }
  }, []);

  // Fetch stats and comments
  const loadStatsAndComments = useCallback(async () => {
    try {
      const [statsRes, commentsRes] = await Promise.all([
        fetch('/api/views').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/comments').then((r) => (r.ok ? r.json() : null)),
      ]);
      if (statsRes) setStats(statsRes);
      if (commentsRes) setComments(commentsRes);
    } catch (err) {
      console.warn('Stats/Comments offline fallback:', err);
    }
  }, []);

  // Record a visit hit
  const recordView = useCallback(async (slug?: string) => {
    try {
      const res = await fetch('/api/views/hit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });
      if (res.ok) {
        const updated = await res.json();
        setStats(updated);
      } else {
        setStats((prev) => ({
          ...prev,
          totalViews: prev.totalViews + 1,
          postViews: slug
            ? { ...prev.postViews, [slug]: (prev.postViews[slug] || 0) + 1 }
            : prev.postViews,
        }));
      }
    } catch {
      setStats((prev) => ({
        ...prev,
        totalViews: prev.totalViews + 1,
      }));
    }
  }, []);

  // Initial load & page view tracking
  useEffect(() => {
    loadDataFromBackend();
    loadStatsAndComments();
    recordView(); // record total page view on initial visit
  }, [loadDataFromBackend, loadStatsAndComments, recordView]);

  // When active article changes, track hit
  useEffect(() => {
    if (activeArticleId) {
      recordView(activeArticleId);
    }
  }, [activeArticleId, recordView]);

  // Add Comment
  const addComment = async (slug: string, name: string, content: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, name, content }),
      });

      let newComment: CommentItem;
      if (res.ok) {
        newComment = await res.json();
      } else {
        newComment = {
          id: 'c_' + Date.now(),
          slug,
          name,
          content,
          createdAt: new Date().toISOString(),
        };
      }
      setComments((prev) => [newComment, ...prev]);
      return true;
    } catch {
      const fallbackComment: CommentItem = {
        id: 'c_' + Date.now(),
        slug,
        name,
        content,
        createdAt: new Date().toISOString(),
      };
      setComments((prev) => [fallbackComment, ...prev]);
      return true;
    }
  };

  // Save/Upload new YAML
  const saveYamlContent = async (yamlText: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const parsed = yaml.load(yamlText) as any;
      if (!parsed || typeof parsed !== 'object') {
        return { success: false, error: 'Cấu trúc YAML không hợp lệ' };
      }
      // Send to backend (server requires x-admin-token when ADMIN_TOKEN is set)
      const postYaml = () =>
        fetch('/api/content.yaml', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-token': localStorage.getItem('garden_admin_token') || '',
          },
          body: JSON.stringify({ yamlText }),
        });
      let res = await postYaml();
      if (res.status === 401) {
        const token = window.prompt('Nhập mật khẩu admin (ADMIN_TOKEN) / Enter admin token:');
        if (!token) {
          return { success: false, error: 'Cần mật khẩu admin để lưu' };
        }
        localStorage.setItem('garden_admin_token', token);
        res = await postYaml();
        if (res.status === 401) {
          localStorage.removeItem('garden_admin_token');
        }
      }

      if (!res.ok) {
        const errJson = await res.json();
        return { success: false, error: errJson.error || 'Lỗi lưu backend' };
      }

      setRawYaml(yamlText);
      setData({
        profile: parsed.profile || data.profile,
        categories: parsed.categories || data.categories,
        articles: parsed.articles || data.articles,
      });
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  // Direct download .yaml file
  const downloadYamlFile = () => {
    const blob = new Blob([rawYaml || yaml.dump(data)], { type: 'text/yaml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'digital-garden-content.yaml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Global keyboard shortcuts (Cmd+K / Ctrl+K for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        if (isSearchOpen) setIsSearchOpen(false);
        if (isYamlModalOpen) setIsYamlModalOpen(false);
        if (isSettingsOpen) setIsSettingsOpen(false);
        if (activeArticleId) setActiveArticleId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, isYamlModalOpen, isSettingsOpen, activeArticleId]);

  // Compute all tags with counts
  const allTags = React.useMemo(() => {
    const tagMap: Record<string, number> = {};
    (data.articles || []).forEach((art) => {
      (art.tags || []).forEach((tag) => {
        tagMap[tag] = (tagMap[tag] || 0) + 1;
      });
    });
    return Object.entries(tagMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [data.articles]);

  const activeArticle = (data.articles || []).find((a) => a.id === activeArticleId) || null;

  return (
    <GardenContext.Provider
      value={{
        data,
        rawYaml,
        language,
        setLanguage,
        toggleLanguage,
        theme,
        setTheme,
        toggleTheme,
        stats,
        comments,
        activeArticle,
        setActiveArticleId,
        selectedCategory,
        setSelectedCategory,
        selectedSubcategory,
        setSelectedSubcategory,
        selectedTag,
        setSelectedTag,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        isYamlModalOpen,
        setIsYamlModalOpen,
        isSettingsOpen,
        setIsSettingsOpen,
        addComment,
        saveYamlContent,
        downloadYamlFile,
        recordView,
        allTags,
      }}
    >
      {children}
    </GardenContext.Provider>
  );
};

export const useGarden = () => {
  const context = useContext(GardenContext);
  if (!context) {
    throw new Error('useGarden must be used within a GardenProvider');
  }
  return context;
};
