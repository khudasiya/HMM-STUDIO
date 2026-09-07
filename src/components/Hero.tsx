import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { Play, Pause, Sparkles, X, Volume2, ExternalLink } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { AudioItem } from '../types/portfolio';
import { WaveformVisualizer } from './WaveformVisualizer';
import { generateWaveformData } from '../lib/cdn';

interface HeroProps {
  items: AudioItem[];
  onStartProject: () => void;
  onExploreWork: () => void;
}

// Category labels for display
const CATEGORY_LABELS: Record<string, string> = {
  logo_audio: 'Sonic Logo',
  brand_anthem: 'Brand Anthem',
  podcast_audio: 'Podcast Audio',
  commercial_song: 'Commercial',
  jingle: 'Jingle',
  extras: 'Sound Design',
};

/* ═══════════════════════════════════════════════════════════════
   EmptyHeroState — Friendly prompt when 0 tracks are loaded
   ═══════════════════════════════════════════════════════════════ */
function EmptyHeroState() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3 shadow-lg">
        <Volume2 className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-1">No audio items published yet</h3>
      <p className="text-xs text-slate-400 max-w-sm">
        Add your first sonic logo, anthem, or soundtrack from the Admin portal to showcase it here.
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   InfiniteArcCarousel — 3D infinite carousel when > 5 tracks exist
   ═══════════════════════════════════════════════════════════════ */
