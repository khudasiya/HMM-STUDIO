import React, { useState, useEffect } from 'react';
import { AudioProvider } from './context/AudioContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
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

import { api } from './lib/supabase';
import { AudioItem, BlogPost, VideoItem } from './types/portfolio';

export function AppContent() {
  const [currentSection, setCurrentSection] = useState<string>(() => {
    return window.location.pathname === '/admin' ? 'admin' : 'hero';
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

    // Listen for storage updates triggered from Admin Portal
    const handleStorageUpdate = () => {
      loadData();
    };

    const handlePopState = () => {
      if (window.location.pathname === '/admin') {
        setCurrentSection('admin');
      } else {
        setCurrentSection('hero');
      }
    };

    window.addEventListener('hmm_storage_update', handleStorageUpdate);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('hmm_storage_update', handleStorageUpdate);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'admin') {
      window.history.pushState({}, '', '/admin');
      setCurrentSection('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (window.location.pathname === '/admin') {
        window.history.pushState({}, '', '/');
      }
      setCurrentSection(sectionId);
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  if (currentSection === 'admin' || window.location.pathname === '/admin') {
    return (
      <div className="min-h-screen bg-[#08060e] text-slate-100">
        <Header currentSection="admin" onNavigate={handleNavigate} />
        <AdminPortal onDataChange={loadData} onBackToSite={() => handleNavigate('hero')} />
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08060e] text-slate-100 selection:bg-purple-600 selection:text-white">
      <Header currentSection={currentSection} onNavigate={handleNavigate} />
      
      <main>
        {/* 1. Hero Section (Matching Reference Image) */}
        <Hero 
          items={audioItems} 
          onStartProject={() => handleNavigate('contact')}
          onExploreWork={() => handleNavigate('logo-audio')}
        />

        {/* Services Overview */}
        <ServicesSection onNavigate={handleNavigate} />

        {/* Interactive Navigation Ring Wheel & Rotator Slider */}
        <NavRingSection onNavigate={handleNavigate} currentSection={currentSection} />

        {/* 3. Logo Audio Section */}
        <LogoAudioSection items={audioItems} />

        {/* 4. Brand Anthem Section */}
        <BrandAnthemSection items={audioItems} />

        {/* 5. Podcast Audio Section */}
        <PodcastAudioSection items={audioItems} />

        {/* 6. Commercial Songs Section */}
        <CommercialSongsSection items={audioItems} />

        {/* 7. Jingle Section */}
        <JingleSection items={audioItems} />

        {/* 8. Extras Section (Mini Stingers & Videos) */}
        <ExtrasSection audioItems={audioItems} videoItems={videoItems} />

        {/* 2. Blog Section */}
        <BlogSection posts={blogPosts} />

        {/* Our Process Framework */}
        <ProcessSection />

        {/* About Hmm Studio & Testimonials */}
        <AboutSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      <Footer onNavigate={handleNavigate} />
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
