import React, { useState } from 'react';
import { OPPORTUNITY_CHAPTERS, OPPORTUNITY_MISSION } from '../../data/opportunityData';
import { ProvenanceBadge } from '../UI/ProvenanceBadge';
import { 
  BookOpen, 
  ChevronRight, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Navigation, 
  Radio,
  Flame,
  Clock
} from 'lucide-react';

interface MissionStoryProps {
  onJumpToSite: (coords: [number, number], zoom: number) => void;
  onOpenLastSignal: () => void;
}

export const MissionStory: React.FC<MissionStoryProps> = ({ 
  onJumpToSite, 
  onOpenLastSignal 
}) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const chapter = OPPORTUNITY_CHAPTERS[activeChapterIndex];

  const handleJumpFromChapter = (index: number) => {
    if (index === 0) {
      onJumpToSite([OPPORTUNITY_MISSION.landingCoordinates.lon, OPPORTUNITY_MISSION.landingCoordinates.lat], 13);
    } else if (index === 1) {
      onJumpToSite([-5.3200, -2.1800], 11.5); // Endeavour Rim
    } else if (index === 2) {
      onJumpToSite([OPPORTUNITY_MISSION.restingCoordinates.lon, OPPORTUNITY_MISSION.restingCoordinates.lat], 13.5); // Perseverance
    }
  };

  return (
    <div className="flex flex-col h-full bg-space-surface border-l border-space-border/80 text-zinc-100 overflow-hidden shadow-2xl">
      {/* Panel Header */}
      <div className="p-4 bg-space-card/90 border-b border-space-border flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 font-semibold block">
              MISSION CHRONICLES
            </span>
            <h2 className="text-sm font-display font-bold text-white tracking-wide">
              Documentary Narrative
            </h2>
          </div>
        </div>

        {/* Mission Quick Stats Badge */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="text-right">
            <div className="text-zinc-400 text-[10px]">TOTAL SOLS</div>
            <div className="text-amber-400 font-bold">{OPPORTUNITY_MISSION.actualLifespanSols}</div>
          </div>
          <div className="text-right border-l border-space-border pl-3">
            <div className="text-zinc-400 text-[10px]">DISTANCE</div>
            <div className="text-cyan-400 font-bold">45.16 km</div>
          </div>
        </div>
      </div>

      {/* Chapter Selector Tabs */}
      <div className="grid grid-cols-3 border-b border-space-border bg-black/40 text-xs font-mono">
        {OPPORTUNITY_CHAPTERS.map((ch, idx) => (
          <button
            key={ch.id}
            onClick={() => setActiveChapterIndex(idx)}
            className={`py-2.5 px-2 text-center transition-all border-b-2 flex flex-col items-center gap-0.5 ${
              activeChapterIndex === idx
                ? 'border-amber-400 text-amber-300 bg-amber-500/10 font-bold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
            }`}
          >
            <span className="text-[10px] tracking-wider text-zinc-500 uppercase">PART {idx + 1}</span>
            <span className="truncate max-w-[100px]">{ch.title.split(':')[1]?.trim() || ch.title}</span>
          </button>
        ))}
      </div>

      {/* Chapter Content Body */}
      <div className="p-5 flex-1 overflow-y-auto space-y-4">
        {/* Chapter Title & Subtitle */}
        <div>
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1">
            <span className="text-cyan-400 font-bold">{chapter.solRange}</span>
            <span className="text-zinc-500">{chapter.dateRange}</span>
          </div>
          <h3 className="text-lg font-display font-bold text-white tracking-wide">
            {chapter.title}
          </h3>
          <p className="text-xs font-mono text-amber-300/80 mt-1 italic">
            "{chapter.subtitle}"
          </p>
        </div>

        {/* Narrative Paragraphs */}
        <div className="space-y-3 text-xs leading-relaxed text-zinc-300 font-sans">
          {chapter.narrativeText.map((p, idx) => (
            <p key={idx} className="bg-zinc-900/30 p-2.5 rounded-lg border border-space-border/40">
              {p}
            </p>
          ))}
        </div>

        {/* Key Milestone / Breakthrough Box */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/30 to-space-card border border-amber-500/30 flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
              HISTORICAL SIGNIFICANCE
            </span>
            <p className="text-xs text-amber-200/90 mt-0.5">
              {chapter.keyHighlight}
            </p>
          </div>
        </div>

        {/* Chapter Telemetry Metrics */}
        {chapter.telemetryMetrics && (
          <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-black/40 p-3 rounded-lg border border-space-border">
            <div>
              <span className="text-zinc-500 text-[10px] block">CUMULATIVE TRAVERSE</span>
              <span className="text-cyan-300 font-bold">{chapter.telemetryMetrics.distanceKm} km</span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] block">MARTIAN DAYS SURVIVED</span>
              <span className="text-amber-300 font-bold">{chapter.telemetryMetrics.solsPassed} Sols</span>
            </div>
          </div>
        )}

        {/* Actions for this chapter */}
        <div className="flex flex-col gap-2 pt-2 border-t border-space-border">
          <button
            onClick={() => handleJumpFromChapter(activeChapterIndex)}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-space-border text-xs font-mono text-zinc-200 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>Center Map on Chapter Coordinates</span>
          </button>

          {activeChapterIndex === 2 && (
            <button
              onClick={onOpenLastSignal}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-gradient-to-r from-rose-950 to-amber-950 hover:from-rose-900 hover:to-amber-900 border border-rose-500/40 text-xs font-mono text-rose-200 font-bold tracking-wider transition-all shadow-lg"
            >
              <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>Launch "The Last Signal" Archive</span>
            </button>
          )}
        </div>

        {/* Chapter Provenance Badge */}
        <div className="pt-2 flex justify-end">
          <ProvenanceBadge type={chapter.provenance} />
        </div>
      </div>
    </div>
  );
};