function InfiniteArcCarousel({
  items,
  onCardClick,
  currentTrack,
  isPlaying,
  isPickingFast,
}: {
  items: AudioItem[];
  onCardClick: (audioIdx: number) => void;
  currentTrack: AudioItem | null;
  isPlaying: boolean;
  isPickingFast: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef(0);
  const speedRef = useRef(0.6);
  const pausedRef = useRef(false);

  useEffect(() => {
    speedRef.current = isPickingFast ? 30.0 : 0.6;
  }, [isPickingFast]);

  // Use the actual items array
  const baseCards = items;
  const allCards = useMemo(() => {
    if (baseCards.length === 0) return [];
    const repeats = Math.max(3, Math.ceil(24 / baseCards.length));
    const result: AudioItem[] = [];
    for (let r = 0; r < repeats; r++) {
      result.push(...baseCards);
    }
    return result;
  }, [baseCards]);
  const singleSetWidth = useRef(0);

  /* ── Apply 3D transforms to every card each frame ── */
  const applyTransforms = useCallback(() => {
    const container = containerRef.current;
    const strip = stripRef.current;
    if (!container || !strip) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    const maxDist = containerRect.width / 2;

    const cards = strip.children;
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;

      // Normalised distance from center: -1 (far left) → 0 (center) → 1 (far right)
      const norm = Math.max(-1, Math.min(1, (cardCenter - containerCenter) / maxDist));
      const absNorm = Math.abs(norm);

      // 3D Rotation: cards curve inward towards screen edges (-58deg to +58deg)
      const rotateY = norm * -58;

      // Arc curvature: smooth vertical U-rise towards edges
      const translateY = (1 - Math.cos(norm * Math.PI / 2)) * -40;

      // Scale contrast:
      // Center cards (absNorm = 0) are 0.76x
      // Edge cards (absNorm = 1) are 1.30x
      const scale = 0.76 + Math.pow(absNorm, 1.3) * 0.54;

      // Z depth contrast:
      // Center cards: -140px depth
      // Edge cards: +120px depth
      const translateZ = -140 + Math.pow(absNorm, 1.3) * 260;

      // Scale compensation offset:
      // Pulls center cards tightly together so tiles sit near each other
      const cardWidth = card.offsetWidth || 160;
      const gapCompensation = -norm * (1 - scale) * (cardWidth * 1.85);

      // Brightness & saturation depth lighting
      const brightness = 0.75 + absNorm * 0.35;
      const saturation = 0.65 + absNorm * 0.45;

      const zIndex = Math.round(absNorm * 50);

      card.style.transform = `perspective(750px) translateX(${gapCompensation}px) rotateY(${rotateY}deg) translateY(${translateY}px) scale(${scale}) translateZ(${translateZ}px)`;
      card.style.filter = `brightness(${brightness}) saturate(${saturation})`;
      card.style.zIndex = `${zIndex}`;
    }
  }, []);

  /* ── Animation loop ── */
  const animate = useCallback(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const cards = strip.children;
    // Calculate exact pixel distance between card 0 and start of second set
    if (baseCards.length > 0 && cards.length > baseCards.length) {
      const firstCard = cards[0] as HTMLElement;
      const secondSetFirstCard = cards[baseCards.length] as HTMLElement;
      const exactDistance = secondSetFirstCard.offsetLeft - firstCard.offsetLeft;
      if (exactDistance > 0) {
        singleSetWidth.current = exactDistance;
      }
    }

    if (!pausedRef.current) {
      offsetRef.current -= speedRef.current;

      // Loop: when we've scrolled one full set, reset by exactly singleSetWidth
      if (singleSetWidth.current > 0 && Math.abs(offsetRef.current) >= singleSetWidth.current) {
        offsetRef.current += singleSetWidth.current;
      }

      strip.style.transform = `translateX(${offsetRef.current}px)`;
    }

    applyTransforms();
    rafRef.current = requestAnimationFrame(animate);
  }, [applyTransforms]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden py-12 md:py-20"
      onMouseEnter={() => { if (!isPickingFast) pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {/* Left/right fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-[#090610] to-transparent z-30 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-[#090610] to-transparent z-30 pointer-events-none" />

      <div
        ref={stripRef}
        className="flex items-center gap-0 will-change-transform"
        style={{ width: 'max-content' }}
      >
        {allCards.map((audioItem, idx) => {
          const audioIdx = idx % (baseCards.length || 1);
          const isActive = audioItem && currentTrack?.id === audioItem.id && isPlaying;
          const categoryLabel = CATEGORY_LABELS[audioItem?.category || ''] || audioItem?.category || '';

          return (
            <div
              key={`${idx}-${audioItem?.id}`}
              onClick={() => onCardClick(audioIdx)}
              className="relative shrink-0 cursor-pointer group will-change-transform -mr-3 sm:-mr-4"
              style={{
                width: 'clamp(140px, 13vw, 190px)',
                height: 'clamp(190px, 22vw, 280px)',
                transformOrigin: 'center center',
                transition: 'filter 0.1s ease-out',
              }}
            >
              <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-[#111]">
                <img
                  src={audioItem?.coverImage || '/assets/card1.png'}
                  alt={audioItem?.title || 'Audio'}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  draggable={false}
                />
                {/* Hover / playing overlay */}
                <div className={`absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-2 transition-opacity duration-200 ${
                  isActive ? 'opacity-100 bg-black/40' : 'opacity-0 group-hover:opacity-100 bg-black/40'
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                    isActive ? 'bg-purple-600 text-white' : 'bg-white/90 text-black'
                  }`}>
                    {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </div>
                  <span className="text-[9px] font-mono text-white/70 tracking-wider uppercase">{categoryLabel}</span>
                  <span className="text-[8px] font-mono text-white/50 max-w-[80%] text-center truncate">{audioItem?.title}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Hero Section Component
   ═══════════════════════════════════════════════════ */
export const Hero: React.FC<HeroProps> = ({ items = [], onStartProject }) => {
  const { currentTrack, isPlaying, togglePlay, currentTime, duration, seek, waveformFrequencies } = useAudio();
  const [isPickingRandom, setIsPickingRandom] = useState(false);
  const [poppedCard, setPoppedCard] = useState<AudioItem | null>(null);

  const handleCardClick = (audioIdx: number) => {
    if (items[audioIdx]) togglePlay(items[audioIdx]);
  };

  // Pick Random button handler: acceleration spin before selecting
  const handlePickRandom = () => {
    if (items.length === 0 || isPickingRandom) return;
    setIsPickingRandom(true);
    setPoppedCard(null);

    setTimeout(() => {
      const randomIdx = Math.floor(Math.random() * items.length);
      const audioItem = items[randomIdx];

      if (audioItem) {
        togglePlay(audioItem);
      }
      setPoppedCard(audioItem || null);
    }, items.length > 1 ? 1800 : 400);
  };

  // Close popped card overlay & resume normal operation
  const handleCloseModal = () => {
    setPoppedCard(null);
    setIsPickingRandom(false);
  };

  const isPoppedItemPlaying = poppedCard && currentTrack?.id === poppedCard.id && isPlaying;
  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-[#07050c] overflow-hidden authkit-grid">

      {/* AuthKit Ambient Spotlight Beams */}
      <div className="absolute inset-0 pointer-events-none authkit-spotlight-1" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/10 blur-[160px] pointer-events-none rounded-full" />

      {/* AuthKit Architectural Crosshairs (+) */}
      <div className="absolute top-24 left-8 text-xs font-mono text-purple-400/40 select-none pointer-events-none hidden md:block">+</div>
      <div className="absolute top-24 right-8 text-xs font-mono text-purple-400/40 select-none pointer-events-none hidden md:block">+</div>
      <div className="absolute bottom-12 left-8 text-xs font-mono text-purple-400/40 select-none pointer-events-none hidden md:block">+</div>
      <div className="absolute bottom-12 right-8 text-xs font-mono text-purple-400/40 select-none pointer-events-none hidden md:block">+</div>

      {/* ── THE HERO PANEL ── */}
      <div className="relative w-full h-full min-h-screen overflow-hidden z-10 flex flex-col justify-between pt-24 pb-8">

        <div>
          {/* AuthKit Brand Header & Micro Badge */}
          <div className="flex flex-col items-center pt-2 pb-2 text-center">
            
            {/* Pill Badge */}
            <div className="authkit-badge mb-4">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span>SONIC BRANDING ARCHITECTURE</span>
            </div>

            {/* Brand Logo & Name */}
            <div className="flex items-center gap-2.5 mb-2 group cursor-pointer">
              <div className="relative w-9 h-9 rounded-full bg-[#160d22] border border-purple-500/40 p-1 flex items-center justify-center shadow-lg group-hover:scale-115 group-hover:border-purple-400 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all duration-300">
                <img src="/assets/logo.webp" alt="Hmm Studio" className="w-full h-full object-contain rounded-full transition-transform group-hover:rotate-12 duration-300" />
              </div>
              <span className="text-sm font-mono tracking-widest text-slate-200 uppercase font-semibold group-hover:text-purple-300 transition-colors">Hmm Studio</span>
            </div>

            {/* AuthKit Interactive Metallic Headline */}
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gradient-silver max-w-2xl mx-auto px-4 mt-2 mb-3 leading-tight group cursor-default select-none">
              <span className="inline-block mr-1 transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.7)]" style={{ background: 'linear-gradient(180deg, #C084FC 0%, #A855F7 60%, #9333EA 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                The
              </span>
              <span className="inline-block transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:via-amber-300 group-hover:to-cyan-300 group-hover:scale-105">
                world’s finest
              </span>{' '}
              <span className="inline-block transition-all duration-300 group-hover:text-purple-300 group-hover:drop-shadow-[0_0_25px_rgba(192,132,252,0.9)]">
                audio identity system.
              </span>
            </h1>
          </div>

          {/* 4. INFINITE 3D ARC CAROUSEL */}
          {items.length === 0 ? (
            <EmptyHeroState />
          ) : (
            <InfiniteArcCarousel
              items={items}
              onCardClick={handleCardClick}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              isPickingFast={isPickingRandom && !poppedCard}
            />
          )}
        </div>

        <div>
          {/* Tagline */}
          <div className="max-w-xl mx-auto text-center px-6 pt-2 pb-2">
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300 font-normal">
              Engineered for seamless audio recognition, high-precision sonic logos, and unforgettable brand scores across all digital touchpoints.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 pb-6 px-6">
            <button
              onClick={onStartProject}
              className="authkit-btn-primary cursor-pointer text-xs uppercase tracking-wider font-bold"
            >
              Get Started Now
            </button>

            {/* "Pick Random" Button */}
            <button
              onClick={handlePickRandom}
              disabled={isPickingRandom}
              className={`authkit-btn-secondary cursor-pointer text-xs font-mono uppercase tracking-wider flex items-center gap-2 ${
                isPickingRandom && !poppedCard
                  ? 'border-purple-400 bg-purple-900 text-white'
                  : ''
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${isPickingRandom && !poppedCard ? 'animate-spin text-white' : 'text-purple-400'}`} />
              {isPickingRandom && !poppedCard ? 'Picking Random...' : 'Pick Random'}
            </button>
          </div>
        </div>

      </div>

      {/* POPPED UP RANDOM CARD MODAL OVERLAY */}
      {poppedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-md bg-[#0f0a1c] border border-purple-500/40 rounded-3xl p-6 shadow-2xl flex flex-col items-center gap-5 text-center">
            
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-purple-950/80 border border-purple-700/50 flex items-center justify-center text-purple-200 hover:text-white hover:bg-purple-800 transition-colors shadow-lg cursor-pointer"
              title="Close & Resume"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-600/40 text-[11px] font-mono text-purple-300 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Random Selection
            </div>

            <div className="relative w-56 h-72 rounded-2xl overflow-hidden border-2 border-purple-500/60 shadow-2xl bg-[#0d0710] group">
              <img
                src={poppedCard.coverImage}
                alt={poppedCard.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white tracking-tight">{poppedCard.title}</h3>
              <p className="text-xs font-mono text-purple-300/80 tracking-wide uppercase">
                {poppedCard.client} • {CATEGORY_LABELS[poppedCard.category] || poppedCard.category}
              </p>
            </div>

            <div className="w-full bg-[#160d24] border border-purple-900/50 rounded-xl p-3 space-y-2">
              <WaveformVisualizer
                frequencies={waveformFrequencies.length > 0 ? waveformFrequencies : generateWaveformData(1, 40)}
                isPlaying={!!isPoppedItemPlaying}
                progress={progress}
                onScrub={(pct) => seek(pct * duration)}
                height={40}
                barColor="rgba(168, 85, 247, 0.3)"
                activeBarColor="#c084fc"
              />

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-1">
                <span>{isPoppedItemPlaying ? formatTime(currentTime) : '0:00'}</span>
                <span>{poppedCard.duration}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full pt-1">
              <button
                onClick={() => togglePlay(poppedCard)}
                className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-purple-900/50 transition-colors cursor-pointer"
              >
                {isPoppedItemPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                {isPoppedItemPlaying ? 'Pause Track' : 'Play Track'}
              </button>

              <button
                onClick={handleCloseModal}
                className="px-5 py-3 rounded-xl bg-purple-950/60 border border-purple-800/40 text-purple-300 hover:text-white hover:bg-purple-900 font-bold text-xs tracking-wider transition-colors cursor-pointer"
              >
                Close & Resume
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}
