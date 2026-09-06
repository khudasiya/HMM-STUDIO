import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'hero',             label: 'HOME' },
    { id: 'services',         label: 'SERVICES' },
    { id: 'logo-audio',       label: 'LOGOS' },
    { id: 'brand-anthem',     label: 'ANTHEMS' },
    { id: 'podcast-audio',    label: 'PODCAST' },
    { id: 'commercial-songs', label: 'COMMERCIAL' },
    { id: 'jingles',          label: 'JINGLES' },
    { id: 'extras',           label: 'EXTRAS' },
    { id: 'blog',             label: 'BLOG' },
    { id: 'process',          label: 'HOW' },
    { id: 'about',            label: 'ABOUT' },
    { id: 'contact',          label: 'CONTACT' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Desktop */}
      <div className={`hidden lg:flex items-center justify-between px-6 py-2.5 transition-all duration-300 ${
        scrolled || currentSection !== 'hero'
          ? 'bg-[#0a060c]/95 backdrop-blur-xl border-b border-purple-900/30 shadow-2xl shadow-purple-950/40'
          : 'bg-[#0a060c]/60 backdrop-blur-md border-b border-purple-900/10'
      }`}>
        <button onClick={() => handleNavClick('hero')} className="flex items-center gap-2 group z-10 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-purple-950/80 border border-purple-500/40 p-0.5 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <img src="/assets/logo.webp" alt="Hmm Studio" className="w-full h-full object-contain rounded-full" />
          </div>
          <span className="text-sm font-extrabold text-white tracking-tight group-hover:text-purple-300 transition-colors">Hmm Studio</span>
        </button>

        <nav className="flex items-center gap-0.5 bg-[#100b1d]/80 border border-purple-900/40 rounded-xl p-1 backdrop-blur-md shadow-xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-1.5 text-[10px] font-mono font-bold tracking-wider rounded-lg transition-all cursor-pointer uppercase ${
                currentSection === item.id
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-900/50'
                  : 'text-slate-300 hover:text-white hover:bg-purple-900/30'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleNavClick('contact')}
            className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-bold tracking-wider uppercase shadow-lg transition-all cursor-pointer hover:scale-105"
          >
            Start Project
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div className={`lg:hidden flex items-center justify-between px-4 py-2.5 transition-all ${
        scrolled || currentSection !== 'hero'
          ? 'bg-[#0a060c]/95 backdrop-blur-xl border-b border-purple-900/30'
          : 'bg-[#0a060c]/70 backdrop-blur-md'
      }`}>
        <button onClick={() => handleNavClick('hero')} className="flex items-center gap-2">
          <img src="/assets/logo.webp" alt="Logo" className="w-6 h-6 rounded-full object-contain" />
          <span className="font-extrabold text-sm text-white">Hmm Studio</span>
        </button>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1.5 rounded-lg bg-purple-950/60 border border-purple-800/40 text-purple-300">
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a060c]/98 backdrop-blur-2xl border-b border-purple-900/40 px-4 py-4 grid grid-cols-2 gap-2 shadow-2xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`py-2.5 px-3 rounded-xl text-xs font-mono font-bold tracking-wider text-left uppercase transition-all ${
                currentSection === item.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-950/40 border border-purple-900/30 text-slate-300 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
