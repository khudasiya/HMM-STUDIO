import React from 'react';
import { Volume2, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
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

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
            Navigation
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            {['services', 'logo-audio', 'brand-anthem', 'podcast-audio', 'commercial-songs', 'jingles', 'extras'].map((id) => (
              <li key={id}>
                <button
                  onClick={() => onNavigate(id)}
                  className="hover:text-purple-300 transition-colors uppercase tracking-wider font-mono text-[11px]"
                >
                  {id.replace('-', ' ')}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Studio Info */}
        <div>
          <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
            Locations
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>Los Angeles Studio • 90210</li>
            <li>London Creative Hub • EC1A</li>
            <li>Tokyo Sound Lab • Shibuya</li>
            <li className="pt-2 text-purple-400">hello@hmmstudio.com</li>
          </ul>
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
