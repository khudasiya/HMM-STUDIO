import React from 'react';
import { AudioItem } from '../types/portfolio';
import { AudioCard } from './AudioCard';
import { Zap, Activity, Sliders, Smartphone, Tv, Radio, Sparkles } from 'lucide-react';
import { PageHeader } from './PageHeader';

interface LogoAudioSectionProps {
  items: AudioItem[];
  onNavigate?: (sectionId: string) => void;
  isStandalonePage?: boolean;
}

export const LogoAudioSection: React.FC<LogoAudioSectionProps> = ({ 
  items, 
  onNavigate, 
  isStandalonePage = false 
}) => {
  const logoAudioItems = items.filter(i => i.category === 'logo_audio' && i.published);

  return (
    <section id="logo-audio" className={`py-12 px-4 max-w-7xl mx-auto relative z-10 ${isStandalonePage ? '' : 'scroll-mt-20'}`}>
      
      {isStandalonePage && onNavigate && (
        <PageHeader
          title="Sonic Logos & Audio Identifiers"
          subtitle="Ultra-condensed 2-5 second sonic signatures engineered for instant brand memory retention across app checkouts, startup chimes, & broadcast endcards."
          category="2-5s Brand Marks"
          icon={Zap}
          currentSectionId="logo-audio"
          onNavigate={onNavigate}
        />
      )}

      {!isStandalonePage && (
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
      )}

      {/* Grid of Sonic Logos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
        {logoAudioItems.map((item) => (
          <AudioCard key={item.id} item={item} />
        ))}
      </div>

      {/* Standalone Page Blueprint & Specifications */}
      {isStandalonePage && onNavigate && (
        <div className="space-y-12 border-t border-purple-900/40 pt-16">
          
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
              SONIC ARCHITECTURE
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Anatomy of a High-Impact Sonic Logo
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0f0a1c]/80 border border-purple-900/50 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 font-mono font-bold mb-4">
                01
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Transient Attack (0.0s - 0.5s)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                The immediate acoustic trigger designed to slice through ambient noise and lock user attention. Uses crisp high-frequency micro-percussion.
              </p>
            </div>

            <div className="bg-[#0f0a1c]/80 border border-purple-900/50 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 font-mono font-bold mb-4">
                02
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Tonal Core (0.5s - 2.0s)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                The emotional heart of the brand mark. Synthesized intervals or organic acoustic timbres that build brand trust and recognizable character.
              </p>
            </div>

            <div className="bg-[#0f0a1c]/80 border border-purple-900/50 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 font-mono font-bold mb-4">
                03
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Harmonic Tail (2.0s - 3.5s)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                A warm, lingering reverb decay that leaves a subconscious positive emotional memory without cluttering subsequent audio streams.
              </p>
            </div>
          </div>

          {/* Touchpoints checklist */}
          <div className="bg-gradient-to-r from-purple-950/60 to-[#120b22] border border-purple-900/60 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono text-purple-300 uppercase tracking-widest font-bold">
                OMNICHANNEL DEPLOYMENT
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-white mt-1 mb-2">
                Need a custom sonic logo for your platform?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                We deliver optimized master files calibrated specifically for iOS/Android apps, TV broadcasts, smart hardware, & EV vehicles.
              </p>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-900/50 shrink-0 cursor-pointer"
            >
              Commission Sonic Logo
            </button>
          </div>

        </div>
      )}

    </section>
  );
};
