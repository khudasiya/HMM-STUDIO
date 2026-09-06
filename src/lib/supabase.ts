import { createClient } from '@supabase/supabase-js';
import { AudioItem, BlogPost, VideoItem } from '../types/portfolio';
import { INITIAL_AUDIO_ITEMS, INITIAL_BLOG_POSTS, INITIAL_VIDEOS } from '../data/mockData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
export const hasAdminPrivileges = Boolean(supabaseUrl && supabaseServiceKey);

// Public read-only client
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false }
    })
  : null;

// Admin write-enabled client (bypasses RLS using service role key)
export const supabaseAdmin = (hasAdminPrivileges && supabaseUrl && supabaseServiceKey)
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false }
    })
  : supabase;

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

/**
 * Health check to verify Supabase connection and whether tables exist
 */
export async function checkSupabaseHealth(): Promise<{
  configured: boolean;
  hasServiceRole: boolean;
  connected: boolean;
  tablesExist: boolean;
  count: number;
  errorMessage?: string;
}> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      configured: false,
      hasServiceRole: false,
      connected: false,
      tablesExist: false,
      count: 0,
      errorMessage: 'Supabase credentials not found in environment'
    };
  }

  try {
    const { count, error } = await supabase
      .from('audio_items')
      .select('*', { count: 'exact', head: true });

    if (error) {
      // PGRST205 indicates table doesn't exist in PostgreSQL schema cache
      const isMissingTable = error.code === 'PGRST205' || error.message.includes('Could not find the table');
      return {
        configured: true,
        hasServiceRole: hasAdminPrivileges,
        connected: true,
        tablesExist: !isMissingTable,
        count: 0,
        errorMessage: isMissingTable
          ? "Database tables have not been created yet. Please execute the SQL schema in your Supabase SQL Editor."
          : error.message
      };
    }

    return {
      configured: true,
      hasServiceRole: hasAdminPrivileges,
      connected: true,
      tablesExist: true,
      count: count || 0
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown network connection error';
    return {
      configured: true,
      hasServiceRole: hasAdminPrivileges,
      connected: false,
      tablesExist: false,
      count: 0,
      errorMessage: msg
    };
  }
}

/**
 * Seeds default portfolio audio tracks, videos, and blog posts into Supabase
 */
export async function seedInitialDataToSupabase(): Promise<{
  success: boolean;
  insertedCount: number;
  message: string;
}> {
  const client = supabaseAdmin || supabase;
  if (!client) {
    return { success: false, insertedCount: 0, message: 'Supabase client not initialized' };
  }

  try {
    // 1. Audio Items
    const { error: audioError } = await client
      .from('audio_items')
      .upsert(INITIAL_AUDIO_ITEMS, { onConflict: 'id' });

    if (audioError) {
      throw audioError;
    }

    // 2. Videos
    const { error: videoError } = await client
      .from('videos')
      .upsert(INITIAL_VIDEOS, { onConflict: 'id' });

    if (videoError) {
      console.warn('Video seed notice:', videoError.message);
    }

    // 3. Blog Posts
    const { error: blogError } = await client
      .from('blog_posts')
      .upsert(INITIAL_BLOG_POSTS, { onConflict: 'id' });

    if (blogError) {
      console.warn('Blog seed notice:', blogError.message);
    }

    // Update local cache as well
    setLocalData(STORAGE_KEYS.AUDIO, INITIAL_AUDIO_ITEMS);
    setLocalData(STORAGE_KEYS.VIDEOS, INITIAL_VIDEOS);
    setLocalData(STORAGE_KEYS.BLOG, INITIAL_BLOG_POSTS);

    return {
      success: true,
      insertedCount: INITIAL_AUDIO_ITEMS.length,
      message: `Successfully seeded ${INITIAL_AUDIO_ITEMS.length} tracks to Supabase!`
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to seed data';
    return {
      success: false,
      insertedCount: 0,
      message: msg
    };
  }
}

/**
 * Subscribes to real-time changes on audio_items, videos, and blog_posts.
 * Invokes callback whenever any track is added, updated, or removed.
 */
export function subscribeToDatabaseChanges(callback: () => void): () => void {
  if (!supabase) return () => {};

  const channel = supabase
    .channel('public:hmm_studio_realtime')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'audio_items' },
      (payload) => {
        console.log('[Supabase Realtime] audio_items updated:', payload.eventType);
        callback();
      }
    )
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'videos' },
      (payload) => {
        console.log('[Supabase Realtime] videos updated:', payload.eventType);
        callback();
      }
    )
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'blog_posts' },
      (payload) => {
        console.log('[Supabase Realtime] blog_posts updated:', payload.eventType);
        callback();
      }
    )
    .subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log('[Supabase Realtime] Live sync active.');
      }
    });

  return () => {
    supabase.removeChannel(channel);
  };
}

