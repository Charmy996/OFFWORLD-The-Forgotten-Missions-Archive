import React from 'react';
import { 
  Radio, 
  Database, 
  BookOpen
} from 'lucide-react';

interface HeaderProps {
  onOpenLastSignal: () => void;
  onOpenCitations: () => void;
  onOpenRoverStories?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
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
        <div className="hidden sm:block h-6 w-px bg-space-border" />

        {/* Mission Identification */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-semibold tracking-wider">OPPORTUNITY (MER-B)</span>
        </div>
      </div>

      {/* Right Controls & Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Rover Chronicles Button */}
        {onOpenRoverStories && (
          <button
            onClick={onOpenRoverStories}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-amber-950/70 hover:bg-amber-900/80 border border-amber-500/40 text-amber-300 text-xs font-mono font-semibold transition-all shadow-md hover:shadow-[0_0_15px_rgba(245,158,11,0.25)] focus-visible:ring-2 focus-visible:ring-amber-400"
            title="Open Interactive Rover Stories & Chronicles"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">ROVER CHRONICLES</span>
          </button>
        )}

        {/* The Last Signal Button */}
        <button
          onClick={onOpenLastSignal}
          className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-gradient-to-r from-rose-950/80 to-space-card hover:from-rose-900 border border-rose-500/40 text-rose-300 text-xs font-mono font-semibold transition-all shadow-lg hover:shadow-[0_0_15px_rgba(244,63,94,0.25)] focus-visible:ring-2 focus-visible:ring-rose-400"
          title="Open The Last Signal Experience"
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
