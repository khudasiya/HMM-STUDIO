import React, { useState } from 'react';
import { Sparkles, Layers, ArrowRight, Volume2, ChevronUp, Radio, Music, Zap, Mic, Film } from 'lucide-react';

interface CardWalletShowcaseProps {
  onNavigate: (pageId: string) => void;
  title?: string;
  subtitle?: string;
}

interface WalletCardItem {
  id: string;
  label: string;
  category: string;
  cardNum: string;
  bgGradient: string;
  borderColor: string;
  accentColor: string;
  pattern: string;
  tag: string;
  description: string;
  icon: React.FC<{ className?: string }>;
}

const WALLET_CARDS: WalletCardItem[] = [
  {
    id: 'logo-audio',
    label: 'Sonic Logos',
    category: 'MICRO AUDIO MARKS',
    cardNum: '01',
    bgGradient: 'from-[#1e1338] via-[#140b28] to-[#0c061a]',
    borderColor: 'border-purple-500/60',
    accentColor: '#c084fc',
    pattern: 'radial-gradient(circle at 80% 20%, rgba(192,132,252,0.2) 0%, transparent 60%)',
    tag: '2-5s Audio Signatures',
    description: 'Instant brand recall sound marks for app bootups & TV endcards.',
    icon: Zap,
  },
  {
    id: 'brand-anthem',
    label: 'Brand Anthems',
    category: 'MASTER SCORES',
    cardNum: '02',
    bgGradient: 'from-[#331440] via-[#200a2b] to-[#0e0317]',
    borderColor: 'border-pink-500/60',
    accentColor: '#f472b6',
    pattern: 'radial-gradient(circle at 80% 20%, rgba(244,114,182,0.2) 0%, transparent 60%)',
    tag: 'Flagship Orchestral',
    description: 'Full-length symphonic master scoring for global brand keynotes.',
    icon: Music,
  },
  {
    id: 'podcast-audio',
    label: 'Podcast Audio',
    category: 'SHOW DESIGN',
    cardNum: '03',
    bgGradient: 'from-[#0e2c45] via-[#091a2c] to-[#040d18]',
    borderColor: 'border-cyan-500/60',
    accentColor: '#38bdf8',
    pattern: 'radial-gradient(circle at 80% 20%, rgba(56,189,248,0.2) 0%, transparent 60%)',
    tag: 'Show Intro & Outros',
    description: 'Custom segment stingers & mastered broadcast audio suites.',
    icon: Mic,
  },
  {
    id: 'commercial-songs',
    label: 'Commercial Tracks',
    category: 'AD SCORES',
    cardNum: '04',
    bgGradient: 'from-[#421320] via-[#290913] to-[#140309]',
    borderColor: 'border-rose-500/60',
    accentColor: '#fb7185',
    pattern: 'radial-gradient(circle at 80% 20%, rgba(251,113,133,0.2) 0%, transparent 60%)',
    tag: 'Viral Ad Scores',
    description: 'Campaign ready commercial tracks with full acoustic stems.',
    icon: Radio,
  },
  {
    id: 'jingles',
    label: 'Radio Jingles',
    category: 'BRAND HOOKS',
    cardNum: '05',
    bgGradient: 'from-[#123829] via-[#0a2419] to-[#04120c]',
    borderColor: 'border-emerald-500/60',
    accentColor: '#34d399',
    pattern: 'radial-gradient(circle at 80% 20%, rgba(52,211,153,0.2) 0%, transparent 60%)',
    tag: 'Vocal Brand Hooks',
    description: 'Catchy 5-second vocal & acoustic hooks for retail airwaves.',
    icon: Radio,
  },
  {
    id: 'extras',
    label: 'Extras & Stingers',
    category: 'SOUND DESIGN',
    cardNum: '06',
    bgGradient: 'from-[#382413] via-[#24160a] to-[#120a04]',
    borderColor: 'border-amber-500/60',
    accentColor: '#fbbf24',
    pattern: 'radial-gradient(circle at 80% 20%, rgba(251,191,36,0.2) 0%, transparent 60%)',
    tag: 'Spatial Sound FX',
    description: 'UI haptic audio tokens & motion sound design assets.',
    icon: Film,
  }
];

