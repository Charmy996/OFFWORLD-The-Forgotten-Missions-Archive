import React from 'react';
import { OPPORTUNITY_MISSION } from '../../data/opportunityData';
import { AmbientAudio } from '../Audio/AmbientAudio';
import { 
  Radio, 
  Database, 
  Globe,
  Map as MapIcon,
  CircleDot,
  BookOpen
} from 'lucide-react';

interface HeaderProps {
  currentView: 'globe' | 'planet' | 'surface';
  onViewChange: (view: 'globe' | 'planet' | 'surface') => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onOpenLastSignal: () => void;
  onOpenCitations: () => void;
  onOpenRoverStories?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  isAudioPlaying,
  onToggleAudio,
  onOpenLastSignal,
  onOpenCitations,
  onOpenRoverStories
}) => {
  return (
    <header className="h-16 px-4 sm:px-6 bg-space-void/95 backdrop-blur-md border-b border-space-border flex items-center justify-between z-40 select-none">
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
        <div className="hidden xl:block h-6 w-px bg-space-border" />

        {/* View Mode Switcher Pills */}
        <div className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-space-card/80 border border-space-border">
          <button
            onClick={() => onViewChange('globe')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all focus-visible:ring-2 focus-visible:ring-rose-400 ${
              currentView === 'globe'
                ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <CircleDot className="w-3.5 h-3.5 text-rose-400" />
            <span>3D Mars Globe</span>
          </button>

          <button
            onClick={() => onViewChange('planet')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all focus-visible:ring-2 focus-visible:ring-amber-400 ${
              currentView === 'planet'
                ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>2D Planetary Globes</span>
          </button>

          <button
            onClick={() => onViewChange('surface')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all focus-visible:ring-2 focus-visible:ring-cyan-400 ${
              currentView === 'surface'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>Opportunity Traverse Map</span>
          </button>
        </div>
      </div>

      {/* Right Controls & Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile View Toggle */}
        <div className="flex md:hidden items-center p-0.5 rounded-lg bg-space-card border border-space-border">
          <button
            onClick={() => onViewChange('globe')}
            className={`p-1.5 rounded text-xs font-mono ${currentView === 'globe' ? 'bg-rose-500/20 text-rose-300' : 'text-zinc-400'}`}
            title="3D Mars Globe"
          >
            <CircleDot className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewChange('planet')}
            className={`p-1.5 rounded text-xs font-mono ${currentView === 'planet' ? 'bg-amber-500/20 text-amber-300' : 'text-zinc-400'}`}
            title="2D Planetary Globes"
          >
            <Globe className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewChange('surface')}
            className={`p-1.5 rounded text-xs font-mono ${currentView === 'surface' ? 'bg-cyan-500/20 text-cyan-300' : 'text-zinc-400'}`}
            title="Surface Traverse Map"
          >
            <MapIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Rover Chronicles Button */}
        {onOpenRoverStories && (
          <button
            onClick={onOpenRoverStories}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-amber-950/70 hover:bg-amber-900/80 border border-amber-500/40 text-amber-300 text-xs font-mono font-semibold transition-all shadow-md hover:shadow-[0_0_15px_rgba(245,158,11,0.25)] focus-visible:ring-2 focus-visible:ring-amber-400"
            title="Open Interactive Rover Stories & Chronicles"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">ROVER CHRONICLES</span>
          </button>
        )}

        {/* Ambient Web Audio Uplink Button */}
        <AmbientAudio isPlaying={isAudioPlaying} onToggle={onToggleAudio} />

        {/* The Last Signal Button */}
        <button
          onClick={onOpenLastSignal}
          className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-gradient-to-r from-rose-950/80 to-space-card hover:from-rose-900 border border-rose-500/40 text-rose-300 text-xs font-mono font-semibold transition-all shadow-lg hover:shadow-[0_0_15px_rgba(244,63,94,0.25)] focus-visible:ring-2 focus-visible:ring-rose-400"
        >
          <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          <span className="hidden sm:inline">THE LAST SIGNAL</span>
        </button>

        {/* Citations & NASA Data Register */}
        <button
          onClick={onOpenCitations}
          className="p-1.5 rounded-lg bg-space-card/80 hover:bg-zinc-800 border border-space-border text-zinc-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-amber-400"
          title="Data Sources & 14 CFR 1221 Compliance"
          aria-label="Open citation drawer"
        >
          <Database className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
