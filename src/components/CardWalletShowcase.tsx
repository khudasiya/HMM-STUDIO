import React from 'react';
import { Layers, ArrowRight } from 'lucide-react';
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
  subtitle = "Hover the folder to preview • Click to reveal all 6 disciplines on the folder.",
}) => {
  return (
    <section className="py-20 px-3 sm:px-6 max-w-7xl mx-auto relative z-20 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-purple-900/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 relative z-10">
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

      {/* ── SINGLE 3D FOLDER — cards appear ON it when clicked ── */}
      <div className="flex flex-col items-center justify-center relative z-10">
        <div className="w-full max-w-md flex items-center justify-center">
          <AnimatedFolder
            title="Hmm Studio Sound Vault"
            subtitle="6 audio production disciplines"
            projects={AUDIO_DISCIPLINES}
            onSelectProject={(project) => onNavigate(project.id)}
            className="w-full"
          />
        </div>

        {/* Quick discipline shortcut pills */}
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
