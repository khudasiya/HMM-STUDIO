import React from 'react';
import { AudioItem } from '../types/portfolio';
import { AudioCard } from './AudioCard';
import { Volume2 } from 'lucide-react';

interface JingleSectionProps {
  items: AudioItem[];
}

export const JingleSection: React.FC<JingleSectionProps> = ({ items }) => {
  const jingles = items.filter(i => i.category === 'jingle' && i.published);

  return (
    <section id="jingles" className="py-20 px-4 max-w-7xl mx-auto relative z-10 scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-300 bg-purple-950/60 border border-purple-800/40 px-3 py-1 rounded-full mb-3">
            <Volume2 className="w-3.5 h-3.5 text-purple-400" /> REPEATABLE BRAND HOOKS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Short-Form Jingles
          </h2>
        </div>
        <p className="text-sm text-slate-300 max-w-md">
          Catchy, high-recall musical hooks engineered for radio broadcasts, retail spots, and social media ads.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jingles.map((item) => (
          <AudioCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};
