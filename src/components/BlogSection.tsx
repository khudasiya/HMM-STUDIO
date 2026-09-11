import React, { useState } from 'react';
import { BlogPost } from '../types/portfolio';
import { 
  BookOpen, 
  Clock, 
  ArrowRight, 
  X, 
  User, 
  Filter, 
  Sparkles, 
  Mail, 
  Presentation, 
  FileText, 
  Radio, 
  Play 
} from 'lucide-react';
import { PageHeader } from './PageHeader';
import { SonicPitchDeck } from './SonicPitchDeck';

interface BlogSectionProps {
  posts: BlogPost[];
  onNavigate?: (sectionId: string) => void;
  isStandalonePage?: boolean;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ 
  posts, 
  onNavigate, 
  isStandalonePage = false 
}) => {
  const [activeMainTab, setActiveMainTab] = useState<'pitch' | 'articles'>('pitch');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const activePosts = posts.filter(p => p.published);

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'sonic_strategy', label: 'Sonic Strategy' },
    { id: 'audio_tech', label: 'Audio Tech' },
    { id: 'case_studies', label: 'Case Studies' },
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? activePosts 
    : activePosts.filter(p => p.category.toLowerCase().includes(selectedCategory.replace('_', ' ')));

  return (
    <section id="blog" className={`py-12 px-4 max-w-7xl mx-auto relative z-10 ${isStandalonePage ? '' : 'scroll-mt-20'}`}>
      
      {isStandalonePage && onNavigate && (
        <PageHeader
          title="Sonic Branding Insights & Presentation Deck"
          subtitle="Explore our complete 10-slide agency deck, sound branding whitepaper, audio architecture essays, & real-world case studies."
          category="Insights & Strategy"
          icon={BookOpen}
          currentSectionId="blog"
          onNavigate={onNavigate}
        />
      )}

      {!isStandalonePage && (
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#f5d061] bg-[#d4af37]/15 border border-[#d4af37]/30 px-3.5 py-1 rounded-full mb-3 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#f5d061]" /> FEATURED MASTERCLASS & ESSAYS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Sonic Identity Playbook & Insights
            </h2>
          </div>
          <p className="text-sm text-slate-300 max-w-md">
            Interactive pitch deck, audio architecture frameworks, and case studies from our studio team.
          </p>
        </div>
      )}

      {/* Main Mode Navigation Bar (Pitch Deck vs Articles) */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-purple-900/40 pb-5">
        <div className="flex items-center gap-2 bg-[#120c24] p-1.5 rounded-2xl border border-purple-900/50 shadow-inner">
          <button
            onClick={() => setActiveMainTab('pitch')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 ${
              activeMainTab === 'pitch'
                ? 'bg-gradient-to-r from-purple-600 to-[#8b5cf6] text-white shadow-lg shadow-purple-900/40 border border-purple-400/40'
                : 'text-slate-400 hover:text-white hover:bg-purple-950/40'
            }`}
          >
            <Presentation className="w-4 h-4 text-[#f5d061]" />
            <span>Interactive Pitch Deck</span>
            <span className="px-2 py-0.5 text-[10px] font-mono bg-[#f5d061] text-slate-950 rounded-full font-extrabold">
              10 Slides
            </span>
          </button>

          <button
            onClick={() => setActiveMainTab('articles')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 ${
              activeMainTab === 'articles'
                ? 'bg-gradient-to-r from-purple-600 to-[#8b5cf6] text-white shadow-lg shadow-purple-900/40 border border-purple-400/40'
                : 'text-slate-400 hover:text-white hover:bg-purple-950/40'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Studio Articles & Essays</span>
            <span className="text-xs font-mono text-purple-300">
              ({activePosts.length})
            </span>
          </button>
        </div>

        {/* Quick Direct Link to Contact */}
        {onNavigate && (
          <button
            onClick={() => onNavigate('contact')}
            className="px-4 py-2 rounded-xl bg-[#f5d061]/15 hover:bg-[#f5d061]/25 border border-[#f5d061]/40 text-[#f5d061] font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ml-auto"
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Request Sonic Audit</span>
          </button>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: THE COMPLETE INTERACTIVE PITCH DECK PRESENTATION
          ═══════════════════════════════════════════════════════════════ */}
      {activeMainTab === 'pitch' && (
        <div className="mb-16 animate-fade-in">
          <SonicPitchDeck onNavigate={onNavigate} />
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2: STUDIO ESSAYS & ARTICLES ARCHIVE
          ═══════════════════════════════════════════════════════════════ */}
      {activeMainTab === 'articles' && (
        <div className="animate-fade-in">
          {/* Category Filters for Articles */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
            <Filter className="w-4 h-4 text-purple-400 shrink-0 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-purple-600 text-white border border-purple-400 font-bold shadow-md'
                    : 'bg-purple-950/40 text-slate-300 hover:bg-purple-900/50 border border-purple-900/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid of Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="glass-panel glass-panel-hover rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between border border-purple-900/40 group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-200 bg-[#08060e]/85 border border-purple-500/40 rounded-full backdrop-blur-md">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs font-mono text-purple-300/70 mb-2">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                      <span>•</span>
                      <span>{post.createdAt}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-purple-200 transition-colors mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-300/80 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-purple-900/30">
                  <span className="text-[11px] text-slate-400 font-medium truncate max-w-[140px]">{post.author}</span>
                  <span className="text-xs font-bold text-purple-400 group-hover:text-white flex items-center gap-1 shrink-0">
                    Read Essay <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0f0a1c] border border-purple-500/40 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl relative">
            
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 hover:text-white hover:bg-purple-900 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#f5d061] bg-[#d4af37]/20 border border-[#d4af37]/30 rounded-full font-mono">
              {selectedPost.category}
            </span>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 mb-4 leading-tight">
              {selectedPost.title}
            </h1>

            <div className="flex items-center gap-4 text-xs font-mono text-purple-300/80 mb-6 pb-6 border-b border-purple-900/40">
              <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {selectedPost.author}</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {selectedPost.readTime}</span>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 border border-purple-500/30">
              <img src={selectedPost.featuredImage} alt={selectedPost.title} className="w-full h-full object-cover" />
            </div>

            <div className="prose prose-invert max-w-none text-slate-200 text-sm sm:text-base leading-relaxed space-y-4">
              {selectedPost.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('### ')) {
                  return <h3 key={idx} className="text-xl font-bold text-white mt-6 mb-2">{paragraph.replace('### ', '')}</h3>;
                }
                if (paragraph.startsWith('- ')) {
                  return (
                    <ul key={idx} className="list-disc list-inside space-y-1 my-2">
                      {paragraph.split('\n').map((li, i) => (
                        <li key={i} className="text-slate-300">{li.replace('- ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={idx}>{paragraph}</p>;
              })}
            </div>
          </div>
        </div>
      )}

      {/* Newsletter / Sonic Audit Callout on Standalone Page */}
      {isStandalonePage && (
        <div className="bg-gradient-to-r from-[#17102b] via-[#1c1236] to-[#17102b] border border-[#f5d061]/30 rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#f5d061]/5 rounded-full blur-3xl pointer-events-none" />
          
          <Mail className="w-10 h-10 text-[#f5d061] mb-3" />
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Subscribe to the Sonic Brand Newsletter
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-md mb-6 leading-relaxed">
            Get our monthly essay on sonic branding strategy, spatial audio developments, and audio neuroscience delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
            <input
              type="email"
              placeholder="Enter your work email"
              className="flex-1 bg-purple-950/80 border border-purple-800/60 rounded-full px-5 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#f5d061]"
            />
            <button className="px-6 py-3 rounded-full bg-[#f5d061] hover:bg-[#ffe58f] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shrink-0 cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
