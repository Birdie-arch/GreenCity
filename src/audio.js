// Cozy Web Audio Synthesizer for GreenCity
// Provides tactile, gentle sounds matching a cozy Japanese miniature diorama game

class SoundSystem {
  constructor() {
    this.ctx = null;
    this.sfxEnabled = true;
    this.musicEnabled = false;
    this.musicTimer = null;
    this.musicStep = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft wooden bubble pop for button clicks
  playPop() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(780, now + 0.06);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  // Gentle wooden clack when selecting cards
  playSelect(pitchModifier = 1) {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'triangle';
    const baseFreq = 523.25 * pitchModifier; // C5
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.25, now + 0.09);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  // Friendly soft thud for invalid action / over budget
  playWarning() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.15);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
  }

  // Sparkling environmental restoration chord (chime)
  playChime() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime + i * 0.07;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    });
  }

  // Bright cheerful double-tone pop for successful item merges
  playMerge(tier = 2) {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const baseFreq = 420 + Math.min(tier, 4) * 110;
    const now = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(baseFreq, now);
    osc1.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.08);
    gain1.gain.setValueAtTime(0.18, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.12);

    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(baseFreq * 2, now + 0.05);
    gain2.gain.setValueAtTime(0.12, now + 0.05);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(now + 0.05);
    osc2.stop(now + 0.22);
  }

  // Triumphant cozy fanfare for victory results
  playVictory() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const melody = [
      { f: 523.25, d: 0.12, t: 0.0 },   // C5
      { f: 659.25, d: 0.12, t: 0.12 },  // E5
      { f: 783.99, d: 0.15, t: 0.24 },  // G5
      { f: 1046.5, d: 0.35, t: 0.38 },  // C6
      { f: 987.77, d: 0.12, t: 0.72 },  // B5
      { f: 1046.5, d: 0.60, t: 0.86 },  // C6
    ];

    melody.forEach(note => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime + note.t;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, now);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + note.d);
    });
  }

  // Alias for victory fanfare
  playFanfare() {
    this.playVictory();
  }

  // Cute nostalgic double tram bell ding-ding for Downtown
  playTramBell() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    [0, 0.16].forEach(delay => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime + delay;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1318.51, now); // E6
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    });
  }

  // Crystalline breeze chime for Industrial clean tech & wind
  playWindChime() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    [1760, 2093, 2637].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime + idx * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.6);
    });
  }

  // Sweet morning birdsong chirp for Residential nature
  playBirdChirp() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(2200, now);
    osc.frequency.linearRampToValueAtTime(3200, now + 0.05);
    osc.frequency.linearRampToValueAtTime(2600, now + 0.12);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  // Soft clear water droplet ripple for Riverside canal
  playWaterSplash() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.14);
  }

  // Play district thematic cue
  playDistrictCue(districtId) {
    if (districtId === 'downtown') this.playTramBell();
    else if (districtId === 'industrial') this.playWindChime();
    else if (districtId === 'residential') this.playBirdChirp();
    else this.playWaterSplash();
  }

  // Generative peaceful pentatonic ambient chords (toggled on/off)
  toggleMusic(forceState) {
    if (typeof forceState === 'boolean') {
      this.musicEnabled = forceState;
    } else {
      this.musicEnabled = !this.musicEnabled;
    }

    if (this.musicEnabled) {
      this.init();
      this.startAmbientMusic();
    } else {
      this.stopAmbientMusic();
    }
    return this.musicEnabled;
  }

  startAmbientMusic() {
    if (this.musicTimer) return;
    const chords = [
      [261.63, 329.63, 392.00, 523.25], // C major (C, E, G, C)
      [220.00, 261.63, 329.63, 440.00], // A minor (A, C, E, A)
      [349.23, 440.00, 523.25, 698.46], // F major (F, A, C, F)
      [196.00, 246.94, 293.66, 392.00]  // G major (G, B, D, G)
    ];

    const playChord = () => {
      if (!this.musicEnabled || !this.ctx) return;
      const chord = chords[this.musicStep % chords.length];
      this.musicStep++;

      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime + idx * 0.08;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // Very soft, relaxing pad
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.03, now + 0.8);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 3.4);
      });
    };

    playChord();
    this.musicTimer = setInterval(playChord, 3600);
  }

  stopAmbientMusic() {
    if (this.musicTimer) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
  }
}

export const sound = new SoundSystem();
