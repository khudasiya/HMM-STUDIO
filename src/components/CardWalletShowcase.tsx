import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Layers,
  ArrowRight,
  Volume2,
  ChevronUp,
  Radio,
  Music,
  Zap,
  Mic,
  Film,
  Folder,
} from 'lucide-react';
import { ImageLightbox, Project } from './ui/3d-folder';

interface CardWalletShowcaseProps {
  onNavigate: (pageId: string) => void;
  title?: string;
  subtitle?: string;
}

interface SoundCardItem {
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
  image: string;
  icon: React.FC<{ className?: string }>;
}

const VAULT_CARDS: SoundCardItem[] = [
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
    description: 'Instant brand recall sound marks for app bootups, podcasts, and TV endcards.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
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
    description: 'Full-length symphonic master scoring for global brand keynotes and launches.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
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
    description: 'Custom segment stingers, theme scoring, and mastered broadcast suites.',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80',
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
    description: 'High-energy, campaign-ready commercial tracks with complete acoustic stems.',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
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
    description: 'Catchy 5-second vocal and melodic hooks engineered for instant airwave recall.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
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
    description: 'UI haptic audio tokens, sonic transitions, and bespoke motion sound design.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    icon: Film,
  },
];

export const CardWalletShowcase: React.FC<CardWalletShowcaseProps> = ({
  onNavigate,
  title = "Our Work & Sound Library",
  subtitle = "Click to eject cards & explore all audio tracks produced by Hmm Studio.",
}) => {
  const [isEjected, setIsEjected] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [sourceRect, setSourceRect] = useState<DOMRect | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isFolderOpen = isEjected || isHovered;

  const handleCardClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const cardEl = cardRefs.current[index];
    if (cardEl) {
      setSourceRect(cardEl.getBoundingClientRect());
    }
    setSelectedIndex(index);
  };

  const handleToggleEject = () => {
    setIsEjected((prev) => !prev);
  };

  const lightboxProjects: Project[] = VAULT_CARDS.map((c) => ({
    id: c.id,
    title: c.label,
    category: c.category,
    description: c.description,
    cardNum: c.cardNum,
    image: c.image,
    accentColor: c.accentColor,
    tag: c.tag,
  }));

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto relative z-20 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-purple-900/15 blur-[140px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 relative z-10">
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

      {/* ── THE ONLY 3D FOLDER (CENTERPIECE SOUND VAULT) ── */}
      <div className="relative flex flex-col items-center justify-center min-h-[580px]">
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative flex flex-col items-center justify-center cursor-pointer group select-none"
          style={{
            perspective: "1200px",
          }}
        >
          {/* 3D FOLDER CONTAINER */}
          <div
            className="relative flex items-center justify-center"
            style={{ width: "380px", height: "300px" }}
          >
            {/* 1. Folder Back Layer - z-index 10 */}
            <div
              className="absolute w-[340px] sm:w-[460px] h-[220px] rounded-3xl shadow-2xl transition-all duration-500"
              style={{
                background: "linear-gradient(145deg, #23143d 0%, #110722 100%)",
                border: "1.5px solid rgba(168,85,247,0.35)",
                transformOrigin: "bottom center",
                transform: isFolderOpen
                  ? "rotateX(-22deg) translateY(-6px)"
                  : "rotateX(0deg) translateY(0)",
                zIndex: 10,
                boxShadow: isFolderOpen
                  ? "0 -15px 40px rgba(168,85,247,0.2)"
                  : "0 10px 30px rgba(0,0,0,0.8)",
              }}
            />

            {/* 2. Folder Tab - z-index 10 */}
            <div
              className="absolute w-28 h-8 rounded-t-xl flex items-center justify-center gap-1.5 transition-all duration-500 shadow-md"
              style={{
                background: "linear-gradient(180deg, #4c1d95 0%, #2a1645 100%)",
                borderTop: "1.5px solid rgba(192,132,252,0.6)",
                borderLeft: "1.5px solid rgba(192,132,252,0.4)",
                borderRight: "1.5px solid rgba(192,132,252,0.4)",
                top: "calc(50% - 110px - 22px)",
                left: "calc(50% - 170px + 24px)",
                transformOrigin: "bottom center",
                transform: isFolderOpen
                  ? "rotateX(-30deg) translateY(-4px)"
                  : "rotateX(0deg) translateY(0)",
                zIndex: 10,
              }}
            >
              <Folder className="w-3.5 h-3.5 text-purple-300" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-purple-100">
                SOUND VAULT
              </span>
            </div>

            {/* 3. The 6 Audio Cards - z-index 20, between back and front flap */}
            <div
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 20,
              }}
            >
              {VAULT_CARDS.map((card, i) => {
                // When folder is closed, cards are stacked tightly in slot (just like image 1)
                // When folder opens/ejected, cards fan out smoothly upwards
                const total = VAULT_CARDS.length;
                const fanRotation = isFolderOpen
                  ? (i - 2.5) * 6.5
                  : (i - 2.5) * 3;
                const fanTranslateY = isFolderOpen
                  ? -140 + (total - 1 - i) * 8
                  : -40 - (total - 1 - i) * 12;
                const fanTranslateX = isFolderOpen
                  ? (i - 2.5) * 8
                  : 0;

                return (
                  <div
                    key={card.id}
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    onClick={(e) => handleCardClick(i, e)}
                    className={`absolute w-[320px] sm:w-[440px] h-[120px] sm:h-[130px] rounded-2xl bg-gradient-to-br ${card.bgGradient} border ${card.borderColor} p-4 shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-between hover:ring-2 hover:ring-purple-400 group/card`}
                    style={{
                      transform: `translateY(${fanTranslateY}px) translateX(${fanTranslateX}px) rotate(${fanRotation}deg)`,
                      zIndex: 20 + i,
                      left: "-160px",
                      top: "-60px",
                      boxShadow: isFolderOpen
                        ? `0 15px 35px rgba(0,0,0,0.8), 0 0 25px ${card.accentColor}30`
                        : "0 10px 25px rgba(0,0,0,0.7)",
                    }}
                  >
                    {/* Background Artwork Pattern */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-40 rounded-2xl"
                      style={{ backgroundImage: card.pattern }}
                    />

                    {/* Card Top Header (Matching Image 1) */}
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-2">
                        {/* Folder icon in accent color */}
                        <Folder
                          className="w-4 h-4"
                          style={{ color: card.accentColor }}
                        />
                        <span className="text-[12px] font-mono text-white font-extrabold uppercase tracking-widest drop-shadow-md">
                          {card.label}
                        </span>
                      </div>

                      <span
                        className="text-[11px] font-mono font-extrabold px-2 py-0.5 rounded border border-white/10 bg-black/60 shadow-xs"
                        style={{ color: card.accentColor }}
                      >
                        {card.cardNum}
                      </span>
                    </div>

                    {/* Card Bottom: Description & Category Tag */}
                    <div className="flex items-center justify-between relative z-10 border-t border-white/10 pt-2 mt-auto">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-slate-300/80 truncate max-w-[240px]">
                        {card.description}
                      </span>

                      <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-purple-300 group-hover/card:text-white transition-colors shrink-0">
                        <span>VIEW</span>
                        <ArrowRight className="w-3 h-3 group-hover/card:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 4. Folder Front Layer - z-index 30 */}
            <div
              onClick={handleToggleEject}
              className="absolute w-[340px] sm:w-[460px] h-[220px] rounded-3xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col justify-between transition-all duration-500 overflow-hidden cursor-pointer"
              style={{
                top: "calc(50% - 110px + 14px)",
                background: "linear-gradient(160deg, #1d1033 0%, #0d051c 100%)",
                border: "2px solid rgba(168,85,247,0.5)",
                transformOrigin: "bottom center",
                transform: isFolderOpen
                  ? "rotateX(28deg) translateY(18px)"
                  : "rotateX(0deg) translateY(0)",
                zIndex: 30,
                boxShadow: isFolderOpen
                  ? "0 35px 70px rgba(0,0,0,0.95), 0 0 30px rgba(168,85,247,0.25)"
                  : "0 20px 50px rgba(0,0,0,0.85)",
              }}
            >
              {/* Folder Slot Line */}
              <div className="w-full h-3 bg-[#07030e] border border-purple-500/40 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.3)] relative flex items-center justify-center overflow-hidden">
                <div className="w-24 h-1 bg-purple-400 rounded-full animate-pulse" />
              </div>

              {/* Front Badge & Title (Matching Image 1) */}
              <div className="text-center my-4 space-y-1 relative z-10">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399] animate-ping" />
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-purple-300 font-bold">
                    Hmm Studio • Sound Vault
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {isFolderOpen ? "SOUND VAULT OPEN" : "CLICK TO EJECT DECK"}
                </h3>
                <p className="text-[11px] font-mono text-slate-400">
                  {isFolderOpen
                    ? "Click any card to inspect or explore"
                    : "Click or hover to expand 6 audio disciplines"}
                </p>
              </div>

              {/* Front Footer & Counter */}
              <div className="w-full flex items-center justify-between border-t border-purple-900/40 pt-3 text-xs font-mono relative z-10">
                <span className="text-slate-300 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  {isFolderOpen ? "06 / 06 EJECTED" : "00 / 06 STACKED"}
                </span>

                <div className="flex items-center gap-2 bg-purple-950/90 border border-purple-600/50 px-3.5 py-1.5 rounded-full text-purple-200 group-hover:bg-purple-600 group-hover:text-white transition-colors shadow-lg">
                  <span className="font-bold text-xs uppercase tracking-wider">
                    {isFolderOpen ? "STACK DECK" : "EJECT DECK"}
                  </span>
                  <ChevronUp
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isFolderOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* 5. Folder Front Shine Effect - z-index 31 */}
            <div
              className="absolute w-[340px] sm:w-[460px] h-[220px] rounded-3xl overflow-hidden pointer-events-none transition-all duration-500"
              style={{
                top: "calc(50% - 110px + 14px)",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, transparent 60%)",
                transformOrigin: "bottom center",
                transform: isFolderOpen
                  ? "rotateX(28deg) translateY(18px)"
                  : "rotateX(0deg) translateY(0)",
                zIndex: 31,
              }}
            />
          </div>
        </div>

        {/* Quick Discipline Shortcuts under the folder */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-2.5 max-w-4xl px-4 relative z-10">
          {VAULT_CARDS.map((card) => (
            <button
              key={card.id}
              onClick={() => onNavigate(card.id)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#120a22]/80 hover:bg-purple-900/60 border border-purple-500/30 text-slate-300 hover:text-white text-xs font-mono transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: card.accentColor }}
              />
              <span>{card.label}</span>
              <ArrowRight className="w-3 h-3 text-purple-400 opacity-60" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal when a card is clicked */}
      <ImageLightbox
        projects={lightboxProjects}
        currentIndex={selectedIndex ?? 0}
        isOpen={selectedIndex !== null}
        onClose={() => {
          setSelectedIndex(null);
          setSourceRect(null);
        }}
        sourceRect={sourceRect}
        onNavigate={(newIdx) => setSelectedIndex(newIdx)}
        onSelectProject={(project) => {
          onNavigate(project.id);
        }}
      />
    </section>
  );
};
