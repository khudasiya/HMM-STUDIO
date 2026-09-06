import React from 'react';
import { AudioItem } from '../types/portfolio';
import { AudioCard } from './AudioCard';
import { Volume2, Sparkles, Mic2, Radio, Award } from 'lucide-react';
import { PageHeader } from './PageHeader';

interface JingleSectionProps {
  items: AudioItem[];
  onNavigate?: (sectionId: string) => void;
  isStandalonePage?: boolean;
}

export const JingleSection: React.FC<JingleSectionProps> = ({ 
  items, 
  onNavigate, 
  isStandalonePage = false 
}) => {
  const jingleItems = items.filter(i => i.category === 'jingle' && i.published);

  return (
    <section id="jingles" className={`py-12 px-4 max-w-7xl mx-auto relative z-10 ${isStandalonePage ? '' : 'scroll-mt-20'}`}>
      
      {isStandalonePage && onNavigate && (
        <PageHeader
          title="Radio Jingles & Catchy Sonic Hooks"
          subtitle="Memorable broadcast audio jingles and sung vocal hooks designed to stay stuck in listeners' heads for local, regional, & national radio campaigns."
          category="Broadcast Jingles & Hooks"
          icon={Volume2}
          currentSectionId="jingles"
          onNavigate={onNavigate}
        />
      )}

      {!isStandalonePage && (
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-400 bg-purple-950/60 border border-purple-800/40 px-3 py-1 rounded-full mb-3">
              <Volume2 className="w-3.5 h-3.5" /> BROADCAST JINGLES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Radio Jingles & Catchy Hooks
            </h2>
          </div>
          <p className="text-sm text-slate-300 max-w-md">
            Unforgettable vocal & instrumental radio jingles engineered to maximize listener recall and brand familiarity.
          </p>
        </div>
      )}

      {/* Grid of Jingles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
        {jingleItems.map((item) => (
          <AudioCard key={item.id} item={item} />
        ))}
      </div>

      {/* Standalone Page Features */}
      {isStandalonePage && onNavigate && (
        <div className="space-y-12 border-t border-purple-900/40 pt-16">
          
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
              BROADCAST DELIVERABLE SPECS
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Included Jingle Mix Formats
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#0f0a1c]/80 border border-purple-900/40 rounded-2xl p-6">
              <Mic2 className="w-6 h-6 text-purple-400 mb-3" />
              <h4 className="font-bold text-white text-lg mb-1">Sung Vocal Hook</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Studio-recorded vocal performance featuring professional session singers & custom harmony arrangements.
              </p>
            </div>

            <div className="bg-[#0f0a1c]/80 border border-purple-900/40 rounded-2xl p-6">
              <Radio className="w-6 h-6 text-amber-400 mb-3" />
              <h4 className="font-bold text-white text-lg mb-1">Acapella & Donut Mixes</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Isolated vocal hook stems & "donut" backing beds for voiceover announcement insertions.
              </p>
            </div>

            <div className="bg-[#0f0a1c]/80 border border-purple-900/40 rounded-2xl p-6">
              <Award className="w-6 h-6 text-emerald-400 mb-3" />
              <h4 className="font-bold text-white text-lg mb-1">5s Sonic Tag</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ultra-brief 5-second vocal end-tag for quick sponsor mentions and station IDs.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-950/60 to-[#120b22] border border-purple-900/60 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono text-purple-300 uppercase tracking-widest font-bold">
                COMMISSION A JINGLE
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-white mt-1 mb-2">
                Need an unforgettable radio jingle for your business?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                We craft earworm jingles that stick in listeners' minds and drive immediate phone & web response.
              </p>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shrink-0 cursor-pointer"
            >
              Order Radio Jingle
            </button>
          </div>

        </div>
      )}

    </section>
  );
};
