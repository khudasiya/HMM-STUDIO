import React, { useState, useEffect } from 'react';
import { AudioProvider } from './context/AudioContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { CardWalletShowcase } from './components/CardWalletShowcase';
import { PortfolioVaultSection } from './components/PortfolioVaultSection';
import { NavRingSection } from './components/NavRingSection';
import { LogoAudioSection } from './components/LogoAudioSection';
import { BrandAnthemSection } from './components/BrandAnthemSection';
import { PodcastAudioSection } from './components/PodcastAudioSection';
import { CommercialSongsSection } from './components/CommercialSongsSection';
import { JingleSection } from './components/JingleSection';
import { ExtrasSection } from './components/ExtrasSection';
import { ProcessSection } from './components/ProcessSection';
import { BlogSection } from './components/BlogSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { AdminPortal } from './components/AdminPortal';
import { Footer } from './components/Footer';
import { FloatingPlayer } from './components/FloatingPlayer';

import { api, subscribeToDatabaseChanges } from './lib/supabase';
import { AudioItem, BlogPost, VideoItem } from './types/portfolio';
import { getSectionIdFromPath, navigateToSection, ROUTES } from './lib/router';
import { Sparkles, ArrowRight, Layers, Zap, Music, Mic, Radio, Volume2, Film, BookOpen, Compass, User, Mail } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  hero: <Sparkles className="w-5 h-5 text-purple-400" />,
  services: <Layers className="w-5 h-5 text-purple-400" />,
  'logo-audio': <Zap className="w-5 h-5 text-purple-400" />,
  'brand-anthem': <Music className="w-5 h-5 text-indigo-400" />,
  'podcast-audio': <Mic className="w-5 h-5 text-sky-400" />,
  'commercial-songs': <Radio className="w-5 h-5 text-emerald-400" />,
  jingles: <Volume2 className="w-5 h-5 text-amber-400" />,
  extras: <Film className="w-5 h-5 text-rose-400" />,
  blog: <BookOpen className="w-5 h-5 text-orange-400" />,
  process: <Compass className="w-5 h-5 text-teal-400" />,
  about: <User className="w-5 h-5 text-purple-300" />,
  contact: <Mail className="w-5 h-5 text-pink-400" />,
};

export function AppContent() {
  const [currentSection, setCurrentSection] = useState<string>(() => {
    return getSectionIdFromPath(window.location.pathname);
  });

  const [audioItems, setAudioItems] = useState<AudioItem[]>([]);
  const [videoItems, setVideoItems] = useState<VideoItem[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  const loadData = async () => {
    const audios = await api.getAudioItems();
    const vids = await api.getVideos();
    const posts = await api.getBlogPosts();
    setAudioItems(audios);
    setVideoItems(vids);
    setBlogPosts(posts);
  };

  useEffect(() => {
    loadData();

    const handleStorageUpdate = () => loadData();

    const handlePopState = () => {
      const section = getSectionIdFromPath(window.location.pathname);
      setCurrentSection(section);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hmm_storage_update', handleStorageUpdate);
    window.addEventListener('popstate', handlePopState);

    // Subscribe to Supabase Realtime multi-client live updates
    const unsubscribeRealtime = subscribeToDatabaseChanges(() => {
      loadData();
    });

    return () => {
      window.removeEventListener('hmm_storage_update', handleStorageUpdate);
      window.removeEventListener('popstate', handlePopState);
      unsubscribeRealtime();
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    navigateToSection(sectionId);
    setCurrentSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render Dedicated Secret Admin Page
  if (currentSection === 'admin' || window.location.pathname.toLowerCase() === '/haldiram') {
    return (
      <div className="min-h-screen bg-[#08060e] text-slate-100 selection:bg-purple-600 selection:text-white">
        <Header currentSection="admin" onNavigate={handleNavigate} />
        <AdminPortal onDataChange={loadData} onBackToSite={() => handleNavigate('hero')} />
        <Footer onNavigate={handleNavigate} />
        <FloatingPlayer onNavigate={handleNavigate} />
      </div>
    );
  }

  // Subpage routes: Render dedicated page layout for each section individually
  const renderDedicatedPage = () => {
    switch (currentSection) {
      case 'services':
        return <ServicesSection onNavigate={handleNavigate} isStandalonePage />;
      case 'logo-audio':
        return <LogoAudioSection items={audioItems} onNavigate={handleNavigate} isStandalonePage />;
      case 'brand-anthem':
        return <BrandAnthemSection items={audioItems} onNavigate={handleNavigate} isStandalonePage />;
      case 'podcast-audio':
        return <PodcastAudioSection items={audioItems} onNavigate={handleNavigate} isStandalonePage />;
      case 'commercial-songs':
        return <CommercialSongsSection items={audioItems} onNavigate={handleNavigate} isStandalonePage />;
      case 'jingles':
        return <JingleSection items={audioItems} onNavigate={handleNavigate} isStandalonePage />;
      case 'extras':
        return <ExtrasSection audioItems={audioItems} videoItems={videoItems} onNavigate={handleNavigate} isStandalonePage />;
      case 'blog':
        return <BlogSection posts={blogPosts} onNavigate={handleNavigate} isStandalonePage />;
      case 'process':
        return <ProcessSection onNavigate={handleNavigate} isStandalonePage />;
      case 'about':
        return <AboutSection onNavigate={handleNavigate} isStandalonePage />;
      case 'contact':
        return <ContactSection onNavigate={handleNavigate} isStandalonePage />;
      default:
        return null;
    }
  };

  const isSubPage = currentSection !== 'hero';

  return (
    <div className="min-h-screen bg-[#08060e] text-slate-100 selection:bg-purple-600 selection:text-white relative">
      <Header currentSection={currentSection} onNavigate={handleNavigate} />
      
      <main>
        {isSubPage ? (
          /* Render standalone dedicated page */
          <div className="min-h-[70vh] animate-fade-in">
            {renderDedicatedPage()}
          </div>
        ) : (
          /* Render Full Home Showcase Page */
          <div className="space-y-12">
            {/* 1. Hero Showcase */}
            <Hero 
              items={audioItems} 
              onStartProject={() => handleNavigate('contact')}
              onExploreWork={() => handleNavigate('commercial-songs')}
            />

            {/* 2. 3D Interactive Card Wallet Dispenser */}
            <CardWalletShowcase onNavigate={handleNavigate} />

            {/* 3. 3D Interactive Sonic Branding Vaults */}
            <PortfolioVaultSection onNavigate={handleNavigate} />

            {/* Services Overview */}
            <ServicesSection onNavigate={handleNavigate} />

            {/* Framework, About & Contact Details */}
            <ProcessSection onNavigate={handleNavigate} />
            <AboutSection onNavigate={handleNavigate} />
            <ContactSection onNavigate={handleNavigate} />
          </div>
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
      <FloatingPlayer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <AudioProvider>
      <AppContent />
    </AudioProvider>
  );
}
