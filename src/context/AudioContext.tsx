import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AudioItem } from '../types/portfolio';
import { generateWaveformData } from '../lib/cdn';

interface AudioContextType {
  currentTrack: AudioItem | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  waveformFrequencies: number[];
  playTrack: (track: AudioItem) => void;
  pauseTrack: () => void;
  togglePlay: (track: AudioItem) => void;
  seek: (seconds: number) => void;
  setVolume: (volume: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<AudioItem | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolumeState] = useState<number>(0.85);
  const [waveformFrequencies, setWaveformFrequencies] = useState<number[]>(generateWaveformData(1, 40));

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthCtxRef = useRef<AudioContext | null>(null);
  const synthOscRef = useRef<OscillatorNode | null>(null);

  // Initialize HTML5 Audio Element
  useEffect(() => {
    const audio = new Audio();
    audio.crossOrigin = 'anonymous';
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  // Sync Volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Frequency Waveform animation update during playback
  useEffect(() => {
    let animId: number;
    if (isPlaying) {
      const updateWaveform = () => {
        const seed = Math.floor(currentTime * 5);
        setWaveformFrequencies(generateWaveformData(seed, 40));
        animId = requestAnimationFrame(updateWaveform);
      };
      animId = requestAnimationFrame(updateWaveform);
    }
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, currentTime]);

  // Fallback Audio Synthesizer (Generates a sleek 440Hz sonic chime if audio file fails to load)
  const playSynthFallback = (trackId: string) => {
    try {
      if (!synthCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        synthCtxRef.current = new AudioCtx();
      }
      const ctx = synthCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const freqMap: Record<string, number> = {
        'logo-1': 523.25, // C5
        'logo-2': 659.25, // E5
        'logo-3': 783.99, // G5
        'logo-4': 1046.50, // C6
      };

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freqMap[trackId] || 440, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.5);
      synthOscRef.current = osc;
    } catch (e) {
      console.warn('Synth fallback unavailable', e);
    }
  };

  const playTrack = (track: AudioItem) => {
    if (!audioRef.current) return;

    // Single active track rule: if playing a new track, pause existing
    if (currentTrack?.id !== track.id) {
      audioRef.current.pause();
      audioRef.current.src = track.audioUrl;
      audioRef.current.currentTime = 0;
      setCurrentTrack(track);
      setWaveformFrequencies(generateWaveformData(track.id.length, 40));
    }

    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Audio URL playback note:', err.message, '- trigger synth chime fallback');
          playSynthFallback(track.id);
          setIsPlaying(true);
          // Simulate playback duration for fallback synth chime
          setDuration(3.5);
        });
    }
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  };

  const togglePlay = (track: AudioItem) => {
    if (currentTrack?.id === track.id && isPlaying) {
      pauseTrack();
    } else {
      playTrack(track);
    }
  };

  const seek = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
      setCurrentTime(seconds);
    }
  };

  const setVolume = (val: number) => {
    setVolumeState(val);
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        waveformFrequencies,
        playTrack,
        pauseTrack,
        togglePlay,
        seek,
        setVolume
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
