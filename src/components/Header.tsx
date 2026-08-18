import React, { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import { api } from '../lib/supabase';

interface HeaderProps {
  currentSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentSection, onNavigate }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkAuth = () => setIsAdmin(api.isAdminAuthenticated());
    checkAuth();
    window.addEventListener('hmm_auth_update', checkAuth);

    // Show sticky header only once scrolled past hero
    const handleScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('hmm_auth_update', checkAuth);
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
    { id: 'logo-audio',       label: 'SONIC LOGOS' },
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        visible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      {/* Desktop */}
      <div className="hidden lg:flex items-center justify-between px-6 py-2.5 bg-[#0a060c]/90 backdrop-blur-xl border-b border-purple-900/20 relative min-h-[52px]">
        <button onClick={() => handleNavClick('hero')} className="flex items-center gap-2 group z-10">
          <div className="w-7 h-7 rounded-full bg-purple-950/60 border border-purple-500/30 p-0.5 flex items-center justify-center">
            <img src="/assets/logo.webp" alt="Hmm Studio" className="w-full h-full object-contain rounded-full" />
          </div>
          <span className="text-sm font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors">Hmm Studio</span>
        </button>

        <nav className="flex items-center gap-0.5 bg-[#100b1d]/70 border border-purple-900/40 rounded-lg p-1 backdrop-blur-md absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-1.5 text-[10px] font-semibold tracking-wider rounded transition-all ${
                currentSection === item.id
                  ? 'bg-purple-600/30 text-white border border-purple-400/40'
                  : 'text-slate-300 hover:text-white hover:bg-purple-900/20 border border-transparent'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile */}
      <div className="lg:hidden flex items-center justify-between px-4 py-2.5 bg-[#0a060c]/90 backdrop-blur-xl border-b border-purple-900/20">
        <button onClick={() => handleNavClick('hero')} className="flex items-center gap-2">
          <img src="/assets/logo.webp" alt="Logo" className="w-6 h-6 rounded-full object-contain" />
          <span className="font-bold text-sm text-white">Hmm Studio</span>
        </button>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1.5 rounded bg-purple-950/40 border border-purple-800/40 text-purple-300">
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a060c]/95 backdrop-blur-2xl border-b border-purple-900/40 px-4 py-3 grid grid-cols-2 gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="py-2 px-3 bg-purple-950/20 border border-purple-900/30 text-xs text-slate-300 font-bold tracking-wider rounded text-left uppercase"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
