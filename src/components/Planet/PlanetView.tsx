import React, { useState } from 'react';
import { CELESTIAL_BODIES, PLANETARY_ROVERS } from '../../data/opportunityData';
import { CelestialBody, PlanetaryExplorerRover } from '../../types/mission';
import { PlanetSphereCanvas } from './PlanetSphereCanvas';
import { RoverStoryModal } from './RoverStoryModal';
import { ProvenanceBadge } from '../UI/ProvenanceBadge';
import { 
  MapPin, 
  Sparkles, 
  Radio, 
  Compass, 
  ExternalLink,
  ArrowRight,
  Info
} from 'lucide-react';

interface PlanetViewProps {
  onOpenTraverseMap: () => void;
  onOpenLastSignal: () => void;
}

export const PlanetView: React.FC<PlanetViewProps> = ({
  onOpenTraverseMap,
  onOpenLastSignal
}) => {
  const [selectedBodyId, setSelectedBodyId] = useState<CelestialBody>('Mars');
  const [selectedRover, setSelectedRover] = useState<PlanetaryExplorerRover>(
    PLANETARY_ROVERS.find((r) => r.id === 'opportunity') || PLANETARY_ROVERS[0]
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const selectedBody = CELESTIAL_BODIES.find((b) => b.id === selectedBodyId) || CELESTIAL_BODIES[0];
  const activeRovers = PLANETARY_ROVERS.filter((r) => r.body === selectedBodyId);

  const handleSelectBody = (bodyId: CelestialBody) => {
    setSelectedBodyId(bodyId);
    const firstRover = PLANETARY_ROVERS.find((r) => r.body === bodyId);
    if (firstRover) {
      setSelectedRover(firstRover);
    }
  };

  return (
    <div className="relative w-full h-full bg-[#050608] flex flex-col lg:flex-row overflow-hidden select-none">
      {/* Background Starfield & Subtle Nebulae */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/20 via-[#07080c] to-[#040507] pointer-events-none" />
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />

      {/* Main Area: Celestial Stage */}
      <div className="flex-1 relative flex flex-col items-center justify-between p-4 sm:p-6 min-h-[480px]">
        {/* Top Bar: 4-Body Celestial Selector */}
        <div className="w-full flex flex-wrap items-center justify-between gap-3 z-20">
          {/* Celestial Body Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-space-card/90 backdrop-blur-md border border-space-border shadow-xl">
            {CELESTIAL_BODIES.map((b) => {
              const isSelected = selectedBodyId === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => handleSelectBody(b.id as CelestialBody)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all focus-visible:ring-2 focus-visible:ring-amber-400 ${
                    isSelected
                      ? 'bg-zinc-800 text-white font-bold shadow-md border border-space-border'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
                  }`}
                  style={{
                    borderLeftColor: isSelected ? b.accentColor : undefined,
                    borderLeftWidth: isSelected ? '3px' : undefined
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: b.accentColor }}
                  />
                  <span>{b.name}</span>
                </button>
              );
            })}
          </div>

          {/* Celestial Body Quick Specs Chip */}
          <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-space-card/85 backdrop-blur-md border border-space-border text-xs font-mono text-zinc-400 shadow-xl">
            <div>
              <span className="text-zinc-500 text-[10px]">DATUM: </span>
              <span className="text-zinc-300 font-semibold">{selectedBody.datumName}</span>
            </div>
            <span className="text-zinc-700">|</span>
            <div>
              <span className="text-zinc-500 text-[10px]">TEMP: </span>
              <span className="text-amber-400">{selectedBody.surfaceTemp.split(' ')[0]}</span>
            </div>
          </div>
        </div>

        {/* Center: Interactive Rotating 2D Globe Canvas */}
        <div className="relative flex-1 w-full flex items-center justify-center my-2">
          <PlanetSphereCanvas
            body={selectedBodyId}
            rovers={activeRovers}
            selectedRover={selectedRover}
            onSelectRover={setSelectedRover}
            onOpenStory={() => setIsModalOpen(true)}
          />
        </div>

        {/* Bottom Rover Selector Bar */}
        <div className="w-full flex flex-wrap items-center justify-center gap-2 z-20 pt-2">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mr-1">
            {selectedBody.name} Pioneers:
          </span>
          {activeRovers.map((rover) => {
            const isSelected = selectedRover.id === rover.id;
            return (
              <button
                key={rover.id}
                onClick={() => setSelectedRover(rover)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all focus-visible:ring-2 focus-visible:ring-amber-400 ${
                  isSelected
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold shadow-md'
                    : 'bg-space-card/70 text-zinc-400 hover:text-zinc-200 border border-space-border/60 hover:border-zinc-700'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSelected ? 'bg-amber-400 animate-pulse' : 'bg-zinc-500'
                  }`}
                />
                <span>{rover.name}</span>
                {rover.isApproximate && (
                  <span className="text-[9px] text-rose-400 font-normal">(Approx)</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Sidebar: Selected Rover Dossier & Story Launcher */}
      <div className="w-full lg:w-96 xl:w-[420px] bg-space-surface border-t lg:border-t-0 lg:border-l border-space-border/80 p-5 sm:p-6 flex flex-col justify-between shadow-2xl z-20 max-h-[85vh] lg:max-h-full overflow-y-auto">
        <div className="space-y-4">
          {/* Header & Badges */}
          <div className="border-b border-space-border pb-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                {selectedRover.body.toUpperCase()} MISSION DOSSIER
              </span>
              <ProvenanceBadge type={selectedRover.provenance} />
            </div>
            <h2 className="text-xl font-display font-bold text-white tracking-wide">
              {selectedRover.name}
            </h2>
            <div className="text-xs font-mono text-zinc-400 mt-0.5">
              {selectedRover.designation} // {selectedRover.siteName}
            </div>
          </div>

          {/* Coordinates & Accuracy */}
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-space-border text-xs font-mono space-y-1">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-zinc-500">COORDINATES:</span>
              <span className="text-cyan-300 font-bold">{selectedRover.coordinates.displayCoords.split('(')[0]}</span>
            </div>
            {selectedRover.isApproximate && (
              <div className="text-[10px] text-rose-400 font-sans">
                Position labeled approximate (reconstructed traverse endpoint).
              </div>
            )}
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-black/40 p-3 rounded-xl border border-space-border">
            <div>
              <span className="text-zinc-500 text-[10px] block">OPERATIONAL TIME</span>
              <span className="text-amber-400 font-bold">{selectedRover.metrics.sols}</span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] block">CUMULATIVE DISTANCE</span>
              <span className="text-cyan-400 font-bold">{selectedRover.metrics.distance}</span>
            </div>
          </div>

          {/* Narrative Snippet (Handwritten tone, no em dashes) */}
          <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-space-border/60 text-xs text-zinc-300 leading-relaxed font-sans space-y-2">
            <p>
              {selectedRover.shortSnippet}
            </p>
            <p className="text-zinc-400 text-[11px] italic">
              {selectedRover.handwrittenStory[0]}
            </p>
          </div>

          {/* "Read More: Full Story" Button -> Sleek Transparent Modal */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-rose-500/10 hover:from-amber-500/30 hover:to-rose-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold tracking-wider transition-all group focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <span>Read More: Full Story</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Opportunity Deep Links or Body Actions */}
        <div className="pt-4 border-t border-space-border space-y-2 mt-4">
          {selectedRover.id === 'opportunity' ? (
            <>
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
            </>
          ) : (
            <div className="p-3 rounded-lg bg-zinc-900/50 border border-space-border/60 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
              <span>Historical Planetary Station</span>
              {selectedRover.sourceUrl && (
                <a
                  href={selectedRover.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <span>Mission Record</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sleek, Transparent Pop Up Modal for the Complete Story */}
      <RoverStoryModal
        rover={selectedRover}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOpenTraverseMap={onOpenTraverseMap}
        onOpenLastSignal={onOpenLastSignal}
      />
    </div>
  );
};
