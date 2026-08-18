import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'logo_audio',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#8b5cf6', '#c084fc', '#e9d5ff']
      });
    } catch (err) {}
  };

  return (
    <section id="contact" className="py-24 px-4 max-w-7xl mx-auto relative z-10 scroll-mt-20">
      
      <div className="bg-gradient-to-br from-[#120b24] via-[#0d0918] to-[#08060e] border border-purple-800/40 rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
          
          {/* Left Column: Direct Info & Brand Statement */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-300 bg-purple-950/80 border border-purple-500/30 px-3.5 py-1 rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" /> START A PROJECT
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Let's Define Your Brand's Sound
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Ready to create an unforgettable sonic logo, master anthem, or audio campaign? Reach out to our composition team to discuss your project timeline and vision.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 text-slate-200">
                <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-purple-400 font-mono">DIRECT INQUIRIES</p>
                  <p className="text-sm font-bold text-white">hello@hmmstudio.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-slate-200">
                <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-purple-400 font-mono">STUDIO PHONE</p>
                  <p className="text-sm font-bold text-white">+1 (800) 466-7883</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-slate-200">
                <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-purple-400 font-mono">HEADQUARTERS</p>
                  <p className="text-sm font-bold text-white">Los Angeles • London • Tokyo</p>
                </div>
              </div>
            </div>

            {/* Required Reinforcing Brand Statement */}
            <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/30 text-xs text-purple-200 leading-relaxed font-mono">
              <p className="flex items-center gap-2 font-bold mb-1 text-white">
                <Volume2 className="w-4 h-4 text-purple-400" />
                Hmm Studio Audio Identity Agency
              </p>
              Hmm Studio is a Sonic & Audio Identity Agency, and this is where visitors take the next step to start a project.
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div>
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-purple-950/30 border border-purple-500/40 rounded-2xl">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-4 animate-bounce" />
                <h3 className="text-2xl font-bold text-white mb-2">Inquiry Received!</h3>
                <p className="text-slate-300 text-xs sm:text-sm max-w-sm mb-6">
                  Thank you for contacting Hmm Studio. One of our lead audio directors will review your brief and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-purple-600 text-white font-bold text-xs"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Mercer"
                    className="w-full bg-[#08060e] border border-purple-900/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-400 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full bg-[#08060e] border border-purple-900/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider mb-1.5">
                      Company / Brand
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Acme Corp"
                      className="w-full bg-[#08060e] border border-purple-900/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider mb-1.5">
                    Project Type *
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-[#08060e] border border-purple-900/50 rounded-xl px-4 py-3 text-sm text-purple-200 focus:outline-none focus:border-purple-400 transition-colors"
                  >
                    <option value="logo_audio">Sonic Logo (2-5s Audio Mark)</option>
                    <option value="brand_anthem">Brand Anthem (Master Score)</option>
                    <option value="podcast_audio">Podcast Audio & Theme Music</option>
                    <option value="commercial_song">Commercial Song & Ad Campaign</option>
                    <option value="jingle">Short-Form Jingle</option>
                    <option value="extras">Video Sound Design / Extras</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider mb-1.5">
                    Project Details & Vision *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your brand goals, target audio feeling, and expected deadline..."
                    className="w-full bg-[#08060e] border border-purple-900/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-400 transition-colors"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.8)] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Project Brief</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>

    </section>
  );
};