// Data Access API (Handles both Supabase & Fallback Local Storage)
export const api = {
  // Audio Items
  async getAudioItems(): Promise<AudioItem[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('audio_items')
          .select('*')
          .order('createdAt', { ascending: false });

        if (!error && data && data.length > 0) {
          // Cache successful fetch in localStorage
          setLocalData(STORAGE_KEYS.AUDIO, data as AudioItem[]);
          return data as AudioItem[];
        }
        if (error) {
          console.warn('Supabase getAudioItems notice:', error.message);
        }
      } catch (e) {
        console.warn('Supabase fetch failed, falling back to local storage', e);
      }
    }
    return getLocalData<AudioItem[]>(STORAGE_KEYS.AUDIO, INITIAL_AUDIO_ITEMS);
  },

  async saveAudioItem(item: Omit<AudioItem, 'id' | 'createdAt'> & { id?: string }): Promise<AudioItem> {
    const newItem: AudioItem = {
      ...item,
      id: item.id || `audio-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const client = supabaseAdmin || supabase;
    let savedToSupabase = false;

    if (isSupabaseConfigured && client) {
      try {
        const { error } = await client.from('audio_items').upsert([newItem]);
        if (error) {
          console.error('Supabase save error:', error);
          // If table doesn't exist, we alert the caller
          if (error.code === 'PGRST205' || error.message.includes('Could not find the table')) {
            throw new Error('Supabase tables have not been created yet. Please execute the SQL schema in Supabase Dashboard.');
          }
          throw error;
        }
        savedToSupabase = true;
      } catch (err: unknown) {
        // Bubble up error if it was a schema missing issue so UI can guide the user
        const msg = err instanceof Error ? err.message : 'Database error';
        if (msg.includes('SQL schema')) {
          throw err;
        }
        console.warn('Supabase write notice:', msg);
      }
    }

    // Always update local cache for instant UI feedback
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

    console.log(`Audio item saved [${newItem.id}] ${savedToSupabase ? '(synced to Supabase)' : '(local fallback)'}`);
    return newItem;
  },

  async deleteAudioItem(id: string): Promise<boolean> {
    const client = supabaseAdmin || supabase;
    if (isSupabaseConfigured && client) {
      try {
        const { error } = await client.from('audio_items').delete().eq('id', id);
        if (error) {
          console.error('Supabase delete error:', error);
        }
      } catch (e) {
        console.warn('Supabase delete notice:', e);
      }
    }
    const current = getLocalData<AudioItem[]>(STORAGE_KEYS.AUDIO, INITIAL_AUDIO_ITEMS);
    const updated = current.filter(i => i.id !== id);
    setLocalData(STORAGE_KEYS.AUDIO, updated);
    return true;
  },

  // Videos
  async getVideos(): Promise<VideoItem[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('videos')
          .select('*')
          .order('createdAt', { ascending: false });

        if (!error && data && data.length > 0) {
          setLocalData(STORAGE_KEYS.VIDEOS, data as VideoItem[]);
          return data as VideoItem[];
        }
      } catch (e) {
        console.warn('Supabase videos fetch notice:', e);
      }
    }
    return getLocalData<VideoItem[]>(STORAGE_KEYS.VIDEOS, INITIAL_VIDEOS);
  },

  async saveVideo(item: Omit<VideoItem, 'id' | 'createdAt'> & { id?: string }): Promise<VideoItem> {
    const newItem: VideoItem = {
      ...item,
      id: item.id || `video-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const client = supabaseAdmin || supabase;
    if (isSupabaseConfigured && client) {
      try {
        await client.from('videos').upsert([newItem]);
      } catch (e) {
        console.warn('Supabase video save notice:', e);
      }
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
    const client = supabaseAdmin || supabase;
    if (isSupabaseConfigured && client) {
      try {
        await client.from('videos').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase video delete notice:', e);
      }
    }
    const current = getLocalData<VideoItem[]>(STORAGE_KEYS.VIDEOS, INITIAL_VIDEOS);
    const updated = current.filter(i => i.id !== id);
    setLocalData(STORAGE_KEYS.VIDEOS, updated);
    return true;
  },

  // Blog Posts
  async getBlogPosts(): Promise<BlogPost[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('createdAt', { ascending: false });

        if (!error && data && data.length > 0) {
          setLocalData(STORAGE_KEYS.BLOG, data as BlogPost[]);
          return data as BlogPost[];
        }
      } catch (e) {
        console.warn('Supabase blog fetch notice:', e);
      }
    }
    return getLocalData<BlogPost[]>(STORAGE_KEYS.BLOG, INITIAL_BLOG_POSTS);
  },

  async saveBlogPost(post: Omit<BlogPost, 'id' | 'createdAt'> & { id?: string }): Promise<BlogPost> {
    const newPost: BlogPost = {
      ...post,
      id: post.id || `post-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const client = supabaseAdmin || supabase;
    if (isSupabaseConfigured && client) {
      try {
        await client.from('blog_posts').upsert([newPost]);
      } catch (e) {
        console.warn('Supabase blog save notice:', e);
      }
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
    const client = supabaseAdmin || supabase;
    if (isSupabaseConfigured && client) {
      try {
        await client.from('blog_posts').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase blog delete notice:', e);
      }
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
