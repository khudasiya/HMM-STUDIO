import React from 'react';
import { AudioItem } from '../types/portfolio';
import { AudioCard } from './AudioCard';
import { Zap } from 'lucide-react';

interface LogoAudioSectionProps {
  items: AudioItem[];
}

export const LogoAudioSection: React.FC<LogoAudioSectionProps> = ({ items }) => {
  const logoAudioItems = items.filter(i => i.category === 'logo_audio' && i.published);

  return (
    <section id="logo-audio" className="py-20 px-4 max-w-7xl mx-auto relative z-10 scroll-mt-20">
      
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-400 bg-purple-950/60 border border-purple-800/40 px-3 py-1 rounded-full mb-3">
            <Zap className="w-3.5 h-3.5" /> 2-5 SECOND BRAND MARKS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Sonic Logos & Audio Identifiers
          </h2>
        </div>
        <p className="text-sm text-slate-300 max-w-md">
          Ultra-condensed sonic signatures engineered for app checkouts, startup chimes, TV endcards, and push notifications.
        </p>
      </div>

      {/* Grid of Sonic Logos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {logoAudioItems.map((item) => (
          <AudioCard key={item.id} item={item} />
        ))}
      </div>

    </section>
  );
};
