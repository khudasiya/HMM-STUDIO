import React, { useState } from 'react';
import { AudioItem, VideoItem } from '../types/portfolio';
import { AudioCard } from './AudioCard';
import { Film, Play, Sparkles, X, Volume2, Bell, CheckCircle2, AlertTriangle, MousePointerClick, RefreshCw } from 'lucide-react';
import { PageHeader } from './PageHeader';

interface ExtrasSectionProps {
  audioItems: AudioItem[];
  videoItems: VideoItem[];
  onNavigate?: (sectionId: string) => void;
  isStandalonePage?: boolean;
}

export const ExtrasSection: React.FC<ExtrasSectionProps> = ({ 
  audioItems, 
  videoItems,
  onNavigate, 
  isStandalonePage = false 
}) => {
  const extraAudioItems = audioItems.filter(i => i.category === 'extras' && i.published);
  const activeVideos = videoItems.filter(v => v.published);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  // Soundboard Trigger Synthesizer
  const playSoundEffect = (type: string) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'success') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'error') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.setValueAtTime(140, now + 0.1);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'notification') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, now); // B5
        osc.frequency.setValueAtTime(1318.51, now + 0.07); // E6
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'swipe') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      }
    } catch (e) {
      console.warn('Soundboard WebAudio error:', e);
    }
  };

  return (
    <section id="extras" className={`py-12 px-4 max-w-7xl mx-auto relative z-10 ${isStandalonePage ? '' : 'scroll-mt-20'}`}>
      
      {isStandalonePage && onNavigate && (
        <PageHeader
          title="UI Sound FX & Motion Video Stingers"
          subtitle="Micro audio assets, interactive UI sound design effects, & motion graphic stingers designed to elevate digital products, apps, & video intros."
          category="UI SFX & Motion Assets"
          icon={Film}
          currentSectionId="extras"
          onNavigate={onNavigate}
        />
      )}

      {!isStandalonePage && (
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-400 bg-purple-950/60 border border-purple-800/40 px-3 py-1 rounded-full mb-3">
              <Film className="w-3.5 h-3.5" /> MINI STINGERS & SFX
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Extras & Motion Stingers
            </h2>
          </div>
          <p className="text-sm text-slate-300 max-w-md">
            UI interaction sound effects, logo animation soundscapes, and motion graphics stingers.
          </p>
        </div>
      )}

      {/* Audio Stingers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
        {extraAudioItems.map((item) => (
          <AudioCard key={item.id} item={item} />
        ))}
      </div>

      {/* Interactive UI Soundboard Simulator (Available on standalone page & home) */}
      <div className="bg-[#0f0a1c]/90 border border-purple-500/30 rounded-3xl p-6 sm:p-10 mb-16 shadow-2xl">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold flex items-center justify-center gap-2">
            <Volume2 className="w-4 h-4 text-purple-400" />
            INTERACTIVE UI SOUNDBOARD SIMULATOR
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Test Interactive Micro-Sounds
          </h3>
          <p className="text-xs text-slate-400 mt-2">
            Click any button below to trigger real-time web audio feedback sound effects.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <button
            onClick={() => playSoundEffect('click')}
            className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40 hover:border-purple-400 text-slate-200 hover:text-white flex flex-col items-center justify-center gap-2 group transition-all cursor-pointer active:scale-95"
          >
            <MousePointerClick className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold font-mono">Button Tap</span>
            <span className="text-[9px] font-mono text-purple-400">Click to Play</span>
          </button>

          <button
            onClick={() => playSoundEffect('success')}
            className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40 hover:border-purple-400 text-slate-200 hover:text-white flex flex-col items-center justify-center gap-2 group transition-all cursor-pointer active:scale-95"
          >
            <CheckCircle2 className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold font-mono">Success Chime</span>
            <span className="text-[9px] font-mono text-purple-400">Click to Play</span>
          </button>

          <button
            onClick={() => playSoundEffect('error')}
            className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40 hover:border-purple-400 text-slate-200 hover:text-white flex flex-col items-center justify-center gap-2 group transition-all cursor-pointer active:scale-95"
          >
            <AlertTriangle className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold font-mono">Error Tone</span>
            <span className="text-[9px] font-mono text-purple-400">Click to Play</span>
          </button>

          <button
            onClick={() => playSoundEffect('notification')}
            className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40 hover:border-purple-400 text-slate-200 hover:text-white flex flex-col items-center justify-center gap-2 group transition-all cursor-pointer active:scale-95"
          >
            <Bell className="w-6 h-6 text-sky-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold font-mono">Push Pop</span>
            <span className="text-[9px] font-mono text-purple-400">Click to Play</span>
          </button>

          <button
            onClick={() => playSoundEffect('swipe')}
            className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40 hover:border-purple-400 text-slate-200 hover:text-white flex flex-col items-center justify-center gap-2 group transition-all cursor-pointer active:scale-95 col-span-2 sm:col-span-1"
          >
            <RefreshCw className="w-6 h-6 text-rose-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold font-mono">Swipe Whoosh</span>
            <span className="text-[9px] font-mono text-purple-400">Click to Play</span>
          </button>
        </div>
      </div>

      {/* Motion Video Gallery */}
      {activeVideos.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Film className="w-5 h-5 text-purple-400" /> Motion Graphic Videos
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="glass-panel rounded-2xl overflow-hidden cursor-pointer group border border-purple-900/40 hover:border-purple-500/50"
              >
                <div className="relative aspect-video bg-black overflow-hidden">
                  <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">{video.category}</span>
                  <h4 className="text-sm font-bold text-white mt-0.5 truncate">{video.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Video Modal Player */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0f0a1c] border border-purple-500/40 rounded-3xl max-w-4xl w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-purple-950/80 border border-purple-800/40 text-purple-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-xl font-bold text-white mb-4 pr-10">{selectedVideo.title}</h3>
            
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-purple-900/40 mb-4">
              <iframe
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            
            <p className="text-xs text-slate-300">{selectedVideo.description}</p>
          </div>
        </div>
      )}

      {/* Standalone Page Call to Action */}
      {isStandalonePage && onNavigate && (
        <div className="mt-16 bg-gradient-to-r from-purple-950/60 to-[#120b22] border border-purple-900/60 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono text-purple-300 uppercase tracking-widest font-bold">
              CUSTOM SOUND DESIGN
            </span>
            <h4 className="text-xl sm:text-2xl font-bold text-white mt-1 mb-2">
              Need custom sound effects for your app or video?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              We design bespoke sound libraries tailored specifically to your user interface gestures & product motion.
            </p>
          </div>

          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shrink-0 cursor-pointer"
          >
            Request UI Sound Design
          </button>
        </div>
      )}

    </section>
  );
};
