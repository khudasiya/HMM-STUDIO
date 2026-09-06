import React from 'react';
import { Volume2, Heart, Sparkles } from 'lucide-react';
import { ROUTES } from '../lib/router';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const pageLinks = ROUTES.filter(r => r.id !== 'admin');

  return (
    <footer className="bg-[#050409] border-t border-purple-950/60 py-16 px-4 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-950/80 border border-purple-500/40 p-1 flex items-center justify-center">
              <img src="/assets/logo.webp" alt="Hmm Studio Logo" className="w-full h-full object-contain rounded-full" />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">Hmm Studio</span>
          </div>
          
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            Hmm Studio is a Sonic & Audio Identity Agency specializing in sonic logos, brand anthems, commercial scores, podcast audio, and spatial sound design.
          </p>

          <div className="text-[11px] font-mono text-purple-400/80 flex items-center gap-2">
            <Volume2 className="w-3.5 h-3.5" />
            <span>AUTHENTIC AUDIO IDENTITY ARCHITECTURE</span>
          </div>
        </div>

        {/* Dedicated Pages Sitemap */}
        <div>
          <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
            Pages Sitemap
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            {pageLinks.map((route) => (
              <li key={route.id}>
                <button
                  onClick={() => onNavigate(route.id)}
                  className="hover:text-purple-300 transition-colors uppercase tracking-wider font-mono text-[11px] cursor-pointer"
                >
                  {route.shortLabel} — {route.category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Studio Info */}
        <div>
          <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
            Direct Contact
          </h4>
          <div className="space-y-3 text-xs text-slate-400 font-mono">
            <p className="text-slate-300">Get in touch for audio strategy, custom scoring, and sonic identity inquiries.</p>
            <p className="pt-2 text-purple-400 font-bold text-sm">
              <a href="mailto:om.hmmsounds@gmail.com" className="hover:text-purple-300 transition-colors">om.hmmsounds@gmail.com</a>
            </p>
          </div>

          <div className="mt-6">
            <button
              onClick={() => onNavigate('contact')}
              className="w-full py-2.5 px-4 rounded-xl bg-purple-950/60 border border-purple-800/40 text-purple-300 hover:text-white font-bold text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer"
            >
              Start Project Inquiry
            </button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-purple-950/80 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
        <p>© {new Date().getFullYear()} Hmm Studio Inc. All Rights Reserved.</p>
        <p className="flex items-center gap-1">
          Designed with <Heart className="w-3 h-3 text-purple-400 fill-purple-400" /> for Sonic Excellence
        </p>
      </div>
    </footer>
  );
};
