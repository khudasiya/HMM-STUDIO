import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  Layers, 
  Zap, 
  Music, 
  Mic, 
  Radio, 
  Volume2, 
  Film, 
  BookOpen, 
  Compass, 
  User, 
  Mail,
  RotateCw,
  Sliders,
  Sparkles
} from 'lucide-react';

interface NavRingSectionProps {
  onNavigate: (sectionId: string) => void;
  currentSection?: string;
}

interface RingItem {
  id: string;
  label: string;
  shortLabel: string;
  category: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  color: string;
}

const RING_ITEMS: RingItem[] = [
  {
    id: 'hero',
    label: 'HOME SHOWCASE',
    shortLabel: 'HOME',
    category: 'Featured Work',
    description: 'Sonic branding showcase & hero highlight',
    icon: Home,
    color: '#c084fc',
  },
  {
    id: 'services',
    label: 'SERVICES OVERVIEW',
    shortLabel: 'SERVICES',
    category: 'Offerings',
    description: 'Full suite of sonic identity services',
    icon: Layers,
    color: '#a855f7',
  },
  {
    id: 'logo-audio',
    label: 'SONIC LOGOS',
    shortLabel: 'LOGOS',
    category: '2-5s Brand Marks',
    description: 'Ultra-condensed sonic signatures & chimes',
    icon: Zap,
    color: '#e879f9',
  },
  {
    id: 'brand-anthem',
    label: 'BRAND ANTHEMS',
    shortLabel: 'ANTHEMS',
    category: 'Full Audio',
    description: 'Cinematic brand themes and audio identity',
    icon: Music,
    color: '#818cf8',
  },
  {
    id: 'podcast-audio',
    label: 'PODCAST AUDIO',
    shortLabel: 'PODCAST',
    category: 'Show Themes',
    description: 'Podcast intros, outros & stingers',
    icon: Mic,
    color: '#38bdf8',
  },
  {
    id: 'commercial-songs',
    label: 'COMMERCIAL TRACKS',
    shortLabel: 'COMMERCIAL',
    category: 'Ad Music',
    description: 'Bespoke music for ads, TV & digital',
    icon: Radio,
    color: '#34d399',
  },
  {
    id: 'jingles',
    label: 'RADIO JINGLES',
    shortLabel: 'JINGLES',
    category: 'Earworms',
    description: 'Broadcast audio jingles & catchy hooks',
    icon: Volume2,
    color: '#fbbf24',
  },
  {
    id: 'extras',
    label: 'EXTRAS & STINGERS',
    shortLabel: 'EXTRAS',
    category: 'Mini Assets',
    description: 'UI sound effects & motion graphic stingers',
    icon: Film,
    color: '#f87171',
  },
  {
    id: 'blog',
    label: 'SONIC BLOG',
    shortLabel: 'BLOG',
    category: 'Articles',
    description: 'Deep dives & sonic branding insights',
    icon: BookOpen,
    color: '#fb923c',
  },
  {
    id: 'process',
    label: 'HOW IT WORKS',
    shortLabel: 'HOW',
    category: 'Framework',
    description: 'Our 4-step sonic creation workflow',
    icon: Compass,
    color: '#a7f3d0',
  },
  {
    id: 'about',
    label: 'ABOUT STUDIO',
    shortLabel: 'ABOUT',
    category: 'Our Team',
    description: 'Learn about Hmm Studio & team',
    icon: User,
    color: '#ddd6fe',
  },
  {
    id: 'contact',
    label: 'START PROJECT',
    shortLabel: 'CONTACT',
    category: 'Get In Touch',
    description: 'Book a sonic identity discovery call',
    icon: Mail,
    color: '#f472b6',
  },
];

