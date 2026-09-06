import React, { useState, useEffect, useRef } from 'react';
import { api, checkSupabaseHealth, seedInitialDataToSupabase, isSupabaseConfigured } from '../lib/supabase';
import { AudioItem, BlogPost, CategoryType, VideoItem } from '../types/portfolio';
import { AudioCard } from './AudioCard';
import { getCDNUrl } from '../lib/cdn';
import { 
  Shield, Lock, Plus, Trash2, Edit3, Check, X, LogOut, Eye, Database, 
  Cloud, AlertTriangle, Play, Pause, ExternalLink, Copy, RefreshCw, Sparkles, Music
} from 'lucide-react';

const configuredSupabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_PROJECT_ID = configuredSupabaseUrl.replace(/^https?:\/\//, '').split('.')[0] || 'your-project';
const SUPABASE_SQL_URL = `https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql/new`;

const SUPABASE_SCHEMA_SQL = `-- SQL Schema script for Supabase Database
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql/new)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Table: Audio Items
CREATE TABLE IF NOT EXISTS audio_items (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    title TEXT NOT NULL,
    client TEXT NOT NULL,
    category TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "coverImage" TEXT,
    duration TEXT,
    description TEXT,
    "caseStudy" JSONB,
    tags TEXT[],
    "isFeatured" BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT true,
    "createdAt" DATE DEFAULT CURRENT_DATE
);

-- 2. Table: Video Items
CREATE TABLE IF NOT EXISTS videos (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    title TEXT NOT NULL,
    client TEXT NOT NULL,
    category TEXT DEFAULT 'extras',
    type TEXT DEFAULT 'video',
    "videoUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    description TEXT,
    published BOOLEAN DEFAULT true,
    "createdAt" DATE DEFAULT CURRENT_DATE
);

-- 3. Table: Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    "featuredImage" TEXT NOT NULL,
    author TEXT DEFAULT 'Hmm Studio Editorial',
    "readTime" TEXT DEFAULT '4 min read',
    published BOOLEAN DEFAULT true,
    "createdAt" DATE DEFAULT CURRENT_DATE
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE audio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- 5. Public Read Policies
CREATE POLICY "Public read audio_items" ON audio_items FOR SELECT USING (published = true);
CREATE POLICY "Public read videos" ON videos FOR SELECT USING (published = true);
CREATE POLICY "Public read blog_posts" ON blog_posts FOR SELECT USING (published = true);

-- 6. Authenticated & Service Role Access
CREATE POLICY "Admin full access audio_items" ON audio_items FOR ALL USING (true);
CREATE POLICY "Admin full access videos" ON videos FOR ALL USING (true);
CREATE POLICY "Admin full access blog_posts" ON blog_posts FOR ALL USING (true);

-- 7. Enable Realtime Replication for Live Auto-Sync
ALTER PUBLICATION supabase_realtime ADD TABLE audio_items;
ALTER PUBLICATION supabase_realtime ADD TABLE videos;
ALTER PUBLICATION supabase_realtime ADD TABLE blog_posts;
`;

interface AdminPortalProps {
  onDataChange: () => void;
  onBackToSite: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onDataChange, onBackToSite }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<CategoryType | 'videos'>('logo_audio');

  const [audioItems, setAudioItems] = useState<AudioItem[]>([]);
  const [videoItems, setVideoItems] = useState<VideoItem[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  // Health State
  const [healthStatus, setHealthStatus] = useState<{
    configured: boolean;
    hasServiceRole: boolean;
    connected: boolean;
    tablesExist: boolean;
    count: number;
    errorMessage?: string;
  } | null>(null);
  const [isCheckingHealth, setIsCheckingHealth] = useState(false);

  // Modals
  const [showModal, setShowModal] = useState(false);
  const [showSchemaModal, setShowSchemaModal] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  // Notifications
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Audio Preview state in Modal
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const [audioDetectedDuration, setAudioDetectedDuration] = useState<string | null>(null);
  const [audioDetectionLoading, setAudioDetectionLoading] = useState(false);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  // Form Fields
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formClient, setFormClient] = useState('');
  const [formCategory, setFormCategory] = useState<CategoryType>('logo_audio');
  const [formAudioUrl, setFormAudioUrl] = useState('');
  const [formCoverImage, setFormCoverImage] = useState('');
  const [formDuration, setFormDuration] = useState('0:03');
  const [formDescription, setFormDescription] = useState('');
  const [formTags, setFormTags] = useState('');
  const [formChallenge, setFormChallenge] = useState('');
  const [formSolution, setFormSolution] = useState('');
  const [formResult, setFormResult] = useState('');
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Blog Fields
  const [blogSlug, setBlogSlug] = useState('');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogCategory, setBlogCategory] = useState('Sonic Branding');
  const [blogImage, setBlogImage] = useState('');

  useEffect(() => {
    setIsAuthenticated(api.isAdminAuthenticated());
    loadAllData();
    checkHealth();

    return () => {
      if (previewAudioRef.current) {
        previewAudioRef.current.pause();
      }
    };
  }, []);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const checkHealth = async () => {
    setIsCheckingHealth(true);
    try {
      const h = await checkSupabaseHealth();
      setHealthStatus(h);
    } finally {
      setIsCheckingHealth(false);
    }
  };

  const loadAllData = async () => {
    const audios = await api.getAudioItems();
    const vids = await api.getVideos();
    const posts = await api.getBlogPosts();
    setAudioItems(audios);
    setVideoItems(vids);
    setBlogPosts(posts);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'hmm2026' || passcode === 'admin' || isSupabaseConfigured) {
      api.setAdminAuthenticated(true);
      setIsAuthenticated(true);
      setAuthError('');
      checkHealth();
    } else {
      setAuthError('Invalid admin passcode. (Default demo passcode: admin)');
    }
  };

  const handleLogout = () => {
    api.setAdminAuthenticated(false);
    setIsAuthenticated(false);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SCHEMA_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  const handleSeedDatabase = async () => {
    if (!confirm('This will seed the default 18 portfolio tracks, videos, and articles to Supabase. Continue?')) {
      return;
    }
    setIsSeeding(true);
    try {
      const res = await seedInitialDataToSupabase();
      if (res.success) {
        showToast('success', res.message);
        await loadAllData();
        await checkHealth();
        onDataChange();
      } else {
        showToast('error', `Seeding failed: ${res.message}. Make sure SQL schema has been executed first.`);
        setShowSchemaModal(true);
      }
    } finally {
      setIsSeeding(false);
    }
  };

  // Audio URL change handler with automatic duration detection
  const handleAudioUrlChange = (url: string) => {
    setFormAudioUrl(url);
    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
      setIsPreviewPlaying(false);
    }

    const trimmed = url.trim();
    if (trimmed && (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/'))) {
      setAudioDetectionLoading(true);
      const audioTest = new Audio();
      const fullUrl = getCDNUrl(trimmed);
      audioTest.src = fullUrl;
      audioTest.preload = 'metadata';

      const cleanup = () => {
        audioTest.removeEventListener('loadedmetadata', onLoaded);
        audioTest.removeEventListener('error', onError);
      };

      const onLoaded = () => {
        if (audioTest.duration && !isNaN(audioTest.duration) && audioTest.duration !== Infinity) {
          const totalSecs = Math.round(audioTest.duration);
          const mins = Math.floor(totalSecs / 60);
          const secs = totalSecs % 60;
          const formatted = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
          setFormDuration(formatted);
          setAudioDetectedDuration(formatted);
        }
        setAudioDetectionLoading(false);
        cleanup();
      };

      const onError = () => {
        setAudioDetectedDuration(null);
        setAudioDetectionLoading(false);
        cleanup();
      };

      audioTest.addEventListener('loadedmetadata', onLoaded);
      audioTest.addEventListener('error', onError);

      // Timeout safety
      setTimeout(() => {
        setAudioDetectionLoading(false);
        cleanup();
      }, 3500);
    } else {
      setAudioDetectedDuration(null);
      setAudioDetectionLoading(false);
    }
  };

  const togglePreviewAudio = () => {
    const fullUrl = getCDNUrl(formAudioUrl.trim());
    if (!fullUrl) return;

    if (isPreviewPlaying && previewAudioRef.current) {
      previewAudioRef.current.pause();
      setIsPreviewPlaying(false);
      return;
    }

    if (!previewAudioRef.current) {
      previewAudioRef.current = new Audio();
    }

    const audio = previewAudioRef.current;
    audio.src = fullUrl;
    audio.play()
      .then(() => {
        setIsPreviewPlaying(true);
      })
      .catch((err) => {
        console.warn('Audio preview playback error:', err);
        showToast('error', `Cannot stream audio: ${err.message}. Check that the URL is public.`);
        setIsPreviewPlaying(false);
      });

    audio.onended = () => setIsPreviewPlaying(false);
  };

  const openCreateModal = (cat: CategoryType | 'videos') => {
    setEditingId(null);
    setFormCategory(cat === 'videos' ? 'extras' : cat);
    setFormTitle('');
    setFormClient('');
    setFormAudioUrl('');
    setFormCoverImage('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80');
    setFormDuration('0:03');
    setFormDescription('');
    setFormTags('');
    setFormChallenge('');
    setFormSolution('');
    setFormResult('');
    setFormIsFeatured(false);
    setAudioDetectedDuration(null);

    // Blog resets
    setBlogSlug('');
    setBlogExcerpt('');
    setBlogContent('');
    setBlogCategory('Sonic Branding');
    setBlogImage('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80');

    setShowModal(true);
  };

  const openEditModal = (item: AudioItem) => {
    setEditingId(item.id);
    setFormCategory(item.category);
    setFormTitle(item.title);
    setFormClient(item.client);
    setFormAudioUrl(item.audioUrl);
    setFormCoverImage(item.coverImage || '');
    setFormDuration(item.duration || '0:03');
    setFormDescription(item.description || '');
    setFormTags(item.tags ? item.tags.join(', ') : '');
    setFormChallenge(item.caseStudy?.challenge || '');
    setFormSolution(item.caseStudy?.solution || '');
    setFormResult(item.caseStudy?.result || '');
    setFormIsFeatured(Boolean(item.isFeatured));
    setAudioDetectedDuration(item.duration || null);

    setShowModal(true);
  };

  const handleSaveAudio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
      setIsPreviewPlaying(false);
    }

    setIsSaving(true);
    try {
      const parsedTags = formTags
        ? formTags.split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean)
        : undefined;

      await api.saveAudioItem({
        id: editingId || undefined,
        title: formTitle,
        client: formClient,
        category: formCategory,
        audioUrl: formAudioUrl.trim(),
        coverImage: formCoverImage.trim() || undefined,
        duration: formDuration,
        description: formDescription,
        tags: parsedTags,
        caseStudy: formChallenge ? {
          challenge: formChallenge,
          solution: formSolution,
          result: formResult
        } : undefined,
        isFeatured: formIsFeatured,
        published: true,
      });

      setShowModal(false);
      showToast('success', `Track "${formTitle}" successfully published & auto-synced!`);
      await loadAllData();
      await checkHealth();
      onDataChange();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save track';
      showToast('error', msg);
      if (msg.includes('SQL schema') || msg.includes('tables have not been created')) {
        setShowSchemaModal(true);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.saveBlogPost({
        id: editingId || undefined,
        title: formTitle,
        slug: blogSlug || formTitle.toLowerCase().replace(/ /g, '-'),
        excerpt: blogExcerpt,
        content: blogContent,
        category: blogCategory,
        featuredImage: blogImage,
        author: 'Hmm Studio Editorial',
        readTime: '5 min read',
        published: true,
      });
      setShowModal(false);
      showToast('success', 'Blog post published live!');
      await loadAllData();
      onDataChange();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save blog post';
      showToast('error', msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAudio = async (id: string, title: string) => {
    if (confirm(`Delete "${title}"? It will be removed immediately from the live site.`)) {
      await api.deleteAudioItem(id);
      showToast('success', `Deleted "${title}".`);
      await loadAllData();
      await checkHealth();
      onDataChange();
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (confirm('Delete this blog post?')) {
      await api.deleteBlogPost(id);
      showToast('success', 'Blog post deleted.');
      await loadAllData();
      onDataChange();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center bg-[#08060e]">
        <div className="glass-panel border border-purple-500/40 rounded-3xl p-8 sm:p-12 max-w-md w-full shadow-2xl relative text-center">
          <div className="w-14 h-14 rounded-2xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-7 h-7 text-purple-400" />
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-2">Hmm Studio Admin Portal</h2>
          <p className="text-xs text-slate-300 mb-6">
            Authenticated portal for managing Cloudflare audio assets and Supabase live database.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter Admin Passcode..."
                className="w-full bg-[#08060e] border border-purple-900/60 rounded-xl px-4 py-3 text-sm text-white text-center focus:outline-none focus:border-purple-400"
              />
            </div>
            {authError && <p className="text-xs text-rose-400">{authError}</p>}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(139,92,246,0.5)]"
            >
              Unlock Admin Portal
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-purple-900/40 flex items-center justify-between text-[11px] text-purple-300/70">
            <span>Passcode: <code className="text-purple-300">admin</code></span>
            <button onClick={onBackToSite} className="hover:text-white underline">
              Return to Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  const filteredAudio = audioItems.filter(i => i.category === activeTab);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 max-w-7xl mx-auto relative z-10">
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-2xl animate-in slide-in-from-bottom-5 duration-300 ${
          toast.type === 'success'
            ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
            : 'bg-rose-950/90 border-rose-500/50 text-rose-200'
        }`}>
          {toast.type === 'success' ? <Check className="w-5 h-5 text-emerald-400 shrink-0" /> : <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />}
          <span className="text-xs font-semibold">{toast.message}</span>
        </div>
      )}

      {/* Database Setup Alert Banner if Tables Missing */}
      {healthStatus && !healthStatus.tablesExist && (
        <div className="glass-panel bg-amber-950/30 border border-amber-500/50 rounded-2xl p-5 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-900/60 border border-amber-500/50 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Supabase Tables Not Created Yet
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">Action Needed</span>
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Your Supabase project (<code className="text-amber-300">{SUPABASE_PROJECT_ID}</code>) is connected, but the tables haven't been created yet. Execute the SQL schema once in your Supabase SQL editor to enable persistent cloud storage and real-time syncing.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowSchemaModal(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
            >
              <Copy className="w-3.5 h-3.5" /> View & Copy SQL Schema
            </button>
          </div>
        </div>
      )}

      {/* Admin Top Status Bar */}
      <div className="glass-panel border border-purple-500/30 rounded-2xl p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center">
            <Shield className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-lg font-bold text-white">Content Management Portal</h1>
              
              {/* Supabase Status Chip */}
              {healthStatus?.tablesExist ? (
                <span className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-2.5 py-1 rounded-full">
                  <Database className="w-3.5 h-3.5" />
                  SUPABASE LIVE SYNC ({audioItems.length} tracks)
                </span>
              ) : healthStatus?.connected ? (
                <button
                  onClick={() => setShowSchemaModal(true)}
                  className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-amber-300 bg-amber-950/70 border border-amber-500/50 px-2.5 py-1 rounded-full hover:bg-amber-900/60"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  TABLE SETUP NEEDED
                </button>
              ) : (
                <span className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-slate-400 bg-slate-900/70 border border-slate-700/50 px-2.5 py-1 rounded-full">
                  <Cloud className="w-3.5 h-3.5" />
                  LOCAL MODE
                </span>
              )}

              <button
                onClick={checkHealth}
                title="Refresh connection status"
                disabled={isCheckingHealth}
                className="p-1 rounded-lg text-purple-400 hover:text-white hover:bg-purple-900/40"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isCheckingHealth ? 'animate-spin' : ''}`} />
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Paste Cloudflare audio URLs to auto-sync tracks immediately across all visitor views.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {healthStatus?.tablesExist && (
            <button
              onClick={handleSeedDatabase}
              disabled={isSeeding}
              className="px-3.5 py-2 rounded-xl bg-purple-950/60 border border-purple-700/50 text-xs font-bold text-purple-200 hover:bg-purple-900/60 hover:text-white flex items-center gap-1.5"
              title="Seed 18 default tracks into Supabase"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              {isSeeding ? 'Seeding...' : 'Seed Supabase Tracks'}
            </button>
          )}

          <button
            onClick={() => setShowSchemaModal(true)}
            className="px-3.5 py-2 rounded-xl bg-purple-950/40 border border-purple-800/40 text-xs font-bold text-purple-300 hover:text-white flex items-center gap-1.5"
          >
            <Database className="w-3.5 h-3.5" /> SQL Schema
          </button>

          <button
            onClick={onBackToSite}
            className="px-4 py-2 rounded-xl bg-purple-950/40 border border-purple-800/40 text-xs font-bold text-purple-300 hover:text-white flex items-center gap-2"
          >
            <Eye className="w-4 h-4" /> Live Site
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-rose-950/40 border border-rose-800/40 text-xs font-bold text-rose-300 hover:text-white flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Lock
          </button>
        </div>
      </div>

      {/* Admin Category Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-4 mb-6 border-b border-purple-900/40">
        {[
          { id: 'logo_audio', label: 'Logo Audio' },
          { id: 'brand_anthem', label: 'Brand Anthem' },
          { id: 'podcast_audio', label: 'Podcast Audio' },
          { id: 'commercial_song', label: 'Commercial Songs' },
          { id: 'jingle', label: 'Jingle' },
          { id: 'extras', label: 'Extras' },
          { id: 'blog', label: 'Blog Posts' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as CategoryType)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'bg-purple-950/20 text-slate-300 border-purple-900/30 hover:bg-purple-900/30 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Actions Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white uppercase tracking-wider font-mono">
          Managing: <span className="text-purple-400">{activeTab.replace('_', ' ')}</span>
          <span className="ml-2 text-xs font-normal text-slate-400 font-sans">
            ({activeTab === 'blog' ? blogPosts.length : filteredAudio.length} entries)
          </span>
        </h2>

        <button
          onClick={() => openCreateModal(activeTab)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4" /> Add New Entry
        </button>
      </div>

      {/* Content List for Selected Category */}
      {activeTab === 'blog' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <div key={post.id} className="glass-panel rounded-2xl p-6 border border-purple-900/40 relative">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">{post.title}</h3>
                </div>
                <button
                  onClick={() => handleDeleteBlog(post.id)}
                  className="p-2 rounded-lg bg-rose-950/40 text-rose-400 hover:bg-rose-900/60"
                  title="Delete Post"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-300/80 line-clamp-2 mb-4">{post.excerpt}</p>
              <div className="text-[11px] font-mono text-slate-400">
                Author: {post.author} • {post.readTime}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAudio.map((item) => (
            <div key={item.id} className="relative group">
              <AudioCard item={item} />
              
              {/* Admin Action Buttons on Card */}
              <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-[#08060e]/90 p-1.5 rounded-xl border border-purple-900/50 backdrop-blur-md">
                <button
                  onClick={() => openEditModal(item)}
                  className="p-1.5 rounded-lg text-purple-300 hover:bg-purple-900/60 hover:text-white transition-colors"
                  title="Edit Track"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteAudio(item.id, item.title)}
                  className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/60 transition-colors"
                  title="Delete Audio Entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Entry Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#0f0a1c] border border-purple-500/40 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => {
                if (previewAudioRef.current) previewAudioRef.current.pause();
                setIsPreviewPlaying(false);
                setShowModal(false);
              }}
              className="absolute top-6 right-6 p-2 rounded-full bg-purple-950/60 text-purple-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Music className="w-5 h-5 text-purple-400" />
              {editingId ? 'Edit' : 'Add New'} {activeTab.replace('_', ' ').toUpperCase()} Track
            </h3>

            {activeTab === 'blog' ? (
              <form onSubmit={handleSaveBlog} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-purple-300 uppercase mb-1">Post Title *</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full bg-[#08060e] border border-purple-900/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-purple-300 uppercase mb-1">Excerpt *</label>
                  <textarea
                    required
                    rows={2}
                    value={blogExcerpt}
                    onChange={(e) => setBlogExcerpt(e.target.value)}
                    className="w-full bg-[#08060e] border border-purple-900/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-xs font-bold text-purple-300 uppercase mb-1">Body Content *</label>
                  <textarea
                    required
                    rows={6}
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    className="w-full bg-[#08060e] border border-purple-900/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400 font-mono text-xs"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-xs font-bold text-purple-300 uppercase mb-1">Featured Image URL</label>
                  <input
                    type="text"
                    value={blogImage}
                    onChange={(e) => setBlogImage(e.target.value)}
                    className="w-full bg-[#08060e] border border-purple-900/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full py-3 rounded-xl bg-purple-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                >
                  {isSaving ? 'Saving...' : 'Publish Blog Post'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSaveAudio} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-purple-300 uppercase mb-1">Track Title *</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. NeonPulse Signature"
                    className="w-full bg-[#08060e] border border-purple-900/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-purple-300 uppercase mb-1">Client / Brand Name *</label>
                    <input
                      type="text"
                      required
                      value={formClient}
                      onChange={(e) => setFormClient(e.target.value)}
                      placeholder="e.g. Verve Pay"
                      className="w-full bg-[#08060e] border border-purple-900/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-purple-300 uppercase mb-1">
                      Duration *
                      {audioDetectionLoading && <span className="ml-1 text-[10px] text-purple-400 lowercase animate-pulse">(detecting...)</span>}
                    </label>
                    <input
                      type="text"
                      required
                      value={formDuration}
                      onChange={(e) => setFormDuration(e.target.value)}
                      placeholder="0:03"
                      className="w-full bg-[#08060e] border border-purple-900/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>
                </div>

                {/* Cloudflare Audio URL Input & Live Audio Tester */}
                <div className="bg-purple-950/20 border border-purple-800/40 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-purple-300 uppercase">
                      Audio File URL (Cloudflare CDN / R2 / Direct Link) *
                    </label>
                    {audioDetectedDuration && (
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                        ✓ Stream Active ({audioDetectedDuration})
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      required
                      value={formAudioUrl}
                      onChange={(e) => handleAudioUrlChange(e.target.value)}
                      placeholder="https://pub-xxxx.r2.dev/track.mp3 or https://cdn.hmmstudio.com/..."
                      className="flex-1 bg-[#08060e] border border-purple-900/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400 font-mono text-xs"
                    />

                    {formAudioUrl.trim() && (
                      <button
                        type="button"
                        onClick={togglePreviewAudio}
                        className={`px-3 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all ${
                          isPreviewPlaying
                            ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                            : 'bg-purple-950/60 text-purple-200 border-purple-700/50 hover:bg-purple-900/60'
                        }`}
                        title={isPreviewPlaying ? 'Pause Audio Preview' : 'Test & Preview Audio'}
                      >
                        {isPreviewPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                        <span>{isPreviewPlaying ? 'Pause' : 'Test'}</span>
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-purple-300/60">
                    Accepts direct Cloudflare R2 bucket URLs, Cloudflare Pages/Worker links, or MP3/WAV/OGG/AAC files.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-purple-300 uppercase mb-1">Cover Artwork Image URL</label>
                  <input
                    type="text"
                    value={formCoverImage}
                    onChange={(e) => setFormCoverImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-[#08060e] border border-purple-900/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-purple-300 uppercase mb-1">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    placeholder="Tech, Energy, Minimal"
                    className="w-full bg-[#08060e] border border-purple-900/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-purple-300 uppercase mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Short description of the sonic identity composition..."
                    className="w-full bg-[#08060e] border border-purple-900/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
                  ></textarea>
                </div>

                <div className="flex items-center gap-2 py-1">
                  <input
                    type="checkbox"
                    id="formIsFeatured"
                    checked={formIsFeatured}
                    onChange={(e) => setFormIsFeatured(e.target.checked)}
                    className="w-4 h-4 rounded border-purple-800 bg-[#08060e] text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor="formIsFeatured" className="text-xs font-bold text-purple-300 cursor-pointer">
                    Highlight as Featured Track on Website
                  </label>
                </div>

                {activeTab === 'commercial_song' && (
                  <div className="p-3.5 bg-purple-950/30 border border-purple-800/40 rounded-xl space-y-3">
                    <p className="text-xs font-bold text-purple-300 uppercase">Optional Case Study Breakdown</p>
                    <input
                      type="text"
                      value={formChallenge}
                      onChange={(e) => setFormChallenge(e.target.value)}
                      placeholder="Challenge (e.g. Need to stand out from generic EV ads)"
                      className="w-full bg-[#08060e] border border-purple-900/60 rounded-lg px-3 py-2 text-xs text-white"
                    />
                    <input
                      type="text"
                      value={formSolution}
                      onChange={(e) => setFormSolution(e.target.value)}
                      placeholder="Sonic Solution (e.g. Layered synth hook & electric cello)"
                      className="w-full bg-[#08060e] border border-purple-900/60 rounded-lg px-3 py-2 text-xs text-white"
                    />
                    <input
                      type="text"
                      value={formResult}
                      onChange={(e) => setFormResult(e.target.value)}
                      placeholder="Result (e.g. 45M impressions & 38% higher brand recall)"
                      className="w-full bg-[#08060e] border border-purple-900/60 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full py-3.5 rounded-xl bg-purple-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-purple-500 shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all flex items-center justify-center gap-2"
                >
                  {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  <span>{isSaving ? 'Saving & Publishing Live...' : 'Save Entry & Publish Live'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Supabase SQL Schema Modal */}
      {showSchemaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#0f0a1c] border border-purple-500/40 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setShowSchemaModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-purple-950/60 text-purple-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center shrink-0">
                <Database className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Supabase SQL Schema Setup</h3>
                <p className="text-xs text-slate-400">Project: <code className="text-purple-300 font-mono">{SUPABASE_PROJECT_ID}</code></p>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              To activate multi-device cloud storage and real-time syncing, paste this schema into your Supabase SQL Editor once. It sets up tables for audio tracks, videos, blog posts, and enables real-time websocket broadcasting.
            </p>

            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={handleCopySql}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                  copiedSql
                    ? 'bg-emerald-600 text-white'
                    : 'bg-purple-600 text-white hover:bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                }`}
              >
                {copiedSql ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy SQL Schema Script'}</span>
              </button>

              <a
                href={SUPABASE_SQL_URL}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-purple-950/60 border border-purple-700/50 text-purple-200 hover:text-white hover:bg-purple-900/60 font-bold text-xs flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open Supabase SQL Editor</span>
              </a>

              <button
                onClick={async () => {
                  await checkHealth();
                  await loadAllData();
                  if (healthStatus?.tablesExist) {
                    showToast('success', 'Tables verified and active!');
                    setShowSchemaModal(false);
                  }
                }}
                className="px-4 py-2.5 rounded-xl bg-purple-950/40 border border-purple-800/40 text-slate-300 hover:text-white font-bold text-xs flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Verify Now</span>
              </button>
            </div>

            <div className="relative">
              <pre className="p-4 bg-[#08060e] border border-purple-900/60 rounded-xl text-[11px] font-mono text-purple-200 overflow-x-auto max-h-64 leading-relaxed">
                {SUPABASE_SCHEMA_SQL}
              </pre>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
