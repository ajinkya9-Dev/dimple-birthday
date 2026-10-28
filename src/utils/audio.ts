/**
 * Elegant Web Audio API synthesizer for romantic ambient soundscapes
 * and gentle interactive chimes. Requires zero external audio downloads,
 * cannot 404, never autoplays, and supports custom audio track URLs or files.
 */

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlayingAmbient = false;
  private ambientInterval: number | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private isMuted = false;
  private volume = 0.5;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setCustomAudioUrl(url: string | null) {
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio = null;
    }
    if (url) {
      this.customAudio = new Audio(url);
      this.customAudio.loop = true;
      this.customAudio.volume = this.isMuted ? 0 : this.volume;
      if (this.isPlayingAmbient) {
        this.customAudio.play().catch(() => {});
      }
    }
  }

  public toggleAmbientMusic(startPlaying?: boolean): boolean {
    const shouldPlay = startPlaying !== undefined ? startPlaying : !this.isPlayingAmbient;
    
    if (!shouldPlay) {
      this.stopAmbient();
      return false;
    }

    this.isPlayingAmbient = true;

    if (this.customAudio) {
      this.customAudio.currentTime = 0;
      this.customAudio.play().catch(() => {});
      return true;
    }

    this.initContext();
    this.startAmbientGenerative();
    return true;
  }

  public stopAmbient() {
    this.isPlayingAmbient = false;
    if (this.ambientInterval) {
      window.clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.customAudio) {
      this.customAudio.muted = this.isMuted;
    }
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isPlayingAmbient;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // Soft romantic celesta note synthesis
  public playSoftChime() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const freqs = [587.33, 783.99, 880.0, 1174.66]; // D5, G5, A5, D6
      
      freqs.forEach((freq, index) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.08);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1600, now);

        gain.gain.setValueAtTime(0.0001, now + index * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.08 * this.volume, now + index * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.00001, now + index * 0.08 + 1.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + index * 0.08);
        osc.stop(now + index * 0.08 + 1.25);
      });
    } catch {
      // AudioContext policy fallback gracefully
    }
  }

  // Generative relaxing piano & celestial pad arpeggiator in key of F / D minor
  private startAmbientGenerative() {
    if (this.ambientInterval) {
      window.clearInterval(this.ambientInterval);
    }

    // Peaceful chords: Fmaj7 -> Cmaj7 -> Dm9 -> Bbmaj7
    const chordProgressions = [
      [174.61, 261.63, 329.63, 349.23, 440.0], // F3, C4, E4, F4, A4
      [130.81, 246.94, 261.63, 329.63, 392.0], // C3, B3, C4, E4, G4
      [146.83, 220.00, 261.63, 329.63, 349.23], // D3, A3, C4, E4, F4
      [116.54, 233.08, 293.66, 349.23, 440.0]  // Bb2, Bb3, D4, F4, A4
    ];

    let chordIndex = 0;

    const playChordStep = () => {
      if (!this.isPlayingAmbient || this.isMuted || !this.ctx) return;
      const now = this.ctx.currentTime;
      const chord = chordProgressions[chordIndex % chordProgressions.length];
      chordIndex++;

      // Play gentle warm pad
      chord.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.18);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(900, now);

        const noteGain = i === 0 ? 0.07 : 0.035;
        gain.gain.setValueAtTime(0.0001, now + i * 0.18);
        gain.gain.linearRampToValueAtTime(noteGain * this.volume, now + i * 0.18 + 0.6);
        gain.gain.exponentialRampToValueAtTime(0.00001, now + i * 0.18 + 4.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.18);
        osc.stop(now + i * 0.18 + 4.5);
      });
    };

    // Initial note
    playChordStep();
    // Loop every 3.8 seconds for smooth organic drift
    this.ambientInterval = window.setInterval(playChordStep, 3800);
  }
}

export const audioEngine = new RomanticAudioEngine();
