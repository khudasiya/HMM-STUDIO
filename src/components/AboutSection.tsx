import React from 'react';
import { User, Award, Music, Cpu, Sparkles, Heart, Headphones, CheckCircle2 } from 'lucide-react';
import { PageHeader } from './PageHeader';

interface AboutSectionProps {
  onNavigate?: (sectionId: string) => void;
  isStandalonePage?: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ 
  onNavigate, 
  isStandalonePage = false 
}) => {
  const teamMembers = [
    {
      name: 'Julian Vance',
      role: 'Creative Director & Founder',
      bio: 'Former Hans Zimmer apprentice & Dolby Atmos master engineer with 14+ years in sound design.',
      avatar: '/assets/card1.png'
    },
    {
      name: 'Elena Rostova',
      role: 'Head of Audio Strategy',
      bio: 'Cognitive acoustic researcher specializing in psychoacoustics & auditory memory retention.',
      avatar: '/assets/hero-waveform.png'
    },
    {
      name: 'Marcus Chen',
      role: 'Lead Sound Sculptor',
      bio: 'Modular synthesis specialist & UI sound designer for global fintech & hardware platforms.',
      avatar: '/assets/hero-anthem.png'
    }
  ];

  const gearStack = [
    'Neumann U87 Ai & Sennheiser MKH 416 Microphones',
    'Moog One & Prophet 6 Analog Synthesizers',
    'Universal Audio Apollo X16 Heritage Systems',
    'Barefoot Sound Footprint01 Studio Monitors',
    'Pro Tools Ultimate HDX & Ableton Live 12 Suite',
    'Dolby Atmos 7.1.4 Spatial Sound Architecture'
  ];

  return (
    <section id="about" className={`py-12 px-4 max-w-7xl mx-auto relative z-10 ${isStandalonePage ? '' : 'scroll-mt-20'}`}>
      
      {isStandalonePage && onNavigate && (
        <PageHeader
          title="About Hmm Studio"
          subtitle="We are a boutique sonic branding agency and sound design studio crafting acoustic identities for visionary brands, tech products, & creators worldwide."
          category="Our Team & Studio"
          icon={User}
          currentSectionId="about"
          onNavigate={onNavigate}
        />
      )}

      {!isStandalonePage && (
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400 bg-purple-950/60 border border-purple-800/40 px-3 py-1 rounded-full">
            ABOUT STUDIO
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-4 mb-4">
            Architects of Audio Identity
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            We bridge psychoacoustics, cinematic composition, and modern sound design to create distinct auditory DNA for world-class brands.
          </p>
        </div>
      )}

      {/* Studio Impact Stats Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <div className="bg-[#0f0a1c]/80 border border-purple-900/40 rounded-2xl p-6 text-center">
          <span className="text-3xl sm:text-4xl font-extrabold text-purple-400 font-mono">500+</span>
          <p className="text-xs text-slate-300 font-mono uppercase tracking-wider mt-1">Sonic Logos Crafted</p>
        </div>

        <div className="bg-[#0f0a1c]/80 border border-purple-900/40 rounded-2xl p-6 text-center">
          <span className="text-3xl sm:text-4xl font-extrabold text-purple-400 font-mono">98%</span>
          <p className="text-xs text-slate-300 font-mono uppercase tracking-wider mt-1">Brand Recall Rate</p>
        </div>

        <div className="bg-[#0f0a1c]/80 border border-purple-900/40 rounded-2xl p-6 text-center">
          <span className="text-3xl sm:text-4xl font-extrabold text-purple-400 font-mono">45</span>
          <p className="text-xs text-slate-300 font-mono uppercase tracking-wider mt-1">Global Audio Awards</p>
        </div>

        <div className="bg-[#0f0a1c]/80 border border-purple-900/40 rounded-2xl p-6 text-center">
          <span className="text-3xl sm:text-4xl font-extrabold text-purple-400 font-mono">100%</span>
          <p className="text-xs text-slate-300 font-mono uppercase tracking-wider mt-1">Royalty Free Rights</p>
        </div>
      </div>

      {/* Team Showcase */}
      <div className="mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
            CREATIVE LEADERSHIP
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Meet Our Audio Designers & Composers
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-[#0f0a1c]/80 border border-purple-900/40 rounded-2xl p-6 flex flex-col justify-between hover:border-purple-500/50 transition-all"
            >
              <div>
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-500/40 mb-4 bg-purple-950">
                  <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-lg font-bold text-white">{member.name}</h4>
                <span className="text-xs font-mono text-purple-400 font-semibold">{member.role}</span>
                <p className="text-xs text-slate-300/80 leading-relaxed mt-3">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Standalone Tech Stack & Studio Gear */}
      {isStandalonePage && (
        <div className="space-y-12 border-t border-purple-900/40 pt-16">
          
          <div className="bg-[#0f0a1c]/90 border border-purple-500/30 rounded-3xl p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <Cpu className="w-6 h-6 text-purple-400" />
              <h3 className="text-2xl font-extrabold text-white">Our Acoustic & Software Hardware Stack</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gearStack.map((gear, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-purple-950/30 border border-purple-900/40 rounded-xl text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>{gear}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          {onNavigate && (
            <div className="bg-gradient-to-r from-purple-950/60 to-[#120b22] border border-purple-900/60 rounded-3xl p-8 text-center flex flex-col items-center">
              <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Want to collaborate with our studio team?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mb-6">
                Let's discuss how we can build a world-class sonic identity for your brand.
              </p>
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg cursor-pointer"
              >
                Contact Studio Team
              </button>
            </div>
          )}

        </div>
      )}

    </section>
  );
};
