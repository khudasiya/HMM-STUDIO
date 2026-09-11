// Web Audio API Synthesizer for instant sonic brand demonstrations
// Works seamlessly in all modern browsers without external audio assets

class SonicSynthesizer {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext {
    if (!this.ctx || this.ctx.state === 'closed') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Generic tone generator with envelope
  private playTone(freq: number, startTime: number, duration: number, type: OscillatorType = 'sine', gainVal = 0.25) {
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.exponentialRampToValueAtTime(gainVal, startTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  // 1. Netflix "Tudum" recreation (Deep bass strike + resonant cello chord)
  playNetflixTudum() {
    const ctx = this.getContext();
    const now = ctx.currentTime;

    // Deep sub boom
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(65, now);
    subOsc.frequency.exponentialRampToValueAtTime(35, now + 0.9);
    subGain.gain.setValueAtTime(0.6, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 1.2);

    // Second dramatic strike (the 'DUM')
    const hitTime = now + 0.18;
    [130.81, 164.81, 196.00, 261.63].forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = i % 2 === 0 ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(f, hitTime);
      gain.gain.setValueAtTime(0.2, hitTime);
      gain.gain.exponentialRampToValueAtTime(0.001, hitTime + 1.6);

      // Add low-pass filter for warmth
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, hitTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(hitTime);
      osc.stop(hitTime + 1.6);
    });
  }

  // 2. Intel 5-Note Iconic Chime (D-flat, D-flat, G-flat, D-flat, A-flat)
  playIntelChime() {
    const ctx = this.getContext();
    const now = ctx.currentTime;
    const notes = [
      { freq: 554.37, time: 0, dur: 0.22 },
      { freq: 554.37, time: 0.24, dur: 0.22 },
      { freq: 739.99, time: 0.48, dur: 0.22 },
      { freq: 554.37, time: 0.72, dur: 0.22 },
      { freq: 830.61, time: 0.96, dur: 0.65 },
    ];

    notes.forEach(n => {
      this.playTone(n.freq, now + n.time, n.dur, 'sine', 0.3);
      this.playTone(n.freq * 2, now + n.time, n.dur * 0.7, 'sine', 0.1);
    });
  }

  // 3. Airtel 4-Note Iconic Jingle Melody (A.R. Rahman signature)
  playAirtelJingle() {
    const ctx = this.getContext();
    const now = ctx.currentTime;
    const notes = [
      { freq: 659.25, time: 0.0, dur: 0.3 },
      { freq: 830.61, time: 0.28, dur: 0.3 },
      { freq: 987.77, time: 0.56, dur: 0.35 },
      { freq: 1108.73, time: 0.90, dur: 0.8 },
    ];

    notes.forEach(n => {
      this.playTone(n.freq, now + n.time, n.dur, 'triangle', 0.35);
      this.playTone(n.freq / 2, now + n.time, n.dur, 'sine', 0.2);
    });
  }

  // 4. Titan "Lapish" / Mozart Theme (Flute/String acoustic flourish)
  playTitanTheme() {
    const ctx = this.getContext();
    const now = ctx.currentTime;
    const notes = [
      { freq: 523.25, time: 0.0, dur: 0.2 },
      { freq: 659.25, time: 0.18, dur: 0.2 },
      { freq: 783.99, time: 0.36, dur: 0.25 },
      { freq: 1046.50, time: 0.58, dur: 0.7 },
    ];

    notes.forEach(n => {
      this.playTone(n.freq, now + n.time, n.dur, 'sine', 0.3);
      this.playTone(n.freq * 1.5, now + n.time, n.dur * 0.5, 'sine', 0.08);
    });
  }

  // 5. Amul "Utterly Butterly" Jingle Chime
  playAmulJingle() {
    const ctx = this.getContext();
    const now = ctx.currentTime;
    const notes = [
      { freq: 440.00, time: 0.0, dur: 0.18 },
      { freq: 554.37, time: 0.18, dur: 0.18 },
      { freq: 659.25, time: 0.36, dur: 0.18 },
      { freq: 880.00, time: 0.54, dur: 0.5 },
    ];

    notes.forEach(n => {
      this.playTone(n.freq, now + n.time, n.dur, 'sine', 0.32);
      this.playTone(n.freq * 2, now + n.time, n.dur * 0.4, 'triangle', 0.12);
    });
  }

  // 6. MDH "Asli Masale" 3-Word Motif
  playMdhJingle() {
    const ctx = this.getContext();
    const now = ctx.currentTime;
    const notes = [
      { freq: 587.33, time: 0.0, dur: 0.22 },
      { freq: 659.25, time: 0.24, dur: 0.22 },
      { freq: 880.00, time: 0.48, dur: 0.6 },
    ];

    notes.forEach(n => {
      this.playTone(n.freq, now + n.time, n.dur, 'sawtooth', 0.18);
      this.playTone(n.freq / 2, now + n.time, n.dur, 'sine', 0.25);
    });
  }

  // 7. Hmm Studio Hero Signature Chime
  playHmmSignature() {
    const ctx = this.getContext();
    const now = ctx.currentTime;
    const notes = [
      { freq: 440.00, time: 0.0, dur: 0.3 },
      { freq: 554.37, time: 0.15, dur: 0.35 },
      { freq: 659.25, time: 0.3, dur: 0.4 },
      { freq: 880.00, time: 0.45, dur: 0.8 },
      { freq: 1108.73, time: 0.6, dur: 1.1 },
    ];

    notes.forEach(n => {
      this.playTone(n.freq, now + n.time, n.dur, 'sine', 0.28);
    });
  }
}

export const sonicFx = new SonicSynthesizer();
