export type Language = 'vi' | 'en';
export type GrowthStage = 'seedling' | 'budding' | 'evergreen';

export interface BilingualText {
  vi: string;
  en: string;
}

export type TextOrBilingual = string | BilingualText;

export interface Profile {
  name: string;
  title: BilingualText;
  bio: BilingualText;
  avatar: string;
  location: string;
  email: string;
  github?: string;
  scholar?: string;
  stats?: {
    startedYear: number;
    notesCount: number;
    evergreenCount: number;
  };
}

export interface Subcategory {
  id: string;
  name: BilingualText;
}

export interface Category {
  id: string;
  name: BilingualText;
  description: BilingualText;
  subcategories: Subcategory[];
}

export interface ArticleAttachment {
  type: 'image' | 'video' | 'pdf' | 'link';
  url: string;
  caption?: BilingualText;
}

export interface Article {
  id: string;
  title: BilingualText;
  date: string; // YYYY-MM-DD
  category: 'work_research' | 'interests' | string;
  subcategory: 'research' | 'projects' | 'articles' | 'novels' | 'video' | 'music' | 'blog' | 'game_ideas' | string;
  growthStage: GrowthStage;
  summary: BilingualText;
  coverImage: string;
  tags: string[];
  readTime?: string;
  videoUrl?: string;
  content: BilingualText;
  attachments?: ArticleAttachment[];
}

export interface CommentItem {
  id: string;
  slug: string;
  name: string;
  content: string;
  createdAt: string;
}

export interface VisitorStats {
  totalViews: number;
  uniqueVisitors: number;
  postViews: Record<string, number>;
}

export interface GardenData {
  profile: Profile;
  categories: Category[];
  articles: Article[];
}

export function getLocalizedText(item: TextOrBilingual | undefined, lang: Language): string {
  if (!item) return '';
  if (typeof item === 'string') return item;
  return item[lang] || item['vi'] || item['en'] || '';
}