export const CardWalletShowcase: React.FC<CardWalletShowcaseProps> = ({
  onNavigate,
  title = "Our Work & Sound Library",
  subtitle = "Click to eject cards & explore all audio tracks produced by Hmm Studio."
}) => {
  const [isEjected, setIsEjected] = useState(false);

  const toggleEject = () => {
    setIsEjected(!isEjected);
  };

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto relative z-20 overflow-hidden">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="authkit-badge mb-3">
          <Layers className="w-3.5 h-3.5 text-purple-400" />
          <span>OUR COMPLETE AUDIO PORTFOLIO</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-gradient-silver tracking-tight mt-2 mb-3">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-mono tracking-wide">
          {subtitle}
        </p>
      </div>

      {/* Main Dispenser Device Container */}
      <div className="relative min-h-[540px] flex flex-col items-center justify-center">

        {/* ── EJECTED CARDS FAN GRID (WHEN DISPERSED) ── */}
        <div className={`w-full max-w-5xl transition-all duration-700 ${
          isEjected 
            ? 'opacity-100 scale-100 pointer-events-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6' 
            : 'opacity-0 scale-95 pointer-events-none absolute inset-0'
        }`}>
          {WALLET_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => onNavigate(card.id)}
                className={`relative bg-gradient-to-br ${card.bgGradient} border ${card.borderColor} rounded-2xl p-6 cursor-pointer transition-all duration-300 shadow-2xl hover:-translate-y-2.5 hover:shadow-[0_0_40px_rgba(168,85,247,0.35)] group overflow-hidden flex flex-col justify-between h-[230px]`}
              >
                {/* Radial Artwork Pattern */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-60" 
                  style={{ backgroundImage: card.pattern }}
                />

                {/* Subtle Metallic Card Reflection Stripe */}
                <div className="absolute -top-24 -left-24 w-48 h-96 bg-gradient-to-r from-transparent via-white/5 to-transparent transform rotate-45 pointer-events-none group-hover:translate-x-64 transition-transform duration-1000" />

                {/* Card Top Header */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2.5">
                    {/* Metallic Gold EMV Microchip */}
                    <div className="w-8 h-6 rounded-md bg-gradient-to-tr from-amber-400 via-amber-200 to-yellow-500 border border-amber-300/80 p-1 flex flex-col justify-between shadow-md">
                      <div className="w-full h-0.5 bg-amber-800/70 rounded-full" />
                      <div className="w-full h-0.5 bg-amber-800/70 rounded-full" />
                      <div className="w-full h-0.5 bg-amber-800/70 rounded-full" />
                    </div>
                    {/* Contactless Signal Icon */}
                    <Volume2 className="w-4 h-4 text-slate-300/90" />
                  </div>

                  <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 px-2.5 py-0.5 rounded-full">
                    <Icon className="w-3 h-3 text-purple-300" />
                    <span className="text-[10px] font-mono font-bold tracking-widest text-slate-200">
                      {card.cardNum} / 06
                    </span>
                  </div>
                </div>

                {/* Card Title & Category */}
                <div className="relative z-10 my-2">
                  <span 
                    className="text-[10px] font-mono font-bold uppercase tracking-widest block mb-1"
                    style={{ color: card.accentColor }}
                  >
                    {card.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-purple-200 transition-colors">
                    {card.label}
                  </h3>
                  <p className="text-xs text-slate-300/85 line-clamp-2 mt-1 font-normal leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Card Bottom CTA */}
                <div className="flex items-center justify-between border-t border-white/15 pt-3 relative z-10">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300 font-semibold">
                    {card.tag}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-purple-300 group-hover:text-white font-bold">
                    <span className="tracking-wider text-[11px]">OPEN PAGE</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── THE 3D WALLET DEVICE CHASSIS (STACKED SLOTTED VIEW) ── */}
        <div 
          onClick={toggleEject}
          className={`relative z-30 cursor-pointer group transition-all duration-500 transform ${
            isEjected ? 'scale-90 my-6' : 'scale-100 my-0 hover:scale-105'
          }`}
        >
          {/* STACKED CARDS POKING OUT OF THE SLOT (WHEN NOT EJECTED) */}
          {!isEjected && (
            <div className="relative w-[340px] sm:w-[480px] h-24 -mb-8 flex items-end justify-center pointer-events-none">
              {WALLET_CARDS.map((card, i) => (
                <div
                  key={card.id}
                  className={`absolute w-[320px] sm:w-[440px] h-32 rounded-2xl bg-gradient-to-br ${card.bgGradient} border ${card.borderColor} p-4 shadow-2xl transition-all duration-500 flex items-start justify-between group-hover:-translate-y-3`}
                  style={{
                    transform: `translateY(-${(WALLET_CARDS.length - 1 - i) * 14}px) scale(${0.85 + i * 0.025}) rotate(${(i - 2.5) * 4}deg)`,
                    zIndex: i + 1,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-3.5 rounded bg-gradient-to-tr from-amber-400 to-amber-200 border border-amber-300/80 shadow-xs" />
                    <span className="text-[11px] font-mono text-white font-extrabold uppercase tracking-widest drop-shadow-md">
                      {card.label}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-purple-300 font-extrabold bg-black/50 px-2 py-0.5 rounded border border-white/10">
                    {card.cardNum}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* 3D WALLET HARDWARE CHASSIS */}
          <div className="relative w-[340px] sm:w-[480px] bg-gradient-to-b from-[#1c132e] via-[#120a22] to-[#090414] border-2 border-purple-500/50 rounded-3xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col items-center justify-between min-h-[230px] overflow-hidden authkit-dot-grid">
            
            {/* Top Ejector Card Slot */}
            <div className="w-full h-4 bg-[#050209] border border-purple-500/40 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.3)] relative flex items-center justify-center overflow-hidden">
              <div className="w-28 h-1 bg-purple-400 rounded-full animate-pulse" />
            </div>

            {/* Device Display Details */}
            <div className="text-center my-6 space-y-1 relative z-10">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399] animate-ping" />
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-purple-300 font-bold">
                  Hmm Studio • Sound Vault
                </span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {isEjected ? 'DECK DISPERSED' : 'CLICK TO EJECT DECK'}
              </h3>
              <p className="text-[11px] font-mono text-slate-400">
                {isEjected ? 'Click to stack all cards back into vault' : 'Click to eject 6 standalone audio skill cards'}
              </p>
            </div>

            {/* Device Footer & Counter */}
            <div className="w-full flex items-center justify-between border-t border-purple-900/40 pt-4 text-xs font-mono relative z-10">
              <span className="text-slate-300 font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" />
                {isEjected ? '06 / 06 CARDS ACTIVE' : '00 / 06 STACKED'}
              </span>

              <div className="flex items-center gap-2 bg-purple-950/90 border border-purple-600/50 px-4 py-1.5 rounded-full text-purple-200 group-hover:bg-purple-600 group-hover:text-white transition-colors shadow-lg">
                <span className="font-bold text-xs uppercase tracking-wider">
                  {isEjected ? 'STACK DECK' : 'EJECT DECK'}
                </span>
                <ChevronUp className={`w-4 h-4 transition-transform duration-300 ${isEjected ? 'rotate-180' : ''}`} />
              </div>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};
