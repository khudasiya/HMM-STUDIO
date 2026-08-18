import React, { useState } from 'react';
import { BlogPost } from '../types/portfolio';
import { BookOpen, Clock, ArrowRight, X, User } from 'lucide-react';

interface BlogSectionProps {
  posts: BlogPost[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const activePosts = posts.filter(p => p.published);

  return (
    <section id="blog" className="py-24 px-4 max-w-7xl mx-auto relative z-10 scroll-mt-20">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-400 bg-purple-950/60 border border-purple-800/40 px-3 py-1 rounded-full mb-3">
            <BookOpen className="w-3.5 h-3.5" /> INSIGHTS & ESSAYS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Sonic Branding Insights
          </h2>
        </div>
        <p className="text-sm text-slate-300 max-w-md">
          Deep dives into audio architecture, sonic psychology, and case studies from our studio team.
        </p>
      </div>

      {/* Grid of Preview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {activePosts.map((post) => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="glass-panel glass-panel-hover rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between border border-purple-900/40 group"
          >
            <div>
              <div className="relative h-56 overflow-hidden">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-200 bg-[#08060e]/80 border border-purple-500/40 rounded-full backdrop-blur-md">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-xs font-mono text-purple-300/70 mb-2">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                  <span>•</span>
                  <span>{post.createdAt}</span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors mb-3">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-purple-900/30">
              <span className="text-xs text-slate-400 font-medium">{post.author}</span>
              <span className="text-xs font-bold text-purple-400 group-hover:text-white flex items-center gap-1">
                Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0f0a1c] border border-purple-500/40 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl relative">
            
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 hover:text-white hover:bg-purple-900"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-purple-300 bg-purple-900/40 border border-purple-500/30 rounded-full">
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
                return <p key={idx}>{paragraph}</p>;
              })}
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
