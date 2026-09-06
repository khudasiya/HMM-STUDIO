import React from 'react';
import { AnimatedFolder, Project } from '@/components/ui/3d-folder';
import { FolderGit2, Sparkles, ArrowRight, Music2, Disc3 } from 'lucide-react';

interface VaultCategory {
  title: string;
  categoryTag: string;
  projects: Project[];
}

const sonicVaults: VaultCategory[] = [
  {
    title: 'Sonic Identities & Idents',
    categoryTag: 'AUDIO LOGOS',
    projects: [
      {
        id: 'ident-1',
        title: 'Aether Audio Ident',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'ident-2',
        title: 'CyberPulse Kinetic',
        image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'ident-3',
        title: 'Prism Spectrum',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      },
    ],
  },
  {
    title: 'Master Brand Anthems',
    categoryTag: 'FULL PRODUCTION',
    projects: [
      {
        id: 'anthem-1',
        title: 'Lumnia Orchestral Suite',
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'anthem-2',
        title: 'Nexus Spatial Anthem',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'anthem-3',
        title: 'Vertex Horizon Score',
        image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
      },
    ],
  },
  {
    title: 'Commercial Soundtracks',
    categoryTag: 'SYNC & CAMPAIGNS',
    projects: [
      {
        id: 'sync-1',
        title: 'Velocity Film Trailer',
        image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'sync-2',
        title: 'Solstice Global Spot',
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'sync-3',
        title: 'Echo Broadcast Jingle',
        image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80',
      },
    ],
  },
];

interface PortfolioVaultSectionProps {
  onNavigate?: (sectionId: string) => void;
}

export function PortfolioVaultSection({ onNavigate }: PortfolioVaultSectionProps) {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-purple-900/15 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-mono mb-4 backdrop-blur-md">
            <FolderGit2 className="w-3.5 h-3.5 text-purple-400" />
            <span>INTERACTIVE SONIC ARCHIVES</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            3D Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">Vaults</span>
          </h2>

          <p className="mt-4 text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed">
            Hover over any vault folder to trigger spatial 3D card expansion. Click cards to inspect master identity artwork and case study assets in high-definition lightbox.
          </p>
        </div>

        {/* 3D Folders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {sonicVaults.map((vault) => (
            <div key={vault.title} className="flex flex-col items-center w-full max-w-[320px]">
              <span className="text-[11px] font-mono uppercase tracking-widest text-purple-400/80 mb-2">
                {vault.categoryTag}
              </span>
              <AnimatedFolder
                title={vault.title}
                projects={vault.projects}
                className="w-full bg-[#0e0a1a]/80 backdrop-blur-xl border-purple-900/30 hover:border-purple-500/40"
              />
            </div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          {onNavigate && (
            <button
              onClick={() => onNavigate('commercial-songs')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-purple-600/30 cursor-pointer active:scale-95"
            >
              <Music2 className="w-4 h-4" />
              <span>Listen To Full Audio Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
          {onNavigate && (
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-sm font-semibold transition-all duration-200 cursor-pointer active:scale-95"
            >
              <Disc3 className="w-4 h-4 text-purple-400" />
              <span>Commission Custom Sound Identity</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
