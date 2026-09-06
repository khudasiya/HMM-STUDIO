import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, X, Maximize2, Sparkles, ExternalLink } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { WaveformVisualizer } from './WaveformVisualizer';
import { generateWaveformData } from '../lib/cdn';

interface FloatingPlayerProps {
  onNavigate: (sectionId: string) => void;
}

export const FloatingPlayer: React.FC<FloatingPlayerProps> = ({ onNavigate }) => {
  const { 
    currentTrack, 
    isPlaying, 
    togglePlay, 
    currentTime, 
    duration, 
    seek, 
    volume, 
    setVolume,
    waveformFrequencies,
    pauseTrack 
  } = useAudio();

  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.85);
  const [isDismissed, setIsDismissed] = useState(false);

  if (!currentTrack || isDismissed) return null;

  const handleToggleMute = () => {
    if (isMuted) {
      setVolume(prevVolume || 0.85);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-2xl z-50 animate-in slide-in-from-bottom duration-300">
      <div className="bg-[#0f0a1c]/95 backdrop-blur-2xl border border-purple-500/40 rounded-2xl p-3 sm:px-4 shadow-2xl shadow-purple-950/80 flex items-center justify-between gap-3 text-white">
        
        {/* Track Thumbnail & Info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-purple-950/80 border border-purple-500/40 shrink-0 flex items-center justify-center group">
            {currentTrack.coverImage ? (
              <img src={currentTrack.coverImage} alt={currentTrack.title} className="w-full h-full object-cover" />
            ) : (
              <Sparkles className="w-5 h-5 text-purple-400" />
            )}
            <div className={`absolute inset-0 bg-purple-950/60 flex items-center justify-center transition-opacity ${isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-white truncate tracking-tight">
              {currentTrack.title}
            </h4>
            <div className="flex items-center gap-2 text-[10px] font-mono text-purple-300/80">
              <span className="truncate">{currentTrack.client || 'Hmm Studio'}</span>
              <span>•</span>
              <button 
                onClick={() => onNavigate(currentTrack.category)}
                className="hover:text-purple-200 underline uppercase tracking-wider text-[9px]"
              >
                {currentTrack.category.replace('_', ' ')}
              </button>
            </div>
          </div>
        </div>

        {/* Center Controls & Waveform */}
        <div className="hidden sm:flex flex-col items-center gap-1 w-64">
          <div className="w-full">
            <WaveformVisualizer
              frequencies={waveformFrequencies.length > 0 ? waveformFrequencies : generateWaveformData(1, 30)}
              isPlaying={isPlaying}
              progress={progress}
              onScrub={(pct) => seek(pct * duration)}
              height={24}
              barColor="rgba(168, 85, 247, 0.3)"
              activeBarColor="#c084fc"
            />
          </div>
          <div className="flex items-center justify-between w-full text-[9px] font-mono text-slate-400 px-1">
            <span>{formatTime(currentTime)}</span>
            <span>{currentTrack.duration || formatTime(duration)}</span>
          </div>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={() => togglePlay(currentTrack)}
          className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-purple-900/60 transition-transform active:scale-95 cursor-pointer"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        {/* Volume & Actions */}
        <div className="hidden md:flex items-center gap-2 border-l border-purple-900/40 pl-3">
          <button 
            onClick={handleToggleMute}
            className="p-1 text-purple-300 hover:text-white transition-colors cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setIsMuted(false);
              setVolume(parseFloat(e.target.value));
            }}
            className="w-16 h-1.5 bg-purple-950 rounded-lg appearance-none cursor-pointer accent-purple-400"
          />

          <button
            onClick={() => {
              pauseTrack();
              setIsDismissed(true);
            }}
            className="p-1 text-slate-400 hover:text-white transition-colors ml-1 cursor-pointer"
            title="Dismiss player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
