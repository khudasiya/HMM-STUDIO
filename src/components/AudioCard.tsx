import React, { useState } from 'react';
import { Play, Pause, Volume2, Sparkles, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { AudioItem } from '../types/portfolio';
import { useAudio } from '../context/AudioContext';
import { WaveformVisualizer } from './WaveformVisualizer';
import { generateWaveformData } from '../lib/cdn';

interface AudioCardProps {
  item: AudioItem;
  featured?: boolean;
}

export const AudioCard: React.FC<AudioCardProps> = ({ item, featured = false }) => {
  const { currentTrack, isPlaying, togglePlay, currentTime, duration, seek, waveformFrequencies } = useAudio();
  const [showCaseStudy, setShowCaseStudy] = useState(false);

  const isCurrent = currentTrack?.id === item.id;
  const isThisPlaying = isCurrent && isPlaying;

  const progress = isCurrent && duration > 0 ? currentTime / duration : 0;
  const staticFrequencies = generateWaveformData(item.id.length * 7, 36);

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleScrub = (percentage: number) => {
    if (isCurrent && duration > 0) {
      seek(percentage * duration);
    }
  };

  return (
    <div 
      className={`glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col justify-between transition-all border border-purple-900/30 ${
        featured ? 'md:col-span-2 bg-[#120b24]/90 border-purple-500/40 shadow-[0_0_30px_rgba(139,92,246,0.15)]' : ''
      }`}
    >
      <div className="p-5 flex flex-col gap-4">
        
        {/* Top Header: Image / Client & Title */}
        <div className="flex items-start gap-4">
          {item.coverImage && (
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-purple-500/20 bg-purple-950/40">
              <img 
                src={item.coverImage} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
              {isThisPlaying && (
                <div className="absolute inset-0 bg-purple-900/60 backdrop-blur-xs flex items-center justify-center">
                  <Volume2 className="w-6 h-6 text-purple-300 animate-bounce" />
                </div>
              )}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[11px] font-bold text-purple-400 uppercase tracking-widest truncate">
                {item.client}
              </span>
              {item.isFeatured && (
                <span className="shrink-0 flex items-center gap-1 text-[10px] font-semibold text-amber-300 bg-amber-950/50 border border-amber-500/30 px-2 py-0.5 rounded-full">
                  <Sparkles className="w-2.5 h-2.5" /> FEATURED
                </span>
              )}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight truncate">
              {item.title}
            </h3>
            {item.description && (
              <p className="text-xs text-slate-300/80 line-clamp-2 mt-1 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>
        </div>

        {/* Audio Player Controls & Waveform Scrub Bar */}
        <div className="bg-[#0b0814]/80 border border-purple-900/40 rounded-xl p-3.5 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            
            {/* Custom Play/Pause Button */}
            <button
              onClick={() => togglePlay(item)}
              aria-label={isThisPlaying ? 'Pause Audio' : 'Play Audio'}
              className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all ${
                isThisPlaying
                  ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.7)] scale-105'
                  : 'bg-purple-950/60 text-purple-200 border border-purple-500/40 hover:bg-purple-600 hover:text-white hover:border-purple-400'
              }`}
            >
              {isThisPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>

            {/* Interactive Canvas Waveform Scrub Visualizer */}
            <div className="flex-1 flex flex-col gap-1">
              <WaveformVisualizer
                frequencies={isCurrent ? waveformFrequencies : staticFrequencies}
                isPlaying={isThisPlaying}
                progress={progress}
                onScrub={handleScrub}
                height={32}
                activeBarColor="#c084fc"
                barColor="rgba(139, 92, 246, 0.25)"
              />
              <div className="flex items-center justify-between text-[10px] font-mono text-purple-300/60">
                <span>{isCurrent ? formatTime(currentTime) : '0:00'}</span>
                <span>{item.duration || (isCurrent && duration > 0 ? formatTime(duration) : '0:00')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Case Study Blurb Toggle (For Commercial Songs) */}
        {item.caseStudy && (
          <div className="mt-1 border-t border-purple-900/30 pt-3">
            <button
              onClick={() => setShowCaseStudy(!showCaseStudy)}
              className="text-xs font-semibold text-purple-300 hover:text-white flex items-center justify-between w-full"
            >
              <span className="flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
                Case Study Breakdown
              </span>
              {showCaseStudy ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showCaseStudy && (
              <div className="mt-3 p-3 bg-purple-950/20 border border-purple-800/30 rounded-lg text-xs space-y-2 animate-in fade-in duration-200">
                <div>
                  <span className="font-bold text-purple-300">Challenge: </span>
                  <span className="text-slate-300">{item.caseStudy.challenge}</span>
                </div>
                <div>
                  <span className="font-bold text-purple-300">Sonic Solution: </span>
                  <span className="text-slate-300">{item.caseStudy.solution}</span>
                </div>
                <div>
                  <span className="font-bold text-emerald-400">Result: </span>
                  <span className="text-slate-200">{item.caseStudy.result}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {item.tags.map((tag, idx) => (
              <span 
                key={idx} 
                className="text-[10px] font-medium text-purple-300/80 bg-purple-950/40 border border-purple-900/40 px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
