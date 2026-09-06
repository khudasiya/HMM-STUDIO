import React, { useState } from 'react';
import { AudioItem } from '../types/portfolio';
import { AudioCard } from './AudioCard';
import { Mic, Play, Pause, Radio, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { PageHeader } from './PageHeader';

interface PodcastAudioSectionProps {
  items: AudioItem[];
  onNavigate?: (sectionId: string) => void;
  isStandalonePage?: boolean;
}

export const PodcastAudioSection: React.FC<PodcastAudioSectionProps> = ({ 
  items, 
  onNavigate, 
  isStandalonePage = false 
}) => {
  const podcastItems = items.filter(i => i.category === 'podcast_audio' && i.published);
  const [activeSimTrack, setActiveSimTrack] = useState<'intro' | 'bed' | 'stinger' | 'outro' | null>(null);

  return (
    <section id="podcast-audio" className={`py-12 px-4 max-w-7xl mx-auto relative z-10 ${isStandalonePage ? '' : 'scroll-mt-20'}`}>
      
      {isStandalonePage && onNavigate && (
        <PageHeader
          title="Podcast Intros, Outros & Show Soundscapes"
          subtitle="Engineered show audio suites for top-charting podcasts, video shows, & audiobooks — including intros, voice beds, transition stingers, & outros."
          category="Show Themes & Audio Suites"
          icon={Mic}
          currentSectionId="podcast-audio"
          onNavigate={onNavigate}
        />
      )}

      {!isStandalonePage && (
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-400 bg-purple-950/60 border border-purple-800/40 px-3 py-1 rounded-full mb-3">
              <Mic className="w-3.5 h-3.5" /> SHOW IDENTITY
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Podcast Audio Suites
            </h2>
          </div>
          <p className="text-sm text-slate-300 max-w-md">
            Signature podcast intros, dialogue voice beds, transition stingers, and outro bumpers designed to captivate listeners.
          </p>
        </div>
      )}

      {/* Grid of Podcast Tracks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
        {podcastItems.map((item) => (
          <AudioCard key={item.id} item={item} />
        ))}
      </div>

      {/* Interactive Podcast Show Simulator on Standalone Page */}
      {isStandalonePage && onNavigate && (
        <div className="space-y-12 border-t border-purple-900/40 pt-16">
          
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
              SHOW AUDIO SIMULATOR
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Podcast Audio Package Components
            </h3>
            <p className="text-xs text-slate-400 mt-2">
              Click any element below to test how our podcast sound suite fits together seamlessly.
            </p>
          </div>

          <div className="bg-[#0f0a1c]/90 border border-purple-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              <div 
                onClick={() => setActiveSimTrack(activeSimTrack === 'intro' ? null : 'intro')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  activeSimTrack === 'intro' 
                    ? 'bg-purple-600/30 border-purple-400 text-white' 
                    : 'bg-purple-950/30 border-purple-900/40 text-slate-300 hover:border-purple-600/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300 font-bold">01. SHOW INTRO</span>
                  {activeSimTrack === 'intro' ? <Pause className="w-4 h-4 text-purple-300" /> : <Play className="w-4 h-4 text-purple-400" />}
                </div>
                <h4 className="font-bold text-white text-base">Flagship Theme (15s)</h4>
                <p className="text-xs text-slate-400 mt-1">High-energy theme song that establishes show identity and hooks listeners instantly.</p>
              </div>

              <div 
                onClick={() => setActiveSimTrack(activeSimTrack === 'bed' ? null : 'bed')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  activeSimTrack === 'bed' 
                    ? 'bg-purple-600/30 border-purple-400 text-white' 
                    : 'bg-purple-950/30 border-purple-900/40 text-slate-300 hover:border-purple-600/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300 font-bold">02. VOICE BED</span>
                  {activeSimTrack === 'bed' ? <Pause className="w-4 h-4 text-purple-300" /> : <Play className="w-4 h-4 text-purple-400" />}
                </div>
                <h4 className="font-bold text-white text-base">Host Intro Bed (30s)</h4>
                <p className="text-xs text-slate-400 mt-1">Subtle background music bed ducked perfectly behind host episode introduction speech.</p>
              </div>

              <div 
                onClick={() => setActiveSimTrack(activeSimTrack === 'stinger' ? null : 'stinger')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  activeSimTrack === 'stinger' 
                    ? 'bg-purple-600/30 border-purple-400 text-white' 
                    : 'bg-purple-950/30 border-purple-900/40 text-slate-300 hover:border-purple-600/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300 font-bold">03. STINGER</span>
                  {activeSimTrack === 'stinger' ? <Pause className="w-4 h-4 text-purple-300" /> : <Play className="w-4 h-4 text-purple-400" />}
                </div>
                <h4 className="font-bold text-white text-base">Segment Wipe (3s)</h4>
                <p className="text-xs text-slate-400 mt-1">Quick sonic transition marker for mid-roll sponsor breaks & section changes.</p>
              </div>

              <div 
                onClick={() => setActiveSimTrack(activeSimTrack === 'outro' ? null : 'outro')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  activeSimTrack === 'outro' 
                    ? 'bg-purple-600/30 border-purple-400 text-white' 
                    : 'bg-purple-950/30 border-purple-900/40 text-slate-300 hover:border-purple-600/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300 font-bold">04. SHOW OUTRO</span>
                  {activeSimTrack === 'outro' ? <Pause className="w-4 h-4 text-purple-300" /> : <Play className="w-4 h-4 text-purple-400" />}
                </div>
                <h4 className="font-bold text-white text-base">Call-To-Action (20s)</h4>
                <p className="text-xs text-slate-400 mt-1">Warm closing bed for host subscribe reminders, credits & episode wrap-up.</p>
              </div>

            </div>

            {activeSimTrack && (
              <div className="mt-6 pt-4 border-t border-purple-900/50 text-center animate-fade-in">
                <span className="text-xs font-mono text-purple-300 bg-purple-950/80 px-3 py-1 rounded-full border border-purple-800/40">
                  Simulating: {activeSimTrack.toUpperCase()} audio layer active
                </span>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-r from-purple-950/60 to-[#120b22] border border-purple-900/60 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono text-purple-300 uppercase tracking-widest font-bold">
                PODCAST PACKAGE
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-white mt-1 mb-2">
                Launching a new show or redesigning audio?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Get a complete podcast audio identity suite delivered in 7 days, fully mastered for Apple Podcasts, Spotify & YouTube.
              </p>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shrink-0 cursor-pointer"
            >
              Request Podcast Suite
            </button>
          </div>

        </div>
      )}

    </section>
  );
};
