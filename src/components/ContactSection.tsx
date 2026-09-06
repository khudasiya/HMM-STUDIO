import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles, Clock, Calendar, Check, Layers } from 'lucide-react';
import { PageHeader } from './PageHeader';

interface ContactSectionProps {
  onNavigate?: (sectionId: string) => void;
  isStandalonePage?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  onNavigate, 
  isStandalonePage = false 
}) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(['logo-audio']);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    referenceUrl: ''
  });

  const availableServices = [
    { id: 'logo-audio', label: 'Sonic Logo' },
    { id: 'brand-anthem', label: 'Brand Anthem' },
    { id: 'podcast-audio', label: 'Podcast Suite' },
    { id: 'commercial-songs', label: 'Ad Score' },
    { id: 'jingles', label: 'Radio Jingle' },
    { id: 'extras', label: 'UI SFX' },
  ];

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedServices.length === availableServices.length) {
      setSelectedServices(['logo-audio']);
    } else {
      setSelectedServices(availableServices.map(s => s.id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className={`py-12 px-4 max-w-7xl mx-auto relative z-10 ${isStandalonePage ? '' : 'scroll-mt-20'}`}>
      
      {isStandalonePage && onNavigate && (
        <PageHeader
          title="Start Your Sonic Project"
          subtitle="Book a 15-minute discovery call with our Lead Audio Strategist or select your desired services below to submit your project request."
          category="Discovery & Booking"
          icon={Mail}
          currentSectionId="contact"
          onNavigate={onNavigate}
        />
      )}

      {!isStandalonePage && (
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400 bg-purple-950/60 border border-purple-800/40 px-3 py-1 rounded-full">
            START PROJECT
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-4 mb-4">
            Let's Sculpt Your Brand Sound
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Ready to give your brand an unforgettable audio identity? Select your services and tell us about your vision.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-7 bg-[#0f0a1c]/90 border border-purple-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-purple-600/30 border border-purple-400 flex items-center justify-center text-purple-300 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Project Request Received!</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you for reaching out. We have received your request for {selectedServices.length} selected service{selectedServices.length > 1 ? 's' : ''}. Our audio team will contact you within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-full bg-purple-950/80 border border-purple-800/50 text-purple-300 hover:text-white font-bold text-xs uppercase tracking-wider mt-4 cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Multi-Service Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-mono text-purple-300 uppercase tracking-widest font-bold">
                    SELECT DESIRED SERVICES (MULTIPLE ALLOWED)
                  </label>
                  <button
                    type="button"
                    onClick={handleSelectAll}
                    className="text-[10px] font-mono text-purple-400 hover:text-white uppercase font-bold underline cursor-pointer"
                  >
                    {selectedServices.length === availableServices.length ? 'Reset Selection' : 'Select All'}
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {availableServices.map((item) => {
                    const isSelected = selectedServices.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleService(item.id)}
                        className={`p-3.5 rounded-xl border text-xs font-mono uppercase tracking-wider text-left transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-purple-600/30 border-purple-400 text-white font-bold shadow-lg shadow-purple-950/60'
                            : 'bg-purple-950/30 border-purple-900/40 text-slate-400 hover:text-slate-200 hover:border-purple-600/40'
                        }`}
                      >
                        <span>{item.label}</span>
                        <div className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                          isSelected ? 'bg-purple-500 text-white' : 'border border-purple-900/60'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-2 text-[10px] font-mono text-purple-300/80 flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-purple-400" />
                  <span>Selected: {selectedServices.length} service{selectedServices.length > 1 ? 's' : ''}</span>
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full bg-purple-950/40 border border-purple-900/50 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full bg-purple-950/40 border border-purple-900/50 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">Company / Brand Name</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Acme Inc."
                  className="w-full bg-purple-950/40 border border-purple-900/50 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
                />
              </div>

              {/* Details */}
              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">Project Details & Vision *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your brand identity, target audience, timelines, and desired audio emotion..."
                  className="w-full bg-purple-950/40 border border-purple-900/50 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-purple-900/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Submit Project Request
              </button>
            </form>
          )}

        </div>

        {/* Right Column: Studio Info & Discovery */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          
          <div className="bg-[#0f0a1c]/80 border border-purple-900/40 rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" /> Book Direct Discovery Call
            </h3>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              Prefer to talk immediately? Schedule a discovery window with our Lead Audio Strategist to review your custom requirements.
            </p>

            <div className="space-y-2 border-t border-purple-900/40 pt-4">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="font-mono">Response Time:</span>
                <span className="text-purple-400 font-bold font-mono">Under 2 hours</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="font-mono">Direct Email:</span>
                <a href="mailto:om.hmmsounds@gmail.com" className="text-purple-300 hover:text-white font-bold font-mono transition-colors">om.hmmsounds@gmail.com</a>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-950/80 to-[#120a22] border border-purple-500/30 rounded-3xl p-6 text-center">
            <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-white mb-1">Need an urgent 48-hour turn?</h4>
            <p className="text-xs text-slate-300 mb-4">Priority broadcast deadlines are supported with dedicated SLA support.</p>
            <a
              href="mailto:om.hmmsounds@gmail.com"
              className="text-xs font-mono font-bold text-purple-300 hover:text-white underline uppercase tracking-wider"
            >
              Contact Urgent Desk
            </a>
          </div>

        </div>

      </div>

    </section>
  );
};
