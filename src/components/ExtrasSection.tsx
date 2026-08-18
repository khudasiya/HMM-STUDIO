import React from 'react';
import { AudioItem, VideoItem } from '../types/portfolio';
import { AudioCard } from './AudioCard';
import { Film, Sparkles, Play } from 'lucide-react';

interface ExtrasSectionProps {
  audioItems: AudioItem[];
  videoItems: VideoItem[];
}

export const ExtrasSection: React.FC<ExtrasSectionProps> = ({ audioItems, videoItems }) => {
  const extrasAudio = audioItems.filter(i => i.category === 'extras' && i.published);
  const extrasVideos = videoItems.filter(v => v.published);

  return (
    <section id="extras" className="py-24 px-4 max-w-7xl mx-auto relative z-10 scroll-mt-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-lavender-light bg-purple-950/60 border border-purple-800/40 px-3 py-1 rounded-full mb-3">
            <Film className="w-3.5 h-3.5 text-purple-400" /> STINGERS & VIDEO WORK
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Extras & Video Sound Design
          </h2>
        </div>
        <p className="text-sm text-slate-300 max-w-md">
          Behind-the-scenes studio scoring sessions, micro haptic stingers, and spatial sound design for brand video reels.
        </p>
      </div>

      <div className="space-y-12">
        {/* Embedded Video Showcase */}
        {extrasVideos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {extrasVideos.map((video) => (
              <div key={video.id} className="glass-panel rounded-2xl overflow-hidden border border-purple-900/40 p-4">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black mb-4 group">
                  <video
                    src={video.videoUrl}
                    poster={video.thumbnailUrl}
                    controls
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">
                      {video.client}
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">
                      {video.title}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 text-[10px] font-bold text-purple-300 bg-purple-950/60 border border-purple-800/40 rounded-full uppercase">
                    VIDEO SCORED
                  </span>
                </div>
                {video.description && (
                  <p className="text-xs text-slate-300/80 mt-2 leading-relaxed">
                    {video.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Playable Mini Audio Stingers Grid */}
        {extrasAudio.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-purple-300 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Micro Stingers & Haptic Audio
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {extrasAudio.map((item) => (
                <AudioCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>

    </section>
  );
};
