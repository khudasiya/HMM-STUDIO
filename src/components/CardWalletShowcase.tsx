import React, { useState } from 'react';
import { Layers, ArrowRight, ChevronUp, Folder } from 'lucide-react';
import { AnimatedFolder, Project } from './ui/3d-folder';

interface CardWalletShowcaseProps {
  onNavigate: (pageId: string) => void;
  title?: string;
  subtitle?: string;
}

const AUDIO_DISCIPLINES: Project[] = [
  {
    id: 'logo-audio',
    cardNum: '01',
    title: 'Sonic Logos',
    category: 'MICRO AUDIO MARKS',
    description: 'Instant brand recall sound marks for app bootups, podcasts, and TV endcards.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#c084fc',
  },
  {
    id: 'brand-anthem',
    cardNum: '02',
    title: 'Brand Anthems',
    category: 'MASTER SCORES',
    description: 'Full-length symphonic master scoring for global brand keynotes and launches.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#f472b6',
  },
  {
    id: 'podcast-audio',
    cardNum: '03',
    title: 'Podcast Audio',
    category: 'SHOW DESIGN',
    description: 'Custom segment stingers, theme scoring, and mastered broadcast audio suites.',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#38bdf8',
  },
  {
    id: 'commercial-songs',
    cardNum: '04',
    title: 'Commercial Tracks',
    category: 'AD SCORES',
    description: 'High-energy, campaign-ready commercial tracks with complete acoustic stems.',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#fb7185',
  },
  {
    id: 'jingles',
    cardNum: '05',
    title: 'Radio Jingles',
    category: 'BRAND HOOKS',
    description: 'Catchy 5-second vocal and melodic hooks engineered for instant airwave recall.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#34d399',
  },
  {
    id: 'extras',
    cardNum: '06',
    title: 'Extras & Stingers',
    category: 'SOUND DESIGN',
    description: 'UI haptic audio tokens, sonic transitions, and bespoke motion sound design.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#fbbf24',
  },
];

export const CardWalletShowcase: React.FC<CardWalletShowcaseProps> = ({
  onNavigate,
  title = "Our Work & Sound Library",
  subtitle = "Hover over the folder to preview • Click to spread all cards across the screen",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-20 px-3 sm:px-6 max-w-7xl mx-auto relative z-20 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-purple-900/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 relative z-10">
        <div className="authkit-badge mb-3 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-mono">
          <Layers className="w-3.5 h-3.5 text-purple-400" />
          <span>OUR COMPLETE AUDIO PORTFOLIO</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2 mb-3">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-mono tracking-wide">
          {subtitle}
        </p>
      </div>

      {/* ── THE INTERACTIVE SOUND VAULT (INLINE SPREAD DECK) ── */}
      <div className="relative flex flex-col items-center justify-center min-h-[460px]">

        {/* 1. CLOSED STATE: CENTER 3D FOLDER */}
        {!isExpanded && (
          <div className="w-full max-w-md flex flex-col items-center justify-center animate-fade-in">
            <AnimatedFolder
              title="Hmm Studio Sound Vault"
              subtitle="6 audio production disciplines"
              projects={AUDIO_DISCIPLINES}
              onClickFolder={() => setIsExpanded(true)}
              isExpanded={false}
              className="w-full"
            />
          </div>
        )}

        {/* 2. EXPANDED STATE: WIDE HORIZONTAL SPREAD ACROSS THE PAGE (NOT WHOLE SCREEN) */}
        {isExpanded && (
          <div className="w-full flex flex-col items-center justify-center animate-fade-in transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
            
            {/* The 6 Cards Horizontal Ribbon (Directly in the red rectangle area!) */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 px-2 my-4">
              {AUDIO_DISCIPLINES.map((card, idx) => (
                <div
                  key={card.id}
                  onClick={() => onNavigate(card.id)}
                  style={{
                    animationDelay: `${idx * 40}ms`,
                  }}
                  className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-white/15 bg-[#120b22] p-4 flex flex-col justify-between cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-3 hover:scale-105 hover:z-30 hover:border-amber-400/80 shadow-2xl hover:shadow-[0_20px_45px_rgba(245,158,11,0.25)]"
                >
                  {/* High-res Artwork */}
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 opacity-40 group-hover:opacity-65"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0618] via-[#0c0618]/75 to-transparent pointer-events-none" />

                  {/* Card Header: Number & Category */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span
                      className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-black/80 border border-white/20 shadow-sm"
                      style={{ color: card.accentColor || "#f59e0b" }}
                    >
                      {card.cardNum}
                    </span>
                    <Folder className="w-3.5 h-3.5 text-amber-400/80" />
                  </div>

                  {/* Card Bottom: Title & CTA */}
                  <div className="relative z-10 mt-auto pt-3 border-t border-white/15">
                    <span className="text-[9px] font-mono uppercase tracking-wider block text-slate-300/80 truncate">
                      {card.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-amber-300 transition-colors tracking-tight truncate mt-0.5">
                      {card.title}
                    </h3>
                    <p className="text-[11px] text-slate-300/80 line-clamp-2 mt-1 leading-relaxed">
                      {card.description}
                    </p>

                    <div className="mt-3 flex items-center justify-between text-[11px] font-mono font-bold pt-2 border-t border-white/10">
                      <span
                        className="tracking-wider group-hover:underline"
                        style={{ color: card.accentColor || "#f59e0b" }}
                      >
                        EXPLORE
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Collapse Control Bar Below the Cards */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={() => setIsExpanded(false)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 hover:text-amber-200 text-xs font-mono font-bold tracking-wider transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-amber-500/10"
              >
                <ChevronUp className="w-4 h-4" />
                <span>FOLD CARDS BACK INTO VAULT</span>
              </button>
            </div>
          </div>
        )}

        {/* ── QUICK DISCIPLINE SHORTCUT PILLS (BELOW FOLDER) ── */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5 max-w-4xl px-4">
          {AUDIO_DISCIPLINES.map((card) => (
            <button
              key={card.id}
              onClick={() => onNavigate(card.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#110b22]/90 hover:bg-purple-900/50 border border-purple-500/25 text-slate-300 hover:text-white text-xs font-mono transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 shadow-md"
            >
              <span
                className="w-2 h-2 rounded-full shadow-xs"
                style={{ backgroundColor: card.accentColor }}
              />
              <span className="font-semibold">{card.title}</span>
              <ArrowRight className="w-3.5 h-3.5 text-purple-400 opacity-70" />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
