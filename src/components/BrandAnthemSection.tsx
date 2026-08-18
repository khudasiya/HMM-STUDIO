import React from 'react';
import { AudioItem } from '../types/portfolio';
import { AudioCard } from './AudioCard';
import { Music } from 'lucide-react';

interface BrandAnthemSectionProps {
  items: AudioItem[];
}

export const BrandAnthemSection: React.FC<BrandAnthemSectionProps> = ({ items }) => {
  const anthems = items.filter(i => i.category === 'brand_anthem' && i.published);

  return (
    <section id="brand-anthem" className="py-24 px-4 max-w-7xl mx-auto relative z-10 scroll-mt-20">
      
      {/* Editorial Section Header */}
      <div className="bg-gradient-to-r from-purple-950/40 via-indigo-950/20 to-purple-950/40 border border-purple-800/30 rounded-3xl p-8 sm:p-12 mb-12 backdrop-blur-xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-lavender-light bg-purple-900/60 border border-purple-500/30 px-3.5 py-1 rounded-full mb-4">
            <Music className="w-3.5 h-3.5" /> FLAGSHIP MUSICAL IDENTITIES
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Brand Anthems & Symphony Scores
          </h2>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            Full-length musical compositions crafted to serve as the master audio backbone for major brand keynotes, global summits, and international launch films.
          </p>
        </div>
      </div>

      {/* Grid featuring large editorial cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {anthems.map((item) => (
          <AudioCard key={item.id} item={item} featured={true} />
        ))}
      </div>

    </section>
  );
};
