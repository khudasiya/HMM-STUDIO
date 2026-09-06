import React from 'react';
import { AudioItem } from '../types/portfolio';
import { AudioCard } from './AudioCard';
import { Music, Sliders, Layers, Sparkles, Disc } from 'lucide-react';
import { PageHeader } from './PageHeader';

interface BrandAnthemSectionProps {
  items: AudioItem[];
  onNavigate?: (sectionId: string) => void;
  isStandalonePage?: boolean;
}

export const BrandAnthemSection: React.FC<BrandAnthemSectionProps> = ({ 
  items, 
  onNavigate, 
  isStandalonePage = false 
}) => {
  const anthemItems = items.filter(i => i.category === 'brand_anthem' && i.published);

  return (
    <section id="brand-anthem" className={`py-12 px-4 max-w-7xl mx-auto relative z-10 ${isStandalonePage ? '' : 'scroll-mt-20'}`}>
      
      {isStandalonePage && onNavigate && (
        <PageHeader
          title="Cinematic Brand Anthems"
          subtitle="Full audio brand themes crafted to express company culture, vision, and core narrative through evocative orchestral, electronic, & hybrid compositions."
          category="Full Audio Themes"
          icon={Music}
          currentSectionId="brand-anthem"
          onNavigate={onNavigate}
        />
      )}

      {!isStandalonePage && (
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-400 bg-purple-950/60 border border-purple-800/40 px-3 py-1 rounded-full mb-3">
              <Music className="w-3.5 h-3.5" /> BRAND MUSIC IDENTITY
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Cinematic Brand Anthems
            </h2>
          </div>
          <p className="text-sm text-slate-300 max-w-md">
            Full-length audio signatures crafted for keynote launches, brand films, global events, and internal culture anthems.
          </p>
        </div>
      )}

      {/* Grid of Brand Anthems */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
        {anthemItems.map((item) => (
          <AudioCard key={item.id} item={item} />
        ))}
      </div>

      {/* Extended Features for Standalone Page */}
      {isStandalonePage && onNavigate && (
        <div className="space-y-12 border-t border-purple-900/40 pt-16">
          
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
              STEM & CUTDOWN ARCHITECTURE
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Complete Anthem Package Edits
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#0f0a1c]/80 border border-purple-900/40 rounded-2xl p-5">
              <Disc className="w-6 h-6 text-purple-400 mb-3" />
              <h4 className="font-bold text-white text-base">Full Anthem (2-3 min)</h4>
              <p className="text-xs text-slate-400 mt-1">Complete musical journey for corporate keynotes, brand films & documentary features.</p>
            </div>

            <div className="bg-[#0f0a1c]/80 border border-purple-900/40 rounded-2xl p-5">
              <Sliders className="w-6 h-6 text-indigo-400 mb-3" />
              <h4 className="font-bold text-white text-base">60s & 30s Ad Cuts</h4>
              <p className="text-xs text-slate-400 mt-1">Pacing-optimized commercial edits tailored for television spots & digital pre-rolls.</p>
            </div>

            <div className="bg-[#0f0a1c]/80 border border-purple-900/40 rounded-2xl p-5">
              <Layers className="w-6 h-6 text-sky-400 mb-3" />
              <h4 className="font-bold text-white text-base">15s & 6s Social Edits</h4>
              <p className="text-xs text-slate-400 mt-1">High-impact micro cuts designed for Instagram, TikTok & YouTube Shorts ads.</p>
            </div>

            <div className="bg-[#0f0a1c]/80 border border-purple-900/40 rounded-2xl p-5">
              <Sparkles className="w-6 h-6 text-pink-400 mb-3" />
              <h4 className="font-bold text-white text-base">Ambient Loop Beds</h4>
              <p className="text-xs text-slate-400 mt-1">Seamless background audio loops for event waiting rooms & keynote intros.</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-950/60 via-purple-900/40 to-purple-950/60 border border-purple-500/30 rounded-3xl p-8 text-center flex flex-col items-center">
            <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Ready to compose your brand's flagship theme?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mb-6">
              Our award-winning composers will craft a bespoke musical score tailored to your vision.
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg cursor-pointer"
            >
              Commission Brand Anthem
            </button>
          </div>

        </div>
      )}

    </section>
  );
};