export const NavRingSection: React.FC<NavRingSectionProps> = ({ onNavigate, currentSection }) => {
  const numItems = RING_ITEMS.length;
  const segmentAngle = 360 / numItems; // 30 degrees per item

  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isDraggingWheel, setIsDraggingWheel] = useState<boolean>(false);
  const wheelRef = useRef<SVGSVGElement | null>(null);
  const dragStartRef = useRef<{ angle: number; initialRot: number }>({ angle: 0, initialRot: 0 });

  // Sync selected index from currentSection prop if changed externally
  useEffect(() => {
    if (!currentSection) return;
    const idx = RING_ITEMS.findIndex(item => item.id === currentSection);
    if (idx !== -1 && idx !== selectedIndex) {
      setSelectedIndex(idx);
      const targetAngle = idx * segmentAngle;
      setRotationAngle(targetAngle);
    }
  }, [currentSection]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const angle = parseFloat(e.target.value);
    setRotationAngle(angle);

    const normalized = ((angle % 360) + 360) % 360;
    const idx = Math.round(normalized / segmentAngle) % numItems;
    setSelectedIndex(idx);
  };

  const handleSliderRelease = () => {
    // Snap and navigate when user stops dragging slider
    const snappedIdx = Math.round(rotationAngle / segmentAngle) % numItems;
    handleSelectIndex(snappedIdx, true);
  };

  const handleSelectIndex = (index: number, navigate: boolean = true) => {
    const targetAngle = index * segmentAngle;
    setRotationAngle(targetAngle);
    setSelectedIndex(index);
    if (navigate) {
      onNavigate(RING_ITEMS[index].id);
    }
  };

  // Helper to construct SVG Arc path for pie slice ring
  const getArcPath = (
    index: number, 
    outerR: number = 225, 
    innerR: number = 135
  ) => {
    const cx = 250;
    const cy = 250;
    
    const startDeg = index * segmentAngle - (segmentAngle / 2) - 90;
    const endDeg = index * segmentAngle + (segmentAngle / 2) - 90;

    const startRad = (startDeg * Math.PI) / 180;
    const endRad = (endDeg * Math.PI) / 180;

    const gap = 0.015;
    const sRad = startRad + gap;
    const eRad = endRad - gap;

    const x1Outer = cx + outerR * Math.cos(sRad);
    const y1Outer = cy + outerR * Math.sin(sRad);
    const x2Outer = cx + outerR * Math.cos(eRad);
    const y2Outer = cy + outerR * Math.sin(eRad);

    const x1Inner = cx + innerR * Math.cos(sRad);
    const y1Inner = cy + innerR * Math.sin(sRad);
    const x2Inner = cx + innerR * Math.cos(eRad);
    const y2Inner = cy + innerR * Math.sin(eRad);

    const largeArc = eRad - sRad > Math.PI ? 1 : 0;

    return `
      M ${x1Outer} ${y1Outer}
      A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2Outer} ${y2Outer}
      L ${x2Inner} ${y2Inner}
      A ${innerR} ${innerR} 0 ${largeArc} 0 ${x1Inner} ${y1Inner}
      Z
    `;
  };

  const getLabelPos = (index: number, radius: number = 180) => {
    const cx = 250;
    const cy = 250;
    const centerDeg = index * segmentAngle - 90;
    const rad = (centerDeg * Math.PI) / 180;

    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
      angle: centerDeg + 90,
    };
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!wheelRef.current) return;
    const rect = wheelRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const angleRad = Math.atan2(dy, dx);
    let angleDeg = (angleRad * 180) / Math.PI + 90;
    if (angleDeg < 0) angleDeg += 360;

    setIsDraggingWheel(true);
    dragStartRef.current = { angle: angleDeg, initialRot: rotationAngle };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingWheel || !wheelRef.current) return;
    const rect = wheelRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    let angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    if (angleDeg < 0) angleDeg += 360;

    const delta = angleDeg - dragStartRef.current.angle;
    let newRot = (dragStartRef.current.initialRot + delta) % 360;
    if (newRot < 0) newRot += 360;

    setRotationAngle(newRot);
    const idx = Math.round(newRot / segmentAngle) % numItems;
    setSelectedIndex(idx);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDraggingWheel) {
      setIsDraggingWheel(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch (_) {}
      const snappedIdx = Math.round(rotationAngle / segmentAngle) % numItems;
      handleSelectIndex(snappedIdx, true);
    }
  };

  const activeItem = RING_ITEMS[selectedIndex];
  const ActiveIcon = activeItem.icon;

  return (
    <section 
      id="nav-ring-section" 
      className="py-16 px-4 max-w-5xl mx-auto relative z-20 scroll-mt-20 my-4"
    >
      {/* Background Decorative Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-purple-900/10 to-transparent pointer-events-none rounded-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Centered Wheel + Rotator Slider Container */}
      <div className="flex flex-col items-center justify-center relative z-10 max-w-xl mx-auto">
        
        {/* SVG Ring Wheel */}
        <div className="relative w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] flex items-center justify-center select-none">
          
          {/* Outer Decorative Glow Ring */}
          <div className="absolute inset-0 rounded-full border border-purple-500/20 shadow-[0_0_50px_rgba(168,85,247,0.15)] pointer-events-none" />
          <div className="absolute inset-4 rounded-full border border-purple-900/40 pointer-events-none" />

          <svg
            ref={wheelRef}
            viewBox="0 0 500 500"
            className="w-full h-full cursor-grab active:cursor-grabbing touch-none transition-transform duration-100 ease-out"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            <defs>
              {/* Active Segment Gradient */}
              <radialGradient id="activeGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.4" />
              </radialGradient>
              {/* Glow Filter */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Outer Tick Marks */}
            <circle cx="250" cy="250" r="236" fill="none" stroke="#581c87" strokeWidth="1" strokeDasharray="3 6" opacity="0.5" />
            <circle cx="250" cy="250" r="128" fill="none" stroke="#581c87" strokeWidth="1" strokeDasharray="2 4" opacity="0.6" />

            {/* 12 Arc Segments */}
            {RING_ITEMS.map((item, idx) => {
              const isActive = selectedIndex === idx;
              const path = getArcPath(idx, 225, 135);
              const pos = getLabelPos(idx, 180);

              return (
                <g 
                  key={item.id} 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectIndex(idx, true);
                  }}
                  className="cursor-pointer group"
                >
                  {/* Segment Arc Path */}
                  <path
                    d={path}
                    fill={isActive ? 'url(#activeGrad)' : 'rgba(24, 15, 38, 0.75)'}
                    stroke={isActive ? item.color : 'rgba(147, 51, 234, 0.25)'}
                    strokeWidth={isActive ? '2.5' : '1'}
                    className="transition-all duration-300 group-hover:fill-purple-900/50 group-hover:stroke-purple-400/60"
                    filter={isActive ? 'url(#glow)' : undefined}
                  />

                  {/* Segment Short Label */}
                  <g transform={`translate(${pos.x}, ${pos.y})`}>
                    <text
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill={isActive ? '#ffffff' : '#cbd5e1'}
                      fontSize={isActive ? '11' : '9.5'}
                      fontWeight={isActive ? '800' : '600'}
                      letterSpacing="1"
                      className="font-mono tracking-wider transition-all duration-200 pointer-events-none uppercase"
                    >
                      {item.shortLabel}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* Center Hub Glass Circle */}
            <circle cx="250" cy="250" r="125" fill="#0c0716" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="2" />

            {/* Pointer Needle Arrow - Rotates according to rotationAngle */}
            <g 
              transform={`rotate(${rotationAngle}, 250, 250)`} 
              className="transition-transform duration-300 ease-out pointer-events-none"
            >
              {/* Needle Line extending from center to active segment */}
              <line x1="250" y1="250" x2="250" y2="35" stroke={activeItem.color} strokeWidth="3" strokeLinecap="round" filter="url(#glow)" />
              {/* Needle Arrowhead */}
              <polygon points="250,22 242,42 258,42" fill={activeItem.color} filter="url(#glow)" />
              {/* Center Pivot Circle */}
              <circle cx="250" cy="250" r="14" fill="#1e1035" stroke={activeItem.color} strokeWidth="3" />
              <circle cx="250" cy="250" r="6" fill="#ffffff" />
            </g>
          </svg>

          {/* Central Information Overlay (Inside Center Circle) */}
          <div 
            onClick={() => onNavigate(activeItem.id)}
            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer p-6 text-center group"
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center mb-1.5 shadow-lg border transition-transform duration-300 group-hover:scale-110"
              style={{ 
                backgroundColor: `${activeItem.color}20`,
                borderColor: `${activeItem.color}60`,
                color: activeItem.color
              }}
            >
              <ActiveIcon className="w-5 h-5" />
            </div>
            
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300/80 font-bold mb-0.5">
              {activeItem.category}
            </span>
            
            <h3 className="text-sm sm:text-base font-extrabold text-white tracking-tight line-clamp-1 group-hover:text-purple-200 transition-colors">
              {activeItem.label}
            </h3>
            
            <span className="text-[10px] font-mono text-purple-400 font-semibold mt-1 bg-purple-950/80 px-2 py-0.5 rounded-full border border-purple-800/40">
              CLICK TO JUMP
            </span>
          </div>

        </div>

        {/* Quick Hint */}
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 mt-2 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Click segment or drag wheel to rotate</span>
        </div>

        {/* ROTATOR SLIDER CONTROL (Centered beneath the wheel as in user sketch) */}
        <div className="w-full max-w-md glass-panel rounded-2xl p-5 border border-purple-900/40 bg-[#0d0718]/90 shadow-2xl">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-mono uppercase tracking-widest text-purple-300 font-bold flex items-center gap-2">
              <Sliders className="w-4 h-4 text-purple-400" />
              <span>ROTATOR</span>
            </label>
            <span className="text-xs font-mono text-purple-300 font-bold bg-purple-950/80 px-2.5 py-0.5 rounded border border-purple-800/50">
              {activeItem.shortLabel} ({Math.round(rotationAngle)}°)
            </span>
          </div>

          {/* Slider Input */}
          <div className="relative flex items-center my-2">
            <input
              type="range"
              min="0"
              max="360"
              step="1"
              value={rotationAngle}
              onChange={handleSliderChange}
              onMouseUp={handleSliderRelease}
              onTouchEnd={handleSliderRelease}
              className="w-full h-3.5 bg-purple-950/90 rounded-lg appearance-none cursor-pointer accent-purple-500 border border-purple-800/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 shadow-inner"
            />
          </div>

          {/* Rotator Label */}
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mt-2 px-1">
            <span>SLIDER TO ROTATE WHEEL</span>
            <span className="text-purple-400 font-bold">ROTATOR</span>
          </div>
        </div>

      </div>
    </section>
  );
};
