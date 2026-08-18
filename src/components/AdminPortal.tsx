import React, { useState, useEffect } from 'react';
import { api, isSupabaseConfigured } from '../lib/supabase';
import { AudioItem, BlogPost, CategoryType, VideoItem } from '../types/portfolio';
import { AudioCard } from './AudioCard';
import { Shield, Lock, Plus, Trash2, Edit3, Check, X, LogOut, Eye, Upload, Database, Cloud } from 'lucide-react';

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

  // Form State for Adding / Editing
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formClient, setFormClient] = useState('');
  const [formCategory, setFormCategory] = useState<CategoryType>('logo_audio');
  const [formAudioUrl, setFormAudioUrl] = useState('');
  const [formCoverImage, setFormCoverImage] = useState('');
  const [formDuration, setFormDuration] = useState('0:03');
  const [formDescription, setFormDescription] = useState('');
  const [formChallenge, setFormChallenge] = useState('');
  const [formSolution, setFormSolution] = useState('');
  const [formResult, setFormResult] = useState('');
  const [formIsFeatured, setFormIsFeatured] = useState(false);

  // Blog Fields
  const [blogSlug, setBlogSlug] = useState('');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogCategory, setBlogCategory] = useState('Sonic Branding');
  const [blogImage, setBlogImage] = useState('');

  useEffect(() => {
    setIsAuthenticated(api.isAdminAuthenticated());
    loadAllData();
  }, []);

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
    } else {
      setAuthError('Invalid admin passcode. (Default demo passcode: admin)');
    }
  };

  const handleLogout = () => {
    api.setAdminAuthenticated(false);
    setIsAuthenticated(false);
  };

  const openCreateModal = (cat: CategoryType | 'videos') => {
    setEditingId(null);
    setFormCategory(cat === 'videos' ? 'extras' : cat);
    setFormTitle('');
    setFormClient('');
    setFormAudioUrl('https://actions.google.com/sounds/v1/scifi/sci_fi_futuristic_logo_intro.ogg');
    setFormCoverImage('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80');
    setFormDuration('0:03');
    setFormDescription('');
    setFormChallenge('');
    setFormSolution('');
    setFormResult('');
    setFormIsFeatured(false);

    // Blog resets
    setBlogSlug('');
    setBlogExcerpt('');
    setBlogContent('');
    setBlogCategory('Sonic Branding');
    setBlogImage('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80');

    setShowModal(true);
  };

  const handleSaveAudio = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.saveAudioItem({
      id: editingId || undefined,
      title: formTitle,
      client: formClient,
      category: formCategory,
      audioUrl: formAudioUrl,
      coverImage: formCoverImage,
      duration: formDuration,
      description: formDescription,
      caseStudy: formChallenge ? {
        challenge: formChallenge,
        solution: formSolution,
        result: formResult
      } : undefined,
      isFeatured: formIsFeatured,
      published: true,
    });
    setShowModal(false);
    await loadAllData();
    onDataChange();
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
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
    await loadAllData();
    onDataChange();
  };

  const handleDeleteAudio = async (id: string) => {
    if (confirm('Delete this item? It will be removed immediately from the live site.')) {
      await api.deleteAudioItem(id);
      await loadAllData();
      onDataChange();
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (confirm('Delete this blog post?')) {
      await api.deleteBlogPost(id);
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
            Authenticated portal for managing sonic branding portfolio entries and blog insights.
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
      
      {/* Admin Top Status Bar */}
      <div className="glass-panel border border-purple-500/30 rounded-2xl p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center">
            <Shield className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white">Content Management Portal</h1>
              <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                {isSupabaseConfigured ? <Database className="w-3 h-3" /> : <Cloud className="w-3 h-3" />}
                {isSupabaseConfigured ? 'SUPABASE LIVE' : 'SYNC ACTIVE'}
              </span>
            </div>
            <p className="text-xs text-slate-400">All edits sync live immediately with public website views.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToSite}
            className="px-4 py-2 rounded-xl bg-purple-950/40 border border-purple-800/40 text-xs font-bold text-purple-300 hover:text-white flex items-center gap-2"
          >
            <Eye className="w-4 h-4" /> Preview Live Site
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-rose-950/40 border border-rose-800/40 text-xs font-bold text-rose-300 hover:text-white flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Lock Portal
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
              <div className="absolute top-3 right-3 z-20 flex items-center gap-2 bg-[#08060e]/90 p-1.5 rounded-xl border border-purple-900/50">
                <button
                  onClick={() => handleDeleteAudio(item.id)}
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
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-purple-950/60 text-purple-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-6">
              Add New {activeTab.replace('_', ' ').toUpperCase()} Entry
            </h3>

            {activeTab === 'blog' ? (
              <form onSubmit={handleSaveBlog} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-purple-300 uppercase mb-1">Post Title</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full bg-[#08060e] border border-purple-900/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-purple-300 uppercase mb-1">Excerpt</label>
                  <textarea
                    required
                    rows={2}
                    value={blogExcerpt}
                    onChange={(e) => setBlogExcerpt(e.target.value)}
                    className="w-full bg-[#08060e] border border-purple-900/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-xs font-bold text-purple-300 uppercase mb-1">Body Content</label>
                  <textarea
                    required
                    rows={6}
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    className="w-full bg-[#08060e] border border-purple-900/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400 font-mono text-xs"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-xs font-bold text-purple-300 uppercase mb-1">Featured Image URL (Cloudflare CDN / Unsplash)</label>
                  <input
                    type="text"
                    value={blogImage}
                    onChange={(e) => setBlogImage(e.target.value)}
                    className="w-full bg-[#08060e] border border-purple-900/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-purple-600 text-white font-bold text-xs uppercase tracking-wider"
                >
                  Publish Blog Post
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
                    <label className="block text-xs font-bold text-purple-300 uppercase mb-1">Duration *</label>
                    <input
                      type="text"
                      value={formDuration}
                      onChange={(e) => setFormDuration(e.target.value)}
                      placeholder="0:03"
                      className="w-full bg-[#08060e] border border-purple-900/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-purple-300 uppercase mb-1">Audio File URL (Cloudflare CDN / Direct URL) *</label>
                  <input
                    type="text"
                    required
                    value={formAudioUrl}
                    onChange={(e) => setFormAudioUrl(e.target.value)}
                    placeholder="https://cdn.hmmstudio.com/audio/logo1.mp3"
                    className="w-full bg-[#08060e] border border-purple-900/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
                  />
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
                  <label className="block text-xs font-bold text-purple-300 uppercase mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Short description of the sonic identity composition..."
                    className="w-full bg-[#08060e] border border-purple-900/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
                  ></textarea>
                </div>

                {activeTab === 'commercial_song' && (
                  <div className="p-3 bg-purple-950/30 border border-purple-800/40 rounded-xl space-y-3">
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
                  className="w-full py-3.5 rounded-xl bg-purple-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-purple-500 shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all"
                >
                  Save Entry & Publish Live
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
