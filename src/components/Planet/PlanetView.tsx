import React, { useState } from 'react';
import { PLANETARY_ROVERS } from '../../data/opportunityData';
import { PlanetaryExplorerRover } from '../../types/mission';
import { PlanetSphereCanvas } from './PlanetSphereCanvas';
import { RoverStoryModal } from './RoverStoryModal';
import { 
  Radio, 
  Compass, 
  ArrowRight
} from 'lucide-react';

interface PlanetViewProps {
  onOpenTraverseMap: () => void;
  onOpenLastSignal: () => void;
  onOpenRoverChronicles?: () => void;
}

export const PlanetView: React.FC<PlanetViewProps> = ({
  onOpenTraverseMap,
  onOpenLastSignal,
  onOpenRoverChronicles
}) => {
  const opportunityRover = PLANETARY_ROVERS[0];
  const [selectedRover, setSelectedRover] = useState<PlanetaryExplorerRover>(opportunityRover);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenChronicles = () => {
    if (onOpenRoverChronicles) {
      onOpenRoverChronicles();
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="relative w-full h-full bg-[#050608] flex flex-col lg:flex-row overflow-hidden select-none">
      {/* Background Starfield & Subtle Nebulae */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/20 via-[#07080c] to-[#040507] pointer-events-none" />
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />

      {/* Main Area: Celestial Stage */}
      <div className="flex-1 relative flex flex-col items-center justify-between p-3 sm:p-5 min-h-[300px] overflow-hidden">
        {/* Top Bar: Mars Geodetic Datum Info */}
        <div className="w-full flex items-center justify-between gap-3 z-20">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-space-card/90 backdrop-blur-md border border-space-border shadow-xl text-xs font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-white font-bold tracking-wider">MARS</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400 text-[11px]">4th Planet from the Sun</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-space-card/85 backdrop-blur-md border border-space-border text-xs font-mono text-zinc-400 shadow-xl">
            <span className="text-zinc-500 text-[10px]">DATUM: </span>
            <span className="text-zinc-300 font-semibold">IAU 2000 Mars Planetocentric Sphere (R=3,396,190m)</span>
          </div>
        </div>

        {/* Center: Interactive Rotating 2D Globe Canvas */}
        <div className="relative flex-1 w-full flex items-center justify-center my-1 min-h-0">
          <PlanetSphereCanvas
            rovers={[opportunityRover]}
            selectedRover={selectedRover}
            onSelectRover={setSelectedRover}
            onOpenStory={handleOpenChronicles}
          />
        </div>

        {/* Bottom Station Indicator */}
        <div className="w-full flex items-center justify-center gap-2 z-20 pb-1">
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-space-card/80 border border-amber-500/30 text-xs font-mono text-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-semibold">Station: Opportunity (MER-B)</span>
            <span className="text-zinc-500 text-[10px]">Meridiani Planum</span>
          </div>
        </div>
      </div>

      {/* Right Sidebar: Opportunity Mission Dossier */}
      <div 
        data-testid="planet-dossier-panel"
        className="w-full lg:w-96 xl:w-[420px] bg-space-surface border-t lg:border-t-0 lg:border-l border-space-border/80 p-4 sm:p-5 flex flex-col justify-between shadow-2xl z-20 max-h-[45vh] lg:max-h-full overflow-y-auto shrink-0"
      >
        <div className="space-y-3.5">
          {/* Header & Honest Provenance Badge */}
          <div className="border-b border-space-border pb-3">
            <div className="flex items-center justify-between mb-1.5 gap-2 flex-wrap">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                MARS MISSION DOSSIER
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950/80 border border-amber-500/30 text-amber-300 font-semibold">
                Position approximate (reconstructed)
              </span>
            </div>
            <h2 className="text-xl font-display font-bold text-white tracking-wide">
              {opportunityRover.name}
            </h2>
            <div className="text-xs font-mono text-zinc-400 mt-0.5">
              {opportunityRover.designation} // Challenger Memorial Station, Meridiani Planum
            </div>
          </div>

          {/* Coordinates & Landing Site */}
          <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-space-border text-xs font-mono space-y-1">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-zinc-500">COORDINATES:</span>
              <span className="text-cyan-300 font-bold">1.9462° S, 354.4734° E</span>
            </div>
            <div className="text-[10px] text-zinc-400 font-sans">
              Landing: January 24, 2004 Pacific time (January 25 UTC)
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-black/40 p-2.5 rounded-xl border border-space-border">
            <div>
              <span className="text-zinc-500 text-[10px] block">OPERATIONAL TIME</span>
              <span className="text-amber-400 font-bold">5,111 Sols</span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] block">CUMULATIVE DISTANCE</span>
              <span className="text-cyan-400 font-bold">45.161 km</span>
            </div>
          </div>

          {/* Narrative Snippet (Dossier-verified text, no gypsum) */}
          <div className="p-3 rounded-xl bg-zinc-900/40 border border-space-border/60 text-xs text-zinc-300 leading-relaxed font-sans space-y-1.5">
            <p>
              Drove 45.161 km over 5,111 sols; blueberries (hematite spherules) and clay minerals at Endeavour that indicate water not strongly acidic.
            </p>
            <p className="text-zinc-400 text-[11px] italic">
              Opportunity touched down on January 24, 2004 Pacific time (January 25 UTC), rolling directly into Eagle Crater. The primary warranty was ninety sols, but the machine kept rolling across the red plain for over fifteen Earth years.
            </p>
          </div>

          {/* "Read More: Full Story" Button -> Opens Rover Chronicles */}
          <button
            onClick={handleOpenChronicles}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-rose-500/10 hover:from-amber-500/30 hover:to-rose-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold tracking-wider transition-all group focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <span>Read More: Full Story</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Opportunity Deep Links to 2D Map & Last Signal */}
        <div className="pt-3 border-t border-space-border space-y-2 mt-3">
          <button
            onClick={onOpenTraverseMap}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-200 text-xs font-mono font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Open 2D Surface Traverse Map</span>
          </button>

          <button
            onClick={onOpenLastSignal}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-gradient-to-r from-rose-950/80 to-amber-950/80 hover:from-rose-900 border border-rose-500/40 text-rose-200 text-xs font-mono font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-rose-400"
          >
            <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>Launch "The Last Signal" Archive</span>
          </button>
        </div>
      </div>

      {/* Rover Story Modal */}
      <RoverStoryModal
        rover={opportunityRover}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOpenTraverseMap={onOpenTraverseMap}
        onOpenLastSignal={onOpenLastSignal}
      />
    </div>
  );
};

export default PlanetView;
