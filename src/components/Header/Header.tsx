import React from 'react';
import { OPPORTUNITY_MISSION } from '../../data/opportunityData';
import { AmbientAudio } from '../Audio/AmbientAudio';
import { 
  Radio, 
  Database, 
  MapPin, 
  Calendar, 
  Activity,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

interface HeaderProps {
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onOpenLastSignal: () => void;
  onOpenCitations: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isAudioPlaying,
  onToggleAudio,
  onOpenLastSignal,
  onOpenCitations
}) => {
  return (
    <header className="h-16 px-6 bg-space-void/90 backdrop-blur-md border-b border-space-border flex items-center justify-between z-40 select-none">
      {/* Brand & Project Identity */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-600 via-rose-600 to-space-void p-0.5 border border-amber-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(234,88,12,0.3)]">
            <Radio className="w-4 h-4 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-display font-black tracking-widest text-white uppercase">
                OFFWORLD
              </h1>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-950/80 text-amber-400 border border-amber-500/30">
                NASA SPACE APPS 2026
              </span>
            </div>
            <p className="text-[10px] font-mono text-zinc-400 tracking-wider">
              THE FORGOTTEN MISSIONS ARCHIVE
            </p>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden lg:block h-6 w-px bg-space-border" />

        {/* Active Mission Pill */}
        <div className="hidden lg:flex items-center gap-2.5 px-3 py-1 rounded-lg bg-space-surface/80 border border-space-border text-xs font-mono">
          <span className="text-zinc-500 uppercase text-[10px]">MISSION:</span>
          <span className="text-amber-400 font-bold tracking-wide">
            {OPPORTUNITY_MISSION.name} ({OPPORTUNITY_MISSION.designation})
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-emerald-400 text-[11px] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>SOL 1 – 5111 COMPLETED</span>
          </span>
        </div>
      </div>

      {/* Right Controls & Actions */}
      <div className="flex items-center gap-3">
        {/* Ambient Web Audio Uplink Button */}
        <AmbientAudio isPlaying={isAudioPlaying} onToggle={onToggleAudio} />

        {/* The Last Signal Button */}
        <button
          onClick={onOpenLastSignal}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-rose-950/80 to-space-card hover:from-rose-900 border border-rose-500/40 text-rose-300 text-xs font-mono font-semibold transition-all shadow-lg hover:shadow-[0_0_15px_rgba(244,63,94,0.25)]"
        >
          <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          <span className="hidden sm:inline">THE LAST SIGNAL</span>
        </button>

        {/* Citations & NASA Data Register */}
        <button
          onClick={onOpenCitations}
          className="p-1.5 rounded-lg bg-space-card/80 hover:bg-zinc-800 border border-space-border text-zinc-400 hover:text-white transition-colors"
          title="Data Sources & 14 CFR 1221 Compliance"
        >
          <Database className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
