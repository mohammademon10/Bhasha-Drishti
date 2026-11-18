// Bulletproof Multi-Tier Bengali & English Speech Synthesizer Engine

export class UniversalSpeechEngine {
  private static currentAudio: HTMLAudioElement | null = null;
  private static audioCtx: AudioContext | null = null;

  /**
   * Plays speech using the highest available quality engine:
   * 1. High-fidelity Native Bengali Web Stream (Google TTS tw-ob)
   * 2. Browser Web Speech API (window.speechSynthesis)
   * 3. Web Audio API Acoustic Speech Melody Fallback
   */
  public static async speak(
    text: string,
    lang: 'bn' | 'en' = 'bn',
    onStart?: () => void,
    onEnd?: () => void
  ): Promise<void> {
    this.stop();
    onStart?.();

    const cleanText = text.trim();
    if (!cleanText) {
      onEnd?.();
      return;
    }

    const ttsLang = lang === 'bn' ? 'bn' : 'en';

    // Tier 1: Try Online High-Fidelity Human TTS stream
    try {
      const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanText)}&tl=${ttsLang}&client=tw-ob`;
      const audio = new Audio();
      audio.src = audioUrl;
      audio.crossOrigin = 'anonymous';
      this.currentAudio = audio;

      let hasPlayed = false;

      const playPromise = new Promise<boolean>((resolve) => {
        const timeout = setTimeout(() => {
          if (!hasPlayed) {
            resolve(false);
          }
        }, 1500); // 1.5s timeout then fallback

        audio.onplay = () => {
          hasPlayed = true;
          clearTimeout(timeout);
        };

        audio.onended = () => {
          this.currentAudio = null;
          onEnd?.();
          resolve(true);
        };

        audio.onerror = () => {
          clearTimeout(timeout);
          resolve(false);
        };

        audio.play().catch(() => {
          clearTimeout(timeout);
          resolve(false);
        });
      });

      const success = await playPromise;
      if (success) {
        return;
      }
    } catch (e) {
      console.warn('Tier 1 Online TTS unavailable, falling back to Web Speech API', e);
    }

    // Tier 2: Web Speech API Fallback
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        window.speechSynthesis.resume();

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = lang === 'bn' ? 'bn-BD' : 'en-US';
        utterance.rate = 0.95;
        utterance.pitch = 1.0;

        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          const matchedVoice = voices.find(v => 
            v.lang.toLowerCase().includes(lang === 'bn' ? 'bn' : 'en') ||
            v.name.toLowerCase().includes(lang === 'bn' ? 'bengali' : 'english') ||
            v.name.toLowerCase().includes(lang === 'bn' ? 'bangla' : 'us')
          );
          if (matchedVoice) {
            utterance.voice = matchedVoice;
          } else if (voices[0]) {
            utterance.voice = voices[0];
          }
        }

        utterance.onend = () => {
          onEnd?.();
        };

        utterance.onerror = (err) => {
          console.warn('SpeechSynthesis error, triggering acoustic chime', err);
          this.playAcousticChime(onEnd);
        };

        window.speechSynthesis.speak(utterance);
        return;
      } catch (e) {
        console.warn('SpeechSynthesis invocation failed:', e);
      }
    }

    // Tier 3: Web Audio API Acoustic Speech Tone Chime
    this.playAcousticChime(onEnd);
  }

  public static stop(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
  }

  /**
   * Generates melodic acoustic voice feedback so the user always has clear audible confirmation
   */
  private static playAcousticChime(onEnd?: () => void): void {
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) {
        onEnd?.();
        return;
      }

      if (!this.audioCtx) {
        this.audioCtx = new AudioCtxClass();
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const ctx = this.audioCtx;
      const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
      const startTime = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime + idx * 0.12);

        gain.gain.setValueAtTime(0.15, startTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + (idx + 1) * 0.12);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime + idx * 0.12);
        osc.stop(startTime + (idx + 1) * 0.12);
      });

      setTimeout(() => {
        onEnd?.();
      }, notes.length * 120 + 200);
    } catch (e) {
      console.warn('Web Audio fallback error:', e);
      onEnd?.();
    }
  }
}
