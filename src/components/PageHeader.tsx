import React from 'react';
import { ChevronRight, Home, Sparkles, Layers } from 'lucide-react';
import { ROUTES } from '../lib/router';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  category: string;
  icon: React.FC<{ className?: string }>;
  currentSectionId: string;
  onNavigate: (sectionId: string) => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  category,
  icon: Icon,
  currentSectionId,
  onNavigate,
}) => {
  const otherRoutes = ROUTES.filter(r => r.id !== 'admin' && r.id !== currentSectionId);

  return (
    <div className="relative pt-28 pb-12 px-4 max-w-7xl mx-auto z-10">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-gradient-to-b from-purple-900/25 via-purple-600/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-1 hover:text-purple-300 transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-purple-600" />
        <span className="text-purple-300 font-bold uppercase tracking-wider">{category}</span>
      </div>

      {/* Title & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-purple-900/30 pb-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-300 bg-purple-950/80 border border-purple-800/50 px-3.5 py-1.5 rounded-full mb-4 shadow-inner">
            <Icon className="w-4 h-4 text-purple-400" />
            <span>{category}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4">
            {subtitle}
          </p>
        </div>

        {/* Action Button & Quick Page Selector */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-purple-900/50 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            Book Discovery Call
          </button>
          
          <button
            onClick={() => onNavigate('hero')}
            className="px-4 py-2.5 rounded-xl bg-purple-950/60 border border-purple-800/40 text-purple-300 hover:text-white hover:bg-purple-900 font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Layers className="w-4 h-4" />
            Nav Wheel
          </button>
        </div>
      </div>

      {/* Subpage Quick Nav Ribbon */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest shrink-0 mr-1 font-bold">
          Jump to:
        </span>
        {otherRoutes.map((route) => (
          <button
            key={route.id}
            onClick={() => onNavigate(route.id)}
            className="px-3 py-1 rounded-lg text-[10px] font-mono uppercase tracking-wider text-slate-300 hover:text-white bg-purple-950/30 hover:bg-purple-900/40 border border-purple-900/30 hover:border-purple-500/40 transition-all shrink-0 cursor-pointer"
          >
            {route.shortLabel}
          </button>
        ))}
      </div>

    </div>
  );
};
