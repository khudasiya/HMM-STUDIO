import React from 'react';
import { CLIENT_TESTIMONIALS } from '../data/mockData';
import { Quote, Sparkles, Award, Headphones, Waves } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const clientLogos = ['NEONPULSE', 'VERVE PAY', 'AURA LUXURY', 'VOLTA EV', 'FRESHBITE', 'KRYPTOS'];

  return (
    <section id="about" className="py-24 px-4 max-w-7xl mx-auto relative z-10 scroll-mt-20">
      
      {/* About Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400 bg-purple-950/60 border border-purple-800/40 px-3 py-1 rounded-full">
            ABOUT HMM STUDIO
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-4 mb-6 leading-tight">
            We Craft the Invisible Architecture of Brands
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            Hmm Studio is a boutique sonic branding agency based at the intersection of music production, cognitive neuroscience, and audio technology. We believe every iconic brand deserves a sound signature as distinct as its visual logo.
          </p>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-8">
            Whether engineering 2-second payment confirmation stingers or composing multi-movement orchestral anthems, our team fuses bespoke analog synthesis, live acoustic instruments, and spatial audio mastering to guarantee immediate emotional connection.
          </p>

          <div className="grid grid-cols-3 gap-4 border-t border-purple-900/40 pt-6">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">120+</p>
              <p className="text-xs text-purple-400 font-semibold mt-1">Sonic Logos Built</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">14</p>
              <p className="text-xs text-purple-400 font-semibold mt-1">Global Awards</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">45M+</p>
              <p className="text-xs text-purple-400 font-semibold mt-1">Daily Listeners</p>
            </div>
          </div>
        </div>

        {/* Feature Cards Graphic */}
        <div className="relative">
          <div className="absolute inset-0 bg-purple-600/20 rounded-3xl blur-3xl pointer-events-none"></div>
          <div className="glass-panel border border-purple-500/30 rounded-3xl p-8 relative space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center shrink-0">
                <Headphones className="w-6 h-6 text-purple-300" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Audio-First Architecture</h4>
                <p className="text-xs text-slate-300/80 mt-1 leading-relaxed">
                  We don't buy off-the-shelf stock loops. Every frequency, harmonic tone, and transient decay is custom synthesized for your brand.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 border-t border-purple-900/40 pt-6">
              <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center shrink-0">
                <Waves className="w-6 h-6 text-lavender-light" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Emotional Memory Tuning</h4>
                <p className="text-xs text-slate-300/80 mt-1 leading-relaxed">
                  Our compositions leverage psychoacoustic principles to trigger subconscious brand recall in less than 500 milliseconds.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 border-t border-purple-900/40 pt-6">
              <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Worldwide Royalty-Free License</h4>
                <p className="text-xs text-slate-300/80 mt-1 leading-relaxed">
                  Full commercial ownership, master stem packages, and audio brand guideline PDFs delivered with every project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Logos Wall */}
      <div className="mb-20">
        <p className="text-center text-xs font-mono uppercase tracking-widest text-purple-400/80 mb-8">
          TRUSTED BY VISIONARY BRANDS WORLDWIDE
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-75">
          {clientLogos.map((logo, idx) => (
            <span 
              key={idx} 
              className="text-base sm:text-xl font-extrabold tracking-widest text-slate-400 hover:text-purple-300 transition-colors font-mono"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>

      {/* Client Testimonials */}
      <div>
        <h3 className="text-2xl font-extrabold text-white text-center mb-10">
          Client Endorsements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CLIENT_TESTIMONIALS.map((t) => (
            <div key={t.id} className="glass-panel rounded-2xl p-6 border border-purple-900/40 flex flex-col justify-between">
              <div>
                <Quote className="w-8 h-8 text-purple-500/40 mb-3" />
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>
              <div className="border-t border-purple-900/40 pt-4">
                <p className="text-sm font-bold text-white">{t.clientName}</p>
                <p className="text-xs text-purple-400 font-mono">{t.clientRole}, <span className="text-slate-300">{t.company}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
