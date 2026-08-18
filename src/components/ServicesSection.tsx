import React from 'react';
import { SERVICES } from '../data/mockData';
import { Zap, Music, Mic, Radio, Volume2, Film, ArrowDownRight } from 'lucide-react';

interface ServicesSectionProps {
  onNavigate: (sectionId: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-6 h-6 text-purple-400" />,
  Music: <Music className="w-6 h-6 text-lavender-light" />,
  Mic: <Mic className="w-6 h-6 text-purple-300" />,
  Radio: <Radio className="w-6 h-6 text-indigo-400" />,
  Volume2: <Volume2 className="w-6 h-6 text-purple-400" />,
  Film: <Film className="w-6 h-6 text-purple-300" />
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigate }) => {
  return (
    <section id="services" className="py-24 px-4 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono uppercase tracking-widest text-purple-400 bg-purple-950/60 border border-purple-800/40 px-3 py-1 rounded-full">
          SERVICES OVERVIEW
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-4 mb-4">
          Sonic Identity Offerings
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          From 2-second UI audio stingers to multi-minute cinematic brand anthems, we sculpt sound that makes companies unforgettable.
        </p>
      </div>

      {/* Grid of 6 Core Offerings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((srv) => (
          <div
            key={srv.id}
            onClick={() => onNavigate(srv.anchorId)}
            className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between cursor-pointer group border border-purple-900/40 hover:border-purple-500/50"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {iconMap[srv.iconName]}
              </div>

              <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-semibold">
                {srv.subtitle}
              </span>
              <h3 className="text-xl font-bold text-white mt-1 mb-2 group-hover:text-purple-200 transition-colors">
                {srv.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed mb-6">
                {srv.description}
              </p>
            </div>

            <div>
              <div className="space-y-1.5 border-t border-purple-900/30 pt-4 mb-4">
                {srv.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-purple-300 group-hover:text-white transition-colors">
                <span>Explore Showcase</span>
                <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
