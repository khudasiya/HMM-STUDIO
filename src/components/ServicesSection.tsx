import React, { useState } from 'react';
import { SERVICES } from '../data/mockData';
import { Zap, Music, Mic, Radio, Volume2, Film, ArrowDownRight, Check, Sparkles, Layers, ShieldCheck, Clock } from 'lucide-react';
import { PageHeader } from './PageHeader';

interface ServicesSectionProps {
  onNavigate: (sectionId: string) => void;
  isStandalonePage?: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-6 h-6 text-purple-400" />,
  Music: <Music className="w-6 h-6 text-indigo-400" />,
  Mic: <Mic className="w-6 h-6 text-sky-400" />,
  Radio: <Radio className="w-6 h-6 text-emerald-400" />,
  Volume2: <Volume2 className="w-6 h-6 text-amber-400" />,
  Film: <Film className="w-6 h-6 text-rose-400" />
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigate, isStandalonePage = false }) => {
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);

  const engagementPackages = [
    {
      name: 'Sonic Mark Package',
      scopeLabel: 'Essential Scope',
      tag: 'Startup Essential',
      description: 'Ultra-condensed 2-5 second audio logo designed for app launches & checkout chimes.',
      features: [
        '3 Sonic Logo concepts',
        'Mastered WAV & MP3 formats',
        'Commercial royalty-free rights',
        '2 rounds of revisions',
        'Turnaround: 5-7 business days'
      ],
      cta: 'Inquire Sonic Mark'
    },
    {
      name: 'Full Sonic Identity',
      scopeLabel: 'Complete Suite',
      tag: 'Most Popular',
      popular: true,
      description: 'Comprehensive audio brand suite with sonic logo, brand anthem, and podcast package.',
      features: [
        '5 Sonic Logo variations',
        '2-Minute Brand Anthem & Cuts (60s, 30s)',
        'Podcast Intro, Outro & Stinger Package',
        'Complete Stem files & Spatial Audio',
        'Sonic Brand Guidelines PDF',
        'Turnaround: 14 business days'
      ],
      cta: 'Request Identity Suite'
    },
    {
      name: 'Enterprise Ecosystem',
      scopeLabel: 'Omnichannel System',
      tag: 'Global Brands',
      description: 'Custom bespoke sound design for hardware UI, retail environments, & broadcast campaigns.',
      features: [
        'Bespoke Sonic Logo & Hardware Chimes',
        'Full Orchestral Brand Anthems',
        'Global TV & Broadcast Clearances',
        'UI Sound FX Library (50+ sounds)',
        'Dedicated Audio Director',
        'Turnaround: Priority SLA'
      ],
      cta: 'Request Custom Proposal'
    }
  ];

  return (
    <section id="services" className={`py-12 px-4 max-w-7xl mx-auto relative z-10 ${isStandalonePage ? '' : 'scroll-mt-20'}`}>
      
      {isStandalonePage && (
        <PageHeader
          title="Sonic Identity Offerings & Architecture"
          subtitle="From 2-second UI audio stingers to multi-minute cinematic brand anthems, we sculpt sound that makes companies unforgettable."
          category="Offerings & Architecture"
          icon={Layers}
          currentSectionId="services"
          onNavigate={onNavigate}
        />
      )}

      {!isStandalonePage && (
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400 bg-purple-950/60 border border-purple-800/40 px-3 py-1 rounded-full">
            SERVICES OVERVIEW
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-4 mb-4">
            Sonic Identity Offerings
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            From 2-second UI audio stingers to multi-minute cinematic brand anthems, we sculpt sound that makes companies unforgettable.
          </p>
        </div>
      )}

      {/* Grid of 6 Core Offerings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {SERVICES.map((srv) => (
          <div
            key={srv.id}
            onClick={() => onNavigate(srv.anchorId)}
            className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between cursor-pointer group border border-purple-900/40 hover:border-purple-500/50"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {iconMap[srv.iconName]}
              </div>

              <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-semibold">
                {srv.subtitle}
              </span>
              <h3 className="text-xl font-bold text-white mt-1 mb-2 group-hover:text-purple-200 transition-colors">
                {srv.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed mb-6">
                {srv.description}
              </p>
            </div>

            <div>
              <div className="space-y-1.5 border-t border-purple-900/30 pt-4 mb-4">
                {srv.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-purple-300 group-hover:text-white transition-colors">
                <span>Explore Showcase</span>
                <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform text-purple-400" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Extended Features for Standalone Services Page */}
      {isStandalonePage && (
        <div className="space-y-20 pt-8 border-t border-purple-900/40">
          
          {/* Service Deliverables Specs Table */}
          <div className="bg-[#0f0a1c]/80 border border-purple-900/50 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
                DELIVERABLE ARCHITECTURE
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                What You Receive With Every Package
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-slate-200">
              <div className="bg-purple-950/30 border border-purple-900/40 p-5 rounded-2xl">
                <div className="w-9 h-9 rounded-lg bg-purple-900/40 flex items-center justify-center text-purple-300 mb-3 font-mono text-xs font-bold">
                  01
                </div>
                <h4 className="font-bold text-white text-base mb-1">Uncompressed Master</h4>
                <p className="text-xs text-slate-400">24-bit 96kHz broadcast WAV & lossless FLAC files engineered for peak acoustic fidelity.</p>
              </div>

              <div className="bg-purple-950/30 border border-purple-900/40 p-5 rounded-2xl">
                <div className="w-9 h-9 rounded-lg bg-purple-900/40 flex items-center justify-center text-purple-300 mb-3 font-mono text-xs font-bold">
                  02
                </div>
                <h4 className="font-bold text-white text-base mb-1">Full Stem Separation</h4>
                <p className="text-xs text-slate-400">Isolated melody, bassline, rhythm, and FX tracks for maximum mixing versatility.</p>
              </div>

              <div className="bg-purple-950/30 border border-purple-900/40 p-5 rounded-2xl">
                <div className="w-9 h-9 rounded-lg bg-purple-900/40 flex items-center justify-center text-purple-300 mb-3 font-mono text-xs font-bold">
                  03
                </div>
                <h4 className="font-bold text-white text-base mb-1">Sonic Guidelines PDF</h4>
                <p className="text-xs text-slate-400">Clear rules on audio frequency cutoffs, volume normalization, & UI touchpoint specs.</p>
              </div>

              <div className="bg-purple-950/30 border border-purple-900/40 p-5 rounded-2xl">
                <div className="w-9 h-9 rounded-lg bg-purple-900/40 flex items-center justify-center text-purple-300 mb-3 font-mono text-xs font-bold">
                  04
                </div>
                <h4 className="font-bold text-white text-base mb-1">Perpetual License</h4>
                <p className="text-xs text-slate-400">100% worldwide commercial ownership rights with zero recurring royalty fees.</p>
              </div>
            </div>
          </div>

          {/* Scope Packages */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400 bg-purple-950/80 border border-purple-800/40 px-3.5 py-1 rounded-full">
                TAILORED SCOPE PACKAGES
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-3">
                Sonic Identity Engagement Suites
              </h3>
              <p className="text-sm text-slate-300">
                Choose the scope that matches your brand growth stage. All packages include full perpetual master rights.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {engagementPackages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all ${
                    pkg.popular
                      ? 'bg-gradient-to-b from-purple-950/90 to-[#120a22] border-2 border-purple-500 shadow-2xl shadow-purple-950/90 transform md:-translate-y-2'
                      : 'bg-[#0f0a1c]/70 border border-purple-900/40'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-purple-600 text-white font-mono text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-purple-400 shadow-lg">
                      Recommended
                    </div>
                  )}

                  <div>
                    <span className="text-xs font-mono text-purple-300 uppercase tracking-widest font-bold">
                      {pkg.tag}
                    </span>
                    <h4 className="text-2xl font-extrabold text-white mt-1">{pkg.name}</h4>
                    
                    <div className="my-4 inline-flex items-center gap-2 bg-purple-950/80 border border-purple-800/50 px-3 py-1 rounded-lg">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      <span className="text-xs font-mono text-purple-300 font-bold uppercase tracking-wider">{pkg.scopeLabel}</span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-6">
                      {pkg.description}
                    </p>

                    <div className="space-y-3 border-t border-purple-900/40 pt-5 mb-8">
                      {pkg.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                          <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('contact')}
                    className={`w-full py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all cursor-pointer ${
                      pkg.popular
                        ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/50'
                        : 'bg-purple-950/80 hover:bg-purple-900 border border-purple-800/50 text-purple-200 hover:text-white'
                    }`}
                  >
                    {pkg.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Call to action */}
          <div className="bg-gradient-to-r from-purple-950/80 via-purple-900/40 to-purple-950/80 border border-purple-500/40 rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center">
            <ShieldCheck className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Ready to sculpt your brand's unique sound?
            </h3>
            <p className="text-slate-300 text-sm max-w-xl mb-8 leading-relaxed">
              Schedule a 15-minute sonic discovery call with our Lead Audio Strategist and receive a complimentary sound audit for your brand.
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-3.5 rounded-full bg-white text-purple-950 font-extrabold text-xs uppercase tracking-wider hover:bg-purple-100 transition-colors shadow-2xl cursor-pointer"
            >
              Book Sonic Discovery Call
            </button>
          </div>

        </div>
      )}

    </section>
  );
};
