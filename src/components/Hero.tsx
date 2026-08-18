import React, { useRef, useEffect, useState, useCallback } from 'react';
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

const GALLERY_CARDS = [
  { src: '/assets/card1.png',          label: 'Sonic Logos' },
  { src: '/assets/hero-waveform.png',  label: 'Waveform Art' },
  { src: '/assets/hero-anthem.png',    label: 'Brand Anthem' },
  { src: '/assets/hero-podcast.png',   label: 'Podcast Audio' },
  { src: '/assets/hero-commercial.png',label: 'Commercial' },
  { src: '/assets/hero-jingle.png',    label: 'Jingles' },
  { src: '/assets/card3.png',          label: 'Sound Design' },
];

/* ═══════════════════════════════════════════════════════════════
   InfiniteArcCarousel — JS-driven infinite scroll with real-time
   per-card rotateY / scale / filter computed from viewport center
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
  const offsetRef = useRef(0);        // Current pixel offset (accumulated)
  const rafRef = useRef(0);
  const speedRef = useRef(0.6);       // Base px per frame
  const pausedRef = useRef(false);

  // Update speed: 50x hyper-fast spin when picking random!
  useEffect(() => {
    speedRef.current = isPickingFast ? 30.0 : 0.6;
  }, [isPickingFast]);

  // Quadruplicated cards for seamless looping across all screen sizes
  const allCards = [...GALLERY_CARDS, ...GALLERY_CARDS, ...GALLERY_CARDS, ...GALLERY_CARDS];
  const singleSetWidth = useRef(0);   // Exact pixel distance between card set 0 and set 1

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
    // Calculate exact pixel distance between card 0 and card 7 (start of second set)
    if (cards.length > GALLERY_CARDS.length) {
      const firstCard = cards[0] as HTMLElement;
      const secondSetFirstCard = cards[GALLERY_CARDS.length] as HTMLElement;
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
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-[#140d14] to-transparent z-30 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-[#140d14] to-transparent z-30 pointer-events-none" />

      <div
        ref={stripRef}
        className="flex items-center gap-0 will-change-transform"
        style={{ width: 'max-content' }}
      >
        {allCards.map((card, idx) => {
          const audioIdx = idx % (items.length || 1);
          const cardAudioItem = items[audioIdx];
          const isActive = cardAudioItem && currentTrack?.id === cardAudioItem.id && isPlaying;

          return (
            <div
              key={`${idx}-${card.label}`}
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
                  src={card.src}
                  alt={card.label}
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
                  <span className="text-[9px] font-mono text-white/70 tracking-wider uppercase">{card.label}</span>
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
export const Hero: React.FC<HeroProps> = ({ items, onStartProject, onExploreWork }) => {
  const { currentTrack, isPlaying, togglePlay, currentTime, duration, seek, waveformFrequencies } = useAudio();
  const [isPickingRandom, setIsPickingRandom] = useState(false);
  const [poppedCard, setPoppedCard] = useState<{
    audioItem: AudioItem;
    galleryCard: typeof GALLERY_CARDS[0];
  } | null>(null);

  const handleCardClick = (audioIdx: number) => {
    if (items[audioIdx]) togglePlay(items[audioIdx]);
  };

  // Pick Random button handler: acceleration 5x speed for 1.8s, then pop up a card!
  const handlePickRandom = () => {
    if (isPickingRandom) return;
    setIsPickingRandom(true);
    setPoppedCard(null);

    // Spin at 5x speed for 1.8s before selecting
    setTimeout(() => {
      const randomGalleryIdx = Math.floor(Math.random() * GALLERY_CARDS.length);
      const galleryCard = GALLERY_CARDS[randomGalleryIdx];
      const audioItem = items[randomGalleryIdx % (items.length || 1)] || items[0];

      if (audioItem) {
        togglePlay(audioItem);
      }
      setPoppedCard({ audioItem, galleryCard });
    }, 1800);
  };

  // Close popped card overlay & resume normal operation
  const handleCloseModal = () => {
    setPoppedCard(null);
    setIsPickingRandom(false);
  };

  const isPoppedItemPlaying = poppedCard && currentTrack?.id === poppedCard.audioItem.id && isPlaying;
  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-black overflow-hidden">

      {/* Ambient glow behind the panel */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
        <div className="w-[80%] h-[70%] rounded-[40px] bg-gradient-to-br from-purple-800/30 via-amber-700/15 to-purple-900/25 blur-[100px]" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[55%] rounded-full bg-amber-600/10 blur-[120px] pointer-events-none" aria-hidden />

      {/* ── THE HERO PANEL ── */}
      <div className="relative w-full h-full min-h-screen overflow-hidden bg-gradient-to-b from-[#1a1018] via-[#140d14] to-[#100a10] z-10 flex flex-col justify-between">

        <div>
          {/* 1. Top Marquee */}
          <div className="w-full py-2 overflow-hidden border-b border-[#2a1c26]/50">
            <div className="animate-marquee whitespace-nowrap text-[11px] tracking-[0.25em] text-[#8a6f82]/60 uppercase font-mono select-none">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="mx-8">SUBSCRIBE TO OUR NEWS LETTER</span>
              ))}
            </div>
          </div>

          {/* 2. Nav Bar */}
          <nav className="hidden sm:flex items-center justify-center py-2.5 border-b border-[#2a1c26]/40 text-[11px] sm:text-xs tracking-[0.2em] uppercase font-mono text-[#c5aebe] select-none">
            {[
              { id: 'hero',     label: 'Home' },
              { id: 'services', label: 'Product' },
              { id: 'process',  label: 'How' },
              { id: 'about',    label: 'About' },
              { id: 'contact',  label: 'Contact' },
            ].map((item, i, arr) => (
              <React.Fragment key={item.id}>
                <button
                  onClick={() => {
                    const el = document.getElementById(item.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-1 hover:text-white transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
                {i < arr.length - 1 && <span className="w-px h-3 bg-[#3a2834]" />}
              </React.Fragment>
            ))}
          </nav>

          {/* 3. Brand Mark */}
          <div className="flex flex-col items-center pt-8 pb-2">
            <div className="w-10 h-10 rounded-full bg-[#1e1220] border border-[#3d2a38] p-1.5 flex items-center justify-center shadow-lg mb-2">
              <img src="/assets/logo.webp" alt="Hmm Studio" className="w-full h-full object-contain rounded-full" />
            </div>
            <p className="text-[13px] sm:text-sm tracking-widest text-[#d4c3cf] font-medium flex items-center gap-1.5">
              <span className="text-[#a88ea0] text-base">✦</span>
              Hmm Studio
            </p>
          </div>

          {/* 4. INFINITE 3D ARC CAROUSEL */}
          <InfiniteArcCarousel
            items={items}
            onCardClick={handleCardClick}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            isPickingFast={isPickingRandom && !poppedCard}
          />
        </div>

        <div>
          {/* 5. Tagline */}
          <div className="max-w-lg mx-auto text-center px-6 pt-2 pb-2">
            <p className="text-xs sm:text-[13px] leading-relaxed text-[#9a8592] font-normal">
              Bring your story to life with bespoke sonic signatures. Experience flawless
              consistency, perfect proportions, and impeccable perspective in every
              frame.
            </p>
          </div>

          {/* 6. CTA Buttons with Pick Random */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 pb-8 px-6">
            <button
              onClick={onStartProject}
              className="px-6 py-2.5 rounded-full bg-[#e8e0e5] text-[#1a1018] font-semibold text-xs sm:text-sm tracking-wide hover:bg-white transition-colors shadow-md"
            >
              Get Started Now
            </button>

            {/* "Pick Random" Button */}
            <button
              onClick={handlePickRandom}
              disabled={isPickingRandom}
              className={`px-6 py-2.5 rounded-full border text-xs sm:text-sm font-semibold tracking-wide transition-all flex items-center gap-2 shadow-lg cursor-pointer ${
                isPickingRandom && !poppedCard
                  ? 'bg-purple-600 text-white border-purple-400 animate-pulse'
                  : 'bg-purple-950/70 text-purple-200 border-purple-500/50 hover:bg-purple-900 hover:border-purple-400 hover:text-white hover:shadow-purple-900/40'
              }`}
            >
              <Sparkles className={`w-4 h-4 ${isPickingRandom && !poppedCard ? 'animate-spin text-white' : 'text-purple-400'}`} />
              {isPickingRandom && !poppedCard ? 'Picking Random...' : 'Pick Random'}
            </button>

            <button
              onClick={onExploreWork}
              className="px-6 py-2.5 rounded-full bg-transparent border border-[#3d2a38] text-[#b8a2b1] font-medium text-xs sm:text-sm tracking-wide hover:border-[#6d4f64] hover:text-white transition-colors"
            >
              Case studies
            </button>
          </div>
        </div>

        {/* 7. Credit badge */}
        <div className="absolute bottom-4 right-5 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e1420]/80 border border-[#2e1f2a]/60 text-[10px] text-[#8a6f82] font-mono tracking-wider backdrop-blur-sm">
            <span className="text-xs">✦</span> Hmm Studio
          </span>
        </div>

      </div>

      {/* ═══════════════════════════════════════════════════════════════
          POPPED UP RANDOM CARD MODAL OVERLAY
          ═══════════════════════════════════════════════════════════════ */}
      {poppedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">

          {/* Modal Container */}
          <div className="relative w-full max-w-md bg-[#130b18] border border-purple-500/40 rounded-3xl p-6 shadow-2xl shadow-purple-950/80 flex flex-col items-center gap-5 text-center transition-all transform scale-100">

            {/* Close Button (X) */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-purple-950/80 border border-purple-700/50 flex items-center justify-center text-purple-200 hover:text-white hover:bg-purple-800 transition-colors shadow-lg cursor-pointer"
              title="Close & Resume"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Top Label */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-600/40 text-[11px] font-mono text-purple-300 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Random Selection
            </div>

            {/* Large Card Artwork */}
            <div className="relative w-56 h-72 rounded-2xl overflow-hidden border-2 border-purple-500/60 shadow-2xl bg-[#0d0710] group">
              <img
                src={poppedCard.galleryCard.src}
                alt={poppedCard.galleryCard.label}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Music Info */}
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white tracking-tight">{poppedCard.audioItem.title}</h3>
              <p className="text-xs font-mono text-purple-300/80 tracking-wide uppercase">
                {poppedCard.audioItem.client} • {poppedCard.galleryCard.label}
              </p>
            </div>

            {/* Canvas Waveform Visualizer */}
            <div className="w-full bg-[#1c1024] border border-purple-900/50 rounded-xl p-3 space-y-2">
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
                <span>{poppedCard.audioItem.duration}</span>
              </div>
            </div>

            {/* Action Buttons: Play/Pause + Close */}
            <div className="flex items-center gap-3 w-full pt-1">
              <button
                onClick={() => togglePlay(poppedCard.audioItem)}
                className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-purple-900/50 transition-colors cursor-pointer"
              >
                {isPoppedItemPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                {isPoppedItemPlaying ? 'Pause Track' : 'Play Track'}
              </button>

              <button
                onClick={handleCloseModal}
                className="px-5 py-3 rounded-xl bg-purple-950/60 border border-purple-800/40 text-purple-300 hover:text-white hover:bg-purple-900 font-medium text-xs tracking-wide transition-colors cursor-pointer"
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

/* Helper function to format seconds to M:SS */
function formatTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}
