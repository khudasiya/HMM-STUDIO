export type CategoryType = 
  | 'logo_audio'
  | 'brand_anthem'
  | 'podcast_audio'
  | 'commercial_song'
  | 'jingle'
  | 'extras'
  | 'blog';

export interface AudioItem {
  id: string;
  title: string;
  client: string;
  category: CategoryType;
  audioUrl: string;
  coverImage?: string;
  duration?: string;
  description?: string;
  caseStudy?: {
    challenge: string;
    solution: string;
    result: string;
  };
  tags?: string[];
  isFeatured?: boolean;
  published: boolean;
  createdAt: string;
}

export interface VideoItem {
  id: string;
  title: string;
  client: string;
  category: 'extras';
  type: 'video';
  videoUrl: string;
  thumbnailUrl: string;
  description?: string;
  published: boolean;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  featuredImage: string;
  author: string;
  readTime: string;
  published: boolean;
  createdAt: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  anchorId: string;
  highlights: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  details: string[];
}

export interface ClientTestimonial {
  id: string;
  quote: string;
  clientName: string;
  clientRole: string;
  company: string;
  avatarUrl?: string;
  companyLogo?: string;
}
