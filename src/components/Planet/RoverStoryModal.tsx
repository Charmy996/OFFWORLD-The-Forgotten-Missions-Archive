import React from 'react';
import { PlanetaryExplorerRover } from '../../types/mission';
import { ProvenanceBadge } from '../UI/ProvenanceBadge';
import { X, ExternalLink, MapPin, Compass, Radio } from 'lucide-react';

interface RoverStoryModalProps {
  rover: PlanetaryExplorerRover | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenTraverseMap?: () => void;
  onOpenLastSignal?: () => void;
}

export const RoverStoryModal: React.FC<RoverStoryModalProps> = ({
  rover,
  isOpen,
  onClose,
  onOpenTraverseMap,
  onOpenLastSignal
}) => {
  if (!isOpen || !rover) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[88vh] bg-zinc-950/85 backdrop-blur-xl border border-amber-500/35 rounded-2xl p-6 shadow-[0_0_90px_rgba(245,158,11,0.18)] flex flex-col text-zinc-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rover-story-title"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-space-border/80 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950/80 text-amber-400 border border-amber-500/30 font-semibold tracking-wider">
                {rover.body.toUpperCase()} EXPLORER
              </span>
              <span className="text-xs font-mono text-zinc-400">
                {rover.designation}
              </span>
              {rover.isApproximate && (
                <span className="text-[10px] font-mono text-rose-400 border border-rose-500/30 px-1.5 py-0.2 rounded bg-rose-950/40">
                  Approximate Location
                </span>
              )}
            </div>
            <h2 id="rover-story-title" className="text-xl font-display font-bold text-white tracking-wide">
              {rover.name}: {rover.siteName}
            </h2>
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 mt-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{rover.coordinates.displayCoords}</span>
            </div>
          </div>

          {/* Themed Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-900/80 hover:bg-amber-500/20 text-zinc-400 hover:text-amber-300 border border-space-border hover:border-amber-500/40 transition-all focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label="Close rover story"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: Metrics & Handwritten Story */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono bg-black/60 p-3 rounded-xl border border-space-border/80">
            <div>
              <span className="text-zinc-500 text-[10px] block">OPERATIONAL TIME</span>
              <span className="text-amber-400 font-bold">{rover.metrics.sols}</span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] block">TOTAL TRAVERSE</span>
              <span className="text-cyan-400 font-bold">{rover.metrics.distance}</span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] block">LIFESPAN</span>
              <span className="text-zinc-200">{rover.metrics.lifespan}</span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] block">STATUS</span>
              <span className="text-emerald-400 font-semibold">{rover.statusText.split('(')[0]}</span>
            </div>
          </div>

          {/* Narrative Paragraphs (Handwritten tone, zero em dashes) */}
          <div className="space-y-3 text-xs leading-relaxed font-sans text-zinc-300">
            {rover.handwrittenStory.map((paragraph, index) => (
              <p key={index} className="bg-zinc-900/50 p-3.5 rounded-xl border border-space-border/60 leading-relaxed text-justify">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Key Scientific Highlight */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/30 to-space-card/80 border border-amber-500/30">
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block mb-1">
              PRIMARY SCIENTIFIC LEGACY
            </span>
            <p className="text-xs text-amber-200/90 leading-relaxed">
              {rover.metrics.keyDiscovery}
            </p>
          </div>
        </div>

        {/* Modal Footer & Actions */}
        <div className="mt-4 pt-3 border-t border-space-border/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <ProvenanceBadge type={rover.provenance} />
            {rover.sourceUrl && (
              <a
                href={rover.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>NASA PDS Record</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-2">
            {rover.id === 'opportunity' && (
              <>
                {onOpenTraverseMap && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenTraverseMap();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-xs font-mono text-cyan-200 transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <Compass className="w-3.5 h-3.5 text-cyan-400" />
                    <span>View Surface Map</span>
                  </button>
                )}
                {onOpenLastSignal && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenLastSignal();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-xs font-mono text-rose-200 font-bold transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-rose-400"
                  >
                    <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                    <span>The Last Signal</span>
                  </button>
                )}
              </>
            )}

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-200 transition-colors focus-visible:ring-2 focus-visible:ring-zinc-400"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
