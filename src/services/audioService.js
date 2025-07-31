// src/services/audioService.js
class AudioService {
    constructor() {
      this.enabled = true;
      this.volume = 0.3;
      this.audioContext = null;
      this.sounds = {};
      
      // Initialize audio context on first user interaction
      this.initializeAudio();
    }
  
    initializeAudio() {
      // Create audio context when user first interacts
      document.addEventListener('click', this.createAudioContext.bind(this), { once: true });
      document.addEventListener('keydown', this.createAudioContext.bind(this), { once: true });
    }
  
    createAudioContext() {
      try {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      } catch (error) {
        console.warn('Web Audio API not supported:', error);
        this.enabled = false;
      }
    }
  
    // Generate retro-style click sound using Web Audio API
    generateClickSound() {
      if (!this.audioContext || !this.enabled) return null;
  
      const duration = 0.1;
      const sampleRate = this.audioContext.sampleRate;
      const length = sampleRate * duration;
      const buffer = this.audioContext.createBuffer(1, length, sampleRate);
      const data = buffer.getChannelData(0);
  
      // Generate 8-bit style click sound
      for (let i = 0; i < length; i++) {
        const t = i / sampleRate;
        // Combine square wave with decay envelope
        const frequency = 800 + (400 * Math.exp(-t * 10)); // Frequency sweep
        const envelope = Math.exp(-t * 15); // Quick decay
        const square = Math.sign(Math.sin(2 * Math.PI * frequency * t));
        data[i] = square * envelope * 0.3;
      }
  
      return buffer;
    }
  
    // Generate retro-style hover sound
    generateHoverSound() {
      if (!this.audioContext || !this.enabled) return null;
  
      const duration = 0.05;
      const sampleRate = this.audioContext.sampleRate;
      const length = sampleRate * duration;
      const buffer = this.audioContext.createBuffer(1, length, sampleRate);
      const data = buffer.getChannelData(0);
  
      // Generate subtle hover beep
      for (let i = 0; i < length; i++) {
        const t = i / sampleRate;
        const frequency = 1200;
        const envelope = Math.exp(-t * 20);
        const sine = Math.sin(2 * Math.PI * frequency * t);
        data[i] = sine * envelope * 0.1;
      }
  
      return buffer;
    }
  
    // Play sound from buffer
    playSound(buffer) {
      if (!this.audioContext || !buffer || !this.enabled) return;
  
      try {
        const source = this.audioContext.createBufferSource();
        const gainNode = this.audioContext.createGain();
        
        source.buffer = buffer;
        gainNode.gain.value = this.volume;
        
        source.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        source.start();
      } catch (error) {
        console.warn('Error playing sound:', error);
      }
    }
  
    // Preload sounds for better performance
    preloadSounds() {
      if (!this.audioContext || !this.enabled) return;
  
      this.sounds.click = this.generateClickSound();
      this.sounds.hover = this.generateHoverSound();
    }
  
    // Public methods
    playClick() {
      if (!this.sounds.click) {
        this.sounds.click = this.generateClickSound();
      }
      this.playSound(this.sounds.click);
    }
  
    playHover() {
      if (!this.sounds.hover) {
        this.sounds.hover = this.generateHoverSound();
      }
      this.playSound(this.sounds.hover);
    }
  
    // Settings
    setVolume(volume) {
      this.volume = Math.max(0, Math.min(1, volume));
    }
  
    setEnabled(enabled) {
      this.enabled = enabled;
    }
  
    isEnabled() {
      return this.enabled && this.audioContext;
    }
  }
  
  // Create singleton instance
  const audioService = new AudioService();
  
  // Preload sounds after a short delay
  setTimeout(() => {
    audioService.preloadSounds();
  }, 1000);
  
  export default audioService;