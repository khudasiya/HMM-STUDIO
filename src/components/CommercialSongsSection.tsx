import React from 'react';
import { AudioItem } from '../types/portfolio';
import { AudioCard } from './AudioCard';
import { Radio } from 'lucide-react';

interface CommercialSongsSectionProps {
  items: AudioItem[];
}

export const CommercialSongsSection: React.FC<CommercialSongsSectionProps> = ({ items }) => {
  const commercialItems = items.filter(i => i.category === 'commercial_song' && i.published);

  return (
    <section id="commercial-songs" className="py-20 px-4 max-w-7xl mx-auto relative z-10 scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-indigo-300 bg-indigo-950/60 border border-indigo-800/40 px-3 py-1 rounded-full mb-3">
            <Radio className="w-3.5 h-3.5 text-indigo-400" /> AD CAMPAIGN SCORES
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Commercial Songs & Campaign Audio
          </h2>
        </div>
        <p className="text-sm text-slate-300 max-w-md">
          Full commercial songs and campaign scores built around specific brand challenges with measurable ROI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {commercialItems.map((item) => (
          <AudioCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};
