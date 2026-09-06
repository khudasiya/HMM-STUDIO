import React, { useState } from 'react';
import { AudioItem } from '../types/portfolio';
import { AudioCard } from './AudioCard';
import { Radio, Filter, Tv, Share2, Video, Shield } from 'lucide-react';
import { PageHeader } from './PageHeader';

interface CommercialSongsSectionProps {
  items: AudioItem[];
  onNavigate?: (sectionId: string) => void;
  isStandalonePage?: boolean;
}

export const CommercialSongsSection: React.FC<CommercialSongsSectionProps> = ({ 
  items, 
  onNavigate, 
  isStandalonePage = false 
}) => {
  const commercialItems = items.filter(i => i.category === 'commercial_song' && i.published);
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const campaignTags = [
    { id: 'all', label: 'All Commercials' },
    { id: 'tv', label: 'TV Broadcast' },
    { id: 'digital', label: 'Digital Ads' },
    { id: 'social', label: 'Social Media' },
    { id: 'app', label: 'In-App Video' },
  ];

  return (
    <section id="commercial-songs" className={`py-12 px-4 max-w-7xl mx-auto relative z-10 ${isStandalonePage ? '' : 'scroll-mt-20'}`}>
      
      {isStandalonePage && onNavigate && (
        <PageHeader
          title="Commercial Scores & Ad Music"
          subtitle="Bespoke commercial music scores and sync tracks engineered to drive conversion, brand affinity, & emotional resonance for TV spots, digital pre-rolls, & global ad campaigns."
          category="Ad Music & Commercial Scores"
          icon={Radio}
          currentSectionId="commercial-songs"
          onNavigate={onNavigate}
        />
      )}

      {!isStandalonePage && (
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-400 bg-purple-950/60 border border-purple-800/40 px-3 py-1 rounded-full mb-3">
              <Radio className="w-3.5 h-3.5" /> ADVERTISING MUSIC
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Commercial & Ad Scores
            </h2>
          </div>
          <p className="text-sm text-slate-300 max-w-md">
            Bespoke music tailored for TV commercials, digital ad campaigns, YouTube pre-rolls, and radio broadcasts.
          </p>
        </div>
      )}

      {/* Standalone Filter Tags */}
      {isStandalonePage && (
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          <Filter className="w-4 h-4 text-purple-400 shrink-0 mr-1" />
          {campaignTags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setSelectedTag(tag.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all shrink-0 cursor-pointer ${
                selectedTag === tag.id
                  ? 'bg-purple-600 text-white border border-purple-400 font-bold shadow-md'
                  : 'bg-purple-950/40 text-slate-300 hover:bg-purple-900/50 border border-purple-900/40'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      )}

      {/* Grid of Commercial Songs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
        {commercialItems.map((item) => (
          <AudioCard key={item.id} item={item} />
        ))}
      </div>

      {/* Standalone Licensing Guide & Rights */}
      {isStandalonePage && onNavigate && (
        <div className="space-y-12 border-t border-purple-900/40 pt-16">
          
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
              SYNC LICENSING & CLEARANCE
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Guaranteed 100% Broadcast Clearances
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0f0a1c]/80 border border-purple-900/40 rounded-2xl p-6">
              <Tv className="w-6 h-6 text-purple-400 mb-3" />
              <h4 className="font-bold text-white text-lg mb-1">Global TV & Cinema</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Full worldwide television, streaming (Netflix, Hulu, Prime), and theatrical cinema sync licensing with zero royalty claims.
              </p>
            </div>

            <div className="bg-[#0f0a1c]/80 border border-purple-900/40 rounded-2xl p-6">
              <Video className="w-6 h-6 text-red-400 mb-3" />
              <h4 className="font-bold text-white text-lg mb-1">Digital & Pre-Roll</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clean Content ID whitelisting for YouTube, Meta, TikTok, Twitch & web pre-roll campaigns with zero copyright strikes.
              </p>
            </div>

            <div className="bg-[#0f0a1c]/80 border border-purple-900/40 rounded-2xl p-6">
              <Shield className="w-6 h-6 text-emerald-400 mb-3" />
              <h4 className="font-bold text-white text-lg mb-1">Custom Ad Scoring</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bespoke music composed hit-for-hit to your video edit sync points with rapid 48-hour revision turns.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-950/60 to-[#120b22] border border-purple-900/60 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono text-purple-300 uppercase tracking-widest font-bold">
                COMMERCIAL SCORING
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-white mt-1 mb-2">
                Need a bespoke score for an upcoming commercial?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Send us your video rough-cut or animatic storyboard for a preliminary musical concept proposal within 24 hours.
              </p>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shrink-0 cursor-pointer"
            >
              Commission Ad Score
            </button>
          </div>

        </div>
      )}

    </section>
  );
};
