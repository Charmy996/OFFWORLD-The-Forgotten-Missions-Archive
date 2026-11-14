import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Radio, Sparkles } from 'lucide-react';

interface AmbientAudioProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const AmbientAudio: React.FC<AmbientAudioProps> = ({ isPlaying, onToggle }) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const droneOscRef = useRef<OscillatorNode | null>(null);

  // Initialize Web Audio API Synthesizer (Atmospheric Martian Wind & Sub-bass Drone)
  useEffect(() => {
    if (isPlaying) {
      if (!audioCtxRef.current) {
        const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtxClass();
        audioCtxRef.current = ctx;

        // Master Gain
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.12, ctx.currentTime);
        masterGain.connect(ctx.destination);
        masterGainRef.current = masterGain;

        // 1. Procedural Martian Wind (Pink Noise + Low-pass resonant filter)
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          output[i] *= 0.11;
          b6 = white * 0.115926;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        noise.loop = true;

        const windFilter = ctx.createBiquadFilter();
        windFilter.type = 'lowpass';
        windFilter.frequency.setValueAtTime(220, ctx.currentTime);
        windFilter.Q.setValueAtTime(3.5, ctx.currentTime);

        noise.connect(windFilter);
        windFilter.connect(masterGain);
        noise.start();
        noiseSourceRef.current = noise;

        // 2. Sub-bass Telemetry Carrier Drone (55 Hz / A1)
        const drone = ctx.createOscillator();
        drone.type = 'sine';
        drone.frequency.setValueAtTime(55, ctx.currentTime); // 55 Hz sub-bass

        const droneGain = ctx.createGain();
        droneGain.gain.setValueAtTime(0.08, ctx.currentTime);

        drone.connect(droneGain);
        droneGain.connect(masterGain);
        drone.start();
        droneOscRef.current = drone;
      } else if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.setTargetAtTime(0.14, audioCtxRef.current.currentTime, 0.5);
      }
    } else {
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.3);
      }
    }

    return () => {
      // Keep context across renders
    };
  }, [isPlaying]);

  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
        isPlaying
          ? 'bg-amber-950/70 border-amber-500/40 text-amber-300 shadow-[0_0_15px_rgba(217,119,6,0.2)]'
          : 'bg-space-card/80 border-space-border text-zinc-400 hover:text-zinc-200'
      }`}
      title={isPlaying ? 'Mute Atmospheric Martian Audio' : 'Initialize Atmospheric Audio Uplink'}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>AUDIO UPLINK: ACTIVE</span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4 text-zinc-500" />
          <span>AUDIO UPLINK: MUTED</span>
        </>
      )}
    </button>
  );
};
