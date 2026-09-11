import React, { useState, useEffect, useCallback } from 'react';
import { 
  SONIC_PITCH_DECK, 
  SlideData, 
  ProofBrand, 
  DeliverableItem 
} from '../data/sonicPitchDeckData';
import { sonicFx } from '../lib/sonicSoundFx';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Volume2, 
  Sparkles, 
  ArrowRight, 
  Clapperboard, 
  Smartphone, 
  Store, 
  CheckCircle2, 
  XCircle, 
  Maximize2, 
  Minimize2, 
  Music, 
  Layers, 
  Calendar,
  Flame,
  Radio,
  Share2,
  Check
} from 'lucide-react';

interface SonicPitchDeckProps {
  onNavigate?: (sectionId: string) => void;
  initialMode?: 'deck' | 'story';
}

export const SonicPitchDeck: React.FC<SonicPitchDeckProps> = ({ 
  onNavigate,
  initialMode = 'deck'
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlayingAutoplay, setIsPlayingAutoplay] = useState(false);
  const [viewMode, setViewMode] = useState<'deck' | 'story'>(initialMode);
  const [activeSoundKey, setActiveSoundKey] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slides = SONIC_PITCH_DECK;
  const currentSlide: SlideData = slides[currentSlideIndex];

  // Sound triggering helper with visual animation
  const triggerBrandSound = (brandKey?: string) => {
    if (!brandKey) return;
    setActiveSoundKey(brandKey);
    
    switch (brandKey) {
      case 'netflix':
        sonicFx.playNetflixTudum();
        break;
      case 'intel':
        sonicFx.playIntelChime();
        break;
      case 'airtel':
        sonicFx.playAirtelJingle();
        break;
      case 'titan':
        sonicFx.playTitanTheme();
        break;
      case 'amul':
        sonicFx.playAmulJingle();
        break;
      case 'mdh':
        sonicFx.playMdhJingle();
        break;
      case 'hmm':
        sonicFx.playHmmSignature();
        break;
      default:
        sonicFx.playHmmSignature();
    }

    setTimeout(() => {
      setActiveSoundKey(null);
    }, 1800);
  };

  // Slide navigation
  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (idx: number) => {
    setCurrentSlideIndex(idx);
    setIsPlayingAutoplay(false);
  };

  // Keyboard navigation for presentation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'deck') return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key >= '1' && e.key <= '9') {
        const targetIdx = parseInt(e.key, 10) - 1;
        if (targetIdx < slides.length) {
          goToSlide(targetIdx);
        }
      } else if (e.key === '0') {
        goToSlide(9); // 10th slide
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, nextSlide, prevSlide, slides.length]);

  // Autoplay timer
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isPlayingAutoplay && viewMode === 'deck') {
      timer = setInterval(() => {
        nextSlide();
      }, 7000);
    }
    return () => clearInterval(timer);
  }, [isPlayingAutoplay, viewMode, nextSlide]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Render individual slide content for both Deck view & Web Story view
  const renderSlideBody = (slide: SlideData, isStory = false) => {
    switch (slide.id) {
      // ═══════════════════════════════════════════
      // SLIDE 1: COVER / HERO
      // ═══════════════════════════════════════════
      case 1:
        return (
          <div className="flex flex-col justify-between h-full py-4 relative z-10">
            <div>
              {/* Badge */}
              <div className="inline-block bg-[#d4af37]/20 border border-[#d4af37]/40 px-3.5 py-1 rounded-md text-xs font-mono uppercase tracking-widest text-[#f5d061] mb-6 font-bold">
                {slide.badge}
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-4">
                {slide.title}{' '}
                <span className="font-serif italic font-normal text-[#f5d061] block sm:inline">
                  {slide.titleHighlight}
                </span>
              </h2>

              <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-slate-300/80 mb-6">
                {slide.subtitle}
              </p>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed mb-8">
                {slide.leadText}
              </p>
            </div>

            {/* Metrics Footer */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-purple-900/40 mt-auto">
              {slide.metrics?.map((metric, i) => (
                <div key={i} className="flex flex-col">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#f5d061] tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      // ═══════════════════════════════════════════
      // SLIDE 2: THE PROBLEM
      // ═══════════════════════════════════════════
      case 2:
        return (
          <div className="flex flex-col justify-between h-full py-4 relative z-10">
            <div>
              {slide.categoryBadge && (
                <div className="text-[11px] font-mono tracking-[0.25em] text-[#f5d061] uppercase mb-3 font-semibold">
                  {slide.categoryBadge}
                </div>
              )}
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-8">
                {slide.title}{' '}
                <span className="font-serif italic font-normal text-[#f5d061]">
                  {slide.titleHighlight}
                </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {slide.problems?.map((prob) => {
                  const IconComponent = 
                    prob.icon === 'Clapperboard' ? Clapperboard :
                    prob.icon === 'Smartphone' ? Smartphone : Store;

                  return (
                    <div 
                      key={prob.id}
                      className="bg-[#140f24]/80 border border-purple-900/40 hover:border-purple-500/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div>
                        <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-800/40 flex items-center justify-center text-purple-300 mb-5 group-hover:scale-110 transition-transform">
                          <IconComponent className="w-6 h-6 text-[#f5d061]" />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-white mb-2.5">
                          {prob.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {prob.description}
                        </p>
                      </div>
                      <div className="w-8 h-0.5 bg-red-500/40 mt-6 group-hover:w-full group-hover:bg-red-400 transition-all duration-300" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      // ═══════════════════════════════════════════
      // SLIDE 3: THE VIRAL TRUTH
      // ═══════════════════════════════════════════
      case 3:
        return (
          <div className="flex flex-col justify-between h-full py-4 relative z-10">
            <div>
              {slide.categoryBadge && (
                <div className="text-[11px] font-mono tracking-[0.25em] text-[#f5d061] uppercase mb-3 font-semibold">
                  {slide.categoryBadge}
                </div>
              )}
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-8">
                {slide.title}{' '}
                <span className="font-serif italic font-normal text-[#f5d061]">
                  {slide.titleHighlight}
                </span>
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Precedent Stories */}
                <div className="lg:col-span-7 space-y-4">
                  {slide.viralCases?.map((item, idx) => (
                    <div 
                      key={idx}
                      className="bg-[#140f24]/80 border-l-4 border-l-[#f5d061] border border-purple-900/30 rounded-r-2xl p-5"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base sm:text-lg font-bold text-[#f5d061]">
                          {item.brand}
                        </h3>
                        {item.tagline && (
                          <span className="text-xs font-serif italic text-slate-300">
                            {item.tagline}
                          </span>
                        )}
                      </div>
                      {item.duration && (
                        <div className="text-xs font-mono text-purple-300 mb-1.5">
                          {item.duration}
                        </div>
                      )}
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Right: Compounding Multipliers */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                  {slide.metrics?.map((metric, i) => (
                    <div 
                      key={i}
                      className="bg-[#120e20]/90 border border-purple-900/40 rounded-2xl p-4 sm:p-5 flex items-center gap-5"
                    >
                      <div className="text-3xl sm:text-4xl font-extrabold text-[#f5d061] min-w-[75px]">
                        {metric.value}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-300 font-medium">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      // ═══════════════════════════════════════════
      // SLIDE 4: WHY SOUND WORKS
      // ═══════════════════════════════════════════
      case 4:
        return (
          <div className="flex flex-col justify-between h-full py-4 relative z-10">
            <div>
              {slide.categoryBadge && (
                <div className="text-[11px] font-mono tracking-[0.25em] text-[#f5d061] uppercase mb-3 font-semibold">
                  {slide.categoryBadge}
                </div>
              )}
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-8">
                {slide.title}{' '}
                <span className="font-serif italic font-normal text-[#f5d061]">
                  {slide.titleHighlight}
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {slide.whySoundStats?.map((stat, idx) => (
                  <div 
                    key={idx}
                    className="bg-[#140f24]/90 border border-purple-900/40 hover:border-[#f5d061]/40 rounded-2xl p-6 transition-all flex items-center gap-6"
                  >
                    <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#f5d061] tracking-tight shrink-0 flex items-baseline">
                      {stat.value}
                      <span className="text-2xl sm:text-3xl text-purple-300 ml-0.5 font-bold">
                        {stat.unit}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      // ═══════════════════════════════════════════
      // SLIDE 5: WHO WE ARE
      // ═══════════════════════════════════════════
      case 5:
        return (
          <div className="flex flex-col justify-between h-full py-4 relative z-10">
            <div>
              {slide.categoryBadge && (
                <div className="text-[11px] font-mono tracking-[0.25em] text-[#f5d061] uppercase mb-3 font-semibold">
                  {slide.categoryBadge}
                </div>
              )}
              <div className="mb-8">
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                  {slide.title}
                </h2>
                <p className="text-base sm:text-xl font-serif italic text-[#f5d061] mt-1">
                  {slide.titleHighlight}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Agency Credo Points */}
                <div className="lg:col-span-7 space-y-4">
                  {slide.agencyPoints?.map((pt, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-1 h-6 bg-[#f5d061] rounded-full shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-base text-slate-200 font-medium">
                        {pt}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Right: Founder Profile Card */}
                {slide.founder && (
                  <div className="lg:col-span-5 bg-[#140f24] border-t-2 border-t-[#f5d061] border border-purple-900/40 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center shadow-xl">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#f5d061] flex items-center justify-center text-slate-950 font-extrabold text-2xl sm:text-3xl tracking-wider shadow-lg mb-4">
                      {slide.founder.avatarInitials}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      {slide.founder.name}
                    </h3>
                    <div className="text-xs font-mono text-[#f5d061] uppercase tracking-wider mb-4">
                      {slide.founder.title}
                    </div>

                    <div className="w-full border-t border-purple-900/40 pt-4 space-y-1.5 text-left text-xs sm:text-sm text-slate-300">
                      {slide.founder.roles.map((role, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#f5d061]" />
                          <span>{role}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-purple-900/30 text-[11px] font-mono text-purple-300">
                      Languages: {slide.founder.languages.join(' · ')}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      // ═══════════════════════════════════════════
      // SLIDE 6: WHAT WE BUILD FOR YOU
      // ═══════════════════════════════════════════
      case 6:
        return (
          <div className="flex flex-col justify-between h-full py-4 relative z-10">
            <div>
              {slide.categoryBadge && (
                <div className="text-[11px] font-mono tracking-[0.25em] text-[#f5d061] uppercase mb-2 font-semibold">
                  {slide.categoryBadge}
                </div>
              )}
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {slide.title}
              </h2>
              <p className="text-xs sm:text-sm font-serif italic text-slate-300/80 mb-6">
                {slide.titleHighlight}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {slide.deliverables?.map((item: DeliverableItem) => (
                  <div 
                    key={item.id}
                    className="bg-[#140f24]/90 border border-purple-900/40 hover:border-[#f5d061]/40 rounded-2xl p-5 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[#f5d061]">
                            {item.number}
                          </span>
                          <h3 className="text-base font-bold text-white group-hover:text-[#f5d061] transition-colors">
                            {item.title}
                          </h3>
                        </div>
                        <span className="px-2 py-0.5 text-[10px] font-mono bg-purple-950/80 border border-purple-800/40 text-purple-300 rounded">
                          {item.duration}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      // ═══════════════════════════════════════════
      // SLIDE 7: THE VIRAL ENGINE
      // ═══════════════════════════════════════════
      case 7:
        return (
          <div className="flex flex-col justify-between h-full py-4 relative z-10">
            <div>
              {slide.categoryBadge && (
                <div className="text-[11px] font-mono tracking-[0.25em] text-[#f5d061] uppercase mb-3 font-semibold">
                  {slide.categoryBadge}
                </div>
              )}
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-8">
                {slide.title}{' '}
                <span className="font-serif italic font-normal text-[#f5d061]">
                  {slide.titleHighlight}
                </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bad / Paid UGC Ad Card */}
                {slide.comparison && (
                  <>
                    <div className="bg-[#180e14]/90 border-t-4 border-t-red-500/80 border border-red-950/40 rounded-2xl p-6 sm:p-7 shadow-lg">
                      <div className="flex items-center gap-2 mb-5">
                        <XCircle className="w-5 h-5 text-red-400" />
                        <h3 className="text-xl font-bold text-red-300">
                          {slide.comparison.badTitle}
                        </h3>
                      </div>
                      <div className="space-y-3.5 text-xs sm:text-sm text-slate-300">
                        {slide.comparison.badItems.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2.5">
                            <span className="text-red-400 font-bold shrink-0">{item.slice(0, 1)}</span>
                            <span className="text-slate-300">{item.slice(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Good / hmm Reel Song Card */}
                    <div className="bg-[#0b1c15]/90 border-t-4 border-t-emerald-400 border border-emerald-950/40 rounded-2xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl pointer-events-none" />
                      <div className="flex items-center gap-2 mb-5">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <h3 className="text-xl font-bold text-emerald-300">
                          {slide.comparison.goodTitle}
                        </h3>
                      </div>
                      <div className="space-y-3.5 text-xs sm:text-sm text-slate-200">
                        {slide.comparison.goodItems.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2.5">
                            <span className="text-emerald-400 font-bold shrink-0">{item.slice(0, 1)}</span>
                            <span className="text-white font-medium">{item.slice(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        );

      // ═══════════════════════════════════════════
      // SLIDE 8: PROOF IT WORKS
      // ═══════════════════════════════════════════
      case 8:
        return (
          <div className="flex flex-col justify-between h-full py-4 relative z-10">
            <div>
              {slide.categoryBadge && (
                <div className="text-[11px] font-mono tracking-[0.25em] text-[#f5d061] uppercase mb-2 font-semibold">
                  {slide.categoryBadge}
                </div>
              )}
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
                {slide.title}{' '}
                <span className="font-serif italic font-normal text-[#f5d061]">
                  {slide.titleHighlight}
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {slide.proofBrands?.map((brand: ProofBrand, idx: number) => {
                  const isPlayingThis = activeSoundKey === brand.soundKey;

                  return (
                    <div 
                      key={idx}
                      className={`bg-[#140f24]/90 border rounded-2xl p-5 transition-all flex flex-col justify-between group ${
                        isPlayingThis 
                          ? 'border-[#f5d061] shadow-lg shadow-[#f5d061]/20 scale-[1.02]' 
                          : 'border-purple-900/40 hover:border-purple-500/40'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-base sm:text-lg font-bold text-[#f5d061]">
                            {brand.name}
                          </h3>
                          
                          {/* Interactive Sound Trigger Button */}
                          <button
                            onClick={() => triggerBrandSound(brand.soundKey)}
                            title={`Play ${brand.name} audio motif`}
                            className={`p-1.5 rounded-full border transition-all cursor-pointer flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider ${
                              isPlayingThis
                                ? 'bg-[#f5d061] text-black border-[#f5d061] animate-pulse'
                                : 'bg-purple-950/60 border-purple-800/40 text-purple-300 hover:text-white hover:bg-purple-900'
                            }`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>{isPlayingThis ? 'Playing' : 'Hear Sound'}</span>
                          </button>
                        </div>

                        <div className="text-xs font-serif italic text-slate-300 mb-2">
                          {brand.signature}
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          {brand.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      // ═══════════════════════════════════════════
      // SLIDE 9: OUR PROCESS
      // ═══════════════════════════════════════════
      case 9:
        return (
          <div className="flex flex-col justify-between h-full py-4 relative z-10">
            <div>
              {slide.categoryBadge && (
                <div className="text-[11px] font-mono tracking-[0.25em] text-[#f5d061] uppercase mb-2 font-semibold">
                  {slide.categoryBadge}
                </div>
              )}
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {slide.title}
              </h2>
              <p className="text-xs sm:text-sm font-serif italic text-slate-300/80 mb-8">
                {slide.titleHighlight}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
                {slide.processSteps?.map((step, idx) => (
                  <div 
                    key={idx}
                    className="bg-[#140f24]/90 border border-purple-900/40 hover:border-[#f5d061]/50 rounded-2xl p-5 flex flex-col justify-between transition-all group"
                  >
                    <div>
                      {/* Step Badge */}
                      <div className="w-14 h-14 rounded-full bg-[#f5d061] flex items-center justify-center text-slate-950 font-extrabold text-lg mb-4 shadow-md group-hover:scale-105 transition-transform">
                        {step.number}
                      </div>

                      <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#f5d061] transition-colors">
                        {step.title}
                      </h3>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      // ═══════════════════════════════════════════
      // SLIDE 10: CALL TO ACTION / GRAND FINALE
      // ═══════════════════════════════════════════
      case 10:
        return (
          <div className="flex flex-col justify-between h-full py-4 relative z-10">
            <div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-2">
                {slide.title}{' '}
                <span className="font-serif italic font-normal text-[#f5d061] block sm:inline">
                  {slide.titleHighlight}
                </span>
              </h2>

              <p className="text-xs sm:text-base text-slate-300 max-w-2xl leading-relaxed mb-8">
                {slide.leadText}
              </p>

              {slide.ctaOffer && (
                <div className="bg-gradient-to-r from-[#171026] via-[#1f1538] to-[#171026] border-2 border-[#f5d061]/50 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden mb-6">
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                        {slide.ctaOffer.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-mono text-[#f5d061]">
                        {slide.ctaOffer.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      {onNavigate && (
                        <button
                          onClick={() => onNavigate('contact')}
                          className="px-6 py-3.5 rounded-xl bg-[#f5d061] hover:bg-[#ffe58f] text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#f5d061]/20 transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <Calendar className="w-4 h-4" />
                          Book 10-Min Call
                        </button>
                      )}
                      
                      <button
                        onClick={() => triggerBrandSound('hmm')}
                        className="px-5 py-3.5 rounded-xl bg-purple-950/80 border border-purple-700/60 text-purple-200 hover:text-white hover:bg-purple-900 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4 text-[#f5d061]" />
                        Hear Signature
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Deck Footer Metadata */}
            {slide.ctaOffer && (
              <div className="border-t border-purple-900/40 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-purple-300/70">
                <span>{slide.ctaOffer.agencyFooter}</span>
                <span>{slide.ctaOffer.servicesList}</span>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full relative">
      
      {/* ─────────────────────────────────────────────────────────────
          TOP CONTROL BAR & VIEW MODE SWITCHER
          ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-[#0f0a1c]/80 border border-purple-900/40 backdrop-blur-md p-3.5 rounded-2xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#f5d061]/20 border border-[#f5d061]/40 flex items-center justify-center text-[#f5d061]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white tracking-wide">
              HMM STUDIO PITCH MASTERCLASS
            </div>
            <div className="text-[10px] font-mono text-purple-300/70">
              Complete 10-Slide Sonic Identity Whitepaper
            </div>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <div className="bg-[#18112b] p-1 rounded-xl border border-purple-900/50 flex items-center">
            <button
              onClick={() => setViewMode('deck')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'deck'
                  ? 'bg-purple-600 text-white font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Slide Deck ({currentSlideIndex + 1}/10)</span>
            </button>
            <button
              onClick={() => setViewMode('story')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'story'
                  ? 'bg-purple-600 text-white font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Full Web Story</span>
            </button>
          </div>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-[#18112b] border border-purple-900/50 text-purple-300 hover:text-white hover:bg-purple-900/50 transition-colors cursor-pointer"
            title="Share Presentation Link"
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MODE A: INTERACTIVE 16:9 PRESENTATION SLIDE DECK
          ───────────────────────────────────────────────────────────── */}
      {viewMode === 'deck' && (
        <div className="relative">
          {/* Main 16:9 Presentation Canvas */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full min-h-[520px] sm:min-h-[580px] bg-gradient-to-br from-[#0c0817] via-[#090613] to-[#05040a] border-2 border-purple-900/50 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col justify-between overflow-hidden">
            
            {/* Ambient Background Decorative Grid & Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#f5d061]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
            
            {/* Top Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-purple-950/60 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 via-[#f5d061] to-purple-400 transition-all duration-300"
                style={{ width: `${((currentSlideIndex + 1) / slides.length) * 100}%` }}
              />
            </div>

            {/* Slide Body */}
            {renderSlideBody(currentSlide, false)}

            {/* Slide Navigation Controls & Toolbar */}
            <div className="relative z-20 flex items-center justify-between border-t border-purple-900/30 pt-4 mt-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="text-[#f5d061] font-bold">Slide {currentSlideIndex + 1}</span>
                <span>of</span>
                <span>{slides.length}</span>
              </div>

              {/* Prev / Next & Autoplay Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlayingAutoplay(!isPlayingAutoplay)}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    isPlayingAutoplay
                      ? 'bg-[#f5d061] text-black border-[#f5d061]'
                      : 'bg-purple-950/60 border-purple-800/40 text-purple-300 hover:text-white hover:bg-purple-900'
                  }`}
                  title={isPlayingAutoplay ? 'Pause Autoplay' : 'Start Autoplay'}
                >
                  {isPlayingAutoplay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                <button
                  onClick={prevSlide}
                  className="p-2 rounded-xl bg-purple-950/60 border border-purple-800/40 text-purple-300 hover:text-white hover:bg-purple-900 transition-all cursor-pointer"
                  title="Previous Slide (Left Arrow)"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={nextSlide}
                  className="p-2 rounded-xl bg-purple-950/60 border border-purple-800/40 text-purple-300 hover:text-white hover:bg-purple-900 transition-all cursor-pointer"
                  title="Next Slide (Right Arrow or Spacebar)"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Jump Slide Pills Carousel */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => goToSlide(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentSlideIndex === idx
                    ? 'bg-[#f5d061] text-slate-950 font-bold border border-[#f5d061] shadow-lg shadow-[#f5d061]/20'
                    : 'bg-purple-950/40 border border-purple-900/40 text-slate-400 hover:text-white hover:bg-purple-900/40'
                }`}
              >
                <span>{s.id < 10 ? `0${s.id}` : s.id}</span>
                <span className="hidden sm:inline text-[11px] truncate max-w-[120px]">
                  {s.slug.replace(/-/g, ' ').toUpperCase()}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODE B: FULL VERTICAL SCROLLABLE WEB STORY MANIFESTO
          ───────────────────────────────────────────────────────────── */}
      {viewMode === 'story' && (
        <div className="space-y-12">
          {slides.map((slide) => (
            <div 
              key={slide.id}
              className="bg-[#0b0817]/90 border border-purple-900/40 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden"
            >
              {/* Slide Number Watermark */}
              <div className="absolute top-6 right-8 text-7xl sm:text-8xl font-black text-purple-900/20 select-none pointer-events-none font-mono">
                {slide.id < 10 ? `0${slide.id}` : slide.id}
              </div>

              {renderSlideBody(slide, true)}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
