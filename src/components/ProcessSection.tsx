import React from 'react';
import { PROCESS_STEPS } from '../data/mockData';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-24 px-4 max-w-7xl mx-auto relative z-10 scroll-mt-20">
      
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono uppercase tracking-widest text-purple-400 bg-purple-950/60 border border-purple-800/40 px-3 py-1 rounded-full">
          HOW WE WORK
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-4 mb-4">
          The Sonic Identity Process
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Our four-stage composition framework bridges brand strategy with music production to create timeless sonic assets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PROCESS_STEPS.map((step) => (
          <div 
            key={step.step} 
            className="glass-panel rounded-2xl p-6 flex flex-col justify-between border border-purple-900/40 hover:border-purple-500/40 transition-all relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 font-mono font-extrabold text-4xl text-purple-600/10 group-hover:text-purple-600/20 transition-colors">
              {step.step}
            </div>

            <div>
              <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">
                STAGE {step.step}
              </span>
              <h3 className="text-xl font-bold text-white mt-1 mb-3">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed mb-6">
                {step.description}
              </p>
            </div>

            <div className="space-y-2 border-t border-purple-900/30 pt-4">
              {step.details.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-purple-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
