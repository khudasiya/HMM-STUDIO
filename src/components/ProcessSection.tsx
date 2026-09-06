import React, { useState } from 'react';
import { Compass, Search, Sliders, Music2, CheckCircle2, ChevronDown, Sparkles, FileText, Download } from 'lucide-react';
import { PageHeader } from './PageHeader';

interface ProcessSectionProps {
  onNavigate?: (sectionId: string) => void;
  isStandalonePage?: boolean;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ 
  onNavigate, 
  isStandalonePage = false 
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const steps = [
    {
      num: '01',
      title: 'Sonic Audit & Discovery',
      icon: Search,
      subtitle: 'Analyzing your brand frequency',
      description: 'We analyze your brand guidelines, audience touchpoints, market competitors, and acoustic environments to craft a precise sonic blueprint.',
      deliverable: 'Sonic Identity Strategy Brief PDF'
    },
    {
      num: '02',
      title: 'Audio Moodboards',
      icon: Sliders,
      subtitle: 'Exploring timbre & emotion',
      description: 'We present 3 distinct acoustic directions exploring synth textures, organic instrumentation, rhythm structures, and harmonic colors.',
      deliverable: 'Interactive Soundboard & Key Concept Selects'
    },
    {
      num: '03',
      title: 'Sonic Sculpting',
      icon: Music2,
      subtitle: 'Composition & stem mastering',
      description: 'Our lead composers sculpt the selected sound concept into mastered sonic logos, full brand anthems, and UI audio stingers.',
      deliverable: 'Mastered 24-bit 96kHz WAV Files & Stem Mixes'
    },
    {
      num: '04',
      title: 'Master Delivery & Guidelines',
      icon: CheckCircle2,
      subtitle: 'Deploying across platforms',
      description: 'We deliver uncompressed audio masters, stem separations, vector audio guidelines, & platform-specific normalized files.',
      deliverable: 'Complete Sonic Identity Brand Book & Licenses'
    }
  ];

  const faqs = [
    {
      q: 'How long does a complete sonic identity project take?',
      a: 'A standard Sonic Mark package takes 5 to 7 business days. A full Sonic Identity Suite (logo, anthem, podcast package, and guidelines) typically takes 14 to 21 business days.'
    },
    {
      q: 'Do we own 100% of the copyright for our sonic logo?',
      a: 'Yes. Upon final delivery and payment, full perpetual worldwide commercial ownership rights are transferred to your company with zero recurring royalties.'
    },
    {
      q: 'What file formats and specs do you deliver?',
      a: 'We deliver 24-bit 96kHz uncompressed WAV, 320kbps MP3, FLAC, isolated stem files (drums, bass, lead, FX), and normalized audio clips formatted specifically for iOS, Android, Web, and Broadcast.'
    },
    {
      q: 'Can you match our existing visual brand guidelines?',
      a: 'Absolutely. We translate visual attributes (e.g. minimalist, bold, futuristic, warm acoustic) directly into acoustic parameters like pitch, timbre, attack velocity, and harmonic decay.'
    }
  ];

  return (
    <section id="process" className={`py-12 px-4 max-w-7xl mx-auto relative z-10 ${isStandalonePage ? '' : 'scroll-mt-20'}`}>
      
      {isStandalonePage && onNavigate && (
        <PageHeader
          title="Our 4-Step Sonic Creation Process"
          subtitle="A battle-tested acoustic design framework that takes your brand from initial audio discovery to a fully mastered, multi-platform sonic identity suite."
          category="Framework & Workflow"
          icon={Compass}
          currentSectionId="process"
          onNavigate={onNavigate}
        />
      )}

      {!isStandalonePage && (
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400 bg-purple-950/60 border border-purple-800/40 px-3 py-1 rounded-full">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-4 mb-4">
            Our Sonic Creation Framework
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            From initial acoustic audit to master delivery — our structured 4-step workflow ensures brand alignment at every harmonic layer.
          </p>
        </div>
      )}

      {/* 4 Steps Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {steps.map((step) => {
          const StepIcon = step.icon;
          return (
            <div
              key={step.num}
              className="bg-[#0f0a1c]/80 border border-purple-900/40 rounded-2xl p-6 flex flex-col justify-between hover:border-purple-500/50 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-2xl font-black font-mono text-purple-500/50 group-hover:text-purple-400 transition-colors">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                    <StepIcon className="w-5 h-5" />
                  </div>
                </div>

                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold">
                  {step.subtitle}
                </span>
                <h3 className="text-lg font-bold text-white mt-1 mb-3 group-hover:text-purple-200 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-300/80 leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              <div className="border-t border-purple-900/30 pt-3">
                <span className="text-[10px] font-mono text-purple-300 flex items-center gap-1 font-semibold">
                  <FileText className="w-3 h-3 text-purple-400 shrink-0" />
                  <span className="truncate">{step.deliverable}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Standalone FAQ Accordion */}
      {isStandalonePage && (
        <div className="space-y-12 border-t border-purple-900/40 pt-16">
          
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Everything You Need To Know About Working With Us
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#0f0a1c]/80 border border-purple-900/40 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-white text-sm sm:text-base hover:text-purple-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-purple-400 shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-purple-900/30">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          {onNavigate && (
            <div className="bg-gradient-to-r from-purple-950/60 to-[#120b22] border border-purple-900/60 rounded-3xl p-8 text-center flex flex-col items-center">
              <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Have questions about your project scope?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mb-6">
                Talk directly with our lead sound architect and get immediate answers on timeline and project scope.
              </p>
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg cursor-pointer"
              >
                Start Discovery Process
              </button>
            </div>
          )}

        </div>
      )}

    </section>
  );
};
