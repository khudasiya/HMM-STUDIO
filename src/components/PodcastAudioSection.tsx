import React from 'react';
import { AudioItem } from '../types/portfolio';
import { AudioCard } from './AudioCard';
import { Mic } from 'lucide-react';

interface PodcastAudioSectionProps {
  items: AudioItem[];
}

export const PodcastAudioSection: React.FC<PodcastAudioSectionProps> = ({ items }) => {
  const podcastItems = items.filter(i => i.category === 'podcast_audio' && i.published);

  return (
    <section id="podcast-audio" className="py-20 px-4 max-w-7xl mx-auto relative z-10 scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-300 bg-purple-950/60 border border-purple-800/40 px-3 py-1 rounded-full mb-3">
            <Mic className="w-3.5 h-3.5 text-purple-400" /> PODCAST SOUND DESIGN
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Podcast Intros, Outros & Themes
          </h2>
        </div>
        <p className="text-sm text-slate-300 max-w-md">
          Bespoke themes and transition audio tailored to define the broadcast personality of top-charting podcasts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {podcastItems.map((item) => (
          <AudioCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};
