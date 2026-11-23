/**
 * Royalty-free romantic wedding melody & sound effects using Web Audio API + Audio elements
 */

class RoyalAudioController {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.musicInterval = null;
    this.notes = [
      // Raag Yaman / Romantic scale: C4, D4, E4, F#4, G4, A4, B4, C5, D5, E5
      261.63, 293.66, 329.63, 369.99, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25
    ];
    this.bgAudio = null;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  /**
   * Plays a luxurious royal chime / chime glockenspiel when the seal is broken
   */
  playRoyalSealSound() {
    try {
      this.init();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const pitches = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6

      pitches.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.001, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.18, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.9);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 1.0);
      });
    } catch (e) {
      console.warn("Chime sound error:", e);
    }
  }

  /**
   * Plays a gentle scratching sound effect
   */
  playScratchSound() {
    try {
      this.init();
      if (!this.audioCtx) return;

      const bufferSize = this.audioCtx.sampleRate * 0.04;
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1800;

      const gain = this.audioCtx.createGain();
      gain.gain.setValueAtTime(0.03, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.04);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      noise.start();
    } catch {}
  }

  /**
   * Plays ambient sitar/harp romantic wedding melody loop
   */
  startBackgroundMelody() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Melody sequence: Yaman / Kalyani romantic wedding theme
    const melody = [
      { note: 2, dur: 0.6 },
      { note: 3, dur: 0.6 },
      { note: 4, dur: 1.2 },
      { note: 5, dur: 0.6 },
      { note: 6, dur: 0.6 },
      { note: 7, dur: 1.5 },
      { note: 6, dur: 0.6 },
      { note: 5, dur: 0.6 },
      { note: 4, dur: 0.6 },
      { note: 3, dur: 0.8 },
      { note: 2, dur: 1.4 },
      { note: 1, dur: 0.8 },
      { note: 0, dur: 2.0 },
    ];

    let step = 0;

    const playStep = () => {
      if (!this.isPlaying || this.isMuted) return;
      if (!this.audioCtx) return;

      const item = melody[step % melody.length];
      const freq = this.notes[item.note % this.notes.length];
      const now = this.audioCtx.currentTime;

      // Primary tone (warm flute/plucked acoustic harp)
      const osc = this.audioCtx.createOscillator();
      const oscHarmonic = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      oscHarmonic.type = 'triangle';
      oscHarmonic.frequency.setValueAtTime(freq * 2, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + item.dur * 1.5);

      osc.connect(gain);
      oscHarmonic.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      oscHarmonic.start(now);
      osc.stop(now + item.dur * 1.6);
      oscHarmonic.stop(now + item.dur * 1.6);

      step++;
      const nextDelay = item.dur * 1000 * 0.95;
      this.musicInterval = setTimeout(playStep, nextDelay);
    };

    playStep();
  }

  stopBackgroundMelody() {
    this.isPlaying = false;
    if (this.musicInterval) {
      clearTimeout(this.musicInterval);
      this.musicInterval = null;
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.stopBackgroundMelody();
      return false;
    } else {
      this.startBackgroundMelody();
      return true;
    }
  }
}

export const royalAudio = new RoyalAudioController();
