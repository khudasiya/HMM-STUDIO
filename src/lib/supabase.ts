import { createClient } from '@supabase/supabase-js';
import { AudioItem, BlogPost, VideoItem } from '../types/portfolio';
import { INITIAL_AUDIO_ITEMS, INITIAL_BLOG_POSTS, INITIAL_VIDEOS } from '../data/mockData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// LocalStorage Persistence Keys for Offline / Fallback Mode
const STORAGE_KEYS = {
  AUDIO: 'hmm_studio_audio_items',
  VIDEOS: 'hmm_studio_videos',
  BLOG: 'hmm_studio_blog_posts',
  AUTH: 'hmm_studio_admin_authenticated'
};

// Helper to initialize local storage if needed
function getLocalData<T>(key: string, defaultVal: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultVal));
      return defaultVal;
    }
    return JSON.parse(raw);
  } catch (e) {
    return defaultVal;
  }
}

function setLocalData<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
    window.dispatchEvent(new Event('hmm_storage_update'));
  } catch (e) {
    console.error('Failed to set localStorage', e);
  }
}

// Data Access API (Handles both Supabase & Fallback Local Storage)
export const api = {
  // Audio Items
  async getAudioItems(): Promise<AudioItem[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('audio_items').select('*').order('createdAt', { ascending: false });
      if (!error && data) return data as AudioItem[];
    }
    return getLocalData<AudioItem[]>(STORAGE_KEYS.AUDIO, INITIAL_AUDIO_ITEMS);
  },

  async saveAudioItem(item: Omit<AudioItem, 'id' | 'createdAt'> & { id?: string }): Promise<AudioItem> {
    const newItem: AudioItem = {
      ...item,
      id: item.id || `audio-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };

    if (isSupabaseConfigured && supabase) {
      await supabase.from('audio_items').upsert([newItem]);
    }

    const current = getLocalData<AudioItem[]>(STORAGE_KEYS.AUDIO, INITIAL_AUDIO_ITEMS);
    const existingIdx = current.findIndex(i => i.id === newItem.id);
    let updated: AudioItem[];
    if (existingIdx >= 0) {
      updated = [...current];
      updated[existingIdx] = newItem;
    } else {
      updated = [newItem, ...current];
    }
    setLocalData(STORAGE_KEYS.AUDIO, updated);
    return newItem;
  },

  async deleteAudioItem(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      await supabase.from('audio_items').delete().eq('id', id);
    }
    const current = getLocalData<AudioItem[]>(STORAGE_KEYS.AUDIO, INITIAL_AUDIO_ITEMS);
    const updated = current.filter(i => i.id !== id);
    setLocalData(STORAGE_KEYS.AUDIO, updated);
    return true;
  },

  // Videos
  async getVideos(): Promise<VideoItem[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('videos').select('*').order('createdAt', { ascending: false });
      if (!error && data) return data as VideoItem[];
    }
    return getLocalData<VideoItem[]>(STORAGE_KEYS.VIDEOS, INITIAL_VIDEOS);
  },

  async saveVideo(item: Omit<VideoItem, 'id' | 'createdAt'> & { id?: string }): Promise<VideoItem> {
    const newItem: VideoItem = {
      ...item,
      id: item.id || `video-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };

    if (isSupabaseConfigured && supabase) {
      await supabase.from('videos').upsert([newItem]);
    }

    const current = getLocalData<VideoItem[]>(STORAGE_KEYS.VIDEOS, INITIAL_VIDEOS);
    const existingIdx = current.findIndex(i => i.id === newItem.id);
    let updated: VideoItem[];
    if (existingIdx >= 0) {
      updated = [...current];
      updated[existingIdx] = newItem;
    } else {
      updated = [newItem, ...current];
    }
    setLocalData(STORAGE_KEYS.VIDEOS, updated);
    return newItem;
  },

  async deleteVideo(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      await supabase.from('videos').delete().eq('id', id);
    }
    const current = getLocalData<VideoItem[]>(STORAGE_KEYS.VIDEOS, INITIAL_VIDEOS);
    const updated = current.filter(i => i.id !== id);
    setLocalData(STORAGE_KEYS.VIDEOS, updated);
    return true;
  },

  // Blog Posts
  async getBlogPosts(): Promise<BlogPost[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('blog_posts').select('*').order('createdAt', { ascending: false });
      if (!error && data) return data as BlogPost[];
    }
    return getLocalData<BlogPost[]>(STORAGE_KEYS.BLOG, INITIAL_BLOG_POSTS);
  },

  async saveBlogPost(post: Omit<BlogPost, 'id' | 'createdAt'> & { id?: string }): Promise<BlogPost> {
    const newPost: BlogPost = {
      ...post,
      id: post.id || `post-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };

    if (isSupabaseConfigured && supabase) {
      await supabase.from('blog_posts').upsert([newPost]);
    }

    const current = getLocalData<BlogPost[]>(STORAGE_KEYS.BLOG, INITIAL_BLOG_POSTS);
    const existingIdx = current.findIndex(p => p.id === newPost.id);
    let updated: BlogPost[];
    if (existingIdx >= 0) {
      updated = [...current];
      updated[existingIdx] = newPost;
    } else {
      updated = [newPost, ...current];
    }
    setLocalData(STORAGE_KEYS.BLOG, updated);
    return newPost;
  },

  async deleteBlogPost(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      await supabase.from('blog_posts').delete().eq('id', id);
    }
    const current = getLocalData<BlogPost[]>(STORAGE_KEYS.BLOG, INITIAL_BLOG_POSTS);
    const updated = current.filter(p => p.id !== id);
    setLocalData(STORAGE_KEYS.BLOG, updated);
    return true;
  },

  // Admin Authentication Session
  isAdminAuthenticated(): boolean {
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  },

  setAdminAuthenticated(auth: boolean): void {
    if (auth) {
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    }
    window.dispatchEvent(new Event('hmm_auth_update'));
  }
};
