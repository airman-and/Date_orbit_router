// Web Audio Synthesizer SFX Utility for Date Orbit Router Kiosk
let audioCtx = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
};

export const playSFX = (type) => {
  try {
    initAudio();
    if (!audioCtx) return;

    // Resume context if suspended (browser safety)
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'click') {
      // Short, pleasant high-tech synth click sound
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);
      
      gainNode.gain.setValueAtTime(0.06, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'roll') {
      // Cosmic synthesiser frequency sweep (whoosh/roll sound)
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(250, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.95);
      
      gainNode.gain.setValueAtTime(0.01, now);
      gainNode.gain.linearRampToValueAtTime(0.1, now + 0.2);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.95);
      
      osc.start(now);
      osc.stop(now + 0.95);
    } else if (type === 'success') {
      // Celestial couple chemistry C-E major third chord harmony
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.45);
      
      gainNode.gain.setValueAtTime(0.04, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      
      osc.start(now);
      osc.stop(now + 0.45);

      // Play major third harmonic oscillator
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, now); // E5
      osc2.frequency.exponentialRampToValueAtTime(1318.5, now + 0.5);
      
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      gain2.gain.setValueAtTime(0.03, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      
      osc2.start(now);
      osc2.stop(now + 0.5);
    }
  } catch (e) {
    console.warn("SFX failed to play due to browser user-gesture restrictions:", e);
  }
};
